declare type MeterTemplate_T = {
  Tag: string;
  Value: number;
};

declare type WIRE_REFERENCE_T = {
  wire_id: number;
  anchor_point: number;
  linkage: number;
};

/* To facilitate the generation of new wires. */
declare type WIRE_BUILDER_T = {
  n1: number;
  id1: number;
  type1: number;
  anchor_point1: number;
  linkage1: {
    wire: number;
  };
  n2: number;
  id2: number;
  type2: number;
  anchor_point2: number;
  linkage2: {
    wire: number;
  };
  step: number;
};

declare type KEY_EVENT_T = {
  event: KeyboardEvent;
  alt: boolean;
  shift: boolean;
  ctrl: boolean;
  caps: boolean;
};

declare type HISTORY_MANAGER_T = {
  packet: Array<string>;
};

/* Base structure for system properties */
declare type SYSTEM_OPTIONS_T = {
  options: Array<string>;
  values: Array<string>;
};

declare type PATH_1P_T = {
  command: string;
  x1: number;
  y1: number;
};

declare type PATH_2P_T = {
  command: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

declare type PATH_3P_T = {
  command: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  x3: number;
  y3: number;
  x4: number;
  y4: number;
};

declare type PATH_T = PATH_1P_T | PATH_2P_T | PATH_3P_T;

declare type KEYBOARD_EXPAND_T = {
  Id: number;
  Factor: number;
};

declare type ON_SCREEN_KEYBOARD_KEY_EVENT_T = {
  code: string;
};

declare type PAINT_METRICS_T = {
  width: number;
  ascent: number;
  descent: number;
};

declare type OPTIONS_T = {
  c0: {
    string: string;
    number: number;
  };
  c1: {
    string: string;
    number: number;
  };
  c2: {
    string: string;
    number: number;
  };
  c3: {
    string: string;
    number: number;
  };
};

declare type PAINT_METRICS_ARRAY_T = {
  text: string;
  font: string;
  'text size': number;
  metric: PAINT_METRICS_T;
};

declare type ANGLE_STRUCT_T = {
  x: number;
  y: number;
  angle: number;
};

declare type SCOPE_ENTRY_T = {
  /* The id of the element (should be the same as elm.properties.id) */
  element_id: number;
  /* The type of the element (should be the same as elm.properties.type) */
  element_type: number;
  /* The tag of the element (should be the same as property.tag) */
  element_tag: string;
};

declare type SYSTEM_INITIALIZATION_T = {
  step: number;
  max: number;
  completed: boolean;
};

declare type TIME_DATA_TEMPLATE_T = {
  [Frequency: string]: number;
  Resistance: number;
  Capacitance: number;
  Inductance: number;
};

/* Used to determine which wire point is associated to an elements nodes. */
declare type ANCHOR_POINT_T = {
  p1: number;
  p2: number;
  p3: number;
  p4: number;
};

/* Structure for saving meta data details */
declare type PROPERTY_META_DATA_T = {
  [company: string]: string;
  version: string;
  date: string;
};

/* Base structure for resistor properties */
declare type PROPERTY_RESISTOR_T = {
  Resistance: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Resistance: Array<number>;
  };
};

/* Base structure for SPST properties */
declare type PROPERTY_SPST_T = {
  'Open Resistance': number;
  'Closed Resistance': number;
  'Switch State': string;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Closed Resistance': Array<number>;
  };
};

/* Base structure for NOT properties */
declare type PROPERTY_NOT_T = {
  'High Voltage': number;
  'Input Voltage': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'High Voltage': Array<number>;
  };
};
/* Base structure for diode properties */
declare type PROPERTY_DIODE_T = {
  'Emission Coefficient': number;
  'Saturation Current': number;
  'Equivalent Current': number;
  Voltage: number;
  'Last Voltage': number;
  'Last Current': number;
  Resistance: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Emission Coefficient': Array<number>;
    'Saturation Current': Array<number>;
  };
};
/* Base structure for led properties */
declare type PROPERTY_LED_T = {
  'Emission Coefficient': number;
  'Saturation Current': number;
  Wavelength: number;
  'Turn On Current': number;
  'Equivalent Current': number;
  Voltage: number;
  'Last Voltage': number;
  'Last Current': number;
  Resistance: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Emission Coefficient': Array<number>;
    'Saturation Current': Array<number>;
    Wavelength: Array<number>;
  };
};
/* Base structure for zener properties */
declare type PROPERTY_ZENER_T = {
  'Zener Voltage': number;
  'Emission Coefficient': number;
  'Saturation Current': number;
  'Equivalent Current': number;
  Voltage: number;
  'Last Voltage': number;
  'Last Current': number;
  Resistance: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Zener Voltage': Array<number>;
    'Emission Coefficient': Array<number>;
    'Saturation Current': Array<number>;
  };
};
/* Base structure for voltmeter properties */
declare type PROPERTY_VOLTMETER_T = {
  Voltage: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for voltmeter properties */
declare type PROPERTY_WATTMETER_T = {
  Wattage: number;
  'Test Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for ammeter properties */
declare type PROPERTY_AMMETER_T = {
  Current: number;
  'Test Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for ohmmeter properties */
declare type PROPERTY_OHMMETER_T = {
  'Sensed Resistance': number;
  'Test Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for resistor properties */
declare type PROPERTY_WIRE_T = {
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for dc source properties */
declare type PROPERTY_DCSOURCE_T = {
  Voltage: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Voltage: Array<number>;
  };
};
/* Base structure for ac source properties */
declare type PROPERTY_ACSOURCE_T = {
  Voltage: number;
  Frequency: number;
  Phase: number;
  Offset: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Voltage: Array<number>;
    Frequency: Array<number>;
    Phase: Array<number>;
    Offset: Array<number>;
  };
};
/* Base structure for square wave source properties */
declare type PROPERTY_SQUAREWAVE_T = {
  Voltage: number;
  Frequency: number;
  Duty: number;
  Offset: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Voltage: Array<number>;
    Frequency: Array<number>;
    Duty: Array<number>;
    Offset: Array<number>;
  };
};
/* Base structure for ac source properties */
declare type PROPERTY_ACCURRENT_T = {
  Current: number;
  Frequency: number;
  Phase: number;
  Offset: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Current: Array<number>;
    Frequency: Array<number>;
    Phase: Array<number>;
    Offset: Array<number>;
  };
};
/* Base structure for dc current properties */
declare type PROPERTY_DCCURRENT_T = {
  Current: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Current: Array<number>;
  };
};
/* Base structure for capacitor properties */
declare type PROPERTY_CAPACITOR_T = {
  Capacitance: number;
  'Transient Resistance': number;
  'Transient Current': number;
  'Equivalent Current': number;
  'Initial Voltage': number;
  'Transient Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Capacitance: Array<number>;
    'Initial Voltage': Array<number>;
  };
};
/* Base structure for inductor properties */
declare type PROPERTY_INDUCTOR_T = {
  Inductance: number;
  'Transient Resistance': number;
  'Transient Current': number;
  'Equivalent Current': number;
  'Initial Current': number;
  'Transient Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Inductance: Array<number>;
    'Initial Current': Array<number>;
  };
};
/* Base structure for ground properties */
declare type PROPERTY_GROUND_T = {
  tag: string;
  units: string;
};
/* Base structure for net properties */
declare type PROPERTY_NET_T = {
  Name: string;
  tag: string;
  'Show Name': string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  /* This element doesn't have one! */
  option_limits: {
    Name: Array<number>;
  };
};
/* Base structure for constant properties */
declare type PROPERTY_CONSTANT_T = {
  Voltage: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Voltage: Array<number>;
  };
};
/* Base structure for potentiometer properties */
declare type PROPERTY_POTENTIOMETER_T = {
  Resistance: number;
  'Wiper Percentage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Resistance: Array<number>;
    'Wiper Percentage': Array<number>;
  };
};
/* Base structure for and properties */
declare type PROPERTY_AND_T = {
  'High Voltage': number;
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'High Voltage': Array<number>;
  };
};
/* Base structure for or properties */
declare type PROPERTY_OR_T = {
  'High Voltage': number;
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'High Voltage': Array<number>;
  };
};
/* Base structure for nand properties */
declare type PROPERTY_NAND_T = {
  'High Voltage': number;
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'High Voltage': Array<number>;
  };
};
/* Base structure for nor properties */
declare type PROPERTY_NOR_T = {
  'High Voltage': number;
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'High Voltage': Array<number>;
  };
};
/* Base structure for xor properties */
declare type PROPERTY_XOR_T = {
  'High Voltage': number;
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'High Voltage': Array<number>;
  };
};
/* Base structure for xnor properties */
declare type PROPERTY_XNOR_T = {
  'High Voltage': number;
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'High Voltage': Array<number>;
  };
};
/* Base structure for vcsw properties */
declare type PROPERTY_VCSW_T = {
  'High Voltage': number;
  'Closed Resistance': number;
  'Input Voltage': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'High Voltage': Array<number>;
    'Closed Resistance': Array<number>;
  };
};
/* Base structure for vcr properties */
declare type PROPERTY_VCR_T = {
  'Low Voltage': number;
  'High Voltage': number;
  Elm0: number;
  Elm1: number;
  Elm2: number;
  Elm3: number;
  Elm4: number;
  Interpolate: string;
  'Input Voltage': number;
  'Output Resistance': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Elm0: Array<number>;
    Elm1: Array<number>;
    Elm2: Array<number>;
    Elm3: Array<number>;
    Elm4: Array<number>;
    Interpolate: Array<string>;
  };
};
/* Base structure for vcvs properties */
declare type PROPERTY_VCVS_T = {
  Gain: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Gain: Array<number>;
  };
};
/* Base structure for vccs properties */
declare type PROPERTY_VCCS_T = {
  Gain: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Gain: Array<number>;
  };
};
/* Base structure for cccs properties */
declare type PROPERTY_CCCS_T = {
  Gain: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Gain: Array<number>;
  };
};
/* Base structure for ccvs properties */
declare type PROPERTY_CCVS_T = {
  Gain: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Gain: Array<number>;
  };
};
/* Base structure for SPST properties */
declare type PROPERTY_SPDT_T = {
  'Open Resistance': number;
  'Closed Resistance': number;
  'Switch State': string;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Closed Resistance': Array<number>;
  };
};
/* Base structure for opamp properties */
declare type PROPERTY_OPAMP_T = {
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for vsat properties */
declare type PROPERTY_VSAT_T = {
  'High Voltage': number;
  'Low Voltage': number;
  'Input Voltage': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'High Voltage': Array<number>;
    'Low Voltage': Array<number>;
  };
};
/* Base structure for saw wave source properties */
declare type PROPERTY_SAW_T = {
  Voltage: number;
  Frequency: number;
  Phase: number;
  Offset: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Voltage: Array<number>;
    Frequency: Array<number>;
    Phase: Array<number>;
    Offset: Array<number>;
  };
};
/* Base structure for triangle wave source properties */
declare type PROPERTY_TRI_T = {
  Voltage: number;
  Frequency: number;
  Phase: number;
  Offset: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Voltage: Array<number>;
    Frequency: Array<number>;
    Phase: Array<number>;
    Offset: Array<number>;
  };
};
/* Base structure for adder properties */
declare type PROPERTY_ADD_T = {
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for subtractor properties */
declare type PROPERTY_SUB_T = {
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for multiplier properties */
declare type PROPERTY_MUL_T = {
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for greater than properties */
declare type PROPERTY_GRT_T = {
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for adder properties */
declare type PROPERTY_DIV_T = {
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for nmosfet properties */
declare type PROPERTY_NMOS_T = {
  'W/L Ratio': number;
  "K'n": number;
  VTN: number;
  Lambda: number;
  Vgs: number;
  Vds: number;
  gds: number;
  gm: number;
  Io: number;
  'Mosfet Mode': number;
  'Last Vgs': number;
  'Last Io': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'W/L Ratio': Array<number>;
    "K'n": Array<number>;
    VTN: Array<number>;
    Lambda: Array<number>;
  };
};
/* Base structure for pmosfet properties */
declare type PROPERTY_PMOS_T = {
  'W/L Ratio': number;
  "K'p": number;
  VTP: number;
  Lambda: number;
  Vsg: number;
  Vsd: number;
  gsd: number;
  gm: number;
  Io: number;
  'Mosfet Mode': number;
  'Last Vsg': number;
  'Last Io': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'W/L Ratio': Array<number>;
    "K'p": Array<number>;
    VTP: Array<number>;
    Lambda: Array<number>;
  };
};
/* Base structure for npnbjt properties */
declare type PROPERTY_NPN_T = {
  'Forward Beta': number;
  'Reverse Beta': number;
  'Saturation Current': number;
  'Emission Coefficient': number;
  Vbe: number;
  Vbc: number;
  g_ee: number;
  g_ec: number;
  g_ce: number;
  g_cc: number;
  i_e: number;
  i_c: number;
  I_e: number;
  I_c: number;
  'Last Vbe': number;
  'Last Io': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Forward Beta': Array<number>;
    'Reverse Beta': Array<number>;
    'Saturation Current': Array<number>;
  };
};
/* Base structure for pnpbjt properties */
declare type PROPERTY_PNP_T = {
  'Forward Beta': number;
  'Reverse Beta': number;
  'Saturation Current': number;
  'Emission Coefficient': number;
  Veb: number;
  Vcb: number;
  g_ee: number;
  g_ec: number;
  g_ce: number;
  g_cc: number;
  i_e: number;
  i_c: number;
  I_e: number;
  I_c: number;
  'Last Veb': number;
  'Last Io': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Forward Beta': Array<number>;
    'Reverse Beta': Array<number>;
    'Saturation Current': Array<number>;
  };
};
/* Base structure for transformer properties */
declare type PROPERTY_TRAN_T = {
  'Turns Ratio': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'NP/NS': Array<number>;
  };
};
/* Base structure for adc properties */
declare type PROPERTY_ADC_T = {
  'Bit Resolution': number;
  'Reference Voltage': number;
  LSB: number;
  'Max Bits': number;
  'Input Voltage': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Bit Resolution': Array<number>;
    'Reference Voltage': Array<number>;
  };
};
/* Base structure for dac properties */
declare type PROPERTY_DAC_T = {
  'Bit Resolution': number;
  'Reference Voltage': number;
  LSB: number;
  'Max Bits': number;
  'Input Voltage': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Bit Resolution': Array<number>;
    'Reference Voltage': Array<number>;
  };
};
/* Base structure for pwm properties */
declare type PROPERTY_PWM_T = {
  'Max Frequency': number;
  'Min Frequency': number;
  'Max Duty': number;
  'Min Duty': number;
  Phase: number;
  Postscaler: number;
  Counter: number;
  Frequency: number;
  Duty: number;
  'High Voltage': number;
  'Low Voltage': number;
  'Input Voltage1': number;
  'Input Voltage2': number;
  A: number;
  'Saw Wave': number;
  'Output Voltage': number;
  'Last Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Max Frequency': Array<number>;
    'Min Frequency': Array<number>;
    'Max Duty': Array<number>;
    'Min Duty': Array<number>;
    Phase: Array<number>;
    Postscaler: Array<number>;
  };
};
/* Base structure for integrator properties */
declare type PROPERTY_INTEGRATOR_T = {
  'Initial Value': number;
  'High Voltage': number;
  'Low Voltage': number;
  'Last Value': number;
  'Input Voltage': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Initial Value': Array<number>;
    'High Voltage': Array<number>;
    'Low Voltage': Array<number>;
  };
};
/* Base structure for differentiator properties */
declare type PROPERTY_DIFFERENTIATOR_T = {
  'Initial Value': number;
  'High Voltage': number;
  'Low Voltage': number;
  'Last Value': number;
  'Input Voltage': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Initial Value': Array<number>;
    'High Voltage': Array<number>;
    'Low Voltage': Array<number>;
  };
};
/* Base structure for gain properties */
declare type PROPERTY_GAIN_T = {
  Gain: number;
  'Input Voltage': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Gain: Array<number>;
  };
};
/* Base structure for abs properties */
declare type PROPERTY_ABS_T = {
  'Input Voltage': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for lpf properties */
declare type PROPERTY_LPF_T = {
  'Cutoff Frequency': number;
  'Y Out': number;
  'Y Hat': number;
  Alpha: number;
  'Input Voltage': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Cutoff Frequency': Array<number>;
  };
};
/* Base structure for hpf properties */
declare type PROPERTY_HPF_T = {
  'Cutoff Frequency': number;
  'Y Out': number;
  'Y Hat': number;
  'X Hat': number;
  Alpha: number;
  'Input Voltage': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Cutoff Frequency': Array<number>;
  };
};
/* Base structure for rail properties */
declare type PROPERTY_RAIL_T = {
  Voltage: number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Voltage: Array<number>;
  };
};
/* Base structure for relay properties */
declare type PROPERTY_REL_T = {
  Inductance: number;
  'Transient Resistance': number;
  'Transient Current': number;
  'Equivalent Current': number;
  'Initial Current': number;
  'Turn on Current': number;
  'Closed Resistance': number;
  'Open Resistance': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Inductance: Array<number>;
    'Initial Current': Array<number>;
    'Turn on Current': Array<number>;
    'Closed Resistance': Array<number>;
  };
};
/* Base structure for pid properties */
declare type PROPERTY_PID_T = {
  Setpoint: number;
  Kp: number;
  Ki: number;
  Kd: number;
  'Min Output': number;
  'Max Output': number;
  'High Voltage': number;
  'Low Voltage': number;
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Setpoint: Array<number>;
    Kp: Array<number>;
    Ki: Array<number>;
    Kd: Array<number>;
    'Min Output': Array<number>;
    'Max Output': Array<number>;
  };
};
/* Base structure for samplers properties */
declare type PROPERTY_SAH_T = {
  'Input Voltage1': number;
  'Input Voltage2': number;
  'Output Voltage': number;
  'High Voltage': number;
  'Low Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};
/* Base structure for Look-Up-Table properties */
declare type PROPERTY_LUT_T = {
  Elm0: number;
  Elm1: number;
  Elm2: number;
  Elm3: number;
  Elm4: number;
  Interpolate: string;
  'High Voltage': number;
  'Low Voltage': number;
  'Input Voltage1': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    Elm0: Array<number>;
    Elm1: Array<number>;
    Elm2: Array<number>;
    Elm3: Array<number>;
    Elm4: Array<number>;
    Interpolate: Array<string>;
  };
};
/* Base structure for tptz properties */
declare type PROPERTY_TPTZ_T = {
  A1: number;
  A2: number;
  B0: number;
  B1: number;
  B2: number;
  'Input Voltage': number;
  'Output Voltage': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    A1: Array<number>;
    A2: Array<number>;
    B0: Array<number>;
    B1: Array<number>;
    B2: Array<number>;
  };
};
/* Base structure for note properties */
declare type PROPERTY_NOTE_T = {
  Note: string;
  tag: string;
  'Text Style': string;
  'Show Marker': string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  /* This element doesn't have one! */
  option_limits: {
    Note: Array<number>;
  };
};
/* Base structure for fuse properties */
declare type PROPERTY_FUSE_T = {
  'Current Rating': number;
  Resistance: number;
  Voltage: number;
  Broken: boolean;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {
    'Current Rating': Array<number>;
    Resistance: Array<number>;
  };
};
/* Base structure for dff properties */
declare type PROPERTY_DFF_T = {
  'Input Voltage1': number;
  'Last Clock': number;
  Clock: number;
  Q: number;
  '!Q': number;
  tag: string;
  units: string;
  options: Array<string>;
  options_units: Array<string>;
  option_limits: {};
};

declare type NET_COLOR_T = [string, number];

declare type ELEMENT_OPTIONS_T = {
  [c0: string]: number;
  c1: number;
  c2: number;
  c3: number;
};

declare type LANGUAGE_T = {
  [English: string]: string;
  Spanish: string;
  French: string;
  Italian: string;
  Dutch: string;
  Russian: string;
  German: string;
  Indonesian: string;
};

declare type ELEMENT_PROPERTY_T = PROPERTY_META_DATA_T &
  PROPERTY_RESISTOR_T &
  PROPERTY_SPST_T &
  PROPERTY_NOT_T &
  PROPERTY_DIODE_T &
  PROPERTY_LED_T &
  PROPERTY_ZENER_T &
  PROPERTY_VOLTMETER_T &
  PROPERTY_WATTMETER_T &
  PROPERTY_AMMETER_T &
  PROPERTY_OHMMETER_T &
  PROPERTY_WIRE_T &
  PROPERTY_DCSOURCE_T &
  PROPERTY_ACSOURCE_T &
  PROPERTY_SQUAREWAVE_T &
  PROPERTY_ACCURRENT_T &
  PROPERTY_DCCURRENT_T &
  PROPERTY_CAPACITOR_T &
  PROPERTY_INDUCTOR_T &
  PROPERTY_GROUND_T &
  PROPERTY_NET_T &
  PROPERTY_CONSTANT_T &
  PROPERTY_POTENTIOMETER_T &
  PROPERTY_AND_T &
  PROPERTY_OR_T &
  PROPERTY_NAND_T &
  PROPERTY_NOR_T &
  PROPERTY_XOR_T &
  PROPERTY_XNOR_T &
  PROPERTY_VCSW_T &
  PROPERTY_VCR_T &
  PROPERTY_VCVS_T &
  PROPERTY_VCCS_T &
  PROPERTY_CCCS_T &
  PROPERTY_CCVS_T &
  PROPERTY_SPDT_T &
  PROPERTY_OPAMP_T &
  PROPERTY_VSAT_T &
  PROPERTY_SAW_T &
  PROPERTY_TRI_T &
  PROPERTY_ADD_T &
  PROPERTY_SUB_T &
  PROPERTY_MUL_T &
  PROPERTY_GRT_T &
  PROPERTY_DIV_T &
  PROPERTY_NMOS_T &
  PROPERTY_PMOS_T &
  PROPERTY_NPN_T &
  PROPERTY_PNP_T &
  PROPERTY_TRAN_T &
  PROPERTY_ADC_T &
  PROPERTY_DAC_T &
  PROPERTY_PWM_T &
  PROPERTY_INTEGRATOR_T &
  PROPERTY_DIFFERENTIATOR_T &
  PROPERTY_GAIN_T &
  PROPERTY_ABS_T &
  PROPERTY_LPF_T &
  PROPERTY_HPF_T &
  PROPERTY_RAIL_T &
  PROPERTY_REL_T &
  PROPERTY_PID_T &
  PROPERTY_SAH_T &
  PROPERTY_LUT_T &
  PROPERTY_TPTZ_T &
  PROPERTY_NOTE_T &
  PROPERTY_FUSE_T &
  PROPERTY_DFF_T;
