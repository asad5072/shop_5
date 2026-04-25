"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Category = {
	_id: string;
	name: string;
	slug: string;
	image?: string;
	isActive: boolean;
};

type Props = {
	data: Category[];
	page: number;
	totalPages: number;
};

export default function CategoryTable({ data, page, totalPages }: Props) {
	const router = useRouter();

	// 👉 Delete
	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure?")) return;

		await fetch("/api/category", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id }),
		});

		router.refresh(); // 🔥 reload server data
	};

	return (
		<>
			<div className="overflow-x-auto border rounded-lg">
				<table className="w-full text-sm">
					<thead className="bg-gray-100">
						<tr>
							<th className="p-2">#</th>
							<th className="p-2">Image</th>
							<th className="p-2">Name</th>
							<th className="p-2">Slug</th>
							<th className="p-2">Status</th>
							<th className="p-2 text-right">Actions</th>
						</tr>
					</thead>

					<tbody>
						{data.map((item, index) => (
							<tr
								key={item._id}
								className="border-t"
							>
								<td className="p-2">{(page - 1) * 5 + index + 1}</td>

								<td className="p-2">
									{item.image ? (
										<Image
											src={item.image}
											alt={item.name}
											width={40}
											height={40}
											className="w-10 h-10 object-cover rounded"
										/>
									) : (
										"-"
									)}
								</td>

								<td className="p-2">{item.name}</td>
								<td className="p-2">{item.slug}</td>

								<td className="p-2">
									<span
										className={`px-2 py-1 rounded text-xs ${
											item.isActive
												? "bg-green-100 text-green-700"
												: "bg-red-100 text-red-700"
										}`}
									>
										{item.isActive ? "Active" : "Inactive"}
									</span>
								</td>

								<td className="p-2 text-right space-x-2">
									<Button
										size="sm"
										variant="outline"
										onClick={() =>
											router.push(`/admin/dashboard/category/edit/${item._id}`)
										}
									>
										Edit
									</Button>

									<Button
										size="sm"
										variant="destructive"
										onClick={() => handleDelete(item._id)}
									>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="flex justify-center mt-4 gap-2">
				<Button
					disabled={page === 1}
					onClick={() => router.push(`?page=${page - 1}`)}
				>
					Prev
				</Button>

				<span className="px-4 py-2">
					Page {page} / {totalPages}
				</span>

				<Button
					disabled={page === totalPages}
					onClick={() => router.push(`?page=${page + 1}`)}
				>
					Next
				</Button>
			</div>
		</>
	);
}
