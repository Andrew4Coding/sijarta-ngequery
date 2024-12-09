import pool from "@/database/db";
import { StatusPesanan } from "@/database/models/statusPesanan";

export async function POST(req: Request) {
    try {
        const { orderId } = await req.json();

        if (!orderId) {
            return new Response(
                JSON.stringify({ message: "Order ID is required" }),
                { status: 400 }
            );
        }

        const cancelStatusId = await new StatusPesanan().findBy("nama", "Pesanan Dibatalkan");

        const query = `
            INSERT INTO tr_pemesanan_status (idtrpemesanan, idstatus, tglwaktu)
            VALUES ($1, $2, NOW())
        `;

        await pool.query(query, [orderId, cancelStatusId?.id]);

        return new Response(
            JSON.stringify({ message: "Order canceled successfully" }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error canceling order:", error);
        return new Response(
            JSON.stringify({ message: "Failed to cancel order" }),
            { status: 500 }
        );
    }
}
