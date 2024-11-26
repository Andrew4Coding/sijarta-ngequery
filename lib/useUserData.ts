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
    isLoading: boolean;
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
    const [decodedToken, setDecodedToken] = useState<sessionType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

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

    if (isLoading || !decodedToken) {
        return {
            role: 'pelanggan',
            userData: {
                id: '',
                nama: '',
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
        },
        isAuthenticated: true,
        isLoading,
    };
};

