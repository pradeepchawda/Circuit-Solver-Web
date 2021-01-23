'use strict';
/* #START_GLOBAL_EXTRACT# */
var global: Global = new Global();
//@ts-ignore
String.prototype.hashCode = function (): number {
	let hash: number = 0;
	let i: number = 0;
	let chr: string = '';
	if (this.length === 0) {
		return hash;
	}
	for (i = 0; i < this.length; i++) {
		chr = this.charCodeAt(i);
		hash = (hash << 5) - hash + <number>(<unknown>chr);
		hash |= 0;
	}
	return hash;
};
function save_file(title: string, content: string): void {
	let blob: Blob = new Blob([content], {
		type: 'text/plain;charset=utf-8'
	});
	//@ts-expect-error
	saveAs(blob, title);
}
function save_image(title: string, canvas: HTMLCanvasElement): void {
	canvas.toBlob(function (blob) {
		//@ts-expect-error
		saveAs(blob, title);
	});
}
function save_image_mobile(title: string, canvas: HTMLCanvasElement): void {
	canvas.toBlob(function (blob: Blob) {
		let reader: FileReader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = function () {
			window.JsInterface.javascript_native_hook('push-image', title, reader.result);
		};
	});
}
var file_reader: HTMLElement = global.NULL;
if (global.MOBILE_MODE) {
	file_reader = document.getElementById('file_explorer_mobile');
} else {
	file_reader = document.getElementById('file_explorer');
}
var file_saver = document.getElementById('file_saver');
var file_loader = document.getElementById('file_loader');
function file_event(input: HTMLInputElement): void {
	let reader: FileReader = new FileReader();
	reader.onload = function (e): void {
		let text: string = <string>(<unknown>reader.result);
		let title: string = input.files[0].name.split('.')[0];
		if (title.length > global.MAX_TEXT_LENGTH) {
			title = title.substring(0, global.MAX_TEXT_LENGTH) + '...';
		}
		global.user_file.title = title;
		bottom_menu.resize_bottom_menu();
		global.user_file.content = text;
		global.user_file_selected = true;
		global.canvas_draw_event = true;
	};
	reader.onerror = function (err: ProgressEvent<FileReader>) {};
	reader.readAsText(input.files[0]);
}
function file_event_mobile(title: string, data: string): void {
	if (title.length > global.MAX_TEXT_LENGTH) {
		title = title.substring(0, global.MAX_TEXT_LENGTH) + '...';
	}
	global.user_file.title = title;
	bottom_menu.resize_bottom_menu();
	global.user_file.content = data.replace(language_manager.QUOTE_ESCAPE, "'");
}
function restore_system_options(index: number, value: string): void {
	if (index === global.SYSTEM_OPTION_LANGUAGE) {
		for (var i: number = 0; i < global.LANGUAGES.length; i++) {
			if (value === global.LANGUAGES[i]) {
				global.language_index = i;
			}
		}
	}
	global.system_options['values'][index] = value;
}
function restore_zoom_offset(zoom: number, delta_x: number, dx: number, x_offset: number, delta_y: number, dy: number, y_offset: number): void {
	global.workspace_zoom_scale = Number(zoom);
	global.dx = Number(dx);
	global.dy = Number(dy);
	global.x_offset = Number(x_offset);
	global.y_offset = Number(y_offset);
	global.delta_x = Number(delta_x);
	global.delta_y = Number(delta_y);
	workspace.workspace_zoom();
	global.draw_block = true;
	global.signal_build_element = true;
}
function handle_file_loading(): void {
	global.user_file_selected = true;
	global.canvas_draw_event = true;
	try {
		engine_functions.parse_elements(global.user_file.content);
	} catch (error) {}
	global.history_manager['packet'].push(engine_functions.history_snapshot());
	global.draw_block = true;
	global.user_file_selected = false;
	mouse_event_latch = false;
}
var solver_container: HTMLElement = document.getElementById('solver');
var surface: HTMLCanvasElement = document.createElement('canvas');
surface.id = 'canvas';
surface.style.visibility = 'hidden';
surface.style.zIndex = '0';
surface.style.position = 'absolute';
solver_container.appendChild(surface);
var ctx: CanvasRenderingContext2D = surface.getContext('2d');
var virtual_surface: VirtualCanvas = new VirtualCanvas(1, 1, global.virtual_canvas_id++);
var linear_algebra: LinearAlgebra = new LinearAlgebra();
var language_manager: LanguageManager = new LanguageManager();
var shortcut_manager: ShortcutManager = new ShortcutManager();
var string_operator: StringOperator = new StringOperator();
var multi_select_manager: MultiSelectManager = new MultiSelectManager();
var canvas_aspect_ratio: number = 1.333;
if (global.MOBILE_MODE) {
	canvas_aspect_ratio = 1.618;
}
var view_port: Viewport = new Viewport(canvas_aspect_ratio, 800, 800 / canvas_aspect_ratio);
var workspace: Workspace = new Workspace(0, 0, 0, 0, global.workspace_zoom_scale);
var simulation_manager: SimulationManager = global.NULL;
var scope_manager: ScopeManager = new ScopeManager();
var matrix_a: Array<Array<number>> = linear_algebra.matrix(1, 1);
var matrix_z: Array<Array<number>> = linear_algebra.matrix(1, 1);
var matrix_x: Array<Array<number>> = linear_algebra.matrix(1, 1);
var matrix_x_copy: Array<Array<number>> = linear_algebra.matrix(1, 1);
/* #INSERT_GENERATE_CREATE_ELEMENT_INSTANCE# */
/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
var resistors: Array<Resistor> = [];
var capacitors: Array<Capacitor> = [];
var inductors: Array<Inductor> = [];
var grounds: Array<Ground> = [];
var dcsources: Array<DCSource> = [];
var dccurrents: Array<DCCurrent> = [];
var acsources: Array<ACSource> = [];
var accurrents: Array<ACCurrent> = [];
var squarewaves: Array<SquareWave> = [];
var sawwaves: Array<SawWave> = [];
var trianglewaves: Array<TriangleWave> = [];
var constants: Array<Constant> = [];
var wires: Array<Wire> = [];
var nets: Array<Net> = [];
var notes: Array<Note> = [];
var rails: Array<Rail> = [];
var voltmeters: Array<VoltMeter> = [];
var ohmmeters: Array<OhmMeter> = [];
var ammeters: Array<AmMeter> = [];
var wattmeters: Array<WattMeter> = [];
var fuses: Array<Fuse> = [];
var spsts: Array<SinglePoleSingleThrow> = [];
var spdts: Array<SinglePoleDoubleThrow> = [];
var nots: Array<NOTGate> = [];
var diodes: Array<Diode> = [];
var leds: Array<LightEmittingDiode> = [];
var zeners: Array<ZenerDiode> = [];
var potentiometers: Array<Potentiometer> = [];
var ands: Array<ANDGate> = [];
var ors: Array<ORGate> = [];
var nands: Array<NANDGate> = [];
var nors: Array<NORGate> = [];
var xors: Array<XORGate> = [];
var xnors: Array<XNORGate> = [];
var dffs: Array<DFlipFlop> = [];
var vsats: Array<VoltageSaturation> = [];
var adders: Array<Adder> = [];
var subtractors: Array<Subtractor> = [];
var multipliers: Array<Multiplier> = [];
var dividers: Array<Divider> = [];
var gains: Array<GainBlock> = [];
var absvals: Array<AbsoluteValue> = [];
var vcsws: Array<VoltageControlledSwitch> = [];
var vcvss: Array<VoltageControlledVoltageSource> = [];
var vccss: Array<VoltageControlledCurrentSource> = [];
var cccss: Array<CurrentControlledCurrentSource> = [];
var ccvss: Array<CurrentControlledVoltageSource> = [];
var opamps: Array<OperationalAmplifier> = [];
var nmosfets: Array<NChannelMOSFET> = [];
var pmosfets: Array<PChannelMOSFET> = [];
var npns: Array<NPNBipolarJunctionTransistor> = [];
var pnps: Array<PNPBipolarJunctionTransistor> = [];
var adcs: Array<ADCModule> = [];
var dacs: Array<DACModule> = [];
var sandhs: Array<SampleAndHold> = [];
var pwms: Array<PulseWidthModulator> = [];
var integrators: Array<IntegratorModule> = [];
var differentiators: Array<DifferentiatorModule> = [];
var lowpasses: Array<LowPassFilter> = [];
var highpasses: Array<HighPassFilter> = [];
var relays: Array<Relay> = [];
var pids: Array<PIDModule> = [];
var luts: Array<LookUpTable> = [];
var vcrs: Array<VoltageControlledResistor> = [];
var vccas: Array<VoltageControlledCapacitor> = [];
var vcls: Array<VoltageControlledInductor> = [];
var grts: Array<GreaterThan> = [];
var tptzs: Array<TPTZModule> = [];
var transformers: Array<Transformer> = [];
/* <!-- END AUTOMATICALLY GENERATED !--> */
var on_screen_keyboard: OnScreenKeyboard = new OnScreenKeyboard();
var toast: Toast = global.NULL;
var history_manager: HistoryManager = new HistoryManager();
var element_options: ElementOptions = global.NULL;
var menu_bar: MenuBar = global.NULL;
var bottom_menu: BottomMenu = global.NULL;
var time_step_window: TimeStepWindow = global.NULL;
var save_circuit_window: SaveCircuitWindow = global.NULL;
var save_image_window: SaveImageWindow = global.NULL;
var element_options_window: ElementOptionsWindow = global.NULL;
var element_options_edit_window: ElementOptionsEditWindow = global.NULL;
var zoom_window: ZoomWindow = global.NULL;
var settings_window: SettingsWindow = global.NULL;
var yes_no_window: YesNoWindow = global.NULL;
var wire_manager: WireManager = new WireManager();
var engine_functions: EngineFunctions = new EngineFunctions();
var nodes: Array<ElectricalNode> = [];
var node_manager: NodeManager = new NodeManager();
var graph_window: GraphWindow = global.NULL;
var FPS: number = 30;
var FPS_DIV_ARRAY: Array<number> = [2, 2];
var fps_counter: number = 0;
var fps_index: number = 0;
var fps_compare: number = FPS_DIV_ARRAY[fps_index];
var fps_div: number = 0;
var general_paint: Paint = new Paint();
var webpage_document_title: HTMLElement = global.NULL;
var last_webpage_document_title: string = 'untitled';
var mouse_event_latch: boolean = false;
/* #END_GLOBAL_EXTRACT# */
function load_app(): void {
	browser_detection();
	workspace = new Workspace(view_port.left, view_port.top, view_port.view_width, view_port.view_height, global.workspace_zoom_scale);
	global.last_surface_width = 0;
	global.last_surface_height = 0;
	let canvas: GraphicsEngine = new GraphicsEngine(virtual_surface.context);
	let fifo_index: number = 0;
	let touch: any = global.NULL;
	let temp_draw_signal: boolean = false;
	let node_space_x_cache: number = 0;
	let node_space_y_cache: number = 0;
	let mult_node_space_x_cache: number = 0;
	let mult_node_space_y_cache: number = 0;
	let node_length: number = 0;
	general_paint = new Paint();
	general_paint.set_paint_style(general_paint.style.FILL);
	general_paint.set_paint_cap(general_paint.cap.ROUND);
	general_paint.set_paint_join(general_paint.join.MITER);
	general_paint.set_stroke_width(global.canvas_stroke_width_1);
	if (global.MOBILE_MODE) {
		general_paint.set_color(global.GENERAL_WHITE_COLOR);
	} else {
		general_paint.set_color(global.GENERAL_BLACK_COLOR);
	}
	general_paint.set_text_size(global.canvas_text_size_5);
	general_paint.set_font(global.DEFAULT_FONT);
	general_paint.set_alpha(255);
	general_paint.set_paint_align(general_paint.align.LEFT);
	function initialize(step: number): void {
		if (step === 0) {
			toast = new Toast();
			resize_canvas();
			engine_functions.create_nodes(workspace.bounds);
			global.history_manager['packet'].push(engine_functions.history_snapshot());
		} else if (step === 1) {
			menu_bar = new MenuBar();
			bottom_menu = new BottomMenu();
			element_options = new ElementOptions();
			graph_window = new GraphWindow();
		} else if (step === 2) {
			time_step_window = new TimeStepWindow();
			save_circuit_window = new SaveCircuitWindow();
			save_image_window = new SaveImageWindow();
			element_options_window = new ElementOptionsWindow();
			element_options_edit_window = new ElementOptionsEditWindow();
		} else if (step === 3) {
			zoom_window = new ZoomWindow();
			settings_window = new SettingsWindow();
			yes_no_window = new YesNoWindow();
			simulation_manager = new SimulationManager();
		} else if (step === 4) {
			register_cross_platform_listeners();
			if (!global.MOBILE_MODE) {
				window.addEventListener('keydown', key_down, false);
				window.addEventListener('keyup', key_up, false);
			}
			window.addEventListener('resize', resize_canvas, false);
			if (!global.MOBILE_MODE) {
				window.addEventListener('dblclick', double_click, false);
				webpage_document_title = document.getElementById('title_text');
			}
			if (global.system_options['values'][global.SYSTEM_OPTION_STRETCH_WINDOW] === global.ON) {
				view_port.apply_spread_factor = true;
				global.force_resize_event = true;
			}
		}
	}
	function register_cross_platform_listeners(): void {
		if (global.MOBILE_MODE === true) {
			surface.addEventListener('touchstart', mouse_down, false);
			surface.addEventListener('touchmove', mouse_move, false);
			surface.addEventListener('touchend', mouse_up, false);
		} else {
			surface.addEventListener('mousedown', mouse_down, false);
			surface.addEventListener('mousemove', mouse_move, false);
			surface.addEventListener('mouseup', mouse_up, false);
		}
		if (!global.MOBILE_MODE) {
			if (global.browser_firefox) {
				surface.addEventListener('DOMMouseScroll', mouse_wheel, false);
			} else {
				surface.addEventListener('mousewheel', mouse_wheel, false);
			}
		}
	}
	function start_system(): void {
		if (!global.MOBILE_MODE) {
			register();
		}
		main();
	}
	function resize_canvas(): void {
		global.device_pixel_ratio = window.devicePixelRatio;
		if (global.resize_event === false) {
			global.last_view_port_right = view_port.right;
			global.last_view_port_bottom = view_port.bottom;
			global.last_view_port_width = view_port.view_width;
			global.last_view_port_height = view_port.view_height;
			global.last_surface_width = surface.width;
			global.last_surface_height = surface.height;
		}
		solver_container.style.width = global.PIXEL_TEMPLATE.replace('{VALUE}', <string>(<unknown>window.innerWidth));
		solver_container.style.height = global.PIXEL_TEMPLATE.replace('{VALUE}', <string>(<unknown>window.innerHeight));
		solver_container.style.background = 'black';
		view_port.resize(canvas_aspect_ratio, window.innerWidth * global.device_pixel_ratio, window.innerHeight * global.device_pixel_ratio);
		surface.width = window.innerWidth * global.device_pixel_ratio;
		surface.height = window.innerHeight * global.device_pixel_ratio;
		surface.style.width = global.PIXEL_TEMPLATE.replace('{VALUE}', <string>(<unknown>window.innerWidth));
		surface.style.height = global.PIXEL_TEMPLATE.replace('{VALUE}', <string>(<unknown>window.innerHeight));
		global.resize_w_factor = view_port.view_width / global.last_view_port_width;
		global.resize_h_factor = view_port.view_height / global.last_view_port_height;
		if (global.MOBILE_MODE) {
			global.canvas_stroke_width_base = 0.000775 * view_port.view_width;
			global.canvas_text_size_base = 0.000775 * view_port.view_width;
		} else {
			global.canvas_stroke_width_base = 0.000725 * view_port.view_width;
			global.canvas_text_size_base = 0.000725 * view_port.view_width;
		}
		try {
			ctx.globalCompositeOperation = 'copy';
			ctx.imageSmoothingEnabled = false;
			//@ts-expect-error
			ctx.mozImageSmoothingEnabled = false;
			//@ts-expect-error
			ctx.oImageSmoothingEnabled = false;
			//@ts-expect-error
			ctx.webkitImageSmoothingEnabled = false;
			//@ts-expect-error
			ctx.msImageSmoothingEnabled = false;
		} catch (e) {}
		global.canvas_stroke_width_1 = global.canvas_stroke_width_base * 2.25;
		global.canvas_stroke_width_2 = global.canvas_stroke_width_base * 2.65;
		global.canvas_stroke_width_3 = global.canvas_stroke_width_base * 9;
		global.canvas_stroke_width_4 = global.canvas_stroke_width_base * 16;
		global.canvas_stroke_width_5 = global.canvas_stroke_width_base * 21;
		global.canvas_stroke_width_6 = global.canvas_stroke_width_base * 43;
		global.canvas_text_size_1 = global.canvas_text_size_base * 2.25;
		global.canvas_text_size_2 = global.canvas_text_size_base * 2.65;
		global.canvas_text_size_3 = global.canvas_text_size_base * 9;
		global.canvas_text_size_4 = global.canvas_text_size_base * 16;
		global.canvas_text_size_5 = global.canvas_text_size_base * 21;
		global.canvas_text_size_6 = global.canvas_text_size_base * 43;
		global.signal_build_element = true;
		global.signal_build_counter = 0;
		virtual_surface.resize();
		global.resize_event = true;
		canvas.on_resize();
		surface.style.backfaceVisibility = 'hidden';
		if (surface.style.visibility === 'hidden') {
			surface.style.visibility = 'visible';
		}
	}
	function mouse_down(mouse_event: MouseEvent): void {
		if (global.system_initialization['completed']) {
			if (global.MOBILE_MODE === false) {
				global.mouse_x = mouse_event.clientX * global.device_pixel_ratio;
				global.mouse_y = mouse_event.clientY * global.device_pixel_ratio;
			} else {
				//@ts-ignore
				touch = mouse_event.touches[0];
				global.mouse_x = touch.clientX * global.device_pixel_ratio;
				global.mouse_y = touch.clientY * global.device_pixel_ratio;
			}
			if (bottom_menu.handle_file_explorer()) {
				if (!global.user_file_selected) {
					file_reader.click();
				} else {
					toast.set_text(language_manager.TRY_AGAIN[global.LANGUAGES[global.language_index]]);
					toast.show();
				}
			} else {
				if (!mouse_event_latch) {
					if (global.MOBILE_MODE) {
						if (global.mouse_x >= view_port.left && global.mouse_x <= view_port.right && global.mouse_y >= view_port.top && global.mouse_y <= view_port.bottom) {
							global.mouse_down_event_flag = true;
							global.mouse_down_event_queue.push(mouse_event);
						}
					} else {
						global.mouse_down_event_flag = true;
						global.mouse_down_event_queue.push(mouse_event);
					}
				}
			}
		}
		mouse_event.preventDefault();
		mouse_event.stopPropagation();
	}
	function mouse_move(mouse_event: MouseEvent): void {
		if (!global.mouse_move_event_flag) {
			if (global.MOBILE_MODE) {
				if (global.mouse_x >= view_port.left && global.mouse_x <= view_port.right && global.mouse_y >= view_port.top && global.mouse_y <= view_port.bottom) {
					global.mouse_move_event = mouse_event;
					global.mouse_move_event_flag = true;
				}
			} else {
				global.mouse_move_event = mouse_event;
				global.mouse_move_event_flag = true;
			}
		}
		mouse_event.preventDefault();
		mouse_event.stopPropagation();
	}
	function mouse_up(mouse_event: MouseEvent): void {
		if (mouse_event_latch) {
			if (global.MOBILE_MODE) {
				if (global.mouse_x >= view_port.left && global.mouse_x <= view_port.right && global.mouse_y >= view_port.top && global.mouse_y <= view_port.bottom) {
					global.mouse_up_event_flag = true;
					global.mouse_up_event_queue.push(mouse_event);
				}
			} else {
				global.mouse_up_event_flag = true;
				global.mouse_up_event_queue.push(mouse_event);
			}
		}
		mouse_event.preventDefault();
		mouse_event.stopPropagation();
	}
	function mouse_wheel(mouse_event: MouseEvent): void {
		if (!global.mouse_wheel_event_flag && !global.MOBILE_MODE) {
			global.mouse_wheel_event_flag = true;
			global.mouse_wheel_event_queue.push(mouse_event);
		}
		mouse_event.preventDefault();
		mouse_event.stopPropagation();
	}
	function double_click(mouse_event: MouseEvent): void {
		if (!global.MOBILE_MODE) {
			global.mouse_double_click_event_flag = true;
			global.mouse_double_click_event_queue.push(mouse_event);
		}
		mouse_event.preventDefault();
		mouse_event.stopPropagation();
	}
	function key_down(key_event: KeyboardEvent): void {
		global.key_down_event_flag = true;
		global.key_down_event_queue.push({
			event: key_event,
			alt: key_event.getModifierState('Alt'),
			shift: key_event.getModifierState('Shift'),
			ctrl: key_event.getModifierState('Control'),
			caps: key_event.getModifierState('CapsLock')
		});
		key_event.preventDefault();
		key_event.stopPropagation();
	}
	function key_up(key_event: KeyboardEvent): void {
		global.key_up_event_flag = true;
		global.key_up_event_queue.push({
			event: key_event,
			alt: key_event.getModifierState('Alt'),
			shift: key_event.getModifierState('Shift'),
			ctrl: key_event.getModifierState('Control'),
			caps: key_event.getModifierState('CapsLock')
		});
		key_event.preventDefault();
		key_event.stopPropagation();
	}
	function resize_components(): void {
		global.natural_height = 2 * (view_port.view_height * global.settings.WORKSPACE_RATIO_Y);
		if (global.settings.WORKSPACE_PERFECT_SQUARE) {
			global.natural_width = global.natural_height;
		} else {
			global.natural_width = 2 * (view_port.view_width * global.settings.WORKSPACE_RATIO_X);
		}
		workspace.workspace_resize();
		reset_zoom();
		menu_bar.resize_menu_bar();
		bottom_menu.resize_bottom_menu();
		element_options.resize();
		time_step_window.resize_window();
		save_circuit_window.resize_window();
		save_image_window.resize_window();
		element_options_window.resize_window();
		element_options_edit_window.resize_window();
		zoom_window.resize_window();
		settings_window.resize_window();
		yes_no_window.resize_window();
		graph_window.resize_window();
		toast.resize_toast();
		on_screen_keyboard.resize_keyboard();
		/* #INSERT_METER_RESIZE_TRACE# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < voltmeters.length; i++) {
			voltmeters[i].resize_meter_trace = true;
		}
		for (var i: number = 0; i < ohmmeters.length; i++) {
			ohmmeters[i].resize_meter_trace = true;
		}
		for (var i: number = 0; i < ammeters.length; i++) {
			ammeters[i].resize_meter_trace = true;
		}
		for (var i: number = 0; i < wattmeters.length; i++) {
			wattmeters[i].resize_meter_trace = true;
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	function handle_zoom(mouse_event: MouseEvent): void {
		if (!global.focused) {
			global.x_offset = (global.mouse_x - global.delta_x) / global.workspace_zoom_scale;
			global.y_offset = (global.mouse_y - global.delta_y) / global.workspace_zoom_scale;
			//@ts-ignore
			if (mouse_event.wheelDelta < 0 || mouse_event.detail > 0) {
				if (global.workspace_zoom_scale > global.ZOOM_MIN) {
					global.workspace_zoom_scale /= global.ZOOM_FACTOR;
				}
			} else {
				if (global.workspace_zoom_scale < global.ZOOM_MAX) {
					global.workspace_zoom_scale *= global.ZOOM_FACTOR;
				}
			}
			global.delta_x = global.mouse_x - global.x_offset * global.workspace_zoom_scale;
			global.delta_y = global.mouse_y - global.y_offset * global.workspace_zoom_scale;
			workspace.workspace_zoom();
		}
	}
	function reset_zoom(): void {
		global.x_offset = 0;
		global.y_offset = 0;
		global.delta_x = workspace.bounds.left;
		global.delta_y = workspace.bounds.top;
	}
	function normal_draw_permissions(): boolean {
		if (global.system_initialization['completed']) {
			return (
				global.resize_event ||
				global.mouse_down_event_flag ||
				global.mouse_move_event_flag ||
				global.mouse_up_event_flag ||
				global.mouse_wheel_event_flag ||
				global.mouse_double_click_event_flag ||
				global.key_up_event_flag ||
				global.key_down_event_flag ||
				global.picture_request_flag ||
				global.flag_simulating ||
				!workspace.draw_to_screen ||
				toast.draw_text ||
				!global.system_initialization['completed']
			);
		} else {
			return (
				global.resize_event ||
				global.mouse_down_event_flag ||
				global.mouse_move_event_flag ||
				global.mouse_up_event_flag ||
				global.mouse_wheel_event_flag ||
				global.mouse_double_click_event_flag ||
				global.key_up_event_flag ||
				global.key_down_event_flag ||
				global.picture_request_flag ||
				global.flag_simulating ||
				!global.system_initialization['completed']
			);
		}
	}
	function system_loop(): void {
		// try {
		if (normal_draw_permissions()) {
			global.canvas_redraw_counter = 0;
			global.canvas_draw_event = true;
		}
		if (global.canvas_draw_event) {
			if (global.system_initialization['completed']) {
				temp_draw_signal =
					!global.flag_simulating ||
					global.resize_event ||
					global.mouse_down_event_flag ||
					global.mouse_move_event_flag ||
					global.mouse_up_event_flag ||
					global.mouse_wheel_event_flag ||
					global.mouse_double_click_event_flag ||
					global.key_up_event_flag ||
					global.key_down_event_flag ||
					global.picture_request_flag ||
					!workspace.draw_to_screen ||
					toast.draw_text;
			} else {
				temp_draw_signal =
					!global.flag_simulating ||
					global.resize_event ||
					global.mouse_down_event_flag ||
					global.mouse_move_event_flag ||
					global.mouse_up_event_flag ||
					global.mouse_wheel_event_flag ||
					global.mouse_double_click_event_flag ||
					global.key_up_event_flag ||
					global.key_down_event_flag ||
					global.picture_request_flag ||
					!workspace.draw_to_screen;
			}
			global.last_selected = global.selected;
			update();
			if (global.last_selected !== global.selected) {
				wire_manager.reset_wire_builder();
			}
			if (global.force_resize_event) {
				global.signal_build_element = true;
				global.signal_build_counter = 0;
				global.force_resize_event = false;
				global.draw_block = true;
				resize_canvas();
			}
			fps_div ^= 1;
			if (((fps_div == 1 || temp_draw_signal) && global.flag_simulating) || !global.flag_simulating) {
				if (global.system_initialization['completed']) {
					if ((global.flag_simulating && global.canvas_draw_request) || temp_draw_signal) {
						if (!global.on_restore_event) {
							if (!global.draw_block) {
								ctx.drawImage(
									virtual_surface.get_surface(),
									view_port.left,
									view_port.top,
									view_port.view_width,
									view_port.view_height,
									view_port.left,
									view_port.top,
									view_port.view_width,
									view_port.view_height
								);
							}
							canvas.release();
							canvas.clear_xywh(view_port.left, view_port.top, view_port.view_width, view_port.view_height);
							draw();
							if (global.draw_block) {
								global.draw_block = false;
							}
						}
						if (global.canvas_draw_request) {
							if (global.canvas_draw_request_counter++ >= global.CANVAS_DRAW_REQUEST_COUNTER_MAX) {
								global.canvas_draw_request_counter = 0;
								global.canvas_draw_request = false;
							}
						}
					}
				}
			}
			if (global.signal_build_element) {
				if (global.signal_build_counter++ >= global.SIGNAL_BUILD_COUNTER_MAX) {
					global.signal_build_element = false;
					global.signal_build_counter = 0;
				}
			}
			if (global.signal_wire_deleted) {
				if (global.signal_wire_deleted_counter++ >= global.SIGNAL_WIRE_DELETED_COUNTER_MAX) {
					global.signal_wire_deleted = false;
					global.signal_wire_deleted_counter = 0;
				}
			}
			if (global.canvas_redraw_counter++ > global.CANVAS_REDRAW_MAX) {
				global.canvas_redraw_counter = 0;
				global.canvas_draw_event = false;
			}
		}
		// } catch (e) {
		// 	if (!global.DEVELOPER_MODE && !global.MOBILE_MODE) {
		// 		let post_data: string = e + '\r\n' + e.stack + '\r\n';
		// 		let url: string = 'solver_errors.php?msg="' + post_data + '"';
		// 		let method: string = 'POST';
		// 		let should_be_async: boolean = true;
		// 		let request: XMLHttpRequest = new XMLHttpRequest();
		// 		request.onload = function (): void {
		// 			let status: number = request.status;
		// 			let data: string = request.responseText;
		// 		};
		// 		request.open(method, url, should_be_async);
		// 		request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
		// 		request.send(post_data);
		// 	}
		// }
	}
	function update(): void {
		if (global.system_initialization['completed']) {
			engine_functions.file_manager();
			global.component_translating = false;
			if (global.MOBILE_MODE) {
				if (global.on_restore_event) {
					global.signal_build_element = true;
					window.JsInterface.onRestore();
					global.on_restore_event = false;
				}
			}
			if (global.mouse_down_event_queue.length > 0 && !mouse_event_latch) {
				fifo_index = global.mouse_down_event_queue.length - 1;
				global.mouse_down_event = global.mouse_down_event_queue[fifo_index];
				mouse_event_latch = true;
				handle_mouse_down();
				global.mouse_down_event_queue.splice(fifo_index, 1);
				if (global.mouse_down_event_queue.length === 0) {
					global.mouse_down_event_flag = false;
				}
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
			}
			if (global.mouse_move_event_flag) {
				handle_mouse_move();
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
				global.mouse_move_event_flag = false;
			}
			if (global.mouse_up_event_queue.length > 0 && mouse_event_latch) {
				fifo_index = global.mouse_up_event_queue.length - 1;
				global.mouse_up_event = global.mouse_up_event_queue[fifo_index];
				mouse_event_latch = false;
				handle_mouse_up();
				global.mouse_up_event_queue.splice(fifo_index, 1);
				if (global.mouse_up_event_queue.length === 0) {
					global.mouse_up_event_flag = false;
					global.mouse_move_event_flag = false;
					global.is_dragging = false;
				}
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
			}
			if (global.mouse_double_click_event_queue.length > 0) {
				fifo_index = global.mouse_double_click_event_queue.length - 1;
				global.mouse_double_click_event = global.mouse_double_click_event_queue[fifo_index];
				handle_double_click();
				global.mouse_double_click_event_queue.splice(fifo_index, 1);
				if (global.mouse_double_click_event_queue.length === 0) {
					global.mouse_double_click_event_flag = false;
				}
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
			}
			if (global.mouse_wheel_event_queue.length > 0) {
				fifo_index = global.mouse_wheel_event_queue.length - 1;
				global.mouse_wheel_event = global.mouse_wheel_event_queue[fifo_index];
				handle_mouse_wheel();
				global.mouse_wheel_event_queue.splice(fifo_index, 1);
				if (global.mouse_wheel_event_queue.length === 0) {
					global.mouse_wheel_event_flag = false;
				}
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
				global.is_dragging = false;
			}
			if (global.resize_event) {
				general_paint.set_stroke_width(global.canvas_stroke_width_1);
				if (global.MOBILE_MODE) {
					general_paint.set_color(global.GENERAL_WHITE_COLOR);
				} else {
					general_paint.set_color(global.GENERAL_BLACK_COLOR);
				}
				general_paint.set_text_size(global.canvas_text_size_5);
				global.mouse_x = 0;
				global.mouse_y = 0;
				reset_zoom();
				resize_components();
				global.resize_event = false;
			}
			if (global.key_down_event_queue.length > 0) {
				fifo_index = global.key_down_event_queue.length - 1;
				global.key_down_event = global.key_down_event_queue[fifo_index];
				handle_key_down();
				global.key_down_event_queue.splice(fifo_index, 1);
				if (global.key_down_event_queue.length === 0) {
					global.key_down_event_flag = false;
				}
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
			}
			if (global.key_up_event_queue.length > 0) {
				fifo_index = global.key_up_event_queue.length - 1;
				global.key_up_event = global.key_up_event_queue[fifo_index];
				handle_key_up();
				global.key_down_event_queue = [];
				global.key_up_event_queue.splice(fifo_index, 1);
				if (global.key_up_event_queue.length === 0) {
					global.key_up_event_flag = false;
				}
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
			}
			if (global.mouse_keyboard_lock) {
				global.mouse_keyboard_lock = false;
			}
			if (
				global.flag_idle &&
				!global.flag_save_image &&
				!global.flag_save_circuit &&
				!global.flag_zoom &&
				!global.flag_element_options &&
				!global.flag_element_options_edit &&
				!global.flag_select_timestep &&
				!global.flag_select_settings &&
				!global.flag_remove_all
			) {
				simulation_manager.simulate();
				/* #INSERT_GENERATE_UPDATE# */
				/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
				for (var i: number = 0; i < resistors.length; i++) {
					resistors[i].update();
				}
				for (var i: number = 0; i < capacitors.length; i++) {
					capacitors[i].update();
				}
				for (var i: number = 0; i < inductors.length; i++) {
					inductors[i].update();
				}
				for (var i: number = 0; i < grounds.length; i++) {
					grounds[i].update();
				}
				for (var i: number = 0; i < dcsources.length; i++) {
					dcsources[i].update();
				}
				for (var i: number = 0; i < dccurrents.length; i++) {
					dccurrents[i].update();
				}
				for (var i: number = 0; i < acsources.length; i++) {
					acsources[i].update();
				}
				for (var i: number = 0; i < accurrents.length; i++) {
					accurrents[i].update();
				}
				for (var i: number = 0; i < squarewaves.length; i++) {
					squarewaves[i].update();
				}
				for (var i: number = 0; i < sawwaves.length; i++) {
					sawwaves[i].update();
				}
				for (var i: number = 0; i < trianglewaves.length; i++) {
					trianglewaves[i].update();
				}
				for (var i: number = 0; i < constants.length; i++) {
					constants[i].update();
				}
				for (var i: number = 0; i < wires.length; i++) {
					wires[i].update();
				}
				for (var i: number = 0; i < nets.length; i++) {
					nets[i].update();
				}
				for (var i: number = 0; i < notes.length; i++) {
					notes[i].update();
				}
				for (var i: number = 0; i < rails.length; i++) {
					rails[i].update();
				}
				for (var i: number = 0; i < voltmeters.length; i++) {
					voltmeters[i].update();
				}
				for (var i: number = 0; i < ohmmeters.length; i++) {
					ohmmeters[i].update();
				}
				for (var i: number = 0; i < ammeters.length; i++) {
					ammeters[i].update();
				}
				for (var i: number = 0; i < wattmeters.length; i++) {
					wattmeters[i].update();
				}
				for (var i: number = 0; i < fuses.length; i++) {
					fuses[i].update();
				}
				for (var i: number = 0; i < spsts.length; i++) {
					spsts[i].update();
				}
				for (var i: number = 0; i < spdts.length; i++) {
					spdts[i].update();
				}
				for (var i: number = 0; i < nots.length; i++) {
					nots[i].update();
				}
				for (var i: number = 0; i < potentiometers.length; i++) {
					potentiometers[i].update();
				}
				for (var i: number = 0; i < ands.length; i++) {
					ands[i].update();
				}
				for (var i: number = 0; i < ors.length; i++) {
					ors[i].update();
				}
				for (var i: number = 0; i < nands.length; i++) {
					nands[i].update();
				}
				for (var i: number = 0; i < nors.length; i++) {
					nors[i].update();
				}
				for (var i: number = 0; i < xors.length; i++) {
					xors[i].update();
				}
				for (var i: number = 0; i < xnors.length; i++) {
					xnors[i].update();
				}
				for (var i: number = 0; i < dffs.length; i++) {
					dffs[i].update();
				}
				for (var i: number = 0; i < vsats.length; i++) {
					vsats[i].update();
				}
				for (var i: number = 0; i < adders.length; i++) {
					adders[i].update();
				}
				for (var i: number = 0; i < subtractors.length; i++) {
					subtractors[i].update();
				}
				for (var i: number = 0; i < multipliers.length; i++) {
					multipliers[i].update();
				}
				for (var i: number = 0; i < dividers.length; i++) {
					dividers[i].update();
				}
				for (var i: number = 0; i < gains.length; i++) {
					gains[i].update();
				}
				for (var i: number = 0; i < absvals.length; i++) {
					absvals[i].update();
				}
				for (var i: number = 0; i < vcsws.length; i++) {
					vcsws[i].update();
				}
				for (var i: number = 0; i < vcvss.length; i++) {
					vcvss[i].update();
				}
				for (var i: number = 0; i < vccss.length; i++) {
					vccss[i].update();
				}
				for (var i: number = 0; i < cccss.length; i++) {
					cccss[i].update();
				}
				for (var i: number = 0; i < ccvss.length; i++) {
					ccvss[i].update();
				}
				for (var i: number = 0; i < opamps.length; i++) {
					opamps[i].update();
				}
				for (var i: number = 0; i < adcs.length; i++) {
					adcs[i].update();
				}
				for (var i: number = 0; i < dacs.length; i++) {
					dacs[i].update();
				}
				for (var i: number = 0; i < sandhs.length; i++) {
					sandhs[i].update();
				}
				for (var i: number = 0; i < pwms.length; i++) {
					pwms[i].update();
				}
				for (var i: number = 0; i < integrators.length; i++) {
					integrators[i].update();
				}
				for (var i: number = 0; i < differentiators.length; i++) {
					differentiators[i].update();
				}
				for (var i: number = 0; i < lowpasses.length; i++) {
					lowpasses[i].update();
				}
				for (var i: number = 0; i < highpasses.length; i++) {
					highpasses[i].update();
				}
				for (var i: number = 0; i < relays.length; i++) {
					relays[i].update();
				}
				for (var i: number = 0; i < pids.length; i++) {
					pids[i].update();
				}
				for (var i: number = 0; i < luts.length; i++) {
					luts[i].update();
				}
				for (var i: number = 0; i < vcrs.length; i++) {
					vcrs[i].update();
				}
				for (var i: number = 0; i < vccas.length; i++) {
					vccas[i].update();
				}
				for (var i: number = 0; i < vcls.length; i++) {
					vcls[i].update();
				}
				for (var i: number = 0; i < grts.length; i++) {
					grts[i].update();
				}
				for (var i: number = 0; i < tptzs.length; i++) {
					tptzs[i].update();
				}
				for (var i: number = 0; i < transformers.length; i++) {
					transformers[i].update();
				}
				/* <!-- END AUTOMATICALLY GENERATED !--> */
				menu_bar.update();
				bottom_menu.update();
				element_options.update();
				history_manager.watch();
				wire_manager.watch();
				if (!global.MOBILE_MODE) {
					if (last_webpage_document_title !== global.user_file.title) {
						webpage_document_title.innerHTML = global.user_file.title;
						last_webpage_document_title = global.user_file.title;
					}
				}
			}
		} else {
			initialize(global.system_initialization['step']);
			global.system_initialization['step']++;
			if (global.system_initialization['step'] >= global.system_initialization['max']) {
				if (global.MOBILE_MODE) {
					global.on_restore_event = true;
				}
				global.system_initialization['step'] = 0;
				global.system_initialization['completed'] = true;
				global.signal_build_element = true;
			}
		}
	}
	function refactor_sizes(): void {
		global.canvas_stroke_width_1_zoom = global.canvas_stroke_width_base * 2.25 * global.workspace_zoom_scale;
		global.canvas_stroke_width_2_zoom = global.canvas_stroke_width_base * 2.65 * global.workspace_zoom_scale;
		global.canvas_stroke_width_3_zoom = global.canvas_stroke_width_base * 9 * global.workspace_zoom_scale;
		global.canvas_stroke_width_4_zoom = global.canvas_stroke_width_base * 16 * global.workspace_zoom_scale;
		global.canvas_stroke_width_5_zoom = global.canvas_stroke_width_base * 21 * global.workspace_zoom_scale;
		global.canvas_stroke_width_6_zoom = global.canvas_stroke_width_base * 43 * global.workspace_zoom_scale;
		global.canvas_text_size_1_zoom = global.canvas_text_size_base * 2.25 * global.workspace_zoom_scale;
		global.canvas_text_size_2_zoom = global.canvas_text_size_base * 2.65 * global.workspace_zoom_scale;
		global.canvas_text_size_3_zoom = global.canvas_text_size_base * 9 * global.workspace_zoom_scale;
		global.canvas_text_size_4_zoom = global.canvas_text_size_base * 16 * global.workspace_zoom_scale;
		global.canvas_text_size_5_zoom = global.canvas_text_size_base * 21 * global.workspace_zoom_scale;
		global.canvas_text_size_6_zoom = global.canvas_text_size_base * 43 * global.workspace_zoom_scale;
	}
	function draw(): void {
		refactor_sizes();
		engine_functions.image_manager();
		if (!global.picture_request_flag) {
			if (!global.MOBILE_MODE) {
				if (
					global.flag_idle &&
					!global.flag_save_image &&
					!global.flag_save_circuit &&
					!global.flag_zoom &&
					!global.flag_element_options &&
					!global.flag_element_options_edit &&
					!global.flag_select_element &&
					!global.flag_select_timestep &&
					!global.flag_select_settings &&
					!global.flag_remove_all &&
					!global.flag_menu_element_toolbox &&
					!global.flag_graph
				) {
					multi_select_manager.reset_enveloping_bounds();
				}
				if (global.signal_build_element) {
					node_space_x_cache = 0.29375 * global.node_space_x;
					node_space_y_cache = 0.29375 * global.node_space_y;
					mult_node_space_x_cache = 1.25 * node_space_x_cache;
					mult_node_space_y_cache = 1.25 * node_space_y_cache;
					node_length = nodes.length;
					for (var i: number = 0; i < node_length; i++) {
						nodes[i].resize(node_space_x_cache, node_space_y_cache, mult_node_space_x_cache, mult_node_space_y_cache);
						if (node_length - 1 - i === i + 1) {
							break;
						}
						nodes[node_length - 1 - i].resize(node_space_x_cache, node_space_y_cache, mult_node_space_x_cache, mult_node_space_y_cache);
					}
				}
				if (global.DEVELOPER_MODE) {
					node_length = nodes.length;
					for (var i: number = 0; i < node_length; i++) {
						nodes[i].draw(canvas);
						if (node_length - 1 - i === i + 1) {
							break;
						}
						nodes[node_length - 1 - i].draw(canvas);
					}
				}
				workspace.workspace_draw(canvas);
				engine_functions.draw_unselected_components(canvas);
				engine_functions.draw_wires(canvas);
				engine_functions.draw_selected_components(canvas);
				engine_functions.draw_meter_traces(canvas);
				if (global.wire_builder['step'] > 0) {
					global.node_line_buffer = [];
					global.node_line_buffer_index = 0;
					node_length = nodes.length;
					for (var i: number = 0; i < node_length; i++) {
						nodes[i].draw(canvas);
						if (node_length - 1 - i === i + 1) {
							break;
						}
						nodes[node_length - 1 - i].draw(canvas);
					}
					if (global.wire_builder['n1'] > -1 && global.wire_builder['n1'] < global.settings.MAXNODES) {
						canvas.draw_line_buffer(global.node_line_buffer, nodes[global.wire_builder['n1']].node_line_paint);
						canvas.draw_rect2(nodes[global.wire_builder['n1']].bounds, nodes[global.wire_builder['n1']].node_fill_paint);
					}
				}
				multi_select_manager.draw_bounds(canvas);
				element_options.draw_options(canvas);
				menu_bar.draw_menu_bar(canvas);
				bottom_menu.draw_bottom_menu(canvas);
				time_step_window.draw_window(canvas);
				save_circuit_window.draw_window(canvas);
				save_image_window.draw_window(canvas);
				element_options_window.draw_window(canvas);
				element_options_edit_window.draw_window(canvas);
				zoom_window.draw_window(canvas);
				settings_window.draw_window(canvas);
				yes_no_window.draw_window(canvas);
				graph_window.draw_window(canvas);
				toast.draw_toast(canvas);
			} else {
				if (
					global.flag_idle &&
					!global.flag_save_image &&
					!global.flag_save_circuit &&
					!global.flag_zoom &&
					!global.flag_element_options &&
					!global.flag_element_options_edit &&
					!global.flag_select_timestep &&
					!global.flag_select_settings &&
					!global.flag_remove_all
				) {
					workspace.workspace_draw(canvas);
					if (!global.flag_graph) {
						if (global.signal_build_element) {
							node_space_x_cache = 0.29375 * global.node_space_x;
							node_space_y_cache = 0.29375 * global.node_space_y;
							mult_node_space_x_cache = 1.25 * node_space_x_cache;
							mult_node_space_y_cache = 1.25 * node_space_y_cache;
							node_length = nodes.length;
							for (var i: number = 0; i < node_length; i++) {
								nodes[i].resize(node_space_x_cache, node_space_y_cache, mult_node_space_x_cache, mult_node_space_y_cache);
								if (node_length - 1 - i === i + 1) {
									break;
								}
								nodes[node_length - 1 - i].resize(node_space_x_cache, node_space_y_cache, mult_node_space_x_cache, mult_node_space_y_cache);
							}
						}
						if (global.DEVELOPER_MODE) {
							node_length = nodes.length;
							for (var i: number = 0; i < node_length; i++) {
								nodes[i].draw(canvas);
								if (node_length - 1 - i === i + 1) {
									break;
								}
								nodes[node_length - 1 - i].draw(canvas);
							}
						}
						engine_functions.draw_unselected_components(canvas);
						engine_functions.draw_wires(canvas);
						engine_functions.draw_selected_components(canvas);
						engine_functions.draw_meter_traces(canvas);
						if (global.wire_builder['step'] > 0) {
							global.node_line_buffer = [];
							global.node_line_buffer_index = 0;
							node_length = nodes.length;
							for (var i: number = 0; i < node_length; i++) {
								nodes[i].draw(canvas);
								if (node_length - 1 - i === i + 1) {
									break;
								}
								nodes[node_length - 1 - i].draw(canvas);
							}
							if (global.wire_builder['n1'] > -1 && global.wire_builder['n1'] < global.settings.MAXNODES) {
								canvas.draw_line_buffer(global.node_line_buffer, nodes[global.wire_builder['n1']].node_line_paint);
								canvas.draw_rect2(nodes[global.wire_builder['n1']].bounds, nodes[global.wire_builder['n1']].node_fill_paint);
							}
						}
						element_options.draw_options(canvas);
						bottom_menu.draw_bottom_menu(canvas);
					}
					menu_bar.draw_menu_bar(canvas);
				}
				time_step_window.draw_window(canvas);
				save_circuit_window.draw_window(canvas);
				save_image_window.draw_window(canvas);
				element_options_window.draw_window(canvas);
				element_options_edit_window.draw_window(canvas);
				zoom_window.draw_window(canvas);
				settings_window.draw_window(canvas);
				yes_no_window.draw_window(canvas);
				graph_window.draw_window(canvas);
				on_screen_keyboard.draw_keyboard(canvas);
				toast.draw_toast(canvas);
			}
		}
		if (global.DEVELOPER_MODE) {
			canvas.draw_circle(global.mouse_x, global.mouse_y, 20, general_paint);
			canvas.draw_text(global.mouse_x + ', ' + global.mouse_y, global.mouse_x, global.mouse_y + 50, general_paint);
		}
		view_port.draw_viewport(canvas);
	}
	function handle_mouse_down(): void {
		global.component_touched = false;
		if (global.MOBILE_MODE === false) {
			global.mouse_x = global.mouse_down_event.clientX * global.device_pixel_ratio;
			global.mouse_y = global.mouse_down_event.clientY * global.device_pixel_ratio;
		} else {
			//@ts-expect-error
			touch = global.mouse_down_event.touches[0];
			global.mouse_x = touch.clientX * global.device_pixel_ratio;
			global.mouse_y = touch.clientY * global.device_pixel_ratio;
		}
		global.last_mouse_x = global.mouse_x;
		global.last_mouse_y = global.mouse_y;
		global.is_touching = true;
		global.mouse_down_x = global.mouse_x;
		global.mouse_down_y = global.mouse_y;
		global.translation_lock = true;
		if (!global.MOBILE_MODE) {
			if ('which' in global.mouse_down_event) {
				global.is_right_click = global.mouse_down_event.which === 3;
			} else if ('button' in global.mouse_down_event) {
				//@ts-expect-error
				global.is_right_click = global.mouse_down_event.button === 2;
			}
		} else {
			global.is_right_click = false;
		}
		if (!global.is_right_click) {
			element_options.mouse_down();
			bottom_menu.mouse_down();
			time_step_window.mouse_down();
			save_circuit_window.mouse_down();
			save_image_window.mouse_down();
			menu_bar.mouse_down();
			element_options_window.mouse_down();
			element_options_edit_window.mouse_down();
			graph_window.mouse_down();
			zoom_window.mouse_down();
			settings_window.mouse_down();
			yes_no_window.mouse_down();
			multi_select_manager.mouse_down();
			on_screen_keyboard.mouse_down();
		}
		if (
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
			!global.flag_menu_element_toolbox
		) {
			if (global.MOBILE_MODE === false) {
				if (global.is_right_click) {
					global.is_dragging = true;
					global.temp_is_dragging = global.is_dragging;
				}
			}
			if (!global.is_dragging) {
				/* #INSERT_GENERATE_MOUSE_DOWN# */
				/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
				for (var i: number = 0; i < resistors.length; i++) {
					resistors[i].mouse_down();
				}
				for (var i: number = 0; i < capacitors.length; i++) {
					capacitors[i].mouse_down();
				}
				for (var i: number = 0; i < inductors.length; i++) {
					inductors[i].mouse_down();
				}
				for (var i: number = 0; i < grounds.length; i++) {
					grounds[i].mouse_down();
				}
				for (var i: number = 0; i < dcsources.length; i++) {
					dcsources[i].mouse_down();
				}
				for (var i: number = 0; i < dccurrents.length; i++) {
					dccurrents[i].mouse_down();
				}
				for (var i: number = 0; i < acsources.length; i++) {
					acsources[i].mouse_down();
				}
				for (var i: number = 0; i < accurrents.length; i++) {
					accurrents[i].mouse_down();
				}
				for (var i: number = 0; i < squarewaves.length; i++) {
					squarewaves[i].mouse_down();
				}
				for (var i: number = 0; i < sawwaves.length; i++) {
					sawwaves[i].mouse_down();
				}
				for (var i: number = 0; i < trianglewaves.length; i++) {
					trianglewaves[i].mouse_down();
				}
				for (var i: number = 0; i < constants.length; i++) {
					constants[i].mouse_down();
				}
				for (var i: number = 0; i < nets.length; i++) {
					nets[i].mouse_down();
				}
				for (var i: number = 0; i < notes.length; i++) {
					notes[i].mouse_down();
				}
				for (var i: number = 0; i < rails.length; i++) {
					rails[i].mouse_down();
				}
				for (var i: number = 0; i < voltmeters.length; i++) {
					voltmeters[i].mouse_down();
				}
				for (var i: number = 0; i < ohmmeters.length; i++) {
					ohmmeters[i].mouse_down();
				}
				for (var i: number = 0; i < ammeters.length; i++) {
					ammeters[i].mouse_down();
				}
				for (var i: number = 0; i < wattmeters.length; i++) {
					wattmeters[i].mouse_down();
				}
				for (var i: number = 0; i < fuses.length; i++) {
					fuses[i].mouse_down();
				}
				for (var i: number = 0; i < spsts.length; i++) {
					spsts[i].mouse_down();
				}
				for (var i: number = 0; i < spdts.length; i++) {
					spdts[i].mouse_down();
				}
				for (var i: number = 0; i < nots.length; i++) {
					nots[i].mouse_down();
				}
				for (var i: number = 0; i < diodes.length; i++) {
					diodes[i].mouse_down();
				}
				for (var i: number = 0; i < leds.length; i++) {
					leds[i].mouse_down();
				}
				for (var i: number = 0; i < zeners.length; i++) {
					zeners[i].mouse_down();
				}
				for (var i: number = 0; i < potentiometers.length; i++) {
					potentiometers[i].mouse_down();
				}
				for (var i: number = 0; i < ands.length; i++) {
					ands[i].mouse_down();
				}
				for (var i: number = 0; i < ors.length; i++) {
					ors[i].mouse_down();
				}
				for (var i: number = 0; i < nands.length; i++) {
					nands[i].mouse_down();
				}
				for (var i: number = 0; i < nors.length; i++) {
					nors[i].mouse_down();
				}
				for (var i: number = 0; i < xors.length; i++) {
					xors[i].mouse_down();
				}
				for (var i: number = 0; i < xnors.length; i++) {
					xnors[i].mouse_down();
				}
				for (var i: number = 0; i < dffs.length; i++) {
					dffs[i].mouse_down();
				}
				for (var i: number = 0; i < vsats.length; i++) {
					vsats[i].mouse_down();
				}
				for (var i: number = 0; i < adders.length; i++) {
					adders[i].mouse_down();
				}
				for (var i: number = 0; i < subtractors.length; i++) {
					subtractors[i].mouse_down();
				}
				for (var i: number = 0; i < multipliers.length; i++) {
					multipliers[i].mouse_down();
				}
				for (var i: number = 0; i < dividers.length; i++) {
					dividers[i].mouse_down();
				}
				for (var i: number = 0; i < gains.length; i++) {
					gains[i].mouse_down();
				}
				for (var i: number = 0; i < absvals.length; i++) {
					absvals[i].mouse_down();
				}
				for (var i: number = 0; i < vcsws.length; i++) {
					vcsws[i].mouse_down();
				}
				for (var i: number = 0; i < vcvss.length; i++) {
					vcvss[i].mouse_down();
				}
				for (var i: number = 0; i < vccss.length; i++) {
					vccss[i].mouse_down();
				}
				for (var i: number = 0; i < cccss.length; i++) {
					cccss[i].mouse_down();
				}
				for (var i: number = 0; i < ccvss.length; i++) {
					ccvss[i].mouse_down();
				}
				for (var i: number = 0; i < opamps.length; i++) {
					opamps[i].mouse_down();
				}
				for (var i: number = 0; i < nmosfets.length; i++) {
					nmosfets[i].mouse_down();
				}
				for (var i: number = 0; i < pmosfets.length; i++) {
					pmosfets[i].mouse_down();
				}
				for (var i: number = 0; i < npns.length; i++) {
					npns[i].mouse_down();
				}
				for (var i: number = 0; i < pnps.length; i++) {
					pnps[i].mouse_down();
				}
				for (var i: number = 0; i < adcs.length; i++) {
					adcs[i].mouse_down();
				}
				for (var i: number = 0; i < dacs.length; i++) {
					dacs[i].mouse_down();
				}
				for (var i: number = 0; i < sandhs.length; i++) {
					sandhs[i].mouse_down();
				}
				for (var i: number = 0; i < pwms.length; i++) {
					pwms[i].mouse_down();
				}
				for (var i: number = 0; i < integrators.length; i++) {
					integrators[i].mouse_down();
				}
				for (var i: number = 0; i < differentiators.length; i++) {
					differentiators[i].mouse_down();
				}
				for (var i: number = 0; i < lowpasses.length; i++) {
					lowpasses[i].mouse_down();
				}
				for (var i: number = 0; i < highpasses.length; i++) {
					highpasses[i].mouse_down();
				}
				for (var i: number = 0; i < relays.length; i++) {
					relays[i].mouse_down();
				}
				for (var i: number = 0; i < pids.length; i++) {
					pids[i].mouse_down();
				}
				for (var i: number = 0; i < luts.length; i++) {
					luts[i].mouse_down();
				}
				for (var i: number = 0; i < vcrs.length; i++) {
					vcrs[i].mouse_down();
				}
				for (var i: number = 0; i < vccas.length; i++) {
					vccas[i].mouse_down();
				}
				for (var i: number = 0; i < vcls.length; i++) {
					vcls[i].mouse_down();
				}
				for (var i: number = 0; i < grts.length; i++) {
					grts[i].mouse_down();
				}
				for (var i: number = 0; i < tptzs.length; i++) {
					tptzs[i].mouse_down();
				}
				for (var i: number = 0; i < transformers.length; i++) {
					transformers[i].mouse_down();
				}
				/* <!-- END AUTOMATICALLY GENERATED !--> */
				for (var i: number = wires.length - 1; i > -1; i--) {
					wires[i].mouse_down();
				}
			}
			if (global.MOBILE_MODE === true) {
				if (global.component_touched === false) {
					global.is_dragging = true;
					global.temp_is_dragging = global.is_dragging;
					global.is_right_click = true;
				}
			}
		}
	}
	function handle_mouse_move(): void {
		global.last_mouse_x = global.mouse_x;
		global.last_mouse_y = global.mouse_y;
		if (global.MOBILE_MODE === false) {
			global.mouse_x = global.mouse_move_event.clientX * global.device_pixel_ratio;
			global.mouse_y = global.mouse_move_event.clientY * global.device_pixel_ratio;
		} else {
			//@ts-expect-error
			touch = global.mouse_move_event.touches[0];
			global.mouse_x = touch.clientX * global.device_pixel_ratio;
			global.mouse_y = touch.clientY * global.device_pixel_ratio;
		}
		global.dx = -(global.last_mouse_x - global.mouse_x) * global.settings.TRANSLATION_SCALE;
		global.dy = -(global.last_mouse_y - global.mouse_y) * global.settings.TRANSLATION_SCALE;
		if (global.norm(global.mouse_down_x - global.mouse_x, global.mouse_down_y - global.mouse_y) > 0.5 * Math.min(global.node_space_x, global.node_space_y) && global.translation_lock) {
			global.translation_lock = false;
			global.is_dragging = global.temp_is_dragging;
		}
		if (global.translation_lock) {
			global.is_dragging = false;
		}
		if (
			!global.flag_save_image &&
			!global.flag_save_circuit &&
			!global.flag_zoom &&
			!global.flag_element_options &&
			!global.flag_element_options_edit &&
			!global.flag_graph &&
			!global.flag_select_element &&
			!global.flag_select_timestep &&
			!global.flag_select_settings &&
			!global.flag_remove_all
		) {
			if (global.flag_idle && !global.flag_simulating) {
				/* #INSERT_GENERATE_MOUSE_MOVE# */
				/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
				for (var i: number = 0; i < resistors.length; i++) {
					resistors[i].mouse_move();
				}
				for (var i: number = 0; i < capacitors.length; i++) {
					capacitors[i].mouse_move();
				}
				for (var i: number = 0; i < inductors.length; i++) {
					inductors[i].mouse_move();
				}
				for (var i: number = 0; i < grounds.length; i++) {
					grounds[i].mouse_move();
				}
				for (var i: number = 0; i < dcsources.length; i++) {
					dcsources[i].mouse_move();
				}
				for (var i: number = 0; i < dccurrents.length; i++) {
					dccurrents[i].mouse_move();
				}
				for (var i: number = 0; i < acsources.length; i++) {
					acsources[i].mouse_move();
				}
				for (var i: number = 0; i < accurrents.length; i++) {
					accurrents[i].mouse_move();
				}
				for (var i: number = 0; i < squarewaves.length; i++) {
					squarewaves[i].mouse_move();
				}
				for (var i: number = 0; i < sawwaves.length; i++) {
					sawwaves[i].mouse_move();
				}
				for (var i: number = 0; i < trianglewaves.length; i++) {
					trianglewaves[i].mouse_move();
				}
				for (var i: number = 0; i < constants.length; i++) {
					constants[i].mouse_move();
				}
				for (var i: number = 0; i < nets.length; i++) {
					nets[i].mouse_move();
				}
				for (var i: number = 0; i < notes.length; i++) {
					notes[i].mouse_move();
				}
				for (var i: number = 0; i < rails.length; i++) {
					rails[i].mouse_move();
				}
				for (var i: number = 0; i < voltmeters.length; i++) {
					voltmeters[i].mouse_move();
				}
				for (var i: number = 0; i < ohmmeters.length; i++) {
					ohmmeters[i].mouse_move();
				}
				for (var i: number = 0; i < ammeters.length; i++) {
					ammeters[i].mouse_move();
				}
				for (var i: number = 0; i < wattmeters.length; i++) {
					wattmeters[i].mouse_move();
				}
				for (var i: number = 0; i < fuses.length; i++) {
					fuses[i].mouse_move();
				}
				for (var i: number = 0; i < spsts.length; i++) {
					spsts[i].mouse_move();
				}
				for (var i: number = 0; i < spdts.length; i++) {
					spdts[i].mouse_move();
				}
				for (var i: number = 0; i < nots.length; i++) {
					nots[i].mouse_move();
				}
				for (var i: number = 0; i < diodes.length; i++) {
					diodes[i].mouse_move();
				}
				for (var i: number = 0; i < leds.length; i++) {
					leds[i].mouse_move();
				}
				for (var i: number = 0; i < zeners.length; i++) {
					zeners[i].mouse_move();
				}
				for (var i: number = 0; i < potentiometers.length; i++) {
					potentiometers[i].mouse_move();
				}
				for (var i: number = 0; i < ands.length; i++) {
					ands[i].mouse_move();
				}
				for (var i: number = 0; i < ors.length; i++) {
					ors[i].mouse_move();
				}
				for (var i: number = 0; i < nands.length; i++) {
					nands[i].mouse_move();
				}
				for (var i: number = 0; i < nors.length; i++) {
					nors[i].mouse_move();
				}
				for (var i: number = 0; i < xors.length; i++) {
					xors[i].mouse_move();
				}
				for (var i: number = 0; i < xnors.length; i++) {
					xnors[i].mouse_move();
				}
				for (var i: number = 0; i < dffs.length; i++) {
					dffs[i].mouse_move();
				}
				for (var i: number = 0; i < vsats.length; i++) {
					vsats[i].mouse_move();
				}
				for (var i: number = 0; i < adders.length; i++) {
					adders[i].mouse_move();
				}
				for (var i: number = 0; i < subtractors.length; i++) {
					subtractors[i].mouse_move();
				}
				for (var i: number = 0; i < multipliers.length; i++) {
					multipliers[i].mouse_move();
				}
				for (var i: number = 0; i < dividers.length; i++) {
					dividers[i].mouse_move();
				}
				for (var i: number = 0; i < gains.length; i++) {
					gains[i].mouse_move();
				}
				for (var i: number = 0; i < absvals.length; i++) {
					absvals[i].mouse_move();
				}
				for (var i: number = 0; i < vcsws.length; i++) {
					vcsws[i].mouse_move();
				}
				for (var i: number = 0; i < vcvss.length; i++) {
					vcvss[i].mouse_move();
				}
				for (var i: number = 0; i < vccss.length; i++) {
					vccss[i].mouse_move();
				}
				for (var i: number = 0; i < cccss.length; i++) {
					cccss[i].mouse_move();
				}
				for (var i: number = 0; i < ccvss.length; i++) {
					ccvss[i].mouse_move();
				}
				for (var i: number = 0; i < opamps.length; i++) {
					opamps[i].mouse_move();
				}
				for (var i: number = 0; i < nmosfets.length; i++) {
					nmosfets[i].mouse_move();
				}
				for (var i: number = 0; i < pmosfets.length; i++) {
					pmosfets[i].mouse_move();
				}
				for (var i: number = 0; i < npns.length; i++) {
					npns[i].mouse_move();
				}
				for (var i: number = 0; i < pnps.length; i++) {
					pnps[i].mouse_move();
				}
				for (var i: number = 0; i < adcs.length; i++) {
					adcs[i].mouse_move();
				}
				for (var i: number = 0; i < dacs.length; i++) {
					dacs[i].mouse_move();
				}
				for (var i: number = 0; i < sandhs.length; i++) {
					sandhs[i].mouse_move();
				}
				for (var i: number = 0; i < pwms.length; i++) {
					pwms[i].mouse_move();
				}
				for (var i: number = 0; i < integrators.length; i++) {
					integrators[i].mouse_move();
				}
				for (var i: number = 0; i < differentiators.length; i++) {
					differentiators[i].mouse_move();
				}
				for (var i: number = 0; i < lowpasses.length; i++) {
					lowpasses[i].mouse_move();
				}
				for (var i: number = 0; i < highpasses.length; i++) {
					highpasses[i].mouse_move();
				}
				for (var i: number = 0; i < relays.length; i++) {
					relays[i].mouse_move();
				}
				for (var i: number = 0; i < pids.length; i++) {
					pids[i].mouse_move();
				}
				for (var i: number = 0; i < luts.length; i++) {
					luts[i].mouse_move();
				}
				for (var i: number = 0; i < vcrs.length; i++) {
					vcrs[i].mouse_move();
				}
				for (var i: number = 0; i < vccas.length; i++) {
					vccas[i].mouse_move();
				}
				for (var i: number = 0; i < vcls.length; i++) {
					vcls[i].mouse_move();
				}
				for (var i: number = 0; i < grts.length; i++) {
					grts[i].mouse_move();
				}
				for (var i: number = 0; i < tptzs.length; i++) {
					tptzs[i].mouse_move();
				}
				for (var i: number = 0; i < transformers.length; i++) {
					transformers[i].mouse_move();
				}
				/* <!-- END AUTOMATICALLY GENERATED !--> */
			}
		}
		for (var i: number = wires.length - 1; i > -1; i--) {
			wires[i].mouse_move();
		}
		menu_bar.mouse_move();
		bottom_menu.mouse_move();
		time_step_window.mouse_move();
		save_circuit_window.mouse_move();
		save_image_window.mouse_move();
		element_options.mouse_move();
		element_options_window.mouse_move();
		element_options_edit_window.mouse_move();
		zoom_window.mouse_move();
		settings_window.mouse_move();
		yes_no_window.mouse_move();
		graph_window.mouse_move();
		multi_select_manager.mouse_move();
		if (global.is_dragging) {
			handle_workspace_drag();
		}
	}
	function handle_mouse_up(): void {
		let temp_translation_lock: boolean = global.translation_lock;
		global.translation_lock = true;
		global.mouse_down_x = -1;
		global.mouse_down_y = -1;
		if (global.MOBILE_MODE === false) {
			global.mouse_x = global.mouse_up_event.clientX * global.device_pixel_ratio;
			global.mouse_y = global.mouse_up_event.clientY * global.device_pixel_ratio;
		} else {
		}
		global.last_mouse_x = global.mouse_x;
		global.last_mouse_y = global.mouse_y;
		global.is_touching = false;
		global.is_dragging = false;
		global.temp_is_dragging = global.is_dragging;
		if (
			!global.flag_save_image &&
			!global.flag_save_circuit &&
			!global.flag_zoom &&
			!global.flag_element_options &&
			!global.flag_element_options_edit &&
			!global.flag_graph &&
			!global.flag_select_element &&
			!global.flag_select_timestep &&
			!global.flag_select_settings &&
			!global.flag_remove_all
		) {
			if (!global.component_touched && !global.is_right_click) {
				if (global.wire_builder['n1'] > -1 && global.wire_builder['n1'] < global.settings.MAXNODES) {
					wire_manager.reset_wire_builder();
				}
			}
			/* #INSERT_GENERATE_MOUSE_UP# */
			/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
			for (var i: number = 0; i < resistors.length; i++) {
				resistors[i].mouse_up();
			}
			for (var i: number = 0; i < capacitors.length; i++) {
				capacitors[i].mouse_up();
			}
			for (var i: number = 0; i < inductors.length; i++) {
				inductors[i].mouse_up();
			}
			for (var i: number = 0; i < grounds.length; i++) {
				grounds[i].mouse_up();
			}
			for (var i: number = 0; i < dcsources.length; i++) {
				dcsources[i].mouse_up();
			}
			for (var i: number = 0; i < dccurrents.length; i++) {
				dccurrents[i].mouse_up();
			}
			for (var i: number = 0; i < acsources.length; i++) {
				acsources[i].mouse_up();
			}
			for (var i: number = 0; i < accurrents.length; i++) {
				accurrents[i].mouse_up();
			}
			for (var i: number = 0; i < squarewaves.length; i++) {
				squarewaves[i].mouse_up();
			}
			for (var i: number = 0; i < sawwaves.length; i++) {
				sawwaves[i].mouse_up();
			}
			for (var i: number = 0; i < trianglewaves.length; i++) {
				trianglewaves[i].mouse_up();
			}
			for (var i: number = 0; i < constants.length; i++) {
				constants[i].mouse_up();
			}
			for (var i: number = 0; i < nets.length; i++) {
				nets[i].mouse_up();
			}
			for (var i: number = 0; i < notes.length; i++) {
				notes[i].mouse_up();
			}
			for (var i: number = 0; i < rails.length; i++) {
				rails[i].mouse_up();
			}
			for (var i: number = 0; i < voltmeters.length; i++) {
				voltmeters[i].mouse_up();
			}
			for (var i: number = 0; i < ohmmeters.length; i++) {
				ohmmeters[i].mouse_up();
			}
			for (var i: number = 0; i < ammeters.length; i++) {
				ammeters[i].mouse_up();
			}
			for (var i: number = 0; i < wattmeters.length; i++) {
				wattmeters[i].mouse_up();
			}
			for (var i: number = 0; i < fuses.length; i++) {
				fuses[i].mouse_up();
			}
			for (var i: number = 0; i < spsts.length; i++) {
				spsts[i].mouse_up();
			}
			for (var i: number = 0; i < spdts.length; i++) {
				spdts[i].mouse_up();
			}
			for (var i: number = 0; i < nots.length; i++) {
				nots[i].mouse_up();
			}
			for (var i: number = 0; i < diodes.length; i++) {
				diodes[i].mouse_up();
			}
			for (var i: number = 0; i < leds.length; i++) {
				leds[i].mouse_up();
			}
			for (var i: number = 0; i < zeners.length; i++) {
				zeners[i].mouse_up();
			}
			for (var i: number = 0; i < potentiometers.length; i++) {
				potentiometers[i].mouse_up();
			}
			for (var i: number = 0; i < ands.length; i++) {
				ands[i].mouse_up();
			}
			for (var i: number = 0; i < ors.length; i++) {
				ors[i].mouse_up();
			}
			for (var i: number = 0; i < nands.length; i++) {
				nands[i].mouse_up();
			}
			for (var i: number = 0; i < nors.length; i++) {
				nors[i].mouse_up();
			}
			for (var i: number = 0; i < xors.length; i++) {
				xors[i].mouse_up();
			}
			for (var i: number = 0; i < xnors.length; i++) {
				xnors[i].mouse_up();
			}
			for (var i: number = 0; i < dffs.length; i++) {
				dffs[i].mouse_up();
			}
			for (var i: number = 0; i < vsats.length; i++) {
				vsats[i].mouse_up();
			}
			for (var i: number = 0; i < adders.length; i++) {
				adders[i].mouse_up();
			}
			for (var i: number = 0; i < subtractors.length; i++) {
				subtractors[i].mouse_up();
			}
			for (var i: number = 0; i < multipliers.length; i++) {
				multipliers[i].mouse_up();
			}
			for (var i: number = 0; i < dividers.length; i++) {
				dividers[i].mouse_up();
			}
			for (var i: number = 0; i < gains.length; i++) {
				gains[i].mouse_up();
			}
			for (var i: number = 0; i < absvals.length; i++) {
				absvals[i].mouse_up();
			}
			for (var i: number = 0; i < vcsws.length; i++) {
				vcsws[i].mouse_up();
			}
			for (var i: number = 0; i < vcvss.length; i++) {
				vcvss[i].mouse_up();
			}
			for (var i: number = 0; i < vccss.length; i++) {
				vccss[i].mouse_up();
			}
			for (var i: number = 0; i < cccss.length; i++) {
				cccss[i].mouse_up();
			}
			for (var i: number = 0; i < ccvss.length; i++) {
				ccvss[i].mouse_up();
			}
			for (var i: number = 0; i < opamps.length; i++) {
				opamps[i].mouse_up();
			}
			for (var i: number = 0; i < nmosfets.length; i++) {
				nmosfets[i].mouse_up();
			}
			for (var i: number = 0; i < pmosfets.length; i++) {
				pmosfets[i].mouse_up();
			}
			for (var i: number = 0; i < npns.length; i++) {
				npns[i].mouse_up();
			}
			for (var i: number = 0; i < pnps.length; i++) {
				pnps[i].mouse_up();
			}
			for (var i: number = 0; i < adcs.length; i++) {
				adcs[i].mouse_up();
			}
			for (var i: number = 0; i < dacs.length; i++) {
				dacs[i].mouse_up();
			}
			for (var i: number = 0; i < sandhs.length; i++) {
				sandhs[i].mouse_up();
			}
			for (var i: number = 0; i < pwms.length; i++) {
				pwms[i].mouse_up();
			}
			for (var i: number = 0; i < integrators.length; i++) {
				integrators[i].mouse_up();
			}
			for (var i: number = 0; i < differentiators.length; i++) {
				differentiators[i].mouse_up();
			}
			for (var i: number = 0; i < lowpasses.length; i++) {
				lowpasses[i].mouse_up();
			}
			for (var i: number = 0; i < highpasses.length; i++) {
				highpasses[i].mouse_up();
			}
			for (var i: number = 0; i < relays.length; i++) {
				relays[i].mouse_up();
			}
			for (var i: number = 0; i < pids.length; i++) {
				pids[i].mouse_up();
			}
			for (var i: number = 0; i < luts.length; i++) {
				luts[i].mouse_up();
			}
			for (var i: number = 0; i < vcrs.length; i++) {
				vcrs[i].mouse_up();
			}
			for (var i: number = 0; i < vccas.length; i++) {
				vccas[i].mouse_up();
			}
			for (var i: number = 0; i < vcls.length; i++) {
				vcls[i].mouse_up();
			}
			for (var i: number = 0; i < grts.length; i++) {
				grts[i].mouse_up();
			}
			for (var i: number = 0; i < tptzs.length; i++) {
				tptzs[i].mouse_up();
			}
			for (var i: number = 0; i < transformers.length; i++) {
				transformers[i].mouse_up();
			}
			/* <!-- END AUTOMATICALLY GENERATED !--> */
		}
		for (var i: number = wires.length - 1; i > -1; i--) {
			wires[i].mouse_up();
		}
		if (global.signal_wire_created) {
			global.history_manager['packet'].push(engine_functions.history_snapshot());
			global.signal_wire_created = false;
		}
		let component_touched: boolean = global.component_touched;
		if (!global.component_touched) {
			global.component_touched = true;
		}
		menu_bar.mouse_up();
		bottom_menu.mouse_up();
		time_step_window.mouse_up();
		save_circuit_window.mouse_up(canvas);
		save_image_window.mouse_up();
		element_options.mouse_up();
		element_options_window.mouse_up();
		element_options_edit_window.mouse_up();
		graph_window.mouse_up();
		zoom_window.mouse_up();
		settings_window.mouse_up();
		yes_no_window.mouse_up();
		on_screen_keyboard.mouse_up();
		multi_select_manager.mouse_up();
		global.component_touched = component_touched;
		engine_functions.reset_selection(false);
		engine_functions.handle_nearest_neighbors(temp_translation_lock);
		global.signal_history_lock = false;
	}
	function handle_mouse_wheel(): void {
		global.mouse_x = global.mouse_wheel_event.clientX * global.device_pixel_ratio;
		global.mouse_y = global.mouse_wheel_event.clientY * global.device_pixel_ratio;
		if (
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
			!global.flag_menu_element_toolbox
		) {
			handle_zoom(global.mouse_wheel_event);
		}
		menu_bar.mouse_wheel();
	}
	function handle_double_click(): void {
		global.mouse_x = global.mouse_double_click_event.clientX * global.device_pixel_ratio;
		global.mouse_y = global.mouse_double_click_event.clientY * global.device_pixel_ratio;
		time_step_window.double_click();
		save_image_window.double_click();
		save_circuit_window.double_click();
		element_options_edit_window.double_click();
	}
	function handle_key_down(): void {
		time_step_window.key_down(global.key_down_event);
		save_circuit_window.key_down(global.key_down_event, canvas);
		save_image_window.key_down(global.key_down_event);
		settings_window.key_down(global.key_down_event);
		yes_no_window.key_down(global.key_down_event);
		zoom_window.key_down(global.key_down_event);
		menu_bar.key_down(global.key_down_event);
		graph_window.key_down(global.key_down_event);
		element_options_window.key_down(global.key_down_event);
		element_options_edit_window.key_down(global.key_down_event);
		multi_select_manager.key_down(global.key_down_event);
		shortcut_manager.listen(global.key_down_event);
	}
	function handle_key_up(): void {
		multi_select_manager.key_up(global.key_up_event);
	}
	function handle_workspace_drag(): void {
		let sqrt: number = Math.round(global.settings.SQRT_MAXNODES * 0.75);
		let x_space: number = sqrt * global.node_space_x;
		let y_space: number = sqrt * global.node_space_y;
		if (workspace.bounds.left + global.dx < view_port.left - x_space) {
			global.dx = view_port.left - x_space - workspace.bounds.left;
		}
		if (workspace.bounds.right + global.dx > view_port.right + x_space) {
			global.dx = view_port.right + x_space - workspace.bounds.right;
		}
		if (workspace.bounds.top + global.dy < view_port.top - y_space) {
			global.dy = view_port.top - y_space - workspace.bounds.top;
		}
		if (workspace.bounds.bottom + global.dy > view_port.bottom + y_space) {
			global.dy = view_port.bottom + y_space - workspace.bounds.bottom;
		}
		workspace.workspace_translate_bounds(global.dx, global.dy);
		global.delta_x += global.dx;
		global.delta_y += global.dy;
	}
	function register(): void {
		if (!global.DEVELOPER_MODE) {
			let post_data: string = 'pinged @ {' + global.get_time_stamp() + '}';
			let url: string = 'analytics.php?msg="' + post_data + '"';
			let method: string = 'POST';
			let should_be_async: boolean = true;
			let request: XMLHttpRequest = new XMLHttpRequest();
			request.onload = function (): void {
				let status: number = request.status;
				let data: string = request.responseText;
			};
			request.open(method, url, should_be_async);
			request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
			request.send(post_data);
		}
	}
	function browser_detection(): void {
		if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
			global.browser_opera = true;
		} else if (navigator.userAgent.indexOf('Chrome') !== -1) {
			global.browser_chrome = true;
		} else if (navigator.userAgent.indexOf('Safari') !== -1) {
			global.browser_safari = true;
		} else if (navigator.userAgent.indexOf('Firefox') !== -1) {
			global.browser_firefox = true;
			//@ts-ignore
		} else if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true) {
			global.browser_ie = true;
		}
	}
	function main(): void {
		throttle_loop();
		requestAnimationFrame(main);
	}
	function throttle_loop(): void {
		switch (++fps_counter) {
			case fps_compare:
				fps_index ^= 1;
				fps_compare = FPS_DIV_ARRAY[fps_index];
				fps_counter = 0;
				system_loop();
				break;
			default:
				break;
		}
	}
	start_system();
}
