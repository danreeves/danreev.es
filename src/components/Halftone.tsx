import { HalftoneDots } from "@paper-design/shaders-react";

export function Halftone(props: React.ComponentProps<typeof HalftoneDots>) {
  return (
    <HalftoneDots
      size={0.7}
      inverted={false}
      colorBack="#141414"
      colorFront="#ff8000"
      originalColors={false}
      type="holes"
      grid="square"
      inverted
      size={0.4}
      radius={1}
      contrast={1}
      grainMixer={0.05}
      grainOverlay={0.3}
      grainSize={0.5}
      fit="cover"
      title={props.title}
      width={props.width}
      height={props.height}
      image={props.image}
      {...props}
    />
  );
}
