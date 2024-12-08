'use client'
import { Button } from "@/components/ui/button";
import { PelangganType, UserType } from "@/database/types";
import { useUserData } from "@/hooks/useUserData";
import { dateConverter } from "@/modules/EditProfileModule";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProfilePelanggan = () => {
    const [userDataState, setUserDataState] = useState<PelangganType & UserType>({} as PelangganType & UserType);

    const { userData } = useUserData();

    async function fetchUserProfile() {
        const response = await fetch(`/api/auth/profile?id=${userData.id}&role=pelanggan`);
        const data = await response.json();

        setUserDataState(data.data);
    }

    useEffect(() => {
        if (userData.id) {
            console.log(userData)
            fetchUserProfile()
        }
    }, [userData.id])

    return (
        <main className="flex flex-col gap-5 items-center">
            <h1 className="font-bold text-3xl text-center">{ userDataState.nama}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-10 rounded-xl">
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
                    <p className="text-sm">{dateConverter(userDataState.tgllahir)}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg text-green-600">Alamat</h3>
                    <p className="text-sm">{userDataState.alamat}</p>
                </div>
                <div className="flex flex-col gap-2 col-span-2">
                    <a href={`/profile/edit?role=pelanggan`} className="w-full">
                        <Button
                            variant={'secondary'}
                            className="w-full"
                        >
                            <Pencil className="w-4" />
                            Edit Profile
                        </Button>
                    </a>
                </div>
            </div>
        </main>
    );
};
