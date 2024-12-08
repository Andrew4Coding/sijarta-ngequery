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

import { useToast } from '@/hooks/use-toast'
import { useUserData } from '@/hooks/useUserData'
import { usePathname, useRouter } from 'next/navigation'

const pelangganMenus = [
  { href: '/', label: 'Home' },
  { href: '/mypay', label: 'MyPay' },
  { href: '/pemesanan-jasa', label: 'Pesanan Saya' },
  { href: '/diskon', label: 'Diskon' }
]

const pekerjaMenus = [
  { href: '/', label: 'Home' },
  { href: '/pekerjaan', label: 'Pekerjaan' },
  { href: '/status-pekerjaan', label: 'Status Pekerjaan' },
  { href: '/mypay', label: 'MyPay' }
]

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  const { userData, isAuthenticated, role } = useUserData();
  
  const hideMenus: boolean = pathname === '/login' || pathname === '/register'

  const { toast } = useToast();

  async function logout() {
    const response = await fetch('/api/auth/logout', {
      method: 'POST'
    })
    console.log(response)
    if (response.ok) {
      toast({
        title: "Success",
        description: "User logout successfully",
        variant: 'success'
      })
      
      setTimeout(() => {
        router.push('/login')
      }
      , 1000)
    }
  }

  return (
    <nav className={`fixed top-0 w-full bg-white shadow-md px-10 lg:px-32 py-8 flex justify-between items-center z-50  ${hideMenus ? "hidden" : ""}`}>
      <h1 className='font-extrabold text-3xl '>SIJARTA</h1>
      <div className='hidden lg:flex gap-4'>
        {isAuthenticated && (role === 'pelanggan' ? pelangganMenus : pekerjaMenus).map(menu => (
          <Link key={menu.href} href={menu.href}>{menu.label}</Link>
        ))}
      </div>
      <div className='hidden lg:flex'>
        {isAuthenticated ?
          <div className='flex gap-2 items-center'>
            <div className='flex items-center gap-2 text-sm'>
              <div className='text-right'>
                <p className='font-bold'>Hello, {userData.nama}</p>
              </div>
              <Avatar
                className='cursor-pointer'
                onClick={() => {
                  router.push('/profile')
                }}
              >
                <AvatarImage src={userData.linkfoto ?? `https://github.com/shadcn.png`} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <Button
              onClick={logout}
              className='gap-2' variant={'destructive'}>
              <LogOut />
              Logout
            </Button>
          </div>
          :
          <Button
            onClick={() => router.push('/login')}
          >Login</Button>
        }
      </div>
      <Popover
        onOpenChange={(open) => setIsOpen(open)}
      >
        <PopoverTrigger className='flex lg:hidden'>
          <ChevronDown
            className={`w-6 h-6 ${isOpen ? 'rotate-180' : ''} duration-200 ease-in-out`}
          />
        </PopoverTrigger>
        <PopoverContent className='bg-white'>
          <ul className='space-y-2 '>
            {(role === 'pelanggan' ? pelangganMenus : pekerjaMenus).map(menu => (
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
                  variant={'destructive'}
                  onClick={logout}
                >
                  <LogOut className='w-4' />
                  Logout
                </Button>
              </Link>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </nav>
  )
}
