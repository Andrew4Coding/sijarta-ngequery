import { User } from "@/database/models/user";
import { TrMpay } from "@/database/models/trMpay";
import { KategoriTransaksiMpay } from "@/database/models/kategoriTrMpay";
import { v4 } from "uuid";

type category = "TopUp MyPay" | "Membayar Transaksi" | "Transfer MyPay" | "Withdrawal";

interface TransaksiInterface {
  userId: string;
  role: string;
  category: category;
  nominal: number;
  noHp?: string;
  bankName?: string;
  bankAccount?: string;
  pemesananJadaId?: string;
}

export async function POST(req: Request) {
  const {
    userId,
    role,
    category,
    nominal,
    noHp,
    bankName,
    bankAccount,
  }: TransaksiInterface = await req.json();

  if (!userId || !nominal || !category) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: "Missing fields are required",
      }),
      { status: 400 }
    );
  }

  const user = await new User().findBy("id", userId);

  if (!user) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: "Unauthorized",
      }),
      { status: 401 }
    );
  }

  if (nominal <= 0) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: "Nominal must be greater than 0",
      }),
      { status: 400 }
    );
  }

  if (user.saldompay! < nominal && category !== "TopUp MyPay") {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: "Insufficient balance",
      }),
      { status: 400 }
    );
  }

  if (category === "TopUp MyPay") {
    const categoryId = await new KategoriTransaksiMpay().findBy(
      "nama",
      "TopUp MyPay"
    );
    await new TrMpay().create({
      id: v4(),
      userid: userId,
      kategoriid: categoryId?.id,
      nominal,
    });
    await new User().update("id", userId, {
      saldompay: user.saldompay! + nominal,
    });
    return new Response(
      JSON.stringify({
        message: "Success",
        data: {
          message: "Topup success",
          nominal,
        },
      }),
      { status: 200 }
    );
  }

  if (category === "Membayar Transaksi") {
    if (role === "pekerja") {
        return new Response(
            JSON.stringify({
            message: "Failed",
            error: "Access Denied",
            }),
            { status: 403 }
        );
    }

    const categoryId = await new KategoriTransaksiMpay().findBy(
      "nama",
      "Membayar Transaksi"
    );
    
  }

  if (category === "Transfer MyPay" && !noHp) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: "Missing noHp field is required",
      }),
      { status: 400 }
    );
  }

  if (category === "Withdrawal" && (!bankName || !bankAccount)) {
    return new Response(
      JSON.stringify({
        message: "Failed",
        error: "Missing bankName and bankAccount fields are required",
      }),
      { status: 400 }
    );
  }

  //BELUM KELAR
}
