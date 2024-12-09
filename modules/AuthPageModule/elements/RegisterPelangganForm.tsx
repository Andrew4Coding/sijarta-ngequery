'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterAsUserSchema } from "../schema";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import {v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

export const RegisterPelangganForm = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof RegisterAsUserSchema>>({
        resolver: zodResolver(RegisterAsUserSchema),
    });

    const { toast } = useToast();

    const onSubmit = async (data: z.infer<typeof RegisterAsUserSchema>) => {
        toast({
            title: "Loading ...",
            variant: 'default'
        });
        try {
            console.log(`Date: ${data.tanggalLahir}`);
            
            const body = {
                id: uuidv4(),
                nama: data.nama,
                alamat: data.alamat,
                jeniskelamin: data.jenisKelamin,
                nohp: data.noHp,
                pwd: data.password,
                saldompay: 0,
                tgllahir: new Date(data.tanggalLahir)
            }

            console.log(body);
            

            const response = await fetch('/api/auth/register/pelanggan', {
                method: 'POST',
                body: JSON.stringify(body)
            });

            const result = await response.json();

            console.log("Response:", body);
            

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "User registered successfully",
                    variant: 'success'
                });
                router.replace('/login');
            } else {
                toast({
                    title: "Failed",
                    description: result.error,
                    variant: 'destructive'
                });
            }
        }
        catch (error: any) {
            console.error(error);
            toast({
                title: "Failed",
                description: error.message,
                variant: 'destructive'
            });
        }
    };

    return (
        <div className="w-full min-h-[100vh] flex items-center justify-center bg-background py-40 px-5">
            <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center w-full max-w-2xl">
                <h1 className="font-bold text-2xl text-center">Daftar Sebagai Pelanggan</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="noHp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nomor Telepon</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='w-full'
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
                                            className='w-full'
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
                                        <Select
                                            value={field.value}
                                            onValueChange={(val) => {
                                                field.onChange(val);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Jenis Kelamin ..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Jenis Kelamin</SelectLabel>
                                                    <SelectItem value="L">Laki-laki</SelectItem>
                                                    <SelectItem value="P">Perempuan</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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
                                            type="date"
                                            className='w-full'
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
                                <FormItem className="col-span-1 md:col-span-2">
                                    <FormLabel>Alamat</FormLabel>
                                    <FormControl>
                                        <Input
                                            className='w-full'
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
                                            className='w-full'
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
                                            className='w-full'
                                            label=""
                                            placeholder="Konfirmasi Password" {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            variant={'secondary'}
                            type="submit"
                            className="col-span-1 md:col-span-2"
                        >
                            Daftar
                        </Button>
                    </form>
                </Form>
                <p className="mt-4">Sudah punya akun <a href="/login" className="font-bold">Login</a></p>
            </div>
        </div>
    )
}