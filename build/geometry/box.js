'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BoxOrigin = void 0;

var _vector = _interopRequireDefault(require("./vector"));

var _polygon = _interopRequireDefault(require("./polygon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * a enum for quick assignment of common origins
 */
var BoxOrigin;
/**
 * A box represents an axis-aligned box with a width and height.
 */

exports.BoxOrigin = BoxOrigin;

(function (BoxOrigin) {
  BoxOrigin[BoxOrigin["center"] = 0] = "center";
  BoxOrigin[BoxOrigin["bottomLeft"] = 1] = "bottomLeft";
  BoxOrigin[BoxOrigin["bottomRight"] = 2] = "bottomRight";
  BoxOrigin[BoxOrigin["topRigth"] = 3] = "topRigth";
  BoxOrigin[BoxOrigin["topLeft"] = 4] = "topLeft";
})(BoxOrigin || (exports.BoxOrigin = BoxOrigin = {}));

var Box = /*#__PURE__*/function () {
  /**
   * The position of this box as a Vector.
   * 
   * @private
   * 
   * @property {Vector}
   */

  /**
   * The width of this box.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The height of this box.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The origin point of this box.
   * 
   * @private
   * 
   * @property {Vector}
   */

  /**
   * Creates a new Box, with the specified position, width, and height.
   * 
   * If no position is given, the position will be `(0, 0)`. If no width or height are given, they will be set to `0`.
   * 
   * @param {Vector} [position=new Vector()] The position of this box as a Vector.
   * @param {number} [width=0] The width of this box.
   * @param {number} [height=0] The height of this box.
   * @param {Vector | BoxOrigin} [origin=BoxOrigin.bottomLeft] the custom point of origin or common point of origin.
   */
  function Box() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _vector["default"]();
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var origin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : BoxOrigin.bottomLeft;

    _classCallCheck(this, Box);

    _defineProperty(this, "_position", new _vector["default"]());

    _defineProperty(this, "_width", 0);

    _defineProperty(this, "_height", 0);

    _defineProperty(this, "_origin", new _vector["default"]());

    this._position = position;
    this._width = width;
    this._height = height;
    this.setOrigin(origin);
  }
  /**
   * The position of this box as a Vector.
   *
   * @returns {Vector}
   */


  _createClass(Box, [{
    key: "position",
    get: function get() {
      return this._position;
    }
    /**
     * The width of this box.
     *
     * @returns {number}
     */

  }, {
    key: "width",
    get: function get() {
      return this._width;
    }
    /**
     * The height of this box.
     *
     * @returns {number}
     */

  }, {
    key: "height",
    get: function get() {
      return this._height;
    }
    /**
     * The origin point of this box.
     *
     * @returns {Vector}
     */

  }, {
    key: "origin",
    get: function get() {
      return this._origin;
    }
    /**
     * set the origin point of this Box.
     * 
     * @param {Vector | BoxOrigin} newOrigin the custom point of origin or common point of origin.
     */

  }, {
    key: "setOrigin",
    value: function setOrigin(newOrigin) {
      this._origin = newOrigin instanceof _vector["default"] ? newOrigin : this._getCommonsOrigin(newOrigin);
    }
    /**
     * Returns a Polygon whose edges are the same as this Box.
     * 
     * @returns {Polygon} A new Polygon that represents this Box.
     */

  }, {
    key: "toPolygon",
    value: function toPolygon() {
      return new _polygon["default"](new _vector["default"](this._position.x, this._position.y), [new _vector["default"]().sub(this._origin), new _vector["default"](this._width, 0).sub(this._origin), new _vector["default"](this._width, this._height).sub(this._origin), new _vector["default"](0, this._height).sub(this._origin)]);
    }
    /**
     * Return the common origin point
     * 
     * @param {BoxOrigin} origin Common origin point type
     * @returns {Vector} Common origin point
     */

  }, {
    key: "_getCommonsOrigin",
    value: function _getCommonsOrigin(origin) {
      var _Origins;

      var Origins = (_Origins = {}, _defineProperty(_Origins, BoxOrigin.center, new _vector["default"](this._width / 2, this._height / 2)), _defineProperty(_Origins, BoxOrigin.bottomLeft, new _vector["default"]()), _defineProperty(_Origins, BoxOrigin.bottomRight, new _vector["default"](this._width, 0)), _defineProperty(_Origins, BoxOrigin.topRigth, new _vector["default"](this._width, this._height)), _defineProperty(_Origins, BoxOrigin.topLeft, new _vector["default"](0, this._height)), _Origins);
      return Origins[origin];
    }
  }]);

  return Box;
}();

exports["default"] = Box;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9ib3gudHMiXSwibmFtZXMiOlsiQm94T3JpZ2luIiwiQm94IiwicG9zaXRpb24iLCJWZWN0b3IiLCJ3aWR0aCIsImhlaWdodCIsIm9yaWdpbiIsImJvdHRvbUxlZnQiLCJfcG9zaXRpb24iLCJfd2lkdGgiLCJfaGVpZ2h0Iiwic2V0T3JpZ2luIiwiX29yaWdpbiIsIm5ld09yaWdpbiIsIl9nZXRDb21tb25zT3JpZ2luIiwiUG9seWdvbiIsIngiLCJ5Iiwic3ViIiwiT3JpZ2lucyIsImNlbnRlciIsImJvdHRvbVJpZ2h0IiwidG9wUmlndGgiLCJ0b3BMZWZ0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7SUFDWUEsUztBQVFaO0FBQ0E7QUFDQTs7OztXQVZZQSxTO0FBQUFBLEVBQUFBLFMsQ0FBQUEsUztBQUFBQSxFQUFBQSxTLENBQUFBLFM7QUFBQUEsRUFBQUEsUyxDQUFBQSxTO0FBQUFBLEVBQUFBLFMsQ0FBQUEsUztBQUFBQSxFQUFBQSxTLENBQUFBLFM7R0FBQUEsUyx5QkFBQUEsUzs7SUFXU0MsRztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLGlCQUF1STtBQUFBLFFBQTNIQyxRQUEySCx1RUFBeEcsSUFBSUMsa0JBQUosRUFBd0c7QUFBQSxRQUExRkMsS0FBMEYsdUVBQTFFLENBQTBFO0FBQUEsUUFBdkVDLE1BQXVFLHVFQUF0RCxDQUFzRDtBQUFBLFFBQW5EQyxNQUFtRCx1RUFBdEJOLFNBQVMsQ0FBQ08sVUFBWTs7QUFBQTs7QUFBQSx1Q0F2QzNHLElBQUlKLGtCQUFKLEVBdUMyRzs7QUFBQSxvQ0E5QjlHLENBOEI4Rzs7QUFBQSxxQ0FyQjdHLENBcUI2Rzs7QUFBQSxxQ0FaN0csSUFBSUEsa0JBQUosRUFZNkc7O0FBQ3JJLFNBQUtLLFNBQUwsR0FBaUJOLFFBQWpCO0FBQ0EsU0FBS08sTUFBTCxHQUFjTCxLQUFkO0FBQ0EsU0FBS00sT0FBTCxHQUFlTCxNQUFmO0FBQ0EsU0FBS00sU0FBTCxDQUFlTCxNQUFmO0FBRUQ7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7OztTQUNFLGVBQXVCO0FBQUUsYUFBTyxLQUFLRSxTQUFaO0FBQXdCO0FBRWpEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7U0FDRSxlQUFtQjtBQUFDLGFBQU8sS0FBS0MsTUFBWjtBQUFvQjtBQUV4QztBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O1NBQ0UsZUFBb0I7QUFBQyxhQUFPLEtBQUtDLE9BQVo7QUFBcUI7QUFFMUM7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7OztTQUNFLGVBQW9CO0FBQUUsYUFBTyxLQUFLRSxPQUFaO0FBQXFCO0FBRTNDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FDRSxtQkFBVUMsU0FBVixFQUE2QztBQUMzQyxXQUFLRCxPQUFMLEdBQWdCQyxTQUFTLFlBQWFWLGtCQUF2QixHQUErQlUsU0FBL0IsR0FBeUMsS0FBS0MsaUJBQUwsQ0FBdUJELFNBQXZCLENBQXhEO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7O1dBQ0UscUJBQXFCO0FBQ25CLGFBQU8sSUFBSUUsbUJBQUosQ0FBWSxJQUFJWixrQkFBSixDQUFXLEtBQUtLLFNBQUwsQ0FBZVEsQ0FBMUIsRUFBNkIsS0FBS1IsU0FBTCxDQUFlUyxDQUE1QyxDQUFaLEVBQTRELENBQ2pFLElBQUlkLGtCQUFKLEdBQWFlLEdBQWIsQ0FBaUIsS0FBS04sT0FBdEIsQ0FEaUUsRUFDakMsSUFBSVQsa0JBQUosQ0FBVyxLQUFLTSxNQUFoQixFQUF3QixDQUF4QixFQUEyQlMsR0FBM0IsQ0FBK0IsS0FBS04sT0FBcEMsQ0FEaUMsRUFFakUsSUFBSVQsa0JBQUosQ0FBVyxLQUFLTSxNQUFoQixFQUF3QixLQUFLQyxPQUE3QixFQUFzQ1EsR0FBdEMsQ0FBMEMsS0FBS04sT0FBL0MsQ0FGaUUsRUFFUixJQUFJVCxrQkFBSixDQUFXLENBQVgsRUFBYyxLQUFLTyxPQUFuQixFQUE0QlEsR0FBNUIsQ0FBZ0MsS0FBS04sT0FBckMsQ0FGUSxDQUE1RCxDQUFQO0FBSUQ7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FDRSwyQkFBNEJOLE1BQTVCLEVBQXFEO0FBQUE7O0FBQ25ELFVBQUlhLE9BQU8sNkNBQ1JuQixTQUFTLENBQUNvQixNQURGLEVBQ1csSUFBSWpCLGtCQUFKLENBQVcsS0FBS00sTUFBTCxHQUFZLENBQXZCLEVBQXlCLEtBQUtDLE9BQUwsR0FBYSxDQUF0QyxDQURYLDZCQUVSVixTQUFTLENBQUNPLFVBRkYsRUFFZSxJQUFJSixrQkFBSixFQUZmLDZCQUdSSCxTQUFTLENBQUNxQixXQUhGLEVBR2dCLElBQUlsQixrQkFBSixDQUFXLEtBQUtNLE1BQWhCLEVBQXVCLENBQXZCLENBSGhCLDZCQUlSVCxTQUFTLENBQUNzQixRQUpGLEVBSWEsSUFBSW5CLGtCQUFKLENBQVcsS0FBS00sTUFBaEIsRUFBdUIsS0FBS0MsT0FBNUIsQ0FKYiw2QkFLUlYsU0FBUyxDQUFDdUIsT0FMRixFQUtZLElBQUlwQixrQkFBSixDQUFXLENBQVgsRUFBYSxLQUFLTyxPQUFsQixDQUxaLFlBQVg7QUFPQSxhQUFPUyxPQUFPLENBQUNiLE1BQUQsQ0FBZDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCBWZWN0b3IgZnJvbSAnLi92ZWN0b3InO1xuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9wb2x5Z29uJztcblxuLyoqXG4gKiBhIGVudW0gZm9yIHF1aWNrIGFzc2lnbm1lbnQgb2YgY29tbW9uIG9yaWdpbnNcbiAqL1xuZXhwb3J0IGVudW0gQm94T3JpZ2luIHtcbiAgY2VudGVyLFxuICBib3R0b21MZWZ0LFxuICBib3R0b21SaWdodCxcbiAgdG9wUmlndGgsXG4gIHRvcExlZnQsXG59XG5cbi8qKlxuICogQSBib3ggcmVwcmVzZW50cyBhbiBheGlzLWFsaWduZWQgYm94IHdpdGggYSB3aWR0aCBhbmQgaGVpZ2h0LlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3gge1xuICAvKipcbiAgICogVGhlIHBvc2l0aW9uIG9mIHRoaXMgYm94IGFzIGEgVmVjdG9yLlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7VmVjdG9yfVxuICAgKi9cbiAgcHJpdmF0ZSBfcG9zaXRpb246IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcblxuICAvKipcbiAgICogVGhlIHdpZHRoIG9mIHRoaXMgYm94LlxuICAgKiBcbiAgICogQHByaXZhdGVcbiAgICogXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxuICAgKi9cbiAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhpcyBib3guXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XG4gICAqL1xuICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlciA9IDA7XG5cbiAgLyoqXG4gICAqIFRoZSBvcmlnaW4gcG9pbnQgb2YgdGhpcyBib3guXG4gICAqIFxuICAgKiBAcHJpdmF0ZVxuICAgKiBcbiAgICogQHByb3BlcnR5IHtWZWN0b3J9XG4gICAqL1xuICAgcHJpdmF0ZSBfb3JpZ2luOlZlY3RvciA9IG5ldyBWZWN0b3IoKTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBCb3gsIHdpdGggdGhlIHNwZWNpZmllZCBwb3NpdGlvbiwgd2lkdGgsIGFuZCBoZWlnaHQuXG4gICAqIFxuICAgKiBJZiBubyBwb3NpdGlvbiBpcyBnaXZlbiwgdGhlIHBvc2l0aW9uIHdpbGwgYmUgYCgwLCAwKWAuIElmIG5vIHdpZHRoIG9yIGhlaWdodCBhcmUgZ2l2ZW4sIHRoZXkgd2lsbCBiZSBzZXQgdG8gYDBgLlxuICAgKiBcbiAgICogQHBhcmFtIHtWZWN0b3J9IFtwb3NpdGlvbj1uZXcgVmVjdG9yKCldIFRoZSBwb3NpdGlvbiBvZiB0aGlzIGJveCBhcyBhIFZlY3Rvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFt3aWR0aD0wXSBUaGUgd2lkdGggb2YgdGhpcyBib3guXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbaGVpZ2h0PTBdIFRoZSBoZWlnaHQgb2YgdGhpcyBib3guXG4gICAqIEBwYXJhbSB7VmVjdG9yIHwgQm94T3JpZ2lufSBbb3JpZ2luPUJveE9yaWdpbi5ib3R0b21MZWZ0XSB0aGUgY3VzdG9tIHBvaW50IG9mIG9yaWdpbiBvciBjb21tb24gcG9pbnQgb2Ygb3JpZ2luLlxuICAgKi9cbiAgY29uc3RydWN0b3IocG9zaXRpb246IFZlY3RvciA9IG5ldyBWZWN0b3IoKSwgd2lkdGg6IG51bWJlciA9IDAsIGhlaWdodDogbnVtYmVyID0gMCwgb3JpZ2luOiBWZWN0b3IgfCBCb3hPcmlnaW4gPSBCb3hPcmlnaW4uYm90dG9tTGVmdCkge1xuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XG4gICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5zZXRPcmlnaW4ob3JpZ2luKTtcbiAgICBcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcG9zaXRpb24gb2YgdGhpcyBib3ggYXMgYSBWZWN0b3IuXG4gICAqXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XG4gICAqL1xuICBnZXQgcG9zaXRpb24oKTogVmVjdG9yIHsgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uOyB9XG5cbiAgLyoqXG4gICAqIFRoZSB3aWR0aCBvZiB0aGlzIGJveC5cbiAgICpcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIGdldCB3aWR0aCgpOm51bWJlciB7cmV0dXJuIHRoaXMuX3dpZHRoO31cblxuICAvKipcbiAgICogVGhlIGhlaWdodCBvZiB0aGlzIGJveC5cbiAgICpcbiAgICogQHJldHVybnMge251bWJlcn1cbiAgICovXG4gIGdldCBoZWlnaHQoKTpudW1iZXIge3JldHVybiB0aGlzLl9oZWlnaHQ7fVxuXG4gIC8qKlxuICAgKiBUaGUgb3JpZ2luIHBvaW50IG9mIHRoaXMgYm94LlxuICAgKlxuICAgKiBAcmV0dXJucyB7VmVjdG9yfVxuICAgKi9cbiAgZ2V0IG9yaWdpbigpOlZlY3RvciB7IHJldHVybiB0aGlzLl9vcmlnaW47fVxuXG4gIC8qKlxuICAgKiBzZXQgdGhlIG9yaWdpbiBwb2ludCBvZiB0aGlzIEJveC5cbiAgICogXG4gICAqIEBwYXJhbSB7VmVjdG9yIHwgQm94T3JpZ2lufSBuZXdPcmlnaW4gdGhlIGN1c3RvbSBwb2ludCBvZiBvcmlnaW4gb3IgY29tbW9uIHBvaW50IG9mIG9yaWdpbi5cbiAgICovXG4gIHNldE9yaWdpbihuZXdPcmlnaW46VmVjdG9yIHwgQm94T3JpZ2luKTp2b2lkIHtcbiAgICB0aGlzLl9vcmlnaW4gPSAobmV3T3JpZ2luIGluc3RhbmNlb2YgIFZlY3Rvcik/bmV3T3JpZ2luOnRoaXMuX2dldENvbW1vbnNPcmlnaW4obmV3T3JpZ2luKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgUG9seWdvbiB3aG9zZSBlZGdlcyBhcmUgdGhlIHNhbWUgYXMgdGhpcyBCb3guXG4gICAqIFxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gQSBuZXcgUG9seWdvbiB0aGF0IHJlcHJlc2VudHMgdGhpcyBCb3guXG4gICAqL1xuICB0b1BvbHlnb24oKTogUG9seWdvbiB7XG4gICAgcmV0dXJuIG5ldyBQb2x5Z29uKG5ldyBWZWN0b3IodGhpcy5fcG9zaXRpb24ueCwgdGhpcy5fcG9zaXRpb24ueSksIFtcbiAgICAgIG5ldyBWZWN0b3IoKS5zdWIodGhpcy5fb3JpZ2luKSwgbmV3IFZlY3Rvcih0aGlzLl93aWR0aCwgMCkuc3ViKHRoaXMuX29yaWdpbiksXG4gICAgICBuZXcgVmVjdG9yKHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpLnN1Yih0aGlzLl9vcmlnaW4pLCBuZXcgVmVjdG9yKDAsIHRoaXMuX2hlaWdodCkuc3ViKHRoaXMuX29yaWdpbilcbiAgICBdKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY29tbW9uIG9yaWdpbiBwb2ludFxuICAgKiBcbiAgICogQHBhcmFtIHtCb3hPcmlnaW59IG9yaWdpbiBDb21tb24gb3JpZ2luIHBvaW50IHR5cGVcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gQ29tbW9uIG9yaWdpbiBwb2ludFxuICAgKi9cbiAgcHJvdGVjdGVkIF9nZXRDb21tb25zT3JpZ2luKG9yaWdpbjpCb3hPcmlnaW4pOlZlY3RvciB7XG4gICAgbGV0IE9yaWdpbnMgPSB7XG4gICAgICBbQm94T3JpZ2luLmNlbnRlcl06IG5ldyBWZWN0b3IodGhpcy5fd2lkdGgvMix0aGlzLl9oZWlnaHQvMiksXG4gICAgICBbQm94T3JpZ2luLmJvdHRvbUxlZnRdOiBuZXcgVmVjdG9yKCksXG4gICAgICBbQm94T3JpZ2luLmJvdHRvbVJpZ2h0XTogbmV3IFZlY3Rvcih0aGlzLl93aWR0aCwwKSxcbiAgICAgIFtCb3hPcmlnaW4udG9wUmlndGhdOiBuZXcgVmVjdG9yKHRoaXMuX3dpZHRoLHRoaXMuX2hlaWdodCksXG4gICAgICBbQm94T3JpZ2luLnRvcExlZnRdOiBuZXcgVmVjdG9yKDAsdGhpcy5faGVpZ2h0KVxuICAgIH07XG4gICAgcmV0dXJuIE9yaWdpbnNbb3JpZ2luXTtcbiAgfVxufSJdfQ==