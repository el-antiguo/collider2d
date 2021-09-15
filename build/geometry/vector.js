'use strict';
/**
 * Represents a vector in two dimensions with `x` and `y` properties.
 * 
 * Create a new Vector, optionally passing in the `x` and `y` coordinates. If a coordinate is not specified, it will be set to `0`.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Vector = /*#__PURE__*/function () {
  /**
   * The x coordinate of this vector.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The y coordinate of this vector.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * @param {number} [x=0] The x coordinate of this vector.
   * @param {number} [y=0] The y coordinate of this vector.
   */
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vector);

    _defineProperty(this, "_x", 0);

    _defineProperty(this, "_y", 0);

    this._x = x;
    this._y = y;
  }
  /**
   * Returns the x value of this vector.
   * 
   * @returns {number}
   */


  _createClass(Vector, [{
    key: "x",
    get: function get() {
      return this._x;
    }
    /**
     * Returns the y value of this vector.
     * 
     * @returns {number}
     */
    ,
    set:
    /**
     * Sets a new x value for this vector.
     * 
     * @param {number} x The new x value for this vector.
     */
    function set(x) {
      this._x = x;
    }
    /**
     * Sets a new y value for this vector.
     * 
     * @param {number} y The new y value for this vector.
     */

  }, {
    key: "y",
    get: function get() {
      return this._y;
    }
    /**
     * Returns the angle value of this vector.
     * 
     * @returns {number}
     */
    ,
    set: function set(y) {
      this._y = y;
    }
    /**
     * Copy the values of another Vector into this one.
     * 
     * @param {Vector} other The other Vector.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "angle",
    get: function get() {
      var angle = Math.atan2(this._y, this._x);
      return angle < 0 ? angle + 6.28319 : angle;
    }
  }, {
    key: "copy",
    value: function copy(other) {
      this._x = other.x;
      this._y = other.y;
      return this;
    }
    /**
     * Create a new Vector with the same coordinates as the one.
     * 
     * @returns {Vector} The new cloned Vector.
     */

  }, {
    key: "clone",
    value: function clone() {
      return new Vector(this.x, this.y);
    }
    /**
     * Change this Vector to be perpendicular to what it was before.
     * 
     * Effectively this rotates it 90 degrees in a clockwise direction.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "perp",
    value: function perp() {
      var x = this.x;
      this._x = this.y;
      this._y = -x;
      return this;
    }
    /**
     * Rotate this Vector (counter-clockwise) by the specified angle (in radians).
     * 
     * @param {number} angle The angle to rotate (in radians).
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "rotate",
    value: function rotate(angle) {
      var x = this.x;
      var y = this.y;
      this._x = x * Math.cos(angle) - y * Math.sin(angle);
      this._y = x * Math.sin(angle) + y * Math.cos(angle);
      return this;
    }
    /**
     * Reverse this Vector.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "reverse",
    value: function reverse() {
      this._x = -this.x;
      this._y = -this.y;
      return this;
    }
    /**
     * Normalize this vector (make it have a length of `1`).
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "normalize",
    value: function normalize() {
      var d = this.len();

      if (d > 0) {
        this._x = this.x / d;
        this._y = this.y / d;
      }

      return this;
    }
    /**
     * Add another Vector to this one.
     * 
     * @param {Vector} other The other Vector.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "add",
    value: function add(other) {
      this._x += other.x;
      this._y += other.y;
      return this;
    }
    /**
     * Subtract another Vector from this one.
     * 
     * @param {Vector} other The other Vector.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "sub",
    value: function sub(other) {
      this._x -= other.x;
      this._y -= other.y;
      return this;
    }
    /**
     * Scale this Vector.
     * 
     * An independent scaling factor can be provided for each axis, or a single scaling factor will scale both `x` and `y`.
     * 
     * @param {number} x The scaling factor in the x direction.
     * @param {number} [y] The scaling factor in the y direction.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "scale",
    value: function scale(x, y) {
      this._x *= x;
      this._y *= typeof y != 'undefined' ? y : x;
      return this;
    }
    /**
     * Project this Vector onto another Vector.
     * 
     * @param {Vector} other The Vector to project onto.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "project",
    value: function project(other) {
      var amt = this.dot(other) / other.len2();
      this._x = amt * other.x;
      this._y = amt * other.y;
      return this;
    }
    /**
     * Project this Vector onto a Vector of unit length.
     * 
     * This is slightly more efficient than `project` when dealing with unit vectors.
     * 
     * @param {Vector} other The unit vector to project onto.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "projectN",
    value: function projectN(other) {
      var amt = this.dot(other);
      this._x = amt * other.x;
      this._y = amt * other.y;
      return this;
    }
    /**
     * Reflect this Vector on an arbitrary axis.
     * 
     * @param {Vector} axis The Vector representing the axis.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "reflect",
    value: function reflect(axis) {
      var x = this.x;
      var y = this.y;
      this.project(axis).scale(2);
      this._x -= x;
      this._y -= y;
      return this;
    }
    /**
     * Reflect this Vector on an arbitrary axis.
     * 
     * This is slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
     * 
     * @param {Vector} axis The Vector representing the axis.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "reflectN",
    value: function reflectN(axis) {
      var x = this.x;
      var y = this.y;
      this.projectN(axis).scale(2);
      this._x -= x;
      this._y -= y;
      return this;
    }
    /**
     * Get the dot product of this Vector and another.
     * 
     * @param {Vector} other The Vector to dot this one against.
     * 
     * @returns {number} Returns the dot product of this vector.
     */

  }, {
    key: "dot",
    value: function dot(other) {
      return this.x * other.x + this.y * other.y;
    }
    /**
     * Get the squared length of this Vector.
     * 
     * @returns {number} Returns the squared length of this vector.
     */

  }, {
    key: "len2",
    value: function len2() {
      return this.dot(this);
    }
    /**
     * Get the length of this Vector.
     * 
     * @returns {number} Returns the length of this vector.
     */

  }, {
    key: "len",
    value: function len() {
      return Math.sqrt(this.len2());
    }
  }]);

  return Vector;
}();

exports["default"] = Vector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS92ZWN0b3IudHMiXSwibmFtZXMiOlsiVmVjdG9yIiwieCIsInkiLCJfeCIsIl95IiwiYW5nbGUiLCJNYXRoIiwiYXRhbjIiLCJvdGhlciIsImNvcyIsInNpbiIsImQiLCJsZW4iLCJhbXQiLCJkb3QiLCJsZW4yIiwiYXhpcyIsInByb2plY3QiLCJzY2FsZSIsInByb2plY3ROIiwic3FydCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLE07QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDRSxvQkFBMEM7QUFBQSxRQUE5QkMsQ0FBOEIsdUVBQWxCLENBQWtCO0FBQUEsUUFBZkMsQ0FBZSx1RUFBSCxDQUFHOztBQUFBOztBQUFBLGdDQWZyQixDQWVxQjs7QUFBQSxnQ0FOckIsQ0FNcUI7O0FBQ3hDLFNBQUtDLEVBQUwsR0FBVUYsQ0FBVjtBQUVBLFNBQUtHLEVBQUwsR0FBVUYsQ0FBVjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozs7U0FDRSxlQUFnQjtBQUFFLGFBQU8sS0FBS0MsRUFBWjtBQUFpQjtBQUVuQztBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFhRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0UsaUJBQU1GLENBQU4sRUFBaUI7QUFBRSxXQUFLRSxFQUFMLEdBQVVGLENBQVY7QUFBYztBQUVqQztBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O1NBdkJFLGVBQWdCO0FBQUUsYUFBTyxLQUFLRyxFQUFaO0FBQWlCO0FBRW5DO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O1NBa0JFLGFBQU1GLENBQU4sRUFBaUI7QUFBRSxXQUFLRSxFQUFMLEdBQVVGLENBQVY7QUFBYztBQUVqQztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QSxDQUF2QjtBQUVBLFdBQUtpQixRQUFMLENBQWNILElBQWQsRUFBb0JFLEtBQXBCLENBQTBCLENBQTFCO0FBRUEsV0FBS2YsRUFBTCxJQUFXRixDQUFYO0FBQ0EsV0FBS0csRUFBTCxJQUFXRixDQUFYO0FBRUEsYUFBTyxJQUFQO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLGFBQUlNLEtBQUosRUFBMkI7QUFDekIsYUFBTyxLQUFLUCxDQUFMLEdBQVNPLEtBQUssQ0FBQ1AsQ0FBZixHQUFtQixLQUFLQyxDQUFMLEdBQVNNLEtBQUssQ0FBQ04sQ0FBekM7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FDRSxnQkFBZTtBQUNiLGFBQU8sS0FBS1ksR0FBTCxDQUFTLElBQVQsQ0FBUDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLGVBQWM7QUFDWixhQUFPUixJQUFJLENBQUNjLElBQUwsQ0FBVSxLQUFLTCxJQUFMLEVBQVYsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIHZlY3RvciBpbiB0d28gZGltZW5zaW9ucyB3aXRoIGB4YCBhbmQgYHlgIHByb3BlcnRpZXMuXHJcbiAqIFxyXG4gKiBDcmVhdGUgYSBuZXcgVmVjdG9yLCBvcHRpb25hbGx5IHBhc3NpbmcgaW4gdGhlIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzLiBJZiBhIGNvb3JkaW5hdGUgaXMgbm90IHNwZWNpZmllZCwgaXQgd2lsbCBiZSBzZXQgdG8gYDBgLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcclxuICAvKipcclxuICAgKiBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfeDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGlzIHZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3k6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSBUaGUgeSBjb29yZGluYXRlIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApIHtcclxuICAgIHRoaXMuX3ggPSB4O1xyXG5cclxuICAgIHRoaXMuX3kgPSB5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgeCB2YWx1ZSBvZiB0aGlzIHZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCB4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl94OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHkgdmFsdWUgb2YgdGhpcyB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5feTsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBhbmdsZSB2YWx1ZSBvZiB0aGlzIHZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gICBnZXQgYW5nbGUoKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuMih0aGlzLl95LHRoaXMuX3gpO1xyXG4gICAgcmV0dXJuIGFuZ2xlPDA/YW5nbGUrNi4yODMxOTphbmdsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgYSBuZXcgeCB2YWx1ZSBmb3IgdGhpcyB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIG5ldyB4IHZhbHVlIGZvciB0aGlzIHZlY3Rvci5cclxuICAgKi9cclxuICBzZXQgeCh4OiBudW1iZXIpIHsgdGhpcy5feCA9IHg7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBhIG5ldyB5IHZhbHVlIGZvciB0aGlzIHZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0geSBUaGUgbmV3IHkgdmFsdWUgZm9yIHRoaXMgdmVjdG9yLlxyXG4gICAqL1xyXG4gIHNldCB5KHk6IG51bWJlcikgeyB0aGlzLl95ID0geTsgfVxyXG5cclxuICAvKipcclxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYW5vdGhlciBWZWN0b3IgaW50byB0aGlzIG9uZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIGNvcHkob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICB0aGlzLl94ID0gb3RoZXIueDtcclxuICAgIHRoaXMuX3kgPSBvdGhlci55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IFZlY3RvciB3aXRoIHRoZSBzYW1lIGNvb3JkaW5hdGVzIGFzIHRoZSBvbmUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gVGhlIG5ldyBjbG9uZWQgVmVjdG9yLlxyXG4gICAqL1xyXG4gIGNsb25lKCk6IFZlY3RvciB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLngsIHRoaXMueSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGFuZ2UgdGhpcyBWZWN0b3IgdG8gYmUgcGVycGVuZGljdWxhciB0byB3aGF0IGl0IHdhcyBiZWZvcmUuXHJcbiAgICogXHJcbiAgICogRWZmZWN0aXZlbHkgdGhpcyByb3RhdGVzIGl0IDkwIGRlZ3JlZXMgaW4gYSBjbG9ja3dpc2UgZGlyZWN0aW9uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcGVycCgpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54O1xyXG5cclxuICAgIHRoaXMuX3ggPSB0aGlzLnk7XHJcbiAgICB0aGlzLl95ID0gLXg7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGUgdGhpcyBWZWN0b3IgKGNvdW50ZXItY2xvY2t3aXNlKSBieSB0aGUgc3BlY2lmaWVkIGFuZ2xlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGFuZ2xlIHRvIHJvdGF0ZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICByb3RhdGUoYW5nbGU6IG51bWJlcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLng7XHJcbiAgICBjb25zdCB5OiBudW1iZXIgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy5feCA9IHggKiBNYXRoLmNvcyhhbmdsZSkgLSB5ICogTWF0aC5zaW4oYW5nbGUpO1xyXG4gICAgdGhpcy5feSA9IHggKiBNYXRoLnNpbihhbmdsZSkgKyB5ICogTWF0aC5jb3MoYW5nbGUpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV2ZXJzZSB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHJldmVyc2UoKTogVmVjdG9yIHtcclxuICAgIHRoaXMuX3ggPSAtdGhpcy54O1xyXG4gICAgdGhpcy5feSA9IC10aGlzLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBOb3JtYWxpemUgdGhpcyB2ZWN0b3IgKG1ha2UgaXQgaGF2ZSBhIGxlbmd0aCBvZiBgMWApLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgbm9ybWFsaXplKCk6IFZlY3RvciB7XHJcbiAgICBjb25zdCBkOiBudW1iZXIgPSB0aGlzLmxlbigpO1xyXG5cclxuICAgIGlmIChkID4gMCkge1xyXG4gICAgICB0aGlzLl94ID0gdGhpcy54IC8gZDtcclxuICAgICAgdGhpcy5feSA9IHRoaXMueSAvIGQ7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGQgYW5vdGhlciBWZWN0b3IgdG8gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBhZGQob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICB0aGlzLl94ICs9IG90aGVyLng7XHJcbiAgICB0aGlzLl95ICs9IG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdWJ0cmFjdCBhbm90aGVyIFZlY3RvciBmcm9tIHRoaXMgb25lLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgc3ViKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy5feCAtPSBvdGhlci54O1xyXG4gICAgdGhpcy5feSAtPSBvdGhlci55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2NhbGUgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQW4gaW5kZXBlbmRlbnQgc2NhbGluZyBmYWN0b3IgY2FuIGJlIHByb3ZpZGVkIGZvciBlYWNoIGF4aXMsIG9yIGEgc2luZ2xlIHNjYWxpbmcgZmFjdG9yIHdpbGwgc2NhbGUgYm90aCBgeGAgYW5kIGB5YC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgc2NhbGluZyBmYWN0b3IgaW4gdGhlIHggZGlyZWN0aW9uLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeV0gVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB5IGRpcmVjdGlvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHNjYWxlKHg6IG51bWJlciwgeT86IG51bWJlcik6IFZlY3RvciB7XHJcbiAgICB0aGlzLl94ICo9IHg7XHJcbiAgICB0aGlzLl95ICo9IHR5cGVvZiB5ICE9ICd1bmRlZmluZWQnID8geSA6IHg7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcm9qZWN0IHRoaXMgVmVjdG9yIG9udG8gYW5vdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBWZWN0b3IgdG8gcHJvamVjdCBvbnRvLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHJvamVjdChvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGFtdDogbnVtYmVyID0gdGhpcy5kb3Qob3RoZXIpIC8gb3RoZXIubGVuMigpO1xyXG5cclxuICAgIHRoaXMuX3ggPSBhbXQgKiBvdGhlci54O1xyXG4gICAgdGhpcy5feSA9IGFtdCAqIG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcm9qZWN0IHRoaXMgVmVjdG9yIG9udG8gYSBWZWN0b3Igb2YgdW5pdCBsZW5ndGguXHJcbiAgICogXHJcbiAgICogVGhpcyBpcyBzbGlnaHRseSBtb3JlIGVmZmljaWVudCB0aGFuIGBwcm9qZWN0YCB3aGVuIGRlYWxpbmcgd2l0aCB1bml0IHZlY3RvcnMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSB1bml0IHZlY3RvciB0byBwcm9qZWN0IG9udG8uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwcm9qZWN0TihvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGFtdDogbnVtYmVyID0gdGhpcy5kb3Qob3RoZXIpO1xyXG5cclxuICAgIHRoaXMuX3ggPSBhbXQgKiBvdGhlci54O1xyXG4gICAgdGhpcy5feSA9IGFtdCAqIG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWZsZWN0IHRoaXMgVmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBheGlzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcmVmbGVjdChheGlzOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54O1xyXG4gICAgY29uc3QgeTogbnVtYmVyID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMucHJvamVjdChheGlzKS5zY2FsZSgyKTtcclxuXHJcbiAgICB0aGlzLl94IC09IHg7XHJcbiAgICB0aGlzLl95IC09IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZWZsZWN0IHRoaXMgVmVjdG9yIG9uIGFuIGFyYml0cmFyeSBheGlzLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgaXMgc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhbiBgcmVmbGVjdGAgd2hlbiBkZWFsaW5nIHdpdGggYW4gYXhpcyB0aGF0IGlzIGEgdW5pdCB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICByZWZsZWN0TihheGlzOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54O1xyXG4gICAgY29uc3QgeTogbnVtYmVyID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMucHJvamVjdE4oYXhpcykuc2NhbGUoMik7XHJcblxyXG4gICAgdGhpcy5feCAtPSB4O1xyXG4gICAgdGhpcy5feSAtPSB5O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIFZlY3RvciBhbmQgYW5vdGhlci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIFZlY3RvciB0byBkb3QgdGhpcyBvbmUgYWdhaW5zdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3Rvci5cclxuICAgKi9cclxuICBkb3Qob3RoZXI6IFZlY3Rvcik6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy54ICogb3RoZXIueCArIHRoaXMueSAqIG90aGVyLnk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAqL1xyXG4gIGxlbjIoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgbGVuZ3RoIG9mIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cclxuICAgKi9cclxuICBsZW4oKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW4yKCkpO1xyXG4gIH1cclxufSJdfQ==