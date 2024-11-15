import { Button } from '@/components/ui/button'
import React from 'react'

export const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full bg-white shadow-md px-32 py-5 flex justify-between items-center z-50 font-dmsans'>
      <div className='space-y-2'>
        <h1 className='font-extrabold text-3xl font-dmsans'>SIJARTA</h1>
        <p className='text-sm'>by NgeQuery</p>
      </div>
      <div>
        <Button>Login</Button>
      </div>
    </nav>
  )
}
