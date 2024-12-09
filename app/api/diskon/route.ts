import { Diskon } from "@/database/models/diskon";
import { Promo } from "@/database/models/promo";
import { TrPembelianVoucher } from "@/database/models/trPembelianVoucher";
import { PromoType, TrPembelianVoucherType } from "@/database/types";

export async function GET(req: Request) { 
    try {
        const query = new URL(req.url).searchParams;
        const userId = query.get("id");

        const trPembelianVoucher = new TrPembelianVoucher();
        const data = await trPembelianVoucher.findMany('idpelanggan', userId);

        const kodeDiskons = data.map((item: TrPembelianVoucherType) => item.idvoucher);

        const promoModel = new Promo();
        const promos: PromoType[] = await promoModel.findAll();

        // Filter Promos by expiration date
        const currentDateTime = new Date();

        const validPromos = promos.filter((promo: PromoType) => {
            return new Date(promo.tglakhirberlaku) > currentDateTime;
        }).map((promo: PromoType) => promo.kode);

        const diskon = new Diskon();

        let diskonList = [];
        for (const kodeDiskon of [...kodeDiskons, ...validPromos]) {
            const diskonData = await diskon.findBy('kode', kodeDiskon);
            if (diskonData) {
                diskonList.push(diskonData);
            }
        }

        return new Response(JSON.stringify({
            user: userId,
            data: [
                ... diskonList
            ]
        }), { status: 200 });
    }
    catch (error) {
        if (error instanceof Error) {
            return new Response(error.message, { status: 500 });
        } else {
            return new Response("An unknown error occurred", { status: 500 });
        }
    }
}