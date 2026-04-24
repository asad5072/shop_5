"use client";

import formSchema from "@/schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

type FormValues = z.input<typeof formSchema>;

export default function AddCategory() {
	const [loading, setLoading] = useState(false);
	const [slugEdited, setSlugEdited] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			slug: "",
			image: "",
			description: "",
			isActive: true,
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			setLoading(true);

			const res = await fetch("/api/category", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result = await res.json();

			if (!res.ok) {
				alert(result.error || "Something went wrong");
				return;
			}

			alert("Category created successfully ✅");

			form.reset();
			setSlugEdited(false); // 🔥 reset slug state
		} catch (error) {
			console.error(error);
			alert("Server error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="p-4 w-full max-w-xl mx-auto">
			<h1 className="text-2xl font-bold text-center mb-6">Add New Category</h1>

			<form
				id="category-form"
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-5"
			>
				<FieldGroup>
					{/* Name */}
					<Controller
						control={form.control}
						name="name"
						render={({ field }) => (
							<Field>
								<FieldLabel>Category Name</FieldLabel>
								<Input
									{...field}
									placeholder="Books"
									onChange={(e) => {
										field.onChange(e);

										// 🔥 Auto slug (only if user didn't edit slug)
										if (!slugEdited) {
											form.setValue(
												"slug",
												e.target.value
													.toLowerCase()
													.replace(/ /g, "-")
													.replace(/[^\w-]+/g, ""),
											);
										}
									}}
								/>
								<FieldError>{form.formState.errors.name?.message}</FieldError>
							</Field>
						)}
					/>

					{/* Slug */}
					<Controller
						control={form.control}
						name="slug"
						render={({ field }) => (
							<Field>
								<FieldLabel>Slug</FieldLabel>
								<Input
									{...field}
									placeholder="books-category"
									onChange={(e) => {
										setSlugEdited(true); // 🔥 user override
										field.onChange(e);
									}}
								/>
								<FieldError>{form.formState.errors.slug?.message}</FieldError>
							</Field>
						)}
					/>

					{/* Image */}
					<Controller
						control={form.control}
						name="image"
						render={({ field }) => (
							<Field>
								<FieldLabel>Image URL</FieldLabel>
								<Input
									{...field}
									placeholder="https://example.com/image.jpg"
								/>
								<FieldError>{form.formState.errors.image?.message}</FieldError>
							</Field>
						)}
					/>

					{/* Description */}
					<Controller
						control={form.control}
						name="description"
						render={({ field }) => (
							<Field>
								<FieldLabel>Description</FieldLabel>
								<Textarea
									{...field}
									placeholder="Short description"
								/>
								<FieldError>
									{form.formState.errors.description?.message}
								</FieldError>
							</Field>
						)}
					/>

					{/* isActive */}
					<Controller
						control={form.control}
						name="isActive"
						render={({ field }) => (
							<Field className="flex items-center justify-between">
								<FieldLabel>Active</FieldLabel>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</Field>
						)}
					/>
				</FieldGroup>
			</form>

			{/* Submit Button */}
			<Button
				type="submit"
				form="category-form"
				className="w-full mt-4"
				disabled={loading}
			>
				{loading ? "Submitting..." : "Create Category"}
			</Button>
		</div>
	);
}
