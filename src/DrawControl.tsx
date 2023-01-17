import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useControl } from 'react-map-gl'
import { MapObject } from './types'

import type { MapRef, ControlPosition } from 'react-map-gl'

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition
  onCreate?: (evt: { features: MapObject[] }) => void
  onUpdate?: (evt: { features: MapObject[]; action: string }) => void
  onDelete?: (evt: { features: MapObject[] }) => void
}

export default function DrawControl(props: DrawControlProps) {
  useControl<MapboxDraw>(
    () => new MapboxDraw({ ...props }),
    ({ map }: { map: MapRef }) => {
      map.on('draw.create', props.onCreate)
      map.on('draw.update', props.onUpdate)
      map.on('draw.delete', props.onDelete)
    },
    ({ map }: { map: MapRef }) => {
      map.off('draw.create', props.onCreate)
      map.off('draw.update', props.onUpdate)
      map.off('draw.delete', props.onDelete)
    },
    {
      position: props.position
    }
  )

  return null
}
