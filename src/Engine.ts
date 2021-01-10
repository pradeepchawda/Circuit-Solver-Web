'use strict';
/**********************************************************************
* Project           : Circuit Solver
* File		        : Engine.js
* Author            : nboatengc
* Date created      : 20190928
*
* Purpose           : The main entry point for the program. It handles all the function calls
                    from the user and then processes them.
*
* Copyright PHASORSYSTEMS, 2019. All Rights Reserved.
* UNPUBLISHED, LICENSED SOFTWARE.
*
* CONFIDENTIAL AND PROPRIETARY INFORMATION
* WHICH IS THE PROPERTY OF PHASORSYSTEMS.
*
* Revision History  :
*
* Date        Author      	Ref    Revision (Date in YYYYMMDD format)
* 20190928    nboatengc     1      Initial Commit.
*
***********************************************************************/
/* NOTE: ALL COMMENTS MUST BE ON THEIR OWN LINES!!!!! This is to be safe when obfuscating. */
/* Prevent the backspace from navigating! Disable scrolling w/ backspace or arrow keys! */
/* #START_GLOBAL_EXTRACT# */
/* Global state variable */
var global: Global = new Global();
/* Add the hashCode function for all strings. */
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
/* Save a file for the user! */
function save_file(title: string, content: string): void {
	let blob: Blob = new Blob([content], {
		type: 'text/plain;charset=utf-8'
	});
	saveAs(blob, title);
}
/* Save an image for the user! */
function save_image(title: string, canvas: HTMLCanvasElement): void {
	canvas.toBlob(function (blob) {
		saveAs(blob, title);
	});
}
/* Save an image for the user! */
function save_image_mobile(title: string, canvas: HTMLCanvasElement): void {
	canvas.toBlob(function (blob: Blob) {
		let reader: FileReader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = function () {
			window.JsInterface.javascript_native_hook('push-image', title, reader.result);
		};
	});
}
/* Create a global variable to access the "file_explorer" element in HTML. */
var file_reader: HTMLElement = global.NULL;
if (global.MOBILE_MODE) {
	file_reader = document.getElementById('file_explorer_mobile');
} else {
	file_reader = document.getElementById('file_explorer');
}
/* Create a global variable to access the "file_saver" element in HTML. */
var file_saver = document.getElementById('file_saver');
/* Create a global variable to access the "file_saver" element in HTML. */
var file_loader = document.getElementById('file_loader');
/* Handles any file events that take place. */
function file_event(input: HTMLInputElement): void {
	let reader: FileReader = new FileReader();
	reader.onload = function (e): void {
		/* Grab the contents of the file. */
		let text: string = <string>(<unknown>reader.result);
		/* Save the name of the file to global. */
		/* Remove the extension :3 */
		let title: string = input.files[0].name.split('.')[0];
		if (title.length > global.MAX_TEXT_LENGTH) {
			title = title.substring(0, global.MAX_TEXT_LENGTH) + '...';
		}
		global.user_file.title = title;
		bottom_menu.resize_bottom_menu();
		/* Save the contents of the file to global. */
		global.user_file.content = text;
		/* Enable a flag to dictate that a user selected a file. */
		global.user_file_selected = true;
		/* Restart the canvas drawing events. */
		global.canvas_draw_event = true;
	};
	/* In case we run into an error, let's report it. */
	reader.onerror = function (err: ProgressEvent<FileReader>) {};
	/* Start the reader and wait for the results. */
	reader.readAsText(input.files[0]);
}
/* Handles any file events that take place. */
function file_event_mobile(title: string, data: string): void {
	if (title.length > global.MAX_TEXT_LENGTH) {
		title = title.substring(0, global.MAX_TEXT_LENGTH) + '...';
	}
	global.user_file.title = title;
	bottom_menu.resize_bottom_menu();
	/* Save the contents of the file to global. */
	global.user_file.content = data.replace(language_manager.QUOTE_ESCAPE, "'");
}
function restore_system_options(index: number, value: string): void {
	if (index === global.SYSTEM_OPTION_LANGUAGE) {
		for (var i: number = 0; i < global.LANGUAGES.length; i++) {
			if (value === global.LANGUAGES[i]) {
				global.LANGUAGE_INDEX = i;
			}
		}
	}
	global.SYSTEM_OPTIONS['values'][index] = value;
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
	global.SIGNAL_BUILD_ELEMENT = true;
}
function handle_file_loading(): void {
	/* Enable a flag to dictate that a user selected a file. */
	global.user_file_selected = true;
	/* Restart the canvas drawing events. */
	global.canvas_draw_event = true;
	try {
		engine_functions.parse_elements(global.user_file.content);
	} catch (error) {}
	global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
	global.draw_block = true;
	global.user_file_selected = false;
	MOUSE_EVENT_LATCH = false;
}
var solver_container: HTMLElement = document.getElementById('solver');
/* The HTML canvas, changed to surface for my convenience. */
var surface: HTMLCanvasElement = document.createElement('canvas');
/* Virtual Canvas to draw on */
/* Assign the surface an id */
surface.id = 'canvas';
surface.style.visibility = 'hidden';
surface.style.zIndex = '0';
surface.style.position = 'absolute';
/* Add the surface to the body of the html window. */
solver_container.appendChild(surface);
/* Get the 2d context of the surface (used for drawing)*/
var ctx: CanvasRenderingContext2D = surface.getContext('2d');
/* A virtual surface */
var virtual_surface: VirtualCanvas = new VirtualCanvas(1, 1, global.virtual_canvas_id++);
/* Global Linear Algebra instance */
var linear_algebra: LinearAlgebra = new LinearAlgebra();
/* Storage for all the different languages supported by Circuit Solver. */
var language_manager: LanguageManager = new LanguageManager();
/* Manager for all the different shortcuts supported by Circuit Solver. */
var shortcut_manager: ShortcutManager = new ShortcutManager();
/* General class to handle all of the string formating in this application */
var string_operator: StringOperator = new StringOperator();
/* General class to handle multi-selecing elements. */
var multi_select_manager: MultiSelectManager = new MultiSelectManager();
/* The aspect ratio for the view port */
var CANVAS_ASPECT_RATIO: number = 1.333;
if (global.MOBILE_MODE) {
	CANVAS_ASPECT_RATIO = 1.618;
}
/* The viewport we will be drawing within! */
var view_port: Viewport = new Viewport(CANVAS_ASPECT_RATIO, 800, 800 / CANVAS_ASPECT_RATIO);
/* Global workspace */
var workspace: Workspace = new Workspace(0, 0, 0, 0, global.workspace_zoom_scale);
/* A class to help handle simulations. It keeps track of all the things that are
necessary to be done for simulation (node assignment, element assignment, matrix
sizing, stamping, etc. ) */
var simulation_manager: SimulationManager = global.NULL;
/* A manager to handle tracking of the scopes. */
var scope_manager: ScopeManager = new ScopeManager();
/* Maticies for solving the system of equations generated by the components */
var matrix_a: Array<Array<number>> = linear_algebra.matrix(1, 1);
var matrix_z: Array<Array<number>> = linear_algebra.matrix(1, 1);
var matrix_x: Array<Array<number>> = linear_algebra.matrix(1, 1);
var matrix_x_copy: Array<Array<number>> = linear_algebra.matrix(1, 1);
/* #INSERT_GENERATE_CREATE_ELEMENT_INSTANCE# */
/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
/* All the resistors in the system! */
var resistors: Array<Resistor> = [];

/* All the capacitors in the system! */
var capacitors: Array<Capacitor> = [];

/* All the inductors in the system! */
var inductors: Array<Inductor> = [];

/* All the grounds in the system! */
var grounds: Array<Ground> = [];

/* All the dcsources in the system! */
var dcsources: Array<DCSource> = [];

/* All the dccurrents in the system! */
var dccurrents: Array<DCCurrent> = [];

/* All the acsources in the system! */
var acsources: Array<ACSource> = [];

/* All the accurrents in the system! */
var accurrents: Array<ACCurrent> = [];

/* All the squarewaves in the system! */
var squarewaves: Array<SquareWave> = [];

/* All the sawwaves in the system! */
var sawwaves: Array<SawWave> = [];

/* All the trianglewaves in the system! */
var trianglewaves: Array<TriangleWave> = [];

/* All the constants in the system! */
var constants: Array<Constant> = [];

/* All the wires in the system! */
var wires: Array<Wire> = [];

/* All the nets in the system! */
var nets: Array<Net> = [];

/* All the notes in the system! */
var notes: Array<Note> = [];

/* All the rails in the system! */
var rails: Array<Rail> = [];

/* All the voltmeters in the system! */
var voltmeters: Array<VoltMeter> = [];

/* All the ohmmeters in the system! */
var ohmmeters: Array<OhmMeter> = [];

/* All the ammeters in the system! */
var ammeters: Array<AmMeter> = [];

/* All the wattmeters in the system! */
var wattmeters: Array<WattMeter> = [];

/* All the fuses in the system! */
var fuses: Array<Fuse> = [];

/* All the spsts in the system! */
var spsts: Array<SinglePoleSingleThrow> = [];

/* All the spdts in the system! */
var spdts: Array<SinglePoleDoubleThrow> = [];

/* All the nots in the system! */
var nots: Array<NOTGate> = [];

/* All the diodes in the system! */
var diodes: Array<Diode> = [];

/* All the leds in the system! */
var leds: Array<LightEmittingDiode> = [];

/* All the zeners in the system! */
var zeners: Array<ZenerDiode> = [];

/* All the potentiometers in the system! */
var potentiometers: Array<Potentiometer> = [];

/* All the ands in the system! */
var ands: Array<ANDGate> = [];

/* All the ors in the system! */
var ors: Array<ORGate> = [];

/* All the nands in the system! */
var nands: Array<NANDGate> = [];

/* All the nors in the system! */
var nors: Array<NORGate> = [];

/* All the xors in the system! */
var xors: Array<XORGate> = [];

/* All the xnors in the system! */
var xnors: Array<XNORGate> = [];

/* All the dffs in the system! */
var dffs: Array<DFlipFlop> = [];

/* All the vsats in the system! */
var vsats: Array<VoltageSaturation> = [];

/* All the adders in the system! */
var adders: Array<Adder> = [];

/* All the subtractors in the system! */
var subtractors: Array<Subtractor> = [];

/* All the multipliers in the system! */
var multipliers: Array<Multiplier> = [];

/* All the dividers in the system! */
var dividers: Array<Divider> = [];

/* All the gains in the system! */
var gains: Array<GainBlock> = [];

/* All the absvals in the system! */
var absvals: Array<AbsoluteValue> = [];

/* All the vcsws in the system! */
var vcsws: Array<VoltageControlledSwitch> = [];

/* All the vcvss in the system! */
var vcvss: Array<VoltageControlledVoltageSource> = [];

/* All the vccss in the system! */
var vccss: Array<VoltageControlledCurrentSource> = [];

/* All the cccss in the system! */
var cccss: Array<CurrentControlledCurrentSource> = [];

/* All the ccvss in the system! */
var ccvss: Array<CurrentControlledVoltageSource> = [];

/* All the opamps in the system! */
var opamps: Array<OperationalAmplifier> = [];

/* All the nmosfets in the system! */
var nmosfets: Array<NChannelMOSFET> = [];

/* All the pmosfets in the system! */
var pmosfets: Array<PChannelMOSFET> = [];

/* All the npns in the system! */
var npns: Array<NPNBipolarJunctionTransistor> = [];

/* All the pnps in the system! */
var pnps: Array<PNPBipolarJunctionTransistor> = [];

/* All the adcs in the system! */
var adcs: Array<ADCModule> = [];

/* All the dacs in the system! */
var dacs: Array<DACModule> = [];

/* All the sandhs in the system! */
var sandhs: Array<SampleAndHold> = [];

/* All the pwms in the system! */
var pwms: Array<PulseWidthModulator> = [];

/* All the integrators in the system! */
var integrators: Array<IntegratorModule> = [];

/* All the differentiators in the system! */
var differentiators: Array<DifferentiatorModule> = [];

/* All the lowpasses in the system! */
var lowpasses: Array<LowPassFilter> = [];

/* All the highpasses in the system! */
var highpasses: Array<HighPassFilter> = [];

/* All the relays in the system! */
var relays: Array<Relay> = [];

/* All the pids in the system! */
var pids: Array<PIDModule> = [];

/* All the luts in the system! */
var luts: Array<LookUpTable> = [];

/* All the vcrs in the system! */
var vcrs: Array<VoltageControlledResistor> = [];

/* All the vccas in the system! */
var vccas: Array<VoltageControlledCapacitor> = [];

/* All the vcls in the system! */
var vcls: Array<VoltageControlledInductor> = [];

/* All the grts in the system! */
var grts: Array<GreaterThan> = [];

/* All the tptzs in the system! */
var tptzs: Array<TPTZModule> = [];

/* All the transformers in the system! */
var transformers: Array<Transformer> = [];

/* <!-- END AUTOMATICALLY GENERATED !--> */
/* A generic class to manage the on screen keyboard. */
var on_screen_keyboard: OnScreenKeyboard = new OnScreenKeyboard();
/* A toast for me matey! Argghhh */
var toast: Toast = new Toast();
/* The history manager of the whole system */
var history_manager: HistoryManager = new HistoryManager();
/* The options observer of the whole system */
var element_options: ElementOptions = global.NULL;
/* The system menu bar. */
var menu_bar: MenuBar = global.NULL;
/* The system bottom menu */
var bottom_menu: BottomMenu = global.NULL;
/* Window for changing the timestep. */
var time_step_window: TimeStepWindow = global.NULL;
/* Window for saving circuits */
var save_circuit_window: SaveCircuitWindow = global.NULL;
/* Window for saving images */
var save_image_window: SaveImageWindow = global.NULL;
/* Window for element options */
var element_options_window: ElementOptionsWindow = global.NULL;
/* Window for element options editing */
var element_options_edit_window: ElementOptionsEditWindow = global.NULL;
/* Window for setting a pre-determined amount of zoom */
var zoom_window: ZoomWindow = global.NULL;
/* Window for setting system options */
var settings_window: SettingsWindow = global.NULL;
/* Window for choosing yes or no */
var yes_no_window: YesNoWindow = global.NULL;
/* A class to manage all the wires that get generated */
var wire_manager: WireManager = new WireManager();
/* One of the helper classes for main */
var engine_functions: EngineFunctions = new EngineFunctions();
/* The nodes for the components to attach to! */
var nodes: Array<ElectricalNode> = [];
/* A helper class for managing the active nodes */
var node_manager: NodeManager = new NodeManager();
/* The graph window (graph interface) */
var graph_window: GraphWindow = global.NULL;
/* FPS must be changed to match constants in FPS_DIV_ARRAY */
var FPS: number = 30;
/* Average FPS Equation: 1/((3/(60.0/x) + 2/(60.0/y))/5) , 60/3 -> 20, 60/2 - 30 */
var FPS_DIV_ARRAY: Array<number> = [2, 2];
var FPS_COUNTER: number = 0;
var FPS_INDEX: number = 0;
var FPS_COMPARE: number = FPS_DIV_ARRAY[FPS_INDEX];
/* Divide down the FPS. */
var FPS_DIV: number = 0;
/* A general paint instance to draw things with. */
var general_paint: Paint = new Paint();
/* A link to the document title, so we can edit it. */
var webpage_document_title: HTMLElement = global.NULL;
var last_webpage_document_title: string = 'untitled';
/* prevent mouse events from happening out of order. */
var MOUSE_EVENT_LATCH: boolean = false;
/* #END_GLOBAL_EXTRACT# */
function load_app(): void {
	/* Found out which browser we are running on! */
	browser_detection();
	/* Initialize the system workspace */
	workspace = new Workspace(view_port.left, view_port.top, view_port.view_width, view_port.view_height, global.workspace_zoom_scale);
	/* Set the last surface width/height to 0, they'll get re-initialized on resizing anyways. */
	global.last_surface_width = 0;
	global.last_surface_height = 0;
	/* Create the drawing engine */
	let canvas: GraphicsEngine = new GraphicsEngine(virtual_surface.context);
	let FIFO_INDEX: number = 0;
	let touch: any = global.NULL;
	let TEMP_DRAW_SIGNAL: boolean = false;
	/* Used to calculate node spacing. */
	let NSX: number = 0;
	let NSY: number = 0;
	let MNSX: number = 0;
	let MNSY: number = 0;
	let NODE_LENGTH: number = 0;
	/* In case canvas is scaled inside an html element. If it is, then look at the commented code
  inside resize_canvas() to handle how these values should be re-calculated. */
	general_paint = new Paint();
	general_paint.set_paint_style(general_paint.style.FILL);
	general_paint.set_paint_cap(general_paint.cap.ROUND);
	general_paint.set_paint_join(general_paint.join.MITER);
	general_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
	if (global.MOBILE_MODE) {
		general_paint.set_color(global.GENERAL_WHITE_COLOR);
	} else {
		general_paint.set_color(global.GENERAL_BLACK_COLOR);
	}
	general_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
	general_paint.set_font(global.DEFAULT_FONT);
	general_paint.set_alpha(255);
	general_paint.set_paint_align(general_paint.align.LEFT);
	/* Inititalize the system. This is called at the end of this file.
  (After everything is initialized) */
	function initialize(step: number): void {
		if (step === 0) {
			resize_canvas();
			engine_functions.create_nodes(workspace.bounds);
			global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
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
			toast = new Toast();
			simulation_manager = new SimulationManager();
		} else if (step === 4) {
			register_cross_platform_listeners();
			if (!global.MOBILE_MODE) {
				window.addEventListener('keydown', key_down, false);
				window.addEventListener('keyup', key_up, false);
			}
			/* Handle window resizing. */
			window.addEventListener('resize', resize_canvas, false);
			if (!global.MOBILE_MODE) {
				window.addEventListener('dblclick', double_click, false);
				webpage_document_title = document.getElementById('title_text');
			}
			if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_STRETCH_WINDOW] === global.ON) {
				view_port.APPLY_SPREAD_FACTOR = true;
				global.FORCE_RESIZE_EVENT = true;
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
			if (global.BROWSER_FIREFOX) {
				/* For Firefox */
				surface.addEventListener('DOMMouseScroll', mouse_wheel, false);
			} else {
				/* mousewheel duplicates dblclick function */
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
		/* Wait until the system proccesses the information then over-write the data. */
		if (global.RESIZE_EVENT === false) {
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
		view_port.resize(CANVAS_ASPECT_RATIO, window.innerWidth, window.innerHeight);
		surface.width = window.innerWidth;
		surface.height = window.innerHeight;
		surface.style.width = solver_container.style.width;
		surface.style.height = solver_container.style.height;
		global.resize_w_factor = view_port.view_width / global.last_view_port_width;
		global.resize_h_factor = view_port.view_height / global.last_view_port_height;
		/* Resize all the text and stroke widths */
		if (global.MOBILE_MODE) {
			global.CANVAS_STROKE_WIDTH_BASE = 0.000775 * view_port.view_width;
			global.CANVAS_TEXT_SIZE_BASE = 0.000775 * view_port.view_width;
		} else {
			global.CANVAS_STROKE_WIDTH_BASE = 0.000725 * view_port.view_width;
			global.CANVAS_TEXT_SIZE_BASE = 0.000725 * view_port.view_width;
		}
		try {
			ctx.globalCompositeOperation = 'copy';
			ctx.imageSmoothingEnabled = false;
		} catch (e) {}
		global.CANVAS_STROKE_WIDTH_1 = global.CANVAS_STROKE_WIDTH_BASE * 2.25;
		global.CANVAS_STROKE_WIDTH_2 = global.CANVAS_STROKE_WIDTH_BASE * 2.65;
		global.CANVAS_STROKE_WIDTH_3 = global.CANVAS_STROKE_WIDTH_BASE * 9;
		global.CANVAS_STROKE_WIDTH_4 = global.CANVAS_STROKE_WIDTH_BASE * 16;
		global.CANVAS_STROKE_WIDTH_5 = global.CANVAS_STROKE_WIDTH_BASE * 21;
		global.CANVAS_STROKE_WIDTH_6 = global.CANVAS_STROKE_WIDTH_BASE * 43;
		global.CANVAS_TEXT_SIZE_1 = global.CANVAS_TEXT_SIZE_BASE * 2.25;
		global.CANVAS_TEXT_SIZE_2 = global.CANVAS_TEXT_SIZE_BASE * 2.65;
		global.CANVAS_TEXT_SIZE_3 = global.CANVAS_TEXT_SIZE_BASE * 9;
		global.CANVAS_TEXT_SIZE_4 = global.CANVAS_TEXT_SIZE_BASE * 16;
		global.CANVAS_TEXT_SIZE_5 = global.CANVAS_TEXT_SIZE_BASE * 21;
		global.CANVAS_TEXT_SIZE_6 = global.CANVAS_TEXT_SIZE_BASE * 43;
		global.SIGNAL_BUILD_ELEMENT = true;
		global.signal_build_counter = 0;
		virtual_surface.resize();
		global.RESIZE_EVENT = true;
		canvas.on_resize();
		surface.style.backfaceVisibility = 'hidden';
		if (surface.style.visibility === 'hidden') {
			surface.style.visibility = 'visible';
		}
	}
	function mouse_down(mouse_event: MouseEvent): void {
		if (global.system_initialization['completed']) {
			if (global.MOBILE_MODE === false) {
				global.mouse_x = mouse_event.clientX;
				global.mouse_y = mouse_event.clientY;
			} else {
				//@ts-ignore
				touch = mouse_event.touches[0];
				global.mouse_x = touch.clientX;
				global.mouse_y = touch.clientY;
			}
			if (bottom_menu.handle_file_explorer()) {
				if (!global.user_file_selected) {
					file_reader.click();
				} else {
					toast.set_text(language_manager.TRY_AGAIN[global.LANGUAGES[global.LANGUAGE_INDEX]]);
					toast.show();
				}
			} else {
				if (!MOUSE_EVENT_LATCH) {
					if (global.MOBILE_MODE) {
						if (global.mouse_x >= view_port.left && global.mouse_x <= view_port.right && global.mouse_y >= view_port.top && global.mouse_y <= view_port.bottom) {
							global.MOUSE_DOWN_EVENT = true;
							global.mouse_down_event_queue.push(mouse_event);
						}
					} else {
						global.MOUSE_DOWN_EVENT = true;
						global.mouse_down_event_queue.push(mouse_event);
					}
				}
			}
		}
		mouse_event.preventDefault();
		mouse_event.stopPropagation();
	}
	function mouse_move(mouse_event: MouseEvent): void {
		if (!global.MOUSE_MOVE_EVENT) {
			if (global.MOBILE_MODE) {
				if (global.mouse_x >= view_port.left && global.mouse_x <= view_port.right && global.mouse_y >= view_port.top && global.mouse_y <= view_port.bottom) {
					global.mouse_move_event = mouse_event;
					global.MOUSE_MOVE_EVENT = true;
				}
			} else {
				global.mouse_move_event = mouse_event;
				global.MOUSE_MOVE_EVENT = true;
			}
		}
		mouse_event.preventDefault();
		mouse_event.stopPropagation();
	}
	function mouse_up(mouse_event: MouseEvent): void {
		if (MOUSE_EVENT_LATCH) {
			if (global.MOBILE_MODE) {
				if (global.mouse_x >= view_port.left && global.mouse_x <= view_port.right && global.mouse_y >= view_port.top && global.mouse_y <= view_port.bottom) {
					global.MOUSE_UP_EVENT = true;
					global.mouse_up_event_queue.push(mouse_event);
				}
			} else {
				global.MOUSE_UP_EVENT = true;
				global.mouse_up_event_queue.push(mouse_event);
			}
		}
		mouse_event.preventDefault();
		mouse_event.stopPropagation();
	}
	function mouse_wheel(mouse_event: MouseEvent): void {
		/* Intentionally blocking. */
		if (!global.MOUSE_WHEEL_EVENT && !global.MOBILE_MODE) {
			global.MOUSE_WHEEL_EVENT = true;
			global.mouse_wheel_event_queue.push(mouse_event);
		}
		mouse_event.preventDefault();
		mouse_event.stopPropagation();
	}
	function double_click(mouse_event: MouseEvent): void {
		if (!global.MOBILE_MODE) {
			global.MOUSE_DOUBLE_CLICK_EVENT = true;
			global.mouse_double_click_event_queue.push(mouse_event);
		}
		mouse_event.preventDefault();
		mouse_event.stopPropagation();
	}
	function key_down(key_event: KeyboardEvent): void {
		global.KEY_DOWN_EVENT = true;
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
		global.KEY_UP_EVENT = true;
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
		/* Always resize the workspace first! */
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
			voltmeters[i].RESIZE_METER_TRACE = true;
		}
		for (var i: number = 0; i < ohmmeters.length; i++) {
			ohmmeters[i].RESIZE_METER_TRACE = true;
		}
		for (var i: number = 0; i < ammeters.length; i++) {
			ammeters[i].RESIZE_METER_TRACE = true;
		}
		for (var i: number = 0; i < wattmeters.length; i++) {
			wattmeters[i].RESIZE_METER_TRACE = true;
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
				global.RESIZE_EVENT ||
				global.MOUSE_DOWN_EVENT ||
				global.MOUSE_MOVE_EVENT ||
				global.MOUSE_UP_EVENT ||
				global.MOUSE_WHEEL_EVENT ||
				global.KEY_UP_EVENT ||
				global.KEY_DOWN_EVENT ||
				global.PICTURE_REQUEST ||
				global.FLAG_SIMULATING ||
				!workspace.DRAW_TO_SCREEN ||
				toast.draw_text ||
				!global.system_initialization['completed']
			);
		} else {
			return (
				global.RESIZE_EVENT ||
				global.MOUSE_DOWN_EVENT ||
				global.MOUSE_MOVE_EVENT ||
				global.MOUSE_UP_EVENT ||
				global.MOUSE_WHEEL_EVENT ||
				global.KEY_UP_EVENT ||
				global.KEY_DOWN_EVENT ||
				global.PICTURE_REQUEST ||
				global.FLAG_SIMULATING ||
				!global.system_initialization['completed']
			);
		}
	}
	function system_loop(): void {
		try {
			/* Optimizing the drawing frames for the canvas. */
			if (normal_draw_permissions()) {
				/* We make sure to draw only when we absolutely have to. There is also a blanket window
        		for when we de-latch the flag. */
				global.canvas_redraw_counter = 0;
				global.canvas_draw_event = true;
			}
			/* Handling the render / update portions of the code when the draw flag is set. */
			if (global.canvas_draw_event) {
				TEMP_DRAW_SIGNAL =
					!global.FLAG_SIMULATING ||
					global.RESIZE_EVENT ||
					global.MOUSE_DOWN_EVENT ||
					global.MOUSE_MOVE_EVENT ||
					global.MOUSE_UP_EVENT ||
					global.MOUSE_WHEEL_EVENT ||
					global.KEY_UP_EVENT ||
					global.KEY_DOWN_EVENT ||
					global.PICTURE_REQUEST ||
					!workspace.DRAW_TO_SCREEN ||
					toast.draw_text;
				global.last_selected = global.selected;
				update();
				if (global.last_selected !== global.selected) {
					wire_manager.reset_wire_builder();
				}
				if (global.FORCE_RESIZE_EVENT) {
					global.SIGNAL_BUILD_ELEMENT = true;
					global.signal_build_counter = 0;
					global.FORCE_RESIZE_EVENT = false;
					global.draw_block = true;
					resize_canvas();
				}
				FPS_DIV ^= 1;
				if (((FPS_DIV == 1 || TEMP_DRAW_SIGNAL) && global.FLAG_SIMULATING) || !global.FLAG_SIMULATING) {
					if (global.system_initialization['completed']) {
						if ((global.FLAG_SIMULATING && global.canvas_draw_request) || TEMP_DRAW_SIGNAL) {
							if (!global.ON_RESTORE_EVENT) {
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
				if (global.SIGNAL_BUILD_ELEMENT) {
					if (global.signal_build_counter++ >= global.SIGNAL_BUILD_COUNTER_MAX) {
						global.SIGNAL_BUILD_ELEMENT = false;
						global.signal_build_counter = 0;
					}
				}
				if (global.SIGNAL_WIRE_DELETED) {
					if (global.signal_wire_deleted_counter++ >= global.SIGNAL_WIRE_DELETED_COUNTER_MAX) {
						global.SIGNAL_WIRE_DELETED = false;
						global.signal_wire_deleted_counter = 0;
					}
				}
				/* Just incase this take more than one frame to complete. (Toast might be an example of this.) */
				if (global.canvas_redraw_counter++ > global.CANVAS_REDRAW_MAX) {
					global.canvas_redraw_counter = 0;
					global.canvas_draw_event = false;
				}
			}
		} catch (e) {
			if (!global.DEVELOPER_MODE && !global.MOBILE_MODE) {
				let post_data: string = e + '\r\n' + e.stack + '\r\n';
				let url: string = 'solver_errors.php?msg="' + post_data + '"';
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
	}
	function update(): void {
		if (global.system_initialization['completed']) {
			engine_functions.file_manager();
			/* Reset the component translating flag. */
			global.component_translating = false;
			if (global.MOBILE_MODE) {
				if (global.ON_RESTORE_EVENT) {
					global.SIGNAL_BUILD_ELEMENT = true;
					window.JsInterface.onRestore();
					global.ON_RESTORE_EVENT = false;
				}
			}
			/* Serializing the events so they're predictable in the order of which they are executed. */
			if (global.mouse_down_event_queue.length > 0 && !MOUSE_EVENT_LATCH) {
				FIFO_INDEX = global.mouse_down_event_queue.length - 1;
				global.mouse_down_event = global.mouse_down_event_queue[FIFO_INDEX];
				MOUSE_EVENT_LATCH = true;
				handle_mouse_down();
				global.mouse_down_event_queue.splice(FIFO_INDEX, 1);
				if (global.mouse_down_event_queue.length === 0) {
					global.MOUSE_DOWN_EVENT = false;
				}
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
			}
			if (global.MOUSE_MOVE_EVENT) {
				handle_mouse_move();
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
				global.MOUSE_MOVE_EVENT = false;
			}
			if (global.mouse_up_event_queue.length > 0 && MOUSE_EVENT_LATCH) {
				FIFO_INDEX = global.mouse_up_event_queue.length - 1;
				global.mouse_up_event = global.mouse_up_event_queue[FIFO_INDEX];
				MOUSE_EVENT_LATCH = false;
				handle_mouse_up();
				global.mouse_up_event_queue.splice(FIFO_INDEX, 1);
				if (global.mouse_up_event_queue.length === 0) {
					global.MOUSE_UP_EVENT = false;
					global.MOUSE_MOVE_EVENT = false;
					global.is_dragging = false;
				}
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
			}
			if (global.mouse_double_click_event_queue.length > 0) {
				FIFO_INDEX = global.mouse_double_click_event_queue.length - 1;
				global.mouse_double_click_event = global.mouse_double_click_event_queue[FIFO_INDEX];
				handle_double_click();
				global.mouse_double_click_event_queue.splice(FIFO_INDEX, 1);
				if (global.mouse_double_click_event_queue.length === 0) {
					global.MOUSE_DOUBLE_CLICK_EVENT = false;
				}
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
			}
			if (global.mouse_wheel_event_queue.length > 0) {
				FIFO_INDEX = global.mouse_wheel_event_queue.length - 1;
				global.mouse_wheel_event = global.mouse_wheel_event_queue[FIFO_INDEX];
				handle_mouse_wheel();
				global.mouse_wheel_event_queue.splice(FIFO_INDEX, 1);
				if (global.mouse_wheel_event_queue.length === 0) {
					global.MOUSE_WHEEL_EVENT = false;
				}
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
				global.is_dragging = false;
			}
			if (global.RESIZE_EVENT) {
				general_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
				if (global.MOBILE_MODE) {
					general_paint.set_color(global.GENERAL_WHITE_COLOR);
				} else {
					general_paint.set_color(global.GENERAL_BLACK_COLOR);
				}
				general_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
				global.mouse_x = 0;
				global.mouse_y = 0;
				reset_zoom();
				resize_components();
				global.RESIZE_EVENT = false;
			}
			if (global.key_down_event_queue.length > 0) {
				FIFO_INDEX = global.key_down_event_queue.length - 1;
				global.key_down_event = global.key_down_event_queue[FIFO_INDEX];
				handle_key_down();
				global.key_down_event_queue.splice(FIFO_INDEX, 1);
				if (global.key_down_event_queue.length === 0) {
					global.KEY_DOWN_EVENT = false;
				}
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
			}
			if (global.key_up_event_queue.length > 0) {
				FIFO_INDEX = global.key_up_event_queue.length - 1;
				global.key_up_event = global.key_up_event_queue[FIFO_INDEX];
				handle_key_up();
				global.key_down_event_queue = [];
				global.key_up_event_queue.splice(FIFO_INDEX, 1);
				if (global.key_up_event_queue.length === 0) {
					global.KEY_UP_EVENT = false;
				}
				global.canvas_draw_request = true;
				global.canvas_draw_request_counter = 0;
			}
			if (global.mouse_keyboard_lock) {
				global.mouse_keyboard_lock = false;
			}
			if (
				global.FLAG_IDLE &&
				!global.FLAG_SAVE_IMAGE &&
				!global.FLAG_SAVE_CIRCUIT &&
				!global.FLAG_ZOOM &&
				!global.FLAG_ELEMENT_OPTIONS &&
				!global.FLAG_ELEMENT_OPTIONS_EDIT &&
				!global.FLAG_SELECT_TIMESTEP &&
				!global.FLAG_SELECT_SETTINGS &&
				!global.FLAG_REMOVE_ALL
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
					global.ON_RESTORE_EVENT = true;
				}
				global.system_initialization['step'] = 0;
				global.system_initialization['completed'] = true;
				global.SIGNAL_BUILD_ELEMENT = true;
			}
		}
	}
	function refactor_sizes(): void {
		global.CANVAS_STROKE_WIDTH_1_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 2.25 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_2_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 2.65 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_3_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 9 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_4_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 16 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_5_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 21 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_6_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 43 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_1_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 2.25 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_2_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 2.65 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_3_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 9 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_4_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 16 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_5_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 21 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_6_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 43 * global.workspace_zoom_scale;
	}
	function draw(): void {
		refactor_sizes();
		engine_functions.image_manager();
		if (!global.PICTURE_REQUEST) {
			if (!global.MOBILE_MODE) {
				if (
					global.FLAG_IDLE &&
					!global.FLAG_SAVE_IMAGE &&
					!global.FLAG_SAVE_CIRCUIT &&
					!global.FLAG_ZOOM &&
					!global.FLAG_ELEMENT_OPTIONS &&
					!global.FLAG_ELEMENT_OPTIONS_EDIT &&
					!global.FLAG_SELECT_ELEMENT &&
					!global.FLAG_SELECT_TIMESTEP &&
					!global.FLAG_SELECT_SETTINGS &&
					!global.FLAG_REMOVE_ALL &&
					!global.FLAG_MENU_OPEN_DOWN &&
					!global.FLAG_GRAPH
				) {
					/* Reset the enveloping bounds (for multi select) */
					multi_select_manager.reset_enveloping_bounds();
				}
				if (global.SIGNAL_BUILD_ELEMENT) {
					NSX = 0.29375 * global.node_space_x;
					NSY = 0.29375 * global.node_space_y;
					MNSX = 1.25 * NSX;
					MNSY = 1.25 * NSY;
					NODE_LENGTH = nodes.length;
					for (var i: number = 0; i < NODE_LENGTH; i++) {
						nodes[i].resize(NSX, NSY, MNSX, MNSY);
						if (NODE_LENGTH - 1 - i === i + 1) {
							break;
						}
						nodes[NODE_LENGTH - 1 - i].resize(NSX, NSY, MNSX, MNSY);
					}
				}
				if (global.DEVELOPER_MODE) {
					NODE_LENGTH = nodes.length;
					for (var i: number = 0; i < NODE_LENGTH; i++) {
						nodes[i].draw(canvas);
						if (NODE_LENGTH - 1 - i === i + 1) {
							break;
						}
						nodes[NODE_LENGTH - 1 - i].draw(canvas);
					}
				}
				workspace.workspace_draw(canvas);
				engine_functions.draw_unselected_components(canvas);
				engine_functions.draw_wires(canvas);
				engine_functions.draw_selected_components(canvas);
				engine_functions.draw_meter_traces(canvas);
				if (global.WIRE_BUILDER['step'] > 0) {
					global.node_line_buffer = [];
					global.node_line_buffer_index = 0;
					NODE_LENGTH = nodes.length;
					for (var i: number = 0; i < NODE_LENGTH; i++) {
						nodes[i].draw(canvas);
						if (NODE_LENGTH - 1 - i === i + 1) {
							break;
						}
						nodes[NODE_LENGTH - 1 - i].draw(canvas);
					}
					if (global.WIRE_BUILDER['n1'] > -1 && global.WIRE_BUILDER['n1'] < global.settings.MAXNODES) {
						canvas.draw_line_buffer(global.node_line_buffer, nodes[global.WIRE_BUILDER['n1']].node_line_paint);
						canvas.draw_rect2(nodes[global.WIRE_BUILDER['n1']].bounds, nodes[global.WIRE_BUILDER['n1']].node_fill_paint);
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
					global.FLAG_IDLE &&
					!global.FLAG_SAVE_IMAGE &&
					!global.FLAG_SAVE_CIRCUIT &&
					!global.FLAG_ZOOM &&
					!global.FLAG_ELEMENT_OPTIONS &&
					!global.FLAG_ELEMENT_OPTIONS_EDIT &&
					!global.FLAG_SELECT_TIMESTEP &&
					!global.FLAG_SELECT_SETTINGS &&
					!global.FLAG_REMOVE_ALL
				) {
					workspace.workspace_draw(canvas);
					if (!global.FLAG_GRAPH) {
						if (global.SIGNAL_BUILD_ELEMENT) {
							NSX = 0.29375 * global.node_space_x;
							NSY = 0.29375 * global.node_space_y;
							MNSX = 1.25 * NSX;
							MNSY = 1.25 * NSY;
							NODE_LENGTH = nodes.length;
							for (var i: number = 0; i < NODE_LENGTH; i++) {
								nodes[i].resize(NSX, NSY, MNSX, MNSY);
								if (NODE_LENGTH - 1 - i === i + 1) {
									break;
								}
								nodes[NODE_LENGTH - 1 - i].resize(NSX, NSY, MNSX, MNSY);
							}
						}
						if (global.DEVELOPER_MODE) {
							NODE_LENGTH = nodes.length;
							for (var i: number = 0; i < NODE_LENGTH; i++) {
								nodes[i].draw(canvas);
								if (NODE_LENGTH - 1 - i === i + 1) {
									break;
								}
								nodes[NODE_LENGTH - 1 - i].draw(canvas);
							}
						}
						engine_functions.draw_unselected_components(canvas);
						engine_functions.draw_wires(canvas);
						engine_functions.draw_selected_components(canvas);
						engine_functions.draw_meter_traces(canvas);
						if (global.WIRE_BUILDER['step'] > 0) {
							global.node_line_buffer = [];
							global.node_line_buffer_index = 0;
							NODE_LENGTH = nodes.length;
							for (var i: number = 0; i < NODE_LENGTH; i++) {
								nodes[i].draw(canvas);
								if (NODE_LENGTH - 1 - i === i + 1) {
									break;
								}
								nodes[NODE_LENGTH - 1 - i].draw(canvas);
							}
							if (global.WIRE_BUILDER['n1'] > -1 && global.WIRE_BUILDER['n1'] < global.settings.MAXNODES) {
								canvas.draw_line_buffer(global.node_line_buffer, nodes[global.WIRE_BUILDER['n1']].node_line_paint);
								canvas.draw_rect2(nodes[global.WIRE_BUILDER['n1']].bounds, nodes[global.WIRE_BUILDER['n1']].node_fill_paint);
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
			global.mouse_x = global.mouse_down_event.clientX;
			global.mouse_y = global.mouse_down_event.clientY;
		} else {
			//@ts-expect-error
			touch = global.mouse_down_event.touches[0];
			global.mouse_x = touch.clientX;
			global.mouse_y = touch.clientY;
		}
		global.last_mouse_x = global.mouse_x;
		global.last_mouse_y = global.mouse_y;
		global.is_touching = true;
		global.mouse_down_x = global.mouse_x;
		global.mouse_down_y = global.mouse_y;
		global.translation_lock = true;
		if (!global.MOBILE_MODE) {
			/* Gecko (Firefox), WebKit (Safari/Chrome) & Opera */
			if ('which' in global.mouse_down_event) {
				global.is_right_click = global.mouse_down_event.which === 3;
			} else if ('button' in global.mouse_down_event) {
				/* IE, Opera */
				//@ts-expect-error
				global.is_right_click = global.mouse_down_event.button === 2;
			}
		} else {
			global.is_right_click = false;
		}
		if (!global.is_right_click) {
			/* Handle mouse down events for element options */
			element_options.mouse_down();
			/* Handle mouse down events for the bottom menu */
			bottom_menu.mouse_down();
			/* Handle mouse down events fro the time step window */
			time_step_window.mouse_down();
			/* Handle mouse down events for the save circuit window. */
			save_circuit_window.mouse_down();
			/* Handle mouse down events for the save image window */
			save_image_window.mouse_down();
			/* Handle mouse down events for the menu_bar */
			menu_bar.mouse_down();
			/* Handle mouse down events for the element options window. */
			element_options_window.mouse_down();
			/* Handle mouse down events for the element options edit window. */
			element_options_edit_window.mouse_down();
			graph_window.mouse_down();
			/* Handle mouse down events for the zoom window */
			zoom_window.mouse_down();
			/* Handle mouse down events for the settings window */
			settings_window.mouse_down();
			/* Handle mouse down events for the yes / no window. (It's for confirming if the user really wants to clear the board.)*/
			yes_no_window.mouse_down();
			multi_select_manager.mouse_down();
			on_screen_keyboard.mouse_down();
		}
		if (
			!global.FLAG_SAVE_IMAGE &&
			!global.FLAG_SAVE_CIRCUIT &&
			!global.FLAG_ZOOM &&
			!global.FLAG_ELEMENT_OPTIONS &&
			!global.FLAG_ELEMENT_OPTIONS_EDIT &&
			!global.FLAG_GRAPH &&
			!global.FLAG_SELECT_ELEMENT &&
			!global.FLAG_SELECT_TIMESTEP &&
			!global.FLAG_SELECT_SETTINGS &&
			!global.FLAG_REMOVE_ALL &&
			!global.FLAG_MENU_OPEN_DOWN
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
				/* Handle mouse down events for the wires in the system. */
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
	/**
	 * Handles mouse move events. All events are serialized in this application to make sure
	 * they occur in a deterministic way.
	 */
	function handle_mouse_move(): void {
		global.last_mouse_x = global.mouse_x;
		global.last_mouse_y = global.mouse_y;
		if (global.MOBILE_MODE === false) {
			global.mouse_x = global.mouse_move_event.clientX;
			global.mouse_y = global.mouse_move_event.clientY;
		} else {
			//@ts-expect-error
			touch = global.mouse_move_event.touches[0];
			global.mouse_x = touch.clientX;
			global.mouse_y = touch.clientY;
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
			!global.FLAG_SAVE_IMAGE &&
			!global.FLAG_SAVE_CIRCUIT &&
			!global.FLAG_ZOOM &&
			!global.FLAG_ELEMENT_OPTIONS &&
			!global.FLAG_ELEMENT_OPTIONS_EDIT &&
			!global.FLAG_GRAPH &&
			!global.FLAG_SELECT_ELEMENT &&
			!global.FLAG_SELECT_TIMESTEP &&
			!global.FLAG_SELECT_SETTINGS &&
			!global.FLAG_REMOVE_ALL
		) {
			if (global.FLAG_IDLE && !global.FLAG_SIMULATING) {
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
			global.mouse_x = global.mouse_up_event.clientX;
			global.mouse_y = global.mouse_up_event.clientY;
		} else {
			/* Mobile doesn't generate new touch points for mouse up. We shall utilize whatever mouse coordinates exist. I'm
      assuming if we got this far then we have some touch events atlesat! */
		}
		global.last_mouse_x = global.mouse_x;
		global.last_mouse_y = global.mouse_y;
		global.is_touching = false;
		global.is_dragging = false;
		global.temp_is_dragging = global.is_dragging;
		if (
			!global.FLAG_SAVE_IMAGE &&
			!global.FLAG_SAVE_CIRCUIT &&
			!global.FLAG_ZOOM &&
			!global.FLAG_ELEMENT_OPTIONS &&
			!global.FLAG_ELEMENT_OPTIONS_EDIT &&
			!global.FLAG_GRAPH &&
			!global.FLAG_SELECT_ELEMENT &&
			!global.FLAG_SELECT_TIMESTEP &&
			!global.FLAG_SELECT_SETTINGS &&
			!global.FLAG_REMOVE_ALL
		) {
			if (!global.component_touched && !global.is_right_click) {
				if (global.WIRE_BUILDER['n1'] > -1 && global.WIRE_BUILDER['n1'] < global.settings.MAXNODES) {
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
		if (global.SIGNAL_WIRE_CREATED) {
			global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			global.SIGNAL_WIRE_CREATED = false;
		}
		/* Handle menu_bar mouse up event. */
		let component_touched: boolean = global.component_touched;
		if (!global.component_touched) {
			global.component_touched = true;
		}
		menu_bar.mouse_up();
		/* Handle bottom_menu mouse up event. */
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
		global.SIGNAL_HISTORY_LOCK = false;
	}
	function handle_mouse_wheel(): void {
		global.mouse_x = global.mouse_wheel_event.clientX;
		global.mouse_y = global.mouse_wheel_event.clientY;
		if (
			!global.FLAG_SAVE_IMAGE &&
			!global.FLAG_SAVE_CIRCUIT &&
			!global.FLAG_ZOOM &&
			!global.FLAG_ELEMENT_OPTIONS &&
			!global.FLAG_ELEMENT_OPTIONS_EDIT &&
			!global.FLAG_GRAPH &&
			!global.FLAG_SELECT_ELEMENT &&
			!global.FLAG_SELECT_TIMESTEP &&
			!global.FLAG_SELECT_SETTINGS &&
			!global.FLAG_REMOVE_ALL &&
			!global.FLAG_MENU_OPEN_DOWN
		) {
			handle_zoom(global.mouse_wheel_event);
		}
		menu_bar.mouse_wheel();
	}
	function handle_double_click(): void {
		global.mouse_x = global.mouse_double_click_event.clientX;
		global.mouse_y = global.mouse_double_click_event.clientY;
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
		/* MUST BE LAST - So key events don't carry through to other windows it might open. */
		shortcut_manager.listen(global.key_down_event);
	}
	function handle_key_up(): void {
		multi_select_manager.key_up(global.key_up_event);
	}
	function handle_workspace_drag(): void {
		let sqrt: number = Math.round(global.settings.SQRT_MAXNODES * 0.75);
		let x_space: number = sqrt * global.node_space_x;
		let y_space: number = sqrt * global.node_space_y;
		/* Limit the travel in the -x direction */
		if (workspace.bounds.left + global.dx < view_port.left - x_space) {
			global.dx = view_port.left - x_space - workspace.bounds.left;
		}
		/* Limit the travel in the +x direction */
		if (workspace.bounds.right + global.dx > view_port.right + x_space) {
			global.dx = view_port.right + x_space - workspace.bounds.right;
		}
		/* Limit the travel in the +y direction */
		if (workspace.bounds.top + global.dy < view_port.top - y_space) {
			global.dy = view_port.top - y_space - workspace.bounds.top;
		}
		/* Limit the travel in the -y direction */
		if (workspace.bounds.bottom + global.dy > view_port.bottom + y_space) {
			global.dy = view_port.bottom + y_space - workspace.bounds.bottom;
		}
		workspace.workspace_translate_bounds(global.dx, global.dy);
		global.delta_x += global.dx;
		global.delta_y += global.dy;
	}
	/* Register web analytics */
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
			global.BROWSER_OPERA = true;
		} else if (navigator.userAgent.indexOf('Chrome') !== -1) {
			global.BROWSER_CHROME = true;
		} else if (navigator.userAgent.indexOf('Safari') !== -1) {
			global.BROWSER_SAFARI = true;
		} else if (navigator.userAgent.indexOf('Firefox') !== -1) {
			global.BROWSER_FIREFOX = true;
			//@ts-ignore
		} else if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true) {
			global.BROWSER_IE = true;
		}
	}
	function main(): void {
		throttle_loop();
		requestAnimationFrame(main);
	}
	function throttle_loop(): void {
		switch (++FPS_COUNTER) {
			case FPS_COMPARE:
				FPS_INDEX ^= 1;
				FPS_COMPARE = FPS_DIV_ARRAY[FPS_INDEX];
				FPS_COUNTER = 0;
				system_loop();
				break;
			default:
				break;
		}
	}
	start_system();
}
