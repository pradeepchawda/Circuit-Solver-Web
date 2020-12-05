/**********************************************************************
 * Project           : Circuit Solver
 * File		        : RectF.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A Rectangle class to keep track of the bounds of an object located on the
 *                   html canvas. Note: "F" stands for float.
 *
 * Copyright PHASORSYSTEMS, 2019. All Rights Reserved.
 * UNPUBLISHED, LICENSED SOFTWARE.
 *
 * CONFIDENTIAL AND PROPRIETARY INFORMATION
 * WHICH IS THE PROPERTY OF PHASORSYSTEMS.
 *
 * Revision History  :
 *
 * Date        Author      	Ref    Revision (Date in YYYYMMDD format)
 * 20190928    nboatengc     1      Initial Commit.
 *
 ***********************************************************************/
class RectF {
	/* left, top, right, and bottom of the rectangle */
	public left: number;
	public top: number;
	public right: number;
	public bottom: number;
	/* A flag to show if the rectangle is anchored or not */
	public anchored: Boolean;
	/* Temporary variable to handle settings the center of the rectangle */
	private temp_width: number;
	private temp_height: number;

	private last_left: number;
	private last_right: number;
	private last_top: number;
	private last_bottom: number;

	private last_center_x: number;
	private last_center_y: number;
	private last_width: number;
	private last_height: number;

	private w_last_left: number;
	private w_last_right: number;
	private w_last_top: number;
	private w_last_bottom: number;

	constructor(left: number, top: number, right: number, bottom: number) {
		/* left, top, right, and bottom of the rectangle */
		this.left = left;
		this.top = top;
		this.right = right;
		this.bottom = bottom;
		/* A flag to show if the rectangle is anchored or not */
		this.anchored = true;
		/* Temporary variable to handle settings the center of the rectangle */
		this.temp_width = 0;
		this.temp_height = 0;

		this.last_left = -1;
		this.last_right = -1;
		this.last_top = -1;
		this.last_bottom = -1;

		this.last_center_x = -1;
		this.last_center_y = -1;
		this.last_width = -1;
		this.last_height = -1;

		this.w_last_left = -1;
		this.w_last_right = -1;
		this.w_last_top = -1;
		this.w_last_bottom = -1;
	}
	/* Easy method of changing the bounds at once. */
	set_bounds(left: number, top: number, right: number, bottom: number): void {
		this.left = left;
		this.top = top;
		this.right = right;
		this.bottom = bottom;
	}
	/* Handles resizing the RectF Element */
	resize(): void {
		this.left = global.remap_position(this.left, true);
		this.top = global.remap_position(this.top, false);
		this.right = global.remap_position(this.right, true);
		this.bottom = global.remap_position(this.bottom, false);
		this.last_left = -1;
		this.last_right = -1;
		this.last_top = -1;
		this.last_bottom = -1;
		this.last_center_x = -1;
		this.last_center_y = -1;
		this.last_width = -1;
		this.last_height = -1;
		this.w_last_left = -1;
		this.w_last_right = -1;
		this.w_last_top = -1;
		this.w_last_bottom = -1;
	}
	is_near(bounds: RectF, norm_magnitude: number): boolean {
		let norm: number = global.norm(this.get_center_x() - bounds.get_center_x(), this.get_center_y() - bounds.get_center_y());
		if (norm <= norm_magnitude) {
			return true;
		} else {
			return false;
		}
	}
	/* A quick check to see if the rectangle contains an x,y coordinate */
	contains_xy(x: number, y: number): boolean {
		return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom;
	}
	/* A quick check to see if the rectangle contains an x,y coordinate */
	contains_xywh(x: number, y: number, w: number, h: number): boolean {
		let h_prime: number = h * 0.5;
		let w_prime: number = w * 0.5;
		return x >= this.get_center_x() - w_prime && x <= this.get_center_x() + w_prime && y >= this.get_center_y() - h_prime && y <= this.get_center_y() + h_prime;
	}
	/* Set the center of the rectangle, keeping the width and height intact! */
	set_center(x: number, y: number): void {
		this.temp_width = this.get_width() * 0.5;
		this.temp_height = this.get_height() * 0.5;
		this.left = x - this.temp_width;
		this.right = x + this.temp_width;
		this.top = y - this.temp_height;
		this.bottom = y + this.temp_height;
	}
	set_center2(x: number, y: number, w: number, h: number): void {
		this.temp_width = w * 0.5;
		this.temp_height = h * 0.5;
		this.left = x - this.temp_width;
		this.right = x + this.temp_width;
		this.top = y - this.temp_height;
		this.bottom = y + this.temp_height;
	}
	/* Get the center x */
	get_center_x(): number {
		if (this.last_left != this.left || this.last_right != this.right) {
			this.last_left = this.left;
			this.last_right = this.right;
			this.last_center_x = (this.right + this.left) * 0.5;
		}
		return this.last_center_x;
	}
	/* Get the center y */
	get_center_y(): number {
		if (this.last_top != this.top || this.last_bottom != this.bottom) {
			this.last_top = this.top;
			this.last_bottom = this.bottom;
			this.last_center_y = (this.top + this.bottom) * 0.5;
		}
		return this.last_center_y;
	}
	/* Get the width of the rectangle */
	get_width(): number {
		if (this.w_last_left != this.left || this.w_last_right != this.right) {
			this.w_last_left = this.left;
			this.w_last_right = this.right;
			this.last_width = Math.abs(this.right - this.left);
		}
		return this.last_width;
	}
	/* Get the height of the rectangle */
	get_height(): number {
		if (this.w_last_top != this.top || this.w_last_bottom != this.bottom) {
			this.w_last_top = this.top;
			this.w_last_bottom = this.bottom;
			this.last_height = Math.abs(this.bottom - this.top);
		}
		return this.last_height;
	}
	round(value: number): number {
		return Math.round((value + Number.EPSILON) * 1000) / 1000;
	}
}
