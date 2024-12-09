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

  const statusPekerjaan = await Promise.all(
    (
      await new TrPemesananJasa().findMany("idpekerja", id)
    ).map(async (tr) => {
      const pemesananStatus = await new TrPemesananStatus().findMany(
        "idtrpemesanan",
        tr.id
      );

      const statusPesanan = await new StatusPesanan().findBy(
        "id",
        pemesananStatus[pemesananStatus.length - 1].idstatus
      );

      const subKategori = await new SubkategoriJasa().findBy(
        "id",
        tr.idkategorijasa
      );

      const pelanggan = await new User().findBy("id", tr.idpelanggan);

      return {
        id: tr.id,
        createdAt: tr.tglpemesanan,
        sesi: tr.sesi,
        todoDate: tr.waktupekerjaan,
        subCategory: subKategori?.namasubkategori,
        status: statusPesanan?.nama,
        price: tr.totalbiaya,
        assignner: pelanggan?.nama,
      };
    })
  );

  return new Response(
    JSON.stringify({
      message: "Success",
      data: statusPekerjaan,
    }),
    { status: 200 }
  );
}
