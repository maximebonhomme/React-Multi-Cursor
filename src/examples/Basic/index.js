import React from "react"
import MultiCursor from "../../ReactMultiCursor"
import QuadGrid from "../_components/QuadGrid"

const cursors = [
  {
    angle: 0,
  },
  {
    angle: 180,
  },
]

const Basic = () => {
  return (
    <>
      <MultiCursor cursors={cursors} />
      <QuadGrid
        title="See basic example code"
        href="https://github.com/maximebonhomme/React-Multi-Cursor/blob/master/src/examples/Basic/index.js"
      />
    </>
  )
}

export default Basic
