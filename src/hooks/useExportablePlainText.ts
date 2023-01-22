import { useEffect, useMemo } from 'react'
import { Blob, createObjectURL, revokeObjectURL } from '../globals'

export function useExportablePlainText(content: string) {
  const link = useMemo(
    () => createObjectURL(
        Blob([content], {
          type: 'text/plain;charset=UTF-8',
        })
      ),    
    [content]
  )

  useEffect(() => {
    return () => revokeObjectURL(link)
  }, [link])

  return link
}
