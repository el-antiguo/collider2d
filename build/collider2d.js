'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _box = _interopRequireDefault(require("./geometry/box"));

var _vector = _interopRequireDefault(require("./geometry/vector"));

var _collision_details = _interopRequireDefault(require("./collision_details"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Collider2D = /*#__PURE__*/function () {
  /**
   * A pool of `Vector objects that are used in calculations to avoid allocating memory.
   * 
   * @private
   * 
   * @property {Array<Vector>}
   */

  /**
   * A pool of arrays of numbers used in calculations to avoid allocating memory.
   * 
   * @private
   * 
   * @property {Array<Array<number>>}
   */

  /**
   * Temporary collision details object used for hit detection.
   * 
   * @private
   * 
   * @property {CollisionDetails}
   */

  /**
   * Tiny "point" Polygon used for Polygon hit detection.
   * 
   * @private
   * 
   * @property {Polygon}
   */

  /**
   * Constant used for left voronoi region.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * Constant used for middle voronoi region.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * Constant used for right voronoi region.
   * 
   * @private
   * 
   * @property {number}
   */
  function Collider2D() {
    _classCallCheck(this, Collider2D);

    _defineProperty(this, "_T_VECTORS", []);

    _defineProperty(this, "_T_ARRAYS", []);

    _defineProperty(this, "_T_COLLISION_DETAILS", new _collision_details["default"]());

    _defineProperty(this, "_TEST_POINT", new _box["default"](new _vector["default"](), 0.000001, 0.000001).toPolygon());

    _defineProperty(this, "_LEFT_VORONOI_REGION", -1);

    _defineProperty(this, "_MIDDLE_VORONOI_REGION", 0);

    _defineProperty(this, "_RIGHT_VORONOI_REGION", 1);

    // Populate T_VECTORS
    for (var i = 0; i < 10; i++) {
      this._T_VECTORS.push(new _vector["default"]());
    } // Populate T_ARRAYS


    for (var _i = 0; _i < 5; _i++) {
      this._T_ARRAYS.push([]);
    }
  }
  /**
   * Check if a point is inside a circle.
   * 
   * @param {Vector} point The point to test.
   * @param {Circle} circle The circle to test.
   * 
   * @returns {boolean} Returns true if the point is inside the circle or false otherwise.
   */


  _createClass(Collider2D, [{
    key: "pointInCircle",
    value: function pointInCircle(point, circle) {
      var differenceV = this._T_VECTORS.pop().copy(point).sub(circle.position).sub(circle.offset);

      var radiusSq = circle.radius * circle.radius;
      var distanceSq = differenceV.len2();

      this._T_VECTORS.push(differenceV); // If the distance between is smaller than the radius then the point is inside the circle.


      return distanceSq <= radiusSq;
    }
    /**
     * Check if a point is inside a circle.
     * 
     * @param {Vector} point The point to test.
     * @param {Circle} circle The circle to test.
     * 
     * @returns {boolean} Returns true if the point is inside the circle or false otherwise.
     */

  }, {
    key: "pointInEllipse",
    value: function pointInEllipse(point, ellipse) {
      var vector = this._T_VECTORS.pop().copy(point).sub(ellipse.position).sub(ellipse.offset);

      var widthSq = ellipse.width * ellipse.width;
      var heightSq = ellipse.height * ellipse.height;
      var pointXSq = vector.x * vector.x;
      var pointYSq = vector.y * vector.y;

      this._T_VECTORS.push(vector); // If the result distance is smaller than 1 the point its inside the ellipse


      return pointXSq / widthSq + pointYSq / heightSq <= 1;
    }
    /**
     * Check if a point is inside a convex polygon.
     * 
     * @param {Vector} point The point to test.
     * @param {Polygon} polygon The polygon to test.
     * 
     * @returns {boolean} Returns true if the point is inside the polygon or false otherwise.
     */

  }, {
    key: "pointInPolygon",
    value: function pointInPolygon(point, polygon) {
      this._TEST_POINT.position.copy(point);

      this._T_COLLISION_DETAILS.clear();

      var result = this.testPolygonPolygon(this._TEST_POINT, polygon, true);
      if (result) result = this._T_COLLISION_DETAILS.aInB;
      return result;
    }
    /**
     * Check if two circles collide.
     * 
     * @param {Circle} a The first circle.
     * @param {Circle} b The second circle.
     * @param {boolean} [details=false] If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true.
     * 
     * @returns {boolean} Returns true if the circles intersect or false otherwise.
     */

  }, {
    key: "testCircleCircle",
    value: function testCircleCircle(a, b) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      // Check if the distance between the centers of the two circles is greater than their combined radius.
      var differenceV = this._T_VECTORS.pop().copy(b.position).add(b.offset).sub(a.position).sub(a.offset);

      var totalRadius = a.radius + b.radius;
      var totalRadiusSq = totalRadius * totalRadius;
      var distanceSq = differenceV.len2(); // If the distance is bigger than the combined radius, they don't intersect.

      if (distanceSq > totalRadiusSq) {
        this._T_VECTORS.push(differenceV);

        return false;
      }

      if (details) {
        this._T_COLLISION_DETAILS.clear();

        var dist = Math.sqrt(distanceSq);
        this._T_COLLISION_DETAILS.a = a;
        this._T_COLLISION_DETAILS.b = b;
        this._T_COLLISION_DETAILS.overlap = totalRadius - dist;

        this._T_COLLISION_DETAILS.overlapN.copy(differenceV.normalize());

        this._T_COLLISION_DETAILS.overlapV.copy(differenceV).scale(this._T_COLLISION_DETAILS.overlap);

        this._T_COLLISION_DETAILS.aInB = a.radius <= b.radius && dist <= b.radius - a.radius;
        this._T_COLLISION_DETAILS.bInA = b.radius <= a.radius && dist <= a.radius - b.radius;
        return this._T_COLLISION_DETAILS;
      }

      this._T_VECTORS.push(differenceV);

      return true;
    }
    /**
     * Checks whether polygons collide.
     * 
     * @param {Polygon} a The first polygon.
     * @param {Polygon} b The second polygon.
     * @param {boolean} [details=false] If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true.
     * 
     * @returns {boolean} Returns true if they intersect or false otherwise.
     */

  }, {
    key: "testPolygonPolygon",
    value: function testPolygonPolygon(a, b) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this._T_COLLISION_DETAILS.clear();

      var aPoints = a.calcPoints;
      var aLen = aPoints.length;
      var bPoints = b.calcPoints;
      var bLen = bPoints.length; // If any of the edge normals of A is a separating axis, no intersection.

      for (var i = 0; i < aLen; i++) {
        if (this._isSeparatingAxis(a.position, b.position, aPoints, bPoints, a.normals[i], this._T_COLLISION_DETAILS)) {
          return false;
        }
      } // If any of the edge normals of B is a separating axis, no intersection.


      for (var _i2 = 0; _i2 < bLen; _i2++) {
        if (this._isSeparatingAxis(a.position, b.position, aPoints, bPoints, b.normals[_i2], this._T_COLLISION_DETAILS)) {
          return false;
        }
      } // Since none of the edge normals of A or B are a separating axis, there is an intersection
      // and we've already calculated the smallest overlap (in isSeparatingAxis). 
      // Calculate the final overlap vector.


      if (details) {
        this._T_COLLISION_DETAILS.a = a;
        this._T_COLLISION_DETAILS.b = b;

        this._T_COLLISION_DETAILS.overlapV.copy(this._T_COLLISION_DETAILS.overlapN).scale(this._T_COLLISION_DETAILS.overlap);

        return this._T_COLLISION_DETAILS;
      }

      return true;
    }
    /**
     * Check if a polygon and a circle collide.
     * 
     * @param {Polygon} polygon The polygon.
     * @param {Circle} circle The circle.
     * @param {boolean} [details=false] If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true.
     * 
     * @returns {boolean} Returns true if they intersect or false otherwise.
     */

  }, {
    key: "testPolygonCircle",
    value: function testPolygonCircle(polygon, circle) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this._T_COLLISION_DETAILS.clear(); // Get the position of the circle relative to the polygon.


      var circlePos = this._T_VECTORS.pop().copy(circle.position).add(circle.offset).sub(polygon.position);

      var radius = circle.radius;
      var radius2 = radius * radius;
      var points = polygon.calcPoints;
      var len = points.length;

      var edge = this._T_VECTORS.pop();

      var point = this._T_VECTORS.pop(); // For each edge in the polygon:


      for (var i = 0; i < len; i++) {
        var next = i === len - 1 ? 0 : i + 1;
        var prev = i === 0 ? len - 1 : i - 1;
        var overlap = 0;
        var overlapN = null; // Get the edge.

        edge.copy(polygon.edges[i]); // Calculate the center of the circle relative to the starting point of the edge.

        point.copy(circlePos).sub(points[i]); // If the distance between the center of the circle and the point is bigger than the radius, the polygon is definitely not fully in the circle.

        if (details && point.len2() > radius2) this._T_COLLISION_DETAILS.aInB = false; // Calculate which Voronoi region the center of the circle is in.

        var region = this._voronoiRegion(edge, point); // If it's the left region:


        if (region === this._LEFT_VORONOI_REGION) {
          // We need to make sure we're in the RIGHT_VORONOI_REGION of the previous edge.
          edge.copy(polygon.edges[prev]); // Calculate the center of the circle relative the starting point of the previous edge

          var point2 = this._T_VECTORS.pop().copy(circlePos).sub(points[prev]);

          region = this._voronoiRegion(edge, point2);

          if (region === this._RIGHT_VORONOI_REGION) {
            // It's in the region we want.  Check if the circle intersects the point.
            var dist = point.len();

            if (dist > radius) {
              // No intersection
              this._T_VECTORS.push(circlePos);

              this._T_VECTORS.push(edge);

              this._T_VECTORS.push(point);

              this._T_VECTORS.push(point2);

              return false;
            } else if (details) {
              // It intersects, calculate the overlap.
              this._T_COLLISION_DETAILS.bInA = false;
              overlapN = point.normalize();
              overlap = radius - dist;
            }
          }

          this._T_VECTORS.push(point2); // If it's the right region:

        } else if (region === this._RIGHT_VORONOI_REGION) {
          // We need to make sure we're in the left region on the next edge
          edge.copy(polygon.edges[next]); // Calculate the center of the circle relative to the starting point of the next edge.

          point.copy(circlePos).sub(points[next]);
          region = this._voronoiRegion(edge, point);

          if (region === this._LEFT_VORONOI_REGION) {
            // It's in the region we want.  Check if the circle intersects the point.
            var _dist = point.len();

            if (_dist > radius) {
              // No intersection
              this._T_VECTORS.push(circlePos);

              this._T_VECTORS.push(edge);

              this._T_VECTORS.push(point);

              return false;
            } else if (details) {
              // It intersects, calculate the overlap.
              this._T_COLLISION_DETAILS.bInA = false;
              overlapN = point.normalize();
              overlap = radius - _dist;
            }
          } // Otherwise, it's the middle region:

        } else {
          // Need to check if the circle is intersecting the edge, change the edge into its "edge normal".
          var normal = edge.perp().normalize(); // Find the perpendicular distance between the center of the circle and the edge.

          var _dist2 = point.dot(normal);

          var distAbs = Math.abs(_dist2); // If the circle is on the outside of the edge, there is no intersection.

          if (_dist2 > 0 && distAbs > radius) {
            // No intersection
            this._T_VECTORS.push(circlePos);

            this._T_VECTORS.push(normal);

            this._T_VECTORS.push(point);

            return false;
          } else if (details) {
            // It intersects, calculate the overlap.
            overlapN = normal;
            overlap = radius - _dist2; // If the center of the circle is on the outside of the edge, or part of the circle is on the outside, the circle is not fully inside the polygon.

            if (_dist2 >= 0 || overlap < 2 * radius) this._T_COLLISION_DETAILS.bInA = false;
          }
        } // If this is the smallest overlap we've seen, keep it.
        // (overlapN may be null if the circle was in the wrong Voronoi region).


        if (overlapN && details && Math.abs(overlap) < Math.abs(this._T_COLLISION_DETAILS.overlap)) {
          this._T_COLLISION_DETAILS.overlap = overlap;

          this._T_COLLISION_DETAILS.overlapN.copy(overlapN);
        }
      } // Calculate the final overlap vector - based on the smallest overlap.


      if (details) {
        this._T_COLLISION_DETAILS.a = polygon;
        this._T_COLLISION_DETAILS.b = circle;

        this._T_COLLISION_DETAILS.overlapV.copy(this._T_COLLISION_DETAILS.overlapN).scale(this._T_COLLISION_DETAILS.overlap);
      }

      this._T_VECTORS.push(circlePos);

      this._T_VECTORS.push(edge);

      this._T_VECTORS.push(point);

      if (details) return this._T_COLLISION_DETAILS;
      return true;
    }
    /**
     * Check if a circle and a polygon collide.
     * 
     * **NOTE:** This is slightly less efficient than polygonCircle as it just runs polygonCircle and reverses everything
     * at the end.
     * 
     * @param {Circle} circle The circle.
     * @param {Polygon} polygon The polygon.
     * @param {boolean} [details=false] If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true.
     * 
     * @returns {boolean} Returns true if they intersect or false otherwise.
     */

  }, {
    key: "testCirclePolygon",
    value: function testCirclePolygon(circle, polygon) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // Test the polygon against the circle.
      var result = this.testPolygonCircle(polygon, circle, details);

      if (result && details) {
        var collisionDetails = result; // Swap A and B in the collision details.

        var a = collisionDetails.a;
        var aInB = collisionDetails.aInB;
        collisionDetails.overlapN.reverse();
        collisionDetails.overlapV.reverse();
        collisionDetails.a = collisionDetails.b;
        collisionDetails.b = a;
        collisionDetails.aInB = collisionDetails.bInA;
        collisionDetails.bInA = aInB;
      }

      return result;
    }
    /**
     * Check whether two convex polygons are separated by the specified axis (must be a unit vector).
     * 
     * @private
     * 
     * @param {Vector} aPos The position of the first polygon.
     * @param {Vector} bPos The position of the second polygon.
     * @param {Array<Vector>} aPoints The points in the first polygon.
     * @param {Array<Vector>} bPoints The points in the second polygon.
     * @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons will be projected onto this axis.
     * @param {CollisionDetails} collisionDetails A CollisionDetails object (optional) which will be populated if the axis is not a separating axis.
     * 
     * @return {boolean} true if it is a separating axis, false otherwise.  If false, and a CollisionDetails is passed in, information about how much overlap and the direction of the overlap will be populated.
     */

  }, {
    key: "_isSeparatingAxis",
    value: function _isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, collisionDetails) {
      var rangeA = this._T_ARRAYS.pop();

      var rangeB = this._T_ARRAYS.pop(); // The magnitude of the offset between the two polygons


      var offsetV = this._T_VECTORS.pop().copy(bPos).sub(aPos);

      var projectedOffset = offsetV.dot(axis); // Project the polygons onto the axis.

      this._flattenPointsOn(aPoints, axis, rangeA);

      this._flattenPointsOn(bPoints, axis, rangeB); // Move B's range to its position relative to A.


      rangeB[0] += projectedOffset;
      rangeB[1] += projectedOffset; // Check if there is a gap. If there is, this is a separating axis and we can stop

      if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
        this._T_VECTORS.push(offsetV);

        this._T_ARRAYS.push(rangeA);

        this._T_ARRAYS.push(rangeB);

        return true;
      } // This is not a separating axis. If we're calculating collision details, calculate the overlap.


      if (collisionDetails) {
        var overlap = 0; // A starts further left than B

        if (rangeA[0] < rangeB[0]) {
          collisionDetails.aInB = false; // A ends before B does. We have to pull A out of B

          if (rangeA[1] < rangeB[1]) {
            overlap = rangeA[1] - rangeB[0];
            collisionDetails.bInA = false; // B is fully inside A.  Pick the shortest way out.
          } else {
            var option1 = rangeA[1] - rangeB[0];
            var option2 = rangeB[1] - rangeA[0];
            overlap = option1 < option2 ? option1 : -option2;
          } // B starts further left than A

        } else {
          collisionDetails.bInA = false; // B ends before A ends. We have to push A out of B

          if (rangeA[1] > rangeB[1]) {
            overlap = rangeA[0] - rangeB[1];
            collisionDetails.aInB = false; // A is fully inside B.  Pick the shortest way out.
          } else {
            var _option = rangeA[1] - rangeB[0];

            var _option2 = rangeB[1] - rangeA[0];

            overlap = _option < _option2 ? _option : -_option2;
          }
        } // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.


        var absOverlap = Math.abs(overlap);

        if (absOverlap < collisionDetails.overlap) {
          collisionDetails.overlap = absOverlap;
          collisionDetails.overlapN.copy(axis);
          if (overlap < 0) collisionDetails.overlapN.reverse();
        }
      }

      this._T_VECTORS.push(offsetV);

      this._T_ARRAYS.push(rangeA);

      this._T_ARRAYS.push(rangeB);

      return false;
    }
    /**
     * Flattens the specified array of points onto a unit vector axis resulting in a one dimensionsl
     * range of the minimum and maximum value on that axis.
     * 
     * @private
     * 
     * @param {Array<Vector>} points The points to flatten.
     * @param {Vector} normal The unit vector axis to flatten on.
     * @param {Array<number>} result An array. After calling this function, result[0] will be the minimum value, result[1] will be the maximum value.
     */

  }, {
    key: "_flattenPointsOn",
    value: function _flattenPointsOn(points, normal, result) {
      var min = Number.MAX_VALUE;
      var max = -Number.MAX_VALUE;
      var len = points.length;

      for (var i = 0; i < len; i++) {
        // The magnitude of the projection of the point onto the normal.
        var dot = points[i].dot(normal);
        if (dot < min) min = dot;
        if (dot > max) max = dot;
      }

      result[0] = min;
      result[1] = max;
    }
    /**
     * Calculates which Voronoi region a point is on a line segment.
     * 
     * It is assumed that both the line and the point are relative to `(0,0)`
     * 
     *             |       (0)      |
     *      (-1)  [S]--------------[E]  (1)
     *            |       (0)      |
     * 
     * @param {Vector} line The line segment.
     * @param {Vector} point The point.
     * @return {number} LEFT_VORONOI_REGION (-1) if it is the left region,
     *                  MIDDLE_VORONOI_REGION (0) if it is the middle region,
     *                  RIGHT_VORONOI_REGION (1) if it is the right region.
     */

  }, {
    key: "_voronoiRegion",
    value: function _voronoiRegion(line, point) {
      var len2 = line.len2();
      var dp = point.dot(line); // If the point is beyond the start of the line, it is in the left voronoi region.

      if (dp < 0) return this._LEFT_VORONOI_REGION; // If the point is beyond the end of the line, it is in the right voronoi region.
      else if (dp > len2) return this._RIGHT_VORONOI_REGION; // Otherwise, it's in the middle one.
        else return this._MIDDLE_VORONOI_REGION;
    }
  }]);

  return Collider2D;
}();

exports["default"] = Collider2D;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb2xsaWRlcjJkLnRzIl0sIm5hbWVzIjpbIkNvbGxpZGVyMkQiLCJDb2xsaXNpb25EZXRhaWxzIiwiQm94IiwiVmVjdG9yIiwidG9Qb2x5Z29uIiwiaSIsIl9UX1ZFQ1RPUlMiLCJwdXNoIiwiX1RfQVJSQVlTIiwicG9pbnQiLCJjaXJjbGUiLCJkaWZmZXJlbmNlViIsInBvcCIsImNvcHkiLCJzdWIiLCJwb3NpdGlvbiIsIm9mZnNldCIsInJhZGl1c1NxIiwicmFkaXVzIiwiZGlzdGFuY2VTcSIsImxlbjIiLCJlbGxpcHNlIiwidmVjdG9yIiwid2lkdGhTcSIsIndpZHRoIiwiaGVpZ2h0U3EiLCJoZWlnaHQiLCJwb2ludFhTcSIsIngiLCJwb2ludFlTcSIsInkiLCJwb2x5Z29uIiwiX1RFU1RfUE9JTlQiLCJfVF9DT0xMSVNJT05fREVUQUlMUyIsImNsZWFyIiwicmVzdWx0IiwidGVzdFBvbHlnb25Qb2x5Z29uIiwiYUluQiIsImEiLCJiIiwiZGV0YWlscyIsImFkZCIsInRvdGFsUmFkaXVzIiwidG90YWxSYWRpdXNTcSIsImRpc3QiLCJNYXRoIiwic3FydCIsIm92ZXJsYXAiLCJvdmVybGFwTiIsIm5vcm1hbGl6ZSIsIm92ZXJsYXBWIiwic2NhbGUiLCJiSW5BIiwiYVBvaW50cyIsImNhbGNQb2ludHMiLCJhTGVuIiwibGVuZ3RoIiwiYlBvaW50cyIsImJMZW4iLCJfaXNTZXBhcmF0aW5nQXhpcyIsIm5vcm1hbHMiLCJjaXJjbGVQb3MiLCJyYWRpdXMyIiwicG9pbnRzIiwibGVuIiwiZWRnZSIsIm5leHQiLCJwcmV2IiwiZWRnZXMiLCJyZWdpb24iLCJfdm9yb25vaVJlZ2lvbiIsIl9MRUZUX1ZPUk9OT0lfUkVHSU9OIiwicG9pbnQyIiwiX1JJR0hUX1ZPUk9OT0lfUkVHSU9OIiwibm9ybWFsIiwicGVycCIsImRvdCIsImRpc3RBYnMiLCJhYnMiLCJ0ZXN0UG9seWdvbkNpcmNsZSIsImNvbGxpc2lvbkRldGFpbHMiLCJyZXZlcnNlIiwiYVBvcyIsImJQb3MiLCJheGlzIiwicmFuZ2VBIiwicmFuZ2VCIiwib2Zmc2V0ViIsInByb2plY3RlZE9mZnNldCIsIl9mbGF0dGVuUG9pbnRzT24iLCJvcHRpb24xIiwib3B0aW9uMiIsImFic092ZXJsYXAiLCJtaW4iLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJtYXgiLCJsaW5lIiwiZHAiLCJfTUlERExFX1ZPUk9OT0lfUkVHSU9OIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOztBQUlBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHRSx3QkFBYztBQUFBOztBQUFBLHdDQXhEc0IsRUF3RHRCOztBQUFBLHVDQS9DNEIsRUErQzVCOztBQUFBLGtEQXRDaUIsSUFBSUMsNkJBQUosRUFzQ2pCOztBQUFBLHlDQTdCUSxJQUFJQyxlQUFKLENBQVEsSUFBSUMsa0JBQUosRUFBUixFQUFzQixRQUF0QixFQUFnQyxRQUFoQyxFQUEwQ0MsU0FBMUMsRUE2QlI7O0FBQUEsa0RBcEJpQixDQUFDLENBb0JsQjs7QUFBQSxvREFYbUIsQ0FXbkI7O0FBQUEsbURBRmtCLENBRWxCOztBQUNaO0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCO0FBQTZCLFdBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLElBQUlKLGtCQUFKLEVBQXJCO0FBQTdCLEtBRlksQ0FJWjs7O0FBQ0EsU0FB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QUFLM0Isb0JBQVosQ0FBWixDQUVBO0FBRkEsV0FHSyxJQUFJMkIsRUFBRSxHQUFHOUUsSUFBVCxFQUFlLE9BQU8sS0FBS3FELHFCQUFaLENBQWYsQ0FFTDtBQUZLLGFBR0EsT0FBTyxLQUFLMEIsc0JBQVo7QUFDTiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgQm94IGZyb20gJy4vZ2VvbWV0cnkvYm94JztcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9nZW9tZXRyeS92ZWN0b3InO1xuaW1wb3J0IENpcmNsZSBmcm9tICcuL2dlb21ldHJ5L2NpcmNsZSc7XG5pbXBvcnQgRWxsaXBzZSBmcm9tICcuL2dlb21ldHJ5L2VsbGlwc2UnO1xuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9nZW9tZXRyeS9wb2x5Z29uJztcbmltcG9ydCBDb2xsaXNpb25EZXRhaWxzIGZyb20gJy4vY29sbGlzaW9uX2RldGFpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaWRlcjJEIHtcbiAgLyoqXG4gICAqIEEgcG9vbCBvZiBgVmVjdG9yIG9iamVjdHMgdGhhdCBhcmUgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWQgYWxsb2NhdGluZyBtZW1vcnkuXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtBcnJheTxWZWN0b3I+fVxuICAgKi9cbiAgcHJpdmF0ZSBfVF9WRUNUT1JTOiBBcnJheTxWZWN0b3I+ID0gW107XG5cbiAgLyoqXG4gICAqIEEgcG9vbCBvZiBhcnJheXMgb2YgbnVtYmVycyB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcHJvcGVydHkge0FycmF5PEFycmF5PG51bWJlcj4+fVxuICAgKi9cbiAgcHJpdmF0ZSBfVF9BUlJBWVM6IEFycmF5PEFycmF5PG51bWJlcj4+ID0gW107XG5cbiAgLyoqXG4gICAqIFRlbXBvcmFyeSBjb2xsaXNpb24gZGV0YWlscyBvYmplY3QgdXNlZCBmb3IgaGl0IGRldGVjdGlvbi5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcHJvcGVydHkge0NvbGxpc2lvbkRldGFpbHN9XG4gICAqL1xuICBwcml2YXRlIF9UX0NPTExJU0lPTl9ERVRBSUxTID0gbmV3IENvbGxpc2lvbkRldGFpbHMoKTtcblxuICAvKipcbiAgICogVGlueSBcInBvaW50XCIgUG9seWdvbiB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtQb2x5Z29ufVxuICAgKi9cbiAgcHJpdmF0ZSBfVEVTVF9QT0lOVCA9IG5ldyBCb3gobmV3IFZlY3RvcigpLCAwLjAwMDAwMSwgMC4wMDAwMDEpLnRvUG9seWdvbigpO1xuXG4gIC8qKlxuICAgKiBDb25zdGFudCB1c2VkIGZvciBsZWZ0IHZvcm9ub2kgcmVnaW9uLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxuICAgKi9cbiAgcHJpdmF0ZSBfTEVGVF9WT1JPTk9JX1JFR0lPTiA9IC0xO1xuXG4gIC8qKlxuICAgKiBDb25zdGFudCB1c2VkIGZvciBtaWRkbGUgdm9yb25vaSByZWdpb24uXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XG4gICAqL1xuICBwcml2YXRlIF9NSURETEVfVk9ST05PSV9SRUdJT04gPSAwO1xuXG4gIC8qKlxuICAgKiBDb25zdGFudCB1c2VkIGZvciByaWdodCB2b3Jvbm9pIHJlZ2lvbi5cbiAgICogXG4gICAqIEBwcml2YXRlXG4gICAqIFxuICAgKiBAcHJvcGVydHkge251bWJlcn1cbiAgICovXG4gIHByaXZhdGUgX1JJR0hUX1ZPUk9OT0lfUkVHSU9OID0gMTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBQb3B1bGF0ZSBUX1ZFQ1RPUlNcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHRoaXMuX1RfVkVDVE9SUy5wdXNoKG5ldyBWZWN0b3IoKSk7XG5cbiAgICAvLyBQb3B1bGF0ZSBUX0FSUkFZU1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB0aGlzLl9UX0FSUkFZUy5wdXNoKFtdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNpcmNsZS5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQgdG8gdGVzdC5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlIHRvIHRlc3QuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGNpcmNsZSBvciBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBwb2ludEluQ2lyY2xlKHBvaW50OiBWZWN0b3IsIGNpcmNsZTogQ2lyY2xlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGlmZmVyZW5jZVYgPSB0aGlzLl9UX1ZFQ1RPUlMucG9wKCkhLmNvcHkocG9pbnQpLnN1YihjaXJjbGUucG9zaXRpb24pLnN1YihjaXJjbGUub2Zmc2V0KTtcblxuICAgIGNvbnN0IHJhZGl1c1NxID0gY2lyY2xlLnJhZGl1cyAqIGNpcmNsZS5yYWRpdXM7XG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcblxuICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcblxuICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIGlzIHNtYWxsZXIgdGhhbiB0aGUgcmFkaXVzIHRoZW4gdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgY2lyY2xlLlxuICAgIHJldHVybiBkaXN0YW5jZVNxIDw9IHJhZGl1c1NxO1xuICB9XG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNpcmNsZS5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQgdG8gdGVzdC5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlIHRvIHRlc3QuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGNpcmNsZSBvciBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBwb2ludEluRWxsaXBzZShwb2ludDogVmVjdG9yLCBlbGxpcHNlOiBFbGxpcHNlKTogYm9vbGVhbiB7XG4gICAgY29uc3QgdmVjdG9yID0gdGhpcy5fVF9WRUNUT1JTLnBvcCgpIS5jb3B5KHBvaW50KS5zdWIoZWxsaXBzZS5wb3NpdGlvbikuc3ViKGVsbGlwc2Uub2Zmc2V0KTtcblxuXHQgIGNvbnN0IHdpZHRoU3EgPSBlbGxpcHNlLndpZHRoKmVsbGlwc2Uud2lkdGhcblx0ICBjb25zdCBoZWlnaHRTcSA9IGVsbGlwc2UuaGVpZ2h0KmVsbGlwc2UuaGVpZ2h0XG4gICAgY29uc3QgcG9pbnRYU3EgPSB2ZWN0b3IueCp2ZWN0b3IueDtcbiAgICBjb25zdCBwb2ludFlTcSA9IHZlY3Rvci55KnZlY3Rvci55O1xuXG4gICAgdGhpcy5fVF9WRUNUT1JTLnB1c2godmVjdG9yKTtcbiAgICAvLyBJZiB0aGUgcmVzdWx0IGRpc3RhbmNlIGlzIHNtYWxsZXIgdGhhbiAxIHRoZSBwb2ludCBpdHMgaW5zaWRlIHRoZSBlbGxpcHNlXG5cdCAgcmV0dXJuICgocG9pbnRYU3EpLyh3aWR0aFNxKSsocG9pbnRZU3EpLyhoZWlnaHRTcSk8PTEpO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgcG9pbnQgaXMgaW5zaWRlIGEgY29udmV4IHBvbHlnb24uXG4gICAqIFxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcG9pbnQgVGhlIHBvaW50IHRvIHRlc3QuXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbiB0byB0ZXN0LlxuICAgKiBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBwb2x5Z29uIG9yIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIHBvaW50SW5Qb2x5Z29uKHBvaW50OiBWZWN0b3IsIHBvbHlnb246IFBvbHlnb24pOiBib29sZWFuIHtcbiAgICB0aGlzLl9URVNUX1BPSU5ULnBvc2l0aW9uLmNvcHkocG9pbnQpO1xuICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuY2xlYXIoKTtcblxuICAgIGxldCByZXN1bHQ6IChib29sZWFuIHwgQ29sbGlzaW9uRGV0YWlscykgPSB0aGlzLnRlc3RQb2x5Z29uUG9seWdvbih0aGlzLl9URVNUX1BPSU5ULCBwb2x5Z29uLCB0cnVlKTtcblxuICAgIGlmIChyZXN1bHQpIHJlc3VsdCA9IHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYUluQjtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgdHdvIGNpcmNsZXMgY29sbGlkZS5cbiAgICogXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBhIFRoZSBmaXJzdCBjaXJjbGUuXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBiIFRoZSBzZWNvbmQgY2lyY2xlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZXRhaWxzPWZhbHNlXSBJZiBzZXQgdG8gdHJ1ZSBhbmQgdGhlcmUgaXMgYSBjb2xsaXNpb24sIGFuIG9iamVjdCBoaWdobGlnaHRpbmcgZGV0YWlscyBhYm91dCB0aGUgY29sbGlzaW9uIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZiBqdXN0IHJldHVybmluZyB0cnVlLlxuICAgKiBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgY2lyY2xlcyBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgdGVzdENpcmNsZUNpcmNsZShhOiBDaXJjbGUsIGI6IENpcmNsZSwgZGV0YWlsczogYm9vbGVhbiA9IGZhbHNlKTogKGJvb2xlYW4gfCBDb2xsaXNpb25EZXRhaWxzKSB7XG4gICAgLy8gQ2hlY2sgaWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlcnMgb2YgdGhlIHR3byBjaXJjbGVzIGlzIGdyZWF0ZXIgdGhhbiB0aGVpciBjb21iaW5lZCByYWRpdXMuXG4gICAgY29uc3QgZGlmZmVyZW5jZVYgPSB0aGlzLl9UX1ZFQ1RPUlMucG9wKCkhLmNvcHkoYi5wb3NpdGlvbikuYWRkKGIub2Zmc2V0KS5zdWIoYS5wb3NpdGlvbikuc3ViKGEub2Zmc2V0KTtcblxuICAgIGNvbnN0IHRvdGFsUmFkaXVzID0gYS5yYWRpdXMgKyBiLnJhZGl1cztcbiAgICBjb25zdCB0b3RhbFJhZGl1c1NxID0gdG90YWxSYWRpdXMgKiB0b3RhbFJhZGl1cztcbiAgICBjb25zdCBkaXN0YW5jZVNxID0gZGlmZmVyZW5jZVYubGVuMigpO1xuXG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGlzIGJpZ2dlciB0aGFuIHRoZSBjb21iaW5lZCByYWRpdXMsIHRoZXkgZG9uJ3QgaW50ZXJzZWN0LlxuICAgIGlmIChkaXN0YW5jZVNxID4gdG90YWxSYWRpdXNTcSkge1xuICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGRldGFpbHMpIHtcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuY2xlYXIoKTtcblxuICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChkaXN0YW5jZVNxKTtcblxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5hID0gYTtcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYiA9IGI7XG5cbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcCA9IHRvdGFsUmFkaXVzIC0gZGlzdDtcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcE4uY29weShkaWZmZXJlbmNlVi5ub3JtYWxpemUoKSk7XG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXBWLmNvcHkoZGlmZmVyZW5jZVYpLnNjYWxlKHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcCk7XG5cbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYUluQiA9IGEucmFkaXVzIDw9IGIucmFkaXVzICYmIGRpc3QgPD0gYi5yYWRpdXMgLSBhLnJhZGl1cztcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYkluQSA9IGIucmFkaXVzIDw9IGEucmFkaXVzICYmIGRpc3QgPD0gYS5yYWRpdXMgLSBiLnJhZGl1cztcblxuICAgICAgcmV0dXJuIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFM7XG4gICAgfVxuXG4gICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgcG9seWdvbnMgY29sbGlkZS5cbiAgICogXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gYSBUaGUgZmlyc3QgcG9seWdvbi5cbiAgICogQHBhcmFtIHtQb2x5Z29ufSBiIFRoZSBzZWNvbmQgcG9seWdvbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBbZGV0YWlscz1mYWxzZV0gSWYgc2V0IHRvIHRydWUgYW5kIHRoZXJlIGlzIGEgY29sbGlzaW9uLCBhbiBvYmplY3QgaGlnaGxpZ2h0aW5nIGRldGFpbHMgYWJvdXQgdGhlIGNvbGxpc2lvbiB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2YganVzdCByZXR1cm5pbmcgdHJ1ZS5cbiAgICogXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKi9cbiAgdGVzdFBvbHlnb25Qb2x5Z29uKGE6IFBvbHlnb24sIGI6IFBvbHlnb24sIGRldGFpbHM6IGJvb2xlYW4gPSBmYWxzZSk6IChib29sZWFuIHwgQ29sbGlzaW9uRGV0YWlscykge1xuICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuY2xlYXIoKTtcblxuICAgIGNvbnN0IGFQb2ludHMgPSBhLmNhbGNQb2ludHM7XG4gICAgY29uc3QgYUxlbiA9IGFQb2ludHMubGVuZ3RoO1xuXG4gICAgY29uc3QgYlBvaW50cyA9IGIuY2FsY1BvaW50cztcbiAgICBjb25zdCBiTGVuID0gYlBvaW50cy5sZW5ndGg7XG5cbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhTGVuOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLl9pc1NlcGFyYXRpbmdBeGlzKGEucG9zaXRpb24sIGIucG9zaXRpb24sIGFQb2ludHMsIGJQb2ludHMsIGEubm9ybWFsc1tpXSwgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEIgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJMZW47IGkrKykge1xuICAgICAgaWYgKHRoaXMuX2lzU2VwYXJhdGluZ0F4aXMoYS5wb3NpdGlvbiwgYi5wb3NpdGlvbiwgYVBvaW50cywgYlBvaW50cywgYi5ub3JtYWxzW2ldLCB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU2luY2Ugbm9uZSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgb3IgQiBhcmUgYSBzZXBhcmF0aW5nIGF4aXMsIHRoZXJlIGlzIGFuIGludGVyc2VjdGlvblxuICAgIC8vIGFuZCB3ZSd2ZSBhbHJlYWR5IGNhbGN1bGF0ZWQgdGhlIHNtYWxsZXN0IG92ZXJsYXAgKGluIGlzU2VwYXJhdGluZ0F4aXMpLiBcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG92ZXJsYXAgdmVjdG9yLlxuICAgIGlmIChkZXRhaWxzKSB7XG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmEgPSBhO1xuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5iID0gYjtcblxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwVi5jb3B5KHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcE4pLnNjYWxlKHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcCk7XG5cbiAgICAgIHJldHVybiB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgcG9seWdvbiBhbmQgYSBjaXJjbGUgY29sbGlkZS5cbiAgICogXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZXRhaWxzPWZhbHNlXSBJZiBzZXQgdG8gdHJ1ZSBhbmQgdGhlcmUgaXMgYSBjb2xsaXNpb24sIGFuIG9iamVjdCBoaWdobGlnaHRpbmcgZGV0YWlscyBhYm91dCB0aGUgY29sbGlzaW9uIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZiBqdXN0IHJldHVybmluZyB0cnVlLlxuICAgKiBcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICB0ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uOiBQb2x5Z29uLCBjaXJjbGU6IENpcmNsZSwgZGV0YWlsczogYm9vbGVhbiA9IGZhbHNlKTogKGJvb2xlYW4gfCBDb2xsaXNpb25EZXRhaWxzKSB7XG4gICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5jbGVhcigpO1xuXG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBwb2x5Z29uLlxuICAgIGNvbnN0IGNpcmNsZVBvcyA9IHRoaXMuX1RfVkVDVE9SUy5wb3AoKSEuY29weShjaXJjbGUucG9zaXRpb24pLmFkZChjaXJjbGUub2Zmc2V0KS5zdWIocG9seWdvbi5wb3NpdGlvbik7XG5cbiAgICBjb25zdCByYWRpdXMgPSBjaXJjbGUucmFkaXVzO1xuICAgIGNvbnN0IHJhZGl1czIgPSByYWRpdXMgKiByYWRpdXM7XG5cbiAgICBjb25zdCBwb2ludHMgPSBwb2x5Z29uLmNhbGNQb2ludHM7XG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcblxuICAgIGNvbnN0IGVkZ2UgPSB0aGlzLl9UX1ZFQ1RPUlMucG9wKCkhO1xuICAgIGNvbnN0IHBvaW50ID0gdGhpcy5fVF9WRUNUT1JTLnBvcCgpITtcblxuICAgIC8vIEZvciBlYWNoIGVkZ2UgaW4gdGhlIHBvbHlnb246XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgbmV4dCA9IGkgPT09IGxlbiAtIDEgPyAwIDogaSArIDE7XG4gICAgICBjb25zdCBwcmV2ID0gaSA9PT0gMCA/IGxlbiAtIDEgOiBpIC0gMTtcblxuICAgICAgbGV0IG92ZXJsYXAgPSAwO1xuICAgICAgbGV0IG92ZXJsYXBOID0gbnVsbDtcblxuICAgICAgLy8gR2V0IHRoZSBlZGdlLlxuICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbaV0pO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgZWRnZS5cbiAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW2ldKTtcblxuICAgICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgcG9pbnQgaXMgYmlnZ2VyIHRoYW4gdGhlIHJhZGl1cywgdGhlIHBvbHlnb24gaXMgZGVmaW5pdGVseSBub3QgZnVsbHkgaW4gdGhlIGNpcmNsZS5cbiAgICAgIGlmIChkZXRhaWxzICYmIHBvaW50LmxlbjIoKSA+IHJhZGl1czIpIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYUluQiA9IGZhbHNlO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgd2hpY2ggVm9yb25vaSByZWdpb24gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIGluLlxuICAgICAgbGV0IHJlZ2lvbiA9IHRoaXMuX3Zvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xuXG4gICAgICAvLyBJZiBpdCdzIHRoZSBsZWZ0IHJlZ2lvbjpcbiAgICAgIGlmIChyZWdpb24gPT09IHRoaXMuX0xFRlRfVk9ST05PSV9SRUdJT04pIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIFJJR0hUX1ZPUk9OT0lfUkVHSU9OIG9mIHRoZSBwcmV2aW91cyBlZGdlLlxuICAgICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1twcmV2XSk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIHByZXZpb3VzIGVkZ2VcbiAgICAgICAgY29uc3QgcG9pbnQyID0gdGhpcy5fVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1twcmV2XSk7XG5cbiAgICAgICAgcmVnaW9uID0gdGhpcy5fdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludDIpO1xuXG4gICAgICAgIGlmIChyZWdpb24gPT09IHRoaXMuX1JJR0hUX1ZPUk9OT0lfUkVHSU9OKSB7XG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxuICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5sZW4oKTtcblxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XG4gICAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XG4gICAgICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChlZGdlKTtcbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKHBvaW50KTtcbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKHBvaW50Mik7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGRldGFpbHMpIHtcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cbiAgICAgICAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYkluQSA9IGZhbHNlO1xuXG4gICAgICAgICAgICBvdmVybGFwTiA9IHBvaW50Lm5vcm1hbGl6ZSgpO1xuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcblxuICAgICAgICAvLyBJZiBpdCdzIHRoZSByaWdodCByZWdpb246XG4gICAgICB9IGVsc2UgaWYgKHJlZ2lvbiA9PT0gdGhpcy5fUklHSFRfVk9ST05PSV9SRUdJT04pIHtcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIGxlZnQgcmVnaW9uIG9uIHRoZSBuZXh0IGVkZ2VcbiAgICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbbmV4dF0pO1xuXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBuZXh0IGVkZ2UuXG4gICAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW25leHRdKTtcblxuICAgICAgICByZWdpb24gPSB0aGlzLl92b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcblxuICAgICAgICBpZiAocmVnaW9uID09PSB0aGlzLl9MRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxuICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5sZW4oKTtcblxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XG4gICAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XG4gICAgICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChlZGdlKTtcbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKHBvaW50KTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZGV0YWlscykge1xuICAgICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxuICAgICAgICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5iSW5BID0gZmFsc2U7XG5cbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XG4gICAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBpdCdzIHRoZSBtaWRkbGUgcmVnaW9uOlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTmVlZCB0byBjaGVjayBpZiB0aGUgY2lyY2xlIGlzIGludGVyc2VjdGluZyB0aGUgZWRnZSwgY2hhbmdlIHRoZSBlZGdlIGludG8gaXRzIFwiZWRnZSBub3JtYWxcIi5cbiAgICAgICAgY29uc3Qgbm9ybWFsID0gZWRnZS5wZXJwKCkubm9ybWFsaXplKCk7XG5cbiAgICAgICAgLy8gRmluZCB0aGUgcGVycGVuZGljdWxhciBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBhbmQgdGhlIGVkZ2UuXG4gICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5kb3Qobm9ybWFsKTtcbiAgICAgICAgY29uc3QgZGlzdEFicyA9IE1hdGguYWJzKGRpc3QpO1xuXG4gICAgICAgIC8vIElmIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUgb2YgdGhlIGVkZ2UsIHRoZXJlIGlzIG5vIGludGVyc2VjdGlvbi5cbiAgICAgICAgaWYgKGRpc3QgPiAwICYmIGRpc3RBYnMgPiByYWRpdXMpIHtcbiAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cbiAgICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xuICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKG5vcm1hbCk7XG4gICAgICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xuXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2UgaWYgKGRldGFpbHMpIHtcbiAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXG4gICAgICAgICAgb3ZlcmxhcE4gPSBub3JtYWw7XG4gICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XG5cbiAgICAgICAgICAvLyBJZiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUgb2YgdGhlIGVkZ2UsIG9yIHBhcnQgb2YgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSwgdGhlIGNpcmNsZSBpcyBub3QgZnVsbHkgaW5zaWRlIHRoZSBwb2x5Z29uLlxuICAgICAgICAgIGlmIChkaXN0ID49IDAgfHwgb3ZlcmxhcCA8IDIgKiByYWRpdXMpIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYkluQSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IG92ZXJsYXAgd2UndmUgc2Vlbiwga2VlcCBpdC5cbiAgICAgIC8vIChvdmVybGFwTiBtYXkgYmUgbnVsbCBpZiB0aGUgY2lyY2xlIHdhcyBpbiB0aGUgd3JvbmcgVm9yb25vaSByZWdpb24pLlxuICAgICAgaWYgKG92ZXJsYXBOICYmIGRldGFpbHMgJiYgTWF0aC5hYnMob3ZlcmxhcCkgPCBNYXRoLmFicyh0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXApKSB7XG4gICAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcCA9IG92ZXJsYXA7XG4gICAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcE4uY29weShvdmVybGFwTik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3RvciAtIGJhc2VkIG9uIHRoZSBzbWFsbGVzdCBvdmVybGFwLlxuICAgIGlmIChkZXRhaWxzKSB7XG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmEgPSBwb2x5Z29uO1xuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5iID0gY2lyY2xlO1xuXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXBWLmNvcHkodGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwTikuc2NhbGUodGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwKTtcbiAgICB9XG5cbiAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xuICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGVkZ2UpO1xuICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKHBvaW50KTtcblxuICAgIGlmIChkZXRhaWxzKSByZXR1cm4gdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUztcblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgY2lyY2xlIGFuZCBhIHBvbHlnb24gY29sbGlkZS5cbiAgICogXG4gICAqICoqTk9URToqKiBUaGlzIGlzIHNsaWdodGx5IGxlc3MgZWZmaWNpZW50IHRoYW4gcG9seWdvbkNpcmNsZSBhcyBpdCBqdXN0IHJ1bnMgcG9seWdvbkNpcmNsZSBhbmQgcmV2ZXJzZXMgZXZlcnl0aGluZ1xuICAgKiBhdCB0aGUgZW5kLlxuICAgKiBcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RldGFpbHM9ZmFsc2VdIElmIHNldCB0byB0cnVlIGFuZCB0aGVyZSBpcyBhIGNvbGxpc2lvbiwgYW4gb2JqZWN0IGhpZ2hsaWdodGluZyBkZXRhaWxzIGFib3V0IHRoZSBjb2xsaXNpb24gd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIGp1c3QgcmV0dXJuaW5nIHRydWUuXG4gICAqIFxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIHRlc3RDaXJjbGVQb2x5Z29uKGNpcmNsZTogQ2lyY2xlLCBwb2x5Z29uOiBQb2x5Z29uLCBkZXRhaWxzOiBib29sZWFuID0gZmFsc2UpOiAoYm9vbGVhbiB8IENvbGxpc2lvbkRldGFpbHMpIHtcbiAgICAvLyBUZXN0IHRoZSBwb2x5Z29uIGFnYWluc3QgdGhlIGNpcmNsZS5cbiAgICBjb25zdCByZXN1bHQ6IChib29sZWFuIHwgQ29sbGlzaW9uRGV0YWlscykgPSB0aGlzLnRlc3RQb2x5Z29uQ2lyY2xlKHBvbHlnb24sIGNpcmNsZSwgZGV0YWlscyk7XG5cbiAgICBpZiAocmVzdWx0ICYmIGRldGFpbHMpIHtcbiAgICAgIGNvbnN0IGNvbGxpc2lvbkRldGFpbHMgPSByZXN1bHQgYXMgQ29sbGlzaW9uRGV0YWlscztcblxuICAgICAgLy8gU3dhcCBBIGFuZCBCIGluIHRoZSBjb2xsaXNpb24gZGV0YWlscy5cbiAgICAgIGNvbnN0IGEgPSBjb2xsaXNpb25EZXRhaWxzLmE7XG4gICAgICBjb25zdCBhSW5CID0gY29sbGlzaW9uRGV0YWlscy5hSW5CO1xuXG4gICAgICBjb2xsaXNpb25EZXRhaWxzLm92ZXJsYXBOLnJldmVyc2UoKTtcbiAgICAgIGNvbGxpc2lvbkRldGFpbHMub3ZlcmxhcFYucmV2ZXJzZSgpO1xuXG4gICAgICBjb2xsaXNpb25EZXRhaWxzLmEgPSBjb2xsaXNpb25EZXRhaWxzLmI7XG4gICAgICBjb2xsaXNpb25EZXRhaWxzLmIgPSBhO1xuXG4gICAgICBjb2xsaXNpb25EZXRhaWxzLmFJbkIgPSBjb2xsaXNpb25EZXRhaWxzLmJJbkE7XG4gICAgICBjb2xsaXNpb25EZXRhaWxzLmJJbkEgPSBhSW5CO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgd2hldGhlciB0d28gY29udmV4IHBvbHlnb25zIGFyZSBzZXBhcmF0ZWQgYnkgdGhlIHNwZWNpZmllZCBheGlzIChtdXN0IGJlIGEgdW5pdCB2ZWN0b3IpLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBhUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgZmlyc3QgcG9seWdvbi5cbiAgICogQHBhcmFtIHtWZWN0b3J9IGJQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBzZWNvbmQgcG9seWdvbi5cbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBhUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIGZpcnN0IHBvbHlnb24uXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gYlBvaW50cyBUaGUgcG9pbnRzIGluIHRoZSBzZWNvbmQgcG9seWdvbi5cbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIGF4aXMgKHVuaXQgc2l6ZWQpIHRvIHRlc3QgYWdhaW5zdC4gIFRoZSBwb2ludHMgb2YgYm90aCBwb2x5Z29ucyB3aWxsIGJlIHByb2plY3RlZCBvbnRvIHRoaXMgYXhpcy5cbiAgICogQHBhcmFtIHtDb2xsaXNpb25EZXRhaWxzfSBjb2xsaXNpb25EZXRhaWxzIEEgQ29sbGlzaW9uRGV0YWlscyBvYmplY3QgKG9wdGlvbmFsKSB3aGljaCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGUgYXhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuXG4gICAqIFxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGl0IGlzIGEgc2VwYXJhdGluZyBheGlzLCBmYWxzZSBvdGhlcndpc2UuICBJZiBmYWxzZSwgYW5kIGEgQ29sbGlzaW9uRGV0YWlscyBpcyBwYXNzZWQgaW4sIGluZm9ybWF0aW9uIGFib3V0IGhvdyBtdWNoIG92ZXJsYXAgYW5kIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG92ZXJsYXAgd2lsbCBiZSBwb3B1bGF0ZWQuXG4gICAqL1xuICBwcml2YXRlIF9pc1NlcGFyYXRpbmdBeGlzKGFQb3M6IFZlY3RvciwgYlBvczogVmVjdG9yLCBhUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBiUG9pbnRzOiBBcnJheTxWZWN0b3I+LCBheGlzOiBWZWN0b3IsIGNvbGxpc2lvbkRldGFpbHM/OiBDb2xsaXNpb25EZXRhaWxzKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmFuZ2VBID0gdGhpcy5fVF9BUlJBWVMucG9wKCkhO1xuICAgIGNvbnN0IHJhbmdlQiA9IHRoaXMuX1RfQVJSQVlTLnBvcCgpITtcblxuICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIG9mZnNldCBiZXR3ZWVuIHRoZSB0d28gcG9seWdvbnNcbiAgICBjb25zdCBvZmZzZXRWID0gdGhpcy5fVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGJQb3MpLnN1YihhUG9zKTtcbiAgICBjb25zdCBwcm9qZWN0ZWRPZmZzZXQgPSBvZmZzZXRWLmRvdChheGlzKTtcblxuICAgIC8vIFByb2plY3QgdGhlIHBvbHlnb25zIG9udG8gdGhlIGF4aXMuXG4gICAgdGhpcy5fZmxhdHRlblBvaW50c09uKGFQb2ludHMsIGF4aXMsIHJhbmdlQSk7XG4gICAgdGhpcy5fZmxhdHRlblBvaW50c09uKGJQb2ludHMsIGF4aXMsIHJhbmdlQik7XG5cbiAgICAvLyBNb3ZlIEIncyByYW5nZSB0byBpdHMgcG9zaXRpb24gcmVsYXRpdmUgdG8gQS5cbiAgICByYW5nZUJbMF0gKz0gcHJvamVjdGVkT2Zmc2V0O1xuICAgIHJhbmdlQlsxXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XG5cbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIGdhcC4gSWYgdGhlcmUgaXMsIHRoaXMgaXMgYSBzZXBhcmF0aW5nIGF4aXMgYW5kIHdlIGNhbiBzdG9wXG4gICAgaWYgKHJhbmdlQVswXSA+IHJhbmdlQlsxXSB8fCByYW5nZUJbMF0gPiByYW5nZUFbMV0pIHtcbiAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKG9mZnNldFYpO1xuXG4gICAgICB0aGlzLl9UX0FSUkFZUy5wdXNoKHJhbmdlQSk7XG4gICAgICB0aGlzLl9UX0FSUkFZUy5wdXNoKHJhbmdlQik7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIFRoaXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLiBJZiB3ZSdyZSBjYWxjdWxhdGluZyBjb2xsaXNpb24gZGV0YWlscywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxuICAgIGlmIChjb2xsaXNpb25EZXRhaWxzKSB7XG4gICAgICBsZXQgb3ZlcmxhcCA9IDA7XG5cbiAgICAgIC8vIEEgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEJcbiAgICAgIGlmIChyYW5nZUFbMF0gPCByYW5nZUJbMF0pIHtcbiAgICAgICAgY29sbGlzaW9uRGV0YWlscy5hSW5CID0gZmFsc2U7XG5cbiAgICAgICAgLy8gQSBlbmRzIGJlZm9yZSBCIGRvZXMuIFdlIGhhdmUgdG8gcHVsbCBBIG91dCBvZiBCXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPCByYW5nZUJbMV0pIHtcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xuXG4gICAgICAgICAgY29sbGlzaW9uRGV0YWlscy5iSW5BID0gZmFsc2U7XG4gICAgICAgICAgLy8gQiBpcyBmdWxseSBpbnNpZGUgQS4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcbiAgICAgICAgICBjb25zdCBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xuXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xuICAgICAgICB9XG4gICAgICAgIC8vIEIgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbGxpc2lvbkRldGFpbHMuYkluQSA9IGZhbHNlO1xuXG4gICAgICAgIC8vIEIgZW5kcyBiZWZvcmUgQSBlbmRzLiBXZSBoYXZlIHRvIHB1c2ggQSBvdXQgb2YgQlxuICAgICAgICBpZiAocmFuZ2VBWzFdID4gcmFuZ2VCWzFdKSB7XG4gICAgICAgICAgb3ZlcmxhcCA9IHJhbmdlQVswXSAtIHJhbmdlQlsxXTtcblxuICAgICAgICAgIGNvbGxpc2lvbkRldGFpbHMuYUluQiA9IGZhbHNlO1xuICAgICAgICAgIC8vIEEgaXMgZnVsbHkgaW5zaWRlIEIuICBQaWNrIHRoZSBzaG9ydGVzdCB3YXkgb3V0LlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XG4gICAgICAgICAgY29uc3Qgb3B0aW9uMiA9IHJhbmdlQlsxXSAtIHJhbmdlQVswXTtcblxuICAgICAgICAgIG92ZXJsYXAgPSBvcHRpb24xIDwgb3B0aW9uMiA/IG9wdGlvbjEgOiAtb3B0aW9uMjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBhbW91bnQgb2Ygb3ZlcmxhcCB3ZSd2ZSBzZWVuIHNvIGZhciwgc2V0IGl0IGFzIHRoZSBtaW5pbXVtIG92ZXJsYXAuXG4gICAgICBjb25zdCBhYnNPdmVybGFwID0gTWF0aC5hYnMob3ZlcmxhcCk7XG5cbiAgICAgIGlmIChhYnNPdmVybGFwIDwgY29sbGlzaW9uRGV0YWlscy5vdmVybGFwKSB7XG4gICAgICAgIGNvbGxpc2lvbkRldGFpbHMub3ZlcmxhcCA9IGFic092ZXJsYXA7XG4gICAgICAgIGNvbGxpc2lvbkRldGFpbHMub3ZlcmxhcE4uY29weShheGlzKTtcblxuICAgICAgICBpZiAob3ZlcmxhcCA8IDApIGNvbGxpc2lvbkRldGFpbHMub3ZlcmxhcE4ucmV2ZXJzZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKG9mZnNldFYpO1xuXG4gICAgdGhpcy5fVF9BUlJBWVMucHVzaChyYW5nZUEpO1xuICAgIHRoaXMuX1RfQVJSQVlTLnB1c2gocmFuZ2VCKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGbGF0dGVucyB0aGUgc3BlY2lmaWVkIGFycmF5IG9mIHBvaW50cyBvbnRvIGEgdW5pdCB2ZWN0b3IgYXhpcyByZXN1bHRpbmcgaW4gYSBvbmUgZGltZW5zaW9uc2xcbiAgICogcmFuZ2Ugb2YgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWUgb24gdGhhdCBheGlzLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIFRoZSBwb2ludHMgdG8gZmxhdHRlbi5cbiAgICogQHBhcmFtIHtWZWN0b3J9IG5vcm1hbCBUaGUgdW5pdCB2ZWN0b3IgYXhpcyB0byBmbGF0dGVuIG9uLlxuICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHJlc3VsdCBBbiBhcnJheS4gQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLCByZXN1bHRbMF0gd2lsbCBiZSB0aGUgbWluaW11bSB2YWx1ZSwgcmVzdWx0WzFdIHdpbGwgYmUgdGhlIG1heGltdW0gdmFsdWUuXG4gICAqL1xuICBwcml2YXRlIF9mbGF0dGVuUG9pbnRzT24ocG9pbnRzOiBBcnJheTxWZWN0b3I+LCBub3JtYWw6IFZlY3RvciwgcmVzdWx0OiBBcnJheTxudW1iZXI+KSB7XG4gICAgbGV0IG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgbGV0IG1heCA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xuXG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIHByb2plY3Rpb24gb2YgdGhlIHBvaW50IG9udG8gdGhlIG5vcm1hbC5cbiAgICAgIGNvbnN0IGRvdCA9IHBvaW50c1tpXS5kb3Qobm9ybWFsKTtcblxuICAgICAgaWYgKGRvdCA8IG1pbikgbWluID0gZG90O1xuICAgICAgaWYgKGRvdCA+IG1heCkgbWF4ID0gZG90O1xuICAgIH1cblxuICAgIHJlc3VsdFswXSA9IG1pbjtcbiAgICByZXN1bHRbMV0gPSBtYXg7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB3aGljaCBWb3Jvbm9pIHJlZ2lvbiBhIHBvaW50IGlzIG9uIGEgbGluZSBzZWdtZW50LlxuICAgKiBcbiAgICogSXQgaXMgYXNzdW1lZCB0aGF0IGJvdGggdGhlIGxpbmUgYW5kIHRoZSBwb2ludCBhcmUgcmVsYXRpdmUgdG8gYCgwLDApYFxuICAgKiBcbiAgICogICAgICAgICAgICAgfCAgICAgICAoMCkgICAgICB8XG4gICAqICAgICAgKC0xKSAgW1NdLS0tLS0tLS0tLS0tLS1bRV0gICgxKVxuICAgKiAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IGxpbmUgVGhlIGxpbmUgc2VnbWVudC5cbiAgICogQHBhcmFtIHtWZWN0b3J9IHBvaW50IFRoZSBwb2ludC5cbiAgICogQHJldHVybiB7bnVtYmVyfSBMRUZUX1ZPUk9OT0lfUkVHSU9OICgtMSkgaWYgaXQgaXMgdGhlIGxlZnQgcmVnaW9uLFxuICAgKiAgICAgICAgICAgICAgICAgIE1JRERMRV9WT1JPTk9JX1JFR0lPTiAoMCkgaWYgaXQgaXMgdGhlIG1pZGRsZSByZWdpb24sXG4gICAqICAgICAgICAgICAgICAgICAgUklHSFRfVk9ST05PSV9SRUdJT04gKDEpIGlmIGl0IGlzIHRoZSByaWdodCByZWdpb24uXG4gICAqL1xuICBwcml2YXRlIF92b3Jvbm9pUmVnaW9uKGxpbmU6IFZlY3RvciwgcG9pbnQ6IFZlY3Rvcik6IG51bWJlciB7XG4gICAgY29uc3QgbGVuMiA9IGxpbmUubGVuMigpO1xuICAgIGNvbnN0IGRwID0gcG9pbnQuZG90KGxpbmUpO1xuXG4gICAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgc3RhcnQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZSBsZWZ0IHZvcm9ub2kgcmVnaW9uLlxuICAgIGlmIChkcCA8IDApIHJldHVybiB0aGlzLl9MRUZUX1ZPUk9OT0lfUkVHSU9OO1xuXG4gICAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGUgcmlnaHQgdm9yb25vaSByZWdpb24uXG4gICAgZWxzZSBpZiAoZHAgPiBsZW4yKSByZXR1cm4gdGhpcy5fUklHSFRfVk9ST05PSV9SRUdJT047XG5cbiAgICAvLyBPdGhlcndpc2UsIGl0J3MgaW4gdGhlIG1pZGRsZSBvbmUuXG4gICAgZWxzZSByZXR1cm4gdGhpcy5fTUlERExFX1ZPUk9OT0lfUkVHSU9OO1xuICB9XG59Il19