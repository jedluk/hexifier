import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore no type defs
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder'
import maplibregl from 'maplibre-gl'
import { IControl, useControl } from 'react-map-gl'

import { geocode } from '../../apis/nominatim'
import { toGeocoderOption } from '../../lib/feature'
import { Nominatim } from '../../types/nominatim'

export function Geocoder() {
  useControl(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
    const ctrl = new MaplibreGeocoder(
      {
        forwardGeocode: async (config: { query: string; limit: number }) => {
          const geojson = await geocode(config.query, config.limit)
          const features = geojson.features.map(toGeocoderOption)
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
    )

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    ctrl.on('result', (args: { result: Nominatim.OSMElementGeoJSON }) => {
      console.log(args.result)
    })

    return ctrl as IControl
  })

  return null
}
