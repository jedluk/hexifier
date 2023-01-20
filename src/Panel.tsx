import React from 'react'
import { RenderWhen } from './components/render-when/RenderWhen'
import { Logo } from './components/svg'
import { isEmpty } from './lib'
import { Polygon } from './types'
import { Upload } from './Upload'
import { isNotEmpty } from './lib/index'

import { PolygonDetails } from './PolygonDetails'

interface PanelProps {
  polygons: Polygon[]
  onZoomToPolygon: (polygon: Polygon) => void
  onDeletePolygon: (polygon: Polygon) => void
}

export function Panel(props: PanelProps) {
  const { polygons, onZoomToPolygon, onDeletePolygon } = props

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
        {polygons.map((polygon, idx) => (
          <PolygonDetails
            key={polygon.id}
            polygon={polygon}
            index={idx}
            onDelete={onDeletePolygon.bind(null, polygon)}
            onSelect={onZoomToPolygon.bind(null, polygon)}
          />
        ))}
      </RenderWhen>
    </div>
  )
}
