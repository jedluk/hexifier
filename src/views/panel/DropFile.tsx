import React, {
  ChangeEvent,
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useBoolean } from 'use-boolean'

import { setTimeout } from '../../globals'
import { KEYBOARD_KEYS } from '../../lib/constants'
import { isNotNull, joinClassNames } from '../../lib/index'
import { isSingleJSONFile, isValidGeoJSON } from '../../lib/upload'
import { GeoPolygon, Maybe } from '../../types'

interface DropFileProps {
  children: React.ReactNode
  onFileUpload: (file: GeoPolygon[]) => void
}

export function DropFile(props: DropFileProps) {
  const { onFileUpload } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setDragActive, setDragInactive] = useBoolean(false)
  const [errorMessage, setErrorMessage] = useState<Maybe<string>>(null)

  const processFile = useCallback(
    (files: Maybe<FileList>) => {
      setDragInactive()

      if (isSingleJSONFile(files)) {
        isValidGeoJSON(files[0])
          .then((result) => onFileUpload(result))
          .catch((err: string) => setErrorMessage(err))
      } else {
        setErrorMessage('Only single (geo)JSON file is allowed.')
      }
    },
    [setDragInactive, onFileUpload]
  )

  const onFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    processFile(event.currentTarget.files)
  }

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    processFile(event.dataTransfer.files)
  }

  const handleUploadClick = () => {
    if (isNotNull(inputRef.current)) {
      inputRef.current.click()
    }
  }

  const handleUploadKeyPress = (event: React.KeyboardEvent) => {
    if ([KEYBOARD_KEYS.enter, KEYBOARD_KEYS.space].includes(event.key)) {
      handleUploadClick()
    }
  }

  useEffect(() => {
    if (isNotNull(errorMessage)) {
      setTimeout(() => setErrorMessage(null), 3_000)
    }
  }, [errorMessage])

  const classes = joinClassNames(
    'h-32 group border border-dashed border-gray-300 hover:border-gray-500 rounded-sm px-4 flex flex-col justify-center items-center',
    isDragActive && ' border-teal-300 bg-teal-200',
    isNotNull(errorMessage) &&
      'text-center border-2 border-rose-300 bg-rose-200'
  )

  return (
    <div
      className={classes}
      onDragEnter={setDragActive}
      onDragLeave={setDragInactive}
      onDragOver={(evt) => evt.preventDefault()}
      onDrop={onDrop}
      onClick={handleUploadClick}
      onKeyPress={handleUploadKeyPress}
      role="button"
      tabIndex={0}
    >
      {isNotNull(errorMessage) ? <span>{errorMessage}</span> : props.children}

      <input
        type="file"
        accept="application/json,.json,.geojson"
        className="hidden"
        onChange={onFileInputChange}
        ref={inputRef}
      />
    </div>
  )
}
