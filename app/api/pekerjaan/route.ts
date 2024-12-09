import { KategoriJasa } from "@/database/models/kategoriJasa";
import { PekerjaKategoriJasa } from "@/database/models/pekerjaKategoriJasa";
import { StatusPesanan } from "@/database/models/statusPesanan";
import { SubkategoriJasa } from "@/database/models/subKategoriJasa";
import { TrPemesananJasa } from "@/database/models/trPemesananJasa";
import { TrPemesananStatus } from "@/database/models/trPemesananStatus";
import { User } from "@/database/models/user";

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams;
  const id = query.get("id");

  const user = await new User().findBy("id", id);

  if (!user) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: "User not found",
      }),
      { status: 404 }
    );
  }

  const subKategoriPekerja = await new PekerjaKategoriJasa().customQuery(
    `
    SELECT 
      pkj.kategorijasaid AS id,
      kj.namakategori AS "namaKategori",
      ARRAY_AGG(sj.namasubkategori) AS "subKategori"
    FROM 
      PEKERJA_KATEGORI_JASA pkj
    INNER JOIN 
      KATEGORI_JASA kj ON pkj.kategorijasaid = kj.id
    LEFT JOIN 
      SUBKATEGORI_JASA sj ON sj.kategorijasaid = kj.id
    WHERE 
      pkj.pekerjaid = $1
    GROUP BY 
      pkj.kategorijasaid, kj.namakategori
    `,
    [id]
  );

  const status = await new StatusPesanan().findBy(
    "nama",
    "Mencari Pekerja Terdekat"
  );

  const dibatalkanStatus = await new StatusPesanan().findBy(
    "nama",
    "Pesanan Dibatalkan"
  );

  const availableJobs = await new TrPemesananJasa().customQuery(
    `
    SELECT 
      tr.id AS "id",
      tr.tglpemesanan AS "createdAt",
      tr.sesi AS "sesi",
      sj.namasubkategori AS "subCategory",
      tr.totalbiaya AS "price",
      u.nama AS "assignner"
    FROM 
      TR_PEMESANAN_JASA tr
    INNER JOIN 
      TR_PEMESANAN_STATUS ts ON tr.id = ts.idtrpemesanan
    INNER JOIN 
      SUBKATEGORI_JASA sj ON tr.idkategorijasa = sj.id
    INNER JOIN 
      USERTABLE u ON tr.idpelanggan = u.id
    WHERE 
      tr.idpekerja IS NULL
      AND ts.idstatus != $1 -- Exclude orders with "dibatalkanStatus"
      AND ts.idstatus = $2 -- Include only orders with the required status
      AND sj.namasubkategori = ANY($3) -- Match subcategories with subKategoriPekerja
    `,
    [dibatalkanStatus?.id, status?.id, subKategoriPekerja.flatMap((s) => s.subKategori)]
  );

  return new Response(
    JSON.stringify({
      message: "Success",
      data: {
        subKategoriPekerja,
        availableJobs: availableJobs.filter((job) => job),
      },
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
