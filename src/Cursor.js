import React from "react"
import PropTypes from "prop-types"

const cursorStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "10px",
  height: "10px",
  margin: "-7px 0 0 -7px",
  backgroundColor: "black",
  borderRadius: "50%",
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
    y: PropTypes.number.isRequired,
  }),
}

Cursor.defaultProps = {
  className: "multi-cursor",
  style: cursorStyle,
}

export default Cursor
