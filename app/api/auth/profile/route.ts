import { KategoriJasa } from "@/database/models/kategoriJasa";
import { Pekerja } from "@/database/models/pekerja";
import { Pelanggan } from "@/database/models/pelanggan";
import { User } from "@/database/models/user";
import { PelangganType } from "@/database/types";
import { EditProfilePekerjaSchema, EditProfilePelangganSchema } from "@/modules/EditProfileModule/types";
import { z } from "zod";

export async function GET(req: Request) {
    try {
        const query = new URL(req.url).searchParams;
        const id = query.get('id');
        const role = query.get('role');
    
        const user = await new User().findBy('id', id);
    
        if (role === 'pekerja') {
            const pekerja = await new Pekerja().findBy('id', id);

            if (!pekerja) {
                return new Response(
                    JSON.stringify({
                        message: "Failed",
                        error: "Pekerja not found",
                    }),
                    { status: 404 }
                );
            }

            const kategoriJasa = await new Pekerja().getKategoriJasa(pekerja.id);
            return new Response(
                JSON.stringify({
                    message: "Success",
                    data: {
                        ... user,
                        ...pekerja,
                        kategoriJasa: kategoriJasa,
                    },
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
        }
        else {
            const pelanggan = await new Pelanggan().findBy('id', user?.id);
            return new Response(
                JSON.stringify({
                    message: "Success",
                    data: {
                        ...user,
                        ...pelanggan,
                    },
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
        }
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: error.message,
            }),
            { status: 500 }
        );
    }
}

export async function PATCH(req: Request) {
    try {
        const query = new URL(req.url).searchParams;
        const id = query.get('id');
        const role = query.get('role');
    
        const user = await new User().findBy('id', id);
    
        if (role === 'pekerja') {
            const pekerja = await new Pekerja().findBy('id', id);

            if (!pekerja) {
                return new Response(
                    JSON.stringify({
                        message: "Failed",
                        error: "Pekerja not found",
                    }),
                    { status: 404 }
                );
            }

            const data: z.infer<typeof EditProfilePekerjaSchema> = await req.json();

            await new User().update("id", id, {
                nama: data.nama,
                alamat: data.alamat,
                jeniskelamin: data.jeniskelamin as "L" | "P",
                nohp: data.nohp,
                tgllahir: new Date(data.tanggallahir),
            })

            await new Pekerja().clearKategoriJasa(pekerja.id);

            for (const kategori of data.kategorijasa) {
                const kategoriObj = await new KategoriJasa().findBy('namakategori', kategori);

                try {
                    if (!kategoriObj) {
                        continue;
                    }

                    await new Pekerja().addKategoriJasa(pekerja.id, kategoriObj?.id);
                }
                catch (error) {
                    continue;
                }
            }

            await new Pekerja().update("id", id, {
                namabank: data.namabank,
                nomorrekening: data.nomorrekening,
                npwp: data.npwp,
            });

            return new Response(
                JSON.stringify({
                    message: "Success",
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
        }
        else {
            const pelanggan = new Pelanggan().findBy('id', id);

            if (!pelanggan) {
                return new Response(
                    JSON.stringify({
                        message: "Failed",
                        error: "Pelanggan not found",
                    }),
                    { status: 404 }
                );
            }

            const data: z.infer<typeof EditProfilePelangganSchema> = await req.json();

            await new User().update("id", id, {
                nama: data.nama,
                alamat: data.alamat,
                jeniskelamin: data.jeniskelamin as "L" | "P",
                nohp: data.nohp,
                tgllahir: new Date(data.tanggallahir),
            })

            return new Response(
                JSON.stringify({
                    message: "Success",
                    data: {
                        ... user,
                        ... pelanggan,
                    },
                }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
        }
    } catch (error: any) {
        return new Response(
            JSON.stringify({
                message: "Failed",
                error: error.message,
            }),
            { status: 500 }
        );
    }
}