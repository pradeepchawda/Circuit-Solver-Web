'use strict';
class MeterSymbols {
	public bounds: RectF;
	public METER_VOLTAGE: number;
	public METER_CURRENT: number;
	public METER_RESISTANCE: number;
	public METER_POWER: number;
	public STYLE_0: number;
	public STYLE_1: number;
	public meter_type: number;
	public meter_paint: Paint;
	public points: Array<PointF>;
	public line_buffer: Array<Array<number>>;
	public circle_buffer: Array<Array<number>>;
	constructor() {
		this.bounds = new RectF(0, 0, 0, 0);
		this.METER_VOLTAGE = 0;
		this.METER_CURRENT = 1;
		this.METER_RESISTANCE = 2;
		this.METER_POWER = 3;
		this.STYLE_0 = 0;
		this.STYLE_1 = 1;
		this.meter_type = this.METER_VOLTAGE;
		this.meter_paint = new Paint();
		this.meter_paint.set_paint_style(paint.style.STROKE);
		this.meter_paint.set_paint_cap(paint.cap.ROUND);
		this.meter_paint.set_paint_join(paint.join.MITER);
		this.meter_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.meter_paint.set_color(global.COLORS.ELEMENT_COLOR);
		this.meter_paint.set_text_size(global.variables.canvas_text_size_1);
		this.meter_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.meter_paint.set_alpha(255);
		this.meter_paint.set_paint_align(paint.align.CENTER);
		this.points = [];
		this.line_buffer = [];
		this.circle_buffer = [];
	}
	set_bounds(left: number, top: number, right: number, bottom: number): void {
		this.bounds.left = left;
		this.bounds.top = top;
		this.bounds.right = right;
		this.bounds.bottom = bottom;
		this.edit(this.meter_type);
	}
	set_stroke_width(setter: number): void {
		this.meter_paint.set_stroke_width(setter);
	}
	reset(setter: number, style: number): void {
		this.meter_type = setter;
		if (style === this.STYLE_0) {
			this.meter_paint.set_color(global.COLORS.ELEMENT_COLOR);
			this.meter_paint.set_paint_style(paint.style.STROKE);
			this.meter_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
			this.meter_paint.set_paint_cap(paint.cap.ROUND);
		} else if (style === this.STYLE_1) {
			this.meter_paint.set_color(global.COLORS.GENERAL_GRAY_COLOR);
			this.meter_paint.set_paint_style(paint.style.STROKE);
			this.meter_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
			this.meter_paint.set_paint_cap(paint.cap.ROUND);
		}
		this.points.splice(0, this.points.length);
		this.populate();
	}
	set_color(color: string): void {
		this.meter_paint.set_color(color);
	}
	populate(): void {
		let temp_width: number = this.bounds.get_width() >> 2;
		let temp_height: number = this.bounds.get_height() >> 2;
		if (this.meter_type === this.METER_CURRENT) {
			this.points.push(new PointF(this.bounds.get_center_x(), this.bounds.top));
			this.points.push(new PointF(this.bounds.get_center_x() - temp_width, this.bounds.get_center_y()));
			this.points.push(new PointF(this.bounds.left, this.bounds.bottom));
			this.points.push(new PointF(this.bounds.get_center_x() + temp_width, this.bounds.get_center_y()));
			this.points.push(new PointF(this.bounds.right, this.bounds.bottom));
		} else if (this.meter_type === this.METER_VOLTAGE) {
			this.points.push(new PointF(this.bounds.left, this.bounds.top));
			this.points.push(new PointF(this.bounds.get_center_x(), this.bounds.bottom));
			this.points.push(new PointF(this.bounds.right, this.bounds.top));
		} else if (this.meter_type === this.METER_RESISTANCE) {
			this.points.push(new PointF(this.bounds.left, this.bounds.bottom));
			this.points.push(new PointF(this.bounds.left + temp_width, this.bounds.bottom));
			this.points.push(new PointF(this.bounds.left + temp_width, this.bounds.bottom - temp_height));
			this.points.push(new PointF(this.bounds.left, this.bounds.bottom - temp_height * 1.6));
			this.points.push(new PointF(this.bounds.left, this.bounds.top + temp_height));
			this.points.push(new PointF(this.bounds.left + temp_width, this.bounds.top));
			this.points.push(new PointF(this.bounds.right - temp_width, this.bounds.top));
			this.points.push(new PointF(this.bounds.right, this.bounds.top + temp_height));
			this.points.push(new PointF(this.bounds.right, this.bounds.bottom - temp_height * 1.6));
			this.points.push(new PointF(this.bounds.right - temp_width, this.bounds.bottom - temp_height));
			this.points.push(new PointF(this.bounds.right - temp_width, this.bounds.bottom));
			this.points.push(new PointF(this.bounds.right, this.bounds.bottom));
		} else if (this.meter_type === this.METER_POWER) {
			this.points.push(new PointF(this.bounds.left, this.bounds.top));
			this.points.push(new PointF(this.bounds.left + this.bounds.get_width() * 0.25, this.bounds.bottom));
			this.points.push(new PointF(this.bounds.get_center_x(), this.bounds.get_center_y()));
			this.points.push(new PointF(this.bounds.left + this.bounds.get_width() * 0.75, this.bounds.bottom));
			this.points.push(new PointF(this.bounds.right, this.bounds.top));
		}
	}
	edit(type: number): void {
		let temp_width: number = this.bounds.get_width() >> 2;
		let temp_height: number = this.bounds.get_height() >> 2;
		if (type === this.METER_CURRENT) {
			this.points[0].x = this.bounds.get_center_x();
			this.points[0].y = this.bounds.top;
			this.points[1].x = this.bounds.get_center_x() - temp_width;
			this.points[1].y = this.bounds.get_center_y();
			this.points[2].x = this.bounds.left;
			this.points[2].y = this.bounds.bottom;
			this.points[3].x = this.bounds.get_center_x() + temp_width;
			this.points[3].y = this.bounds.get_center_y();
			this.points[4].x = this.bounds.right;
			this.points[4].y = this.bounds.bottom;
		} else if (type === this.METER_VOLTAGE) {
			this.points[0].x = this.bounds.left;
			this.points[0].y = this.bounds.top;
			this.points[1].x = this.bounds.get_center_x();
			this.points[1].y = this.bounds.bottom;
			this.points[2].x = this.bounds.right;
			this.points[2].y = this.bounds.top;
		} else if (type === this.METER_RESISTANCE) {
			this.points[0].x = this.bounds.left;
			this.points[0].y = this.bounds.bottom;
			this.points[1].x = this.bounds.left + temp_width;
			this.points[1].y = this.bounds.bottom;
			this.points[2].x = this.bounds.left + temp_width;
			this.points[2].y = this.bounds.bottom - temp_height;
			this.points[3].x = this.bounds.left;
			this.points[3].y = this.bounds.bottom - temp_height * 1.6;
			this.points[4].x = this.bounds.left;
			this.points[4].y = this.bounds.top + temp_height;
			this.points[5].x = this.bounds.left + temp_width;
			this.points[5].y = this.bounds.top;
			this.points[6].x = this.bounds.right - temp_width;
			this.points[6].y = this.bounds.top;
			this.points[7].x = this.bounds.right;
			this.points[7].y = this.bounds.top + temp_height;
			this.points[8].x = this.bounds.right;
			this.points[8].y = this.bounds.bottom - temp_height * 1.6;
			this.points[9].x = this.bounds.right - temp_width;
			this.points[9].y = this.bounds.bottom - temp_height;
			this.points[10].x = this.bounds.right - temp_width;
			this.points[10].y = this.bounds.bottom;
			this.points[11].x = this.bounds.right;
			this.points[11].y = this.bounds.bottom;
		} else if (type === this.METER_POWER) {
			this.points[0].x = this.bounds.left;
			this.points[0].y = this.bounds.top;
			this.points[1].x = this.bounds.left + this.bounds.get_width() * 0.25;
			this.points[1].y = this.bounds.bottom;
			this.points[2].x = this.bounds.get_center_x();
			this.points[2].y = this.bounds.get_center_y();
			this.points[3].x = this.bounds.left + this.bounds.get_width() * 0.75;
			this.points[3].y = this.bounds.bottom;
			this.points[4].x = this.bounds.right;
			this.points[4].y = this.bounds.top;
		}
	}
	resize_symbol(style: number): void {
		if (style === this.STYLE_0) {
			this.meter_paint.set_stroke_width(global.variables.canvas_stroke_width_1_zoom);
			this.meter_paint.set_text_size(global.variables.canvas_text_size_1);
		} else if (style === this.STYLE_1) {
			this.meter_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
			this.meter_paint.set_text_size(global.variables.canvas_text_size_4);
		}
	}
	draw_symbol(canvas: GraphicsEngine): void {
		let indexer: number = 0;
		this.circle_buffer = [];
		this.line_buffer = [];
		if (this.meter_type === this.METER_CURRENT) {
			this.line_buffer[indexer++] = Array(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
			this.line_buffer[indexer++] = Array(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
			this.line_buffer[indexer++] = Array(this.points[0].x, this.points[0].y, this.points[3].x, this.points[3].y);
			this.line_buffer[indexer++] = Array(this.points[3].x, this.points[3].y, this.points[4].x, this.points[4].y);
			this.line_buffer[indexer++] = Array(this.points[1].x, this.points[1].y, this.points[3].x, this.points[3].y);
		} else if (this.meter_type === this.METER_VOLTAGE) {
			this.line_buffer[indexer++] = Array(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
			this.line_buffer[indexer++] = Array(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
		} else if (this.meter_type === this.METER_RESISTANCE) {
			this.line_buffer[indexer++] = Array(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
			this.line_buffer[indexer++] = Array(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
			this.line_buffer[indexer++] = Array(this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);
			this.line_buffer[indexer++] = Array(this.points[3].x, this.points[3].y, this.points[4].x, this.points[4].y);
			this.line_buffer[indexer++] = Array(this.points[4].x, this.points[4].y, this.points[5].x, this.points[5].y);
			this.line_buffer[indexer++] = Array(this.points[5].x, this.points[5].y, this.points[6].x, this.points[6].y);
			this.line_buffer[indexer++] = Array(this.points[6].x, this.points[6].y, this.points[7].x, this.points[7].y);
			this.line_buffer[indexer++] = Array(this.points[7].x, this.points[7].y, this.points[8].x, this.points[8].y);
			this.line_buffer[indexer++] = Array(this.points[8].x, this.points[8].y, this.points[9].x, this.points[9].y);
			this.line_buffer[indexer++] = Array(this.points[9].x, this.points[9].y, this.points[10].x, this.points[10].y);
			this.line_buffer[indexer++] = Array(this.points[10].x, this.points[10].y, this.points[11].x, this.points[11].y);
		} else if (this.meter_type === this.METER_POWER) {
			this.line_buffer[indexer++] = Array(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
			this.line_buffer[indexer++] = Array(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
			this.line_buffer[indexer++] = Array(this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);
			this.line_buffer[indexer++] = Array(this.points[3].x, this.points[3].y, this.points[4].x, this.points[4].y);
		}
		canvas.draw_line_buffer(this.line_buffer, this.meter_paint);
	}
}
