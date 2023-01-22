import React, { Fragment, useCallback, useRef, useState } from 'react'
import MapGL, { MapRef, NavigationControl } from 'react-map-gl'
import maplibre from 'maplibre-gl'
import DrawControl from './DrawControl'
import { serveFromBase } from './lib/asset'
import { Panel } from './Panel'
import { useDrawnPolygons } from './hooks/useDrawnPolygons'
import { DrawnPolygon, Maybe, HexCollection } from './types'
import bbox from '@turf/bbox'
import { CENTER_OF_EUROPE, MAP_PADDING } from './lib/constants'
import { Hex } from './Hex'

export default function App() {
  const mapRef = useRef<Maybe<MapRef>>(null)

  const [idToRemove, setIdToRemove] = useState('')
  const [hexCollection, setHexCollection] = useState<Maybe<HexCollection>>(null)
  const { features, onDelete, onUpdate } = useDrawnPolygons()

  const handleZoomToPolygon = useCallback((polygon: DrawnPolygon) => {
    mapRef.current?.fitBounds(
      bbox(polygon) as [number, number, number, number],
      { padding: MAP_PADDING }
    )
  }, [])

  const handleDeletePolygon = useCallback((polygon: DrawnPolygon) => {
    onDelete({ features: [polygon] })
    setIdToRemove(polygon.id)
  }, [])

  return (
    <Fragment>
      <Panel
        polygons={Object.values(features)}
        onSetHexCollection={setHexCollection}
        onDeletePolygon={handleDeletePolygon}
        onZoomToPolygon={handleZoomToPolygon}
      />
      <main className="relative w-full h-full">
        <MapGL
          ref={mapRef}
          dragRotate={false}
          padding={MAP_PADDING}
          mapLib={maplibre}
          mapStyle={serveFromBase('mapStyle.json')}
          minZoom={2}
          maxZoom={19}
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
        </MapGL>
      </main>
    </Fragment>
  )
}
