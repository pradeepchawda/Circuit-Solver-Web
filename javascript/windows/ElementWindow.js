/**********************************************************************
 * Project           : Circuit Solver
 * File		        : ElementWindow.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to help organize the addition of new elements onto the board.
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
class ElementWindow {
    /* <!-- END AUTOMATICALLY GENERATED !--> */
    constructor(left, top, right, bottom) {
        this.ENABLE_MOUSE_WHEEL = true;
        this.positions = [];
        /* Controls the rate of the mouse wheel event for this specific element. */
        this.MOUSE_WHEEL_COUNTER = 0;
        this.MOUSE_WHEEL_COUNTER_MAX = 1;
        this.NAVIGATE_TEXT = '...';
        this.MAX_ICONS = 8;
        this.NAVIGATE_BACK = 0;
        this.NAVIGATE_FORWARD = this.MAX_ICONS - 1;
        /* Enforcing the system from cascading events. */
        this.first_touch_x = 0;
        this.first_touch_y = 0;
        /* This paint is used for drawing the "lines" that the component is comprised of. */
        this.line_paint = new Paint();
        /* This paint is used for drawing background colors. */
        this.fill_paint = new Paint();
        /* This paint is used for drawing the "text" that the component needs to display */
        this.text_paint = new Paint();
        /* This paint is used for drawing the icons that the component is comprised of. */
        this.hover_paint = new Paint();
        this.bounds = new RectF(0, 0, 0, 0);
        this.PAGE_NUMBER = 0;
        this.ELEMENT_INDEX = 1;
        this.MAX_PAGE_NUMBER = 0;
        /* #INSERT_GENERATE_CREATE_ELEMENT_WINDOW_ICON */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        this.resistor_symbol = new ResistorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.capacitor_symbol = new CapacitorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.inductor_symbol = new InductorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ground_symbol = new GroundSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.dcsource_symbol = new DCSourceSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.dccurrent_symbol = new DCCurrentSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.acsource_symbol = new ACSourceSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.accurrent_symbol = new ACCurrentSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.squarewave_symbol = new SquareWaveSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.sawwave_symbol = new SawWaveSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.trianglewave_symbol = new TriangleWaveSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.constant_symbol = new ConstantSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.net_symbol = new NetSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.note_symbol = new NoteSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.rail_symbol = new RailSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.voltmeter_symbol = new VoltMeterSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ohmmeter_symbol = new OhmMeterSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ammeter_symbol = new AmMeterSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.wattmeter_symbol = new WattMeterSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.fuse_symbol = new FuseSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.spst_symbol = new SinglePoleSingleThrowSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.spdt_symbol = new SinglePoleDoubleThrowSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.not_symbol = new NOTGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.diode_symbol = new DiodeSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.led_symbol = new LightEmittingDiodeSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.zener_symbol = new ZenerDiodeSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.potentiometer_symbol = new PotentiometerSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.and_symbol = new ANDGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.or_symbol = new ORGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.nand_symbol = new NANDGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.nor_symbol = new NORGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.xor_symbol = new XORGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.xnor_symbol = new XNORGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.dff_symbol = new DFlipFlopSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.vsat_symbol = new VoltageSaturationSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.adder_symbol = new AdderSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.subtractor_symbol = new SubtractorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.multiplier_symbol = new MultiplierSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.divider_symbol = new DividerSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.gain_symbol = new GainBlockSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.absval_symbol = new AbsoluteValueSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.vcsw_symbol = new VoltageControlledSwitchSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.vcvs_symbol = new VoltageControlledVoltageSourceSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.vccs_symbol = new VoltageControlledCurrentSourceSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.cccs_symbol = new CurrentControlledCurrentSourceSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ccvs_symbol = new CurrentControlledVoltageSourceSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.opamp_symbol = new OperationalAmplifierSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.nmosfet_symbol = new NChannelMOSFETSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.pmosfet_symbol = new PChannelMOSFETSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.npn_symbol = new NPNBipolarJunctionTransistorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.pnp_symbol = new PNPBipolarJunctionTransistorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.adc_symbol = new ADCModuleSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.dac_symbol = new DACModuleSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.samplers_symbol = new SampleAndHoldSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.pwm_symbol = new PulseWidthModulatorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.integrator_symbol = new IntegratorModuleSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.differentiator_symbol = new DifferentiatorModuleSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.lowpass_symbol = new LowPassFilterSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.highpass_symbol = new HighPassFilterSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.relay_symbol = new RelaySymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.pid_symbol = new PIDModuleSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.lut_symbol = new LookUpTableSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.vcr_symbol = new VoltageControlledResistorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.grt_symbol = new GreaterThanSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.tptz_symbol = new TPTZModuleSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.transformer_symbol = new TransformerSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ENABLE_MOUSE_WHEEL = true;
        this.positions = [];
        /* Controls the rate of the mouse wheel event for this specific element. */
        this.MOUSE_WHEEL_COUNTER = 0;
        this.MOUSE_WHEEL_COUNTER_MAX = 1;
        this.NAVIGATE_TEXT = '...';
        this.MAX_ICONS = 8;
        this.NAVIGATE_BACK = 0;
        this.NAVIGATE_FORWARD = this.MAX_ICONS - 1;
        /* Enforcing the system from cascading events. */
        this.first_touch_x = 0;
        this.first_touch_y = 0;
        /* This paint is used for drawing the "lines" that the component is comprised of. */
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        /* This paint is used for drawing background colors. */
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
        this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
        this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
        this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.fill_paint.set_font(global.DEFAULT_FONT);
        this.fill_paint.set_alpha(130);
        this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
        /* This paint is used for drawing the "text" that the component needs to display */
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(2 * global.CANVAS_TEXT_SIZE_6);
        }
        else {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_6);
        }
        this.text_paint.set_paint_baseline(this.text_paint.baseline.ALPHABETIC);
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.CENTER);
        /* This paint is used for drawing the icons that the component is comprised of. */
        this.hover_paint = new Paint();
        this.hover_paint.set_paint_style(this.hover_paint.style.FILL);
        this.hover_paint.set_paint_cap(this.hover_paint.cap.ROUND);
        this.hover_paint.set_paint_join(this.hover_paint.join.MITER);
        this.hover_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
        this.hover_paint.set_color(global.GENERAL_CYAN_COLOR);
        this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.hover_paint.set_font(global.DEFAULT_FONT);
        this.hover_paint.set_alpha(192);
        this.hover_paint.set_paint_align(this.hover_paint.align.CENTER);
        this.bounds = new RectF(left, top, right, bottom);
        this.load_positions();
        this.PAGE_NUMBER = 0;
        this.ELEMENT_INDEX = 1;
        this.MAX_PAGE_NUMBER = 0;
        /* #INSERT_GENERATE_CREATE_ELEMENT_WINDOW_ICON */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        this.resistor_symbol = new ResistorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.capacitor_symbol = new CapacitorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.inductor_symbol = new InductorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.ground_symbol = new GroundSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.dcsource_symbol = new DCSourceSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.dccurrent_symbol = new DCCurrentSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX = 1;
        this.MAX_PAGE_NUMBER++;
        this.acsource_symbol = new ACSourceSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.accurrent_symbol = new ACCurrentSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.squarewave_symbol = new SquareWaveSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.sawwave_symbol = new SawWaveSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.trianglewave_symbol = new TriangleWaveSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.constant_symbol = new ConstantSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX = 1;
        this.MAX_PAGE_NUMBER++;
        this.net_symbol = new NetSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.note_symbol = new NoteSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.rail_symbol = new RailSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.voltmeter_symbol = new VoltMeterSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.ohmmeter_symbol = new OhmMeterSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.ammeter_symbol = new AmMeterSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX = 1;
        this.MAX_PAGE_NUMBER++;
        this.wattmeter_symbol = new WattMeterSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.fuse_symbol = new FuseSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.spst_symbol = new SinglePoleSingleThrowSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.spdt_symbol = new SinglePoleDoubleThrowSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.not_symbol = new NOTGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.diode_symbol = new DiodeSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX = 1;
        this.MAX_PAGE_NUMBER++;
        this.led_symbol = new LightEmittingDiodeSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.zener_symbol = new ZenerDiodeSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.potentiometer_symbol = new PotentiometerSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.and_symbol = new ANDGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.or_symbol = new ORGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.nand_symbol = new NANDGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX = 1;
        this.MAX_PAGE_NUMBER++;
        this.nor_symbol = new NORGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.xor_symbol = new XORGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.xnor_symbol = new XNORGateSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.dff_symbol = new DFlipFlopSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.vsat_symbol = new VoltageSaturationSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.adder_symbol = new AdderSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX = 1;
        this.MAX_PAGE_NUMBER++;
        this.subtractor_symbol = new SubtractorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.multiplier_symbol = new MultiplierSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.divider_symbol = new DividerSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.gain_symbol = new GainBlockSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.absval_symbol = new AbsoluteValueSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.vcsw_symbol = new VoltageControlledSwitchSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX = 1;
        this.MAX_PAGE_NUMBER++;
        this.vcvs_symbol = new VoltageControlledVoltageSourceSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.vccs_symbol = new VoltageControlledCurrentSourceSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.cccs_symbol = new CurrentControlledCurrentSourceSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.ccvs_symbol = new CurrentControlledVoltageSourceSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.opamp_symbol = new OperationalAmplifierSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.nmosfet_symbol = new NChannelMOSFETSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX = 1;
        this.MAX_PAGE_NUMBER++;
        this.pmosfet_symbol = new PChannelMOSFETSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.npn_symbol = new NPNBipolarJunctionTransistorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.pnp_symbol = new PNPBipolarJunctionTransistorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.adc_symbol = new ADCModuleSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.dac_symbol = new DACModuleSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.samplers_symbol = new SampleAndHoldSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX = 1;
        this.MAX_PAGE_NUMBER++;
        this.pwm_symbol = new PulseWidthModulatorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.integrator_symbol = new IntegratorModuleSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.differentiator_symbol = new DifferentiatorModuleSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.lowpass_symbol = new LowPassFilterSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.highpass_symbol = new HighPassFilterSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.relay_symbol = new RelaySymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX = 1;
        this.MAX_PAGE_NUMBER++;
        this.pid_symbol = new PIDModuleSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.lut_symbol = new LookUpTableSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.vcr_symbol = new VoltageControlledResistorSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.grt_symbol = new GreaterThanSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.tptz_symbol = new TPTZModuleSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        this.ELEMENT_INDEX++;
        this.transformer_symbol = new TransformerSymbol(this.positions[this.ELEMENT_INDEX], this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER);
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    load_positions() {
        let temp_bounds = new RectF(0, 0, 0, 0);
        this.positions.splice(0, this.positions.length);
        let height = 0;
        for (var i = 0; i < this.MAX_ICONS; i++) {
            temp_bounds.left = this.bounds.left + i * ((this.bounds.right - this.bounds.left) / this.MAX_ICONS);
            temp_bounds.top = this.bounds.top + global.CANVAS_STROKE_WIDTH_3;
            temp_bounds.right = this.bounds.left + ((i + 1) * (this.bounds.right - this.bounds.left)) / this.MAX_ICONS;
            temp_bounds.bottom = this.bounds.bottom - global.CANVAS_STROKE_WIDTH_3;
            height = temp_bounds.get_height();
            temp_bounds.set_center2(temp_bounds.get_center_x(), temp_bounds.get_center_y(), height, height);
            this.positions.push(new RectF(temp_bounds.left, temp_bounds.top, temp_bounds.right, temp_bounds.bottom));
        }
    }
    update() {
        if (global.FLAG_MENU_OPEN_DOWN) {
            if (!global.mouse_keyboard_lock) {
                {
                    /* #INSERT_GENERATE_ELEMENT_WINDOW_ICON_UPDATE */
                    /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                    this.resistor_symbol.update();
                    this.capacitor_symbol.update();
                    this.inductor_symbol.update();
                    this.ground_symbol.update();
                    this.dcsource_symbol.update();
                    this.dccurrent_symbol.update();
                    this.acsource_symbol.update();
                    this.accurrent_symbol.update();
                    this.squarewave_symbol.update();
                    this.sawwave_symbol.update();
                    this.trianglewave_symbol.update();
                    this.constant_symbol.update();
                    this.net_symbol.update();
                    this.note_symbol.update();
                    this.rail_symbol.update();
                    this.voltmeter_symbol.update();
                    this.ohmmeter_symbol.update();
                    this.ammeter_symbol.update();
                    this.wattmeter_symbol.update();
                    this.fuse_symbol.update();
                    this.spst_symbol.update();
                    this.spdt_symbol.update();
                    this.not_symbol.update();
                    this.diode_symbol.update();
                    this.led_symbol.update();
                    this.zener_symbol.update();
                    this.potentiometer_symbol.update();
                    this.and_symbol.update();
                    this.or_symbol.update();
                    this.nand_symbol.update();
                    this.nor_symbol.update();
                    this.xor_symbol.update();
                    this.xnor_symbol.update();
                    this.dff_symbol.update();
                    this.vsat_symbol.update();
                    this.adder_symbol.update();
                    this.subtractor_symbol.update();
                    this.multiplier_symbol.update();
                    this.divider_symbol.update();
                    this.gain_symbol.update();
                    this.absval_symbol.update();
                    this.vcsw_symbol.update();
                    this.vcvs_symbol.update();
                    this.vccs_symbol.update();
                    this.cccs_symbol.update();
                    this.ccvs_symbol.update();
                    this.opamp_symbol.update();
                    this.nmosfet_symbol.update();
                    this.pmosfet_symbol.update();
                    this.npn_symbol.update();
                    this.pnp_symbol.update();
                    this.adc_symbol.update();
                    this.dac_symbol.update();
                    this.samplers_symbol.update();
                    this.pwm_symbol.update();
                    this.integrator_symbol.update();
                    this.differentiator_symbol.update();
                    this.lowpass_symbol.update();
                    this.highpass_symbol.update();
                    this.relay_symbol.update();
                    this.pid_symbol.update();
                    this.lut_symbol.update();
                    this.vcr_symbol.update();
                    this.grt_symbol.update();
                    this.tptz_symbol.update();
                    this.transformer_symbol.update();
                    /* <!-- END AUTOMATICALLY GENERATED !--> */
                }
            }
        }
    }
    mouse_wheel() {
        if (this.ENABLE_MOUSE_WHEEL) {
            if (global.FLAG_MENU_OPEN_DOWN) {
                if (!global.mouse_keyboard_lock) {
                    this.MOUSE_WHEEL_COUNTER++;
                    if (this.MOUSE_WHEEL_COUNTER >= this.MOUSE_WHEEL_COUNTER_MAX) {
                        //@ts-expect-error
                        if (global.mouse_wheel_event.wheelDelta < 0 || global.mouse_wheel_event.detail > 0) {
                            if (this.PAGE_NUMBER < this.MAX_PAGE_NUMBER) {
                                this.PAGE_NUMBER++;
                            }
                        }
                        else {
                            if (this.PAGE_NUMBER > 0) {
                                this.PAGE_NUMBER--;
                            }
                        }
                        this.MOUSE_WHEEL_COUNTER = 0;
                    }
                }
            }
        }
    }
    mouse_down() {
        if (global.FLAG_MENU_OPEN_DOWN) {
            if (!global.mouse_keyboard_lock) {
                this.first_touch_x = global.mouse_x;
                this.first_touch_y = global.mouse_y;
                let cached_value = this.bounds.get_width() / this.MAX_ICONS;
                /* #INSERT_GENERATE_ELEMENT_WINDOW_MOUSE_DOWN */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                this.resistor_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.capacitor_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.inductor_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.ground_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.dcsource_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.dccurrent_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.acsource_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.accurrent_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.squarewave_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.sawwave_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.trianglewave_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.constant_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.net_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.note_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.rail_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.voltmeter_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.ohmmeter_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.ammeter_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.wattmeter_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.fuse_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.spst_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.spdt_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.not_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.diode_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.led_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.zener_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.potentiometer_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.and_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.or_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.nand_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.nor_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.xor_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.xnor_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.dff_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vsat_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.adder_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.subtractor_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.multiplier_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.divider_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.gain_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.absval_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vcsw_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vcvs_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vccs_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.cccs_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.ccvs_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.opamp_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.nmosfet_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.pmosfet_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.npn_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.pnp_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.adc_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.dac_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.samplers_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.pwm_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.integrator_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.differentiator_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.lowpass_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.highpass_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.relay_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.pid_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.lut_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vcr_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.grt_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.tptz_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.transformer_symbol.mouse_down(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                /* <!-- END AUTOMATICALLY GENERATED !--> */
                if (global.MOBILE_MODE) {
                    if (this.positions[this.NAVIGATE_BACK].contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height()) &&
                        this.positions[this.NAVIGATE_BACK].contains_xywh(this.first_touch_x, this.first_touch_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height())) {
                        global.component_touched = true;
                    }
                    else if (this.positions[this.NAVIGATE_FORWARD].contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height()) &&
                        this.positions[this.NAVIGATE_FORWARD].contains_xywh(this.first_touch_x, this.first_touch_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height())) {
                        global.component_touched = true;
                    }
                }
            }
        }
    }
    mouse_move() {
        if (global.FLAG_MENU_OPEN_DOWN) {
            if (!global.mouse_keyboard_lock) {
                let cached_value = this.bounds.get_width() / this.MAX_ICONS;
                /* #INSERT_GENERATE_ELEMENT_WINDOW_MOUSE_MOVE */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                this.resistor_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.capacitor_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.inductor_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.ground_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.dcsource_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.dccurrent_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.acsource_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.accurrent_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.squarewave_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.sawwave_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.trianglewave_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.constant_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.net_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.note_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.rail_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.voltmeter_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.ohmmeter_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.ammeter_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.wattmeter_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.fuse_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.spst_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.spdt_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.not_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.diode_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.led_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.zener_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.potentiometer_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.and_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.or_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.nand_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.nor_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.xor_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.xnor_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.dff_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vsat_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.adder_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.subtractor_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.multiplier_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.divider_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.gain_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.absval_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vcsw_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vcvs_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vccs_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.cccs_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.ccvs_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.opamp_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.nmosfet_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.pmosfet_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.npn_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.pnp_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.adc_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.dac_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.samplers_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.pwm_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.integrator_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.differentiator_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.lowpass_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.highpass_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.relay_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.pid_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.lut_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vcr_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.grt_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.tptz_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.transformer_symbol.mouse_move(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                /* <!-- END AUTOMATICALLY GENERATED !--> */
            }
        }
    }
    mouse_up() {
        if (global.FLAG_MENU_OPEN_DOWN) {
            if (!global.mouse_keyboard_lock) {
                if (this.positions[this.NAVIGATE_BACK].contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height()) &&
                    this.positions[this.NAVIGATE_BACK].contains_xywh(this.first_touch_x, this.first_touch_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height())) {
                    if (this.PAGE_NUMBER > 0) {
                        this.PAGE_NUMBER--;
                    }
                    /* Block out the reset selection portion of the code! */
                    global.component_touched = true;
                }
                else if (this.positions[this.NAVIGATE_FORWARD].contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height()) &&
                    this.positions[this.NAVIGATE_FORWARD].contains_xywh(this.first_touch_x, this.first_touch_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height())) {
                    if (this.PAGE_NUMBER < this.MAX_PAGE_NUMBER) {
                        this.PAGE_NUMBER++;
                    }
                    /* Block out the reset selection portion of the code! */
                    global.component_touched = true;
                }
                let cached_value = this.bounds.get_width() / this.MAX_ICONS;
                /* #INSERT_GENERATE_ELEMENT_WINDOW_MOUSE_UP */
                /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
                this.resistor_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.capacitor_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.inductor_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.ground_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.dcsource_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.dccurrent_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.acsource_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.accurrent_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.squarewave_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.sawwave_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.trianglewave_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.constant_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.net_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.note_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.rail_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.voltmeter_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.ohmmeter_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.ammeter_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.wattmeter_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.fuse_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.spst_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.spdt_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.not_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.diode_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.led_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.zener_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.potentiometer_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.and_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.or_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.nand_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.nor_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.xor_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.xnor_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.dff_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vsat_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.adder_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.subtractor_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.multiplier_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.divider_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.gain_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.absval_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vcsw_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vcvs_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vccs_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.cccs_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.ccvs_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.opamp_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.nmosfet_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.pmosfet_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.npn_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.pnp_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.adc_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.dac_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.samplers_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.pwm_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.integrator_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.differentiator_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.lowpass_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.highpass_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.relay_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.pid_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.lut_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.vcr_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.grt_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.tptz_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                this.transformer_symbol.mouse_up(this.PAGE_NUMBER, cached_value, this.bounds.get_height());
                /* <!-- END AUTOMATICALLY GENERATED !--> */
            }
        }
    }
    resize_window(left, top, right, bottom) {
        this.bounds.set_bounds(left, top, right, bottom);
        this.load_positions();
        /* #INSERT_GENERATE_ELEMENT_WINDOW_RESIZE_WINDOW */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        this.resistor_symbol.resize(this.positions[this.resistor_symbol.index]);
        this.capacitor_symbol.resize(this.positions[this.capacitor_symbol.index]);
        this.inductor_symbol.resize(this.positions[this.inductor_symbol.index]);
        this.ground_symbol.resize(this.positions[this.ground_symbol.index]);
        this.dcsource_symbol.resize(this.positions[this.dcsource_symbol.index]);
        this.dccurrent_symbol.resize(this.positions[this.dccurrent_symbol.index]);
        this.acsource_symbol.resize(this.positions[this.acsource_symbol.index]);
        this.accurrent_symbol.resize(this.positions[this.accurrent_symbol.index]);
        this.squarewave_symbol.resize(this.positions[this.squarewave_symbol.index]);
        this.sawwave_symbol.resize(this.positions[this.sawwave_symbol.index]);
        this.trianglewave_symbol.resize(this.positions[this.trianglewave_symbol.index]);
        this.constant_symbol.resize(this.positions[this.constant_symbol.index]);
        this.net_symbol.resize(this.positions[this.net_symbol.index]);
        this.note_symbol.resize(this.positions[this.note_symbol.index]);
        this.rail_symbol.resize(this.positions[this.rail_symbol.index]);
        this.voltmeter_symbol.resize(this.positions[this.voltmeter_symbol.index]);
        this.ohmmeter_symbol.resize(this.positions[this.ohmmeter_symbol.index]);
        this.ammeter_symbol.resize(this.positions[this.ammeter_symbol.index]);
        this.wattmeter_symbol.resize(this.positions[this.wattmeter_symbol.index]);
        this.fuse_symbol.resize(this.positions[this.fuse_symbol.index]);
        this.spst_symbol.resize(this.positions[this.spst_symbol.index]);
        this.spdt_symbol.resize(this.positions[this.spdt_symbol.index]);
        this.not_symbol.resize(this.positions[this.not_symbol.index]);
        this.diode_symbol.resize(this.positions[this.diode_symbol.index]);
        this.led_symbol.resize(this.positions[this.led_symbol.index]);
        this.zener_symbol.resize(this.positions[this.zener_symbol.index]);
        this.potentiometer_symbol.resize(this.positions[this.potentiometer_symbol.index]);
        this.and_symbol.resize(this.positions[this.and_symbol.index]);
        this.or_symbol.resize(this.positions[this.or_symbol.index]);
        this.nand_symbol.resize(this.positions[this.nand_symbol.index]);
        this.nor_symbol.resize(this.positions[this.nor_symbol.index]);
        this.xor_symbol.resize(this.positions[this.xor_symbol.index]);
        this.xnor_symbol.resize(this.positions[this.xnor_symbol.index]);
        this.dff_symbol.resize(this.positions[this.dff_symbol.index]);
        this.vsat_symbol.resize(this.positions[this.vsat_symbol.index]);
        this.adder_symbol.resize(this.positions[this.adder_symbol.index]);
        this.subtractor_symbol.resize(this.positions[this.subtractor_symbol.index]);
        this.multiplier_symbol.resize(this.positions[this.multiplier_symbol.index]);
        this.divider_symbol.resize(this.positions[this.divider_symbol.index]);
        this.gain_symbol.resize(this.positions[this.gain_symbol.index]);
        this.absval_symbol.resize(this.positions[this.absval_symbol.index]);
        this.vcsw_symbol.resize(this.positions[this.vcsw_symbol.index]);
        this.vcvs_symbol.resize(this.positions[this.vcvs_symbol.index]);
        this.vccs_symbol.resize(this.positions[this.vccs_symbol.index]);
        this.cccs_symbol.resize(this.positions[this.cccs_symbol.index]);
        this.ccvs_symbol.resize(this.positions[this.ccvs_symbol.index]);
        this.opamp_symbol.resize(this.positions[this.opamp_symbol.index]);
        this.nmosfet_symbol.resize(this.positions[this.nmosfet_symbol.index]);
        this.pmosfet_symbol.resize(this.positions[this.pmosfet_symbol.index]);
        this.npn_symbol.resize(this.positions[this.npn_symbol.index]);
        this.pnp_symbol.resize(this.positions[this.pnp_symbol.index]);
        this.adc_symbol.resize(this.positions[this.adc_symbol.index]);
        this.dac_symbol.resize(this.positions[this.dac_symbol.index]);
        this.samplers_symbol.resize(this.positions[this.samplers_symbol.index]);
        this.pwm_symbol.resize(this.positions[this.pwm_symbol.index]);
        this.integrator_symbol.resize(this.positions[this.integrator_symbol.index]);
        this.differentiator_symbol.resize(this.positions[this.differentiator_symbol.index]);
        this.lowpass_symbol.resize(this.positions[this.lowpass_symbol.index]);
        this.highpass_symbol.resize(this.positions[this.highpass_symbol.index]);
        this.relay_symbol.resize(this.positions[this.relay_symbol.index]);
        this.pid_symbol.resize(this.positions[this.pid_symbol.index]);
        this.lut_symbol.resize(this.positions[this.lut_symbol.index]);
        this.vcr_symbol.resize(this.positions[this.vcr_symbol.index]);
        this.grt_symbol.resize(this.positions[this.grt_symbol.index]);
        this.tptz_symbol.resize(this.positions[this.tptz_symbol.index]);
        this.transformer_symbol.resize(this.positions[this.transformer_symbol.index]);
        /* <!-- END AUTOMATICALLY GENERATED !--> */
        /* Resize the stroke widths and the text sizes. */
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(2 * global.CANVAS_TEXT_SIZE_6);
        }
        else {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_6);
        }
        this.hover_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
        this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    }
    draw_hover(canvas) {
        /* Handle the hover here! */
        for (var i = 0; i < this.positions.length; i++) {
            if (this.positions[i].contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() / this.MAX_ICONS, this.bounds.get_height())) {
                if (i != this.NAVIGATE_BACK && i != this.NAVIGATE_FORWARD) {
                    if (this.hover_limits(this.PAGE_NUMBER, i, this.ELEMENT_INDEX, this.MAX_PAGE_NUMBER)) {
                        canvas.draw_round_rect3(this.positions[i].get_center_x(), this.positions[i].get_center_y(), this.positions[i].get_width() * 1.25, this.positions[i].get_height() * 1.25, global.CANVAS_STROKE_WIDTH_1, this.hover_paint);
                    }
                }
                else {
                    if (i === this.NAVIGATE_BACK) {
                        if (this.PAGE_NUMBER > 0) {
                            canvas.draw_round_rect3(this.positions[i].get_center_x(), this.positions[i].get_center_y(), this.positions[i].get_width() * 1.25, this.positions[i].get_height() * 1.25, global.CANVAS_STROKE_WIDTH_1, this.hover_paint);
                        }
                    }
                    if (i === this.NAVIGATE_FORWARD) {
                        if (this.PAGE_NUMBER < this.MAX_PAGE_NUMBER) {
                            canvas.draw_round_rect3(this.positions[i].get_center_x(), this.positions[i].get_center_y(), this.positions[i].get_width() * 1.25, this.positions[i].get_height() * 1.25, global.CANVAS_STROKE_WIDTH_1, this.hover_paint);
                        }
                    }
                }
            }
        }
    }
    /* Check the limits of the hover effect on the elements. */
    hover_limits(current_page, index, overflow, max_pages) {
        if (current_page <= max_pages) {
            if (current_page < max_pages) {
                return true;
            }
            else if (current_page === max_pages && index <= overflow) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    draw_window(canvas) {
        if (global.FLAG_MENU_OPEN_DOWN) {
            canvas.draw_round_rect2(this.bounds, global.CANVAS_STROKE_WIDTH_3, this.fill_paint);
            if (global.MOBILE_MODE === false) {
                this.draw_hover(canvas);
            }
            if (this.PAGE_NUMBER > 0) {
                canvas.draw_text(this.NAVIGATE_TEXT, this.positions[this.NAVIGATE_BACK].get_center_x(), this.positions[this.NAVIGATE_BACK].get_center_y(), this.text_paint);
            }
            if (this.PAGE_NUMBER < this.MAX_PAGE_NUMBER) {
                canvas.draw_text(this.NAVIGATE_TEXT, this.positions[this.NAVIGATE_FORWARD].get_center_x(), this.positions[this.NAVIGATE_FORWARD].get_center_y(), this.text_paint);
            }
            /* #INSERT_GENERATE_ELEMENT_WINDOW_DRAW */
            /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
            this.resistor_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.capacitor_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.inductor_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.ground_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.dcsource_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.dccurrent_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.acsource_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.accurrent_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.squarewave_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.sawwave_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.trianglewave_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.constant_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.net_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.note_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.rail_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.voltmeter_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.ohmmeter_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.ammeter_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.wattmeter_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.fuse_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.spst_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.spdt_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.not_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.diode_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.led_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.zener_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.potentiometer_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.and_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.or_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.nand_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.nor_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.xor_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.xnor_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.dff_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.vsat_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.adder_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.subtractor_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.multiplier_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.divider_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.gain_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.absval_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.vcsw_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.vcvs_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.vccs_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.cccs_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.ccvs_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.opamp_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.nmosfet_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.pmosfet_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.npn_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.pnp_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.adc_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.dac_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.samplers_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.pwm_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.integrator_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.differentiator_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.lowpass_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.highpass_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.relay_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.pid_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.lut_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.vcr_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.grt_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.tptz_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            this.transformer_symbol.draw_symbol(canvas, this.PAGE_NUMBER);
            /* <!-- END AUTOMATICALLY GENERATED !--> */
        }
    }
}
