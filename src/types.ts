export type Maybe<T> = T | null

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

export interface DrawnPolygon {
  id: string
  geometry: {
    type: 'Polygon'
    coordinates: [number, number][][]
  }
  properties: Record<string, unknown>
  type: 'Feature'
}
