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
        this.signal_add_element = false;
        this.signal_wire_deleted = false;
        this.signal_wire_created = false;
        this.signal_history_lock = false;
        this.signal_build_element = false;
        this.flag_resize_event = false;
        this.force_resize_event = false;
        this.on_restore_event = false;
        this.mouse_down_event_flag = false;
        this.mouse_move_event_flag = false;
        this.mouse_up_event_flag = false;
        this.mouse_double_click_event_flag = false;
        this.mouse_wheel_event_flag = false;
        this.key_up_event_flag = false;
        this.key_down_event_flag = false;
        this.draw_block = false;
        this.picture_request_flag = false;
        this.canvas_draw_request = false;
        this.canvas_draw_event = false;
    }
}
