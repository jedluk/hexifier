import React, { useCallback, useRef } from 'react'
import MapGL, { MapRef, NavigationControl } from 'react-map-gl'
import maplibre from 'maplibre-gl'
import DrawControl from './DrawControl'
import { serveFromBase } from './lib/asset'
import { Panel } from './Panel'
import { useDrawnPolygons } from './hooks/useDrawnPolygons'
import { Maybe, Polygon } from './types'
import bbox from '@turf/bbox'

export default function App() {
  const mapRef = useRef<Maybe<MapRef>>(null)

  const { features, onDelete, onUpdate } = useDrawnPolygons()

  const handleZoomToPolygon = useCallback((polygon: Polygon) => {
    mapRef.current?.fitBounds(bbox(polygon) as [number, number, number, number])
  }, [])

  return (
    <main className="relative w-full h-full">
      <Panel
        polygons={Object.values(features)}
        onZoomToPolygon={handleZoomToPolygon}
      />
      <MapGL
        ref={mapRef}
        dragRotate={false}
        mapLib={maplibre}
        mapStyle={serveFromBase('mapStyle.json')}
        minZoom={2}
        maxZoom={19}
        initialViewState={{ latitude: 50, longitude: 15, zoom: 4 }}
      >
        <NavigationControl showCompass position="top-right" />
        <DrawControl
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </MapGL>
    </main>
  )
}
