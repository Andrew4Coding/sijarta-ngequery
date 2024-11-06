import { z } from 'zod';

export const LoginSchema = z.object({
    nomorTelepon: z.string().min(10),
    password: z.string().min(8),
})


export const RegisterAsUserSchema = z.object({
    nama: z.string().min(3),
    jenisKelamin: z.string().min(1).max(1),
    noHp: z.string().min(10),
    tanggalLahir: z.string(),
    alamat: z.string().min(10),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
})

export const RegisterAsPekerjaSchema = z.object({
    nama: z.string().min(3),
    jenisKelamin: z.string().min(1).max(1),
    noHp: z.string().min(10),
    tanggalLahir: z.string(),
    alamat: z.string().min(10),
    namaBank: z.string().min(3),
    noRekening: z.string().min(10),
    npwp: z.string().min(10),
    urlFotoKtp: z.string().url(),

    password: z.string().min(8),
    confirmPassword: z.string().min(8),
})