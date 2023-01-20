import { useEffect, useRef } from 'react'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useControl } from 'react-map-gl'
import { DrawnPolygon } from './types'

import type { MapRef, ControlPosition } from 'react-map-gl'
import { isNotEmpty } from './lib'

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition
  idToRemove: string
  onCreate?: (evt: { features: DrawnPolygon[] }) => void
  onUpdate?: (evt: { features: DrawnPolygon[]; action: string }) => void
  onDelete?: (evt: { features: DrawnPolygon[] }) => void
}

export default function DrawControl(props: DrawControlProps) {
  const { idToRemove, ...rest } = props

  const draw = useRef<MapboxDraw>(new MapboxDraw({ ...rest }))

  useControl<MapboxDraw>(
    () => draw.current,
    ({ map }: { map: MapRef }) => {
      // @ts-expect-error
      map.on('draw.create', props.onCreate)
      // @ts-expect-error
      map.on('draw.update', props.onUpdate)
      // @ts-expect-error
      map.on('draw.delete', props.onDelete)
    },
    ({ map }: { map: MapRef }) => {
      // @ts-expect-error
      map.off('draw.create', props.onCreate)
      // @ts-expect-error
      map.off('draw.update', props.onUpdate)
      // @ts-expect-error
      map.off('draw.delete', props.onDelete)
    },
    {
      position: props.position
    }
  )

  useEffect(() => {
    if (isNotEmpty(idToRemove)) {
      draw.current.delete(idToRemove)
    }
  }, [idToRemove])

  return null
}
