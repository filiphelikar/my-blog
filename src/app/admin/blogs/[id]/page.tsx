'use client'
import CreateBlog from '@/components/CreateBlog'
import { Blog } from '@/db/schema'
import { getBlogs, } from '@/utils/functions'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'

interface Params {
    params: Promise<{ id: string }>
}

const OneBlog = ({ params }: Params) => {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const { id } = use(params)

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await getBlogs('/api/all/blogs')
            setBlogs(data)
        }

        fetchBlogs()
    }, [])

    const blog: Blog | undefined = blogs.find((blog: Blog) => blog.id === Number(id))

    if (!blog) {
        return <div className='h-dvh'>
            <p className='text-7xl text-center mt-50'>404</p>
            <p className='p-5 text-3xl text-center'> Blog not found</p>
            <Link className='text-4xl block text-center text-violet-600 text-gradient' href='/'>Home</Link>
        </div>
    }

    return <div>
        <CreateBlog adminBlog={blog} />
    </div>
}

export default OneBlog