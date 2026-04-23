"use client";
import { useAppSelector } from "../../store/hooks";
const useProduct = () => {
	const products = useAppSelector((state) => state.product);
	return { products };
};
export default useProduct;
