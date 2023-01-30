import React from 'react'

interface LinkProps {
  url: string
  text: string
}

export function Link(props: LinkProps) {
  return (
    <a
      href={props.url}
      className="ml-1 font-medium text-blue-600 dark:text-blue-500 hover:underline"
      rel="nofollow noopener noreferrer"
      target="_blank"
    >
      {props.text}
    </a>
  )
}
