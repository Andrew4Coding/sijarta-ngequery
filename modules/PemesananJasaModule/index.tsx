'use client';

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
        <div className="p-6 bg-gray-100 min-h-screen pt-40 px-10 md:px-32 ">
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
                                            <Button>
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
                                                                        <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
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
                                                                <Button variant="destructive">Batal</Button>
                                                            </DialogClose>
                                                            <Button type="submit">Submit</Button>
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
    );
};

export default PemesananJasaModule;
