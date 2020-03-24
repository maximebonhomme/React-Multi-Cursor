import React from "react"

import ReactMultiCursor from "./ReactMultiCursor"

const cursors = [
  {
    angle: 0
  }
]

function App() {
  const callback = (e, c) => {
    console.log("e", e)
    console.log("c", c)
  }

  return (
    <div className="App">
      <ReactMultiCursor onTouchCancel={callback} cursors={cursors} />
    </div>
  )
}

export default App
