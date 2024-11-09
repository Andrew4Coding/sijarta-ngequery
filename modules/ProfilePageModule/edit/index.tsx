'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const EditProfilePageModule = () => {
    const router = useRouter();
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

    return (
        <main className="flex flex-col my-32 px-32 font-dmsans gap-5">
            <h1 className="font-bold text-2xl">Edit Profile Page</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {Object.keys(profile).map((key) => (
                    <div key={key} className="flex flex-col gap-2">
                        <label className="font-bold text-xl" htmlFor={key}>{key}</label>
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
                <Button type="submit">
                    Save Changes
                </Button>
            </form>
        </main>
    );
};