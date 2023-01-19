import React from 'react'
import { Upload as UploadIcon } from './components/svg'

export function Upload() {
  return (
    <div className="grow border border-dashed border-gray-300 hover:border-gray-500 rounded-sm flex flex-col justify-center items-center cursor-pointer">
      <UploadIcon />
      <span className="uppercase mt-1">Upload geoJSON</span>
    </div>
  )
}
