'use client'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterAsPekerjaSchema } from "../schema";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from 'uuid';
import { z } from "zod";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export const RegisterPekerjaForm = () => {
    const form = useForm<z.infer<typeof RegisterAsPekerjaSchema>>({
        resolver: zodResolver(RegisterAsPekerjaSchema),
    });

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async (data: z.infer<typeof RegisterAsPekerjaSchema>) => {
        console.log("Form Data:", data);
        try {
            const response = await fetch('/api/auth/register/pekerja', {
                method: 'POST',
                body: JSON.stringify({
                    id: uuidv4(),
                    alamat: data.alamat,
                    jeniskelamin: data.jenisKelamin,
                    nama: data.nama,
                    nohp: data.noHp,
                    pwd: data.password,
                    saldompay: 10000,
                    tgllahir: new Date(data.tanggalLahir),
                    namabank: data.namaBank,
                    nomorrekening: data.noRekening,
                    npwp: data.npwp,
                    linkfoto: data.urlFotoKtp
                })
            });
            const result = await response.json();

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
        <div className="w-full min-h-[100vh] flex items-center justify-center bg-background py-32 ">
            <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center w-full max-w-4xl mx-4">
                <h1 className="font-bold text-2xl">Register to Sijarta</h1>
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
                            variant={'secondary'}
                            type="submit"
                            className="col-span-2"
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