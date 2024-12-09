import { StatusPesanan } from "@/database/models/statusPesanan";
import { TrPemesananJasa } from "@/database/models/trPemesananJasa";
import { User } from "@/database/models/user";

export async function GET(req: Request) {
  try {

    const query = new URL(req.url).searchParams;
    const id = query.get("id");
    const subKategoriQuery = query.get("subCategory");
  
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
  
    const status = await new StatusPesanan().findBy(
      "nama",
      "Mencari Pekerja Terdekat"
    );
  
    const availableJobs = await new TrPemesananJasa().customQuery(`
      SELECT
        tr.id,
        tr.tglpemesanan AS "createdAt",
        tr.sesi,
        subkategori.namasubkategori AS "subCategory",
        tr.totalbiaya AS price,
        pelanggan.nama AS assignner
    FROM
        TR_PEMESANAN_JASA tr
    JOIN
        TR_PEMESANAN_STATUS ts ON tr.id = ts.idtrpemesanan
    JOIN
        SUBKATEGORI_JASA subkategori ON tr.idkategorijasa = subkategori.id
    JOIN
        USERTABLE pelanggan ON tr.idpelanggan = pelanggan.id
    WHERE
        tr.idpekerja IS NULL
        AND ts.idstatus != (SELECT id FROM STATUS_PESANAN WHERE nama = 'Pesanan Dibatalkan') 
        AND subkategori.namasubkategori = '${subKategoriQuery}' 
        AND ts.idstatus = '${status?.id}'; 
    `)
    
    return new Response(
      JSON.stringify({
        message: "Success",
        data: {
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
  catch (error) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: (error as Error).message,
      }),
      { status: 500 }
    );
  }
}
