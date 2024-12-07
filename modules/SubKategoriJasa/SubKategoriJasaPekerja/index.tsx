'use client';

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { Session } from '../type';
import { subcategoryData, testimonials, workers } from '../const';

export const SubKategoriJasaPekerja = ({ subCategory }: { subCategory: string }) => {
    const subcategoryInfo = subcategoryData[subCategory]?.info || {
        description: "Deskripsi tidak tersedia untuk subkategori ini.",
        sessions: [],
    };

    const category = subcategoryData[subCategory]?.category || "Kategori Tidak Ditemukan";
    const [isJoined, setIsJoined] = useState(false);

    const handleJoin = () => {
        setIsJoined(true);
    };

    return (
        <main className="bg-[#f8f8f8] min-h-screen pt-[132px] pb-[32px] px-6">
            {/* Header Section */}
            <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7 mb-10">
                <div className="flex">
                    <div className="flex-1 h-[46px] bg-[#1ab35f] text-center text-white text-xl font-bold rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center">
                        {subCategory}
                    </div>
                    <div className="flex-1 h-[46px] text-center text-[#1ab35f] text-xl font-bold rounded-tr-[20px] rounded-br-[20px] border border-[#d9d9d9] flex items-center justify-center">
                        {category}
                    </div>
                </div>
                <p className="text-black text-base font-medium mt-5">
                    {subcategoryInfo.description || "Deskripsi tidak tersedia."}
                </p>
            </div>

            {/* Combined Section */}
            <div className="max-w-3xl mx-auto bg-white rounded-[20px] border border-[#d9d9d9] p-7">
                {/* Service Session Section */}
                <div>
                    <h2 className="text-[#1ab35f] text-[28px] font-bold">Pilihan Sesi Layanan</h2>
                    {subcategoryInfo.sessions.map((session: Session, index: number) => (
                        <div key={index} className="flex justify-between items-center bg-[#e8f7ef] rounded-xl p-5 mb-4">
                            <div>
                                <h3 className="text-black text-xl font-bold">{session.name}</h3>
                                <p className="text-black text-xl font-medium">{`Rp ${session.price.toLocaleString('id-ID')}`}</p>
                            </div>
                        </div>
                    ))}
                    {!isJoined && (
                        <Button onClick={handleJoin} className="w-full mt-4 px-5 py-3 bg-[#1ab35f] text-white text-2xl rounded-xl">
                            Bergabung
                        </Button>
                    )}
                </div>

                {/* Workers Section */}
                <div className="mt-4">
                    <h2 className="text-[#1ab35f] text-[28px] font-bold">Pekerja</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                        {workers.map((worker, index) => (
                            <Dialog key={index}>
                                <DialogTrigger asChild>
                                    <div className="p-4 bg-[#e8f7ef] rounded-xl text-center hover:bg-[#d7f0e3] transition cursor-pointer border border-[#d9d9d9]">
                                        <div className="w-[84px] h-[84px] bg-white rounded-xl border border-[#d9d9d9] mb-3 mx-auto overflow-hidden">
                                            <Image
                                                src={worker.image}
                                                alt={`Foto ${worker.name}`}
                                                width={84}
                                                height={84}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <p className="text-black text-xl font-medium">{worker.name}</p>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="w-[682px] p-8 bg-white rounded-[20px] border border-[#d9d9d9] flex flex-col gap-8">
                                    <DialogHeader className="w-full text-center">
                                        <DialogTitle className="text-center text-[#1ab35f] text-2xl font-bold">Profil Pekerja</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col items-center">
                                        <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-[#f5f5f5] flex items-center justify-center mb-6">
                                            <Image
                                                src={worker.image}
                                                alt={`Foto ${worker.name}`}
                                                className="w-full h-full object-cover"
                                                width={120}
                                                height={120}
                                            />
                                        </div>
                                        <div className="w-full flex justify-between items-start">
                                            <div className="flex flex-col gap-7 text-black text-xl font-bold">
                                                <p>Nama</p>
                                                <p>Rating</p>
                                                <p>Jumlah Pesanan Selesai</p>
                                                <p>No HP</p>
                                                <p>Tanggal Lahir</p>
                                                <p>Alamat</p>
                                            </div>
                                            <div className="flex flex-col gap-7 text-black text-xl font-normal">
                                                <p>{worker.name}</p>
                                                <p>{worker.rating}/5</p>
                                                <p>{worker.completedOrders}</p>
                                                <p>{worker.phone}</p>
                                                <p>{worker.birthDate}</p>
                                                <p>{worker.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogClose asChild>
                                        <Button className="w-full px-5 py-3 bg-[#1ab35f] text-white text-2xl rounded-xl">
                                            Tutup
                                        </Button>
                                    </DialogClose>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
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

export default SubKategoriJasaPekerja;
