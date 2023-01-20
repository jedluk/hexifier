import React, { Fragment, useState } from 'react'
import { Area } from './components/svg'

import area from '@turf/area'
import { Button } from './components/button/Button'
import { Polygon } from './types'
import { HEX_AREAS } from './lib/constants'

interface PolygonDetailsProps {
  index: number
  polygon: Polygon
  onSelect: () => void
  onDelete: () => void
}

export function PolygonDetails(props: PolygonDetailsProps) {
  const [hexSize, setHexSize] = useState(8)
  const { index, polygon, onSelect, onDelete } = props

  return (
    <Fragment>
      <div className="flex mt-2 items-center">
        <button onClick={onSelect}>
          <Area width={40} height={40} />
        </button>
        <span className="mx-1">Polygon {index + 1}</span>
        <span className="">~ {(area(polygon) / 1_000_000).toFixed(3)} km²</span>
        <Button
          className="ml-auto"
          secondary
          text="remove"
          onClick={onDelete}
        />
      </div>
      <label
        htmlFor="hexSize"
        className="block my-2 text-sm font-medium text-gray-900"
      >
        Output hex size:
      </label>

      <div className="flex align-center">
        <select
          value={hexSize}
          id="hexSize"
          onChange={(evt) => setHexSize(+evt.target.value)}
          className="grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-50 p-2.5"
        >
          {Array.from(Array(16).keys()).map((key) => (
            <option id={String(key)} value={key}>
              {key} ({HEX_AREAS[key]} km²)
            </option>
          ))}
        </select>
        <Button text="Convert" className="my-1 ml-2" onClick={() => null} />
      </div>
    </Fragment>
  )
}
