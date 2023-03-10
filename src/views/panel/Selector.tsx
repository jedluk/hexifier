import React, { useEffect, useMemo } from 'react'

import { keys } from '../../lib'
import { HEX_AREA_SQUARE_KM } from '../../lib/constants'
import { formatNumber } from '../../lib/formatter'

const FEATURES_LIMIT = 100_000

interface SelectorProps {
  hexSize: number
  polygonArea: number
  onSetMinSize: (size: number) => void
  onChange: (hexSize: number) => void
}

export function Selector(props: SelectorProps) {
  const { onChange, onSetMinSize, hexSize, polygonArea } = props

  const options = useMemo(
    () =>
      keys(HEX_AREA_SQUARE_KM).filter(
        (hexSize) => polygonArea / HEX_AREA_SQUARE_KM[hexSize] < FEATURES_LIMIT
      ),
    [polygonArea]
  )

  useEffect(() => {
    const defaultOption = Number(options[options.length - 3]) || 0
    onSetMinSize(Number(options[options.length - 1]))
    onChange(defaultOption)
  }, [options, onSetMinSize, onChange])

  return (
    <select
      value={hexSize}
      id="hexSize"
      onChange={(evt) => onChange(Number(evt.target.value))}
      className="w-7/12 md:w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-50 p-2.5"
    >
      {options.map((hexSize) => (
        <option key={hexSize} value={hexSize}>
          {hexSize} ({formatNumber(HEX_AREA_SQUARE_KM[hexSize])} km²)
        </option>
      ))}
      <option value={Math.PI}>compact</option>
    </select>
  )
}
