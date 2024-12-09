'use client';

import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUserData } from "@/hooks/useUserData";
import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { statuses } from './const';
import { Order } from './type';

type Category = {
    name: string;
    subcategories: string[];
};

const PemesananJasaModule = () => {
    const { userData, isAuthenticated } = useUserData();
    const [orders, setOrders] = useState<Order[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategoryFilter, setSubcategoryFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrders(userData.id);
        }
    }, [subcategoryFilter, statusFilter, isAuthenticated]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`/api/homepage`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();

            const groupedCategories = groupByCategory(result.data);
            setCategories(groupedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const groupByCategory = (data: any[]): Category[] => {
        const grouped: { [key: string]: Category } = {};
        data.forEach((item) => {
            if (!grouped[item.namakategori]) {
                grouped[item.namakategori] = { name: item.namakategori, subcategories: [] };
            }
            grouped[item.namakategori].subcategories.push(item.namasubkategori);
        });
        return Object.values(grouped);
    };

    const fetchOrders = async (userId: string) => {
        try {
            const response = await fetch(
                `/api/orders?userId=${userId}&subcategory=${subcategoryFilter}&status=${statusFilter}`
            );

            const result = await response.json();

            console.log("result", result);
            

            if (response.ok) {
                setOrders(result.data);
            } else {
                toast.error("Gagal memuat pesanan.");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Terjadi kesalahan saat memuat pesanan.");
        }
    };

    const cancelOrder = async (orderId: string) => {
        try {
            const response = await fetch("/api/orders/status", {
                method: "POST",
                body: JSON.stringify({ orderId }),
            });

            const result = await response.json();
            if (response.ok) {
                toast.success(result.message);
                fetchOrders(userData.id);
            } else {
                toast.error("Gagal membatalkan pesanan.");
            }
        } catch (error) {
            console.error("Error canceling order:", error);
            toast.error("Terjadi kesalahan saat membatalkan pesanan.");
        }
    };

    const filteredOrders = orders.filter((order) => {
        return (
            (subcategoryFilter === "" || order.subcategory === subcategoryFilter) &&
            (statusFilter === "" || order.status === statusFilter)
        );
    });
    
    const flatmapCategories = categories.flatMap((category) => category.subcategories);

    return (
        <div className="p-6 bg-gray-100 min-h-screen pt-40 px-10 md:px-32">
            <h2 className="text-center text-[#1ab35f] text-6xl font-normal font-['Newake'] tracking-[3px]">Pesanan Saya</h2>

            {/* Filters */}
            <div className="mt-12 flex justify-center gap-6 mb-8">
                <div className="w-80">
                    <Select
                        value={subcategoryFilter}
                        onValueChange={(val) => setSubcategoryFilter(val === "all" ? "" : val)}
                    >
                        <SelectTrigger className="px-4 py-3 bg-white border border-gray-300 rounded-xl">
                            <SelectValue placeholder="Pilih Subkategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem key={'all'} value="all">Semua Subkategori</SelectItem>
                                <SelectLabel>Subkategori</SelectLabel>
                                {flatmapCategories.map((subcategory, idx) => (
                                    <SelectItem key={idx} value={subcategory}>{subcategory}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-80">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="px-4 py-3 bg-white border border-gray-300 rounded-xl">
                            <SelectValue placeholder="Pilih Status Pesanan" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status Pesanan</SelectLabel>
                                <SelectItem value="all">Semua Status</SelectItem>
                                {statuses.map((status, idx) => (
                                    <SelectItem key={idx} value={status}>{status}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="bg-[#1ab35f] text-white font-bold">Subkategori Jasa</TableHead>
                            <TableHead className="bg-[#1ab35f] text-white font-bold">Sesi Layanan</TableHead>
                            <TableHead className="bg-[#1ab35f] text-white font-bold">Harga</TableHead>
                            <TableHead className="bg-[#1ab35f] text-white font-bold">Nama Pekerja</TableHead>
                            <TableHead className="bg-[#1ab35f] text-white font-bold">Status</TableHead>
                            <TableHead className="bg-[#1ab35f] text-white font-bold">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredOrders.map((order, index) => (
                            <TableRow key={order.id || index}>
                                <TableCell>{order.subcategory}</TableCell>
                                <TableCell>{order.session}</TableCell>
                                <TableCell>{order.price}</TableCell>
                                <TableCell>{order.workerName || "Belum Ditentukan"}</TableCell>
                                <TableCell>{order.status}</TableCell>
                                <TableCell>
                                    {order.status === "Menunggu Pembayaran" || order.status === "Mencari Pekerja Terdekat" ? (
                                        <Button
                                            onClick={() => cancelOrder(order.id)}
                                            className="bg-white text-[#f17474] border border-[#ffcdcd] px-5 py-2 rounded-xl"
                                        >
                                            Batalkan
                                        </Button>
                                    ) : order.status === "Pesanan Selesai" ? (
                                        <Button
                                            className="bg-white text-[#1ab35f] border border-[#b8e7cd] px-5 py-2 rounded-xl"
                                        >
                                            Buat Testimoni
                                        </Button>
                                    ) : null}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default PemesananJasaModule;
