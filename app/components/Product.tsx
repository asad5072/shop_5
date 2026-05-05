"use client";

import { useEffect } from "react";
import { fetchProducts } from "../features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function ProductList() {
	const dispatch = useAppDispatch();
	const { products, loading, error } = useAppSelector((state) => state.product);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
			{products.map((product) => (
				<div
					key={product._id}
					className="border p-4 rounded"
				>
					{/* <img
						src={product.image || "/placeholder.png"}
						className="h-40 w-full object-cover"
					/> */}
					<h2 className="font-bold">{product.name}</h2>
					<p>${product.price}</p>
				</div>
			))}
		</div>
	);
}
