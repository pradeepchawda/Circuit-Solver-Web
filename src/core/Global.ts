/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Global.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A global class to store global functions and constants.
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
class Global {
  public readonly NULL = null;
  public readonly MOBILE_MODE: boolean = false;
  public SYSTEM_INITIALIZATION: SYSTEM_INITIALIZATION_T = {
    step: 0,
    max: 5,
    completed: false
  };
  public readonly VERSION_TAG: string = 'BETA-1.0.93';
  /* The scale of the workspace. It's to be limited by ZOOM_MAX and ZOOM_MIN*/
  public WORKSPACE_ZOOM_SCALE: number = 2.5;
  /* The maximum amount of zoom the user may apply */
  public readonly ZOOM_MAX: number = 3.5;
  /* The minimum amount of zoom the user may apply */
  public readonly ZOOM_MIN: number = 1.0;
  public readonly ZERO_PT_FIVE: number = 0.5;
  public readonly ZERO: number = 0 >> 0;
  public NODE_LINE_BUFFER: Array<Array<number>> = [];
  public NODE_LINE_BUFFER_INDEX: number = 0;
  /* The incremental change in zoom, *= ZOOM_FACTOR or /= ZOOM_FACTOR */
  public ZOOM_FACTOR: number = 1.085;
  /* These are used a relative metric to know how much to change the view of the
    workspace when a zooming event takes place */
  public natural_width: number = 0;
  public natural_height: number = 0;
  /* User settings, very handy to make them global. */
  public settings: Settings = new Settings();
  /* Don't change the name of these guys...the obfuscator is referenced to their names.*/
  public DEVELOPER_MODE: boolean = false;
  public PRODUCTION_MODE: boolean = false;
  /* Generic Templates to avoid string concatenation. */
  public readonly ELEMENT_TAG_TEMPLATE: string = '{TAG}{ID}';
  public readonly ELEMENT_VAL_TEMPLATE: string = '{VAL}{UNIT}';
  public readonly DIVISION_TEXT_TEMPLATE: string = '{A} / {B}';
  public readonly PIXEL_TEMPLATE: string = '{VALUE}px';
  public readonly PNG_TEMPLATE: string = '{NAME}.png';
  /* To help with system settings. */
  public readonly ON: string = 'ON';
  public readonly OFF: string = 'OFF';
  /* Keeping track of the virtual canvas's we create. */
  public VIRTUAL_CANVAS_ID: number = 0;
  /* Constants for different elements in the application. */
  /* Meta data is reserved for storing user info when exporting / importing circuits */
  /* When we generate the output text file, it sits on the first portion of the file. */
  public readonly TYPE_META_DATA: number = -2;
  /* Using a counter to keep track of the size of elements. */
  public TYPE_COUNTER: number = 0;
  /* #INSERT_GENERATE_ELEMENT_TYPE# */
  /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
  public TYPE_RESISTOR: number = this.TYPE_COUNTER++;
  public TYPE_CAPACITOR: number = this.TYPE_COUNTER++;
  public TYPE_INDUCTOR: number = this.TYPE_COUNTER++;
  public TYPE_GROUND: number = this.TYPE_COUNTER++;
  public TYPE_DCSOURCE: number = this.TYPE_COUNTER++;
  public TYPE_DCCURRENT: number = this.TYPE_COUNTER++;
  public TYPE_ACSOURCE: number = this.TYPE_COUNTER++;
  public TYPE_ACCURRENT: number = this.TYPE_COUNTER++;
  public TYPE_SQUAREWAVE: number = this.TYPE_COUNTER++;
  public TYPE_SAW: number = this.TYPE_COUNTER++;
  public TYPE_TRI: number = this.TYPE_COUNTER++;
  public TYPE_CONSTANT: number = this.TYPE_COUNTER++;
  public TYPE_WIRE: number = this.TYPE_COUNTER++;
  public TYPE_NET: number = this.TYPE_COUNTER++;
  public TYPE_NOTE: number = this.TYPE_COUNTER++;
  public TYPE_RAIL: number = this.TYPE_COUNTER++;
  public TYPE_VOLTMETER: number = this.TYPE_COUNTER++;
  public TYPE_OHMMETER: number = this.TYPE_COUNTER++;
  public TYPE_AMMETER: number = this.TYPE_COUNTER++;
  public TYPE_WATTMETER: number = this.TYPE_COUNTER++;
  public TYPE_FUSE: number = this.TYPE_COUNTER++;
  public TYPE_SPST: number = this.TYPE_COUNTER++;
  public TYPE_SPDT: number = this.TYPE_COUNTER++;
  public TYPE_NOT: number = this.TYPE_COUNTER++;
  public TYPE_DIODE: number = this.TYPE_COUNTER++;
  public TYPE_LED: number = this.TYPE_COUNTER++;
  public TYPE_ZENER: number = this.TYPE_COUNTER++;
  public TYPE_POTENTIOMETER: number = this.TYPE_COUNTER++;
  public TYPE_AND: number = this.TYPE_COUNTER++;
  public TYPE_OR: number = this.TYPE_COUNTER++;
  public TYPE_NAND: number = this.TYPE_COUNTER++;
  public TYPE_NOR: number = this.TYPE_COUNTER++;
  public TYPE_XOR: number = this.TYPE_COUNTER++;
  public TYPE_XNOR: number = this.TYPE_COUNTER++;
  public TYPE_DFF: number = this.TYPE_COUNTER++;
  public TYPE_VSAT: number = this.TYPE_COUNTER++;
  public TYPE_ADD: number = this.TYPE_COUNTER++;
  public TYPE_SUB: number = this.TYPE_COUNTER++;
  public TYPE_MUL: number = this.TYPE_COUNTER++;
  public TYPE_DIV: number = this.TYPE_COUNTER++;
  public TYPE_GAIN: number = this.TYPE_COUNTER++;
  public TYPE_ABS: number = this.TYPE_COUNTER++;
  public TYPE_VCSW: number = this.TYPE_COUNTER++;
  public TYPE_VCVS: number = this.TYPE_COUNTER++;
  public TYPE_VCCS: number = this.TYPE_COUNTER++;
  public TYPE_CCCS: number = this.TYPE_COUNTER++;
  public TYPE_CCVS: number = this.TYPE_COUNTER++;
  public TYPE_OPAMP: number = this.TYPE_COUNTER++;
  public TYPE_NMOS: number = this.TYPE_COUNTER++;
  public TYPE_PMOS: number = this.TYPE_COUNTER++;
  public TYPE_NPN: number = this.TYPE_COUNTER++;
  public TYPE_PNP: number = this.TYPE_COUNTER++;
  public TYPE_ADC: number = this.TYPE_COUNTER++;
  public TYPE_DAC: number = this.TYPE_COUNTER++;
  public TYPE_SAH: number = this.TYPE_COUNTER++;
  public TYPE_PWM: number = this.TYPE_COUNTER++;
  public TYPE_INTEGRATOR: number = this.TYPE_COUNTER++;
  public TYPE_DIFFERENTIATOR: number = this.TYPE_COUNTER++;
  public TYPE_LPF: number = this.TYPE_COUNTER++;
  public TYPE_HPF: number = this.TYPE_COUNTER++;
  public TYPE_REL: number = this.TYPE_COUNTER++;
  public TYPE_PID: number = this.TYPE_COUNTER++;
  public TYPE_LUT: number = this.TYPE_COUNTER++;
  public TYPE_VCR: number = this.TYPE_COUNTER++;
  public TYPE_GRT: number = this.TYPE_COUNTER++;
  public TYPE_TPTZ: number = this.TYPE_COUNTER++;
  public TYPE_TRAN: number = this.TYPE_COUNTER++;
  /* <!-- END AUTOMATICALLY GENERATED !--> */
  /* Constants for the different amounts of pre-determined rotation */
  public readonly ROTATION_0: number = 0;
  public readonly ROTATION_90: number = 1;
  public readonly ROTATION_180: number = 2;
  public readonly ROTATION_270: number = 3;
  /* Constants for the different styles the wire can display */
  /* Each wire has a property for changing it's appearance. These are the different
    styles that can be applied to the wire.  */
  public readonly WIRE_STYLE_0: number = 0;
  public readonly WIRE_STYLE_1: number = 1;
  public readonly WIRE_STYLE_2: number = 2;
  public readonly WIRE_STYLE_3: number = 3;
  public readonly WIRE_STYLE_4: number = 4;
  /* Constants for the different flips, 0 = normal, 180 = flipped over y-axis */
  /* Some components like the OPAMPs and Transistors have the ability to be flipped. */
  public readonly FLIP_0: number = 0;
  public readonly FLIP_180: number = 1;
  /* A setting to help facillitate controlling one object at a time */
  /* Each object has access to this global variable. */
  public focused: boolean = false;
  public focused_id: number = this.NULL;
  public focused_type: number = this.NULL;
  public focused_bounds: RectF = this.NULL;
  public last_selected: boolean = false;
  /* A setting to help facillitate which component is selected */
  /* Each object can override the selected item if it becomes selected itself. This is
    so that there's only one item selected at a time. This will need to be tweaked for
    multi-select. */
  public selected: boolean = false;
  /* The identity of the selected element */
  public selected_id: number = this.NULL;
  /* The type of the selected element */
  public selected_type: number = -1;
  /* If the type of element is a wire, this field will not be null. */
  public selected_wire_style: number = this.NULL;
  /* The bounds of the selected item */
  public selected_bounds: RectF = this.NULL;
  /* The properties of the selected item. Each element has properties associated with it */
  public selected_properties = this.NULL;
  /* Selectios nearest neighbors */
  public SELECTION_NEAREST_NEIGHBORS = [];
  public NEAREST_NEIGHBOR_INDEX: number = 0;
  /* A general flag to determining if any of the elements are multi-selected. */
  public multi_selected: boolean = false;
  /* Used to copying / pasting elements. */
  public CLIPBOARD_TYPE: number = this.NULL;
  public CLIPBOARD_ROTATION: number = this.NULL;
  public CLIPBOARD_FLIP: number = this.NULL;
  public CLIPBOARD_PROPERTY = this.NULL;
  /* A variable to help coordinate multi-selection. */
  public component_translating: boolean = false;
  /* System Flags */
  /* These flags are to represent what state the appplication is in. The idea is to make
    them indicative of what functions are avaiable on what page and what elements need to be
    drawn. */
  /* We are observing the main application (No windows are up) */
  /* Do no chnage these variables directly, there is a function inside menu_bar that handles the
    changes (it does so while cleaning up the change in states.) */
  public FLAG_IDLE: boolean = true;
  /* The simulation button was hit and we are currently simulating. */
  public FLAG_SIMULATING: boolean = false;
  /* The user is trying to enter a name for the image they're trying to save, either that
    or they are cancelling the prompt. */
  public FLAG_SAVE_IMAGE: boolean = false;
  /* The user is trying to enter a name for the circuit they're trying to save, either that
    or they are cancelling the prompt. */
  public FLAG_SAVE_CIRCUIT: boolean = false;
  /* The zoom window should be up. */
  public FLAG_ZOOM: boolean = false;
  /* The element options "mini-menu" should be open on the right hand side of the application. */
  public FLAG_ELEMENT_OPTIONS: boolean = false;
  /* The component has to be options in order to have any of it's properties show up here.
    If the property element of the application is generated correctly, this should all be
    automatic */
  public FLAG_ELEMENT_OPTIONS_EDIT: boolean = false;
  /* The graph menu should be opened and displayed when this variable is true. */
  public FLAG_GRAPH: boolean = false;
  /* The user has the menu-bar dropped down and has the second drop down for selecting a new component. */
  public FLAG_SELECT_ELEMENT: boolean = false;
  /* The user is trying to select a new time-step */
  public FLAG_SELECT_TIMESTEP: boolean = false;
  /* The user is changing settings */
  public FLAG_SELECT_SETTINGS: boolean = false;
  /* The user would like to remove all the elements in the workspace at once. */
  public FLAG_REMOVE_ALL: boolean = false;
  /* The menu-bar first drop down should be down when this is changed to true. */
  public FLAG_MENU_OPEN: boolean = false;
  /* The menu-bar second drop down should be down when this is changed to true. */
  public FLAG_MENU_OPEN_DOWN: boolean = false;
  /* Special signal for adding elements :> */
  public SIGNAL_ADD_ELEMENT: boolean = false;
  /* Special signal for when a wire is deleted */
  public SIGNAL_WIRE_DELETED: boolean = false;
  /* Special signal for when a wire is created */
  public SIGNAL_WIRE_CREATED: boolean = false;
  /* Special signal for history-locks elements :> */
  public SIGNAL_HISTORY_LOCK: boolean = false;
  /* Global rendering flag */
  public SIGNAL_BUILD_ELEMENT: boolean = false;
  public SIGNAL_BUILD_COUNTER: number = 0;
  /* Intentionally 2x re-draw counter.*/
  public SIGNAL_BUILD_COUNTER_MAX: number = 3;
  /* Counts up to counter max and resets the signal wire deleted flag. */
  public SIGNAL_WIRE_DELETED_COUNTER: number = 0;
  public SIGNAL_WIRE_DELETED_COUNTER_MAX: number = 3;
  /* Flag to help coordinate when an element is touched */
  public component_touched: boolean = false;
  /* Some elements require the mouse to be locked out until a mouse-up event occurs. This is
    so that we don't have events propagating to other portions of the code. */
  public MOUSE_KEYBOARD_LOCK: boolean = false;
  public TRANSLATION_LOCK: boolean = true;
  /* Used for solving the matrix, If the matrix is found to be singluar, this flag will be set
    and the simulation will end throwing an sinular matrix fault. */
  public IS_SINGULAR: boolean = false;
  /* Storing mouse events in this template so they can be serialized */
  public mouse_down_event = this.NULL;
  public mouse_move_event = this.NULL;
  public mouse_up_event = this.NULL;
  public mouse_wheel_event = this.NULL;
  public mouse_double_click_event = this.NULL;
  /* Storing key events into queue's to prevent keystrokes from being missed. */
  public mouse_down_event_queue = [];
  public mouse_up_event_queue = [];
  public mouse_wheel_event_queue = [];
  public mouse_double_click_event_queue = [];
  /* Determine the web-browser! */
  public BROWSER_IE: boolean = false;
  public BROWSER_CHROME: boolean = false;
  public BROWSER_OPERA: boolean = false;
  public BROWSER_FIREFOX: boolean = false;
  public BROWSER_SAFARI: boolean = false;
  /* Text styles for the note element. */
  public readonly TEXT_STYLE_1: string = 'Style1';
  public readonly TEXT_STYLE_2: string = 'Style2';
  public readonly TEXT_STYLE_3: string = 'Style3';
  public readonly TEXT_STYLE_4: string = 'Style4';
  public readonly TEXT_STYLE_5: string = 'Style5';
  /* Storing key events in this template so they can be serialized */
  public key_down_event: KEY_EVENT_T = {
    event: null,
    alt: false,
    shift: false,
    ctrl: false,
    caps: false
  };
  public key_up_event: KEY_EVENT_T = {
    event: null,
    alt: false,
    shift: false,
    ctrl: false,
    caps: false
  };
  /* Storing key events into queue's to prevent keystrokes from being missed. */
  public key_down_event_queue: Array<KEY_EVENT_T> = [];
  public key_up_event_queue: Array<KEY_EVENT_T> = [];
  public mouse_down_x: number = 0;
  public mouse_down_y: number = 0;
  /* Stores the last mouse event when a new one comes in, its used to calculate dx and dy for
    the mouse movements.  */
  public last_mouse_x: number = 0;
  public last_mouse_y: number = 0;
  /* The difference between the current mouse coordinates and the last coordinates recorded. */
  public dx: number = 0;
  public dy: number = 0;
  /* Stores the location of mouse events this is used in mouse_move, mouse_down, mouse_up, handle_zoom, etc. */
  public mouse_x: number = 0;
  public mouse_y: number = 0;
  /* A flag to indicate when a mouse click event occurs. */
  public is_touching: boolean = false;
  /* A flag to indicate when a dragging event occurs. This is only set if IS_RIGHT_CLICK is true. */
  public IS_DRAGGING: boolean = false;
  public TEMP_IS_DRAGGING: boolean = false;
  /* A flag to indicate when the user performs a right click */
  public IS_RIGHT_CLICK: boolean = false;
  /* Used to calculate the shift in when the zoom-to-point logic starts, this essenntially is the left and top of the workspace view */
  public delta_x: number = 0;
  public delta_y: number = 0;
  /* Used for zoom to point, its a relative */
  public x_offset: number = 0;
  public y_offset: number = 0;
  /* The node-spacing in the x-direction */
  public node_space_x: number = 0;
  /* The node-spacing in the y-direction */
  public node_space_y: number = 0;
  /* The last surface width, this is used for 1:1 resizing */
  public last_surface_width: number = 0;
  /* The last surface height, this is used for 1:1 resizing */
  public last_surface_height: number = 0;
  /* The last view port width, this is used for 1:1 resizing */
  public last_view_port_width: number = 0;
  /* The last view port height, this is used for 1:1 resizing */
  public last_view_port_height: number = 0;
  public last_view_port_right: number = 0;
  public last_view_port_bottom: number = 0;
  /* Used to determine which wire point is associated to an elements nodes. */
  public ANCHOR_POINT: ANCHOR_POINT_T = {
    p1: 0,
    p2: 1,
    p3: 2,
    p4: 3
  };
  /* Store the pre-divided SI units to save some computation time. */
  public SI_UNIT_ARRAY: Array<number> = [1 / 1e21, 1 / 1e18, 1 / 1e15, 1 / 1e12, 1 / 1e9, 1 / 1e6, 1 / 1e3, 1, 1 / 1e-3, 1 / 1e-6, 1 / 1e-9, 1 / 1e-12, 1 / 1e-15, 1 / 1e-18, 1 / 1e-21];
  /* Cache the thresholds.. */
  public SI_UNIT_THRESHOLD_ARRAY: Array<number> = [
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
  public SI_UNIT_ABBREVIATION: Array<string> = ['Z', 'E', 'P', 'T', 'G', 'M', 'k', '', 'm', 'u', 'n', 'p', 'f', 'a', 'z'];
  /* To facilitate the generation of new wires. */
  public WIRE_BUILDER: WIRE_BUILDER_T = {
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
  /* Accessing the limits of each variable in the element properties structures below.*/
  public readonly PROPERTY_LIMIT_MIN: number = 0;
  public readonly PROPERTY_LIMIT_MAX: number = 1;
  /* A builder to help create new wires. */
  public readonly WIRE_REFERENCE: WIRE_REFERENCE_T = {
    wire_id: -1,
    anchor_point: -1,
    linkage: -1
  };
  /* Structure for saving meta data details */
  public readonly PROPERTY_META_DATA: PROPERTY_META_DATA_T = {
    company: 'phasorsystems',
    version: this.VERSION_TAG,
    date: ''
  };
  /* Base structure for resistor properties */
  public readonly PROPERTY_RESISTOR: PROPERTY_RESISTOR_T = {
    Resistance: 1.0e3,
    tag: 'R',
    units: 'Ω',
    options: ['Resistance'],
    options_units: ['Ω'],
    option_limits: {
      Resistance: [this.settings.WIRE_RESISTANCE, this.settings.R_MAX * 0.5]
    }
  };
  /* Base structure for SPST properties */
  public readonly PROPERTY_SPST: PROPERTY_SPST_T = {
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
  /* Base structure for NOT properties */
  public readonly PROPERTY_NOT: PROPERTY_NOT_T = {
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
  /* Base structure for diode properties */
  public readonly PROPERTY_DIODE: PROPERTY_DIODE_T = {
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
  /* Base structure for led properties */
  public readonly PROPERTY_LED: PROPERTY_LED_T = {
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
  /* Base structure for zener properties */
  public readonly PROPERTY_ZENER: PROPERTY_ZENER_T = {
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
  /* Base structure for voltmeter properties */
  public readonly PROPERTY_VOLTMETER: PROPERTY_VOLTMETER_T = {
    Voltage: 0,
    tag: 'VM',
    units: 'V',
    options: [''],
    options_units: [''],
    option_limits: {}
  };
  /* Base structure for voltmeter properties */
  public readonly PROPERTY_WATTMETER: PROPERTY_WATTMETER_T = {
    Wattage: 0,
    'Test Voltage': 1e-9,
    tag: 'WM',
    units: 'W',
    options: [''],
    options_units: [''],
    option_limits: {}
  };
  /* Base structure for ammeter properties */
  public readonly PROPERTY_AMMETER: PROPERTY_AMMETER_T = {
    Current: 0,
    'Test Voltage': 1e-9,
    tag: 'AM',
    units: 'A',
    options: [''],
    options_units: [''],
    option_limits: {}
  };
  /* Base structure for ohmmeter properties */
  public readonly PROPERTY_OHMMETER: PROPERTY_OHMMETER_T = {
    'Sensed Resistance': 0,
    'Test Voltage': 1e-9,
    tag: 'OM',
    units: 'Ω',
    options: [''],
    options_units: [''],
    option_limits: {}
  };
  /* Base structure for resistor properties */
  public readonly PROPERTY_WIRE: PROPERTY_WIRE_T = {
    tag: 'W',
    units: 'Ω',
    options: [''],
    options_units: [''],
    option_limits: {}
  };
  /* Base structure for dc source properties */
  public readonly PROPERTY_DCSOURCE: PROPERTY_DCSOURCE_T = {
    Voltage: 12,
    tag: 'DC',
    units: 'V',
    options: ['Voltage'],
    options_units: ['V'],
    option_limits: {
      Voltage: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
    }
  };
  /* Base structure for ac source properties */
  public readonly PROPERTY_ACSOURCE: PROPERTY_ACSOURCE_T = {
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
  /* Base structure for square wave source properties */
  public readonly PROPERTY_SQUAREWAVE: PROPERTY_SQUAREWAVE_T = {
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
  /* Base structure for ac source properties */
  public readonly PROPERTY_ACCURRENT: PROPERTY_ACCURRENT_T = {
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
  /* Base structure for dc current properties */
  public readonly PROPERTY_DCCURRENT: PROPERTY_DCCURRENT_T = {
    Current: 12,
    tag: 'DCC',
    units: 'A',
    options: ['Current'],
    options_units: ['A'],
    option_limits: {
      Current: [this.settings.MIN_CURRENT, this.settings.MAX_CURRENT]
    }
  };
  /* Base structure for capacitor properties */
  public readonly PROPERTY_CAPACITOR: PROPERTY_CAPACITOR_T = {
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
  /* Base structure for inductor properties */
  public readonly PROPERTY_INDUCTOR: PROPERTY_INDUCTOR_T = {
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
  /* Base structure for ground properties */
  public readonly PROPERTY_GROUND: PROPERTY_GROUND_T = {
    tag: 'G',
    units: ''
  };
  /* Base structure for net properties */
  public readonly PROPERTY_NET: PROPERTY_NET_T = {
    Name: 'Net',
    tag: 'N',
    'Show Name': this.ON,
    units: '',
    options: ['Name', 'Show Name'],
    options_units: ['', ''],
    /* This element doesn't have one! */
    option_limits: {
      Name: [-1, 1]
    }
  };
  /* Base structure for constant properties */
  public readonly PROPERTY_CONSTANT: PROPERTY_CONSTANT_T = {
    Voltage: 12,
    tag: 'CV',
    units: 'V',
    options: ['Voltage'],
    options_units: ['V'],
    option_limits: {
      Voltage: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
    }
  };
  /* Base structure for potentiometer properties */
  public readonly PROPERTY_POTENTIOMETER: PROPERTY_POTENTIOMETER_T = {
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
  /* Base structure for and properties */
  public readonly PROPERTY_AND: PROPERTY_AND_T = {
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
  /* Base structure for or properties */
  public readonly PROPERTY_OR: PROPERTY_OR_T = {
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
  /* Base structure for nand properties */
  public readonly PROPERTY_NAND: PROPERTY_NAND_T = {
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
  /* Base structure for nor properties */
  public readonly PROPERTY_NOR: PROPERTY_NOR_T = {
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
  /* Base structure for xor properties */
  public readonly PROPERTY_XOR: PROPERTY_XOR_T = {
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
  /* Base structure for xnor properties */
  public readonly PROPERTY_XNOR: PROPERTY_XNOR_T = {
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
  /* Base structure for vcsw properties */
  public readonly PROPERTY_VCSW: PROPERTY_VCSW_T = {
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
  /* Base structure for vcr properties */
  public readonly PROPERTY_VCR: PROPERTY_VCR_T = {
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
  /* Base structure for vcvs properties */
  public readonly PROPERTY_VCVS: PROPERTY_VCVS_T = {
    Gain: 1,
    tag: 'VCVS',
    units: 'V/V',
    options: ['Gain'],
    options_units: ['V/V'],
    option_limits: {
      Gain: [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
    }
  };
  /* Base structure for vccs properties */
  public readonly PROPERTY_VCCS: PROPERTY_VCCS_T = {
    Gain: 1,
    tag: 'VCCS',
    units: 'Mho',
    options: ['Gain'],
    options_units: ['Mho'],
    option_limits: {
      Gain: [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
    }
  };
  /* Base structure for cccs properties */
  public readonly PROPERTY_CCCS: PROPERTY_CCCS_T = {
    Gain: 1,
    tag: 'CCCS',
    units: 'A/A',
    options: ['Gain'],
    options_units: ['A/A'],
    option_limits: {
      Gain: [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
    }
  };
  /* Base structure for ccvs properties */
  public readonly PROPERTY_CCVS: PROPERTY_CCVS_T = {
    Gain: 1,
    tag: 'CCVS',
    units: 'Ohm',
    options: ['Gain'],
    options_units: ['Ohm'],
    option_limits: {
      Gain: [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
    }
  };
  /* Base structure for SPST properties */
  public readonly PROPERTY_SPDT: PROPERTY_SPDT_T = {
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
  /* Base structure for opamp properties */
  public readonly PROPERTY_OPAMP: PROPERTY_OPAMP_T = {
    tag: 'OP',
    units: '',
    options: [''],
    options_units: [''],
    option_limits: {}
  };
  /* Base structure for vsat properties */
  public readonly PROPERTY_VSAT: PROPERTY_VSAT_T = {
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
  /* Base structure for saw wave source properties */
  public readonly PROPERTY_SAW: PROPERTY_SAW_T = {
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
  /* Base structure for triangle wave source properties */
  public readonly PROPERTY_TRI: PROPERTY_TRI_T = {
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
  /* Base structure for adder properties */
  public readonly PROPERTY_ADD: PROPERTY_ADD_T = {
    'Input Voltage1': 0,
    'Input Voltage2': 0,
    'Output Voltage': 0,
    tag: 'VADD',
    units: 'V',
    options: [''],
    options_units: [''],
    option_limits: {}
  };
  /* Base structure for subtractor properties */
  public readonly PROPERTY_SUB: PROPERTY_SUB_T = {
    'Input Voltage1': 0,
    'Input Voltage2': 0,
    'Output Voltage': 0,
    tag: 'VSUB',
    units: 'V',
    options: [''],
    options_units: [''],
    option_limits: {}
  };
  /* Base structure for multiplier properties */
  public readonly PROPERTY_MUL: PROPERTY_MUL_T = {
    'Input Voltage1': 0,
    'Input Voltage2': 0,
    'Output Voltage': 0,
    tag: 'VMUL',
    units: 'V',
    options: [''],
    options_units: [''],
    option_limits: {}
  };
  /* Base structure for greater than properties */
  public readonly PROPERTY_GRT: PROPERTY_GRT_T = {
    'Input Voltage1': 0,
    'Input Voltage2': 0,
    'Output Voltage': 0,
    tag: 'VGRT',
    units: 'V',
    options: [''],
    options_units: [''],
    option_limits: {}
  };
  /* Base structure for adder properties */
  public readonly PROPERTY_DIV: PROPERTY_DIV_T = {
    'Input Voltage1': 0,
    'Input Voltage2': 0,
    'Output Voltage': 0,
    tag: 'VDIV',
    units: 'V',
    options: [''],
    options_units: [''],
    option_limits: {}
  };
  /* Base structure for nmosfet properties */
  public readonly PROPERTY_NMOS: PROPERTY_NMOS_T = {
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
  /* Base structure for pmosfet properties */
  public readonly PROPERTY_PMOS: PROPERTY_PMOS_T = {
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
  /* Base structure for npnbjt properties */
  public readonly PROPERTY_NPN: PROPERTY_NPN_T = {
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
  /* Base structure for pnpbjt properties */
  public readonly PROPERTY_PNP: PROPERTY_PNP_T = {
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
  /* Base structure for transformer properties */
  public readonly PROPERTY_TRAN: PROPERTY_TRAN_T = {
    'Turns Ratio': 1,
    tag: 'TRAN',
    units: 'NP/NS',
    options: ['Turns Ratio'],
    options_units: ['NP/NS'],
    option_limits: {
      'NP/NS': [this.settings.MIN_GAIN, this.settings.MAX_GAIN]
    }
  };
  /* Base structure for adc properties */
  public readonly PROPERTY_ADC: PROPERTY_ADC_T = {
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
  /* Base structure for dac properties */
  public readonly PROPERTY_DAC: PROPERTY_DAC_T = {
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
  /* Base structure for pwm properties */
  public readonly PROPERTY_PWM: PROPERTY_PWM_T = {
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
  /* Base structure for integrator properties */
  public readonly PROPERTY_INTEGRATOR: PROPERTY_INTEGRATOR_T = {
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
  /* Base structure for differentiator properties */
  public readonly PROPERTY_DIFFERENTIATOR: PROPERTY_DIFFERENTIATOR_T = {
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
  /* Base structure for gain properties */
  public readonly PROPERTY_GAIN: PROPERTY_GAIN_T = {
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
  /* Base structure for abs properties */
  public readonly PROPERTY_ABS: PROPERTY_ABS_T = {
    'Input Voltage': 0,
    'Output Voltage': 0,
    tag: 'ABS',
    units: '',
    options: [''],
    options_units: [''],
    option_limits: {}
  };
  /* Base structure for lpf properties */
  public readonly PROPERTY_LPF: PROPERTY_LPF_T = {
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
  /* Base structure for hpf properties */
  public readonly PROPERTY_HPF: PROPERTY_HPF_T = {
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
  /* Base structure for rail properties */
  public readonly PROPERTY_RAIL: PROPERTY_RAIL_T = {
    Voltage: 12,
    tag: 'PR',
    units: 'V',
    options: ['Voltage'],
    options_units: ['V'],
    option_limits: {
      Voltage: [this.settings.MIN_VOLTAGE, this.settings.MAX_VOLTAGE]
    }
  };
  /* Base structure for relay properties */
  public readonly PROPERTY_REL: PROPERTY_REL_T = {
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
  /* Base structure for pid properties */
  public readonly PROPERTY_PID: PROPERTY_PID_T = {
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
  /* Base structure for samplers properties */
  public readonly PROPERTY_SAH: PROPERTY_SAH_T = {
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
  /* Base structure for Look-Up-Table properties */
  public readonly PROPERTY_LUT: PROPERTY_LUT_T = {
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
  /* Base structure for tptz properties */
  public readonly PROPERTY_TPTZ: PROPERTY_TPTZ_T = {
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
  /* Base structure for note properties */
  public readonly PROPERTY_NOTE: PROPERTY_NOTE_T = {
    Note: 'empty',
    tag: 'NOTE',
    'Text Style': this.TEXT_STYLE_1,
    'Show Marker': this.ON,
    units: '',
    options: ['Note', 'Text Style', 'Show Marker'],
    options_units: ['', '', ''],
    /* This element doesn't have one! */
    option_limits: {
      Note: [-1, 1]
    }
  };
  /* Base structure for fuse properties */
  public readonly PROPERTY_FUSE: PROPERTY_FUSE_T = {
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
  /* Base structure for dff properties */
  public readonly PROPERTY_DFF: PROPERTY_DFF_T = {
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
  /* Keeps track of all the changes made to elements. There is a manager for
    the history generated inside the application. Its queued up so we don't miss
    anything! */
  public readonly HISTORY_MANAGER: HISTORY_MANAGER_T = {
    packet: []
  };
  /* The various landuages available to pick from. */
  public readonly LANGUAGES: Array<string> = ['English', 'Spanish', 'French', 'Italian', 'Dutch', 'Russian', 'German', 'Indonesian'];
  public LANGUGE_INDEX_COUNTER: number = 0;
  public readonly LANGUAGE_INDEX_ENGLISH: number = this.LANGUGE_INDEX_COUNTER++;
  public readonly LANGUAGE_INDEX_SPANISH: number = this.LANGUGE_INDEX_COUNTER++;
  public readonly LANGUAGE_INDEX_FRENCH: number = this.LANGUGE_INDEX_COUNTER++;
  public readonly LANGUAGE_INDEX_ITALIAN: number = this.LANGUGE_INDEX_COUNTER++;
  public readonly LANGUAGE_INDEX_DUTCH: number = this.LANGUGE_INDEX_COUNTER++;
  public readonly LANGUAGE_INDEX_RUSSIAN: number = this.LANGUGE_INDEX_COUNTER++;
  public readonly LANGUAGE_INDEX_GERMAN: number = this.LANGUGE_INDEX_COUNTER++;
  public readonly LANGUAGE_INDEX_INDONESIAN: number = this.LANGUGE_INDEX_COUNTER++;
  /* The current language index. */
  public LANGUAGE_INDEX: number = this.LANGUAGE_INDEX_ENGLISH;
  /* Base structure for system properties */
  public SYSTEM_OPTIONS: SYSTEM_OPTIONS_T = {
    options: ['Language', 'Automatic Timestep', 'Shortcut Hints', 'Full Window', '', ''],
    values: [this.LANGUAGES[this.LANGUAGE_INDEX], this.OFF, this.ON, this.OFF, this.OFF, this.OFF]
  };
  /* Index's to access system options. Make sure they're in order. */
  public indexer: number = 0;
  public CIRCLE_BUFFER: Array<Array<number>> = [];
  public LINE_BUFFER: Array<Array<number>> = [];
  public SYSTEM_OPTION_LANGUAGE: number = this.indexer++;
  public SYSTEM_OPTION_AUTOMATIC_TIMESTEP: number = this.indexer++;
  public SYSTEM_OPTION_SHORTCUT_HINTS: number = this.indexer++;
  public SYSTEM_OPTION_STRETCH_WINDOW: number = this.indexer++;

  /* 99.999% Of the colors are stored here for conveinence. This is to help when moving from canvas-2d to some other libraries
    in the future. Paint.js has one definition there... (The order of includes are hard to manage.)*/
  public BACKGROUND_COLOR: string = this.ColorNameToHex('black');
  public readonly ELEMENT_COLOR: string = this.ColorNameToHex('silver');
  public readonly SELECTED_COLOR: string = this.ColorNameToHex('cyan');
  public readonly MULTI_SELECTED_COLOR: string = this.ColorNameToHex('yellow');
  public readonly WORKSPACE_WORK_AREA_COLOR: string = this.ColorNameToHex('#292D29');
  public readonly GRAPH_AREA_COLOR: string = this.ColorNameToHex('#282828');
  public readonly ZOOM_AREA_COLOR: string = this.ColorNameToHex('#3C3C3C');
  public readonly TRACE_I_COLOR: string = this.ColorNameToHex('cyan');
  public readonly TRACE_II_COLOR: string = this.ColorNameToHex('magenta');
  public readonly TRACE_III_COLOR: string = this.ColorNameToHex('green');
  public readonly TRACE_DEFAULT_COLOR: string = this.ColorNameToHex('yellow');
  public readonly MENU_ICON_ACTIVE_COLOR: string = this.ColorNameToHex('cyan');
  public readonly MENU_ICON_INACTIVE_COLOR: string = this.ColorNameToHex('#9B9B9B');
  public readonly MENU_ICON_DEFAULT_COLOR: string = this.ColorNameToHex('white');
  public readonly MENU_HIGHLIGHT_COLOR: string = this.ColorNameToHex('#606060');
  public readonly MENU_FILL_COLOR: string = this.ColorNameToHex('gray');
  public readonly GENERAL_WHITE_COLOR: string = this.ColorNameToHex('white');
  public readonly GENERAL_BLACK_COLOR: string = this.ColorNameToHex('black');
  public readonly GENERAL_GRAY_COLOR: string = this.ColorNameToHex('gray');
  public readonly GENERAL_GREEN_COLOR: string = this.ColorNameToHex('green');
  public readonly GENERAL_RED_COLOR: string = this.ColorNameToHex('red');
  public readonly GENERAL_BLUE_COLOR: string = this.ColorNameToHex('blue');
  public readonly GENERAL_BOUNDS_COLOR: string = this.ColorNameToHex('#404040');
  public readonly GENERAL_CYAN_COLOR: string = this.ColorNameToHex('cyan');
  public readonly GENERAL_YELLOW_COLOR: string = this.ColorNameToHex('yellow');
  /* The default font for all paints created in the system */
  public readonly DEFAULT_FONT: string = 'Arial';
  /* A flag to detail if the user has selected a file or not. */
  public USER_FILE_SELECTED: boolean = false;
  /* A descriptor for the users circuit */
  public USER_FILE: Circuit = new Circuit();
  /* Key Event Code Constants */
  public KEY_CODE_ESCAPE = 'Escape';
  public KEY_CODE_BACK_QUOTE = 'Backquote';
  public KEY_CODE_0 = 'Digit0';
  public KEY_CODE_1 = 'Digit1';
  public KEY_CODE_2 = 'Digit2';
  public KEY_CODE_3 = 'Digit3';
  public KEY_CODE_4 = 'Digit4';
  public KEY_CODE_5 = 'Digit5';
  public KEY_CODE_6 = 'Digit6';
  public KEY_CODE_7 = 'Digit7';
  public KEY_CODE_8 = 'Digit8';
  public KEY_CODE_9 = 'Digit9';
  public KEY_CODE_MINUS = 'Minus';
  public KEY_CODE_EQUAL = 'Equal';
  public KEY_CODE_BACKSPACE = 'Backspace';
  public KEY_CODE_Q = 'KeyQ';
  public KEY_CODE_W = 'KeyW';
  public KEY_CODE_E = 'KeyE';
  public KEY_CODE_R = 'KeyR';
  public KEY_CODE_T = 'KeyT';
  public KEY_CODE_Y = 'KeyY';
  public KEY_CODE_U = 'KeyU';
  public KEY_CODE_I = 'KeyI';
  public KEY_CODE_O = 'KeyO';
  public KEY_CODE_P = 'KeyP';
  public KEY_CODE_LEFT_BRACKET = 'BracketLeft';
  public KEY_CODE_RIGHT_BRACKET = 'BracketRight';
  public KEY_CODE_BACKSLASH = 'Backslash';
  public KEY_CODE_A = 'KeyA';
  public KEY_CODE_S = 'KeyS';
  public KEY_CODE_D = 'KeyD';
  public KEY_CODE_F = 'KeyF';
  public KEY_CODE_G = 'KeyG';
  public KEY_CODE_H = 'KeyH';
  public KEY_CODE_J = 'KeyJ';
  public KEY_CODE_K = 'KeyK';
  public KEY_CODE_L = 'KeyL';
  public KEY_CODE_SEMI_COLON = 'Semicolon';
  public KEY_CODE_QUOTE = 'Quote';
  public KEY_CODE_ENTER = 'Enter';
  public KEY_CODE_LEFT_SHIFT = 'ShiftLeft';
  public KEY_CODE_Z = 'KeyZ';
  public KEY_CODE_X = 'KeyX';
  public KEY_CODE_C = 'KeyC';
  public KEY_CODE_V = 'KeyV';
  public KEY_CODE_B = 'KeyB';
  public KEY_CODE_N = 'KeyN';
  public KEY_CODE_M = 'KeyM';
  public KEY_CODE_COMMA = 'Comma';
  public KEY_CODE_PERIOD = 'Period';
  public KEY_CODE_FORWARD_SLASH = 'Slash';
  public KEY_CODE_RIGHT_SHIFT = 'ShiftRight';
  public KEY_CODE_LEFT_CONTROL = 'ControlLeft';
  public KEY_CODE_LEFT_ALT = 'AltLeft';
  public KEY_CODE_SPACE = 'Space';
  public KEY_CODE_RIGHT_ALT = 'AltRight';
  public KEY_CODE_RIGHT_CONTROL = 'ControlRight';
  public KEY_CODE_DELETE = 'Delete';
  public KEY_CODE_HOME = 'Home';
  public KEY_CODE_END = 'End';
  public KEY_CODE_NUMPAD_MINUS = 'NumpadSubtract';
  public KEY_CODE_NUMPAD_DIVIDE = 'NumpadDivide';
  public KEY_CODE_NUMPAD_MULTIPLY = 'NumpadMultiply';
  public KEY_CODE_NUMPAD_SUBTRACT = 'NumpadSubtract';
  public KEY_CODE_NUMPAD_ENTER = 'NumpadEnter';
  public KEY_CODE_NUMPAD_DECIMAL = 'NumpadDecimal';
  public KEY_CODE_ARROW_LEFT = 'ArrowLeft';
  public KEY_CODE_ARROW_UP = 'ArrowUp';
  public KEY_CODE_ARROW_DOWN = 'ArrowDown';
  public KEY_CODE_ARROW_RIGHT = 'ArrowRight';
  public KEY_CODE_NUMPAD0 = 'Numpad0';
  public KEY_CODE_NUMPAD1 = 'Numpad1';
  public KEY_CODE_NUMPAD2 = 'Numpad2';
  public KEY_CODE_NUMPAD3 = 'Numpad3';
  public KEY_CODE_NUMPAD4 = 'Numpad4';
  public KEY_CODE_NUMPAD5 = 'Numpad5';
  public KEY_CODE_NUMPAD6 = 'Numpad6';
  public KEY_CODE_NUMPAD7 = 'Numpad7';
  public KEY_CODE_NUMPAD8 = 'Numpad8';
  public KEY_CODE_NUMPAD9 = 'Numpad9';
  /* No modifier, Shift, Capslock */
  public KEY_EVENT_CODES = {
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
  public KEY_EVENT_KEYS = Object.keys(this.KEY_EVENT_CODES);
  /* Variables for Circuit Simulation */
  public TIME_STEP: number = 1e-6;
  /* The magnitude of the random variable for the entire simulation. */
  public readonly RANDOM_VAR_MAGNITUDE: number = 1e-18;
  /* Keeps track of the simulation time. */
  public SIMULATION_TIME: number = 0;
  /* Serializing the inputs (so they occur in a predictable manner.) */
  public RESIZE_EVENT: boolean = false;
  /* Used for changing from window modes. */
  public FORCE_RESIZE_EVENT: boolean = false;
  public ON_RESTORE_EVENT: boolean = false;
  public MOUSE_DOWN_EVENT: boolean = false;
  public MOUSE_MOVE_EVENT: boolean = false;
  public MOUSE_UP_EVENT: boolean = false;
  public MOUSE_DOUBLE_CLICK_EVENT: boolean = false;
  public MOUSE_WHEEL_EVENT: boolean = false;
  public KEY_UP_EVENT: boolean = false;
  public KEY_DOWN_EVENT: boolean = false;
  /* A flag to disable the system from drawing to the real buffer. */
  public DRAW_BLOCK: boolean = false;
  /* Flag to dictate that the system is ready for a close up (Taking a snaps shot of  the workspace area.). */
  public PICTURE_REQUEST: boolean = false;
  public readonly PICTURE_ZOOM: number = this.ZOOM_MAX;
  public readonly PICTURE_EXPOSURE_TIME: number = 3;
  /* Canvas drawing optimization flag */
  public CANVAS_DRAW_REQUEST: boolean = false;
  public CANVAS_DRAW_REQUEST_COUNTER: number = 0;
  public CANVAS_DRAW_REQUEST_COUNTER_MAX: number = 3;
  public CANVAS_DRAW_EVENT: boolean = false;
  public CANVAS_REDRAW_MAX: number = 3;
  public CANVAS_REDRAW_COUNTER: number = 0;
  /* Quantizing the stroke width's for the entire system. Ideally, the system will use one of these sizes. */
  public CANVAS_STROKE_WIDTH_BASE: number = 1;
  public CANVAS_STROKE_WIDTH_1: number = 2.25;
  public CANVAS_STROKE_WIDTH_2: number = 2.5;
  public CANVAS_STROKE_WIDTH_3: number = 9;
  public CANVAS_STROKE_WIDTH_4: number = 16;
  public CANVAS_STROKE_WIDTH_5: number = 21;
  public CANVAS_STROKE_WIDTH_6: number = 43;
  public CANVAS_STROKE_WIDTH_1_ZOOM: number = 2.25;
  public CANVAS_STROKE_WIDTH_2_ZOOM: number = 2.5;
  public CANVAS_STROKE_WIDTH_3_ZOOM: number = 9;
  public CANVAS_STROKE_WIDTH_4_ZOOM: number = 16;
  public CANVAS_STROKE_WIDTH_5_ZOOM: number = 21;
  public CANVAS_STROKE_WIDTH_6_ZOOM: number = 43;
  /* Quantizing the text size's for the entire system. Ideally, the system will use one of these sizes. */
  public CANVAS_TEXT_SIZE_BASE: number = 1;
  public CANVAS_TEXT_SIZE_1: number = 2.25;
  public CANVAS_TEXT_SIZE_2: number = 2.5;
  public CANVAS_TEXT_SIZE_3: number = 9;
  public CANVAS_TEXT_SIZE_4: number = 16;
  public CANVAS_TEXT_SIZE_5: number = 21;
  public CANVAS_TEXT_SIZE_6: number = 43;
  public CANVAS_TEXT_SIZE_1_ZOOM: number = 2.25;
  public CANVAS_TEXT_SIZE_2_ZOOM: number = 2.5;
  public CANVAS_TEXT_SIZE_3_ZOOM: number = 9;
  public CANVAS_TEXT_SIZE_4_ZOOM: number = 16;
  public CANVAS_TEXT_SIZE_5_ZOOM: number = 21;
  public CANVAS_TEXT_SIZE_6_ZOOM: number = 43;
  /* Accessing some variables in javascript is expensive, so let's just cache them. */
  public SURFACE_OFFSET_LEFT: number = 0;
  public SURFACE_OFFSET_TOP: number = 0;
  /* This is how history event components are seperated. */
  public readonly PACKET_DIVIDER: string = '#DIVIDER#';
  /* Paint used to draw the grid highlights when a component is moved. */
  public move_paint: Paint = new Paint();
  /* Thermal voltage tor PN Junctions. */
  public vt: number = 25.6e-3;
  /* Default GMIN value! (Used for gmin stepping) */
  public GMIN_DEFAULT: number = 1e-9;
  /* Non-linear simulation variables */
  public V_MAX_ERR: Array<Array<number>> = [];
  public I_MAX_ERR: Array<Array<number>> = [];
  public V_LOCKED: boolean = false;
  public I_LOCKED: boolean = false;
  public V_CONV: boolean = false;
  public I_CONV: boolean = false;
  public readonly PI_DIV_2: number = Math.PI * 0.5;
  public readonly PI_DIV_4: number = Math.PI * 0.25;
  public readonly PI_MUL_3_DIV_4: number = Math.PI * 0.75;
  public readonly PI_DIV_6: number = Math.PI / 6;
  public readonly PI_DIV_12: number = Math.PI / 12;
  public readonly PI_DIV_180: number = Math.PI / 180;
  public readonly NEG_PI_DIV_180: number = -Math.PI / 180;
  public readonly _180_DIV_PI: number = 180 / Math.PI;
  public readonly PI_MUL_2: number = Math.PI * 2;
  /* Dividing PI into a 16-bit number (Qx) */
  public TRIG_TABLE_Q_NUMBER: number = 12;
  public TRIG_SINE_TABLE: Array<number> = [];
  public TRIG_TABLE_SIZE: number = Math.round(Math.pow(2, this.TRIG_TABLE_Q_NUMBER));
  public TRIG_TABLE_SCALE_CONSTANT: number = 2.0 / this.TRIG_TABLE_SIZE;
  public TRIG_TABLE_INDEX_CONSTANT: number = (this.TRIG_TABLE_SIZE * 0.5) / Math.PI;
  public TRIG_TABLE_MASK: number = this.TRIG_TABLE_SIZE - 1;
  public TRIG_TABLE_ROUND: number = this.TRIG_TABLE_SIZE * 0.25;

  public TIME_DATA_TEMPLATE: TIME_DATA_TEMPLATE_T = {
    Frequency: -1,
    Resistance: -1,
    Capacitance: -1,
    Inductance: -1
  };
  /* This is the maximum text length of any text field. */
  public MAX_TEXT_LENGTH: number = 30;
  public inv_sqrt_buf: ArrayBuffer = new ArrayBuffer(4);
  public inv_sqrt_f32: Float32Array = new Float32Array(this.inv_sqrt_buf);
  public inv_sqrt_u32: Uint32Array = new Uint32Array(this.inv_sqrt_buf);
  public ALPHA_ARRAY: Array<number> = [];
  public general_integer: number = 0;
  public general_integer2: number = 0;
  public general_integer3: number = 0;
  public general_integer4: number = 0;
  public general_integer5: number = 0;
  public RESIZE_W_FACTOR: number = 0;
  public RESIZE_H_FACTOR: number = 0;
  public ANGLE_SEARCH_OBJ: ANGLE_STRUCT_T;
  public ANGLE_RADIAN_SEARCH_OBJ: ANGLE_STRUCT_T;
  public ANGLE_ARRAY: Array<ANGLE_STRUCT_T> = [];
  public ANGLE_RADIAN_ARRAY: Array<ANGLE_STRUCT_T> = [];
  public SAVED_ANGLE: number = -1;
  public SAVED_ANGLE_RADIANS: number = -1;
  public GARBAGE_COLLECTOR_SIZE: number = 16;
  public TEMP_BOOLEAN: boolean = false;
  public general_index: number = -1;
  public ELEMENT_MAX: Array<number> = [];
  public METER_MAX: Array<number> = [];
  public NON_LINEAR_MAX: Array<number> = [];
  public MAX_GENERAL_NUMBER: number = 0;

  constructor() {
    this.NULL = null;
    this.MOBILE_MODE = false;
    this.SYSTEM_INITIALIZATION = {
      step: 0,
      max: 5,
      completed: false
    };
    this.VERSION_TAG = 'BETA-1.0.93';
    if (this.MOBILE_MODE) {
      /* The scale of the workspace. It's to be limited by ZOOM_MAX and ZOOM_MIN*/
      this.WORKSPACE_ZOOM_SCALE = 2.5;
      /* The maximum amount of zoom the user may apply */
      this.ZOOM_MAX = 3.5;
      /* The minimum amount of zoom the user may apply */
      this.ZOOM_MIN = 1.0;
    } else {
      /* The scale of the workspace. It's to be limited by ZOOM_MAX and ZOOM_MIN*/
      this.WORKSPACE_ZOOM_SCALE = 1.0;
      /* The maximum amount of zoom the user may apply */
      this.ZOOM_MAX = 2.0;
      /* The minimum amount of zoom the user may apply */
      this.ZOOM_MIN = 0.5;
    }
    this.ZERO_PT_FIVE = 0.5;
    this.ZERO = 0 >> 0;
    this.NODE_LINE_BUFFER = [];
    this.NODE_LINE_BUFFER_INDEX = 0;
    /* The incremental change in zoom, *= ZOOM_FACTOR or /= ZOOM_FACTOR */
    this.ZOOM_FACTOR = 1.085;
    /* These are used a relative metric to know how much to change the view of the
    workspace when a zooming event takes place */
    this.natural_width = 0;
    this.natural_height = 0;
    /* User settings, very handy to make them global. */
    this.settings = new Settings();
    /* Don't change the name of these guys...the obfuscator is referenced to their names.*/
    this.DEVELOPER_MODE = false;
    this.PRODUCTION_MODE = false;
    /* Generic Templates to avoid string concatenation. */
    this.ELEMENT_TAG_TEMPLATE = '{TAG}{ID}';
    this.ELEMENT_VAL_TEMPLATE = '{VAL}{UNIT}';
    this.DIVISION_TEXT_TEMPLATE = '{A} / {B}';
    this.PIXEL_TEMPLATE = '{VALUE}px';
    this.PNG_TEMPLATE = '{NAME}.png';
    /* To help with system settings. */
    this.ON = 'ON';
    this.OFF = 'OFF';
    /* Keeping track of the virtual canvas's we create. */
    this.VIRTUAL_CANVAS_ID = 0;
    /* Constants for different elements in the application. */
    /* Meta data is reserved for storing user info when exporting / importing circuits */
    /* When we generate the output text file, it sits on the first portion of the file. */
    this.TYPE_META_DATA = -2;
    /* Using a counter to keep track of the size of elements. */
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
    this.TYPE_GRT = this.TYPE_COUNTER++;
    this.TYPE_TPTZ = this.TYPE_COUNTER++;
    this.TYPE_TRAN = this.TYPE_COUNTER++;
    /* <!-- END AUTOMATICALLY GENERATED !--> */
    /* Constants for the different amounts of pre-determined rotation */
    this.ROTATION_0 = 0;
    this.ROTATION_90 = 1;
    this.ROTATION_180 = 2;
    this.ROTATION_270 = 3;
    /* Constants for the different styles the wire can display */
    /* Each wire has a property for changing it's appearance. These are the different
    styles that can be applied to the wire.  */
    this.WIRE_STYLE_0 = 0;
    this.WIRE_STYLE_1 = 1;
    this.WIRE_STYLE_2 = 2;
    this.WIRE_STYLE_3 = 3;
    this.WIRE_STYLE_4 = 4;
    /* Constants for the different flips, 0 = normal, 180 = flipped over y-axis */
    /* Some components like the OPAMPs and Transistors have the ability to be flipped. */
    this.FLIP_0 = 0;
    this.FLIP_180 = 1;
    /* A setting to help facillitate controlling one object at a time */
    /* Each object has access to this global variable. */
    this.focused = false;
    this.focused_id = this.NULL;
    this.focused_type = this.NULL;
    this.focused_bounds = this.NULL;
    this.last_selected = false;
    /* A setting to help facillitate which component is selected */
    /* Each object can override the selected item if it becomes selected itself. This is
    so that there's only one item selected at a time. This will need to be tweaked for
    multi-select. */
    this.selected = false;
    /* The identity of the selected element */
    this.selected_id = this.NULL;
    /* The type of the selected element */
    this.selected_type = -1;
    /* If the type of element is a wire, this field will not be null. */
    this.selected_wire_style = this.NULL;
    /* The bounds of the selected item */
    this.selected_bounds = this.NULL;
    /* The properties of the selected item. Each element has properties associated with it */
    this.selected_properties = this.NULL;
    /* Selectios nearest neighbors */
    this.SELECTION_NEAREST_NEIGHBORS = [];
    this.NEAREST_NEIGHBOR_INDEX = 0;
    /* A general flag to determining if any of the elements are multi-selected. */
    this.multi_selected = false;
    /* Used to copying / pasting elements. */
    this.CLIPBOARD_TYPE = this.NULL;
    this.CLIPBOARD_ROTATION = this.NULL;
    this.CLIPBOARD_FLIP = this.NULL;
    this.CLIPBOARD_PROPERTY = this.NULL;
    /* A variable to help coordinate multi-selection. */
    this.component_translating = false;
    /* Thermal voltage tor PN Junctions. */
    this.vt = 25.6e-3;
    /* Default GMIN value! (Used for gmin stepping) */
    this.GMIN_DEFAULT = 1e-9;
    /* Non-linear simulation variables */
    this.V_MAX_ERR = [];
    this.I_MAX_ERR = [];
    this.V_LOCKED = false;
    this.I_LOCKED = false;
    this.V_CONV = false;
    this.I_CONV = false;
    /* System Flags */
    /* These flags are to represent what state the appplication is in. The idea is to make
    them indicative of what functions are avaiable on what page and what elements need to be
    drawn. */
    /* We are observing the main application (No windows are up) */
    /* Do no chnage these variables directly, there is a function inside menu_bar that handles the
    changes (it does so while cleaning up the change in states.) */
    this.FLAG_IDLE = true;
    /* The simulation button was hit and we are currently simulating. */
    this.FLAG_SIMULATING = false;
    /* The user is trying to enter a name for the image they're trying to save, either that
    or they are cancelling the prompt. */
    this.FLAG_SAVE_IMAGE = false;
    /* The user is trying to enter a name for the circuit they're trying to save, either that
    or they are cancelling the prompt. */
    this.FLAG_SAVE_CIRCUIT = false;
    /* The zoom window should be up. */
    this.FLAG_ZOOM = false;
    /* The element options "mini-menu" should be open on the right hand side of the application. */
    this.FLAG_ELEMENT_OPTIONS = false;
    /* The component has to be options in order to have any of it's properties show up here.
    If the property element of the application is generated correctly, this should all be
    automatic */
    this.FLAG_ELEMENT_OPTIONS_EDIT = false;
    /* The graph menu should be opened and displayed when this variable is true. */
    this.FLAG_GRAPH = false;
    /* The user has the menu-bar dropped down and has the second drop down for selecting a new component. */
    this.FLAG_SELECT_ELEMENT = false;
    /* The user is trying to select a new time-step */
    this.FLAG_SELECT_TIMESTEP = false;
    /* The user is changing settings */
    this.FLAG_SELECT_SETTINGS = false;
    /* The user would like to remove all the elements in the workspace at once. */
    this.FLAG_REMOVE_ALL = false;
    /* The menu-bar first drop down should be down when this is changed to true. */
    this.FLAG_MENU_OPEN = false;
    /* The menu-bar second drop down should be down when this is changed to true. */
    this.FLAG_MENU_OPEN_DOWN = false;
    /* Special signal for adding elements :> */
    this.SIGNAL_ADD_ELEMENT = false;
    /* Special signal for when a wire is deleted */
    this.SIGNAL_WIRE_DELETED = false;
    /* Special signal for when a wire is created */
    this.SIGNAL_WIRE_CREATED = false;
    /* Special signal for history-locks elements :> */
    this.SIGNAL_HISTORY_LOCK = false;
    /* Global rendering flag */
    this.SIGNAL_BUILD_ELEMENT = false;
    this.SIGNAL_BUILD_COUNTER = 0;
    /* Intentionally 2x re-draw counter.*/
    this.SIGNAL_BUILD_COUNTER_MAX = 3;
    /* Counts up to counter max and resets the signal wire deleted flag. */
    this.SIGNAL_WIRE_DELETED_COUNTER = 0;
    this.SIGNAL_WIRE_DELETED_COUNTER_MAX = 3;
    /* Flag to help coordinate when an element is touched */
    this.component_touched = false;
    /* Some elements require the mouse to be locked out until a mouse-up event occurs. This is
    so that we don't have events propagating to other portions of the code. */
    this.MOUSE_KEYBOARD_LOCK = false;
    this.TRANSLATION_LOCK = true;
    /* Used for solving the matrix, If the matrix is found to be singluar, this flag will be set
    and the simulation will end throwing an sinular matrix fault. */
    this.IS_SINGULAR = false;
    /* Storing mouse events in this template so they can be serialized */
    this.mouse_down_event = this.NULL;
    this.mouse_move_event = this.NULL;
    this.mouse_up_event = this.NULL;
    this.mouse_wheel_event = this.NULL;
    /* Storing key events into queue's to prevent keystrokes from being missed. */
    this.mouse_down_event_queue = [];
    this.mouse_up_event_queue = [];
    this.mouse_wheel_event_queue = [];
    this.mouse_double_click_event_queue = [];
    /* Determine the web-browser! */
    this.BROWSER_IE = false;
    this.BROWSER_CHROME = false;
    this.BROWSER_OPERA = false;
    this.BROWSER_FIREFOX = false;
    this.BROWSER_SAFARI = false;
    /* Text styles for the note element. */
    this.TEXT_STYLE_1 = 'Style1';
    this.TEXT_STYLE_2 = 'Style2';
    this.TEXT_STYLE_3 = 'Style3';
    this.TEXT_STYLE_4 = 'Style4';
    this.TEXT_STYLE_5 = 'Style5';
    /* Storing key events in this template so they can be serialized */
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
    /* Storing key events into queue's to prevent keystrokes from being missed. */
    this.key_down_event_queue = [];
    this.key_up_event_queue = [];
    this.mouse_down_x = 0;
    this.mouse_down_y = 0;
    /* Stores the last mouse event when a new one comes in, its used to calculate dx and dy for
    the mouse movements.  */
    this.last_mouse_x = 0;
    this.last_mouse_y = 0;
    /* The difference between the current mouse coordinates and the last coordinates recorded. */
    this.dx = 0;
    this.dy = 0;
    /* Stores the location of mouse events this is used in mouse_move, mouse_down, mouse_up, handle_zoom, etc. */
    this.mouse_x = 0;
    this.mouse_y = 0;
    /* A flag to indicate when a mouse click event occurs. */
    this.is_touching = false;
    /* A flag to indicate when a dragging event occurs. This is only set if IS_RIGHT_CLICK is true. */
    this.IS_DRAGGING = false;
    this.TEMP_IS_DRAGGING = false;
    /* A flag to indicate when the user performs a right click */
    this.IS_RIGHT_CLICK = false;
    /* Used to calculate the shift in when the zoom-to-point logic starts, this essenntially is the left and top of the workspace view */
    this.delta_x = 0;
    this.delta_y = 0;
    /* Used for zoom to point, its a relative */
    this.x_offset = 0;
    this.y_offset = 0;
    /* The node-spacing in the x-direction */
    this.node_space_x = 0;
    /* The node-spacing in the y-direction */
    this.node_space_y = 0;
    /* The last surface width, this is used for 1:1 resizing */
    this.last_surface_width = 0;
    /* The last surface height, this is used for 1:1 resizing */
    this.last_surface_height = 0;
    /* The last view port width, this is used for 1:1 resizing */
    this.last_view_port_width = 0;
    /* The last view port height, this is used for 1:1 resizing */
    this.last_view_port_height = 0;
    this.last_view_port_right = 0;
    this.last_view_port_bottom = 0;
    /* Used to determine which wire point is associated to an elements nodes. */
    this.ANCHOR_POINT = {
      p1: 0,
      p2: 1,
      p3: 2,
      p4: 3
    };
    /* Store the pre-divided SI units to save some computation time. */
    this.SI_UNIT_ARRAY = [1 / 1e21, 1 / 1e18, 1 / 1e15, 1 / 1e12, 1 / 1e9, 1 / 1e6, 1 / 1e3, 1, 1 / 1e-3, 1 / 1e-6, 1 / 1e-9, 1 / 1e-12, 1 / 1e-15, 1 / 1e-18, 1 / 1e-21];
    /* Cache the thresholds.. */
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
    /* To facilitate the generation of new wires. */
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
    /* Accessing the limits of each variable in the element properties structures below.*/
    this.PROPERTY_LIMIT_MIN = 0;
    this.PROPERTY_LIMIT_MAX = 1;
    /* A builder to help create new wires. */
    this.WIRE_REFERENCE = {
      wire_id: -1,
      anchor_point: -1,
      linkage: -1
    };
    /* Structure for saving meta data details */
    this.PROPERTY_META_DATA = {
      company: 'phasorsystems',
      version: this.VERSION_TAG,
      date: ''
    };
    /* Base structure for resistor properties */
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
    /* Base structure for SPST properties */
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
    /* Base structure for NOT properties */
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
    /* Base structure for diode properties */
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
    /* Base structure for led properties */
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
    /* Base structure for zener properties */
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
    /* Base structure for voltmeter properties */
    this.PROPERTY_VOLTMETER = {
      Voltage: 0,
      tag: 'VM',
      units: 'V',
      options: [''],
      options_units: [''],
      option_limits: {}
    };
    /* Base structure for voltmeter properties */
    this.PROPERTY_WATTMETER = {
      Wattage: 0,
      'Test Voltage': 1e-9,
      tag: 'WM',
      units: 'W',
      options: [''],
      options_units: [''],
      option_limits: {}
    };
    /* Base structure for ammeter properties */
    this.PROPERTY_AMMETER = {
      Current: 0,
      'Test Voltage': 1e-9,
      tag: 'AM',
      units: 'A',
      options: [''],
      options_units: [''],
      option_limits: {}
    };
    /* Base structure for ohmmeter properties */
    this.PROPERTY_OHMMETER = {
      'Sensed Resistance': 0,
      'Test Voltage': 1e-9,
      tag: 'OM',
      units: 'Ω',
      options: [''],
      options_units: [''],
      option_limits: {}
    };
    /* Base structure for resistor properties */
    this.PROPERTY_WIRE = {
      tag: 'W',
      units: 'Ω',
      options: [''],
      options_units: [''],
      option_limits: {}
    };
    /* Base structure for dc source properties */
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
    /* Base structure for ac source properties */
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
    /* Base structure for square wave source properties */
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
    /* Base structure for ac source properties */
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
    /* Base structure for dc current properties */
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
    /* Base structure for capacitor properties */
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
    /* Base structure for inductor properties */
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
    /* Base structure for ground properties */
    this.PROPERTY_GROUND = {
      tag: 'G',
      units: ''
    };
    /* Base structure for net properties */
    this.PROPERTY_NET = {
      Name: 'Net',
      tag: 'N',
      'Show Name': this.ON,
      units: '',
      options: ['Name', 'Show Name'],
      options_units: ['', ''],
      /* This element doesn't have one! */
      option_limits: {
        Name: [-1, 1]
      }
    };
    /* Base structure for constant properties */
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
    /* Base structure for potentiometer properties */
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
    /* Base structure for and properties */
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
    /* Base structure for or properties */
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
    /* Base structure for nand properties */
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
    /* Base structure for nor properties */
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
    /* Base structure for xor properties */
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
    /* Base structure for xnor properties */
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
    /* Base structure for vcsw properties */
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
    /* Base structure for vcr properties */
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
    /* Base structure for vcvs properties */
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
    /* Base structure for vccs properties */
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
    /* Base structure for cccs properties */
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
    /* Base structure for ccvs properties */
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
    /* Base structure for SPST properties */
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
    /* Base structure for opamp properties */
    this.PROPERTY_OPAMP = {
      tag: 'OP',
      units: '',
      options: [''],
      options_units: [''],
      option_limits: {}
    };
    /* Base structure for vsat properties */
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
    /* Base structure for saw wave source properties */
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
    /* Base structure for triangle wave source properties */
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
    /* Base structure for adder properties */
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
    /* Base structure for subtractor properties */
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
    /* Base structure for multiplier properties */
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
    /* Base structure for greater than properties */
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
    /* Base structure for adder properties */
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
    /* Base structure for nmosfet properties */
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
    /* Base structure for pmosfet properties */
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
    /* Base structure for npnbjt properties */
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
    /* Base structure for pnpbjt properties */
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
    /* Base structure for transformer properties */
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
    /* Base structure for adc properties */
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
    /* Base structure for dac properties */
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
    /* Base structure for pwm properties */
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
    /* Base structure for integrator properties */
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
    /* Base structure for differentiator properties */
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
    /* Base structure for gain properties */
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
    /* Base structure for abs properties */
    this.PROPERTY_ABS = {
      'Input Voltage': 0,
      'Output Voltage': 0,
      tag: 'ABS',
      units: '',
      options: [''],
      options_units: [''],
      option_limits: {}
    };
    /* Base structure for lpf properties */
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
    /* Base structure for hpf properties */
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
    /* Base structure for rail properties */
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
    /* Base structure for relay properties */
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
    /* Base structure for pid properties */
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
    /* Base structure for samplers properties */
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
    /* Base structure for Look-Up-Table properties */
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
    /* Base structure for tptz properties */
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
    /* Base structure for note properties */
    this.PROPERTY_NOTE = {
      Note: 'empty',
      tag: 'NOTE',
      'Text Style': this.TEXT_STYLE_1,
      'Show Marker': this.ON,
      units: '',
      options: ['Note', 'Text Style', 'Show Marker'],
      options_units: ['', '', ''],
      /* This element doesn't have one! */
      option_limits: {
        Note: [-1, 1]
      }
    };
    /* Base structure for fuse properties */
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
    /* Base structure for dff properties */
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
    /* Keeps track of all the changes made to elements. There is a manager for
    the history generated inside the application. Its queued up so we don't miss
    anything! */
    this.HISTORY_MANAGER = {
      packet: []
    };
    /* The various landuages available to pick from. */
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
    /* The current language index. */
    this.LANGUAGE_INDEX = this.LANGUAGE_INDEX_ENGLISH;
    /* Base structure for resistor properties */
    this.SYSTEM_OPTIONS = {
      options: ['Language', 'Automatic Timestep', 'Shortcut Hints', 'Full Window', '', ''],
      values: [this.LANGUAGES[this.LANGUAGE_INDEX], this.OFF, this.ON, this.OFF, this.OFF, this.OFF]
    };
    /* Index's to access system options. Make sure they're in order. */
    let indexer = 0;
    this.CIRCLE_BUFFER = [];
    this.LINE_BUFFER = [];
    this.SYSTEM_OPTION_LANGUAGE = indexer++;
    this.SYSTEM_OPTION_AUTOMATIC_TIMESTEP = indexer++;
    this.SYSTEM_OPTION_SHORTCUT_HINTS = indexer++;
    this.SYSTEM_OPTION_STRETCH_WINDOW = indexer++;
    if (this.MOBILE_MODE) {
      this.SYSTEM_OPTIONS['values'][this.SYSTEM_OPTION_SHORTCUT_HINTS] = this.OFF;
    }
    /* 99.999% Of the colors are stored here for conveinence. This is to help when moving from canvas-2d to some other libraries
    in the future. Paint.js has one definition there... (The order of includes are hard to manage.)*/
    this.BACKGROUND_COLOR = this.ColorNameToHex('black');
    this.ELEMENT_COLOR = this.ColorNameToHex('silver');
    this.SELECTED_COLOR = this.ColorNameToHex('cyan');
    this.MULTI_SELECTED_COLOR = this.ColorNameToHex('yellow');
    this.WORKSPACE_WORK_AREA_COLOR = this.ColorNameToHex('#292D29');
    this.GRAPH_AREA_COLOR = this.ColorNameToHex('#282828');
    this.ZOOM_AREA_COLOR = this.ColorNameToHex('#3C3C3C');
    this.TRACE_I_COLOR = this.ColorNameToHex('cyan');
    this.TRACE_II_COLOR = this.ColorNameToHex('magenta');
    this.TRACE_III_COLOR = this.ColorNameToHex('green');
    this.TRACE_DEFAULT_COLOR = this.ColorNameToHex('yellow');
    this.MENU_ICON_ACTIVE_COLOR = this.ColorNameToHex('cyan');
    this.MENU_ICON_INACTIVE_COLOR = this.ColorNameToHex('#9B9B9B');
    this.MENU_ICON_DEFAULT_COLOR = this.ColorNameToHex('white');
    this.MENU_HIGHLIGHT_COLOR = this.ColorNameToHex('#606060');
    this.MENU_FILL_COLOR = this.ColorNameToHex('gray');
    this.GENERAL_WHITE_COLOR = this.ColorNameToHex('white');
    this.GENERAL_BLACK_COLOR = this.ColorNameToHex('black');
    this.GENERAL_GRAY_COLOR = this.ColorNameToHex('gray');
    this.GENERAL_GREEN_COLOR = this.ColorNameToHex('green');
    this.GENERAL_RED_COLOR = this.ColorNameToHex('red');
    this.GENERAL_BLUE_COLOR = this.ColorNameToHex('blue');
    this.GENERAL_BOUNDS_COLOR = this.ColorNameToHex('#404040');
    this.GENERAL_CYAN_COLOR = this.ColorNameToHex('cyan');
    this.GENERAL_YELLOW_COLOR = this.ColorNameToHex('yellow');
    /* The default font for all paints created in the system */
    this.DEFAULT_FONT = 'Arial';
    /* A flag to detail if the user has selected a file or not. */
    this.USER_FILE_SELECTED = false;
    /* A descriptor for the users circuit */
    this.USER_FILE = new Circuit();
    /* Key Event Code Constants */
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
    /* No modifier, Shift, Capslock */
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
    /* Variables for Circuit Simulation */
    this.TIME_STEP = 1e-6;
    /* The magnitude of the random variable for the entire simulation. */
    this.RANDOM_VAR_MAGNITUDE = 1e-18;
    /* Keeps track of the simulation time. */
    this.SIMULATION_TIME = 0;
    /* Serializing the inputs (so they occur in a predictable manner.) */
    this.RESIZE_EVENT = false;
    /* Used for changing from window modes. */
    this.FORCE_RESIZE_EVENT = false;
    this.ON_RESTORE_EVENT = false;
    this.MOUSE_DOWN_EVENT = false;
    this.MOUSE_MOVE_EVENT = false;
    this.MOUSE_UP_EVENT = false;
    this.MOUSE_DOUBLE_CLICK_EVENT = false;
    this.MOUSE_WHEEL_EVENT = false;
    this.KEY_UP_EVENT = false;
    this.KEY_DOWN_EVENT = false;
    /* A flag to disable the system from drawing to the real buffer. */
    this.DRAW_BLOCK = false;
    /* Flag to dictate that the system is ready for a close up (Taking a snaps shot of  the workspace area.). */
    this.PICTURE_REQUEST = false;
    this.PICTURE_ZOOM = this.ZOOM_MAX;
    this.PICTURE_EXPOSURE_TIME = 3;
    /* Canvas drawing optimization flag */
    this.CANVAS_DRAW_REQUEST = false;
    this.CANVAS_DRAW_REQUEST_COUNTER = 0;
    this.CANVAS_DRAW_REQUEST_COUNTER_MAX = 3;
    this.CANVAS_DRAW_EVENT = false;
    this.CANVAS_REDRAW_MAX = 3;
    this.CANVAS_REDRAW_COUNTER = 0;
    /* Quantizing the stroke width's for the entire system. Ideally, the system will use one of these sizes. */
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
    /* Quantizing the text size's for the entire system. Ideally, the system will use one of these sizes. */
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
    /* Accessing some variables in javascript is expensive, so let's just cache them. */
    this.SURFACE_OFFSET_LEFT = 0;
    this.SURFACE_OFFSET_TOP = 0;
    /* This is how history event components are seperated. */
    this.PACKET_DIVIDER = '#DIVIDER#';
    /* Paint used to draw the grid highlights when a component is moved. */
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
    /* Dividing PI into a 16-bit number (Qx) */
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
    /* This is the maximum text length of any text field. */
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
    this.RESIZE_W_FACTOR = 0;
    this.RESIZE_H_FACTOR = 0;
    this.ANGLE_SEARCH_OBJ;
    this.ANGLE_RADIAN_SEARCH_OBJ;
    this.ANGLE_ARRAY = [];
    this.ANGLE_RADIAN_ARRAY = [];
    this.SAVED_ANGLE = -1;
    this.SAVED_ANGLE_RADIANS = -1;
    this.GARBAGE_COLLECTOR_SIZE = 16;
    this.TEMP_BOOLEAN = false;
    this.general_index = -1;
    this.ELEMENT_MAX = [];
    this.METER_MAX = [];
    this.NON_LINEAR_MAX = [];
    this.MAX_GENERAL_NUMBER = 0;
  }
  ColorNameToHex(color) {
    var colors = {
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
    if (typeof colors[color.toLowerCase()] != 'undefined') return colors[color.toLowerCase()];
    return color;
  }
  sine(theta) {
    return this.TRIG_SINE_TABLE[(theta * this.TRIG_TABLE_INDEX_CONSTANT) & this.TRIG_TABLE_MASK];
  }
  cosine(theta) {
    return this.TRIG_SINE_TABLE[(theta * this.TRIG_TABLE_INDEX_CONSTANT + this.TRIG_TABLE_ROUND) & this.TRIG_TABLE_MASK];
  }
  /* Re-calculates the new position of an object based on the last screen width and the current screen width. */
  remap_position(input, is_width) {
    if (is_width === true) {
      return view_port.right - (this.last_view_port_right - input) * this.RESIZE_W_FACTOR;
    } else {
      return view_port.bottom - (this.last_view_port_bottom - input) * this.RESIZE_H_FACTOR;
    }
  }
  reset_angle_cache() {
    this.ANGLE_ARRAY = [];
  }
  reset_angle_radian_cache() {
    this.ANGLE_RADIAN_ARRAY = [];
  }
  /* Search the array to see if any metrics exist for the text w/ the input paint. The function also cleans up the storage array. */
  search_angle_array(x, y) {
    this.TEMP_BOOLEAN = false;
    this.SAVED_ANGLE = -1;
    for (var i: number = 0; i < this.ANGLE_ARRAY.length; i++) {
      if (!this.TEMP_BOOLEAN) {
        this.ANGLE_SEARCH_OBJ = this.ANGLE_ARRAY[i];
        if (this.ANGLE_SEARCH_OBJ['x'] === x && this.ANGLE_SEARCH_OBJ['y'] === y) {
          this.SAVED_ANGLE = this.ANGLE_SEARCH_OBJ['angle'];
          this.TEMP_BOOLEAN = true;
          break;
        }
      }
    }
    return this.TEMP_BOOLEAN;
  }
  /* Search the array to see if any metrics exist for the text w/ the input paint. The function also cleans up the storage array. */
  search_angle_radian_array(x, y) {
    this.TEMP_BOOLEAN = false;
    this.SAVED_ANGLE_RADIANS = -1;
    for (var i: number = 0; i < this.ANGLE_RADIAN_ARRAY.length; i++) {
      if (!this.TEMP_BOOLEAN) {
        this.ANGLE_RADIAN_SEARCH_OBJ = this.ANGLE_RADIAN_ARRAY[i];
        if (this.ANGLE_RADIAN_SEARCH_OBJ['x'] === x && this.ANGLE_RADIAN_SEARCH_OBJ['y'] === y) {
          this.SAVED_ANGLE_RADIANS = this.ANGLE_RADIAN_SEARCH_OBJ['angle'];
          this.TEMP_BOOLEAN = true;
          break;
        }
      }
    }
    return this.TEMP_BOOLEAN;
  }
  retrieve_angle(x, y) {
    if (this.search_angle_array(x, y)) {
      return this.SAVED_ANGLE;
    } else {
      if (this.ANGLE_ARRAY.length > this.GARBAGE_COLLECTOR_SIZE) {
        this.house_keeping(x, y);
      }
      this.ANGLE_ARRAY.push({
        x: x,
        y: y,
        angle: this.calc_degree(x, y)
      });
      return this.ANGLE_ARRAY[this.ANGLE_ARRAY.length - 1]['angle'];
    }
  }
  retrieve_angle_radian(x, y) {
    if (this.search_angle_radian_array(x, y)) {
      return this.SAVED_ANGLE_RADIANS;
    } else {
      if (this.ANGLE_RADIAN_ARRAY.length > this.GARBAGE_COLLECTOR_SIZE) {
        this.house_keeping_radians(x, y);
      }
      this.ANGLE_RADIAN_ARRAY.push({
        x: x,
        y: y,
        angle: this.calc_degree_radians(x, y)
      });
      return this.ANGLE_RADIAN_ARRAY[this.ANGLE_RADIAN_ARRAY.length - 1]['angle'];
    }
  }
  house_keeping(x, y) {
    this.ANGLE_ARRAY.splice(this.ANGLE_ARRAY.length - 1, 1);
  }
  house_keeping_radians(x, y) {
    this.ANGLE_RADIAN_ARRAY.splice(this.ANGLE_RADIAN_ARRAY.length - 1, 1);
  }
  /* Calculate the angle of a vector in degrees */
  calc_degree(x, y) {
    this.general_integer = this.atan2_approx2(y, x) * global._180_DIV_PI;
    if (this.general_integer < 0) {
      this.general_integer += 360;
    }
    return this.general_integer;
  }
  /* calculate the angle of a vector in radians */
  calc_degree_radians(x, y) {
    this.general_integer = this.atan2_approx2(y, x);
    if (this.general_integer < 0) {
      this.general_integer += this.PI_MUL_2;
    }
    return this.general_integer;
  }
  /* Converts degrees to radians */
  to_radians(degrees) {
    return degrees * this.PI_DIV_180;
  }
  inv_sqrt(x) {
    var x2 = 0.5 * (this.inv_sqrt_f32[0] = x);
    this.inv_sqrt_u32[0] = 0x5f3759df - (this.inv_sqrt_u32[0] >> 1);
    var y = this.inv_sqrt_f32[0];
    y = y * (1.5 - x2 * y * y);
    return y;
  }
  atan2_approx2(y, x) {
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
  /* Calculates the norm of a vector */
  norm(x, y) {
    return Math.sqrt(x * x + y * y);
  }
  /* Rounds a value to three decimal places */
  round(value) {
    return Math.round((value + Number.EPSILON) * 1000) / 1000;
  }
  /* A function to try and safely cast a float to an "int" */
  cast_int(value) {
    return Math.trunc(Math.round(value));
  }
  /* Returns the average of two numbers: a and b */
  get_average2(a, b) {
    return (a + b) * 0.5;
  }
  /* Calculate the incenter of a triangle. NOTE: Don't use this.general_integerx here..., it'll cause a value change.
  because of calc_degree_radians */
  equilateral_triangle_center(p1_x, p2_x, p3_x, p1_y, p2_y, p3_y) {
    let temp = 0;
    temp = this.norm(p2_x - p1_x, p2_y - p1_y) * 0.5;
    let theta_p1_p2 = this.retrieve_angle_radian(p2_x - p1_x, p2_y - p1_y);
    let p_x = p1_x + temp * this.cosine(theta_p1_p2);
    let p_y = p1_y + temp * this.sine(theta_p1_p2);
    let theta_p_p3 = this.retrieve_angle_radian(p3_x - p_x, p3_y - p_y);
    let c_x = p_x + temp * this.cosine(theta_p_p3);
    let c_y = p_y + temp * this.sine(theta_p_p3);
    return Array(c_x, c_y);
  }
  /* Returns the average of four numbers: a, b, c, and d */
  get_average4(a, b, c, d) {
    return (a + b + c + d) * 0.25;
  }
  /* Check to see if an element is null or undefined. */
  not_null(obj) {
    return !(obj == this.NULL);
  }
  /* Using lodash to deep clone an object. */
  copy(obj) {
    return _.cloneDeep(obj);
  }
  /* A safe function to print stuff out when debugging. Developer mode is automatically set to false
  when the production script is run. */
  print(...obj) {
    if (this.DEVELOPER_MODE) {
      console.log(obj);
    }
  }
  /* A function to quickly format a number into SI units */
  exponentiate_quickly(input) {
    let str = '';
    let val = 0;
    let abs_input = Math.abs(input);
    let found = false;
    for (var i: number = 0; i < this.SI_UNIT_THRESHOLD_ARRAY.length; i++) {
      if (abs_input >= this.SI_UNIT_THRESHOLD_ARRAY[i]) {
        val = input * this.SI_UNIT_ARRAY[i];
        str = this.round(val) + this.SI_UNIT_ABBREVIATION[i];
        found = true;
        break;
      } else if (abs_input === 0) {
        val = 0;
        str = this.ELEMENT_VAL_TEMPLATE.replace('{VAL}', String(val)).replace('{UNIT}', '');
        found = true;
        break;
      }
    }
    if (!found) {
      str = '--- ';
    }
    return str;
  }
  /* Find the max of the elements. This is so we don't waste time looping
  through each element.
  This is automatically generated, no touchy! */
  element_max() {
    /* #INSERT_GENERATE_MAX_ELEMENT# */
    /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
    this.ELEMENT_MAX = Array(
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
      grts.length,
      tptzs.length,
      transformers.length
    );
    /* <!-- END AUTOMATICALLY GENERATED !--> */
    this.MAX_GENERAL_NUMBER = 0;
    for (var i: number = 0; i < this.ELEMENT_MAX.length; i++) {
      if (this.ELEMENT_MAX[i] > this.MAX_GENERAL_NUMBER) {
        this.MAX_GENERAL_NUMBER = this.ELEMENT_MAX[i];
      }
    }
    return this.MAX_GENERAL_NUMBER;
  }
  /* Find the highest number of meter type elements.
  This is automatially generated! */
  meter_max() {
    /* #INSERT_GENERATE_MAX_METER# */
    /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
    this.METER_MAX = Array(voltmeters.length, ohmmeters.length, ammeters.length, wattmeters.length);
    /* <!-- END AUTOMATICALLY GENERATED !--> */
    this.MAX_GENERAL_NUMBER = 0;
    for (var i: number = 0; i < this.METER_MAX.length; i++) {
      if (this.METER_MAX[i] > this.MAX_GENERAL_NUMBER) {
        this.MAX_GENERAL_NUMBER = this.METER_MAX[i];
      }
    }
    return this.MAX_GENERAL_NUMBER;
  }
  /* Find the maximum size of non-linear elements. */
  non_linear_max() {
    /* #INSERT_GENERATE_MAX_NON_LINEAR# */
    /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
    this.NON_LINEAR_MAX = Array(diodes.length, leds.length, zeners.length, nmosfets.length, pmosfets.length, npns.length, pnps.length);
    /* <!-- END AUTOMATICALLY GENERATED !--> */
    this.MAX_GENERAL_NUMBER = 0;
    for (var i: number = 0; i < this.NON_LINEAR_MAX.length; i++) {
      if (this.NON_LINEAR_MAX[i] > this.MAX_GENERAL_NUMBER) {
        this.MAX_GENERAL_NUMBER = this.NON_LINEAR_MAX[i];
      }
    }
    return this.MAX_GENERAL_NUMBER;
  }
  /* Line collision baby! */
  line_collision(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
    let s1_x = p1_x - p0_x;
    let s1_y = p1_y - p0_y;
    let s2_x = p3_x - p2_x;
    let s2_y = p3_y - p2_y;
    let s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    let t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
    return s >= 0 && s <= 1 && t >= 0 && t <= 1;
  }
  /* Decodes a key code from a key event */
  decode_key(key_event) {
    let shift = key_event['shift'];
    let caps = key_event['caps'];
    let code = key_event['event'].code;
    let ret = '';
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
  key_to_code(character) {
    let ret = '';
    for (var i: number = 0; i < this.KEY_EVENT_KEYS.length; i++) {
      if (character === this.KEY_EVENT_CODES[this.KEY_EVENT_KEYS[i]][0] || character === this.KEY_EVENT_CODES[this.KEY_EVENT_KEYS[i]][1]) {
        ret = global.copy(this.KEY_EVENT_KEYS[i]);
        break;
      }
    }
    return ret;
  }
  /* Detects if a key is alpha numeric or not. */
  is_alpha_numeric(key_event) {
    return /[a-z A-Z0-9]/.test(this.decode_key(key_event));
  }
  /* Detects if a key is alpha numeric or not. */
  is_alpha_numeric_note(key_event) {
    return /[!@#$%`~^&_{}()a-z A-Z0-9=:'",?<>;:*/+-|]/.test(this.decode_key(key_event));
  }
  /* Detects if a key is a valid si unit or a number. */
  is_valid_si_units(key_event) {
    return /[-.kmu0123456789MnGpf]/.test(this.decode_key(key_event));
  }
  /* General function to limit a number within a range. */
  limit(inp, low, high) {
    if (inp < low) {
      return low;
    } else if (inp > high) {
      return high;
    } else {
      return inp;
    }
  }
  /* General function for creating getting the current date */
  get_date_stamp() {
    let date = new Date();
    return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear();
  }
  /* Genetating a timestamp! */
  get_time_stamp() {
    let date = new Date();
    let TIMESTAMP_TEMPLATE = '{DATE}->{TIME_ZONE}';
    return TIMESTAMP_TEMPLATE.replace('{DATE}', date.toJSON()).replace('{TIME_ZONE}', String(date.getTimezoneOffset()));
  }
  /* Logarithmic Damping Algorithm. Base E. */
  log_damping(next, now, gamma, kappa) {
    return now + (gamma / kappa) * this.signum(next - now) * this.logbx(Math.E, 1 + Math.abs(next - now) * kappa);
  }
  /* Returns the sign of the number.*/
  signum(inp) {
    if (inp < 0) {
      return -1;
    } else {
      return 1;
    }
  }
  /* Change of base formula. */
  logbx(b, x) {
    return Math.log(x) / Math.log(b);
  }
  map_range(inp, lower_bound, upper_bound) {
    return lower_bound + inp * (upper_bound - lower_bound);
  }
  perm32(inp) {
    this.general_integer = 12;
    /* 12 Rounds */
    let x = ((inp >> 8) ^ inp) * 0x6b + this.general_integer--;
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
  unique_color(net_name) {
    let rgb = this.perm32(net_name.hashCode());
    let r,
      g,
      b = 0;
    r = (rgb & 0x00ff0000) >> 16;
    g = (rgb & 0x0000ff00) >> 8;
    b = rgb & 0x000000ff;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
  wrap(inp, max) {
    return inp - max * Math.floor(inp / max);
  }
  linterp(x_arr, y_arr, inp) {
    let k = this.linsearch(x_arr, inp, y_arr.length);
    let x0 = x_arr[k],
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
  linsearch(x_arr, inp, size) {
    let i = 0;
    let out = 0;
    for (i = 0; i < size - 1; i++) {
      if (inp >= x_arr[i] && inp <= x_arr[i + 1]) {
        out = i;
        break;
      }
    }
    return out;
  }
  min3(a, b, c) {
    return Math.min(a, Math.min(b, c));
  }
}
