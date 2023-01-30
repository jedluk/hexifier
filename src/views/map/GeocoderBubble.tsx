import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import { Layer, Popup, Source } from 'react-map-gl'
import { useQuery } from 'react-query'

import { reverseGeocode } from '../../apis/nominatim'
import { Button } from '../../components/button/Button'
import { Link } from '../../components/link/Link'
import { RenderWhen } from '../../components/render-when/RenderWhen'
import { Splitter } from '../../components/splitter/Splitter'
import { MAP_PADDING } from '../../lib/constants'
import { findLocationOnTop } from '../../lib/geo'
import { isNotNull, isNotUndefined } from '../../lib/index'
import { GeoPolygon, Marker, Maybe } from '../../types'
import { Nominatim } from '../../types/nominatim'
import { ZoomSelector } from './ZoomSelector'

interface GeocoderBubbleProps {
  marker: Marker
  onAddPolygon: (polygons: GeoPolygon[]) => void
  onZoom: (polygon: GeoPolygon, options?: mapboxgl.FitBoundsOptions) => void
  onDeleteMarker: () => void
}

export function GeocoderBubble(props: GeocoderBubbleProps) {
  const { marker, onZoom, onAddPolygon, onDeleteMarker } = props
  const [lon, lat] = marker.geometry.coordinates

  const [osmElement, setOSMElement] =
    useState<Maybe<Nominatim.OSMElement>>(null)
  const [zoom, setZoom] = useState(10)

  const handleAddPolygon = useCallback(() => {
    if (isNotNull(osmElement)) {
      const { geojson } = osmElement
      const polygon = {
        geometry: {
          coordinates:
            geojson.type === 'MultiPolygon'
              ? geojson.coordinates[0]
              : geojson.coordinates,
          type: 'Polygon'
        },
        properties: {},
        type: 'Feature'
      } as const
      onAddPolygon([polygon])
      onDeleteMarker()
    }
  }, [onAddPolygon, onDeleteMarker, osmElement])

  const [popupLon, popupLat] = useMemo(() => {
    if (isNotNull(osmElement)) {
      const { type } = osmElement.geojson
      return findLocationOnTop(
        type === 'MultiPolygon'
          ? osmElement.geojson.coordinates[0][0]
          : osmElement.geojson.coordinates[0]
      )
    }
    return marker.geometry.coordinates
  }, [marker, osmElement])

  const { data, isLoading } = useQuery({
    keepPreviousData: false,
    queryFn: () => reverseGeocode(lat, lon, zoom),
    queryKey: ['reverseGeocode', { lat, lon, zoom }],
    staleTime: Infinity
  })

  useEffect(() => {
    if (isNotUndefined(data)) {
      setOSMElement(data)
      onZoom(data.geojson as unknown as GeoPolygon, {
        padding: { ...MAP_PADDING, right: 200, top: 200 }
      })
    }
  }, [data, onZoom])

  return (
    <Fragment>
      <Popup
        longitude={popupLon}
        latitude={popupLat}
        closeOnClick={false}
        onClose={props.onDeleteMarker}
        anchor="bottom"
      >
        <RenderWhen condition={isLoading}>
          <span className="blur-sm">{'blurry text'.repeat(5)}</span>
        </RenderWhen>
        {isNotNull(osmElement) && (
          <div className="p-1">
            <strong>{osmElement.display_name}</strong>
            <div className="my-2">
              See
              <Link
                className="ml-1"
                text="OSM details"
                url={`https://www.openstreetmap.org/${osmElement.osm_type}/${osmElement.osm_id}`}
              />
            </div>
            <Splitter size="sm" className="my-1" />
            <span>Select geocoding</span>
            <Link
              text="zoom level"
              url="https://wiki.openstreetmap.org/wiki/Zoom_level"
            />
            <ZoomSelector value={zoom} onChange={setZoom} />

            <div className="flex justify-end mt-2">
              <Button text="add" className="px-2" onClick={handleAddPolygon} />
            </div>
          </div>
        )}
      </Popup>
      {isNotNull(osmElement) && (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        <Source id="geocoder-area" type="geojson" data={osmElement.geojson}>
          <Layer
            id="geocoder-area"
            source="geocoder-area"
            type="fill"
            paint={{
              'fill-color': '#7c3aed',
              'fill-opacity': 0.5
            }}
          />
        </Source>
      )}
    </Fragment>
  )
}
