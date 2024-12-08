'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RegisterPekerjaForm } from "./elements/RegisterPekerjaForm";
import { RegisterPelangganForm } from "./elements/RegisterPelangganForm";

export const RegisterPage = () => {
    
    const searchParams = useSearchParams();
    const roleParams = searchParams.get('role') ?? '';

    const [role, setRole] = useState(roleParams);
    const [isPickRole, setIsPickRole] = useState(roleParams === '');
    const router = useRouter();

    const PickRolePage = () => {
        return (
            <main className="w-full min-h-[100vh] flex items-center justify-center bg-background">
                <div className="bg-white shadow-xl p-10 rounded-xl flex flex-col items-center">
                    <h1 className="font-bold text-2xl">Pick Role</h1>
                    <div className="w-full mt-5 flex flex-col gap-4 min-w-[400px]">
                        <div>
                            <label htmlFor="role">Role</label>
                            <Select
                                value={role}
                                onValueChange={(val) => {
                                    setRole(val)
                                }}
                            >
                                <SelectTrigger className="w-full ">
                                    <SelectValue placeholder="Pilih Role ..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Role</SelectLabel>
                                        <SelectItem value="pelanggan">Pelanggan</SelectItem>
                                        <SelectItem value="pekerja">Pekerja</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>                          
                        </div>
                        <Button
                            variant={'secondary'}
                            disabled={!role}
                            onClick={() => {
                                setIsPickRole(false)
                                const params = new URLSearchParams(searchParams);

                                params.set('role', role);

                                router.push(`?${params.toString()}`)
                            }}
                        >
                            Continue
                        </Button>
                        <p className='mt-4 text-sm text-center'>Sudah punya akun? <a href="/login" className="font-bold duration-300 hover:text-green-600">Login</a></p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main>
            {isPickRole ? <PickRolePage /> : role === 'pelanggan' ? <RegisterPelangganForm /> : <RegisterPekerjaForm />}
        </main>
    );
}