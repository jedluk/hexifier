import React from 'react'
import { Area, Logo } from './components/svg'
import { Upload } from './Upload'

export function Panel() {
  return (
    <div className="absolute z-10 top-2 left-2 w-60 bg-white rounded-md p-2">
      <Logo height={24} />
      <h2 className="my-5 flex">
        <Area />
        &nbsp;
        <span>draw polygon or</span>
      </h2>
      <Upload />
    </div>
  )
}
