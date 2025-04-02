import { db } from "@/db";
import { blogs } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(3).max(50),
  content: z.string().min(10).max(500),
  author: z.string().min(3).max(20),
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
      imageUrl: process.env.DEFALUT_IMG  || "https://images.unsplash.com/photo-1741482529153-a98d81235d06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    });

    return NextResponse.json(newBlog);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
}
