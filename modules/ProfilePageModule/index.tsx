'use client'
import { Button } from "@/components/ui/button";
import { ReturnType, useUserData } from "@/lib/useUserData";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export const ProfilePengguna = () => {
    const searchParams = useSearchParams();
    const roleParams = searchParams.get('role') ?? 'pengguna';

    // Retrieve `userData` from `useUserData`
    const { userData } = useUserData() as Extract<
        ReturnType,
        { role: 'pengguna' }
    >;

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
                    <p className="text-sm">{userData.nama}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Jenis Kelamin</h3>
                    <p className="text-sm">{userData.jenisKelamin}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">No HP</h3>
                    <p className="text-sm">{userData.noHp}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Tanggal Lahir</h3>
                    <p className="text-sm">{userData.tanggalLahir}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Alamat</h3>
                    <p className="text-sm">{userData.alamat}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <a href={`/profile/edit?role=${roleParams}`}>
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


export const ProfilePekerja = () => {
    const router = useRouter();
    const kategoriJasa = [
        "Cleaning Service",
        "Antar Makanan",
        "Car Service"
    ]

    const { userData } = useUserData() as Extract<
        ReturnType,
        { role: 'pekerja' }
    >;

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
                    <p className="text-sm">{userData.nama}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Jenis Kelamin</h3>
                    <p className="text-sm">{userData.jenisKelamin}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">No HP</h3>
                    <p className="text-sm">{ userData.noHp }</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Tanggal Lahir</h3>
                    <p className="text-sm">{ userData.tanggalLahir }</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Alamat</h3>
                    <p className="text-sm">{ userData.alamat }</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Saldo MPAY</h3>
                    <p className="text-sm">{ userData.saldoMPay}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Nama Bank</h3>
                    <p className="text-sm">{ userData.namaBank}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">No Rekening</h3>
                    <p className="text-sm">{ userData.noRekening}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">NPWP</h3>
                    <p className="text-sm">{ userData.npwp}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Rating</h3>
                    <p className="text-sm">{userData.rating}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Jumlah Pesanan Selesai</h3>
                    <p className="text-sm">{ userData.jumlahPesananSelesai}</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-2xl">Kategori Jasa</h3>
                    {
                        userData.kategoriJasa.map((kategori, index) => (
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