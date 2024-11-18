'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterAsPekerjaSchema, RegisterAsUserSchema } from "../schema";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const RegisterUserForm = () => {
    const form = useForm<z.infer<typeof RegisterAsUserSchema>>({
        resolver: zodResolver(RegisterAsUserSchema)
    });

    const onSubmit = (data: z.infer<typeof RegisterAsUserSchema>) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="w-full min-h-[100vh] flex items-center justify-center bg-gray-100 py-40">
            <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center ">
                <h1 className="font-bold text-2xl">Register to Sijarta</h1>
                <p>by ngeQuery Team</p>
                <Form {...form}>                    
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-5 grid grid-cols-2 gap-4 min-w-[400px]">
                        <FormField
                            control={form.control}
                            name="noHp"
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
                            name="nama"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='min-w-[300px]'
                                            label=""
                                            placeholder="Nama Lengkap" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="jenisKelamin"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Jenis Kelamin</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='min-w-[300px]'
                                            label=""
                                            placeholder="L/P" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tanggalLahir"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tanggal Lahir</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='min-w-[300px]'
                                            label=""
                                            placeholder="YYYY-MM-DD" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="alamat"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Alamat</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='min-w-[300px]'
                                            label=""
                                            placeholder="Alamat Lengkap" {...field}
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
                                            type="password"
                                            className='min-w-[300px]'
                                            label=""
                                            placeholder="Password" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Konfirmasi Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className='min-w-[300px]'
                                            label=""
                                            placeholder="Konfirmasi Password" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="col-span-2"
                        >
                            Register
                        </Button>
                    </form>
                </Form>
                <p className="mt-4">Sudah punya akun <a href="/login" className="font-bold">Login</a></p>
            </div>
        </div>
    )
}