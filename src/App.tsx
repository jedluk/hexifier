import bbox from '@turf/bbox'
import bboxPolygon from '@turf/bbox-polygon'
import Compass from 'map-gl-compass-pro'
import maplibre from 'maplibre-gl'
import React, { Fragment, useCallback, useRef, useState } from 'react'
import MapGL, { MapRef, NavigationControl } from 'react-map-gl'
import { useBoolean } from 'use-boolean'

import { useDrawer } from './hooks/useDrawer'
import { useMapMouseEvent } from './hooks/useMapMouseEvent'
import { serveFromBase } from './lib/asset'
import {
  CENTER_OF_EUROPE,
  getMapPadding,
  getSidebarRatio
} from './lib/constants'
import { isNotNull, isNotUndefined } from './lib/index'
import { BBox, DrawnPolygon, GeoPolygon, HexCollection, Maybe } from './types'
import { DrawControl } from './views/map/DrawControl'
import { DumpButtonWrapper } from './views/map/DumpButtonWrappers'
import { Geocoder } from './views/map/Geocoder'
import { GeocoderBubble } from './views/map/GeocoderBubble'
import { HexArea } from './views/map/HexArea'
import { HexMarker } from './views/map/HexMarker'
import { Names } from './views/map/Names'
import { Panel } from './views/panel/Panel'

export function App() {
  const mapRef = useRef<Maybe<MapRef>>(null)
  const [isPanelOpen, , , togglePanel] = useBoolean(true)
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
  } = useMapMouseEvent(mapRef.current, hexCollection, features)

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

  const onMapDump = useCallback(() => {
    const bounds = mapRef.current?.getBounds()
    if (isNotUndefined(bounds)) {
      const polygon = bboxPolygon(
        [
          bounds.getWest() +
            Number(isPanelOpen) *
              getSidebarRatio() *
              (bounds.getEast() - bounds.getWest()),
          bounds.getSouth(),
          bounds.getEast(),
          bounds.getNorth()
        ],
        { id: String(Date.now()) }
      )
      onPopulatePolygons([polygon as GeoPolygon], true)
    }
  }, [onPopulatePolygons, isPanelOpen])

  const polygons = Object.values(features)

  return (
    <Fragment>
      <Panel
        isOpen={isPanelOpen}
        polygons={polygons}
        onAddHexCollection={setHexCollection}
        onDeletePolygon={onDeletePolygon}
        onAddPolygons={handleAddPolygons}
        onZoomToPolygon={handleZoomToPolygon}
        onToggle={togglePanel}
      />
      <main className="relative w-full h-full">
        <MapGL
          ref={mapRef}
          mapLib={maplibre}
          minZoom={2}
          maxZoom={19}
          // dragRotate={true}
          mapStyle={serveFromBase('mapStyle.json')}
          padding={getMapPadding()}
          initialViewState={CENTER_OF_EUROPE}
          interactiveLayerIds={interactiveLayers}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <Geocoder />
          <DumpButtonWrapper onClick={onMapDump} />
          <NavigationControl showCompass={false} position="bottom-right" />
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
          <Compass size="sm" wrapperClass="maplibre-compass" />
        </MapGL>
      </main>
    </Fragment>
  )
}
