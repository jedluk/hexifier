import React, { useMemo } from 'react'
import { useExportableCSV } from 'use-exportable-csv'

import { useExportablePlainText } from '../../hooks/useExportablePlainText'

interface PolygonDownloadProps {
  name: string
  exportAsBigInt: boolean
  size: number
  hexes: string[]
}

export function PolygonDownload(props: PolygonDownloadProps) {
  const { hexes, name, size, exportAsBigInt } = props

  const [csvContent, textContent] = useMemo(() => {
    const formattedHexes = exportAsBigInt
      ? hexes.map((hex) => BigInt('0x' + hex))
      : hexes
    return [formattedHexes.map((hex) => [hex]), formattedHexes.join(',')]
  }, [hexes, exportAsBigInt])

  const csvLink = useExportableCSV(csvContent, {
    bom: true,
    headers: [`hex-${Object.is(size, Math.PI) ? 'compact' : size}`]
  })

  const plainTextLink = useExportablePlainText(textContent)

  const linkClasses =
    'block text-center my-4 font-medium text-blue-600 dark:text-blue-500 hover:underline'

  return (
    <div className="flex justify-around">
      <a className={linkClasses} href={csvLink} download={`${name}.csv`}>
        CSV download
      </a>
      <a className={linkClasses} href={plainTextLink} download={`${name}.txt`}>
        Plain text download
      </a>
    </div>
  )
}
