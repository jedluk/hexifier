import React from 'react'
import { Upload as UploadIcon } from './components/svg'

export function Upload() {
  return (
    <div className="h-20 border border-dashed border-gray-200 hover:border-gray-500 rounded-sm flex flex-col justify-center items-center">
      <UploadIcon />
      <span>Upload geoJSON</span>
    </div>
  )
}
