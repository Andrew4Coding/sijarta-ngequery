export interface UserType {
    id: string;
    nama?: string;
    jeniskelamin?: 'L' | 'P';
    nohp?: string;
    pwd?: string;
    tgllahir?: Date;
    alamat?: string;
    saldompay?: number;
}

export interface DiskonType {
    kode: string;
    potongan: number;
    mintrpemesanan: number;
}

export interface KategoriJasaType {
    id: string;
    namakategori?: string;
}

export interface KategoriTrMpayType {
    id: string;
    nama?: string;
}

export interface MetodeBayarType {
    id: string;
    nama: string;
}

export interface PekerjaType {
    id: string;
    namabank?: string;
    nomorrekening?: string;
    npwp?: string;
    linkfoto?: string;
    rating?: number;
    jumlahpesananaselesai?: number;
}

export interface PekerjaKategoriJasaType {
    pekerjaid: string;
    kategorijasaid: string;
}

export interface PelangganType {
    id: string;
    level?: string;
}

export interface PromoType {
    kode: string;
    tglakhirberlaku: Date;
}

export interface SesiLayananType {
    subkategoriid: string;
    sesi: number;
    harga?: number;
}

export interface StatusPesananType {
    id: string;
    nama: string;
}

export interface SubkategoriJasaType {
    id: string;
    namasubkategori?: string;
    deskripsi?: string;
    kategorijasaid?: string;
}

export interface TestimoniType {
    idtrpemesanan: string;
    tgl: Date;
    teks: string;
    rating: number;
}

export interface TrMpayType {
    id: string;
    userid?: string;
    tgl?: Date;
    nominal?: number;
    kategoriid?: string;
}

export interface TrPembelianVoucherType {
    id: string;
    tglawal: Date;
    tglakhir: Date;
    telahdigunakan: number;
    idpelanggan?: string;
    idvoucher?: string;
    idmetodebayar?: string;
}

export interface TrPemesananJasaType {
    id: string;
    tglpemesanan: Date;
    tglpekerjaan: Date;
    waktupekerjaan: Date;
    totalbiaya: number;
    idpelanggan?: string;
    idpekerja?: string;
    idkategorijasa?: string;
    sesi?: number;
    iddiskon?: string;
    idmetodebayar?: string;
}

export interface TrPemesananStatusType {
    idtrpemesanan: string;
    idstatus: string;
    tglwaktu: Date;
}

export interface VoucherType {
    kode: string;
    jmlhariberlaku: number;
    kuotapelangganan?: number;
    harga: number;
}