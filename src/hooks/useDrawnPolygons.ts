import { useCallback, useState } from 'react'
import { Polygon } from '../types'

export function useDrawnPolygons() {
  const [features, setFeatures] = useState<Record<string, Polygon>>({})

  const onUpdate = useCallback((event: { features: Polygon[] }) => {
    setFeatures((currFeatures) =>
      event.features.reduce(
        (acc, feature) => {
          acc[feature.id] = feature
          return acc
        },
        { ...currFeatures }
      )
    )
  }, [])

  const onDelete = useCallback((event: { features: Polygon[] }) => {
    const idsToRemove = event.features.map((f) => f.id)
    setFeatures((currFeatures) =>
      Object.fromEntries(
        Object.entries(currFeatures).filter(([id]) => !idsToRemove.includes(id))
      )
    )
  }, [])

  return { features, onUpdate, onDelete }
}
