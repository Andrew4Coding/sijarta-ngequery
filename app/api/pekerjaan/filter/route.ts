import { StatusPesanan } from "@/database/models/statusPesanan";
import { SubkategoriJasa } from "@/database/models/subKategoriJasa";
import { TrPemesananJasa } from "@/database/models/trPemesananJasa";
import { TrPemesananStatus } from "@/database/models/trPemesananStatus";
import { User } from "@/database/models/user";

export async function GET(req: Request) {
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

  const dibatalkanStatus = await new StatusPesanan().findBy(
    "nama",
    "Pesanan Dibatalkan"
  );

  const availableJobs = await Promise.all(
    (
      await new TrPemesananJasa().customQuery(
        `SELECT * FROM TR_PEMESANAN_JASA WHERE idpekerja IS NULL`
      )
    ).map(async (tr) => {
      const statusPesanan = await new TrPemesananStatus().findBy(
        "idtrpemesanan",
        tr.id
      );

      if (statusPesanan?.idstatus === dibatalkanStatus?.id) {
        return;
      }

      const subKategori = await new SubkategoriJasa().findBy(
        "id",
        tr.idkategorijasa
      );

      if (subKategoriQuery !== subKategori?.namasubkategori) {
        return;
      }

      if (statusPesanan?.idstatus === status?.id) {
        const pelanggan = await new User().findBy("id", tr.idpelanggan);
        return {
          id: tr.id,
          createdAt: tr.tglpemesanan,
          sesi: tr.sesi,
          subCategory: subKategori?.namasubkategori,
          price: tr.totalbiaya,
          assignner: pelanggan?.nama,
        };
      }
    })
  );

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
