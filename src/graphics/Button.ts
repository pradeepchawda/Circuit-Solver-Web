'use strict';
class Button extends RectF {
	public text: string;
	public draw_fill: boolean;
	public draw_stroke: boolean;
	public draw_text: boolean;
	public draw_cursor: boolean;
	public line_paint: Paint;
	public fill_paint: Paint;
	public text_paint: Paint;
	constructor(left: number, top: number, right: number, bottom: number) {
		super(left, top, right, bottom);
		this.text = '';
		this.draw_fill = false;
		this.draw_stroke = true;
		this.draw_text = true;
		this.draw_cursor = false;
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(paint.style.STROKE);
		this.line_paint.set_paint_cap(paint.cap.ROUND);
		this.line_paint.set_paint_join(paint.join.MITER);
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.line_paint.set_color(global.COLORS.GENERAL_GRAY_COLOR);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(paint.align.CENTER);
		this.fill_paint = new Paint();
		this.fill_paint.set_paint_style(paint.style.FILL);
		this.fill_paint.set_paint_cap(paint.cap.ROUND);
		this.fill_paint.set_paint_join(paint.join.MITER);
		this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.fill_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
		this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
		this.fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.fill_paint.set_alpha(255);
		this.fill_paint.set_paint_align(paint.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(paint.style.FILL);
		this.text_paint.set_paint_cap(paint.cap.ROUND);
		this.text_paint.set_paint_join(paint.join.MITER);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.text_paint.set_color(global.COLORS.GENERAL_BLUE_COLOR);
		if (MOBILE_MODE) {
			this.text_paint.set_text_size(global.variables.canvas_text_size_5);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		}
		this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(paint.align.CENTER);
	}
	resize_paint(): void {
		this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
		if (MOBILE_MODE) {
			this.text_paint.set_text_size(global.variables.canvas_text_size_5);
		} else {
			this.text_paint.set_text_size(global.variables.canvas_text_size_4);
		}
	}
	resize_button(): void {
		this.resize();
	}
	draw_button_text(canvas: GraphicsEngine, x: number, y: number): void {
		if (!this.draw_cursor) {
			canvas.draw_text(this.text, x, y, this.text_paint);
		} else {
			canvas.draw_text(global.TEMPLATES.TEXT_UNDERSCORE_TEMPLATE.replace('{TEXT}', this.text), x, y, this.text_paint);
		}
	}
	draw_button(canvas: GraphicsEngine): void {
		if (this.draw_fill) {
			canvas.draw_rect2(this, this.fill_paint);
		}
		if (this.draw_stroke) {
			canvas.draw_rect2(this, this.line_paint);
		}
		if (this.draw_text) {
			this.draw_button_text(canvas, this.get_center_x(), this.get_center_y());
		}
	}
	draw_button_dxdy(canvas: GraphicsEngine, offset_x: number, offset_y: number) {
		if (this.draw_fill) {
			canvas.draw_rect(this.left + offset_x, this.top + offset_y, this.right + offset_x, this.bottom + offset_y, this.fill_paint);
		}
		if (this.draw_stroke) {
			canvas.draw_rect(this.left + offset_x, this.top + offset_y, this.right + offset_x, this.bottom + offset_y, this.line_paint);
		}
		if (this.draw_text) {
			this.draw_button_text(canvas, this.get_center_x() + offset_x, this.get_center_y() + offset_y);
		}
	}
}
