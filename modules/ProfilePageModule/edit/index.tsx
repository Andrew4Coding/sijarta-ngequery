'use client'
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';

const ProfileSchema = z.object({
    Nama: z.string().nonempty("Nama is required"),
    Level: z.string().nonempty("Level is required"),
    JenisKelamin: z.string().nonempty("Jenis Kelamin is required"),
    NoHP: z.string().nonempty("No HP is required"),
    TanggalLahir: z.string().nonempty("Tanggal Lahir is required"),
    Alamat: z.string().nonempty("Alamat is required"),
    SaldoMPAY: z.string().nonempty("Saldo MPAY is required")
});

export const EditProfilePageModule = () => {
    const form = useForm<z.infer<typeof ProfileSchema>>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            Nama: "Andrew Devito Aryo",
            Level: "Gold",
            JenisKelamin: "Laki-laki",
            NoHP: "08123456789",
            TanggalLahir: "01 Januari 1990",
            Alamat: "Jl. Kebon Jeruk No. 123, Jakarta",
            SaldoMPAY: "Rp 1.000.000"
        }
    });

    const router = useRouter();

    function onSubmit(data: z.infer<typeof ProfileSchema>) {
        console.log(data);
        router.replace("/profile");
    }

    return (
        <main className="flex flex-col my-40 px-10 md:px-32 font-dmsans gap-5">
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
                                name={key as keyof z.infer<typeof ProfileSchema>}
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
    );
};