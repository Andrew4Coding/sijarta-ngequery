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

  const trHistory = await new TrMpay().customQuery(
    `SELECT TRM.id, TRM.tgl AS tanggal, TRM.nominal, KTM.id AS kategoriid, KTM.nama AS kategori 
    FROM TR_MPAY TRM, KATEGORI_TR_MPAY KTM WHERE TRM.userid = $1 and TRM.kategoriid = KTM.id
    ORDER BY TRM.tgl ASC`,
    [id]
  ); 

  return new Response(
    JSON.stringify({
      message: "Success",
      data: {
        noHp: user.nohp,
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
