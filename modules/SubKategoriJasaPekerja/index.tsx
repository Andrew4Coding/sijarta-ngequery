'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { subcategoryData } from '../SubKategoriJasaPengguna/const';

type Worker = {
    name: string;
    rating: number;
    completedOrders: number;
    phone: string;
    birthDate: string;
    address: string;
    image: string;
};

type Session = {
    name: string;
    price: string;
};

type Testimonial = {
    workerName: string;
    rating: number;
    customerName: string;
    review: string;
};

export const SubKategoriJasaPekerja = ({ subCategory }: { subCategory: string }) => {
    const router = useRouter();

    const workers: Worker[] = [
        {
            name: "Pekerja A",
            rating: 4.5,
            completedOrders: 20,
            phone: "08123456789",
            birthDate: "01/01/1990",
            address: "Jl. Contoh No. 1",
            image: "/images/pekerjaA.jpg",
        },
        {
            name: "Pekerja B",
            rating: 4.0,
            completedOrders: 15,
            phone: "08123456780",
            birthDate: "02/02/1991",
            address: "Jl. Contoh No. 2",
            image: "/images/pekerjaB.jpg",
        },
        {
            name: "Pekerja C",
            rating: 5.0,
            completedOrders: 30,
            phone: "08123456781",
            birthDate: "03/03/1989",
            address: "Jl. Contoh No. 3",
            image: "/images/pekerjaC.jpg",
        },
        {
            name: "Pekerja D",
            rating: 3.5,
            completedOrders: 10,
            phone: "08123456782",
            birthDate: "04/04/1992",
            address: "Jl. Contoh No. 4",
            image: "/images/pekerjaD.jpg",
        },
    ];

    const testimonials: Testimonial[] = [
        {
            workerName: "Pekerja A",
            rating: 5,
            customerName: "Pelanggan 1",
            review: "Layanan luar biasa, pekerja sangat profesional.",
        },
        {
            workerName: "Pekerja B",
            rating: 4,
            customerName: "Pelanggan 2",
            review: "Cukup memuaskan, hasil sesuai ekspektasi.",
        },
    ];

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
        <main className="flex flex-col items-center py-20 px-5 bg-gray-100 min-h-screen">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6">
                {/* Nama Subkategori dan Kategori */}
                <div className="flex justify-between space-x-12 mb-4">
                    <input
                        type="text"
                        value={subCategory}
                        className="border p-2 rounded-md w-1/2 text-center font-semibold bg-white"
                        disabled
                    />
                    <input
                        type="text"
                        value={category}
                        className="border p-2 rounded-md w-1/2 text-center font-semibold bg-white"
                        disabled
                    />
                </div>

                {/* Deskripsi */}
                <textarea
                    value={subcategoryInfo.description}
                    className="border p-2 rounded-md w-full mb-4 text-center bg-white"
                    rows={3}
                    disabled
                />

                {/* Sesi Layanan */}
                <div className="border-t pt-4">
                    <h2 className="font-bold mb-2">Pilihan Sesi Layanan</h2>
                    {subcategoryInfo.sessions.map((session: Session, index: number) => (
                        <div
                            key={index}
                            className="flex items-center border mb-2 rounded-md overflow-hidden bg-white"
                        >
                            <span className="w-1/3 border-r text-center font-medium p-2">
                                {session.name}
                            </span>
                            <span className="w-1/5 text-center font-semibold p-2 mr-4">
                                {session.price}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Tombol Bergabung */}
                {!isJoined && (
                    <button
                        onClick={handleJoin}
                        className="mt-4 w-full px-4 py-2 text-center font-semibold bg-gray-400 hover:bg-gray-500 text-white rounded-md"
                    >
                        Bergabung
                    </button>
                )}

                {/* Daftar Pekerja */}
                <div className="border-t pt-4 mt-4">
                    <h2 className="font-bold mb-2">Pekerja</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {workers.map((worker, index) => (
                            <button
                                key={index}
                                className="p-4 border rounded-md bg-gray-50 hover:bg-gray-200"
                                onClick={() => router.push(`/profil-pekerja/${worker.name}`)}
                            >
                                <img
                                    src={worker.image}
                                    alt={worker.name}
                                    className="w-full h-16 object-cover rounded-md mb-2"
                                />
                                <p className="text-center font-medium">{worker.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimoni */}
            <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6 mt-8">
                <h2 className="font-bold mb-4">Testimoni</h2>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="border rounded-md p-4 mb-4 bg-gray-50">
                        <div className="flex space-x-2 mb-2">
                            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
                                Pekerja yang direview: {testimonial.workerName}
                            </span>
                            <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold">
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

export default SubKategoriJasaPekerja;
