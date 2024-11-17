'use client'
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";

export const ProfilePageModule = () => {
    return (
        <main className="my-40 px-10 md:px-32 font-dmsans flex flex-col gap-5">
            <Image
                src="/psql.png"
                alt="Profile Picture"
                width={150}
                height={150}
                className="rounded-full"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Nama</h3>
                    <p className="text-sm">Andrew Devito Aryo</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Level</h3>
                    <p className="text-sm">Gold</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Jenis Kelamin</h3>
                    <p className="text-sm">Laki-laki</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">No HP</h3>
                    <p className="text-sm">08123456789</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Tanggal Lahir</h3>
                    <p className="text-sm">01 Januari 1990</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Alamat</h3>
                    <p className="text-sm">Jl. Kebon Jeruk No. 123, Jakarta</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Saldo MPAY</h3>
                    <p className="text-sm">Rp 1.000.000</p>
                </div>
                <div className="flex flex-col gap-2">
                    <a href="/profile/edit">
                        <Button>
                            <Pencil className="w-4" />
                            Edit Profile
                        </Button>
                    </a>
                </div>
            </div>
        </main>
    );
}