var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button(left, top, right, bottom) {
        var _this = _super.call(this, left, top, right, bottom) || this;
        /* The text that will be drawn by the button. */
        _this.text = '';
        /* A flag to indicate whether or not to draw the fill of the button. */
        _this.draw_fill = false;
        /* A flag to indicate whether or not to draw the trim of the button. */
        _this.draw_stroke = true;
        /* A flag to indicate whether or not to draw the text of the button. */
        _this.draw_text = true;
        /* A flag to indicate whether or not to draw the solid cursor of the button. */
        _this.draw_cursor = false;
        /* This paint is used for drawing the "lines" that the component is comprised of. */
        _this.line_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        _this.fill_paint = new Paint();
        /* This paint is used for drawing the "text" that the component needs to display */
        _this.text_paint = new Paint();
        _this.TEXT_UNDERSCORE_TEMPLATE = '{TEXT}_';
        /* The text that will be drawn by the button. */
        _this.text = '';
        /* A flag to indicate whether or not to draw the fill of the button. */
        _this.draw_fill = false;
        /* A flag to indicate whether or not to draw the trim of the button. */
        _this.draw_stroke = true;
        /* A flag to indicate whether or not to draw the text of the button. */
        _this.draw_text = true;
        /* A flag to indicate whether or not to draw the solid cursor of the button. */
        _this.draw_cursor = false;
        /* This paint is used for drawing the "lines" that the component is comprised of. */
        _this.line_paint = new Paint();
        _this.line_paint.set_paint_style(_this.line_paint.style.STROKE);
        _this.line_paint.set_paint_cap(_this.line_paint.cap.ROUND);
        _this.line_paint.set_paint_join(_this.line_paint.join.MITER);
        _this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        _this.line_paint.set_color(global.GENERAL_GRAY_COLOR);
        _this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        _this.line_paint.set_font(global.DEFAULT_FONT);
        _this.line_paint.set_alpha(255);
        _this.line_paint.set_paint_align(_this.line_paint.align.CENTER);
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        _this.fill_paint = new Paint();
        _this.fill_paint.set_paint_style(_this.fill_paint.style.FILL);
        _this.fill_paint.set_paint_cap(_this.fill_paint.cap.ROUND);
        _this.fill_paint.set_paint_join(_this.fill_paint.join.MITER);
        _this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        _this.fill_paint.set_color(global.GENERAL_WHITE_COLOR);
        _this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        _this.fill_paint.set_font(global.DEFAULT_FONT);
        _this.fill_paint.set_alpha(255);
        _this.fill_paint.set_paint_align(_this.fill_paint.align.CENTER);
        /* This paint is used for drawing the "text" that the component needs to display */
        _this.text_paint = new Paint();
        _this.text_paint.set_paint_style(_this.text_paint.style.FILL);
        _this.text_paint.set_paint_cap(_this.text_paint.cap.ROUND);
        _this.text_paint.set_paint_join(_this.text_paint.join.MITER);
        _this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        _this.text_paint.set_color(global.GENERAL_BLUE_COLOR);
        if (global.MOBILE_MODE) {
            _this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        }
        else {
            _this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        }
        _this.text_paint.set_font(global.DEFAULT_FONT);
        _this.text_paint.set_alpha(255);
        _this.text_paint.set_paint_align(_this.text_paint.align.CENTER);
        _this.TEXT_UNDERSCORE_TEMPLATE = '{TEXT}_';
        return _this;
    }
    /* Resize the stroke widths and the text sizes. */
    Button.prototype.resize_paint = function () {
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
    };
    /* Resize the buttons and the paint stroke and text sizes. */
    Button.prototype.resize_button = function () {
        this.resize();
    };
    /* Draw the button text. */
    Button.prototype.draw_button_text = function (canvas, x, y) {
        if (!this.draw_cursor) {
            canvas.draw_text(this.text, x, y, this.text_paint);
        }
        else {
            canvas.draw_text(this.TEXT_UNDERSCORE_TEMPLATE.replace('{TEXT}', this.text), x, y, this.text_paint);
        }
    };
    /* Draws the button to screen. */
    Button.prototype.draw_button = function (canvas) {
        if (this.draw_fill) {
            canvas.draw_round_rect2(this, this.fill_paint.get_stroke_width(), this.fill_paint);
        }
        if (this.draw_stroke) {
            canvas.draw_round_rect2(this, this.line_paint.get_stroke_width(), this.line_paint);
        }
        if (this.draw_text) {
            this.draw_button_text(canvas, this.get_center_x(), this.get_center_y());
        }
    };
    /* Draws the button to screen. */
    Button.prototype.draw_button_dxdy = function (canvas, offset_x, offset_y) {
        if (this.draw_fill) {
            canvas.draw_round_rect(this.left + offset_x, this.top + offset_y, this.right + offset_x, this.bottom + offset_y, this.fill_paint.get_stroke_width(), this.fill_paint);
        }
        if (this.draw_stroke) {
            canvas.draw_round_rect(this.left + offset_x, this.top + offset_y, this.right + offset_x, this.bottom + offset_y, this.line_paint.get_stroke_width(), this.line_paint);
        }
        if (this.draw_text) {
            this.draw_button_text(canvas, this.get_center_x() + offset_x, this.get_center_y() + offset_y);
        }
    };
    return Button;
}(RectF));
