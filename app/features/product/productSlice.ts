import { createSlice } from "@reduxjs/toolkit";

export interface Product {
	id: number;
	name: string;
	price: number;
	description?: string;
	imageUrl?: string;
}
const initialState: Product[] = [
	{
		id: 1,
		name: "Product 1",
		price: 10,
		description: "This is Product 1",
		imageUrl: "/images/product1.jpg",
	},
	{
		id: 2,
		name: "Product 2",
		price: 20,
		description: "This is Product 2",
		imageUrl: "/images/product2.jpg",
	},
];
const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
});

export default productSlice.reducer;
