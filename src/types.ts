export type Maybe<T> = T | null

export interface Polygon {
  id: string
  geometry: {
    type: 'Polygon'
    coordinates: [number, number][]
  }
  properties: Record<string, unknown>
  type: 'Feature'
}
