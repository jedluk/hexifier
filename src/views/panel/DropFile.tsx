import React, {
  ChangeEvent,
  DragEvent,
  useEffect,
  useRef,
  useState
} from 'react'

import { RenderWhen } from '../../components/render-when/RenderWhen'
import { setTimeout } from '../../globals'
import { KEYBOARD_KEYS } from '../../lib/constants'
import { isEmpty, isNotEmpty, joinClassNames } from '../../lib/index'
import { isSingleGeoJSONFile } from '../../lib/upload'

interface DropFileProps {
  children: React.ReactNode
  onFileSelect: (file: File) => void
}

export function DropFile(props: DropFileProps) {
  const { onFileSelect } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState('')

  const clearDragState = () => setIsDragActive(false)

  const onDragEnter = () => setIsDragActive(true)

  const onDragLeave = () => setIsDragActive(false)

  const onDragOver = (event: DragEvent<HTMLDivElement>) =>
    event.preventDefault()

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const files = event.dataTransfer.files
    if (isSingleGeoJSONFile(files)) {
      onFileSelect(files[0])
      clearDragState()
    } else {
      // TODO : check file structure
      clearDragState()
      setErrorMessage('Not a valid geojson!')
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

  useEffect(() => {
    if (isNotEmpty(errorMessage)) {
      setTimeout(() => setErrorMessage(''), 3_000)
    }
  }, [errorMessage])

  const classes = joinClassNames(
    'h-32 group border border-dashed border-gray-300 hover:border-gray-500 rounded-sm flex flex-col justify-center items-center',
    isDragActive ? ' border-teal-600 bg-teal-200' : '',
    isNotEmpty(errorMessage) ? 'border-2 border-rose-600 bg-rose-200' : ''
  )

  return (
    <div
      className={classes}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={handleUploadClick}
      onKeyPress={handleUploadKeyPress}
      role="button"
      tabIndex={0}
    >
      <RenderWhen condition={isEmpty(errorMessage)}>
        {props.children}
      </RenderWhen>

      <RenderWhen condition={isNotEmpty(errorMessage)}>
        <span>{errorMessage}</span>
      </RenderWhen>

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
