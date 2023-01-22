import React from 'react'
import { RenderWhen } from './components/render-when/RenderWhen'
import { Logo } from './components/svg'
import { isEmpty } from './lib'
import { DrawnPolygon, HexCollection, Maybe } from './types'
import { Upload } from './Upload'
import { isNotEmpty } from './lib/index'
import { PolygonDetails } from './PolygonDetails'
import { Splitter } from './components/splitter/Splitter'

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
    <aside className="absolute top-0 left-0 z-10 border-r-2 border-neutral-200 h-full w-96 p-2 bg-white flex flex-col">
      <Logo width={256} height={50} />
      <Splitter size="sm" className='my-1' />
      <div />
      <RenderWhen condition={isEmpty(polygons)}>
        <div className="grow mt-32 p-2">
          <h1 className="my-5 font-bold text-center uppercase underline decoration-wavy decoration-orange-300">
            draw polygon
          </h1>
          <h3 className="text-center my-2">or</h3>
          <Upload />
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
