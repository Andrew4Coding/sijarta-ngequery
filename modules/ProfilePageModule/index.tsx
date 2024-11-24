'use client'
import { Button } from "@/components/ui/button";
import { PekerjaType, PelangganType, UserType } from "@/database/types";
import { useUserData } from "@/lib/useUserData";
import { formatDateToDDMMYYYY } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export const ProfilePengguna = () => {
    const [userDataState, setUserDataState] = useState<PelangganType & UserType>({} as PelangganType & UserType);

    const { userData } = useUserData();

    async function fetchUserProfile() {
        const response = await fetch(`/api/auth/profile?id=${userData.id}&role=pelanggan`);
        const data = await response.json();
        setUserDataState(data.data);
    }

    useEffect(() => {
        fetchUserProfile()
    }, [])

    return (
        <main className="my-40 px-10 md:px-32  flex flex-col gap-5">
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
                    <p className="text-sm">{userData.nama}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Jenis Kelamin</h3>
                    <p className="text-sm">{userDataState.jeniskelamin}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">No HP</h3>
                    <p className="text-sm">{userDataState.nohp}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Tanggal Lahir</h3>
                    <p className="text-sm">{userDataState.tgllahir?.toUTCString()}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Alamat</h3>
                    <p className="text-sm">{userDataState.alamat}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <a href={`/profile/edit?role=pengguna`}>
                        <Button>
                            <Pencil className="w-4" />
                            Edit Profile
                        </Button>
                    </a>
                </div>
            </div>
        </main>
    );
};

type KategoriJasaType = {
    kategoriJasa: string[]
}

export const ProfilePekerja = () => {
    const router = useRouter();
    const [userDataState, setUserDataState] = useState<PekerjaType & UserType & KategoriJasaType>({} as PekerjaType & UserType & KategoriJasaType);

    const { userData } = useUserData();

    async function fetchUserProfile() {
        const response = await fetch(`/api/auth/profile?id=${userData.id}&role=pekerja`);
        const data = await response.json();

        setUserDataState(data.data);
    }

    useEffect(() => {
        fetchUserProfile()
    }, [])

    return (
        <main className="my-40 px-10 md:px-32  flex flex-col gap-5">
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
                    <p className="text-sm">{userDataState.nama}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Jenis Kelamin</h3>
                    <p className="text-sm">{userDataState.jeniskelamin}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">No HP</h3>
                    <p className="text-sm">{userDataState.nohp}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Tanggal Lahir</h3>
                    <p className="text-sm">{
                        userDataState.tgllahir ? formatDateToDDMMYYYY(userDataState.tgllahir) : ''
                    }</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Alamat</h3>
                    <p className="text-sm">{userDataState.alamat}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Saldo MPAY</h3>
                    <p className="text-sm">{userDataState.saldompay}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Nama Bank</h3>
                    <p className="text-sm">{userDataState.namabank}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">No Rekening</h3>
                    <p className="text-sm">{userDataState.nomorrekening}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">NPWP</h3>
                    <p className="text-sm">{userDataState.npwp}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Rating</h3>
                    <p className="text-sm">{userDataState.rating}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Jumlah Pesanan Selesai</h3>
                    <p className="text-sm">{userDataState.jumlahpesananaselesai}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Kategori Jasa</h3>
                    {
                        userDataState.kategoriJasa?.map((kategori, index) => (
                            <p key={index} className="text-sm">{kategori}</p>
                        ))
                    }
                </div>
                <Button className="col-span-2"
                    onClick={() => {
                        router.push(`/profile/edit?role=pekerja`);
                    }}
                >
                    <Pencil className="w-4" />
                    Edit Profile
                </Button>
            </div>
        </main>
    );
};


export const ProfilePageModule = () => {
    const { role } = useUserData();

    return (role === 'pengguna' ? <ProfilePengguna /> : <ProfilePekerja />)
}