'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { LoginSchema } from "./schema";

export const LoginPage = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema)
    })
    
    return (
        <main className="w-full h-[100vh] flex items-center justify-center bg-gray-100 font-dmsans">
            <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center">
                <h1 className="font-bold text-2xl font-catamaran">Welcome to Sijarta</h1>
                <p className='text-gray-500'>by ngeQuery Team</p>
                <div className="w-full mt-5 flex flex-col gap-4 min-w-[400px] font-dmSans">
                    <input type="text" className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Nomor Telepon" />
                    <input type="password" className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Password" />
                    <button className="w-full bg-blue-500 text-white p-2 rounded-md">Login</button>
                </div>
                <p className='mt-4'>Belum punya akun <a href="/register" className="font-bold">Register</a></p>
            </div>
        </main>
    );
}