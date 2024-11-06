'use client'

import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from "./schema";

export const LoginPage = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
            resolver: zodResolver(LoginSchema)
    })
    
    return (
        <main className="w-full h-[100vh] flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center">
                <h1 className="font-bold text-2xl">Welcome to Sijarta</h1>
                <p>by ngeQuery Team</p>
                <form className="w-full mt-5 flex flex-col gap-4 min-w-[400px]">
                    <input type="text" className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Nomor Telepon" />
                    <input type="password" className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Password" />
                    <button className="w-full bg-blue-500 text-white p-2 rounded-md">Login</button>
                </form>
                <p>Belum punya akun <a href="/register" className="font-bold">Register</a></p>
            </div>
        </main>
    );
}