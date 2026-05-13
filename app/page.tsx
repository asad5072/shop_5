import Product from "./components/Product";
import Cart from "./components/product/Cart";
export default function Home() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<p>Hello world!</p>
			<Product />
			<Cart />
		</div>
	);
}
