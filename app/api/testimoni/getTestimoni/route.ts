import { Pelanggan } from "@/database/models/pelanggan";
import { SubkategoriJasa } from "@/database/models/subKategoriJasa";
import { Testimoni } from "@/database/models/testimoni";
import { TrPemesananJasa } from "@/database/models/trPemesananJasa";
import { User } from "@/database/models/user";

export async function GET(req: Request) {
  try {
    const query = new URL(req.url).searchParams;
    const id = query.get("subKategoriId");
    const trPemesananJasa = await new TrPemesananJasa().findMany("idkategorijasa", id);
    const subcategoryModel = new SubkategoriJasa()
    const testimonyModel = new Testimoni();
    const pelangganModel = new User()
    const testimonies = await Promise.all(
      trPemesananJasa.map(async(jasa) =>
      {
        const testimonies = await testimonyModel.findBy("idtrpemesanan", jasa.id); 
        const pelanggan = await pelangganModel.findBy("id", jasa.idpelanggan)
        const pekerja = await pelangganModel.findBy("id", jasa.idpekerja)
        const subcategory = await subcategoryModel.findBy("id", jasa.idkategorijasa)

        const data = { ...testimonies, namaPengguna: pelanggan?.nama, workerName: pekerja?.nama, subcategory: subcategory?.namasubkategori}
        return data;
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
