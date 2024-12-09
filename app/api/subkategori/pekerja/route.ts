import { KategoriJasa } from "@/database/models/kategoriJasa";
import { PekerjaKategoriJasa } from "@/database/models/pekerjaKategoriJasa";

export async function POST(req: Request) {
  try {
    const query = new URL(req.url).searchParams;
    const pekerjaId = query.get("pekerjaId");
    const kategoriJasa = query.get("kategoriJasa");

    if (!pekerjaId || !kategoriJasa) {
      return new Response(
        JSON.stringify({
          message: "Pekerja ID and Kategori Jasa ID are required",
        }),
        { status: 400 }
      );
    }

    const kategoriJasaModel = await new KategoriJasa().findBy(
      "namakategori",
      kategoriJasa
    );

    if (!kategoriJasaModel) {
      return new Response(
        JSON.stringify({
          message: "Kategori Jasa not found",
        }),
        { status: 404 }
      );
    }

    await new PekerjaKategoriJasa().create({
      pekerjaid: pekerjaId,
      kategorijasaid: kategoriJasaModel.id,
    });

    return new Response(
      JSON.stringify({
        message: "Pekerja successfully joined the category",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
