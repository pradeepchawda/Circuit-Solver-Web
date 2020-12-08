/**********************************************************************
 * Project           : Circuit Solver
 * File		        : ElementOptions.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A general class to handle all the options availabe to a single selected
 *                   element.
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
class ElementOptions {
	public MAX_ICONS: number;
	/* The menu bar icons center_x (last box) */
	public mb_x: number;
	/* The menu bar icons width */
	public mb_width: number;
	/* The menu bar icons height */
	public mb_height: number;
	public option_0: RectF;
	public option_1: RectF;
	public option_2: RectF;
	public option_3: RectF;
	public show_0: boolean;
	public show_1: boolean;
	public show_2: boolean;
	public show_3: boolean;
	public edit_path0: Path;
	public edit_path1: Path;
	public trash_path0: Path;
	public trash_path1: Path;
	public flip_path0: Path;
	public flip_path1: Path;
	/* This paint is used for drawing the "lines" that the component is comprised of. */
	public line_paint: Paint;
	/* This paint is used for drawing the "fill" that the component is comprised of. */
	public fill_paint: Paint;
	/* This paint is used for drawing the "text" that the component needs to display */
	public line_paint_alt: Paint;
	/* This paint is used for drawing the "lines" that the component needs to display */
	public meter_line_paint: Paint;
	/* This paint is used for drawing the "lines" that the component is comprised of. */
	public text_paint: Paint;
	/* This paint is used for drawing the icons that the component is comprised of. */
	public hover_paint: Paint;
	/* This paint is used for drawing the icons that the component is comprised of. */
	public icon_paint: Paint;
	/* Constants for Options */
	public ROTATE_ICON: number;
	public EDIT_ICON: number;
	public FLIP_ICON: number;
	public TRASH_ICON: number;
	public WIRE_ICON: number;
	public EYE_ICON: number;
	public NO_ICON: number;
	/* Manager for the different configurations. */
	public opts: ELEMENT_OPTIONS_T;
	/* Enforcing the system from cascading events. */
	public first_touch_x: number;
	public first_touch_y: number;

	constructor() {
		let temp_stroke_width: number = 0.65 * global.CANVAS_STROKE_WIDTH_3;
		this.MAX_ICONS = 8;
		if (global.MOBILE_MODE) {
			temp_stroke_width = 0.85 * global.CANVAS_STROKE_WIDTH_3;
		}
		/* The menu bar icons center_x (last box) */
		this.mb_x = menu_bar.menu_icons[menu_bar.UP_DOWN_INDEX].get_center_x();
		/* The menu bar icons width */
		this.mb_width = menu_bar.menu_icons[menu_bar.REMOVE_ALL_INDEX].get_width();
		/* The menu bar icons height */
		this.mb_height = menu_bar.menu_icons[menu_bar.REMOVE_ALL_INDEX].get_height();
		this.option_0 = new RectF(
			this.mb_x - this.mb_width * 0.5,
			menu_bar.bounds.bottom + global.CANVAS_STROKE_WIDTH_3,
			this.mb_x + this.mb_width * 0.5,
			menu_bar.bounds.bottom + global.CANVAS_STROKE_WIDTH_3 + this.mb_height
		);
		this.option_1 = new RectF(
			this.mb_x - this.mb_width * 0.5,
			this.option_0.bottom + global.CANVAS_STROKE_WIDTH_3,
			this.mb_x + this.mb_width * 0.5,
			this.option_0.bottom + global.CANVAS_STROKE_WIDTH_3 + this.mb_height
		);
		this.option_2 = new RectF(
			this.mb_x - this.mb_width * 0.5,
			this.option_1.bottom + global.CANVAS_STROKE_WIDTH_3,
			this.mb_x + this.mb_width * 0.5,
			this.option_1.bottom + global.CANVAS_STROKE_WIDTH_3 + this.mb_height
		);
		this.option_3 = new RectF(
			this.mb_x - this.mb_width * 0.5,
			this.option_2.bottom + global.CANVAS_STROKE_WIDTH_3,
			this.mb_x + this.mb_width * 0.5,
			this.option_2.bottom + global.CANVAS_STROKE_WIDTH_3 + this.mb_height
		);
		this.show_0 = false;
		this.show_1 = false;
		this.show_2 = false;
		this.show_3 = false;
		this.edit_path0 = new Path();
		this.edit_path1 = new Path();
		this.trash_path0 = new Path();
		this.trash_path1 = new Path();
		this.flip_path0 = new Path();
		this.flip_path1 = new Path();
		/* This paint is used for drawing the "lines" that the component is comprised of. */
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(this.line_paint.style.STROKE);
		this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
		this.line_paint.set_paint_join(this.line_paint.join.MITER);
		this.line_paint.set_stroke_width(temp_stroke_width);
		this.line_paint.set_color(global.GENERAL_GRAY_COLOR);
		this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.line_paint.set_font(global.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(this.line_paint.align.CENTER);
		/* This paint is used for drawing the "fill" that the component is comprised of. */
		this.fill_paint = new Paint();
		this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
		this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
		this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
		this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
		this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.fill_paint.set_font(global.DEFAULT_FONT);
		this.fill_paint.set_alpha(192);
		this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
		/* This paint is used for drawing the "text" that the component needs to display */
		this.line_paint_alt = new Paint();
		this.line_paint_alt.set_paint_style(this.line_paint_alt.style.STROKE);
		this.line_paint_alt.set_paint_cap(this.line_paint_alt.cap.ROUND);
		this.line_paint_alt.set_paint_join(this.line_paint_alt.join.ROUND);
		this.line_paint_alt.set_stroke_width(temp_stroke_width);
		this.line_paint_alt.set_color(global.GENERAL_WHITE_COLOR);
		this.line_paint_alt.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.line_paint_alt.set_font(global.DEFAULT_FONT);
		this.line_paint_alt.set_alpha(255);
		this.line_paint_alt.set_paint_align(this.line_paint_alt.align.CENTER);
		/* This paint is used for drawing the "lines" that the component needs to display */
		this.meter_line_paint = new Paint();
		this.meter_line_paint.set_paint_style(this.meter_line_paint.style.STROKE);
		this.meter_line_paint.set_paint_cap(this.meter_line_paint.cap.ROUND);
		this.meter_line_paint.set_paint_join(this.meter_line_paint.join.ROUND);
		this.meter_line_paint.set_stroke_width(temp_stroke_width);
		this.meter_line_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.meter_line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.meter_line_paint.set_font(global.DEFAULT_FONT);
		this.meter_line_paint.set_alpha(255);
		this.meter_line_paint.set_paint_align(this.meter_line_paint.align.CENTER);
		/* This paint is used for drawing the "lines" that the component is comprised of. */
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(this.line_paint.style.FILL);
		this.text_paint.set_paint_cap(this.line_paint.cap.ROUND);
		this.text_paint.set_paint_join(this.line_paint.join.MITER);
		this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.text_paint.set_color(global.GENERAL_CYAN_COLOR);
		this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.text_paint.set_font(global.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(this.line_paint.align.RIGHT);
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
		/* This paint is used for drawing the icons that the component is comprised of. */
		this.icon_paint = new Paint();
		this.icon_paint.set_paint_style(this.icon_paint.style.FILL);
		this.icon_paint.set_paint_cap(this.icon_paint.cap.ROUND);
		this.icon_paint.set_paint_join(this.icon_paint.join.MITER);
		this.icon_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.icon_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.icon_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.icon_paint.set_font(global.DEFAULT_FONT);
		this.icon_paint.set_alpha(255);
		this.icon_paint.set_paint_align(this.icon_paint.align.CENTER);
		/* Constants for Options */
		this.ROTATE_ICON = 0;
		this.EDIT_ICON = 1;
		this.FLIP_ICON = 2;
		this.TRASH_ICON = 3;
		this.WIRE_ICON = 4;
		this.EYE_ICON = 5;
		this.NO_ICON = -1;
		/* Manager for the different configurations. */
		this.opts = {
			c0: this.NO_ICON,
			c1: this.NO_ICON,
			c2: this.NO_ICON,
			c3: this.NO_ICON
		};
		/* Enforcing the system from cascading events. */
		this.first_touch_x = 0;
		this.first_touch_y = 0;
	}
	set_show(show_0: boolean, show_1: boolean, show_2: boolean, show_3: boolean): void {
		this.show_0 = show_0;
		this.show_1 = show_1;
		this.show_2 = show_2;
		this.show_3 = show_3;
	}
	load_edit_svg(rect: RectF): void {
		let holder_x: Array<string> = [];
		let holder_y: Array<string> = [];
		let edit_x0: string = '0.746,0.274,0.114,0.112,0.584';
		let edit_y0: string = '0.406,0.874,0.876,0.734,0.264';
		let edit_x1: string = '0.902,0.784,0.63,0.75';
		let edit_y1: string = '0.244,0.368,0.226,0.104';
		let padding: number = 0.1;
		/* Loading the first path of edit  */
		holder_x = edit_x0.split(',');
		holder_y = edit_y0.split(',');
		let points: Array<PointF> = [];
		for (var i: number = 0; i < holder_x.length; i++) {
			points.push(
				new PointF(
					rect.left + padding * rect.get_width() + rect.get_width() * (1.0 - 2 * padding) * parseFloat(holder_x[i]),
					rect.top + padding * rect.get_height() + rect.get_height() * (1.0 - 2 * padding) * parseFloat(holder_y[i])
				)
			);
		}
		this.edit_path0.reset();
		for (var i: number = 0; i < points.length; i++) {
			if (i === 0) {
				this.edit_path0.move_to(points[i].x, points[i].y);
			} else {
				this.edit_path0.line_to(points[i].x, points[i].y);
			}
		}
		this.edit_path0.close();
		/* Loading the second path of edit */
		holder_x = edit_x1.split(',');
		holder_y = edit_y1.split(',');
		points = [];
		for (var i: number = 0; i < holder_x.length; i++) {
			points.push(
				new PointF(
					rect.left + padding * rect.get_width() + rect.get_width() * (1.0 - 2 * padding) * parseFloat(holder_x[i]),
					rect.top + padding * rect.get_height() + rect.get_height() * (1.0 - 2 * padding) * parseFloat(holder_y[i])
				)
			);
		}
		this.edit_path1.reset();
		for (var i: number = 0; i < points.length; i++) {
			if (i === 0) {
				this.edit_path1.move_to(points[i].x, points[i].y);
			} else {
				this.edit_path1.line_to(points[i].x, points[i].y);
			}
		}
		this.edit_path1.close();
	}
	load_trash_svg(rect: RectF): void {
		let holder_x: Array<string> = [];
		let holder_y: Array<string> = [];
		let trash_x0: string = '0.28,0.72,0.72,0.28';
		let trash_y0: string = '0.4,0.4,0.75,0.75';
		let trash_x1: string = '0.28,0.45,0.45,0.55,0.55,0.72,0.72,0.28';
		let trash_y1: string = '0.27,0.27,0.21,0.21,0.27,0.27,0.325,0.325';
		/* Loading the first path of edit  */
		holder_x = trash_x0.split(',');
		holder_y = trash_y0.split(',');
		let points: Array<PointF> = [];
		for (var i: number = 0; i < holder_x.length; i++) {
			points.push(new PointF(rect.left + rect.get_width() * parseFloat(holder_x[i]), rect.top + rect.get_height() * parseFloat(holder_y[i])));
		}
		this.trash_path0.reset();
		for (var i: number = 0; i < points.length; i++) {
			if (i === 0) {
				this.trash_path0.move_to(points[i].x, points[i].y);
			} else {
				this.trash_path0.line_to(points[i].x, points[i].y);
			}
		}
		this.trash_path0.close();
		/* Loading the second path of edit */
		holder_x = trash_x1.split(',');
		holder_y = trash_y1.split(',');
		points = [];
		for (var i: number = 0; i < holder_x.length; i++) {
			points.push(new PointF(rect.left + rect.get_width() * parseFloat(holder_x[i]), rect.top + rect.get_height() * parseFloat(holder_y[i])));
		}
		this.trash_path1.reset();
		for (var i: number = 0; i < points.length; i++) {
			if (i === 0) {
				this.trash_path1.move_to(points[i].x, points[i].y);
			} else {
				this.trash_path1.line_to(points[i].x, points[i].y);
			}
		}
		this.trash_path1.close();
	}
	load_flip_svg(rect: RectF): void {
		let holder_x: Array<string> = [];
		let holder_y: Array<string> = [];
		let flip_x0: string = '0.45,0.45,0.15';
		let flip_y0: string = '0.2,0.7,0.7';
		let flip_x1: string = '0.55,0.55,0.85';
		let flip_y1: string = '0.2,0.7,0.7';
		/* Loading the first path of edit  */
		holder_x = flip_x0.split(',');
		holder_y = flip_y0.split(',');
		let points: Array<PointF> = [];
		for (var i: number = 0; i < holder_x.length; i++) {
			points.push(new PointF(rect.left + rect.get_width() * parseFloat(holder_x[i]), rect.top + rect.get_height() * parseFloat(holder_y[i])));
		}
		this.flip_path0.reset();
		for (var i: number = 0; i < points.length; i++) {
			if (i === 0) {
				this.flip_path0.move_to(points[i].x, points[i].y);
			} else {
				this.flip_path0.line_to(points[i].x, points[i].y);
			}
		}
		this.flip_path0.close();
		/* Loading the second path of edit */
		holder_x = flip_x1.split(',');
		holder_y = flip_y1.split(',');
		points = [];
		for (var i: number = 0; i < holder_x.length; i++) {
			points.push(new PointF(rect.left + rect.get_width() * parseFloat(holder_x[i]), rect.top + rect.get_height() * parseFloat(holder_y[i])));
		}
		this.flip_path1.reset();
		for (var i: number = 0; i < points.length; i++) {
			if (i === 0) {
				this.flip_path1.move_to(points[i].x, points[i].y);
			} else {
				this.flip_path1.line_to(points[i].x, points[i].y);
			}
		}
		this.flip_path1.close();
	}
	resize(): void {
		let temp_stroke_width: number = 0.65 * global.CANVAS_STROKE_WIDTH_3;
		if (global.MOBILE_MODE) {
			temp_stroke_width = 0.85 * global.CANVAS_STROKE_WIDTH_3;
		}
		/* The menu bar icons center_x (last box) */
		this.mb_x = menu_bar.menu_icons[menu_bar.UP_DOWN_INDEX].get_center_x();
		/* The menu bar icons width */
		this.mb_width = menu_bar.menu_icons[menu_bar.REMOVE_ALL_INDEX].get_width();
		/* The menu bar icons height */
		this.mb_height = menu_bar.menu_icons[menu_bar.REMOVE_ALL_INDEX].get_height();
		this.option_0.set_bounds(
			this.mb_x - this.mb_width * 0.5,
			menu_bar.bounds.bottom + global.CANVAS_STROKE_WIDTH_3,
			this.mb_x + this.mb_width * 0.5,
			menu_bar.bounds.bottom + global.CANVAS_STROKE_WIDTH_3 + this.mb_height
		);
		this.option_1.set_bounds(
			this.mb_x - this.mb_width * 0.5,
			this.option_0.bottom + global.CANVAS_STROKE_WIDTH_3,
			this.mb_x + this.mb_width * 0.5,
			this.option_0.bottom + global.CANVAS_STROKE_WIDTH_3 + this.mb_height
		);
		this.option_2.set_bounds(
			this.mb_x - this.mb_width * 0.5,
			this.option_1.bottom + global.CANVAS_STROKE_WIDTH_3,
			this.mb_x + this.mb_width * 0.5,
			this.option_1.bottom + global.CANVAS_STROKE_WIDTH_3 + this.mb_height
		);
		this.option_3.set_bounds(
			this.mb_x - this.mb_width * 0.5,
			this.option_2.bottom + global.CANVAS_STROKE_WIDTH_3,
			this.mb_x + this.mb_width * 0.5,
			this.option_2.bottom + global.CANVAS_STROKE_WIDTH_3 + this.mb_height
		);
		/* Resize the stroke widths and the text sizes. */
		this.line_paint.set_stroke_width(temp_stroke_width);
		this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.line_paint_alt.set_stroke_width(temp_stroke_width);
		this.line_paint_alt.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.icon_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.icon_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.meter_line_paint.set_stroke_width(temp_stroke_width);
		this.meter_line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.hover_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
		this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.map_options();
	}
	update(): void {
		/* Based on the selected element it'll draw the options available! */
		if (global.selected) {
			switch (global.selected_type) {
				/* #INSERT_GENERATE_ELEMENT_OPTIONS_UPDATE# */
				/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
				case global.TYPE_RESISTOR:
					this.handle_resistor();
					break;
				case global.TYPE_CAPACITOR:
					this.handle_capacitor();
					break;
				case global.TYPE_INDUCTOR:
					this.handle_inductor();
					break;
				case global.TYPE_GROUND:
					this.handle_ground();
					break;
				case global.TYPE_DCSOURCE:
					this.handle_dcsource();
					break;
				case global.TYPE_DCCURRENT:
					this.handle_dccurrent();
					break;
				case global.TYPE_ACSOURCE:
					this.handle_acsource();
					break;
				case global.TYPE_ACCURRENT:
					this.handle_accurrent();
					break;
				case global.TYPE_SQUAREWAVE:
					this.handle_squarewave();
					break;
				case global.TYPE_SAW:
					this.handle_sawwave();
					break;
				case global.TYPE_TRI:
					this.handle_trianglewave();
					break;
				case global.TYPE_CONSTANT:
					this.handle_constant();
					break;
				case global.TYPE_WIRE:
					this.handle_wire();
					break;
				case global.TYPE_NET:
					this.handle_net();
					break;
				case global.TYPE_NOTE:
					this.handle_note();
					break;
				case global.TYPE_RAIL:
					this.handle_rail();
					break;
				case global.TYPE_VOLTMETER:
					this.handle_voltmeter();
					break;
				case global.TYPE_OHMMETER:
					this.handle_ohmmeter();
					break;
				case global.TYPE_AMMETER:
					this.handle_ammeter();
					break;
				case global.TYPE_WATTMETER:
					this.handle_wattmeter();
					break;
				case global.TYPE_FUSE:
					this.handle_fuse();
					break;
				case global.TYPE_SPST:
					this.handle_spst();
					break;
				case global.TYPE_SPDT:
					this.handle_spdt();
					break;
				case global.TYPE_NOT:
					this.handle_not();
					break;
				case global.TYPE_DIODE:
					this.handle_diode();
					break;
				case global.TYPE_LED:
					this.handle_led();
					break;
				case global.TYPE_ZENER:
					this.handle_zener();
					break;
				case global.TYPE_POTENTIOMETER:
					this.handle_potentiometer();
					break;
				case global.TYPE_AND:
					this.handle_and();
					break;
				case global.TYPE_OR:
					this.handle_or();
					break;
				case global.TYPE_NAND:
					this.handle_nand();
					break;
				case global.TYPE_NOR:
					this.handle_nor();
					break;
				case global.TYPE_XOR:
					this.handle_xor();
					break;
				case global.TYPE_XNOR:
					this.handle_xnor();
					break;
				case global.TYPE_DFF:
					this.handle_dff();
					break;
				case global.TYPE_VSAT:
					this.handle_vsat();
					break;
				case global.TYPE_ADD:
					this.handle_adder();
					break;
				case global.TYPE_SUB:
					this.handle_subtractor();
					break;
				case global.TYPE_MUL:
					this.handle_multiplier();
					break;
				case global.TYPE_DIV:
					this.handle_divider();
					break;
				case global.TYPE_GAIN:
					this.handle_gain();
					break;
				case global.TYPE_ABS:
					this.handle_absval();
					break;
				case global.TYPE_VCSW:
					this.handle_vcsw();
					break;
				case global.TYPE_VCVS:
					this.handle_vcvs();
					break;
				case global.TYPE_VCCS:
					this.handle_vccs();
					break;
				case global.TYPE_CCCS:
					this.handle_cccs();
					break;
				case global.TYPE_CCVS:
					this.handle_ccvs();
					break;
				case global.TYPE_OPAMP:
					this.handle_opamp();
					break;
				case global.TYPE_NMOS:
					this.handle_nmosfet();
					break;
				case global.TYPE_PMOS:
					this.handle_pmosfet();
					break;
				case global.TYPE_NPN:
					this.handle_npn();
					break;
				case global.TYPE_PNP:
					this.handle_pnp();
					break;
				case global.TYPE_ADC:
					this.handle_adc();
					break;
				case global.TYPE_DAC:
					this.handle_dac();
					break;
				case global.TYPE_SAH:
					this.handle_samplers();
					break;
				case global.TYPE_PWM:
					this.handle_pwm();
					break;
				case global.TYPE_INTEGRATOR:
					this.handle_integrator();
					break;
				case global.TYPE_DIFFERENTIATOR:
					this.handle_differentiator();
					break;
				case global.TYPE_LPF:
					this.handle_lowpass();
					break;
				case global.TYPE_HPF:
					this.handle_highpass();
					break;
				case global.TYPE_REL:
					this.handle_relay();
					break;
				case global.TYPE_PID:
					this.handle_pid();
					break;
				case global.TYPE_LUT:
					this.handle_lut();
					break;
				case global.TYPE_VCR:
					this.handle_vcr();
					break;
				case global.TYPE_GRT:
					this.handle_grt();
					break;
				case global.TYPE_TPTZ:
					this.handle_tptz();
					break;
				case global.TYPE_TRAN:
					this.handle_transformer();
					break;
				/* <!-- END AUTOMATICALLY GENERATED !--> */
				default:
					break;
			}
		} else {
			this.reset_options();
		}
	}
	mouse_down(): void {
		if (
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
			if (global.selected) {
				/* Block around c0 (so components don't register mouse down)*/
				if (this.opts['c0'] != this.NO_ICON) {
					if (this.option_0.contains_xywh(global.mouse_x, global.mouse_y, this.option_0.get_width() * 1.25, this.option_0.get_height() * 1.25)) {
						global.component_touched = true;
					}
				}
				/* Block around c1 (so components don't register mouse down)*/
				if (this.opts['c1'] != this.NO_ICON) {
					if (this.option_1.contains_xywh(global.mouse_x, global.mouse_y, this.option_1.get_width() * 1.25, this.option_1.get_height() * 1.25)) {
						global.component_touched = true;
					}
				}
				/* Block around c2 (so components don't register mouse down)*/
				if (this.opts['c2'] != this.NO_ICON) {
					if (this.option_2.contains_xywh(global.mouse_x, global.mouse_y, this.option_2.get_width() * 1.25, this.option_2.get_height() * 1.25)) {
						global.component_touched = true;
					}
				}
				/* Block around c3 (so components don't register mouse down)*/
				if (this.opts['c3'] != this.NO_ICON) {
					if (this.option_3.contains_xywh(global.mouse_x, global.mouse_y, this.option_3.get_width() * 1.25, this.option_3.get_height() * 1.25)) {
						global.component_touched = true;
					}
				}
				this.first_touch_x = global.mouse_x;
				this.first_touch_y = global.mouse_y;
			}
		}
	}
	mouse_move(): void {}
	mouse_up(): void {
		if (!global.mouse_keyboard_lock) {
			if (
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
				if (global.selected) {
					if (this.option_0.contains_xy(global.mouse_x, global.mouse_y) && this.option_0.contains_xy(this.first_touch_x, this.first_touch_y)) {
						this.handle_options('c0');
						global.SIGNAL_BUILD_ELEMENT = true;
					}
					if (this.option_1.contains_xy(global.mouse_x, global.mouse_y) && this.option_1.contains_xy(this.first_touch_x, this.first_touch_y)) {
						this.handle_options('c1');
						global.SIGNAL_BUILD_ELEMENT = true;
					}
					if (this.option_2.contains_xy(global.mouse_x, global.mouse_y) && this.option_2.contains_xy(this.first_touch_x, this.first_touch_y)) {
						this.handle_options('c2');
						global.SIGNAL_BUILD_ELEMENT = true;
					}
					if (this.option_3.contains_xy(global.mouse_x, global.mouse_y) && this.option_3.contains_xy(this.first_touch_x, this.first_touch_y)) {
						this.handle_options('c3');
						global.SIGNAL_BUILD_ELEMENT = true;
					}
				}
			}
		}
	}
	/* Handy function for handling all the possibile options for every element! */
	handle_options(key: string): void {
		if (this.opts[key] === this.EDIT_ICON) {
			menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
		} else if (this.opts[key] === this.EYE_ICON) {
			this.handle_eye_option();
		} else if (this.opts[key] === this.TRASH_ICON && !global.FLAG_SIMULATING) {
			this.handle_trash_option();
		} else if (this.opts[key] === this.FLIP_ICON && !global.FLAG_SIMULATING) {
			this.handle_flip_option();
		} else if (this.opts[key] === this.ROTATE_ICON && !global.FLAG_SIMULATING) {
			this.handle_rotate_option();
		} else if (this.opts[key] === this.WIRE_ICON && !global.FLAG_SIMULATING) {
			this.handle_wire_option();
		}
		/* Block out the reset selection portion of the code! */
		global.component_touched = true;
	}
	handle_wire_option(): void {
		let index: number = -1;
		if (global.selected_type === global.TYPE_WIRE) {
			index = engine_functions.get_wire(global.selected_id);
			if (index > -1 && index < wires.length) {
				wires[index].increment_style();
			}
		}
	}
	handle_flip_option(): void {
		let index: number = -1;
		/* #INSERT_GENERATE_ELEMENT_OPTIONS_FLIP# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		if (global.selected_type === global.TYPE_RESISTOR) {
			index = engine_functions.get_resistor(global.selected_id);

			if (index < resistors.length) {
				resistors[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_CAPACITOR) {
			index = engine_functions.get_capacitor(global.selected_id);

			if (index < capacitors.length) {
				capacitors[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_INDUCTOR) {
			index = engine_functions.get_inductor(global.selected_id);

			if (index < inductors.length) {
				inductors[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_GROUND) {
			index = engine_functions.get_ground(global.selected_id);

			if (index < grounds.length) {
				grounds[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_DCSOURCE) {
			index = engine_functions.get_dcsource(global.selected_id);

			if (index < dcsources.length) {
				dcsources[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_DCCURRENT) {
			index = engine_functions.get_dccurrent(global.selected_id);

			if (index < dccurrents.length) {
				dccurrents[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_ACSOURCE) {
			index = engine_functions.get_acsource(global.selected_id);

			if (index < acsources.length) {
				acsources[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_ACCURRENT) {
			index = engine_functions.get_accurrent(global.selected_id);

			if (index < accurrents.length) {
				accurrents[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_SQUAREWAVE) {
			index = engine_functions.get_squarewave(global.selected_id);

			if (index < squarewaves.length) {
				squarewaves[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_SAW) {
			index = engine_functions.get_sawwave(global.selected_id);

			if (index < sawwaves.length) {
				sawwaves[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_TRI) {
			index = engine_functions.get_trianglewave(global.selected_id);

			if (index < trianglewaves.length) {
				trianglewaves[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_CONSTANT) {
			index = engine_functions.get_constant(global.selected_id);

			if (index < constants.length) {
				constants[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_WIRE) {
			index = engine_functions.get_wire(global.selected_id);

			if (index < wires.length) {
				wires[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_NET) {
			index = engine_functions.get_net(global.selected_id);

			if (index < nets.length) {
				nets[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_NOTE) {
			index = engine_functions.get_note(global.selected_id);

			if (index < notes.length) {
				notes[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_RAIL) {
			index = engine_functions.get_rail(global.selected_id);

			if (index < rails.length) {
				rails[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_VOLTMETER) {
			index = engine_functions.get_voltmeter(global.selected_id);

			if (index < voltmeters.length) {
				voltmeters[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_OHMMETER) {
			index = engine_functions.get_ohmmeter(global.selected_id);

			if (index < ohmmeters.length) {
				ohmmeters[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_AMMETER) {
			index = engine_functions.get_ammeter(global.selected_id);

			if (index < ammeters.length) {
				ammeters[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_WATTMETER) {
			index = engine_functions.get_wattmeter(global.selected_id);

			if (index < wattmeters.length) {
				wattmeters[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_FUSE) {
			index = engine_functions.get_fuse(global.selected_id);

			if (index < fuses.length) {
				fuses[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_SPST) {
			index = engine_functions.get_spst(global.selected_id);

			if (index < spsts.length) {
				spsts[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_SPDT) {
			index = engine_functions.get_spdt(global.selected_id);

			if (index < spdts.length) {
				spdts[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_NOT) {
			index = engine_functions.get_not(global.selected_id);

			if (index < nots.length) {
				nots[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_DIODE) {
			index = engine_functions.get_diode(global.selected_id);

			if (index < diodes.length) {
				diodes[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_LED) {
			index = engine_functions.get_led(global.selected_id);

			if (index < leds.length) {
				leds[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_ZENER) {
			index = engine_functions.get_zener(global.selected_id);

			if (index < zeners.length) {
				zeners[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_POTENTIOMETER) {
			index = engine_functions.get_potentiometer(global.selected_id);

			if (index < potentiometers.length) {
				potentiometers[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_AND) {
			index = engine_functions.get_and(global.selected_id);

			if (index < ands.length) {
				ands[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_OR) {
			index = engine_functions.get_or(global.selected_id);

			if (index < ors.length) {
				ors[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_NAND) {
			index = engine_functions.get_nand(global.selected_id);

			if (index < nands.length) {
				nands[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_NOR) {
			index = engine_functions.get_nor(global.selected_id);

			if (index < nors.length) {
				nors[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_XOR) {
			index = engine_functions.get_xor(global.selected_id);

			if (index < xors.length) {
				xors[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_XNOR) {
			index = engine_functions.get_xnor(global.selected_id);

			if (index < xnors.length) {
				xnors[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_DFF) {
			index = engine_functions.get_dff(global.selected_id);

			if (index < dffs.length) {
				dffs[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_VSAT) {
			index = engine_functions.get_vsat(global.selected_id);

			if (index < vsats.length) {
				vsats[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_ADD) {
			index = engine_functions.get_adder(global.selected_id);

			if (index < adders.length) {
				adders[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_SUB) {
			index = engine_functions.get_subtractor(global.selected_id);

			if (index < subtractors.length) {
				subtractors[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_MUL) {
			index = engine_functions.get_multiplier(global.selected_id);

			if (index < multipliers.length) {
				multipliers[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_DIV) {
			index = engine_functions.get_divider(global.selected_id);

			if (index < dividers.length) {
				dividers[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_GAIN) {
			index = engine_functions.get_gain(global.selected_id);

			if (index < gains.length) {
				gains[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_ABS) {
			index = engine_functions.get_absval(global.selected_id);

			if (index < absvals.length) {
				absvals[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_VCSW) {
			index = engine_functions.get_vcsw(global.selected_id);

			if (index < vcsws.length) {
				vcsws[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_VCVS) {
			index = engine_functions.get_vcvs(global.selected_id);

			if (index < vcvss.length) {
				vcvss[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_VCCS) {
			index = engine_functions.get_vccs(global.selected_id);

			if (index < vccss.length) {
				vccss[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_CCCS) {
			index = engine_functions.get_cccs(global.selected_id);

			if (index < cccss.length) {
				cccss[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_CCVS) {
			index = engine_functions.get_ccvs(global.selected_id);

			if (index < ccvss.length) {
				ccvss[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_OPAMP) {
			index = engine_functions.get_opamp(global.selected_id);

			if (index < opamps.length) {
				opamps[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_NMOS) {
			index = engine_functions.get_nmosfet(global.selected_id);

			if (index < nmosfets.length) {
				nmosfets[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_PMOS) {
			index = engine_functions.get_pmosfet(global.selected_id);

			if (index < pmosfets.length) {
				pmosfets[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_NPN) {
			index = engine_functions.get_npn(global.selected_id);

			if (index < npns.length) {
				npns[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_PNP) {
			index = engine_functions.get_pnp(global.selected_id);

			if (index < pnps.length) {
				pnps[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_ADC) {
			index = engine_functions.get_adc(global.selected_id);

			if (index < adcs.length) {
				adcs[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_DAC) {
			index = engine_functions.get_dac(global.selected_id);

			if (index < dacs.length) {
				dacs[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_SAH) {
			index = engine_functions.get_samplers(global.selected_id);

			if (index < sandhs.length) {
				sandhs[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_PWM) {
			index = engine_functions.get_pwm(global.selected_id);

			if (index < pwms.length) {
				pwms[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_INTEGRATOR) {
			index = engine_functions.get_integrator(global.selected_id);

			if (index < integrators.length) {
				integrators[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
			index = engine_functions.get_differentiator(global.selected_id);

			if (index < differentiators.length) {
				differentiators[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_LPF) {
			index = engine_functions.get_lowpass(global.selected_id);

			if (index < lowpasses.length) {
				lowpasses[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_HPF) {
			index = engine_functions.get_highpass(global.selected_id);

			if (index < highpasses.length) {
				highpasses[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_REL) {
			index = engine_functions.get_relay(global.selected_id);

			if (index < relays.length) {
				relays[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_PID) {
			index = engine_functions.get_pid(global.selected_id);

			if (index < pids.length) {
				pids[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_LUT) {
			index = engine_functions.get_lut(global.selected_id);

			if (index < luts.length) {
				luts[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_VCR) {
			index = engine_functions.get_vcr(global.selected_id);

			if (index < vcrs.length) {
				vcrs[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_GRT) {
			index = engine_functions.get_grt(global.selected_id);

			if (index < grts.length) {
				grts[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_TPTZ) {
			index = engine_functions.get_tptz(global.selected_id);

			if (index < tptzs.length) {
				tptzs[index].increment_flip();
			}
		} else if (global.selected_type === global.TYPE_TRAN) {
			index = engine_functions.get_transformer(global.selected_id);

			if (index < transformers.length) {
				transformers[index].increment_flip();
			}
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	handle_eye_option(): void {
		let index: number = -1;
		/* #INSERT_GENERATE_ELEMENT_OPTIONS_SCOPE_ENTRY# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		if (global.selected_type === global.TYPE_VOLTMETER) {
			index = engine_functions.get_voltmeter(global.selected_id);

			if (index < voltmeters.length) {
				if (!scope_manager.find_entry(voltmeters[index].elm.id, voltmeters[index].elm.type)) {
					scope_manager.push(voltmeters[index].elm.id, voltmeters[index].elm.type, voltmeters[index].elm.properties['tag']);
					global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
				} else {
					scope_manager.remove(voltmeters[index].elm.id, voltmeters[index].elm.type);
					global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
				}
			}
		} else if (global.selected_type === global.TYPE_OHMMETER) {
			index = engine_functions.get_ohmmeter(global.selected_id);

			if (index < ohmmeters.length) {
				if (!scope_manager.find_entry(ohmmeters[index].elm.id, ohmmeters[index].elm.type)) {
					scope_manager.push(ohmmeters[index].elm.id, ohmmeters[index].elm.type, ohmmeters[index].elm.properties['tag']);
					global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
				} else {
					scope_manager.remove(ohmmeters[index].elm.id, ohmmeters[index].elm.type);
					global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
				}
			}
		} else if (global.selected_type === global.TYPE_AMMETER) {
			index = engine_functions.get_ammeter(global.selected_id);

			if (index < ammeters.length) {
				if (!scope_manager.find_entry(ammeters[index].elm.id, ammeters[index].elm.type)) {
					scope_manager.push(ammeters[index].elm.id, ammeters[index].elm.type, ammeters[index].elm.properties['tag']);
					global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
				} else {
					scope_manager.remove(ammeters[index].elm.id, ammeters[index].elm.type);
					global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
				}
			}
		} else if (global.selected_type === global.TYPE_WATTMETER) {
			index = engine_functions.get_wattmeter(global.selected_id);

			if (index < wattmeters.length) {
				if (!scope_manager.find_entry(wattmeters[index].elm.id, wattmeters[index].elm.type)) {
					scope_manager.push(wattmeters[index].elm.id, wattmeters[index].elm.type, wattmeters[index].elm.properties['tag']);
					global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
				} else {
					scope_manager.remove(wattmeters[index].elm.id, wattmeters[index].elm.type);
					global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
				}
			}
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	handle_rotate_option(): void {
		let index: number = -1;
		/* #INSERT_GENERATE_ELEMENT_OPTIONS_ROTATE# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		if (global.selected_type === global.TYPE_RESISTOR) {
			index = engine_functions.get_resistor(global.selected_id);

			if (index < resistors.length) {
				resistors[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_CAPACITOR) {
			index = engine_functions.get_capacitor(global.selected_id);

			if (index < capacitors.length) {
				capacitors[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_INDUCTOR) {
			index = engine_functions.get_inductor(global.selected_id);

			if (index < inductors.length) {
				inductors[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_GROUND) {
			index = engine_functions.get_ground(global.selected_id);

			if (index < grounds.length) {
				grounds[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_DCSOURCE) {
			index = engine_functions.get_dcsource(global.selected_id);

			if (index < dcsources.length) {
				dcsources[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_DCCURRENT) {
			index = engine_functions.get_dccurrent(global.selected_id);

			if (index < dccurrents.length) {
				dccurrents[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_ACSOURCE) {
			index = engine_functions.get_acsource(global.selected_id);

			if (index < acsources.length) {
				acsources[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_ACCURRENT) {
			index = engine_functions.get_accurrent(global.selected_id);

			if (index < accurrents.length) {
				accurrents[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_SQUAREWAVE) {
			index = engine_functions.get_squarewave(global.selected_id);

			if (index < squarewaves.length) {
				squarewaves[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_SAW) {
			index = engine_functions.get_sawwave(global.selected_id);

			if (index < sawwaves.length) {
				sawwaves[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_TRI) {
			index = engine_functions.get_trianglewave(global.selected_id);

			if (index < trianglewaves.length) {
				trianglewaves[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_CONSTANT) {
			index = engine_functions.get_constant(global.selected_id);

			if (index < constants.length) {
				constants[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_NET) {
			index = engine_functions.get_net(global.selected_id);

			if (index < nets.length) {
				nets[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_NOTE) {
			index = engine_functions.get_note(global.selected_id);

			if (index < notes.length) {
				notes[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_RAIL) {
			index = engine_functions.get_rail(global.selected_id);

			if (index < rails.length) {
				rails[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_VOLTMETER) {
			index = engine_functions.get_voltmeter(global.selected_id);

			if (index < voltmeters.length) {
				voltmeters[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_OHMMETER) {
			index = engine_functions.get_ohmmeter(global.selected_id);

			if (index < ohmmeters.length) {
				ohmmeters[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_AMMETER) {
			index = engine_functions.get_ammeter(global.selected_id);

			if (index < ammeters.length) {
				ammeters[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_WATTMETER) {
			index = engine_functions.get_wattmeter(global.selected_id);

			if (index < wattmeters.length) {
				wattmeters[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_FUSE) {
			index = engine_functions.get_fuse(global.selected_id);

			if (index < fuses.length) {
				fuses[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_SPST) {
			index = engine_functions.get_spst(global.selected_id);

			if (index < spsts.length) {
				spsts[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_SPDT) {
			index = engine_functions.get_spdt(global.selected_id);

			if (index < spdts.length) {
				spdts[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_NOT) {
			index = engine_functions.get_not(global.selected_id);

			if (index < nots.length) {
				nots[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_DIODE) {
			index = engine_functions.get_diode(global.selected_id);

			if (index < diodes.length) {
				diodes[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_LED) {
			index = engine_functions.get_led(global.selected_id);

			if (index < leds.length) {
				leds[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_ZENER) {
			index = engine_functions.get_zener(global.selected_id);

			if (index < zeners.length) {
				zeners[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_POTENTIOMETER) {
			index = engine_functions.get_potentiometer(global.selected_id);

			if (index < potentiometers.length) {
				potentiometers[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_AND) {
			index = engine_functions.get_and(global.selected_id);

			if (index < ands.length) {
				ands[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_OR) {
			index = engine_functions.get_or(global.selected_id);

			if (index < ors.length) {
				ors[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_NAND) {
			index = engine_functions.get_nand(global.selected_id);

			if (index < nands.length) {
				nands[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_NOR) {
			index = engine_functions.get_nor(global.selected_id);

			if (index < nors.length) {
				nors[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_XOR) {
			index = engine_functions.get_xor(global.selected_id);

			if (index < xors.length) {
				xors[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_XNOR) {
			index = engine_functions.get_xnor(global.selected_id);

			if (index < xnors.length) {
				xnors[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_DFF) {
			index = engine_functions.get_dff(global.selected_id);

			if (index < dffs.length) {
				dffs[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_VSAT) {
			index = engine_functions.get_vsat(global.selected_id);

			if (index < vsats.length) {
				vsats[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_ADD) {
			index = engine_functions.get_adder(global.selected_id);

			if (index < adders.length) {
				adders[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_SUB) {
			index = engine_functions.get_subtractor(global.selected_id);

			if (index < subtractors.length) {
				subtractors[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_MUL) {
			index = engine_functions.get_multiplier(global.selected_id);

			if (index < multipliers.length) {
				multipliers[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_DIV) {
			index = engine_functions.get_divider(global.selected_id);

			if (index < dividers.length) {
				dividers[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_GAIN) {
			index = engine_functions.get_gain(global.selected_id);

			if (index < gains.length) {
				gains[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_ABS) {
			index = engine_functions.get_absval(global.selected_id);

			if (index < absvals.length) {
				absvals[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_VCSW) {
			index = engine_functions.get_vcsw(global.selected_id);

			if (index < vcsws.length) {
				vcsws[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_VCVS) {
			index = engine_functions.get_vcvs(global.selected_id);

			if (index < vcvss.length) {
				vcvss[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_VCCS) {
			index = engine_functions.get_vccs(global.selected_id);

			if (index < vccss.length) {
				vccss[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_CCCS) {
			index = engine_functions.get_cccs(global.selected_id);

			if (index < cccss.length) {
				cccss[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_CCVS) {
			index = engine_functions.get_ccvs(global.selected_id);

			if (index < ccvss.length) {
				ccvss[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_OPAMP) {
			index = engine_functions.get_opamp(global.selected_id);

			if (index < opamps.length) {
				opamps[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_NMOS) {
			index = engine_functions.get_nmosfet(global.selected_id);

			if (index < nmosfets.length) {
				nmosfets[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_PMOS) {
			index = engine_functions.get_pmosfet(global.selected_id);

			if (index < pmosfets.length) {
				pmosfets[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_NPN) {
			index = engine_functions.get_npn(global.selected_id);

			if (index < npns.length) {
				npns[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_PNP) {
			index = engine_functions.get_pnp(global.selected_id);

			if (index < pnps.length) {
				pnps[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_ADC) {
			index = engine_functions.get_adc(global.selected_id);

			if (index < adcs.length) {
				adcs[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_DAC) {
			index = engine_functions.get_dac(global.selected_id);

			if (index < dacs.length) {
				dacs[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_SAH) {
			index = engine_functions.get_samplers(global.selected_id);

			if (index < sandhs.length) {
				sandhs[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_PWM) {
			index = engine_functions.get_pwm(global.selected_id);

			if (index < pwms.length) {
				pwms[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_INTEGRATOR) {
			index = engine_functions.get_integrator(global.selected_id);

			if (index < integrators.length) {
				integrators[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
			index = engine_functions.get_differentiator(global.selected_id);

			if (index < differentiators.length) {
				differentiators[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_LPF) {
			index = engine_functions.get_lowpass(global.selected_id);

			if (index < lowpasses.length) {
				lowpasses[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_HPF) {
			index = engine_functions.get_highpass(global.selected_id);

			if (index < highpasses.length) {
				highpasses[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_REL) {
			index = engine_functions.get_relay(global.selected_id);

			if (index < relays.length) {
				relays[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_PID) {
			index = engine_functions.get_pid(global.selected_id);

			if (index < pids.length) {
				pids[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_LUT) {
			index = engine_functions.get_lut(global.selected_id);

			if (index < luts.length) {
				luts[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_VCR) {
			index = engine_functions.get_vcr(global.selected_id);

			if (index < vcrs.length) {
				vcrs[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_GRT) {
			index = engine_functions.get_grt(global.selected_id);

			if (index < grts.length) {
				grts[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_TPTZ) {
			index = engine_functions.get_tptz(global.selected_id);

			if (index < tptzs.length) {
				tptzs[index].increment_rotation();
			}
		} else if (global.selected_type === global.TYPE_TRAN) {
			index = engine_functions.get_transformer(global.selected_id);

			if (index < transformers.length) {
				transformers[index].increment_rotation();
			}
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	handle_trash_option(): void {
		let index: number = -1;
		/* #INSERT_GENERATE_ELEMENT_OPTIONS_REMOVE# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		if (global.selected_type === global.TYPE_RESISTOR) {
			index = engine_functions.get_resistor(global.selected_id);

			if (index < resistors.length) {
				engine_functions.remove_resistor(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_CAPACITOR) {
			index = engine_functions.get_capacitor(global.selected_id);

			if (index < capacitors.length) {
				engine_functions.remove_capacitor(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_INDUCTOR) {
			index = engine_functions.get_inductor(global.selected_id);

			if (index < inductors.length) {
				engine_functions.remove_inductor(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_GROUND) {
			index = engine_functions.get_ground(global.selected_id);

			if (index < grounds.length) {
				engine_functions.remove_ground(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_DCSOURCE) {
			index = engine_functions.get_dcsource(global.selected_id);

			if (index < dcsources.length) {
				engine_functions.remove_dcsource(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_DCCURRENT) {
			index = engine_functions.get_dccurrent(global.selected_id);

			if (index < dccurrents.length) {
				engine_functions.remove_dccurrent(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_ACSOURCE) {
			index = engine_functions.get_acsource(global.selected_id);

			if (index < acsources.length) {
				engine_functions.remove_acsource(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_ACCURRENT) {
			index = engine_functions.get_accurrent(global.selected_id);

			if (index < accurrents.length) {
				engine_functions.remove_accurrent(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_SQUAREWAVE) {
			index = engine_functions.get_squarewave(global.selected_id);

			if (index < squarewaves.length) {
				engine_functions.remove_squarewave(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_SAW) {
			index = engine_functions.get_sawwave(global.selected_id);

			if (index < sawwaves.length) {
				engine_functions.remove_sawwave(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_TRI) {
			index = engine_functions.get_trianglewave(global.selected_id);

			if (index < trianglewaves.length) {
				engine_functions.remove_trianglewave(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_CONSTANT) {
			index = engine_functions.get_constant(global.selected_id);

			if (index < constants.length) {
				engine_functions.remove_constant(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_WIRE) {
			index = engine_functions.get_wire(global.selected_id);

			if (index < wires.length) {
				engine_functions.remove_wire(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_NET) {
			index = engine_functions.get_net(global.selected_id);

			if (index < nets.length) {
				engine_functions.remove_net(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_NOTE) {
			index = engine_functions.get_note(global.selected_id);

			if (index < notes.length) {
				engine_functions.remove_note(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_RAIL) {
			index = engine_functions.get_rail(global.selected_id);

			if (index < rails.length) {
				engine_functions.remove_rail(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_VOLTMETER) {
			index = engine_functions.get_voltmeter(global.selected_id);

			if (index < voltmeters.length) {
				engine_functions.remove_voltmeter(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_OHMMETER) {
			index = engine_functions.get_ohmmeter(global.selected_id);

			if (index < ohmmeters.length) {
				engine_functions.remove_ohmmeter(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_AMMETER) {
			index = engine_functions.get_ammeter(global.selected_id);

			if (index < ammeters.length) {
				engine_functions.remove_ammeter(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_WATTMETER) {
			index = engine_functions.get_wattmeter(global.selected_id);

			if (index < wattmeters.length) {
				engine_functions.remove_wattmeter(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_FUSE) {
			index = engine_functions.get_fuse(global.selected_id);

			if (index < fuses.length) {
				engine_functions.remove_fuse(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_SPST) {
			index = engine_functions.get_spst(global.selected_id);

			if (index < spsts.length) {
				engine_functions.remove_spst(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_SPDT) {
			index = engine_functions.get_spdt(global.selected_id);

			if (index < spdts.length) {
				engine_functions.remove_spdt(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_NOT) {
			index = engine_functions.get_not(global.selected_id);

			if (index < nots.length) {
				engine_functions.remove_not(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_DIODE) {
			index = engine_functions.get_diode(global.selected_id);

			if (index < diodes.length) {
				engine_functions.remove_diode(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_LED) {
			index = engine_functions.get_led(global.selected_id);

			if (index < leds.length) {
				engine_functions.remove_led(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_ZENER) {
			index = engine_functions.get_zener(global.selected_id);

			if (index < zeners.length) {
				engine_functions.remove_zener(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_POTENTIOMETER) {
			index = engine_functions.get_potentiometer(global.selected_id);

			if (index < potentiometers.length) {
				engine_functions.remove_potentiometer(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_AND) {
			index = engine_functions.get_and(global.selected_id);

			if (index < ands.length) {
				engine_functions.remove_and(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_OR) {
			index = engine_functions.get_or(global.selected_id);

			if (index < ors.length) {
				engine_functions.remove_or(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_NAND) {
			index = engine_functions.get_nand(global.selected_id);

			if (index < nands.length) {
				engine_functions.remove_nand(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_NOR) {
			index = engine_functions.get_nor(global.selected_id);

			if (index < nors.length) {
				engine_functions.remove_nor(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_XOR) {
			index = engine_functions.get_xor(global.selected_id);

			if (index < xors.length) {
				engine_functions.remove_xor(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_XNOR) {
			index = engine_functions.get_xnor(global.selected_id);

			if (index < xnors.length) {
				engine_functions.remove_xnor(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_DFF) {
			index = engine_functions.get_dff(global.selected_id);

			if (index < dffs.length) {
				engine_functions.remove_dff(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_VSAT) {
			index = engine_functions.get_vsat(global.selected_id);

			if (index < vsats.length) {
				engine_functions.remove_vsat(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_ADD) {
			index = engine_functions.get_adder(global.selected_id);

			if (index < adders.length) {
				engine_functions.remove_adder(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_SUB) {
			index = engine_functions.get_subtractor(global.selected_id);

			if (index < subtractors.length) {
				engine_functions.remove_subtractor(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_MUL) {
			index = engine_functions.get_multiplier(global.selected_id);

			if (index < multipliers.length) {
				engine_functions.remove_multiplier(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_DIV) {
			index = engine_functions.get_divider(global.selected_id);

			if (index < dividers.length) {
				engine_functions.remove_divider(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_GAIN) {
			index = engine_functions.get_gain(global.selected_id);

			if (index < gains.length) {
				engine_functions.remove_gain(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_ABS) {
			index = engine_functions.get_absval(global.selected_id);

			if (index < absvals.length) {
				engine_functions.remove_absval(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_VCSW) {
			index = engine_functions.get_vcsw(global.selected_id);

			if (index < vcsws.length) {
				engine_functions.remove_vcsw(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_VCVS) {
			index = engine_functions.get_vcvs(global.selected_id);

			if (index < vcvss.length) {
				engine_functions.remove_vcvs(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_VCCS) {
			index = engine_functions.get_vccs(global.selected_id);

			if (index < vccss.length) {
				engine_functions.remove_vccs(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_CCCS) {
			index = engine_functions.get_cccs(global.selected_id);

			if (index < cccss.length) {
				engine_functions.remove_cccs(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_CCVS) {
			index = engine_functions.get_ccvs(global.selected_id);

			if (index < ccvss.length) {
				engine_functions.remove_ccvs(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_OPAMP) {
			index = engine_functions.get_opamp(global.selected_id);

			if (index < opamps.length) {
				engine_functions.remove_opamp(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_NMOS) {
			index = engine_functions.get_nmosfet(global.selected_id);

			if (index < nmosfets.length) {
				engine_functions.remove_nmosfet(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_PMOS) {
			index = engine_functions.get_pmosfet(global.selected_id);

			if (index < pmosfets.length) {
				engine_functions.remove_pmosfet(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_NPN) {
			index = engine_functions.get_npn(global.selected_id);

			if (index < npns.length) {
				engine_functions.remove_npn(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_PNP) {
			index = engine_functions.get_pnp(global.selected_id);

			if (index < pnps.length) {
				engine_functions.remove_pnp(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_ADC) {
			index = engine_functions.get_adc(global.selected_id);

			if (index < adcs.length) {
				engine_functions.remove_adc(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_DAC) {
			index = engine_functions.get_dac(global.selected_id);

			if (index < dacs.length) {
				engine_functions.remove_dac(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_SAH) {
			index = engine_functions.get_samplers(global.selected_id);

			if (index < sandhs.length) {
				engine_functions.remove_samplers(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_PWM) {
			index = engine_functions.get_pwm(global.selected_id);

			if (index < pwms.length) {
				engine_functions.remove_pwm(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_INTEGRATOR) {
			index = engine_functions.get_integrator(global.selected_id);

			if (index < integrators.length) {
				engine_functions.remove_integrator(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
			index = engine_functions.get_differentiator(global.selected_id);

			if (index < differentiators.length) {
				engine_functions.remove_differentiator(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_LPF) {
			index = engine_functions.get_lowpass(global.selected_id);

			if (index < lowpasses.length) {
				engine_functions.remove_lowpass(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_HPF) {
			index = engine_functions.get_highpass(global.selected_id);

			if (index < highpasses.length) {
				engine_functions.remove_highpass(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_REL) {
			index = engine_functions.get_relay(global.selected_id);

			if (index < relays.length) {
				engine_functions.remove_relay(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_PID) {
			index = engine_functions.get_pid(global.selected_id);

			if (index < pids.length) {
				engine_functions.remove_pid(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_LUT) {
			index = engine_functions.get_lut(global.selected_id);

			if (index < luts.length) {
				engine_functions.remove_lut(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_VCR) {
			index = engine_functions.get_vcr(global.selected_id);

			if (index < vcrs.length) {
				engine_functions.remove_vcr(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_GRT) {
			index = engine_functions.get_grt(global.selected_id);

			if (index < grts.length) {
				engine_functions.remove_grt(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_TPTZ) {
			index = engine_functions.get_tptz(global.selected_id);

			if (index < tptzs.length) {
				engine_functions.remove_tptz(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		} else if (global.selected_type === global.TYPE_TRAN) {
			index = engine_functions.get_transformer(global.selected_id);

			if (index < transformers.length) {
				engine_functions.remove_transformer(index);
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			}
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	reset_options(): void {
		this.set_show(false, false, false, false);
		this.opts['c0'] = this.NO_ICON;
		this.opts['c1'] = this.NO_ICON;
		this.opts['c2'] = this.NO_ICON;
		this.opts['c3'] = this.NO_ICON;
	}
	/* #INSERT_GENERATE_ELEMENT_OPTIONS_ICON_PATTERN# */
	/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
	handle_resistor(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_capacitor(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_inductor(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_ground(): void {
		this.set_show(true, true, false, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.TRASH_ICON;
		this.opts['c2'] = this.NO_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_dcsource(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_dccurrent(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_acsource(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_accurrent(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_squarewave(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_sawwave(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_trianglewave(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_constant(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_wire(): void {
		this.set_show(true, true, false, false);
		this.opts['c0'] = this.WIRE_ICON;
		this.opts['c1'] = this.TRASH_ICON;
		this.opts['c2'] = this.NO_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_net(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_note(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_rail(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_voltmeter(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EYE_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_ohmmeter(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EYE_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_ammeter(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EYE_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_wattmeter(): void {
		this.set_show(true, true, true, true);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EYE_ICON;
		this.opts['c2'] = this.FLIP_ICON;
		this.opts['c3'] = this.TRASH_ICON;
		this.map_options();
	}

	handle_fuse(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_spst(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_spdt(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_not(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_diode(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_led(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_zener(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_potentiometer(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_and(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_or(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_nand(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_nor(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_xor(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_xnor(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_dff(): void {
		this.set_show(true, true, false, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.TRASH_ICON;
		this.opts['c2'] = this.NO_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_vsat(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_adder() {
		this.set_show(true, true, false, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.TRASH_ICON;
		this.opts['c2'] = this.NO_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_subtractor(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.FLIP_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_multiplier() {
		this.set_show(true, true, false, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.TRASH_ICON;
		this.opts['c2'] = this.NO_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_divider(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.FLIP_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_gain(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_absval(): void {
		this.set_show(true, true, false, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.TRASH_ICON;
		this.opts['c2'] = this.NO_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_vcsw(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_vcvs(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_vccs(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_cccs(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_ccvs(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_opamp(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.FLIP_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_nmosfet(): void {
		this.set_show(true, true, true, true);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.FLIP_ICON;
		this.opts['c3'] = this.TRASH_ICON;
		this.map_options();
	}

	handle_pmosfet(): void {
		this.set_show(true, true, true, true);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.FLIP_ICON;
		this.opts['c3'] = this.TRASH_ICON;
		this.map_options();
	}

	handle_npn(): void {
		this.set_show(true, true, true, true);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.FLIP_ICON;
		this.opts['c3'] = this.TRASH_ICON;
		this.map_options();
	}

	handle_pnp(): void {
		this.set_show(true, true, true, true);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.FLIP_ICON;
		this.opts['c3'] = this.TRASH_ICON;
		this.map_options();
	}

	handle_adc(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_dac(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_samplers(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.FLIP_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_pwm(): void {
		this.set_show(true, true, true, true);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.FLIP_ICON;
		this.opts['c3'] = this.TRASH_ICON;
		this.map_options();
	}

	handle_integrator(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_differentiator(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_lowpass(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_highpass(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_relay(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_pid(): void {
		this.set_show(true, true, true, true);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.FLIP_ICON;
		this.opts['c3'] = this.TRASH_ICON;
		this.map_options();
	}

	handle_lut(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_vcr(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_grt() {
		this.set_show(true, true, false, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.TRASH_ICON;
		this.opts['c2'] = this.NO_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_tptz(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	handle_transformer(): void {
		this.set_show(true, true, true, false);
		this.opts['c0'] = this.ROTATE_ICON;
		this.opts['c1'] = this.EDIT_ICON;
		this.opts['c2'] = this.TRASH_ICON;
		this.opts['c3'] = this.NO_ICON;
		this.map_options();
	}

	/* <!-- END AUTOMATICALLY GENERATED !--> */
	/* Don't assign an icon to multiple buttons! */
	map_options(): void {
		switch (this.opts['c0']) {
			case this.EDIT_ICON:
				this.load_edit_svg(this.option_0);
				break;
			case this.TRASH_ICON:
				this.load_trash_svg(this.option_0);
				break;
			case this.FLIP_ICON:
				this.load_flip_svg(this.option_0);
				break;
			default:
				break;
		}
		switch (this.opts['c1']) {
			case this.EDIT_ICON:
				this.load_edit_svg(this.option_1);
				break;
			case this.TRASH_ICON:
				this.load_trash_svg(this.option_1);
				break;
			case this.FLIP_ICON:
				this.load_flip_svg(this.option_1);
				break;
			default:
				break;
		}
		switch (this.opts['c2']) {
			case this.EDIT_ICON:
				this.load_edit_svg(this.option_2);
				break;
			case this.TRASH_ICON:
				this.load_trash_svg(this.option_2);
				break;
			case this.FLIP_ICON:
				this.load_flip_svg(this.option_2);
				break;
			default:
				break;
		}
		switch (this.opts['c3']) {
			case this.EDIT_ICON:
				this.load_edit_svg(this.option_3);
				break;
			case this.TRASH_ICON:
				this.load_trash_svg(this.option_3);
				break;
			case this.FLIP_ICON:
				this.load_flip_svg(this.option_3);
				break;
			default:
				break;
		}
	}
	restore_color(): void {
		this.icon_paint.set_color(global.GENERAL_WHITE_COLOR);
	}
	update_color(): void {
		if (!global.FLAG_SIMULATING) {
			this.icon_paint.set_color(global.GENERAL_WHITE_COLOR);
			this.line_paint_alt.set_color(global.GENERAL_WHITE_COLOR);
		} else {
			this.icon_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
			this.line_paint_alt.set_color(global.MENU_ICON_INACTIVE_COLOR);
		}
	}
	draw_options(canvas: GraphicsEngine): void {
		if (global.FLAG_IDLE && !global.FLAG_MENU_OPEN_DOWN && !global.FLAG_GRAPH) {
			if (global.selected) {
				if (this.show_0) {
					if (
						this.option_0.contains_xy(global.mouse_x, global.mouse_y) &&
						!global.FLAG_MENU_OPEN_DOWN &&
						!global.FLAG_ZOOM &&
						!global.FLAG_SELECT_SETTINGS &&
						!global.FLAG_SAVE_IMAGE &&
						!global.FLAG_SAVE_CIRCUIT &&
						!global.FLAG_SELECT_TIMESTEP &&
						!global.FLAG_ELEMENT_OPTIONS_EDIT &&
						!global.FLAG_ELEMENT_OPTIONS &&
						!global.FLAG_GRAPH &&
						!global.FLAG_REMOVE_ALL &&
						!global.MOBILE_MODE
					) {
						canvas.draw_round_rect2(this.option_0, 0.6 * global.CANVAS_STROKE_WIDTH_3, this.hover_paint);
					} else {
						canvas.draw_round_rect2(this.option_0, 0.6 * global.CANVAS_STROKE_WIDTH_3, this.fill_paint);
					}
					switch (this.opts['c0']) {
						case this.ROTATE_ICON:
							this.update_color();
							this.draw_rotate(this.option_0, canvas);
							this.restore_color();
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('R', this.option_0.left - (this.option_0.get_width() >> 2), this.option_0.get_center_y(), this.text_paint);
							}
							break;
						case this.EDIT_ICON:
							canvas.draw_path(this.edit_path0, this.icon_paint);
							canvas.draw_path(this.edit_path1, this.icon_paint);
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('E', this.option_0.left - (this.option_0.get_width() >> 2), this.option_0.get_center_y(), this.text_paint);
							}
							break;
						case this.TRASH_ICON:
							this.update_color();
							canvas.draw_path(this.trash_path0, this.icon_paint);
							canvas.draw_path(this.trash_path1, this.icon_paint);
							this.restore_color();
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('DEL', this.option_0.left - (this.option_0.get_width() >> 2), this.option_0.get_center_y(), this.text_paint);
							}
							break;
						case this.FLIP_ICON:
							this.update_color();
							canvas.draw_path(this.flip_path0, this.icon_paint);
							canvas.draw_path(this.flip_path1, this.icon_paint);
							this.restore_color();
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('F', this.option_0.left - (this.option_0.get_width() >> 2), this.option_0.get_center_y(), this.text_paint);
							}
							break;
						case this.WIRE_ICON:
							this.draw_wire_style(this.option_0, canvas);
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('R', this.option_0.left - (this.option_0.get_width() >> 2), this.option_0.get_center_y(), this.text_paint);
							}
							break;
						default:
							break;
					}
				}
				if (this.show_1) {
					if (
						this.option_1.contains_xy(global.mouse_x, global.mouse_y) &&
						!global.FLAG_MENU_OPEN_DOWN &&
						!global.FLAG_ZOOM &&
						!global.FLAG_SELECT_SETTINGS &&
						!global.FLAG_SAVE_IMAGE &&
						!global.FLAG_SAVE_CIRCUIT &&
						!global.FLAG_SELECT_TIMESTEP &&
						!global.FLAG_ELEMENT_OPTIONS_EDIT &&
						!global.FLAG_ELEMENT_OPTIONS &&
						!global.FLAG_GRAPH &&
						!global.FLAG_REMOVE_ALL &&
						!global.MOBILE_MODE
					) {
						canvas.draw_round_rect2(this.option_1, 0.6 * global.CANVAS_STROKE_WIDTH_3, this.hover_paint);
					} else {
						canvas.draw_round_rect2(this.option_1, 0.6 * global.CANVAS_STROKE_WIDTH_3, this.fill_paint);
					}
					let width_mul_0p2: number = this.option_1.get_width() * 0.2;
					let height_mul_0p2: number = this.option_1.get_height() * 0.2;
					switch (this.opts['c1']) {
						case this.ROTATE_ICON:
							this.update_color();
							this.draw_rotate(this.option_1, canvas);
							this.restore_color();
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('R', this.option_1.left - (this.option_1.get_width() >> 2), this.option_1.get_center_y(), this.text_paint);
							}
							break;
						case this.EDIT_ICON:
							canvas.draw_path(this.edit_path0, this.icon_paint);
							canvas.draw_path(this.edit_path1, this.icon_paint);
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('E', this.option_1.left - (this.option_1.get_width() >> 2), this.option_1.get_center_y(), this.text_paint);
							}
							break;
						case this.TRASH_ICON:
							this.update_color();
							canvas.draw_path(this.trash_path0, this.icon_paint);
							canvas.draw_path(this.trash_path1, this.icon_paint);
							this.restore_color();
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('DEL', this.option_1.left - (this.option_1.get_width() >> 2), this.option_1.get_center_y(), this.text_paint);
							}
							break;
						case this.FLIP_ICON:
							this.update_color();
							canvas.draw_path(this.flip_path0, this.icon_paint);
							canvas.draw_path(this.flip_path1, this.icon_paint);
							this.restore_color();
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('F', this.option_1.left - (this.option_1.get_width() >> 2), this.option_1.get_center_y(), this.text_paint);
							}
							break;
						case this.EYE_ICON:
							if (scope_manager.find_entry(global.selected_id, global.selected_type)) {
								this.meter_line_paint.set_color(global.SELECTED_COLOR);
							} else {
								this.meter_line_paint.set_color(global.GENERAL_WHITE_COLOR);
							}
							canvas.draw_arc2(
								this.option_1.left + width_mul_0p2,
								this.option_1.get_center_y(),
								this.option_1.right - width_mul_0p2,
								this.option_1.get_center_y(),
								this.option_1.get_height() >> 1,
								this.meter_line_paint
							);
							canvas.draw_arc2(
								this.option_1.left + width_mul_0p2,
								this.option_1.get_center_y(),
								this.option_1.right - width_mul_0p2,
								this.option_1.get_center_y(),
								-this.option_1.get_height() >> 1,
								this.meter_line_paint
							);
							canvas.draw_circle(this.option_1.get_center_x(), this.option_1.get_center_y(), this.option_1.get_width() * 0.1, this.meter_line_paint);
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('E', this.option_1.left - (this.option_1.get_width() >> 2), this.option_1.get_center_y(), this.text_paint);
							}
							break;
						default:
							break;
					}
				}
				if (this.show_2) {
					if (
						this.option_2.contains_xy(global.mouse_x, global.mouse_y) &&
						!global.FLAG_MENU_OPEN_DOWN &&
						!global.FLAG_ZOOM &&
						!global.FLAG_SELECT_SETTINGS &&
						!global.FLAG_SAVE_IMAGE &&
						!global.FLAG_SAVE_CIRCUIT &&
						!global.FLAG_SELECT_TIMESTEP &&
						!global.FLAG_ELEMENT_OPTIONS_EDIT &&
						!global.FLAG_ELEMENT_OPTIONS &&
						!global.FLAG_GRAPH &&
						!global.FLAG_REMOVE_ALL &&
						!global.MOBILE_MODE
					) {
						canvas.draw_round_rect2(this.option_2, 0.6 * global.CANVAS_STROKE_WIDTH_3, this.hover_paint);
					} else {
						canvas.draw_round_rect2(this.option_2, 0.6 * global.CANVAS_STROKE_WIDTH_3, this.fill_paint);
					}
					switch (this.opts['c2']) {
						case this.ROTATE_ICON:
							this.update_color();
							this.draw_rotate(this.option_2, canvas);
							this.restore_color();
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('R', this.option_2.left - (this.option_2.get_width() >> 2), this.option_2.get_center_y(), this.text_paint);
							}
							break;
						case this.EDIT_ICON:
							canvas.draw_path(this.edit_path0, this.icon_paint);
							canvas.draw_path(this.edit_path1, this.icon_paint);
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('E', this.option_2.left - (this.option_2.get_width() >> 2), this.option_2.get_center_y(), this.text_paint);
							}
							break;
						case this.TRASH_ICON:
							this.update_color();
							canvas.draw_path(this.trash_path0, this.icon_paint);
							canvas.draw_path(this.trash_path1, this.icon_paint);
							this.restore_color();
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('DEL', this.option_2.left - (this.option_2.get_width() >> 2), this.option_2.get_center_y(), this.text_paint);
							}
							break;
						case this.FLIP_ICON:
							this.update_color();
							canvas.draw_path(this.flip_path0, this.icon_paint);
							canvas.draw_path(this.flip_path1, this.icon_paint);
							this.restore_color();
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('F', this.option_2.left - (this.option_2.get_width() >> 2), this.option_2.get_center_y(), this.text_paint);
							}
							break;
						default:
							break;
					}
				}
				if (this.show_3) {
					if (
						this.option_3.contains_xy(global.mouse_x, global.mouse_y) &&
						!global.FLAG_MENU_OPEN_DOWN &&
						!global.FLAG_ZOOM &&
						!global.FLAG_SELECT_SETTINGS &&
						!global.FLAG_SAVE_IMAGE &&
						!global.FLAG_SAVE_CIRCUIT &&
						!global.FLAG_SELECT_TIMESTEP &&
						!global.FLAG_ELEMENT_OPTIONS_EDIT &&
						!global.FLAG_ELEMENT_OPTIONS &&
						!global.FLAG_GRAPH &&
						!global.FLAG_REMOVE_ALL &&
						!global.MOBILE_MODE
					) {
						canvas.draw_round_rect2(this.option_3, 0.6 * global.CANVAS_STROKE_WIDTH_3, this.hover_paint);
					} else {
						canvas.draw_round_rect2(this.option_3, 0.6 * global.CANVAS_STROKE_WIDTH_3, this.fill_paint);
					}
					switch (this.opts['c3']) {
						case this.ROTATE_ICON:
							this.update_color();
							this.draw_rotate(this.option_3, canvas);
							this.restore_color();
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('R', this.option_3.left - (this.option_3.get_width() >> 2), this.option_3.get_center_y(), this.text_paint);
							}
							break;
						case this.EDIT_ICON:
							canvas.draw_path(this.edit_path0, this.icon_paint);
							canvas.draw_path(this.edit_path1, this.icon_paint);
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('E', this.option_3.left - (this.option_3.get_width() >> 2), this.option_3.get_center_y(), this.text_paint);
							}
							break;
						case this.TRASH_ICON:
							this.update_color();
							canvas.draw_path(this.trash_path0, this.icon_paint);
							canvas.draw_path(this.trash_path1, this.icon_paint);
							this.restore_color();
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('DEL', this.option_3.left - (this.option_3.get_width() >> 2), this.option_3.get_center_y(), this.text_paint);
							}
							break;
						case this.FLIP_ICON:
							this.update_color();
							canvas.draw_path(this.flip_path0, this.icon_paint);
							canvas.draw_path(this.flip_path1, this.icon_paint);
							this.restore_color();
							if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
								canvas.draw_text('F', this.option_3.left - (this.option_3.get_width() >> 2), this.option_3.get_center_y(), this.text_paint);
							}
							break;
						default:
							break;
					}
				}
			}
		}
	}
	draw_rotate(rect: RectF, canvas: GraphicsEngine): void {
		let cached_width: number = rect.get_width() * 0.303;
		let cached_height: number = rect.get_height() * 0.303;
		let width_mul_0p125: number = rect.get_width() * 0.125;
		let height_mul_0p125: number = rect.get_height() * 0.125;
		canvas.draw_line(rect.left + cached_width, rect.top + cached_width, rect.right - cached_width, rect.top + cached_width, this.line_paint_alt);
		canvas.draw_line(rect.left + cached_width, rect.top + cached_width, rect.left + cached_width, rect.bottom - cached_width, this.line_paint_alt);
		canvas.draw_line(rect.right - cached_width, rect.top + cached_width, rect.right - cached_width, rect.bottom - cached_height, this.line_paint_alt);
		canvas.draw_line(rect.right - cached_width, rect.bottom - cached_height, rect.right - cached_width - width_mul_0p125, rect.bottom - cached_height - height_mul_0p125, this.line_paint_alt);
		canvas.draw_line(rect.right - cached_width, rect.bottom - cached_height, rect.right - cached_width + width_mul_0p125, rect.bottom - cached_height - height_mul_0p125, this.line_paint_alt);
	}
	draw_wire_style(rect: RectF, canvas: GraphicsEngine): void {
		let cached_width: number = rect.get_width() * 0.303;
		let cached_height: number = rect.get_height() * 0.303;
		if (global.selected_wire_style === global.WIRE_STYLE_0) {
			canvas.draw_circle(rect.left + cached_width, rect.top + cached_height, global.CANVAS_STROKE_WIDTH_1, this.line_paint_alt);
			canvas.draw_circle(rect.right - cached_width, rect.bottom - cached_width, global.CANVAS_STROKE_WIDTH_1, this.line_paint_alt);
			canvas.draw_line(rect.left + cached_width, rect.top + cached_height, rect.right - cached_width, rect.bottom - cached_width, this.line_paint_alt);
		} else if (global.selected_wire_style === global.WIRE_STYLE_1) {
			canvas.draw_circle(rect.left + cached_width, rect.top + cached_height, global.CANVAS_STROKE_WIDTH_1, this.line_paint_alt);
			canvas.draw_circle(rect.right - cached_width, rect.bottom - cached_width, global.CANVAS_STROKE_WIDTH_1, this.line_paint_alt);
			canvas.draw_line(rect.left + cached_width, rect.top + cached_height, rect.right - cached_width, rect.top + cached_height, this.line_paint_alt);
			canvas.draw_line(rect.right - cached_width, rect.top + cached_height, rect.right - cached_width, rect.bottom - cached_width, this.line_paint_alt);
		} else if (global.selected_wire_style === global.WIRE_STYLE_2) {
			canvas.draw_circle(rect.right - cached_width, rect.top + cached_height, global.CANVAS_STROKE_WIDTH_1, this.line_paint_alt);
			canvas.draw_circle(rect.left + cached_width, rect.bottom - cached_width, global.CANVAS_STROKE_WIDTH_1, this.line_paint_alt);
			canvas.draw_line(rect.right - cached_width, rect.top + cached_height, rect.right - cached_width, rect.bottom - cached_width, this.line_paint_alt);
			canvas.draw_line(rect.left + cached_width, rect.bottom - cached_width, rect.right - cached_width, rect.bottom - cached_width, this.line_paint_alt);
		} else if (global.selected_wire_style === global.WIRE_STYLE_3) {
			canvas.draw_circle(rect.right - cached_width, rect.bottom - cached_width, global.CANVAS_STROKE_WIDTH_1, this.line_paint_alt);
			canvas.draw_circle(rect.left + cached_width, rect.top + cached_height, global.CANVAS_STROKE_WIDTH_1, this.line_paint_alt);
			canvas.draw_line(rect.left + cached_width, rect.top + cached_height, rect.left + cached_width, rect.bottom - cached_width, this.line_paint_alt);
			canvas.draw_line(rect.left + cached_width, rect.bottom - cached_width, rect.right - cached_width, rect.bottom - cached_width, this.line_paint_alt);
		} else if (global.selected_wire_style === global.WIRE_STYLE_4) {
			canvas.draw_circle(rect.left + cached_width, rect.bottom - cached_width, global.CANVAS_STROKE_WIDTH_1, this.line_paint_alt);
			canvas.draw_circle(rect.right - cached_width, rect.top + cached_height, global.CANVAS_STROKE_WIDTH_1, this.line_paint_alt);
			canvas.draw_line(rect.left + cached_width, rect.top + cached_height, rect.right - cached_width, rect.top + cached_height, this.line_paint_alt);
			canvas.draw_line(rect.left + cached_width, rect.top + cached_height, rect.left + cached_width, rect.bottom - cached_width, this.line_paint_alt);
		}
	}
}
