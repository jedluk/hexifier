export function findLocationOnTop(
  coordinates: [number, number][]
): [number, number] {
  const latitudes = coordinates.map((loc) => loc[1])
  return coordinates[latitudes.indexOf(Math.max(...latitudes))]
}
