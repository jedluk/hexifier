import React from 'react'
import { Logo } from './components/svg'
import { Upload } from './Upload'

export function Panel() {
  return (
    <div className="absolute z-10 top-2 left-2 w-60 bg-white rounded-md p-2">
      <Logo height={24} />
      <h2>Draw polygon</h2>
      <h3>or</h3>
      <Upload />
    </div>
  )
}
