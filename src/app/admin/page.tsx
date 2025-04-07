'use client'
import Blogs from '@/components/Blogs'
import { Blog } from '@/db/schema'
import { getBlogs } from '@/utils/functions'
import React, { useEffect, useState } from 'react'

const AdminTable = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const data = await getBlogs('/api/all/blogs')
      setBlogs(data)
    }

    fetchBlogs()
  }, [])

  return (
    <div>
      <Blogs blogs={blogs} isAdmin />
    </div>
  )
}

export default AdminTable