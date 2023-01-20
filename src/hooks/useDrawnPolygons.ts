import { useCallback, useState } from 'react'
import { DrawnPolygon } from '../types'

export function useDrawnPolygons() {
  const [features, setFeatures] = useState<Record<string, DrawnPolygon>>({})

  const onUpdate = useCallback((event: { features: DrawnPolygon[] }) => {
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

  const onDelete = useCallback((event: { features: DrawnPolygon[] }) => {
    const idsToRemove = event.features.map((f) => f.id)
    setFeatures((currFeatures) =>
      Object.fromEntries(
        Object.entries(currFeatures).filter(([id]) => !idsToRemove.includes(id))
      )
    )
  }, [])

  return { features, onUpdate, onDelete }
}
