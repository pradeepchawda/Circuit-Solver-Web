/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Button.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A general purpose class to draw and handle the basic aspects of a button.
 *
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
class Button extends RectF {
    constructor(left, top, right, bottom) {
        super(left, top, right, bottom);
        /* The text that will be drawn by the button. */
        this.text = '';
        /* A flag to indicate whether or not to draw the fill of the button. */
        this.draw_fill = false;
        /* A flag to indicate whether or not to draw the trim of the button. */
        this.draw_stroke = true;
        /* A flag to indicate whether or not to draw the text of the button. */
        this.draw_text = true;
        /* A flag to indicate whether or not to draw the solid cursor of the button. */
        this.draw_cursor = false;
        /* This paint is used for drawing the "lines" that the component is comprised of. */
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.line_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
        this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
        this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
        this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.fill_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.fill_paint.set_font(global.DEFAULT_FONT);
        this.fill_paint.set_alpha(255);
        this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
        /* This paint is used for drawing the "text" that the component needs to display */
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.text_paint.set_color(global.GENERAL_BLUE_COLOR);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        }
        else {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        }
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.CENTER);
        this.TEXT_UNDERSCORE_TEMPLATE = '{TEXT}_';
    }
    /* Resize the stroke widths and the text sizes. */
    resize_paint() {
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        }
        else {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        }
    }
    /* Resize the buttons and the paint stroke and text sizes. */
    resize_button() {
        this.resize();
    }
    /* Draw the button text. */
    draw_button_text(canvas, x, y) {
        if (!this.draw_cursor) {
            canvas.draw_text(this.text, x, y, this.text_paint);
        }
        else {
            canvas.draw_text(this.TEXT_UNDERSCORE_TEMPLATE.replace('{TEXT}', this.text), x, y, this.text_paint);
        }
    }
    /* Draws the button to screen. */
    draw_button(canvas) {
        if (this.draw_fill) {
            canvas.draw_rect2(this, this.fill_paint);
        }
        if (this.draw_stroke) {
            canvas.draw_rect2(this, this.line_paint);
        }
        if (this.draw_text) {
            this.draw_button_text(canvas, this.get_center_x(), this.get_center_y());
        }
    }
    /* Draws the button to screen. */
    draw_button_dxdy(canvas, offset_x, offset_y) {
        if (this.draw_fill) {
            canvas.draw_rect(this.left + offset_x, this.top + offset_y, this.right + offset_x, this.bottom + offset_y, this.fill_paint);
        }
        if (this.draw_stroke) {
            canvas.draw_rect(this.left + offset_x, this.top + offset_y, this.right + offset_x, this.bottom + offset_y, this.line_paint);
        }
        if (this.draw_text) {
            this.draw_button_text(canvas, this.get_center_x() + offset_x, this.get_center_y() + offset_y);
        }
    }
}
