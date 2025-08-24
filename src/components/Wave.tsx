interface WaveProps {
	text: string;
}

export function Wave({ text }: WaveProps) {
	const style = `
	@keyframes wave {
		0% { transform: translateY(0); }
		25% { transform: translateY(-3px); }
		50% { transform: translateY(0); }
		75% { transform: translateY(3px); }
		100% { transform: translateY(0); }
	}
	.wave-char {
		animation: wave 1.4s steps(2,end) infinite;
	}
	`;

	return (
		<>
			<style>{style}</style>
			<span className="inline-block whitespace-pre">
				{[...Array.from(text)].map((char, i) => (
					<span
						key={i}
						className="wave-char inline-block will-change-transform"
						style={{
							animationDelay: `${i * 0.05}s`,
						}}
					>
						{char}
					</span>
				))}
			</span>
		</>
	);
}
