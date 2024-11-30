import { Promo } from "@/database/models/promo";

export async function GET(req: Request) {
  try {
    const promoModel = new Promo();
    const promos = await promoModel.findAll();

    if (!promos || promos.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: [], message: "Tidak ada promo tersedia" }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: promos }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error fetching promos:", error);
    return new Response(
      JSON.stringify({ success: false, message: 'Database error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
