import { DrawnPolygon, Marker, MultiPolygon, Polygon } from '../types'
import { Nominatim } from '../types/nominatim'

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

export function isPolygonLike(
  osmElement?: Nominatim.OSMElement
): osmElement is Nominatim.OSMElement & { geojson: Polygon | MultiPolygon } {
  return (
    osmElement?.geojson?.type === 'Polygon' ||
    osmElement?.geojson?.type === 'MultiPolygon'
  )
}

export function toGeocoderOption(
  feature: Nominatim.OSMElementGeoJSON
): Record<string, unknown> {
  const center = [
    feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
    feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2
  ]
  return {
    center: center,
    geometry: {
      coordinates: center,
      type: 'Point'
    },
    place_name: feature.properties.display_name,
    place_type: ['place'],
    properties: feature.properties,
    text: feature.properties.display_name,
    type: 'Feature'
  }
}
