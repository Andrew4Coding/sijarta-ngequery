'use client'

import { useUserData } from '@/lib/useUserData';
import { EditProfilePekerja } from "./EditProfilePekerja";
import { EditProfilePelanggan } from "./EditProfilePelanggan";

export function dateConverter(date: Date | undefined) {
    if (!date) return "";

    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export const EditProfilePageModule = () => {
    const { role } = useUserData();
    return (
        <main>
            {role === 'pelanggan' ? <EditProfilePelanggan /> : <EditProfilePekerja />}
        </main>
    )
};