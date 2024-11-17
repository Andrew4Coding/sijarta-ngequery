'use client'
import { Button } from '@/components/ui/button'
import { ChevronDown, LogOut } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { usePathname, useRouter } from 'next/navigation'

export const Navbar = () => {
  const { role, isAuthenticated } = { role: 'pengguna', isAuthenticated: true }
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const hideMenus = pathname === '/login' || pathname === '/register'

  return (
    <nav className='fixed top-0 w-full bg-white shadow-md px-10 md:px-32 py-5 flex justify-between items-center z-50 font-dmsans'>
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
      {!hideMenus && (
        <>
          <div className='hidden md:flex gap-4'>
            <Link href='/'>Home</Link>
            <Link href='/mypay'>MyPay</Link>
            <Link href='/'>Pesanan Saya</Link>
            <Link href='/diskon'>Diskon</Link>
          </div>
          <div className='hidden md:flex'>
            {isAuthenticated ? 
              <div className='flex gap-2 items-center'>
                <Avatar
                  className='cursor-pointer'
                  onClick={() => {
                    router.push('/profile')
                  }}
                >
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button
                  onClick={() => {
                    router.replace('/login')
                  }}
                  className='gap-2' variant={'destructive'}>
                  <LogOut />  
                  Logout
                </Button> 
              </div>
              : 
              <Button>Login</Button>
            }
          </div>
          <Popover>
            <PopoverTrigger className='flex md:hidden'>
              <ChevronDown
                onClick={() => setIsOpen(!isOpen)}
                className={ 
                `w-6 h-6 ${isOpen ? 'rotate-180' : ''} duration-200 ease-in-out`
              } />
            </PopoverTrigger>
            <PopoverContent className='bg-white'>
              <ul className='space-y-2 font-dmsans'>
                <li>
                  <Link href='/'>Home</Link>
                </li>
                <li>
                  <Link href='/mypay'>MyPay</Link>
                </li>
                <li>
                  <Link href='/'>Pesanan Saya</Link>
                </li>
                <li>
                  <Link href='/diskon'>Diskon</Link>
                </li>
                <li>
                  <Link href='/profile'>Profile</Link>
                </li>
                <li>
                  <Link href='/login'>
                    <Button className='w-full'
                      onClick={() => setIsOpen(false)}
                    >
                      <LogOut className='w-4' />
                      Logout
                    </Button>
                  </Link>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </>
      )}
    </nav>
  )
}
