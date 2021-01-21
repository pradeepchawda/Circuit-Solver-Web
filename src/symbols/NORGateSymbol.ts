'use strict';
class NORGateSymbol {
	public index: number;
	public page: number;
	public bounds: RectF;
	public p1: PointF;
	public p2: PointF;
	public p3: PointF;
	public nor_0: PointF;
	public nor_1: PointF;
	public nor_2: PointF;
	public nor_3: PointF;
	public nor_4: PointF;
	public nor_5: PointF;
	public nor_6: PointF;
	public nor_7: PointF;
	public nor_8: PointF;
	public nor_9: PointF;
	public nor_10: PointF;
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
		this.p3 = new PointF(this.bounds.right, this.bounds.get_center_y());
		this.nor_0 = new PointF(0, 0);
		this.nor_1 = new PointF(0, 0);
		this.nor_2 = new PointF(0, 0);
		this.nor_3 = new PointF(0, 0);
		this.nor_4 = new PointF(0, 0);
		this.nor_5 = new PointF(0, 0);
		this.nor_6 = new PointF(0, 0);
		this.nor_7 = new PointF(0, 0);
		this.nor_8 = new PointF(0, 0);
		this.nor_9 = new PointF(0, 0);
		this.nor_10 = new PointF(0, 0);
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
		this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
		this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.line_paint.set_font(global.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(this.line_paint.align.CENTER);
		this.point_paint = new Paint();
		this.point_paint.set_paint_style(this.point_paint.style.FILL);
		this.point_paint.set_paint_cap(this.point_paint.cap.ROUND);
		this.point_paint.set_paint_join(this.point_paint.join.MITER);
		this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
		this.point_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.point_paint.set_font(global.DEFAULT_FONT);
		this.point_paint.set_alpha(255);
		this.point_paint.set_paint_align(this.point_paint.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(this.text_paint.style.FILL);
		this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
		this.text_paint.set_paint_join(this.text_paint.join.MITER);
		this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
		this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.text_paint.set_font(global.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(this.text_paint.align.CENTER);
		this.text_background_paint = new Paint();
		this.text_background_paint.set_paint_style(this.text_background_paint.style.FILL);
		this.text_background_paint.set_paint_cap(this.text_background_paint.cap.ROUND);
		this.text_background_paint.set_paint_join(this.text_background_paint.join.MITER);
		this.text_background_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
		this.text_background_paint.set_color(global.GENERAL_HOVER_COLOR);
		this.text_background_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.text_background_paint.set_font(global.DEFAULT_FONT);
		this.text_background_paint.set_alpha(255);
		this.text_background_paint.set_paint_align(this.text_background_paint.align.CENTER);
		this.build_element();
		this.FLAG_ADD_ELEMENT = false;
		this.TAG = language_manager.TAG_NOR;
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
				global.SIGNAL_HISTORY_LOCK = true;
				engine_functions.add_nor();
				this.FLAG_ADD_ELEMENT = false;
			}
		}
	}
	mouse_down(page: number, width: number, height: number) {
		if (this.page === page) {
			if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
				if (!this.FLAG_ADD_ELEMENT) {
					this.FLAG_ADD_ELEMENT = true;
					global.SIGNAL_ADD_ELEMENT = true;
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
			global.SIGNAL_ADD_ELEMENT = false;
		}
	}
	build_element() {
		this.nor_0.x = this.p1.x + 1.5 * this.x_space * global.cosine(this.theta);
		this.nor_0.y = this.p1.y + 1.5 * this.y_space * global.sine(this.theta);
		this.nor_1.x = this.nor_0.x + 0.75 * this.x_space * global.cosine(this.theta_m90);
		this.nor_1.y = this.nor_0.y + 0.75 * this.y_space * global.sine(this.theta_m90);
		this.nor_2.x = this.nor_1.x + 0.75 * this.x_space * global.cosine(this.theta - Math.PI);
		this.nor_2.y = this.nor_1.y + 0.75 * this.y_space * global.sine(this.theta - Math.PI);
		this.nor_7.x = this.nor_0.x + 1.05 * this.x_space * global.cosine(this.theta_m90);
		this.nor_7.y = this.nor_0.y + 1.05 * this.y_space * global.sine(this.theta_m90);
		this.nor_3.x = this.p1.x + 2.5 * this.x_space * global.cosine(this.theta);
		this.nor_3.y = this.p1.y + 2.5 * this.y_space * global.sine(this.theta);
		this.nor_4.x = this.nor_3.x + 0.75 * this.x_space * global.cosine(this.theta_m90);
		this.nor_4.y = this.nor_3.y + 0.75 * this.y_space * global.sine(this.theta_m90);
		this.nor_5.x = this.nor_4.x + 0.75 * this.x_space * global.cosine(this.theta);
		this.nor_5.y = this.nor_4.y + 0.75 * this.y_space * global.sine(this.theta);
		this.nor_8.x = this.nor_3.x + 1.05 * this.x_space * global.cosine(this.theta_m90);
		this.nor_8.y = this.nor_3.y + 1.05 * this.y_space * global.sine(this.theta_m90);
		this.nor_6.x = this.p3.x - 0.9 * this.x_space * global.cosine(this.theta_m90);
		this.nor_6.y = this.p3.y - 0.9 * this.y_space * global.sine(this.theta_m90);
		this.nor_9.x = this.p3.x - 0.6 * this.x_space * global.cosine(this.theta_m90);
		this.nor_9.y = this.p3.y - 0.6 * this.y_space * global.sine(this.theta_m90);
		this.nor_10.x = this.p3.x - 0.3 * this.x_space * global.cosine(this.theta_m90);
		this.nor_10.y = this.p3.y - 0.3 * this.y_space * global.sine(this.theta_m90);
	}
	resize(rect: RectF) {
		this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.x_space = this.bounds.get_width() >> 2;
		this.y_space = this.bounds.get_height() >> 2;
		this.p1.set_point(this.bounds.left, this.bounds.top);
		this.p2.set_point(this.bounds.left, this.bounds.bottom);
		this.p3.set_point(this.bounds.right, this.bounds.get_center_y());
		this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
		this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
		this.build_element();
		this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
		this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
		this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
		this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
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
			this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.nor_0.x, this.nor_0.y);
			this.line_buffer[indexer++] = Array(this.nor_0.x, this.nor_0.y, this.nor_7.x, this.nor_7.y);
			this.line_buffer[indexer++] = Array(this.p2.x, this.p2.y, this.nor_3.x, this.nor_3.y);
			this.line_buffer[indexer++] = Array(this.nor_3.x, this.nor_3.y, this.nor_8.x, this.nor_8.y);
			this.line_buffer[indexer++] = Array(this.nor_10.x, this.nor_10.y, this.p3.x, this.p3.y);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			indexer = 0;
			canvas.draw_arc2(this.nor_2.x, this.nor_2.y, this.nor_5.x, this.nor_5.y, this.x_space, this.line_paint);
			canvas.draw_arc2(this.nor_2.x, this.nor_2.y, this.nor_6.x, this.nor_6.y, this.x_space, this.line_paint);
			canvas.draw_arc2(this.nor_5.x, this.nor_5.y, this.nor_6.x, this.nor_6.y, -this.x_space, this.line_paint);
			canvas.draw_circle(this.nor_9.x, this.nor_9.y, this.bounds.get_width() * 0.0625, this.line_paint);
			this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.CANVAS_STROKE_WIDTH_2);
			this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.CANVAS_STROKE_WIDTH_2);
			this.circle_buffer[indexer++] = Array(this.p3.x, this.p3.y, 1.5 * global.CANVAS_STROKE_WIDTH_2);
			canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
			if (this.DRAW_TAG && !global.SIGNAL_ADD_ELEMENT) {
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
