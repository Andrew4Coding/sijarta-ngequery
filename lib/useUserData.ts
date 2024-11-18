'use client';

interface UserPenggunaData {
    nama: string;
    jenisKelamin: string;
    noHp: string;
    tanggalLahir: string;
    alamat: string;
    saldoMPay: number;
}

interface UserPekerjaData extends UserPenggunaData {
    namaBank: string;
    noRekening: string;
    npwp: string;
    urlFotoKtp: string;
    rating: number;
    jumlahPesananSelesai: number;
    kategoriJasa: string[];
}

export type ReturnType =
    | {
        role: 'pengguna';
        userData: UserPenggunaData;
        isAuthenticated: boolean;
    }
    | {
        role: 'pekerja';
        userData: UserPekerjaData;
        isAuthenticated: boolean;
    };

export const useUserData: () => ReturnType = () => {
    return {
        role: 'pekerja',
        userData: {
            nama: 'John Doe',
            jenisKelamin: 'L',
            noHp: '08123456789',
            tanggalLahir: '2000-01-01',
            alamat: 'Jl. Jendral Sudirman No. 1',
            namaBank: 'BCA',
            noRekening: '1234567890',
            npwp: '1234567890',
            urlFotoKtp: 'https://via.placeholder.com/150',
            jumlahPesananSelesai: 10,
            rating: 4.5,
            saldoMPay: 1000000,
            kategoriJasa: ['Cleaning Service', 'Antar Makanan', 'Car Service'],
        },
        isAuthenticated: true,
    };
};
