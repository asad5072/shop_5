"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Category = {
	_id: string;
	name: string;
	slug: string;
	image?: string;
	isActive: boolean;
};

export default function CategoryList() {
	const [data, setData] = useState<Category[]>([]);
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);

	const fetchData = useCallback(async (pageNumber: number) => {
		try {
			setLoading(true);

			const res = await fetch(`/api/category?page=${pageNumber}`);
			const result = await res.json();

			setData(result.data);
			setTotalPages(result.totalPages);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		const loadData = async () => {
			try {
				setLoading(true);

				const res = await fetch(`/api/category?page=${page}`);
				const result = await res.json();

				setData(result.data);
				setTotalPages(result.totalPages);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		loadData();
	}, [page]);

	// 👉 Delete
	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure?")) return;

		try {
			await fetch("/api/category", {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ id }),
			});

			fetchData(page);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Category List</h1>

			<div className="overflow-x-auto border rounded-lg">
				<table className="w-full text-sm">
					<thead className="bg-gray-100">
						<tr>
							<th className="p-2 text-left">#</th>
							<th className="p-2 text-left">Image</th>
							<th className="p-2 text-left">Title</th>
							<th className="p-2 text-left">Slug</th>
							<th className="p-2 text-left">Status</th>
							<th className="p-2 text-right">Actions</th>
						</tr>
					</thead>

					<tbody>
						{loading ? (
							<tr>
								<td
									colSpan={6}
									className="text-center p-4"
								>
									Loading...
								</td>
							</tr>
						) : data.length === 0 ? (
							<tr>
								<td
									colSpan={6}
									className="text-center p-4"
								>
									No data found
								</td>
							</tr>
						) : (
							data.map((item, index) => (
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
												className="w-10 h-10 rounded object-cover"
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
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			<div className="flex justify-center mt-4 gap-2">
				<Button
					disabled={page === 1}
					onClick={() => setPage((p) => p - 1)}
				>
					Prev
				</Button>

				<span className="px-4 py-2">
					Page {page} / {totalPages}
				</span>

				<Button
					disabled={page === totalPages}
					onClick={() => setPage((p) => p + 1)}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
