import React from "react"
import "./App.css"

// yarn link "react-multi-cursor"
import ReactMultiCursor from "react-multi-cursor"

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
      <ReactMultiCursor onClick={callback} cursors={cursors} />
    </div>
  )
}

export default App
