import React, { Fragment, useEffect, useMemo } from 'react'

import { keys } from '../../lib'
import { HEX_AREA_SQUARE_KM } from '../../lib/constants'
import { formatNumber } from '../../lib/formatter'

const FEATURES_LIMIT = 100_000

interface SelectorProps {
  hexSize: number
  polygonArea: number
  onChange: (hexSize: number) => void
}

export function Selector(props: SelectorProps) {
  const { onChange, hexSize, polygonArea } = props

  const options = useMemo(
    () =>
      keys(HEX_AREA_SQUARE_KM).filter(
        (hexSize) => polygonArea / HEX_AREA_SQUARE_KM[hexSize] < FEATURES_LIMIT
      ),
    [polygonArea]
  )

  useEffect(() => {
    const defaultOption = Number(options[options.length - 3]) || 0
    onChange(defaultOption)
  }, [options, onChange])

  return (
    <Fragment>
      <label
        htmlFor="hexSize"
        className="block mt-4 text-sm font-medium text-gray-900"
      >
        Output hex size:
      </label>
      <select
        value={hexSize}
        id="hexSize"
        onChange={(evt) => onChange(Number(evt.target.value))}
        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-50 p-2.5"
      >
        {options.map((key) => (
          <option key={key} value={key}>
            {key} ({formatNumber(HEX_AREAS_SQUARE_KM[Number(key)])} km²)
          </option>
        ))}
      </select>
    </Fragment>
  )
}
