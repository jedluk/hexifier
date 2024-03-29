import React from 'react'
import { Marker } from 'react-map-gl'

import { useCopyToClipboad } from '../../hooks/useCopyToClipboard'
import { isNull } from '../../lib/index'
import { HexMarker as HexMarkerType, Maybe } from '../../types'

interface HexMarkerProps {
  marker: Maybe<HexMarkerType>
}

const STYLE: React.CSSProperties = {
  WebkitTextFillColor: 'black',
  WebkitTextStrokeColor: 'white',
  WebkitTextStrokeWidth: 1
}

export function HexMarkerComponent(props: HexMarkerProps) {
  const { marker } = props

  useCopyToClipboad(marker?.hex ?? '')

  if (isNull(marker)) {
    return null
  }

  return (
    <Marker latitude={marker.lat} longitude={marker.lng} offset={[0, -20]}>
      <div className="text-3xl font-bolde text-violet-700" style={STYLE}>
        {marker.hex}
      </div>
    </Marker>
  )
}

export const HexMarker = React.memo(HexMarkerComponent)
