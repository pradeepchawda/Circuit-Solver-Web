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
var RectF = /** @class */ (function () {
    function RectF(left, top, right, bottom) {
        /* left, top, right, and bottom of the rectangle */
        this.left = -1;
        this.top = -1;
        this.right = -1;
        this.bottom = -1;
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
    RectF.prototype.set_bounds = function (left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    };
    /* Handles resizing the RectF Element */
    RectF.prototype.resize = function () {
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
    };
    RectF.prototype.is_near = function (bounds, norm_magnitude) {
        var norm = global.norm(this.get_center_x() - bounds.get_center_x(), this.get_center_y() - bounds.get_center_y());
        if (norm <= norm_magnitude) {
            return true;
        }
        else {
            return false;
        }
    };
    /* A quick check to see if the rectangle contains an x,y coordinate */
    RectF.prototype.contains_xy = function (x, y) {
        return (x >= this.left && x <= this.right && y >= this.top && y <= this.bottom);
    };
    /* A quick check to see if the rectangle contains an x,y coordinate */
    RectF.prototype.contains_xywh = function (x, y, w, h) {
        var h_prime = h * 0.5;
        var w_prime = w * 0.5;
        return (x >= this.get_center_x() - w_prime &&
            x <= this.get_center_x() + w_prime &&
            y >= this.get_center_y() - h_prime &&
            y <= this.get_center_y() + h_prime);
    };
    /* Set the center of the rectangle, keeping the width and height intact! */
    RectF.prototype.set_center = function (x, y) {
        this.temp_width = this.get_width() * 0.5;
        this.temp_height = this.get_height() * 0.5;
        this.left = x - this.temp_width;
        this.right = x + this.temp_width;
        this.top = y - this.temp_height;
        this.bottom = y + this.temp_height;
    };
    RectF.prototype.set_center2 = function (x, y, w, h) {
        this.temp_width = w * 0.5;
        this.temp_height = h * 0.5;
        this.left = x - this.temp_width;
        this.right = x + this.temp_width;
        this.top = y - this.temp_height;
        this.bottom = y + this.temp_height;
    };
    /* Get the center x */
    RectF.prototype.get_center_x = function () {
        if (this.last_left != this.left || this.last_right != this.right) {
            this.last_left = this.left;
            this.last_right = this.right;
            this.last_center_x = (this.right + this.left) * 0.5;
        }
        return this.last_center_x;
    };
    /* Get the center y */
    RectF.prototype.get_center_y = function () {
        if (this.last_top != this.top || this.last_bottom != this.bottom) {
            this.last_top = this.top;
            this.last_bottom = this.bottom;
            this.last_center_y = (this.top + this.bottom) * 0.5;
        }
        return this.last_center_y;
    };
    /* Get the width of the rectangle */
    RectF.prototype.get_width = function () {
        if (this.w_last_left != this.left || this.w_last_right != this.right) {
            this.w_last_left = this.left;
            this.w_last_right = this.right;
            this.last_width = Math.abs(this.right - this.left);
        }
        return this.last_width;
    };
    /* Get the height of the rectangle */
    RectF.prototype.get_height = function () {
        if (this.w_last_top != this.top || this.w_last_bottom != this.bottom) {
            this.w_last_top = this.top;
            this.w_last_bottom = this.bottom;
            this.last_height = Math.abs(this.bottom - this.top);
        }
        return this.last_height;
    };
    RectF.prototype.round = function (value) {
        return Math.round((value + Number.EPSILON) * 1000) / 1000;
    };
    return RectF;
}());
