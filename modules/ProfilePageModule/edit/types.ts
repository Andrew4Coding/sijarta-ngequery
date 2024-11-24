import z from "zod";

export const EditProfilePelangganSchema = z.object({
    Nama: z.string().nonempty("Nama is required"),
    Level: z.string().nonempty("Level is required"),
    JenisKelamin: z.string().nonempty("Jenis Kelamin is required"),
    NoHP: z.string().nonempty("No HP is required").regex(/^\d+$/, "No HP must be a number"),
    TanggalLahir: z.string().nonempty("Tanggal Lahir is required").regex(/^\d{2} \w+ \d{4}$/, "Tanggal Lahir must be in the format DD MMMM YYYY"),
    Alamat: z.string().nonempty("Alamat is required"),
    SaldoMPAY: z.string().nonempty("Saldo MPAY is required").regex(/^Rp \d+(\.\d{3})*$/, "Saldo MPAY must be in the format Rp X.XXX.XXX")
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
    kategorijasa: z.array(z.string())
});

export type EditPekerjaProfileType = {
    nama: string;
    jeniskelamin: string;
    nohp: string;
    tgllahir: string;
    alamat: string;
    namabank: string;
    nomorrekening: string;
    npwp: string;
    kategorijasa: string[];
}

export type EditPelangganProfileType = {
    nama: string;
    jeniskelamin: string;
    nohp: string;
    tgllahir: string;
    alamat: string;
}