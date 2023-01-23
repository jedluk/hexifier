import React, { ChangeEvent, DragEvent, useRef, useState } from 'react'

import { Maybe } from '../../@types'
import { KEYBOARD_KEYS } from '../../lib/constants'
import { isSingleGeoJSONFile } from '../../lib/upload'

interface DropFileProps {
  children: React.ReactNode
  onFileSelect: (file: File) => void
}

export function DropFile(props: DropFileProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const { onFileSelect } = props
  const [isDragActive, setIsDragActive] = useState<boolean>(false)
  const [timeoutRef, setTimeoutRef] = useState<Maybe<number>>(null)

  const clearDragState = () => setIsDragActive(false)

  const onDragEnter = () => setIsDragActive(true)

  const onDragLeave = () => setIsDragActive(false)

  const onDragOver = (event: DragEvent<HTMLDivElement>) =>
    event.preventDefault()

  function onDrop(event: DragEvent<HTMLDivElement>): void {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (isSingleGeoJSONFile(files)) {
      onFileSelect(files[0])
      clearDragState()
    } else {
      // display error message
    }
  }

  const handleUploadClick = () => {
    if (inputRef !== null && inputRef.current !== null) {
      inputRef.current.click()
    }
  }

  const handleUploadKeyPress = (event: React.KeyboardEvent) => {
    if ([KEYBOARD_KEYS.enter, KEYBOARD_KEYS.space].includes(event.key)) {
      handleUploadClick()
    }
  }

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    if (isSingleGeoJSONFile(files)) {
      onFileSelect(files[0])
    }
  }

  return (
    <div
      className="h-32 group border border-dashed border-gray-300 hover:border-gray-500 ease-in duration-300 rounded-sm flex flex-col justify-center items-center"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={handleUploadClick}
      onKeyPress={handleUploadKeyPress}
      role="button"
      tabIndex={0}
    >
      {props.children}
      <input
        accept="application/json,.json"
        className="hidden"
        onChange={onFileInputChange}
        ref={inputRef}
        type="file"
      />
    </div>
  )
}
