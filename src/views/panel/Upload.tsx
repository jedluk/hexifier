import React from 'react'

import { Upload as UploadIcon } from '../../components/svg'
import { GeoPolygon } from '../../types'
import { DropFile } from './DropFile'

interface UploadProps {
  onAddPolygons: (polygons: GeoPolygon[]) => void
}

export function Upload(props: UploadProps) {
  return (
    <DropFile onFileUpload={props.onAddPolygons}>
      <UploadIcon />
      <span className="uppercase mt-1">Drop geoJSON with polygons</span>
    </DropFile>
  )
}
