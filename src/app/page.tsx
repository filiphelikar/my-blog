"use client";
import { Blog } from "@/db/schema";
import { useEffect, useState } from "react";

async function getBlogs() {
    const res = await fetch("/api/blogs");
    return res.json();
}

export default function Blogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        getBlogs().then(setBlogs);
    }, []);

    return (
        <div>
            <h1>Seznam blogů</h1>
            {blogs.map((blog) => (
                <div key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                    <small>{blog.author}</small>
                    <img
                    src={blog.imageUrl} 
                    alt="image"
                    width={500}
                    height={500}
                    />
                </div>
            ))}
        </div>
    );
}
