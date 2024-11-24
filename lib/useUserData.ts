'use client';

import { useCookies } from "@/hooks/use-cookie";
import { decode } from "jsonwebtoken";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export type ReturnType = {
    role: 'pengguna' | 'pekerja';
    userData: {
        id: string;
        nama: string;
    };
    isAuthenticated: boolean;
}
type sessionType = {
    data: {
        id: string;
        nama: string;
        noHp: string;
    },
    exp: number,
    iat: number,
    role: 'pengguna' | 'pekerja',
}

export const useUserData: () => ReturnType = () => {
    const session = useCookies();
    const router = useRouter();
    const pathname = usePathname();

    // useEffect(() => {
    //     // if not session and not login
    //     if (!session && pathname !== '/login') {
    //         router.replace('/login');
    //     }
    // }, [])
    
    const decoded: sessionType = decode(session as string) as sessionType;

    if (!decoded) {
        return {
            role: 'pengguna',
            userData: {
                id: '',
                nama: '',
            },
            isAuthenticated: false,
        }
    }
    
    return {
        role: decoded.role,
        userData: {
            id: decoded.data.id,
            nama: decoded.data.nama,
        },
        isAuthenticated: true,
    };
};
