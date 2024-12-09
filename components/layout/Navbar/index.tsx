'use client'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useToast } from '@/hooks/use-toast'
import { useUserData } from '@/hooks/useUserData'
import { usePathname, useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { UserType } from '@/database/types'

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
  const { toast } = useToast();

  const router = useRouter()
  const pathname = usePathname()

  const { userData, isAuthenticated, role } = useUserData();

  const hideMenus: boolean = pathname === '/login' || pathname === '/register'

  // Fetch User Saldo
  const [userDataState, setUserDataState] = useState<UserType>({} as UserType);
  async function fetchUserProfile() {
    const response = await fetch(`/api/auth/profile?id=${userData.id}&role=${role}`);
    const data = await response.json();

    setUserDataState(data.data);
  }

  useEffect(() => {
    if (userData.id && !hideMenus) {
      fetchUserProfile()
    }
  }, [userData.id])

  async function logout() {
    setIsOpen(false)
    const response = await fetch('/api/auth/logout', {
      method: 'POST'
    })
    if (response.ok) {
      toast({
        title: "Success",
        description: "User logout successfully",
        variant: 'success'
      })

      setIsOpen(false)

      setTimeout(() => {
        router.push('/login')
      }
      , 1000)
    }
  }

  if (!userDataState.id && !hideMenus) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`fixed top-0 w-full bg-white shadow-sm px-10 lg:px-32 py-8 flex justify-between items-center z-50`}
    >
      <h1 className='font-extrabold text-4xl font-newake text-green-500'>SIJARTA</h1>
      <div className='hidden lg:flex gap-12'>
      {isAuthenticated && (role === 'pelanggan' ? pelangganMenus : pekerjaMenus).map(menu => (
        <Link key={menu.href} href={menu.href} className='hover:font-extrabold duration-300'>{menu.label}</Link>
      ))}
      </div>
      <div className='flex gap-4'>
      <div className='hidden lg:flex'>
        {isAuthenticated ?
        <div className='flex gap-2 items-center'>
          <div className='flex items-center gap-2 text-sm'>
          <div className='text-right'>
            <p className='font-bold text-base'>Hello, {userData.nama}</p>
            <p className='font-medium text-sm'>
            {
            Number(userDataState.saldompay).toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
            })
            ?? "Loading ..."}</p>
          </div>
          <Avatar
            className='cursor-pointer'
            onClick={() => {
            router.push('/profile')
            }}
          >
            <AvatarImage src={userData.linkfoto ?? `/images/profpic_placeholder.png`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          </div>
        </div>
        :
        <Button
          className={`${hideMenus ? 'hidden' : ''}`}
          onClick={() => router.push('/login')}
        >Login</Button>
        }
      </div>
      <Popover
        onOpenChange={(open) => setIsOpen(open)}
      >
        <PopoverTrigger className=''>
        <ChevronDown
          className={`w-6 h-6 ${isOpen ? 'rotate-180' : ''} duration-200 ease-in-out ${hideMenus ? 'hidden' : ''}`}
        />
        </PopoverTrigger>
        <PopoverContent className='bg-white w-fit rounded-xl'>
        <ul className='space-y-2 '>
          <div className='space-y-2 lg:hidden'>
          {(role === 'pelanggan' ? pelangganMenus : pekerjaMenus).map(menu => (
            <li key={menu.href}>
            <Link href={menu.href}>{menu.label}</Link>
            </li>
          ))}
          </div>
          <li>
          <Link href='/profile'>Profile</Link>
          </li>
          <Separator />
          <li>
          <a
            href='/login'
            onClick={logout}
            className='text-red-500 cursor-pointer duration-300'
          >
            Logout
          </a>
          </li>
        </ul>
        </PopoverContent>
      </Popover>
      </div>
    </motion.nav>
  )
}
