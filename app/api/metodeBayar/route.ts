import { MetodeBayar } from "@/database/models/metodeBayar";

export async function GET(req: Request) {
  try {
    const metodeBayarModel = new MetodeBayar();
    const metodeBayarList = await metodeBayarModel.findAll();

    if (!metodeBayarList || metodeBayarList.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: [], message: "Tidak ada metode bayar tersedia" }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: metodeBayarList }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error fetching metode bayar:", error);
    return new Response(
      JSON.stringify({ success: false, message: 'Database error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
