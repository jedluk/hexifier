import React from 'react'

import { joinClassNames } from '../../lib'

interface ButtonProps {
  className?: string
  text: string
  padding?: 'sm' | 'md'
  secondary?: boolean
  onClick: () => void
}
export function Button(props: ButtonProps) {
  const { text, onClick, secondary = false } = props

  const customClasses = secondary
    ? 'text-rose-700 border border-rose-700 hover:border-rose-800'
    : 'bg-emerald-400 hover:bg-emerald-500 text-neutral-100'

  return (
    <button
      className={joinClassNames(
        'w-fit text-center rounded-lg p-1 ease-in-out duration-300',
        customClasses,
        props.className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
