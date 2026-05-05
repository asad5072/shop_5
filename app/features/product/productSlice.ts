import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Product {
	_id: number;
	name: string;
	price: number;
	description?: string;
	imageUrl?: string;
}
// const initialState: Product[] = [
// 	{
// 		_id: 1,
// 		name: "Product 1",
// 		price: 10,
// 		description: "This is Product 1",
// 		imageUrl: "/images/product1.jpg",
// 	},
// 	{
// 		_id: 2,
// 		name: "Product 2",
// 		price: 20,
// 		description: "This is Product 2",
// 		imageUrl: "/images/product2.jpg",
// 	},
// ];

interface ProductState {
	products: Product[];
	loading: boolean;
	error: string | null;
}

const initialState: ProductState = {
	products: [],
	loading: false,
	error: null,
};

// 🔥 Async Fetch
export const fetchProducts = createAsyncThunk(
	"product/fetchProducts",
	async (_, { rejectWithValue }) => {
		try {
			const res = await fetch("/api/product");

			const data = await res.json();

			if (!res.ok) {
				return rejectWithValue(data.error);
			}

			return data.data;
		} catch (error) {
			return rejectWithValue("Failed to fetch products");
		}
	},
);

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default productSlice.reducer;
