import { Pekerja } from "@/database/models/pekerja";
import { Pelanggan } from "@/database/models/pelanggan";
import { User } from "@/database/models/user";
import { PekerjaType, PelangganType } from "@/database/types";
import { convertToDate } from "@/lib/utils";
import { EditProfilePekerjaSchema } from "@/modules/ProfilePageModule/edit/types";
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
            const pelanggan = new Pelanggan().findBy('id', id);
            return new Response(
                JSON.stringify({
                    message: "Success",
                    data: {
                        user,
                        pelanggan,
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
                tgllahir: convertToDate(data.tanggallahir),
            })

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

            const data: PelangganType = await req.json();
            await new Pelanggan().update("id", id, data);

            return new Response(
                JSON.stringify({
                    message: "Success",
                    data: {
                        user,
                        pelanggan,
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