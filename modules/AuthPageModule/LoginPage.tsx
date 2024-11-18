'use client'

import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { LoginSchema } from "./schema";

import { Button } from '@/components/ui/button';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const LoginPage = () => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema)
    });

    const { toast } = useToast();

    function onSubmit(data: z.infer<typeof LoginSchema>) {
        console.log(data);
        toast({
            title: 'Login Berhasil',
            description: 'Selamat datang di SIJARTA',
            variant: 'success'
        });
    }

    return (
        <main className="w-full h-[100vh] flex items-center justify-center bg-gray-100 ">
            <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center">
                <h1 className="font-bold text-2xl font-catamaran">Welcome to SIJARTA</h1>
                <p className='text-gray-500 mb-5'>by ngeQuery Team</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="nomorTelepon"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nomor Telepon</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='min-w-[300px]'
                                            label=""
                                            placeholder="08123456789" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='password'
                                            className='min-w-[300px]'
                                            label=""
                                            placeholder="Password" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className='w-full'>
                            <LogIn />
                            Login
                        </Button>
                    </form>
                </Form>

                <p className='mt-4 text-sm'>Belum punya akun <a href="/register" className="font-bold">Register</a></p>
            </div>
        </main>
    );
}