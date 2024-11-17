'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { subcategoryData } from './const';

type Session = {
    name: string;
    price: string;
};

export type SubcategoryInfo = {
    description: string;
    sessions: Session[];
};

type Testimonial = {
    workerName: string;
    rating: number;
    customerName: string;
    review: string;
};



export const SubKategoriJasaPengguna = ({
    subCategory
}: {
    subCategory: string
}) => {
    console.log(subCategory);
    const testimonials: Testimonial[] = [
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
    ];

    const router = useRouter();
    const subcategoryInfo = subcategoryData[subCategory]?.info || { description: "", sessions: [] };
    const category = subcategoryData[subCategory]?.category || 'Kategori Tidak Ditemukan';

    const [showModal, setShowModal] = useState(false);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [newOrder, setNewOrder] = useState({
        date: new Date().toLocaleDateString(),
        discountCode: "",
        total: "",
        paymentMethod: "",
        status: "Menunggu Pembayaran"
    });

    const handlePesanClick = (session: Session) => {
        setSelectedSession(session);
        setNewOrder({ ...newOrder, total: session.price });
        setShowModal(true);
    };

    const handleOrderSubmit = () => {
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const updatedOrders = [
            ...existingOrders,
            {
                subCategory,
                session: selectedSession ? selectedSession.name : "",
                price: selectedSession ? selectedSession.price : "",
                workerName: "", // Nama pekerja dapat diisi kemudian
                status: "Menunggu Pembayaran",
            },
        ];
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        setShowModal(false);
        router.push('/pemesanan-jasa');
    };

    return (
        <main className="flex flex-col items-center py-40 px-10 md:px-10 bg-gray-100 min-h-screen">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6">
                <div className="flex justify-between space-x-12 mb-4">
                    <input type="text" value={subCategory} disabled className="border p-2 rounded-md w-1/2 text-center font-semibold bg-white" />
                    <input type="text" value={category} disabled className="border p-2 rounded-md w-1/2 text-center font-semibold bg-white" />
                </div>

                <textarea value={subcategoryInfo.description} disabled className="border p-2 rounded-md w-full mb-4 text-center bg-white" rows={3} />

                <div className="border-t pt-4">
                    <h2 className="font-bold mb-2">Pilihan Sesi Layanan</h2>
                    {subcategoryInfo.sessions.map((session: Session, index: number) => (
                        <div key={index} className="flex items-center border mb-2 rounded-md overflow-hidden bg-white">
                            <span className="w-1/3 border-r text-center font-medium p-2">{session.name}</span>
                            <span className="w-1/5 text-center font-semibold p-2 mr-4">{session.price}</span>
                            <button onClick={() => handlePesanClick(session)} className="ml-auto mr-1 px-4 py-1 text-center font-semibold bg-gray-300 text-gray-700 rounded-md">
                                Pesan
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && selectedSession && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-80">
                        <h3 className="text-xl font-semibold mb-4">Pesan Jasa</h3>
                        <label className="block mb-2">Tanggal Pemesanan:</label>
                        <input type="text" value={newOrder.date} disabled className="border p-2 rounded-md w-full mb-4" />
                        <label className="block mb-2">Diskon:</label>
                        <input type="text" placeholder="Kode Diskon" onChange={(e) => setNewOrder({ ...newOrder, discountCode: e.target.value })} className="border p-2 rounded-md w-full mb-4" />
                        <label className="block mb-2">Total Pembayaran:</label>
                        <input type="text" value={selectedSession.price} disabled className="border p-2 rounded-md w-full mb-4" />
                        <label className="block mb-2">Metode Pembayaran:</label>
                        <select onChange={(e) => setNewOrder({ ...newOrder, paymentMethod: e.target.value })} className="border p-2 rounded-md w-full mb-4">
                            <option value="">Pilih Metode</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="MyPay">MyPay</option>
                        </select>
                        <button onClick={handleOrderSubmit} className="w-full bg-green-500 text-white p-2 rounded-md">
                            Pesan Jasa
                        </button>
                    </div>
                </div>
            )}

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

export default SubKategoriJasaPengguna;
