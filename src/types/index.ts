export type Maybe<T> = T | null

export type JSObject = Record<string, unknown>

export type BBox = [number, number, number, number]

export interface Point {
  type: 'Point'
  coordinates: [number, number]
}

export interface Polygon {
  type: 'Polygon'
  coordinates: [number, number][][]
}

export interface LineString {
  type: 'LineString'
  coordinates: [number, number][]
}

export type Feature<
  G = Point | Polygon | LineString,
  P = Record<string, unknown>
> = {
  type: 'Feature'
  geometry: G
  properties: P
}

export type FeatureCollection<
  G = Point | Polygon | LineString,
  P = Record<string, unknown>
> = {
  type: 'FeatureCollection'
  features: Feature<G, P>[]
}

export type HexCollection = FeatureCollection<Polygon, { hex: string }>

export interface GeoPolygon {
  geometry: {
    type: 'Polygon'
    coordinates: [number, number][][]
  }
  properties: Record<string, unknown>
  type: 'Feature'
}

export type GeoPolygonCollection = FeatureCollection<
  Polygon,
  Record<string, unknown>
>

export interface DrawnPolygon extends GeoPolygon {
  id: string
}

export type Marker = Feature<Point> & { id: string }

export interface HexMarker {
  lat: number
  lng: number
  hex: string
}
