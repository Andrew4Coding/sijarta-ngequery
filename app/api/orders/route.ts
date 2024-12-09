import pool from "@/database/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");
        const subcategory = searchParams.get("subcategory");
        const status = searchParams.get("status");

        if (!userId) {
            return new Response(
                JSON.stringify({ message: "User ID is required" }),
                { status: 400 }
            );
        }

        let query = `
            SELECT pj.id, sj.namasubkategori AS subcategory, pj.sesi AS session, pj.totalbiaya AS price, 
                   ut.nama AS workerName, ps.nama AS status
            FROM tr_pemesanan_jasa pj
            LEFT JOIN subkategori_jasa sj ON sj.id = pj.idkategorijasa
            LEFT JOIN pekerja p ON p.id = pj.idpekerja
            LEFT JOIN usertable ut ON ut.id = p.id
            LEFT JOIN sesi_layanan sl ON sl.subkategoriid = pj.idkategorijasa AND sl.sesi = pj.sesi
            LEFT JOIN tr_pemesanan_status tps ON tps.idtrpemesanan = pj.id
            LEFT JOIN status_pesanan ps ON ps.id = tps.idstatus
            WHERE pj.idpelanggan = $1
        `;

        const params: any[] = [userId];

        if (subcategory) {
            query += ` AND sj.namasubkategori = $2`;
            params.push(subcategory);
        }

        if (status) {
            query += ` AND ps.nama = $${params.length + 1}`;
            params.push(status);
        }

        query += ` ORDER BY pj.tglpemesanan DESC`;

        const { rows } = await pool.query(query, params);

        return new Response(
            JSON.stringify({
                message: "Success",
                data: rows,
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        console.error("Error fetching orders:", error);
        return new Response(
            JSON.stringify({ message: "Failed to fetch orders" }),
            { status: 500 }
        );
    }
}
