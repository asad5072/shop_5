import CategoryTable from "./CategoryTable";

type Props = {
	searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
	const params = await searchParams;
	const page = Number(params.page || 1);

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/category?page=${page}`,
		{
			cache: "no-store",
		},
	);

	const result = await res.json();

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Category List</h1>

			<CategoryTable
				data={result.data}
				page={result.page}
				totalPages={result.totalPages}
			/>
		</div>
	);
}
