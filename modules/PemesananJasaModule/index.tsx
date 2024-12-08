'use client';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { dummyOrders, statuses } from './const';
import { createTestimonySchema, Order } from './type';

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

    const filteredOrders = orders.filter(order => {
        return (
            (subcategoryFilter === "" || order.subcategory === subcategoryFilter) &&
            (statusFilter === "" || order.status === statusFilter)
        );
    });

    const form = useForm<z.infer<typeof createTestimonySchema>>({
        resolver: zodResolver(createTestimonySchema)
    });

    const onSubmit = (data: z.infer<typeof createTestimonySchema>) => {
        console.log(data);
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen pt-40 px-10 md:px-32">
            <h2 className="text-center text-[#1ab35f] text-6xl font-normal font-['Newake'] tracking-[3px]">Pesanan Saya</h2>

            {/* Gap between header and dropdown filters */}
            <div className="mt-12 flex justify-center gap-6 mb-8">
                <div className="w-80">
                    <Select value={subcategoryFilter} onValueChange={setSubcategoryFilter}>
                        <SelectTrigger className="px-4 py-3 bg-white border border-gray-300 rounded-xl">
                            <SelectValue placeholder="Pilih Subkategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Subkategori</SelectLabel>
                                <SelectItem value="Konsultasi Bisnis">Konsultasi Bisnis</SelectItem>
                                <SelectItem value="Konsultasi Keuangan">Konsultasi Keuangan</SelectItem>
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
                                            className="bg-white text-[#f17474] border border-[#ffcdcd] px-5 py-2 rounded-xl"
                                        >
                                            Batalkan
                                        </Button>
                                    ) : order.status === "Pesanan Selesai" ? (
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button className="bg-white text-[#1ab35f] border border-[#b8e7cd] px-5 py-2 rounded-xl">
                                                    Buat Testimoni
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>Buat Testimoni</DialogTitle>
                                                <DialogDescription>Berikan rating dan komentar Anda tentang layanan ini</DialogDescription>
                                                <Form {...form}>
                                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                                        {/* Rating Field */}
                                                        <FormField
                                                            control={form.control}
                                                            name="rating"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Rating</FormLabel>
                                                                    <FormControl>
                                                                        <Select
                                                                            onValueChange={(value) => field.onChange(Number(value))}
                                                                            value={field.value?.toString()}
                                                                        >
                                                                            <SelectTrigger className="p-2 border rounded-md w-full">
                                                                                <SelectValue placeholder="Pilih Rating" />
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
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        {/* Comment Field */}
                                                        <FormField
                                                            control={form.control}
                                                            name="comment"
                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <FormLabel>Komentar</FormLabel>
                                                                    <FormControl>
                                                                        <Textarea
                                                                            rows={4}
                                                                            placeholder="Tulis komentar Anda ..."
                                                                            {...field}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            )}
                                                        />

                                                        <div className="flex justify-end gap-2">
                                                            <DialogClose asChild>
                                                                <Button className="bg-red-500 text-white px-5 py-2 rounded-xl">Batal</Button>
                                                            </DialogClose>
                                                            <Button type="submit" className="bg-green-500 text-white px-5 py-2 rounded-xl">
                                                                Submit
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </Form>
                                            </DialogContent>
                                        </Dialog>
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