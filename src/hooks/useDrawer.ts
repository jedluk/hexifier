import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useCallback, useRef, useState } from 'react'

import { areMarkers, arePolygons, toFlatCollection } from '../lib/feature'
import { isNotNull } from '../lib/index'
import { DrawnPolygon, GeoPolygon, Marker, Maybe } from '../types'

interface Drawer {
  marker: Maybe<Marker>
  features: Record<string, DrawnPolygon>
  draw: React.MutableRefObject<MapboxDraw>
  onMapUpdate: (event: { features: DrawnPolygon[] }) => void
  onPopulatePolygons: (
    polygons: GeoPolygon[],
    mergeWithCurrent?: boolean
  ) => void
  onDeletePolygon: (polygon: DrawnPolygon) => void
  onDeleteMarker: () => void
}

export function useDrawer(): Drawer {
  const [features, setFeatures] = useState<Record<string, DrawnPolygon>>({})
  const [marker, setMarker] = useState<Maybe<Marker>>(null)

  const draw = useRef<MapboxDraw>(
    new MapboxDraw({
      controls: { point: true, polygon: true },
      defaultMode: 'draw_polygon',
      displayControlsDefault: false
    })
  )

  const onMapUpdate = useCallback(
    (event: { features: DrawnPolygon[] | Marker[] }) => {
      const { features } = event
      if (arePolygons(features)) {
        setFeatures((currFeatures) => toFlatCollection(features, currFeatures))
      } else if (areMarkers(features)) {
        setMarker(features[0])
      }
    },
    []
  )

  const onDeletePolygon = useCallback((polygon: DrawnPolygon) => {
    setFeatures((currFeatures) =>
      Object.fromEntries(
        Object.entries(currFeatures).filter(([id]) => id !== polygon.id)
      )
    )
    draw.current.delete(polygon.id)
  }, [])

  const onPopulatePolygons = useCallback(
    (polygons: GeoPolygon[], mergeWithCurrent = false) => {
      const features = polygons.map((polygon) => ({
        ...polygon,
        id: String(Date.now())
      }))

      draw.current.add({
        features: features,
        type: 'FeatureCollection'
      })
      setFeatures((prev) =>
        Object.assign(
          mergeWithCurrent ? { ...prev } : {},
          Object.fromEntries(features.map((polygon) => [polygon.id, polygon]))
        )
      )
    },
    []
  )

  const onDeleteMarker = useCallback(() => {
    setMarker((prev) => {
      if (isNotNull(prev)) {
        draw.current.delete(prev.id)
      }
      return null
    })
  }, [])

  return {
    draw,
    features,
    marker,
    onDeleteMarker,
    onDeletePolygon,
    onMapUpdate,
    onPopulatePolygons
  }
}
