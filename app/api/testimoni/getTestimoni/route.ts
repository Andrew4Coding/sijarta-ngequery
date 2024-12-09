import { Testimoni } from "@/database/models/testimoni";

export async function GET(req: Request) {
  try {
    const query = new URL(req.url).searchParams;
    const id = query.get("subKategoriId");
    const testimonies = await new Testimoni().customQuery(
      `
      SELECT 
        t.*
      FROM 
        TESTIMONI t
      INNER JOIN 
        TR_PEMESANAN_JASA tpj ON t.idtrpemesanan = tpj.id
      WHERE 
        tpj.idkategorijasa = $1
      `,
      [id]
    );
    

    if (testimonies.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: [], message: "Tidak ada testimoni tersedia" }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: testimonies.filter((testimony) => testimony) }),
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
