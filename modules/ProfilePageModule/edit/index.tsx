'use client'
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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
    NoHP: z.string().nonempty("No HP is required").regex(/^\d+$/, "No HP must be a number"),
    TanggalLahir: z.string().nonempty("Tanggal Lahir is required").regex(/^\d{2} \w+ \d{4}$/, "Tanggal Lahir must be in the format DD MMMM YYYY"),
    Alamat: z.string().nonempty("Alamat is required"),
    SaldoMPAY: z.string().nonempty("Saldo MPAY is required").regex(/^Rp \d+(\.\d{3})*$/, "Saldo MPAY must be in the format Rp X.XXX.XXX")
});

const ProfilePekerjaSchema = z.object({
    Nama: z.string().nonempty("Nama is required"),
    JenisKelamin: z.string().nonempty("Jenis Kelamin is required"),
    NoHP: z.string().nonempty("No HP is required").regex(/^\d+$/, "No HP must be a number"),
    TanggalLahir: z.string().nonempty("Tanggal Lahir is required").regex(/^\d{2} \w+ \d{4}$/, "Tanggal Lahir must be in the format DD MMMM YYYY"),
    Alamat: z.string().nonempty("Alamat is required"),
    SaldoMPAY: z.string().nonempty("Saldo MPAY is required").regex(/^Rp \d+(\.\d{3})*$/, "Saldo MPAY must be in the format Rp X.XXX.XXX"),
    NamaBank: z.string().nonempty("Nama Bank is required"),
    NoRekening: z.string().nonempty("No Rekening is required").regex(/^\d+$/, "No Rekening must be a number"),
    NPWP: z.string().nonempty("NPWP is required").regex(/^\d+$/, "NPWP must be a number"),
    Rating: z.string().nonempty("Rating is required").regex(/^[1-5]$/, "Rating must be between 1 and 5"),
    JumlahPesananSelesai: z.string().nonempty("Jumlah Pesanan Selesai is required").regex(/^\d+$/, "Jumlah Pesanan Selesai must be a number"),
    KategoriJasa: z.array(z.string()).nonempty("Kategori Jasa is required")
});

export const EditProfilePengguna = () => {
    const searchParams = useSearchParams();
    const roleParams = searchParams.get('role') ?? 'pengguna';

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
        router.replace(`/profile?role${roleParams}`);
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
    )    
}

export const EditProfilePekerja = () => { 
    const searchParams = useSearchParams();
    const roleParams = searchParams.get('role') ?? 'pengguna';
    
    const form = useForm<z.infer<typeof ProfilePekerjaSchema>>({
        resolver: zodResolver(ProfilePekerjaSchema),
        defaultValues: {
            Nama: "Andrew Devito Aryo",
            JenisKelamin: "Laki-laki",
            NoHP: "08123456789",
            TanggalLahir: "01 Januari 1990",
            Alamat: "Jl. Kebon Jeruk No. 123, Jakarta",
            SaldoMPAY: "Rp 1.000.000",
            NamaBank: "BCA",
            NoRekening: "1234567890",
            NPWP: "1234567890",
            Rating: "5",
            JumlahPesananSelesai: "100",
            KategoriJasa: ["Cleaning Service", "Antar Makanan", "Car Service"]
        }
    });

    const router = useRouter();

    function onSubmit(data: z.infer<typeof ProfilePekerjaSchema>) {
        console.log(data);
        router.replace(`/profile?role=${roleParams}`);
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
                                name={key as keyof z.infer<typeof ProfilePekerjaSchema>}
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

export const EditProfilePageModule = () => {
    const searchParams = useSearchParams();
    const roleParams = searchParams.get('role') ?? 'pengguna';

    return (
        <main>
            {roleParams === 'pengguna' ? <EditProfilePengguna /> : <EditProfilePekerja />}
        </main>
    )
};