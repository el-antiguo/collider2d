'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vector = _interopRequireDefault(require("./geometry/vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * An object representing the result of an intersection containing:
 * - The two objects participating in the intersection
 * - The vector representing the minimum change necessary to extract the first object from the second one (as well as a unit vector in that direction and the magnitude of the overlap)
 * - Whether the first object is entirely inside the second, and vice versa.
 */
var CollisionDetails = /*#__PURE__*/function () {
  /**
   * The first collision object.
   * 
   * @property {Circle|Polygon}
   */

  /**
   * The second collision object.
   * 
   * @property {Circle|Polygon}
   */

  /**
   * A unit vector representing the direction and magnitude of the overlap.
   * 
   * @property {Vector}
   */

  /**
   * A vector representing the minimum change necessary to extract the first object from the second one.
   * 
   * @property {Vector}
   */

  /**
   * The amount that is overlapping.
   * 
   * @property {number}
   */

  /**
   * Returns true if the first collision object is completely in the second collision object.
   * 
   * @property {boolean}
   */

  /**
   * Returns true if the second collision object is completely in the first collision object.
   * 
   * @property {boolean}
   */
  function CollisionDetails() {
    _classCallCheck(this, CollisionDetails);

    _defineProperty(this, "a", void 0);

    _defineProperty(this, "b", void 0);

    _defineProperty(this, "overlapN", new _vector["default"]());

    _defineProperty(this, "overlapV", new _vector["default"]());

    _defineProperty(this, "overlap", Number.MAX_VALUE);

    _defineProperty(this, "aInB", true);

    _defineProperty(this, "bInA", true);

    this.clear();
  }
  /**
   * Set some values of the response back to their defaults.
   * 
   * Call this between tests if you are going to reuse a single CollisionDetails object for multiple intersection tests (recommended as it will avoid allcating extra memory)
   * 
   * @returns {CollisionDetails} Returns this for chaining.
   */


  _createClass(CollisionDetails, [{
    key: "clear",
    value: function clear() {
      this.aInB = true;
      this.bInA = true;
      this.overlap = Number.MAX_VALUE;
      return this;
    }
  }]);

  return CollisionDetails;
}();

exports["default"] = CollisionDetails;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb2xsaXNpb25fZGV0YWlscy50cyJdLCJuYW1lcyI6WyJDb2xsaXNpb25EZXRhaWxzIiwiVmVjdG9yIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwiY2xlYXIiLCJhSW5CIiwiYkluQSIsIm92ZXJsYXAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsZ0I7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUdFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUdFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUdFLDhCQUFjO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsc0NBOUJLLElBQUlDLGtCQUFKLEVBOEJMOztBQUFBLHNDQXZCSyxJQUFJQSxrQkFBSixFQXVCTDs7QUFBQSxxQ0FoQklDLE1BQU0sQ0FBQ0MsU0FnQlg7O0FBQUEsa0NBVEUsSUFTRjs7QUFBQSxrQ0FGRSxJQUVGOztBQUNaLFNBQUtDLEtBQUw7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztXQUNFLGlCQUEwQjtBQUN4QixXQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLFdBQUtDLElBQUwsR0FBWSxJQUFaO0FBRUEsV0FBS0MsT0FBTCxHQUFlTCxNQUFNLENBQUNDLFNBQXRCO0FBRUEsYUFBTyxJQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcblxuaW1wb3J0IFZlY3RvciBmcm9tICcuL2dlb21ldHJ5L3ZlY3Rvcic7XG5pbXBvcnQgQ2lyY2xlIGZyb20gJy4vZ2VvbWV0cnkvY2lyY2xlJztcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vZ2VvbWV0cnkvcG9seWdvbic7XG5cbi8qKlxuICogQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcmVzdWx0IG9mIGFuIGludGVyc2VjdGlvbiBjb250YWluaW5nOlxuICogLSBUaGUgdHdvIG9iamVjdHMgcGFydGljaXBhdGluZyBpbiB0aGUgaW50ZXJzZWN0aW9uXG4gKiAtIFRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBtaW5pbXVtIGNoYW5nZSBuZWNlc3NhcnkgdG8gZXh0cmFjdCB0aGUgZmlyc3Qgb2JqZWN0IGZyb20gdGhlIHNlY29uZCBvbmUgKGFzIHdlbGwgYXMgYSB1bml0IHZlY3RvciBpbiB0aGF0IGRpcmVjdGlvbiBhbmQgdGhlIG1hZ25pdHVkZSBvZiB0aGUgb3ZlcmxhcClcbiAqIC0gV2hldGhlciB0aGUgZmlyc3Qgb2JqZWN0IGlzIGVudGlyZWx5IGluc2lkZSB0aGUgc2Vjb25kLCBhbmQgdmljZSB2ZXJzYS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGlzaW9uRGV0YWlscyB7XG4gIC8qKlxuICAgKiBUaGUgZmlyc3QgY29sbGlzaW9uIG9iamVjdC5cbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7Q2lyY2xlfFBvbHlnb259XG4gICAqL1xuICBhITogKENpcmNsZXxQb2x5Z29uKTtcblxuICAvKipcbiAgICogVGhlIHNlY29uZCBjb2xsaXNpb24gb2JqZWN0LlxuICAgKiBcbiAgICogQHByb3BlcnR5IHtDaXJjbGV8UG9seWdvbn1cbiAgICovXG4gIGIhOiAoQ2lyY2xlfFBvbHlnb24pO1xuXG4gIC8qKlxuICAgKiBBIHVuaXQgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgZGlyZWN0aW9uIGFuZCBtYWduaXR1ZGUgb2YgdGhlIG92ZXJsYXAuXG4gICAqIFxuICAgKiBAcHJvcGVydHkge1ZlY3Rvcn1cbiAgICovXG4gIG92ZXJsYXBOOiBWZWN0b3IgPSBuZXcgVmVjdG9yKCk7XG5cbiAgLyoqXG4gICAqIEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbWluaW11bSBjaGFuZ2UgbmVjZXNzYXJ5IHRvIGV4dHJhY3QgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzZWNvbmQgb25lLlxuICAgKiBcbiAgICogQHByb3BlcnR5IHtWZWN0b3J9XG4gICAqL1xuICBvdmVybGFwVjogVmVjdG9yID0gbmV3IFZlY3RvcigpO1xuXG4gIC8qKlxuICAgKiBUaGUgYW1vdW50IHRoYXQgaXMgb3ZlcmxhcHBpbmcuXG4gICAqIFxuICAgKiBAcHJvcGVydHkge251bWJlcn1cbiAgICovXG4gIG92ZXJsYXA6IG51bWJlciA9IE51bWJlci5NQVhfVkFMVUU7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZmlyc3QgY29sbGlzaW9uIG9iamVjdCBpcyBjb21wbGV0ZWx5IGluIHRoZSBzZWNvbmQgY29sbGlzaW9uIG9iamVjdC5cbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cbiAgICovXG4gIGFJbkI6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHNlY29uZCBjb2xsaXNpb24gb2JqZWN0IGlzIGNvbXBsZXRlbHkgaW4gdGhlIGZpcnN0IGNvbGxpc2lvbiBvYmplY3QuXG4gICAqIFxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XG4gICAqL1xuICBiSW5BOiBib29sZWFuID0gdHJ1ZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNsZWFyKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHNvbWUgdmFsdWVzIG9mIHRoZSByZXNwb25zZSBiYWNrIHRvIHRoZWlyIGRlZmF1bHRzLlxuICAgKiBcbiAgICogQ2FsbCB0aGlzIGJldHdlZW4gdGVzdHMgaWYgeW91IGFyZSBnb2luZyB0byByZXVzZSBhIHNpbmdsZSBDb2xsaXNpb25EZXRhaWxzIG9iamVjdCBmb3IgbXVsdGlwbGUgaW50ZXJzZWN0aW9uIHRlc3RzIChyZWNvbW1lbmRlZCBhcyBpdCB3aWxsIGF2b2lkIGFsbGNhdGluZyBleHRyYSBtZW1vcnkpXG4gICAqIFxuICAgKiBAcmV0dXJucyB7Q29sbGlzaW9uRGV0YWlsc30gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIGNsZWFyKCk6IENvbGxpc2lvbkRldGFpbHMge1xuICAgIHRoaXMuYUluQiA9IHRydWU7XG4gICAgdGhpcy5iSW5BID0gdHJ1ZTtcblxuICAgIHRoaXMub3ZlcmxhcCA9IE51bWJlci5NQVhfVkFMVUU7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxufSJdfQ==