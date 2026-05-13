"use client";

import Image from "next/image";

import { Trash2, Plus, Minus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useCart } from "@/app/features/product/useCart";

export default function Cart() {
	const {
		cartItems,
		subtotal,
		tax,
		total,
		totalItems,
		dispatch,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
	} = useCart();

	// 🔥 Empty Cart
	if (cartItems.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20">
				<h2 className="text-2xl font-bold">Your cart is empty 🛒</h2>

				<p className="text-muted-foreground mt-2">Add products to your cart</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
			{/* LEFT SIDE */}
			<div className="lg:col-span-2 space-y-4">
				<h1 className="text-3xl font-bold">Shopping Cart ({totalItems})</h1>

				{cartItems.map((item) => (
					<div
						key={item._id}
						className="border rounded-xl p-4 flex gap-4 items-center"
					>
						{/* IMAGE */}
						<div className="relative w-24 h-24 rounded-lg overflow-hidden border">
							<Image
								src={item.image || "/placeholder.png"}
								alt={item.name}
								fill
								className="object-cover"
							/>
						</div>

						{/* INFO */}
						<div className="flex-1 space-y-2">
							<h2 className="font-semibold text-lg">{item.name}</h2>

							<p className="text-muted-foreground text-sm">৳ {item.price}</p>

							{/* QUANTITY */}
							<div className="flex items-center gap-2">
								<Button
									type="button"
									size="icon"
									variant="outline"
									onClick={() => decreaseQuantity(item._id.toString())}
								>
									<Minus className="w-4 h-4" />
								</Button>

								<span className="w-8 text-center">{item.quantity}</span>

								<Button
									type="button"
									size="icon"
									variant="outline"
									onClick={() => increaseQuantity(item._id.toString())}
								>
									<Plus className="w-4 h-4" />
								</Button>
							</div>
						</div>

						{/* PRICE */}
						<div className="text-right space-y-2">
							<p className="font-bold text-lg">
								৳ {item.price * item.quantity}
							</p>

							<Button
								type="button"
								variant="destructive"
								size="icon"
								onClick={() => dispatch(removeFromCart(item._id))}
							>
								<Trash2 className="w-4 h-4" />
							</Button>
						</div>
					</div>
				))}
			</div>

			{/* RIGHT SIDE */}
			<div className="border rounded-xl p-6 h-fit sticky top-10">
				<h2 className="text-2xl font-bold mb-6">Order Summary</h2>

				<div className="space-y-4">
					<div className="flex justify-between">
						<span>Subtotal</span>
						<span>৳ {subtotal.toFixed(2)}</span>
					</div>

					<div className="flex justify-between">
						<span>Tax</span>
						<span>৳ {tax.toFixed(2)}</span>
					</div>

					<div className="border-t pt-4 flex justify-between text-lg font-bold">
						<span>Total</span>
						<span>৳ {total.toFixed(2)}</span>
					</div>

					<Button className="w-full mt-4">Checkout</Button>
				</div>
			</div>
		</div>
	);
}
