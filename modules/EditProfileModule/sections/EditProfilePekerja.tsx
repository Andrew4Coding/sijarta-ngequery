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
import { useUserData } from "@/hooks/useUserData";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { dateConverter } from "..";
import { EditProfilePekerjaSchema } from "../types";
import { uploadFoto } from "@/lib/s3";

type ExtraType = {
    linkfoto: string,
    kategoriJasa: string[]
}

export const EditProfilePekerja = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [userDataState, setUserDataState] = useState<PekerjaType & UserType & ExtraType>({} as PekerjaType & UserType & ExtraType);

    const { userData } = useUserData();
    const { toast } = useToast();

    async function fetchUserProfile() {
        let response = await fetch(`/api/auth/profile?id=${userData.id}&role=pekerja`);
        let data = await response.json();

        setUserDataState(data.data);
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
            filefoto: null,
            linkfoto: userDataState.linkfoto ?? "",
        }
    });

    useEffect(() => {
        if (userData.id) 
            fetchUserProfile()
    }, [userData.id])

    async function onSubmit(data: z.infer<typeof EditProfilePekerjaSchema>) {
        setIsLoading(true);
        toast({
            title: "Loading ...",
            variant: "default"
        })

        if (data.filefoto) {
            data.linkfoto = await uploadFoto(data.filefoto);
    
        }
        
        const response = await fetch(`/api/auth/profile/?id=${userData.id}&role=pekerja`, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (response.ok) {
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
        setIsLoading(false);
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
                        src={userDataState.linkfoto}
                        alt="Profile Picture"
                        width={150}
                        height={150}
                        className="rounded-full w-40 h-40 object-cover"
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
                                        <Select
                                            value={field.value}
                                            onValueChange={(val) => {
                                                field.onChange(val);
                                            }}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih Nama Bank ..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Nama Bank</SelectLabel>
                                                    <SelectItem value="Gopay">Gopay</SelectItem>
                                                    <SelectItem value="OVO">OVO</SelectItem>
                                                    <SelectItem value="Virtual Account BCA">Virtual Account BCA</SelectItem>
                                                    <SelectItem value="Virtual Account BNI">Virtual Account BNI</SelectItem>
                                                    <SelectItem value="Virtual Account Mandiri">Virtual Account Mandiri</SelectItem>
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
                            name="nomorrekening"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>No Rekening</FormLabel>
                                    <FormControl>
                                        <Input
                                            label=''

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
                            name="filefoto"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>File Foto</FormLabel>
                                    <FormControl>
                                        <Input
                                            label=''
                                            type="file"
                                            onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isLoading}
                            type="submit" variant={'secondary'} className="w-full col-span-2">
                            <Save className="w-4" />
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Form>
        </main>
    )
}