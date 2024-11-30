import { User } from "@/database/models/user";
import { TrMpay } from "@/database/models/trMpay";
import { KategoriTransaksiMpay } from "@/database/models/kategoriTrMpay";

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

  const trHistory = await Promise.all(
    (
      await new TrMpay().findMany("userid", id)
    ).map(async (tr) => {
      const kategori = await new KategoriTransaksiMpay().findBy(
        "id",
        tr.kategoriid
      );
      return {
        id: tr.id,
        tanggal: tr.tgl,
        nominal: tr.nominal,
        kategoriid: kategori?.id,
        kategori: kategori?.nama,
      };
    })
  );

  return new Response(
    JSON.stringify({
      message: "Success",
      data: {
        saldo: user.saldompay,
        trHistory,
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
