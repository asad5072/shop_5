import { Schema, models, model } from "mongoose";
import globe from "@/public/globe.png";

const CategorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
			default: globe.src,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

const Category = models.Category || model("Category", CategorySchema);

export default Category;
