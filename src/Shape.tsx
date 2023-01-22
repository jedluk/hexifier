import { DrawnPolygon } from './@types'
// @ts-expect-error no types for now
import geojson2svg from 'geojson-to-svg'
import { useMemo } from 'react'

interface ShapeProps {
  polygon: DrawnPolygon
}

export function Shape(props: ShapeProps) {
  const { polygon } = props

  const paths = useMemo(() => {
    return geojson2svg()
      .styles({
        Polygon: {
          weight: 0.04,
          color: '#7c3aed',
          fill: 'rgba(124, 58, 237, 0.5)'
        }
      })
      .data(polygon)
      .render()
  }, [polygon])

  return (
    <div
      className="grow my-2 px-10 rotate-X-180"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  )
}
