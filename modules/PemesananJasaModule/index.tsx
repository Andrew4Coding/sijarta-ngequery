'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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
    const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

    const handleCancelOrder = (index: number) => {
        const updatedOrders = [...orders];
        updatedOrders[index].status = "Pesanan Dibatalkan";
        setOrders(updatedOrders);
    };

    const handleCreateTestimonial = (order: Order) => {
        setCurrentOrder(order);
    };

    const filteredOrders = orders.filter(order => {
        return (
            (subcategoryFilter === "" || order.subcategory === subcategoryFilter) &&
            (statusFilter === "" || order.status === statusFilter)
        );
    });

    return (
        <div className="p-6 bg-gray-100 min-h-screen pt-40 px-10 md:px-32 font-dmsans">
            <h2 className="font-bold text-3xl mb-4">Pesanan Jasa</h2>

            {/* Bagian Filter */}
            <div className="flex gap-4 mb-4 max-w-md">
                <Select value={subcategoryFilter} onValueChange={setSubcategoryFilter}>
                    <SelectTrigger className="p-2 border rounded-md">
                        <SelectValue placeholder="Pilih Subkategori ..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Subkategori</SelectLabel>
                            <SelectItem value="Konsultasi Bisnis">Konsultasi Bisnis</SelectItem>
                            <SelectItem value="Konsultasi Keuangan">Konsultasi Keuangan</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="p-2 border rounded-md">
                        <SelectValue placeholder="Pilih Status Pesanan ... "></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Status Pesanan</SelectLabel>
                            {statuses.map((status, idx) => (
                                <SelectItem key={idx} value={status}>{status}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Daftar Pesanan */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Subkategori Jasa</TableHead>
                        <TableHead>Sesi Layanan</TableHead>
                        <TableHead>Harga</TableHead>
                        <TableHead>Nama Pekerja</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredOrders.map((order, index) => (
                        <TableRow key={index}>
                            <TableCell>{order.subcategory}</TableCell>
                            <TableCell>{order.session}</TableCell>
                            <TableCell>{order.price}</TableCell>
                            <TableCell>{order.workerName || "Belum Ditentukan"}</TableCell>
                            <TableCell>{order.status}</TableCell>
                            <TableCell>
                                {order.status === "Menunggu Pembayaran" || order.status === "Mencari Pekerja Terdekat" ? (
                                    <Button
                                        onClick={() => handleCancelOrder(index)}
                                        variant="destructive"
                                    >
                                        Batalkan
                                    </Button>
                                ) : order.status === "Pesanan Selesai" ? (
                                    <Dialog>
                                        <DialogTrigger>
                                            <Button
                                                onClick={() => handleCreateTestimonial(order)}
                                            >
                                                Buat Testimoni
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle>Buat Testimoni</DialogTitle>
                                            <DialogDescription>Berikan rating dan komentar Anda tentang layanan ini</DialogDescription>

                                            {/* Form Testimonial */}
                                            <div className="mb-4">
                                                <Label>Rating</Label>
                                                <Select>
                                                    <SelectTrigger className="p-2 border rounded-md w-full">
                                                        <SelectValue placeholder="Pilih Rating ..." />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Rating</SelectLabel>
                                                            {[...Array(10)].map((_, idx) => (
                                                                <SelectItem key={idx} value={(idx + 1).toString()}>{idx + 1}</SelectItem>
                                                            ))}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="mb-4">
                                                <Label>Komentar</Label>
                                                <Textarea
                                                    rows={4}
                                                />
                                            </div>

                                            <div className="flex justify-end gap-2">
                                                <DialogClose
                                                    className='flex gap-2'
                                                >
                                                    <Button variant="destructive">
                                                        Batal
                                                    </Button>
                                                    <Button>
                                                        Submit
                                                    </Button>
                                                </DialogClose>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                ) : null}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default PemesananJasaModule;
