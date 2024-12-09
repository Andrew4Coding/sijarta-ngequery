import pool from "@/database/db";

export async function POST(req: Request) {
    try {
        const { orderId } = await req.json();

        if (!orderId) {
            return new Response(
                JSON.stringify({ message: "Order ID is required" }),
                { status: 400 }
            );
        }

        const cancelStatusId = "a1b2c3d4-e5f6-7890-1234-f01890123456"; // Status "Pesanan Dibatalkan"

        const query = `
            INSERT INTO tr_pemesanan_status (idtrpemesanan, idstatus, tglwaktu)
            VALUES ($1, $2, NOW())
        `;

        await pool.query(query, [orderId, cancelStatusId]);

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
