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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9lbGxpcHNlLnRzIl0sIm5hbWVzIjpbIkVsbGlwc2UiLCJwb3NpdGlvbiIsIlZlY3RvciIsIndpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0IiwiX3Bvc2l0aW9uIiwiX3dpZHRoIiwiX2hlaWdodCIsIl9vZmZzZXQiLCJ4IiwieSIsImNvcm5lciIsImNsb25lIiwiYWRkIiwic3ViIiwiQm94IiwidG9Qb2x5Z29uIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsTztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxxQkFBbUg7QUFBQSxRQUF2R0MsUUFBdUcsdUVBQXBGLElBQUlDLGtCQUFKLEVBQW9GO0FBQUEsUUFBdEVDLEtBQXNFLHVFQUF0RCxDQUFzRDtBQUFBLFFBQW5EQyxNQUFtRCx1RUFBbEMsQ0FBa0M7QUFBQSxRQUEvQkMsTUFBK0IsdUVBQWQsSUFBSUgsa0JBQUosRUFBYzs7QUFBQTs7QUFBQSx1Q0FuQ3ZGLElBQUlBLGtCQUFKLEVBbUN1Rjs7QUFBQSxvQ0ExQjFGLENBMEIwRjs7QUFBQSxxQ0FqQnpGLENBaUJ5Rjs7QUFBQSxxQ0FSekYsSUFBSUEsa0JBQUosRUFReUY7O0FBQ2pILFNBQUtJLFNBQUwsR0FBaUJMLFFBQWpCO0FBRUEsU0FBS00sTUFBTCxHQUFjSixLQUFkO0FBRUEsU0FBS0ssT0FBTCxHQUFlSixNQUFmO0FBRUEsU0FBS0ssT0FBTCxHQUFlSixNQUFmO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7OztTQUNFLGVBQXVCO0FBQUUsYUFBTyxLQUFLQyxTQUFaO0FBQXdCO0FBRWpEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDRSxlQUFvQjtBQUFFLGFBQU8sS0FBS0MsTUFBWjtBQUFxQjtBQUUzQztBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0UsZUFBcUI7QUFBRSxhQUFPLEtBQUtDLE9BQVo7QUFBc0I7QUFFN0M7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztTQUNFLGVBQXFCO0FBQUUsYUFBTyxLQUFLQyxPQUFaO0FBQXNCO0FBRTdDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O1NBQ0UsYUFBV0osTUFBWCxFQUEyQjtBQUFFLFdBQUtJLE9BQUwsR0FBZUosTUFBZjtBQUF3QjtBQUVyRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0UsbUJBQVVLLENBQVYsRUFBcUJDLENBQXJCLEVBQWdDO0FBQzlCLFdBQUtMLFNBQUwsQ0FBZUksQ0FBZixJQUFvQkEsQ0FBcEI7QUFDQSxXQUFLSixTQUFMLENBQWVLLENBQWYsSUFBb0JBLENBQXBCO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLG1CQUFtQjtBQUNqQixVQUFNQyxNQUFNLEdBQUcsS0FBS04sU0FBTCxDQUFlTyxLQUFmLEdBQXVCQyxHQUF2QixDQUEyQixLQUFLTCxPQUFoQyxFQUF5Q00sR0FBekMsQ0FBNkMsSUFBSWIsa0JBQUosQ0FBVyxLQUFLSyxNQUFoQixFQUF3QixLQUFLQyxPQUE3QixDQUE3QyxDQUFmOztBQUNBLGFBQU8sSUFBSVEsZUFBSixDQUFRSixNQUFSLEVBQWdCLEtBQUtMLE1BQUwsR0FBYyxDQUE5QixFQUFpQyxLQUFLQyxPQUFMLEdBQWUsQ0FBaEQsRUFBbURTLFNBQW5ELEVBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0UsbUJBQVVaLE1BQVYsRUFBbUM7QUFDakMsV0FBS0ksT0FBTCxHQUFlSixNQUFmO0FBQ0EsYUFBTyxJQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBCb3ggZnJvbSAnLi9ib3gnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vdmVjdG9yJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9wb2x5Z29uJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgZWxsaXBzZSB3aXRoIGEgcG9zaXRpb24sIHdpZHRoIGFuZCBoZWlnaHQuXHJcbiAqIFxyXG4gKiBDcmVhdGVzIGEgbmV3IGVsbGlwc2UsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiBhIHBvc2l0aW9uIGFuZC9vciB3aWR0aCBhbmQgaGVpZ2h0LiBJZiBubyBwb3NpdGlvbiBpcyBnaXZlbiwgdGhlIGVsbGlwc2Ugd2lsbCBiZSBhdCBgKDAsMClgLiBcclxuICogXHJcbiAqIElmIG5vIHdpZHRoIG9yIGhlaWdodCBpcyBwcm92aWRlZCB0aGUgZWxsaXBzZSB3aWxsIGhhdmUgaXRzIHZhbHVlcyBzZXQgdG8gMC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVsbGlwc2Uge1xyXG4gIC8qKlxyXG4gICAqIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgY2VudGVyIHBvaW50IG9mIHRoaXMgZWxsaXBzZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7VmVjdG9yfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBWZWN0b3IgPSBuZXcgVmVjdG9yKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3aWR0aCBvZiB0aGlzIGVsbGlwc2UuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF93aWR0aDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlaWdodCBvZiB0aGlzIGVsbGlwc2UuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBvZmZzZXQgb2YgdGhpcyBlbGxpcHNlLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtWZWN0b3J9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfb2Zmc2V0OiBWZWN0b3IgPSBuZXcgVmVjdG9yKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb3NpdGlvbiBBIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGNlbnRlciBvZiB0aGlzIGVsbGlwc2UuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIFRoZSB3aWR0aCBvZiB0aGlzIGVsbGlwc2UuIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGlzIGVsbGlwc2UuIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvZmZzZXQgVGhlIGRpc3BsYWNlbWVudCB3aXRoIHJlc3BlY3QgdG8gdGhlIGNlbnRlciBvZiB0aGlzIGVsbGlwc2UuIFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3IgPSBuZXcgVmVjdG9yKCksIHdpZHRoOiBudW1iZXIgPSAwLCBoZWlnaHQ6IG51bWJlciA9IDAsIG9mZnNldDogVmVjdG9yID0gbmV3IFZlY3RvcigpKSB7XHJcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XHJcblxyXG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoaXMgZWxsaXBzZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfVxyXG4gICAqL1xyXG4gIGdldCBwb3NpdGlvbigpOiBWZWN0b3IgeyByZXR1cm4gdGhpcy5fcG9zaXRpb247IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgd2lkdGggb2YgdGhpcyBlbGxpcHNlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IHdpZHRoKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl93aWR0aDsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBoZWlnaHQgb2YgdGhpcyBlbGxpcHNlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IGhlaWdodCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5faGVpZ2h0OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG9mZnNldCBvZiB0aGlzIGVsbGlwc2UuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn1cclxuICAgKi9cclxuICBnZXQgb2Zmc2V0KCk6IFZlY3RvciB7IHJldHVybiB0aGlzLl9vZmZzZXQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGEgbmV3IG9mZnNldCBmb3IgdGhpcyBlbGxpcHNlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvZmZzZXQgVGhlIG5ldyBvZmZzZXQgZm9yIHRoaXMgZWxsaXBzZS5cclxuICAgKi9cclxuICBzZXQgb2Zmc2V0KG9mZnNldDogVmVjdG9yKSB7IHRoaXMuX29mZnNldCA9IG9mZnNldDsgfVxyXG5cclxuICAvKipcclxuICAgKiBUcmFuc2xhdGUgdGhlIGNlbnRlciBvZiB0aGUgZWxsaXBzZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb3NpdGlvbiBBIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIG5ldyBjZW50ZXIgb2YgdGhpcyBlbGxpcHNlLlxyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZSh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy5fcG9zaXRpb24ueCArPSB4O1xyXG4gICAgdGhpcy5fcG9zaXRpb24ueSArPSB5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZSB0aGUgYXhpcy1hbGlnbmVkIGJvdW5kaW5nIGJveCAoQUFCQikgb2YgdGhpcyBlbGxpcHNlLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFJldHVybnMgYSBuZXcgYFBvbHlnb25gIGVhY2ggdGltZSB0aGlzIGlzIGNhbGxlZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGUgQUFCQiBvZiB0aGlzIGVsbGlwc2UuXHJcbiAgICovXHJcbiAgZ2V0QUFCQigpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IGNvcm5lciA9IHRoaXMuX3Bvc2l0aW9uLmNsb25lKCkuYWRkKHRoaXMuX29mZnNldCkuc3ViKG5ldyBWZWN0b3IodGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCkpO1xyXG4gICAgcmV0dXJuIG5ldyBCb3goY29ybmVyLCB0aGlzLl93aWR0aCAqIDIsIHRoaXMuX2hlaWdodCAqIDIpLnRvUG9seWdvbigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBjdXJyZW50IG9mZnNldCB0byBhcHBseSB0byB0aGUgcmFkaXVzLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvZmZzZXQgVGhlIG5ldyBvZmZzZXQgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtDaXJjbGV9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgc2V0T2Zmc2V0KG9mZnNldDogVmVjdG9yKTogRWxsaXBzZSB7XHJcbiAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn0iXX0=