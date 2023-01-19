import React from 'react'
import { Upload } from './Upload'

export function Panel() {
  return (
    <div className="absolute z-10 top-2 left-2 w-60 bg-white rounded-md p-2">
      <h1 className="text-3xl font-bold mb-2">Hexifier</h1>
      <h2>Draw polygon</h2>
      <h3>or</h3>
      <Upload />
    </div>
  )
}
