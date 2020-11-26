/**********************************************************************
 * Project           : Circuit Solver
 * File		        : ZoomWindow.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to handle user requested preset "zooms".
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
var ZoomWindow = /** @class */ (function () {
    function ZoomWindow() {
        /* The padding for the window */
        this.PADDING = 0.025;
        /* This paint is used for drawing the "lines" that the component is comprised of. */
        this.line_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.bounds_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.fill_paint = new Paint();
        /* This paint is used for drawing the "text" that the component needs to display */
        this.text_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.option_0_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.option_1_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.option_2_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.option_3_paint = new Paint();
        this.options = {
            c0: {
                string: '50%',
                number: 0.5
            },
            c1: {
                string: '100%',
                number: 1.0
            },
            c2: {
                string: '200%',
                number: 2.0
            },
            c3: {
                string: 'N/A',
                number: -1
            }
        };
        this.width = view_port.view_width * 0.1;
        this.height = view_port.view_height * 0.075;
        this.bounds = new RectF(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
        this.option_0 = new RectF(0, 0, 0, 0);
        this.option_1 = new RectF(0, 0, 0, 0);
        this.option_2 = new RectF(0, 0, 0, 0);
        this.option_3 = new RectF(0, 0, 0, 0);
        /* Enforcing the system from cascading events. */
        this.first_touch_x = 0;
        this.first_touch_y = 0;
        /* The padding for the window */
        this.PADDING = 0.025;
        /* This paint is used for drawing the "lines" that the component is comprised of. */
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.bounds_paint = new Paint();
        this.bounds_paint.set_paint_style(this.bounds_paint.style.FILL);
        this.bounds_paint.set_paint_cap(this.bounds_paint.cap.ROUND);
        this.bounds_paint.set_paint_join(this.bounds_paint.join.MITER);
        this.bounds_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.bounds_paint.set_color(global.ZOOM_AREA_COLOR);
        this.bounds_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.bounds_paint.set_font(global.DEFAULT_FONT);
        this.bounds_paint.set_alpha(192);
        this.bounds_paint.set_paint_align(this.bounds_paint.align.CENTER);
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
        this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
        this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
        this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.fill_paint.set_font(global.DEFAULT_FONT);
        this.fill_paint.set_alpha(90);
        this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
        /* This paint is used for drawing the "text" that the component needs to display */
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(0.75 * global.CANVAS_TEXT_SIZE_6);
        }
        else {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        }
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_paint_align(this.text_paint.align.CENTER);
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.option_0_paint = new Paint();
        this.option_0_paint.set_paint_style(this.option_0_paint.style.FILL);
        this.option_0_paint.set_paint_cap(this.option_0_paint.cap.ROUND);
        this.option_0_paint.set_paint_join(this.option_0_paint.join.MITER);
        this.option_0_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.option_0_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.option_0_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.option_0_paint.set_font(global.DEFAULT_FONT);
        this.option_0_paint.set_alpha(90);
        this.option_0_paint.set_paint_align(this.option_0_paint.align.CENTER);
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.option_1_paint = new Paint();
        this.option_1_paint.set_paint_style(this.option_1_paint.style.FILL);
        this.option_1_paint.set_paint_cap(this.option_1_paint.cap.ROUND);
        this.option_1_paint.set_paint_join(this.option_1_paint.join.MITER);
        this.option_1_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.option_1_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.option_1_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.option_1_paint.set_font(global.DEFAULT_FONT);
        this.option_1_paint.set_alpha(90);
        this.option_1_paint.set_paint_align(this.option_1_paint.align.CENTER);
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.option_2_paint = new Paint();
        this.option_2_paint.set_paint_style(this.option_2_paint.style.FILL);
        this.option_2_paint.set_paint_cap(this.option_2_paint.cap.ROUND);
        this.option_2_paint.set_paint_join(this.option_2_paint.join.MITER);
        this.option_2_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.option_2_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.option_2_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.option_2_paint.set_font(global.DEFAULT_FONT);
        this.option_2_paint.set_alpha(90);
        this.option_2_paint.set_paint_align(this.option_2_paint.align.CENTER);
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.option_3_paint = new Paint();
        this.option_3_paint.set_paint_style(this.option_3_paint.style.FILL);
        this.option_3_paint.set_paint_cap(this.option_3_paint.cap.ROUND);
        this.option_3_paint.set_paint_join(this.option_3_paint.join.MITER);
        this.option_3_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.option_3_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.option_3_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.option_3_paint.set_font(global.DEFAULT_FONT);
        this.option_3_paint.set_alpha(90);
        this.option_3_paint.set_paint_align(this.option_3_paint.align.CENTER);
        if (global.MOBILE_MODE === true) {
            this.options = {
                c0: {
                    string: '100%',
                    number: 1.0
                },
                c1: {
                    string: '250%',
                    number: 2.5
                },
                c2: {
                    string: '350%',
                    number: 3.5
                },
                c3: {
                    string: 'N/A',
                    number: -1
                }
            };
        }
        else {
            this.options = {
                c0: {
                    string: '50%',
                    number: 0.5
                },
                c1: {
                    string: '100%',
                    number: 1.0
                },
                c2: {
                    string: '200%',
                    number: 2.0
                },
                c3: {
                    string: 'N/A',
                    number: -1
                }
            };
        }
        if (global.MOBILE_MODE) {
            this.width = view_port.view_width * 0.175;
            this.height = view_port.view_height * 0.13125;
        }
        else {
            this.width = view_port.view_width * 0.1;
            this.height = view_port.view_height * 0.075;
        }
        this.bounds = new RectF(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
        var padding = this.PADDING * this.bounds.get_width();
        var width = (this.bounds.get_width() - 2 * padding) * 0.5;
        var height = (this.bounds.get_height() - 2 * padding) * 0.5;
        this.option_0 = new RectF(this.bounds.left + padding, this.bounds.top + padding, this.bounds.get_center_x() - padding * 0.5, this.bounds.get_center_y() - padding * 0.5);
        this.option_1 = new RectF(this.bounds.get_center_x() + padding * 0.5, this.bounds.top + padding, this.bounds.right - padding, this.bounds.get_center_y() - padding * 0.5);
        this.option_2 = new RectF(this.bounds.left + padding, this.bounds.get_center_y() + padding * 0.5, this.bounds.get_center_x() - padding * 0.5, this.bounds.bottom - padding);
        this.option_3 = new RectF(this.bounds.get_center_x() + padding * 0.5, this.bounds.get_center_y() + padding * 0.5, this.bounds.right - padding, this.bounds.bottom - padding);
        /* Enforcing the system from cascading events. */
        this.first_touch_x = 0;
        this.first_touch_y = 0;
    }
    ZoomWindow.prototype.mouse_down = function () {
        if (global.FLAG_ZOOM) {
            this.first_touch_x = global.mouse_x;
            this.first_touch_y = global.mouse_y;
        }
    };
    ZoomWindow.prototype.mouse_move = function () {
        if (global.FLAG_ZOOM) {
            if (!global.MOBILE_MODE) {
                this.hover();
            }
        }
    };
    ZoomWindow.prototype.mouse_up = function () {
        if (global.FLAG_ZOOM) {
            if (!global.MOUSE_KEYBOARD_LOCK) {
                if (!this.bounds.contains_xy(global.mouse_x, global.mouse_y) && !this.bounds.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    menu_bar.handle_zoom_flag(!global.FLAG_ZOOM);
                    /* Block out the reset selection portion of the code! */
                    global.component_touched = true;
                }
                else if (this.option_0.contains_xy(global.mouse_x, global.mouse_y) && this.option_0.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    this.set_zoom(this.options['c0']['number']);
                    menu_bar.handle_zoom_flag(!global.FLAG_ZOOM);
                    /* Block out the reset selection portion of the code! */
                    global.component_touched = true;
                }
                else if (this.option_1.contains_xy(global.mouse_x, global.mouse_y) && this.option_1.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    this.set_zoom(this.options['c1']['number']);
                    menu_bar.handle_zoom_flag(!global.FLAG_ZOOM);
                    /* Block out the reset selection portion of the code! */
                    global.component_touched = true;
                }
                else if (this.option_2.contains_xy(global.mouse_x, global.mouse_y) && this.option_2.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    this.set_zoom(this.options['c2']['number']);
                    menu_bar.handle_zoom_flag(!global.FLAG_ZOOM);
                    /* Block out the reset selection portion of the code! */
                    global.component_touched = true;
                }
                else if (this.option_3.contains_xy(global.mouse_x, global.mouse_y) && this.option_3.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    menu_bar.handle_zoom_flag(!global.FLAG_ZOOM);
                    /* Block out the reset selection portion of the code! */
                    global.component_touched = true;
                }
            }
        }
    };
    ZoomWindow.prototype.key_down = function (key_event) {
        if (global.FLAG_ZOOM) {
            if (key_event['event'].code === global.KEY_CODE_ENTER || key_event['event'].code === global.KEY_CODE_ESCAPE) {
                menu_bar.handle_zoom_flag(!global.FLAG_ZOOM);
                /* Block out the reset selection portion of the code! */
                global.component_touched = true;
            }
        }
    };
    ZoomWindow.prototype.hover = function () {
        if (this.option_0.contains_xy(global.mouse_x, global.mouse_y)) {
            this.option_0_paint.set_color(global.GENERAL_CYAN_COLOR);
        }
        else {
            this.option_0_paint.set_color(global.GENERAL_GRAY_COLOR);
        }
        if (this.option_1.contains_xy(global.mouse_x, global.mouse_y)) {
            this.option_1_paint.set_color(global.GENERAL_CYAN_COLOR);
        }
        else {
            this.option_1_paint.set_color(global.GENERAL_GRAY_COLOR);
        }
        if (this.option_2.contains_xy(global.mouse_x, global.mouse_y)) {
            this.option_2_paint.set_color(global.GENERAL_CYAN_COLOR);
        }
        else {
            this.option_2_paint.set_color(global.GENERAL_GRAY_COLOR);
        }
        if (this.option_3.contains_xy(global.mouse_x, global.mouse_y)) {
            this.option_3_paint.set_color(global.GENERAL_CYAN_COLOR);
        }
        else {
            this.option_3_paint.set_color(global.GENERAL_GRAY_COLOR);
        }
    };
    /* Zoom to the center of the screen! */
    ZoomWindow.prototype.set_zoom = function (zoom) {
        if (zoom >= global.ZOOM_MIN && zoom <= global.ZOOM_MAX) {
            global.SIGNAL_BUILD_ELEMENT = true;
            global.SIGNAL_BUILD_COUNTER = 0;
            global.WORKSPACE_ZOOM_SCALE = zoom;
            /* Reset the zoom */
            global.x_offset = 0;
            global.y_offset = 0;
            global.delta_x = workspace.bounds.left;
            global.delta_y = workspace.bounds.top;
            workspace.workspace_zoom();
            var dx = view_port.center_x - workspace.bounds.get_center_x();
            var dy = view_port.center_y - workspace.bounds.get_center_y();
            workspace.workspace_translate_bounds(dx, dy);
            global.delta_x += dx;
            global.delta_y += dy;
        }
    };
    ZoomWindow.prototype.resize_window = function () {
        if (global.MOBILE_MODE) {
            this.width = view_port.view_width * 0.175;
            this.height = view_port.view_height * 0.13125;
        }
        else {
            this.width = view_port.view_width * 0.1;
            this.height = view_port.view_height * 0.075;
        }
        this.bounds.set_bounds(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
        var padding = this.PADDING * this.bounds.get_width();
        this.option_0.set_bounds(this.bounds.left + padding, this.bounds.top + padding, this.bounds.get_center_x() - padding * 0.5, this.bounds.get_center_y() - padding * 0.5);
        this.option_1.set_bounds(this.bounds.get_center_x() + padding * 0.5, this.bounds.top + padding, this.bounds.right - padding, this.bounds.get_center_y() - padding * 0.5);
        this.option_2.set_bounds(this.bounds.left + padding, this.bounds.get_center_y() + padding * 0.5, this.bounds.get_center_x() - padding * 0.5, this.bounds.bottom - padding);
        this.option_3.set_bounds(this.bounds.get_center_x() + padding * 0.5, this.bounds.get_center_y() + padding * 0.5, this.bounds.right - padding, this.bounds.bottom - padding);
        /* Resize the stroke widths and the text sizes. */
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(0.75 * global.CANVAS_TEXT_SIZE_6);
        }
        else {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        }
        this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.bounds_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.bounds_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    };
    ZoomWindow.prototype.draw_window = function (canvas) {
        if (global.FLAG_ZOOM) {
            canvas.draw_round_rect2(this.bounds, this.bounds_paint.get_stroke_width(), this.bounds_paint);
            canvas.draw_round_rect2(this.option_0, this.fill_paint.get_stroke_width(), this.option_0_paint);
            canvas.draw_text(this.options['c0']['string'], this.option_0.get_center_x(), this.option_0.get_center_y(), this.text_paint);
            canvas.draw_round_rect2(this.option_1, this.fill_paint.get_stroke_width(), this.option_1_paint);
            canvas.draw_text(this.options['c1']['string'], this.option_1.get_center_x(), this.option_1.get_center_y(), this.text_paint);
            canvas.draw_round_rect2(this.option_2, this.fill_paint.get_stroke_width(), this.option_2_paint);
            canvas.draw_text(this.options['c2']['string'], this.option_2.get_center_x(), this.option_2.get_center_y(), this.text_paint);
            canvas.draw_round_rect2(this.option_3, this.fill_paint.get_stroke_width(), this.option_3_paint);
            canvas.draw_text(language_manager.EXIT[global.LANGUAGES[global.LANGUAGE_INDEX]], this.option_3.get_center_x(), this.option_3.get_center_y(), this.text_paint);
        }
    };
    return ZoomWindow;
}());
