export function Wave({ text, hover }: { text: string; hover?: boolean }) {
	const parentClassName = hover ? "wave-hover-parent" : "";
	const className = hover ? "wave-hover" : "wave";
	return (
		<span className={parentClassName}>
			{text.split("").map((char, i) => (
				<span className={className} style={{ animationDelay: `${0.1 * i}s` }}>
					{char}
				</span>
			))}
		</span>
	);
}
