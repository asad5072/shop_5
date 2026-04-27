export type Size = {
	size?: string;
	stock?: number;
};

export type Variant = {
	color?: string;
	image?: string;
	sizes: Size[];
};

export type FormValues = {
	name: string;
	slug: string;
	description?: string;
	price: number;
	discount_price?: number;
	stock: number;
	image?: string;
	category: string;
	isActive: boolean;
	variants: Variant[];
};
