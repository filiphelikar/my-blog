import FullBlog from '@/components/FullBlog'
import { Blog } from '@/db/schema'
import { getServersideBlogs } from '@/utils/functions'
import Link from 'next/link'
import React from 'react'

interface Params {
    params: Promise<{ id: string }>
}

const OneBlog = async ({ params }: Params) => {
    const { id } = await params

    const allBlogs = await getServersideBlogs("/api/blogs")

    const blog: Blog = allBlogs.find((blog: Blog) => blog.id === Number(id))

    if (!blog) {
        return <div className='h-dvh'>
            <p className=' text-7xl text-center mt-50'>404</p>
            <p className="p-5 text-3xl text-center"> Blog not found</p>
            <Link className='text-4xl block text-center text-violet-600 text-gradient' href="/">Home</Link>
        </div>
    }

    return <div>
        <FullBlog  blog={blog} />
    </div>
}

export default OneBlog
