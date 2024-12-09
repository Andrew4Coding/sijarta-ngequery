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

  const unpaidPesanan = await new TrPemesananJasa().customQuery(
    `SELECT TRJ.id, TRJ.tglpemesanan AS tanggalPemesanan, TRJ.totalbiaya AS nominal, SJ.namasubkategori AS subKategori, SP.nama AS status
    FROM TR_PEMESANAN_JASA TRJ, TR_PEMESANAN_STATUS TPS, SUBKATEGORI_JASA SJ, STATUS_PESANAN SP
    WHERE TRJ.idpelanggan = $1 AND TPS.idtrpemesanan = TRJ.id AND TPS.idstatus = $2 AND TRJ.idmetodebayar = $3 AND TRJ.idkategorijasa = SJ.id AND SP.nama = 'Menunggu Pembayaran'`,
    [id, status?.id, metodeBayar?.id]
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
