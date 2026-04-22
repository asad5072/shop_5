import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI in .env.local");
}

declare global {
	var mongoose: {
		conn: Connection | null;
		promise: Promise<Connection> | null;
	};
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<Connection> {
	if (cached.conn) return cached.conn;

	if (!cached.promise) {
		cached.promise = mongoose
			.connect(MONGODB_URI)
			.then((mongooseInstance) => mongooseInstance.connection);
	}

	try {
		cached.conn = await cached.promise;
	} catch (error) {
		console.error("MongoDB connection error:", error);
		throw error;
	}

	return cached.conn;
}
