'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form, FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PekerjaType, UserType } from "@/database/types";
import { useUserData } from '@/lib/useUserData';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { EditProfilePekerjaSchema, EditProfilePelangganSchema } from "./types";
import { useToast } from "@/hooks/use-toast";
import { formatDateToDDMMYYYY } from "@/lib/utils";

type KategoriJasaType = {
    kategoriJasa: string[]
}

export const EditProfilePengguna = () => {
    const searchParams = useSearchParams();
    const roleParams = searchParams.get('role') ?? 'pengguna';

    const form = useForm<z.infer<typeof EditProfilePelangganSchema>>({
        resolver: zodResolver(EditProfilePelangganSchema),
        defaultValues: {
            Nama: "Andrew Devito Aryo",
            JenisKelamin: "Laki-laki",
            NoHP: "08123456789",
            TanggalLahir: "01 Januari 1990",
            Alamat: "Jl. Kebon Jeruk No. 123, Jakarta",
        }
    });

    const router = useRouter();

    function onSubmit(data: z.infer<typeof EditProfilePelangganSchema>) {
        console.log(data);
        router.replace(`/profile?role${roleParams}`);
    }

    return (
        <main className="flex flex-col my-40 px-10 md:px-32  gap-5">
            <div className="flex gap-4 items-center">
                <ArrowLeft className="w-4 cursor-pointer hover:scale-105" onClick={() => {
                    router.back();
                }} />
                <h1 className="font-bold text-xl">Edit Profile Page</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <Image
                        src="/psql.png"
                        alt="Profile Picture"
                        width={150}
                        height={150}
                        className="rounded-full"
                    />
                    <div className="grid grid-cols-2 gap-5">
                        {Object.keys(form.getValues()).map((key) => (
                            <FormField
                                key={key}
                                control={form.control}
                                name={key as keyof z.infer<typeof EditProfilePelangganSchema>}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{key}</FormLabel>
                                        <FormControl>
                                            <Input
                                                label=''
                                                className="border p-2"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                    <Button type="submit">
                        <Save className="w-4" />
                        Save Changes
                    </Button>
                </form>
            </Form>
        </main>
    )    
}

export const EditProfilePekerja = () => { 
    const router = useRouter();

    const [userDataState, setUserDataState] = useState<PekerjaType & UserType & KategoriJasaType>({} as PekerjaType & UserType & KategoriJasaType);

    const { userData } = useUserData();
    
    async function fetchUserProfile() {
        const response = await fetch(`/api/auth/profile?id=${userData.id}&role=pekerja`);
        const data = await response.json();
        console.log(data);
        setUserDataState(data.data);
    }

    const form = useForm<z.infer<typeof EditProfilePekerjaSchema>>({
        resolver: zodResolver(EditProfilePekerjaSchema),
        values: {
            nama: userDataState.nama ?? "",
            jeniskelamin: userDataState.jeniskelamin ?? "L",
            nohp: userDataState.nohp ?? "",
            tanggallahir: "",
            alamat: userDataState.alamat ?? "",
            namabank: userDataState.namabank ?? "",
            nomorrekening: userDataState.nomorrekening ?? "",
            npwp: userDataState.npwp ?? "",
            kategorijasa: userDataState.kategoriJasa ?? [],
        }
    });

    useEffect(() => {
        fetchUserProfile()
    }, [])

    const {toast} = useToast();

    async function onSubmit(data: z.infer<typeof EditProfilePekerjaSchema>) {
        console.log(data);
        
        const response = await fetch(`/api/auth/profile/?id=${userData.id}&role=pekerja`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result);
            toast({
                title: "Success",
                description: "Profile updated successfully",
                variant: "success"
            })
        } else {
            toast({
                title: "Failed",
                description: result.error,
                variant: "destructive"
            })
        }

        // router.replace(`/profile?role=${roleParams}`);
    }



    return (
        <main className="flex flex-col my-40 px-10 md:px-32  gap-5">
            <div className="flex gap-4 items-center">
                <ArrowLeft className="w-4 cursor-pointer hover:scale-105" onClick={() => {
                    router.back();
                }} />
                <h1 className="font-bold text-xl">Edit Profile Page</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <Image
                        src="/psql.png"
                        alt="Profile Picture"
                        width={150}
                        height={150}
                        className="rounded-full"
                    />
                    <div className="grid grid-cols-2 gap-5">
                        <FormField
                            control={form.control}
                            name="nama"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input
                                            label=''
                                            className="border p-2"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="jeniskelamin"
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
                                                <SelectValue placeholder="Pilih jenis kelamin ..." />
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
                            name="nohp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>No HP</FormLabel>
                                    <FormControl>
                                        <Input
                                            label=''
                                            className="border p-2"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tanggallahir"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tanggal Lahir</FormLabel>
                                    <FormControl>
                                        <Input
                                            label=''
                                            className="border p-2"
                                            type="date"
                                            {...field}
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
                                            label=''
                                            className="border p-2"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="namabank"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama Bank</FormLabel>
                                    <FormControl>
                                        <Input
                                            label=''
                                            className="border p-2"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nomorrekening"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>No Rekening</FormLabel>
                                    <FormControl>
                                        <Input
                                            label=''
                                            className="border p-2"
                                            type="text"
                                            {...field}
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
                                            label=''
                                            className="border p-2"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    <FormField
                        control={form.control}
                        name="kategorijasa"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kategori Jasa</FormLabel>
                                <FormControl>
                                    <div className="flex flex-col gap-4">
                                        {["Cleaning Service", "Antar Makanan", "Car Service"].map((kategori, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <Checkbox
                                                    id={kategori}
                                                    checked={field.value.includes(kategori)}
                                                    onCheckedChange={(checked) => {
                                                        if (checked) {
                                                            field.onChange([...field.value, kategori]);
                                                        } else {
                                                            field.onChange(field.value.filter((item) => item !== kategori));
                                                        }
                                                    }}
                                                />
                                                <Label htmlFor={kategori}>{kategori}</Label>
                                            </div>
                                        ))}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <Button type="submit">
                        <Save className="w-4" />
                        Save Changes
                    </Button>
                </form>
            </Form>
        </main>
    )
}

export const EditProfilePageModule = () => {
    const { role } = useUserData();
    return (
        <main>
            {role === 'pengguna' ? <EditProfilePengguna /> : <EditProfilePekerja />}
        </main>
    )
};