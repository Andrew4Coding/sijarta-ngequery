'use client'

import { useState } from 'react';

export const HomePageModule = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        { name: 'Kategori Jasa 1', subcategories: ['Subkategori Jasa 1', 'Subkategori Jasa 2', 'Subkategori Jasa 3'] },
        { name: 'Kategori Jasa 2', subcategories: ['Subkategori Jasa 1', 'Subkategori Jasa 2', 'Subkategori Jasa 3'] },
        { name: 'Kategori Jasa 3', subcategories: ['Subkategori Jasa 1', 'Subkategori Jasa 2', 'Subkategori Jasa 3'] },
    ];

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredCategories = categories.filter((category) => {
        const matchesCategory = selectedCategory ? category.name === selectedCategory : true;
        const matchesSearch = category.subcategories.some(subcategory =>
            subcategory.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchesCategory && matchesSearch;
    });

    return (
        <main className="flex flex-col items-center py-10 px-5 bg-gray-100 min-h-screen">
            <div className="flex gap-4 mb-6 w-full max-w-md">
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
                <button className="bg-blue-500 text-white p-2 rounded-md">Search</button>
            </div>

            <div className="w-full max-w-md">
                {filteredCategories.map((category, index) => (
                    <div key={index} className="bg-white p-4 mb-4 shadow-md rounded-md">
                        <h3 className="font-bold text-lg mb-2">{category.name}</h3>
                        <ul className="list-none">
                            {category.subcategories.map((subcategory, subIndex) => (
                                <li key={subIndex} className="p-2 border-b last:border-b-0">
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
