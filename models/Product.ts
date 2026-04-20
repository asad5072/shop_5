import mongoose, { Schema, models, model } from "mongoose";

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
		stock: {
			type: Number,
			default: 0,
		},
		image: {
			type: String,
		},

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
