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
    ? 'text-red-700 border border-red-700'
    : 'bg-emerald-400 hover:bg-emerald-500 text-neutral-100'

  return (
    <button
      className={joinClassNames(
        'w-fit rounded-lg p-1 hover:font-bold hover:scale-[1.1] ease-in-out duration-300',
        customClasses,
        props.className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
