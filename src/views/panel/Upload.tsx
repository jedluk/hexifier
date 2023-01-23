import React, { useEffect, useState } from 'react'

import { Maybe } from '../../@types'
import { Upload as UploadIcon } from '../../components/svg'
import { isNotNull } from '../../lib'
import { DropFile } from './DropFile'

export function Upload() {
  const [file, setFile] = useState<Maybe<File>>(null)

  useEffect(() => {
    if (isNotNull(file)) {
      console.log('file uploaded...')
    }
  }, [file])

  return (
    <DropFile onFileSelect={setFile}>
      <UploadIcon className="group-hover:block" />
      <span className="uppercase mt-1">Drop geoJSON</span>
    </DropFile>
  )
}
