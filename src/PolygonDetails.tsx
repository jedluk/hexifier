import React, { Fragment, useMemo, useState } from 'react'
import { Area } from './components/svg'

import area from '@turf/area'
import { Button } from './components/button/Button'
import { DrawnPolygon, HexCollection, Maybe } from './types'
import { HEX_AREAS_SQUARE_KM } from './lib/constants'
import { cellToBoundary, polygonToCells } from 'h3-js'
import { useCallback, useEffect } from 'react'
import { RenderWhen } from './components/render-when/RenderWhen'

const FEATURES_LIMIT = 50_000

interface PolygonDetailsProps {
  index: number
  polygon: DrawnPolygon
  onDraw: (collection: Maybe<HexCollection>) => void
  onSelect: () => void
  onDelete: () => void
}

export function PolygonDetails(props: PolygonDetailsProps) {
  const [hexesCount, setHexesCount] = useState(-1)
  const [hexSize, setHexSize] = useState(8)
  const { index, polygon, onSelect, onDelete, onDraw } = props

  const polygonAreaSquareKm = useMemo(
    () => area(polygon) / 1_000_000,
    [polygon]
  )

  const handleConvertToHexGeoJSON = useCallback(() => {
    const hexes = polygonToCells(polygon.geometry.coordinates, hexSize, true)

    setHexesCount(hexes.length)

    const hexGeoJSON: HexCollection = {
      type: 'FeatureCollection',
      features: hexes.map((hex) => ({
        geometry: {
          type: 'Polygon',
          coordinates: [cellToBoundary(hex, true)]
        },
        type: 'Feature',
        properties: { hex }
      }))
    }

    onDraw(hexGeoJSON)
  }, [polygon, hexSize])

  useEffect(() => {
    setHexesCount(-1)
    onDraw(null)
  }, [hexSize])

  return (
    <Fragment>
      <div className="flex mt-2 items-center">
        <button onClick={onSelect}>
          <Area width={40} height={40} />
        </button>
        <span className="mx-1">
          Polygon {index + 1} ~ {polygonAreaSquareKm.toFixed(3)} km²
        </span>
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
          {Array.from(Array(16).keys())
            .filter(
              (hexSize) =>
                polygonAreaSquareKm / HEX_AREAS_SQUARE_KM[hexSize] <
                FEATURES_LIMIT
            )
            .map((key) => (
              <option id={'' + key} value={key}>
                {key} ({HEX_AREAS_SQUARE_KM[key]} km²)
              </option>
            ))}
        </select>
        <Button
          text="Convert"
          className="my-1 ml-2"
          onClick={handleConvertToHexGeoJSON}
        />
      </div>

      <RenderWhen condition={hexesCount > -1}>
        <div className="text-sm mt-2">
          Polygon is covered by <strong>{hexesCount}</strong> hexes of size{' '}
          <strong>{hexSize}</strong>
        </div>
      </RenderWhen>
    </Fragment>
  )
}
