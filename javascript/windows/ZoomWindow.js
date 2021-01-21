'use strict';
class ZoomWindow {
    constructor() {
        this.PADDING = 0.025;
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.line_paint.set_text_size(global.canvas_text_size_5);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        this.bounds_paint = new Paint();
        this.bounds_paint.set_paint_style(this.bounds_paint.style.FILL);
        this.bounds_paint.set_paint_cap(this.bounds_paint.cap.ROUND);
        this.bounds_paint.set_paint_join(this.bounds_paint.join.MITER);
        this.bounds_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.bounds_paint.set_color(global.GENERAL_FILL_COLOR);
        this.bounds_paint.set_text_size(global.canvas_text_size_5);
        this.bounds_paint.set_font(global.DEFAULT_FONT);
        this.bounds_paint.set_alpha(255);
        this.bounds_paint.set_paint_align(this.bounds_paint.align.CENTER);
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
        this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
        this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
        this.fill_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.fill_paint.set_text_size(global.canvas_text_size_5);
        this.fill_paint.set_font(global.DEFAULT_FONT);
        this.fill_paint.set_alpha(255);
        this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(0.75 * global.canvas_text_size_6);
        }
        else {
            this.text_paint.set_text_size(global.canvas_text_size_5);
        }
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_paint_align(this.text_paint.align.CENTER);
        this.option_0_paint = new Paint();
        this.option_0_paint.set_paint_style(this.option_0_paint.style.FILL);
        this.option_0_paint.set_paint_cap(this.option_0_paint.cap.ROUND);
        this.option_0_paint.set_paint_join(this.option_0_paint.join.MITER);
        this.option_0_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.option_0_paint.set_color(global.GENERAL_BOUNDS_COLOR);
        this.option_0_paint.set_text_size(global.canvas_text_size_5);
        this.option_0_paint.set_font(global.DEFAULT_FONT);
        this.option_0_paint.set_alpha(255);
        this.option_0_paint.set_paint_align(this.option_0_paint.align.CENTER);
        this.option_1_paint = new Paint();
        this.option_1_paint.set_paint_style(this.option_1_paint.style.FILL);
        this.option_1_paint.set_paint_cap(this.option_1_paint.cap.ROUND);
        this.option_1_paint.set_paint_join(this.option_1_paint.join.MITER);
        this.option_1_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.option_1_paint.set_color(global.GENERAL_BOUNDS_COLOR);
        this.option_1_paint.set_text_size(global.canvas_text_size_5);
        this.option_1_paint.set_font(global.DEFAULT_FONT);
        this.option_1_paint.set_alpha(255);
        this.option_1_paint.set_paint_align(this.option_1_paint.align.CENTER);
        this.option_2_paint = new Paint();
        this.option_2_paint.set_paint_style(this.option_2_paint.style.FILL);
        this.option_2_paint.set_paint_cap(this.option_2_paint.cap.ROUND);
        this.option_2_paint.set_paint_join(this.option_2_paint.join.MITER);
        this.option_2_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.option_2_paint.set_color(global.GENERAL_BOUNDS_COLOR);
        this.option_2_paint.set_text_size(global.canvas_text_size_5);
        this.option_2_paint.set_font(global.DEFAULT_FONT);
        this.option_2_paint.set_alpha(255);
        this.option_2_paint.set_paint_align(this.option_2_paint.align.CENTER);
        this.option_3_paint = new Paint();
        this.option_3_paint.set_paint_style(this.option_3_paint.style.FILL);
        this.option_3_paint.set_paint_cap(this.option_3_paint.cap.ROUND);
        this.option_3_paint.set_paint_join(this.option_3_paint.join.MITER);
        this.option_3_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.option_3_paint.set_color(global.GENERAL_BOUNDS_COLOR);
        this.option_3_paint.set_text_size(global.canvas_text_size_5);
        this.option_3_paint.set_font(global.DEFAULT_FONT);
        this.option_3_paint.set_alpha(255);
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
        let padding = this.PADDING * this.bounds.get_width();
        this.option_0 = new RectF(this.bounds.left + padding, this.bounds.top + padding, this.bounds.get_center_x() - padding * 0.5, this.bounds.get_center_y() - padding * 0.5);
        this.option_1 = new RectF(this.bounds.get_center_x() + padding * 0.5, this.bounds.top + padding, this.bounds.right - padding, this.bounds.get_center_y() - padding * 0.5);
        this.option_2 = new RectF(this.bounds.left + padding, this.bounds.get_center_y() + padding * 0.5, this.bounds.get_center_x() - padding * 0.5, this.bounds.bottom - padding);
        this.option_3 = new RectF(this.bounds.get_center_x() + padding * 0.5, this.bounds.get_center_y() + padding * 0.5, this.bounds.right - padding, this.bounds.bottom - padding);
        this.first_touch_x = 0;
        this.first_touch_y = 0;
    }
    mouse_down() {
        if (global.flag_zoom) {
            this.first_touch_x = global.mouse_x;
            this.first_touch_y = global.mouse_y;
        }
    }
    mouse_move() {
        if (global.flag_zoom) {
            if (!global.MOBILE_MODE) {
                this.hover();
            }
        }
    }
    mouse_up() {
        if (global.flag_zoom) {
            if (!global.mouse_keyboard_lock) {
                if (!this.bounds.contains_xy(global.mouse_x, global.mouse_y) && !this.bounds.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    menu_bar.handle_zoom_flag(!global.flag_zoom);
                    global.component_touched = true;
                }
                else if (this.option_0.contains_xy(global.mouse_x, global.mouse_y) && this.option_0.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    this.set_zoom(this.options['c0']['number']);
                    menu_bar.handle_zoom_flag(!global.flag_zoom);
                    global.component_touched = true;
                }
                else if (this.option_1.contains_xy(global.mouse_x, global.mouse_y) && this.option_1.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    this.set_zoom(this.options['c1']['number']);
                    menu_bar.handle_zoom_flag(!global.flag_zoom);
                    global.component_touched = true;
                }
                else if (this.option_2.contains_xy(global.mouse_x, global.mouse_y) && this.option_2.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    this.set_zoom(this.options['c2']['number']);
                    menu_bar.handle_zoom_flag(!global.flag_zoom);
                    global.component_touched = true;
                }
                else if (this.option_3.contains_xy(global.mouse_x, global.mouse_y) && this.option_3.contains_xy(this.first_touch_x, this.first_touch_y)) {
                    menu_bar.handle_zoom_flag(!global.flag_zoom);
                    global.component_touched = true;
                }
            }
        }
    }
    key_down(key_event) {
        if (global.flag_zoom) {
            if (key_event['event'].code === global.KEY_CODE_ENTER || key_event['event'].code === global.KEY_CODE_ESCAPE) {
                menu_bar.handle_zoom_flag(!global.flag_zoom);
                global.component_touched = true;
            }
        }
    }
    hover() {
        if (this.option_0.contains_xy(global.mouse_x, global.mouse_y)) {
            this.option_0_paint.set_color(global.GENERAL_HOVER_COLOR);
        }
        else {
            this.option_0_paint.set_color(global.GENERAL_BOUNDS_COLOR);
        }
        if (this.option_1.contains_xy(global.mouse_x, global.mouse_y)) {
            this.option_1_paint.set_color(global.GENERAL_HOVER_COLOR);
        }
        else {
            this.option_1_paint.set_color(global.GENERAL_BOUNDS_COLOR);
        }
        if (this.option_2.contains_xy(global.mouse_x, global.mouse_y)) {
            this.option_2_paint.set_color(global.GENERAL_HOVER_COLOR);
        }
        else {
            this.option_2_paint.set_color(global.GENERAL_BOUNDS_COLOR);
        }
        if (this.option_3.contains_xy(global.mouse_x, global.mouse_y)) {
            this.option_3_paint.set_color(global.GENERAL_HOVER_COLOR);
        }
        else {
            this.option_3_paint.set_color(global.GENERAL_BOUNDS_COLOR);
        }
    }
    set_zoom(zoom) {
        if (zoom >= global.ZOOM_MIN && zoom <= global.ZOOM_MAX) {
            global.signal_build_element = true;
            global.signal_build_counter = 0;
            global.workspace_zoom_scale = zoom;
            global.x_offset = 0;
            global.y_offset = 0;
            global.delta_x = workspace.bounds.left;
            global.delta_y = workspace.bounds.top;
            workspace.workspace_zoom();
            let dx = view_port.center_x - workspace.bounds.get_center_x();
            let dy = view_port.center_y - workspace.bounds.get_center_y();
            workspace.workspace_translate_bounds(dx, dy);
            global.delta_x += dx;
            global.delta_y += dy;
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
        this.option_0.set_bounds(this.bounds.left + padding, this.bounds.top + padding, this.bounds.get_center_x() - padding * 0.5, this.bounds.get_center_y() - padding * 0.5);
        this.option_1.set_bounds(this.bounds.get_center_x() + padding * 0.5, this.bounds.top + padding, this.bounds.right - padding, this.bounds.get_center_y() - padding * 0.5);
        this.option_2.set_bounds(this.bounds.left + padding, this.bounds.get_center_y() + padding * 0.5, this.bounds.get_center_x() - padding * 0.5, this.bounds.bottom - padding);
        this.option_3.set_bounds(this.bounds.get_center_x() + padding * 0.5, this.bounds.get_center_y() + padding * 0.5, this.bounds.right - padding, this.bounds.bottom - padding);
        this.line_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.line_paint.set_text_size(global.canvas_text_size_5);
        this.text_paint.set_stroke_width(global.canvas_stroke_width_1);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(0.75 * global.canvas_text_size_6);
        }
        else {
            this.text_paint.set_text_size(global.canvas_text_size_5);
        }
        this.fill_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.fill_paint.set_text_size(global.canvas_text_size_5);
        this.bounds_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.bounds_paint.set_text_size(global.canvas_text_size_5);
    }
    draw_window(canvas) {
        if (global.flag_zoom) {
            if (!global.MOBILE_MODE) {
                canvas.draw_color2(global.GENERAL_BLACK_COLOR, 130, view_port.left, view_port.top, view_port.view_width, view_port.view_height);
            }
            canvas.draw_rect2(this.bounds, this.bounds_paint);
            canvas.draw_rect2(this.option_0, this.option_0_paint);
            canvas.draw_text(this.options['c0']['string'], this.option_0.get_center_x(), this.option_0.get_center_y(), this.text_paint);
            canvas.draw_rect2(this.option_1, this.option_1_paint);
            canvas.draw_text(this.options['c1']['string'], this.option_1.get_center_x(), this.option_1.get_center_y(), this.text_paint);
            canvas.draw_rect2(this.option_2, this.option_2_paint);
            canvas.draw_text(this.options['c2']['string'], this.option_2.get_center_x(), this.option_2.get_center_y(), this.text_paint);
            canvas.draw_rect2(this.option_3, this.option_3_paint);
            canvas.draw_text(language_manager.EXIT[global.LANGUAGES[global.language_index]], this.option_3.get_center_x(), this.option_3.get_center_y(), this.text_paint);
        }
    }
}
