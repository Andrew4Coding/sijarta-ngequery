'use client'
// context/CookieContext.tsx
import React, { createContext, ReactNode, useContext } from 'react';

type CookieContextType = {
    cookie: string | undefined;
};

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({
    children,
    cookie,
}: {
    children: ReactNode;
    cookie: string | undefined;
}) {
    return (
        <CookieContext.Provider value={{ cookie }}>
            {children}
        </CookieContext.Provider>
    );
}

export function useCookies() {
    const context = useContext(CookieContext);
    if (context === undefined) {
        throw new Error('useCookies must be used within a CookieProvider');
    }
    return context.cookie;
}
