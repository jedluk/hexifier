import React from 'react'
import { Upload as UploadIcon } from './components/svg'

export function Upload() {
  return (
    <div className="h-32 group border border-dashed border-gray-300 hover:border-gray-500 ease-in duration-300 rounded-sm flex flex-col justify-center items-center cursor-pointer">
      <UploadIcon className="group-hover:block text-red-300" />
      <span className="uppercase mt-1 group-hover:hidden">Upload geoJSON</span>
      <span className="hidden uppercase group-hover:block text-red-300">
        Not ready yet
      </span>
    </div>
  )
}
