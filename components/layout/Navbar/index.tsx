'use client'
import { Button } from '@/components/ui/button'
import { ChevronDown, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useUserData } from '@/lib/useUserData'
import { usePathname, useRouter } from 'next/navigation'

const penggunaMenus = [
  { href: '/', label: 'Home' },
  { href: '/mypay', label: 'MyPay' },
  { href: '/pemesanan-jasa', label: 'Pesanan Saya' },
  { href: '/diskon', label: 'Diskon' }
]

const pekerjaMenus = [
  { href: '/', label: 'Home' },
  { href: '/pekerjaan', label: 'Pekerjaan' },
  { href: '/pekerjaan?tabs=history', label: 'Status Pekerjaan' },
  { href: '/mypay', label: 'MyPay' }
]


export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const {userData, isAuthenticated, role } = useUserData();

  const hideMenus = pathname === '/login' || pathname === '/register'

  return (
    <nav className='fixed top-0 w-full bg-white shadow-md px-10 md:px-32 py-8 flex justify-between items-center z-50 font-dmsans'>
      <h1 className='font-extrabold text-3xl font-dmsans'>SIJARTA</h1>
      {!hideMenus && (
        <>
          <div className='hidden md:flex gap-4'>
            {(role === 'pengguna' ? penggunaMenus : pekerjaMenus).map(menu => (
              <Link key={menu.href} href={menu.href}>{menu.label}</Link>
            ))}
          </div>
          <div className='hidden md:flex'>
            {isAuthenticated ? 
              <div className='flex gap-2 items-center'>
                <div className='flex items-center gap-2 text-sm'>
                  <div className='text-right'>
                    <p className='font-bold'>Hello, {userData.nama}</p>
                    <p>Rp {userData.saldoMPay}</p>
                  </div>
                  <Avatar
                    className='cursor-pointer'
                    onClick={() => {
                      router.push('/profile')
                    }}
                  >
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
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
                {(role === 'pengguna' ? penggunaMenus : pekerjaMenus).map(menu => (
                  <li key={menu.href}>
                    <Link href={menu.href}>{menu.label}</Link>
                  </li>
                ))}
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
