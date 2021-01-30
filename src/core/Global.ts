'use strict';
class Global {
	public readonly SYSTEM_CONSTANTS: Constants;
	public 'device_pixel_ratio': number;
	public 'system_initialization': SYSTEM_INITIALIZATION_T;
	public 'workspace_zoom_scale': number;

	public 'node_line_buffer': Array<Array<number>>;
	public 'node_line_buffer_index': number;
	public 'natural_width': number;
	public 'natural_height': number;
	public 'settings': Settings;

	public 'virtual_canvas_id': number;

	public 'focused': boolean;
	public 'focused_id': number;
	public 'focused_type': number;
	public 'focused_bounds': RectF;
	public 'last_selected': boolean;
	public 'selected': boolean;
	public 'selected_id': number;
	public 'selected_type': number;
	public 'selected_wire_style': number;
	public 'selected_bounds': RectF;
	public 'selected_properties': ELEMENT_PROPERTY_T;
	public 'selection_nearest_neighbors': Array<NEAREST_NEIGHBOR_T>;
	public 'nearest_neighbor_index': number;
	public 'multi_selected': boolean;
	public 'clipboard_type': number;
	public 'clipboard_rotation': number;
	public 'clipboard_flip': number;
	public 'clipboard_property': any;
	public 'component_translating': boolean;

	public 'signal_build_counter': number;
	public 'signal_wire_deleted_counter': number;
	public 'component_touched': boolean;
	public 'mouse_keyboard_lock': boolean;
	public 'translation_lock': boolean;
	public 'is_singular': boolean;

	public 'browser_ie': boolean;
	public 'browser_chrome': boolean;
	public 'browser_opera': boolean;
	public 'browser_firefox': boolean;
	public 'browser_safari': boolean;

	public 'mouse_down_x': number;
	public 'mouse_down_y': number;
	public 'last_mouse_x': number;
	public 'last_mouse_y': number;
	public 'dx': number;
	public 'dy': number;
	public 'mouse_x': number;
	public 'mouse_y': number;
	public 'is_touching': boolean;
	public 'is_dragging': boolean;
	public 'temp_is_dragging': boolean;
	public 'is_right_click': boolean;
	public 'delta_x': number;
	public 'delta_y': number;
	public 'x_offset': number;
	public 'y_offset': number;
	public 'node_space_x': number;
	public 'node_space_y': number;
	public 'last_surface_width': number;
	public 'last_surface_height': number;
	public 'last_view_port_width': number;
	public 'last_view_port_height': number;
	public 'last_view_port_right': number;
	public 'last_view_port_bottom': number;

	public 'wire_builder': WIRE_BUILDER_T;

	public 'language_index_counter': number;

	public 'language_index': number;
	public 'system_options': SYSTEM_OPTIONS_T;
	public 'indexer': number;
	public 'circle_buffer': Array<Array<number>>;
	public 'line_buffer': Array<Array<number>>;

	public 'user_file_selected': boolean;
	public 'user_file': Circuit;

	public 'time_step': number;
	public 'simulation_time': number;
	public 'resize_event': boolean;
	public 'force_resize_event': boolean;
	public 'on_restore_event': boolean;
	public 'mouse_down_event_flag': boolean;
	public 'mouse_move_event_flag': boolean;
	public 'mouse_up_event_flag': boolean;
	public 'mouse_double_click_event_flag': boolean;
	public 'mouse_wheel_event_flag': boolean;
	public 'key_up_event_flag': boolean;
	public 'key_down_event_flag': boolean;
	public 'draw_block': boolean;
	public 'picture_request_flag': boolean;

	public 'canvas_draw_request': boolean;
	public 'canvas_draw_request_counter': number;
	public 'canvas_draw_event': boolean;
	public 'canvas_redraw_counter': number;
	public 'canvas_stroke_width_base': number;
	public 'canvas_stroke_width_1': number;
	public 'canvas_stroke_width_2': number;
	public 'canvas_stroke_width_3': number;
	public 'canvas_stroke_width_4': number;
	public 'canvas_stroke_width_5': number;
	public 'canvas_stroke_width_6': number;
	public 'canvas_stroke_width_1_zoom': number;
	public 'canvas_stroke_width_2_zoom': number;
	public 'canvas_stroke_width_3_zoom': number;
	public 'canvas_stroke_width_4_zoom': number;
	public 'canvas_stroke_width_5_zoom': number;
	public 'canvas_stroke_width_6_zoom': number;
	public 'canvas_text_size_base': number;
	public 'canvas_text_size_1': number;
	public 'canvas_text_size_2': number;
	public 'canvas_text_size_3': number;
	public 'canvas_text_size_4': number;
	public 'canvas_text_size_5': number;
	public 'canvas_text_size_6': number;
	public 'canvas_text_size_1_zoom': number;
	public 'canvas_text_size_2_zoom': number;
	public 'canvas_text_size_3_zoom': number;
	public 'canvas_text_size_4_zoom': number;
	public 'canvas_text_size_5_zoom': number;
	public 'canvas_text_size_6_zoom': number;
	public 'move_paint': Paint;
	public 'vt': number;
	public 'gmin_default': number;
	public 'v_max_err': Array<Array<number>>;
	public 'i_max_err': Array<Array<number>>;
	public 'v_locked': boolean;
	public 'i_locked': boolean;
	public 'v_conv': boolean;
	public 'i_conv': boolean;

	public 'general_integer': number;
	public 'general_integer2': number;
	public 'general_integer3': number;
	public 'general_integer4': number;
	public 'general_integer5': number;
	public 'resize_w_factor': number;
	public 'resize_h_factor': number;
	public 'angle_search_obj': ANGLE_STRUCT_T;
	public 'angle_radian_search_obj': ANGLE_STRUCT_T;
	public 'angle_array': Array<ANGLE_STRUCT_T>;
	public 'angle_radian_array': Array<ANGLE_STRUCT_T>;
	public 'saved_angle': number;
	public 'saved_angle_radians': number;
	public 'temp_boolean': boolean;
	public 'general_index': number;
	public 'element_max_array': Array<number>;
	public 'meter_max_array': Array<number>;
	public 'non_linear_max_array': Array<number>;
	public 'max_general_number': number;
	constructor() {
		this.SYSTEM_CONSTANTS = new Constants();

		this.device_pixel_ratio = 1;
		this.system_initialization = {
			step: 0,
			max: 5,
			completed: false
		};
		if (this.SYSTEM_CONSTANTS.MOBILE_MODE) {
			this.workspace_zoom_scale = 2.5;
		} else {
			this.workspace_zoom_scale = 1.0;
		}

		this.natural_width = 0;
		this.natural_height = 0;
		this.settings = new Settings();

		this.virtual_canvas_id = 0;

		this.focused = false;
		this.focused_id = this.SYSTEM_CONSTANTS.NULL;
		this.focused_type = this.SYSTEM_CONSTANTS.NULL;
		this.focused_bounds = this.SYSTEM_CONSTANTS.NULL;
		this.last_selected = false;
		this.selected = false;
		this.selected_id = this.SYSTEM_CONSTANTS.NULL;
		this.selected_type = -1;
		this.selected_wire_style = this.SYSTEM_CONSTANTS.NULL;
		this.selected_bounds = this.SYSTEM_CONSTANTS.NULL;
		this.selected_properties = this.SYSTEM_CONSTANTS.NULL;
		this.selection_nearest_neighbors = [];
		this.nearest_neighbor_index = 0;
		this.multi_selected = false;
		this.clipboard_type = this.SYSTEM_CONSTANTS.NULL;
		this.clipboard_rotation = this.SYSTEM_CONSTANTS.NULL;
		this.clipboard_flip = this.SYSTEM_CONSTANTS.NULL;
		this.clipboard_property = this.SYSTEM_CONSTANTS.NULL;
		this.component_translating = false;
		this.vt = 25.6e-3;
		this.gmin_default = 1e-9;
		this.v_max_err = [];
		this.i_max_err = [];
		this.v_locked = false;
		this.i_locked = false;
		this.v_conv = false;
		this.i_conv = false;

		this.signal_build_counter = 0;
		this.signal_wire_deleted_counter = 0;
		this.component_touched = false;
		this.mouse_keyboard_lock = false;
		this.translation_lock = true;
		this.is_singular = false;

		this.browser_ie = false;
		this.browser_chrome = false;
		this.browser_opera = false;
		this.browser_firefox = false;
		this.browser_safari = false;

		this.mouse_down_x = 0;
		this.mouse_down_y = 0;
		this.last_mouse_x = 0;
		this.last_mouse_y = 0;
		this.dx = 0;
		this.dy = 0;
		this.mouse_x = 0;
		this.mouse_y = 0;
		this.is_touching = false;
		this.is_dragging = false;
		this.temp_is_dragging = false;
		this.is_right_click = false;
		this.delta_x = 0;
		this.delta_y = 0;
		this.x_offset = 0;
		this.y_offset = 0;
		this.node_space_x = 0;
		this.node_space_y = 0;
		this.last_surface_width = 0;
		this.last_surface_height = 0;
		this.last_view_port_width = 0;
		this.last_view_port_height = 0;
		this.last_view_port_right = 0;
		this.last_view_port_bottom = 0;

		this.wire_builder = {
			n1: -1,
			id1: -1,
			type1: -1,
			anchor_point1: -1,
			linkage1: {
				wire: -1
			},
			n2: -1,
			id2: -1,
			type2: -1,
			anchor_point2: -1,
			linkage2: {
				wire: -1
			},
			step: 0
		};

		this.history_manager = {
			packet: []
		};
		
		this.language_index = this.LANGUAGE_INDEX_ENGLISH;
		this.system_options = {
			options: ['Language', 'Automatic Timestep', 'Shortcut Hints', 'Full Window', '', ''],
			values: [this.LANGUAGES[this.language_index], this.ON, this.ON, this.OFF, this.OFF, this.OFF]
		};
		this.circle_buffer = [];
		this.line_buffer = [];
		this.node_line_buffer = [];
		this.node_line_buffer_index = 0;

		if (this.MOBILE_MODE) {
			this.system_options['values'][this.SYSTEM_OPTION_SHORTCUT_HINTS] = this.OFF;
		}
		if (this.DESKTOP_MODE || this.DESKTOP_MODE) {
			this.system_options['values'][this.SYSTEM_OPTION_STRETCH_WINDOW] = this.ON;
		}

		this.user_file_selected = false;
		this.user_file = new Circuit();

		this.time_step = 5e-6;
		this.simulation_time = 0;
		this.resize_event = false;
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
		this.canvas_draw_request_counter = 0;
		this.canvas_draw_event = false;
		this.canvas_redraw_counter = 0;
		this.canvas_stroke_width_base = 1;
		this.canvas_stroke_width_1 = 2.25;
		this.canvas_stroke_width_2 = 2.5;
		this.canvas_stroke_width_3 = 9;
		this.canvas_stroke_width_4 = 16;
		this.canvas_stroke_width_5 = 21;
		this.canvas_stroke_width_6 = 43;
		this.canvas_stroke_width_1_zoom = 2.25;
		this.canvas_stroke_width_2_zoom = 2.5;
		this.canvas_stroke_width_3_zoom = 9;
		this.canvas_stroke_width_4_zoom = 16;
		this.canvas_stroke_width_5_zoom = 21;
		this.canvas_stroke_width_6_zoom = 43;
		this.canvas_text_size_base = 1;
		this.canvas_text_size_1 = 2.25;
		this.canvas_text_size_2 = 2.5;
		this.canvas_text_size_3 = 9;
		this.canvas_text_size_4 = 16;
		this.canvas_text_size_5 = 21;
		this.canvas_text_size_6 = 43;
		this.canvas_text_size_1_zoom = 2.25;
		this.canvas_text_size_2_zoom = 2.5;
		this.canvas_text_size_3_zoom = 9;
		this.canvas_text_size_4_zoom = 16;
		this.canvas_text_size_5_zoom = 21;
		this.canvas_text_size_6_zoom = 43;
		this.move_paint = new Paint();
		this.move_paint.set_paint_style(this.move_paint.style.FILL);
		this.move_paint.set_paint_cap(this.move_paint.cap.ROUND);
		this.move_paint.set_paint_join(this.move_paint.join.MITER);
		this.move_paint.set_stroke_width(this.canvas_stroke_width_1);
		this.move_paint.set_color(this.GENERAL_GRAY_COLOR);
		this.move_paint.set_text_size(this.canvas_text_size_1);
		this.move_paint.set_font(this.DEFAULT_FONT);
		this.move_paint.set_alpha(60);
		this.move_paint.set_paint_align(this.move_paint.align.CENTER);
		this.PI_DIV_2 = Math.PI * 0.5;
		this.PI_DIV_4 = Math.PI * 0.25;
		this.PI_MUL_3_DIV_4 = Math.PI * 0.75;
		this.PI_DIV_6 = Math.PI / 6;
		this.PI_DIV_12 = Math.PI / 12;
		this.PI_DIV_180 = Math.PI / 180;
		this.NEG_PI_DIV_180 = -Math.PI / 180;
		this._180_DIV_PI = 180 / Math.PI;
		this.PI_MUL_2 = Math.PI * 2;
		this.TRIG_TABLE_Q_NUMBER = 12;
		this.TRIG_SINE_TABLE = [];
		this.TRIG_TABLE_SIZE = Math.round(Math.pow(2, this.TRIG_TABLE_Q_NUMBER));
		this.TRIG_TABLE_SCALE_CONSTANT = 2.0 / this.TRIG_TABLE_SIZE;
		this.TRIG_TABLE_INDEX_CONSTANT = (this.TRIG_TABLE_SIZE * 0.5) / Math.PI;
		this.TRIG_TABLE_MASK = this.TRIG_TABLE_SIZE - 1;
		this.TRIG_TABLE_ROUND = this.TRIG_TABLE_SIZE * 0.25;
		for (var i: number = 0; i < this.TRIG_TABLE_SIZE; i++) {
			this.TRIG_SINE_TABLE.push(Math.sin(i * Math.PI * this.TRIG_TABLE_SCALE_CONSTANT));
		}

		this.MAX_TEXT_LENGTH = 30;
		this.inv_sqrt_buf = new ArrayBuffer(4);
		this.inv_sqrt_f32 = new Float32Array(this.inv_sqrt_buf);
		this.inv_sqrt_u32 = new Uint32Array(this.inv_sqrt_buf);
		this.ALPHA_ARRAY = [];
		for (var i: number = 0; i <= 256; i++) {
			this.ALPHA_ARRAY.push(i / 256.0);
		}
		this.general_integer = 0;
		this.general_integer2 = 0;
		this.general_integer3 = 0;
		this.general_integer4 = 0;
		this.general_integer5 = 0;
		this.resize_w_factor = 0;
		this.resize_h_factor = 0;
		this.angle_search_obj;
		this.angle_radian_search_obj;
		this.angle_array = [];
		this.angle_radian_array = [];
		this.saved_angle = -1;
		this.saved_angle_radians = -1;
		this.GARBAGE_COLLECTOR_SIZE = 16;
		this.temp_boolean = false;
		this.general_index = -1;
		this.element_max_array = [];
		this.meter_max_array = [];
		this.non_linear_max_array = [];
		this.max_general_number = 0;
	}

	sine(theta: number): number {
		return this.TRIG_SINE_TABLE[(theta * this.TRIG_TABLE_INDEX_CONSTANT) & this.TRIG_TABLE_MASK];
	}
	cosine(theta: number): number {
		return this.TRIG_SINE_TABLE[(theta * this.TRIG_TABLE_INDEX_CONSTANT + this.TRIG_TABLE_ROUND) & this.TRIG_TABLE_MASK];
	}
	remap_position(input: number, is_width: boolean): number {
		if (is_width === true) {
			return view_port.right - (this.last_view_port_right - input) * this.resize_w_factor;
		} else {
			return view_port.bottom - (this.last_view_port_bottom - input) * this.resize_h_factor;
		}
	}
	reset_angle_cache(): void {
		this.angle_array = [];
	}
	reset_angle_radian_cache(): void {
		this.angle_radian_array = [];
	}
	search_angle_array(x: number, y: number): boolean {
		this.temp_boolean = false;
		this.saved_angle = -1;
		for (var i: number = 0; i < this.angle_array.length; i++) {
			if (!this.temp_boolean) {
				this.angle_search_obj = this.angle_array[i];
				if (this.angle_search_obj['x'] === x && this.angle_search_obj['y'] === y) {
					this.saved_angle = this.angle_search_obj['angle'];
					this.temp_boolean = true;
					break;
				}
			}
		}
		return this.temp_boolean;
	}
	search_angle_radian_array(x: number, y: number): boolean {
		this.temp_boolean = false;
		this.saved_angle_radians = -1;
		for (var i: number = 0; i < this.angle_radian_array.length; i++) {
			if (!this.temp_boolean) {
				this.angle_radian_search_obj = this.angle_radian_array[i];
				if (this.angle_radian_search_obj['x'] === x && this.angle_radian_search_obj['y'] === y) {
					this.saved_angle_radians = this.angle_radian_search_obj['angle'];
					this.temp_boolean = true;
					break;
				}
			}
		}
		return this.temp_boolean;
	}
	retrieve_angle(x: number, y: number): number {
		if (this.search_angle_array(x, y)) {
			return this.saved_angle;
		} else {
			if (this.angle_array.length > this.GARBAGE_COLLECTOR_SIZE) {
				this.house_keeping();
			}
			this.angle_array.push({
				x: x,
				y: y,
				angle: this.calc_degree(x, y)
			});
			return this.angle_array[this.angle_array.length - 1]['angle'];
		}
	}
	retrieve_angle_radian(x: number, y: number): number {
		if (this.search_angle_radian_array(x, y)) {
			return this.saved_angle_radians;
		} else {
			if (this.angle_radian_array.length > this.GARBAGE_COLLECTOR_SIZE) {
				this.house_keeping_radians();
			}
			this.angle_radian_array.push({
				x: x,
				y: y,
				angle: this.calc_degree_radians(x, y)
			});
			return this.angle_radian_array[this.angle_radian_array.length - 1]['angle'];
		}
	}
	house_keeping() {
		this.angle_array.splice(this.angle_array.length - 1, 1);
	}
	house_keeping_radians() {
		this.angle_radian_array.splice(this.angle_radian_array.length - 1, 1);
	}
	calc_degree(x: number, y: number): number {
		this.general_integer = this.atan2_approx2(y, x) * global._180_DIV_PI;
		if (this.general_integer < 0) {
			this.general_integer += 360;
		}
		return this.general_integer;
	}
	calc_degree_radians(x: number, y: number): number {
		this.general_integer = this.atan2_approx2(y, x);
		if (this.general_integer < 0) {
			this.general_integer += this.PI_MUL_2;
		}
		return this.general_integer;
	}
	to_radians(degrees: number): number {
		return degrees * this.PI_DIV_180;
	}
	inv_sqrt(x: number): number {
		let x2: number = 0.5 * (this.inv_sqrt_f32[0] = x);
		this.inv_sqrt_u32[0] = 0x5f3759df - (this.inv_sqrt_u32[0] >> 1);
		let y: number = this.inv_sqrt_f32[0];
		y = y * (1.5 - x2 * y * y);
		return y;
	}
	atan2_approx2(y: number, x: number): number {
		if (x === 0.0) {
			if (y > 0.0) {
				return this.PI_DIV_2;
			}
			if (y === 0.0) {
				return 0.0;
			}
			return -this.PI_DIV_2;
		}
		this.general_integer = y / x;
		this.general_integer2 = 0;
		if (Math.abs(this.general_integer) < 1.0) {
			this.general_integer2 = this.general_integer / (1.0 + 0.28 * this.general_integer * this.general_integer);
			if (x < 0.0) {
				if (y < 0.0) {
					return this.general_integer2 - Math.PI;
				}
				return this.general_integer2 + Math.PI;
			}
		} else {
			this.general_integer2 = this.PI_DIV_2 - this.general_integer / (this.general_integer * this.general_integer + 0.28);
			if (y < 0.0) {
				return this.general_integer2 - Math.PI;
			}
		}
		return this.general_integer2;
	}
	norm(x: number, y: number): number {
		return Math.sqrt(x * x + y * y);
	}
	round(value: number): number {
		return Math.round((value + Number.EPSILON) * 1000) / 1000;
	}
	cast_int(value: number): number {
		return Math.trunc(Math.round(value));
	}
	get_average2(a: number, b: number): number {
		return (a + b) * 0.5;
	}
	equilateral_triangle_center(p1_x: number, p2_x: number, p3_x: number, p1_y: number, p2_y: number, p3_y: number): Array<number> {
		let temp: number = 0;
		temp = this.norm(p2_x - p1_x, p2_y - p1_y) * 0.5;
		let theta_p1_p2: number = this.retrieve_angle_radian(p2_x - p1_x, p2_y - p1_y);
		let p_x: number = p1_x + temp * this.cosine(theta_p1_p2);
		let p_y: number = p1_y + temp * this.sine(theta_p1_p2);
		let theta_p_p3: number = this.retrieve_angle_radian(p3_x - p_x, p3_y - p_y);
		let c_x: number = p_x + temp * this.cosine(theta_p_p3);
		let c_y: number = p_y + temp * this.sine(theta_p_p3);
		return Array(c_x, c_y);
	}
	get_average4(a: number, b: number, c: number, d: number): number {
		return (a + b + c + d) * 0.25;
	}
	not_null(obj: any) {
		return !(obj == this.NULL);
	}
	copy(obj: any) {
		return _.cloneDeep(obj);
	}
	print(obj: any) {
		if (this.DEVELOPER_MODE) {
			console.log(obj);
		}
	}
	exponentiate_quickly(input: number): string {
		let str: string = '';
		let val: number = 0;
		let abs_input: number = Math.abs(input);
		let found: boolean = false;
		for (var i: number = 0; i < this.SI_UNIT_THRESHOLD_ARRAY.length; i++) {
			if (abs_input >= this.SI_UNIT_THRESHOLD_ARRAY[i]) {
				val = input * this.SI_UNIT_ARRAY[i];
				str = this.round(val) + this.SI_UNIT_ABBREVIATION[i];
				found = true;
				break;
			} else if (abs_input === 0) {
				val = 0;
				str = this.ELEMENT_VAL_TEMPLATE.replace('{VAL}', <string>(<unknown>val)).replace('{UNIT}', '');
				found = true;
				break;
			}
		}
		if (!found) {
			str = '--- ';
		}
		return str;
	}
	element_max(): number {
		/* #INSERT_GENERATE_MAX_ELEMENT# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		this.element_max_array = Array(
			resistors.length,
			capacitors.length,
			inductors.length,
			grounds.length,
			dcsources.length,
			dccurrents.length,
			acsources.length,
			accurrents.length,
			squarewaves.length,
			sawwaves.length,
			trianglewaves.length,
			constants.length,
			wires.length,
			nets.length,
			notes.length,
			rails.length,
			voltmeters.length,
			ohmmeters.length,
			ammeters.length,
			wattmeters.length,
			fuses.length,
			spsts.length,
			spdts.length,
			nots.length,
			diodes.length,
			leds.length,
			zeners.length,
			potentiometers.length,
			ands.length,
			ors.length,
			nands.length,
			nors.length,
			xors.length,
			xnors.length,
			dffs.length,
			vsats.length,
			adders.length,
			subtractors.length,
			multipliers.length,
			dividers.length,
			gains.length,
			absvals.length,
			vcsws.length,
			vcvss.length,
			vccss.length,
			cccss.length,
			ccvss.length,
			opamps.length,
			nmosfets.length,
			pmosfets.length,
			npns.length,
			pnps.length,
			adcs.length,
			dacs.length,
			sandhs.length,
			pwms.length,
			integrators.length,
			differentiators.length,
			lowpasses.length,
			highpasses.length,
			relays.length,
			pids.length,
			luts.length,
			vcrs.length,
			vccas.length,
			vcls.length,
			grts.length,
			tptzs.length,
			transformers.length
		);
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		this.max_general_number = 0;
		for (var i: number = 0; i < this.element_max_array.length; i++) {
			if (this.element_max_array[i] > this.max_general_number) {
				this.max_general_number = this.element_max_array[i];
			}
		}
		return this.max_general_number;
	}
	meter_max(): number {
		/* #INSERT_GENERATE_MAX_METER# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		this.meter_max_array = Array(voltmeters.length, ohmmeters.length, ammeters.length, wattmeters.length);
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		this.max_general_number = 0;
		for (var i: number = 0; i < this.meter_max_array.length; i++) {
			if (this.meter_max_array[i] > this.max_general_number) {
				this.max_general_number = this.meter_max_array[i];
			}
		}
		return this.max_general_number;
	}
	non_linear_max(): number {
		/* #INSERT_GENERATE_MAX_NON_LINEAR# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		this.non_linear_max_array = Array(diodes.length, leds.length, zeners.length, nmosfets.length, pmosfets.length, npns.length, pnps.length);
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		this.max_general_number = 0;
		for (var i: number = 0; i < this.non_linear_max_array.length; i++) {
			if (this.non_linear_max_array[i] > this.max_general_number) {
				this.max_general_number = this.non_linear_max_array[i];
			}
		}
		return this.max_general_number;
	}
	line_collision(p0_x: number, p0_y: number, p1_x: number, p1_y: number, p2_x: number, p2_y: number, p3_x: number, p3_y: number): boolean {
		let s1_x: number = p1_x - p0_x;
		let s1_y: number = p1_y - p0_y;
		let s2_x: number = p3_x - p2_x;
		let s2_y: number = p3_y - p2_y;
		let s: number = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
		let t: number = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
		return s >= 0 && s <= 1 && t >= 0 && t <= 1;
	}
	decode_key(key_event: KEY_EVENT_T): string {
		let shift: boolean = key_event['shift'];
		let caps: boolean = key_event['caps'];
		let code: string = key_event['event'].code;
		let ret: string = '';
		for (var i: number = 0; i < this.KEY_EVENT_KEYS.length; i++) {
			if (code === this.KEY_EVENT_KEYS[i]) {
				if (shift) {
					ret = this.KEY_EVENT_CODES[this.KEY_EVENT_KEYS[i]][1];
				} else if (caps) {
					ret = this.KEY_EVENT_CODES[this.KEY_EVENT_KEYS[i]][2];
				} else {
					ret = this.KEY_EVENT_CODES[this.KEY_EVENT_KEYS[i]][0];
				}
			}
		}
		return ret;
	}
	key_to_code(character: string): string {
		let ret: string = '';
		for (var i: number = 0; i < this.KEY_EVENT_KEYS.length; i++) {
			if (character === this.KEY_EVENT_CODES[this.KEY_EVENT_KEYS[i]][0] || character === this.KEY_EVENT_CODES[this.KEY_EVENT_KEYS[i]][1]) {
				ret = global.copy(this.KEY_EVENT_KEYS[i]);
				break;
			}
		}
		return ret;
	}
	is_alpha_numeric(key_event: KEY_EVENT_T): boolean {
		return /[a-z A-Z0-9]/.test(this.decode_key(key_event));
	}
	is_alpha_numeric_note(key_event: KEY_EVENT_T): boolean {
		return /[!@#$%`~^&_{}()a-z A-Z0-9=:'",?<>;:*/+-|]/.test(this.decode_key(key_event));
	}
	is_valid_si_units(key_event: KEY_EVENT_T): boolean {
		return /[-.kmu0123456789MnGpf]/.test(this.decode_key(key_event));
	}
	limit(inp: number, low: number, high: number): number {
		if (inp < low) {
			return low;
		} else if (inp > high) {
			return high;
		} else {
			return inp;
		}
	}
	get_date_stamp(): string {
		let date: Date = new Date();
		return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
	}
	get_time_stamp(): string {
		let date: Date = new Date();
		let TIMESTAMP_TEMPLATE: string = '{DATE}->{TIME_ZONE}';
		return TIMESTAMP_TEMPLATE.replace('{DATE}', date.toJSON()).replace('{TIME_ZONE}', <string>(<unknown>date.getTimezoneOffset()));
	}
	log_damping(next: number, now: number, gamma: number, kappa: number): number {
		return now + (gamma / kappa) * this.signum(next - now) * this.logbx(Math.E, 1 + Math.abs(next - now) * kappa);
	}
	signum(inp: number): number {
		if (inp < 0) {
			return -1;
		} else {
			return 1;
		}
	}
	logbx(b: number, x: number): number {
		return Math.log(x) / Math.log(b);
	}
	map_range(inp: number, lower_bound: number, upper_bound: number): number {
		return lower_bound + inp * (upper_bound - lower_bound);
	}
	perm32(inp: number): number {
		this.general_integer = 12;
		let x: number = ((inp >> 8) ^ inp) * 0x6b + this.general_integer--;
		x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
		x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
		x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
		x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
		x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
		x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
		x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
		x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
		x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
		x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
		x = ((x >> 8) ^ x) * 0x6b + this.general_integer--;
		return x;
	}
	unique_color(net_name: string): string {
		//@ts-ignore
		let rgb: number = this.perm32(net_name.hashCode());
		let r: number = 0,
			g: number = 0,
			b: number = 0;
		r = (rgb & 0x00ff0000) >> 16;
		g = (rgb & 0x0000ff00) >> 8;
		b = rgb & 0x000000ff;
		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	}
	wrap(inp: number, max: number): number {
		return inp - max * Math.floor(inp / max);
	}
	linterp(x_arr: Array<number>, y_arr: Array<number>, inp: number): number {
		let k: number = this.linsearch(x_arr, inp, y_arr.length);
		let x0: number = x_arr[k],
			x1 = x_arr[k + 1],
			y0 = y_arr[k],
			y1 = y_arr[k + 1];
		if (inp > x_arr[x_arr.length - 1]) {
			return y_arr[y_arr.length - 1];
		} else if (inp < x_arr[0]) {
			return y_arr[0];
		}
		return y0 + ((y1 - y0) / (x1 - x0)) * (inp - x0);
	}
	linsearch(x_arr: Array<number>, inp: number, size: number): number {
		let i: number = 0;
		let out: number = 0;
		for (i = 0; i < size - 1; i++) {
			if (inp >= x_arr[i] && inp <= x_arr[i + 1]) {
				out = i;
				break;
			}
		}
		return out;
	}
	min3(a: number, b: number, c: number): number {
		return Math.min(a, Math.min(b, c));
	}
}
