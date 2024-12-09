import { Testimoni } from "@/database/models/testimoni";

export async function GET(req: Request) {
  try {
    const testimonyModel = new Testimoni();
    const testimonies = await testimonyModel.findAll();

    if (!testimonies || testimonies.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: [], message: "Tidak ada testimoni tersedia" }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: testimonies }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error fetching testimonies:", error);
    return new Response(
      JSON.stringify({ success: false, message: 'Database error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
