import { Diskon } from "@/database/models/diskon"; // Assuming you have a `Diskon` model

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const voucherCode = url.searchParams.get("kode"); // Extract voucherCode from query string

    if (!voucherCode) {
      return new Response(
        JSON.stringify({ success: false, message: "Voucher code is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const diskonModel = new Diskon();
    // Use findBy method to fetch data based on voucherCode
    const diskonDetails = await diskonModel.findBy("kode", voucherCode);

    if (!diskonDetails) {
      return new Response(
        JSON.stringify({ success: false, message: "Voucher details not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return the potongan and mintrpemesanan values along with other data
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          potongan: diskonDetails.potongan,
          mintrpemesanan: diskonDetails.mintrpemesanan,
          // Include other necessary data from the diskon table
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching diskon details:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Database error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
