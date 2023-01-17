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

  return null
}
