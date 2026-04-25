import EditCategoryForm from "./EditCategoryForm";

type Props = {
	params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
	const { id } = await params;

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/category/${id}`,
		{ cache: "no-store" },
	);

	const result = await res.json();

	if (!res.ok) {
		return <div className="p-4">Failed to load category</div>;
	}

	return (
		<div className="p-4 max-w-xl mx-auto">
			<h1 className="text-2xl font-bold mb-6">Edit Category</h1>

			<EditCategoryForm initialData={result.data} />
		</div>
	);
}
