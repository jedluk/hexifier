export function findLocationOnTop(
  coordinates: [number, number][]
): [number, number] {
  const latitudes = coordinates.map((loc) => loc[1])
  return coordinates[latitudes.indexOf(Math.max(...latitudes))]
}

export function mapAreaToSVGWidth(areaInSquareMeters: number): number {
  const areaInSquareKM = areaInSquareMeters / 1_000_000

  if (areaInSquareKM < 100) return 0.001
  if (areaInSquareKM < 1000) return 0.005
  if (areaInSquareKM < 5000) return 0.01

  return 0.04
}
