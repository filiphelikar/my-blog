"use client"
import { Blog } from '@/db/schema';
import React, { useEffect, useState } from 'react'

async function getBlogs() {
    const res = await fetch("/api/blogs");
    return res.json();
}

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        getBlogs().then(setBlogs);
    }, []);

  return (
    <div className="">
        {blogs.map((blog) => (
            <div key={blog.id}>
                <h2>{blog.title}</h2>
                <p>{blog.content}</p>
                <small>{blog.author}</small>
                <img
                src={blog.imageUrl} 
                alt="image"
                width={400}
                height={400}
                />
            </div>
        ))}
    </div>
);
}

export default Blogs