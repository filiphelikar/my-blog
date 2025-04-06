import { db } from "@/db";
import { blogs } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.array(z.string()).refine(
    (lines) => {
      const totalLength = lines.reduce((sum, line) => sum + line.length, 0)
      return totalLength >= 100 && totalLength <= 6000
    },
  ),
  author: z.string().min(3).max(20),
  imageUrl: z.string().min(3).max(300),
});

export async function GET() {
  const allBlogs = await db.select().from(blogs);

  return NextResponse.json(allBlogs.filter((blog) => blog.isApproved == true));
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validatedData = blogSchema.parse(data);

    const newBlog = await db.insert(blogs).values({
      ...validatedData,
    });

    return NextResponse.json(newBlog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
