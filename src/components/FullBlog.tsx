import { Blog } from "@/db/schema"
import React from "react"

interface Props {
  blog: Blog
}

const FullBlog = ({ blog }: Props) => {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("cs-CZ");
  const renderLine = (line: string, index: number) => {
    if (line.startsWith('H1:')) {
      return <h1 key={index} className="text-3xl font-bold my-4">{line.slice(3).trim()}</h1>
    }

    if (line.startsWith('H2:')) {
      return <h2 key={index} className="text-2xl font-semibold my-3">{line.slice(3).trim()}</h2>
    }

    if (line.includes('A:')) {
      const regex = /A:\[(.*?)\]\((.*?)\)/g

      return (
        <p key={index} className="text-blue-600">
          {
            line.split(regex).map((part, i, arr) => {
              if (i % 3 === 1) {
                const linkText = part
                const url = arr[i + 1]
                return (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-violet-600"
                  >
                    {linkText}
                  </a>
                )
              } else if (i % 3 === 2) {
                return null
              }
              return (
                <span className="text-black dark:text-white" key={i}>
                  {part}
                </span>
              )
            })
          }
        </p>
      )
    }

    if (line.trim() === '') {
      return <br key={index} />
    }

    return <p key={index}>{line}</p>
  }

  return <div className="prose dark:prose-invert max-w-none">
     {blog.title ? <h1 className='text-3xl xl:text-4xl'>{blog.title}</h1> : "" }
        <img
            src={blog.imageUrl ? blog.imageUrl : "/placeholder.webp"}
            alt={blog.title} 
            width={700}
            className='mt-10 dark:hidden'
        />
         <img
            src={blog.imageUrl ? blog.imageUrl : "/placeholder_dark.webp"}
            alt={blog.title} 
            width={700}
            className='mt-10 hidden dark:block'
        />
    {blog.content.map(renderLine)}
    <div className='relativ mt-20'>
            <span>Author: {blog.author}</span>
            <span className='float-right'>{formattedDate}</span>
        </div>
    </div>
}

export default FullBlog
