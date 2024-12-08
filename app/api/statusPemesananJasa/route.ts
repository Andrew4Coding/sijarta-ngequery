import { TrPemesananStatus } from "@/database/models/trPemesananStatus";
import { StatusPesanan } from "@/database/models/statusPesanan"; // Assuming this model exists

export async function GET(req: Request) {
  try {
    // Fetch all trPemesananStatus (only idstatus)
    const trPemesananStatusModel = new TrPemesananStatus();
    const statusData = await trPemesananStatusModel.findAll();

    if (!statusData || statusData.length === 0) {
      return new Response(
        JSON.stringify({ success: true, data: [], message: "No orders found" }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Fetch all statusPesanan to map idstatus to nama (status name)
    const statusPesananModel = new StatusPesanan();
    const allStatuses = await statusPesananModel.findAll();

    // Combine the data from trPemesananStatus and statusPesanan
    const combinedData = statusData.map((orderStatus) => {
      const statusDetail = allStatuses.find(status => status.id === orderStatus.idstatus);
      return {
        ...orderStatus,
        status: statusDetail ? statusDetail.nama : "Unknown", // Use nama from StatusPesanan
      };
    });

    return new Response(
      JSON.stringify({ success: true, data: combinedData }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error("Error fetching order statuses:", error);
    return new Response(
      JSON.stringify({ success: false, message: 'Database error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
