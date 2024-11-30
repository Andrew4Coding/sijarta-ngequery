'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { subcategoryData, testimonials, workers } from '../const';
import { Session } from '../type';
import { useUserData } from "@/hooks/useUserData";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const SubKategoriJasaPelanggan = ({
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
        <main className="bg-[#f8f8f8] min-h-screen pt-[132px] pb-[32px] px-6">
            {/* Header Section */}
            <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7 mb-10">
                <div className="flex">
                    <div className="flex-1 h-[46px] bg-[#1ab35f] text-center text-white text-xl font-bold rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center">
                        Layanan Konsultasi
                    </div>
                    <div className="flex-1 h-[46px] text-center text-[#1ab35f] text-xl font-bold rounded-tr-[20px] rounded-br-[20px] border border-[#d9d9d9] flex items-center justify-center">
                        Konsultasi Bisnis
                    </div>
                </div>
                <p className="text-black text-base font-medium mt-5">
                    {subcategoryInfo.description || "Lorem ipsum dolor sit amet consectetur. Non vel convallis risus egestas quis ornare non enim velit."}
                </p>
            </div>

            {/* Service Session Section */}
            <div className="max-w-3xl mx-auto bg-white rounded-t-[20px] border border-[#d9d9d9] p-7">
                <h2 className="text-[#1ab35f] text-[28px] font-bold">Pilihan Sesi Layanan</h2>
                {subcategoryInfo.sessions.map((session: Session, index: number) => (
                    <div key={index} className="flex justify-between items-center bg-[#e8f7ef] rounded-xl p-5 mb-4">
                        <div>
                            <h3 className="text-black text-xl font-bold">{session.name}</h3>
                            <p className="text-black text-xl font-medium">{`Rp ${session.price.toLocaleString('id-ID')}`}</p>
                        </div>
                        <Dialog key={index}>
                            <DialogTrigger asChild>
                                <Button
                                    onClick={() => handlePesanClick(session)}
                                    className="px-5 py-3 bg-white text-black rounded-xl border border-[#d9d9d9]"
                                >
                                    Pesan
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-center">Pesan Jasa</DialogTitle>
                                </DialogHeader>
                                <div>
                                    <Input
                                        label="Tanggal Pemesanan"
                                        type="text"
                                        value={newOrder.date}
                                        disabled
                                        className="border p-2 rounded-md w-full mb-4"
                                    />
                                    <Input
                                        label="Kode Diskon"
                                        type="text"
                                        placeholder="Masukkan Kode Diskon"
                                        value={newOrder.discountCode}
                                        onChange={(e) => handleDiscountChange(e.target.value, session)}
                                        className="border p-2 rounded-md w-full mb-4"
                                    />
                                    <Input
                                        label="Total Pembayaran"
                                        type="text"
                                        value={newOrder.total}
                                        disabled
                                        className="border p-2 rounded-md w-full mb-4"
                                    />
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
                                    <Button onClick={handleOrderSubmit} className="w-full">
                                        Pesan Jasa
                                    </Button>
                                </div>
                            </DialogContent>

                        </Dialog>
                    </div>
                ))}
            </div>

            {/* Workers Section */}
            <div className="max-w-3xl mx-auto bg-white border border-[#d9d9d9] rounded-b-[20px] p-7">
                <h2 className="text-[#1ab35f] text-[28px] font-bold">Pekerja</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                    {workers.map((worker, index) => (
                        <Dialog key={index}>
                            {/* DialogTrigger harus ada di dalam Dialog */}
                            <DialogTrigger asChild>
                                <div className="p-4 bg-[#e8f7ef] rounded-xl text-center hover:bg-[#d7f0e3] transition cursor-pointer border border-[#d9d9d9]">
                                    <div className="w-[84px] h-[84px] bg-white rounded-xl border border-[#d9d9d9] mb-3 mx-auto"></div>
                                    <p className="text-black text-xl font-medium">{worker.name}</p>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-center">Profil Pekerja</DialogTitle>
                                </DialogHeader>
                                <div className="bg-white p-6 rounded-lg">
                                    <Image
                                        src={worker.image}
                                        alt={`Foto ${worker.name}`}
                                        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                                        width={128}
                                        height={128}
                                    />
                                    <div className="grid grid-cols-2 gap-5 my-5">
                                        <p className="font-semibold">Nama</p>
                                        <p>{worker.name}</p>
                                        <p className="font-semibold">Rating</p>
                                        <p>{worker.rating}/5</p>
                                        <p className="font-semibold">Jumlah Pesanan Selesai</p>
                                        <p>{worker.completedOrders}</p>
                                        <p className="font-semibold">No HP</p>
                                        <p>{worker.phone}</p>
                                        <p className="font-semibold">Tanggal Lahir</p>
                                        <p>{worker.birthDate}</p>
                                        <p className="font-semibold">Alamat</p>
                                        <p>{worker.address}</p>
                                    </div>
                                    <DialogClose asChild>
                                        <Button className="w-full" variant="destructive">Tutup</Button>
                                    </DialogClose>
                                </div>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>

            </div>

            {/* Testimonials Section */}
            <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7 mt-8">
                <h2 className="text-[#1ab35f] text-[28px] font-bold">Testimoni</h2>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-[#e8f7ef] rounded-xl p-5 mb-4">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-black text-xl font-bold">{testimonial.customerName}</p>
                            <div className="flex gap-3">
                                <div className="px-4 py-2 bg-white rounded-full border border-[#d9d9d9]">
                                    {testimonial.workerName}
                                </div>
                                <div className="px-4 py-2 bg-white rounded-full border border-[#d9d9d9]">
                                    {testimonial.rating}/5
                                </div>
                            </div>
                        </div>
                        <p className="text-black text-base font-medium">{testimonial.review}</p>
                        <p className="text-[#1ab35f] text-sm">{testimonial.date}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default SubKategoriJasaPelanggan;
