import { User } from "@/database/models/user";
import { TrPemesananJasa } from "@/database/models/trPemesananJasa";
import { StatusPesanan } from "@/database/models/statusPesanan";
import { TrPemesananStatus } from "@/database/models/trPemesananStatus";
import { Pelanggan } from "@/database/models/pelanggan";
import { MetodeBayar } from "@/database/models/metodeBayar";
import { SubkategoriJasa } from "@/database/models/subKategoriJasa";

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

  const pelanggan = await new Pelanggan().findBy("id", id);

  if (!pelanggan) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: "Not a customer",
      }),
      { status: 403 }
    );
  }

  const status = await new StatusPesanan().findBy(
    "nama",
    "Menunggu Pembayaran"
  );

  const dibatalkanStatus = await new StatusPesanan().findBy(
    "nama",
    "Pesanan Dibatalkan"
  );

  const metodeBayar = await new MetodeBayar().findBy("nama", "MPay");

  const unpaidPesanan = await Promise.all(
    (
      await new TrPemesananJasa().findMany("idpelanggan", id)
    ).map(async (tr) => {
      const statusPesanan = await new TrPemesananStatus().findMany(
        "idtrpemesanan",
        tr.id
      );

      if (statusPesanan.find((s) => s.idstatus === dibatalkanStatus?.id)) {
        return;
      }

      if (
        statusPesanan[0].idstatus === status?.id &&
        statusPesanan.length === 1 &&
        tr.idmetodebayar === metodeBayar?.id
      ) {
        const subKategori = await new SubkategoriJasa().findBy(
          "id",
          tr.idkategorijasa
        );
        return {
          id: tr.id,
          tanggalPemesanan: tr.tglpemesanan,
          tanggalPekerjaan: tr.tglpekerjaan,
          subKategori: subKategori?.namasubkategori,
          nominal: tr.totalbiaya,
          status: status.nama,
        };
      }
    })
  );

  return new Response(
    JSON.stringify({
      message: "Success",
      data: unpaidPesanan.filter((val) => val),
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
