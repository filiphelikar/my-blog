import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

function isAuthenticated(req: Request) {
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) return false;

    const cookies = Object.fromEntries(cookieHeader.split("; ").map(c => c.split("=")));
    const token = cookies.auth;

    if (!token) return false;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!, { algorithms: ["HS256"] });
        return !!decoded;
    } catch {
        return false;
    }    
}


export async function GET(req: Request) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const allBlogs = await db.select().from(blogs);
    return NextResponse.json(allBlogs);
}

export async function PUT(req: Request) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { id, title, content, author, imageUrl, isApproved } = body;

    if (!id || !title || !content || !author || !imageUrl) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    try {
        const result = await db.update(blogs)
            .set({
                title,
                content,
                author,
                imageUrl,
                isApproved
            })
            .where(eq(blogs.id, id));

        return NextResponse.json({ message: "Blog updated", result });
    } catch {
        return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
    }
}