import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/db";

// 👉 CREATE PRODUCT
export async function POST(req: Request) {
	try {
		await connectToDatabase();

		const body = await req.json();

		const {
			name,
			slug,
			description,
			price,
			discount_price,
			image,
			category,
			isActive,
			variants,
		} = body;

		// 🔴 Basic validation
		if (!name || !slug || !price || !category) {
			return NextResponse.json(
				{ error: "Required fields missing" },
				{ status: 400 },
			);
		}

		// 🔥 Check slug uniqueness
		const existing = await Product.findOne({ slug });
		if (existing) {
			return NextResponse.json(
				{ error: "Slug already exists" },
				{ status: 400 },
			);
		}

		// 🔥 Clean variants (important)
		const cleanVariants =
			variants?.map((variant: any) => ({
				color: variant.color || "",
				image: variant.image || "",
				sizes:
					variant.sizes?.map((s: any) => ({
						size: s.size || "",
						stock: Number(s.stock) || 0,
					})) || [],
			})) || [];

		const product = await Product.create({
			name,
			slug,
			description,
			price,
			discount_price,
			image,
			category,
			isActive,
			variants: cleanVariants,
		});

		return NextResponse.json(
			{ data: product, message: "Product created successfully" },
			{ status: 201 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to create product" },
			{ status: 500 },
		);
	}
}
