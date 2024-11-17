'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

type Order = {
    subcategory: string;
    session: string;
    price: string;
    workerName: string;
    status: string;
};

const statuses = ["Menunggu Pembayaran", "Mencari Pekerja Terdekat", "Pesanan Selesai", "Pesanan Dibatalkan"];

// Dummy data
const dummyOrders: Order[] = [
    { subcategory: "Konsultasi Bisnis", session: "1 Jam", price: "Rp 150.000", workerName: "Budi", status: "Menunggu Pembayaran" },
    { subcategory: "Konsultasi Keuangan", session: "30 Menit", price: "Rp 75.000", workerName: "Susi", status: "Mencari Pekerja Terdekat" },
    { subcategory: "Konsultasi Bisnis", session: "2 Jam", price: "Rp 300.000", workerName: "Andi", status: "Pesanan Selesai" },
    { subcategory: "Konsultasi Keuangan", session: "1 Jam", price: "Rp 150.000", workerName: "Rina", status: "Pesanan Dibatalkan" },
];

const PemesananJasaModule = () => {
    const [orders, setOrders] = useState<Order[]>(dummyOrders);
    const [subcategoryFilter, setSubcategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

    const handleCancelOrder = (index: number) => {
        const updatedOrders = [...orders];
        updatedOrders[index].status = "Pesanan Dibatalkan";
        setOrders(updatedOrders);
    };

    const handleCreateTestimonial = (order: Order) => {
        setCurrentOrder(order);
        setOpenDialog(true);
    };

    const filteredOrders = orders.filter(order => {
        return (
            (subcategoryFilter === "" || order.subcategory === subcategoryFilter) &&
            (statusFilter === "" || order.status === statusFilter)
        );
    });

    return (
        <div className="p-6 bg-gray-100 min-h-screen pt-40 px-10 md:px-32">
            <h2 className="font-bold text-xl mb-4">Pesanan Jasa</h2>

            {/* Bagian Filter */}
            <div className="flex gap-4 mb-4">
                <select
                    value={subcategoryFilter}
                    onChange={(e) => setSubcategoryFilter(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">Subkategori</option>
                    <option value="Konsultasi Bisnis">Konsultasi Bisnis</option>
                    <option value="Konsultasi Keuangan">Konsultasi Keuangan</option>
                </select>

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">Status Pesanan</option>
                    {statuses.map((status, idx) => (
                        <option key={idx} value={status}>{status}</option>
                    ))}
                </select>
            </div>

            {/* Daftar Pesanan */}
            {filteredOrders.map((order, index) => (
                <div key={index} className="border p-4 mb-2 rounded-lg bg-white shadow-sm">
                    <div className="grid grid-cols-6 gap-2 text-center">
                        <div>
                            <p><strong>Subkategori Jasa:</strong></p>
                            <p>{order.subcategory}</p>
                        </div>
                        <div>
                            <p><strong>Sesi Layanan:</strong></p>
                            <p>{order.session}</p>
                        </div>
                        <div>
                            <p><strong>Harga:</strong></p>
                            <p>{order.price}</p>
                        </div>
                        <div>
                            <p><strong>Nama Pekerja:</strong></p>
                            <p>{order.workerName || "Belum Ditentukan"}</p>
                        </div>
                        <div>
                            <p><strong>Status:</strong></p>
                            <p>{order.status}</p>
                        </div>
                        <div className="flex items-center justify-center">
                            {order.status === "Menunggu Pembayaran" || order.status === "Mencari Pekerja Terdekat" ? (
                                <button
                                    onClick={() => handleCancelOrder(index)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                                >
                                    Batalkan
                                </button>
                            ) : order.status === "Pesanan Selesai" ? (
                                <button
                                    onClick={() => handleCreateTestimonial(order)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Buat Testimoni
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            ))}

            {/* Dialog for Testimonial */}
            {openDialog && currentOrder && (
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent>
                        <DialogTitle>Buat Testimoni</DialogTitle>
                        <DialogDescription>Berikan rating dan komentar Anda tentang layanan ini</DialogDescription>

                        {/* Form Testimonial */}
                        <div className="mb-4">
                            <label className="block mb-2">Rating:</label>
                            <select className="p-2 border rounded-md w-full">
                                {[...Array(10)].map((_, idx) => (
                                    <option key={idx} value={idx + 1}>{idx + 1}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-2">Komentar:</label>
                            <textarea
                                className="p-2 border rounded-md w-full"
                                rows={4}
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <DialogClose
                                className="px-4 py-2 bg-gray-500 text-white rounded-md"
                                onClick={() => setOpenDialog(false)}
                            >
                                Batal
                            </DialogClose>
                            <button
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                onClick={() => setOpenDialog(false)}
                            >
                                Submit
                            </button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default PemesananJasaModule;
