import { cellToBoundary } from 'h3-js'

import { HexCollection } from '../types'

export function toGeoJSONCollection(hexes: string[]): HexCollection {
  return {
    features: hexes.map((hex) => ({
      geometry: {
        coordinates: [cellToBoundary(hex, true)],
        type: 'Polygon'
      },
      properties: { hex },
      type: 'Feature'
    })),
    type: 'FeatureCollection'
  }
}
