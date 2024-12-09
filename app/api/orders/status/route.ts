import { StatusPesanan } from "@/database/models/statusPesanan";
import { TrPemesananStatus } from "@/database/models/trPemesananStatus";

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return new Response(JSON.stringify({ message: "Order ID is required" }), {
        status: 400,
      });
    }

    const cancelStatusId = await new StatusPesanan().findBy(
      "nama",
      "Pesanan Dibatalkan"
    );

    await new TrPemesananStatus().update("idtrpemesanan", orderId, {
      idstatus: cancelStatusId?.id,
    });

    return new Response(
      JSON.stringify({ message: "Order canceled successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error canceling order:", error);
    return new Response(JSON.stringify({ message: "Failed to cancel order" }), {
      status: 500,
    });
  }
}
