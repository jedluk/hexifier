import React from 'react'
import { Upload as UploadIcon } from './components/svg'

export function Upload() {
  return (
    <div className="h-20 border border-gray-100 hover:border-gray-300 rounded-sm flex flex-col justify-center items-center">
      <div>
        <UploadIcon />
        Upload geoJSON
      </div>
    </div>
  )
}
