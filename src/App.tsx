import bbox from '@turf/bbox'
import maplibre from 'maplibre-gl'
import React, { Fragment, useCallback, useRef, useState } from 'react'
import MapGL, { MapRef, NavigationControl } from 'react-map-gl'

import { useDrawer } from './hooks/useDrawer'
import { useMapMouseEvent } from './hooks/useMapMouseEvent'
import { serveFromBase } from './lib/asset'
import { CENTER_OF_EUROPE, MAP_PADDING } from './lib/constants'
import { isNotNull } from './lib/index'
import { BBox, DrawnPolygon, GeoPolygon, HexCollection, Maybe } from './types'
import { DrawControl } from './views/map/DrawControl'
import { GeocoderBubble } from './views/map/GeocoderBubble'
import { HexArea } from './views/map/HexArea'
import { HexMarker } from './views/map/HexMarker'
import { Names } from './views/map/Names'
import { Panel } from './views/panel/Panel'

export function App() {
  const mapRef = useRef<Maybe<MapRef>>(null)
  const [hexCollection, setHexCollection] = useState<Maybe<HexCollection>>(null)

  const {
    draw,
    marker: draggableMarker,
    features,
    onMapUpdate,
    onPopulatePolygons,
    onDeleteMarker,
    onDeletePolygon
  } = useDrawer()

  const {
    marker: hexMarker,
    interactiveLayers,
    handleMouseMove,
    handleMouseLeave
  } = useMapMouseEvent(mapRef.current, hexCollection)

  const handleZoomToPolygon = useCallback(
    (
      polygon: DrawnPolygon | GeoPolygon,
      options?: mapboxgl.FitBoundsOptions
    ) => {
      mapRef.current?.fitBounds(bbox(polygon) as BBox, options)
    },
    []
  )

  const handleAddPolygons = useCallback(
    (polygons: GeoPolygon[]) => {
      onPopulatePolygons(polygons)
      handleZoomToPolygon(polygons[0])
    },
    [onPopulatePolygons, handleZoomToPolygon]
  )

  const polygons = Object.values(features)

  return (
    <Fragment>
      <Panel
        polygons={polygons}
        onAddHexCollection={setHexCollection}
        onDeletePolygon={onDeletePolygon}
        onAddPolygons={handleAddPolygons}
        onZoomToPolygon={handleZoomToPolygon}
      />
      <main className="relative w-full h-full">
        <MapGL
          ref={mapRef}
          mapLib={maplibre}
          minZoom={2}
          maxZoom={19}
          dragRotate={false}
          mapStyle={serveFromBase('mapStyle.json')}
          padding={MAP_PADDING}
          initialViewState={CENTER_OF_EUROPE}
          interactiveLayerIds={interactiveLayers}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <NavigationControl showCompass={false} position="top-right" />
          <DrawControl
            draw={draw}
            onCreate={onMapUpdate}
            onUpdate={onMapUpdate}
          />
          <HexArea collection={hexCollection} />
          <HexMarker marker={hexMarker} />
          {isNotNull(draggableMarker) && (
            <GeocoderBubble
              marker={draggableMarker}
              onAddPolygon={handleAddPolygons}
              onDeleteMarker={onDeleteMarker}
              onZoom={handleZoomToPolygon}
            />
          )}
          <Names polygons={polygons} />
        </MapGL>
      </main>
    </Fragment>
  )
}
