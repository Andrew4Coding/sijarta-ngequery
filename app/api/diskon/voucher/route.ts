import { TrPembelianVoucher } from "@/database/models/trPembelianVoucher";
import { Voucher } from "@/database/models/voucher";

export async function GET(req: Request) {
  try {
    const query = new URL(req.url).searchParams;
    const id = query.get("id");

    const voucherModel = new Voucher();
    const vouchers = await voucherModel.findAll();
    const trPembelianVoucherModel = new TrPembelianVoucher();

    // Get All Voucher - Exclude Voucher that has been purchased
    const purchasedVouchers = await trPembelianVoucherModel.findMany('idpelanggan', id);

    let availableVouchers = vouchers;
    if (purchasedVouchers) {
      availableVouchers = vouchers.filter((voucher) => {
        return !purchasedVouchers?.some((purchasedVoucher) => purchasedVoucher.idvoucher === voucher.kode);
      });
    }
    
    if (!availableVouchers || availableVouchers.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: [], message: "Tidak ada voucher tersedia" }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: availableVouchers }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: 'Database error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
