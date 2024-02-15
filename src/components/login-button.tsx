import Link from 'next/link'
import React from 'react'

export const LoginButton = () => {
  return (
    <div className='border-2 p-3 font-semibold text-red-900 hover:text-red-500 border-red-500'>
        <Link href="/login">Login / Register</Link>
    </div>
  )
}
