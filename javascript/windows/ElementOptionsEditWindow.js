'use strict';
class ElementOptionsEditWindow {
    constructor() {
        this.TITLE_HEIGHT_RATIO = 0.25;
        this.BUTTON_WIDTH_RATIO = 0.3;
        this.BUTTON_HEIGHT_RATIO = 0.25;
        this.PADDING = 0.0175;
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        this.point_paint = new Paint();
        this.point_paint.set_paint_style(this.point_paint.style.FILL);
        this.point_paint.set_paint_cap(this.point_paint.cap.ROUND);
        this.point_paint.set_paint_join(this.point_paint.join.MITER);
        this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.point_paint.set_color(global.ELEMENT_COLOR);
        this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.point_paint.set_font(global.DEFAULT_FONT);
        this.point_paint.set_alpha(255);
        this.point_paint.set_paint_align(this.point_paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.text_paint.set_color(global.GENERAL_YELLOW_COLOR);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        }
        else {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        }
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.LEFT);
        this.hover_paint = new Paint();
        this.hover_paint.set_paint_style(this.hover_paint.style.FILL);
        this.hover_paint.set_paint_cap(this.hover_paint.cap.ROUND);
        this.hover_paint.set_paint_join(this.hover_paint.join.MITER);
        this.hover_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
        this.hover_paint.set_color(global.GENERAL_HOVER_COLOR);
        this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.hover_paint.set_font(global.DEFAULT_FONT);
        this.hover_paint.set_alpha(255);
        this.hover_paint.set_paint_align(this.hover_paint.align.CENTER);
        this.bounds_paint = new Paint();
        this.bounds_paint.set_paint_style(this.bounds_paint.style.FILL);
        this.bounds_paint.set_paint_cap(this.bounds_paint.cap.ROUND);
        this.bounds_paint.set_paint_join(this.bounds_paint.join.MITER);
        this.bounds_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.bounds_paint.set_color(global.GENERAL_FILL_COLOR);
        this.bounds_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.bounds_paint.set_font(global.DEFAULT_FONT);
        this.bounds_paint.set_alpha(255);
        this.bounds_paint.set_paint_align(this.bounds_paint.align.CENTER);
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
        this.input_button.text = '';
        this.input_button.fill_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.input_button.line_paint.set_color(global.GENERAL_BLACK_COLOR);
        this.input_button.draw_stroke = true;
        this.input_button.draw_fill = true;
        this.input_button.draw_cursor = false;
        this.input_button.draw_text = false;
        this.input_button.text_paint.set_color(global.GENERAL_BLACK_COLOR);
        this.input_button.resize_paint();
        this.select_paint = new Paint();
        this.select_paint.set_paint_style(this.select_paint.style.FILL);
        this.select_paint.set_paint_cap(this.select_paint.cap.ROUND);
        this.select_paint.set_paint_join(this.select_paint.join.MITER);
        this.select_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
        this.select_paint.set_color(global.GENERAL_CYAN_COLOR);
        this.select_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.select_paint.set_font(global.DEFAULT_FONT);
        this.select_paint.set_alpha(64);
        this.select_paint.set_paint_align(this.select_paint.align.CENTER);
        this.option_index = -1;
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
    set_title(text) {
        this.title_bounds.text = text;
    }
    set_input_text(text) {
        this.input_button.text = text;
    }
    mouse_down() {
        if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
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
        if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
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
    mouse_up() {
        if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
            if (!global.mouse_keyboard_lock) {
                if (this.WINDOW_ANCHORED) {
                    this.insert_cursor(true, false);
                    this.INITIAL_CURSOR_DOWN = -1;
                    if (!this.bounds.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
                        !this.bounds.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)) {
                        if (global.MOBILE_MODE) {
                            if (!on_screen_keyboard.bounds.contains_xy(global.mouse_x, global.mouse_y)) {
                                menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
                                menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
                                global.component_touched = true;
                                global.mouse_keyboard_lock = true;
                            }
                        }
                        else {
                            menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
                            menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
                            global.component_touched = true;
                            global.mouse_keyboard_lock = true;
                        }
                    }
                    else if (this.okay_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
                        this.okay_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)) {
                        if (!this.push_property_update()) {
                            menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
                            menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
                        }
                        global.component_touched = true;
                        global.mouse_keyboard_lock = true;
                    }
                    else if (this.cancel_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
                        this.cancel_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)) {
                        menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
                        menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
                        global.component_touched = true;
                        global.mouse_keyboard_lock = true;
                    }
                    else if (this.exit_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
                        this.exit_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)) {
                        menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
                        menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
                        global.component_touched = true;
                        global.mouse_keyboard_lock = true;
                    }
                    else if (this.input_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
                        this.input_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)) {
                        if (this.SELECT_ALL) {
                            if (this.SELECT_ALL && !global.MOUSE_DOUBLE_CLICK_EVENT) {
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
    key_down(key_event) {
        if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
            if (!global.mouse_keyboard_lock) {
                this.handle_keyboard(key_event);
            }
        }
    }
    key_up(key_event) {
        if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
        }
    }
    handle_keyboard(key_event) {
        if (!this.special_type(global.selected_type)) {
            if (global.is_valid_si_units(key_event) && key_event['event'].code !== global.KEY_CODE_DELETE && !key_event['ctrl']) {
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
                if (!this.push_property_update()) {
                    menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
                    menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
                }
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
                menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
                menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
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
        else {
            if (global.selected_type === global.TYPE_NOTE) {
                if (global.is_alpha_numeric_note(key_event) && key_event['event'].code !== global.KEY_CODE_DELETE && !key_event['ctrl']) {
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
                else if (key_event['event'].code === global.KEY_CODE_MINUS || key_event['event'].code === global.KEY_CODE_NUMPAD_MINUS) {
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
                    if (!this.push_property_update()) {
                        menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
                        menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
                    }
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
                    menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
                    menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
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
            else if (global.selected_type === global.TYPE_NET) {
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
                else if (key_event['event'].code === global.KEY_CODE_MINUS || key_event['event'].code === global.KEY_CODE_NUMPAD_MINUS) {
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
                    if (!this.push_property_update()) {
                        menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
                        menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
                    }
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
                    menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
                    menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
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
        }
    }
    special_type(elm_type) {
        if (elm_type === global.TYPE_NET || elm_type === global.TYPE_NOTE) {
            return true;
        }
        return false;
    }
    push_property_update() {
        let ERROR_FLAG = false;
        /* #INSERT_GENERATE_ELEMENT_UPDATE_PROPERTY# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        if (global.selected_type === global.TYPE_RESISTOR) {
            var index = -1;
            index = engine_functions.get_resistor(global.selected_id);
            if (index < resistors.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    resistors[index].elm.properties[resistors[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_CAPACITOR) {
            var index = -1;
            index = engine_functions.get_capacitor(global.selected_id);
            if (index < capacitors.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    capacitors[index].elm.properties[capacitors[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
                if (capacitors[index].elm.properties['options'][this.option_index] === 'Capacitance') {
                    capacitors[index].conserve_energy();
                }
            }
        }
        else if (global.selected_type === global.TYPE_INDUCTOR) {
            var index = -1;
            index = engine_functions.get_inductor(global.selected_id);
            if (index < inductors.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    inductors[index].elm.properties[inductors[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
                if (inductors[index].elm.properties['options'][this.option_index] === 'Inductance') {
                    inductors[index].conserve_energy();
                }
            }
        }
        else if (global.selected_type === global.TYPE_GROUND) {
            var index = -1;
            index = engine_functions.get_ground(global.selected_id);
            if (index < grounds.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    grounds[index].elm.properties[grounds[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_DCSOURCE) {
            var index = -1;
            index = engine_functions.get_dcsource(global.selected_id);
            if (index < dcsources.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    dcsources[index].elm.properties[dcsources[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_DCCURRENT) {
            var index = -1;
            index = engine_functions.get_dccurrent(global.selected_id);
            if (index < dccurrents.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    dccurrents[index].elm.properties[dccurrents[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_ACSOURCE) {
            var index = -1;
            index = engine_functions.get_acsource(global.selected_id);
            if (index < acsources.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    acsources[index].elm.properties[acsources[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_ACCURRENT) {
            var index = -1;
            index = engine_functions.get_accurrent(global.selected_id);
            if (index < accurrents.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    accurrents[index].elm.properties[accurrents[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_SQUAREWAVE) {
            var index = -1;
            index = engine_functions.get_squarewave(global.selected_id);
            if (index < squarewaves.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    squarewaves[index].elm.properties[squarewaves[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_SAW) {
            var index = -1;
            index = engine_functions.get_sawwave(global.selected_id);
            if (index < sawwaves.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    sawwaves[index].elm.properties[sawwaves[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_TRI) {
            var index = -1;
            index = engine_functions.get_trianglewave(global.selected_id);
            if (index < trianglewaves.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    trianglewaves[index].elm.properties[trianglewaves[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_CONSTANT) {
            var index = -1;
            index = engine_functions.get_constant(global.selected_id);
            if (index < constants.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    constants[index].elm.properties[constants[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_NET) {
            var index = -1;
            index = engine_functions.get_net(global.selected_id);
            if (index < nets.length) {
                let value = global.copy(this.input_button.text);
                global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                nets[index].elm.properties[nets[index].elm.properties['options'][this.option_index]] = value;
            }
        }
        else if (global.selected_type === global.TYPE_NOTE) {
            var index = -1;
            index = engine_functions.get_note(global.selected_id);
            if (index < notes.length) {
                let value = global.copy(this.input_button.text);
                global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                notes[index].elm.properties[notes[index].elm.properties['options'][this.option_index]] = value;
            }
        }
        else if (global.selected_type === global.TYPE_RAIL) {
            var index = -1;
            index = engine_functions.get_rail(global.selected_id);
            if (index < rails.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    rails[index].elm.properties[rails[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_VOLTMETER) {
            var index = -1;
            index = engine_functions.get_voltmeter(global.selected_id);
            if (index < voltmeters.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    voltmeters[index].elm.properties[voltmeters[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_OHMMETER) {
            var index = -1;
            index = engine_functions.get_ohmmeter(global.selected_id);
            if (index < ohmmeters.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    ohmmeters[index].elm.properties[ohmmeters[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_AMMETER) {
            var index = -1;
            index = engine_functions.get_ammeter(global.selected_id);
            if (index < ammeters.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    ammeters[index].elm.properties[ammeters[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_WATTMETER) {
            var index = -1;
            index = engine_functions.get_wattmeter(global.selected_id);
            if (index < wattmeters.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    wattmeters[index].elm.properties[wattmeters[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_FUSE) {
            var index = -1;
            index = engine_functions.get_fuse(global.selected_id);
            if (index < fuses.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    fuses[index].elm.properties[fuses[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_SPST) {
            var index = -1;
            index = engine_functions.get_spst(global.selected_id);
            if (index < spsts.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    spsts[index].elm.properties[spsts[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_SPDT) {
            var index = -1;
            index = engine_functions.get_spdt(global.selected_id);
            if (index < spdts.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    spdts[index].elm.properties[spdts[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_NOT) {
            var index = -1;
            index = engine_functions.get_not(global.selected_id);
            if (index < nots.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    nots[index].elm.properties[nots[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_DIODE) {
            var index = -1;
            index = engine_functions.get_diode(global.selected_id);
            if (index < diodes.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    diodes[index].elm.properties[diodes[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_LED) {
            var index = -1;
            index = engine_functions.get_led(global.selected_id);
            if (index < leds.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    leds[index].elm.properties[leds[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_ZENER) {
            var index = -1;
            index = engine_functions.get_zener(global.selected_id);
            if (index < zeners.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    zeners[index].elm.properties[zeners[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_POTENTIOMETER) {
            var index = -1;
            index = engine_functions.get_potentiometer(global.selected_id);
            if (index < potentiometers.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    potentiometers[index].elm.properties[potentiometers[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_AND) {
            var index = -1;
            index = engine_functions.get_and(global.selected_id);
            if (index < ands.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    ands[index].elm.properties[ands[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_OR) {
            var index = -1;
            index = engine_functions.get_or(global.selected_id);
            if (index < ors.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    ors[index].elm.properties[ors[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_NAND) {
            var index = -1;
            index = engine_functions.get_nand(global.selected_id);
            if (index < nands.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    nands[index].elm.properties[nands[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_NOR) {
            var index = -1;
            index = engine_functions.get_nor(global.selected_id);
            if (index < nors.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    nors[index].elm.properties[nors[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_XOR) {
            var index = -1;
            index = engine_functions.get_xor(global.selected_id);
            if (index < xors.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    xors[index].elm.properties[xors[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_XNOR) {
            var index = -1;
            index = engine_functions.get_xnor(global.selected_id);
            if (index < xnors.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    xnors[index].elm.properties[xnors[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_DFF) {
            var index = -1;
            index = engine_functions.get_dff(global.selected_id);
            if (index < dffs.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    dffs[index].elm.properties[dffs[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_VSAT) {
            var index = -1;
            index = engine_functions.get_vsat(global.selected_id);
            if (index < vsats.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    vsats[index].elm.properties[vsats[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_ADD) {
            var index = -1;
            index = engine_functions.get_adder(global.selected_id);
            if (index < adders.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    adders[index].elm.properties[adders[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_SUB) {
            var index = -1;
            index = engine_functions.get_subtractor(global.selected_id);
            if (index < subtractors.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    subtractors[index].elm.properties[subtractors[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_MUL) {
            var index = -1;
            index = engine_functions.get_multiplier(global.selected_id);
            if (index < multipliers.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    multipliers[index].elm.properties[multipliers[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_DIV) {
            var index = -1;
            index = engine_functions.get_divider(global.selected_id);
            if (index < dividers.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    dividers[index].elm.properties[dividers[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_GAIN) {
            var index = -1;
            index = engine_functions.get_gain(global.selected_id);
            if (index < gains.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    gains[index].elm.properties[gains[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_ABS) {
            var index = -1;
            index = engine_functions.get_absval(global.selected_id);
            if (index < absvals.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    absvals[index].elm.properties[absvals[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_VCSW) {
            var index = -1;
            index = engine_functions.get_vcsw(global.selected_id);
            if (index < vcsws.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    vcsws[index].elm.properties[vcsws[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_VCVS) {
            var index = -1;
            index = engine_functions.get_vcvs(global.selected_id);
            if (index < vcvss.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    vcvss[index].elm.properties[vcvss[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_VCCS) {
            var index = -1;
            index = engine_functions.get_vccs(global.selected_id);
            if (index < vccss.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    vccss[index].elm.properties[vccss[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_CCCS) {
            var index = -1;
            index = engine_functions.get_cccs(global.selected_id);
            if (index < cccss.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    cccss[index].elm.properties[cccss[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_CCVS) {
            var index = -1;
            index = engine_functions.get_ccvs(global.selected_id);
            if (index < ccvss.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    ccvss[index].elm.properties[ccvss[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_OPAMP) {
            var index = -1;
            index = engine_functions.get_opamp(global.selected_id);
            if (index < opamps.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    opamps[index].elm.properties[opamps[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_NMOS) {
            var index = -1;
            index = engine_functions.get_nmosfet(global.selected_id);
            if (index < nmosfets.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    nmosfets[index].elm.properties[nmosfets[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_PMOS) {
            var index = -1;
            index = engine_functions.get_pmosfet(global.selected_id);
            if (index < pmosfets.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    pmosfets[index].elm.properties[pmosfets[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_NPN) {
            var index = -1;
            index = engine_functions.get_npn(global.selected_id);
            if (index < npns.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    npns[index].elm.properties[npns[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_PNP) {
            var index = -1;
            index = engine_functions.get_pnp(global.selected_id);
            if (index < pnps.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    pnps[index].elm.properties[pnps[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_ADC) {
            var index = -1;
            index = engine_functions.get_adc(global.selected_id);
            if (index < adcs.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    adcs[index].elm.properties[adcs[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_DAC) {
            var index = -1;
            index = engine_functions.get_dac(global.selected_id);
            if (index < dacs.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    dacs[index].elm.properties[dacs[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_SAH) {
            var index = -1;
            index = engine_functions.get_samplers(global.selected_id);
            if (index < sandhs.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    sandhs[index].elm.properties[sandhs[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_PWM) {
            var index = -1;
            index = engine_functions.get_pwm(global.selected_id);
            if (index < pwms.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    pwms[index].elm.properties[pwms[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_INTEGRATOR) {
            var index = -1;
            index = engine_functions.get_integrator(global.selected_id);
            if (index < integrators.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    integrators[index].elm.properties[integrators[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
            var index = -1;
            index = engine_functions.get_differentiator(global.selected_id);
            if (index < differentiators.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    differentiators[index].elm.properties[differentiators[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_LPF) {
            var index = -1;
            index = engine_functions.get_lowpass(global.selected_id);
            if (index < lowpasses.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    lowpasses[index].elm.properties[lowpasses[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_HPF) {
            var index = -1;
            index = engine_functions.get_highpass(global.selected_id);
            if (index < highpasses.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    highpasses[index].elm.properties[highpasses[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_REL) {
            var index = -1;
            index = engine_functions.get_relay(global.selected_id);
            if (index < relays.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    relays[index].elm.properties[relays[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
                if (relays[index].elm.properties['options'][this.option_index] === 'Inductance') {
                    relays[index].conserve_energy();
                }
            }
        }
        else if (global.selected_type === global.TYPE_PID) {
            var index = -1;
            index = engine_functions.get_pid(global.selected_id);
            if (index < pids.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    pids[index].elm.properties[pids[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_LUT) {
            var index = -1;
            index = engine_functions.get_lut(global.selected_id);
            if (index < luts.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    luts[index].elm.properties[luts[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_VCR) {
            var index = -1;
            index = engine_functions.get_vcr(global.selected_id);
            if (index < vcrs.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    vcrs[index].elm.properties[vcrs[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_VCCA) {
            var index = -1;
            index = engine_functions.get_vcca(global.selected_id);
            if (index < vccas.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    vccas[index].elm.properties[vccas[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_VCL) {
            var index = -1;
            index = engine_functions.get_vcl(global.selected_id);
            if (index < vcls.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    vcls[index].elm.properties[vcls[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_GRT) {
            var index = -1;
            index = engine_functions.get_grt(global.selected_id);
            if (index < grts.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    grts[index].elm.properties[grts[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_TPTZ) {
            var index = -1;
            index = engine_functions.get_tptz(global.selected_id);
            if (index < tptzs.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    tptzs[index].elm.properties[tptzs[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        else if (global.selected_type === global.TYPE_TRAN) {
            var index = -1;
            index = engine_functions.get_transformer(global.selected_id);
            if (index < transformers.length) {
                let value = string_operator.parse(this.input_button.text);
                if (Math.abs(value) === 0 ||
                    (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
                        Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))) {
                    global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
                    transformers[index].elm.properties[transformers[index].elm.properties['options'][this.option_index]] = value;
                }
                else {
                    toast.set_text('PARAM = [|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
                        '|, ' +
                        '|' +
                        global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
                        '|]');
                    toast.show();
                    ERROR_FLAG = true;
                }
            }
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
        if (!ERROR_FLAG) {
            global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
            this.option_index = -1;
        }
        return ERROR_FLAG;
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
        if (global.MOUSE_DOUBLE_CLICK_EVENT) {
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
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.bounds_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.bounds_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        }
        else {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        }
        this.hover_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
        this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.select_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.select_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.reset_cursor();
        if (global.MOBILE_MODE) {
            if (this.bounds.bottom + this.OFFSET_Y >= on_screen_keyboard.bounds.top) {
                this.OFFSET_Y = -0.25 * view_port.view_height;
            }
        }
    }
    draw_window(canvas) {
        if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
            if (!global.MOBILE_MODE) {
                canvas.draw_color2(global.GENERAL_BLACK_COLOR, 130, view_port.left, view_port.top, view_port.view_width, view_port.view_height);
            }
            if (global.MOBILE_MODE) {
                if (this.bounds.bottom + this.OFFSET_Y >= on_screen_keyboard.bounds.top) {
                    this.OFFSET_Y = on_screen_keyboard.bounds.top - this.bounds.bottom;
                }
            }
            this.okay_button.text = language_manager.OKAY[global.LANGUAGES[global.LANGUAGE_INDEX]];
            this.cancel_button.text = language_manager.CANCEL[global.LANGUAGES[global.LANGUAGE_INDEX]];
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
