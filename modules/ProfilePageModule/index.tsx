'use client'
import { Button } from "@/components/ui/button";
import {useRouter} from 'next/navigation';

export const ProfilePageModule = () => {
    const router = useRouter();

    return (
        <main className="flex flex-col mt-32 px-32 font-dmsans gap-5">
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
            <a href="/profile/edit">
                <Button>
                    Edit Profile
                </Button>
            </a>
        </main>
    );
}