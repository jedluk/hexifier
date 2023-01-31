import area from '@turf/area'
import { compactCells, polygonToCells } from 'h3-js'
import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { Button } from '../../components/button/Button'
import { Link } from '../../components/link/Link'
import { RenderWhen } from '../../components/render-when/RenderWhen'
import { Splitter } from '../../components/splitter/Splitter'
import { Area } from '../../components/svg'
import { formatNumber } from '../../lib/formatter'
import { toGeoJSONCollection } from '../../lib/hexes'
import { DrawnPolygon, HexCollection, Maybe } from '../../types'
import { PolygonDownload } from './PolygonDownload'
import { Selector } from './Selector'
import { Shape } from './Shape'

const NO_HEXES: string[] = []

interface PolygonDetailsProps {
  index: number
  polygon: DrawnPolygon
  onAddHexCollection: (collection: Maybe<HexCollection>) => void
  onSelect: () => void
  onDelete: () => void
}

export function PolygonDetails(props: PolygonDetailsProps) {
  const headerRef = useRef<HTMLDivElement>(null)

  const [hexes, setHexes] = useState<string[]>(NO_HEXES)
  const [isExportAsBigInt, setExportAsBigInt] = useState(false)
  const [hexSize, setHexSize] = useState(-1)
  const [minSize, setMinSize] = useState(-1)

  const { index, polygon, onSelect, onDelete, onAddHexCollection } = props

  const polygonAreaInSquareKm = useMemo(
    () => area(polygon) / 1_000_000,
    [polygon]
  )

  const handleIconClick = useCallback(() => {
    onSelect()
    headerRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [onSelect])

  const handleConvertToHexGeoJSON = useCallback(() => {
    const { coordinates } = polygon.geometry
    const hexes = Object.is(hexSize, Math.PI) // PI is just shortcut for require compact
      ? compactCells(polygonToCells(coordinates, minSize, true))
      : polygonToCells(coordinates, hexSize, true)
    setHexes(hexes)
    onAddHexCollection(toGeoJSONCollection(hexes))
  }, [polygon, hexSize, minSize, onAddHexCollection])

  useEffect(() => {
    setHexes(NO_HEXES)
    onAddHexCollection(null)
  }, [hexSize, onAddHexCollection])

  return (
    <Fragment>
      <div
        className="sticky z-10 bg-white [&:not(:first-child)]:mt-5 h-12 mb-2"
        style={{ top: index * 48 }}
      >
        <div className="flex items-center h-full" ref={headerRef}>
          <button onClick={handleIconClick}>
            <Area width={40} height={40} />
          </button>
          <span className="mx-1">Polygon {index + 1}</span>
        </div>
      </div>

      <Shape polygon={polygon} />

      <div className="text-center text-sm mt-2">
        <b>~ {formatNumber(polygonAreaInSquareKm)} km²</b>
        {!Object.is(hexes, NO_HEXES) && (
          <div className="text-sm mt-2">
            Polygon is covered by <strong>{hexes?.length}</strong> hexes
          </div>
        )}
      </div>

      <label
        htmlFor="hexSize"
        className="block mt-4 text-sm font-medium text-gray-900"
      >
        Output hex size:
      </label>

      <div className="my-2 flex justify-between md:justify-end md:flex-wrap md:gap-3">
        <Selector
          polygonArea={polygonAreaInSquareKm}
          hexSize={hexSize}
          onSetMinSize={setMinSize}
          onChange={setHexSize}
        />
        <Button
          className="w-1/6 md:w-fit ml-auto mr-2 md:mr-0"
          secondary
          text="remove"
          onClick={onDelete}
        />

        <Button
          text="convert"
          className="w-1/6 md:w-fit"
          onClick={handleConvertToHexGeoJSON}
        />
      </div>

      <RenderWhen condition={!Object.is(hexes, NO_HEXES)}>
        <Splitter size="sm" />
        <div className="p-1">
          <div>Export options:</div>

          <div className="flex items-center mb-4">
            <input
              id="checkbox"
              type="checkbox"
              checked={isExportAsBigInt}
              onChange={() => setExportAsBigInt((prev) => !prev)}
              className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-blue-600 focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor="checkbox"
              className="ml-2 text-sm font-medium text-gray-900"
            >
              convert hexadecimal to
              <Link
                text="big int"
                url="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt"
              />
            </label>
          </div>

          <PolygonDownload
            hexes={hexes}
            exportAsBigInt={isExportAsBigInt}
            name={`polygon-${index + 1}`}
            size={hexSize}
          />
        </div>
      </RenderWhen>

      <Splitter size="md" />
    </Fragment>
  )
}
