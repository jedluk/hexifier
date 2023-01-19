import React, { Fragment } from 'react'
import { RenderWhen } from './components/render-when/RenderWhen'
import { Area, Logo } from './components/svg'
import { isEmpty } from './lib'
import { Polygon } from './types'
import { Upload } from './Upload'
import { isNotEmpty } from './lib/index'
import area from '@turf/area'

interface PanelProps {
  polygons: Polygon[]
  onZoomToPolygon: (polygon: Polygon) => void
}

export function Panel(props: PanelProps) {
  const { polygons, onZoomToPolygon } = props

  return (
    <div className="absolute z-10 top-2 left-2 w-60 bg-white rounded-md p-2 shadow-lg break-words">
      <Logo height={24} />
      <RenderWhen condition={isEmpty(polygons)}>
        <h2 className="my-5 flex">
          <Area />
          &nbsp;
          <span>draw polygon or</span>
        </h2>
        <Upload />
      </RenderWhen>
      <RenderWhen condition={isNotEmpty(polygons)}>
        {polygons.map((polygon, idx) => (
          <Fragment key={polygon.id}>
            <div className="flex mt-2">
              <button onClick={() => onZoomToPolygon(polygon)}>
                <Area />
              </button>
              <span className="ml-1">Polygon {idx + 1}</span>
            </div>
            <div className="text-sm text-slate-900">
              {(area(polygon) / 1_000_000).toFixed(3)} km²
            </div>
          </Fragment>
        ))}
      </RenderWhen>
    </div>
  )
}
