'use client';

import React, { useState, useEffect } from 'react';
import ModalTestimoni from '@/modules/PemesananJasaModule/elements/ModalTestimoni'; 

type Order = {
    subcategory: string;
    session: string;
    price: string;
    workerName: string;
    status: string;
};

type Testimonial = {
    rating: number;
    comment: string;
    workerName: string;
};

const statuses = ["Menunggu Pembayaran", "Mencari Pekerja Terdekat", "Pesanan Selesai", "Pesanan Dibatalkan"];

const PemesananJasaModule = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [subcategoryFilter, setSubcategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrderIndex, setSelectedOrderIndex] = useState<number | null>(null);

    useEffect(() => {
        // Hardcoded order data for testing purposes
        const hardcodedOrders: Order[] = [
            { subcategory: "Konsultasi Bisnis", session: "Sesi 1", price: "Rp 1.000.000", workerName: "John Doe", status: "Pesanan Selesai" },
            { subcategory: "Konsultasi Bisnis", session: "Sesi 2", price: "Rp 500.000", workerName: "Jane Smith", status: "Pesanan Selesai" },
            { subcategory: "Konsultasi Keuangan", session: "Sesi 1", price: "Rp 750.000", workerName: "Alex Johnson", status: "Pesanan Dibatalkan" },
            { subcategory: "Konsultasi Keuangan", session: "Sesi 2", price: "Rp 1.200.000", workerName: "Emily Davis", status: "Menunggu Pembayaran" }
        ];

        setOrders(hardcodedOrders);
        setFilteredOrders(hardcodedOrders); // Initialize filtered orders
    }, []);

    const handleCancelOrder = (index: number) => {
        const updatedOrders = [...orders];
        updatedOrders[index].status = "Pesanan Dibatalkan";
        setOrders(updatedOrders);
        setFilteredOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    const handleCreateTestimonial = (index: number) => {
        setSelectedOrderIndex(index); // Store which order is selected for testimonial
        setShowModal(true); // Show the modal
    };

    const handleSubmitTestimonial = (rating: number, comment: string) => {
        if (selectedOrderIndex !== null) {
            const newTestimonial = {
                rating,
                comment,
                workerName: orders[selectedOrderIndex].workerName
            };
            setTestimonials([...testimonials, newTestimonial]);
            setShowModal(false); // Close the modal
        }
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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="font-bold text-xl mb-4">Pesanan Jasa</h2>

            {/* Filter Section */}
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

                <button onClick={applyFilters} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                    Search
                </button>
            </div>

            {/* Orders List */}
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
                            {order.status === "Pesanan Selesai" ? (
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
            
            {/* Modal Testimoni */}
            <ModalTestimoni
                isOpen={showModal}
                closeModal={() => setShowModal(false)}
            />
        </div>
    );
};

export default PemesananJasaModule;
