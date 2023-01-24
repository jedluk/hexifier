import { useCallback, useEffect, useRef, useState } from 'react'
import { MapRef } from 'react-map-gl'

import { HexCollection, HexMarker, Maybe } from '../@types'
import { isEmpty, isNotEmpty, isNotNull } from '../lib/index'

interface MapMouseEvent {
  marker: Maybe<HexMarker>
  interactiveLayers: string[]
  handleMouseMove: (event: mapboxgl.MapLayerMouseEvent) => void
  handleMouseLeave: (event: mapboxgl.MapLayerMouseEvent) => void
}
export function useMapMouseEvent(
  map: Maybe<MapRef>,
  hexCollection: Maybe<HexCollection>
): MapMouseEvent {
  const hoveredStateId = useRef<Maybe<number>>(null)

  const [marker, setHexMarker] = useState<Maybe<HexMarker>>(null)
  const [interactiveLayers, setInteractiveLayers] = useState<string[]>([])

  useEffect(() => {
    if (isNotNull(hexCollection)) {
      setInteractiveLayers(['hex-collection'])
    }
    return () => setInteractiveLayers([])
  }, [hexCollection])

  const handleMouseMove = useCallback(
    (event: mapboxgl.MapLayerMouseEvent) => {
      if (isEmpty(interactiveLayers)) {
        return
      }

      const { features = [] } = event
      if (isNotEmpty(features)) {
        const { hex } = features[0].properties as { hex: string }
        setHexMarker({ ...event.lngLat, hex })

        if (isNotNull(hoveredStateId.current)) {
          map?.setFeatureState(
            { id: hoveredStateId.current, source: 'hex-area' },
            { hover: false }
          )
        }
        hoveredStateId.current = features[0].id as number
        map?.setFeatureState(
          { id: hoveredStateId.current, source: 'hex-area' },
          { hover: true }
        )
      } else {
        setHexMarker(null)
      }
    },
    [interactiveLayers, map]
  )

  const handleMouseLeave = useCallback(
    (event: mapboxgl.MapLayerMouseEvent) => {
      if (isEmpty(interactiveLayers)) {
        return
      }

      const { features = [] } = event
      if (isNotEmpty(features)) {
        if (isNotNull(hoveredStateId.current)) {
          map?.setFeatureState(
            { id: hoveredStateId.current, source: 'hex-area' },
            { hover: false }
          )
        }
        hoveredStateId.current = null
      }
    },
    [interactiveLayers, map]
  )

  return {
    handleMouseLeave,
    handleMouseMove,
    interactiveLayers,
    marker
  }
}
