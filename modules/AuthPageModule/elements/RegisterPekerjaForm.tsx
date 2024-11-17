'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterAsPekerjaSchema } from "../schema";

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

export const RegisterPekerjaForm = () => {
    const form = useForm<z.infer<typeof RegisterAsPekerjaSchema>>({
        resolver: zodResolver(RegisterAsPekerjaSchema)
    });

    const onSubmit = (data: z.infer<typeof RegisterAsPekerjaSchema>) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="w-full min-h-[100vh] flex items-center justify-center bg-gray-100 py-32 font-dmsans">
            <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center w-full max-w-4xl mx-4">
                <h1 className="font-bold text-2xl">Register Pekerja to Sijarta</h1>
                <p>by ngeQuery Team</p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="nama"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input
                                            label="nama"
                                            className='w-full'
                                            placeholder="Nama" {...field}
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
                                        <select {...field} className="w-full border border-gray-300 p-2 rounded-md mb-2">
                                            <option value="L">Laki-laki</option>
                                            <option value="P">Perempuan</option>
                                        </select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="noHp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>No HP</FormLabel>
                                    <FormControl>
                                        <Input
                                            label="nohp"
                                            className='w-full'
                                            placeholder="No HP" {...field}
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
                                            label="tgllahir"
                                            type="date"
                                            className='w-full'
                                            placeholder="Tanggal Lahir" {...field}
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
                                            label="alamat"
                                            className='w-full'
                                            placeholder="Alamat" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="namaBank"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Bank</FormLabel>
                                    <FormControl>
                                        <Input
                                            label="namabank"
                                            className='w-full'
                                            placeholder="Nama Bank" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="noRekening"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>No Rekening</FormLabel>
                                    <FormControl>
                                        <Input
                                            label="norek"
                                            className='w-full'
                                            placeholder="No Rekening" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="npwp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>NPWP</FormLabel>
                                    <FormControl>
                                        <Input
                                            label="npwp"
                                            className='w-full'
                                            placeholder="NPWP" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="urlFotoKtp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL Foto KTP</FormLabel>
                                    <FormControl>
                                        <Input
                                            label="ktpURL"
                                            type="url"
                                            className='w-full'
                                            placeholder="URL Foto KTP" {...field}
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
                                            label="password"
                                            type="password"
                                            className='w-full'
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
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            label="password"
                                            type="password"
                                            className='w-full'
                                            placeholder="Confirm Password" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="col-span-1 md:col-span-2 w-full bg-blue-500 text-white p-2 rounded-md"
                        >
                            Register
                        </Button>
                    </form>
                </Form>
                <p className="mt-4">Sudah punya akun? <a href="/login" className="font-bold">Login</a></p>
            </div>
        </div>
    );
};