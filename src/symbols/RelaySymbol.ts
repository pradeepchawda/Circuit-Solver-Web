'use strict';
class RelaySymbol {
	public index: number;
	public page: number;
	public bounds: RectF;
	public p1: PointF;
	public p2: PointF;
	public p3: PointF;
	public p4: PointF;
	public relay_0: PointF;
	public relay_1: PointF;
	public relay_2: PointF;
	public relay_3: PointF;
	public relay_4: PointF;
	public relay_5: PointF;
	public relay_6: PointF;
	public relay_7: PointF;
	public relay_8: PointF;
	public relay_9: PointF;
	public relay_10: PointF;
	public relay_11: PointF;
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
		if (global.not_null(rect)) {
			this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
		}
		this.p1 = new PointF(this.bounds.left, this.bounds.top);
		this.p2 = new PointF(this.bounds.left, this.bounds.bottom);
		this.p3 = new PointF(this.bounds.right, this.bounds.top);
		this.p4 = new PointF(this.bounds.right, this.bounds.bottom);
		this.relay_0 = new PointF(0, 0);
		this.relay_1 = new PointF(0, 0);
		this.relay_2 = new PointF(0, 0);
		this.relay_3 = new PointF(0, 0);
		this.relay_4 = new PointF(0, 0);
		this.relay_5 = new PointF(0, 0);
		this.relay_6 = new PointF(0, 0);
		this.relay_7 = new PointF(0, 0);
		this.relay_8 = new PointF(0, 0);
		this.relay_9 = new PointF(0, 0);
		this.relay_10 = new PointF(0, 0);
		this.relay_11 = new PointF(0, 0);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
		this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
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
		this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(PAINT.align.CENTER);
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
		this.TAG = language_manager.TAG_REL;
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
					global.mouse_x,
					global.mouse_y,
					workspace.bounds.get_width() - 4.5 * global.variables.node_space_x,
					workspace.bounds.get_height() - 4.5 * global.variables.node_space_y
				) &&
				!this.bounds.contains_xy(global.mouse_x, global.mouse_y)
			) {
				shortcut_manager.temp_history_snapshot = engine_functions.history_snapshot();
				global.signal_history_lock = true;
				engine_functions.add_relay();
				this.flag_add_element = false;
			}
		}
	}
	mouse_down(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
				if (!this.flag_add_element) {
					this.flag_add_element = true;
					global.signal_add_element = true;
					global.component_touched = true;
				}
			}
		}
	}
	mouse_move(page: number, width: number, height: number) {
		if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height) && !global.CONSTANTS.MOBILE_MODE) {
			this.draw_tag = true;
		} else {
			this.draw_tag = false;
		}
		if (this.page === page) {
		}
	}
	mouse_up(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
			}
			this.flag_add_element = false;
			global.signal_add_element = false;
		}
	}
	build_element() {
		this.relay_0.x = this.p1.x + this.x_space * global.cosine(this.theta_m90);
		this.relay_0.y = this.p1.y + this.y_space * global.sine(this.theta_m90);
		this.relay_1.x = this.p2.x + this.x_space * global.cosine(this.theta_m90);
		this.relay_1.y = this.p2.y + this.y_space * global.sine(this.theta_m90);
		this.relay_2.x = this.p1.x + 3.0 * this.x_space * global.cosine(this.theta_m90);
		this.relay_2.y = this.p1.y + 3.0 * this.y_space * global.sine(this.theta_m90);
		this.relay_3.x = this.p2.x + 3.0 * this.x_space * global.cosine(this.theta_m90);
		this.relay_3.y = this.p2.y + 3.0 * this.y_space * global.sine(this.theta_m90);
		this.relay_4.x = this.relay_0.x + this.x_space * global.cosine(this.theta);
		this.relay_4.y = this.relay_0.y + this.y_space * global.sine(this.theta);
		this.relay_5.x = this.relay_0.x + 2.0 * this.x_space * global.cosine(this.theta);
		this.relay_5.y = this.relay_0.y + 2.0 * this.y_space * global.sine(this.theta);
		this.relay_6.x = this.relay_0.x + 3.0 * this.x_space * global.cosine(this.theta);
		this.relay_6.y = this.relay_0.y + 3.0 * this.y_space * global.sine(this.theta);
		this.relay_7.x = this.relay_2.x + this.x_space * global.cosine(this.theta);
		this.relay_7.y = this.relay_2.y + this.y_space * global.sine(this.theta);
		this.relay_8.x = this.relay_2.x + 2.0 * this.x_space * global.cosine(this.theta) + this.x_space * global.cosine(this.theta_m90);
		this.relay_8.y = this.relay_2.y + 2.0 * this.y_space * global.sine(this.theta) + this.y_space * global.sine(this.theta_m90);
		this.relay_9.x = this.relay_2.x + 3.0 * this.x_space * global.cosine(this.theta);
		this.relay_9.y = this.relay_2.y + 3.0 * this.y_space * global.sine(this.theta);
		this.relay_10.x = this.relay_4.x - 0.75 * this.x_space * global.cosine(this.theta_m90);
		this.relay_10.y = this.relay_4.y - 0.5 * this.y_space * global.sine(this.theta_m90);
		this.relay_11.y = this.relay_7.y + 0.75 * this.y_space * global.sine(this.theta_m90);
		this.relay_11.x = this.relay_7.x + 0.75 * this.x_space * global.cosine(this.theta_m90);
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
		this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
		this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
		this.build_element();
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.point_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.point_paint.set_text_size(global.variables.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.text_paint.set_text_size(global.variables.canvas_text_size_4);
	}
	recolor() {
		if (this.flag_add_element) {
			this.line_paint.set_color(global.SELECTED_COLOR);
			this.point_paint.set_color(global.SELECTED_COLOR);
			this.text_paint.set_color(global.SELECTED_COLOR);
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
			this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.relay_0.x, this.relay_0.y);
			this.line_buffer[indexer++] = Array(this.p2.x, this.p2.y, this.relay_1.x, this.relay_1.y);
			this.line_buffer[indexer++] = Array(this.p3.x, this.p3.y, this.relay_2.x, this.relay_2.y);
			this.line_buffer[indexer++] = Array(this.p4.x, this.p4.y, this.relay_3.x, this.relay_3.y);
			this.line_buffer[indexer++] = Array(this.relay_2.x, this.relay_2.y, this.relay_7.x, this.relay_7.y);
			this.line_buffer[indexer++] = Array(this.relay_7.x, this.relay_7.y, this.relay_8.x, this.relay_8.y);
			this.line_buffer[indexer++] = Array(this.relay_9.x, this.relay_9.y, this.relay_3.x, this.relay_3.y);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			indexer = 0;
			canvas.draw_arc2(this.relay_0.x, this.relay_0.y, this.relay_4.x, this.relay_4.y, this.bounds.get_width() * 0.1667, this.line_paint);
			canvas.draw_arc2(this.relay_4.x, this.relay_4.y, this.relay_5.x, this.relay_5.y, this.bounds.get_width() * 0.1667, this.line_paint);
			canvas.draw_arc2(this.relay_5.x, this.relay_5.y, this.relay_6.x, this.relay_6.y, this.bounds.get_width() * 0.1667, this.line_paint);
			canvas.draw_arc2(this.relay_6.x, this.relay_6.y, this.relay_1.x, this.relay_1.y, this.bounds.get_width() * 0.1667, this.line_paint);
			this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.variables.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.variables.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p3.x, this.p3.y, 1.5 * global.variables.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p4.x, this.p4.y, 1.5 * global.variables.canvas_stroke_width_2);
			canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
			if (this.draw_tag && !global.signal_add_element) {
				this.text_bounds.left = this.bounds.get_center_x() - 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
				this.text_bounds.top = this.bounds.bottom + this.bounds.get_height() - this.height_ratio * this.bounds.get_height();
				this.text_bounds.right = this.bounds.get_center_x() + 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
				this.text_bounds.bottom = this.bounds.bottom + this.bounds.get_height() + this.height_ratio * this.bounds.get_height();
			}
		}
	}
}
