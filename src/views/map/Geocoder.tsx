import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore no type defs
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder'
import maplibregl from 'maplibre-gl'
import { IControl, useControl } from 'react-map-gl'

import { geocode } from '../../apis/nominatim'
import { toGeocoderOption } from '../../lib/feature'

export function Geocoder() {
  useControl(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return new MaplibreGeocoder(
      {
        forwardGeocode: async (config: { query: string; limit: number }) => {
          const collection = await geocode(config.query, config.limit)
          const features = collection.features.map(toGeocoderOption)
          return { features }
        }
      },
      {
        enableEventLogging: false,
        maplibregl: maplibregl,
        marker: false,
        popup: false,
        showResultMarkers: true
      }
    ) as IControl
  })

  return null
}
