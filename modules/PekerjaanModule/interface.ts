export interface PekerjaanCardProps {
  id: string;
  assignner: string;
  subCategory: string;
  sesi: string;
  createdAt: Date;
  price: number;
}

export type status =
  | "Menunggu Pekerja Berangkat"
  | "Tiba Di Lokasi"
  | "Melakukan Pelayanan Jasa"
  | "Selesai"
  | "Dibatalkan";

export interface StatusPekerjaanProps extends PekerjaanCardProps {
  status: status;
}

export interface subKategoriInterface {
  id: string;
  namaKategori: string;
  subKategori: string[];
}