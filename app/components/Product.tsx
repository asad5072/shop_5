"use client";
import useProduct from "../features/product/useProduct";

export default function Product() {
	const { products } = useProduct();
	return (
		<div className="grid grid-cols-2 gap-4">
			{products.map((product) => (
				<div
					key={product.id}
					className="px-3 py-2 border border-slate-800 rounded space-y-2"
				>
					<p>{product.name}</p>
					<p>Price: ${product.price.toFixed(2)}</p>
					<button
						onClick={() => {}}
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
					>
						Add to Cart
					</button>
				</div>
			))}
		</div>
	);
}
