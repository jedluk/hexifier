import bbox from '@turf/bbox'
import maplibre from 'maplibre-gl'
import React, { Fragment, useCallback, useRef, useState } from 'react'
import MapGL, { MapRef, NavigationControl } from 'react-map-gl'

import { DrawnPolygon, HexCollection, Maybe } from './@types'
import { useDrawnPolygons } from './hooks/useDrawnPolygons'
import { serveFromBase } from './lib/asset'
import { CENTER_OF_EUROPE, MAP_PADDING } from './lib/constants'
import { DrawControl } from './views/map/DrawControl'
import { Hex } from './views/map/Hex'
import { Names } from './views/map/Names'
import { Panel } from './views/panel/Panel'

export function App() {
  const mapRef = useRef<Maybe<MapRef>>(null)

  const [idToRemove, setIdToRemove] = useState('')
  const [hexCollection, setHexCollection] = useState<Maybe<HexCollection>>(null)
  const { features, onDelete, onUpdate } = useDrawnPolygons()

  const handleZoomToPolygon = useCallback((polygon: DrawnPolygon) => {
    mapRef.current?.fitBounds(bbox(polygon) as [number, number, number, number])
  }, [])

  const handleDeletePolygon = useCallback(
    (polygon: DrawnPolygon) => {
      onDelete({ features: [polygon] })
      setIdToRemove(polygon.id)
    },
    [onDelete]
  )

  const polygons = Object.values(features)

  return (
    <Fragment>
      <Panel
        polygons={polygons}
        onSetHexCollection={setHexCollection}
        onDeletePolygon={handleDeletePolygon}
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
            displayControlsDefault={false}
            controls={{
              polygon: true,
              trash: true
            }}
            defaultMode="draw_polygon"
            idToRemove={idToRemove}
            onCreate={onUpdate}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
          <Hex collection={hexCollection} />
          <Names polygons={polygons} />
        </MapGL>
      </main>
    </Fragment>
  )
}
