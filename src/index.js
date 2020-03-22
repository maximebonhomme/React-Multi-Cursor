import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types"
import throttle from "lodash/throttle"

const getPointOnCircle = (theta, x, y, radius) => {
  const t = theta * (Math.PI / 180)

  return {
    x: x + radius * Math.cos(t),
    y: y + radius * Math.sin(t)
  }
}

const getDistance = (px1, py1, px2, py2) => {
  const dx = px2 - px1
  const dy = py2 - py1

  return Math.sqrt(dx * dx + dy * dy)
}

const lerpPoint = (start, target, factor) => {
  return {
    x: (1 - factor) * start.x + factor * target.x,
    y: (1 - factor) * start.y + factor * target.y
  }
}

const cursorStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "10px",
  height: "10px",
  margin: "-7px 0 0 -7px",
  backgroundColor: "black",
  borderRadius: "50%"
}

const Cursor = React.forwardRef(({ style, className }, ref) => {
  return <div ref={ref} className={className} style={style} />
})

Cursor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  className: PropTypes.string,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  })
}

Cursor.defaultProps = {
  className: "multi-cursor",
  style: cursorStyle
}

let RAF = null
const MultiCursor = ({ cursors, throttleDelay, smoothness, onUpdate }) => {
  const cursorRefs = useRef([])
  const updatedCursors = []
  const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0
  const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0
  const center = {
    x: windowWidth / 2,
    y: windowHeight / 2
  }
  let mouseTarget = { x: 0, y: 0 }
  let mouseLast = { x: 0, y: 0 }
  let mouse = { x: 0, y: 0 }

  const mouseMove = e => {
    const x = e.clientX
    const y = e.clientY
    const diff = {
      x: x - mouseLast.x,
      y: y - mouseLast.y
    }

    mouseTarget = {
      x: (mouseTarget.x += diff.x),
      y: (mouseTarget.y += diff.y)
    }

    mouseLast = {
      x,
      y
    }
  }

  const getCursorPos = (c, m, i) => {
    const distance = getDistance(m.x, m.y, center.x, center.y)
    const angle = (Math.atan2(m.y - center.y, m.x - center.x) * 180) / Math.PI
    const newAngle = angle + c.angle
    const point = getPointOnCircle(newAngle, center.x, center.y, distance)

    return point
  }

  const loop = () => {
    mouse = lerpPoint(mouse, mouseTarget, smoothness)

    if (cursorRefs.current.length > 0) {
      cursors.forEach((cursor, i) => {
        const ref = cursorRefs.current[i]
        const p = getCursorPos(cursor, mouse)

        ref.style.transform = `translate(${p.x}px, ${p.y}px)`

        updatedCursors[i] = p
      })
    }

    onUpdate(updatedCursors)

    RAF = requestAnimationFrame(loop)
  }

  useEffect(() => {
    const throttledMouseMove = throttle(mouseMove, throttleDelay)
    window.addEventListener("mousemove", throttledMouseMove)

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
    }
  }, [])

  useEffect(() => {
    RAF = requestAnimationFrame(loop)

    return () => {
      window.cancelAnimationFrame(RAF)
      RAF = null
    }
  }, [])

  return (
    <>
      {cursors.map((cursor, i) => (
        <Cursor
          key={cursor.angle}
          ref={ref => {
            cursorRefs.current[i] = ref
          }}
          className={cursor.className}
          style={cursor.style}
        />
      ))}
    </>
  )
}

MultiCursor.propTypes = {
  cursors: PropTypes.arrayOf(
    PropTypes.shape({
      angle: PropTypes.number.isRequired,
      style: PropTypes.object,
      className: PropTypes.string
    })
  ),
  onUpdate: PropTypes.func,
  throttleDelay: PropTypes.number,
  smoothness: PropTypes.number
}

MultiCursor.defaultProps = {
  throttleDelay: 10,
  smoothness: 1,
  onUpdate: () => {}
}

export default MultiCursor
