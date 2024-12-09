import { User } from "@/database/models/user";
import { TrMpay } from "@/database/models/trMpay";
import { KategoriTransaksiMpay } from "@/database/models/kategoriTrMpay";
import { v4 } from "uuid";
import { TrPemesananStatus } from "@/database/models/trPemesananStatus";
import { StatusPesanan } from "@/database/models/statusPesanan";

type category =
  | "TopUp MyPay"
  | "Membayar Transaksi"
  | "Transfer MyPay"
  | "Withdrawal";

interface TransaksiInterface {
  userId: string;
  role: string;
  category: category;
  nominal: number;
  noHp?: string;
  bankName?: string;
  bankAccount?: string;
  pemesananJasaId?: string;
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
    pemesananJasaId,
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

  if (Number(user.saldompay!) < nominal && category !== "TopUp MyPay") {
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
      tgl: new Date(),
    });
    const saldo = Number(user.saldompay!) + nominal;
    await new User().update("id", userId, {
      saldompay: saldo,
    });
    return new Response(
      JSON.stringify({
        message: "Success",
        data: {
          message: "Topup success",
          nominal,
        },
      }),
      { status: 201 }
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

    if (!pemesananJasaId) {
      return new Response(
        JSON.stringify({
          message: "Failed",
          error: "Missing pemesananJasaId field is required",
        }),
        { status: 400 }
      );
    }

    const categoryId = await new KategoriTransaksiMpay().findBy(
      "nama",
      "Membayar Transaksi"
    );

    const status = await new StatusPesanan().findBy("nama", "Mencari Pekerja Terdekat");

    await new TrMpay().create({
      id: v4(),
      userid: userId,
      kategoriid: categoryId?.id,
      nominal,
      tgl: new Date(),
    });

    await new TrPemesananStatus().update("idtrpemesanan", pemesananJasaId, {
      idstatus: status?.id,
      tglwaktu: new Date(),
    });

    const saldo = Number(user.saldompay!) - nominal;
    await new User().update("id", userId, {
      saldompay: saldo,
    });

    return new Response(
      JSON.stringify({
        message: "Success",
        data: {
          message: "Payment success",
          nominal,
        },
      }),
      { status: 201 }
    );


  }

  if (category === "Transfer MyPay") {
    if (!noHp) {
      return new Response(
        JSON.stringify({
          message: "Failed",
          error: "Missing noHp field is required",
        }),
        { status: 400 }
      );
    }

    if (noHp === user.nohp) {
      return new Response(
        JSON.stringify({
          message: "Failed",
          error: "Cannot transfer to yourself",
        }),
        { status: 400 }
      );
    }

    const categoryId = await new KategoriTransaksiMpay().findBy(
      "nama",
      "Transfer MyPay"
    );

    const userReceiver = await new User().findBy("nohp", noHp);

    if (!userReceiver) {
      return new Response(
        JSON.stringify({
          message: "Failed",
          error: "Receiver not found",
        }),
        { status: 404 }
      );
    }

    await new TrMpay().create({
      id: v4(),
      userid: userId,
      kategoriid: categoryId?.id,
      nominal,
      tgl: new Date(),
    });

    const receiverCategoryId = await new KategoriTransaksiMpay().findBy(
      "nama",
      "Terima Transfer"
    );

    await new TrMpay().create({
      id: v4(),
      userid: userReceiver.id,
      kategoriid: receiverCategoryId?.id,
      nominal,
      tgl: new Date(),
    });

    const saldoSender = Number(user.saldompay!) - nominal;
    const saldoReceiver = Number(userReceiver.saldompay!) + nominal;

    await new User().update("id", userId, {
      saldompay: saldoSender,
    });

    await new User().update("id", userReceiver.id, {
      saldompay: saldoReceiver,
    });

    return new Response(
      JSON.stringify({
        message: "Success",
        data: {
          message: "Transfer success",
          nominal,
          receiver: userReceiver.nama,
        },
      }),
      { status: 201 }
    );
  }

  if (category === "Withdrawal") {
    if (!bankName || !bankAccount) {
      return new Response(
        JSON.stringify({
          message: "Failed",
          error: "Missing bankName and bankAccount fields are required",
        }),
        { status: 400 }
      );
    }
    
    const categoryId = await new KategoriTransaksiMpay().findBy(
      "nama",
      "Withdrawal"
    );

    await new TrMpay().create({
      id: v4(),
      userid: userId,
      kategoriid: categoryId?.id,
      nominal,
      tgl: new Date(),
    });

    const saldo = Number(user.saldompay!) - nominal;
    await new User().update("id", userId, {
      saldompay: saldo,
    });

    return new Response(
      JSON.stringify({
        message: "Success",
        data: {
          message: "Withdrawal success",
          nominal,
        },
      }),
      { status: 201 }
    );
  }
}
