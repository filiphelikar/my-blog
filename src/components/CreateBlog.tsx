"use client"
import FullBlog from '@/components/FullBlog'
import { Blog } from '@/db/schema'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'

interface Props  {
  adminBlog?: Blog;
}

const CreateBlog = ({adminBlog}: Props) => {
  const [text, setText] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [isApproved, setIsApproved] = useState(adminBlog?.isApproved)

  const blogSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters long." }).max(50, { message: "Title must not exceed 50 characters." }),
    content: z.array(z.string()).refine(
      (lines) => {
        const totalLength = lines.reduce((sum, line) => sum + line.length, 0)
        return totalLength >= 100 && totalLength <= 6000
      },
      {
        message: "Content must be between 100 and 6000 characters in total.",
      }
    ),
    author: z.string().min(3, { message: "Author name must be at least 3 characters long." }).max(20, { message: "Author name must not exceed 20 characters." }),
    imageUrl: z.string().min(3, { message: "Image URL must be at least 3 characters long." }).max(300, { message: "Image URL must not exceed 300 characters." }),
  });

  const blog: Blog = {
    title,
    content: text,
    author,
    imageUrl,
    createdAt: new Date(),
  }

  useEffect(() => {
    const saved = localStorage.getItem('draft-blog')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setTitle(parsed.title || '')
        setAuthor(parsed.author || '')
        setImageUrl(parsed.imageUrl || '')
        setText(parsed.content || [])
      } catch (e) {
        console.error('Failed to parse saved draft', e)
      }
    }

    if (adminBlog) {
      setTitle(adminBlog.title)
      setAuthor(adminBlog.author)
      setImageUrl(adminBlog.imageUrl)
      setText(adminBlog.content)
  }
  }, [adminBlog])

  useEffect(() => {
    const draft = {
      title,
      author,
      imageUrl,
      content: text,
    }
    localStorage.setItem('draft-blog', JSON.stringify(draft))
  }, [title, author, imageUrl, text])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    const result = blogSchema.safeParse(blog)
    if (!result.success) {
      setError(result.error.errors[0].message)
      return
    }

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blog),
      })

      if (!res.ok) throw new Error('Failed to post blog.')

      setSuccess(true)
      localStorage.removeItem('draft-blog') 
      setTitle('')
      setAuthor('')
      setImageUrl('')
      setText([])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
  
    const result = blogSchema.safeParse(blog)
    if (!result.success) {
      setError(result.error.errors[0].message)
      return
    }
  
    try {
      const res = await fetch(`/api/all/blogs/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...blog,
          isApproved: isApproved,
          id: adminBlog?.id
        }),
      })
  
      if (!res.ok) throw new Error('Failed to update blog.')
  
      setSuccess(true)
      localStorage.removeItem('draft-blog')
      setTitle('')
      setAuthor('')
      setImageUrl('')
      setText([])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Unknown error')
    }
  }
  

  return (
    <form className="p-4" onSubmit={adminBlog ? handleUpdate : handleSubmit}>
      <div className='w-fit mx-auto'>

         <div className='md:flex w-xs md:w-2xl xl:w-3xl mx-auto mb-2'>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='bg-gray-100 dark:bg-gray-900 w-xs md:w-2xl rounded-xl p-4 mb-2 md:mb-0 md:mr-1 text-black dark:text-white'
          placeholder='Title'
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className='bg-gray-100 dark:bg-gray-900 w-xs md:w-2xl rounded-xl p-4 md:ml-1 text-black dark:text-white'
          placeholder='Author'
        />
      </div>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className='bg-gray-100 dark:bg-gray-900 w-xs md:w-2xl xl:w-3xl mx-auto block mb-2 rounded-xl p-4 text-black dark:text-white'
        placeholder='Image URL'
      />
      <textarea
        value={text.join('\n')}
        onChange={(e) => setText(e.target.value.split('\n'))}
        placeholder="You can start with: H1: Main heading"
        className="bg-gray-100 dark:bg-gray-900 w-xs md:w-2xl xl:w-3xl min-h-60 md:min-h-80 rounded-xl p-4 block mx-auto text-black dark:text-white"
      />
      {adminBlog ? <><label>isApproved</label><input onChange={() => setIsApproved(!isApproved)} checked={isApproved} type='checkbox'></input></>  :""}
      
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      {success && <p className="text-green-500 mt-2 text-center">Blog successfully submitted!</p>}

      <button
        type="submit"
        className="mt-4 bg-violet-500 dark:bg-violet-600  text-white px-4 py-2 rounded-xl block float-right hover:bg-violet-700 cursor-pointer"
      >
        {adminBlog ? "Edit" : "Send Blog"}
      </button>
      </div>
     

      <h2 className="text-xl mt-10 mb-4">Preview:</h2>
      <FullBlog blog={adminBlog ? adminBlog : blog} />
    </form>
  )
}

export default CreateBlog
