import React from 'react'

export default function CircleArrow({
  direction = 'forward',
}: {
  direction?: 'forward' | 'backward'
}) {
  return (
    <div
      className="token-explorer__circle-arrow"
      style={{ transform: direction === 'forward' ? 'rotate(0deg)' : 'rotate(180deg)' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g
          strokeLinecap="square"
          strokeLinejoin="miter"
          strokeWidth="2"
          fill="none"
          stroke="#000000"
          strokeMiterlimit="10">
          <line
            x1="6"
            y1="12"
            x2="17"
            y2="12"
            strokeLinecap="butt"
            stroke="#000000"></line>
          <polyline points=" 13,8 17,12 13,16 " stroke="#000000"></polyline>
          <circle cx="12" cy="12" r="11"></circle>
        </g>
      </svg>
    </div>
  )
}
