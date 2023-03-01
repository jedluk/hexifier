import React from 'react'

import { serveFromBase } from '../../lib/asset'

interface DrawerProps {
  chevron: 'left' | 'right'
  onClick: () => void
}

export function Drawer(props: DrawerProps) {
  const { chevron, onClick } = props

  const buttonStyle: React.CSSProperties = {
    backgroundImage: `url(${serveFromBase(`chevron_${chevron}.svg`)})`
  }

  return (
    <div className="hidden md:flex absolute md:left-96 md:top-[calc(50%-12px)] z-10 w-4 h-8 bg-white rounded-r-[4px] flex-col justify-center">
      <button
        onClick={onClick}
        className="w-4 h-4 bg-center bg-no-repeat	cursor-pointer"
        style={buttonStyle}
      />
    </div>
  )
}
