"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import VariantItem from "@/app/components/product/VariantItem";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormValues } from "@/lib/admin/type";

export default function AddProduct() {
	const [loading, setLoading] = useState(false);

	const form = useForm<FormValues>({
		defaultValues: {
			name: "",
			slug: "",
			description: "",
			price: 0,
			discount_price: 0,
			image: "",
			category: "",
			isActive: true,
			variants: [],
		},
	});

	const {
		fields: variantFields,
		append: addVariant,
		remove: removeVariant,
	} = useFieldArray({
		control: form.control,
		name: "variants",
	});

	const onSubmit = async (data: FormValues) => {
		try {
			setLoading(true);

			const res = await fetch("/api/product", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result = await res.json();

			if (!res.ok) {
				alert(result.error || "Failed");
				return;
			}

			alert("Product created successfully ✅");
			form.reset();
		} catch (error) {
			console.error(error);
			alert("Server error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6 space-y-6">
			<h1 className="text-2xl font-bold">Add Product</h1>

			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				{/* Basic Info */}
				<Input placeholder="Name" {...form.register("name")} />
				<Input placeholder="Slug" {...form.register("slug")} />
				<Input placeholder="Description" {...form.register("description")} />

				<Input
					type="number"
					placeholder="Price"
					{...form.register("price", { valueAsNumber: true })}
				/>

				<Input
					type="number"
					placeholder="Discount Price"
					{...form.register("discount_price", { valueAsNumber: true })}
				/>

				<Input placeholder="Default Image URL" {...form.register("image")} />
				<Input placeholder="Category ID" {...form.register("category")} />

				{/* Variants */}
				<div className="space-y-4">
					<div className="flex justify-between items-center">
						<h2 className="font-semibold text-lg">Variants</h2>
						<Button
							type="button"
							onClick={() => addVariant({ color: "", image: "", sizes: [] })}
						>
							Add Color
						</Button>
					</div>

					{variantFields.map((variant, index) => (
						<VariantItem
							key={variant.id}
							control={form.control}
							register={form.register}
							index={index}
							removeVariant={removeVariant}
						/>
					))}
				</div>

				<Button type="submit" disabled={loading} className="w-full">
					{loading ? "Saving..." : "Create Product"}
				</Button>
			</form>
		</div>
	);
}
