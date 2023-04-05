import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { isNotNull, isNull } from '../../lib/index'
import { Maybe } from '../../types'
import { DumpButton } from './DumpButton'

interface DumpButtonWrapperProps {
  onClick: () => void
}

export function DumpButtonWrapper(props: DumpButtonWrapperProps) {
  const [container, setContainer] = useState<Maybe<HTMLDivElement>>(null)

  useEffect(() => {
    const group = document.querySelector('.maplibregl-ctrl-bottom-right')
    if (isNotNull(group)) {
      const node = document.createElement('div')
      group.insertBefore(node, group.firstChild)
      setContainer(node)
    }
  }, [])

  if (isNull(container)) {
    return null
  }

  return ReactDOM.createPortal(
    <DumpButton onClick={props.onClick} />,
    container
  )
}
