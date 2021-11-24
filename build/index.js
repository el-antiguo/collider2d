'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Box", {
  enumerable: true,
  get: function get() {
    return _box["default"];
  }
});
Object.defineProperty(exports, "BoxOrigin", {
  enumerable: true,
  get: function get() {
    return _box.BoxOrigin;
  }
});
Object.defineProperty(exports, "Circle", {
  enumerable: true,
  get: function get() {
    return _circle["default"];
  }
});
Object.defineProperty(exports, "Ellipse", {
  enumerable: true,
  get: function get() {
    return _ellipse["default"];
  }
});
Object.defineProperty(exports, "Vector", {
  enumerable: true,
  get: function get() {
    return _vector["default"];
  }
});
Object.defineProperty(exports, "Polygon", {
  enumerable: true,
  get: function get() {
    return _polygon["default"];
  }
});
Object.defineProperty(exports, "Collider2d", {
  enumerable: true,
  get: function get() {
    return _collider2d["default"];
  }
});

var _box = _interopRequireWildcard(require("./geometry/box"));

var _circle = _interopRequireDefault(require("./geometry/circle"));

var _ellipse = _interopRequireDefault(require("./geometry/ellipse"));

var _vector = _interopRequireDefault(require("./geometry/vector"));

var _polygon = _interopRequireDefault(require("./geometry/polygon"));

var _collider2d = _interopRequireDefault(require("./collider2d"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgQm94IGZyb20gJy4vZ2VvbWV0cnkvYm94JztcbmltcG9ydCBDaXJjbGUgZnJvbSAnLi9nZW9tZXRyeS9jaXJjbGUnO1xuaW1wb3J0IEVsbGlwc2UgZnJvbSAnLi9nZW9tZXRyeS9lbGxpcHNlJztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9nZW9tZXRyeS92ZWN0b3InO1xuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9nZW9tZXRyeS9wb2x5Z29uJztcblxuaW1wb3J0IENvbGxpZGVyMmQgZnJvbSAnLi9jb2xsaWRlcjJkJztcblxuZXhwb3J0IHtCb3hPcmlnaW59IGZyb20gJy4vZ2VvbWV0cnkvYm94JztcblxuZXhwb3J0IHtcbiAgQm94LFxuICBDaXJjbGUsXG4gIEVsbGlwc2UsXG4gIFZlY3RvcixcbiAgUG9seWdvbixcbiAgQ29sbGlkZXIyZFxufSJdfQ==