import { LuUserRound } from "react-icons/lu";
import { AiOutlineDashboard } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { IoShirtOutline } from "react-icons/io5";
import { MdOutlinePermMedia, MdOutlineShoppingBag } from "react-icons/md";
import { RiCoupon3Line } from "react-icons/ri";
import { TbBrandProducthunt } from "react-icons/tb";
import { IoMdStarOutline } from "react-icons/io";
import { IconType } from "react-icons/lib";

interface SidebarMenuItem {
	title: string;
	icon?: IconType;
	url?: string;
	submenu?: SidebarMenuItem[];
}

const admnSidebarMenu: SidebarMenuItem[] = [
	{
		title: "Dashboard",
		icon: AiOutlineDashboard,
		url: "/admin/dashboard",
	},
	{
		title: "Categories",
		icon: BiCategory,
		url: "#",
		submenu: [
			{
				title: "Add Category",
				url: "/admin/categories/add",
				icon: BiCategory,
			},
			{
				title: "All Category",
				url: "/admin/categories",
				icon: BiCategory,
			},
		],
	},
	{
		title: "Products",
		icon: IoShirtOutline,
		url: "#",
		submenu: [
			{
				title: "Add Product",
				url: "/admin/products/add",
				icon: TbBrandProducthunt,
			},
			{
				title: "Add Variant",
				url: "/admin/products/variants/add",
				icon: TbBrandProducthunt,
			},
			{
				title: "All Products",
				url: "/admin/products",
				icon: TbBrandProducthunt,
			},
			{
				title: "Product Variants",
				url: "/admin/products/variants",
				icon: TbBrandProducthunt,
			},
		],
	},
	{
		title: "Coupons",
		icon: RiCoupon3Line,
		url: "#",
		submenu: [
			{
				title: "Add Coupon",
				url: "/admin/coupons/add",
				icon: RiCoupon3Line,
			},
			{
				title: "All Coupons",
				url: "/admin/coupons",
				icon: RiCoupon3Line,
			},
		],
	},
	{
		title: "Orders",
		icon: MdOutlineShoppingBag,
		url: "#",
	},
	{
		title: "Customers",
		icon: LuUserRound,
		url: "#",
	},
	{
		title: "Ratings & Reviews",
		icon: IoMdStarOutline,
		url: "#",
	},
	{
		title: "Medias",
		icon: MdOutlinePermMedia,
		url: "#",
	},
];
export default admnSidebarMenu;
