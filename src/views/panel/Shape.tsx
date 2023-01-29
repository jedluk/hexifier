/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call */
import area from '@turf/area'
// @ts-expect-error no types for now
import geojson2svg from 'geojson-to-svg'
import React, { useMemo } from 'react'

import { mapAreaToSVGWidth } from '../../lib/geo'
import { DrawnPolygon } from '../../types'

interface ShapeProps {
  polygon: DrawnPolygon
}

export function Shape(props: ShapeProps) {
  const { polygon } = props

  const paths = useMemo(() => {
    return geojson2svg()
      .styles({
        Polygon: {
          color: '#7c3aed',
          fill: 'rgba(124, 58, 237, 0.5)',
          weight: mapAreaToSVGWidth(area(polygon))
        }
      })
      .data(polygon)
      .render() as string
  }, [polygon])

  return (
    <div
      className="grow my-2 px-10 rotate-X-180"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  )
}
