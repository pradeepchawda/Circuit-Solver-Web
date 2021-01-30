'use strict';
class Flags {
	public flag_idle: boolean;
	public flag_simulating: boolean;
	public flag_save_image: boolean;
	public flag_save_circuit: boolean;
	public flag_zoom: boolean;
	public flag_element_options: boolean;
	public flag_element_options_edit: boolean;
	public flag_graph: boolean;
	public flag_select_element: boolean;
	public flag_select_timestep: boolean;
	public flag_select_settings: boolean;
	public flag_remove_all: boolean;
	public flag_menu_open: boolean;
	public flag_menu_element_toolbox: boolean;
	public signal_add_element: boolean;
	public signal_wire_deleted: boolean;
	public signal_wire_created: boolean;
	public signal_history_lock: boolean;
	public signal_build_element: boolean;
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
	}
}
