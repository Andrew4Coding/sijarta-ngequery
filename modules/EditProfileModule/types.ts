import z from "zod";

export const EditProfilePelangganSchema = z.object({
    nama: z.string().nonempty("Nama is required"),
    jeniskelamin: z.string().nonempty("Jenis Kelamin is required"),
    nohp: z.string().nonempty("No HP is required").regex(/^\d+$/, "No HP must be a number"),
    tanggallahir: z.string().nonempty("Tanggal Lahir is required"),
    alamat: z.string().nonempty("Alamat is required"),
});

export const EditProfilePekerjaSchema = z.object({
    nama: z.string().nonempty("Nama is required"),
    jeniskelamin: z.string().nonempty("Jenis Kelamin is required"),
    nohp: z.string().nonempty("No HP is required").regex(/^\d+$/, "No HP must be a number"),
    tanggallahir: z.string().nonempty("Tanggal Lahir is required"),
    alamat: z.string().nonempty("Alamat is required"),
    namabank: z.string().nonempty("Nama Bank is required"),
    nomorrekening: z.string().nonempty("No Rekening is required").regex(/^\d+$/, "No Rekening must be a number"),
    npwp: z.string().nonempty("NPWP is required").regex(/^\d+$/, "NPWP must be a number"),
    filefoto: z.instanceof(File).nullable(),
    linkfoto: z.string().nullable(),
});