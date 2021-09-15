'use strict'

import Box from './box';
import Vector from './vector';
import Polygon from './polygon';

/**
 * Represents a ellipse with a position, width and height.
 * 
 * Creates a new ellipse, optionally passing in a position and/or width and height. If no position is given, the ellipse will be at `(0,0)`. 
 * 
 * If no width or height is provided the ellipse will have its values set to 0.
 */
export default class Ellipse {
  /**
   * A Vector representing the center point of this ellipse.
   * 
   * @private
   * 
   * @property {Vector}
   */
  private _position: Vector = new Vector();

  /**
   * The width of this ellipse.
   * 
   * @private
   * 
   * @property {number}
   */
  private _width: number = 0;

  /**
   * The height of this ellipse.
   * 
   * @private
   * 
   * @property {number}
   */
  private _height: number = 0;

  /**
   * The offset of this ellipse.
   * 
   * @private
   * 
   * @property {Vector}
   */
  private _offset: Vector = new Vector();

  /**
   * @param {Vector} position A Vector representing the center of this ellipse.
   * @param {number} width The width of this ellipse. 
   * @param {number} height The height of this ellipse. 
   * @param {Vector} offset The displacement with respect to the center of this ellipse. 
   */
  constructor(position: Vector = new Vector(), width: number = 0, height: number = 0, offset: Vector = new Vector()) {
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
  get position(): Vector { return this._position; }

  /**
   * Returns the width of this ellipse.
   * 
   * @returns {number}
   */
  get width(): number { return this._width; }

  /**
   * Returns the height of this ellipse.
   * 
   * @returns {number}
   */
  get height(): number { return this._height; }

  /**
   * Returns the offset of this ellipse.
   * 
   * @returns {Vector}
   */
  get offset(): Vector { return this._offset; }

  /**
   * Set a new offset for this ellipse.
   * 
   * @param {Vector} offset The new offset for this ellipse.
   */
  set offset(offset: Vector) { this._offset = offset; }

  /**
   * Translate the center of the ellipse
   * 
   * @param {Vector} position A Vector representing the new center of this ellipse.
   */
  translate(x: number, y: number) {
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
  getAABB(): Polygon {
    const corner = this._position.clone().add(this._offset).sub(new Vector(this._width, this._height));
    return new Box(corner, this._width * 2, this._height * 2).toPolygon();
  }

  /**
   * Set the current offset to apply to the radius.
   * 
   * @param {Vector} offset The new offset Vector.
   * 
   * @returns {Circle} Returns this for chaining.
   */
  setOffset(offset: Vector): Ellipse {
    this._offset = offset;
    return this;
  }
}