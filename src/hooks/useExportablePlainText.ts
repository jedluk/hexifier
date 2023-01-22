import { useEffect, useMemo, useState } from 'react'
import { Blob, createObjectURL, revokeObjectURL } from '../globals'

export function useExportablePlainText(content: string) {
  const [link, setLink] = useState('')

  useEffect(() => {
    const urlLink = createObjectURL(
      Blob([content], {
        type: 'text/plain;charset=UTF-8'
      })
    )
    setLink(urlLink)
    return () => {
      revokeObjectURL(link)
    }
  }, [content])

  return link
}
