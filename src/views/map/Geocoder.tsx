import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore no type defs
import MaplibreGeocoder from '@maplibre/maplibre-gl-geocoder'
import maplibregl from 'maplibre-gl'
import { useControl } from 'react-map-gl'

import { Nominatim } from '../../types/nominatim'

const geocoder_api = {
  forwardGeocode: async (config: { query: string }) => {
    const features: Record<string, unknown>[] = []

    try {
      const searchParams = new URLSearchParams([
        ['q', config.query],
        ['format', 'geojson'],
        ['adressdetails', '1'],
        ['polygon_geojson', '1']
      ])
      const request = `https://nominatim.openstreetmap.org/search?${searchParams.toString()}`
      const response = await fetch(request)
      const geojson = (await response.json()) as Nominatim.GeoJSON

      for (const feature of geojson.features) {
        const center = [
          feature.bbox[0] + (feature.bbox[2] - feature.bbox[0]) / 2,
          feature.bbox[1] + (feature.bbox[3] - feature.bbox[1]) / 2
        ]
        const point = {
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
        features.push(point)
      }
    } catch (e) {
      console.error(`Failed to forwardGeocode with error:`)
    }

    return {
      features: features
    }
  }
}

export function Geocoder() {
  useControl<MaplibreGeocoder>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-return
    return new MaplibreGeocoder(geocoder_api, {
      maplibregl: maplibregl
    })
  })

  return null
}
