import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
	await connectToDatabase();
	return NextResponse.json({
		message: "Database connection successful!",
		success: true,
	});
}
