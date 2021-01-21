'use strict';
class VoltageControlledVoltageSourceSymbol {
	public index: number;
	public page: number;
	public bounds: RectF;
	public p1: PointF;
	public p2: PointF;
	public p3: PointF;
	public p4: PointF;
	public vcvs_0: PointF;
	public vcvs_1: PointF;
	public vcvs_2: PointF;
	public vcvs_3: PointF;
	public vcvs_4: PointF;
	public vcvs_5: PointF;
	public vcvs_6: PointF;
	public vcvs_7: PointF;
	public vcvs_8: PointF;
	public vcvs_9: PointF;
	public vcvs_10: PointF;
	public vcvs_11: PointF;
	public vcvs_12: PointF;
	public vcvs_13: PointF;
	public vcvs_14: PointF;
	public vcvs_15: PointF;
	public vcvs_16: PointF;
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
	public FLAG_ADD_ELEMENT: boolean;
	public TAG: string;
	public DRAW_TAG: boolean;
	public text_bounds: RectF;
	public HEIGHT_RATIO: number;
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
		this.vcvs_0 = new PointF(0, 0);
		this.vcvs_1 = new PointF(0, 0);
		this.vcvs_2 = new PointF(0, 0);
		this.vcvs_3 = new PointF(0, 0);
		this.vcvs_4 = new PointF(0, 0);
		this.vcvs_5 = new PointF(0, 0);
		this.vcvs_6 = new PointF(0, 0);
		this.vcvs_7 = new PointF(0, 0);
		this.vcvs_8 = new PointF(0, 0);
		this.vcvs_9 = new PointF(0, 0);
		this.vcvs_10 = new PointF(0, 0);
		this.vcvs_11 = new PointF(0, 0);
		this.vcvs_12 = new PointF(0, 0);
		this.vcvs_13 = new PointF(0, 0);
		this.vcvs_14 = new PointF(0, 0);
		this.vcvs_15 = new PointF(0, 0);
		this.vcvs_16 = new PointF(0, 0);
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
		this.line_paint.set_paint_style(this.line_paint.style.STROKE);
		this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
		this.line_paint.set_paint_join(this.line_paint.join.MITER);
		this.line_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.line_paint.set_text_size(global.canvas_text_size_4);
		this.line_paint.set_font(global.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(this.line_paint.align.CENTER);
		this.point_paint = new Paint();
		this.point_paint.set_paint_style(this.point_paint.style.FILL);
		this.point_paint.set_paint_cap(this.point_paint.cap.ROUND);
		this.point_paint.set_paint_join(this.point_paint.join.MITER);
		this.point_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.point_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.point_paint.set_text_size(global.canvas_text_size_4);
		this.point_paint.set_font(global.DEFAULT_FONT);
		this.point_paint.set_alpha(255);
		this.point_paint.set_paint_align(this.point_paint.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(this.text_paint.style.FILL);
		this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
		this.text_paint.set_paint_join(this.text_paint.join.MITER);
		this.text_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.text_paint.set_text_size(global.canvas_text_size_4);
		this.text_paint.set_font(global.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(this.text_paint.align.CENTER);
		this.text_background_paint = new Paint();
		this.text_background_paint.set_paint_style(this.text_background_paint.style.FILL);
		this.text_background_paint.set_paint_cap(this.text_background_paint.cap.ROUND);
		this.text_background_paint.set_paint_join(this.text_background_paint.join.MITER);
		this.text_background_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.text_background_paint.set_color(global.GENERAL_HOVER_COLOR);
		this.text_background_paint.set_text_size(global.canvas_text_size_4);
		this.text_background_paint.set_font(global.DEFAULT_FONT);
		this.text_background_paint.set_alpha(255);
		this.text_background_paint.set_paint_align(this.text_background_paint.align.CENTER);
		this.build_element();
		this.FLAG_ADD_ELEMENT = false;
		this.TAG = language_manager.TAG_VCVS;
		this.DRAW_TAG = false;
		this.text_bounds = new RectF(0, 0, 0, 0);
		this.HEIGHT_RATIO = 0.35;
		this.line_buffer = [];
		this.circle_buffer = [];
	}
	update() {
		if (this.FLAG_ADD_ELEMENT) {
			if (
				workspace.bounds.contains_xywh(global.mouse_x, global.mouse_y, workspace.bounds.get_width() - 4.5 * global.node_space_x, workspace.bounds.get_height() - 4.5 * global.node_space_y) &&
				!this.bounds.contains_xy(global.mouse_x, global.mouse_y)
			) {
				shortcut_manager.TEMP_HISTORY_SNAPSHOT = engine_functions.history_snapshot();
				global.signal_history_lock = true;
				engine_functions.add_vcvs();
				this.FLAG_ADD_ELEMENT = false;
			}
		}
	}
	mouse_down(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
				if (!this.FLAG_ADD_ELEMENT) {
					this.FLAG_ADD_ELEMENT = true;
					global.signal_add_element = true;
					global.component_touched = true;
				}
			}
		}
	}
	mouse_move(page: number, width: number, height: number) {
		if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height) && !global.MOBILE_MODE) {
			this.DRAW_TAG = true;
		} else {
			this.DRAW_TAG = false;
		}
		if (this.page === page) {
		}
	}
	mouse_up(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
			}
			this.FLAG_ADD_ELEMENT = false;
			global.signal_add_element = false;
		}
	}
	build_element() {
		this.vcvs_0.x = this.p1.x + this.x_space * global.cosine(this.theta_m90);
		this.vcvs_0.y = this.p1.y + this.y_space * global.sine(this.theta_m90);
		this.vcvs_1.x = this.p2.x + this.x_space * global.cosine(this.theta_m90);
		this.vcvs_1.y = this.p2.y + this.y_space * global.sine(this.theta_m90);
		this.vcvs_2.x = this.p1.x + 3.0 * this.x_space * global.cosine(this.theta_m90);
		this.vcvs_2.y = this.p1.y + 3.0 * this.y_space * global.sine(this.theta_m90);
		this.vcvs_3.x = this.p2.x + 3.0 * this.x_space * global.cosine(this.theta_m90);
		this.vcvs_3.y = this.p2.y + 3.0 * this.y_space * global.sine(this.theta_m90);
		this.vcvs_4.x = this.vcvs_2.x + this.x_space * global.cosine(this.theta);
		this.vcvs_4.y = this.vcvs_2.y + this.y_space * global.sine(this.theta);
		this.vcvs_5.x = this.vcvs_4.x + 1.414 * this.x_space * global.cosine(this.theta - global.PI_DIV_4);
		this.vcvs_5.y = this.vcvs_4.y + 1.414 * this.y_space * global.sine(this.theta - global.PI_DIV_4);
		this.vcvs_6.x = this.vcvs_4.x + 1.414 * this.x_space * global.cosine(this.theta + global.PI_DIV_4);
		this.vcvs_6.y = this.vcvs_4.y + 1.414 * this.y_space * global.sine(this.theta + global.PI_DIV_4);
		this.vcvs_7.x = this.vcvs_2.x + 3.0 * this.x_space * global.cosine(this.theta);
		this.vcvs_7.y = this.vcvs_2.y + 3.0 * this.y_space * global.sine(this.theta);
		this.vcvs_8.x = this.vcvs_7.x - 1.414 * this.x_space * global.cosine(this.theta - global.PI_DIV_4);
		this.vcvs_8.y = this.vcvs_7.y - 1.414 * this.y_space * global.sine(this.theta - global.PI_DIV_4);
		this.vcvs_9.x = this.vcvs_7.x - 1.414 * this.x_space * global.cosine(this.theta + global.PI_DIV_4);
		this.vcvs_9.y = this.vcvs_7.y - 1.414 * this.y_space * global.sine(this.theta + global.PI_DIV_4);
		this.vcvs_10.x = this.vcvs_2.x + 1.5 * this.x_space * global.cosine(this.theta);
		this.vcvs_10.y = this.vcvs_2.y + 1.5 * this.y_space * global.sine(this.theta);
		this.vcvs_11.x = this.vcvs_2.x + 2.0 * this.x_space * global.cosine(this.theta);
		this.vcvs_11.y = this.vcvs_2.y + 2.0 * this.y_space * global.sine(this.theta);
		this.vcvs_12.x = this.vcvs_2.x + 1.75 * this.x_space * global.cosine(this.theta) + (this.x_space >> 2) * global.cosine(this.theta_m90);
		this.vcvs_12.y = this.vcvs_2.y + 1.75 * this.y_space * global.sine(this.theta) + (this.y_space >> 2) * global.sine(this.theta_m90);
		this.vcvs_13.x = this.vcvs_2.x + 1.75 * this.x_space * global.cosine(this.theta) - (this.x_space >> 2) * global.cosine(this.theta_m90);
		this.vcvs_13.y = this.vcvs_2.y + 1.75 * this.y_space * global.sine(this.theta) - (this.y_space >> 2) * global.sine(this.theta_m90);
		this.vcvs_14.x = this.vcvs_2.x + 2.25 * this.x_space * global.cosine(this.theta) + (this.x_space >> 2) * global.cosine(this.theta_m90);
		this.vcvs_14.y = this.vcvs_2.y + 2.25 * this.y_space * global.sine(this.theta) + (this.y_space >> 2) * global.sine(this.theta_m90);
		this.vcvs_15.x = this.vcvs_2.x + 2.25 * this.x_space * global.cosine(this.theta) - (this.x_space >> 2) * global.cosine(this.theta_m90);
		this.vcvs_15.y = this.vcvs_2.y + 2.25 * this.y_space * global.sine(this.theta) - (this.y_space >> 2) * global.sine(this.theta_m90);
		this.vcvs_16.x = this.p1.x + 0.75 * this.x_space * global.cosine(this.theta_m90 + global.PI_DIV_4);
		this.vcvs_16.y = this.p1.y + 0.75 * this.y_space * global.sine(this.theta_m90 + global.PI_DIV_4);
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
		this.line_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.canvas_text_size_4);
		this.point_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.point_paint.set_text_size(global.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.text_paint.set_text_size(global.canvas_text_size_4);
	}
	recolor() {
		if (this.FLAG_ADD_ELEMENT) {
			this.line_paint.set_color(global.SELECTED_COLOR);
			this.point_paint.set_color(global.SELECTED_COLOR);
			this.text_paint.set_color(global.SELECTED_COLOR);
		} else {
			this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
			this.point_paint.set_color(global.GENERAL_WHITE_COLOR);
			this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
		}
	}
	draw_symbol(canvas: GraphicsEngine, page: number) {
		this.recolor();
		if (this.page === page) {
			let indexer: number = 0;
			this.circle_buffer = [];
			this.line_buffer = [];
			this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.vcvs_0.x, this.vcvs_0.y);
			this.line_buffer[indexer++] = Array(this.p2.x, this.p2.y, this.vcvs_1.x, this.vcvs_1.y);
			this.line_buffer[indexer++] = Array(this.p3.x, this.p3.y, this.vcvs_2.x, this.vcvs_2.y);
			this.line_buffer[indexer++] = Array(this.p4.x, this.p4.y, this.vcvs_3.x, this.vcvs_3.y);
			this.line_buffer[indexer++] = Array(this.vcvs_2.x, this.vcvs_2.y, this.vcvs_4.x, this.vcvs_4.y);
			this.line_buffer[indexer++] = Array(this.vcvs_4.x, this.vcvs_4.y, this.vcvs_5.x, this.vcvs_5.y);
			this.line_buffer[indexer++] = Array(this.vcvs_4.x, this.vcvs_4.y, this.vcvs_6.x, this.vcvs_6.y);
			this.line_buffer[indexer++] = Array(this.vcvs_3.x, this.vcvs_3.y, this.vcvs_7.x, this.vcvs_7.y);
			this.line_buffer[indexer++] = Array(this.vcvs_7.x, this.vcvs_7.y, this.vcvs_8.x, this.vcvs_8.y);
			this.line_buffer[indexer++] = Array(this.vcvs_7.x, this.vcvs_7.y, this.vcvs_9.x, this.vcvs_9.y);
			this.line_buffer[indexer++] = Array(this.vcvs_10.x, this.vcvs_10.y, this.vcvs_11.x, this.vcvs_11.y);
			this.line_buffer[indexer++] = Array(this.vcvs_12.x, this.vcvs_12.y, this.vcvs_13.x, this.vcvs_13.y);
			this.line_buffer[indexer++] = Array(this.vcvs_14.x, this.vcvs_14.y, this.vcvs_15.x, this.vcvs_15.y);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			indexer = 0;
			this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p3.x, this.p3.y, 1.5 * global.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p4.x, this.p4.y, 1.5 * global.canvas_stroke_width_2);
			canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
			if (this.DRAW_TAG && !global.signal_add_element) {
				this.text_bounds.left = this.bounds.get_center_x() - 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
				this.text_bounds.top = this.bounds.bottom + this.bounds.get_height() - this.HEIGHT_RATIO * this.bounds.get_height();
				this.text_bounds.right = this.bounds.get_center_x() + 1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
				this.text_bounds.bottom = this.bounds.bottom + this.bounds.get_height() + this.HEIGHT_RATIO * this.bounds.get_height();
				canvas.draw_rect2(this.text_bounds, this.text_background_paint);
				canvas.draw_text(this.TAG, this.bounds.get_center_x(), this.text_bounds.get_center_y(), this.text_paint);
			}
		}
	}
}
