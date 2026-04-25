import mongoose, { Schema, models, model } from "mongoose";

// 🔸 Size Sub Schema
const SizeSchema = new Schema(
	{
		size: {
			type: String, // S, M, L, XL
			required: false,
		},
		stock: {
			type: Number,
			default: 0,
		},
	},
	{ _id: false },
);

// 🔸 Variant Sub Schema (Color ভিত্তিক)
const VariantSchema = new Schema(
	{
		color: {
			type: String, // Red, Blue
			required: false,
		},
		image: {
			type: String, // 🔥 color specific image
			required: false,
		},
		sizes: [SizeSchema], // 🔥 size array inside color
	},
	{ _id: false },
);

const ProductSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
		},

		price: {
			type: Number,
			required: true,
		},
		discount_price: {
			type: Number,
			required: false,
		},

		// 🔥 Default Image (fallback)
		image: {
			type: String,
		},

		// 🔥 Variants (color + size)
		variants: [VariantSchema],

		// 🔗 Category Reference
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},

		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
