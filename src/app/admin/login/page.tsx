"use client"
import React, { useState } from 'react'

const Login = () => {
  const [password, setPassword] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
        credentials: "include",
      })

      if (!res.ok) {
        throw new Error('Login failed')
      }

      const data = await res.json()
      console.log('Login success:', data)

    } catch (error) {
      console.error(error)
      setPassword('')
      alert("Incorrect password or login failed.")
    }
  }

  return (
    <form onSubmit={onSubmit} className='mt-40'>
      <input
        placeholder='passwd'
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='text-black dark:text-white p-2 rounded-2xl bg-gray-200 dark:bg-gray-800 mx-auto block w-xs'
      />
      <button
        type='submit'
        className="mt-4 bg-violet-500 dark:bg-violet-600 text-white px-4 py-2 rounded-xl block mx-auto hover:bg-violet-700 cursor-pointer"
      >
        Submit
      </button>
    </form>
  )
}

export default Login
