import { NextResponse } from "next/server";
import Category from "@/models/Category";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: Request) {
	try {
		await connectToDatabase();
		const { name, image, slug, description } = await req.json();

		if (!name || !slug) {
			return NextResponse.json(
				{ error: "Name and slug are required" },
				{ status: 400 },
			);
		}
		const category = await Category.create({ name, image, slug, description });
		return NextResponse.json(
			{ data: category, message: "Category created successfully" },
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to create category" },
			{ status: 500 },
		);
	}
}
