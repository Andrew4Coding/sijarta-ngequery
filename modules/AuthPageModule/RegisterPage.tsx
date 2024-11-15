'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterAsPekerjaSchema } from "./schema";

export const RegisterPage = () => {
    const [isPickRole, setIsPickRole] = useState(true);
    const [role, setRole] = useState('user');

    const PickRolePage = () => {
        return (
            <main className="w-full min-h-[100vh] flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center">
                    <h1 className="font-bold text-2xl">Pick Role</h1>
                    <p>by ngeQuery Team</p>
                    <form className="w-full mt-5 flex flex-col gap-4 min-w-[400px]">
                        <div>
                            <label htmlFor="role">Role</label>
                            <select
                                value={role}
                                onChange={(e) => {
                                    setRole(e.target.value)
                                }}
                                id="role" className="w-full border border-gray-300 p-2 rounded-md mb-2">
                                <option value="user">Pengguna</option>
                                <option value="pekerja">Pekerja</option>
                            </select>
                        </div>
                        <button
                            onClick={() => {
                                setIsPickRole(false)
                            }}
                            className="w-full bg-blue-500 text-white p-2 rounded-md">Pick Role</button>
                    </form>
                </div>
            </main>
        );
    }

    return (
        <main>
            {isPickRole ? <PickRolePage /> : role === 'user' ? <RegisterUserForm /> : <RegisterPekerjaForm />}
        </main>
    );
}

const RegisterUserForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterAsPekerjaSchema),
    });

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="w-full h-[100vh] flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center">
                <h1 className="font-bold text-2xl">Register to Sijarta</h1>
                <p>by ngeQuery Team</p>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 grid grid-cols-2 gap-4 min-w-[400px]">
                    <div>
                        <label htmlFor="nama">Nama</label>
                        <input type="text" id="nama" {...register('nama')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Nama" />
                        {errors.nama && <p className="text-red-500 text-sm">{errors.nama.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="jenisKelamin">Jenis Kelamin</label>
                        <select id="jenisKelamin" {...register('jenisKelamin')} className="w-full border border-gray-300 p-2 rounded-md mb-2">
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        {errors.jenisKelamin && <p className="text-red-500 text-sm">{errors.jenisKelamin.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="noHp">No HP</label>
                        <input type="text" id="noHp" {...register('noHp')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="No HP" />
                        {errors.noHp && <p className="text-red-500 text-sm">{errors.noHp.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="tanggalLahir">Tanggal Lahir</label>
                        <input type="date" id="tanggalLahir" {...register('tanggalLahir')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Tanggal Lahir" />
                        {errors.tanggalLahir && <p className="text-red-500 text-sm">{errors.tanggalLahir.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="alamat">Alamat</label>
                        <input type="text" id="alamat" {...register('alamat')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Alamat" />
                        {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" {...register('password')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Password" />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" {...register('confirmPassword')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Confirm Password" />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Register</button>
                </form>
                <p className="mt-4">Sudah punya akun <a href="/login" className="font-bold">Login</a></p>
            </div>
        </div>
    )
}

export const RegisterPekerjaForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(RegisterAsPekerjaSchema),
    });

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="w-full h-[100vh] flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center">
                <h1 className="font-bold text-2xl">Register Pekerja to Sijarta</h1>
                <p>by ngeQuery Team</p>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 grid grid-cols-2 gap-4 min-w-[400px]">
                    <div>
                        <label htmlFor="nama">Nama</label>
                        <input type="text" id="nama" {...register('nama')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Nama" />
                        {errors.nama && <p className="text-red-500 text-sm">{errors.nama.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="jenisKelamin">Jenis Kelamin</label>
                        <select id="jenisKelamin" {...register('jenisKelamin')} className="w-full border border-gray-300 p-2 rounded-md mb-2">
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        {errors.jenisKelamin && <p className="text-red-500 text-sm">{errors.jenisKelamin.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="noHp">No HP</label>
                        <input type="text" id="noHp" {...register('noHp')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="No HP" />
                        {errors.noHp && <p className="text-red-500 text-sm">{errors.noHp.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="tanggalLahir">Tanggal Lahir</label>
                        <input type="date" id="tanggalLahir" {...register('tanggalLahir')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Tanggal Lahir" />
                        {errors.tanggalLahir && <p className="text-red-500 text-sm">{errors.tanggalLahir.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="alamat">Alamat</label>
                        <input type="text" id="alamat" {...register('alamat')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Alamat" />
                        {errors.alamat && <p className="text-red-500 text-sm">{errors.alamat.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="namaBank">Nama Bank</label>
                        <input type="text" id="namaBank" {...register('namaBank')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Nama Bank" />
                        {errors.namaBank && <p className="text-red-500 text-sm">{errors.namaBank.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="noRekening">No Rekening</label>
                        <input type="text" id="noRekening" {...register('noRekening')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="No Rekening" />
                        {errors.noRekening && <p className="text-red-500 text-sm">{errors.noRekening.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="npwp">NPWP</label>
                        <input type="text" id="npwp" {...register('npwp')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="NPWP" />
                        {errors.npwp && <p className="text-red-500 text-sm">{errors.npwp.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="urlFotoKtp">URL Foto KTP</label>
                        <input type="url" id="urlFotoKtp" {...register('urlFotoKtp')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="URL Foto KTP" />
                        {errors.urlFotoKtp && <p className="text-red-500 text-sm">{errors.urlFotoKtp.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" {...register('password')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Password" />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" {...register('confirmPassword')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Confirm Password" />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Register</button>
                </form>
                <p className="mt-4">Sudah punya akun? <a href="/login" className="font-bold">Login</a></p>
            </div>
        </div>
    );
};

