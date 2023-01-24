import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useCallback, useRef, useState } from 'react'

import { DrawnPolygon, GeoPolygon } from '../@types'

interface Drawer {
  features: Record<string, DrawnPolygon>
  draw: React.MutableRefObject<MapboxDraw>
  onMapUpdate: (event: { features: DrawnPolygon[] }) => void
  onPopulate: (polygons: GeoPolygon[]) => void
  onDelete: (polygon: DrawnPolygon) => void
}

export function useDrawer(): Drawer {
  const [features, setFeatures] = useState<Record<string, DrawnPolygon>>({})
  const draw = useRef<MapboxDraw>(
    new MapboxDraw({
      controls: { polygon: true },
      defaultMode: 'draw_polygon',
      displayControlsDefault: false
    })
  )

  const onMapUpdate = useCallback((event: { features: DrawnPolygon[] }) => {
    setFeatures((currFeatures) =>
      event.features.reduce(
        (acc, feature) => {
          acc[feature.id] = feature
          return acc
        },
        { ...currFeatures }
      )
    )
  }, [])

  const onDelete = useCallback((polygon: DrawnPolygon) => {
    setFeatures((currFeatures) =>
      Object.fromEntries(
        Object.entries(currFeatures).filter(([id]) => id !== polygon.id)
      )
    )
    draw.current.delete(polygon.id)
  }, [])

  const onPopulate = useCallback((polygons: GeoPolygon[]) => {
    const features = polygons.map((polygon) => ({
      ...polygon,
      id: String(Date.now())
    }))

    draw.current.add({
      features: features,
      type: 'FeatureCollection'
    })
    setFeatures(
      Object.fromEntries(features.map((polygon) => [polygon.id, polygon]))
    )
  }, [])

  return { draw, features, onDelete, onMapUpdate, onPopulate }
}
