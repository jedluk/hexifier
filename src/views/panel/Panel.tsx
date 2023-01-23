import React from 'react'

import { DrawnPolygon, GeoPolygon, HexCollection, Maybe } from '../../@types'
import { RenderWhen } from '../../components/render-when/RenderWhen'
import { Splitter } from '../../components/splitter/Splitter'
import { Logo } from '../../components/svg'
import { isEmpty, isNotEmpty } from '../../lib'
import { PolygonDetails } from './PolygonDetails'
import { Upload } from './Upload'

interface PanelProps {
  polygons: DrawnPolygon[]
  onAddPolygons: (polygons: GeoPolygon[]) => void
  onSetHexCollection: (collection: Maybe<HexCollection>) => void
  onZoomToPolygon: (polygon: DrawnPolygon) => void
  onDeletePolygon: (polygon: DrawnPolygon) => void
}

export function Panel(props: PanelProps) {
  const {
    polygons,
    onAddPolygons,
    onZoomToPolygon,
    onDeletePolygon,
    onSetHexCollection
  } = props

  return (
    <aside className="absolute top-0 left-0 z-10 border-r-2 border-neutral-200 h-full w-96 p-2 bg-white flex flex-col">
      <h1>
        <Logo width={256} height={50} />
      </h1>
      <Splitter size="sm" className="my-1" />

      <RenderWhen condition={isEmpty(polygons)}>
        <div className="grow mt-32 p-2">
          <h1 className="my-5 font-bold text-center uppercase underline decoration-wavy decoration-orange-300">
            draw polygon
          </h1>
          <h3 className="text-center my-2">or</h3>
          <Upload onAddPolygons={onAddPolygons} />
        </div>
      </RenderWhen>

      <RenderWhen condition={isNotEmpty(polygons)}>
        <div className="grow overflow-y-auto mt-5">
          {polygons.map((polygon, idx) => (
            <PolygonDetails
              key={polygon.id}
              index={idx}
              polygon={polygon}
              onDraw={onSetHexCollection}
              onDelete={() => {
                onDeletePolygon(polygon)
                onSetHexCollection(null)
              }}
              onSelect={onZoomToPolygon.bind(null, polygon)}
            />
          ))}
        </div>
      </RenderWhen>
    </aside>
  )
}
