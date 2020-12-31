'use strict';
/**********************************************************************
 * Project           : Circuit Solver
 * File		        : ViewPort.js
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
class Viewport {
    constructor(aspect_ratio, screen_width, screen_height) {
        /* This paint is used for drawing the "lines" that the component is comprised of. */
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(1.5 * global.CANVAS_STROKE_WIDTH_2);
        this.line_paint.set_color(global.MENU_HIGHLIGHT_COLOR);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        this.DRAW_BOUNDS = false;
        if (global.MOBILE_MODE === true || global.DESKTOP_MODE === true) {
            this.APPLY_SPREAD_FACTOR = true;
        }
        else {
            this.APPLY_SPREAD_FACTOR = false;
        }
        this.screen_width = screen_width;
        this.screen_height = screen_height;
        this.center_x = this.screen_width >> 1;
        this.center_y = this.screen_height >> 1;
        this.aspect_ratio = aspect_ratio;
        this.view_width = Math.min(this.screen_width, this.screen_height);
        this.view_height = this.view_width / this.aspect_ratio;
        if (this.APPLY_SPREAD_FACTOR) {
            /* Determine how much more we can spread this view port over the screen in the x and y direction. */
            this.width_spread_factor = this.screen_width / this.view_width;
            this.height_spread_factor = this.screen_height / this.view_height;
            /* Take the smallest spread factor to make sure we aren't going to get clipped off the screen.  */
            this.spread_factor = Math.min(this.width_spread_factor, this.height_spread_factor);
            /* Apply the spread factor to the width and height, maintaining the aspect ratio. */
            this.view_width *= this.spread_factor;
            this.view_height *= this.spread_factor;
        }
        /* left, top, right, and bottom of the rectangle */
        this.left = this.center_x - (this.view_width >> 1);
        this.top = this.center_y - (this.view_height >> 1);
        this.right = this.center_x + (this.view_width >> 1);
        this.bottom = this.center_y + (this.view_height >> 1);
        this.line_paint.set_stroke_width(1.5 * global.CANVAS_STROKE_WIDTH_2);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        global.SIGNAL_BUILD_ELEMENT = true;
        global.signal_build_counter = 0;
    }
    /* Handles resizing the RectF Element */
    resize(aspect_ratio, screen_width, screen_height) {
        this.screen_width = screen_width;
        this.screen_height = screen_height;
        this.center_x = this.screen_width >> 1;
        this.center_y = this.screen_height >> 1;
        this.aspect_ratio = aspect_ratio;
        this.view_width = Math.min(this.screen_width, this.screen_height);
        this.view_height = this.view_width / this.aspect_ratio;
        if (this.APPLY_SPREAD_FACTOR) {
            /* Determine how much more we can spread this view port over the screen in the x and y direction. */
            this.width_spread_factor = this.screen_width / this.view_width;
            this.height_spread_factor = this.screen_height / this.view_height;
            /* Take the smallest spread factor to make sure we aren't going to get clipped off the screen.  */
            this.spread_factor = Math.min(this.width_spread_factor, this.height_spread_factor);
            /* Apply the spread factor to the width and height, maintaining the aspect ratio. */
            this.view_width *= this.spread_factor;
            this.view_height *= this.spread_factor;
        }
        /* left, top, right, and bottom of the rectangle */
        this.left = this.center_x - (this.view_width >> 1);
        this.top = this.center_y - (this.view_height >> 1);
        this.right = this.center_x + (this.view_width >> 1);
        this.bottom = this.center_y + (this.view_height >> 1);
        this.line_paint.set_stroke_width(1.5 * global.CANVAS_STROKE_WIDTH_2);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        global.SIGNAL_BUILD_ELEMENT = true;
        global.signal_build_counter = 0;
    }
    draw_viewport(canvas) {
        if (this.DRAW_BOUNDS) {
            canvas.draw_rect(this.left, this.top, this.right, this.bottom, this.line_paint);
        }
    }
}
