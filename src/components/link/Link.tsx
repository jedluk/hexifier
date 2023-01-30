import React from 'react'

import { joinClassNames } from '../../lib'

interface LinkProps {
  url: string
  text: string
  className?: string
}

export function Link(props: LinkProps) {
  const classNames = joinClassNames(
    'font-medium text-blue-600 dark:text-blue-500 hover:underline ml-1',
    props.className
  )

  return (
    <a
      href={props.url}
      className={classNames}
      rel="nofollow noopener noreferrer"
      target="_blank"
    >
      {props.text}
    </a>
  )
}
