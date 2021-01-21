'use strict';
class SaveCircuitWindow {
    constructor() {
        this.TITLE_HEIGHT_RATIO = 0.25;
        this.BUTTON_WIDTH_RATIO = 0.3;
        this.BUTTON_HEIGHT_RATIO = 0.25;
        this.PADDING = 0.025;
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.line_paint.set_text_size(global.canvas_text_size_4);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        this.point_paint = new Paint();
        this.point_paint.set_paint_style(this.point_paint.style.FILL);
        this.point_paint.set_paint_cap(this.point_paint.cap.ROUND);
        this.point_paint.set_paint_join(this.point_paint.join.MITER);
        this.point_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.point_paint.set_color(global.ELEMENT_COLOR);
        this.point_paint.set_text_size(global.canvas_text_size_4);
        this.point_paint.set_font(global.DEFAULT_FONT);
        this.point_paint.set_alpha(255);
        this.point_paint.set_paint_align(this.point_paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.text_paint.set_color(global.GENERAL_YELLOW_COLOR);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.canvas_text_size_5);
        }
        else {
            this.text_paint.set_text_size(global.canvas_text_size_4);
        }
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.LEFT);
        this.hover_paint = new Paint();
        this.hover_paint.set_paint_style(this.hover_paint.style.FILL);
        this.hover_paint.set_paint_cap(this.hover_paint.cap.ROUND);
        this.hover_paint.set_paint_join(this.hover_paint.join.MITER);
        this.hover_paint.set_stroke_width(0.6 * global.canvas_stroke_width_3);
        this.hover_paint.set_color(global.GENERAL_HOVER_COLOR);
        this.hover_paint.set_text_size(global.canvas_text_size_5);
        this.hover_paint.set_font(global.DEFAULT_FONT);
        this.hover_paint.set_alpha(255);
        this.hover_paint.set_paint_align(this.hover_paint.align.CENTER);
        this.bounds_paint = new Paint();
        this.bounds_paint.set_paint_style(this.bounds_paint.style.FILL);
        this.bounds_paint.set_paint_cap(this.bounds_paint.cap.ROUND);
        this.bounds_paint.set_paint_join(this.bounds_paint.join.MITER);
        this.bounds_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.bounds_paint.set_color(global.GENERAL_FILL_COLOR);
        this.bounds_paint.set_text_size(global.canvas_text_size_4);
        this.bounds_paint.set_font(global.DEFAULT_FONT);
        this.bounds_paint.set_alpha(255);
        this.bounds_paint.set_paint_align(this.bounds_paint.align.CENTER);
        this.select_paint = new Paint();
        this.select_paint.set_paint_style(this.select_paint.style.FILL);
        this.select_paint.set_paint_cap(this.select_paint.cap.ROUND);
        this.select_paint.set_paint_join(this.select_paint.join.MITER);
        this.select_paint.set_stroke_width(0.6 * global.canvas_stroke_width_3);
        this.select_paint.set_color(global.GENERAL_CYAN_COLOR);
        this.select_paint.set_text_size(global.canvas_text_size_5);
        this.select_paint.set_font(global.DEFAULT_FONT);
        this.select_paint.set_alpha(64);
        this.select_paint.set_paint_align(this.select_paint.align.CENTER);
        if (global.MOBILE_MODE) {
            this.width = view_port.view_width * 0.2625;
            this.height = view_port.view_height * 0.15;
        }
        else {
            this.width = view_port.view_width * 0.15;
            this.height = view_port.view_height * 0.075;
        }
        this.bounds = new RectF(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
        this.title_bounds = new Button(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
        this.title_bounds.text = '';
        this.title_bounds.text_paint.set_paint_align(this.title_bounds.text_paint.align.LEFT);
        this.title_bounds.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.title_bounds.fill_paint.set_color(global.GENERAL_BLACK_COLOR);
        this.title_bounds.fill_paint.set_alpha(130);
        this.title_bounds.draw_stroke = false;
        this.title_bounds.draw_fill = true;
        this.title_bounds.draw_text = false;
        let padding = this.PADDING * this.bounds.get_width();
        let width = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
        let height = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
        this.okay_button = new Button(this.bounds.right - 2 * padding - 2 * width, this.bounds.bottom - height - padding, this.bounds.right - 2 * padding - width, this.bounds.bottom - padding);
        this.okay_button.text = '';
        this.okay_button.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.okay_button.fill_paint.set_color(global.GENERAL_BLACK_COLOR);
        this.okay_button.fill_paint.set_alpha(130);
        this.okay_button.draw_stroke = false;
        this.okay_button.draw_fill = true;
        this.cancel_button = new Button(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
        this.cancel_button.text = '';
        this.cancel_button.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.cancel_button.fill_paint.set_color(global.GENERAL_BLACK_COLOR);
        this.cancel_button.fill_paint.set_alpha(130);
        this.cancel_button.draw_stroke = false;
        this.cancel_button.draw_fill = true;
        this.exit_button = new Button(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
        this.exit_button.draw_stroke = true;
        this.exit_button.draw_fill = false;
        this.exit_button.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.input_button = new Button(this.title_bounds.left + padding, this.title_bounds.bottom + padding, this.cancel_button.right, this.okay_button.top - padding);
        this.input_button.text = global.exponentiate_quickly(global.time_step);
        this.input_button.fill_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.input_button.line_paint.set_color(global.GENERAL_BLACK_COLOR);
        this.input_button.draw_stroke = true;
        this.input_button.draw_fill = true;
        this.input_button.draw_cursor = false;
        this.input_button.draw_text = false;
        this.input_button.text_paint.set_color(global.GENERAL_BLACK_COLOR);
        this.input_button.resize_paint();
        this.CURSOR_POSITION = 0;
        this.SELECT_ALL = false;
        this.OFFSET_X = 0;
        this.OFFSET_Y = 0;
        this.WINDOW_ANCHORED = true;
        this.ANCHOR_X = 0;
        this.ANCHOR_Y = 0;
        this.first_touch_x = 0;
        this.first_touch_y = 0;
        this.measured_text = -1;
        this.INITIAL_CURSOR_DOWN = -1;
        this.SELECT_START = -1;
        this.SELECT_END = -1;
        this.SELECT_WIDTH = -1;
        this.SELECT_OFFSET_X = -1;
        this.MOUSE_DOWN = false;
        this.ASCENDING = false;
    }
    mouse_down() {
        if (global.flag_save_circuit) {
            if (this.title_bounds.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
                !this.exit_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y)) {
                this.ANCHOR_X = global.mouse_x - this.OFFSET_X;
                this.ANCHOR_Y = global.mouse_y - this.OFFSET_Y;
                this.WINDOW_ANCHORED = false;
            }
            this.first_touch_x = global.mouse_x;
            this.first_touch_y = global.mouse_y;
            this.INITIAL_CURSOR_DOWN = this.insert_cursor(false, false);
            this.MOUSE_DOWN = true;
        }
    }
    mouse_move() {
        if (global.flag_save_circuit) {
            if (!this.WINDOW_ANCHORED) {
                this.OFFSET_X = global.mouse_x - this.ANCHOR_X;
                this.OFFSET_Y = global.mouse_y - this.ANCHOR_Y;
                if (this.bounds.right + this.OFFSET_X >= view_port.right) {
                    this.OFFSET_X = view_port.right - this.bounds.right;
                }
                if (this.bounds.left + this.OFFSET_X <= view_port.left) {
                    this.OFFSET_X = view_port.left - this.bounds.left;
                }
                if (this.bounds.top + this.OFFSET_Y <= view_port.top) {
                    this.OFFSET_Y = view_port.top - this.bounds.top;
                }
                if (global.MOBILE_MODE) {
                    if (this.bounds.bottom + this.OFFSET_Y >= on_screen_keyboard.bounds.top) {
                        this.OFFSET_Y = on_screen_keyboard.bounds.top - this.bounds.bottom;
                    }
                }
                else {
                    if (this.bounds.bottom + this.OFFSET_Y >= view_port.bottom) {
                        this.OFFSET_Y = view_port.bottom - this.bounds.bottom;
                    }
                }
            }
            else {
                if (this.MOUSE_DOWN && this.INITIAL_CURSOR_DOWN !== -1) {
                    this.insert_cursor(true, true);
                }
            }
        }
    }
    mouse_up(canvas) {
        if (global.flag_save_circuit) {
            if (!global.mouse_keyboard_lock) {
                if (this.WINDOW_ANCHORED) {
                    this.insert_cursor(true, false);
                    this.INITIAL_CURSOR_DOWN = -1;
                    if (!this.bounds.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
                        !this.bounds.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)) {
                        if (global.MOBILE_MODE) {
                            if (!on_screen_keyboard.bounds.contains_xy(global.mouse_x, global.mouse_y)) {
                                menu_bar.handle_save_circuit_flag(!global.flag_save_circuit);
                                global.component_touched = true;
                            }
                        }
                        else {
                            menu_bar.handle_save_circuit_flag(!global.flag_save_circuit);
                            global.component_touched = true;
                        }
                    }
                    else if (this.okay_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
                        this.okay_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)) {
                        this.zoom_save_restore(canvas);
                        menu_bar.handle_save_circuit_flag(!global.flag_save_circuit);
                        global.component_touched = true;
                    }
                    else if (this.cancel_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
                        this.cancel_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)) {
                        menu_bar.handle_save_circuit_flag(!global.flag_save_circuit);
                        global.component_touched = true;
                    }
                    else if (this.exit_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
                        this.exit_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)) {
                        menu_bar.handle_save_circuit_flag(!global.flag_save_circuit);
                        global.component_touched = true;
                    }
                    else if (this.input_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
                        this.input_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)) {
                        if (this.SELECT_ALL) {
                            if (this.SELECT_ALL && !global.mouse_double_click_event_flag) {
                                this.SELECT_ALL = false;
                            }
                        }
                    }
                }
                else {
                    this.ANCHOR_X = global.mouse_x - this.OFFSET_X;
                    this.ANCHOR_Y = global.mouse_y - this.OFFSET_Y;
                }
                this.WINDOW_ANCHORED = true;
                this.MOUSE_DOWN = false;
            }
        }
    }
    insert_cursor(is_mouse_up, is_mouse_move) {
        let min = this.input_button.get_center_x() - this.measured_text * 0.5;
        let max = this.input_button.get_center_x() + this.measured_text * 0.5;
        let remapped_x = global.mouse_x - this.OFFSET_X;
        let remapped_y = global.mouse_y - this.OFFSET_Y;
        if (remapped_x <= min) {
            remapped_x = min;
        }
        if (remapped_x >= max) {
            remapped_x = max;
        }
        let width = max - min;
        let char_length = (this.input_button.text.substring(0, this.CURSOR_POSITION) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length)).length;
        let percent = (remapped_x - min) / width;
        let insert_at = Math.ceil(percent * char_length);
        if (is_mouse_up && this.input_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)) {
            if (!is_mouse_move) {
                this.CURSOR_POSITION = insert_at;
            }
            if (this.INITIAL_CURSOR_DOWN !== -1 && insert_at !== this.INITIAL_CURSOR_DOWN) {
                if (this.INITIAL_CURSOR_DOWN < insert_at) {
                    this.ASCENDING = true;
                }
                else {
                    this.ASCENDING = false;
                }
                this.SELECT_START = Math.min(insert_at, this.INITIAL_CURSOR_DOWN);
                this.SELECT_END = Math.max(insert_at, this.INITIAL_CURSOR_DOWN);
            }
            else {
                this.SELECT_START = -1;
                this.SELECT_END = -1;
            }
        }
        return insert_at;
    }
    key_down(key_event, canvas) {
        if (global.flag_save_circuit) {
            this.handle_keyboard(key_event, canvas);
        }
    }
    key_up() {
        if (global.flag_save_circuit) {
        }
    }
    handle_keyboard(key_event, canvas) {
        if (global.is_alpha_numeric(key_event) && key_event['event'].code !== global.KEY_CODE_DELETE && !key_event['ctrl']) {
            if (this.input_button.text.length < global.MAX_TEXT_LENGTH) {
                if (!this.SELECT_ALL) {
                    if (this.SELECT_START !== -1 && this.SELECT_END !== -1) {
                        this.handle_partial_select();
                    }
                    this.input_button.text =
                        this.input_button.text.substring(0, this.CURSOR_POSITION) + global.decode_key(key_event) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
                    if (this.CURSOR_POSITION < this.input_button.text.length) {
                        this.CURSOR_POSITION++;
                    }
                }
                else {
                    this.input_button.text = '';
                    this.CURSOR_POSITION = 0;
                    this.SELECT_ALL = false;
                    this.input_button.text =
                        this.input_button.text.substring(0, this.CURSOR_POSITION) + global.decode_key(key_event) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
                    if (this.CURSOR_POSITION < this.input_button.text.length) {
                        this.CURSOR_POSITION++;
                    }
                }
            }
            else {
                if (this.SELECT_ALL) {
                    this.input_button.text = '';
                    this.CURSOR_POSITION = 0;
                    this.SELECT_ALL = false;
                    this.input_button.text =
                        this.input_button.text.substring(0, this.CURSOR_POSITION) + global.decode_key(key_event) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
                    if (this.CURSOR_POSITION < this.input_button.text.length) {
                        this.CURSOR_POSITION++;
                    }
                }
            }
        }
        else if (key_event['event'].code === global.KEY_CODE_BACKSPACE && !key_event['ctrl']) {
            if (this.input_button.text.length > 0) {
                if (!this.SELECT_ALL) {
                    if (this.SELECT_START === this.SELECT_END) {
                        this.SELECT_START = -1;
                        this.SELECT_END = -1;
                    }
                    if (this.SELECT_START !== -1 && this.SELECT_END !== -1) {
                        this.handle_partial_select();
                    }
                    else {
                        this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION - 1) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
                        if (this.CURSOR_POSITION > 0) {
                            this.CURSOR_POSITION--;
                        }
                    }
                }
                else {
                    this.input_button.text = '';
                    this.CURSOR_POSITION = 0;
                    this.SELECT_ALL = false;
                }
            }
        }
        else if (key_event['event'].code === global.KEY_CODE_DELETE && !key_event['ctrl']) {
            if (this.input_button.text.length > 0) {
                if (!this.SELECT_ALL) {
                    if (this.SELECT_START === this.SELECT_END) {
                        this.SELECT_START = -1;
                        this.SELECT_END = -1;
                    }
                    if (this.SELECT_START !== -1 && this.SELECT_END !== -1) {
                        this.handle_partial_select();
                    }
                    else {
                        if (this.CURSOR_POSITION < this.input_button.text.length) {
                            this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + this.input_button.text.substring(this.CURSOR_POSITION + 1, this.input_button.text.length);
                        }
                    }
                }
                else {
                    this.input_button.text = '';
                    this.CURSOR_POSITION = 0;
                    this.SELECT_ALL = false;
                }
            }
        }
        else if ((key_event['event'].code === global.KEY_CODE_MINUS || key_event['event'].code === global.KEY_CODE_NUMPAD_MINUS) && !key_event['shift']) {
            if (this.input_button.text.length < global.MAX_TEXT_LENGTH) {
                if (!this.SELECT_ALL) {
                    if (this.SELECT_START !== -1 && this.SELECT_END !== -1) {
                        this.handle_partial_select();
                    }
                    this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '-' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
                    if (this.CURSOR_POSITION < this.input_button.text.length) {
                        this.CURSOR_POSITION++;
                    }
                }
                else {
                    this.input_button.text = '';
                    this.CURSOR_POSITION = 0;
                    this.SELECT_ALL = false;
                    this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '-' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
                    if (this.CURSOR_POSITION < this.input_button.text.length) {
                        this.CURSOR_POSITION++;
                    }
                }
            }
        }
        else if (key_event['event'].code === global.KEY_CODE_PERIOD && !key_event['shift'] && !key_event['ctrl']) {
            if (this.input_button.text.length < global.MAX_TEXT_LENGTH) {
                if (!this.SELECT_ALL) {
                    if (this.SELECT_START !== -1 && this.SELECT_END !== -1) {
                        this.handle_partial_select();
                    }
                    this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '.' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
                    if (this.CURSOR_POSITION < this.input_button.text.length) {
                        this.CURSOR_POSITION++;
                    }
                }
                else {
                    this.input_button.text = '';
                    this.CURSOR_POSITION = 0;
                    this.SELECT_ALL = false;
                    this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '.' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
                    if (this.CURSOR_POSITION < this.input_button.text.length) {
                        this.CURSOR_POSITION++;
                    }
                }
            }
        }
        else if (key_event['event'].code === global.KEY_CODE_ENTER && !key_event['ctrl']) {
            this.zoom_save_restore(canvas);
            menu_bar.handle_save_circuit_flag(!global.flag_save_circuit);
        }
        else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT && !key_event['ctrl']) {
            if (key_event['shift'] === false) {
                this.SELECT_START = -1;
                this.SELECT_END = -1;
                if (this.CURSOR_POSITION > 0) {
                    this.CURSOR_POSITION--;
                    this.SELECT_ALL = false;
                }
            }
            else {
                if (this.SELECT_START === -1 && this.SELECT_END === -1) {
                    this.SELECT_START = this.CURSOR_POSITION - 1;
                    this.SELECT_END = this.CURSOR_POSITION;
                    if (this.SELECT_START < 0) {
                        this.SELECT_START = 0;
                        this.SELECT_END = 0;
                    }
                    this.CURSOR_POSITION = this.SELECT_START;
                    this.ASCENDING = false;
                }
                else {
                    if (this.ASCENDING) {
                        if (this.SELECT_END > 0) {
                            this.SELECT_END--;
                            this.CURSOR_POSITION = this.SELECT_END;
                        }
                    }
                    else {
                        if (this.SELECT_START > 0) {
                            this.SELECT_START--;
                            this.CURSOR_POSITION = this.SELECT_START;
                        }
                    }
                }
            }
        }
        else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT && !key_event['ctrl']) {
            if (key_event['shift'] === false) {
                this.SELECT_START = -1;
                this.SELECT_END = -1;
                if (this.CURSOR_POSITION < this.input_button.text.length) {
                    this.CURSOR_POSITION++;
                    this.SELECT_ALL = false;
                }
            }
            else {
                if (this.SELECT_START === -1 && this.SELECT_END === -1) {
                    this.SELECT_START = this.CURSOR_POSITION;
                    this.SELECT_END = this.CURSOR_POSITION + 1;
                    if (this.CURSOR_POSITION >= this.input_button.text.length) {
                        this.SELECT_START = this.CURSOR_POSITION;
                        this.SELECT_END = this.CURSOR_POSITION;
                    }
                    this.CURSOR_POSITION = this.SELECT_END;
                    this.ASCENDING = true;
                }
                else {
                    if (this.ASCENDING) {
                        if (this.SELECT_END < this.input_button.text.length) {
                            this.SELECT_END++;
                            this.CURSOR_POSITION = this.SELECT_END;
                        }
                    }
                    else {
                        if (this.SELECT_START < this.input_button.text.length) {
                            this.SELECT_START++;
                            this.CURSOR_POSITION = this.SELECT_START;
                        }
                    }
                }
            }
        }
        else if (key_event['event'].code === global.KEY_CODE_ESCAPE && !key_event['ctrl']) {
            menu_bar.handle_save_circuit_flag(!global.flag_save_circuit);
        }
        else if (key_event['event'].code === global.KEY_CODE_HOME) {
            if (key_event['shift'] === false) {
                this.SELECT_START = -1;
                this.SELECT_END = -1;
                this.CURSOR_POSITION = 0;
                this.SELECT_ALL = false;
            }
            else {
                if (this.SELECT_START === -1 && this.SELECT_END === -1) {
                    this.SELECT_ALL = false;
                    this.SELECT_START = 0;
                    this.SELECT_END = this.CURSOR_POSITION;
                    if (this.SELECT_START < 0) {
                        this.SELECT_START = 0;
                        this.SELECT_END = 0;
                    }
                    this.CURSOR_POSITION = this.SELECT_START;
                    this.ASCENDING = false;
                }
                else {
                    if (this.ASCENDING) {
                        this.SELECT_ALL = false;
                        if (this.SELECT_END > 0) {
                            this.SELECT_END = 0;
                            this.CURSOR_POSITION = this.SELECT_END;
                        }
                    }
                    else {
                        this.SELECT_ALL = false;
                        if (this.SELECT_START > 0) {
                            this.SELECT_START = 0;
                            this.CURSOR_POSITION = this.SELECT_START;
                        }
                    }
                }
            }
        }
        else if (key_event['event'].code === global.KEY_CODE_END && !key_event['ctrl']) {
            if (key_event['shift'] === false) {
                this.reset_cursor();
            }
            else {
                if (this.SELECT_START === -1 && this.SELECT_END === -1) {
                    this.SELECT_ALL = false;
                    this.SELECT_START = this.CURSOR_POSITION;
                    this.SELECT_END = this.input_button.text.length;
                    if (this.CURSOR_POSITION >= this.input_button.text.length) {
                        this.SELECT_START = this.CURSOR_POSITION;
                        this.SELECT_END = this.CURSOR_POSITION;
                    }
                    this.CURSOR_POSITION = this.SELECT_END;
                    this.ASCENDING = true;
                }
                else {
                    if (this.ASCENDING) {
                        this.SELECT_ALL = false;
                        if (this.SELECT_END < this.input_button.text.length) {
                            this.SELECT_END = this.input_button.text.length;
                            this.CURSOR_POSITION = this.SELECT_END;
                        }
                    }
                    else {
                        this.SELECT_ALL = false;
                        if (this.SELECT_START < this.input_button.text.length) {
                            this.SELECT_START = this.input_button.text.length;
                            this.CURSOR_POSITION = this.SELECT_START;
                        }
                    }
                }
            }
        }
        else if (key_event['event'].code === global.KEY_CODE_A && key_event['ctrl'] === true) {
            this.SELECT_ALL = false;
            this.SELECT_START = 0;
            this.ASCENDING = true;
            this.SELECT_END = this.input_button.text.length;
            this.CURSOR_POSITION = this.input_button.text.length;
        }
    }
    zoom_save_restore(canvas) {
        let previous_zoom = global.workspace_zoom_scale;
        let x_offset = global.x_offset;
        let y_offset = global.y_offset;
        let delta_x = global.delta_x;
        let delta_y = global.delta_y;
        let last_dx = global.dx;
        let last_dy = global.dy;
        global.signal_build_element = true;
        global.signal_build_counter = 0;
        global.workspace_zoom_scale = 1.0;
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
        global.user_file.title = this.input_button.text;
        let node_space_x = 0.29375 * global.node_space_x;
        let node_space_y = 0.29375 * global.node_space_y;
        let mobile_node_space_x = 1.25 * node_space_x;
        let mobile_node_space_y = 1.25 * node_space_y;
        for (var i = nodes.length - 1; i > -1; i--) {
            nodes[i].resize(node_space_x, node_space_y, mobile_node_space_x, mobile_node_space_y);
        }
        if (global.DEVELOPER_MODE) {
            for (var i = nodes.length - 1; i > -1; i--) {
                nodes[i].draw(canvas);
            }
        }
        workspace.workspace_draw(canvas);
        engine_functions.draw_unselected_components(canvas);
        engine_functions.draw_wires(canvas);
        engine_functions.draw_selected_components(canvas);
        engine_functions.draw_meter_traces(canvas);
        if (global.MOBILE_MODE) {
            file_saver.click();
        }
        else {
            save_file(global.user_file.title + '.txt', engine_functions.history_snapshot());
        }
        global.workspace_zoom_scale = previous_zoom;
        global.dx = last_dx;
        global.dy = last_dy;
        global.x_offset = x_offset;
        global.y_offset = y_offset;
        global.delta_x = delta_x;
        global.delta_y = delta_y;
        workspace.workspace_zoom();
        global.draw_block = true;
        global.signal_build_element = true;
    }
    handle_partial_select() {
        if (this.SELECT_START !== this.SELECT_END) {
            let min = Math.min(this.SELECT_START, this.SELECT_END);
            let max = Math.max(this.SELECT_START, this.SELECT_END);
            this.input_button.text = this.input_button.text.substring(0, min) + this.input_button.text.substring(max, this.input_button.text.length);
            if (this.CURSOR_POSITION > 0) {
                this.CURSOR_POSITION = Math.min(min, max);
            }
        }
        this.SELECT_START = -1;
        this.SELECT_END = -1;
    }
    reset_cursor() {
        this.CURSOR_POSITION = this.input_button.text.length;
        this.SELECT_ALL = false;
        this.SELECT_START = -1;
        this.SELECT_END = -1;
    }
    double_click() {
        if (global.mouse_double_click_event_flag) {
            if (this.input_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y)) {
                this.SELECT_ALL = !this.SELECT_ALL;
                if (this.SELECT_ALL) {
                    this.SELECT_START = 0;
                    this.ASCENDING = true;
                    this.SELECT_END = this.input_button.text.length;
                    this.CURSOR_POSITION = this.input_button.text.length;
                }
            }
        }
    }
    resize_window() {
        if (global.MOBILE_MODE) {
            this.width = view_port.view_width * 0.2625;
            this.height = view_port.view_height * 0.15;
        }
        else {
            this.width = view_port.view_width * 0.15;
            this.height = view_port.view_height * 0.075;
        }
        this.bounds.set_bounds(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
        this.title_bounds.set_bounds(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
        this.title_bounds.resize_paint();
        let padding = this.PADDING * this.bounds.get_width();
        let width = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
        let height = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
        this.okay_button.set_bounds(this.bounds.right - 2 * padding - 2 * width, this.bounds.bottom - height - padding, this.bounds.right - 2 * padding - width, this.bounds.bottom - padding);
        this.okay_button.resize_paint();
        this.cancel_button.set_bounds(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
        this.cancel_button.resize_paint();
        this.exit_button.set_bounds(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
        this.exit_button.resize_paint();
        this.input_button.set_bounds(this.title_bounds.left + padding, this.title_bounds.bottom + padding, this.cancel_button.right, this.okay_button.top - padding);
        this.input_button.resize_paint();
        this.line_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.line_paint.set_text_size(global.canvas_text_size_4);
        this.point_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.point_paint.set_text_size(global.canvas_text_size_4);
        this.bounds_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.bounds_paint.set_text_size(global.canvas_text_size_4);
        this.text_paint.set_stroke_width(global.canvas_stroke_width_1);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.canvas_text_size_5);
        }
        else {
            this.text_paint.set_text_size(global.canvas_text_size_4);
        }
        this.hover_paint.set_stroke_width(0.6 * global.canvas_stroke_width_3);
        this.hover_paint.set_text_size(global.canvas_text_size_5);
        this.select_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.select_paint.set_text_size(global.canvas_text_size_4);
        this.reset_cursor();
        if (global.MOBILE_MODE) {
            if (this.bounds.bottom + this.OFFSET_Y >= on_screen_keyboard.bounds.top) {
                this.OFFSET_Y = -0.25 * view_port.view_height;
            }
        }
    }
    draw_window(canvas) {
        if (global.flag_save_circuit) {
            if (!global.MOBILE_MODE) {
                canvas.draw_color2(global.GENERAL_BLACK_COLOR, 130, view_port.left, view_port.top, view_port.view_width, view_port.view_height);
            }
            if (global.MOBILE_MODE) {
                if (this.bounds.bottom + this.OFFSET_Y >= on_screen_keyboard.bounds.top) {
                    this.OFFSET_Y = on_screen_keyboard.bounds.top - this.bounds.bottom;
                }
            }
            this.title_bounds.text = language_manager.SAVE_CIRCUIT[global.LANGUAGES[global.language_index]];
            this.okay_button.text = language_manager.OKAY[global.LANGUAGES[global.language_index]];
            this.cancel_button.text = language_manager.CANCEL[global.LANGUAGES[global.language_index]];
            canvas.draw_rect(this.bounds.left + this.OFFSET_X, this.bounds.top + this.OFFSET_Y, this.bounds.right + this.OFFSET_X, this.bounds.bottom + this.OFFSET_Y, this.bounds_paint);
            this.title_bounds.draw_button_dxdy(canvas, this.OFFSET_X, this.OFFSET_Y);
            this.title_bounds.draw_button_text(canvas, this.title_bounds.left + this.PADDING * this.title_bounds.get_width() + this.OFFSET_X, this.title_bounds.get_center_y() + this.OFFSET_Y);
            if (this.okay_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) && this.WINDOW_ANCHORED && !global.MOBILE_MODE) {
                this.okay_button.fill_paint.set_color(global.GENERAL_HOVER_COLOR);
                this.okay_button.fill_paint.set_alpha(255);
            }
            else {
                this.okay_button.fill_paint.set_color(global.GENERAL_BLACK_COLOR);
                this.okay_button.fill_paint.set_alpha(130);
            }
            this.okay_button.draw_button_dxdy(canvas, this.OFFSET_X, this.OFFSET_Y);
            if (this.cancel_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) && this.WINDOW_ANCHORED && !global.MOBILE_MODE) {
                this.cancel_button.fill_paint.set_color(global.GENERAL_HOVER_COLOR);
                this.cancel_button.fill_paint.set_alpha(255);
            }
            else {
                this.cancel_button.fill_paint.set_color(global.GENERAL_BLACK_COLOR);
                this.cancel_button.fill_paint.set_alpha(130);
            }
            this.cancel_button.draw_button_dxdy(canvas, this.OFFSET_X, this.OFFSET_Y);
            this.input_button.draw_button_dxdy(canvas, this.OFFSET_X, this.OFFSET_Y);
            let text = this.input_button.text.substring(0, this.CURSOR_POSITION) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
            canvas.draw_text(text, this.input_button.get_center_x() + this.OFFSET_X, this.input_button.get_center_y() + this.OFFSET_Y, this.input_button.text_paint);
            this.measured_text = this.input_button.text_paint.measure_text(text);
            let adj_text = this.input_button.text;
            if (this.SELECT_ALL && this.SELECT_START === -1 && this.SELECT_END === -1) {
                canvas.draw_rect3(this.input_button.get_center_x() + this.OFFSET_X, this.input_button.get_center_y() + this.OFFSET_Y, this.measured_text * 1.1, this.input_button.get_height() * 0.7, this.select_paint);
            }
            let cached_measured_text = this.measured_text * 0.5;
            if (this.SELECT_START !== -1 && this.SELECT_END !== -1) {
                let min = Math.min(this.SELECT_START, this.SELECT_END);
                let max = Math.max(this.SELECT_START, this.SELECT_END);
                this.SELECT_WIDTH = this.text_paint.measure_text(adj_text.substring(min, max));
                this.SELECT_OFFSET_X = this.text_paint.measure_text(adj_text.substring(0, min));
                canvas.draw_rect(this.input_button.get_center_x() - cached_measured_text + this.SELECT_OFFSET_X + this.OFFSET_X, this.input_button.get_center_y() - this.input_button.get_height() * 0.35 + this.OFFSET_Y, this.input_button.get_center_x() - cached_measured_text + this.SELECT_OFFSET_X + this.OFFSET_X + this.SELECT_WIDTH, this.input_button.get_center_y() + this.input_button.get_height() * 0.35 + this.OFFSET_Y, this.select_paint);
            }
            canvas.draw_text('  _', this.input_button.get_center_x() - cached_measured_text + this.input_button.text_paint.measure_text(adj_text.substring(0, this.CURSOR_POSITION)) + this.OFFSET_X, this.input_button.get_center_y() + this.OFFSET_Y, this.input_button.text_paint);
            if (this.exit_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) && this.WINDOW_ANCHORED && !global.MOBILE_MODE) {
                canvas.draw_rect(this.exit_button.left + this.OFFSET_X, this.exit_button.top + this.OFFSET_Y, this.exit_button.right + this.OFFSET_X, this.exit_button.bottom + this.OFFSET_Y, this.hover_paint);
            }
            let width_mul_0p3636 = this.exit_button.get_width() * 0.3636;
            let height_mul_0p3636 = this.exit_button.get_height() * 0.3636;
            canvas.draw_line(this.exit_button.left + width_mul_0p3636 + this.OFFSET_X, this.exit_button.top + height_mul_0p3636 + this.OFFSET_Y, this.exit_button.right - width_mul_0p3636 + this.OFFSET_X, this.exit_button.bottom - height_mul_0p3636 + this.OFFSET_Y, this.line_paint);
            canvas.draw_line(this.exit_button.right - width_mul_0p3636 + this.OFFSET_X, this.exit_button.top + height_mul_0p3636 + this.OFFSET_Y, this.exit_button.left + width_mul_0p3636 + this.OFFSET_X, this.exit_button.bottom - height_mul_0p3636 + this.OFFSET_Y, this.line_paint);
            canvas.draw_text('(' + this.input_button.text.length + ' / ' + global.MAX_TEXT_LENGTH + ')', this.input_button.left + this.OFFSET_X, this.okay_button.get_center_y() + this.OFFSET_Y, this.text_paint);
        }
    }
}
