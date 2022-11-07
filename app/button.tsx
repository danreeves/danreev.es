import { useState } from "react";

export default function Button() {
	const [state, setState] = useState(0);

	return (
		<button onClick={() => setState((s) => s + 1)}>
			Clicked {state} times
		</button>
	);
}
