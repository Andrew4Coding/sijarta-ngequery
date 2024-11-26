'use client'
import { Button } from "@/components/ui/button";
import {
    Form, FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PekerjaType, UserType } from "@/database/types";
import { useToast } from "@/hooks/use-toast";
import { useUserData } from "@/lib/useUserData";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { dateConverter } from "..";
import { EditProfilePekerjaSchema } from "../types";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type KategoriJasaType = {
    kategoriJasa: string[]
}

export const EditProfilePekerja = () => {
    const router = useRouter();

    const [userDataState, setUserDataState] = useState<PekerjaType & UserType & KategoriJasaType>({} as PekerjaType & UserType & KategoriJasaType);
    const [kategoriJasa, setKategoriJasa] = useState<string[]>([]);

    const { userData } = useUserData();
    const { toast } = useToast();

    async function fetchUserProfile() {
        let response = await fetch(`/api/auth/profile?id=${userData.id}&role=pekerja`);
        let data = await response.json();

        setUserDataState(data.data);

        response = await fetch(`/api/kategoriJasa`);
        data = await response.json();

        setKategoriJasa(data.data.map((item: any) => item.namakategori));
    }

    const form = useForm<z.infer<typeof EditProfilePekerjaSchema>>({
        resolver: zodResolver(EditProfilePekerjaSchema),
        values: {
            nama: userDataState.nama ?? "",
            jeniskelamin: userDataState.jeniskelamin ?? "L",
            nohp: userDataState.nohp ?? "",
            tanggallahir: dateConverter(userDataState.tgllahir),
            alamat: userDataState.alamat ?? "",
            namabank: userDataState.namabank ?? "",
            nomorrekening: userDataState.nomorrekening ?? "",
            npwp: userDataState.npwp ?? "",
            kategorijasa: userDataState.kategoriJasa ?? [],
        }
    });

    useEffect(() => {
        if (userData.id) 
            fetchUserProfile()
    }, [userData])

    async function onSubmit(data: z.infer<typeof EditProfilePekerjaSchema>) {
        toast({
            title: "Loading ...",
            variant: "default"
        })

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

            router.back()
        } else {
            toast({
                title: "Failed",
                description: result.error,
                variant: "destructive"
            })
        }
    }

    return (
        <main className="flex flex-col gap-5">
            <div className="flex gap-4 items-center">
                <ArrowLeft className="w-4 cursor-pointer hover:scale-105" onClick={() => {
                    router.back();
                }} />
                <h1 className="font-bold text-xl">Edit Profile Page</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center">
                    <Image
                        src="/psql.png"
                        alt="Profile Picture"
                        width={150}
                        height={150}
                        className="rounded-full"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-10 rounded-xl w-full">
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
                                            {kategoriJasa.map((kategori, index) => (
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
                    <Button type="submit" variant={'secondary'} className="w-full">
                        <Save className="w-4" />
                        Save Changes
                    </Button>
                </form>
            </Form>
        </main>
    )
}