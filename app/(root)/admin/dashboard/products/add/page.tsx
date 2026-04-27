"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import * as z from "zod";

import productSchema from "@/schemas/productSchema";
import VariantItem from "@/app/components/product/VariantItem";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormValues = z.infer<typeof productSchema>;

export default function AddProduct() {
	const [loading, setLoading] = useState(false);
	const [slugEdited, setSlugEdited] = useState(false);
	const [categories, setCategories] = useState<any[]>([]);

	const form = useForm<FormValues>({
		resolver: zodResolver(productSchema),
		mode: "onSubmit",
		defaultValues: {
			name: "",
			slug: "",
			description: "",
			price: 0,
			discount_price: 0,
			stock: 0, // ✅ NEW
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

	// 🔹 Fetch categories
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const res = await fetch("/api/category");
				const data = await res.json();
				setCategories(data.data || []);
			} catch (error) {
				console.error(error);
			}
		};
		fetchCategories();
	}, []);

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

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
					{/* Name */}
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										{...field}
										onChange={(e) => {
											field.onChange(e);
											if (!slugEdited) {
												form.setValue(
													"slug",
													e.target.value
														.toLowerCase()
														.trim()
														.replace(/\s+/g, "-")
														.replace(/[^\w-]+/g, ""),
												);
											}
										}}
									/>
								</FormControl>
								<FormMessage>{form.formState.errors.name?.message}</FormMessage>
							</FormItem>
						)}
					/>

					{/* Slug */}
					<FormField
						control={form.control}
						name="slug"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Slug</FormLabel>
								<FormControl>
									<Input
										{...field}
										onChange={(e) => {
											setSlugEdited(true);
											field.onChange(e);
										}}
									/>
								</FormControl>
								<FormMessage>{form.formState.errors.slug?.message}</FormMessage>
							</FormItem>
						)}
					/>

					{/* Price */}
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) =>
											field.onChange(
												e.target.value ? Number(e.target.value) : 0,
											)
										}
									/>
								</FormControl>
								<FormMessage>
									{form.formState.errors.price?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					{/* Discount Price */}
					<FormField
						control={form.control}
						name="discount_price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Discount Price</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) =>
											field.onChange(
												e.target.value ? Number(e.target.value) : 0,
											)
										}
									/>
								</FormControl>
								<FormMessage>
									{form.formState.errors.discount_price?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					{/* Stock */}
					<FormField
						control={form.control}
						name="stock"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Stock Quantity</FormLabel>
								<FormControl>
									<Input
										type="number"
										{...field}
										onChange={(e) =>
											field.onChange(
												e.target.value ? Number(e.target.value) : 0,
											)
										}
									/>
								</FormControl>
								<FormMessage>
									{form.formState.errors.stock?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					{/* Category */}
					<FormField
						control={form.control}
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<FormControl>
									<select
										{...field}
										className="w-full border rounded-md px-3 py-2"
									>
										<option value="">Select Category</option>
										{categories.map((cat) => (
											<option key={cat._id} value={cat._id}>
												{cat.name}
											</option>
										))}
									</select>
								</FormControl>
								<FormMessage>
									{form.formState.errors.category?.message}
								</FormMessage>
							</FormItem>
						)}
					/>

					{/* Variants */}
					<div className="space-y-4">
						<div className="flex justify-between">
							<h2 className="font-semibold">Variants</h2>
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
			</Form>
		</div>
	);
}
