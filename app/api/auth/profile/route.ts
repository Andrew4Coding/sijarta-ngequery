import { Pekerja } from "@/database/models/pekerja";
import { Pelanggan } from "@/database/models/pelanggan";
import { User } from "@/database/models/user";

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