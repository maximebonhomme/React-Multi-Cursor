import React, { useEffect, useCallback, useRef } from "react"
import { useWindowSize } from "react-use"

import QuadGrid from "../_components/QuadGrid"
import MultiCursor from "../../ReactMultiCursor"

const cursors = [
  {
    angle: 0,
  },
  {
    angle: 180,
  },
  {
    angle: 90,
  },
  {
    angle: -90,
  },
  {
    angle: 45,
  },
  {
    angle: -45,
  },
  {
    angle: 135,
  },
  {
    angle: -135,
  },
]
const CIRCLE_SIZE = 5

// eslint-disable-next-line no-bitwise
const randomHex = () => `#${((Math.random() * 0xffffff) << 0).toString(16)}`

const Interactive = () => {
  const { width, height } = useWindowSize()
  const isDrawing = useRef(false)
  const pathColor = useRef(randomHex())
  const canvasRef = useRef(null)

  const handleMouseDown = () => {
    pathColor.current = randomHex()
    isDrawing.current = true
  }

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  const handleCursorUpdate = useCallback(
    (c) => {
      if (!isDrawing.current) return
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      c.forEach((cursor) => {
        ctx.beginPath()
        ctx.arc(cursor.x, cursor.y, CIRCLE_SIZE, 0, 2 * Math.PI)
        ctx.fillStyle = pathColor.current
        ctx.fill()
        ctx.closePath()
      })
    },
    [isDrawing]
  )

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      <MultiCursor
        smoothness={0.1}
        onUpdate={handleCursorUpdate}
        cursors={cursors}
      />
      <QuadGrid
        title="See interactive example code"
        href="https://github.com/maximebonhomme/React-Multi-Cursor/blob/master/src/examples/Interactive/index.js"
      />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="interactive-canvas"
      />
    </>
  )
}

export default Interactive
