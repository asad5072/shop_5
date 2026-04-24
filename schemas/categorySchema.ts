import * as z from "zod";

const formSchema = z.object({
	name: z
		.string()
		.min(2, "Category name must be at least 2 characters")
		.max(50, "Category name cannot exceed 50 characters"),

	image: z.string().optional(),

	slug: z
		.string()
		.min(2, "Slug is required")
		.regex(/^[a-z0-9-]+$/, "Slug must be lowercase and hyphen only"),

	description: z.string().optional(),

	isActive: z.boolean().default(true),
});
export default formSchema;
