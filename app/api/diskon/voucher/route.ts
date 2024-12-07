import { Voucher } from "@/database/models/voucher";

export async function GET(req: Request) {
  try {
    const voucherModel = new Voucher();
    const vouchers = await voucherModel.findAll();

    if (!vouchers || vouchers.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: [], message: "Tidak ada voucher tersedia" }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data: vouchers }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error fetching vouchers:", error);
    return new Response(
      JSON.stringify({ success: false, message: 'Database error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
