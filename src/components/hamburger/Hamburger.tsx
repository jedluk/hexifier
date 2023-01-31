import React from 'react'

import { joinClassNames } from '../../lib/index'

interface HamburgerProps {
  onClick: () => void
  className?: string
}

export function Hamburger(props: HamburgerProps) {
  return (
    <button
      className={joinClassNames('space-y-2', props.className)}
      onClick={props.onClick}
    >
      <span className="block w-5 h-0.5 bg-gray-600"></span>
      <span className="block w-8 h-0.5 bg-gray-600"></span>
      <span className="block w-8 h-0.5 bg-gray-600"></span>
    </button>
  )
}
