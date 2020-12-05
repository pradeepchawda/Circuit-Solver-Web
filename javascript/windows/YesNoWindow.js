/**********************************************************************
 * Project           : Circuit Solver
 * File		        : YesNoWindow.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to handle confirmation of actions before they are carried out.
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
class YesNoWindow {
    constructor() {
        /* The padding for the window */
        this.PADDING = 0.025;
        /* This paint is used for drawing the "lines" that the component is comprised of. */
        this.line_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.bounds_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.fill_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.yes_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.no_paint = new Paint();
        /* This paint is used for drawing the "text" that the component needs to display */
        this.text_paint = new Paint();
        this.width = view_port.view_width * 0.1;
        this.height = view_port.view_height * 0.075;
        this.bounds = new RectF(0, 0, 0, 0);
        this.option_0 = new RectF(0, 0, 0, 0);
        this.option_1 = new RectF(0, 0, 0, 0);
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
        this.bounds_paint.set_color(global.GENERAL_GRAY_COLOR);
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
        this.fill_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.fill_paint.set_font(global.DEFAULT_FONT);
        this.fill_paint.set_alpha(90);
        this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.yes_paint = new Paint();
        this.yes_paint.set_paint_style(this.yes_paint.style.FILL);
        this.yes_paint.set_paint_cap(this.yes_paint.cap.ROUND);
        this.yes_paint.set_paint_join(this.yes_paint.join.MITER);
        this.yes_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.yes_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.yes_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.yes_paint.set_font(global.DEFAULT_FONT);
        this.yes_paint.set_alpha(90);
        this.yes_paint.set_paint_align(this.yes_paint.align.CENTER);
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.no_paint = new Paint();
        this.no_paint.set_paint_style(this.no_paint.style.FILL);
        this.no_paint.set_paint_cap(this.no_paint.cap.ROUND);
        this.no_paint.set_paint_join(this.no_paint.join.MITER);
        this.no_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.no_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.no_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.no_paint.set_font(global.DEFAULT_FONT);
        this.no_paint.set_alpha(90);
        this.no_paint.set_paint_align(this.no_paint.align.CENTER);
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
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.CENTER);
        if (global.MOBILE_MODE) {
            this.width = view_port.view_width * 0.175;
            this.height = view_port.view_height * 0.13125;
        }
        else {
            this.width = view_port.view_width * 0.1;
            this.height = view_port.view_height * 0.075;
        }
        this.bounds = new RectF(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
        let padding = this.PADDING * this.bounds.get_width();
        let width = (this.bounds.get_width() - 2 * padding) * 0.5;
        let height = (this.bounds.get_height() - 2 * padding) * 0.3571;
        this.option_0 = new RectF(this.bounds.left + padding, this.bounds.bottom - padding - height, this.bounds.get_center_x() - padding * 0.5, this.bounds.bottom - padding);
        this.option_1 = new RectF(this.bounds.get_center_x() + padding * 0.5, this.bounds.bottom - padding - height, this.bounds.right - padding, this.bounds.bottom - padding);
        /* Enforcing the system from cascading events. */
        this.first_touch_x = 0;
        this.first_touch_y = 0;
    }
    mouse_down() {
        if (global.FLAG_REMOVE_ALL) {
            /* Enforcing the system from cascading events. */
            this.first_touch_x = global.mouse_x;
            this.first_touch_y = global.mouse_y;
        }
    }
    mouse_move() {
        if (global.FLAG_REMOVE_ALL) {
            if (!global.MOBILE_MODE) {
                this.hover();
            }
        }
    }
    mouse_up() {
        if (global.FLAG_REMOVE_ALL) {
            if (!global.mouse_keyboard_lock) {
                if (!this.bounds.contains_xy(global.mouse_x, global.mouse_y) && !this.bounds.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    menu_bar.handle_remove_all_flag(!global.FLAG_REMOVE_ALL);
                    /* Block out the reset selection portion of the code! */
                    global.component_touched = true;
                }
                else if (this.option_0.contains_xy(global.mouse_x, global.mouse_y) && this.option_0.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    engine_functions.clear_all_elements();
                    scope_manager.clear_entries();
                    graph_window.reset();
                    global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
                    menu_bar.handle_remove_all_flag(!global.FLAG_REMOVE_ALL);
                    global.user_file.title = 'untitled';
                    /* Block out the reset selection portion of the code! */
                    global.component_touched = true;
                    bottom_menu.resize_bottom_menu();
                }
                else if (this.option_1.contains_xy(global.mouse_x, global.mouse_y) && this.option_1.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    menu_bar.handle_remove_all_flag(!global.FLAG_REMOVE_ALL);
                    /* Block out the reset selection portion of the code! */
                    global.component_touched = true;
                }
            }
        }
    }
    key_down(key_event) {
        if (global.FLAG_REMOVE_ALL) {
            if (key_event['event'].code === global.KEY_CODE_ENTER || key_event['event'].code === global.KEY_CODE_ESCAPE) {
                menu_bar.handle_remove_all_flag(!global.FLAG_REMOVE_ALL);
                /* Block out the reset selection portion of the code! */
                global.component_touched = true;
            }
        }
    }
    hover() {
        if (this.option_0.contains_xy(global.mouse_x, global.mouse_y)) {
            this.yes_paint.set_color(global.GENERAL_CYAN_COLOR);
        }
        else {
            this.yes_paint.set_color(global.GENERAL_WHITE_COLOR);
        }
        if (this.option_1.contains_xy(global.mouse_x, global.mouse_y)) {
            this.no_paint.set_color(global.GENERAL_CYAN_COLOR);
        }
        else {
            this.no_paint.set_color(global.GENERAL_WHITE_COLOR);
        }
    }
    resize_window() {
        if (global.MOBILE_MODE) {
            this.width = view_port.view_width * 0.175;
            this.height = view_port.view_height * 0.13125;
        }
        else {
            this.width = view_port.view_width * 0.1;
            this.height = view_port.view_height * 0.075;
        }
        this.bounds.set_bounds(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
        let padding = this.PADDING * this.bounds.get_width();
        let width = (this.bounds.get_width() - 2 * padding) * 0.5;
        let height = (this.bounds.get_height() - 2 * padding) * 0.3571;
        this.option_0.set_bounds(this.bounds.left + padding, this.bounds.bottom - padding - height, this.bounds.get_center_x() - padding * 0.5, this.bounds.bottom - padding);
        this.option_1.set_bounds(this.bounds.get_center_x() + padding * 0.5, this.bounds.bottom - padding - height, this.bounds.right - padding, this.bounds.bottom - padding);
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
    }
    draw_window(canvas) {
        if (global.FLAG_REMOVE_ALL) {
            canvas.draw_round_rect2(this.bounds, this.bounds_paint.get_stroke_width(), this.bounds_paint);
            canvas.draw_text(language_manager.CONFIRM_REMOVE_ALL[global.LANGUAGES[global.LANGUAGE_INDEX]], this.bounds.get_center_x(), this.bounds.top + this.bounds.get_height() * 0.33, this.text_paint);
            canvas.draw_round_rect2(this.option_0, this.fill_paint.get_stroke_width(), this.yes_paint);
            canvas.draw_text(language_manager.CONFIRM_YES[global.LANGUAGES[global.LANGUAGE_INDEX]], this.option_0.get_center_x(), this.option_0.get_center_y(), this.text_paint);
            canvas.draw_round_rect2(this.option_1, this.fill_paint.get_stroke_width(), this.no_paint);
            canvas.draw_text(language_manager.CONFIRM_NO[global.LANGUAGES[global.LANGUAGE_INDEX]], this.option_1.get_center_x(), this.option_1.get_center_y(), this.text_paint);
        }
    }
}
