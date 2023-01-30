import React from 'react'

import { isNotUndefined } from '../../lib'

const ZOOM_LEVELS = new Map([
  [3, 'country'],
  [5, 'state'],
  [8, 'county'],
  [10, 'city'],
  [14, 'suburb'],
  [16, 'major streets'],
  [17, 'major and minor streets'],
  [18, 'building']
])

function formatLabel(zoom: number): string {
  let label = String(zoom)
  const level = ZOOM_LEVELS.get(zoom)
  if (isNotUndefined(level)) {
    label += ` ( ${level} )`
  }
  return label
}

interface ZoomSelectorProps {
  value: number
  onChange: (value: number) => void
}

export function ZoomSelector(props: ZoomSelectorProps) {
  return (
    <select
      value={props.value}
      id="zoom"
      onChange={(evt) => props.onChange(Number(evt.target.value))}
      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-50 p-2.5"
    >
      {Array.from(Array(18).keys())
        .map((x) => x + 1)
        .map((zoom) => (
          <option key={zoom} value={zoom}>
            {formatLabel(zoom)}
          </option>
        ))}
    </select>
  )
}
