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
    private _position;
    /**
     * The width of this ellipse.
     *
     * @private
     *
     * @property {number}
     */
    private _width;
    /**
     * The height of this ellipse.
     *
     * @private
     *
     * @property {number}
     */
    private _height;
    /**
     * The offset of this ellipse.
     *
     * @private
     *
     * @property {Vector}
     */
    private _offset;
    /**
     * @param {Vector} position A Vector representing the center of this ellipse.
     * @param {number} width The width of this ellipse.
     * @param {number} height The height of this ellipse.
     * @param {Vector} offset The displacement with respect to the center of this ellipse.
     */
    constructor(position?: Vector, width?: number, height?: number, offset?: Vector);
    /**
     * Returns the position of this ellipse.
     *
     * @returns {Vector}
     */
    get position(): Vector;
    /**
     * Returns the width of this ellipse.
     *
     * @returns {number}
     */
    get width(): number;
    /**
     * Returns the height of this ellipse.
     *
     * @returns {number}
     */
    get height(): number;
    /**
     * Returns the offset of this ellipse.
     *
     * @returns {Vector}
     */
    get offset(): Vector;
    /**
     * Set a new offset for this ellipse.
     *
     * @param {Vector} offset The new offset for this ellipse.
     */
    set offset(offset: Vector);
    /**
     * Translate the center of the ellipse
     *
     * @param {Vector} position A Vector representing the new center of this ellipse.
     */
    translate(x: number, y: number): void;
    /**
     * Compute the axis-aligned bounding box (AABB) of this ellipse.
     *
     * Note: Returns a new `Polygon` each time this is called.
     *
     * @returns {Polygon} Returns the AABB of this ellipse.
     */
    getAABB(): Polygon;
    /**
     * Set the current offset to apply to the radius.
     *
     * @param {Vector} offset The new offset Vector.
     *
     * @returns {Circle} Returns this for chaining.
     */
    setOffset(offset: Vector): Ellipse;
}
