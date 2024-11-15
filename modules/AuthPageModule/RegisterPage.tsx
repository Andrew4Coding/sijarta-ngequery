'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterAsPekerjaSchema } from "./schema";

export const RegisterPage = () => {
    
    const searchParams = useSearchParams();
    const roleParams = searchParams.get('role') ?? '';
    
    const [role, setRole] = useState(roleParams);
    const [isPickRole, setIsPickRole] = useState(roleParams === '');
    const { push } = useRouter();

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
                                <option value="pengguna">Pengguna</option>
                                <option value="pekerja">Pekerja</option>
                            </select>
                        </div>
                        <button
                            onClick={() => {
                                setIsPickRole(false)
                                const params = new URLSearchParams(searchParams);

                                params.set('role', role);

                                push(`?${params.toString()}`)
                            }}
                            className="w-full bg-blue-500 text-white p-2 rounded-md">Continue</button>
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
        <div className="w-full min-h-[100vh] flex items-center justify-center bg-gray-100 py-40">
            <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center ">
                <h1 className="font-bold text-2xl">Register to Sijarta</h1>
                <p>by ngeQuery Team</p>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 grid grid-cols-2 gap-4 min-w-[400px]">
                    <div>
                        <label htmlFor="nama">Nama</label>
                        <input type="text" id="nama" {...register('nama')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Nama" />
                        {errors.nama?.message && <p className="text-red-500 text-sm">{String(errors.nama.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="jenisKelamin">Jenis Kelamin</label>
                        <select id="jenisKelamin" {...register('jenisKelamin')} className="w-full border border-gray-300 p-2 rounded-md mb-2">
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        {errors.jenisKelamin?.message && <p className="text-red-500 text-sm">{String(errors.jenisKelamin.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="noHp">No HP</label>
                        <input type="text" id="noHp" {...register('noHp')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="No HP" />
                        {errors.noHp?.message && <p className="text-red-500 text-sm">{String(errors.noHp.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="tanggalLahir">Tanggal Lahir</label>
                        <input type="date" id="tanggalLahir" {...register('tanggalLahir')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Tanggal Lahir" />
                        {errors.tanggalLahir?.message && <p className="text-red-500 text-sm">{String(errors.tanggalLahir.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="alamat">Alamat</label>
                        <input type="text" id="alamat" {...register('alamat')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Alamat" />
                        {errors.alamat?.message && <p className="text-red-500 text-sm">{String(errors.alamat.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" {...register('password')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Password" />
                        {errors.password?.message && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" id="confirmPassword" {...register('confirmPassword')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Confirm Password" />
                        {errors.confirmPassword?.message && <p className="text-red-500 text-sm">{String(errors.confirmPassword.message)}</p>}
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
        <div className="w-full min-h-[100vh] flex items-center justify-center bg-gray-100 py-32 font-dmsans">
            <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center">
                <h1 className="font-bold text-2xl">Register Pekerja to Sijarta</h1>
                <p>by ngeQuery Team</p>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-5 grid grid-cols-2 gap-4 min-w-[400px]">
                    <div>
                        <label htmlFor="nama" className="font-medium">Nama</label>
                        <input type="text" id="nama" {...register('nama')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Nama" />
                        {errors.nama?.message && <p className="text-red-500 text-sm">{String(errors.nama.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="jenisKelamin" className="font-medium">Jenis Kelamin</label>
                        <select id="jenisKelamin" {...register('jenisKelamin')} className="w-full border border-gray-300 p-2 rounded-md mb-2">
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                        {errors.jenisKelamin && <p className="text-red-500 text-sm">{String(errors.jenisKelamin.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="noHp" className="font-medium">No HP</label>
                        <input type="text" id="noHp" {...register('noHp')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="No HP" />
                        {errors.noHp && <p className="text-red-500 text-sm">{String(errors.noHp.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="tanggalLahir" className="font-medium">Tanggal Lahir</label>
                        <input type="date" id="tanggalLahir" {...register('tanggalLahir')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Tanggal Lahir" />
                        {errors.tanggalLahir && <p className="text-red-500 text-sm">{String(errors.tanggalLahir.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="alamat" className="font-medium">Alamat</label>
                        <input type="text" id="alamat" {...register('alamat')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Alamat" />
                        {errors.alamat && <p className="text-red-500 text-sm">{String(errors.alamat.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="namaBank" className="font-medium">Nama Bank</label>
                        <input type="text" id="namaBank" {...register('namaBank')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Nama Bank" />
                        {errors.namaBank?.message && <p className="text-red-500 text-sm">{String(errors.namaBank.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="noRekening" className="font-medium">No Rekening</label>
                        <input type="text" id="noRekening" {...register('noRekening')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="No Rekening" />
                        {errors.noRekening?.message && <p className="text-red-500 text-sm">{String(errors.noRekening.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="npwp" className="font-medium">NPWP</label>
                        <input type="text" id="npwp" {...register('npwp')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="NPWP" />
                        {errors.npwp?.message && <p className="text-red-500 text-sm">{String(errors.npwp.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="urlFotoKtp" className="font-medium">URL Foto KTP</label>
                        <input type="url" id="urlFotoKtp" {...register('urlFotoKtp')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="URL Foto KTP" />
                        {errors.urlFotoKtp?.message && <p className="text-red-500 text-sm">{String(errors.urlFotoKtp.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="font-medium">Password</label>
                        <input type="password" id="password" {...register('password')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Password" />
                        {errors.password && <p className="text-red-500 text-sm">{String(errors.password.message)}</p>}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="font-medium">Confirm Password</label>
                        <input type="password" id="confirmPassword" {...register('confirmPassword')} className="w-full border border-gray-300 p-2 rounded-md mb-2" placeholder="Confirm Password" />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{String(errors.confirmPassword.message)}</p>}
                    </div>
                    <button type="submit" className="col-span-2 w-full bg-blue-500 text-white p-2 rounded-md">Register</button>
                </form>
                <p className="mt-4">Sudah punya akun? <a href="/login" className="font-bold">Login</a></p>
            </div>
        </div>
    );
};

