import { Voucher } from "@/database/models/voucher";
import { User } from "@/database/models/user";
import { TrPembelianVoucher } from "@/database/models/trPembelianVoucher";
import { v4 } from "uuid";

export async function POST(req: Request) {
  try {
    const body = await req.json(); 
    const { userId, voucherCode, paymentMethodId, paymentMethodName } = body;

    // Validasi User
    const user = await new User().findBy("id", userId);
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User tidak ditemukan" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validasi Voucher
    const voucherModel = new Voucher();
    const voucher = await voucherModel.findBy("kode", voucherCode); 
    if (!voucher) {
      return new Response(
        JSON.stringify({ success: false, message: "Voucher tidak ditemukan" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Periksa saldo cukup
    if (paymentMethodName === "MPay" && Number(user.saldompay!) < voucher.harga) {
      return new Response(
        JSON.stringify({ success: false, message: "Saldo tidak cukup" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      ); 
    }

    const trPembelianVoucherModel = new TrPembelianVoucher();
    // Check if TrPembelianVoucher already exists
    const pembelian = await trPembelianVoucherModel.findBy("idpelanggan", userId);
    if (pembelian && Array.isArray(pembelian) && pembelian.some((p: any) => p.idvoucher === voucherCode)) {
      return new Response(
        JSON.stringify({ success: false, message: "Voucher sudah dibeli" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
  
    // Kurangi saldo pengguna
    if (paymentMethodName === "MPay"){
      user.saldompay = Number(user.saldompay) - voucher.harga;
      await new User().update("id", userId, {
        saldompay: user.saldompay
      });    
    }
    // Simpan data pembelian voucher ke TR_PEMBELIAN_VOUCHER

    await new TrPembelianVoucher().create({
      id: v4(),
      tglawal: new Date(), 
      tglakhir: new Date(new Date().setMonth(new Date().getMonth() + voucher.jmlhariberlaku)), 
      telahdigunakan: 0, 
      idpelanggan: userId,
      idvoucher: voucherCode,
      idmetodebayar: paymentMethodId, 
    });
    

    return new Response(
      JSON.stringify({ success: true, message: "Voucher berhasil dibeli" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Terjadi kesalahan pada server" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
