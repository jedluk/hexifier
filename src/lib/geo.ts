import area from '@turf/area'

import { Polygon } from '../types/index'

export function findLocationOnTop(
  coordinates: [number, number][]
): [number, number] {
  const latitudes = coordinates.map((loc) => loc[1])
  return coordinates[latitudes.indexOf(Math.max(...latitudes))]
}

function toPolygonGeoJSON(coordinates: [number, number][][]): Polygon {
  return { coordinates, type: 'Polygon' }
}
export function findBiggest(
  multiPolygon: [number, number][][][]
): [number, number][][] {
  return multiPolygon.reduce(
    (biggest, polygon) =>
      area(toPolygonGeoJSON(polygon)) > area(toPolygonGeoJSON(biggest))
        ? polygon
        : biggest,
    multiPolygon[0]
  )
}

export function mapAreaToSVGWidth(areaInSquareMeters: number): number {
  const areaInSquareKM = areaInSquareMeters / 1_000_000

  if (areaInSquareKM < 100) return 0.001
  if (areaInSquareKM < 1000) return 0.005
  if (areaInSquareKM < 5000) return 0.01

  return 0.04
}
