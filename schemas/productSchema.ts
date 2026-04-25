import * as z from "zod";

export const productSchema = z.object({
	name: z.string().min(2, "Name is required"),

	slug: z
		.string()
		.min(2)
		.regex(/^[a-z0-9-]+$/, "Slug must be lowercase & hyphen"),

	description: z.string().optional(),

	price: z.number().min(1, "Price is required"),

	discount_price: z.number().optional(),

	image: z.string().optional(),

	category: z.string().min(1, "Category is required"),

	isActive: z.boolean(),

	variants: z.array(
		z.object({
			color: z.string().optional(),
			image: z.string().optional(),

			sizes: z.array(
				z.object({
					size: z.string().optional(),
					stock: z.number().optional(),
				}),
			),
		}),
	),
});
