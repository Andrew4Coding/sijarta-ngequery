import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  const {role, isAuthenticated} = {role: 'pengguna', isAuthenticated: true}
  
  return (
    <nav className='fixed top-0 w-full bg-white shadow-md px-32 py-5 flex justify-between items-center z-50 font-dmsans'>
      <div className='space-y-2'>
        <h1 className='font-extrabold text-3xl font-dmsans'>SIJARTA</h1>
        <p className='text-sm'>
          Welcome {' '}
          <strong>
            {role === 'pengguna' ? 'Pengguna' : 'Admin'}
            !
          </strong>
        </p>
      </div>
      <div className='flex gap-4'>
        <Link href='/'>Home</Link>
        <Link href='/mypay'>MyPay</Link>
        <Link href='/'>Pesanan Saya</Link>
        <Link href='/diskon'>Diskon</Link>
        <Link href='/profile'>Profile</Link>
        <Link href='/login'>Logout</Link>
      </div>
      <div>
        {isAuthenticated ? 
          <Button className='gap-2'>
            <LogOut />  
            Logout
          </Button> 
          : 
          <Button>Login</Button>
        }
      </div>
    </nav>
  )
}
