'use client'

import { useState, useEffect } from 'react';

type Category = {
    name: string;
    subcategories: string[];
};

export const HomePageModule = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

    const categories: Category[] = [
        { "name": "Layanan Konsultasi", "subcategories": ["Konsultasi Bisnis", "Konsultasi Keuangan", "Konsultasi SDM"] },
        { "name": "Pelatihan dan Pendidikan", "subcategories": ["Pelatihan Keterampilan Teknis", "Pelatihan Kepemimpinan", "Kursus Bahasa Asing"] },
        { "name": "Pengembangan Teknologi", "subcategories": ["Pengembangan Aplikasi Web", "Pengembangan Aplikasi Mobile", "Pengembangan Perangkat Lunak Khusus"] },
        { "name": "Layanan Pemasaran", "subcategories": ["Pemasaran Digital", "Pemasaran Media Sosial", "Strategi Pemasaran Konten"] },
        { "name": "Jasa Kreatif", "subcategories": ["Desain Grafis", "Fotografi", "Produksi Video"] },
        { "name": "Layanan Kesehatan", "subcategories": ["Konsultasi Gizi", "Terapi Fisik", "Konsultasi Psikologis"] },
        { "name": "Layanan Keuangan", "subcategories": ["Manajemen Investasi", "Perencanaan Pajak", "Asuransi Jiwa dan Kesehatan"] },
        { "name": "Layanan Perjalanan", "subcategories": ["Perencanaan Liburan", "Layanan Pemandu Wisata", "Pemesanan Hotel"] },
        { "name": "Layanan Kebersihan", "subcategories": ["Kebersihan Rumah", "Kebersihan Kantor", "Jasa Laundry"] },
        { "name": "Jasa Logistik", "subcategories": ["Pengiriman Barang", "Penyimpanan dan Gudang", "Distribusi Produk"] }
    ];

    useEffect(() => {
        // Menampilkan semua kategori dan subkategori saat halaman pertama kali dimuat
        setFilteredCategories(categories);
    }, []);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        updateFilteredCategories(event.target.value, searchTerm);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        updateFilteredCategories(selectedCategory, event.target.value);
    };

    const updateFilteredCategories = (category: string, term: string) => {
        const results = categories.filter((categoryItem) => {
            const matchesCategory = category ? categoryItem.name === category : true;
            const matchesSearch = categoryItem.subcategories.some((subcategory) =>
                subcategory.toLowerCase().includes(term.toLowerCase())
            );
            return matchesCategory && matchesSearch;
        });
        setFilteredCategories(results);
    };

    return (
        <main className="flex flex-col items-center py-10 px-5 bg-gray-100 min-h-screen">
            <div className="flex gap-2 mb-6 w-full max-w-lg">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="w-1/3 p-2 border border-gray-300 rounded-md"
                >
                    <option value="">Kategori</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Nama Subkategori"
                    className="w-2/3 p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="w-full max-w-lg">
                {filteredCategories.map((category, index) => (
                    <div key={index} className="bg-white border border-gray-200 mb-4 rounded-md">
                        <h3 className="bg-gray-100 font-semibold text-base px-4 py-2 border-b border-gray-200 rounded-t-md">{category.name}</h3>
                        <ul className="list-none">
                            {category.subcategories.map((subcategory, subIndex) => (
                                <li key={subIndex} className="p-2 pl-4 border-b border-gray-200 last:border-b-0">
                                    {subcategory}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default HomePageModule;
