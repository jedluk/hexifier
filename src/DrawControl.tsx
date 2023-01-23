import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useEffect, useRef } from 'react'
import type { ControlPosition, MapRef } from 'react-map-gl'
import { useControl } from 'react-map-gl'

import { DrawnPolygon } from './@types'
import { isNotEmpty } from './lib'

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition
  idToRemove: string
  onCreate?: (evt: { features: DrawnPolygon[] }) => void
  onUpdate?: (evt: { features: DrawnPolygon[]; action: string }) => void
  onDelete?: (evt: { features: DrawnPolygon[] }) => void
}

export function DrawControl(props: DrawControlProps) {
  const { idToRemove, ...rest } = props

  const draw = useRef<MapboxDraw>(new MapboxDraw({ ...rest }))

  useControl<MapboxDraw>(
    () => draw.current,
    ({ map }: { map: MapRef }) => {
      // @ts-expect-error type added by mapbox-gl-draw
      map.on('draw.create', props.onCreate)
      // @ts-expect-error type added by mapbox-gl-draw
      map.on('draw.update', props.onUpdate)
      // @ts-expect-error type added by mapbox-gl-draw
      map.on('draw.delete', props.onDelete)
    },
    ({ map }: { map: MapRef }) => {
      // @ts-expect-error type added by mapbox-gl-draw
      map.off('draw.create', props.onCreate)
      // @ts-expect-error type added by mapbox-gl-draw
      map.off('draw.update', props.onUpdate)
      // @ts-expect-error type added by mapbox-gl-draw
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
