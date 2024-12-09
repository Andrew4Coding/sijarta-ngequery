import { z } from "zod";

export interface Order {
    id: string;
    subcategory: string;
    session: number;
    price: number;
    workername?: string;
    status: string;
}

export const createTestimonySchema = z.object({
    rating: z.coerce.number().int().min(1).max(10).refine(value => value >= 1 && value <= 10, {
        message: "Rating harus diantara 1 sampai 10"
    }),
    comment: z.string().nonempty().refine(value => value.length <= 500, {
        message: "Komentar tidak boleh lebih dari 500 karakter"
    })
});

