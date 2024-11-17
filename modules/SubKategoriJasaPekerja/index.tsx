'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { subcategoryData } from '../SubKategoriJasaPengguna/const';

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

export const SubKategoriJasaPekerja = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([
        {
            workerName: "Pekerja A",
            rating: 2,
            customerName: "Pelanggan 1",
            review: "Sangat puas dengan pelayanannya! Pekerja sangat profesional dan ramah.",
        },
        {
            workerName: "Pekerja B",
            rating: 4,
            customerName: "Pelanggan 2",
            review: "Pelayanan cukup memuaskan, hasil sesuai dengan harapan.",
        },
        {
            workerName: "Pekerja C",
            rating: 5,
            customerName: "Pelanggan 3",
            review: "Luar biasa! Hasil pekerjaan sangat memuaskan dan cepat.",
        },
    ]);


    const searchParams = useSearchParams();
    const subcategory = searchParams.get('subcategory') || 'Subkategori Tidak Ditemukan';

    const subcategoryInfo = subcategoryData[subcategory]?.info || {
        description: "Deskripsi tidak tersedia untuk subkategori ini.",
        sessions: []
    };
    const category = subcategoryData[subcategory]?.category || 'Kategori Tidak Ditemukan';

    const [isJoined, setIsJoined] = useState(false);

    const handleJoin = () => {
        setIsJoined(true);
    };

    return (
        <main className="flex flex-col items-center py-10 px-5 bg-gray-100 min-h-screen">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6">
                <div className="flex justify-between space-x-12 mb-4">
                    <input
                        type="text"
                        value={subcategory}
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

                <textarea
                    value={subcategoryInfo.description}
                    className="border p-2 rounded-md w-full mb-4 text-center bg-white"
                    rows={3}
                    disabled
                />

                <div className="border-t pt-4">
                    <h2 className="font-bold mb-2">Pilihan Sesi Layanan</h2>
                    {subcategoryInfo.sessions.map((session: Session, index: number) => (
                        <div key={index} className="flex items-center border mb-2 rounded-md overflow-hidden bg-white">
                            <span className="w-1/3 border-r text-center font-medium p-2">{session.name}</span>
                            <span className="w-1/5 text-center font-semibold p-2 mr-4">{session.price}</span>
                        </div>
                    ))}
                </div>

                {!isJoined && (
                    <button
                        onClick={handleJoin}
                        className="mt-4 w-full px-4 py-2 text-center font-semibold bg-blue-500 text-white rounded-md"
                    >
                        Bergabung
                    </button>
                )}
            </div>

            {/* Testimonials Section */}
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