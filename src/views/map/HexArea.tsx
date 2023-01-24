import React from 'react'
import { Layer, Source } from 'react-map-gl'

import { HexCollection, Maybe } from '../../@types'
import { isNull } from '../../lib'

interface HexAreaProps {
  collection: Maybe<HexCollection>
}

export function HexAreaComponent(props: HexAreaProps) {
  const { collection } = props

  if (isNull(collection)) {
    return null
  }

  return (
    <Source generateId id="hex-area" type="geojson" data={collection}>
      <Layer
        id="hex-collection"
        source="hex-area"
        type="fill"
        paint={{
          'fill-color': '#7c3aed',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0.4
          ]
        }}
      />
    </Source>
  )
}

export const HexArea = React.memo(HexAreaComponent)
