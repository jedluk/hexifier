import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useCallback, useRef, useState } from 'react'

import { DrawnPolygon, GeoPolygon } from '../@types'

interface Drawer {
  features: Record<string, DrawnPolygon>
  draw: React.MutableRefObject<MapboxDraw>
  onMapDelete: (event: { features: DrawnPolygon[] }) => void
  onMapUpdate: (event: { features: DrawnPolygon[] }) => void
  onPopulate: (polygons: GeoPolygon[]) => void
  onHarshDelete: (polygon: DrawnPolygon) => void
}

export function useDrawer(): Drawer {
  const [features, setFeatures] = useState<Record<string, DrawnPolygon>>({})
  const draw = useRef<MapboxDraw>(
    new MapboxDraw({
      controls: { polygon: true, trash: true },
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

  const onMapDelete = useCallback((event: { features: DrawnPolygon[] }) => {
    const idsToRemove = event.features.map((f) => f.id)
    setFeatures((currFeatures) =>
      Object.fromEntries(
        Object.entries(currFeatures).filter(([id]) => !idsToRemove.includes(id))
      )
    )
  }, [])

  const onHarshDelete = useCallback(
    (polygon: DrawnPolygon) => {
      onMapDelete({ features: [polygon] })
      draw.current.delete(polygon.id)
    },
    [onMapDelete]
  )

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

  return { draw, features, onHarshDelete, onMapDelete, onMapUpdate, onPopulate }
}
