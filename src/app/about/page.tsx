import React from 'react'

const About = () => {
  return (
    <div className=" mx-auto p-6 text-lg">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 mt-15 text-center">About This Blog</h1>
      <p className="mb-4 text-center md:text-2xl">
        This blog is a community-driven space where anyone can contribute their thoughts, ideas, or stories. If you&#39;d like to submit your own blog post, simply write it using the simple formatting rules below, and I’ll manually review and publish it.
      </p>
      <h2 className="text-2xl md:text-3xl font-semibold mt-15 md:mt-30 mb-2 text-center">How it works?</h2>
        <p className='text-center md:text-2xl'><strong>H1:</strong> Used for the main heading of the blog.</p>
        <p className='text-center md:text-2xl'><strong>H2:</strong> Used for subheadings to structure content.</p>
        <p className='text-center md:text-2xl'><strong>A:[label](url):</strong> Create a hyperlink with custom text and a target URL.</p>
      <p className="mb-6 md:text-2xl text-center mt-15 md:mt-30">
        The formatting is intentionally minimal to focus on clarity and ease of contribution. Once you submit your content, I’ll take care of reviewing and adding it manually.
      </p>
      <p className="text-sm text-gray-500 text-center mt-20">
        This project is maintained by <a href="https://filiphelikar.cz" target="_blank" rel="noopener noreferrer" className="underline">filiphelikar.cz</a>, where you can find more of my work.
      </p>
    </div>
  )
}

export default About
