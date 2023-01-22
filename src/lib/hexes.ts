import { cellToBoundary } from 'h3-js'
import { HexCollection } from '../types'

export function toGeoJSONCollection(hexes: string[]): HexCollection {
  return {
    type: 'FeatureCollection',
    features: hexes.map((hex) => ({
      geometry: {
        type: 'Polygon',
        coordinates: [cellToBoundary(hex, true)]
      },
      type: 'Feature',
      properties: { hex }
    }))
  }
}
