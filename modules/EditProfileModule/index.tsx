'use client'

import { useUserData } from '@/hooks/useUserData';
import { EditProfilePekerja } from "./sections/EditProfilePekerja";
import { EditProfilePelanggan } from "./sections/EditProfilePelanggan";

export function dateConverter(date: Date | undefined) {
    if (!date) return "";

    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const EditProfilePageModule = () => {
    const { role,  isLoading } = useUserData();
    return (
        <main
            className='py-40 px-10 md:px-32 w-full min-h-[100vh]'
        >
            {
                isLoading ? (
                    <div className="flex justify-center items-center h-screen">
                        <p>Loading...</p>
                    </div>
                ) :
                    <>
                        {role === 'pelanggan' ? <EditProfilePelanggan /> : <EditProfilePekerja />}
                    </>
            }
        </main>
    )
};