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
import { PelangganType, UserType } from "@/database/types";
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
import { EditProfilePelangganSchema } from "../types";

export const EditProfilePelanggan = () => {
    const [userDataState, setUserDataState] = useState<PelangganType & UserType>({} as PelangganType & UserType);
    const { userData } = useUserData();
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    async function fetchUserProfile() {
        const response = await fetch(`/api/auth/profile?id=${userData.id}&role=pelanggan`);
        const data = await response.json();

        setUserDataState(data.data);
    }

    const form = useForm<z.infer<typeof EditProfilePelangganSchema>>({
        resolver: zodResolver(EditProfilePelangganSchema),
        values: {
            nama: userDataState.nama ?? "",
            jeniskelamin: userDataState.jeniskelamin ?? "L",
            nohp: userDataState.nohp ?? "",
            tanggallahir: dateConverter(userDataState.tgllahir),
            alamat: userDataState.alamat ?? "",
        },
    });

    useEffect(() => {
        if (userData.id)
            fetchUserProfile();
    }, [userData.id]);

    async function onSubmit(data: z.infer<typeof EditProfilePelangganSchema>) {
        setIsLoading(true);
        try {
            toast({
                title: "Loading ...",
                variant: "default"
            })
            const response = await fetch(`/api/auth/profile?id=${userData.id}&role=pelanggan`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Profile updated successfully",
                    variant: "success",
                });
                router.back()
            } else {
                throw new Error(result.error);
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
        setIsLoading(false);
    }

    return (
        <main className="flex flex-col gap-5">
            <div className="flex gap-4 items-center">
                <ArrowLeft
                    className="w-4 cursor-pointer hover:scale-105"
                    onClick={() => router.back()}
                />
                <h1 className="font-bold text-xl">Edit Profile Pelanggan</h1>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-10 rounded-xl w-full">
                        <FormField
                            control={form.control}
                            name="nama"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-green-700">Nama</FormLabel>
                                    <FormControl>
                                        <Input
                                            label=""
                                            type="text" {...field} />
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
                                    <FormLabel className="text-green-700">Jenis Kelamin</FormLabel>
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
                                    <FormLabel className="text-green-700">No HP</FormLabel>
                                    <FormControl>
                                        <Input
                                            label=""
                                            type="text" {...field} />
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
                                    <FormLabel className="text-green-700">Tanggal Lahir</FormLabel>
                                    <FormControl>
                                        <Input
                                            label=""
                                            type="date" {...field} />
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
                                    <FormLabel className="text-green-700">Alamat</FormLabel>
                                    <FormControl>
                                        <Input
                                            label=""
                                            type="text" {...field} />
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
    );
};