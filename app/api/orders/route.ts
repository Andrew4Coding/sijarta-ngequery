import pool from "@/database/db";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return new Response(
                JSON.stringify({ message: "User ID is required" }),
                { status: 400 }
            );
        }

        const query = `
            SELECT 
                pj.id, 
                sj.namasubkategori AS subcategory, 
                pj.sesi AS session, 
                pj.totalbiaya AS price, 
                ut.nama AS workerName, 
                COALESCE(
                    ps.nama, 
                    CASE 
                        WHEN mb.nama = 'MPay' THEN 'Menunggu Pembayaran' 
                        ELSE 'Mencari Pekerja Terdekat' 
                    END
                ) AS status
            FROM tr_pemesanan_jasa pj
            LEFT JOIN subkategori_jasa sj ON sj.id = pj.idkategorijasa
            LEFT JOIN pekerja p ON p.id = pj.idpekerja
            LEFT JOIN usertable ut ON ut.id = p.id
            LEFT JOIN metode_bayar mb ON mb.id = pj.idMetodeBayar
            LEFT JOIN tr_pemesanan_status tps ON tps.idtrpemesanan = pj.id
            LEFT JOIN status_pesanan ps ON ps.id = tps.idstatus
            WHERE pj.idpelanggan = $1
            ORDER BY pj.tglpemesanan DESC;
        `;

        const { rows } = await pool.query(query, [userId]);

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
            JSON.stringify({
                message: "Failed to fetch orders",
                error: error instanceof Error ? error.message : "Unknown error",
            }),
            { status: 500 }
        );
    }
}
