'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

type Session = {
    name: string;
    price: string;
};

type SubcategoryInfo = {
    description: string;
    sessions: Session[];
};

const subcategoryData: Record<string, { category: string; info: SubcategoryInfo }> = {
    "Konsultasi Bisnis": {
        category: "Layanan Konsultasi",
        info: {
            description: "Dapatkan layanan konsultasi untuk mengembangkan bisnis Anda dengan strategi yang efektif.",
            sessions: [
                { name: 'Sesi Konsultasi Dasar', price: 'Rp 200,000' },
                { name: 'Sesi Strategi Lanjutan', price: 'Rp 500,000' },
            ]
        }
    },
    "Konsultasi Keuangan": {
        category: "Layanan Konsultasi",
        info: {
            description: "Layanan konsultasi keuangan untuk mengelola dan merencanakan keuangan Anda dengan baik.",
            sessions: [
                { name: 'Sesi Manajemen Keuangan', price: 'Rp 300,000' },
                { name: 'Sesi Perencanaan Pajak', price: 'Rp 450,000' },
            ]
        }
    },
    "Konsultasi SDM": {
        category: "Layanan Konsultasi",
        info: {
            description: "Konsultasi terkait manajemen sumber daya manusia untuk perusahaan Anda.",
            sessions: [
                { name: 'Sesi Rekrutmen', price: 'Rp 250,000' },
                { name: 'Sesi Pengembangan SDM', price: 'Rp 400,000' },
            ]
        }
    },
    "Pelatihan Keterampilan Teknis": {
        category: "Pelatihan dan Pendidikan",
        info: {
            description: "Pelatihan keterampilan teknis untuk meningkatkan kompetensi Anda di bidang teknologi.",
            sessions: [
                { name: 'Pelatihan Dasar', price: 'Rp 150,000' },
                { name: 'Pelatihan Lanjutan', price: 'Rp 300,000' },
            ]
        }
    },
    "Pelatihan Kepemimpinan": {
        category: "Pelatihan dan Pendidikan",
        info: {
            description: "Pelatihan kepemimpinan untuk mengembangkan kemampuan Anda dalam memimpin tim.",
            sessions: [
                { name: 'Sesi Dasar Kepemimpinan', price: 'Rp 250,000' },
                { name: 'Sesi Kepemimpinan Strategis', price: 'Rp 450,000' },
            ]
        }
    },
    "Kursus Bahasa Asing": {
        category: "Pelatihan dan Pendidikan",
        info: {
            description: "Kursus bahasa asing untuk meningkatkan kemampuan komunikasi Anda.",
            sessions: [
                { name: 'Kursus Bahasa Inggris', price: 'Rp 200,000' },
                { name: 'Kursus Bahasa Mandarin', price: 'Rp 250,000' },
            ]
        }
    },
    "Pengembangan Aplikasi Web": {
        category: "Pengembangan Teknologi",
        info: {
            description: "Layanan pengembangan aplikasi web untuk kebutuhan bisnis Anda.",
            sessions: [
                { name: 'Pengembangan Website Dasar', price: 'Rp 1,000,000' },
                { name: 'Pengembangan Website E-Commerce', price: 'Rp 2,500,000' },
            ]
        }
    },
    "Pengembangan Aplikasi Mobile": {
        category: "Pengembangan Teknologi",
        info: {
            description: "Layanan pengembangan aplikasi mobile yang dapat berjalan di iOS dan Android.",
            sessions: [
                { name: 'Aplikasi Mobile Dasar', price: 'Rp 2,000,000' },
                { name: 'Aplikasi Mobile Full-Feature', price: 'Rp 5,000,000' },
            ]
        }
    },
    "Pengembangan Perangkat Lunak Khusus": {
        category: "Pengembangan Teknologi",
        info: {
            description: "Pengembangan perangkat lunak yang disesuaikan dengan kebutuhan khusus Anda.",
            sessions: [
                { name: 'Perangkat Lunak Sederhana', price: 'Rp 3,000,000' },
                { name: 'Perangkat Lunak Khusus Lanjutan', price: 'Rp 7,500,000' },
            ]
        }
    },
    "Pemasaran Digital": {
        category: "Layanan Pemasaran",
        info: {
            description: "Layanan pemasaran digital untuk meningkatkan visibilitas bisnis Anda secara online.",
            sessions: [
                { name: 'Kampanye Iklan Dasar', price: 'Rp 500,000' },
                { name: 'Kampanye Iklan Lengkap', price: 'Rp 1,500,000' },
            ]
        }
    },
    "Pemasaran Media Sosial": {
        category: "Layanan Pemasaran",
        info: {
            description: "Strategi pemasaran melalui platform media sosial.",
            sessions: [
                { name: 'Optimasi Akun Sosial', price: 'Rp 300,000' },
                { name: 'Kampanye Media Sosial', price: 'Rp 800,000' },
            ]
        }
    },
    "Strategi Pemasaran Konten": {
        category: "Layanan Pemasaran",
        info: {
            description: "Pengembangan konten yang efektif untuk pemasaran produk Anda.",
            sessions: [
                { name: 'Konten Dasar', price: 'Rp 250,000' },
                { name: 'Strategi Konten Lanjutan', price: 'Rp 750,000' },
            ]
        }
    },
    "Desain Grafis": {
        category: "Jasa Kreatif",
        info: {
            description: "Layanan desain grafis untuk kebutuhan visual bisnis Anda.",
            sessions: [
                { name: 'Desain Logo', price: 'Rp 150,000' },
                { name: 'Desain Brand Identity', price: 'Rp 600,000' },
            ]
        }
    },
    "Fotografi": {
        category: "Jasa Kreatif",
        info: {
            description: "Layanan fotografi profesional untuk berbagai keperluan.",
            sessions: [
                { name: 'Fotografi Produk', price: 'Rp 400,000' },
                { name: 'Fotografi Event', price: 'Rp 1,000,000' },
            ]
        }
    },
    "Produksi Video": {
        category: "Jasa Kreatif",
        info: {
            description: "Layanan produksi video profesional.",
            sessions: [
                { name: 'Video Pendek', price: 'Rp 800,000' },
                { name: 'Video Dokumenter', price: 'Rp 2,000,000' },
            ]
        }
    },
    "Konsultasi Gizi": {
        category: "Layanan Kesehatan",
        info: {
            description: "Layanan konsultasi gizi untuk menjaga kesehatan Anda.",
            sessions: [
                { name: 'Konsultasi Gizi Dasar', price: 'Rp 150,000' },
                { name: 'Rencana Gizi Lengkap', price: 'Rp 400,000' },
            ]
        }
    },
    "Terapi Fisik": {
        category: "Layanan Kesehatan",
        info: {
            description: "Layanan terapi fisik untuk rehabilitasi dan kesehatan fisik Anda.",
            sessions: [
                { name: 'Terapi Fisik Dasar', price: 'Rp 250,000' },
                { name: 'Terapi Fisik Intensif', price: 'Rp 500,000' },
            ]
        }
    },
    "Konsultasi Psikologis": {
        category: "Layanan Kesehatan",
        info: {
            description: "Konsultasi psikologis untuk kesehatan mental Anda.",
            sessions: [
                { name: 'Sesi Konseling Individu', price: 'Rp 300,000' },
                { name: 'Sesi Konseling Keluarga', price: 'Rp 500,000' },
            ]
        }
    },
    "Manajemen Investasi": {
        category: "Layanan Keuangan",
        info: {
            description: "Layanan manajemen investasi untuk mengoptimalkan aset Anda.",
            sessions: [
                { name: 'Konsultasi Investasi Dasar', price: 'Rp 350,000' },
                { name: 'Manajemen Portofolio', price: 'Rp 1,000,000' },
            ]
        }
    },
    "Perencanaan Pajak": {
        category: "Layanan Keuangan",
        info: {
            description: "Layanan perencanaan pajak untuk kepatuhan dan efisiensi pajak Anda.",
            sessions: [
                { name: 'Konsultasi Pajak Dasar', price: 'Rp 400,000' },
                { name: 'Perencanaan Pajak Tahunan', price: 'Rp 700,000' },
            ]
        }
    },
    "Asuransi Jiwa dan Kesehatan": {
        category: "Layanan Keuangan",
        info: {
            description: "Konsultasi dan layanan asuransi jiwa serta kesehatan untuk perlindungan Anda.",
            sessions: [
                { name: 'Konsultasi Asuransi Jiwa', price: 'Rp 250,000' },
                { name: 'Paket Asuransi Kesehatan', price: 'Rp 500,000' },
            ]
        }
    },
    "Perencanaan Liburan": {
        category: "Layanan Perjalanan",
        info: {
            description: "Layanan perencanaan liburan untuk perjalanan yang tak terlupakan.",
            sessions: [
                { name: 'Paket Liburan Domestik', price: 'Rp 2,000,000' },
                { name: 'Paket Liburan Internasional', price: 'Rp 5,000,000' },
            ]
        }
    },
    "Layanan Pemandu Wisata": {
        category: "Layanan Perjalanan",
        info: {
            description: "Layanan pemandu wisata berpengalaman untuk pengalaman berwisata yang menyenangkan.",
            sessions: [
                { name: 'Pemandu Wisata Harian', price: 'Rp 500,000' },
                { name: 'Pemandu Wisata Khusus', price: 'Rp 1,200,000' },
            ]
        }
    },
    "Pemesanan Hotel": {
        category: "Layanan Perjalanan",
        info: {
            description: "Layanan pemesanan hotel dengan pilihan terbaik sesuai kebutuhan Anda.",
            sessions: [
                { name: 'Hotel Bintang 3', price: 'Rp 800,000' },
                { name: 'Hotel Bintang 5', price: 'Rp 2,000,000' },
            ]
        }
    },
    "Kebersihan Rumah": {
        category: "Layanan Kebersihan",
        info: {
            description: "Layanan kebersihan rumah untuk menjaga lingkungan Anda tetap bersih dan nyaman.",
            sessions: [
                { name: 'Paket Kebersihan Harian', price: 'Rp 200,000' },
                { name: 'Paket Kebersihan Mingguan', price: 'Rp 700,000' },
            ]
        }
    },
    "Kebersihan Kantor": {
        category: "Layanan Kebersihan",
        info: {
            description: "Layanan kebersihan kantor profesional untuk lingkungan kerja yang bersih.",
            sessions: [
                { name: 'Kebersihan Kantor Harian', price: 'Rp 300,000' },
                { name: 'Kebersihan Kantor Bulanan', price: 'Rp 1,200,000' },
            ]
        }
    },
    "Jasa Laundry": {
        category: "Layanan Kebersihan",
        info: {
            description: "Layanan laundry profesional untuk pakaian bersih dan rapi.",
            sessions: [
                { name: 'Laundry Reguler', price: 'Rp 50,000' },
                { name: 'Laundry Ekspres', price: 'Rp 100,000' },
            ]
        }
    },
    "Pengiriman Barang": {
        category: "Jasa Logistik",
        info: {
            description: "Layanan pengiriman barang cepat dan aman ke seluruh Indonesia.",
            sessions: [
                { name: 'Pengiriman Reguler', price: 'Rp 100,000' },
                { name: 'Pengiriman Ekspres', price: 'Rp 200,000' },
            ]
        }
    },
    "Penyimpanan dan Gudang": {
        category: "Jasa Logistik",
        info: {
            description: "Layanan penyimpanan dan gudang untuk kebutuhan logistik Anda.",
            sessions: [
                { name: 'Sewa Gudang Harian', price: 'Rp 300,000' },
                { name: 'Sewa Gudang Bulanan', price: 'Rp 5,000,000' },
            ]
        }
    },
    "Distribusi Produk": {
        category: "Jasa Logistik",
        info: {
            description: "Layanan distribusi produk ke berbagai lokasi dengan jaringan luas.",
            sessions: [
                { name: 'Distribusi Lokal', price: 'Rp 500,000' },
                { name: 'Distribusi Nasional', price: 'Rp 2,000,000' },
            ]
        }
    }
};

export const SubKategoriJasaPekerja = () => {
    const searchParams = useSearchParams();
    const subcategory = searchParams.get('subcategory') || 'Subkategori Tidak Ditemukan';

    const subcategoryInfo = subcategoryData[subcategory]?.info || {
        description: "Deskripsi tidak tersedia untuk subkategori ini.",
        sessions: []
    };
    const category = subcategoryData[subcategory]?.category || 'Kategori Tidak Ditemukan';

    // State to track if the worker has joined
    const [isJoined, setIsJoined] = useState(false);

    // Function to handle joining the category
    const handleJoin = () => {
        setIsJoined(true);
        // Additional logic to add worker to the category could go here
        // For example, API call to update worker's category association
    };

    return (
        <main className="flex flex-col items-center py-10 px-5 bg-gray-100 min-h-screen">
            <div className="w-full max-w-2xl bg-white shadow-md rounded-md p-6">
                {/* Subkategori and Kategori */}
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

                {/* Deskripsi */}
                <textarea
                    value={subcategoryInfo.description}
                    className="border p-2 rounded-md w-full mb-4 text-center bg-white"
                    rows={3}
                    disabled
                />

                {/* Pilihan Sesi Layanan */}
                <div className="border-t pt-4">
                    <h2 className="font-bold mb-2">Pilihan Sesi Layanan</h2>
                    {subcategoryInfo.sessions.map((session: Session, index: number) => (
                        <div key={index} className="flex items-center border mb-2 rounded-md overflow-hidden bg-white">
                            <span className="w-1/3 border-r text-center font-medium p-2">{session.name}</span>
                            <span className="w-1/5 text-center font-semibold p-2 mr-4">{session.price}</span>
                            <button className="ml-auto mr-1 px-4 py-1 text-center font-semibold bg-gray-300 text-gray-700 rounded-md">
                                Pesan
                            </button>
                        </div>
                    ))}
                </div>

                {/* Join Button */}
                {!isJoined && (
                    <button
                        onClick={handleJoin}
                        className="mt-4 w-full px-4 py-2 text-center font-semibold bg-blue-500 text-white rounded-md"
                    >
                        Bergabung
                    </button>
                )}
            </div>
        </main>
    );
};

export default SubKategoriJasaPekerja;
