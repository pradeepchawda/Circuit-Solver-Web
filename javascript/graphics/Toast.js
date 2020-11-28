/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Toast.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A generalized class to display updates and feedback to the user. Refernce
 *                   from "Toast" in android development.
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
class Toast {
    constructor() {
        /* This is used to place the height at which the toast will display its bounds. */
        this.HEIGHT_RATIO = 0.85;
        this.HEIGHT_FACTOR = 0.7;
        /* This paint is used for drawing the "lines" that the component is comprised of. */
        this.line_paint = new Paint();
        /* This paint is used for drawing the fill of the component. */
        this.fill_paint = new Paint();
        /* This paint is used for drawing the "text" that the component needs to display */
        this.text_paint = new Paint();
        /* The text to be displayed. */
        this.text = '';
        /* The timer for how long we should display the text. */
        this.timer = 0;
        /* The maximum amount of seconds to show the text. */
        this.MAX_SECONDS = 2;
        /* The maximum amount of time to show the text. */
        this.MAX_TIME = FPS;
        /* A flag that dictates when this component can draw to the screen. */
        this.draw_text = false;
        /* This is to draw a surrounding box around the text. */
        this.bounds = new RectF(0, 0, 0, 0);
        this.TOAST_REQUEST_DRAW = false;
        this.last_text = '-';
        this.text_measure_div2 = -1;
        /* This is used to place the height at which the toast will display its bounds. */
        if (global.MOBILE_MODE) {
            this.HEIGHT_RATIO = 0.85;
            this.HEIGHT_FACTOR = 0.7;
        }
        else {
            this.HEIGHT_RATIO = 0.9;
            this.HEIGHT_FACTOR = 0.5;
        }
        /* This paint is used for drawing the "lines" that the component is comprised of. */
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.line_paint.set_color(global.GENERAL_BLACK_COLOR);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        /* This paint is used for drawing the fill of the component. */
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
        this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
        this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
        this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.fill_paint.set_font(global.DEFAULT_FONT);
        this.fill_paint.set_alpha(130);
        this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
        /* This paint is used for drawing the "text" that the component needs to display */
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5 * 1.25);
        }
        else {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        }
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.CENTER);
        /* The text to be displayed. */
        this.text = '';
        /* The timer for how long we should display the text. */
        this.timer = 0;
        /* The maximum amount of seconds to show the text. */
        this.MAX_SECONDS = 2;
        /* The maximum amount of time to show the text. */
        this.MAX_TIME = FPS;
        /* A flag that dictates when this component can draw to the screen. */
        this.draw_text = false;
        /* This is to draw a surrounding box around the text. */
        this.bounds = new RectF(0, 0, 0, 0);
        this.TOAST_REQUEST_DRAW = false;
        this.last_text = '-';
        this.text_measure_div2 = -1;
    }
    update() {
        if (this.draw_text) {
            this.timer++;
            if (this.timer >= this.MAX_TIME * this.MAX_SECONDS) {
                this.reset();
            }
        }
    }
    reset() {
        this.text = '';
        this.last_text = '-';
        this.timer = 0;
        this.draw_text = false;
        this.TOAST_REQUEST_DRAW = true;
    }
    set_text(str) {
        this.text = language_manager.TEXT_PADDING + str + language_manager.TEXT_PADDING;
        this.last_text = '-';
    }
    show() {
        this.timer = 0;
        this.draw_text = true;
    }
    resize_toast() {
        /* Resize the stroke widths and the text sizes. */
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5 * 1.25);
        }
        else {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        }
        this.last_text = this.text;
        this.text_measure_div2 = this.text_paint.measure_text(this.text) * 0.5;
    }
    draw_toast(canvas) {
        if (this.draw_text) {
            if (this.last_text != this.text) {
                this.last_text = this.text;
                this.text_measure_div2 = this.text_paint.measure_text(this.text) * 0.5;
            }
            this.bounds.left = view_port.center_x - this.text_measure_div2;
            this.bounds.top = view_port.top + view_port.view_height * this.HEIGHT_RATIO;
            this.bounds.right = view_port.center_x + this.text_measure_div2;
            this.bounds.bottom = view_port.top + view_port.view_height * (this.HEIGHT_RATIO + (1.0 - this.HEIGHT_RATIO) * this.HEIGHT_FACTOR);
            canvas.draw_round_rect2(this.bounds, this.fill_paint.get_stroke_width(), this.fill_paint);
            canvas.draw_round_rect2(this.bounds, this.fill_paint.get_stroke_width(), this.line_paint);
            canvas.draw_text(this.text, this.bounds.get_center_x(), this.bounds.get_center_y(), this.text_paint);
            this.update();
        }
        if (this.TOAST_REQUEST_DRAW) {
            this.TOAST_REQUEST_DRAW = false;
        }
    }
}
