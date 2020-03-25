import React from "react"

const QuadGrid = ({ title, href }) => {
  return (
    <div className="quad-grid">
      <div className="quad-grid-half">
        <div className="quad-grid-item">
          <a
            className="multi-cursor-item"
            href="https://github.com/maximebonhomme/React-Multi-Cursor"
          >
            Check repo on Github
          </a>
        </div>
        <div className="quad-grid-item">
          <a className="multi-cursor-item" href={href}>
            {title}
          </a>
        </div>
      </div>
      <div className="quad-grid-half">
        <div className="quad-grid-item">
          <a className=" multi-cursor-item" href={href}>
            {title}
          </a>
        </div>
        <div className="quad-grid-item">
          <a
            className="multi-cursor-item"
            href="https://github.com/maximebonhomme/React-Multi-Cursor"
          >
            Check repo on Github
          </a>
        </div>
      </div>
    </div>
  )
}

export default QuadGrid
