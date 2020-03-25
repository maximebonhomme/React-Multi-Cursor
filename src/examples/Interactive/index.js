import React from "react"
import MultiCursor from "../../ReactMultiCursor"

const cursors = [
  {
    angle: 0,
  },
  {
    angle: 180,
  },
]

const Interactive = () => {
  return (
    <div>
      <MultiCursor smoothness={0.4} cursors={cursors} />
    </div>
  )
}

export default Interactive
