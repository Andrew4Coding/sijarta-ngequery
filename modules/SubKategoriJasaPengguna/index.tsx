'use client'

import { useState } from 'react';
import Hero from './sections/Hero';

const sessions = [
    { name: 'Sesi Layanan 1', price: 'Rp 100,000' },
    { name: 'Sesi Layanan 2', price: 'Rp 150,000' },
];

const workers = [
    { name: 'Nama Pekerja 1', rating: '4.5' },
    { name: 'Nama Pekerja 2', rating: '4.7' },
];

const testimonials = [
    { userName: 'Nama Pengguna 1', date: '12 Nov 2024', workerName: 'Nama Pekerja 1', rating: '5.0', text: 'Pelayanan sangat memuaskan' },
    { userName: 'Nama Pengguna 2', date: '10 Nov 2024', workerName: 'Nama Pekerja 2', rating: '4.8', text: 'Sangat profesional' },
];

export const SubKategoriJasaPengguna = () => {
    return (
        <main className="flex flex-col items-center py-10 px-5 bg-gray-100 min-h-screen">
            <Hero />
            <div className="w-full max-w-lg bg-white shadow-md rounded-md p-5">
                <div className="flex justify-between mb-4">
                    <input type="text" placeholder="Nama Subkategori" className="border p-2 rounded-md w-1/2" disabled />
                    <input type="text" placeholder="Kategori" className="border p-2 rounded-md w-1/2 ml-2" disabled />
                </div>

                <textarea placeholder="Deskripsi" className="border p-2 rounded-md w-full mb-4" rows={3} disabled />

                <div className="border-t pt-4 mb-4">
                    <h2 className="font-bold mb-2">Pilihan Sesi Layanan</h2>
                    {sessions.map((session, index) => (
                        <div key={index} className="flex justify-between items-center border-b py-2">
                            <span>{session.name}</span>
                            <span>{session.price}</span>
                            <button className="bg-blue-500 text-white p-1 rounded-md">Pesan</button>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-4 mb-4">
                    <h2 className="font-bold mb-2">Pekerja</h2>
                    <div className="flex gap-2">
                        {workers.map((worker, index) => (
                            <div key={index} className="border p-2 rounded-md text-center">
                                <p>{worker.name}</p>
                                <p>Rating: {worker.rating}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-t pt-4">
                    <h2 className="font-bold mb-2">Testimoni</h2>
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="border-b py-2">
                            <p className="font-semibold">{testimonial.userName} - {testimonial.date}</p>
                            <p>{testimonial.text}</p>
                            <p><strong>{testimonial.workerName}</strong> (Rating: {testimonial.rating})</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default SubKategoriJasaPengguna;
