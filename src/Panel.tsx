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
