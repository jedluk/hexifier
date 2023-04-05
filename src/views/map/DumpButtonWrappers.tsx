import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import { isNotNull, isNull } from '../../lib/index'
import { Maybe } from '../../types'
import { DumpButton } from './DumpButton'

interface DumpButtonWrapperProps {
  onClick: () => void
}

export function DumpButtonWrapper(props: DumpButtonWrapperProps) {
  const [container, setContainer] = useState<Maybe<HTMLDivElement>>(null)
  const isSet = useRef(false)

  useEffect(() => {
    const group = document.querySelector('.maplibregl-ctrl-bottom-right')

    if (isNull(group)) {
      return
    }

    const callback: MutationCallback = () => {
      if (isNotNull(group.firstChild) && !isSet.current) {
        const container = document.createElement('div')
        container.classList.add('maplibregl-ctrl', 'maplibregl-ctrl-group')

        group.firstChild.after(container)
        isSet.current = true
        setContainer(container)
      }
    }

    const observer = new MutationObserver(callback)
    observer.observe(group, { childList: true })
    return () => observer.disconnect()
  }, [])

  if (isNull(container)) {
    return null
  }

  return ReactDOM.createPortal(
    <DumpButton onClick={props.onClick} />,
    container
  )
}
