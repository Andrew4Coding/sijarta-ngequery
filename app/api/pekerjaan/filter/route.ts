import { StatusPesanan } from "@/database/models/statusPesanan";
import { SubkategoriJasa } from "@/database/models/subKategoriJasa";
import { TrPemesananJasa } from "@/database/models/trPemesananJasa";
import { TrPemesananStatus } from "@/database/models/trPemesananStatus";
import { User } from "@/database/models/user";

export async function GET(req: Request) {
  const query = new URL(req.url).searchParams;
  const id = query.get("id");
  const subKategoriId = query.get("subCategory");

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

  const dibatalkanStatus = await new StatusPesanan().findBy("nama", "Pesanan Dibatalkan");

  const availableJobs = await Promise.all(
    (
      await new TrPemesananJasa().findMany("idpekerja", null)
    ).map(async (tr) => {
      const statusPesanan = await new TrPemesananStatus().findMany(
        "idtrpemesanan",
        tr.id
      );

      if (statusPesanan.find((s) => s.idstatus === dibatalkanStatus?.id)) {
        return;
      }

      if (
        (statusPesanan[1].idstatus === status?.id ||
          statusPesanan[0].idstatus === status?.id) &&
        (statusPesanan.length === 2 || statusPesanan.length === 1) &&
        tr.idkategorijasa === subKategoriId
      ) {
        const subKategori = await new SubkategoriJasa().findBy(
          "id",
          tr.idkategorijasa
        );

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
        availableJobs,
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
