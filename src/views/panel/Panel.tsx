import React from 'react'
import { useBoolean } from 'use-boolean'

import { Hamburger } from '../../components/hamburger/Hamburger'
import { RenderWhen } from '../../components/render-when/RenderWhen'
import { Splitter } from '../../components/splitter/Splitter'
import { Logo } from '../../components/svg'
import { isEmpty, isNotEmpty, joinClassNames } from '../../lib'
import { DrawnPolygon, GeoPolygon, HexCollection, Maybe } from '../../types'
import { Drawer } from './Drawer'
import { PolygonDetails } from './PolygonDetails'
import { Upload } from './Upload'

interface PanelProps {
  polygons: DrawnPolygon[]
  onAddPolygons: (polygons: GeoPolygon[]) => void
  onAddHexCollection: (collection: Maybe<HexCollection>) => void
  onZoomToPolygon: (polygon: DrawnPolygon) => void
  onDeletePolygon: (polygon: DrawnPolygon) => void
}

export function Panel(props: PanelProps) {
  const [isMobileMenuHidden, , , toggleMobileMenu] = useBoolean(true)

  const {
    polygons,
    onAddPolygons,
    onZoomToPolygon,
    onDeletePolygon,
    onAddHexCollection
  } = props

  const menuClass = isMobileMenuHidden ? 'hidden md:block' : ''

  return (
    <aside className="absolute top-0 left-0 w-full md:w-96 z-10 border-r-1 border-neutral-200 md:h-full p-2 bg-white flex flex-col">
      <h1 className="flex justify-between items-center">
        <Logo width={256} height={50} />
        <Hamburger className="md:hidden" onClick={toggleMobileMenu} />
      </h1>
      <Splitter size="sm" className="my-1 hidden md:block" />

      <RenderWhen condition={isEmpty(polygons)}>
        <div className={joinClassNames('p-2 md:grow md:mt-32', menuClass)}>
          <h1 className="my-5 font-bold text-center uppercase underline decoration-wavy decoration-orange-300">
            draw polygon
          </h1>
          <h3 className="text-center my-2">or</h3>
          <Upload onAddPolygons={onAddPolygons} />
        </div>
      </RenderWhen>

      <RenderWhen condition={isNotEmpty(polygons)}>
        <div
          className={joinClassNames(
            'max-h-72 md:max-h-fit md:grow overflow-y-auto mt-5',
            menuClass
          )}
        >
          {polygons.map((polygon, idx) => (
            <PolygonDetails
              key={polygon.id}
              index={idx}
              polygon={polygon}
              onAddHexCollection={onAddHexCollection}
              onDelete={() => {
                onDeletePolygon(polygon)
                onAddHexCollection(null)
              }}
              onSelect={() => onZoomToPolygon(polygon)}
            />
          ))}
        </div>
      </RenderWhen>
      <Drawer />
    </aside>
  )
}
