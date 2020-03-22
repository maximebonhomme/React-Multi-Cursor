"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cursorStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "10px",
  height: "10px",
  margin: "-7px 0 0 -7px",
  backgroundColor: "black",
  borderRadius: "50%"
};

var Cursor = _react["default"].forwardRef(function (_ref, ref) {
  var style = _ref.style,
      className = _ref.className;
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    className: className,
    style: style
  });
});

Cursor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: _propTypes["default"].object,
  className: _propTypes["default"].string,
  position: _propTypes["default"].shape({
    x: _propTypes["default"].number.isRequired,
    y: _propTypes["default"].number.isRequired
  })
};
Cursor.defaultProps = {
  className: "multi-cursor",
  style: cursorStyle
};
var _default = Cursor;
exports["default"] = _default;
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _throttle = _interopRequireDefault(require("lodash/throttle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var cursorStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "10px",
  height: "10px",
  margin: "-7px 0 0 -7px",
  backgroundColor: "black",
  borderRadius: "50%"
};

var Cursor = _react["default"].forwardRef(function (_ref, ref) {
  var style = _ref.style,
      className = _ref.className;
  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    className: className,
    style: style
  });
});

Cursor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: _propTypes["default"].object,
  className: _propTypes["default"].string,
  position: _propTypes["default"].shape({
    x: _propTypes["default"].number.isRequired,
    y: _propTypes["default"].number.isRequired
  })
};
Cursor.defaultProps = {
  className: "multi-cursor",
  style: cursorStyle
};

var MultiCursor = function MultiCursor(_ref2) {
  var cursors = _ref2.cursors,
      throttleDelay = _ref2.throttleDelay,
      smoothness = _ref2.smoothness,
      onUpdate = _ref2.onUpdate;
  var cursorRefs = (0, _react.useRef)([]);
  var updatedCursors = [];
  var windowWidth = window !== undefined ? window.innerWidth : 0;
  var windowHeight = window !== undefined ? window.innerHeight : 0;
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
  var RAF = null;

  var mouseMove = function mouseMove(e) {
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

    onUpdate(updatedCursors);
    RAF = requestAnimationFrame(loop);
  };

  (0, _react.useEffect)(function () {
    var throttledMouseMove = (0, _throttle["default"])(mouseMove, throttleDelay);
    window.addEventListener("mousemove", throttledMouseMove);
    return function () {
      window.removeEventListener("mousemove", throttledMouseMove);
    };
  }, []);
  (0, _react.useEffect)(function () {
    RAF = requestAnimationFrame(loop);
    return function () {
      window.cancelAnimationFrame(RAF);
      RAF = null;
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, cursors.map(function (cursor, i) {
    return /*#__PURE__*/_react["default"].createElement(Cursor, {
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
  cursors: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    angle: _propTypes["default"].number.isRequired,
    style: _propTypes["default"].object,
    className: _propTypes["default"].string
  })),
  onUpdate: _propTypes["default"].func,
  throttleDelay: _propTypes["default"].number,
  smoothness: _propTypes["default"].number
};
MultiCursor.defaultProps = {
  throttleDelay: 10,
  smoothness: 1,
  onUpdate: function onUpdate() {}
};
var _default = MultiCursor;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lerpPoint = exports.getDistance = exports.getPointOnCircle = void 0;

var getPointOnCircle = function getPointOnCircle(theta, x, y, radius) {
  var t = theta * (Math.PI / 180);
  return {
    x: x + radius * Math.cos(t),
    y: y + radius * Math.sin(t)
  };
};

exports.getPointOnCircle = getPointOnCircle;

var getDistance = function getDistance(px1, py1, px2, py2) {
  var dx = px2 - px1;
  var dy = py2 - py1;
  return Math.sqrt(dx * dx + dy * dy);
};

exports.getDistance = getDistance;

var lerpPoint = function lerpPoint(start, target, factor) {
  return {
    x: (1 - factor) * start.x + factor * target.x,
    y: (1 - factor) * start.y + factor * target.y
  };
};

exports.lerpPoint = lerpPoint;
