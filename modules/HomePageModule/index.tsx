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
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategories();
    }, [selectedCategory, searchTerm]);

    const fetchCategories = async () => {
        try {
            const params = new URLSearchParams();
            if (selectedCategory) params.append('category', selectedCategory);
            if (searchTerm) params.append('search', searchTerm);

            const response = await fetch(`/api/homepage?${params.toString()}`);
            const result = await response.json();

            if (response.ok) {
                const groupedCategories = groupByCategory(result.data);
                setCategories(groupedCategories);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const groupByCategory = (data: any[]): Category[] => {
        const grouped: { [key: string]: Category } = {};
        data.forEach((item) => {
            if (!grouped[item.namakategori]) {
                grouped[item.namakategori] = { name: item.namakategori, subcategories: [] };
            }
            grouped[item.namakategori].subcategories.push(item.namasubkategori);
        });
        return Object.values(grouped);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
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
                                return;
                            }
                            setSelectedCategory(val);
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
                    className="w-full text-black text-2xl font-['Urbanist'] focus:outline-none placeholder:text-[#acacac] bg-transparent h-full border-none"
                />

                </div>
            </div>

            {/* Categories and Subcategories */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1280px]">
                {categories.map((category, index) => (
                    <div key={index} className="flex flex-col">
                        <div className="px-5 py-4 bg-[#1ab35f] text-white rounded-xl text-xl font-bold text-center">
                            {category.name}
                        </div>
                        <div className="h-4 bg-transparent"></div>
                        <ul className="bg-white border border-[#d9d9d9] rounded-xl">
                            {category.subcategories.map((subcategory, subIndex) => (
                                <Link
                                    key={subIndex}
                                    href={`/subkategori-jasa/${isPekerja ? 'pekerja' : 'pelanggan'}/${subcategory.split(' ').join('-')}`}
                                >
                                    <li
                                        className={`px-5 py-4 text-center text-[#1ab35f] text-lg font-bold cursor-pointer ${
                                            subIndex === 0
                                                ? 'rounded-tl-xl rounded-tr-xl'
                                                : subIndex === category.subcategories.length - 1
                                                ? 'rounded-bl-xl rounded-br-xl'
                                                : ''
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
