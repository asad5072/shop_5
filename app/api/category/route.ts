import { NextResponse } from "next/server";
import Category from "@/models/Category";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: Request) {
	try {
		await connectToDatabase();

		const { name, image, slug, description, isActive } = await req.json();

		if (!name || !slug) {
			return NextResponse.json(
				{ error: "Name and slug are required" },
				{ status: 400 },
			);
		}

		// 🔥 slug unique check
		const existing = await Category.findOne({ slug });
		if (existing) {
			return NextResponse.json(
				{ error: "Slug already exists" },
				{ status: 400 },
			);
		}

		const category = await Category.create({
			name,
			image,
			slug,
			description,
			isActive,
		});

		return NextResponse.json(
			{
				data: category,
				message: "Category created successfully",
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to create category" },
			{ status: 500 },
		);
	}
}

// 👉 GET (with pagination)
export async function GET(req: Request) {
	try {
		await connectToDatabase();

		const { searchParams } = new URL(req.url);
		const page = Number(searchParams.get("page") || 1);
		const limit = 5;
		const skip = (page - 1) * limit;

		const total = await Category.countDocuments();
		const categories = await Category.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		return NextResponse.json({
			data: categories,
			total,
			page,
			totalPages: Math.ceil(total / limit),
		});
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch categories" },
			{ status: 500 },
		);
	}
}

// 👉 DELETE
export async function DELETE(req: Request) {
	try {
		await connectToDatabase();

		const { id } = await req.json();

		await Category.findByIdAndDelete(id);

		return NextResponse.json({
			message: "Category deleted successfully",
		});
	} catch (error) {
		return NextResponse.json({ error: "Delete failed" }, { status: 500 });
	}
}
