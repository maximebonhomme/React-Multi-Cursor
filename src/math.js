export const getPointOnCircle = (theta, x, y, radius) => {
  const t = theta * (Math.PI / 180)

  return {
    x: x + radius * Math.cos(t),
    y: y + radius * Math.sin(t),
  }
}

export const getDistance = (px1, py1, px2, py2) => {
  const dx = px2 - px1
  const dy = py2 - py1

  return Math.sqrt(dx * dx + dy * dy)
}

export const lerpPoint = (start, target, factor) => {
  return {
    x: (1 - factor) * start.x + factor * target.x,
    y: (1 - factor) * start.y + factor * target.y,
  }
}
