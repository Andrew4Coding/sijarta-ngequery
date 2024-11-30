'use client';

import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useUserData } from '@/hooks/useUserData';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type Category = {
    name: string;
    subcategories: string[];
};

export const HomePageModule = () => {
    const { role } = useUserData();
    const isPekerja = role === 'pekerja';

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
    ];

    useEffect(() => {
        setFilteredCategories(categories);
    }, []);

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
        <main className="flex flex-col items-center bg-background min-h-screen px-10 py-40 w-full">
            <div className="text-center text-6xl font-['Newake'] tracking-[3px] mb-12">
                <span className="text-black">Selamat Datang di </span>
                <span className="text-[#1ab35f]">SIJARTA</span>
            </div>

            {/* Search and Filter Section */}
            <div className="h-[66px] justify-start items-center gap-3 inline-flex mb-12 w-full max-w-[1280px]">
                <div className="h-[66px] w-[300px] flex items-center bg-white rounded-[50px] border border-[#d9d9d9] px-8">
                    <Select
                        onValueChange={(val) => {
                            if (val === 'all') {
                                setSelectedCategory('');
                                updateFilteredCategories('', searchTerm);
                                return;
                            }
                            setSelectedCategory(val);
                            updateFilteredCategories(val, searchTerm);
                        }}
                    >
                        <SelectTrigger className="w-full text-black text-2xl font-['Urbanist'] focus:outline-none bg-transparent border-none shadow-none focus:ring-0">
                            <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="all">Semua Kategori</SelectItem>
                                <SelectLabel>Kategori</SelectLabel>
                                {categories.map((category, index) => (
                                    <SelectItem key={index} value={category.name}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="h-[66px] px-8 bg-white rounded-[50px] border border-[#d9d9d9] flex items-center flex-1 box-border">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Nama Subkategori"
                        className="w-full text-black text-2xl font-['Urbanist'] focus:outline-none placeholder:text-[#acacac] bg-transparent h-full"
                    />
                </div>
            </div>

            {/* Categories and Subcategories */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1280px]">
                {filteredCategories.map((category, index) => (
                    <div key={index} className="flex flex-col">
                        {/* Category Header */}
                        <div className="px-5 py-4 bg-[#1ab35f] text-white rounded-xl text-xl font-bold text-center">
                            {category.name}
                        </div>
                        {/* Gap Between Category and Subcategories */}
                        <div className="h-4 bg-transparent"></div> {/* Tambahkan ini sebagai gap */}
                        {/* Subcategories */}
                        <ul className="bg-white border border-[#d9d9d9] rounded-xl">
                            {category.subcategories.map((subcategory, subIndex) => (
                                <Link
                                    key={subIndex}
                                    href={`/subkategori-jasa/${isPekerja ? 'pekerja' : 'pelanggan'}/${subcategory.split(" ").join("-")}`}
                                >
                                    <li
                                        className={`px-5 py-4 text-center text-[#1ab35f] text-lg font-bold cursor-pointer ${
                                            subIndex === 0
                                                ? "rounded-tl-xl rounded-tr-xl"
                                                : subIndex === category.subcategories.length - 1
                                                ? "rounded-bl-xl rounded-br-xl"
                                                : ""
                                        }`}
                                        style={{
                                            borderBottom: subIndex === category.subcategories.length - 1 ? 'none' : '1px solid #d9d9d9',
                                        }}
                                    >
                                        {subcategory}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

        </main>
    );
};

export default HomePageModule;