'use strict';
class BottomMenu {
    constructor() {
        this.draw_bottom_path = true;
        this.time_step_button_width = 1;
        this.VERSION_TAG_TEMPLATE = 'v{VERSION_TAG}   ';
        this.TIMESTEP_TEMPLATE = 'Δt:={TIMESTEP}s';
        this.FILE_BUTTON_TEXT_TEMPLATE = '  {TEXT}  ';
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.canvas_stroke_width_3);
        this.line_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.line_paint.set_text_size(global.canvas_text_size_5);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
        this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
        this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
        this.fill_paint.set_stroke_width(global.canvas_stroke_width_3);
        this.fill_paint.set_color(global.GENERAL_BOUNDS_COLOR);
        this.fill_paint.set_text_size(global.canvas_text_size_5);
        this.fill_paint.set_font(global.DEFAULT_FONT);
        this.fill_paint.set_alpha(255);
        this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.text_paint.set_color(global.GENERAL_GREEN_COLOR);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(0.75 * global.canvas_text_size_6);
        }
        else {
            this.text_paint.set_text_size(global.canvas_text_size_5);
        }
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_paint_align(this.text_paint.align.RIGHT);
        this.bottom_path = new Path();
        this.file_button = new Button(view_port.left, menu_bar.settings_button.bottom + 2 * global.canvas_stroke_width_4, view_port.left + 1, view_port.bottom);
        this.file_button.text = '';
        this.file_button.draw_stroke = false;
        this.file_button.text_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
        this.file_button.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.file_button.resize_paint();
        this.time_step_button = new Button(view_port.right - this.time_step_button_width, menu_bar.settings_button.bottom + 2 * global.canvas_stroke_width_4, view_port.right, view_port.bottom);
        this.time_step_button.text = this.TIMESTEP_TEMPLATE.replace('{TIMESTEP}', global.exponentiate_quickly(global.time_step));
        this.time_step_button.draw_stroke = false;
        this.time_step_button.text_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
        this.time_step_button.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.time_step_button.resize_paint();
        this.load_bottom_path();
        this.first_touch_x = 0;
        this.first_touch_y = 0;
        this.initial_resize_counter = 0;
        this.INITIAL_RESIZE_COUNTER_MAX = global.CANVAS_REDRAW_MAX;
        this.reload_bottom_path = true;
    }
    load_bottom_path() {
        this.bottom_path.reset();
        this.bottom_path.move_to(view_port.left, this.file_button.top);
        this.bottom_path.line_to(this.file_button.right + global.canvas_stroke_width_3, this.file_button.top);
        this.bottom_path.line_to(this.file_button.right + global.canvas_stroke_width_6, view_port.bottom - global.canvas_stroke_width_3);
        this.bottom_path.line_to(this.time_step_button.left - global.canvas_stroke_width_6, view_port.bottom - global.canvas_stroke_width_3);
        this.bottom_path.line_to(this.time_step_button.left - global.canvas_stroke_width_3, this.time_step_button.top);
        this.bottom_path.line_to(view_port.right, this.time_step_button.top);
        this.bottom_path.line_to(view_port.right, view_port.bottom + 5);
        this.bottom_path.line_to(view_port.left, view_port.bottom + 5);
        this.bottom_path.close();
    }
    update() { }
    resize_bottom_menu() {
        this.initial_resize_counter = 0;
        this.reload_bottom_path = true;
        this.file_button.resize();
        this.time_step_button.resize();
        this.file_button.line_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.file_button.line_paint.set_text_size(global.canvas_text_size_5);
        this.file_button.fill_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.file_button.fill_paint.set_text_size(global.canvas_text_size_5);
        this.file_button.text_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.time_step_button.line_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.time_step_button.line_paint.set_text_size(global.canvas_text_size_5);
        this.time_step_button.fill_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.time_step_button.fill_paint.set_text_size(global.canvas_text_size_5);
        this.time_step_button.text_paint.set_stroke_width(global.canvas_stroke_width_1);
        if (global.MOBILE_MODE) {
            this.file_button.text_paint.set_text_size(0.75 * global.canvas_text_size_6);
            this.time_step_button.text_paint.set_text_size(0.75 * global.canvas_text_size_6);
        }
        else {
            this.file_button.text_paint.set_text_size(global.canvas_text_size_5);
            this.time_step_button.text_paint.set_text_size(global.canvas_text_size_5);
        }
        this.text_paint.set_stroke_width(global.canvas_stroke_width_1);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(0.75 * global.canvas_text_size_6);
        }
        else {
            this.text_paint.set_text_size(global.canvas_text_size_5);
        }
    }
    mouse_down() {
        if (this.time_step_button.contains_xy(global.mouse_x, global.mouse_y)) {
            global.component_touched = true;
        }
        if (this.file_button.contains_xy(global.mouse_x, global.mouse_y)) {
            global.component_touched = true;
        }
        this.first_touch_x = global.mouse_x;
        this.first_touch_y = global.mouse_y;
    }
    mouse_move() { }
    mouse_up() {
        if (!global.is_right_click && this.time_step_button.contains_xy(this.first_touch_x, this.first_touch_y)) {
            if (!global.mouse_keyboard_lock && !multi_select_manager.ctrl_pressed && global.component_touched) {
                if (!global.flag_simulating &&
                    !global.flag_save_image &&
                    !global.flag_save_circuit &&
                    !global.flag_zoom &&
                    !global.flag_element_options &&
                    !global.flag_element_options_edit &&
                    !global.flag_graph &&
                    !global.flag_select_element &&
                    !global.flag_select_timestep &&
                    !global.flag_select_settings &&
                    !global.flag_remove_all) {
                    if (this.time_step_button.contains_xy(global.mouse_x, global.mouse_y)) {
                        time_step_window.input_button.text = global.exponentiate_quickly(global.time_step);
                        this.handle_timestep_flag(!global.flag_select_timestep);
                        global.component_touched = true;
                    }
                }
            }
        }
    }
    handle_file_explorer() {
        if (global.MOBILE_MODE) {
            global.mouse_keyboard_lock = false;
            global.component_touched = false;
        }
        if (!global.mouse_keyboard_lock) {
            if (!global.flag_simulating &&
                !global.flag_save_image &&
                !global.flag_save_circuit &&
                !global.flag_zoom &&
                !global.flag_element_options &&
                !global.flag_element_options_edit &&
                !global.flag_graph &&
                !global.flag_select_element &&
                !global.flag_select_timestep &&
                !global.flag_select_settings &&
                !global.flag_remove_all &&
                !global.flag_menu_element_toolbox &&
                !global.component_touched) {
                if (this.file_button.contains_xy(global.mouse_x, global.mouse_y)) {
                    global.component_touched = true;
                    return true;
                }
            }
        }
        return false;
    }
    handle_timestep_flag(ON) {
        global.mouse_keyboard_lock = true;
        if (ON) {
            time_step_window.reset_cursor();
        }
        bottom_menu.resize_bottom_menu();
        global.flag_select_timestep = ON;
    }
    recolor() {
        if (!global.flag_simulating && !global.flag_graph && !global.flag_menu_element_toolbox) {
            if (this.file_button.contains_xy(global.mouse_x, global.mouse_y) &&
                !global.flag_menu_element_toolbox &&
                !global.flag_menu_element_toolbox &&
                !global.flag_simulating &&
                !global.flag_zoom &&
                !global.flag_select_settings &&
                !global.flag_save_image &&
                !global.flag_save_circuit &&
                !global.flag_select_timestep &&
                !global.flag_element_options_edit &&
                !global.flag_element_options &&
                !global.flag_graph &&
                !global.flag_remove_all &&
                !multi_select_manager.ctrl_pressed_started &&
                !global.MOBILE_MODE) {
                this.file_button.text_paint.set_color(global.GENERAL_CYAN_COLOR);
            }
            else {
                this.file_button.text_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
            }
            if (this.time_step_button.contains_xy(global.mouse_x, global.mouse_y) &&
                !global.flag_menu_element_toolbox &&
                !global.flag_menu_element_toolbox &&
                !global.flag_simulating &&
                !global.flag_zoom &&
                !global.flag_select_settings &&
                !global.flag_save_image &&
                !global.flag_save_circuit &&
                !global.flag_select_timestep &&
                !global.flag_element_options_edit &&
                !global.flag_element_options &&
                !global.flag_graph &&
                !global.flag_remove_all &&
                !multi_select_manager.ctrl_pressed_started &&
                !global.MOBILE_MODE) {
                this.time_step_button.text_paint.set_color(global.GENERAL_CYAN_COLOR);
            }
            else {
                this.time_step_button.text_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
            }
        }
        else {
            if (this.file_button.contains_xy(global.mouse_x, global.mouse_y) &&
                !global.flag_menu_element_toolbox &&
                !global.flag_menu_element_toolbox &&
                !global.flag_simulating &&
                !global.flag_zoom &&
                !global.flag_select_settings &&
                !global.flag_save_image &&
                !global.flag_save_circuit &&
                !global.flag_select_timestep &&
                !global.flag_element_options_edit &&
                !global.flag_element_options &&
                !global.flag_graph &&
                !global.flag_remove_all &&
                !multi_select_manager.ctrl_pressed_started &&
                !global.MOBILE_MODE) {
                this.file_button.text_paint.set_color(global.GENERAL_CYAN_COLOR);
            }
            else {
                this.file_button.text_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
            }
            if (this.time_step_button.contains_xy(global.mouse_x, global.mouse_y) &&
                !global.flag_menu_element_toolbox &&
                !global.flag_menu_element_toolbox &&
                !global.flag_simulating &&
                !global.flag_zoom &&
                !global.flag_select_settings &&
                !global.flag_save_image &&
                !global.flag_save_circuit &&
                !global.flag_select_timestep &&
                !global.flag_element_options_edit &&
                !global.flag_element_options &&
                !global.flag_graph &&
                !global.flag_remove_all &&
                !multi_select_manager.ctrl_pressed_started &&
                !global.MOBILE_MODE) {
                this.time_step_button.text_paint.set_color(global.GENERAL_CYAN_COLOR);
            }
            else {
                this.time_step_button.text_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
            }
        }
    }
    draw_bottom_menu(canvas) {
        this.recolor();
        this.file_button.text = language_manager.FILE[global.LANGUAGES[global.language_index]] + global.user_file.title;
        this.time_step_button.text = this.TIMESTEP_TEMPLATE.replace('{TIMESTEP}', global.exponentiate_quickly(global.time_step));
        this.time_step_button_width = 1.25 * this.time_step_button.text_paint.measure_text(this.time_step_button.text);
        let padding = 2 * global.canvas_stroke_width_4;
        this.file_button.set_bounds(view_port.left, menu_bar.settings_button.bottom + padding, view_port.left + this.file_button.text_paint.measure_text(this.FILE_BUTTON_TEXT_TEMPLATE.replace('{TEXT}', this.file_button.text)), view_port.bottom);
        this.time_step_button.set_bounds(view_port.right - this.time_step_button_width, menu_bar.settings_button.bottom + padding, view_port.right, view_port.bottom);
        if (this.draw_bottom_path) {
            if (this.file_button.draw_fill) {
                this.file_button.draw_fill = false;
            }
            if (this.time_step_button.draw_fill) {
                this.time_step_button.draw_fill = false;
            }
            if (this.reload_bottom_path === true) {
                this.load_bottom_path();
                this.initial_resize_counter++;
                if (this.initial_resize_counter >= this.INITIAL_RESIZE_COUNTER_MAX) {
                    this.initial_resize_counter = 0;
                    this.reload_bottom_path = false;
                }
            }
            canvas.draw_path(this.bottom_path, this.fill_paint);
        }
        else {
            if (!this.file_button.draw_fill) {
                this.file_button.draw_fill = true;
            }
            if (!this.time_step_button.draw_fill) {
                this.time_step_button.draw_fill = true;
            }
        }
        this.file_button.draw_button(canvas);
        this.time_step_button.draw_button(canvas);
        canvas.draw_text(this.VERSION_TAG_TEMPLATE.replace('{VERSION_TAG}', global.VERSION_TAG), view_port.right, menu_bar.settings_button.bottom, this.text_paint);
    }
}
