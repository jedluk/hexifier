import React, { Fragment } from 'react'
import { Marker } from 'react-map-gl'
import { DrawnPolygon } from './@types'
import { findLocationOnTop } from './lib/geo'

interface NamesProps {
  polygons: DrawnPolygon[]
}

export function NamesComponent(props: NamesProps) {
  const { polygons } = props
  return (
    <Fragment>
      {polygons.map((polygon, idx) => {
        const [lon, lat] = findLocationOnTop(polygon.geometry.coordinates[0])
        return (
          <Marker latitude={lat} longitude={lon} offset={[0, -20]}>
            <div className="text-xl font-bold text-violet-600">
              Polygon {idx + 1}
            </div>
          </Marker>
        )
      })}
    </Fragment>
  )
}

export const Names = React.memo(NamesComponent)
