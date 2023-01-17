import React, { useCallback, useState } from 'react'
import MapGL from 'react-map-gl'
import maplibre from 'maplibre-gl'
import DrawControl from './DrawControl'
import { MapObject } from './types'

const BASE_URL = import.meta.env.BASE_URL
const MAP_STYLE_URL =
  BASE_URL === '/' ? '/mapStyle.json' : [BASE_URL, 'mapStyle.json'].join('/')

export default function App() {
  const [features, setFeatures] = useState<Record<string, object>>({})

  const onUpdate = useCallback((e: { features: MapObject[] }) => {
    setFeatures((currFeatures) =>
      e.features.reduce(
        (acc, feature) => {
          acc[feature.id] = feature
          return acc
        },
        { ...currFeatures }
      )
    )
  }, [])

  const onDelete = useCallback((e: { features: MapObject[] }) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures }
      for (const f of e.features) {
        delete newFeatures[f.id]
      }
      return newFeatures
    })
  }, [])

  return (
    <main style={{ position: 'relative' }}>
      <MapGL
        mapLib={maplibre}
        mapStyle={MAP_STYLE_URL}
        minZoom={2}
        maxZoom={19}
      >
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </MapGL>
    </main>
  )
}
