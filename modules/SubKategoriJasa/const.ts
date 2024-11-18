import { SubcategoryInfo, Testimonial, Worker } from "./type";

export const subcategoryData: Record<string, { category: string; info: SubcategoryInfo }> = {
    "Konsultasi Bisnis": {
        category: "Layanan Konsultasi",
        info: {
            description: "Dapatkan layanan konsultasi untuk mengembangkan bisnis Anda dengan strategi yang efektif.",
            sessions: [
                { name: 'Sesi Konsultasi Dasar', price: 200000 },
                { name: 'Sesi Strategi Lanjutan', price: 500000 },
            ]
        }
    },
    "Konsultasi Keuangan": {
        category: "Layanan Konsultasi",
        info: {
            description: "Layanan konsultasi keuangan untuk mengelola dan merencanakan keuangan Anda dengan baik.",
            sessions: [
                { name: 'Sesi Manajemen Keuangan', price: 300000 },
                { name: 'Sesi Perencanaan Pajak', price: 450000 },
            ]
        }
    },
    "Konsultasi SDM": {
        category: "Layanan Konsultasi",
        info: {
            description: "Konsultasi terkait manajemen sumber daya manusia untuk perusahaan Anda.",
            sessions: [
                { name: 'Sesi Rekrutmen', price: 250000 },
                { name: 'Sesi Pengembangan SDM', price: 400000 },
            ]
        }
    },
    "Pelatihan Keterampilan-Teknis": {
        category: "Pelatihan dan Pendidikan",
        info: {
            description: "Pelatihan keterampilan teknis untuk meningkatkan kompetensi Anda di bidang teknologi.",
            sessions: [
                { name: 'Pelatihan Dasar', price: 150000 },
                { name: 'Pelatihan Lanjutan', price: 300000 },
            ]
        }
    },
    "Pelatihan Kepemimpinan": {
        category: "Pelatihan dan Pendidikan",
        info: {
            description: "Pelatihan kepemimpinan untuk mengembangkan kemampuan Anda dalam memimpin tim.",
            sessions: [
                { name: 'Sesi Dasar Kepemimpinan', price: 250000 },
                { name: 'Sesi Kepemimpinan Strategis', price: 450000 },
            ]
        }
    },
    "Kursus Bahasa-Asing": {
        category: "Pelatihan dan Pendidikan",
        info: {
            description: "Kursus bahasa asing untuk meningkatkan kemampuan komunikasi Anda.",
            sessions: [
                { name: 'Kursus Bahasa Inggris', price: 200000 },
                { name: 'Kursus Bahasa Mandarin', price: 250000 },
            ]
        }
    },
    "Pengembangan Aplikasi-Web": {
        category: "Pengembangan Teknologi",
        info: {
            description: "Layanan pengembangan aplikasi web untuk kebutuhan bisnis Anda.",
            sessions: [
                { name: 'Pengembangan Website Dasar', price: 1000000 },
                { name: 'Pengembangan Website E-Commerce', price: 2500000 },
            ]
        }
    },
    "Pengembangan Aplikasi-Mobile": {
        category: "Pengembangan Teknologi",
        info: {
            description: "Layanan pengembangan aplikasi mobile yang dapat berjalan di iOS dan Android.",
            sessions: [
                { name: 'Aplikasi Mobile Dasar', price: 2000000 },
                { name: 'Aplikasi Mobile Full-Feature', price: 5000000 },
            ]
        }
    },
    "Pengembangan Perangkat-Lunak-Khusus": {
        category: "Pengembangan Teknologi",
        info: {
            description: "Pengembangan perangkat lunak yang disesuaikan dengan kebutuhan khusus Anda.",
            sessions: [
                { name: 'Perangkat Lunak Sederhana', price: 3000000 },
                { name: 'Perangkat Lunak Khusus Lanjutan', price: 7500000 },
            ]
        }
    },
    "Pemasaran Digital": {
        category: "Layanan Pemasaran",
        info: {
            description: "Layanan pemasaran digital untuk meningkatkan visibilitas bisnis Anda secara online.",
            sessions: [
                { name: 'Kampanye Iklan Dasar', price: 500000 },
                { name: 'Kampanye Iklan Lengkap', price: 1500000 },
            ]
        }
    },
    "Pemasaran Media-Sosial": {
        category: "Layanan Pemasaran",
        info: {
            description: "Strategi pemasaran melalui platform media sosial.",
            sessions: [
                { name: 'Optimasi Akun Sosial', price: 300000 },
                { name: 'Kampanye Media Sosial', price: 800000 },
            ]
        }
    },
    "Strategi Pemasaran-Konten": {
        category: "Layanan Pemasaran",
        info: {
            description: "Pengembangan konten yang efektif untuk pemasaran produk Anda.",
            sessions: [
                { name: 'Konten Dasar', price: 250000 },
                { name: 'Strategi Konten Lanjutan', price: 750000 },
            ]
        }
    },
    "Desain Grafis": {
        category: "Jasa Kreatif",
        info: {
            description: "Layanan desain grafis untuk kebutuhan visual bisnis Anda.",
            sessions: [
                { name: 'Desain Logo', price: 150000 },
                { name: 'Desain Brand Identity', price: 600000 },
            ]
        }
    },
    "Fotografi": {
        category: "Jasa Kreatif",
        info: {
            description: "Layanan fotografi profesional untuk berbagai keperluan.",
            sessions: [
                { name: 'Fotografi Produk', price: 400000 },
                { name: 'Fotografi Event', price: 1000000 },
            ]
        }
    },
    "Produksi Video": {
        category: "Jasa Kreatif",
        info: {
            description: "Layanan produksi video profesional.",
            sessions: [
                { name: 'Video Pendek', price: 800000 },
                { name: 'Video Dokumenter', price: 2000000 },
            ]
        }
    },
    "Konsultasi Gizi": {
        category: "Layanan Kesehatan",
        info: {
            description: "Layanan konsultasi gizi untuk menjaga kesehatan Anda.",
            sessions: [
                { name: 'Konsultasi Gizi Dasar', price: 150000 },
                { name: 'Rencana Gizi Lengkap', price: 400000 },
            ]
        }
    },
    "Terapi Fisik": {
        category: "Layanan Kesehatan",
        info: {
            description: "Layanan terapi fisik untuk rehabilitasi dan kesehatan fisik Anda.",
            sessions: [
                { name: 'Terapi Fisik Dasar', price: 250000 },
                { name: 'Terapi Fisik Intensif', price: 500000 },
            ]
        }
    },
    "Konsultasi Psikologis": {
        category: "Layanan Kesehatan",
        info: {
            description: "Konsultasi psikologis untuk kesehatan mental Anda.",
            sessions: [
                { name: 'Sesi Konseling Individu', price: 300000 },
                { name: 'Sesi Konseling Keluarga', price: 500000 },
            ]
        }
    },
    "Manajemen Investasi": {
        category: "Layanan Keuangan",
        info: {
            description: "Layanan manajemen investasi untuk mengoptimalkan aset Anda.",
            sessions: [
                { name: 'Konsultasi Investasi Dasar', price: 350000 },
                { name: 'Manajemen Portofolio', price: 1000000 },
            ]
        }
    },
    "Perencanaan Pajak": {
        category: "Layanan Keuangan",
        info: {
            description: "Layanan perencanaan pajak untuk kepatuhan dan efisiensi pajak Anda.",
            sessions: [
                { name: 'Konsultasi Pajak Dasar', price: 400000 },
                { name: 'Perencanaan Pajak Tahunan', price: 700000 },
            ]
        }
    },
    "Asuransi Jiwa-dan-Kesehatan": {
        category: "Layanan Keuangan",
        info: {
            description: "Konsultasi dan layanan asuransi jiwa serta kesehatan untuk perlindungan Anda.",
            sessions: [
                { name: 'Konsultasi Asuransi Jiwa', price: 250000 },
                { name: 'Paket Asuransi Kesehatan', price: 500000 },
            ]
        }
    },
    "Perencanaan Liburan": {
        category: "Layanan Perjalanan",
        info: {
            description: "Layanan perencanaan liburan untuk perjalanan yang tak terlupakan.",
            sessions: [
                { name: 'Paket Liburan Domestik', price: 2000000 },
                { name: 'Paket Liburan Internasional', price: 5000000 },
            ]
        }
    },
    "Layanan Pemandu-Wisata": {
        category: "Layanan Perjalanan",
        info: {
            description: "Layanan pemandu wisata berpengalaman untuk pengalaman berwisata yang menyenangkan.",
            sessions: [
                { name: 'Pemandu Wisata Harian', price: 500000 },
                { name: 'Pemandu Wisata Khusus', price: 1200000 },
            ]
        }
    },
    "Pemesanan Hotel": {
        category: "Layanan Perjalanan",
        info: {
            description: "Layanan pemesanan hotel dengan pilihan terbaik sesuai kebutuhan Anda.",
            sessions: [
                { name: 'Hotel Bintang 3', price: 800000 },
                { name: 'Hotel Bintang 5', price: 2000000 },
            ]
        }
    },
    "Kebersihan Rumah": {
        category: "Layanan Kebersihan",
        info: {
            description: "Layanan kebersihan rumah untuk menjaga lingkungan Anda tetap bersih dan nyaman.",
            sessions: [
                { name: 'Paket Kebersihan Harian', price: 200000 },
                { name: 'Paket Kebersihan Mingguan', price: 700000 },
            ]
        }
    },
    "Kebersihan Kantor": {
        category: "Layanan Kebersihan",
        info: {
            description: "Layanan kebersihan kantor profesional untuk lingkungan kerja yang bersih.",
            sessions: [
                { name: 'Kebersihan Kantor Harian', price: 300000 },
                { name: 'Kebersihan Kantor Bulanan', price: 1200000 },
            ]
        }
    },
    "Jasa Laundry": {
        category: "Layanan Kebersihan",
        info: {
            description: "Layanan laundry profesional untuk pakaian bersih dan rapi.",
            sessions: [
                { name: 'Laundry Reguler', price: 50000 },
                { name: 'Laundry Ekspres', price: 100000 },
            ]
        }
    },
    "Pengiriman Barang": {
        category: "Jasa Logistik",
        info: {
            description: "Layanan pengiriman barang cepat dan aman ke seluruh Indonesia.",
            sessions: [
                { name: 'Pengiriman Reguler', price: 100000 },
                { name: 'Pengiriman Ekspres', price: 200000 },
            ]
        }
    },
    "Penyimpanan dan-Gudang": {
        category: "Jasa Logistik",
        info: {
            description: "Layanan penyimpanan dan gudang untuk kebutuhan logistik Anda.",
            sessions: [
                { name: 'Sewa Gudang Harian', price: 300000 },
                { name: 'Sewa Gudang Bulanan', price: 5000000 },
            ]
        }
    },
    "Distribusi Produk": {
        category: "Jasa Logistik",
        info: {
            description: "Layanan distribusi produk ke berbagai lokasi dengan jaringan luas.",
            sessions: [
                { name: 'Distribusi Lokal', price: 500000 },
                { name: 'Distribusi Nasional', price: 2000000 },
            ]
        }
    }
};

export const workers: Worker[] = [
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


export const testimonials: Testimonial[] = [
    {
        workerName: "Pekerja A",
        rating: 2,
        customerName: "Pelanggan 1",
        review: "Sangat puas dengan pelayanannya! Pekerja sangat profesional dan ramah.",
        date: "2024-11-17",
    },
    {
        workerName: "Pekerja B",
        rating: 4,
        customerName: "Pelanggan 2",
        review: "Pelayanan cukup memuaskan, hasil sesuai dengan harapan.",
        date: "2024-11-16",
    },
    {
        workerName: "Pekerja C",
        rating: 5,
        customerName: "Pelanggan 3",
        review: "Luar biasa! Hasil pekerjaan sangat memuaskan dan cepat.",
        date: "2024-11-15",
    },
];