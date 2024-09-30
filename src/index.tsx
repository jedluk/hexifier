import './index.css'
import 'maplibre-gl/dist/maplibre-gl.css'
import 'map-gl-compass-pro/dist/style.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'

import { App } from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
