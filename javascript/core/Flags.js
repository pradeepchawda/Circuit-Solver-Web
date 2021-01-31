'use strict';
class Flags {
    constructor() {
        this.flag_idle = true;
        this.flag_simulating = false;
        this.flag_save_image = false;
        this.flag_save_circuit = false;
        this.flag_zoom = false;
        this.flag_element_options = false;
        this.flag_element_options_edit = false;
        this.flag_graph = false;
        this.flag_select_element = false;
        this.flag_select_timestep = false;
        this.flag_select_settings = false;
        this.flag_remove_all = false;
        this.flag_menu_open = false;
        this.flag_menu_element_toolbox = false;
        this.flag_add_element = false;
        this.flag_wire_deleted = false;
        this.flag_wire_created = false;
        this.flag_history_lock = false;
        this.flag_build_element = false;
        this.flag_resize_event = false;
        this.flag_force_resize_event = false;
        this.flag_on_restore_event = false;
        this.flag_mouse_down_event = false;
        this.flag_mouse_move_event = false;
        this.flag_mouse_up_event = false;
        this.flag_mouse_double_click_event = false;
        this.flag_mouse_wheel_event = false;
        this.flag_key_up_event = false;
        this.flag_key_down_event = false;
        this.flag_draw_block = false;
        this.flag_picture_request = false;
        this.flag_canvas_draw_request = false;
        this.flag_canvas_draw_event = false;
    }
}
