"use client";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Product } from "./productSlice";
import { addToCart } from "./cartSlice";
const useProduct = () => {
	const products = useAppSelector((state) => state.product);
	const cartItems = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	const handleAddToCart = (product: Product) => {
		const existingCartItem = cartItems.some((item) => item._id === product._id);
		if (existingCartItem) {
			alert("Product is already in the cart");
			return;
		}
		dispatch(addToCart({ ...product, quantity: 1 }));
		alert("Product added to cart successfully");
	};
	return { products, handleAddToCart };
};
export default useProduct;
