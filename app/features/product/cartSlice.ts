import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

export interface CartItem extends Product {
	quantity: number;
}

const initialState: CartItem[] = [];
const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const existingItem = state.find(
				(item) => item._id === action.payload._id,
			);
			if (existingItem) {
				alert("Product already in cart");
			} else {
				state.push({ ...action.payload, quantity: action.payload.quantity });
			}
		},
		removeFromCart: (state, action) => {
			return state.filter((item) => item._id !== action.payload);
		},
		updateQuantity: (state, action) => {
			const item = state.find((item) => item._id === action.payload._id);
			if (item) {
				item.quantity = action.payload.quantity;
			}
		},
		increaseQuantity: (state, action) => {
			const item = state.find((item) => item._id === action.payload);
			if (item) {
				item.quantity += 1;
			}
		},
		decreaseQuantity: (state, action) => {
			const item = state.find((item) => item._id === action.payload);
			if (item && item.quantity > 1) {
				item.quantity -= 1;
			}
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	updateQuantity,
	increaseQuantity,
	decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
