'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vector = _interopRequireDefault(require("./vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Represents a *convex* polygon with any number of points (specified in counter-clockwise order).
 * 
 * Note: Do _not_ manually change the `points`, `angle`, or `offset` properties. Use the provided  setters. 
 * Otherwise the calculated properties will not be updated correctly.
 * 
 * The `pos` property can be changed directly.
 */
var Polygon = /*#__PURE__*/function () {
  /**
   * A vector representing the origin of this polygon (all other points are relative to this one).
   * 
   * @private
   * 
   * @property {Vector}
   */

  /**
   * An array of vectors representing the points in the polygon, in counter-clockwise order.
   * 
   * @private
   * 
   * @property {Array<Vector>}
   */

  /**
   * An Array of the points of this polygon as numbers instead of Vectors.
   * 
   * @private
   * 
   * @property {Array<number>}
   */

  /**
   * The angle of this polygon.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The offset of this polygon.
   * 
   * @private
   * 
   * @property {Vector}
   */

  /**
   * The calculated points of this polygon.
   * 
   * @private
   * 
   * @property {Array<Vector>}
   */

  /**
   * The edges of this polygon.
   * 
   * @private
   * 
   * @property {Array<Vector>}
   */

  /**
   * The normals of this polygon.
   * 
   * @private
   * 
   * @property {Array<Vector>}
   */

  /**
   * Create a new polygon, passing in a position vector, and an array of points (represented by vectors 
   * relative to the position vector). If no position is passed in, the position of the polygon will be `(0,0)`.
   * 
   * @param {Vector} [position=Vector] A vector representing the origin of the polygon (all other points are relative to this one)
   * @param {Array<Vector>} [points=[]] An array of vectors representing the points in the polygon, in counter-clockwise order.
   */
  function Polygon() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _vector["default"]();
    var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Polygon);

    _defineProperty(this, "_position", new _vector["default"]());

    _defineProperty(this, "_points", []);

    _defineProperty(this, "_pointsGeneric", []);

    _defineProperty(this, "_angle", 0);

    _defineProperty(this, "_offset", new _vector["default"]());

    _defineProperty(this, "_calcPoints", []);

    _defineProperty(this, "_edges", []);

    _defineProperty(this, "_normals", []);

    this._position = position;
    this.setPoints(points);
  }
  /**
   * Returns the position of this polygon.
   * 
   * @returns {Vector}
   */


  _createClass(Polygon, [{
    key: "position",
    get: function get() {
      return this._position;
    }
    /**
     * **Note:** Not sure if this will be kept or not but for now it's disabled.
     * 
     * Sets a new position for this polygon and recalculates the points.
     * 
     * @param {Vector} position A Vector representing the new position of this polygon.
     */
    // set position(position: Vector) {
    //   const diffX: number = -(this._position.x - position.x);
    //   const diffY: number = -(this._position.y - position.y);
    //   const diffPoint: Vector = new Vector(diffX, diffY);
    //   const points: Array<Vector> = [];
    //   this._points.map((point: Vector) => {
    //     const tempX: number = point.x;
    //     const tempY: number = point.y;
    //     const tempPoint: Vector = new Vector(tempX, tempY);
    //     const calculatedPoint: Vector = tempPoint.add(diffPoint);
    //     points.push(calculatedPoint);
    //   });
    //   this.setPoints(points, true);
    // }

    /**
     * Returns the points of this polygon.
     * 
     * @returns {Array<Vector>}
     */

  }, {
    key: "points",
    get: function get() {
      return this._points;
    }
    /**
     * Returns the points of this polygon as numbers instead of Vectors.
     * 
     * @returns {Array<number>}
     */

  }, {
    key: "pointsGeneric",
    get: function get() {
      return this._pointsGeneric;
    }
    /**
     * Returns the calculated points of this polygon.
     * 
     * @returns {Array<Vector>}
     */

  }, {
    key: "calcPoints",
    get: function get() {
      return this._calcPoints;
    }
    /**
     * Returns the offset of this polygon.
     * 
     * @returns {Vector}
     */

  }, {
    key: "offset",
    get: function get() {
      return this._offset;
    }
    /**
     * Returns the angle of this polygon.
     * 
     * @returns {number}
     */

  }, {
    key: "angle",
    get: function get() {
      return this._angle;
    }
    /**
     * Returns the edges of this polygon.
     * 
     * @returns {Array<Vector>}
     */

  }, {
    key: "edges",
    get: function get() {
      return this._edges;
    }
    /**
     * Returns the normals of this polygon.
     * 
     * @returns {Array<Vector>}
     */

  }, {
    key: "normals",
    get: function get() {
      return this._normals;
    }
    /**
     * Set the points of the polygon. Any consecutive duplicate points will be combined.
     * 
     * Note: The points are counter-clockwise *with respect to the coordinate system*. If you directly draw the points on a screen 
     * that has the origin at the top-left corner it will _appear_ visually that the points are being specified clockwise. This is 
     * just because of the inversion of the Y-axis when being displayed.
     * 
     * @param {Array<Vector>} points An array of vectors representing the points in the polygon, in counter-clockwise order.
     *    * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "setPoints",
    value: function setPoints(points) {
      // Only re-allocate if this is a new polygon or the number of points has changed.
      var lengthChanged = !this.points || this.points.length !== points.length;

      if (lengthChanged) {
        var i;
        var calcPoints = this._calcPoints = [];
        var edges = this._edges = [];
        var normals = this._normals = []; // Allocate the vector arrays for the calculated properties

        for (i = 0; i < points.length; i++) {
          // Remove consecutive duplicate points
          var p1 = points[i];
          var p2 = i < points.length - 1 ? points[i + 1] : points[0]; // Push the points to the generic points Array.

          this._pointsGeneric.push(points[i].x, points[i].y);

          if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {
            points.splice(i, 1);
            i -= 1;
            continue;
          }

          calcPoints.push(new _vector["default"]());
          edges.push(new _vector["default"]());
          normals.push(new _vector["default"]());
        }
      }

      this._points = points;

      this._recalc();

      return this;
    }
    /**
     * Set the current rotation angle of the polygon.
     * 
     * @param {number} angle The current rotation angle (in radians).
     * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "setAngle",
    value: function setAngle(angle) {
      this._angle = angle;

      this._recalc();

      return this;
    }
    /**
     * Set the current offset to apply to the `points` before applying the `angle` rotation.
     * 
     * @param {Vector} offset The new offset Vector.
     * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "setOffset",
    value: function setOffset(offset) {
      this._offset = offset;

      this._recalc();

      return this;
    }
    /**
     * Rotates this Polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `position`).
     * 
     * Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).
     * 
     * @param {number} angle The angle to rotate (in radians).
     * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "rotate",
    value: function rotate(angle) {
      var points = this.points;
      var len = points.length;

      for (var i = 0; i < len; i++) {
        points[i].rotate(angle);
      }

      this._recalc();

      return this;
    }
    /**
     * Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate system* (i.e. `position`).
     * 
     * Note: This changes the **original** points (so any `offset` will be applied on top of this translation)
     * 
     * @param {number} x The horizontal amount to translate.
     * @param {number} y The vertical amount to translate.
     * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "translate",
    value: function translate(x, y) {
      var points = this.points;
      var len = points.length;

      for (var i = 0; i < len; i++) {
        points[i].x += x;
        points[i].y += y;
      }

      this._recalc();

      return this;
    }
    /**
     * Computes the calculated collision Polygon.
     * 
     * This applies the `angle` and `offset` to the original points then recalculates the edges and normals of the collision Polygon.
     * 
     * @private
     * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "_recalc",
    value: function _recalc() {
      // Calculated points - this is what is used for underlying collisions and takes into account
      // the angle/offset set on the polygon.
      var calcPoints = this.calcPoints; // The edges here are the direction of the `n`th edge of the polygon, relative to
      // the `n`th point. If you want to draw a given edge from the edge value, you must
      // first translate to the position of the starting point.

      var edges = this._edges; // The normals here are the direction of the normal for the `n`th edge of the polygon, relative
      // to the position of the `n`th point. If you want to draw an edge normal, you must first
      // translate to the position of the starting point.

      var normals = this._normals; // Copy the original points array and apply the offset/angle

      var points = this.points;
      var offset = this.offset;
      var angle = this.angle;
      var len = points.length;
      var i;

      for (i = 0; i < len; i++) {
        var calcPoint = calcPoints[i].copy(points[i]);
        calcPoint.x += offset.x;
        calcPoint.y += offset.y;
        if (angle !== 0) calcPoint.rotate(angle);
      } // Calculate the edges/normals


      for (i = 0; i < len; i++) {
        var p1 = calcPoints[i];
        var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
        var e = edges[i].copy(p2).sub(p1);
        normals[i].copy(e).perp().normalize();
      }

      return this;
    }
    /**
     * Compute the axis-aligned bounding box.
     * 
     * Any current state (translations/rotations) will be applied before constructing the AABB.
     * 
     * Note: Returns a _new_ `Polygon` each time you call this.
     * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "getAABB",
    value: function getAABB() {
      var points = this.calcPoints;
      var len = points.length;
      var xMin = points[0].x;
      var yMin = points[0].y;
      var xMax = points[0].x;
      var yMax = points[0].y;

      for (var i = 1; i < len; i++) {
        var point = points[i];
        if (point["x"] < xMin) xMin = point["x"];else if (point["x"] > xMax) xMax = point["x"];
        if (point["y"] < yMin) yMin = point["y"];else if (point["y"] > yMax) yMax = point["y"];
      }

      return new Polygon(this._position.clone().add(new _vector["default"](xMin, yMin)), [new _vector["default"](), new _vector["default"](xMax - xMin, 0), new _vector["default"](xMax - xMin, yMax - yMin), new _vector["default"](0, yMax - yMin)]);
    }
    /**
     * Compute the centroid (geometric center) of the Polygon.
     * 
     * Any current state (translations/rotations) will be applied before computing the centroid.
     * 
     * See https://en.wikipedia.org/wiki/Centroid#Centroid_of_a_polygon
     * 
     * Note: Returns a _new_ `Vector` each time you call this.
     * 
     * @returns {Vector} Returns a Vector that contains the coordinates of the centroid.
     */

  }, {
    key: "getCentroid",
    value: function getCentroid() {
      var points = this.calcPoints;
      var len = points.length;
      var cx = 0;
      var cy = 0;
      var ar = 0;

      for (var i = 0; i < len; i++) {
        var p1 = points[i];
        var p2 = i === len - 1 ? points[0] : points[i + 1]; // Loop around if last point

        var a = p1["x"] * p2["y"] - p2["x"] * p1["y"];
        cx += (p1["x"] + p2["x"]) * a;
        cy += (p1["y"] + p2["y"]) * a;
        ar += a;
      }

      ar = ar * 3; // we want 1 / 6 the area and we currently have 2*area

      cx = cx / ar;
      cy = cy / ar;
      return new _vector["default"](cx, cy);
    }
  }]);

  return Polygon;
}();

exports["default"] = Polygon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9wb2x5Z29uLnRzIl0sIm5hbWVzIjpbIlBvbHlnb24iLCJwb3NpdGlvbiIsIlZlY3RvciIsInBvaW50cyIsIl9wb3NpdGlvbiIsInNldFBvaW50cyIsIl9wb2ludHMiLCJfcG9pbnRzR2VuZXJpYyIsIl9jYWxjUG9pbnRzIiwiX29mZnNldCIsIl9hbmdsZSIsIl9lZGdlcyIsIl9ub3JtYWxzIiwibGVuZ3RoQ2hhbmdlZCIsImxlbmd0aCIsImkiLCJjYWxjUG9pbnRzIiwiZWRnZXMiLCJub3JtYWxzIiwicDEiLCJwMiIsInB1c2giLCJ4IiwieSIsInNwbGljZSIsIl9yZWNhbGMiLCJhbmdsZSIsIm9mZnNldCIsImxlbiIsInJvdGF0ZSIsImNhbGNQb2ludCIsImNvcHkiLCJlIiwic3ViIiwicGVycCIsIm5vcm1hbGl6ZSIsInhNaW4iLCJ5TWluIiwieE1heCIsInlNYXgiLCJwb2ludCIsImNsb25lIiwiYWRkIiwiY3giLCJjeSIsImFyIiwiYSJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsTztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLHFCQUF5RTtBQUFBLFFBQTdEQyxR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QjBCLENBQTVCO0FBQ0FELFFBQUFBLEVBQUUsSUFBSUMsQ0FBTjtBQUNEOztBQUVERCxNQUFBQSxFQUFFLEdBQUdBLEVBQUUsR0FBRyxDQUFWLENBbkJvQixDQW1CUDs7QUFDYkYsTUFBQUEsRUFBRSxHQUFHQSxFQUFFLEdBQUdFLEVBQVY7QUFDQUQsTUFBQUEsRUFBRSxHQUFHQSxFQUFFLEdBQUdDLEVBQVY7QUFFQSxhQUFPLElBQUkzQyxrQkFBSixDQUFXeUMsRUFBWCxFQUFlQyxFQUFmLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vdmVjdG9yJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgKmNvbnZleCogcG9seWdvbiB3aXRoIGFueSBudW1iZXIgb2YgcG9pbnRzIChzcGVjaWZpZWQgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIpLlxuICogXG4gKiBOb3RlOiBEbyBfbm90XyBtYW51YWxseSBjaGFuZ2UgdGhlIGBwb2ludHNgLCBgYW5nbGVgLCBvciBgb2Zmc2V0YCBwcm9wZXJ0aWVzLiBVc2UgdGhlIHByb3ZpZGVkICBzZXR0ZXJzLiBcbiAqIE90aGVyd2lzZSB0aGUgY2FsY3VsYXRlZCBwcm9wZXJ0aWVzIHdpbGwgbm90IGJlIHVwZGF0ZWQgY29ycmVjdGx5LlxuICogXG4gKiBUaGUgYHBvc2AgcHJvcGVydHkgY2FuIGJlIGNoYW5nZWQgZGlyZWN0bHkuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbHlnb24ge1xuICAvKipcbiAgICogQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBvcmlnaW4gb2YgdGhpcyBwb2x5Z29uIChhbGwgb3RoZXIgcG9pbnRzIGFyZSByZWxhdGl2ZSB0byB0aGlzIG9uZSkuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtWZWN0b3J9XG4gICAqL1xuICBwcml2YXRlIF9wb3NpdGlvbjogVmVjdG9yID0gbmV3IFZlY3RvcigpO1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiB2ZWN0b3JzIHJlcHJlc2VudGluZyB0aGUgcG9pbnRzIGluIHRoZSBwb2x5Z29uLCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlci5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcHJvcGVydHkge0FycmF5PFZlY3Rvcj59XG4gICAqL1xuICBwcml2YXRlIF9wb2ludHM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcblxuICAvKipcbiAgICogQW4gQXJyYXkgb2YgdGhlIHBvaW50cyBvZiB0aGlzIHBvbHlnb24gYXMgbnVtYmVycyBpbnN0ZWFkIG9mIFZlY3RvcnMuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtBcnJheTxudW1iZXI+fVxuICAgKi9cbiAgcHJpdmF0ZSBfcG9pbnRzR2VuZXJpYzogQXJyYXk8bnVtYmVyPiA9IFtdXG5cbiAgLyoqXG4gICAqIFRoZSBhbmdsZSBvZiB0aGlzIHBvbHlnb24uXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XG4gICAqL1xuICBwcml2YXRlIF9hbmdsZTogbnVtYmVyID0gMDtcblxuICAvKipcbiAgICogVGhlIG9mZnNldCBvZiB0aGlzIHBvbHlnb24uXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtWZWN0b3J9XG4gICAqL1xuICBwcml2YXRlIF9vZmZzZXQ6IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcblxuICAvKipcbiAgICogVGhlIGNhbGN1bGF0ZWQgcG9pbnRzIG9mIHRoaXMgcG9seWdvbi5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcHJvcGVydHkge0FycmF5PFZlY3Rvcj59XG4gICAqL1xuICBwcml2YXRlIF9jYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW107XG5cbiAgLyoqXG4gICAqIFRoZSBlZGdlcyBvZiB0aGlzIHBvbHlnb24uXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtBcnJheTxWZWN0b3I+fVxuICAgKi9cbiAgcHJpdmF0ZSBfZWRnZXM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcblxuICAvKipcbiAgICogVGhlIG5vcm1hbHMgb2YgdGhpcyBwb2x5Z29uLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8VmVjdG9yPn1cbiAgICovXG4gIHByaXZhdGUgX25vcm1hbHM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IHBvbHlnb24sIHBhc3NpbmcgaW4gYSBwb3NpdGlvbiB2ZWN0b3IsIGFuZCBhbiBhcnJheSBvZiBwb2ludHMgKHJlcHJlc2VudGVkIGJ5IHZlY3RvcnMgXG4gICAqIHJlbGF0aXZlIHRvIHRoZSBwb3NpdGlvbiB2ZWN0b3IpLiBJZiBubyBwb3NpdGlvbiBpcyBwYXNzZWQgaW4sIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9seWdvbiB3aWxsIGJlIGAoMCwwKWAuXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gW3Bvc2l0aW9uPVZlY3Rvcl0gQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBvcmlnaW4gb2YgdGhlIHBvbHlnb24gKGFsbCBvdGhlciBwb2ludHMgYXJlIHJlbGF0aXZlIHRvIHRoaXMgb25lKVxuICAgKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IFtwb2ludHM9W11dIEFuIGFycmF5IG9mIHZlY3RvcnMgcmVwcmVzZW50aW5nIHRoZSBwb2ludHMgaW4gdGhlIHBvbHlnb24sIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxuICAgKi9cbiAgY29uc3RydWN0b3IocG9zaXRpb246IFZlY3RvciA9IG5ldyBWZWN0b3IoKSwgcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW10pIHtcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuc2V0UG9pbnRzKHBvaW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhpcyBwb2x5Z29uLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn1cbiAgICovXG4gIGdldCBwb3NpdGlvbigpOiBWZWN0b3IgeyByZXR1cm4gdGhpcy5fcG9zaXRpb247IH1cblxuICAvKipcbiAgICogKipOb3RlOioqIE5vdCBzdXJlIGlmIHRoaXMgd2lsbCBiZSBrZXB0IG9yIG5vdCBidXQgZm9yIG5vdyBpdCdzIGRpc2FibGVkLlxuICAgKiBcbiAgICogU2V0cyBhIG5ldyBwb3NpdGlvbiBmb3IgdGhpcyBwb2x5Z29uIGFuZCByZWNhbGN1bGF0ZXMgdGhlIHBvaW50cy5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb3NpdGlvbiBBIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIG5ldyBwb3NpdGlvbiBvZiB0aGlzIHBvbHlnb24uXG4gICAqL1xuICAvLyBzZXQgcG9zaXRpb24ocG9zaXRpb246IFZlY3Rvcikge1xuICAvLyAgIGNvbnN0IGRpZmZYOiBudW1iZXIgPSAtKHRoaXMuX3Bvc2l0aW9uLnggLSBwb3NpdGlvbi54KTtcbiAgLy8gICBjb25zdCBkaWZmWTogbnVtYmVyID0gLSh0aGlzLl9wb3NpdGlvbi55IC0gcG9zaXRpb24ueSk7XG5cbiAgLy8gICBjb25zdCBkaWZmUG9pbnQ6IFZlY3RvciA9IG5ldyBWZWN0b3IoZGlmZlgsIGRpZmZZKTtcblxuICAvLyAgIGNvbnN0IHBvaW50czogQXJyYXk8VmVjdG9yPiA9IFtdO1xuXG4gIC8vICAgdGhpcy5fcG9pbnRzLm1hcCgocG9pbnQ6IFZlY3RvcikgPT4ge1xuICAvLyAgICAgY29uc3QgdGVtcFg6IG51bWJlciA9IHBvaW50Lng7XG4gIC8vICAgICBjb25zdCB0ZW1wWTogbnVtYmVyID0gcG9pbnQueTtcblxuICAvLyAgICAgY29uc3QgdGVtcFBvaW50OiBWZWN0b3IgPSBuZXcgVmVjdG9yKHRlbXBYLCB0ZW1wWSk7XG5cbiAgLy8gICAgIGNvbnN0IGNhbGN1bGF0ZWRQb2ludDogVmVjdG9yID0gdGVtcFBvaW50LmFkZChkaWZmUG9pbnQpO1xuXG4gIC8vICAgICBwb2ludHMucHVzaChjYWxjdWxhdGVkUG9pbnQpO1xuICAvLyAgIH0pO1xuXG4gIC8vICAgdGhpcy5zZXRQb2ludHMocG9pbnRzLCB0cnVlKTtcbiAgLy8gfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBwb2ludHMgb2YgdGhpcyBwb2x5Z29uLlxuICAgKiBcbiAgICogQHJldHVybnMge0FycmF5PFZlY3Rvcj59XG4gICAqL1xuICBnZXQgcG9pbnRzKCk6IEFycmF5PFZlY3Rvcj4geyByZXR1cm4gdGhpcy5fcG9pbnRzOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHBvaW50cyBvZiB0aGlzIHBvbHlnb24gYXMgbnVtYmVycyBpbnN0ZWFkIG9mIFZlY3RvcnMuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7QXJyYXk8bnVtYmVyPn1cbiAgICovXG4gIGdldCBwb2ludHNHZW5lcmljKCk6IEFycmF5PG51bWJlcj4geyByZXR1cm4gdGhpcy5fcG9pbnRzR2VuZXJpYzsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBjYWxjdWxhdGVkIHBvaW50cyBvZiB0aGlzIHBvbHlnb24uXG4gICAqIFxuICAgKiBAcmV0dXJucyB7QXJyYXk8VmVjdG9yPn1cbiAgICovXG4gIGdldCBjYWxjUG9pbnRzKCk6IEFycmF5PFZlY3Rvcj4geyByZXR1cm4gdGhpcy5fY2FsY1BvaW50czsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBvZmZzZXQgb2YgdGhpcyBwb2x5Z29uLlxuICAgKiBcbiAgICogQHJldHVybnMge1ZlY3Rvcn1cbiAgICovXG4gIGdldCBvZmZzZXQoKTogVmVjdG9yIHsgcmV0dXJuIHRoaXMuX29mZnNldDsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBhbmdsZSBvZiB0aGlzIHBvbHlnb24uXG4gICAqIFxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgKi9cbiAgZ2V0IGFuZ2xlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9hbmdsZTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBlZGdlcyBvZiB0aGlzIHBvbHlnb24uXG4gICAqIFxuICAgKiBAcmV0dXJucyB7QXJyYXk8VmVjdG9yPn1cbiAgICovXG4gIGdldCBlZGdlcygpOiBBcnJheTxWZWN0b3I+IHsgcmV0dXJuIHRoaXMuX2VkZ2VzOyB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIG5vcm1hbHMgb2YgdGhpcyBwb2x5Z29uLlxuICAgKiBcbiAgICogQHJldHVybnMge0FycmF5PFZlY3Rvcj59XG4gICAqL1xuICBnZXQgbm9ybWFscygpOiBBcnJheTxWZWN0b3I+IHsgcmV0dXJuIHRoaXMuX25vcm1hbHM7IH1cblxuICAvKipcbiAgICogU2V0IHRoZSBwb2ludHMgb2YgdGhlIHBvbHlnb24uIEFueSBjb25zZWN1dGl2ZSBkdXBsaWNhdGUgcG9pbnRzIHdpbGwgYmUgY29tYmluZWQuXG4gICAqIFxuICAgKiBOb3RlOiBUaGUgcG9pbnRzIGFyZSBjb3VudGVyLWNsb2Nrd2lzZSAqd2l0aCByZXNwZWN0IHRvIHRoZSBjb29yZGluYXRlIHN5c3RlbSouIElmIHlvdSBkaXJlY3RseSBkcmF3IHRoZSBwb2ludHMgb24gYSBzY3JlZW4gXG4gICAqIHRoYXQgaGFzIHRoZSBvcmlnaW4gYXQgdGhlIHRvcC1sZWZ0IGNvcm5lciBpdCB3aWxsIF9hcHBlYXJfIHZpc3VhbGx5IHRoYXQgdGhlIHBvaW50cyBhcmUgYmVpbmcgc3BlY2lmaWVkIGNsb2Nrd2lzZS4gVGhpcyBpcyBcbiAgICoganVzdCBiZWNhdXNlIG9mIHRoZSBpbnZlcnNpb24gb2YgdGhlIFktYXhpcyB3aGVuIGJlaW5nIGRpc3BsYXllZC5cbiAgICogXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIEFuIGFycmF5IG9mIHZlY3RvcnMgcmVwcmVzZW50aW5nIHRoZSBwb2ludHMgaW4gdGhlIHBvbHlnb24sIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxuICAgKiAgICAqIFxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHNldFBvaW50cyhwb2ludHM6IEFycmF5PFZlY3Rvcj4pOiBQb2x5Z29uIHtcbiAgICAvLyBPbmx5IHJlLWFsbG9jYXRlIGlmIHRoaXMgaXMgYSBuZXcgcG9seWdvbiBvciB0aGUgbnVtYmVyIG9mIHBvaW50cyBoYXMgY2hhbmdlZC5cbiAgICBjb25zdCBsZW5ndGhDaGFuZ2VkOiBib29sZWFuID0gIXRoaXMucG9pbnRzIHx8IHRoaXMucG9pbnRzLmxlbmd0aCAhPT0gcG9pbnRzLmxlbmd0aDtcblxuICAgIGlmIChsZW5ndGhDaGFuZ2VkKSB7XG4gICAgICBsZXQgaTogbnVtYmVyO1xuXG4gICAgICBjb25zdCBjYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5fY2FsY1BvaW50cyA9IFtdO1xuICAgICAgY29uc3QgZWRnZXM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLl9lZGdlcyA9IFtdO1xuICAgICAgY29uc3Qgbm9ybWFsczogQXJyYXk8VmVjdG9yPiA9IHRoaXMuX25vcm1hbHMgPSBbXTtcblxuICAgICAgLy8gQWxsb2NhdGUgdGhlIHZlY3RvciBhcnJheXMgZm9yIHRoZSBjYWxjdWxhdGVkIHByb3BlcnRpZXNcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gUmVtb3ZlIGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHNcbiAgICAgICAgY29uc3QgcDE6IFZlY3RvciA9IHBvaW50c1tpXTtcbiAgICAgICAgY29uc3QgcDI6IFZlY3RvciA9IGkgPCBwb2ludHMubGVuZ3RoIC0gMSA/IHBvaW50c1tpICsgMV0gOiBwb2ludHNbMF07XG5cbiAgICAgICAgLy8gUHVzaCB0aGUgcG9pbnRzIHRvIHRoZSBnZW5lcmljIHBvaW50cyBBcnJheS5cbiAgICAgICAgdGhpcy5fcG9pbnRzR2VuZXJpYy5wdXNoKHBvaW50c1tpXS54LCBwb2ludHNbaV0ueSk7XG5cbiAgICAgICAgaWYgKHAxICE9PSBwMiAmJiBwMS54ID09PSBwMi54ICYmIHAxLnkgPT09IHAyLnkpIHtcbiAgICAgICAgICBwb2ludHMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNhbGNQb2ludHMucHVzaChuZXcgVmVjdG9yKCkpO1xuICAgICAgICBlZGdlcy5wdXNoKG5ldyBWZWN0b3IoKSk7XG4gICAgICAgIG5vcm1hbHMucHVzaChuZXcgVmVjdG9yKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3BvaW50cyA9IHBvaW50cztcblxuICAgIHRoaXMuX3JlY2FsYygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBjdXJyZW50IHJvdGF0aW9uIGFuZ2xlIG9mIHRoZSBwb2x5Z29uLlxuICAgKiBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBjdXJyZW50IHJvdGF0aW9uIGFuZ2xlIChpbiByYWRpYW5zKS5cbiAgICogXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxuICAgKi9cbiAgc2V0QW5nbGUoYW5nbGU6IG51bWJlcik6IFBvbHlnb24ge1xuICAgIHRoaXMuX2FuZ2xlID0gYW5nbGU7XG5cbiAgICB0aGlzLl9yZWNhbGMoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY3VycmVudCBvZmZzZXQgdG8gYXBwbHkgdG8gdGhlIGBwb2ludHNgIGJlZm9yZSBhcHBseWluZyB0aGUgYGFuZ2xlYCByb3RhdGlvbi5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvZmZzZXQgVGhlIG5ldyBvZmZzZXQgVmVjdG9yLlxuICAgKiBcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBzZXRPZmZzZXQob2Zmc2V0OiBWZWN0b3IpOiBQb2x5Z29uIHtcbiAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICB0aGlzLl9yZWNhbGMoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvdGF0ZXMgdGhpcyBQb2x5Z29uIGNvdW50ZXItY2xvY2t3aXNlIGFyb3VuZCB0aGUgb3JpZ2luIG9mICppdHMgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0qIChpLmUuIGBwb3NpdGlvbmApLlxuICAgKiBcbiAgICogTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYGFuZ2xlYCB3aWxsIGJlIGFwcGxpZWQgb24gdG9wIG9mIHRoaXMgcm90YXRpb24pLlxuICAgKiBcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpLlxuICAgKiBcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICByb3RhdGUoYW5nbGU6IG51bWJlcik6IFBvbHlnb24ge1xuICAgIGNvbnN0IHBvaW50czogQXJyYXk8VmVjdG9yPiA9IHRoaXMucG9pbnRzO1xuICAgIGNvbnN0IGxlbjogbnVtYmVyID0gcG9pbnRzLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHBvaW50c1tpXS5yb3RhdGUoYW5nbGUpO1xuXG4gICAgdGhpcy5fcmVjYWxjKCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmFuc2xhdGVzIHRoZSBwb2ludHMgb2YgdGhpcyBwb2x5Z29uIGJ5IGEgc3BlY2lmaWVkIGFtb3VudCByZWxhdGl2ZSB0byB0aGUgb3JpZ2luIG9mICppdHMgb3duIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zaXRpb25gKS5cbiAgICogXG4gICAqIE5vdGU6IFRoaXMgY2hhbmdlcyB0aGUgKipvcmlnaW5hbCoqIHBvaW50cyAoc28gYW55IGBvZmZzZXRgIHdpbGwgYmUgYXBwbGllZCBvbiB0b3Agb2YgdGhpcyB0cmFuc2xhdGlvbilcbiAgICogXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBob3Jpem9udGFsIGFtb3VudCB0byB0cmFuc2xhdGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB2ZXJ0aWNhbCBhbW91bnQgdG8gdHJhbnNsYXRlLlxuICAgKiBcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICB0cmFuc2xhdGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBQb2x5Z29uIHtcbiAgICBjb25zdCBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLnBvaW50cztcbiAgICBjb25zdCBsZW46IG51bWJlciA9IHBvaW50cy5sZW5ndGg7XG5cbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHBvaW50c1tpXS54ICs9IHg7XG4gICAgICBwb2ludHNbaV0ueSArPSB5O1xuICAgIH1cblxuICAgIHRoaXMuX3JlY2FsYygpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZXMgdGhlIGNhbGN1bGF0ZWQgY29sbGlzaW9uIFBvbHlnb24uXG4gICAqIFxuICAgKiBUaGlzIGFwcGxpZXMgdGhlIGBhbmdsZWAgYW5kIGBvZmZzZXRgIHRvIHRoZSBvcmlnaW5hbCBwb2ludHMgdGhlbiByZWNhbGN1bGF0ZXMgdGhlIGVkZ2VzIGFuZCBub3JtYWxzIG9mIHRoZSBjb2xsaXNpb24gUG9seWdvbi5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cbiAgICovXG4gIHByaXZhdGUgX3JlY2FsYygpOiBQb2x5Z29uIHtcbiAgICAvLyBDYWxjdWxhdGVkIHBvaW50cyAtIHRoaXMgaXMgd2hhdCBpcyB1c2VkIGZvciB1bmRlcmx5aW5nIGNvbGxpc2lvbnMgYW5kIHRha2VzIGludG8gYWNjb3VudFxuICAgIC8vIHRoZSBhbmdsZS9vZmZzZXQgc2V0IG9uIHRoZSBwb2x5Z29uLlxuICAgIGNvbnN0IGNhbGNQb2ludHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLmNhbGNQb2ludHM7XG5cbiAgICAvLyBUaGUgZWRnZXMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmUgdG9cbiAgICAvLyB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYSBnaXZlbiBlZGdlIGZyb20gdGhlIGVkZ2UgdmFsdWUsIHlvdSBtdXN0XG4gICAgLy8gZmlyc3QgdHJhbnNsYXRlIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgc3RhcnRpbmcgcG9pbnQuXG4gICAgY29uc3QgZWRnZXM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLl9lZGdlcztcblxuICAgIC8vIFRoZSBub3JtYWxzIGhlcmUgYXJlIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG5vcm1hbCBmb3IgdGhlIGBuYHRoIGVkZ2Ugb2YgdGhlIHBvbHlnb24sIHJlbGF0aXZlXG4gICAgLy8gdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBgbmB0aCBwb2ludC4gSWYgeW91IHdhbnQgdG8gZHJhdyBhbiBlZGdlIG5vcm1hbCwgeW91IG11c3QgZmlyc3RcbiAgICAvLyB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cbiAgICBjb25zdCBub3JtYWxzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5fbm9ybWFscztcblxuICAgIC8vIENvcHkgdGhlIG9yaWdpbmFsIHBvaW50cyBhcnJheSBhbmQgYXBwbHkgdGhlIG9mZnNldC9hbmdsZVxuICAgIGNvbnN0IHBvaW50czogQXJyYXk8VmVjdG9yPiA9IHRoaXMucG9pbnRzO1xuICAgIGNvbnN0IG9mZnNldDogVmVjdG9yID0gdGhpcy5vZmZzZXQ7XG4gICAgY29uc3QgYW5nbGU6IG51bWJlciA9IHRoaXMuYW5nbGU7XG5cbiAgICBjb25zdCBsZW46IG51bWJlciA9IHBvaW50cy5sZW5ndGg7XG4gICAgbGV0IGk6IG51bWJlcjtcblxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgY2FsY1BvaW50OiBWZWN0b3IgPSBjYWxjUG9pbnRzW2ldLmNvcHkocG9pbnRzW2ldKTtcblxuICAgICAgY2FsY1BvaW50LnggKz0gb2Zmc2V0Lng7XG4gICAgICBjYWxjUG9pbnQueSArPSBvZmZzZXQueTtcblxuICAgICAgaWYgKGFuZ2xlICE9PSAwKSBjYWxjUG9pbnQucm90YXRlKGFuZ2xlKTtcbiAgICB9XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIGVkZ2VzL25vcm1hbHNcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHAxOiBWZWN0b3IgPSBjYWxjUG9pbnRzW2ldO1xuICAgICAgY29uc3QgcDI6IFZlY3RvciA9IGkgPCBsZW4gLSAxID8gY2FsY1BvaW50c1tpICsgMV0gOiBjYWxjUG9pbnRzWzBdO1xuXG4gICAgICBjb25zdCBlOiBWZWN0b3IgPSBlZGdlc1tpXS5jb3B5KHAyKS5zdWIocDEpO1xuXG4gICAgICBub3JtYWxzW2ldLmNvcHkoZSkucGVycCgpLm5vcm1hbGl6ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbXB1dGUgdGhlIGF4aXMtYWxpZ25lZCBib3VuZGluZyBib3guXG4gICAqIFxuICAgKiBBbnkgY3VycmVudCBzdGF0ZSAodHJhbnNsYXRpb25zL3JvdGF0aW9ucykgd2lsbCBiZSBhcHBsaWVkIGJlZm9yZSBjb25zdHJ1Y3RpbmcgdGhlIEFBQkIuXG4gICAqIFxuICAgKiBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFBvbHlnb25gIGVhY2ggdGltZSB5b3UgY2FsbCB0aGlzLlxuICAgKiBcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXG4gICAqL1xuICBnZXRBQUJCKCk6IFBvbHlnb24ge1xuICAgIGNvbnN0IHBvaW50czogQXJyYXk8VmVjdG9yPiA9IHRoaXMuY2FsY1BvaW50cztcbiAgICBjb25zdCBsZW46IG51bWJlciA9IHBvaW50cy5sZW5ndGg7XG5cbiAgICBsZXQgeE1pbjogbnVtYmVyID0gcG9pbnRzWzBdLng7XG4gICAgbGV0IHlNaW46IG51bWJlciA9IHBvaW50c1swXS55O1xuXG4gICAgbGV0IHhNYXg6IG51bWJlciA9IHBvaW50c1swXS54O1xuICAgIGxldCB5TWF4OiBudW1iZXIgPSBwb2ludHNbMF0ueTtcblxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDE7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgcG9pbnQ6IFZlY3RvciA9IHBvaW50c1tpXTtcblxuICAgICAgaWYgKHBvaW50W1wieFwiXSA8IHhNaW4pIHhNaW4gPSBwb2ludFtcInhcIl07XG4gICAgICBlbHNlIGlmIChwb2ludFtcInhcIl0gPiB4TWF4KSB4TWF4ID0gcG9pbnRbXCJ4XCJdO1xuXG4gICAgICBpZiAocG9pbnRbXCJ5XCJdIDwgeU1pbikgeU1pbiA9IHBvaW50W1wieVwiXTtcbiAgICAgIGVsc2UgaWYgKHBvaW50W1wieVwiXSA+IHlNYXgpIHlNYXggPSBwb2ludFtcInlcIl07XG5cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFBvbHlnb24odGhpcy5fcG9zaXRpb24uY2xvbmUoKS5hZGQobmV3IFZlY3Rvcih4TWluLCB5TWluKSksIFtcbiAgICAgIG5ldyBWZWN0b3IoKSwgbmV3IFZlY3Rvcih4TWF4IC0geE1pbiwgMCksXG4gICAgICBuZXcgVmVjdG9yKHhNYXggLSB4TWluLCB5TWF4IC0geU1pbiksIG5ldyBWZWN0b3IoMCwgeU1heCAtIHlNaW4pXG4gICAgXSk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcHV0ZSB0aGUgY2VudHJvaWQgKGdlb21ldHJpYyBjZW50ZXIpIG9mIHRoZSBQb2x5Z29uLlxuICAgKiBcbiAgICogQW55IGN1cnJlbnQgc3RhdGUgKHRyYW5zbGF0aW9ucy9yb3RhdGlvbnMpIHdpbGwgYmUgYXBwbGllZCBiZWZvcmUgY29tcHV0aW5nIHRoZSBjZW50cm9pZC5cbiAgICogXG4gICAqIFNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DZW50cm9pZCNDZW50cm9pZF9vZl9hX3BvbHlnb25cbiAgICogXG4gICAqIE5vdGU6IFJldHVybnMgYSBfbmV3XyBgVmVjdG9yYCBlYWNoIHRpbWUgeW91IGNhbGwgdGhpcy5cbiAgICogXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgYSBWZWN0b3IgdGhhdCBjb250YWlucyB0aGUgY29vcmRpbmF0ZXMgb2YgdGhlIGNlbnRyb2lkLlxuICAgKi9cbiAgZ2V0Q2VudHJvaWQoKTogVmVjdG9yIHtcbiAgICBjb25zdCBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLmNhbGNQb2ludHM7XG4gICAgY29uc3QgbGVuOiBudW1iZXIgPSBwb2ludHMubGVuZ3RoO1xuXG4gICAgbGV0IGN4OiBudW1iZXIgPSAwO1xuICAgIGxldCBjeTogbnVtYmVyID0gMDtcbiAgICBsZXQgYXI6IG51bWJlciA9IDA7XG5cbiAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHAxOiBWZWN0b3IgPSBwb2ludHNbaV07XG4gICAgICBjb25zdCBwMjogVmVjdG9yID0gaSA9PT0gbGVuIC0gMSA/IHBvaW50c1swXSA6IHBvaW50c1tpICsgMV07IC8vIExvb3AgYXJvdW5kIGlmIGxhc3QgcG9pbnRcblxuICAgICAgY29uc3QgYTogbnVtYmVyID0gcDFbXCJ4XCJdICogcDJbXCJ5XCJdIC0gcDJbXCJ4XCJdICogcDFbXCJ5XCJdO1xuXG4gICAgICBjeCArPSAocDFbXCJ4XCJdICsgcDJbXCJ4XCJdKSAqIGE7XG4gICAgICBjeSArPSAocDFbXCJ5XCJdICsgcDJbXCJ5XCJdKSAqIGE7XG4gICAgICBhciArPSBhO1xuICAgIH1cblxuICAgIGFyID0gYXIgKiAzOyAvLyB3ZSB3YW50IDEgLyA2IHRoZSBhcmVhIGFuZCB3ZSBjdXJyZW50bHkgaGF2ZSAyKmFyZWFcbiAgICBjeCA9IGN4IC8gYXI7XG4gICAgY3kgPSBjeSAvIGFyO1xuXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IoY3gsIGN5KTtcbiAgfVxufSJdfQ==