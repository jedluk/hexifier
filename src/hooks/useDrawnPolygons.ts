import { useCallback, useState } from 'react'

import { DrawnPolygon } from '../@types'

interface DrawnPolygons {
  features: Record<string, DrawnPolygon>
  onDelete: (event: { features: DrawnPolygon[] }) => void
  onUpdate: (event: { features: DrawnPolygon[] }) => void
}

export function useDrawnPolygons(): DrawnPolygons {
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

  return { features, onDelete, onUpdate }
}
