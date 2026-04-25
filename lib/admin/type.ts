export type FormValues = {
	name: string;
	slug: string;
	description?: string;
	price: number;
	discount_price?: number;
	image?: string;
	category: string;
	isActive: boolean;

	variants: {
		color?: string;
		image?: string;
		sizes: {
			size?: string;
			stock?: number;
		}[];
	}[];
};
