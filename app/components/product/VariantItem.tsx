import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFieldArray, Control } from "react-hook-form";
import { FormValues } from "@/lib/admin/type";

type VariantProps = {
	control: Control<FormValues>;
	register: any;
	index: number;
	removeVariant: (index: number) => void;
};

export default function VariantItem({
	control,
	register,
	index,
	removeVariant,
}: VariantProps) {
	const { fields, append, remove } = useFieldArray({
		control,
		name: `variants.${index}.sizes`,
	});

	return (
		<div className="border p-4 rounded-lg space-y-4">
			<div className="flex justify-between items-center">
				<h3 className="font-medium">Color #{index + 1}</h3>
				<Button
					type="button"
					variant="destructive"
					onClick={() => removeVariant(index)}
				>
					Remove
				</Button>
			</div>

			<Input
				placeholder="Color (Red, Blue)"
				{...register(`variants.${index}.color`)}
			/>

			<Input placeholder="Image URL" {...register(`variants.${index}.image`)} />

			{/* Sizes */}
			<div className="space-y-2">
				<div className="flex justify-between items-center">
					<p className="text-sm font-medium">Sizes</p>
					<Button
						type="button"
						size="sm"
						onClick={() => append({ size: "", stock: 0 })}
					>
						Add Size
					</Button>
				</div>

				{fields.map((field, i) => (
					<div key={field.id} className="flex gap-2">
						<Input
							placeholder="Size (M, L)"
							{...register(`variants.${index}.sizes.${i}.size`)}
						/>

						<Input
							type="number"
							placeholder="Stock"
							{...register(`variants.${index}.sizes.${i}.stock`, {
								valueAsNumber: true,
							})}
						/>

						<Button
							type="button"
							variant="destructive"
							onClick={() => remove(i)}
						>
							X
						</Button>
					</div>
				))}
			</div>
		</div>
	);
}
