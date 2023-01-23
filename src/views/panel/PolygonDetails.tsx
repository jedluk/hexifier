import area from '@turf/area'
import { polygonToCells } from 'h3-js'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import { DrawnPolygon, HexCollection, Maybe } from '../../@types'
import { Button } from '../../components/button/Button'
import { RenderWhen } from '../../components/render-when/RenderWhen'
import { Splitter } from '../../components/splitter/Splitter'
import { Area } from '../../components/svg'
import { HEX_AREAS_SQUARE_KM } from '../../lib/constants'
import { toGeoJSONCollection } from '../../lib/hexes'
import { PolygonDownload } from './PolygonDownload'
import { Shape } from './Shape'

const FEATURES_LIMIT = 50_000
const NO_HEXES: string[] = []

interface PolygonDetailsProps {
  index: number
  polygon: DrawnPolygon
  onDraw: (collection: Maybe<HexCollection>) => void
  onSelect: () => void
  onDelete: () => void
}

export function PolygonDetails(props: PolygonDetailsProps) {
  const [hexes, setHexes] = useState<string[]>(NO_HEXES)
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
    setHexes(hexes)
    onDraw(toGeoJSONCollection(hexes))
  }, [polygon, hexSize, onDraw])

  useEffect(() => {
    const defaultOption = Number(options[options.length - 3]) || 0
    setHexSize(defaultOption)
  }, [options])

  useEffect(() => {
    setHexes(NO_HEXES)
    onDraw(null)
  }, [hexSize, onDraw])

  return (
    <Fragment>
      <div
        className="sticky z-10 bg-white [&:not(:first-child)]:mt-5 h-12 mb-2"
        style={{ top: index * 48 }}
      >
        <div className="flex items-center h-full">
          <button onClick={onSelect}>
            <Area width={40} height={40} />
          </button>
          <span className="mx-1">Polygon {index + 1}</span>
        </div>
      </div>

      <Shape polygon={polygon} />

      <div className="text-center text-sm mt-2">
        <strong>~ {polygonAreaSquareKm.toFixed(3)} km²</strong>
      </div>

      <label
        htmlFor="hexSize"
        className="block mt-4 text-sm font-medium text-gray-900"
      >
        Output hex size:
      </label>

      <div className="flex align-center">
        <select
          value={hexSize}
          id="hexSize"
          onChange={(evt) => setHexSize(Number(evt.target.value))}
          className="grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-50 p-2.5"
        >
          {options.map((key) => (
            <option key={key} value={key}>
              {key} ({HEX_AREAS_SQUARE_KM[Number(key)]} km²)
            </option>
          ))}
        </select>
      </div>

      <div className="my-2 flex justify-end">
        <Button
          className="ml-auto mr-2"
          secondary
          text="remove"
          onClick={onDelete}
        />

        <Button
          text="Convert"
          className="mr-2"
          onClick={handleConvertToHexGeoJSON}
        />
      </div>

      <RenderWhen condition={hexes !== NO_HEXES}>
        <div className="text-sm mt-2">
          Polygon is covered by <strong>{hexes?.length}</strong> hexes of size{' '}
          <strong>{hexSize}</strong>
        </div>
        <PolygonDownload
          hexes={hexes}
          name={`polygon-${index + 1}`}
          size={hexSize}
        />
      </RenderWhen>

      <Splitter size="md" />
    </Fragment>
  )
}
