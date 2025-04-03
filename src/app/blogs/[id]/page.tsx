import { Blog } from '@/db/schema'
import { getServersideBlogs } from '@/utils/functions'
import Link from 'next/link'
import React from 'react'

interface Params {
    params: Promise<{ id: string }>
}

const OneBlog = async ({ params }: Params) => {
    const { id } = await params

    const allBlogs = await getServersideBlogs()

    const blog: Blog = allBlogs.find((blog: Blog) => blog.id === Number(id))

    if (!blog) {
        return <div>
            <p className=' text-7xl text-center mt-50'>404</p>
            <p className="p-5 text-3xl text-center"> Blog not found</p>
            <Link className='text-4xl block text-center text-violet-600 text-gradient' href="/">Home</Link>
        </div>
    }

    const formattedDate = new Date(blog.createdAt).toLocaleDateString("cs-CZ");

    return <div>
        <h1 className='text-3xl xl:text-4xl'>{blog.title}</h1>
        <img
            src={blog.imageUrl}
            alt={blog.title}
            width={700}
            className='mt-10'
        />
        {/*TODO spacing */}
        <h1 className='text-2xl xl:text-6xl'>example</h1>
        <h2 className='text-[20px] xl:text-4xl'>example</h2>
        <p>{blog.content}</p>
        <div className='relativ mt-20'>
            <span>Author: {blog.author}</span>
            <span className='float-right'>{formattedDate}</span>
        </div>

    </div>
}

export default OneBlog
