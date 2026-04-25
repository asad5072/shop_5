"use client";

import formSchema from "@/schemas/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

export default function EditCategoryForm({
	initialData,
}: {
	initialData: any;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [slugEdited, setSlugEdited] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialData.name || "",
			slug: initialData.slug || "",
			image: initialData.image || "",
			description: initialData.description || "",
			isActive: initialData.isActive ?? true,
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			setLoading(true);

			const res = await fetch(`/api/category/${initialData._id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result = await res.json();

			if (!res.ok) {
				alert(result.error || "Update failed");
				return;
			}

			alert("Category updated successfully ✅");

			router.push("/admin/dashboard/category/all");
			router.refresh();
		} catch (error) {
			console.error(error);
			alert("Server error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
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
							<FieldLabel>Name</FieldLabel>
							<Input
								{...field}
								onChange={(e) => {
									field.onChange(e);
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
								onChange={(e) => {
									setSlugEdited(true);
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
							<Input {...field} />
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
							<Textarea {...field} />
						</Field>
					)}
				/>

				{/* Active */}
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

			<Button
				type="submit"
				disabled={loading}
				className="w-full"
			>
				{loading ? "Updating..." : "Update Category"}
			</Button>
		</form>
	);
}
