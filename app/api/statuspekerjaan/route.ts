import { SubkategoriJasa } from "@/database/models/subKategoriJasa";
import { TrPemesananJasa } from "@/database/models/trPemesananJasa";
import { User } from "@/database/models/user";
import { TrPemesananStatus } from "@/database/models/trPemesananStatus";
import { StatusPesanan } from "@/database/models/statusPesanan";

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

  const statusPekerjaan = await new TrPemesananJasa().customQuery(
    `
    SELECT 
      tr.id,
      tr.tglpemesanan AS "createdAt",
      tr.sesi,
      tr.waktupekerjaan AS "todoDate",
      sj.namasubkategori AS "subCategory",
      sp.nama AS "status",
      tr.totalbiaya AS "price",
      u.nama AS "assignner"
    FROM 
      TR_PEMESANAN_JASA tr
    INNER JOIN 
      TR_PEMESANAN_STATUS ts ON tr.id = ts.idtrpemesanan
    INNER JOIN 
      STATUS_PESANAN sp ON ts.idstatus = sp.id
    INNER JOIN 
      SUBKATEGORI_JASA sj ON tr.idkategorijasa = sj.id
    INNER JOIN 
      USERTABLE u ON tr.idpelanggan = u.id
    WHERE 
      tr.idpekerja = $1
    `,
    [id]
  );

  return new Response(
    JSON.stringify({
      message: "Success",
      data: statusPekerjaan,
    }),
    { status: 200 }
  );
}
