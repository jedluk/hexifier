import { DrawnPolygon, Marker } from '../types'

export function arePolygons(
  features: DrawnPolygon[] | Marker[]
): features is DrawnPolygon[] {
  return features
    .map((f) => f.geometry.type)
    .every((type) => type === 'Polygon')
}

export function areMarkers(
  features: DrawnPolygon[] | Marker[]
): features is Marker[] {
  return features.map((f) => f.geometry.type).every((type) => type === 'Point')
}

export function toFlatCollection(
  newFeatures: DrawnPolygon[],
  current: Record<string, DrawnPolygon>
): Record<string, DrawnPolygon> {
  return newFeatures.reduce(
    (acc, feature) => {
      acc[feature.id] = feature
      return acc
    },
    { ...current }
  )
}
