'use client'
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from "next/navigation";

export const EditProfilePageModule = () => {
    const [profile, setProfile] = useState({
        Nama: "Andrew Devito Aryo",
        Level: "Gold",
        JenisKelamin: "Laki-laki",
        NoHP: "08123456789",
        TanggalLahir: "01 Januari 1990",
        Alamat: "Jl. Kebon Jeruk No. 123, Jakarta",
        SaldoMPAY: "Rp 1.000.000"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(profile);
    };

    const router = useRouter();

    return (
        <main className="flex flex-col my-32 px-32 font-dmsans gap-5">
            <div className="flex gap-4 items-center">
                <ArrowLeft className="w-4 cursor-pointer hover:scale-105" onClick={() => {
                    router.back();
                }}/>
                <h1 className="font-bold text-xl">Edit Profile Page</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <Image
                    src="/psql.png"
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="rounded-full"
                />
                <div className="grid grid-cols-2 gap-5">
                    {Object.keys(profile).map((key) => (
                        <div key={key} className="flex flex-col gap-2">
                            <label className="font-bold text-lg" htmlFor={key}>{key}</label>
                            <input
                                className="border p-2"
                                type="text"
                                id={key}
                                name={key}
                                value={(profile as any)[key]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                </div>
                <Button type="submit" onClick={() => {
                    router.replace("/profile");
                }}>
                    <Save className="w-4" />
                    Save Changes
                </Button>
            </form>
        </main>
    );
};