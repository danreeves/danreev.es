"use client";

interface WaveProps {
  text: string;
}

export function Wave({ text }: WaveProps) {
  // Generate keyframes and classes for the wave and color cycling
  const style = `
	@keyframes wave {
		0% { transform: translateY(0); }
		25% { transform: translateY(-3px); }
		50% { transform: translateY(0); }
		75% { transform: translateY(3px); }
		100% { transform: translateY(0); }
	}
	.rs-wave {
		display: inline-block;
		white-space: pre;
	}
	.rs-wave-char {
		display: inline-block;
		animation: wave 2.5s steps(2,end) infinite;
		will-change: transform;
	}
	`;

  return (
    <>
      <style>{style}</style>
      <span className="rs-wave">
        {Array.from(text).map((char, i) => (
          <span
            key={i}
            className="rs-wave-char"
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
