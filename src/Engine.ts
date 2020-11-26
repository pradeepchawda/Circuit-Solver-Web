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
/* add the hashCode function for all strings. */
String.prototype.hashCode = function () {
  let hash: number = 0;
  let i = 0;
  let chr = '';
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr = this.charCodeAt(i);
    hash = (hash << 5) - hash + Number(chr);
    hash |= 0;
  }
  return hash;
};
/* Save a file for the user! */
function save_file(title, content) {
  let blob = new Blob([content], {
    type: 'text/plain;charset=utf-8'
  });
  saveAs(blob, title);
}
/* Save an image for the user! */
function save_image(title, canvas) {
  canvas.toBlob(function (blob) {
    saveAs(blob, title);
  });
}
/* Save an image for the user! */
function save_image_mobile(title, canvas) {
  canvas.toBlob(function (blob) {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      window.JsInterface.javascript_native_hook('push-image', title, reader.result);
    };
  });
}
/* Global state variable */
var global = new Global();
/* Create a global variable to access the "file_explorer" element in HTML. */
var file_reader = global.NULL;
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
function file_event(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.onload = function (e) {
    /* Grab the contents of the file. */
    let text: string = String(reader.result);
    /* Save the name of the file to global. */
    /* Remove the extension :3 */
    let title = input.files[0].name.split('.')[0];
    if (title.length > global.MAX_TEXT_LENGTH) {
      title = title.substring(0, global.MAX_TEXT_LENGTH) + '...';
    }
    global.USER_FILE.title = title;
    bottom_menu.resize_bottom_menu();
    /* Save the contents of the file to global. */
    global.USER_FILE.content = text;
    /* Enable a flag to dictate that a user selected a file. */
    global.USER_FILE_SELECTED = true;
    /* Restart the canvas drawing events. */
    global.CANVAS_DRAW_EVENT = true;
  };
  /* In case we run into an error, let's report it. */
  reader.onerror = function (err) {};
  /* Start the reader and wait for the results. */
  reader.readAsText(input.files[0]);
}
/* Handles any file events that take place. */
function file_event_mobile(title, data) {
  if (title.length > global.MAX_TEXT_LENGTH) {
    title = title.substring(0, global.MAX_TEXT_LENGTH) + '...';
  }
  global.USER_FILE.title = title;
  bottom_menu.resize_bottom_menu();
  /* Save the contents of the file to global. */
  global.USER_FILE.content = data.replace(language_manager.QUOTE_ESCAPE, "'");
}

function restore_system_options(index, value) {
  if (index === global.SYSTEM_OPTION_LANGUAGE) {
    for (var i = 0; i < global.LANGUAGES.length; i++) {
      if (value === global.LANGUAGES[i]) {
        global.LANGUAGE_INDEX = i;
      }
    }
  }
  global.SYSTEM_OPTIONS['values'][index] = value;
}

function restore_zoom_offset(zoom, delta_x, dx, x_offset, delta_y, dy, y_offset) {
  global.WORKSPACE_ZOOM_SCALE = Number(zoom);
  global.dx = Number(dx);
  global.dy = Number(dy);
  global.x_offset = Number(x_offset);
  global.y_offset = Number(y_offset);
  global.delta_x = Number(delta_x);
  global.delta_y = Number(delta_y);
  workspace.workspace_zoom();
  global.DRAW_BLOCK = true;
  global.SIGNAL_BUILD_ELEMENT = true;
}

function handle_file_loading() {
  /* Enable a flag to dictate that a user selected a file. */
  global.USER_FILE_SELECTED = true;
  /* Restart the canvas drawing events. */
  global.CANVAS_DRAW_EVENT = true;
  try {
    engine_functions.parse_elements(global.USER_FILE.content);
  } catch (error) {}
  global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
  global.DRAW_BLOCK = true;
  global.USER_FILE_SELECTED = false;
  MOUSE_EVENT_LATCH = false;
}
var solver_container = document.getElementById('solver');
/* The HTML canvas, changed to surface for my convenience. */
var surface = document.createElement('canvas');
/* Virtual Canvas to draw on */
/* Assign the surface an id */
surface.id = 'canvas';
surface.style.visibility = 'hidden';
surface.style.zIndex = '0';
surface.style.position = 'absolute';
/* Add the surface to the body of the html window. */
solver_container.appendChild(surface);
/* Get the 2d context of the surface (used for drawing)*/
var ctx = surface.getContext('2d');
/* A virtual surface */
var virtual_surface = new VirtualCanvas(1, 1, global.VIRTUAL_CANVAS_ID++);
/* Global Linear Algebra instance */
var linear_algebra = new LinearAlgebra();
/* Storage for all the different languages supported by Circuit Solver. */
var language_manager = new LanguageManager();
/* Manager for all the different shortcuts supported by Circuit Solver. */
var shortcut_manager = new ShortcutManager();
/* General class to handle all of the string formating in this application */
var string_operator = new StringOperator();
/* General class to handle multi-selecing elements. */
var multi_select_manager = new MultiSelectManager();
/* The aspect ratio for the view port */
var CANVAS_ASPECT_RATIO = 1.333;
if (global.MOBILE_MODE) {
  CANVAS_ASPECT_RATIO = 1.618;
}
/* The viewport we will be drawing within! */
var view_port = new Viewport(CANVAS_ASPECT_RATIO, 800, 800 / CANVAS_ASPECT_RATIO);
/* Global workspace */
var workspace = new Workspace(0, 0, 0, 0, global.WORKSPACE_ZOOM_SCALE);
/* A class to help handle simulations. It keeps track of all the things that are
necessary to be done for simulation (node assignment, element assignment, matrix
sizing, stamping, etc. ) */
var simulation_manager = global.NULL;
/* A manager to handle tracking of the scopes. */
var scope_manager = new ScopeManager();
/* Maticies for solving the system of equations generated by the components */
var matrix_a = linear_algebra.matrix(1, 1);
var matrix_z = linear_algebra.matrix(1, 1);
var matrix_x = linear_algebra.matrix(1, 1);
var matrix_x_copy = linear_algebra.matrix(1, 1);
/* #INSERT_GENERATE_CREATE_ELEMENT_INSTANCE# */
/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
/* All the resistors in the system! */
var resistors = [];
/* All the capacitors in the system! */
var capacitors = [];
/* All the inductors in the system! */
var inductors = [];
/* All the grounds in the system! */
var grounds = [];
/* All the dcsources in the system! */
var dcsources = [];
/* All the dccurrents in the system! */
var dccurrents = [];
/* All the acsources in the system! */
var acsources = [];
/* All the accurrents in the system! */
var accurrents = [];
/* All the squarewaves in the system! */
var squarewaves = [];
/* All the sawwaves in the system! */
var sawwaves = [];
/* All the trianglewaves in the system! */
var trianglewaves = [];
/* All the constants in the system! */
var constants = [];
/* All the wires in the system! */
var wires = [];
/* All the nets in the system! */
var nets = [];
/* All the notes in the system! */
var notes = [];
/* All the rails in the system! */
var rails = [];
/* All the voltmeters in the system! */
var voltmeters: Array<VoltMeter> = [];
/* All the ohmmeters in the system! */
var ohmmeters = [];
/* All the ammeters in the system! */
var ammeters = [];
/* All the wattmeters in the system! */
var wattmeters = [];
/* All the fuses in the system! */
var fuses = [];
/* All the spsts in the system! */
var spsts = [];
/* All the spdts in the system! */
var spdts = [];
/* All the nots in the system! */
var nots = [];
/* All the diodes in the system! */
var diodes = [];
/* All the leds in the system! */
var leds = [];
/* All the zeners in the system! */
var zeners = [];
/* All the potentiometers in the system! */
var potentiometers = [];
/* All the ands in the system! */
var ands = [];
/* All the ors in the system! */
var ors = [];
/* All the nands in the system! */
var nands = [];
/* All the nors in the system! */
var nors = [];
/* All the xors in the system! */
var xors = [];
/* All the xnors in the system! */
var xnors = [];
/* All the dffs in the system! */
var dffs = [];
/* All the vsats in the system! */
var vsats = [];
/* All the adders in the system! */
var adders = [];
/* All the subtractors in the system! */
var subtractors = [];
/* All the multipliers in the system! */
var multipliers = [];
/* All the dividers in the system! */
var dividers = [];
/* All the gains in the system! */
var gains = [];
/* All the absvals in the system! */
var absvals = [];
/* All the vcsws in the system! */
var vcsws = [];
/* All the vcvss in the system! */
var vcvss = [];
/* All the vccss in the system! */
var vccss = [];
/* All the cccss in the system! */
var cccss = [];
/* All the ccvss in the system! */
var ccvss = [];
/* All the opamps in the system! */
var opamps = [];
/* All the nmosfets in the system! */
var nmosfets = [];
/* All the pmosfets in the system! */
var pmosfets = [];
/* All the npns in the system! */
var npns = [];
/* All the pnps in the system! */
var pnps = [];
/* All the adcs in the system! */
var adcs = [];
/* All the dacs in the system! */
var dacs = [];
/* All the sandhs in the system! */
var sandhs = [];
/* All the pwms in the system! */
var pwms = [];
/* All the integrators in the system! */
var integrators = [];
/* All the differentiators in the system! */
var differentiators = [];
/* All the lowpasses in the system! */
var lowpasses = [];
/* All the highpasses in the system! */
var highpasses = [];
/* All the relays in the system! */
var relays = [];
/* All the pids in the system! */
var pids = [];
/* All the luts in the system! */
var luts = [];
/* All the vcrs in the system! */
var vcrs = [];
/* All the grts in the system! */
var grts = [];
/* All the tptzs in the system! */
var tptzs = [];
/* All the transformers in the system! */
var transformers = [];
/* <!-- END AUTOMATICALLY GENERATED !--> */
/* A generic class to manage the on screen keyboard. */
var on_screen_keyboard = new OnScreenKeyboard();
/* A toast for me matey! Argghhh */
var toast = new Toast();
/* The history manager of the whole system */
var history_manager = new HistoryManager();
/* The options observer of the whole system */
var element_options = global.NULL;
/* The system menu bar. */
var menu_bar = global.NULL;
/* The system bottom menu */
var bottom_menu = global.NULL;
/* Window for changing the timestep. */
var time_step_window = global.NULL;
/* Window for saving circuits */
var save_circuit_window = global.NULL;
/* Window for saving images */
var save_image_window = global.NULL;
/* Window for element options */
var element_options_window = global.NULL;
/* Window for element options editing */
var element_options_edit_window = global.NULL;
/* Window for setting a pre-determined amount of zoom */
var zoom_window = global.NULL;
/* Window for setting system options */
var settings_window = global.NULL;
/* Window for choosing yes or no */
var yes_no_window = global.NULL;
/* A class to manage all the wires that get generated */
var wire_manager = new WireManager();
/* One of the helper classes for main */
var engine_functions = new EngineFunctions();
/* The nodes for the components to attach to! */
var nodes = [];
/* A helper class for managing the active nodes */
var node_manager = new NodeManager();
/* The graph window (graph interface) */
var graph_window = global.NULL;
/* FPS must be changed to match constants in FPS_DIV_ARRAY */
var FPS = 30;
/* Average FPS Equation: 1/((3/(60.0/x) + 2/(60.0/y))/5) , 60/3 -> 20, 60/2 - 30 */
var FPS_DIV_ARRAY = [2, 2];
var FPS_COUNTER = 0;
var FPS_INDEX = 0;
var FPS_COMPARE = FPS_DIV_ARRAY[FPS_INDEX];
/* Divide down the FPS. */
var FPS_DIV = 0;
/* A general paint instance to draw things with. */
var general_paint = new Paint();
/* A link to the document title, so we can edit it. */
var webpage_document_title = global.NULL;
var last_webpage_document_title = 'untitled';
/* prevent mouse events from happening out of order. */
var MOUSE_EVENT_LATCH = false;
/* #END_GLOBAL_EXTRACT# */
function load_app() {
  /* Found out which browser we are running on! */
  browser_detection();
  /* Initialize the system workspace */
  workspace = new Workspace(view_port.left, view_port.top, view_port.view_width, view_port.view_height, global.WORKSPACE_ZOOM_SCALE);
  /* Set the last surface width/height to 0, they'll get re-initialized on resizing anyways. */
  global.last_surface_width = 0;
  global.last_surface_height = 0;
  /* Create the drawing engine */
  let canvas = new GraphicsEngine(virtual_surface.context);
  let FIFO_INDEX = 0;
  let touch = global.NULL;
  let met_max = -1;
  let TEMP_DRAW_SIGNAL: boolean = false;
  /* Used to calculate node spacing. */
  let NSX = 0;
  let NSY = 0;
  let MNSX = 0;
  let MNSY = 0;
  /* In case canvas is scaled inside an html element. If it is, then look at the commented code
  inside resize_canvas() to handle how these values should be re-calculated. */
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
  function initialize(step) {
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
    }
  }

  function register_cross_platform_listeners() {
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

  function start_system() {
    if (!global.MOBILE_MODE) {
      register();
    }
    main();
  }

  function resize_canvas() {
    /* Wait until the system proccesses the information then over-write the data. */
    if (global.RESIZE_EVENT === false) {
      global.last_view_port_right = view_port.right;
      global.last_view_port_bottom = view_port.bottom;
      global.last_view_port_width = view_port.view_width;
      global.last_view_port_height = view_port.view_height;
      global.last_surface_width = surface.width;
      global.last_surface_height = surface.height;
    }
    solver_container.style.width = global.PIXEL_TEMPLATE.replace('{VALUE}', String(window.innerWidth));
    solver_container.style.height = global.PIXEL_TEMPLATE.replace('{VALUE}', String(window.innerHeight));
    solver_container.style.background = 'black';
    view_port.resize(CANVAS_ASPECT_RATIO, window.innerWidth, window.innerHeight);
    surface.width = view_port.right;
    surface.height = view_port.bottom;
    global.RESIZE_W_FACTOR = view_port.view_width / global.last_view_port_width;
    global.RESIZE_H_FACTOR = view_port.view_height / global.last_view_port_height;
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
      ctx.mozImageSmoothingEnabled = false;
      ctx.oImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.msImageSmoothingEnabled = false;
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
    global.SIGNAL_BUILD_COUNTER = 0;
    virtual_surface.resize();
    global.RESIZE_EVENT = true;
    canvas.on_resize();
    surface.style.backfaceVisibility = 'hidden';
    if (surface.style.visibility === 'hidden') {
      surface.style.visibility = 'visible';
    }
  }

  function mouse_down(mouse_event) {
    if (global.SYSTEM_INITIALIZATION['completed']) {
      if (global.MOBILE_MODE === false) {
        global.mouse_x = mouse_event.clientX;
        global.mouse_y = mouse_event.clientY;
      } else {
        touch = mouse_event.touches[0];
        global.mouse_x = touch.clientX;
        global.mouse_y = touch.clientY;
      }
      if (bottom_menu.handle_file_explorer()) {
        if (!global.USER_FILE_SELECTED) {
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

  function mouse_move(mouse_event) {
    mouse_event.preventDefault();
    mouse_event.stopPropagation();
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
  }

  function mouse_up(mouse_event) {
    mouse_event.preventDefault();
    mouse_event.stopPropagation();
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
  }

  function mouse_wheel(mouse_event) {
    /* Intentionally blocking. */
    if (!global.MOUSE_WHEEL_EVENT && !global.MOBILE_MODE) {
      global.MOUSE_WHEEL_EVENT = true;
      global.mouse_wheel_event_queue.push(mouse_event);
    }
  }

  function double_click(mouse_event) {
    mouse_event.preventDefault();
    mouse_event.stopPropagation();
    if (!global.MOBILE_MODE) {
      global.MOUSE_DOUBLE_CLICK_EVENT = true;
      global.mouse_double_click_event_queue.push(mouse_event);
    }
  }

  function key_down(key_event) {
    key_event.preventDefault();
    global.KEY_DOWN_EVENT = true;
    global.key_down_event_queue.push({
      event: key_event,
      alt: key_event.getModifierState('Alt'),
      shift: key_event.getModifierState('Shift'),
      ctrl: key_event.getModifierState('Control'),
      caps: key_event.getModifierState('CapsLock')
    });
  }

  function key_up(key_event) {
    key_event.preventDefault();
    global.KEY_UP_EVENT = true;
    global.key_up_event_queue.push({
      event: key_event,
      alt: key_event.getModifierState('Alt'),
      shift: key_event.getModifierState('Shift'),
      ctrl: key_event.getModifierState('Control'),
      caps: key_event.getModifierState('CapsLock')
    });
  }

  function resize_components() {
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
    for (var i = 0; i < voltmeters.length; i++) {
      voltmeters[i].RESIZE_METER_TRACE = true;
    }
    for (var i = 0; i < ohmmeters.length; i++) {
      ohmmeters[i].RESIZE_METER_TRACE = true;
    }
    for (var i = 0; i < ammeters.length; i++) {
      ammeters[i].RESIZE_METER_TRACE = true;
    }
    for (var i = 0; i < wattmeters.length; i++) {
      wattmeters[i].RESIZE_METER_TRACE = true;
    }
    /* <!-- END AUTOMATICALLY GENERATED !--> */
  }

  function handle_zoom(mouse_event) {
    if (!global.focused) {
      global.x_offset = (global.mouse_x - global.delta_x) / global.WORKSPACE_ZOOM_SCALE;
      global.y_offset = (global.mouse_y - global.delta_y) / global.WORKSPACE_ZOOM_SCALE;
      if (mouse_event.wheelDelta < 0 || mouse_event.detail > 0) {
        if (global.WORKSPACE_ZOOM_SCALE > global.ZOOM_MIN) {
          global.WORKSPACE_ZOOM_SCALE /= global.ZOOM_FACTOR;
        }
      } else {
        if (global.WORKSPACE_ZOOM_SCALE < global.ZOOM_MAX) {
          global.WORKSPACE_ZOOM_SCALE *= global.ZOOM_FACTOR;
        }
      }
      global.delta_x = global.mouse_x - global.x_offset * global.WORKSPACE_ZOOM_SCALE;
      global.delta_y = global.mouse_y - global.y_offset * global.WORKSPACE_ZOOM_SCALE;
      workspace.workspace_zoom();
    }
  }

  function reset_zoom() {
    global.x_offset = 0;
    global.y_offset = 0;
    global.delta_x = workspace.bounds.left;
    global.delta_y = workspace.bounds.top;
  }

  function normal_draw_permissions() {
    if (global.SYSTEM_INITIALIZATION['completed']) {
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
        !global.SYSTEM_INITIALIZATION['completed']
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
        !global.SYSTEM_INITIALIZATION['completed']
      );
    }
  }

  function system_loop() {
    try {
      /* Optimizing the drawing frames for the canvas. */
      if (normal_draw_permissions()) {
        /* We make sure to draw only when we absolutely have to. There is also a blanket window
        for when we de-latch the flag. */
        global.CANVAS_REDRAW_COUNTER = 0;
        global.CANVAS_DRAW_EVENT = true;
      }
      /* Handling the render / update portions of the code when the draw flag is set. */
      if (global.CANVAS_DRAW_EVENT) {
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
        if (global.last_selected != global.selected) {
          wire_manager.reset_wire_builder();
        }
        if (global.FORCE_RESIZE_EVENT) {
          global.SIGNAL_BUILD_ELEMENT = true;
          global.SIGNAL_BUILD_COUNTER = 0;
          global.FORCE_RESIZE_EVENT = false;
          global.DRAW_BLOCK = true;
          resize_canvas();
        }
        FPS_DIV ^= 1;
        if (((FPS_DIV == 1 || TEMP_DRAW_SIGNAL) && global.FLAG_SIMULATING) || !global.FLAG_SIMULATING) {
          if (global.SYSTEM_INITIALIZATION['completed']) {
            if ((global.FLAG_SIMULATING && global.CANVAS_DRAW_REQUEST) || TEMP_DRAW_SIGNAL) {
              if (!global.ON_RESTORE_EVENT) {
                canvas.release();
                if (!global.DRAW_BLOCK) {
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
                canvas.clear_xywh(view_port.left, view_port.top, view_port.view_width, view_port.view_height);
                draw();
                if (global.DRAW_BLOCK) {
                  global.DRAW_BLOCK = false;
                }
              }
              if (global.CANVAS_DRAW_REQUEST) {
                global.CANVAS_DRAW_REQUEST_COUNTER++;
              }
              if (global.CANVAS_DRAW_REQUEST_COUNTER >= global.CANVAS_DRAW_REQUEST_COUNTER_MAX) {
                global.CANVAS_DRAW_REQUEST_COUNTER = 0;
                global.CANVAS_DRAW_REQUEST = false;
              }
            }
          }
        }
        if (global.SIGNAL_BUILD_ELEMENT) {
          global.SIGNAL_BUILD_COUNTER++;
          if (global.SIGNAL_BUILD_COUNTER >= global.SIGNAL_BUILD_COUNTER_MAX) {
            global.SIGNAL_BUILD_ELEMENT = false;
            global.SIGNAL_BUILD_COUNTER = 0;
          }
        }
        if (global.SIGNAL_WIRE_DELETED) {
          global.SIGNAL_WIRE_DELETED_COUNTER++;
          if (global.SIGNAL_WIRE_DELETED_COUNTER >= global.SIGNAL_WIRE_DELETED_COUNTER_MAX) {
            global.SIGNAL_WIRE_DELETED = false;
            global.SIGNAL_WIRE_DELETED_COUNTER = 0;
          }
        }
        /* Just incase this take more than one frame to complete. (Toast might be an example of this.) */
        global.CANVAS_REDRAW_COUNTER++;
        if (global.CANVAS_REDRAW_COUNTER > global.CANVAS_REDRAW_MAX) {
          global.CANVAS_REDRAW_COUNTER = 0;
          global.CANVAS_DRAW_EVENT = false;
        }
      }
    } catch (e) {
      if (!global.DEVELOPER_MODE && !global.MOBILE_MODE) {
        let post_data = e + '\r\n' + e.stack + '\r\n';
        let url = 'solver_errors.php?msg="' + post_data + '"';
        let method = 'POST';
        let should_be_async = true;
        let request = new XMLHttpRequest();
        request.onload = function () {
          let status = request.status;
          let data = request.responseText;
        };
        request.open(method, url, should_be_async);
        request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
        request.send(post_data);
      }
    }
  }

  function update() {
    if (global.SYSTEM_INITIALIZATION['completed']) {
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
      }
      if (global.MOUSE_MOVE_EVENT) {
        handle_mouse_move();
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
        }
      }
      if (global.mouse_double_click_event_queue.length > 0) {
        FIFO_INDEX = global.mouse_double_click_event_queue.length - 1;
        global.mouse_double_click_event = global.mouse_double_click_event_queue[FIFO_INDEX];
        handle_double_click();
        global.mouse_double_click_event_queue.splice(FIFO_INDEX, 1);
        if (global.mouse_double_click_event_queue.length === 0) {
          global.MOUSE_DOUBLE_CLICK_EVENT = false;
        }
      }
      if (global.mouse_wheel_event_queue.length > 0) {
        FIFO_INDEX = global.mouse_wheel_event_queue.length - 1;
        global.mouse_wheel_event = global.mouse_wheel_event_queue[FIFO_INDEX];
        handle_mouse_wheel();
        global.mouse_wheel_event_queue.splice(FIFO_INDEX, 1);
        if (global.mouse_wheel_event_queue.length === 0) {
          global.MOUSE_WHEEL_EVENT = false;
        }
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
      }
      if (global.MOUSE_KEYBOARD_LOCK) {
        global.MOUSE_KEYBOARD_LOCK = false;
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
        for (var i = 0; i < resistors.length; i++) {
          resistors[i].update();
        }
        for (var i = 0; i < capacitors.length; i++) {
          capacitors[i].update();
        }
        for (var i = 0; i < inductors.length; i++) {
          inductors[i].update();
        }
        for (var i = 0; i < grounds.length; i++) {
          grounds[i].update();
        }
        for (var i = 0; i < dcsources.length; i++) {
          dcsources[i].update();
        }
        for (var i = 0; i < dccurrents.length; i++) {
          dccurrents[i].update();
        }
        for (var i = 0; i < acsources.length; i++) {
          acsources[i].update();
        }
        for (var i = 0; i < accurrents.length; i++) {
          accurrents[i].update();
        }
        for (var i = 0; i < squarewaves.length; i++) {
          squarewaves[i].update();
        }
        for (var i = 0; i < sawwaves.length; i++) {
          sawwaves[i].update();
        }
        for (var i = 0; i < trianglewaves.length; i++) {
          trianglewaves[i].update();
        }
        for (var i = 0; i < constants.length; i++) {
          constants[i].update();
        }
        for (var i = 0; i < wires.length; i++) {
          wires[i].update();
        }
        for (var i = 0; i < nets.length; i++) {
          nets[i].update();
        }
        for (var i = 0; i < notes.length; i++) {
          notes[i].update();
        }
        for (var i = 0; i < rails.length; i++) {
          rails[i].update();
        }
        for (var i = 0; i < voltmeters.length; i++) {
          voltmeters[i].update();
        }
        for (var i = 0; i < ohmmeters.length; i++) {
          ohmmeters[i].update();
        }
        for (var i = 0; i < ammeters.length; i++) {
          ammeters[i].update();
        }
        for (var i = 0; i < wattmeters.length; i++) {
          wattmeters[i].update();
        }
        for (var i = 0; i < fuses.length; i++) {
          fuses[i].update();
        }
        for (var i = 0; i < spsts.length; i++) {
          spsts[i].update();
        }
        for (var i = 0; i < spdts.length; i++) {
          spdts[i].update();
        }
        for (var i = 0; i < nots.length; i++) {
          nots[i].update();
        }
        for (var i = 0; i < potentiometers.length; i++) {
          potentiometers[i].update();
        }
        for (var i = 0; i < ands.length; i++) {
          ands[i].update();
        }
        for (var i = 0; i < ors.length; i++) {
          ors[i].update();
        }
        for (var i = 0; i < nands.length; i++) {
          nands[i].update();
        }
        for (var i = 0; i < nors.length; i++) {
          nors[i].update();
        }
        for (var i = 0; i < xors.length; i++) {
          xors[i].update();
        }
        for (var i = 0; i < xnors.length; i++) {
          xnors[i].update();
        }
        for (var i = 0; i < dffs.length; i++) {
          dffs[i].update();
        }
        for (var i = 0; i < vsats.length; i++) {
          vsats[i].update();
        }
        for (var i = 0; i < adders.length; i++) {
          adders[i].update();
        }
        for (var i = 0; i < subtractors.length; i++) {
          subtractors[i].update();
        }
        for (var i = 0; i < multipliers.length; i++) {
          multipliers[i].update();
        }
        for (var i = 0; i < dividers.length; i++) {
          dividers[i].update();
        }
        for (var i = 0; i < gains.length; i++) {
          gains[i].update();
        }
        for (var i = 0; i < absvals.length; i++) {
          absvals[i].update();
        }
        for (var i = 0; i < vcsws.length; i++) {
          vcsws[i].update();
        }
        for (var i = 0; i < vcvss.length; i++) {
          vcvss[i].update();
        }
        for (var i = 0; i < vccss.length; i++) {
          vccss[i].update();
        }
        for (var i = 0; i < cccss.length; i++) {
          cccss[i].update();
        }
        for (var i = 0; i < ccvss.length; i++) {
          ccvss[i].update();
        }
        for (var i = 0; i < opamps.length; i++) {
          opamps[i].update();
        }
        for (var i = 0; i < adcs.length; i++) {
          adcs[i].update();
        }
        for (var i = 0; i < dacs.length; i++) {
          dacs[i].update();
        }
        for (var i = 0; i < sandhs.length; i++) {
          sandhs[i].update();
        }
        for (var i = 0; i < pwms.length; i++) {
          pwms[i].update();
        }
        for (var i = 0; i < integrators.length; i++) {
          integrators[i].update();
        }
        for (var i = 0; i < differentiators.length; i++) {
          differentiators[i].update();
        }
        for (var i = 0; i < lowpasses.length; i++) {
          lowpasses[i].update();
        }
        for (var i = 0; i < highpasses.length; i++) {
          highpasses[i].update();
        }
        for (var i = 0; i < relays.length; i++) {
          relays[i].update();
        }
        for (var i = 0; i < pids.length; i++) {
          pids[i].update();
        }
        for (var i = 0; i < luts.length; i++) {
          luts[i].update();
        }
        for (var i = 0; i < vcrs.length; i++) {
          vcrs[i].update();
        }
        for (var i = 0; i < grts.length; i++) {
          grts[i].update();
        }
        for (var i = 0; i < tptzs.length; i++) {
          tptzs[i].update();
        }
        for (var i = 0; i < transformers.length; i++) {
          transformers[i].update();
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
        menu_bar.update();
        bottom_menu.update();
        element_options.update();
        history_manager.watch();
        wire_manager.watch();
        if (!global.MOBILE_MODE) {
          if (last_webpage_document_title != global.USER_FILE.title) {
            webpage_document_title.innerHTML = global.USER_FILE.title;
            last_webpage_document_title = global.USER_FILE.title;
          }
        }
      }
    } else {
      initialize(global.SYSTEM_INITIALIZATION['step']);
      global.SYSTEM_INITIALIZATION['step']++;
      if (global.SYSTEM_INITIALIZATION['step'] >= global.SYSTEM_INITIALIZATION['max']) {
        if (global.MOBILE_MODE) {
          global.ON_RESTORE_EVENT = true;
        }
        global.SYSTEM_INITIALIZATION['step'] = 0;
        global.SYSTEM_INITIALIZATION['completed'] = true;
      }
    }
  }

  function refactor_sizes() {
    global.CANVAS_STROKE_WIDTH_1_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 2.25 * global.WORKSPACE_ZOOM_SCALE;
    global.CANVAS_STROKE_WIDTH_2_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 2.65 * global.WORKSPACE_ZOOM_SCALE;
    global.CANVAS_STROKE_WIDTH_3_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 9 * global.WORKSPACE_ZOOM_SCALE;
    global.CANVAS_STROKE_WIDTH_4_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 16 * global.WORKSPACE_ZOOM_SCALE;
    global.CANVAS_STROKE_WIDTH_5_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 21 * global.WORKSPACE_ZOOM_SCALE;
    global.CANVAS_STROKE_WIDTH_6_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 43 * global.WORKSPACE_ZOOM_SCALE;
    global.CANVAS_TEXT_SIZE_1_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 2.25 * global.WORKSPACE_ZOOM_SCALE;
    global.CANVAS_TEXT_SIZE_2_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 2.65 * global.WORKSPACE_ZOOM_SCALE;
    global.CANVAS_TEXT_SIZE_3_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 9 * global.WORKSPACE_ZOOM_SCALE;
    global.CANVAS_TEXT_SIZE_4_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 16 * global.WORKSPACE_ZOOM_SCALE;
    global.CANVAS_TEXT_SIZE_5_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 21 * global.WORKSPACE_ZOOM_SCALE;
    global.CANVAS_TEXT_SIZE_6_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 43 * global.WORKSPACE_ZOOM_SCALE;
  }

  function draw() {
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
          for (var i = 0; i < nodes.length; i++) {
            nodes[i].resize(NSX, NSY, MNSX, MNSY);
          }
        }
        if (global.DEVELOPER_MODE) {
          for (var i = 0; i < nodes.length; i++) {
            nodes[i].draw(canvas);
          }
        }
        workspace.workspace_draw(canvas);
        engine_functions.draw_unselected_components(canvas);
        engine_functions.draw_wires(canvas);
        engine_functions.draw_selected_components(canvas);
        engine_functions.draw_meter_traces(canvas);
        if (global.WIRE_BUILDER['step'] > 0) {
          global.NODE_LINE_BUFFER = [];
          global.NODE_LINE_BUFFER_INDEX = 0;
          for (var i = 0; i < nodes.length; i++) {
            nodes[i].draw(canvas);
          }
          if (global.WIRE_BUILDER['n1'] > -1 && global.WIRE_BUILDER['n1'] < global.settings.MAXNODES) {
            canvas.draw_line_buffer(global.NODE_LINE_BUFFER, nodes[global.WIRE_BUILDER['n1']].node_line_paint);
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
              for (var i = 0; i < nodes.length; i++) {
                nodes[i].resize(NSX, NSY, MNSX, MNSY);
              }
            }
            if (global.DEVELOPER_MODE) {
              for (var i = 0; i < nodes.length; i++) {
                nodes[i].draw(canvas);
              }
            }
            engine_functions.draw_unselected_components(canvas);
            engine_functions.draw_wires(canvas);
            engine_functions.draw_selected_components(canvas);
            engine_functions.draw_meter_traces(canvas);
            if (global.WIRE_BUILDER['step'] > 0) {
              global.NODE_LINE_BUFFER = [];
              global.NODE_LINE_BUFFER_INDEX = 0;
              for (var i = 0; i < nodes.length; i++) {
                nodes[i].draw(canvas);
              }
              if (global.WIRE_BUILDER['n1'] > -1 && global.WIRE_BUILDER['n1'] < global.settings.MAXNODES) {
                canvas.draw_line_buffer(global.NODE_LINE_BUFFER, nodes[global.WIRE_BUILDER['n1']].node_line_paint);
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

  function handle_mouse_down() {
    global.component_touched = false;
    if (global.MOBILE_MODE === false) {
      global.mouse_x = global.mouse_down_event.clientX;
      global.mouse_y = global.mouse_down_event.clientY;
    } else {
      touch = global.mouse_down_event.touches[0];
      global.mouse_x = touch.clientX;
      global.mouse_y = touch.clientY;
    }
    global.last_mouse_x = global.mouse_x;
    global.last_mouse_y = global.mouse_y;
    global.is_touching = true;
    global.mouse_down_event = global.mouse_down_event || window.event;
    global.mouse_down_x = global.mouse_x;
    global.mouse_down_y = global.mouse_y;
    global.TRANSLATION_LOCK = true;
    /* Gecko (Firefox), WebKit (Safari/Chrome) & Opera */
    if ('which' in global.mouse_down_event) {
      global.IS_RIGHT_CLICK = global.mouse_down_event.which === 3;
    } else if ('button' in global.mouse_down_event) {
      /* IE, Opera */
      global.IS_RIGHT_CLICK = global.mouse_down_event.button === 2;
    }
    if (!global.IS_RIGHT_CLICK) {
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
      if (!global.MOBILE_MODE) {
        multi_select_manager.mouse_down();
      }
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
        if (global.IS_RIGHT_CLICK) {
          global.IS_DRAGGING = true;
          global.TEMP_IS_DRAGGING = global.IS_DRAGGING;
        }
      }
      if (!global.IS_DRAGGING) {
        /* #INSERT_GENERATE_MOUSE_DOWN# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        for (var i = 0; i < resistors.length; i++) {
          resistors[i].mouse_down();
        }
        for (var i = 0; i < capacitors.length; i++) {
          capacitors[i].mouse_down();
        }
        for (var i = 0; i < inductors.length; i++) {
          inductors[i].mouse_down();
        }
        for (var i = 0; i < grounds.length; i++) {
          grounds[i].mouse_down();
        }
        for (var i = 0; i < dcsources.length; i++) {
          dcsources[i].mouse_down();
        }
        for (var i = 0; i < dccurrents.length; i++) {
          dccurrents[i].mouse_down();
        }
        for (var i = 0; i < acsources.length; i++) {
          acsources[i].mouse_down();
        }
        for (var i = 0; i < accurrents.length; i++) {
          accurrents[i].mouse_down();
        }
        for (var i = 0; i < squarewaves.length; i++) {
          squarewaves[i].mouse_down();
        }
        for (var i = 0; i < sawwaves.length; i++) {
          sawwaves[i].mouse_down();
        }
        for (var i = 0; i < trianglewaves.length; i++) {
          trianglewaves[i].mouse_down();
        }
        for (var i = 0; i < constants.length; i++) {
          constants[i].mouse_down();
        }
        for (var i = 0; i < nets.length; i++) {
          nets[i].mouse_down();
        }
        for (var i = 0; i < notes.length; i++) {
          notes[i].mouse_down();
        }
        for (var i = 0; i < rails.length; i++) {
          rails[i].mouse_down();
        }
        for (var i = 0; i < voltmeters.length; i++) {
          voltmeters[i].mouse_down();
        }
        for (var i = 0; i < ohmmeters.length; i++) {
          ohmmeters[i].mouse_down();
        }
        for (var i = 0; i < ammeters.length; i++) {
          ammeters[i].mouse_down();
        }
        for (var i = 0; i < wattmeters.length; i++) {
          wattmeters[i].mouse_down();
        }
        for (var i = 0; i < fuses.length; i++) {
          fuses[i].mouse_down();
        }
        for (var i = 0; i < spsts.length; i++) {
          spsts[i].mouse_down();
        }
        for (var i = 0; i < spdts.length; i++) {
          spdts[i].mouse_down();
        }
        for (var i = 0; i < nots.length; i++) {
          nots[i].mouse_down();
        }
        for (var i = 0; i < diodes.length; i++) {
          diodes[i].mouse_down();
        }
        for (var i = 0; i < leds.length; i++) {
          leds[i].mouse_down();
        }
        for (var i = 0; i < zeners.length; i++) {
          zeners[i].mouse_down();
        }
        for (var i = 0; i < potentiometers.length; i++) {
          potentiometers[i].mouse_down();
        }
        for (var i = 0; i < ands.length; i++) {
          ands[i].mouse_down();
        }
        for (var i = 0; i < ors.length; i++) {
          ors[i].mouse_down();
        }
        for (var i = 0; i < nands.length; i++) {
          nands[i].mouse_down();
        }
        for (var i = 0; i < nors.length; i++) {
          nors[i].mouse_down();
        }
        for (var i = 0; i < xors.length; i++) {
          xors[i].mouse_down();
        }
        for (var i = 0; i < xnors.length; i++) {
          xnors[i].mouse_down();
        }
        for (var i = 0; i < dffs.length; i++) {
          dffs[i].mouse_down();
        }
        for (var i = 0; i < vsats.length; i++) {
          vsats[i].mouse_down();
        }
        for (var i = 0; i < adders.length; i++) {
          adders[i].mouse_down();
        }
        for (var i = 0; i < subtractors.length; i++) {
          subtractors[i].mouse_down();
        }
        for (var i = 0; i < multipliers.length; i++) {
          multipliers[i].mouse_down();
        }
        for (var i = 0; i < dividers.length; i++) {
          dividers[i].mouse_down();
        }
        for (var i = 0; i < gains.length; i++) {
          gains[i].mouse_down();
        }
        for (var i = 0; i < absvals.length; i++) {
          absvals[i].mouse_down();
        }
        for (var i = 0; i < vcsws.length; i++) {
          vcsws[i].mouse_down();
        }
        for (var i = 0; i < vcvss.length; i++) {
          vcvss[i].mouse_down();
        }
        for (var i = 0; i < vccss.length; i++) {
          vccss[i].mouse_down();
        }
        for (var i = 0; i < cccss.length; i++) {
          cccss[i].mouse_down();
        }
        for (var i = 0; i < ccvss.length; i++) {
          ccvss[i].mouse_down();
        }
        for (var i = 0; i < opamps.length; i++) {
          opamps[i].mouse_down();
        }
        for (var i = 0; i < nmosfets.length; i++) {
          nmosfets[i].mouse_down();
        }
        for (var i = 0; i < pmosfets.length; i++) {
          pmosfets[i].mouse_down();
        }
        for (var i = 0; i < npns.length; i++) {
          npns[i].mouse_down();
        }
        for (var i = 0; i < pnps.length; i++) {
          pnps[i].mouse_down();
        }
        for (var i = 0; i < adcs.length; i++) {
          adcs[i].mouse_down();
        }
        for (var i = 0; i < dacs.length; i++) {
          dacs[i].mouse_down();
        }
        for (var i = 0; i < sandhs.length; i++) {
          sandhs[i].mouse_down();
        }
        for (var i = 0; i < pwms.length; i++) {
          pwms[i].mouse_down();
        }
        for (var i = 0; i < integrators.length; i++) {
          integrators[i].mouse_down();
        }
        for (var i = 0; i < differentiators.length; i++) {
          differentiators[i].mouse_down();
        }
        for (var i = 0; i < lowpasses.length; i++) {
          lowpasses[i].mouse_down();
        }
        for (var i = 0; i < highpasses.length; i++) {
          highpasses[i].mouse_down();
        }
        for (var i = 0; i < relays.length; i++) {
          relays[i].mouse_down();
        }
        for (var i = 0; i < pids.length; i++) {
          pids[i].mouse_down();
        }
        for (var i = 0; i < luts.length; i++) {
          luts[i].mouse_down();
        }
        for (var i = 0; i < vcrs.length; i++) {
          vcrs[i].mouse_down();
        }
        for (var i = 0; i < grts.length; i++) {
          grts[i].mouse_down();
        }
        for (var i = 0; i < tptzs.length; i++) {
          tptzs[i].mouse_down();
        }
        for (var i = 0; i < transformers.length; i++) {
          transformers[i].mouse_down();
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
        /* Handle mouse down events for the wires in the system. */
        for (var i = wires.length - 1; i > -1; i--) {
          wires[i].mouse_down();
        }
      }
      if (global.MOBILE_MODE === true) {
        if (global.component_touched === false) {
          global.IS_DRAGGING = true;
          global.TEMP_IS_DRAGGING = global.IS_DRAGGING;
          global.IS_RIGHT_CLICK = true;
        }
      }
    }
  }
  /**
   * Handles mouse move events. All events are serialized in this application to make sure
   * they occur in a deterministic way.
   */
  function handle_mouse_move() {
    global.last_mouse_x = global.mouse_x;
    global.last_mouse_y = global.mouse_y;
    if (global.MOBILE_MODE === false) {
      global.mouse_x = global.mouse_move_event.clientX;
      global.mouse_y = global.mouse_move_event.clientY;
    } else {
      touch = global.mouse_move_event.touches[0];
      global.mouse_x = touch.clientX;
      global.mouse_y = touch.clientY;
    }
    global.dx = -(global.last_mouse_x - global.mouse_x) * global.settings.TRANSLATION_SCALE;
    global.dy = -(global.last_mouse_y - global.mouse_y) * global.settings.TRANSLATION_SCALE;
    if (
      global.norm(global.mouse_down_x - global.mouse_x, global.mouse_down_y - global.mouse_y) > 0.5 * Math.min(global.node_space_x, global.node_space_y) &&
      global.TRANSLATION_LOCK
    ) {
      global.TRANSLATION_LOCK = false;
      global.IS_DRAGGING = global.TEMP_IS_DRAGGING;
    }
    if (global.TRANSLATION_LOCK) {
      global.IS_DRAGGING = false;
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
        for (var i = 0; i < resistors.length; i++) {
          resistors[i].mouse_move();
        }
        for (var i = 0; i < capacitors.length; i++) {
          capacitors[i].mouse_move();
        }
        for (var i = 0; i < inductors.length; i++) {
          inductors[i].mouse_move();
        }
        for (var i = 0; i < grounds.length; i++) {
          grounds[i].mouse_move();
        }
        for (var i = 0; i < dcsources.length; i++) {
          dcsources[i].mouse_move();
        }
        for (var i = 0; i < dccurrents.length; i++) {
          dccurrents[i].mouse_move();
        }
        for (var i = 0; i < acsources.length; i++) {
          acsources[i].mouse_move();
        }
        for (var i = 0; i < accurrents.length; i++) {
          accurrents[i].mouse_move();
        }
        for (var i = 0; i < squarewaves.length; i++) {
          squarewaves[i].mouse_move();
        }
        for (var i = 0; i < sawwaves.length; i++) {
          sawwaves[i].mouse_move();
        }
        for (var i = 0; i < trianglewaves.length; i++) {
          trianglewaves[i].mouse_move();
        }
        for (var i = 0; i < constants.length; i++) {
          constants[i].mouse_move();
        }
        for (var i = 0; i < nets.length; i++) {
          nets[i].mouse_move();
        }
        for (var i = 0; i < notes.length; i++) {
          notes[i].mouse_move();
        }
        for (var i = 0; i < rails.length; i++) {
          rails[i].mouse_move();
        }
        for (var i = 0; i < voltmeters.length; i++) {
          voltmeters[i].mouse_move();
        }
        for (var i = 0; i < ohmmeters.length; i++) {
          ohmmeters[i].mouse_move();
        }
        for (var i = 0; i < ammeters.length; i++) {
          ammeters[i].mouse_move();
        }
        for (var i = 0; i < wattmeters.length; i++) {
          wattmeters[i].mouse_move();
        }
        for (var i = 0; i < fuses.length; i++) {
          fuses[i].mouse_move();
        }
        for (var i = 0; i < spsts.length; i++) {
          spsts[i].mouse_move();
        }
        for (var i = 0; i < spdts.length; i++) {
          spdts[i].mouse_move();
        }
        for (var i = 0; i < nots.length; i++) {
          nots[i].mouse_move();
        }
        for (var i = 0; i < diodes.length; i++) {
          diodes[i].mouse_move();
        }
        for (var i = 0; i < leds.length; i++) {
          leds[i].mouse_move();
        }
        for (var i = 0; i < zeners.length; i++) {
          zeners[i].mouse_move();
        }
        for (var i = 0; i < potentiometers.length; i++) {
          potentiometers[i].mouse_move();
        }
        for (var i = 0; i < ands.length; i++) {
          ands[i].mouse_move();
        }
        for (var i = 0; i < ors.length; i++) {
          ors[i].mouse_move();
        }
        for (var i = 0; i < nands.length; i++) {
          nands[i].mouse_move();
        }
        for (var i = 0; i < nors.length; i++) {
          nors[i].mouse_move();
        }
        for (var i = 0; i < xors.length; i++) {
          xors[i].mouse_move();
        }
        for (var i = 0; i < xnors.length; i++) {
          xnors[i].mouse_move();
        }
        for (var i = 0; i < dffs.length; i++) {
          dffs[i].mouse_move();
        }
        for (var i = 0; i < vsats.length; i++) {
          vsats[i].mouse_move();
        }
        for (var i = 0; i < adders.length; i++) {
          adders[i].mouse_move();
        }
        for (var i = 0; i < subtractors.length; i++) {
          subtractors[i].mouse_move();
        }
        for (var i = 0; i < multipliers.length; i++) {
          multipliers[i].mouse_move();
        }
        for (var i = 0; i < dividers.length; i++) {
          dividers[i].mouse_move();
        }
        for (var i = 0; i < gains.length; i++) {
          gains[i].mouse_move();
        }
        for (var i = 0; i < absvals.length; i++) {
          absvals[i].mouse_move();
        }
        for (var i = 0; i < vcsws.length; i++) {
          vcsws[i].mouse_move();
        }
        for (var i = 0; i < vcvss.length; i++) {
          vcvss[i].mouse_move();
        }
        for (var i = 0; i < vccss.length; i++) {
          vccss[i].mouse_move();
        }
        for (var i = 0; i < cccss.length; i++) {
          cccss[i].mouse_move();
        }
        for (var i = 0; i < ccvss.length; i++) {
          ccvss[i].mouse_move();
        }
        for (var i = 0; i < opamps.length; i++) {
          opamps[i].mouse_move();
        }
        for (var i = 0; i < nmosfets.length; i++) {
          nmosfets[i].mouse_move();
        }
        for (var i = 0; i < pmosfets.length; i++) {
          pmosfets[i].mouse_move();
        }
        for (var i = 0; i < npns.length; i++) {
          npns[i].mouse_move();
        }
        for (var i = 0; i < pnps.length; i++) {
          pnps[i].mouse_move();
        }
        for (var i = 0; i < adcs.length; i++) {
          adcs[i].mouse_move();
        }
        for (var i = 0; i < dacs.length; i++) {
          dacs[i].mouse_move();
        }
        for (var i = 0; i < sandhs.length; i++) {
          sandhs[i].mouse_move();
        }
        for (var i = 0; i < pwms.length; i++) {
          pwms[i].mouse_move();
        }
        for (var i = 0; i < integrators.length; i++) {
          integrators[i].mouse_move();
        }
        for (var i = 0; i < differentiators.length; i++) {
          differentiators[i].mouse_move();
        }
        for (var i = 0; i < lowpasses.length; i++) {
          lowpasses[i].mouse_move();
        }
        for (var i = 0; i < highpasses.length; i++) {
          highpasses[i].mouse_move();
        }
        for (var i = 0; i < relays.length; i++) {
          relays[i].mouse_move();
        }
        for (var i = 0; i < pids.length; i++) {
          pids[i].mouse_move();
        }
        for (var i = 0; i < luts.length; i++) {
          luts[i].mouse_move();
        }
        for (var i = 0; i < vcrs.length; i++) {
          vcrs[i].mouse_move();
        }
        for (var i = 0; i < grts.length; i++) {
          grts[i].mouse_move();
        }
        for (var i = 0; i < tptzs.length; i++) {
          tptzs[i].mouse_move();
        }
        for (var i = 0; i < transformers.length; i++) {
          transformers[i].mouse_move();
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
      }
    }
    for (var i = wires.length - 1; i > -1; i--) {
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
    if (!global.MOBILE_MODE) {
      multi_select_manager.mouse_move();
    }
    if (global.IS_DRAGGING) {
      handle_workspace_drag();
    }
  }

  function handle_mouse_up() {
    let temp_transition_lock = global.TRANSLATION_LOCK;
    global.TRANSLATION_LOCK = true;
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
    global.IS_DRAGGING = false;
    global.TEMP_IS_DRAGGING = global.IS_DRAGGING;
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
      if (!global.component_touched && !global.IS_RIGHT_CLICK) {
        if (global.WIRE_BUILDER['n1'] > -1 && global.WIRE_BUILDER['n1'] < global.settings.MAXNODES) {
          wire_manager.reset_wire_builder();
        }
      }
      /* #INSERT_GENERATE_MOUSE_UP# */
      /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
      for (var i = 0; i < resistors.length; i++) {
        resistors[i].mouse_up();
      }
      for (var i = 0; i < capacitors.length; i++) {
        capacitors[i].mouse_up();
      }
      for (var i = 0; i < inductors.length; i++) {
        inductors[i].mouse_up();
      }
      for (var i = 0; i < grounds.length; i++) {
        grounds[i].mouse_up();
      }
      for (var i = 0; i < dcsources.length; i++) {
        dcsources[i].mouse_up();
      }
      for (var i = 0; i < dccurrents.length; i++) {
        dccurrents[i].mouse_up();
      }
      for (var i = 0; i < acsources.length; i++) {
        acsources[i].mouse_up();
      }
      for (var i = 0; i < accurrents.length; i++) {
        accurrents[i].mouse_up();
      }
      for (var i = 0; i < squarewaves.length; i++) {
        squarewaves[i].mouse_up();
      }
      for (var i = 0; i < sawwaves.length; i++) {
        sawwaves[i].mouse_up();
      }
      for (var i = 0; i < trianglewaves.length; i++) {
        trianglewaves[i].mouse_up();
      }
      for (var i = 0; i < constants.length; i++) {
        constants[i].mouse_up();
      }
      for (var i = 0; i < nets.length; i++) {
        nets[i].mouse_up();
      }
      for (var i = 0; i < notes.length; i++) {
        notes[i].mouse_up();
      }
      for (var i = 0; i < rails.length; i++) {
        rails[i].mouse_up();
      }
      for (var i = 0; i < voltmeters.length; i++) {
        voltmeters[i].mouse_up();
      }
      for (var i = 0; i < ohmmeters.length; i++) {
        ohmmeters[i].mouse_up();
      }
      for (var i = 0; i < ammeters.length; i++) {
        ammeters[i].mouse_up();
      }
      for (var i = 0; i < wattmeters.length; i++) {
        wattmeters[i].mouse_up();
      }
      for (var i = 0; i < fuses.length; i++) {
        fuses[i].mouse_up();
      }
      for (var i = 0; i < spsts.length; i++) {
        spsts[i].mouse_up();
      }
      for (var i = 0; i < spdts.length; i++) {
        spdts[i].mouse_up();
      }
      for (var i = 0; i < nots.length; i++) {
        nots[i].mouse_up();
      }
      for (var i = 0; i < diodes.length; i++) {
        diodes[i].mouse_up();
      }
      for (var i = 0; i < leds.length; i++) {
        leds[i].mouse_up();
      }
      for (var i = 0; i < zeners.length; i++) {
        zeners[i].mouse_up();
      }
      for (var i = 0; i < potentiometers.length; i++) {
        potentiometers[i].mouse_up();
      }
      for (var i = 0; i < ands.length; i++) {
        ands[i].mouse_up();
      }
      for (var i = 0; i < ors.length; i++) {
        ors[i].mouse_up();
      }
      for (var i = 0; i < nands.length; i++) {
        nands[i].mouse_up();
      }
      for (var i = 0; i < nors.length; i++) {
        nors[i].mouse_up();
      }
      for (var i = 0; i < xors.length; i++) {
        xors[i].mouse_up();
      }
      for (var i = 0; i < xnors.length; i++) {
        xnors[i].mouse_up();
      }
      for (var i = 0; i < dffs.length; i++) {
        dffs[i].mouse_up();
      }
      for (var i = 0; i < vsats.length; i++) {
        vsats[i].mouse_up();
      }
      for (var i = 0; i < adders.length; i++) {
        adders[i].mouse_up();
      }
      for (var i = 0; i < subtractors.length; i++) {
        subtractors[i].mouse_up();
      }
      for (var i = 0; i < multipliers.length; i++) {
        multipliers[i].mouse_up();
      }
      for (var i = 0; i < dividers.length; i++) {
        dividers[i].mouse_up();
      }
      for (var i = 0; i < gains.length; i++) {
        gains[i].mouse_up();
      }
      for (var i = 0; i < absvals.length; i++) {
        absvals[i].mouse_up();
      }
      for (var i = 0; i < vcsws.length; i++) {
        vcsws[i].mouse_up();
      }
      for (var i = 0; i < vcvss.length; i++) {
        vcvss[i].mouse_up();
      }
      for (var i = 0; i < vccss.length; i++) {
        vccss[i].mouse_up();
      }
      for (var i = 0; i < cccss.length; i++) {
        cccss[i].mouse_up();
      }
      for (var i = 0; i < ccvss.length; i++) {
        ccvss[i].mouse_up();
      }
      for (var i = 0; i < opamps.length; i++) {
        opamps[i].mouse_up();
      }
      for (var i = 0; i < nmosfets.length; i++) {
        nmosfets[i].mouse_up();
      }
      for (var i = 0; i < pmosfets.length; i++) {
        pmosfets[i].mouse_up();
      }
      for (var i = 0; i < npns.length; i++) {
        npns[i].mouse_up();
      }
      for (var i = 0; i < pnps.length; i++) {
        pnps[i].mouse_up();
      }
      for (var i = 0; i < adcs.length; i++) {
        adcs[i].mouse_up();
      }
      for (var i = 0; i < dacs.length; i++) {
        dacs[i].mouse_up();
      }
      for (var i = 0; i < sandhs.length; i++) {
        sandhs[i].mouse_up();
      }
      for (var i = 0; i < pwms.length; i++) {
        pwms[i].mouse_up();
      }
      for (var i = 0; i < integrators.length; i++) {
        integrators[i].mouse_up();
      }
      for (var i = 0; i < differentiators.length; i++) {
        differentiators[i].mouse_up();
      }
      for (var i = 0; i < lowpasses.length; i++) {
        lowpasses[i].mouse_up();
      }
      for (var i = 0; i < highpasses.length; i++) {
        highpasses[i].mouse_up();
      }
      for (var i = 0; i < relays.length; i++) {
        relays[i].mouse_up();
      }
      for (var i = 0; i < pids.length; i++) {
        pids[i].mouse_up();
      }
      for (var i = 0; i < luts.length; i++) {
        luts[i].mouse_up();
      }
      for (var i = 0; i < vcrs.length; i++) {
        vcrs[i].mouse_up();
      }
      for (var i = 0; i < grts.length; i++) {
        grts[i].mouse_up();
      }
      for (var i = 0; i < tptzs.length; i++) {
        tptzs[i].mouse_up();
      }
      for (var i = 0; i < transformers.length; i++) {
        transformers[i].mouse_up();
      }
      /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    for (var i = wires.length - 1; i > -1; i--) {
      wires[i].mouse_up();
    }
    if (global.SIGNAL_WIRE_CREATED) {
      global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
      global.SIGNAL_WIRE_CREATED = false;
    }
    /* Handle menu_bar mouse up event. */
    let component_touched = global.component_touched;
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
    if (!global.MOBILE_MODE) {
      multi_select_manager.mouse_up();
    }
    global.component_touched = component_touched;
    engine_functions.reset_selection(false);
    engine_functions.handle_nearest_neighbors(temp_transition_lock);
    global.SIGNAL_HISTORY_LOCK = false;
  }

  function handle_mouse_wheel() {
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

  function handle_double_click() {
    global.mouse_x = global.mouse_double_click_event.clientX;
    global.mouse_y = global.mouse_double_click_event.clientY;
    time_step_window.double_click(global.mouse_double_click_event);
    save_image_window.double_click(global.mouse_double_click_event);
    save_circuit_window.double_click(global.mouse_double_click_event);
    element_options_edit_window.double_click(global.mouse_double_click_event);
  }

  function handle_key_down() {
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
    if (!global.MOBILE_MODE) {
      multi_select_manager.key_down(global.key_down_event);
      /* MUST BE LAST - So key events don't carry through to other windows it might open. */
      shortcut_manager.listen(global.key_down_event);
    }
  }

  function handle_key_up() {
    if (!global.MOBILE_MODE) {
      multi_select_manager.key_up(global.key_up_event);
    }
  }

  function handle_workspace_drag() {
    let sqrt = Math.round(global.settings.SQRT_MAXNODES * 0.75);
    let x_space = sqrt * global.node_space_x;
    let y_space = sqrt * global.node_space_y;
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
  function register() {
    if (!global.DEVELOPER_MODE) {
      let post_data = 'pinged @ {' + global.get_time_stamp() + '}';
      let url = 'analytics.php?msg="' + post_data + '"';
      let method = 'POST';
      let should_be_async = true;
      let request = new XMLHttpRequest();
      request.onload = function () {
        let status = request.status;
        let data = request.responseText;
      };
      request.open(method, url, should_be_async);
      request.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
      request.send(post_data);
    }
  }

  function browser_detection() {
    if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) != -1) {
      global.BROWSER_OPERA = true;
    } else if (navigator.userAgent.indexOf('Chrome') != -1) {
      global.BROWSER_CHROME = true;
    } else if (navigator.userAgent.indexOf('Safari') != -1) {
      global.BROWSER_SAFARI = true;
    } else if (navigator.userAgent.indexOf('Firefox') != -1) {
      global.BROWSER_FIREFOX = true;
    } else if (navigator.userAgent.indexOf('MSIE') != -1 || !!document.documentMode === true) {
      global.BROWSER_IE = true;
    }
  }

  function main() {
    throttle_loop();
    requestAnimationFrame(main);
  }

  function throttle_loop() {
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
