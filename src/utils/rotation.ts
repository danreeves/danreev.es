export function getDeterministicRotation(id: string, min = -1, max = 1): number {
  const rotationSeed = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // LCG multiplier for better distribution
  const ranged = ((rotationSeed * 16807) % (max - min) * 100) / 100;
  return min + ranged;
}