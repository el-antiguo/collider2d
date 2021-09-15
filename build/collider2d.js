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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb2xsaWRlcjJkLnRzIl0sIm5hbWVzIjpbIkNvbGxpZGVyMkQiLCJDb2xsaXNpb25EZXRhaWxzIiwiQm94IiwiVmVjdG9yIiwidG9Qb2x5Z29uIiwiaSIsIl9UX1ZFQ1RPUlMiLCJwdXNoIiwiX1RfQVJSQVlTIiwicG9pbnQiLCJjaXJjbGUiLCJkaWZmZXJlbmNlViIsInBvcCIsImNvcHkiLCJzdWIiLCJwb3NpdGlvbiIsIm9mZnNldCIsInJhZGl1c1NxIiwicmFkaXVzIiwiZGlzdGFuY2VTcSIsImxlbjIiLCJlbGxpcHNlIiwidmVjdG9yIiwid2lkdGhTcSIsIndpZHRoIiwiaGVpZ2h0U3EiLCJoZWlnaHQiLCJwb2ludFhTcSIsIngiLCJwb2ludFlTcSIsInkiLCJwb2x5Z29uIiwiX1RFU1RfUE9JTlQiLCJfVF9DT0xMSVNJT05fREVUQUlMUyIsImNsZWFyIiwicmVzdWx0IiwidGVzdFBvbHlnb25Qb2x5Z29uIiwiYUluQiIsImEiLCJiIiwiZGV0YWlscyIsImFkZCIsInRvdGFsUmFkaXVzIiwidG90YWxSYWRpdXNTcSIsImRpc3QiLCJNYXRoIiwic3FydCIsIm92ZXJsYXAiLCJvdmVybGFwTiIsIm5vcm1hbGl6ZSIsIm92ZXJsYXBWIiwic2NhbGUiLCJiSW5BIiwiYVBvaW50cyIsImNhbGNQb2ludHMiLCJhTGVuIiwibGVuZ3RoIiwiYlBvaW50cyIsImJMZW4iLCJfaXNTZXBhcmF0aW5nQXhpcyIsIm5vcm1hbHMiLCJjaXJjbGVQb3MiLCJyYWRpdXMyIiwicG9pbnRzIiwibGVuIiwiZWRnZSIsIm5leHQiLCJwcmV2IiwiZWRnZXMiLCJyZWdpb24iLCJfdm9yb25vaVJlZ2lvbiIsIl9MRUZUX1ZPUk9OT0lfUkVHSU9OIiwicG9pbnQyIiwiX1JJR0hUX1ZPUk9OT0lfUkVHSU9OIiwibm9ybWFsIiwicGVycCIsImRvdCIsImRpc3RBYnMiLCJhYnMiLCJ0ZXN0UG9seWdvbkNpcmNsZSIsImNvbGxpc2lvbkRldGFpbHMiLCJyZXZlcnNlIiwiYVBvcyIsImJQb3MiLCJheGlzIiwicmFuZ2VBIiwicmFuZ2VCIiwib2Zmc2V0ViIsInByb2plY3RlZE9mZnNldCIsIl9mbGF0dGVuUG9pbnRzT24iLCJvcHRpb24xIiwib3B0aW9uMiIsImFic092ZXJsYXAiLCJtaW4iLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJtYXgiLCJsaW5lIiwiZHAiLCJfTUlERExFX1ZPUk9OT0lfUkVHSU9OIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOztBQUlBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHRSx3QkFBYztBQUFBOztBQUFBLHdDQXhEc0IsRUF3RHRCOztBQUFBLHVDQS9DNEIsRUErQzVCOztBQUFBLGtEQXRDaUIsSUFBSUMsNkJBQUosRUFzQ2pCOztBQUFBLHlDQTdCUSxJQUFJQyxlQUFKLENBQVEsSUFBSUMsa0JBQUosRUFBUixFQUFzQixRQUF0QixFQUFnQyxRQUFoQyxFQUEwQ0MsU0FBMUMsRUE2QlI7O0FBQUEsa0RBcEJpQixDQUFDLENBb0JsQjs7QUFBQSxvREFYbUIsQ0FXbkI7O0FBQUEsbURBRmtCLENBRWxCOztBQUNaO0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCO0FBQTZCLFdBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLElBQUlKLGtCQUFKLEVBQXJCO0FBQTdCLEtBRlksQ0FJWjs7O0FBQ0EsU0FB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QUFLM0Isb0JBQVosQ0FBWixDQUVBO0FBRkEsV0FHSyxJQUFJMkIsRUFBRSxHQUFHOUUsSUFBVCxFQUFlLE9BQU8sS0FBS3FELHFCQUFaLENBQWYsQ0FFTDtBQUZLLGFBR0EsT0FBTyxLQUFLMEIsc0JBQVo7QUFDTiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEJveCBmcm9tICcuL2dlb21ldHJ5L2JveCc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9nZW9tZXRyeS92ZWN0b3InO1xyXG5pbXBvcnQgQ2lyY2xlIGZyb20gJy4vZ2VvbWV0cnkvY2lyY2xlJztcclxuaW1wb3J0IEVsbGlwc2UgZnJvbSAnLi9nZW9tZXRyeS9lbGxpcHNlJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9nZW9tZXRyeS9wb2x5Z29uJztcclxuaW1wb3J0IENvbGxpc2lvbkRldGFpbHMgZnJvbSAnLi9jb2xsaXNpb25fZGV0YWlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaWRlcjJEIHtcclxuICAvKipcclxuICAgKiBBIHBvb2wgb2YgYFZlY3RvciBvYmplY3RzIHRoYXQgYXJlIHVzZWQgaW4gY2FsY3VsYXRpb25zIHRvIGF2b2lkIGFsbG9jYXRpbmcgbWVtb3J5LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxWZWN0b3I+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX1RfVkVDVE9SUzogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBBIHBvb2wgb2YgYXJyYXlzIG9mIG51bWJlcnMgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWQgYWxsb2NhdGluZyBtZW1vcnkuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PEFycmF5PG51bWJlcj4+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX1RfQVJSQVlTOiBBcnJheTxBcnJheTxudW1iZXI+PiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUZW1wb3JhcnkgY29sbGlzaW9uIGRldGFpbHMgb2JqZWN0IHVzZWQgZm9yIGhpdCBkZXRlY3Rpb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0NvbGxpc2lvbkRldGFpbHN9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfVF9DT0xMSVNJT05fREVUQUlMUyA9IG5ldyBDb2xsaXNpb25EZXRhaWxzKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRpbnkgXCJwb2ludFwiIFBvbHlnb24gdXNlZCBmb3IgUG9seWdvbiBoaXQgZGV0ZWN0aW9uLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtQb2x5Z29ufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX1RFU1RfUE9JTlQgPSBuZXcgQm94KG5ldyBWZWN0b3IoKSwgMC4wMDAwMDEsIDAuMDAwMDAxKS50b1BvbHlnb24oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RhbnQgdXNlZCBmb3IgbGVmdCB2b3Jvbm9pIHJlZ2lvbi5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX0xFRlRfVk9ST05PSV9SRUdJT04gPSAtMTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RhbnQgdXNlZCBmb3IgbWlkZGxlIHZvcm9ub2kgcmVnaW9uLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfTUlERExFX1ZPUk9OT0lfUkVHSU9OID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RhbnQgdXNlZCBmb3IgcmlnaHQgdm9yb25vaSByZWdpb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9SSUdIVF9WT1JPTk9JX1JFR0lPTiA9IDE7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gUG9wdWxhdGUgVF9WRUNUT1JTXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHRoaXMuX1RfVkVDVE9SUy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcblxyXG4gICAgLy8gUG9wdWxhdGUgVF9BUlJBWVNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB0aGlzLl9UX0FSUkFZUy5wdXNoKFtdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgcG9pbnQgaXMgaW5zaWRlIGEgY2lyY2xlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUgdG8gdGVzdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGNpcmNsZSBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcG9pbnRJbkNpcmNsZShwb2ludDogVmVjdG9yLCBjaXJjbGU6IENpcmNsZSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZGlmZmVyZW5jZVYgPSB0aGlzLl9UX1ZFQ1RPUlMucG9wKCkhLmNvcHkocG9pbnQpLnN1YihjaXJjbGUucG9zaXRpb24pLnN1YihjaXJjbGUub2Zmc2V0KTtcclxuXHJcbiAgICBjb25zdCByYWRpdXNTcSA9IGNpcmNsZS5yYWRpdXMgKiBjaXJjbGUucmFkaXVzO1xyXG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcclxuXHJcbiAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XHJcblxyXG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gaXMgc21hbGxlciB0aGFuIHRoZSByYWRpdXMgdGhlbiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUuXHJcbiAgICByZXR1cm4gZGlzdGFuY2VTcSA8PSByYWRpdXNTcTtcclxuICB9XHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBwb2ludCBpcyBpbnNpZGUgYSBjaXJjbGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHBvaW50IFRoZSBwb2ludCB0byB0ZXN0LlxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBjaXJjbGUgVGhlIGNpcmNsZSB0byB0ZXN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgY2lyY2xlIG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICBwb2ludEluRWxsaXBzZShwb2ludDogVmVjdG9yLCBlbGxpcHNlOiBFbGxpcHNlKTogYm9vbGVhbiB7XHJcbiAgICBjb25zdCB2ZWN0b3IgPSB0aGlzLl9UX1ZFQ1RPUlMucG9wKCkhLmNvcHkocG9pbnQpLnN1YihlbGxpcHNlLnBvc2l0aW9uKS5zdWIoZWxsaXBzZS5vZmZzZXQpO1xyXG5cclxuXHQgIGNvbnN0IHdpZHRoU3EgPSBlbGxpcHNlLndpZHRoKmVsbGlwc2Uud2lkdGhcclxuXHQgIGNvbnN0IGhlaWdodFNxID0gZWxsaXBzZS5oZWlnaHQqZWxsaXBzZS5oZWlnaHRcclxuICAgIGNvbnN0IHBvaW50WFNxID0gdmVjdG9yLngqdmVjdG9yLng7XHJcbiAgICBjb25zdCBwb2ludFlTcSA9IHZlY3Rvci55KnZlY3Rvci55O1xyXG5cclxuICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKHZlY3Rvcik7XHJcbiAgICAvLyBJZiB0aGUgcmVzdWx0IGRpc3RhbmNlIGlzIHNtYWxsZXIgdGhhbiAxIHRoZSBwb2ludCBpdHMgaW5zaWRlIHRoZSBlbGxpcHNlXHJcblx0ICByZXR1cm4gKChwb2ludFhTcSkvKHdpZHRoU3EpKyhwb2ludFlTcSkvKGhlaWdodFNxKTw9MSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNvbnZleCBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24gdG8gdGVzdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIHBvbHlnb24gb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHBvaW50SW5Qb2x5Z29uKHBvaW50OiBWZWN0b3IsIHBvbHlnb246IFBvbHlnb24pOiBib29sZWFuIHtcclxuICAgIHRoaXMuX1RFU1RfUE9JTlQucG9zaXRpb24uY29weShwb2ludCk7XHJcbiAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmNsZWFyKCk7XHJcblxyXG4gICAgbGV0IHJlc3VsdDogKGJvb2xlYW4gfCBDb2xsaXNpb25EZXRhaWxzKSA9IHRoaXMudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMuX1RFU1RfUE9JTlQsIHBvbHlnb24sIHRydWUpO1xyXG5cclxuICAgIGlmIChyZXN1bHQpIHJlc3VsdCA9IHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYUluQjtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgdHdvIGNpcmNsZXMgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYSBUaGUgZmlyc3QgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBiIFRoZSBzZWNvbmQgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RldGFpbHM9ZmFsc2VdIElmIHNldCB0byB0cnVlIGFuZCB0aGVyZSBpcyBhIGNvbGxpc2lvbiwgYW4gb2JqZWN0IGhpZ2hsaWdodGluZyBkZXRhaWxzIGFib3V0IHRoZSBjb2xsaXNpb24gd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIGp1c3QgcmV0dXJuaW5nIHRydWUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgY2lyY2xlcyBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHRlc3RDaXJjbGVDaXJjbGUoYTogQ2lyY2xlLCBiOiBDaXJjbGUsIGRldGFpbHM6IGJvb2xlYW4gPSBmYWxzZSk6IChib29sZWFuIHwgQ29sbGlzaW9uRGV0YWlscykge1xyXG4gICAgLy8gQ2hlY2sgaWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlcnMgb2YgdGhlIHR3byBjaXJjbGVzIGlzIGdyZWF0ZXIgdGhhbiB0aGVpciBjb21iaW5lZCByYWRpdXMuXHJcbiAgICBjb25zdCBkaWZmZXJlbmNlViA9IHRoaXMuX1RfVkVDVE9SUy5wb3AoKSEuY29weShiLnBvc2l0aW9uKS5hZGQoYi5vZmZzZXQpLnN1YihhLnBvc2l0aW9uKS5zdWIoYS5vZmZzZXQpO1xyXG5cclxuICAgIGNvbnN0IHRvdGFsUmFkaXVzID0gYS5yYWRpdXMgKyBiLnJhZGl1cztcclxuICAgIGNvbnN0IHRvdGFsUmFkaXVzU3EgPSB0b3RhbFJhZGl1cyAqIHRvdGFsUmFkaXVzO1xyXG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcclxuXHJcbiAgICAvLyBJZiB0aGUgZGlzdGFuY2UgaXMgYmlnZ2VyIHRoYW4gdGhlIGNvbWJpbmVkIHJhZGl1cywgdGhleSBkb24ndCBpbnRlcnNlY3QuXHJcbiAgICBpZiAoZGlzdGFuY2VTcSA+IHRvdGFsUmFkaXVzU3EpIHtcclxuICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkZXRhaWxzKSB7XHJcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuY2xlYXIoKTtcclxuXHJcbiAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZGlzdGFuY2VTcSk7XHJcblxyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmEgPSBhO1xyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmIgPSBiO1xyXG5cclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwID0gdG90YWxSYWRpdXMgLSBkaXN0O1xyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXBOLmNvcHkoZGlmZmVyZW5jZVYubm9ybWFsaXplKCkpO1xyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXBWLmNvcHkoZGlmZmVyZW5jZVYpLnNjYWxlKHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcCk7XHJcblxyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmFJbkIgPSBhLnJhZGl1cyA8PSBiLnJhZGl1cyAmJiBkaXN0IDw9IGIucmFkaXVzIC0gYS5yYWRpdXM7XHJcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYkluQSA9IGIucmFkaXVzIDw9IGEucmFkaXVzICYmIGRpc3QgPD0gYS5yYWRpdXMgLSBiLnJhZGl1cztcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGRpZmZlcmVuY2VWKTtcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrcyB3aGV0aGVyIHBvbHlnb25zIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBhIFRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gYiBUaGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbZGV0YWlscz1mYWxzZV0gSWYgc2V0IHRvIHRydWUgYW5kIHRoZXJlIGlzIGEgY29sbGlzaW9uLCBhbiBvYmplY3QgaGlnaGxpZ2h0aW5nIGRldGFpbHMgYWJvdXQgdGhlIGNvbGxpc2lvbiB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2YganVzdCByZXR1cm5pbmcgdHJ1ZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICB0ZXN0UG9seWdvblBvbHlnb24oYTogUG9seWdvbiwgYjogUG9seWdvbiwgZGV0YWlsczogYm9vbGVhbiA9IGZhbHNlKTogKGJvb2xlYW4gfCBDb2xsaXNpb25EZXRhaWxzKSB7XHJcbiAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmNsZWFyKCk7XHJcblxyXG4gICAgY29uc3QgYVBvaW50cyA9IGEuY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGFMZW4gPSBhUG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBjb25zdCBiUG9pbnRzID0gYi5jYWxjUG9pbnRzO1xyXG4gICAgY29uc3QgYkxlbiA9IGJQb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYUxlbjsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLl9pc1NlcGFyYXRpbmdBeGlzKGEucG9zaXRpb24sIGIucG9zaXRpb24sIGFQb2ludHMsIGJQb2ludHMsIGEubm9ybWFsc1tpXSwgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUykpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBhbnkgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBCIGlzIGEgc2VwYXJhdGluZyBheGlzLCBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJMZW47IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5faXNTZXBhcmF0aW5nQXhpcyhhLnBvc2l0aW9uLCBiLnBvc2l0aW9uLCBhUG9pbnRzLCBiUG9pbnRzLCBiLm5vcm1hbHNbaV0sIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2luY2Ugbm9uZSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEEgb3IgQiBhcmUgYSBzZXBhcmF0aW5nIGF4aXMsIHRoZXJlIGlzIGFuIGludGVyc2VjdGlvblxyXG4gICAgLy8gYW5kIHdlJ3ZlIGFscmVhZHkgY2FsY3VsYXRlZCB0aGUgc21hbGxlc3Qgb3ZlcmxhcCAoaW4gaXNTZXBhcmF0aW5nQXhpcykuIFxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3Rvci5cclxuICAgIGlmIChkZXRhaWxzKSB7XHJcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYSA9IGE7XHJcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYiA9IGI7XHJcblxyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXBWLmNvcHkodGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwTikuc2NhbGUodGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwKTtcclxuXHJcbiAgICAgIHJldHVybiB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBwb2x5Z29uIGFuZCBhIGNpcmNsZSBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbZGV0YWlscz1mYWxzZV0gSWYgc2V0IHRvIHRydWUgYW5kIHRoZXJlIGlzIGEgY29sbGlzaW9uLCBhbiBvYmplY3QgaGlnaGxpZ2h0aW5nIGRldGFpbHMgYWJvdXQgdGhlIGNvbGxpc2lvbiB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2YganVzdCByZXR1cm5pbmcgdHJ1ZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICB0ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uOiBQb2x5Z29uLCBjaXJjbGU6IENpcmNsZSwgZGV0YWlsczogYm9vbGVhbiA9IGZhbHNlKTogKGJvb2xlYW4gfCBDb2xsaXNpb25EZXRhaWxzKSB7XHJcbiAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmNsZWFyKCk7XHJcblxyXG4gICAgLy8gR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBwb2x5Z29uLlxyXG4gICAgY29uc3QgY2lyY2xlUG9zID0gdGhpcy5fVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGNpcmNsZS5wb3NpdGlvbikuYWRkKGNpcmNsZS5vZmZzZXQpLnN1Yihwb2x5Z29uLnBvc2l0aW9uKTtcclxuXHJcbiAgICBjb25zdCByYWRpdXMgPSBjaXJjbGUucmFkaXVzO1xyXG4gICAgY29uc3QgcmFkaXVzMiA9IHJhZGl1cyAqIHJhZGl1cztcclxuXHJcbiAgICBjb25zdCBwb2ludHMgPSBwb2x5Z29uLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBsZW4gPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGNvbnN0IGVkZ2UgPSB0aGlzLl9UX1ZFQ1RPUlMucG9wKCkhO1xyXG4gICAgY29uc3QgcG9pbnQgPSB0aGlzLl9UX1ZFQ1RPUlMucG9wKCkhO1xyXG5cclxuICAgIC8vIEZvciBlYWNoIGVkZ2UgaW4gdGhlIHBvbHlnb246XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IG5leHQgPSBpID09PSBsZW4gLSAxID8gMCA6IGkgKyAxO1xyXG4gICAgICBjb25zdCBwcmV2ID0gaSA9PT0gMCA/IGxlbiAtIDEgOiBpIC0gMTtcclxuXHJcbiAgICAgIGxldCBvdmVybGFwID0gMDtcclxuICAgICAgbGV0IG92ZXJsYXBOID0gbnVsbDtcclxuXHJcbiAgICAgIC8vIEdldCB0aGUgZWRnZS5cclxuICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbaV0pO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIGVkZ2UuXHJcbiAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW2ldKTtcclxuXHJcbiAgICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBhbmQgdGhlIHBvaW50IGlzIGJpZ2dlciB0aGFuIHRoZSByYWRpdXMsIHRoZSBwb2x5Z29uIGlzIGRlZmluaXRlbHkgbm90IGZ1bGx5IGluIHRoZSBjaXJjbGUuXHJcbiAgICAgIGlmIChkZXRhaWxzICYmIHBvaW50LmxlbjIoKSA+IHJhZGl1czIpIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYUluQiA9IGZhbHNlO1xyXG5cclxuICAgICAgLy8gQ2FsY3VsYXRlIHdoaWNoIFZvcm9ub2kgcmVnaW9uIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBpcyBpbi5cclxuICAgICAgbGV0IHJlZ2lvbiA9IHRoaXMuX3Zvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xyXG5cclxuICAgICAgLy8gSWYgaXQncyB0aGUgbGVmdCByZWdpb246XHJcbiAgICAgIGlmIChyZWdpb24gPT09IHRoaXMuX0xFRlRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgUklHSFRfVk9ST05PSV9SRUdJT04gb2YgdGhlIHByZXZpb3VzIGVkZ2UuXHJcbiAgICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbcHJldl0pO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgcHJldmlvdXMgZWRnZVxyXG4gICAgICAgIGNvbnN0IHBvaW50MiA9IHRoaXMuX1RfVkVDVE9SUy5wb3AoKSEuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbcHJldl0pO1xyXG5cclxuICAgICAgICByZWdpb24gPSB0aGlzLl92b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50Mik7XHJcblxyXG4gICAgICAgIGlmIChyZWdpb24gPT09IHRoaXMuX1JJR0hUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXHJcbiAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQubGVuKCk7XHJcblxyXG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcclxuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKHBvaW50Mik7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGRldGFpbHMpIHtcclxuICAgICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgICAgICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmJJbkEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcclxuXHJcbiAgICAgICAgLy8gSWYgaXQncyB0aGUgcmlnaHQgcmVnaW9uOlxyXG4gICAgICB9IGVsc2UgaWYgKHJlZ2lvbiA9PT0gdGhpcy5fUklHSFRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgbGVmdCByZWdpb24gb24gdGhlIG5leHQgZWRnZVxyXG4gICAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW25leHRdKTtcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgc3RhcnRpbmcgcG9pbnQgb2YgdGhlIG5leHQgZWRnZS5cclxuICAgICAgICBwb2ludC5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1tuZXh0XSk7XHJcblxyXG4gICAgICAgIHJlZ2lvbiA9IHRoaXMuX3Zvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xyXG5cclxuICAgICAgICBpZiAocmVnaW9uID09PSB0aGlzLl9MRUZUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgICAvLyBJdCdzIGluIHRoZSByZWdpb24gd2Ugd2FudC4gIENoZWNrIGlmIHRoZSBjaXJjbGUgaW50ZXJzZWN0cyB0aGUgcG9pbnQuXHJcbiAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQubGVuKCk7XHJcblxyXG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcclxuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGRldGFpbHMpIHtcclxuICAgICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgICAgICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmJJbkEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBPdGhlcndpc2UsIGl0J3MgdGhlIG1pZGRsZSByZWdpb246XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gTmVlZCB0byBjaGVjayBpZiB0aGUgY2lyY2xlIGlzIGludGVyc2VjdGluZyB0aGUgZWRnZSwgY2hhbmdlIHRoZSBlZGdlIGludG8gaXRzIFwiZWRnZSBub3JtYWxcIi5cclxuICAgICAgICBjb25zdCBub3JtYWwgPSBlZGdlLnBlcnAoKS5ub3JtYWxpemUoKTtcclxuXHJcbiAgICAgICAgLy8gRmluZCB0aGUgcGVycGVuZGljdWxhciBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmNsZSBhbmQgdGhlIGVkZ2UuXHJcbiAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmRvdChub3JtYWwpO1xyXG4gICAgICAgIGNvbnN0IGRpc3RBYnMgPSBNYXRoLmFicyhkaXN0KTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgdGhlcmUgaXMgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgICAgIGlmIChkaXN0ID4gMCAmJiBkaXN0QWJzID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChub3JtYWwpO1xyXG4gICAgICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG5cclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRldGFpbHMpIHtcclxuICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgIG92ZXJsYXBOID0gbm9ybWFsO1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcblxyXG4gICAgICAgICAgLy8gSWYgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCBvciBwYXJ0IG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUsIHRoZSBjaXJjbGUgaXMgbm90IGZ1bGx5IGluc2lkZSB0aGUgcG9seWdvbi5cclxuICAgICAgICAgIGlmIChkaXN0ID49IDAgfHwgb3ZlcmxhcCA8IDIgKiByYWRpdXMpIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYkluQSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgc21hbGxlc3Qgb3ZlcmxhcCB3ZSd2ZSBzZWVuLCBrZWVwIGl0LlxyXG4gICAgICAvLyAob3ZlcmxhcE4gbWF5IGJlIG51bGwgaWYgdGhlIGNpcmNsZSB3YXMgaW4gdGhlIHdyb25nIFZvcm9ub2kgcmVnaW9uKS5cclxuICAgICAgaWYgKG92ZXJsYXBOICYmIGRldGFpbHMgJiYgTWF0aC5hYnMob3ZlcmxhcCkgPCBNYXRoLmFicyh0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXApKSB7XHJcbiAgICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwID0gb3ZlcmxhcDtcclxuICAgICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXBOLmNvcHkob3ZlcmxhcE4pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3RvciAtIGJhc2VkIG9uIHRoZSBzbWFsbGVzdCBvdmVybGFwLlxyXG4gICAgaWYgKGRldGFpbHMpIHtcclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5hID0gcG9seWdvbjtcclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5iID0gY2lyY2xlO1xyXG5cclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwVi5jb3B5KHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcE4pLnNjYWxlKHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgdGhpcy5fVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG5cclxuICAgIGlmIChkZXRhaWxzKSByZXR1cm4gdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUztcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgY2lyY2xlIGFuZCBhIHBvbHlnb24gY29sbGlkZS5cclxuICAgKiBcclxuICAgKiAqKk5PVEU6KiogVGhpcyBpcyBzbGlnaHRseSBsZXNzIGVmZmljaWVudCB0aGFuIHBvbHlnb25DaXJjbGUgYXMgaXQganVzdCBydW5zIHBvbHlnb25DaXJjbGUgYW5kIHJldmVyc2VzIGV2ZXJ5dGhpbmdcclxuICAgKiBhdCB0aGUgZW5kLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBjaXJjbGUgVGhlIGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbZGV0YWlscz1mYWxzZV0gSWYgc2V0IHRvIHRydWUgYW5kIHRoZXJlIGlzIGEgY29sbGlzaW9uLCBhbiBvYmplY3QgaGlnaGxpZ2h0aW5nIGRldGFpbHMgYWJvdXQgdGhlIGNvbGxpc2lvbiB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2YganVzdCByZXR1cm5pbmcgdHJ1ZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICB0ZXN0Q2lyY2xlUG9seWdvbihjaXJjbGU6IENpcmNsZSwgcG9seWdvbjogUG9seWdvbiwgZGV0YWlsczogYm9vbGVhbiA9IGZhbHNlKTogKGJvb2xlYW4gfCBDb2xsaXNpb25EZXRhaWxzKSB7XHJcbiAgICAvLyBUZXN0IHRoZSBwb2x5Z29uIGFnYWluc3QgdGhlIGNpcmNsZS5cclxuICAgIGNvbnN0IHJlc3VsdDogKGJvb2xlYW4gfCBDb2xsaXNpb25EZXRhaWxzKSA9IHRoaXMudGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCBkZXRhaWxzKTtcclxuXHJcbiAgICBpZiAocmVzdWx0ICYmIGRldGFpbHMpIHtcclxuICAgICAgY29uc3QgY29sbGlzaW9uRGV0YWlscyA9IHJlc3VsdCBhcyBDb2xsaXNpb25EZXRhaWxzO1xyXG5cclxuICAgICAgLy8gU3dhcCBBIGFuZCBCIGluIHRoZSBjb2xsaXNpb24gZGV0YWlscy5cclxuICAgICAgY29uc3QgYSA9IGNvbGxpc2lvbkRldGFpbHMuYTtcclxuICAgICAgY29uc3QgYUluQiA9IGNvbGxpc2lvbkRldGFpbHMuYUluQjtcclxuXHJcbiAgICAgIGNvbGxpc2lvbkRldGFpbHMub3ZlcmxhcE4ucmV2ZXJzZSgpO1xyXG4gICAgICBjb2xsaXNpb25EZXRhaWxzLm92ZXJsYXBWLnJldmVyc2UoKTtcclxuXHJcbiAgICAgIGNvbGxpc2lvbkRldGFpbHMuYSA9IGNvbGxpc2lvbkRldGFpbHMuYjtcclxuICAgICAgY29sbGlzaW9uRGV0YWlscy5iID0gYTtcclxuXHJcbiAgICAgIGNvbGxpc2lvbkRldGFpbHMuYUluQiA9IGNvbGxpc2lvbkRldGFpbHMuYkluQTtcclxuICAgICAgY29sbGlzaW9uRGV0YWlscy5iSW5BID0gYUluQjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgd2hldGhlciB0d28gY29udmV4IHBvbHlnb25zIGFyZSBzZXBhcmF0ZWQgYnkgdGhlIHNwZWNpZmllZCBheGlzIChtdXN0IGJlIGEgdW5pdCB2ZWN0b3IpLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGFQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBiUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBhUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBiUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIHNlY29uZCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBheGlzICh1bml0IHNpemVkKSB0byB0ZXN0IGFnYWluc3QuICBUaGUgcG9pbnRzIG9mIGJvdGggcG9seWdvbnMgd2lsbCBiZSBwcm9qZWN0ZWQgb250byB0aGlzIGF4aXMuXHJcbiAgICogQHBhcmFtIHtDb2xsaXNpb25EZXRhaWxzfSBjb2xsaXNpb25EZXRhaWxzIEEgQ29sbGlzaW9uRGV0YWlscyBvYmplY3QgKG9wdGlvbmFsKSB3aGljaCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGUgYXhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBpdCBpcyBhIHNlcGFyYXRpbmcgYXhpcywgZmFsc2Ugb3RoZXJ3aXNlLiAgSWYgZmFsc2UsIGFuZCBhIENvbGxpc2lvbkRldGFpbHMgaXMgcGFzc2VkIGluLCBpbmZvcm1hdGlvbiBhYm91dCBob3cgbXVjaCBvdmVybGFwIGFuZCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBvdmVybGFwIHdpbGwgYmUgcG9wdWxhdGVkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2lzU2VwYXJhdGluZ0F4aXMoYVBvczogVmVjdG9yLCBiUG9zOiBWZWN0b3IsIGFQb2ludHM6IEFycmF5PFZlY3Rvcj4sIGJQb2ludHM6IEFycmF5PFZlY3Rvcj4sIGF4aXM6IFZlY3RvciwgY29sbGlzaW9uRGV0YWlscz86IENvbGxpc2lvbkRldGFpbHMpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHJhbmdlQSA9IHRoaXMuX1RfQVJSQVlTLnBvcCgpITtcclxuICAgIGNvbnN0IHJhbmdlQiA9IHRoaXMuX1RfQVJSQVlTLnBvcCgpITtcclxuXHJcbiAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBvZmZzZXQgYmV0d2VlbiB0aGUgdHdvIHBvbHlnb25zXHJcbiAgICBjb25zdCBvZmZzZXRWID0gdGhpcy5fVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGJQb3MpLnN1YihhUG9zKTtcclxuICAgIGNvbnN0IHByb2plY3RlZE9mZnNldCA9IG9mZnNldFYuZG90KGF4aXMpO1xyXG5cclxuICAgIC8vIFByb2plY3QgdGhlIHBvbHlnb25zIG9udG8gdGhlIGF4aXMuXHJcbiAgICB0aGlzLl9mbGF0dGVuUG9pbnRzT24oYVBvaW50cywgYXhpcywgcmFuZ2VBKTtcclxuICAgIHRoaXMuX2ZsYXR0ZW5Qb2ludHNPbihiUG9pbnRzLCBheGlzLCByYW5nZUIpO1xyXG5cclxuICAgIC8vIE1vdmUgQidzIHJhbmdlIHRvIGl0cyBwb3NpdGlvbiByZWxhdGl2ZSB0byBBLlxyXG4gICAgcmFuZ2VCWzBdICs9IHByb2plY3RlZE9mZnNldDtcclxuICAgIHJhbmdlQlsxXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYSBnYXAuIElmIHRoZXJlIGlzLCB0aGlzIGlzIGEgc2VwYXJhdGluZyBheGlzIGFuZCB3ZSBjYW4gc3RvcFxyXG4gICAgaWYgKHJhbmdlQVswXSA+IHJhbmdlQlsxXSB8fCByYW5nZUJbMF0gPiByYW5nZUFbMV0pIHtcclxuICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2gob2Zmc2V0Vik7XHJcblxyXG4gICAgICB0aGlzLl9UX0FSUkFZUy5wdXNoKHJhbmdlQSk7XHJcbiAgICAgIHRoaXMuX1RfQVJSQVlTLnB1c2gocmFuZ2VCKTtcclxuXHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoaXMgaXMgbm90IGEgc2VwYXJhdGluZyBheGlzLiBJZiB3ZSdyZSBjYWxjdWxhdGluZyBjb2xsaXNpb24gZGV0YWlscywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgaWYgKGNvbGxpc2lvbkRldGFpbHMpIHtcclxuICAgICAgbGV0IG92ZXJsYXAgPSAwO1xyXG5cclxuICAgICAgLy8gQSBzdGFydHMgZnVydGhlciBsZWZ0IHRoYW4gQlxyXG4gICAgICBpZiAocmFuZ2VBWzBdIDwgcmFuZ2VCWzBdKSB7XHJcbiAgICAgICAgY29sbGlzaW9uRGV0YWlscy5hSW5CID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIEEgZW5kcyBiZWZvcmUgQiBkb2VzLiBXZSBoYXZlIHRvIHB1bGwgQSBvdXQgb2YgQlxyXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPCByYW5nZUJbMV0pIHtcclxuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XHJcblxyXG4gICAgICAgICAgY29sbGlzaW9uRGV0YWlscy5iSW5BID0gZmFsc2U7XHJcbiAgICAgICAgICAvLyBCIGlzIGZ1bGx5IGluc2lkZSBBLiAgUGljayB0aGUgc2hvcnRlc3Qgd2F5IG91dC5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XHJcblxyXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBCIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBBXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29sbGlzaW9uRGV0YWlscy5iSW5BID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIEIgZW5kcyBiZWZvcmUgQSBlbmRzLiBXZSBoYXZlIHRvIHB1c2ggQSBvdXQgb2YgQlxyXG4gICAgICAgIGlmIChyYW5nZUFbMV0gPiByYW5nZUJbMV0pIHtcclxuICAgICAgICAgIG92ZXJsYXAgPSByYW5nZUFbMF0gLSByYW5nZUJbMV07XHJcblxyXG4gICAgICAgICAgY29sbGlzaW9uRGV0YWlscy5hSW5CID0gZmFsc2U7XHJcbiAgICAgICAgICAvLyBBIGlzIGZ1bGx5IGluc2lkZSBCLiAgUGljayB0aGUgc2hvcnRlc3Qgd2F5IG91dC5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMSA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjIgPSByYW5nZUJbMV0gLSByYW5nZUFbMF07XHJcblxyXG4gICAgICAgICAgb3ZlcmxhcCA9IG9wdGlvbjEgPCBvcHRpb24yID8gb3B0aW9uMSA6IC1vcHRpb24yO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgc21hbGxlc3QgYW1vdW50IG9mIG92ZXJsYXAgd2UndmUgc2VlbiBzbyBmYXIsIHNldCBpdCBhcyB0aGUgbWluaW11bSBvdmVybGFwLlxyXG4gICAgICBjb25zdCBhYnNPdmVybGFwID0gTWF0aC5hYnMob3ZlcmxhcCk7XHJcblxyXG4gICAgICBpZiAoYWJzT3ZlcmxhcCA8IGNvbGxpc2lvbkRldGFpbHMub3ZlcmxhcCkge1xyXG4gICAgICAgIGNvbGxpc2lvbkRldGFpbHMub3ZlcmxhcCA9IGFic092ZXJsYXA7XHJcbiAgICAgICAgY29sbGlzaW9uRGV0YWlscy5vdmVybGFwTi5jb3B5KGF4aXMpO1xyXG5cclxuICAgICAgICBpZiAob3ZlcmxhcCA8IDApIGNvbGxpc2lvbkRldGFpbHMub3ZlcmxhcE4ucmV2ZXJzZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fVF9WRUNUT1JTLnB1c2gob2Zmc2V0Vik7XHJcblxyXG4gICAgdGhpcy5fVF9BUlJBWVMucHVzaChyYW5nZUEpO1xyXG4gICAgdGhpcy5fVF9BUlJBWVMucHVzaChyYW5nZUIpO1xyXG5cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZsYXR0ZW5zIHRoZSBzcGVjaWZpZWQgYXJyYXkgb2YgcG9pbnRzIG9udG8gYSB1bml0IHZlY3RvciBheGlzIHJlc3VsdGluZyBpbiBhIG9uZSBkaW1lbnNpb25zbFxyXG4gICAqIHJhbmdlIG9mIHRoZSBtaW5pbXVtIGFuZCBtYXhpbXVtIHZhbHVlIG9uIHRoYXQgYXhpcy5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIFRoZSBwb2ludHMgdG8gZmxhdHRlbi5cclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gbm9ybWFsIFRoZSB1bml0IHZlY3RvciBheGlzIHRvIGZsYXR0ZW4gb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxudW1iZXI+fSByZXN1bHQgQW4gYXJyYXkuIEFmdGVyIGNhbGxpbmcgdGhpcyBmdW5jdGlvbiwgcmVzdWx0WzBdIHdpbGwgYmUgdGhlIG1pbmltdW0gdmFsdWUsIHJlc3VsdFsxXSB3aWxsIGJlIHRoZSBtYXhpbXVtIHZhbHVlLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2ZsYXR0ZW5Qb2ludHNPbihwb2ludHM6IEFycmF5PFZlY3Rvcj4sIG5vcm1hbDogVmVjdG9yLCByZXN1bHQ6IEFycmF5PG51bWJlcj4pIHtcclxuICAgIGxldCBtaW4gPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgbGV0IG1heCA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBwcm9qZWN0aW9uIG9mIHRoZSBwb2ludCBvbnRvIHRoZSBub3JtYWwuXHJcbiAgICAgIGNvbnN0IGRvdCA9IHBvaW50c1tpXS5kb3Qobm9ybWFsKTtcclxuXHJcbiAgICAgIGlmIChkb3QgPCBtaW4pIG1pbiA9IGRvdDtcclxuICAgICAgaWYgKGRvdCA+IG1heCkgbWF4ID0gZG90O1xyXG4gICAgfVxyXG5cclxuICAgIHJlc3VsdFswXSA9IG1pbjtcclxuICAgIHJlc3VsdFsxXSA9IG1heDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENhbGN1bGF0ZXMgd2hpY2ggVm9yb25vaSByZWdpb24gYSBwb2ludCBpcyBvbiBhIGxpbmUgc2VnbWVudC5cclxuICAgKiBcclxuICAgKiBJdCBpcyBhc3N1bWVkIHRoYXQgYm90aCB0aGUgbGluZSBhbmQgdGhlIHBvaW50IGFyZSByZWxhdGl2ZSB0byBgKDAsMClgXHJcbiAgICogXHJcbiAgICogICAgICAgICAgICAgfCAgICAgICAoMCkgICAgICB8XHJcbiAgICogICAgICAoLTEpICBbU10tLS0tLS0tLS0tLS0tLVtFXSAgKDEpXHJcbiAgICogICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gbGluZSBUaGUgbGluZSBzZWdtZW50LlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQuXHJcbiAgICogQHJldHVybiB7bnVtYmVyfSBMRUZUX1ZPUk9OT0lfUkVHSU9OICgtMSkgaWYgaXQgaXMgdGhlIGxlZnQgcmVnaW9uLFxyXG4gICAqICAgICAgICAgICAgICAgICAgTUlERExFX1ZPUk9OT0lfUkVHSU9OICgwKSBpZiBpdCBpcyB0aGUgbWlkZGxlIHJlZ2lvbixcclxuICAgKiAgICAgICAgICAgICAgICAgIFJJR0hUX1ZPUk9OT0lfUkVHSU9OICgxKSBpZiBpdCBpcyB0aGUgcmlnaHQgcmVnaW9uLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3Zvcm9ub2lSZWdpb24obGluZTogVmVjdG9yLCBwb2ludDogVmVjdG9yKTogbnVtYmVyIHtcclxuICAgIGNvbnN0IGxlbjIgPSBsaW5lLmxlbjIoKTtcclxuICAgIGNvbnN0IGRwID0gcG9pbnQuZG90KGxpbmUpO1xyXG5cclxuICAgIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIHN0YXJ0IG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGUgbGVmdCB2b3Jvbm9pIHJlZ2lvbi5cclxuICAgIGlmIChkcCA8IDApIHJldHVybiB0aGlzLl9MRUZUX1ZPUk9OT0lfUkVHSU9OO1xyXG5cclxuICAgIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIGVuZCBvZiB0aGUgbGluZSwgaXQgaXMgaW4gdGhlIHJpZ2h0IHZvcm9ub2kgcmVnaW9uLlxyXG4gICAgZWxzZSBpZiAoZHAgPiBsZW4yKSByZXR1cm4gdGhpcy5fUklHSFRfVk9ST05PSV9SRUdJT047XHJcblxyXG4gICAgLy8gT3RoZXJ3aXNlLCBpdCdzIGluIHRoZSBtaWRkbGUgb25lLlxyXG4gICAgZWxzZSByZXR1cm4gdGhpcy5fTUlERExFX1ZPUk9OT0lfUkVHSU9OO1xyXG4gIH1cclxufSJdfQ==