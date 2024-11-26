'use client';

import { decode } from "jsonwebtoken";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type ReturnType = {
    role: 'pelanggan' | 'pekerja';
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
    role: 'pelanggan' | 'pekerja',
}

export const useUserData: () => ReturnType = () => {
    const [sessionToken, setSessionToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    async function fetchCookie() {
        try {
            const res = await fetch('/api/auth/cookies');
            const data: {
                message: string,
                token: string,
            } = await res.json();

            if (data.token) {
                setSessionToken(data.token);
            } else {
                setSessionToken(null);
            }
        } catch (error) {
            console.error("Error fetching cookie:", error);
            setSessionToken(null);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCookie();
    }, [pathname]);

    useEffect(() => {
        if (!isLoading) {
            if (sessionToken) {
                const isAuthPage = pathname === '/login' || pathname === '/register';
                if (isAuthPage) {
                    // Redirect authenticated user to homepage
                    router.push('/');
                }
            } else {
                const isProtectedPage = pathname !== '/login' && pathname !== '/register';
                if (isProtectedPage) {
                    // Redirect unauthenticated user to login page
                    router.push('/login');
                }
            }
        }
    }, [isLoading, sessionToken, pathname, router]);

    const decoded: sessionType = decode(sessionToken as string) as sessionType;

    if (!decoded) {
        return {
            role: 'pelanggan',
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
