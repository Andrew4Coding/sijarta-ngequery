'use client'
import { useUserData } from "@/lib/useUserData";
import { ProfilePekerja } from "./sections/ProfilePekerja";
import { ProfilePelanggan } from "./sections/ProfilePelanggan";

export const ProfilePageModule = () => {
    const { role, isLoading } = useUserData();

    return (
        <main className="w-full min-h-[100vh] bg-background py-40 px-10 md:px-32">
            {
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    role === 'pelanggan' ? <ProfilePelanggan /> : <ProfilePekerja />
                )
            }
        </main>
    )
}