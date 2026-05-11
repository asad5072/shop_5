"use client";

import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import {
	removeFromCart,
	updateQuantity,
	increaseQuantity,
	decreaseQuantity,
} from "@/app/features/product/cartSlice";

export const useCart = () => {
	const cartItems = useAppSelector((state) => state.cart);
	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);
	const dispatch = useAppDispatch();

	const handleIncrease = (id: string) => {
		dispatch(increaseQuantity(id));
	};

	const handleDecrease = (id: string) => {
		dispatch(decreaseQuantity(id));
	};
	const subtotal = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);
	const tax = subtotal * 0.1; // Assuming a 10% tax rate
	const total = subtotal + tax;
	const totalItems = cartItems.reduce(
		(total, item) => total + item.quantity,
		0,
	);
	return {
		cartItems,
		totalPrice,
		subtotal,
		tax,
		total,
		totalItems,
		dispatch,
		removeFromCart,
		updateQuantity,
		increaseQuantity: handleIncrease,
		decreaseQuantity: handleDecrease,
	};
};
