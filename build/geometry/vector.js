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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS92ZWN0b3IudHMiXSwibmFtZXMiOlsiVmVjdG9yIiwieCIsInkiLCJfeCIsIl95IiwiYW5nbGUiLCJNYXRoIiwiYXRhbjIiLCJvdGhlciIsImNvcyIsInNpbiIsImQiLCJsZW4iLCJhbXQiLCJkb3QiLCJsZW4yIiwiYXhpcyIsInByb2plY3QiLCJzY2FsZSIsInByb2plY3ROIiwic3FydCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7SUFDcUJBLE07QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDRSxvQkFBMEM7QUFBQSxRQUE5QkMsQ0FBOEIsdUVBQWxCLENBQWtCO0FBQUEsUUFBZkMsQ0FBZSx1RUFBSCxDQUFHOztBQUFBOztBQUFBLGdDQWZyQixDQWVxQjs7QUFBQSxnQ0FOckIsQ0FNcUI7O0FBQ3hDLFNBQUtDLEVBQUwsR0FBVUYsQ0FBVjtBQUVBLFNBQUtHLEVBQUwsR0FBVUYsQ0FBVjtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7Ozs7U0FDRSxlQUFnQjtBQUFFLGFBQU8sS0FBS0MsRUFBWjtBQUFpQjtBQUVuQztBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFhRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0UsaUJBQU1GLENBQU4sRUFBaUI7QUFBRSxXQUFLRSxFQUFMLEdBQVVGLENBQVY7QUFBYztBQUVqQztBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O1NBdkJFLGVBQWdCO0FBQUUsYUFBTyxLQUFLRyxFQUFaO0FBQWlCO0FBRW5DO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O1NBa0JFLGFBQU1GLENBQU4sRUFBaUI7QUFBRSxXQUFLRSxFQUFMLEdBQVVGLENBQVY7QUFBYztBQUVqQztBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QSxDQUF2QjtBQUVBLFdBQUtpQixRQUFMLENBQWNILElBQWQsRUFBb0JFLEtBQXBCLENBQTBCLENBQTFCO0FBRUEsV0FBS2YsRUFBTCxJQUFXRixDQUFYO0FBQ0EsV0FBS0csRUFBTCxJQUFXRixDQUFYO0FBRUEsYUFBTyxJQUFQO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLGFBQUlNLEtBQUosRUFBMkI7QUFDekIsYUFBTyxLQUFLUCxDQUFMLEdBQVNPLEtBQUssQ0FBQ1AsQ0FBZixHQUFtQixLQUFLQyxDQUFMLEdBQVNNLEtBQUssQ0FBQ04sQ0FBekM7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FDRSxnQkFBZTtBQUNiLGFBQU8sS0FBS1ksR0FBTCxDQUFTLElBQVQsQ0FBUDtBQUNEO0FBRUQ7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLGVBQWM7QUFDWixhQUFPUixJQUFJLENBQUNjLElBQUwsQ0FBVSxLQUFLTCxJQUFMLEVBQVYsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHZlY3RvciBpbiB0d28gZGltZW5zaW9ucyB3aXRoIGB4YCBhbmQgYHlgIHByb3BlcnRpZXMuXG4gKiBcbiAqIENyZWF0ZSBhIG5ldyBWZWN0b3IsIG9wdGlvbmFsbHkgcGFzc2luZyBpbiB0aGUgYHhgIGFuZCBgeWAgY29vcmRpbmF0ZXMuIElmIGEgY29vcmRpbmF0ZSBpcyBub3Qgc3BlY2lmaWVkLCBpdCB3aWxsIGJlIHNldCB0byBgMGAuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XG4gIC8qKlxuICAgKiBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgdmVjdG9yLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxuICAgKi9cbiAgcHJpdmF0ZSBfeDogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGlzIHZlY3Rvci5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcHJvcGVydHkge251bWJlcn1cbiAgICovXG4gIHByaXZhdGUgX3k6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgdmVjdG9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW3k9MF0gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGlzIHZlY3Rvci5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApIHtcbiAgICB0aGlzLl94ID0geDtcblxuICAgIHRoaXMuX3kgPSB5O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHggdmFsdWUgb2YgdGhpcyB2ZWN0b3IuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IHgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3g7IH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgeSB2YWx1ZSBvZiB0aGlzIHZlY3Rvci5cbiAgICogXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICBnZXQgeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5feTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBhbmdsZSB2YWx1ZSBvZiB0aGlzIHZlY3Rvci5cbiAgICogXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAqL1xuICAgZ2V0IGFuZ2xlKCk6IG51bWJlciB7XG4gICAgY29uc3QgYW5nbGUgPSBNYXRoLmF0YW4yKHRoaXMuX3ksdGhpcy5feCk7XG4gICAgcmV0dXJuIGFuZ2xlPDA/YW5nbGUrNi4yODMxOTphbmdsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgbmV3IHggdmFsdWUgZm9yIHRoaXMgdmVjdG9yLlxuICAgKiBcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIG5ldyB4IHZhbHVlIGZvciB0aGlzIHZlY3Rvci5cbiAgICovXG4gIHNldCB4KHg6IG51bWJlcikgeyB0aGlzLl94ID0geDsgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgbmV3IHkgdmFsdWUgZm9yIHRoaXMgdmVjdG9yLlxuICAgKiBcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgVGhlIG5ldyB5IHZhbHVlIGZvciB0aGlzIHZlY3Rvci5cbiAgICovXG4gIHNldCB5KHk6IG51bWJlcikgeyB0aGlzLl95ID0geTsgfVxuXG4gIC8qKlxuICAgKiBDb3B5IHRoZSB2YWx1ZXMgb2YgYW5vdGhlciBWZWN0b3IgaW50byB0aGlzIG9uZS5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIGNvcHkob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgdGhpcy5feCA9IG90aGVyLng7XG4gICAgdGhpcy5feSA9IG90aGVyLnk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVmVjdG9yIHdpdGggdGhlIHNhbWUgY29vcmRpbmF0ZXMgYXMgdGhlIG9uZS5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFRoZSBuZXcgY2xvbmVkIFZlY3Rvci5cbiAgICovXG4gIGNsb25lKCk6IFZlY3RvciB7XG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54LCB0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoYW5nZSB0aGlzIFZlY3RvciB0byBiZSBwZXJwZW5kaWN1bGFyIHRvIHdoYXQgaXQgd2FzIGJlZm9yZS5cbiAgICogXG4gICAqIEVmZmVjdGl2ZWx5IHRoaXMgcm90YXRlcyBpdCA5MCBkZWdyZWVzIGluIGEgY2xvY2t3aXNlIGRpcmVjdGlvbi5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBwZXJwKCk6IFZlY3RvciB7XG4gICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54O1xuXG4gICAgdGhpcy5feCA9IHRoaXMueTtcbiAgICB0aGlzLl95ID0gLXg7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSb3RhdGUgdGhpcyBWZWN0b3IgKGNvdW50ZXItY2xvY2t3aXNlKSBieSB0aGUgc3BlY2lmaWVkIGFuZ2xlIChpbiByYWRpYW5zKS5cbiAgICogXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKS5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICByb3RhdGUoYW5nbGU6IG51bWJlcik6IFZlY3RvciB7XG4gICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54O1xuICAgIGNvbnN0IHk6IG51bWJlciA9IHRoaXMueTtcblxuICAgIHRoaXMuX3ggPSB4ICogTWF0aC5jb3MoYW5nbGUpIC0geSAqIE1hdGguc2luKGFuZ2xlKTtcbiAgICB0aGlzLl95ID0geCAqIE1hdGguc2luKGFuZ2xlKSArIHkgKiBNYXRoLmNvcyhhbmdsZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXZlcnNlIHRoaXMgVmVjdG9yLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHJldmVyc2UoKTogVmVjdG9yIHtcbiAgICB0aGlzLl94ID0gLXRoaXMueDtcbiAgICB0aGlzLl95ID0gLXRoaXMueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIE5vcm1hbGl6ZSB0aGlzIHZlY3RvciAobWFrZSBpdCBoYXZlIGEgbGVuZ3RoIG9mIGAxYCkuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgbm9ybWFsaXplKCk6IFZlY3RvciB7XG4gICAgY29uc3QgZDogbnVtYmVyID0gdGhpcy5sZW4oKTtcblxuICAgIGlmIChkID4gMCkge1xuICAgICAgdGhpcy5feCA9IHRoaXMueCAvIGQ7XG4gICAgICB0aGlzLl95ID0gdGhpcy55IC8gZDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgYW5vdGhlciBWZWN0b3IgdG8gdGhpcyBvbmUuXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBhZGQob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgdGhpcy5feCArPSBvdGhlci54O1xuICAgIHRoaXMuX3kgKz0gb3RoZXIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFN1YnRyYWN0IGFub3RoZXIgVmVjdG9yIGZyb20gdGhpcyBvbmUuXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBzdWIob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XG4gICAgdGhpcy5feCAtPSBvdGhlci54O1xuICAgIHRoaXMuX3kgLT0gb3RoZXIueTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNjYWxlIHRoaXMgVmVjdG9yLlxuICAgKiBcbiAgICogQW4gaW5kZXBlbmRlbnQgc2NhbGluZyBmYWN0b3IgY2FuIGJlIHByb3ZpZGVkIGZvciBlYWNoIGF4aXMsIG9yIGEgc2luZ2xlIHNjYWxpbmcgZmFjdG9yIHdpbGwgc2NhbGUgYm90aCBgeGAgYW5kIGB5YC5cbiAgICogXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBzY2FsaW5nIGZhY3RvciBpbiB0aGUgeCBkaXJlY3Rpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeV0gVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB5IGRpcmVjdGlvbi5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBzY2FsZSh4OiBudW1iZXIsIHk/OiBudW1iZXIpOiBWZWN0b3Ige1xuICAgIHRoaXMuX3ggKj0geDtcbiAgICB0aGlzLl95ICo9IHR5cGVvZiB5ICE9ICd1bmRlZmluZWQnID8geSA6IHg7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9qZWN0IHRoaXMgVmVjdG9yIG9udG8gYW5vdGhlciBWZWN0b3IuXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIFZlY3RvciB0byBwcm9qZWN0IG9udG8uXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgcHJvamVjdChvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICBjb25zdCBhbXQ6IG51bWJlciA9IHRoaXMuZG90KG90aGVyKSAvIG90aGVyLmxlbjIoKTtcblxuICAgIHRoaXMuX3ggPSBhbXQgKiBvdGhlci54O1xuICAgIHRoaXMuX3kgPSBhbXQgKiBvdGhlci55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUHJvamVjdCB0aGlzIFZlY3RvciBvbnRvIGEgVmVjdG9yIG9mIHVuaXQgbGVuZ3RoLlxuICAgKiBcbiAgICogVGhpcyBpcyBzbGlnaHRseSBtb3JlIGVmZmljaWVudCB0aGFuIGBwcm9qZWN0YCB3aGVuIGRlYWxpbmcgd2l0aCB1bml0IHZlY3RvcnMuXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIHVuaXQgdmVjdG9yIHRvIHByb2plY3Qgb250by5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBwcm9qZWN0TihvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcbiAgICBjb25zdCBhbXQ6IG51bWJlciA9IHRoaXMuZG90KG90aGVyKTtcblxuICAgIHRoaXMuX3ggPSBhbXQgKiBvdGhlci54O1xuICAgIHRoaXMuX3kgPSBhbXQgKiBvdGhlci55O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogUmVmbGVjdCB0aGlzIFZlY3RvciBvbiBhbiBhcmJpdHJhcnkgYXhpcy5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBheGlzLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHJlZmxlY3QoYXhpczogVmVjdG9yKTogVmVjdG9yIHtcbiAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLng7XG4gICAgY29uc3QgeTogbnVtYmVyID0gdGhpcy55O1xuXG4gICAgdGhpcy5wcm9qZWN0KGF4aXMpLnNjYWxlKDIpO1xuXG4gICAgdGhpcy5feCAtPSB4O1xuICAgIHRoaXMuX3kgLT0geTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZmxlY3QgdGhpcyBWZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXG4gICAqIFxuICAgKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50IHRoYW4gYHJlZmxlY3RgIHdoZW4gZGVhbGluZyB3aXRoIGFuIGF4aXMgdGhhdCBpcyBhIHVuaXQgdmVjdG9yLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgcmVmbGVjdE4oYXhpczogVmVjdG9yKTogVmVjdG9yIHtcbiAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLng7XG4gICAgY29uc3QgeTogbnVtYmVyID0gdGhpcy55O1xuXG4gICAgdGhpcy5wcm9qZWN0TihheGlzKS5zY2FsZSgyKTtcblxuICAgIHRoaXMuX3ggLT0geDtcbiAgICB0aGlzLl95IC09IHk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgVmVjdG9yIGFuZCBhbm90aGVyLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBWZWN0b3IgdG8gZG90IHRoaXMgb25lIGFnYWluc3QuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3Rvci5cbiAgICovXG4gIGRvdChvdGhlcjogVmVjdG9yKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy54ICogb3RoZXIueCArIHRoaXMueSAqIG90aGVyLnk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cbiAgICogXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHNxdWFyZWQgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxuICAgKi9cbiAgbGVuMigpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmRvdCh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cbiAgICogXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cbiAgICovXG4gIGxlbigpOiBudW1iZXIge1xuICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW4yKCkpO1xuICB9XG59Il19