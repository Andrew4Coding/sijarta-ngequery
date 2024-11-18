import { Order } from "./type";

export const statuses = ["Menunggu Pembayaran", "Mencari Pekerja Terdekat", "Pesanan Selesai", "Pesanan Dibatalkan"];

export const dummyOrders: Order[] = [
    { subcategory: "Konsultasi Bisnis", session: "1 Jam", price: "Rp 150.000", workerName: "Budi", status: "Menunggu Pembayaran" },
    { subcategory: "Konsultasi Keuangan", session: "30 Menit", price: "Rp 75.000", workerName: "Susi", status: "Mencari Pekerja Terdekat" },
    { subcategory: "Konsultasi Bisnis", session: "2 Jam", price: "Rp 300.000", workerName: "Andi", status: "Pesanan Selesai" },
    { subcategory: "Konsultasi Keuangan", session: "1 Jam", price: "Rp 150.000", workerName: "Rina", status: "Pesanan Dibatalkan" },
];