import { z } from 'zod';

export const LoginSchema = z.object({
    nomorTelepon: z.string().min(10),
    password: z.string().min(8),
})


export const RegisterAsUserSchema = z.object({
    nama: z.string().min(3, "Nama minimal 3 karakter"),
    jenisKelamin: z.string().min(1, "Jenis kelamin diperlukan").max(1, "Jenis kelamin harus 1 karakter").refine((data) => data === "L" || data === "P", {
        message: "Jenis kelamin harus L atau P",
    }),
    noHp: z.string().min(10, "Nomor HP minimal 10 karakter"),
    tanggalLahir: z.string().nonempty("Tanggal lahir diperlukan"),
    alamat: z.string().min(10, "Alamat minimal 10 karakter"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password harus sama",
    path: ["confirmPassword"],  // The error will appear under 'confirmPassword'
});

export const RegisterAsPekerjaSchema = z.object({
    nama: z.string().min(3, "Nama minimal 3 karakter"),
    jenisKelamin: z.string().min(1, "Jenis kelamin diperlukan").max(1),
    noHp: z.string().min(10, "Nomor HP minimal 10 karakter"),
    tanggalLahir: z.string().nonempty("Tanggal lahir diperlukan"),
    alamat: z.string().min(10, "Alamat minimal 10 karakter"),
    namaBank: z.string().min(3, "Nama bank minimal 3 karakter"),
    noRekening: z.string().min(10, "Nomor rekening minimal 10 karakter"),
    npwp: z.string().min(10, "NPWP minimal 10 karakter"),
    urlFotoKtp: z.string().url("URL foto KTP tidak valid"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirmPassword: z.string().min(8, "Konfirmasi password minimal 8 karakter"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password harus sama",
    path: ["confirmPassword"],
});