import React, { Fragment, useMemo, useState } from 'react'
import { Area } from './components/svg'

import area from '@turf/area'
import { Button } from './components/button/Button'
import { DrawnPolygon, HexCollection, Maybe } from './types'
import { HEX_AREAS_SQUARE_KM } from './lib/constants'
import { cellToBoundary, polygonToCells } from 'h3-js'
import { useCallback, useEffect } from 'react'
import { RenderWhen } from './components/render-when/RenderWhen'
import { useExportableCSV } from 'use-exportable-csv'

const FEATURES_LIMIT = 50_000
const NO_HEXES: [string][] = []


interface PolygonDetailsProps {
  index: number
  polygon: DrawnPolygon
  onDraw: (collection: Maybe<HexCollection>) => void
  onSelect: () => void
  onDelete: () => void
}

export function PolygonDetails(props: PolygonDetailsProps) {
  const [hexes, setHexes] = useState<[string][]>(NO_HEXES)
  const [hexSize, setHexSize] = useState(-1)

  const { index, polygon, onSelect, onDelete, onDraw } = props

  const polygonAreaSquareKm = useMemo(
    () => area(polygon) / 1_000_000,
    [polygon]
  )

  const options = useMemo(() => {
    return Object.keys(HEX_AREAS_SQUARE_KM).filter(
      (hexSize) =>
        polygonAreaSquareKm / HEX_AREAS_SQUARE_KM[Number(hexSize)] <
        FEATURES_LIMIT
    )
  }, [polygonAreaSquareKm])

  const handleConvertToHexGeoJSON = useCallback(() => {
    const hexes = polygonToCells(polygon.geometry.coordinates, hexSize, true)

    setHexes(hexes.map((hex) => [hex]))

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
    const defaultOption = Number(options[options.length - 3]) || 0
    setHexSize(defaultOption)
  }, [options])

  useEffect(() => {
    setHexes(NO_HEXES)
    onDraw(null)
  }, [hexSize])

  const link = useExportableCSV(hexes, {
    bom: true,
    headers: [`hex-${hexSize}`]
  })

  return (
    <Fragment>
      <div className="[&:not(:first-child)]:mt-5 mb-2 flex items-center sticky top-0 bg-white">
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
        className="block text-sm font-medium text-gray-900"
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
          {options.map((key) => (
            <option key={key} value={key}>
              {key} ({HEX_AREAS_SQUARE_KM[+key]} km²)
            </option>
          ))}
        </select>
        <Button
          text="Convert"
          className="my-1 ml-2"
          onClick={handleConvertToHexGeoJSON}
        />
      </div>

      <RenderWhen condition={hexes !== NO_HEXES}>
        <div className="text-sm mt-2">
          Polygon is covered by <strong>{hexes?.length}</strong> hexes of size{' '}
          <strong>{hexSize}</strong>
        </div>
          <a className="block text-center my-4 font-medium text-blue-600 dark:text-blue-500 hover:underline" href={link} download={`polygon-${index + 1}.csv`}>
          CSV download
        </a>
      </RenderWhen>

    </Fragment>
  )
}
