import React from 'react'
import MapGL from 'react-map-gl'
import maplibre from 'maplibre-gl'

export default function App() {
  return (
    <main>
      <MapGL mapLib={maplibre} mapStyle="/mapStyle.json" />
    </main>
  )
}
