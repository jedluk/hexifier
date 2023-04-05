import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { MapRef, useControl } from 'react-map-gl'

import { DrawnPolygon } from '../../types'

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  draw: React.MutableRefObject<MapboxDraw>
  onCreate?: (evt: { features: DrawnPolygon[] }) => void
  onUpdate?: (evt: { features: DrawnPolygon[]; action: string }) => void
}

export function DrawControl(props: DrawControlProps) {
  useControl<MapboxDraw>(
    () => props.draw.current,
    ({ map }: { map: MapRef }) => {
      // @ts-expect-error type added by mapbox-gl-draw
      map.on('draw.create', props.onCreate)
      // @ts-expect-error type added by mapbox-gl-draw
      map.on('draw.update', props.onUpdate)
    },
    ({ map }: { map: MapRef }) => {
      // @ts-expect-error type added by mapbox-gl-draw
      map.off('draw.create', props.onCreate)
      // @ts-expect-error type added by mapbox-gl-draw
      map.off('draw.update', props.onUpdate)
    },
    { position: 'bottom-right' }
  )

  return null
}
