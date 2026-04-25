export default function Loading() {
	return (
		<div className="p-4 space-y-3">
			{[1, 2, 3, 4, 5].map((i) => (
				<div
					key={i}
					className="h-12 bg-gray-200 animate-pulse rounded"
				></div>
			))}
		</div>
	);
}
