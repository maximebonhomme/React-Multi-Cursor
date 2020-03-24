"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("../../node_modules/prop-types"));

var _throttle = _interopRequireDefault(require("../../node_modules/lodash/throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getPointOnCircle = function getPointOnCircle(theta, x, y, radius) {
  var t = theta * (Math.PI / 180);
  return {
    x: x + radius * Math.cos(t),
    y: y + radius * Math.sin(t)
  };
};

var getDistance = function getDistance(px1, py1, px2, py2) {
  var dx = px2 - px1;
  var dy = py2 - py1;
  return Math.sqrt(dx * dx + dy * dy);
};

var lerpPoint = function lerpPoint(start, target, factor) {
  return {
    x: (1 - factor) * start.x + factor * target.x,
    y: (1 - factor) * start.y + factor * target.y
  };
};

var mandatoryCursorStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  pointerEvents: "none"
};
var cursorStyle = {
  width: "10px",
  height: "10px",
  margin: "-7px 0 0 -7px",
  backgroundColor: "black",
  borderRadius: "50%"
};

var Cursor = _react.default.forwardRef(function (_ref, ref) {
  var style = _ref.style,
      className = _ref.className;
  return /*#__PURE__*/_react.default.createElement("div", {
    ref: ref,
    className: className,
    style: _objectSpread({}, mandatoryCursorStyle, {}, style)
  });
});

Cursor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  position: _propTypes.default.shape({
    x: _propTypes.default.number.isRequired,
    y: _propTypes.default.number.isRequired
  })
};
Cursor.defaultProps = {
  className: "multi-cursor",
  style: cursorStyle
};
var RAF = null;

var MultiCursor = function MultiCursor(_ref2) {
  var cursors = _ref2.cursors,
      throttleDelay = _ref2.throttleDelay,
      smoothness = _ref2.smoothness,
      onUpdate = _ref2.onUpdate,
      onClick = _ref2.onClick,
      onTouchStart = _ref2.onTouchStart,
      onTouchMove = _ref2.onTouchMove,
      onTouchCancel = _ref2.onTouchCancel,
      onTouchEnd = _ref2.onTouchEnd;
  var cursorRefs = (0, _react.useRef)([]);
  var updatedCursors = [];
  var windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  var windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
  var center = {
    x: windowWidth / 2,
    y: windowHeight / 2
  };
  var mouseTarget = {
    x: 0,
    y: 0
  };
  var mouseLast = {
    x: 0,
    y: 0
  };
  var mouse = {
    x: 0,
    y: 0
  };

  var handleMouseMove = function handleMouseMove(e) {
    var x = e.clientX;
    var y = e.clientY;
    var diff = {
      x: x - mouseLast.x,
      y: y - mouseLast.y
    };
    mouseTarget = {
      x: mouseTarget.x += diff.x,
      y: mouseTarget.y += diff.y
    };
    mouseLast = {
      x: x,
      y: y
    };
  };

  var getCursorPos = function getCursorPos(c, m, i) {
    var distance = getDistance(m.x, m.y, center.x, center.y);
    var angle = Math.atan2(m.y - center.y, m.x - center.x) * 180 / Math.PI;
    var newAngle = angle + c.angle;
    var point = getPointOnCircle(newAngle, center.x, center.y, distance);
    return point;
  };

  var loop = function loop() {
    mouse = lerpPoint(mouse, mouseTarget, smoothness);

    if (cursorRefs.current.length > 0) {
      cursors.forEach(function (cursor, i) {
        var ref = cursorRefs.current[i];
        var p = getCursorPos(cursor, mouse);
        ref.style.transform = "translate(".concat(p.x, "px, ").concat(p.y, "px)");
        updatedCursors[i] = p;
      });
    }

    if (onUpdate) onUpdate(updatedCursors);
    RAF = requestAnimationFrame(loop);
  };

  var handleClick = function handleClick(e) {
    if (onClick) onClick(e, updatedCursors);
  };

  var handleTouchStart = function handleTouchStart(e) {
    if (onTouchStart) onTouchStart(e, updatedCursors);
  };

  var handleTouchEnd = function handleTouchEnd(e) {
    if (onTouchEnd) onTouchEnd(e, updatedCursors);
  };

  var handleTouchCancel = function handleTouchCancel(e) {
    if (onTouchCancel) onTouchCancel(e, updatedCursors);
  };

  var handleTouchMove = function handleTouchMove(e) {
    if (onTouchMove) onTouchMove(e, updatedCursors);
  };

  (0, _react.useEffect)(function () {
    var throttledMouseMove = (0, _throttle.default)(handleMouseMove, throttleDelay);
    window.addEventListener("mousemove", throttledMouseMove);
    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouchStart, false);
    window.addEventListener("touchend", handleTouchEnd, false);
    window.addEventListener("touchcancel", handleTouchCancel, false);
    window.addEventListener("touchmove", handleTouchMove, false);
    return function () {
      window.removeEventListener("mousemove", throttledMouseMove);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouchStart, false);
      window.removeEventListener("touchend", handleTouchEnd, false);
      window.removeEventListener("touchcancel", handleTouchCancel, false);
      window.removeEventListener("touchmove", handleTouchMove, false);
    };
  }, []);
  (0, _react.useEffect)(function () {
    RAF = requestAnimationFrame(loop);
    return function () {
      window.cancelAnimationFrame(RAF);
      RAF = null;
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, cursors.map(function (cursor, i) {
    return /*#__PURE__*/_react.default.createElement(Cursor, {
      key: cursor.angle,
      ref: function ref(_ref3) {
        cursorRefs.current[i] = _ref3;
      },
      className: cursor.className,
      style: cursor.style
    });
  }));
};

MultiCursor.propTypes = {
  cursors: _propTypes.default.arrayOf(_propTypes.default.shape({
    angle: _propTypes.default.number.isRequired,
    style: _propTypes.default.object,
    className: _propTypes.default.string
  })),
  onUpdate: _propTypes.default.func,
  onClick: _propTypes.default.func,
  onTouchStart: _propTypes.default.func,
  onTouchMove: _propTypes.default.func,
  onTouchCancel: _propTypes.default.func,
  onTouchEnd: _propTypes.default.func,
  throttleDelay: _propTypes.default.number,
  smoothness: _propTypes.default.number
};
MultiCursor.defaultProps = {
  throttleDelay: 10,
  smoothness: 1,
  onUpdate: null,
  onClick: null,
  onTouchStart: null,
  onTouchMove: null,
  onTouchCancel: null,
  onTouchEnd: null
};
var _default = MultiCursor;
exports.default = _default;
