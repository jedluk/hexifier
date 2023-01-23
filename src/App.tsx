import bbox from '@turf/bbox'
import maplibre from 'maplibre-gl'
import React, { Fragment, useCallback, useRef, useState } from 'react'
import MapGL, { MapRef, NavigationControl } from 'react-map-gl'

import { BBox, DrawnPolygon, GeoPolygon, HexCollection, Maybe } from './@types'
import { useDrawnPolygons } from './hooks/useDrawnPolygons'
import { serveFromBase } from './lib/asset'
import { CENTER_OF_EUROPE, MAP_PADDING } from './lib/constants'
import { DrawControl } from './views/map/DrawControl'
import { Hex } from './views/map/Hex'
import { Names } from './views/map/Names'
import { Panel } from './views/panel/Panel'

export function App() {
  const mapRef = useRef<Maybe<MapRef>>(null)

  const [hexCollection, setHexCollection] = useState<Maybe<HexCollection>>(null)

  const {
    draw,
    features,
    onMapDelete,
    onMapUpdate,
    onPopulate,
    onHarshDelete
  } = useDrawnPolygons()

  const handleZoomToPolygon = useCallback(
    (polygon: DrawnPolygon | GeoPolygon) => {
      mapRef.current?.fitBounds(bbox(polygon) as BBox)
    },
    []
  )

  const handleAddPolygons = useCallback(
    (polygons: GeoPolygon[]) => {
      onPopulate(polygons)
      handleZoomToPolygon(polygons[0])
    },
    [onPopulate, handleZoomToPolygon]
  )

  const polygons = Object.values(features)

  return (
    <Fragment>
      <Panel
        polygons={polygons}
        onSetHexCollection={setHexCollection}
        onDeletePolygon={onHarshDelete}
        onAddPolygons={handleAddPolygons}
        onZoomToPolygon={handleZoomToPolygon}
      />
      <main className="relative w-full h-full">
        <MapGL
          ref={mapRef}
          dragRotate={false}
          mapLib={maplibre}
          mapStyle={serveFromBase('mapStyle.json')}
          minZoom={2}
          maxZoom={19}
          padding={MAP_PADDING}
          initialViewState={CENTER_OF_EUROPE}
        >
          <NavigationControl showCompass position="top-right" />
          <DrawControl
            draw={draw}
            onCreate={onMapUpdate}
            onUpdate={onMapUpdate}
            onDelete={onMapDelete}
          />
          <Hex collection={hexCollection} />
          <Names polygons={polygons} />
        </MapGL>
      </main>
    </Fragment>
  )
}
