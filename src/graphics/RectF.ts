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
  public left: number = -1;
  public top: number = -1;
  public right: number = -1;
  public bottom: number = -1;
  /* A flag to show if the rectangle is anchored or not */
  public anchored: Boolean = true;
  /* Temporary variable to handle settings the center of the rectangle */
  private temp_width: number = 0;
  private temp_height: number = 0;

  private last_left: number = -1;
  private last_right: number = -1;
  private last_top: number = -1;
  private last_bottom: number = -1;

  private last_center_x: number = -1;
  private last_center_y: number = -1;
  private last_width: number = -1;
  private last_height: number = -1;

  private w_last_left: number = -1;
  private w_last_right: number = -1;
  private w_last_top: number = -1;
  private w_last_bottom: number = -1;

  constructor(left, top, right, bottom) {
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
  set_bounds(left, top, right, bottom) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }
  /* Handles resizing the RectF Element */
  resize() {
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
  is_near(bounds, norm_magnitude) {
    let norm = global.norm(
      this.get_center_x() - bounds.get_center_x(),
      this.get_center_y() - bounds.get_center_y()
    );
    if (norm <= norm_magnitude) {
      return true;
    } else {
      return false;
    }
  }
  /* A quick check to see if the rectangle contains an x,y coordinate */
  contains_xy(x, y) {
    return (
      x >= this.left && x <= this.right && y >= this.top && y <= this.bottom
    );
  }
  /* A quick check to see if the rectangle contains an x,y coordinate */
  contains_xywh(x, y, w, h) {
    let h_prime = h * 0.5;
    let w_prime = w * 0.5;
    return (
      x >= this.get_center_x() - w_prime &&
      x <= this.get_center_x() + w_prime &&
      y >= this.get_center_y() - h_prime &&
      y <= this.get_center_y() + h_prime
    );
  }
  /* Set the center of the rectangle, keeping the width and height intact! */
  set_center(x, y) {
    this.temp_width = this.get_width() * 0.5;
    this.temp_height = this.get_height() * 0.5;
    this.left = x - this.temp_width;
    this.right = x + this.temp_width;
    this.top = y - this.temp_height;
    this.bottom = y + this.temp_height;
  }
  set_center2(x, y, w, h) {
    this.temp_width = w * 0.5;
    this.temp_height = h * 0.5;
    this.left = x - this.temp_width;
    this.right = x + this.temp_width;
    this.top = y - this.temp_height;
    this.bottom = y + this.temp_height;
  }
  /* Get the center x */
  get_center_x() {
    if (this.last_left != this.left || this.last_right != this.right) {
      this.last_left = this.left;
      this.last_right = this.right;
      this.last_center_x = (this.right + this.left) * 0.5;
    }
    return this.last_center_x;
  }
  /* Get the center y */
  get_center_y() {
    if (this.last_top != this.top || this.last_bottom != this.bottom) {
      this.last_top = this.top;
      this.last_bottom = this.bottom;
      this.last_center_y = (this.top + this.bottom) * 0.5;
    }
    return this.last_center_y;
  }
  /* Get the width of the rectangle */
  get_width() {
    if (this.w_last_left != this.left || this.w_last_right != this.right) {
      this.w_last_left = this.left;
      this.w_last_right = this.right;
      this.last_width = Math.abs(this.right - this.left);
    }
    return this.last_width;
  }
  /* Get the height of the rectangle */
  get_height() {
    if (this.w_last_top != this.top || this.w_last_bottom != this.bottom) {
      this.w_last_top = this.top;
      this.w_last_bottom = this.bottom;
      this.last_height = Math.abs(this.bottom - this.top);
    }
    return this.last_height;
  }
  round(value) {
    return Math.round((value + Number.EPSILON) * 1000) / 1000;
  }
}
