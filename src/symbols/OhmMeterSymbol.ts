'use strict';
class OhmMeterSymbol {
	public index: number;
	public page: number;
	public bounds: RectF;
	public p1: PointF;
	public p2: PointF;
	public theta_m90: number;
	public theta: number;
	public c_x: number;
	public c_y: number;
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
	public meter_symbol: MeterSymbols;
	public flag_add_element: boolean;
	public tag: string;
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
		this.p1 = new PointF(this.bounds.left, this.bounds.get_center_y());
		this.p2 = new PointF(this.bounds.right, this.bounds.get_center_y());
		this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
		this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
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
		this.meter_symbol = new MeterSymbols();
		this.meter_symbol.reset(this.meter_symbol.METER_RESISTANCE, this.meter_symbol.STYLE_0);
		this.meter_symbol.set_bounds(
			this.bounds.left + this.bounds.get_width() * 0.4,
			this.bounds.top + this.bounds.get_height() * 0.4,
			this.bounds.right - this.bounds.get_width() * 0.4,
			this.bounds.bottom - this.bounds.get_height() * 0.4
		);
		this.meter_symbol.set_color(global.GENERAL_WHITE_COLOR);
		this.build_element();
		this.flag_add_element = false;
		this.tag = language_manager.TAG_OHMMETER;
		this.draw_tag = false;
		this.text_bounds = new RectF(0, 0, 0, 0);
		this.height_ratio = 0.35;
		this.line_buffer = [];
		this.circle_buffer = [];
	}
	update() {
		if (this.flag_add_element) {
			if (
				workspace.bounds.contains_xywh(global.mouse_x, global.mouse_y, workspace.bounds.get_width() - 4.5 * global.node_space_x, workspace.bounds.get_height() - 4.5 * global.node_space_y) &&
				!this.bounds.contains_xy(global.mouse_x, global.mouse_y)
			) {
				shortcut_manager.temp_history_snapshot = engine_functions.history_snapshot();
				global.signal_history_lock = true;
				engine_functions.add_ohmmeter();
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
		if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height) && !global.MOBILE_MODE) {
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
		this.connect1_x = this.c_x - this.x_space * global.cosine(this.theta);
		this.connect1_y = this.c_y - this.y_space * global.sine(this.theta);
		this.connect2_x = this.c_x + this.x_space * global.cosine(this.theta);
		this.connect2_y = this.c_y + this.y_space * global.sine(this.theta);
		this.meter_symbol.set_bounds(
			this.bounds.left + this.bounds.get_width() * 0.4,
			this.bounds.top + this.bounds.get_height() * 0.4,
			this.bounds.right - this.bounds.get_width() * 0.4,
			this.bounds.bottom - this.bounds.get_height() * 0.4
		);
		this.meter_symbol.resize_symbol(this.meter_symbol.STYLE_1);
	}
	resize(rect: RectF) {
		this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.x_space = this.bounds.get_width() >> 2;
		this.y_space = this.bounds.get_height() >> 2;
		this.p1.set_point(this.bounds.left, this.bounds.get_center_y());
		this.p2.set_point(this.bounds.right, this.bounds.get_center_y());
		this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
		this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.build_element();
		this.line_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.canvas_text_size_4);
		this.point_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.point_paint.set_text_size(global.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.text_paint.set_text_size(global.canvas_text_size_4);
	}
	recolor() {
		if (this.flag_add_element) {
			this.line_paint.set_color(global.SELECTED_COLOR);
			this.point_paint.set_color(global.SELECTED_COLOR);
			this.text_paint.set_color(global.SELECTED_COLOR);
			this.meter_symbol.set_color(global.SELECTED_COLOR);
		} else {
			this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
			this.point_paint.set_color(global.GENERAL_WHITE_COLOR);
			this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
			this.meter_symbol.set_color(global.GENERAL_WHITE_COLOR);
		}
	}
	draw_symbol(canvas: GraphicsEngine, page: number) {
		this.recolor();
		if (this.page === page) {
			canvas.draw_circle(this.c_x, this.c_y, this.bounds.get_width() >> 2, this.line_paint);
			let indexer: number = 0;
			this.circle_buffer = [];
			this.line_buffer = [];
			this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
			this.line_buffer[indexer++] = Array(this.p2.x, this.p2.y, this.connect2_x, this.connect2_y);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			indexer = 0;
			this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.canvas_stroke_width_2);
			this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.canvas_stroke_width_2);
			canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
			this.meter_symbol.draw_symbol(canvas);
			if (this.draw_tag && !global.signal_add_element) {
				this.text_bounds.left = this.bounds.get_center_x() - 1.25 * (this.text_paint.measure_text(this.tag) >> 1);
				this.text_bounds.top = this.bounds.bottom + this.bounds.get_height() - this.height_ratio * this.bounds.get_height();
				this.text_bounds.right = this.bounds.get_center_x() + 1.25 * (this.text_paint.measure_text(this.tag) >> 1);
				this.text_bounds.bottom = this.bounds.bottom + this.bounds.get_height() + this.height_ratio * this.bounds.get_height();
				canvas.draw_rect2(this.text_bounds, this.text_background_paint);
				canvas.draw_text(this.tag, this.bounds.get_center_x(), this.text_bounds.get_center_y(), this.text_paint);
			}
		}
	}
}
