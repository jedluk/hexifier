import React, { Fragment } from 'react'

interface RenderWhenProps {
  condition: boolean
  children: React.ReactNode
}

function RenderWhenComponent(props: RenderWhenProps) {
  return props.condition ? <Fragment>{props.children}</Fragment> : null
}

export const RenderWhen = React.memo(RenderWhenComponent)
