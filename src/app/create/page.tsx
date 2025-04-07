import Link from 'next/link'
import React from 'react'
import CreateBlog from '../../components/CreateBlog'

const Create = () => {
  return (
    <div>
      <h1 className='text-4xl md:text-5xl mt-40 text-center' >Write your own blog</h1>
      <p className='mt-20 text-xl md:text-2xl text-center mb-20'>Don’t know how it works? Read more in <Link className='text-gradient text-violet-600' href='/about'>About section</Link></p>
      <CreateBlog />
    </div>
  )
}

export default Create