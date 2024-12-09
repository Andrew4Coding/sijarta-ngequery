'use client';

import { decode } from "jsonwebtoken";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type ReturnType = {
    role: 'pelanggan' | 'pekerja';
    userData: {
        id: string;
        nama: string;
        linkfoto: string;
    };
    isAuthenticated: boolean;
    isLoading: boolean;
};

type sessionType = {
    data: {
        id: string;
        nama: string;
        linkfoto: string;
    };
    exp: number;
    iat: number;
    role: 'pelanggan' | 'pekerja';
};

const nonAuthenticatedRoutes = [
    "/login",
    "/register",
];

export const useUserData: () => ReturnType = () => {
    const [sessionToken, setSessionToken] = useState<string | null>(null);
    const [decodedToken, setDecodedToken] = useState<sessionType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();
    const router = useRouter();

    async function fetchCookie() {
        try {
            const res = await fetch('/api/auth/cookies');
            const data: { message: string; token: string } = await res.json();
            if (data.token) setSessionToken(data.token);
            else setSessionToken(null);
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
        if (sessionToken) {
            try {
                const decoded = decode(sessionToken) as sessionType;
                const isExpired = decoded.exp * 1000 < Date.now();
                if (isExpired) {
                    setSessionToken(null); // Handle expired token
                } else {
                    setDecodedToken(decoded);
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                setDecodedToken(null);
            }
        }
    }, [sessionToken]);

    // Redirect logic with improved conditions
    useEffect(() => {
        if (!isLoading) {
            if (!sessionToken && !nonAuthenticatedRoutes.includes(pathname)) {
                router.push('/login'); // Redirect if unauthenticated
            } else if (sessionToken && nonAuthenticatedRoutes.includes(pathname)) {
                router.push('/'); // Redirect to home or dashboard if already logged in
            }
        }
    }, [isLoading, sessionToken, pathname, router]);

    if (isLoading || !decodedToken) {
        return {
            role: 'pelanggan',
            userData: {
                id: '',
                nama: '',
                linkfoto: '',
            },
            isAuthenticated: false,
            isLoading,
        };
    }

    return {
        role: decodedToken.role,
        userData: {
            id: decodedToken.data.id,
            nama: decodedToken.data.nama,
            linkfoto: decodedToken.data.linkfoto,
        },
        isAuthenticated: true,
        isLoading,
    };
};
