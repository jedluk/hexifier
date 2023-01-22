import { Layer, Source } from 'react-map-gl'
import React from 'react'
import { isNull } from './lib'
import { Maybe, HexCollection } from './@types'

interface HexProps {
  collection: Maybe<HexCollection>
}

export function Hex(props: HexProps) {
  const { collection } = props

  if (isNull(collection)) {
    return null
  }
  return (
    <Source id="hex-area" type="geojson" data={collection}>
      <Layer
        id="hex-area"
        source="hex-area"
        type="fill"
        paint={{ 'fill-color': '#7c3aed', 'fill-opacity': 0.5 }}
      />
    </Source>
  )
}
