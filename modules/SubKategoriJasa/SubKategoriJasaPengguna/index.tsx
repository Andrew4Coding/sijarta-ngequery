'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { subcategoryData, testimonials, workers } from '../const';
import { Session } from '../type';
import { useUserData } from "@/lib/useUserData";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const SubKategoriJasaPengguna = ({
    subCategory
}: {
    subCategory: string
}) => {
    const router = useRouter();
    const subcategoryInfo = subcategoryData[subCategory]?.info || { description: "", sessions: [] };
    const category = subcategoryData[subCategory]?.category || 'Kategori Tidak Ditemukan';

    const [newOrder, setNewOrder] = useState({
        date: new Date().toLocaleDateString(),
        discountCode: "",
        total: 0,
        paymentMethod: "",
        status: "Menunggu Pembayaran"
    });

    const handlePesanClick = (session: Session) => {
        setNewOrder({
            ...newOrder,
            total: session.price,
        });
    };

    const handleDiscountChange = (discountCode: string, session: Session) => {

        let discountValue = 0;

        if (!session) {
            return;
        }

        const sessionPrice = session.price;

        // Validasi diskon
        if (discountCode === "PROMO10") {
            discountValue = sessionPrice * 0.1; // Diskon 10%
        } else if (discountCode === "PROMO20") {
            discountValue = sessionPrice * 0.2; // Diskon 20%
        } else {
            discountValue = 0; // Diskon tidak valid
        }

        const totalPrice = sessionPrice - discountValue;

        // Gunakan fungsi updater untuk memperbarui state secara aman
        setNewOrder((prevOrder) => ({
            ...prevOrder,
            discountCode,
            total: totalPrice > 0 ? totalPrice : 0, 
        }));
    };

    const handleOrderSubmit = () => {
        router.push('/pemesanan-jasa');
    };   
    const { userData, role } = useUserData();
    return (
        <main className="flex flex-col items-center py-40 px-10 md:px-32 bg-gray-100 min-h-screen ">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6">
                <div className="mb-4 flex flex-col md:flex-row gap-5">
                    <div className="border p-2 rounded-md w-full text-center font-semibold bg-gray-100">{subCategory}</div>
                    <div className="border p-2 rounded-md w-full text-center font-semibold bg-gray-100">{category}</div>
                </div>

                <div
                    className='border p-2 rounded-md w-full mb-4 text-center bg-white'
                >
                    {subcategoryInfo.description}
                </div>

                <div className="border-t pt-4">
                    <h2 className="font-bold mb-2">Pilihan Sesi Layanan</h2>
                    {subcategoryInfo.sessions.map((session: Session, index: number) => (
                        <div key={index} className="flex items-center justify-between border rounded-md overflow-hidden bg-white p-5">
                            <div className='flex flex-col w-[250px]'>
                                <span className="font-medium">{session.name}</span>
                                <span className=" font-semibold">{session.price}</span>
                            </div>
                            <Dialog
                                key={index}
                            >
                                <DialogTrigger>
                                    <Button
                                        onClick={() => {
                                            handlePesanClick(session);
                                        }}
                                        variant={'secondary'}>Pesan</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="text-center">Pesan Jasa</DialogTitle>
                                    </DialogHeader>

                                    <div>
                                        <label className="block mb-2">Tanggal Pemesanan:</label>
                                        <Input
                                            label='Tanggal Pemesanan'
                                            type="text" value={newOrder.date} disabled className="border p-2 rounded-md w-full mb-4" />
                                        <label className="block mb-2">Diskon:</label>
                                        <Input
                                            label="Kode Diskon"
                                            type="text"
                                            placeholder="Kode Diskon"
                                            value={newOrder.discountCode}
                                            onChange={(e) => handleDiscountChange(e.target.value, session)}
                                            className="border p-2 rounded-md w-full mb-4"
                                        />
                                        <label className="block mb-2">Total Pembayaran:</label>
                                        <Input
                                            label="Total Pembayaran"
                                            type="text" value={newOrder.total} disabled className="border p-2 rounded-md w-full mb-4" />
                                        <label className="block mb-2">Metode Pembayaran:</label>
                                        <Select onValueChange={(value) => setNewOrder({ ...newOrder, paymentMethod: value })}>
                                            <SelectTrigger className="border p-2 rounded-md w-full mb-4">
                                                <SelectValue placeholder="Pilih Metode ..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Metode Pembayaran</SelectLabel>
                                                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                                                    <SelectItem value="MyPay">MyPay</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <Button onClick={handleOrderSubmit}
                                            className='w-full'
                                        >
                                            Pesan Jasa
                                        </Button>
                                    </div>
                                </DialogContent>

                            </Dialog>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4 mt-4">
                    <h2 className="font-bold mb-2">Pekerja</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {workers.map((worker, index) => (
                            <Dialog
                                key={index}
                            >
                                <DialogTrigger
                                    className="p-4 border rounded-md bg-gray-50 hover:bg-gray-200 duration-300"
                                >
                                    <Image
                                        src={worker.image}
                                        alt={worker.name}
                                        height={200}
                                        width={200}
                                        className="w-full h-20 object-cover rounded-md mb-2"
                                    />
                                    <p className="text-center font-medium">{worker.name}</p>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="text-center">Profil Pekerja</DialogTitle>
                                    </DialogHeader>
                                    <div className="bg-white p-6 rounded-lg ">
                                        <img
                                            src={worker.image}
                                            alt={`Foto ${worker.name}`}
                                            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                                        />
                                        <div className='grid grid-cols-2 gap-5 my-5'>
                                            <p className='font-semibold'>Nama</p>
                                            <p>{worker.name}</p>
                                            <p className='font-semibold'>Rating</p>
                                            <p>{worker.rating}/5</p>
                                            <p className='font-semibold'>Jumlah Pesanan Selesai</p>
                                            <p>{worker.completedOrders}</p>
                                            <p className='font-semibold'>No HP</p>
                                            <p>{worker.phone}</p>
                                            <p className='font-semibold'>Tanggal Lahir</p>
                                            <p>{worker.birthDate}</p>
                                            <p className='font-semibold'>Alamat</p>
                                            <p>{worker.address}</p>

                                        </div>
                                        <DialogClose className='w-full'>
                                            <Button className='w-full' variant={'destructive'}>Tutup</Button>
                                        </DialogClose>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6 mt-8">
                <h2 className="font-bold mb-4">Testimoni</h2>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="border rounded-md p-4 mb-4 bg-gray-50">
                        <div className="flex flex-wrap gap-2 mb-2">
                            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold w-fit">
                                {testimonial.workerName}
                            </span>
                            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold w-fit">
                                Rating: {testimonial.rating}/5
                            </span>
                        </div>
                        <p className="font-medium">{testimonial.customerName}</p>
                        <p className="text-gray-600">{testimonial.review}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default SubKategoriJasaPengguna;
