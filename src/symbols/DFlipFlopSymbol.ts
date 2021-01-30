'use strict';
class DFlipFlopSymbol {
	public index: number;
	public page: number;
	public bounds: RectF;
	public p1: PointF;
	public p2: PointF;
	public p3: PointF;
	public p4: PointF;
	public dff_0: PointF;
	public dff_1: PointF;
	public dff_2: PointF;
	public dff_3: PointF;
	public dff_4: PointF;
	public dff_5: PointF;
	public dff_6: PointF;
	public dff_7: PointF;
	public dff_8: PointF;
	public dff_9: PointF;
	public dff_10: PointF;
	public dff_11: PointF;
	public dff_12: PointF;
	public c_x: number;
	public c_y: number;
	public theta_m90: number;
	public theta: number;
	public phi: number;
	public x_space: number;
	public y_space: number;
	public connect1_x: number;
	public connect1_y: number;
	public connect2_x: number;
	public connect2_y: number;
	public line_paint: Paint;
	public point_paint: Paint;
	public text_paint: Paint;
	public text_paint_alt: Paint;
	public text_background_paint: Paint;
	public flag_add_element: boolean;
	public TAG: string;
	public draw_tag: boolean;
	public text_bounds: RectF;
	public height_ratio: number;
	public line_buffer: Array<Array<number>>;
	public circle_buffer: Array<Array<number>>;
	constructor(rect: RectF, index: number, page: number) {
		this.index = index;
		this.page = page;
		this.bounds = new RectF(0, 0, 0, 0);
		if (global.utils.not_null(rect)) {
			this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
		}
		this.p1 = new PointF(this.bounds.left, this.bounds.top);
		this.p2 = new PointF(this.bounds.left, this.bounds.bottom);
		this.p3 = new PointF(this.bounds.right, this.bounds.top);
		this.p4 = new PointF(this.bounds.right, this.bounds.bottom);
		this.dff_0 = new PointF(0, 0);
		this.dff_1 = new PointF(0, 0);
		this.dff_2 = new PointF(0, 0);
		this.dff_3 = new PointF(0, 0);
		this.dff_4 = new PointF(0, 0);
		this.dff_5 = new PointF(0, 0);
		this.dff_6 = new PointF(0, 0);
		this.dff_7 = new PointF(0, 0);
		this.dff_8 = new PointF(0, 0);
		this.dff_9 = new PointF(0, 0);
		this.dff_10 = new PointF(0, 0);
		this.dff_11 = new PointF(0, 0);
		this.dff_12 = new PointF(0, 0);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.phi = global.utils.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
		this.x_space = this.bounds.get_width() >> 2;
		this.y_space = this.bounds.get_height() >> 2;
		this.connect1_x = 0;
		this.connect1_y = 0;
		this.connect2_x = 0;
		this.connect2_y = 0;
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(PAINT.style.STROKE);
		this.line_paint.set_paint_cap(PAINT.cap.ROUND);
		this.line_paint.set_paint_join(PAINT.join.MITER);
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(PAINT.align.CENTER);
		this.point_paint = new Paint();
		this.point_paint.set_paint_style(PAINT.style.FILL);
		this.point_paint.set_paint_cap(PAINT.cap.ROUND);
		this.point_paint.set_paint_join(PAINT.join.MITER);
		this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.point_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.point_paint.set_text_size(global.variables.canvas_text_size_4);
		this.point_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.point_paint.set_alpha(255);
		this.point_paint.set_paint_align(PAINT.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(PAINT.style.FILL);
		this.text_paint.set_paint_cap(PAINT.cap.ROUND);
		this.text_paint.set_paint_join(PAINT.join.MITER);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		if (global.CONSTANTS.MOBILE_MODE) {
			this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_3);
		}
		this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(PAINT.align.CENTER);
		this.text_paint_alt = new Paint();
		this.text_paint_alt.set_paint_style(PAINT.style.FILL);
		this.text_paint_alt.set_paint_cap(PAINT.cap.ROUND);
		this.text_paint_alt.set_paint_join(PAINT.join.MITER);
		this.text_paint_alt.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.text_paint_alt.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.text_paint_alt.set_text_size(global.variables.canvas_text_size_4);
		this.text_paint_alt.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.text_paint_alt.set_alpha(255);
		this.text_paint_alt.set_paint_align(PAINT.align.CENTER);
		this.text_background_paint = new Paint();
		this.text_background_paint.set_paint_style(PAINT.style.FILL);
		this.text_background_paint.set_paint_cap(PAINT.cap.ROUND);
		this.text_background_paint.set_paint_join(PAINT.join.MITER);
		this.text_background_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.text_background_paint.set_color(global.COLORS.GENERAL_HOVER_COLOR);
		this.text_background_paint.set_text_size(global.variables.canvas_text_size_4);
		this.text_background_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.text_background_paint.set_alpha(255);
		this.text_background_paint.set_paint_align(PAINT.align.CENTER);
		this.build_element();
		this.flag_add_element = false;
		this.TAG = language_manager.TAG_DFF;
		this.draw_tag = false;
		this.text_bounds = new RectF(0, 0, 0, 0);
		this.height_ratio = 0.35;
		this.line_buffer = [];
		this.circle_buffer = [];
	}
	update() {
		if (this.flag_add_element) {
			if (
				workspace.bounds.contains_xywh(
					global.variables.mouse_x,
					global.variables.mouse_y,
					workspace.bounds.get_width() - 4.5 * global.variables.node_space_x,
					workspace.bounds.get_height() - 4.5 * global.variables.node_space_y
				) &&
				!this.bounds.contains_xy(global.variables.mouse_x, global.variables.mouse_y)
			) {
				shortcut_manager.temp_history_snapshot = engine_functions.history_snapshot();
				global.flags.signal_history_lock = true;
				engine_functions.add_dff();
				this.flag_add_element = false;
			}
		}
	}
	mouse_down(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, width, height)) {
				if (!this.flag_add_element) {
					this.flag_add_element = true;
					global.flags.signal_add_element = true;
					global.variables.component_touched = true;
				}
			}
		}
	}
	mouse_move(page: number, width: number, height: number) {
		if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, width, height) && !global.CONSTANTS.MOBILE_MODE) {
			this.draw_tag = true;
		} else {
			this.draw_tag = false;
		}
		if (this.page === page) {
		}
	}
	mouse_up(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.variables.mouse_x, global.variables.mouse_y, width, height)) {
			}
			this.flag_add_element = false;
			global.flags.signal_add_element = false;
		}
	}
	build_element() {
		this.dff_0.x = this.p1.x + 0.5 * this.x_space * global.utils.cosine(this.theta_m90);
		this.dff_0.y = this.p1.y + 0.5 * this.y_space * global.utils.sine(this.theta_m90);
		this.dff_1.x = this.p2.x + 0.5 * this.x_space * global.utils.cosine(this.theta_m90);
		this.dff_1.y = this.p2.y + 0.5 * this.y_space * global.utils.sine(this.theta_m90);
		this.dff_2.x = this.p3.x - 0.5 * this.x_space * global.utils.cosine(this.theta_m90);
		this.dff_2.y = this.p3.y - 0.5 * this.y_space * global.utils.sine(this.theta_m90);
		this.dff_3.x = this.p4.x - 0.5 * this.x_space * global.utils.cosine(this.theta_m90);
		this.dff_3.y = this.p4.y - 0.5 * this.y_space * global.utils.sine(this.theta_m90);
		this.dff_4.x = this.dff_0.x - 0.5 * this.x_space * global.utils.cosine(this.theta);
		this.dff_4.y = this.dff_0.y - 0.5 * this.y_space * global.utils.sine(this.theta);
		this.dff_5.x = this.dff_2.x - 0.5 * this.x_space * global.utils.cosine(this.theta);
		this.dff_5.y = this.dff_2.y - 0.5 * this.y_space * global.utils.sine(this.theta);
		this.dff_6.x = this.dff_1.x + 0.5 * this.x_space * global.utils.cosine(this.theta);
		this.dff_6.y = this.dff_1.y + 0.5 * this.y_space * global.utils.sine(this.theta);
		this.dff_7.x = this.dff_3.x + 0.5 * this.x_space * global.utils.cosine(this.theta);
		this.dff_7.y = this.dff_3.y + 0.5 * this.y_space * global.utils.sine(this.theta);
		this.dff_8.x = this.dff_1.x + 0.5 * this.x_space * global.utils.cosine(this.theta_m90);
		this.dff_8.y = this.dff_1.y + 0.5 * this.y_space * global.utils.sine(this.theta_m90);
		this.dff_9.x = this.dff_1.x - 0.5 * this.x_space * global.utils.cosine(this.theta);
		this.dff_9.y = this.dff_1.y - 0.5 * this.y_space * global.utils.sine(this.theta);
		this.dff_10.x = this.dff_0.x + 0.75 * this.x_space * global.utils.cosine(this.theta_m90 + global.CONSTANTS.PI_DIV_4);
		this.dff_10.y = this.dff_0.y + 0.75 * this.y_space * global.utils.sine(this.theta_m90 + global.CONSTANTS.PI_DIV_4);
		this.dff_11.x = this.dff_2.x - 0.75 * this.x_space * global.utils.cosine(this.theta_m90 - global.CONSTANTS.PI_DIV_4);
		this.dff_11.y = this.dff_2.y - 0.75 * this.y_space * global.utils.sine(this.theta_m90 - global.CONSTANTS.PI_DIV_4);
		this.dff_12.x = this.dff_3.x - 0.75 * this.x_space * global.utils.cosine(this.theta_m90 + global.CONSTANTS.PI_DIV_4);
		this.dff_12.y = this.dff_3.y - 0.75 * this.y_space * global.utils.sine(this.theta_m90 + global.CONSTANTS.PI_DIV_4);
	}
	resize(rect: RectF) {
		this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.x_space = this.bounds.get_width() >> 2;
		this.y_space = this.bounds.get_height() >> 2;
		this.p1.set_point(this.bounds.left, this.bounds.top);
		this.p2.set_point(this.bounds.left, this.bounds.bottom);
		this.p3.set_point(this.bounds.right, this.bounds.top);
		this.p4.set_point(this.bounds.right, this.bounds.bottom);
		this.theta_m90 = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.CONSTANTS.PI_DIV_2;
		this.theta = global.utils.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.phi = global.utils.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
		this.build_element();
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.point_paint.set_text_size(global.variables.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		if (global.CONSTANTS.MOBILE_MODE) {
			this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_3);
		}
		this.text_paint_alt.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.text_paint_alt.set_text_size(global.variables.canvas_text_size_4);
	}
	recolor() {
		if (this.flag_add_element) {
			this.line_paint.set_color(global.COLORS.SELECTED_COLOR);
			this.point_paint.set_color(global.COLORS.SELECTED_COLOR);
			this.text_paint.set_color(global.COLORS.SELECTED_COLOR);
		} else {
			this.line_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.point_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
			this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		}
	}
	draw_symbol(canvas: GraphicsEngine, page: number) {
		this.recolor();
		if (this.page === page) {
			let indexer: number = 0;
			this.circle_buffer = [];
			this.line_buffer = [];
			this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.dff_0.x, this.dff_0.y);
			this.line_buffer[indexer++] = Array(this.p2.x, this.p2.y, this.dff_1.x, this.dff_1.y);
			this.line_buffer[indexer++] = Array(this.p3.x, this.p3.y, this.dff_2.x, this.dff_2.y);
			this.line_buffer[indexer++] = Array(this.p4.x, this.p4.y, this.dff_3.x, this.dff_3.y);
			this.line_buffer[indexer++] = Array(this.dff_4.x, this.dff_4.y, this.dff_5.x, this.dff_5.y);
			this.line_buffer[indexer++] = Array(this.dff_5.x, this.dff_5.y, this.dff_7.x, this.dff_7.y);
			this.line_buffer[indexer++] = Array(this.dff_7.x, this.dff_7.y, this.dff_6.x, this.dff_6.y);
			this.line_buffer[indexer++] = Array(this.dff_6.x, this.dff_6.y, this.dff_4.x, this.dff_4.y);
			this.line_buffer[indexer++] = Array(this.dff_6.x, this.dff_6.y, this.dff_8.x, this.dff_8.y);
			this.line_buffer[indexer++] = Array(this.dff_8.x, this.dff_8.y, this.dff_9.x, this.dff_9.y);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			indexer = 0;
			this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.variables.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.variables.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p3.x, this.p3.y, 1.5 * global.variables.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p4.x, this.p4.y, 1.5 * global.variables.canvas_stroke_width_2);
			canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
			canvas.draw_text('D', this.dff_10.x, this.dff_10.y, this.text_paint);
			canvas.draw_text('Q', this.dff_11.x, this.dff_11.y, this.text_paint);
			canvas.draw_text('/Q', this.dff_12.x, this.dff_12.y, this.text_paint);
			if (this.draw_tag && !global.flags.signal_add_element) {
				this.text_bounds.left = this.bounds.get_center_x() - 1.25 * (this.text_paint_alt.measure_text(this.TAG) >> 1);
				this.text_bounds.top = this.bounds.bottom + this.bounds.get_height() - this.height_ratio * this.bounds.get_height();
				this.text_bounds.right = this.bounds.get_center_x() + 1.25 * (this.text_paint_alt.measure_text(this.TAG) >> 1);
				this.text_bounds.bottom = this.bounds.bottom + this.bounds.get_height() + this.height_ratio * this.bounds.get_height();
			}
		}
	}
}
