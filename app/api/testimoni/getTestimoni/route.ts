import { Testimoni } from "@/database/models/testimoni";
import { TrPemesananJasa } from "@/database/models/trPemesananJasa";

export async function GET(req: Request) {
  try {
    const query = new URL(req.url).searchParams;
    const id = query.get("subKategoriId");
    const trPemesananJasa = await new TrPemesananJasa().findMany("idkategorijasa", id);
    const testimonyModel = new Testimoni();
    const testimonies = await Promise.all(
      trPemesananJasa.map(async(jasa) =>
      {
        const testimonies = await testimonyModel.findBy("idtrpemesanan", jasa.id); 
        return testimonies;
      })
    )

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
