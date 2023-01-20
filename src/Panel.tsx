import React from 'react'
import { RenderWhen } from './components/render-when/RenderWhen'
import { Logo } from './components/svg'
import { isEmpty } from './lib'
import { DrawnPolygon, HexCollection, Maybe } from './types'
import { Upload } from './Upload'
import { isNotEmpty } from './lib/index'
import { PolygonDetails } from './PolygonDetails'

interface PanelProps {
  polygons: DrawnPolygon[]
  onSetHexCollection: (collection: Maybe<HexCollection>) => void
  onZoomToPolygon: (polygon: DrawnPolygon) => void
  onDeletePolygon: (polygon: DrawnPolygon) => void
}

export function Panel(props: PanelProps) {
  const { polygons, onZoomToPolygon, onDeletePolygon, onSetHexCollection } =
    props

  return (
    <div className="absolute z-10 top-2 left-2 w-96 h-96 flex flex-col bg-white rounded-xl p-2 shadow-lg break-words">
      <Logo width={256} height={50} />
      <RenderWhen condition={isEmpty(polygons)}>
        <h2 className="my-5 font-bold text-center uppercase underline decoration-wavy decoration-orange-300">
          draw polygon
        </h2>
        <h3 className="text-center my-2">or</h3>
        <div className="mt-auto" />
        <Upload />
      </RenderWhen>

      <RenderWhen condition={isNotEmpty(polygons)}>
        <div className="overflow-y-auto mt-5">
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
    </div>
  )
}
