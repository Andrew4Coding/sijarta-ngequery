'use client'
import { Button } from "@/components/ui/button";
import { PekerjaType, UserType } from "@/database/types";
import { useUserData } from "@/lib/useUserData";
import { formatDateToDDMMYYYY } from "@/lib/utils";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type KategoriJasaType = {
    kategoriJasa: string[]
}

export const ProfilePekerja = () => {
    const [userDataState, setUserDataState] = useState<PekerjaType & UserType & KategoriJasaType>({} as PekerjaType & UserType & KategoriJasaType);
    const { userData } = useUserData();
    const router = useRouter();

    async function fetchUserProfile() {
        const response = await fetch(`/api/auth/profile?id=${userData.id}&role=pekerja`);
        const data = await response.json();

        setUserDataState(data.data);
    }

    useEffect(() => {
        if (userData.id)
            fetchUserProfile()
    }, [userData])

    return (
        <main className="flex flex-col gap-5 items-center p-4 md:p-10">
            <Image
                src="/psql.png"
                alt="Profile Picture"
                width={150}
                height={150}
                className="rounded-full"
            />

            <h1 className="font-bold text-3xl text-center">{userDataState.nama}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white p-5 md:p-10 rounded-xl w-full max-w-4xl">
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-green-600">Jenis Kelamin</h3>
                    <p className="text-sm">{userDataState.jeniskelamin}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-green-600">No HP</h3>
                    <p className="text-sm">{userDataState.nohp}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-green-600">Tanggal Lahir</h3>
                    <p className="text-sm">{
                        userDataState.tgllahir ? formatDateToDDMMYYYY(userDataState.tgllahir) : ''
                    }</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-green-600">Alamat</h3>
                    <p className="text-sm">{userDataState.alamat}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-green-600">Saldo MPAY</h3>
                    <p className="text-sm">{userDataState.saldompay}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-green-600">Nama Bank</h3>
                    <p className="text-sm">{userDataState.namabank}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-green-600">No Rekening</h3>
                    <p className="text-sm">{userDataState.nomorrekening}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-green-600">NPWP</h3>
                    <p className="text-sm">{userDataState.npwp}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-green-600">Rating</h3>
                    <p className="text-sm">{userDataState.rating}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-green-600">Jumlah Pesanan Selesai</h3>
                    <p className="text-sm">{userDataState.jumlahpesananaselesai}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-green-600">Kategori Jasa</h3>
                    <div className="flex flex-wrap gap-2">
                        {
                            userDataState.kategoriJasa?.map((kategori, index) => (
                                <p key={index} className="text-sm bg-blue-100 px-5 py-2 rounded-full font-medium">{kategori}</p>
                            ))
                        }
                    </div>
                </div>
                <Button className="col-span-1 md:col-span-2" variant={'secondary'}
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
