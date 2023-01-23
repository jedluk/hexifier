import React from 'react'

import { GeoPolygon } from '../../@types'
import { Upload as UploadIcon } from '../../components/svg'
import { DropFile } from './DropFile'

interface UploadProps {
  onAddPolygons: (polygons: GeoPolygon[]) => void
}

export function Upload(props: UploadProps) {
  return (
    <DropFile onFileUpload={props.onAddPolygons}>
      <UploadIcon className="group-hover:block" />
      <span className="uppercase mt-1 group-hover:hidden">Drop geoJSON</span>
    </DropFile>
  )
}
