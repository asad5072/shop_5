"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import logoBlack from "@/public/globe.svg";

type Category = {
	id: number;
	title: string;
	image: string;
};

const categories: Category[] = [
	{
		id: 1,
		title: "Electronics",
		image: logoBlack,
	},
	{
		id: 2,
		title: "Fashion",
		image: logoBlack,
	},
	{
		id: 3,
		title: "Books",
		image: logoBlack,
	},
];

export default function AllCategories() {
	return (
		<div className="p-4 md:p-6">
			<h1 className="text-2xl md:text-3xl font-bold mb-6">All Categories</h1>

			{/* Desktop Table */}
			<div className="hidden md:block border rounded-xl overflow-hidden">
				<table className="w-full text-left">
					<thead className="bg-gray-100">
						<tr>
							<th className="p-3">#</th>
							<th className="p-3">Image</th>
							<th className="p-3">Title</th>
							<th className="p-3 text-right">Actions</th>
						</tr>
					</thead>
					<tbody>
						{categories.map((cat, index) => (
							<tr key={cat.id} className="border-t hover:bg-gray-50 transition">
								<td className="p-3">{index + 1}</td>

								<td className="p-3">
									<Image
										src={cat.image}
										alt={cat.title}
										width={50}
										height={50}
										className="rounded-md object-cover"
									/>
								</td>

								<td className="p-3 font-medium">{cat.title}</td>

								<td className="p-3 flex justify-end gap-2">
									<Button size="sm" variant="outline">
										<Pencil className="w-4 h-4 mr-1" />
										Edit
									</Button>

									<Button size="sm" variant="destructive">
										<Trash className="w-4 h-4 mr-1" />
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Mobile Card View */}
			<div className="grid gap-4 md:hidden">
				{categories.map((cat, index) => (
					<div
						key={cat.id}
						className="border rounded-xl p-4 flex gap-4 items-center shadow-sm"
					>
						<Image
							src={cat.image}
							alt={cat.title}
							width={60}
							height={60}
							className="rounded-lg object-cover"
						/>

						<div className="flex-1">
							<p className="text-sm text-gray-500">#{index + 1}</p>
							<h2 className="font-semibold">{cat.title}</h2>
						</div>

						<div className="flex flex-col gap-2">
							<Button size="icon" variant="outline">
								<Pencil className="w-4 h-4" />
							</Button>

							<Button size="icon" variant="destructive">
								<Trash className="w-4 h-4" />
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
