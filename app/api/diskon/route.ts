import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch data promo dan voucher
    const [promoResponse, voucherResponse] = await Promise.all([
      fetch(`${process.env.BASE_API_URL}/diskon/promo`), // Ganti dengan URL API internal
      fetch(`${process.env.BASE_API_URL}/diskon/voucher`), // Ganti dengan URL API internal
    ]);

    const promoData = await promoResponse.json();
    const voucherData = await voucherResponse.json();

    return NextResponse.json({
      success: true,
      data: [...promoData.data, ...voucherData.data], // Gabungkan promo dan voucher
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch discounts", error },
      { status: 500 }
    );
  }
}
