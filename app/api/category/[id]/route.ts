import { NextResponse } from "next/server";
import Category from "@/models/Category";
import { connectToDatabase } from "@/lib/db";

// 👉 GET single category
export async function GET(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		await connectToDatabase();

		const { id } = await params; // 🔥 FIX

		const category = await Category.findById(id);

		if (!category) {
			return NextResponse.json(
				{ error: "Category not found" },
				{ status: 404 },
			);
		}

		return NextResponse.json({ data: category });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to fetch category" },
			{ status: 500 },
		);
	}
}

// 👉 UPDATE category
export async function PUT(
	req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		await connectToDatabase();

		const { id } = await params; // 🔥 FIX
		const body = await req.json();

		const { name, slug, image, description, isActive } = body;

		if (!name || !slug) {
			return NextResponse.json(
				{ error: "Name and slug are required" },
				{ status: 400 },
			);
		}

		const existing = await Category.findOne({
			slug,
			_id: { $ne: id },
		});

		if (existing) {
			return NextResponse.json(
				{ error: "Slug already exists" },
				{ status: 400 },
			);
		}

		const updated = await Category.findByIdAndUpdate(
			id,
			{ name, slug, image, description, isActive },
			{ new: true },
		);

		return NextResponse.json({
			data: updated,
			message: "Category updated successfully",
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Update failed" }, { status: 500 });
	}
}
