import React, { Fragment } from 'react'
import { Area } from './components/svg'

import area from '@turf/area'
import { Button } from './components/button/Button'
import { Polygon } from './types'

interface PolygonDetailsProps {
  index: number
  polygon: Polygon
  onSelect: () => void
  onDelete: () => void
}

export function PolygonDetails(props: PolygonDetailsProps) {
  const { index, polygon, onSelect, onDelete } = props

  return (
    <Fragment>
      <div className="flex mt-2 items-center">
        <button onClick={onSelect}>
          <Area width={40} height={40} />
        </button>
        <span className="ml-1">Polygon {index + 1}</span>
        <Button
          className="ml-auto"
          secondary
          text="remove"
          onClick={onDelete}
        />
      </div>
      <div className="text-sm text-slate-900">
        Area: {(area(polygon) / 1_000_000).toFixed(3)} km²
      </div>
    </Fragment>
  )
}
