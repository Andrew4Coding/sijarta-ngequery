// ModalTestimoni.tsx

import React, { useState } from 'react';

type ModalTestimoniProps = {
    isOpen: boolean;
    closeModal: () => void;
};

const ModalTestimoni: React.FC<ModalTestimoniProps> = ({ isOpen, closeModal }) => {
    const [rating, setRating] = useState<number>(1);
    const [comment, setComment] = useState<string>('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-bold mb-4">Form Testimoni</h3>
                <div className="mb-4">
                    <label className="block mb-2">Rating:</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="p-2 border rounded-md w-full"
                    >
                        {[...Array(10)].map((_, idx) => (
                            <option key={idx} value={idx + 1}>{idx + 1}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Komentar:</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="p-2 border rounded-md w-full"
                        rows={4}
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalTestimoni;
