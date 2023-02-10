import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { isNotNull, isNull } from '../../lib/index'
import { Maybe } from '../../types'
import { DumpButton } from './DumpButton'

export function DumpButtonWrapper() {
  const [mapLibreControls, setMapLibreContorls] =
    useState<Maybe<HTMLDivElement>>(null)

  useEffect(() => {
    const group = document.querySelector('.maplibregl-ctrl-top-right')
    if (isNotNull(group)) {
      setMapLibreContorls(group as HTMLDivElement)
    }
  }, [])

  if (isNull(mapLibreControls)) {
    return null
  }

  return ReactDOM.createPortal(<DumpButton />, mapLibreControls)
}
