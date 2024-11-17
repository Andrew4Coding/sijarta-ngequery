'use client';

import React, { useState, useEffect } from 'react';

type Order = {
    subcategory: string;
    session: string;
    price: string;
    workerName: string;
    status: string;
};

const statuses = ["Menunggu Pembayaran", "Mencari Pekerja Terdekat", "Pesanan Selesai", "Pesanan Dibatalkan"];

const PemesananJasaModule = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [subcategoryFilter, setSubcategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        // Ambil data pesanan dari localStorage atau API
        const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(savedOrders);
        setFilteredOrders(savedOrders); // Inisialisasi filteredOrders
    }, []);

    const handleCancelOrder = (index: number) => {
        const updatedOrders = [...orders];
        updatedOrders[index].status = "Pesanan Dibatalkan";
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    const handleCreateTestimonial = (index: number) => {
        // Implementasikan logika pembuatan testimoni
    };

    const applyFilters = () => {
        const filtered = orders.filter(order => {
            return (
                (subcategoryFilter === "" || order.subcategory === subcategoryFilter) &&
                (statusFilter === "" || order.status === statusFilter)
            );
        });
        setFilteredOrders(filtered);
    };

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
                    {/* Tambahkan subkategori lainnya jika diperlukan */}
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

                <button onClick={applyFilters} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Search
                </button>
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
                                    onClick={() => handleCreateTestimonial(index)}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                                >
                                    Buat Testimoni
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PemesananJasaModule;
