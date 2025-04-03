"use client"
import { Blog } from '@/db/schema';
import { getBlogs } from '@/utils/functions';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Blogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        getBlogs().then(setBlogs);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
                    >
                        <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-56 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                {blog.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                                {blog.content}
                            </p>
                            <div className="mt-4 flex items-center justify-between">
                                <small className="text-gray-500 dark:text-gray-400">
                                    {blog.author}
                                </small>
                                <Link
                                    href={`/blogs/${blog.id}`}
                                    className="text-violet-600 dark:text-violet-400 font-semibold hover:underline"
                                >
                                    Read more →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Blogs