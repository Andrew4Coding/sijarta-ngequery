'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { subcategoryData } from '../SubKategoriJasa/const';

// Fungsi untuk membersihkan format harga
const cleanPrice = (price: string): number => {
    // Hapus "Rp", koma, spasi, dan ubah menjadi angka
    return parseFloat(price.replace(/[^\d.-]/g, '')) || 0;
};

type Session = {
    name: string;
    price: string;
};

export type SubcategoryInfo = {
    description: string;
    sessions: Session[];
};

type Worker = {
    name: string;
    rating: number;
    completedOrders: number;
    phone: string;
    birthDate: string;
    address: string;
    image: string; // Tambahkan properti image
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
    const workers: Worker[] = [
        {
            name: "Pekerja A",
            rating: 4.5,
            completedOrders: 20,
            phone: "08123456789",
            birthDate: "01/01/1990",
            address: "Jl. Contoh No. 1",
            image: "/images/pekerjaA.jpg", // URL gambar
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
    const [newOrder, setNewOrder] = useState<{
        date: string;
        discountCode: string;
        total: string;
        paymentMethod: string;
        status: string;
    }>({
        date: new Date().toLocaleDateString(),
        discountCode: "",
        total: "0.00", // Total default dalam format string
        paymentMethod: "",
        status: "Menunggu Pembayaran",
    });    

    const handlePesanClick = (session: Session) => {
        setSelectedSession(session);
        setNewOrder({
            ...newOrder,
            total: parseFloat(session.price).toFixed(2), // Harga awal tanpa diskon
        });
        setShowModal(true);
    };       
    
    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const discountCode = e.target.value.trim();
        let discountValue = 0;
    
        if (!selectedSession) {
            console.error("Session belum dipilih");
            return;
        }
    
        // Bersihkan format harga sebelum digunakan
        const cleanSessionPrice = cleanPrice(selectedSession.price);
    
        // Validasi diskon
        if (discountCode === "PROMO10") {
            discountValue = cleanSessionPrice * 0.1; // Diskon 10%
        } else if (discountCode === "PROMO20") {
            discountValue = cleanSessionPrice * 0.2; // Diskon 20%
        } else {
            discountValue = 0; // Diskon tidak valid
        }
    
        const totalPrice = cleanSessionPrice - discountValue;
    
        console.log("Discount Code: ", discountCode);
        console.log("Price Before Discount: ", cleanSessionPrice);
        console.log("Discount Value: ", discountValue);
        console.log("Total After Discount: ", totalPrice);
    
        // Gunakan fungsi updater untuk memperbarui state secara aman
        setNewOrder((prevOrder) => ({
            ...prevOrder,
            discountCode,
            total: totalPrice > 0 ? totalPrice.toFixed(2) : "0.00", // Pastikan total dalam string
        }));
    };           

    const handleOrderSubmit = () => {
        router.push('/pemesanan-jasa');
    };    

    const [showWorkerDialog, setShowWorkerDialog] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);

    const openWorkerDialog = (worker: Worker) => {
        setSelectedWorker(worker);
        setShowWorkerDialog(true);
    };

    const closeWorkerDialog = () => {
        setSelectedWorker(null);
        setShowWorkerDialog(false);
    };
    
    console.log("Total Pembayaran di Render: ", newOrder.total); 
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

                <div className="border-t pt-4 mt-4">
                    <h2 className="font-bold mb-2">Pekerja</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {workers.map((worker, index) => (
                            <button
                                key={index}
                                className="p-4 border rounded-md bg-gray-50 hover:bg-gray-200"
                                onClick={() => openWorkerDialog(worker)}
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

            {showWorkerDialog && selectedWorker && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-96">
                    <h3 className="text-xl font-semibold mb-4 text-center">Profil Pekerja</h3>
                        <img
                            src={selectedWorker.image}
                            alt={`Foto ${selectedWorker.name}`}
                            className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                        />
                        <p><strong>Nama:</strong> {selectedWorker.name}</p>
                        <p><strong>Rating:</strong> {selectedWorker.rating}/5</p>
                        <p><strong>Jumlah Pesanan Selesai:</strong> {selectedWorker.completedOrders}</p>
                        <p><strong>No HP:</strong> {selectedWorker.phone}</p>
                        <p><strong>Tanggal Lahir:</strong> {selectedWorker.birthDate}</p>
                        <p><strong>Alamat:</strong> {selectedWorker.address}</p>
                        <button
                            className="mt-4 w-full bg-red-500 text-white p-2 rounded-md"
                            onClick={closeWorkerDialog}
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}

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
            {showModal && selectedSession && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg w-80">
                    <h3 className="text-xl font-semibold mb-4 text-center">Pesan Jasa</h3>
                        <label className="block mb-2">Tanggal Pemesanan:</label>
                        <input type="text" value={newOrder.date} disabled className="border p-2 rounded-md w-full mb-4" />
                        <label className="block mb-2">Diskon:</label>
                        <input 
                            type="text" 
                            placeholder="Kode Diskon" 
                            value={newOrder.discountCode}
                            onChange={handleDiscountChange} 
                            className="border p-2 rounded-md w-full mb-4" 
                        />
                        <label className="block mb-2">Total Pembayaran:</label>
                        <input 
                            type="text" 
                            value={newOrder.total} // Terhubung ke state total
                            disabled 
                            className="border p-2 rounded-md w-full mb-4" 
                        />
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
        </main>
    );
};

export default SubKategoriJasaPengguna;
