import { HalftoneDots } from "@paper-design/shaders-react";
import { useId } from "react";
import { getDeterministicRotation } from "../utils/rotation";

export function Halftone(props: React.ComponentProps<typeof HalftoneDots>) {
  const id = useId();
  const rotation = getDeterministicRotation(id, -0.25, 0.25);

  return (
    <HalftoneDots
      colorBack="#fff"
      colorFront="#2b2b2b"
      originalColors={false}
      type="gooey"
      grid="hex"
      inverted={false}
      size={0.5}
      radius={1.25}
      contrast={0.4}
      grainMixer={0.2}
      grainOverlay={0.2}
      grainSize={0.5}
      fit="cover"
      style={{ transform: `rotate(${rotation}deg)` }}
      title={props.title}
      width={props.width}
      height={props.height}
      image={props.image}
      {...props}
    />
  );
}
