'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _box = _interopRequireDefault(require("./box"));

var _vector = _interopRequireDefault(require("./vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Represents a ellipse with a position, width and height.
 * 
 * Creates a new ellipse, optionally passing in a position and/or width and height. If no position is given, the ellipse will be at `(0,0)`. 
 * 
 * If no width or height is provided the ellipse will have its values set to 0.
 */
var Ellipse = /*#__PURE__*/function () {
  /**
   * A Vector representing the center point of this ellipse.
   * 
   * @private
   * 
   * @property {Vector}
   */

  /**
   * The width of this ellipse.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The height of this ellipse.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The offset of this ellipse.
   * 
   * @private
   * 
   * @property {Vector}
   */

  /**
   * @param {Vector} position A Vector representing the center of this ellipse.
   * @param {number} width The width of this ellipse. 
   * @param {number} height The height of this ellipse. 
   * @param {Vector} offset The displacement with respect to the center of this ellipse. 
   */
  function Ellipse() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _vector["default"]();
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new _vector["default"]();

    _classCallCheck(this, Ellipse);

    _defineProperty(this, "_position", new _vector["default"]());

    _defineProperty(this, "_width", 0);

    _defineProperty(this, "_height", 0);

    _defineProperty(this, "_offset", new _vector["default"]());

    this._position = position;
    this._width = width;
    this._height = height;
    this._offset = offset;
  }
  /**
   * Returns the position of this ellipse.
   * 
   * @returns {Vector}
   */


  _createClass(Ellipse, [{
    key: "position",
    get: function get() {
      return this._position;
    }
    /**
     * Returns the width of this ellipse.
     * 
     * @returns {number}
     */

  }, {
    key: "width",
    get: function get() {
      return this._width;
    }
    /**
     * Returns the height of this ellipse.
     * 
     * @returns {number}
     */

  }, {
    key: "height",
    get: function get() {
      return this._height;
    }
    /**
     * Returns the offset of this ellipse.
     * 
     * @returns {Vector}
     */

  }, {
    key: "offset",
    get: function get() {
      return this._offset;
    }
    /**
     * Set a new offset for this ellipse.
     * 
     * @param {Vector} offset The new offset for this ellipse.
     */
    ,
    set: function set(offset) {
      this._offset = offset;
    }
    /**
     * Translate the center of the ellipse
     * 
     * @param {Vector} position A Vector representing the new center of this ellipse.
     */

  }, {
    key: "translate",
    value: function translate(x, y) {
      this._position.x += x;
      this._position.y += y;
    }
    /**
     * Compute the axis-aligned bounding box (AABB) of this ellipse.
     * 
     * Note: Returns a new `Polygon` each time this is called.
     * 
     * @returns {Polygon} Returns the AABB of this ellipse.
     */

  }, {
    key: "getAABB",
    value: function getAABB() {
      var corner = this._position.clone().add(this._offset).sub(new _vector["default"](this._width, this._height));

      return new _box["default"](corner, this._width * 2, this._height * 2).toPolygon();
    }
    /**
     * Set the current offset to apply to the radius.
     * 
     * @param {Vector} offset The new offset Vector.
     * 
     * @returns {Circle} Returns this for chaining.
     */

  }, {
    key: "setOffset",
    value: function setOffset(offset) {
      this._offset = offset;
      return this;
    }
  }]);

  return Ellipse;
}();

exports["default"] = Ellipse;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9lbGxpcHNlLnRzIl0sIm5hbWVzIjpbIkVsbGlwc2UiLCJwb3NpdGlvbiIsIlZlY3RvciIsIndpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0IiwiX3Bvc2l0aW9uIiwiX3dpZHRoIiwiX2hlaWdodCIsIl9vZmZzZXQiLCJ4IiwieSIsImNvcm5lciIsImNsb25lIiwiYWRkIiwic3ViIiwiQm94IiwidG9Qb2x5Z29uIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsTztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxxQkFBbUg7QUFBQSxRQUF2R0MsUUFBdUcsdUVBQXBGLElBQUlDLGtCQUFKLEVBQW9GO0FBQUEsUUFBdEVDLEtBQXNFLHVFQUF0RCxDQUFzRDtBQUFBLFFBQW5EQyxNQUFtRCx1RUFBbEMsQ0FBa0M7QUFBQSxRQUEvQkMsTUFBK0IsdUVBQWQsSUFBSUgsa0JBQUosRUFBYzs7QUFBQTs7QUFBQSx1Q0FuQ3ZGLElBQUlBLGtCQUFKLEVBbUN1Rjs7QUFBQSxvQ0ExQjFGLENBMEIwRjs7QUFBQSxxQ0FqQnpGLENBaUJ5Rjs7QUFBQSxxQ0FSekYsSUFBSUEsa0JBQUosRUFReUY7O0FBQ2pILFNBQUtJLFNBQUwsR0FBaUJMLFFBQWpCO0FBRUEsU0FBS00sTUFBTCxHQUFjSixLQUFkO0FBRUEsU0FBS0ssT0FBTCxHQUFlSixNQUFmO0FBRUEsU0FBS0ssT0FBTCxHQUFlSixNQUFmO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7OztTQUNFLGVBQXVCO0FBQUUsYUFBTyxLQUFLQyxTQUFaO0FBQXdCO0FBRWpEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDRSxlQUFvQjtBQUFFLGFBQU8sS0FBS0MsTUFBWjtBQUFxQjtBQUUzQztBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0UsZUFBcUI7QUFBRSxhQUFPLEtBQUtDLE9BQVo7QUFBc0I7QUFFN0M7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztTQUNFLGVBQXFCO0FBQUUsYUFBTyxLQUFLQyxPQUFaO0FBQXNCO0FBRTdDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O1NBQ0UsYUFBV0osTUFBWCxFQUEyQjtBQUFFLFdBQUtJLE9BQUwsR0FBZUosTUFBZjtBQUF3QjtBQUVyRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0UsbUJBQVVLLENBQVYsRUFBcUJDLENBQXJCLEVBQWdDO0FBQzlCLFdBQUtMLFNBQUwsQ0FBZUksQ0FBZixJQUFvQkEsQ0FBcEI7QUFDQSxXQUFLSixTQUFMLENBQWVLLENBQWYsSUFBb0JBLENBQXBCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLG1CQUFtQjtBQUNqQixVQUFNQyxNQUFNLEdBQUcsS0FBS04sU0FBTCxDQUFlTyxLQUFmLEdBQXVCQyxHQUF2QixDQUEyQixLQUFLTCxPQUFoQyxFQUF5Q00sR0FBekMsQ0FBNkMsSUFBSWIsa0JBQUosQ0FBVyxLQUFLSyxNQUFoQixFQUF3QixLQUFLQyxPQUE3QixDQUE3QyxDQUFmOztBQUNBLGFBQU8sSUFBSVEsZUFBSixDQUFRSixNQUFSLEVBQWdCLEtBQUtMLE1BQUwsR0FBYyxDQUE5QixFQUFpQyxLQUFLQyxPQUFMLEdBQWUsQ0FBaEQsRUFBbURTLFNBQW5ELEVBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0UsbUJBQVVaLE1BQVYsRUFBbUM7QUFDakMsV0FBS0ksT0FBTCxHQUFlSixNQUFmO0FBQ0EsYUFBTyxJQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuaW1wb3J0IEJveCBmcm9tICcuL2JveCc7XG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vdmVjdG9yJztcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vcG9seWdvbic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGVsbGlwc2Ugd2l0aCBhIHBvc2l0aW9uLCB3aWR0aCBhbmQgaGVpZ2h0LlxuICogXG4gKiBDcmVhdGVzIGEgbmV3IGVsbGlwc2UsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiBhIHBvc2l0aW9uIGFuZC9vciB3aWR0aCBhbmQgaGVpZ2h0LiBJZiBubyBwb3NpdGlvbiBpcyBnaXZlbiwgdGhlIGVsbGlwc2Ugd2lsbCBiZSBhdCBgKDAsMClgLiBcbiAqIFxuICogSWYgbm8gd2lkdGggb3IgaGVpZ2h0IGlzIHByb3ZpZGVkIHRoZSBlbGxpcHNlIHdpbGwgaGF2ZSBpdHMgdmFsdWVzIHNldCB0byAwLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbGxpcHNlIHtcbiAgLyoqXG4gICAqIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgY2VudGVyIHBvaW50IG9mIHRoaXMgZWxsaXBzZS5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcHJvcGVydHkge1ZlY3Rvcn1cbiAgICovXG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBWZWN0b3IgPSBuZXcgVmVjdG9yKCk7XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGlzIGVsbGlwc2UuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XG4gICAqL1xuICBwcml2YXRlIF93aWR0aDogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGlzIGVsbGlwc2UuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XG4gICAqL1xuICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhpcyBlbGxpcHNlLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7VmVjdG9yfVxuICAgKi9cbiAgcHJpdmF0ZSBfb2Zmc2V0OiBWZWN0b3IgPSBuZXcgVmVjdG9yKCk7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb3NpdGlvbiBBIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGNlbnRlciBvZiB0aGlzIGVsbGlwc2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aCBUaGUgd2lkdGggb2YgdGhpcyBlbGxpcHNlLiBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoaXMgZWxsaXBzZS4gXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvZmZzZXQgVGhlIGRpc3BsYWNlbWVudCB3aXRoIHJlc3BlY3QgdG8gdGhlIGNlbnRlciBvZiB0aGlzIGVsbGlwc2UuIFxuICAgKi9cbiAgY29uc3RydWN0b3IocG9zaXRpb246IFZlY3RvciA9IG5ldyBWZWN0b3IoKSwgd2lkdGg6IG51bWJlciA9IDAsIGhlaWdodDogbnVtYmVyID0gMCwgb2Zmc2V0OiBWZWN0b3IgPSBuZXcgVmVjdG9yKCkpIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuXG4gICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcblxuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcblxuICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwb3NpdGlvbiBvZiB0aGlzIGVsbGlwc2UuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfVxuICAgKi9cbiAgZ2V0IHBvc2l0aW9uKCk6IFZlY3RvciB7IHJldHVybiB0aGlzLl9wb3NpdGlvbjsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSB3aWR0aCBvZiB0aGlzIGVsbGlwc2UuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IHdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl93aWR0aDsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhpcyBlbGxpcHNlLlxuICAgKiBcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIGdldCBoZWlnaHQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2hlaWdodDsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBvZmZzZXQgb2YgdGhpcyBlbGxpcHNlLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn1cbiAgICovXG4gIGdldCBvZmZzZXQoKTogVmVjdG9yIHsgcmV0dXJuIHRoaXMuX29mZnNldDsgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSBuZXcgb2Zmc2V0IGZvciB0aGlzIGVsbGlwc2UuXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb2Zmc2V0IFRoZSBuZXcgb2Zmc2V0IGZvciB0aGlzIGVsbGlwc2UuXG4gICAqL1xuICBzZXQgb2Zmc2V0KG9mZnNldDogVmVjdG9yKSB7IHRoaXMuX29mZnNldCA9IG9mZnNldDsgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGUgdGhlIGNlbnRlciBvZiB0aGUgZWxsaXBzZVxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IHBvc2l0aW9uIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbmV3IGNlbnRlciBvZiB0aGlzIGVsbGlwc2UuXG4gICAqL1xuICB0cmFuc2xhdGUoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcbiAgICB0aGlzLl9wb3NpdGlvbi54ICs9IHg7XG4gICAgdGhpcy5fcG9zaXRpb24ueSArPSB5O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGUgdGhlIGF4aXMtYWxpZ25lZCBib3VuZGluZyBib3ggKEFBQkIpIG9mIHRoaXMgZWxsaXBzZS5cbiAgICogXG4gICAqIE5vdGU6IFJldHVybnMgYSBuZXcgYFBvbHlnb25gIGVhY2ggdGltZSB0aGlzIGlzIGNhbGxlZC5cbiAgICogXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoZSBBQUJCIG9mIHRoaXMgZWxsaXBzZS5cbiAgICovXG4gIGdldEFBQkIoKTogUG9seWdvbiB7XG4gICAgY29uc3QgY29ybmVyID0gdGhpcy5fcG9zaXRpb24uY2xvbmUoKS5hZGQodGhpcy5fb2Zmc2V0KS5zdWIobmV3IFZlY3Rvcih0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0KSk7XG4gICAgcmV0dXJuIG5ldyBCb3goY29ybmVyLCB0aGlzLl93aWR0aCAqIDIsIHRoaXMuX2hlaWdodCAqIDIpLnRvUG9seWdvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY3VycmVudCBvZmZzZXQgdG8gYXBwbHkgdG8gdGhlIHJhZGl1cy5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvZmZzZXQgVGhlIG5ldyBvZmZzZXQgVmVjdG9yLlxuICAgKiBcbiAgICogQHJldHVybnMge0NpcmNsZX0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHNldE9mZnNldChvZmZzZXQ6IFZlY3Rvcik6IEVsbGlwc2Uge1xuICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSJdfQ==