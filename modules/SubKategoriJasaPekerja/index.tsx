'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { subcategoryData } from './const';

export type Session = {
    name: string;
    price: string;
};

export type SubcategoryInfo = {
    description: string;
    sessions: Session[];
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
    };

    return (
        <main className="flex flex-col items-center px-10 md:px-32 py-40 bg-gray-100 min-h-screen">
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
