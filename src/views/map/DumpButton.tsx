import React from 'react'

interface DumpButtonProps {
  onClick: () => void
}

const iconStyle: React.CSSProperties = {
  backgroundImage: `url(data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20%3E%0A%20%20%20%20%3Cpath%0A%20%20%20%20d%3D%22M16.51%200.0799999L0.0799999%2016.51C0.17%2016.85%200.35%2017.16%200.59%2017.41C0.84%2017.65%201.15%2017.83%201.49%2017.92L17.93%201.49C17.74%200.8%2017.2%200.26%2016.51%200.0799999ZM8.88%200L0%208.88V11.71L11.71%200H8.88ZM2%200C0.9%200%200%200.9%200%202V4L4%200H2ZM16%2018C16.55%2018%2017.05%2017.78%2017.41%2017.41C17.78%2017.05%2018%2016.55%2018%2016V14L14%2018H16ZM6.29%2018H9.12L18%209.12V6.29L6.29%2018Z%22%0A%20%20%20%20fill%3D%22%23323232%22%0A%20%20%20%20%2F%3E%0A%3C%2Fsvg%3E)`
}

export function DumpButton(props: DumpButtonProps) {
  return (
    <div className="maplibregl-ctrl maplibregl-ctrl-group">
      <button onClick={props.onClick} title="Dump current view">
        <span className="maplibregl-ctrl-icon" style={iconStyle} />
      </button>
    </div>
  )
}
