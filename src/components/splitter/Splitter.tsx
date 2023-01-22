import React from 'react'
import { joinClassNames } from '../../lib'

interface SplitterProps {
  size: 'sm' | 'md'
  className?: string
}

export function Splitter(props: SplitterProps) {
  const classes = joinClassNames(
    'bg-slate-200 w-full',
    props.size === 'sm' ? 'h-px' : 'h-0.5',
    props.className
  )

  return <div className={classes} />
}
