import React from "react"
import MultiCursor from "../../ReactMultiCursor"
import QuadGrid from "../_components/QuadGrid"

import "./style.css"

const cursors = [
  {
    angle: 0,
    style: {},
    className: "my-custom-cursor",
  },
  {
    angle: 180,
    style: {},
    className: "my-custom-cursor",
  },
]

const Custom = () => {
  return (
    <>
      <MultiCursor
        hoverCursorClassName="my-custom-cursor--hover"
        cursors={cursors}
      />
      <QuadGrid
        title="See custom example code"
        href="https://github.com/maximebonhomme/React-Multi-Cursor/blob/master/src/examples/Custom/index.js"
      />
    </>
  )
}

export default Custom
