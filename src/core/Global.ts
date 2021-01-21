'use strict';
class Global {
	public readonly 'NULL': any;
	public readonly 'MOBILE_MODE': boolean;
	public readonly 'DESKTOP_MODE': boolean;
	public readonly 'NODE_HINTS': boolean;
	public 'DEVICE_PIXEL_RATIO': number;
	public 'system_initialization': SYSTEM_INITIALIZATION_T;
	public readonly 'VERSION_TAG': string;
	public 'workspace_zoom_scale': number;
	public readonly 'ZOOM_MAX': number;
	public readonly 'ZOOM_MIN': number;
	public readonly 'ZERO_PT_FIVE': number;
	public readonly 'ZERO': number;
	public 'node_line_buffer': Array<Array<number>>;
	public 'node_line_buffer_index': number;
	public 'ZOOM_FACTOR': number;
	public 'natural_width': number;
	public 'natural_height': number;
	public 'settings': Settings;
	public 'DEVELOPER_MODE': boolean;
	public 'PRODUCTION_MODE': boolean;
	public readonly 'ELEMENT_TAG_TEMPLATE': string;
	public readonly 'ELEMENT_VAL_TEMPLATE': string;
	public readonly 'DIVISION_TEXT_TEMPLATE': string;
	public readonly 'PIXEL_TEMPLATE': string;
	public readonly 'PNG_TEMPLATE': string;
	public readonly 'ON': string;
	public readonly 'OFF': string;
	public 'virtual_canvas_id': number;
	public readonly 'TYPE_META_DATA': number;
	public 'TYPE_COUNTER': number;
	/* #INSERT_GENERATE_ELEMENT_TYPE_DECLARATION# */
	/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
	public TYPE_RESISTOR: number;
	public TYPE_CAPACITOR: number;
	public TYPE_INDUCTOR: number;
	public TYPE_GROUND: number;
	public TYPE_DCSOURCE: number;
	public TYPE_DCCURRENT: number;
	public TYPE_ACSOURCE: number;
	public TYPE_ACCURRENT: number;
	public TYPE_SQUAREWAVE: number;
	public TYPE_SAW: number;
	public TYPE_TRI: number;
	public TYPE_CONSTANT: number;
	public TYPE_WIRE: number;
	public TYPE_NET: number;
	public TYPE_NOTE: number;
	public TYPE_RAIL: number;
	public TYPE_VOLTMETER: number;
	public TYPE_OHMMETER: number;
	public TYPE_AMMETER: number;
	public TYPE_WATTMETER: number;
	public TYPE_FUSE: number;
	public TYPE_SPST: number;
	public TYPE_SPDT: number;
	public TYPE_NOT: number;
	public TYPE_DIODE: number;
	public TYPE_LED: number;
	public TYPE_ZENER: number;
	public TYPE_POTENTIOMETER: number;
	public TYPE_AND: number;
	public TYPE_OR: number;
	public TYPE_NAND: number;
	public TYPE_NOR: number;
	public TYPE_XOR: number;
	public TYPE_XNOR: number;
	public TYPE_DFF: number;
	public TYPE_VSAT: number;
	public TYPE_ADD: number;
	public TYPE_SUB: number;
	public TYPE_MUL: number;
	public TYPE_DIV: number;
	public TYPE_GAIN: number;
	public TYPE_ABS: number;
	public TYPE_VCSW: number;
	public TYPE_VCVS: number;
	public TYPE_VCCS: number;
	public TYPE_CCCS: number;
	public TYPE_CCVS: number;
	public TYPE_OPAMP: number;
	public TYPE_NMOS: number;
	public TYPE_PMOS: number;
	public TYPE_NPN: number;
	public TYPE_PNP: number;
	public TYPE_ADC: number;
	public TYPE_DAC: number;
	public TYPE_SAH: number;
	public TYPE_PWM: number;
	public TYPE_INTEGRATOR: number;
	public TYPE_DIFFERENTIATOR: number;
	public TYPE_LPF: number;
	public TYPE_HPF: number;
	public TYPE_REL: number;
	public TYPE_PID: number;
	public TYPE_LUT: number;
	public TYPE_VCR: number;
	public TYPE_VCCA: number;
	public TYPE_VCL: number;
	public TYPE_GRT: number;
	public TYPE_TPTZ: number;
	public TYPE_TRAN: number;
	/* <!-- END AUTOMATICALLY GENERATED !--> */
	public readonly 'ROTATION_0': number;
	public readonly 'ROTATION_90': number;
	public readonly 'ROTATION_180': number;
	public readonly 'ROTATION_270': number;
	public readonly 'FLIP_0': number;
	public readonly 'FLIP_180': number;
	public readonly 'WIRE_STYLE_0': number;
	public readonly 'WIRE_STYLE_1': number;
	public readonly 'WIRE_STYLE_2': number;
	public readonly 'WIRE_STYLE_3': number;
	public readonly 'WIRE_STYLE_4': number;
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
	public 'selection_nearest_neighbors';
	public 'nearest_neighbor_index': number;
	public 'multi_selected': boolean;
	public 'clipboard_type': number;
	public 'clipboard_rotation': number;
	public 'clipboard_flip': number;
	public 'clipboard_property': any;
	public 'component_translating': boolean;
	public 'FLAG_IDLE': boolean;
	public 'FLAG_SIMULATING': boolean;
	public 'FLAG_SAVE_IMAGE': boolean;
	public 'FLAG_SAVE_CIRCUIT': boolean;
	public 'FLAG_ZOOM': boolean;
	public 'FLAG_ELEMENT_OPTIONS': boolean;
	public 'FLAG_ELEMENT_OPTIONS_EDIT': boolean;
	public 'FLAG_GRAPH': boolean;
	public 'FLAG_SELECT_ELEMENT': boolean;
	public 'FLAG_SELECT_TIMESTEP': boolean;
	public 'FLAG_SELECT_SETTINGS': boolean;
	public 'FLAG_REMOVE_ALL': boolean;
	public 'FLAG_MENU_OPEN': boolean;
	public 'FLAG_MENU_OPEN_DOWN': boolean;
	public 'SIGNAL_ADD_ELEMENT': boolean;
	public 'SIGNAL_WIRE_DELETED': boolean;
	public 'SIGNAL_WIRE_CREATED': boolean;
	public 'SIGNAL_HISTORY_LOCK': boolean;
	public 'SIGNAL_BUILD_ELEMENT': boolean;
	public 'signal_build_counter': number;
	public 'SIGNAL_BUILD_COUNTER_MAX': number;
	public 'signal_wire_deleted_counter': number;
	public 'SIGNAL_WIRE_DELETED_COUNTER_MAX': number;
	public 'component_touched': boolean;
	public 'mouse_keyboard_lock': boolean;
	public 'translation_lock': boolean;
	public 'is_singular': boolean;
	public 'mouse_down_event': MouseEvent;
	public 'mouse_move_event': MouseEvent;
	public 'mouse_up_event': MouseEvent;
	public 'mouse_wheel_event': MouseEvent;
	public 'mouse_double_click_event': MouseEvent;
	public 'mouse_down_event_queue': Array<MouseEvent>;
	public 'mouse_up_event_queue': Array<MouseEvent>;
	public 'mouse_wheel_event_queue': Array<MouseEvent>;
	public 'mouse_double_click_event_queue': Array<MouseEvent>;
	public 'BROWSER_IE': boolean;
	public 'BROWSER_CHROME': boolean;
	public 'BROWSER_OPERA': boolean;
	public 'BROWSER_FIREFOX': boolean;
	public 'BROWSER_SAFARI': boolean;
	public readonly 'TEXT_STYLE_1': string;
	public readonly 'TEXT_STYLE_2': string;
	public readonly 'TEXT_STYLE_3': string;
	public readonly 'TEXT_STYLE_4': string;
	public readonly 'TEXT_STYLE_5': string;
	public 'key_down_event': KEY_EVENT_T;
	public 'key_up_event': KEY_EVENT_T;
	public 'key_down_event_queue': Array<KEY_EVENT_T>;
	public 'key_up_event_queue': Array<KEY_EVENT_T>;
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
	public 'ANCHOR_POINT': ANCHOR_POINT_T;
	public 'SI_UNIT_ARRAY': Array<number>;
	public 'SI_UNIT_THRESHOLD_ARRAY': Array<number>;
	public 'SI_UNIT_ABBREVIATION': Array<string>;
	public 'WIRE_BUILDER': WIRE_BUILDER_T;
	public readonly 'PROPERTY_LIMIT_MIN': number;
	public readonly 'PROPERTY_LIMIT_MAX': number;
	public readonly 'WIRE_REFERENCE': WIRE_REFERENCE_T;
	public readonly 'PROPERTY_META_DATA': PROPERTY_META_DATA_T;
	/* #INSERT_SYMBOL_ELEMENT_PROPERTY_DECLARATION# */
	/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
	public readonly PROPERTY_RESISTOR: PROPERTY_RESISTOR_T;
	public readonly PROPERTY_CAPACITOR: PROPERTY_CAPACITOR_T;
	public readonly PROPERTY_INDUCTOR: PROPERTY_INDUCTOR_T;
	public readonly PROPERTY_GROUND: PROPERTY_GROUND_T;
	public readonly PROPERTY_DCSOURCE: PROPERTY_DCSOURCE_T;
	public readonly PROPERTY_DCCURRENT: PROPERTY_DCCURRENT_T;
	public readonly PROPERTY_ACSOURCE: PROPERTY_ACSOURCE_T;
	public readonly PROPERTY_ACCURRENT: PROPERTY_ACCURRENT_T;
	public readonly PROPERTY_SQUAREWAVE: PROPERTY_SQUAREWAVE_T;
	public readonly PROPERTY_SAW: PROPERTY_SAW_T;
	public readonly PROPERTY_TRI: PROPERTY_TRI_T;
	public readonly PROPERTY_CONSTANT: PROPERTY_CONSTANT_T;
	public readonly PROPERTY_WIRE: PROPERTY_WIRE_T;
	public readonly PROPERTY_NET: PROPERTY_NET_T;
	public readonly PROPERTY_NOTE: PROPERTY_NOTE_T;
	public readonly PROPERTY_RAIL: PROPERTY_RAIL_T;
	public readonly PROPERTY_VOLTMETER: PROPERTY_VOLTMETER_T;
	public readonly PROPERTY_OHMMETER: PROPERTY_OHMMETER_T;
	public readonly PROPERTY_AMMETER: PROPERTY_AMMETER_T;
	public readonly PROPERTY_WATTMETER: PROPERTY_WATTMETER_T;
	public readonly PROPERTY_FUSE: PROPERTY_FUSE_T;
	public readonly PROPERTY_SPST: PROPERTY_SPST_T;
	public readonly PROPERTY_SPDT: PROPERTY_SPDT_T;
	public readonly PROPERTY_NOT: PROPERTY_NOT_T;
	public readonly PROPERTY_DIODE: PROPERTY_DIODE_T;
	public readonly PROPERTY_LED: PROPERTY_LED_T;
	public readonly PROPERTY_ZENER: PROPERTY_ZENER_T;
	public readonly PROPERTY_POTENTIOMETER: PROPERTY_POTENTIOMETER_T;
	public readonly PROPERTY_AND: PROPERTY_AND_T;
	public readonly PROPERTY_OR: PROPERTY_OR_T;
	public readonly PROPERTY_NAND: PROPERTY_NAND_T;
	public readonly PROPERTY_NOR: PROPERTY_NOR_T;
	public readonly PROPERTY_XOR: PROPERTY_XOR_T;
	public readonly PROPERTY_XNOR: PROPERTY_XNOR_T;
	public readonly PROPERTY_DFF: PROPERTY_DFF_T;
	public readonly PROPERTY_VSAT: PROPERTY_VSAT_T;
	public readonly PROPERTY_ADD: PROPERTY_ADD_T;
	public readonly PROPERTY_SUB: PROPERTY_SUB_T;
	public readonly PROPERTY_MUL: PROPERTY_MUL_T;
	public readonly PROPERTY_DIV: PROPERTY_DIV_T;
	public readonly PROPERTY_GAIN: PROPERTY_GAIN_T;
	public readonly PROPERTY_ABS: PROPERTY_ABS_T;
	public readonly PROPERTY_VCSW: PROPERTY_VCSW_T;
	public readonly PROPERTY_VCVS: PROPERTY_VCVS_T;
	public readonly PROPERTY_VCCS: PROPERTY_VCCS_T;
	public readonly PROPERTY_CCCS: PROPERTY_CCCS_T;
	public readonly PROPERTY_CCVS: PROPERTY_CCVS_T;
	public readonly PROPERTY_OPAMP: PROPERTY_OPAMP_T;
	public readonly PROPERTY_NMOS: PROPERTY_NMOS_T;
	public readonly PROPERTY_PMOS: PROPERTY_PMOS_T;
	public readonly PROPERTY_NPN: PROPERTY_NPN_T;
	public readonly PROPERTY_PNP: PROPERTY_PNP_T;
	public readonly PROPERTY_ADC: PROPERTY_ADC_T;
	public readonly PROPERTY_DAC: PROPERTY_DAC_T;
	public readonly PROPERTY_SAH: PROPERTY_SAH_T;
	public readonly PROPERTY_PWM: PROPERTY_PWM_T;
	public readonly PROPERTY_INTEGRATOR: PROPERTY_INTEGRATOR_T;
	public readonly PROPERTY_DIFFERENTIATOR: PROPERTY_DIFFERENTIATOR_T;
	public readonly PROPERTY_LPF: PROPERTY_LPF_T;
	public readonly PROPERTY_HPF: PROPERTY_HPF_T;
	public readonly PROPERTY_REL: PROPERTY_REL_T;
	public readonly PROPERTY_PID: PROPERTY_PID_T;
	public readonly PROPERTY_LUT: PROPERTY_LUT_T;
	public readonly PROPERTY_VCR: PROPERTY_VCR_T;
	public readonly PROPERTY_VCCA: PROPERTY_VCCA_T;
	public readonly PROPERTY_VCL: PROPERTY_VCL_T;
	public readonly PROPERTY_GRT: PROPERTY_GRT_T;
	public readonly PROPERTY_TPTZ: PROPERTY_TPTZ_T;
	public readonly PROPERTY_TRAN: PROPERTY_TRAN_T;
	/* <!-- END AUTOMATICALLY GENERATED !--> */
	public readonly 'HISTORY_MANAGER': HISTORY_MANAGER_T;
	public readonly 'LANGUAGES': Array<string>;
	public 'LANGUGE_INDEX_COUNTER': number;
	public readonly 'LANGUAGE_INDEX_ENGLISH': number;
	public readonly 'LANGUAGE_INDEX_SPANISH': number;
	public readonly 'LANGUAGE_INDEX_FRENCH': number;
	public readonly 'LANGUAGE_INDEX_ITALIAN': number;
	public readonly 'LANGUAGE_INDEX_DUTCH': number;
	public readonly 'LANGUAGE_INDEX_RUSSIAN': number;
	public readonly 'LANGUAGE_INDEX_GERMAN': number;
	public readonly 'LANGUAGE_INDEX_INDONESIAN': number;
	public 'LANGUAGE_INDEX': number;
	public 'SYSTEM_OPTIONS': SYSTEM_OPTIONS_T;
	public 'indexer': number;
	public 'circle_buffer': Array<Array<number>>;
	public 'line_buffer': Array<Array<number>>;
	public 'SYSTEM_OPTION_LANGUAGE': number;
	public 'SYSTEM_OPTION_AUTOMATIC_TIMESTEP': number;
	public 'SYSTEM_OPTION_SHORTCUT_HINTS': number;
	public 'SYSTEM_OPTION_STRETCH_WINDOW': number;
	public readonly 'BACKGROUND_COLOR': string;
	public readonly 'ELEMENT_COLOR': string;
	public readonly 'SELECTED_COLOR': string;
	public readonly 'MULTI_SELECTED_COLOR': string;
	public readonly 'WORKSPACE_WORK_AREA_COLOR': string;
	public readonly 'GRAPH_AREA_COLOR': string;
	public readonly 'ZOOM_AREA_COLOR': string;
	public readonly 'TRACE_I_COLOR': string;
	public readonly 'TRACE_II_COLOR': string;
	public readonly 'TRACE_III_COLOR': string;
	public readonly 'TRACE_DEFAULT_COLOR': string;
	public readonly 'MENU_ICON_ACTIVE_COLOR': string;
	public readonly 'MENU_ICON_INACTIVE_COLOR': string;
	public readonly 'MENU_ICON_DEFAULT_COLOR': string;
	public readonly 'MENU_HIGHLIGHT_COLOR': string;
	public readonly 'MENU_FILL_COLOR': string;
	public readonly 'GENERAL_WHITE_COLOR': string;
	public readonly 'GENERAL_BLACK_COLOR': string;
	public readonly 'GENERAL_GRAY_COLOR': string;
	public readonly 'GENERAL_DARK_GRAY_COLOR': string;
	public readonly 'GENERAL_GREEN_COLOR': string;
	public readonly 'GENERAL_RED_COLOR': string;
	public readonly 'GENERAL_BLUE_COLOR': string;
	public readonly 'GENERAL_BOUNDS_COLOR': string;
	public readonly 'GENERAL_FILL_COLOR': string;
	public readonly 'GENERAL_CYAN_COLOR': string;
	public readonly 'GENERAL_HOVER_COLOR': string;
	public readonly 'GENERAL_YELLOW_COLOR': string;
	public readonly 'DEFAULT_FONT': string;
	public 'user_file_selected': boolean;
	public 'user_file': Circuit;
	public readonly 'KEY_CODE_ESCAPE': string;
	public readonly 'KEY_CODE_BACK_QUOTE': string;
	public readonly 'KEY_CODE_0': string;
	public readonly 'KEY_CODE_1': string;
	public readonly 'KEY_CODE_2': string;
	public readonly 'KEY_CODE_3': string;
	public readonly 'KEY_CODE_4': string;
	public readonly 'KEY_CODE_5': string;
	public readonly 'KEY_CODE_6': string;
	public readonly 'KEY_CODE_7': string;
	public readonly 'KEY_CODE_8': string;
	public readonly 'KEY_CODE_9': string;
	public readonly 'KEY_CODE_MINUS': string;
	public readonly 'KEY_CODE_EQUAL': string;
	public readonly 'KEY_CODE_BACKSPACE': string;
	public readonly 'KEY_CODE_Q': string;
	public readonly 'KEY_CODE_W': string;
	public readonly 'KEY_CODE_E': string;
	public readonly 'KEY_CODE_R': string;
	public readonly 'KEY_CODE_T': string;
	public readonly 'KEY_CODE_Y': string;
	public readonly 'KEY_CODE_U': string;
	public readonly 'KEY_CODE_I': string;
	public readonly 'KEY_CODE_O': string;
	public readonly 'KEY_CODE_P': string;
	public readonly 'KEY_CODE_LEFT_BRACKET': string;
	public readonly 'KEY_CODE_RIGHT_BRACKET': string;
	public readonly 'KEY_CODE_BACKSLASH': string;
	public readonly 'KEY_CODE_A': string;
	public readonly 'KEY_CODE_S': string;
	public readonly 'KEY_CODE_D': string;
	public readonly 'KEY_CODE_F': string;
	public readonly 'KEY_CODE_G': string;
	public readonly 'KEY_CODE_H': string;
	public readonly 'KEY_CODE_J': string;
	public readonly 'KEY_CODE_K': string;
	public readonly 'KEY_CODE_L': string;
	public readonly 'KEY_CODE_SEMI_COLON': string;
	public readonly 'KEY_CODE_QUOTE': string;
	public readonly 'KEY_CODE_ENTER': string;
	public readonly 'KEY_CODE_LEFT_SHIFT': string;
	public readonly 'KEY_CODE_Z': string;
	public readonly 'KEY_CODE_X': string;
	public readonly 'KEY_CODE_C': string;
	public readonly 'KEY_CODE_V': string;
	public readonly 'KEY_CODE_B': string;
	public readonly 'KEY_CODE_N': string;
	public readonly 'KEY_CODE_M': string;
	public readonly 'KEY_CODE_COMMA': string;
	public readonly 'KEY_CODE_PERIOD': string;
	public readonly 'KEY_CODE_FORWARD_SLASH': string;
	public readonly 'KEY_CODE_RIGHT_SHIFT': string;
	public readonly 'KEY_CODE_LEFT_CONTROL': string;
	public readonly 'KEY_CODE_LEFT_ALT': string;
	public readonly 'KEY_CODE_SPACE': string;
	public readonly 'KEY_CODE_RIGHT_ALT': string;
	public readonly 'KEY_CODE_RIGHT_CONTROL': string;
	public readonly 'KEY_CODE_DELETE': string;
	public readonly 'KEY_CODE_HOME': string;
	public readonly 'KEY_CODE_END': string;
	public readonly 'KEY_CODE_NUMPAD_MINUS': string;
	public readonly 'KEY_CODE_NUMPAD_DIVIDE': string;
	public readonly 'KEY_CODE_NUMPAD_MULTIPLY': string;
	public readonly 'KEY_CODE_NUMPAD_SUBTRACT': string;
	public readonly 'KEY_CODE_NUMPAD_ENTER': string;
	public readonly 'KEY_CODE_NUMPAD_DECIMAL': string;
	public readonly 'KEY_CODE_ARROW_LEFT': string;
	public readonly 'KEY_CODE_ARROW_UP': string;
	public readonly 'KEY_CODE_ARROW_DOWN': string;
	public readonly 'KEY_CODE_ARROW_RIGHT': string;
	public readonly 'KEY_CODE_NUMPAD0': string;
	public readonly 'KEY_CODE_NUMPAD1': string;
	public readonly 'KEY_CODE_NUMPAD2': string;
	public readonly 'KEY_CODE_NUMPAD3': string;
	public readonly 'KEY_CODE_NUMPAD4': string;
	public readonly 'KEY_CODE_NUMPAD5': string;
	public readonly 'KEY_CODE_NUMPAD6': string;
	public readonly 'KEY_CODE_NUMPAD7': string;
	public readonly 'KEY_CODE_NUMPAD8': string;
	public readonly 'KEY_CODE_NUMPAD9': string;
	public 'KEY_EVENT_CODES';
	public 'KEY_EVENT_KEYS';
	public 'time_step': number;
	public 'simulation_time': number;
	public 'RESIZE_EVENT': boolean;
	public 'FORCE_RESIZE_EVENT': boolean;
	public 'ON_RESTORE_EVENT': boolean;
	public 'MOUSE_DOWN_EVENT': boolean;
	public 'MOUSE_MOVE_EVENT': boolean;
	public 'MOUSE_UP_EVENT': boolean;
	public 'MOUSE_DOUBLE_CLICK_EVENT': boolean;
	public 'MOUSE_WHEEL_EVENT': boolean;
	public 'KEY_UP_EVENT': boolean;
	public 'KEY_DOWN_EVENT': boolean;
	public 'draw_block': boolean;
	public 'PICTURE_REQUEST': boolean;
	public readonly 'PICTURE_ZOOM': number;
	public readonly 'PICTURE_EXPOSURE_TIME': number;
	public 'canvas_draw_request': boolean;
	public 'canvas_draw_request_counter': number;
	public 'CANVAS_DRAW_REQUEST_COUNTER_MAX': number;
	public 'canvas_draw_event': boolean;
	public 'CANVAS_REDRAW_MAX': number;
	public 'canvas_redraw_counter': number;
	public 'CANVAS_STROKE_WIDTH_BASE': number;
	public 'CANVAS_STROKE_WIDTH_1': number;
	public 'CANVAS_STROKE_WIDTH_2': number;
	public 'CANVAS_STROKE_WIDTH_3': number;
	public 'CANVAS_STROKE_WIDTH_4': number;
	public 'CANVAS_STROKE_WIDTH_5': number;
	public 'CANVAS_STROKE_WIDTH_6': number;
	public 'CANVAS_STROKE_WIDTH_1_ZOOM': number;
	public 'CANVAS_STROKE_WIDTH_2_ZOOM': number;
	public 'CANVAS_STROKE_WIDTH_3_ZOOM': number;
	public 'CANVAS_STROKE_WIDTH_4_ZOOM': number;
	public 'CANVAS_STROKE_WIDTH_5_ZOOM': number;
	public 'CANVAS_STROKE_WIDTH_6_ZOOM': number;
	public 'CANVAS_TEXT_SIZE_BASE': number;
	public 'CANVAS_TEXT_SIZE_1': number;
	public 'CANVAS_TEXT_SIZE_2': number;
	public 'CANVAS_TEXT_SIZE_3': number;
	public 'CANVAS_TEXT_SIZE_4': number;
	public 'CANVAS_TEXT_SIZE_5': number;
	public 'CANVAS_TEXT_SIZE_6': number;
	public 'CANVAS_TEXT_SIZE_1_ZOOM': number;
	public 'CANVAS_TEXT_SIZE_2_ZOOM': number;
	public 'CANVAS_TEXT_SIZE_3_ZOOM': number;
	public 'CANVAS_TEXT_SIZE_4_ZOOM': number;
	public 'CANVAS_TEXT_SIZE_5_ZOOM': number;
	public 'CANVAS_TEXT_SIZE_6_ZOOM': number;
	public readonly 'PACKET_DIVIDER': string;
	public 'move_paint': Paint;
	public 'vt': number;
	public 'gmin_default': number;
	public 'v_max_err': Array<Array<number>>;
	public 'i_max_err': Array<Array<number>>;
	public 'v_locked': boolean;
	public 'i_locked': boolean;
	public 'v_conv': boolean;
	public 'i_conv': boolean;
	public readonly 'PI_DIV_2': number;
	public readonly 'PI_DIV_4': number;
	public readonly 'PI_MUL_3_DIV_4': number;
	public readonly 'PI_DIV_6': number;
	public readonly 'PI_DIV_12': number;
	public readonly 'PI_DIV_180': number;
	public readonly 'NEG_PI_DIV_180': number;
	public readonly '_180_DIV_PI': number;
	public readonly 'PI_MUL_2': number;
	public readonly 'TRIG_TABLE_Q_NUMBER': number;
	public readonly 'TRIG_SINE_TABLE': Array<number>;
	public readonly 'TRIG_TABLE_SIZE': number;
	public readonly 'TRIG_TABLE_SCALE_CONSTANT': number;
	public readonly 'TRIG_TABLE_INDEX_CONSTANT': number;
	public readonly 'TRIG_TABLE_MASK': number;
	public readonly 'TRIG_TABLE_ROUND': number;
	public readonly 'TIME_DATA_TEMPLATE': TIME_DATA_TEMPLATE_T;
	public readonly 'MAX_TEXT_LENGTH': number;
	public readonly 'inv_sqrt_buf': ArrayBuffer;
	public readonly 'inv_sqrt_f32': Float32Array;
	public readonly 'inv_sqrt_u32': Uint32Array;
	public readonly 'ALPHA_ARRAY': Array<number>;
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
	public readonly 'GARBAGE_COLLECTOR_SIZE': number;
	public 'temp_boolean': boolean;
	public 'general_index': number;
	public 'element_max_array': Array<number>;
	public 'meter_max_array': Array<number>;
	public 'non_linear_max_array': Array<number>;
	public 'max_general_number': number;
	constructor() {
		this.NULL = null;
		this.MOBILE_MODE = false;
		this.DESKTOP_MODE = false;
		this.NODE_HINTS = true;
		this.DEVICE_PIXEL_RATIO = 1;
		this.system_initialization = {
			step: 0,
			max: 5,
			completed: false
		};
		this.VERSION_TAG = '1.1.02';
		if (this.MOBILE_MODE) {
			this.workspace_zoom_scale = 2.5;
			this.ZOOM_MAX = 3.5;
			this.ZOOM_MIN = 1.0;
		} else {
			this.workspace_zoom_scale = 1.0;
			this.ZOOM_MAX = 2.0;
			this.ZOOM_MIN = 0.5;
		}
		this.ZERO_PT_FIVE = 0.5;
		this.ZERO = 0 >> 0;
		this.ZOOM_FACTOR = 1.085;
		this.natural_width = 0;
		this.natural_height = 0;
		this.settings = new Settings();
		this.DEVELOPER_MODE = false;
		this.PRODUCTION_MODE = false;
		this.ELEMENT_TAG_TEMPLATE = '{TAG}{ID}';
		this.ELEMENT_VAL_TEMPLATE = '{VAL}{UNIT}';
		this.DIVISION_TEXT_TEMPLATE = '{A} / {B}';
		this.PIXEL_TEMPLATE = '{VALUE}px';
		this.PNG_TEMPLATE = '{NAME}.png';
		this.ON = 'ON';
		this.OFF = 'OFF';
		this.virtual_canvas_id = 0;
		this.TYPE_META_DATA = -2;
		this.TYPE_COUNTER = 0;
		/* #INSERT_GENERATE_ELEMENT_TYPE# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		this.TYPE_RESISTOR = this.TYPE_COUNTER++;
		this.TYPE_CAPACITOR = this.TYPE_COUNTER++;
		this.TYPE_INDUCTOR = this.TYPE_COUNTER++;
		this.TYPE_GROUND = this.TYPE_COUNTER++;
		this.TYPE_DCSOURCE = this.TYPE_COUNTER++;
		this.TYPE_DCCURRENT = this.TYPE_COUNTER++;
		this.TYPE_ACSOURCE = this.TYPE_COUNTER++;
		this.TYPE_ACCURRENT = this.TYPE_COUNTER++;
		this.TYPE_SQUAREWAVE = this.TYPE_COUNTER++;
		this.TYPE_SAW = this.TYPE_COUNTER++;
		this.TYPE_TRI = this.TYPE_COUNTER++;
		this.TYPE_CONSTANT = this.TYPE_COUNTER++;
		this.TYPE_WIRE = this.TYPE_COUNTER++;
		this.TYPE_NET = this.TYPE_COUNTER++;
		this.TYPE_NOTE = this.TYPE_COUNTER++;
		this.TYPE_RAIL = this.TYPE_COUNTER++;
		this.TYPE_VOLTMETER = this.TYPE_COUNTER++;
		this.TYPE_OHMMETER = this.TYPE_COUNTER++;
		this.TYPE_AMMETER = this.TYPE_COUNTER++;
		this.TYPE_WATTMETER = this.TYPE_COUNTER++;
		this.TYPE_FUSE = this.TYPE_COUNTER++;
		this.TYPE_SPST = this.TYPE_COUNTER++;
		this.TYPE_SPDT = this.TYPE_COUNTER++;
		this.TYPE_NOT = this.TYPE_COUNTER++;
		this.TYPE_DIODE = this.TYPE_COUNTER++;
		this.TYPE_LED = this.TYPE_COUNTER++;
		this.TYPE_ZENER = this.TYPE_COUNTER++;
		this.TYPE_POTENTIOMETER = this.TYPE_COUNTER++;
		this.TYPE_AND = this.TYPE_COUNTER++;
		this.TYPE_OR = this.TYPE_COUNTER++;
		this.TYPE_NAND = this.TYPE_COUNTER++;
		this.TYPE_NOR = this.TYPE_COUNTER++;
		this.TYPE_XOR = this.TYPE_COUNTER++;
		this.TYPE_XNOR = this.TYPE_COUNTER++;
		this.TYPE_DFF = this.TYPE_COUNTER++;
		this.TYPE_VSAT = this.TYPE_COUNTER++;
		this.TYPE_ADD = this.TYPE_COUNTER++;
		this.TYPE_SUB = this.TYPE_COUNTER++;
		this.TYPE_MUL = this.TYPE_COUNTER++;
		this.TYPE_DIV = this.TYPE_COUNTER++;
		this.TYPE_GAIN = this.TYPE_COUNTER++;
		this.TYPE_ABS = this.TYPE_COUNTER++;
		this.TYPE_VCSW = this.TYPE_COUNTER++;
		this.TYPE_VCVS = this.TYPE_COUNTER++;
		this.TYPE_VCCS = this.TYPE_COUNTER++;
		this.TYPE_CCCS = this.TYPE_COUNTER++;
		this.TYPE_CCVS = this.TYPE_COUNTER++;
		this.TYPE_OPAMP = this.TYPE_COUNTER++;
		this.TYPE_NMOS = this.TYPE_COUNTER++;
		this.TYPE_PMOS = this.TYPE_COUNTER++;
		this.TYPE_NPN = this.TYPE_COUNTER++;
		this.TYPE_PNP = this.TYPE_COUNTER++;
		this.TYPE_ADC = this.TYPE_COUNTER++;
		this.TYPE_DAC = this.TYPE_COUNTER++;
		this.TYPE_SAH = this.TYPE_COUNTER++;
		this.TYPE_PWM = this.TYPE_COUNTER++;
		this.TYPE_INTEGRATOR = this.TYPE_COUNTER++;
		this.TYPE_DIFFERENTIATOR = this.TYPE_COUNTER++;
		this.TYPE_LPF = this.TYPE_COUNTER++;
		this.TYPE_HPF = this.TYPE_COUNTER++;
		this.TYPE_REL = this.TYPE_COUNTER++;
		this.TYPE_PID = this.TYPE_COUNTER++;
		this.TYPE_LUT = this.TYPE_COUNTER++;
		this.TYPE_VCR = this.TYPE_COUNTER++;
		this.TYPE_VCCA = this.TYPE_COUNTER++;
		this.TYPE_VCL = this.TYPE_COUNTER++;
		this.TYPE_GRT = this.TYPE_COUNTER++;
		this.TYPE_TPTZ = this.TYPE_COUNTER++;
		this.TYPE_TRAN = this.TYPE_COUNTER++;
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		this.ROTATION_0 = 0;
		this.ROTATION_90 = 1;
		this.ROTATION_180 = 2;
		this.ROTATION_270 = 3;
		this.WIRE_STYLE_0 = 0;
		this.WIRE_STYLE_1 = 1;
		this.WIRE_STYLE_2 = 2;
		this.WIRE_STYLE_3 = 3;
		this.WIRE_STYLE_4 = 4;
		this.FLIP_0 = 0;
		this.FLIP_180 = 1;
		this.focused = false;
		this.focused_id = this.NULL;
		this.focused_type = this.NULL;
		this.focused_bounds = this.NULL;
		this.last_selected = false;
		this.selected = false;
		this.selected_id = this.NULL;
		this.selected_type = -1;
		this.selected_wire_style = this.NULL;
		this.selected_bounds = this.NULL;
		this.selected_properties = this.NULL;
		this.selection_nearest_neighbors = [];
		this.nearest_neighbor_index = 0;
		this.multi_selected = false;
		this.clipboard_type = this.NULL;
		this.clipboard_rotation = this.NULL;
		this.clipboard_flip = this.NULL;
		this.clipboard_property = this.NULL;
		this.component_translating = false;
		this.vt = 25.6e-3;
		this.gmin_default = 1e-9;
		this.v_max_err = [];
		this.i_max_err = [];
		this.v_locked = false;
		this.i_locked = false;
		this.v_conv = false;
		this.i_conv = false;
		this.FLAG_IDLE = true;
		this.FLAG_SIMULATING = false;
		this.FLAG_SAVE_IMAGE = false;
		this.FLAG_SAVE_CIRCUIT = false;
		this.FLAG_ZOOM = false;
		this.FLAG_ELEMENT_OPTIONS = false;
		this.FLAG_ELEMENT_OPTIONS_EDIT = false;
		this.FLAG_GRAPH = false;
		this.FLAG_SELECT_ELEMENT = false;
		this.FLAG_SELECT_TIMESTEP = false;
		this.FLAG_SELECT_SETTINGS = false;
		this.FLAG_REMOVE_ALL = false;
		this.FLAG_MENU_OPEN = false;
		this.FLAG_MENU_OPEN_DOWN = false;
		this.SIGNAL_ADD_ELEMENT = false;
		this.SIGNAL_WIRE_DELETED = false;
		this.SIGNAL_WIRE_CREATED = false;
		this.SIGNAL_HISTORY_LOCK = false;
		this.SIGNAL_BUILD_ELEMENT = false;
		this.signal_build_counter = 0;
		this.SIGNAL_BUILD_COUNTER_MAX = 3;
		this.signal_wire_deleted_counter = 0;
		this.SIGNAL_WIRE_DELETED_COUNTER_MAX = 3;
		this.component_touched = false;
		this.mouse_keyboard_lock = false;
		this.translation_lock = true;
		this.is_singular = false;
		this.mouse_down_event = this.NULL;
		this.mouse_move_event = this.NULL;
		this.mouse_up_event = this.NULL;
		this.mouse_wheel_event = this.NULL;
		this.mouse_double_click_event = this.NULL;
		this.mouse_down_event_queue = [];
		this.mouse_up_event_queue = [];
		this.mouse_wheel_event_queue = [];
		this.mouse_double_click_event_queue = [];
		this.BROWSER_IE = false;
		this.BROWSER_CHROME = false;
		this.BROWSER_OPERA = false;
		this.BROWSER_FIREFOX = false;
		this.BROWSER_SAFARI = false;
		this.TEXT_STYLE_1 = 'Style1';
		this.TEXT_STYLE_2 = 'Style2';
		this.TEXT_STYLE_3 = 'Style3';
		this.TEXT_STYLE_4 = 'Style4';
		this.TEXT_STYLE_5 = 'Style5';
		this.key_down_event = {
			event: null,
			alt: false,
			shift: false,
			ctrl: false,
			caps: false
		};
		this.key_up_event = {
			event: null,
			alt: false,
			shift: false,
			ctrl: false,
			caps: false
		};
		this.key_down_event_queue = [];
		this.key_up_event_queue = [];
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
		this.ANCHOR_POINT = {
			p1: 0,
			p2: 1,
			p3: 2,
			p4: 3
		};
		this.SI_UNIT_ARRAY = [1 / 1e21, 1 / 1e18, 1 / 1e15, 1 / 1e12, 1 / 1e9, 1 / 1e6, 1 / 1e3, 1, 1 / 1e-3, 1 / 1e-6, 1 / 1e-9, 1 / 1e-12, 1 / 1e-15, 1 / 1e-18, 1 / 1e-21];
		this.SI_UNIT_THRESHOLD_ARRAY = [
			0.99 * 1e21,
			0.99 * 1e18,
			0.99 * 1e15,
			0.99 * 1e12,
			0.99 * 1e9,
			0.99 * 1e6,
			0.99 * 1e3,
			0.99 * 1,
			0.99 * 1e-3,
			0.99 * 1e-6,
			0.99 * 1e-9,
			0.99 * 1e-12,
			0.99 * 1e-15,
			0.99 * 1e-18,
			0.99 * 1e-21
		];
		this.SI_UNIT_ABBREVIATION = ['Z', 'E', 'P', 'T', 'G', 'M', 'k', '', 'm', 'u', 'n', 'p', 'f', 'a', 'z'];
		this.WIRE_BUILDER = {
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
		this.PROPERTY_LIMIT_MIN = 0;
		this.PROPERTY_LIMIT_MAX = 1;
		this.WIRE_REFERENCE = {
			wire_id: -1,
			anchor_point: -1,
			linkage: -1
		};
		this.PROPERTY_META_DATA = {
			company: 'phasorsystems',
			version: this.VERSION_TAG,
			date: ''
		};
		this.PROPERTY_RESISTOR = {
			Resistance: 1.0e3,
			tag: 'R',
			units: 'Ω',
			options: ['Resistance'],
			options_units: ['Ω'],
			option_limits: {
				Resistance: [this.settings.WIRE_RESISTANCE, this.settings.R_MAX * 0.5]
			}
		};
		this.PROPERTY_SPST = {
			'Open Resistance': this.settings.R_MAX * 0.5,
			'Closed Resistance': this.settings.WIRE_RESISTANCE,
			'Switch State': this.OFF,
			tag: 'SPST',
			units: 'Ω',
			options: ['Closed Resistance', 'Switch State'],
			options_units: ['Ω', ''],
			option_limits: {
				'Closed Resistance': [this.settings.WIRE_RESISTANCE, this.settings.R_MAX * 0.5]
			}
		};
		this.PROPERTY_NOT = {
			'High Voltage': 5,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'NOT',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_DIODE = {
			'Emission Coefficient': 1,
			'Saturation Current': 1e-15,
			'Equivalent Current': 0,
			Voltage: 0,
			'Last Voltage': 0,
			'Last Current': 0,
			Resistance: 1.0 / this.settings.R_MAX,
			tag: 'DIO',
			units: '',
			options: ['Emission Coefficient', 'Saturation Current'],
			options_units: ['', 'A'],
			option_limits: {
				'Emission Coefficient': [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				'Saturation Current': [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_LED = {
			'Emission Coefficient': 3.73,
			'Saturation Current': 93.2e-12,
			Wavelength: 425,
			'Turn On Current': 20e-3,
			'Equivalent Current': 0,
			Voltage: 0,
			'Last Voltage': 0,
			'Last Current': 0,
			Resistance: 1.0 / this.settings.R_MAX,
			tag: 'LED',
			units: '',
			options: ['Emission Coefficient', 'Saturation Current', 'Wavelength'],
			options_units: ['', 'A', 'nm'],
			option_limits: {
				'Emission Coefficient': [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				'Saturation Current': [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT],
				Wavelength: [this.settings.MIN_WAVELENGTH, this.settings.MAX_WAVELENGTH]
			}
		};
		this.PROPERTY_ZENER = {
			'Zener Voltage': 5.6,
			'Emission Coefficient': 1,
			'Saturation Current': 1e-15,
			'Equivalent Current': 0,
			Voltage: 0,
			'Last Voltage': 0,
			'Last Current': 0,
			Resistance: 1.0 / this.settings.R_MAX,
			tag: 'ZEN',
			units: '',
			options: ['Zener Voltage', 'Emission Coefficient', 'Saturation Current'],
			options_units: ['V', '', 'A'],
			option_limits: {
				'Zener Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				'Emission Coefficient': [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				'Saturation Current': [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_VOLTMETER = {
			Voltage: 0,
			tag: 'VM',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_WATTMETER = {
			Wattage: 0,
			'Test Voltage': 1e-9,
			tag: 'WM',
			units: 'W',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_AMMETER = {
			Current: 0,
			'Test Voltage': 1e-9,
			tag: 'AM',
			units: 'A',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_OHMMETER = {
			'Sensed Resistance': 0,
			'Test Voltage': 1e-9,
			tag: 'OM',
			units: 'Ω',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_WIRE = {
			tag: 'W',
			units: 'Ω',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_DCSOURCE = {
			Voltage: 12,
			tag: 'DC',
			units: 'V',
			options: ['Voltage'],
			options_units: ['V'],
			option_limits: {
				Voltage: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_ACSOURCE = {
			Voltage: 12,
			Frequency: 60,
			Phase: 0,
			Offset: 0,
			tag: 'AC',
			units: 'V',
			options: ['Voltage', 'Frequency', 'Phase', 'Offset'],
			options_units: ['V', 'Hz', ' º', 'V'],
			option_limits: {
				Voltage: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Frequency: [this.settings.MIN_FREQUENCY, this.settings.MAX_FREQUENCY],
				Phase: [this.settings.MIN_PHASE, this.settings.MAX_PHASE],
				Offset: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_SQUAREWAVE = {
			Voltage: 12,
			Frequency: 60,
			Duty: 50,
			Offset: 0,
			tag: 'SQ',
			units: 'V',
			options: ['Voltage', 'Frequency', 'Duty', 'Offset'],
			options_units: ['V', 'Hz', '%', 'V'],
			option_limits: {
				Voltage: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Frequency: [this.settings.MIN_FREQUENCY, this.settings.MAX_FREQUENCY],
				Duty: [this.settings.MIN_DUTY_CYCLE, this.settings.MAX_DUTY_CYCLE],
				Offset: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_ACCURRENT = {
			Current: 12,
			Frequency: 60,
			Phase: 0,
			Offset: 0,
			tag: 'ACC',
			units: 'A',
			options: ['Current', 'Frequency', 'Phase', 'Offset'],
			options_units: ['A', 'Hz', ' º', 'A'],
			option_limits: {
				Current: [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT],
				Frequency: [this.settings.MIN_FREQUENCY, this.settings.MAX_FREQUENCY],
				Phase: [this.settings.MIN_PHASE, this.settings.MAX_PHASE],
				Offset: [this.settings.MIN_VOLTAGE, this.settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_DCCURRENT = {
			Current: 12,
			tag: 'DCC',
			units: 'A',
			options: ['Current'],
			options_units: ['A'],
			option_limits: {
				Current: [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_CAPACITOR = {
			Capacitance: 1.0e-6,
			'Transient Resistance': this.settings.R_MAX,
			'Transient Current': 0,
			'Equivalent Current': 0,
			'Initial Voltage': 0,
			'Transient Voltage': 0,
			tag: 'C',
			units: 'F',
			options: ['Capacitance', 'Initial Voltage'],
			options_units: ['F', 'V'],
			option_limits: {
				Capacitance: [this.settings.MIN_CAPACITANCE, this.settings.MAX_CAPACITANCE],
				'Initial Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_INDUCTOR = {
			Inductance: 1.0e-3,
			'Transient Resistance': this.settings.R_MAX,
			'Transient Current': 0,
			'Equivalent Current': 0,
			'Initial Current': 0,
			'Transient Voltage': 0,
			tag: 'I',
			units: 'H',
			options: ['Inductance', 'Initial Current'],
			options_units: ['H', 'A'],
			option_limits: {
				Inductance: [this.settings.MIN_INDUCTANCE, this.settings.MAX_INDUCTANCE],
				'Initial Current': [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_GROUND = {
			tag: 'G',
			units: ''
		};
		this.PROPERTY_NET = {
			Name: 'Net',
			tag: 'N',
			'Show Name': this.ON,
			units: '',
			options: ['Name', 'Show Name'],
			options_units: ['', ''],
			option_limits: {
				Name: [-1, 1]
			}
		};
		this.PROPERTY_CONSTANT = {
			Voltage: 12,
			tag: 'CV',
			units: 'V',
			options: ['Voltage'],
			options_units: ['V'],
			option_limits: {
				Voltage: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_POTENTIOMETER = {
			Resistance: 1e3,
			'Wiper Percentage': 50,
			tag: 'P',
			units: 'Ω',
			options: ['Resistance', 'Wiper Percentage'],
			options_units: ['Ω', '%'],
			option_limits: {
				Resistance: [this.settings.WIRE_RESISTANCE, this.settings.R_MAX * 0.5],
				'Wiper Percentage': [this.settings.MIN_POTENTIOMETER_WIPER, this.settings.MAX_POTENTIOMETER_WIPER]
			}
		};
		this.PROPERTY_AND = {
			'High Voltage': 5,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'AND',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_OR = {
			'High Voltage': 5,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'OR',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_NAND = {
			'High Voltage': 5,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'NAND',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_NOR = {
			'High Voltage': 5,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'NOR',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_XOR = {
			'High Voltage': 5,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'XOR',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_XNOR = {
			'High Voltage': 5,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'XNOR',
			units: 'V',
			options: ['High Voltage'],
			options_units: ['V'],
			option_limits: {
				'High Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_VCSW = {
			'High Voltage': 5,
			'Closed Resistance': 1.0 / this.settings.R_MAX,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'VCSW',
			units: 'V',
			options: ['High Voltage', 'Closed Resistance'],
			options_units: ['V', 'Ω'],
			option_limits: {
				'High Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				'Closed Resistance': [this.settings.WIRE_RESISTANCE, this.settings.R_MAX * 0.5]
			}
		};
		this.PROPERTY_VCR = {
			'Low Voltage': 0,
			'High Voltage': 1,
			Elm0: 1e3,
			Elm1: 1e3,
			Elm2: 1e3,
			Elm3: 1e3,
			Elm4: 1e3,
			Interpolate: this.ON,
			'Input Voltage': 0,
			'Output Resistance': this.settings.WIRE_RESISTANCE,
			tag: 'VCR',
			units: 'V',
			options: ['Elm0', 'Elm1', 'Elm2', 'Elm3', 'Elm4', 'Interpolate'],
			options_units: ['Ω', 'Ω', 'Ω', 'Ω', 'Ω', ''],
			option_limits: {
				Elm0: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm1: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm2: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm3: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm4: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Interpolate: ['', '']
			}
		};
		this.PROPERTY_VCVS = {
			Gain: 1,
			tag: 'VCVS',
			units: 'V/V',
			options: ['Gain'],
			options_units: ['V/V'],
			option_limits: {
				Gain: [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
			}
		};
		this.PROPERTY_VCCS = {
			Gain: 1,
			tag: 'VCCS',
			units: 'Mho',
			options: ['Gain'],
			options_units: ['Mho'],
			option_limits: {
				Gain: [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
			}
		};
		this.PROPERTY_CCCS = {
			Gain: 1,
			tag: 'CCCS',
			units: 'A/A',
			options: ['Gain'],
			options_units: ['A/A'],
			option_limits: {
				Gain: [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
			}
		};
		this.PROPERTY_CCVS = {
			Gain: 1,
			tag: 'CCVS',
			units: 'Ohm',
			options: ['Gain'],
			options_units: ['Ohm'],
			option_limits: {
				Gain: [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
			}
		};
		this.PROPERTY_SPDT = {
			'Open Resistance': this.settings.R_MAX * 0.5,
			'Closed Resistance': 1.0 / this.settings.R_MAX,
			'Switch State': this.OFF,
			tag: 'SPDT',
			units: 'Ω',
			options: ['Closed Resistance', 'Switch State'],
			options_units: ['Ω', ''],
			option_limits: {
				'Closed Resistance': [this.settings.WIRE_RESISTANCE, this.settings.R_MAX * 0.5]
			}
		};
		this.PROPERTY_OPAMP = {
			tag: 'OP',
			units: '',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_VSAT = {
			'High Voltage': 12,
			'Low Voltage': -12,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'VSAT',
			units: 'V',
			options: ['High Voltage', 'Low Voltage'],
			options_units: ['V', 'V'],
			option_limits: {
				'High Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				'Low Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_SAW = {
			Voltage: 12,
			Frequency: 60,
			Phase: 0,
			Offset: 0,
			tag: 'SAW',
			units: 'V',
			options: ['Voltage', 'Frequency', 'Phase', 'Offset'],
			options_units: ['V', 'Hz', ' º', 'V'],
			option_limits: {
				Voltage: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Frequency: [this.settings.MIN_FREQUENCY, this.settings.MAX_FREQUENCY],
				Phase: [this.settings.MIN_PHASE, this.settings.MAX_PHASE],
				Offset: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_TRI = {
			Voltage: 12,
			Frequency: 60,
			Phase: 0,
			Offset: 0,
			tag: 'TRI',
			units: 'V',
			options: ['Voltage', 'Frequency', 'Phase', 'Offset'],
			options_units: ['V', 'Hz', ' º', 'V'],
			option_limits: {
				Voltage: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Frequency: [this.settings.MIN_FREQUENCY, this.settings.MAX_FREQUENCY],
				Phase: [this.settings.MIN_PHASE, this.settings.MAX_PHASE],
				Offset: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_ADD = {
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'VADD',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_SUB = {
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'VSUB',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_MUL = {
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'VMUL',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_GRT = {
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'VGRT',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_DIV = {
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'VDIV',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_NMOS = {
			'W/L Ratio': 50,
			"K'n": 118e-6,
			VTN: 650e-3,
			Lambda: 1e-6,
			Vgs: 0,
			Vds: 0,
			gds: 1.0 / this.settings.R_MAX,
			gm: 1.0 / this.settings.R_MAX,
			Io: 0,
			'Mosfet Mode': 0,
			'Last Vgs': 0,
			'Last Io': 0,
			tag: 'NMOS',
			units: 'W/L',
			options: ['W/L Ratio', "K'n", 'VTN', 'Lambda'],
			options_units: ['', 'A/V^2', 'V', 'V^-1'],
			option_limits: {
				'W/L Ratio': [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				"K'n": [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				VTN: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Lambda: [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
			}
		};
		this.PROPERTY_PMOS = {
			'W/L Ratio': 50,
			"K'p": -118e-6,
			VTP: -650e-3,
			Lambda: -1e-6,
			Vsg: 0,
			Vsd: 0,
			gsd: 1.0 / this.settings.R_MAX,
			gm: 1.0 / this.settings.R_MAX,
			Io: 0,
			'Mosfet Mode': 0,
			'Last Vsg': 0,
			'Last Io': 0,
			tag: 'PMOS',
			units: 'W/L',
			options: ['W/L Ratio', "K'p", 'VTP', 'Lambda'],
			options_units: ['', 'A/V^2', 'V', 'V^-1'],
			option_limits: {
				'W/L Ratio': [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				"K'p": [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				VTP: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Lambda: [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
			}
		};
		this.PROPERTY_NPN = {
			'Forward Beta': 100,
			'Reverse Beta': 1,
			'Saturation Current': 1e-15,
			'Emission Coefficient': 1,
			Vbe: 0,
			Vbc: 0,
			g_ee: 1.0 / this.settings.R_MAX,
			g_ec: 1.0 / this.settings.R_MAX,
			g_ce: 1.0 / this.settings.R_MAX,
			g_cc: 1.0 / this.settings.R_MAX,
			i_e: 0,
			i_c: 0,
			I_e: 0,
			I_c: 0,
			'Last Vbe': 0,
			'Last Io': 0,
			tag: 'NPN',
			units: 'A/A',
			options: ['Forward Beta', 'Reverse Beta', 'Saturation Current'],
			options_units: ['A/A', 'A/A', 'A'],
			option_limits: {
				'Forward Beta': [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				'Reverse Beta': [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				'Saturation Current': [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_PNP = {
			'Forward Beta': 100,
			'Reverse Beta': 1,
			'Saturation Current': 1e-15,
			'Emission Coefficient': 1,
			Veb: 0,
			Vcb: 0,
			g_ee: 1.0 / this.settings.R_MAX,
			g_ec: 1.0 / this.settings.R_MAX,
			g_ce: 1.0 / this.settings.R_MAX,
			g_cc: 1.0 / this.settings.R_MAX,
			i_e: 0,
			i_c: 0,
			I_e: 0,
			I_c: 0,
			'Last Veb': 0,
			'Last Io': 0,
			tag: 'PNP',
			units: 'A/A',
			options: ['Forward Beta', 'Reverse Beta', 'Saturation Current'],
			options_units: ['A/A', 'A/A', 'A'],
			option_limits: {
				'Forward Beta': [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				'Reverse Beta': [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				'Saturation Current': [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT]
			}
		};
		this.PROPERTY_TRAN = {
			'Turns Ratio': 1,
			tag: 'TRAN',
			units: 'NP/NS',
			options: ['Turns Ratio'],
			options_units: ['NP/NS'],
			option_limits: {
				'NP/NS': [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
			}
		};
		this.PROPERTY_ADC = {
			'Bit Resolution': 12,
			'Reference Voltage': 3.3,
			LSB: 0,
			'Max Bits': 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'ADC',
			units: 'Bits',
			options: ['Bit Resolution', 'Reference Voltage'],
			options_units: ['Bits', 'V'],
			option_limits: {
				'Bit Resolution': [this.settings.MIN_BIT_RESOLUTION, this.settings.MAX_BIT_RESOLUTION],
				'Reference Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_DAC = {
			'Bit Resolution': 12,
			'Reference Voltage': 3.3,
			LSB: 0,
			'Max Bits': 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'DAC',
			units: 'Bits',
			options: ['Bit Resolution', 'Reference Voltage'],
			options_units: ['Bits', 'V'],
			option_limits: {
				'Bit Resolution': [this.settings.MIN_BIT_RESOLUTION, this.settings.MAX_BIT_RESOLUTION],
				'Reference Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_PWM = {
			'Max Frequency': 120,
			'Min Frequency': 60,
			'Max Duty': this.settings.MAX_DUTY_CYCLE,
			'Min Duty': this.settings.MIN_DUTY_CYCLE,
			Phase: 0,
			Postscaler: 1,
			Counter: 0,
			Frequency: 0,
			Duty: 0,
			'High Voltage': 1,
			'Low Voltage': 0,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			A: 0,
			'Saw Wave': 0,
			'Output Voltage': 0,
			'Last Output Voltage': 0,
			tag: 'PWM',
			units: 'V',
			options: ['Max Frequency', 'Min Frequency', 'Max Duty', 'Min Duty', 'Phase', 'Postscaler'],
			options_units: ['Hz', 'Hz', '%', '%', ' º', ''],
			option_limits: {
				'Max Frequency': [this.settings.MIN_FREQUENCY, this.settings.MAX_FREQUENCY],
				'Min Frequency': [this.settings.MIN_FREQUENCY, this.settings.MAX_FREQUENCY],
				'Max Duty': [this.settings.MIN_DUTY_CYCLE, this.settings.MAX_DUTY_CYCLE],
				'Min Duty': [this.settings.MIN_DUTY_CYCLE, this.settings.MAX_DUTY_CYCLE],
				Phase: [this.settings.MIN_PHASE, this.settings.MAX_PHASE],
				Postscaler: [this.settings.MIN_POSTSCALER, this.settings.MAX_POSTSCALER]
			}
		};
		this.PROPERTY_INTEGRATOR = {
			'Initial Value': 0,
			'High Voltage': 5,
			'Low Voltage': -5,
			'Last Value': 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'INT',
			units: '',
			options: ['Initial Value', 'High Voltage', 'Low Voltage'],
			options_units: ['V', 'V', 'V'],
			option_limits: {
				'Initial Value': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				'High Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				'Low Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_DIFFERENTIATOR = {
			'Initial Value': 0,
			'High Voltage': 5,
			'Low Voltage': -5,
			'Last Value': 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'DIFF',
			units: '',
			options: ['Initial Value', 'High Voltage', 'Low Voltage'],
			options_units: ['V', 'V', 'V'],
			option_limits: {
				'Initial Value': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				'High Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				'Low Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_GAIN = {
			Gain: 1,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'GAIN',
			units: 'V',
			options: ['Gain'],
			options_units: ['V'],
			option_limits: {
				Gain: [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
			}
		};
		this.PROPERTY_ABS = {
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'ABS',
			units: '',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_LPF = {
			'Cutoff Frequency': 120,
			'Y Out': 0,
			'Y Hat': 0,
			Alpha: 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'LPF',
			units: 'V',
			options: ['Cutoff Frequency'],
			options_units: ['Hz'],
			option_limits: {
				'Cutoff Frequency': [this.settings.MIN_FREQUENCY, this.settings.MAX_FREQUENCY]
			}
		};
		this.PROPERTY_HPF = {
			'Cutoff Frequency': 120,
			'Y Out': 0,
			'Y Hat': 0,
			'X Hat': 0,
			Alpha: 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'HPF',
			units: 'V',
			options: ['Cutoff Frequency'],
			options_units: ['Hz'],
			option_limits: {
				'Cutoff Frequency': [this.settings.MIN_FREQUENCY, this.settings.MAX_FREQUENCY]
			}
		};
		this.PROPERTY_RAIL = {
			Voltage: 12,
			tag: 'PR',
			units: 'V',
			options: ['Voltage'],
			options_units: ['V'],
			option_limits: {
				Voltage: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_REL = {
			Inductance: 1.0e-3,
			'Transient Resistance': this.settings.R_MAX,
			'Transient Current': 0,
			'Equivalent Current': 0,
			'Initial Current': 0,
			'Turn on Current': 10e-3,
			'Closed Resistance': this.settings.WIRE_RESISTANCE,
			'Open Resistance': this.settings.R_MAX * 0.5,
			tag: 'RELAY',
			units: 'H',
			options: ['Inductance', 'Initial Current', 'Turn on Current', 'Closed Resistance'],
			options_units: ['H', 'A', 'A', 'Ω'],
			option_limits: {
				Inductance: [this.settings.MIN_INDUCTANCE, this.settings.MAX_INDUCTANCE],
				'Initial Current': [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT],
				'Turn on Current': [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT],
				'Closed Resistance': [this.settings.WIRE_RESISTANCE, this.settings.R_MAX * 0.5]
			}
		};
		this.PROPERTY_PID = {
			Setpoint: 0,
			Kp: 1,
			Ki: 0,
			Kd: 0,
			'Min Output': 0,
			'Max Output': 1,
			'High Voltage': 1,
			'Low Voltage': 0,
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			tag: 'PID',
			units: '',
			options: ['Setpoint', 'Kp', 'Ki', 'Kd', 'Min Output', 'Max Output'],
			options_units: ['V', '', '', '', 'V', 'V'],
			option_limits: {
				Setpoint: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Kp: [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				Ki: [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				Kd: [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				'Min Output': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				'Max Output': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
			}
		};
		this.PROPERTY_SAH = {
			'Input Voltage1': 0,
			'Input Voltage2': 0,
			'Output Voltage': 0,
			'High Voltage': 1,
			'Low Voltage': 0,
			tag: 'SAH',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_LUT = {
			Elm0: 12,
			Elm1: 12,
			Elm2: 12,
			Elm3: 12,
			Elm4: 12,
			Interpolate: this.ON,
			'High Voltage': 1,
			'Low Voltage': 0,
			'Input Voltage1': 0,
			'Output Voltage': 0,
			tag: 'LUT',
			units: '',
			options: ['Elm0', 'Elm1', 'Elm2', 'Elm3', 'Elm4', 'Interpolate'],
			options_units: ['V', 'V', 'V', 'V', 'V', ''],
			option_limits: {
				Elm0: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm1: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm2: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm3: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm4: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Interpolate: ['', '']
			}
		};
		this.PROPERTY_TPTZ = {
			A1: 0,
			A2: 0,
			B0: 1,
			B1: 0,
			B2: 0,
			'Input Voltage': 0,
			'Output Voltage': 0,
			tag: 'TPTZ',
			units: '',
			options: ['A1', 'A2', 'B0', 'B1', 'B2'],
			options_units: ['', '', '', '', ''],
			option_limits: {
				A1: [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				A2: [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				B0: [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				B1: [this.settings.MIN_GAIN, this.settings.MAX_GAIN],
				B2: [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
			}
		};
		this.PROPERTY_NOTE = {
			Note: 'empty',
			tag: 'NOTE',
			'Text Style': this.TEXT_STYLE_1,
			'Show Marker': this.ON,
			units: '',
			options: ['Note', 'Text Style', 'Show Marker'],
			options_units: ['', '', ''],
			option_limits: {
				Note: [-1, 1]
			}
		};
		this.PROPERTY_FUSE = {
			'Current Rating': 500e-3,
			Resistance: this.settings.WIRE_RESISTANCE,
			Voltage: 1e-9,
			Broken: false,
			tag: 'FUS',
			units: 'A',
			options: ['Current Rating', 'Resistance'],
			options_units: ['A', 'Ω'],
			option_limits: {
				'Current Rating': [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT],
				Resistance: [this.settings.WIRE_RESISTANCE, this.settings.R_MAX * 0.5]
			}
		};
		this.PROPERTY_DFF = {
			'Input Voltage1': 0,
			'Last Clock': 1,
			Clock: 0,
			Q: 0,
			'!Q': 0,
			tag: 'DFF',
			units: 'V',
			options: [''],
			options_units: [''],
			option_limits: {}
		};
		this.PROPERTY_VCCA = {
			'Low Voltage': 0,
			'High Voltage': 1,
			Elm0: 1e-6,
			Elm1: 1e-6,
			Elm2: 1e-6,
			Elm3: 1e-6,
			Interpolate: this.ON,
			'Input Voltage': 0,
			'Output Capacitance': 1e-6,
			'Initial Voltage': 0,
			'Transient Resistance': this.settings.R_MAX,
			'Transient Current': 0,
			'Equivalent Current': 0,
			'Transient Voltage': 0,
			tag: 'VCCA',
			units: 'V',
			options: ['Elm0', 'Elm1', 'Elm2', 'Elm3', 'Initial Voltage', 'Interpolate'],
			options_units: ['F', 'F', 'F', 'F', 'V', ''],
			option_limits: {
				Elm0: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm1: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm2: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm3: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				'Initial Voltage': [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Interpolate: ['', '']
			}
		};
		this.PROPERTY_VCL = {
			'Low Voltage': 0,
			'High Voltage': 1,
			Elm0: 1e-3,
			Elm1: 1e-3,
			Elm2: 1e-3,
			Elm3: 1e-3,
			Interpolate: this.ON,
			'Input Voltage': 0,
			'Output Inductance': 1e-3,
			'Initial Current': 0,
			'Transient Resistance': this.settings.R_MAX,
			'Transient Current': 0,
			'Equivalent Current': 0,
			'Transient Voltage': 0,
			tag: 'VCL',
			units: 'V',
			options: ['Elm0', 'Elm1', 'Elm2', 'Elm3', 'Initial Current', 'Interpolate'],
			options_units: ['H', 'H', 'H', 'H', 'A', ''],
			option_limits: {
				Elm0: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm1: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm2: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				Elm3: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE],
				'Initial Current': [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT],
				Interpolate: ['', '']
			}
		};
		this.HISTORY_MANAGER = {
			packet: []
		};
		this.LANGUAGES = ['English', 'Spanish', 'French', 'Italian', 'Dutch', 'Russian', 'German', 'Indonesian'];
		this.LANGUGE_INDEX_COUNTER = 0;
		this.LANGUAGE_INDEX_ENGLISH = this.LANGUGE_INDEX_COUNTER++;
		this.LANGUAGE_INDEX_SPANISH = this.LANGUGE_INDEX_COUNTER++;
		this.LANGUAGE_INDEX_FRENCH = this.LANGUGE_INDEX_COUNTER++;
		this.LANGUAGE_INDEX_ITALIAN = this.LANGUGE_INDEX_COUNTER++;
		this.LANGUAGE_INDEX_DUTCH = this.LANGUGE_INDEX_COUNTER++;
		this.LANGUAGE_INDEX_RUSSIAN = this.LANGUGE_INDEX_COUNTER++;
		this.LANGUAGE_INDEX_GERMAN = this.LANGUGE_INDEX_COUNTER++;
		this.LANGUAGE_INDEX_INDONESIAN = this.LANGUGE_INDEX_COUNTER++;
		this.LANGUAGE_INDEX = this.LANGUAGE_INDEX_ENGLISH;
		this.SYSTEM_OPTIONS = {
			options: ['Language', 'Automatic Timestep', 'Shortcut Hints', 'Full Window', '', ''],
			values: [this.LANGUAGES[this.LANGUAGE_INDEX], this.ON, this.ON, this.OFF, this.OFF, this.OFF]
		};
		let indexer: number = 0;
		this.circle_buffer = [];
		this.line_buffer = [];
		this.node_line_buffer = [];
		this.node_line_buffer_index = 0;
		this.SYSTEM_OPTION_LANGUAGE = indexer++;
		this.SYSTEM_OPTION_AUTOMATIC_TIMESTEP = indexer++;
		this.SYSTEM_OPTION_SHORTCUT_HINTS = indexer++;
		this.SYSTEM_OPTION_STRETCH_WINDOW = indexer++;
		if (this.MOBILE_MODE) {
			this.SYSTEM_OPTIONS['values'][this.SYSTEM_OPTION_SHORTCUT_HINTS] = this.OFF;
		}
		if (this.DESKTOP_MODE || this.DESKTOP_MODE) {
			this.SYSTEM_OPTIONS['values'][this.SYSTEM_OPTION_STRETCH_WINDOW] = this.ON;
		}
		this.BACKGROUND_COLOR = this.ColorNameToHex('black');
		this.ELEMENT_COLOR = this.ColorNameToHex('silver');
		this.SELECTED_COLOR = this.ColorNameToHex('cyan');
		this.MULTI_SELECTED_COLOR = this.ColorNameToHex('yellow');
		this.WORKSPACE_WORK_AREA_COLOR = '#292D29';
		this.GRAPH_AREA_COLOR = '#282828';
		this.ZOOM_AREA_COLOR = '#3C3C3C';
		this.TRACE_I_COLOR = this.ColorNameToHex('cyan');
		this.TRACE_II_COLOR = this.ColorNameToHex('magenta');
		this.TRACE_III_COLOR = this.ColorNameToHex('green');
		this.TRACE_DEFAULT_COLOR = this.ColorNameToHex('yellow');
		this.MENU_ICON_ACTIVE_COLOR = this.ColorNameToHex('cyan');
		this.MENU_ICON_INACTIVE_COLOR = '#9B9B9B';
		this.MENU_ICON_DEFAULT_COLOR = this.ColorNameToHex('white');
		this.MENU_HIGHLIGHT_COLOR = '#606060';
		this.MENU_FILL_COLOR = this.ColorNameToHex('gray');
		this.GENERAL_WHITE_COLOR = this.ColorNameToHex('white');
		this.GENERAL_BLACK_COLOR = this.ColorNameToHex('black');
		this.GENERAL_GRAY_COLOR = this.ColorNameToHex('gray');
		this.GENERAL_DARK_GRAY_COLOR = this.ColorNameToHex('darkgray');
		this.GENERAL_GREEN_COLOR = this.ColorNameToHex('green');
		this.GENERAL_RED_COLOR = this.ColorNameToHex('red');
		this.GENERAL_BLUE_COLOR = this.ColorNameToHex('blue');
		this.GENERAL_BOUNDS_COLOR = '#404040';
		this.GENERAL_FILL_COLOR = '#202020';
		this.GENERAL_CYAN_COLOR = this.ColorNameToHex('cyan');
		this.GENERAL_HOVER_COLOR = '#18d8d8';
		this.GENERAL_YELLOW_COLOR = this.ColorNameToHex('yellow');
		this.DEFAULT_FONT = 'Arial';
		this.user_file_selected = false;
		this.user_file = new Circuit();
		this.KEY_CODE_ESCAPE = 'Escape';
		this.KEY_CODE_BACK_QUOTE = 'Backquote';
		this.KEY_CODE_0 = 'Digit0';
		this.KEY_CODE_1 = 'Digit1';
		this.KEY_CODE_2 = 'Digit2';
		this.KEY_CODE_3 = 'Digit3';
		this.KEY_CODE_4 = 'Digit4';
		this.KEY_CODE_5 = 'Digit5';
		this.KEY_CODE_6 = 'Digit6';
		this.KEY_CODE_7 = 'Digit7';
		this.KEY_CODE_8 = 'Digit8';
		this.KEY_CODE_9 = 'Digit9';
		this.KEY_CODE_MINUS = 'Minus';
		this.KEY_CODE_EQUAL = 'Equal';
		this.KEY_CODE_BACKSPACE = 'Backspace';
		this.KEY_CODE_Q = 'KeyQ';
		this.KEY_CODE_W = 'KeyW';
		this.KEY_CODE_E = 'KeyE';
		this.KEY_CODE_R = 'KeyR';
		this.KEY_CODE_T = 'KeyT';
		this.KEY_CODE_Y = 'KeyY';
		this.KEY_CODE_U = 'KeyU';
		this.KEY_CODE_I = 'KeyI';
		this.KEY_CODE_O = 'KeyO';
		this.KEY_CODE_P = 'KeyP';
		this.KEY_CODE_LEFT_BRACKET = 'BracketLeft';
		this.KEY_CODE_RIGHT_BRACKET = 'BracketRight';
		this.KEY_CODE_BACKSLASH = 'Backslash';
		this.KEY_CODE_A = 'KeyA';
		this.KEY_CODE_S = 'KeyS';
		this.KEY_CODE_D = 'KeyD';
		this.KEY_CODE_F = 'KeyF';
		this.KEY_CODE_G = 'KeyG';
		this.KEY_CODE_H = 'KeyH';
		this.KEY_CODE_J = 'KeyJ';
		this.KEY_CODE_K = 'KeyK';
		this.KEY_CODE_L = 'KeyL';
		this.KEY_CODE_SEMI_COLON = 'Semicolon';
		this.KEY_CODE_QUOTE = 'Quote';
		this.KEY_CODE_ENTER = 'Enter';
		this.KEY_CODE_LEFT_SHIFT = 'ShiftLeft';
		this.KEY_CODE_Z = 'KeyZ';
		this.KEY_CODE_X = 'KeyX';
		this.KEY_CODE_C = 'KeyC';
		this.KEY_CODE_V = 'KeyV';
		this.KEY_CODE_B = 'KeyB';
		this.KEY_CODE_N = 'KeyN';
		this.KEY_CODE_M = 'KeyM';
		this.KEY_CODE_COMMA = 'Comma';
		this.KEY_CODE_PERIOD = 'Period';
		this.KEY_CODE_FORWARD_SLASH = 'Slash';
		this.KEY_CODE_RIGHT_SHIFT = 'ShiftRight';
		this.KEY_CODE_LEFT_CONTROL = 'ControlLeft';
		this.KEY_CODE_LEFT_ALT = 'AltLeft';
		this.KEY_CODE_SPACE = 'Space';
		this.KEY_CODE_RIGHT_ALT = 'AltRight';
		this.KEY_CODE_RIGHT_CONTROL = 'ControlRight';
		this.KEY_CODE_DELETE = 'Delete';
		this.KEY_CODE_HOME = 'Home';
		this.KEY_CODE_END = 'End';
		this.KEY_CODE_NUMPAD_MINUS = 'NumpadSubtract';
		this.KEY_CODE_NUMPAD_DIVIDE = 'NumpadDivide';
		this.KEY_CODE_NUMPAD_MULTIPLY = 'NumpadMultiply';
		this.KEY_CODE_NUMPAD_SUBTRACT = 'NumpadSubtract';
		this.KEY_CODE_NUMPAD_ENTER = 'NumpadEnter';
		this.KEY_CODE_NUMPAD_DECIMAL = 'NumpadDecimal';
		this.KEY_CODE_ARROW_LEFT = 'ArrowLeft';
		this.KEY_CODE_ARROW_UP = 'ArrowUp';
		this.KEY_CODE_ARROW_DOWN = 'ArrowDown';
		this.KEY_CODE_ARROW_RIGHT = 'ArrowRight';
		this.KEY_CODE_NUMPAD0 = 'Numpad0';
		this.KEY_CODE_NUMPAD1 = 'Numpad1';
		this.KEY_CODE_NUMPAD2 = 'Numpad2';
		this.KEY_CODE_NUMPAD3 = 'Numpad3';
		this.KEY_CODE_NUMPAD4 = 'Numpad4';
		this.KEY_CODE_NUMPAD5 = 'Numpad5';
		this.KEY_CODE_NUMPAD6 = 'Numpad6';
		this.KEY_CODE_NUMPAD7 = 'Numpad7';
		this.KEY_CODE_NUMPAD8 = 'Numpad8';
		this.KEY_CODE_NUMPAD9 = 'Numpad9';
		this.KEY_EVENT_CODES = {
			Escape: ['', '', ''],
			Backquote: ['`', '~', ''],
			Digit0: ['0', ')', ''],
			Digit1: ['1', '!', ''],
			Digit2: ['2', '@', ''],
			Digit3: ['3', '#', ''],
			Digit4: ['4', '$', ''],
			Digit5: ['5', '%', ''],
			Digit6: ['6', '^', ''],
			Digit7: ['7', '&', ''],
			Digit8: ['8', '*', ''],
			Digit9: ['9', '(', ''],
			Minus: ['-', '_', ''],
			Equal: ['=', '+', ''],
			Backspace: ['', '', ''],
			KeyQ: ['q', 'Q', 'Q'],
			KeyW: ['w', 'W', 'W'],
			KeyE: ['e', 'E', 'E'],
			KeyR: ['r', 'R', 'R'],
			KeyT: ['t', 'T', 'T'],
			KeyY: ['y', 'Y', 'Y'],
			KeyU: ['u', 'U', 'U'],
			KeyI: ['i', 'I', 'I'],
			KeyO: ['o', 'O', 'O'],
			KeyP: ['p', 'P', 'P'],
			BracketLeft: ['[', '{', ''],
			BracketRight: [']', '}', ''],
			Backslash: ['\\', '|', ''],
			KeyA: ['a', 'A', 'A'],
			KeyS: ['s', 'S', 'S'],
			KeyD: ['d', 'D', 'D'],
			KeyF: ['f', 'F', 'F'],
			KeyG: ['g', 'G', 'G'],
			KeyH: ['h', 'H', 'H'],
			KeyJ: ['j', 'J', 'J'],
			KeyK: ['k', 'K', 'K'],
			KeyL: ['l', 'L', 'L'],
			Semicolon: [';', ':', ''],
			Quote: ["'", '"', ''],
			Enter: ['', '', ''],
			ShiftLeft: ['', '', ''],
			KeyZ: ['z', 'Z', 'Z'],
			KeyX: ['x', 'X', 'X'],
			KeyC: ['c', 'C', 'C'],
			KeyV: ['v', 'V', 'V'],
			KeyB: ['b', 'B', 'B'],
			KeyN: ['n', 'N', 'N'],
			KeyM: ['m', 'M', 'M'],
			Comma: [',', '<', ''],
			Period: ['.', '>', ''],
			Slash: ['/', '?', ''],
			ShiftRight: ['', '', ''],
			ControlLeft: ['', '', ''],
			AltLeft: ['', '', ''],
			Space: [' ', ' ', ' '],
			AltRight: ['', '', ''],
			ControlRight: ['', '', ''],
			Delete: ['', '', ''],
			Home: ['', '', ''],
			End: ['', '', ''],
			NumpadSubtract: ['-', '', ''],
			NumpadDivide: ['/', '', ''],
			NumpadMultiply: ['*', '', ''],
			NumpadAdd: ['+', '', ''],
			NumpadEnter: ['', '', ''],
			NumpadDecimal: ['', '', ''],
			ArrowLeft: ['', '', ''],
			ArrowUp: ['', '', ''],
			ArrowDown: ['', '', ''],
			ArrowRight: ['', '', ''],
			Numpad0: ['0', '', ''],
			Numpad1: ['1', '', ''],
			Numpad2: ['2', '', ''],
			Numpad3: ['3', '', ''],
			Numpad4: ['4', '', ''],
			Numpad5: ['5', '', ''],
			Numpad6: ['6', '', ''],
			Numpad7: ['7', '', ''],
			Numpad8: ['8', '', ''],
			Numpad9: ['9', '', '']
		};
		this.KEY_EVENT_KEYS = Object.keys(this.KEY_EVENT_CODES);
		this.time_step = 5e-6;
		this.simulation_time = 0;
		this.RESIZE_EVENT = false;
		this.FORCE_RESIZE_EVENT = false;
		this.ON_RESTORE_EVENT = false;
		this.MOUSE_DOWN_EVENT = false;
		this.MOUSE_MOVE_EVENT = false;
		this.MOUSE_UP_EVENT = false;
		this.MOUSE_DOUBLE_CLICK_EVENT = false;
		this.MOUSE_WHEEL_EVENT = false;
		this.KEY_UP_EVENT = false;
		this.KEY_DOWN_EVENT = false;
		this.draw_block = false;
		this.PICTURE_REQUEST = false;
		this.PICTURE_ZOOM = this.ZOOM_MAX;
		this.PICTURE_EXPOSURE_TIME = 3;
		this.canvas_draw_request = false;
		this.canvas_draw_request_counter = 0;
		this.CANVAS_DRAW_REQUEST_COUNTER_MAX = 3;
		this.canvas_draw_event = false;
		this.CANVAS_REDRAW_MAX = 3;
		this.canvas_redraw_counter = 0;
		this.CANVAS_STROKE_WIDTH_BASE = 1;
		this.CANVAS_STROKE_WIDTH_1 = 2.25;
		this.CANVAS_STROKE_WIDTH_2 = 2.5;
		this.CANVAS_STROKE_WIDTH_3 = 9;
		this.CANVAS_STROKE_WIDTH_4 = 16;
		this.CANVAS_STROKE_WIDTH_5 = 21;
		this.CANVAS_STROKE_WIDTH_6 = 43;
		this.CANVAS_STROKE_WIDTH_1_ZOOM = 2.25;
		this.CANVAS_STROKE_WIDTH_2_ZOOM = 2.5;
		this.CANVAS_STROKE_WIDTH_3_ZOOM = 9;
		this.CANVAS_STROKE_WIDTH_4_ZOOM = 16;
		this.CANVAS_STROKE_WIDTH_5_ZOOM = 21;
		this.CANVAS_STROKE_WIDTH_6_ZOOM = 43;
		this.CANVAS_TEXT_SIZE_BASE = 1;
		this.CANVAS_TEXT_SIZE_1 = 2.25;
		this.CANVAS_TEXT_SIZE_2 = 2.5;
		this.CANVAS_TEXT_SIZE_3 = 9;
		this.CANVAS_TEXT_SIZE_4 = 16;
		this.CANVAS_TEXT_SIZE_5 = 21;
		this.CANVAS_TEXT_SIZE_6 = 43;
		this.CANVAS_TEXT_SIZE_1_ZOOM = 2.25;
		this.CANVAS_TEXT_SIZE_2_ZOOM = 2.5;
		this.CANVAS_TEXT_SIZE_3_ZOOM = 9;
		this.CANVAS_TEXT_SIZE_4_ZOOM = 16;
		this.CANVAS_TEXT_SIZE_5_ZOOM = 21;
		this.CANVAS_TEXT_SIZE_6_ZOOM = 43;
		this.PACKET_DIVIDER = '#DIVIDER#';
		this.move_paint = new Paint();
		this.move_paint.set_paint_style(this.move_paint.style.FILL);
		this.move_paint.set_paint_cap(this.move_paint.cap.ROUND);
		this.move_paint.set_paint_join(this.move_paint.join.MITER);
		this.move_paint.set_stroke_width(this.CANVAS_STROKE_WIDTH_1);
		this.move_paint.set_color(this.GENERAL_GRAY_COLOR);
		this.move_paint.set_text_size(this.CANVAS_TEXT_SIZE_1);
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
		this.TIME_DATA_TEMPLATE = {
			Frequency: -1,
			Resistance: -1,
			Capacitance: -1,
			Inductance: -1
		};
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
	ColorNameToHex(color: string) {
		var colors: COLOR_ARRAY_T = {
			aliceblue: '#f0f8ff',
			antiquewhite: '#faebd7',
			aqua: '#00ffff',
			aquamarine: '#7fffd4',
			azure: '#f0ffff',
			beige: '#f5f5dc',
			bisque: '#ffe4c4',
			black: '#000000',
			blanchedalmond: '#ffebcd',
			blue: '#0000ff',
			blueviolet: '#8a2be2',
			brown: '#a52a2a',
			burlywood: '#deb887',
			cadetblue: '#5f9ea0',
			chartreuse: '#7fff00',
			chocolate: '#d2691e',
			coral: '#ff7f50',
			cornflowerblue: '#6495ed',
			cornsilk: '#fff8dc',
			crimson: '#dc143c',
			cyan: '#00ffff',
			darkblue: '#00008b',
			darkcyan: '#008b8b',
			darkgoldenrod: '#b8860b',
			darkgray: '#a9a9a9',
			darkgreen: '#006400',
			darkkhaki: '#bdb76b',
			darkmagenta: '#8b008b',
			darkolivegreen: '#556b2f',
			darkorange: '#ff8c00',
			darkorchid: '#9932cc',
			darkred: '#8b0000',
			darksalmon: '#e9967a',
			darkseagreen: '#8fbc8f',
			darkslateblue: '#483d8b',
			darkslategray: '#2f4f4f',
			darkturquoise: '#00ced1',
			darkviolet: '#9400d3',
			deeppink: '#ff1493',
			deepskyblue: '#00bfff',
			dimgray: '#696969',
			dodgerblue: '#1e90ff',
			firebrick: '#b22222',
			floralwhite: '#fffaf0',
			forestgreen: '#228b22',
			fuchsia: '#ff00ff',
			gainsboro: '#dcdcdc',
			ghostwhite: '#f8f8ff',
			gold: '#ffd700',
			goldenrod: '#daa520',
			gray: '#808080',
			green: '#008000',
			greenyellow: '#adff2f',
			honeydew: '#f0fff0',
			hotpink: '#ff69b4',
			'indianred ': '#cd5c5c',
			indigo: '#4b0082',
			ivory: '#fffff0',
			khaki: '#f0e68c',
			lavender: '#e6e6fa',
			lavenderblush: '#fff0f5',
			lawngreen: '#7cfc00',
			lemonchiffon: '#fffacd',
			lightblue: '#add8e6',
			lightcoral: '#f08080',
			lightcyan: '#e0ffff',
			lightgoldenrodyellow: '#fafad2',
			lightgrey: '#d3d3d3',
			lightgreen: '#90ee90',
			lightpink: '#ffb6c1',
			lightsalmon: '#ffa07a',
			lightseagreen: '#20b2aa',
			lightskyblue: '#87cefa',
			lightslategray: '#778899',
			lightsteelblue: '#b0c4de',
			lightyellow: '#ffffe0',
			lime: '#00ff00',
			limegreen: '#32cd32',
			linen: '#faf0e6',
			magenta: '#ff00ff',
			maroon: '#800000',
			mediumaquamarine: '#66cdaa',
			mediumblue: '#0000cd',
			mediumorchid: '#ba55d3',
			mediumpurple: '#9370d8',
			mediumseagreen: '#3cb371',
			mediumslateblue: '#7b68ee',
			mediumspringgreen: '#00fa9a',
			mediumturquoise: '#48d1cc',
			mediumvioletred: '#c71585',
			midnightblue: '#191970',
			mintcream: '#f5fffa',
			mistyrose: '#ffe4e1',
			moccasin: '#ffe4b5',
			navajowhite: '#ffdead',
			navy: '#000080',
			oldlace: '#fdf5e6',
			olive: '#808000',
			olivedrab: '#6b8e23',
			orange: '#ffa500',
			orangered: '#ff4500',
			orchid: '#da70d6',
			palegoldenrod: '#eee8aa',
			palegreen: '#98fb98',
			paleturquoise: '#afeeee',
			palevioletred: '#d87093',
			papayawhip: '#ffefd5',
			peachpuff: '#ffdab9',
			peru: '#cd853f',
			pink: '#ffc0cb',
			plum: '#dda0dd',
			powderblue: '#b0e0e6',
			purple: '#800080',
			rebeccapurple: '#663399',
			red: '#ff0000',
			rosybrown: '#bc8f8f',
			royalblue: '#4169e1',
			saddlebrown: '#8b4513',
			salmon: '#fa8072',
			sandybrown: '#f4a460',
			seagreen: '#2e8b57',
			seashell: '#fff5ee',
			sienna: '#a0522d',
			silver: '#c0c0c0',
			skyblue: '#87ceeb',
			slateblue: '#6a5acd',
			slategray: '#708090',
			snow: '#fffafa',
			springgreen: '#00ff7f',
			steelblue: '#4682b4',
			tan: '#d2b48c',
			teal: '#008080',
			thistle: '#d8bfd8',
			tomato: '#ff6347',
			turquoise: '#40e0d0',
			violet: '#ee82ee',
			wheat: '#f5deb3',
			white: '#ffffff',
			whitesmoke: '#f5f5f5',
			yellow: '#ffff00',
			yellowgreen: '#9acd32'
		};
		if (typeof colors[color.toLowerCase()] !== 'undefined') {
			return colors[color.toLowerCase()];
		}
		return color;
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
