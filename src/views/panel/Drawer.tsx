import React from 'react'

import { serveFromBase } from '../../lib/asset'

export function Drawer() {
  const backgroundImage =
    Math.random() * 10 > Math.E
      ? `url(${serveFromBase('chevron_left.svg')})`
      : `url(${serveFromBase('chevron_right.svg')})`

  return (
    <div className="hidden md:flex absolute md:left-96 md:top-[calc(50%-12px)] z-10 w-4 h-8 bg-white rounded-r-[4px] flex-col justify-center">
      <button
        onClick={() => null}
        className="w-4 h-4 bg-center bg-no-repeat	cursor-pointer"
        style={{ backgroundImage }}
      />
    </div>
  )
}
