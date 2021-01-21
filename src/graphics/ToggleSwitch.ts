'use strict';
class ToggleSwitch extends RectF {
	public draw_fill: boolean;
	public draw_stroke: boolean;
	public draw_text: boolean;
	public line_paint: Paint;
	public fill_paint: Paint;
	public toggle_paint: Paint;
	public text_paint: Paint;
	public STATE: string;
	constructor(left: number, top: number, right: number, bottom: number) {
		super(left, top, right, bottom);
		this.draw_fill = false;
		this.draw_stroke = true;
		this.draw_text = true;
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(this.line_paint.style.STROKE);
		this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
		this.line_paint.set_paint_join(this.line_paint.join.MITER);
		this.line_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.line_paint.set_color(global.GENERAL_GRAY_COLOR);
		this.line_paint.set_text_size(global.canvas_text_size_4);
		this.line_paint.set_font(global.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(this.line_paint.align.CENTER);
		this.fill_paint = new Paint();
		this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
		this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
		this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
		this.fill_paint.set_stroke_width(global.canvas_stroke_width_1);
		this.fill_paint.set_color(global.GENERAL_WHITE_COLOR);
		this.fill_paint.set_text_size(global.canvas_text_size_4);
		this.fill_paint.set_font(global.DEFAULT_FONT);
		this.fill_paint.set_alpha(255);
		this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
		this.toggle_paint = new Paint();
		this.toggle_paint.set_paint_style(this.toggle_paint.style.FILL);
		this.toggle_paint.set_paint_cap(this.toggle_paint.cap.ROUND);
		this.toggle_paint.set_paint_join(this.toggle_paint.join.MITER);
		this.toggle_paint.set_stroke_width(global.canvas_stroke_width_1);
		this.toggle_paint.set_color(global.GENERAL_CYAN_COLOR);
		this.toggle_paint.set_text_size(global.canvas_text_size_4);
		this.toggle_paint.set_font(global.DEFAULT_FONT);
		this.toggle_paint.set_alpha(192);
		this.toggle_paint.set_paint_align(this.toggle_paint.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(this.text_paint.style.FILL);
		this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
		this.text_paint.set_paint_join(this.text_paint.join.MITER);
		this.text_paint.set_stroke_width(global.canvas_stroke_width_1);
		this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
		if (global.MOBILE_MODE) {
			this.text_paint.set_text_size(global.canvas_text_size_5);
		} else {
			this.text_paint.set_text_size(global.canvas_text_size_4);
		}
		this.text_paint.set_font(global.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(this.text_paint.align.CENTER);
		this.STATE = global.ON;
	}
	resize_paint(): void {
		this.line_paint.set_stroke_width(global.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.canvas_text_size_4);
		this.fill_paint.set_stroke_width(global.canvas_stroke_width_1);
		this.fill_paint.set_text_size(global.canvas_text_size_4);
		this.toggle_paint.set_stroke_width(global.canvas_stroke_width_1);
		this.toggle_paint.set_text_size(global.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.canvas_stroke_width_1);
		if (global.MOBILE_MODE) {
			this.text_paint.set_text_size(global.canvas_text_size_5);
		} else {
			this.text_paint.set_text_size(global.canvas_text_size_4);
		}
	}
	resize_toggle_switch(): void {
		this.resize();
	}
	draw_toggle_switch(canvas: GraphicsEngine): void {
		let padding: number = this.get_height() * 0.15;
		if (this.draw_fill) {
			canvas.draw_rect2(this, this.fill_paint);
		}
		if (this.STATE === global.ON) {
			canvas.draw_rect(this.get_center_x() + padding, this.top + padding, this.right - padding, this.bottom - padding, this.toggle_paint);
			if (this.draw_text) {
				canvas.draw_text(this.STATE, this.left + this.get_width() * 0.25, this.get_center_y(), this.text_paint);
			}
		} else if (this.STATE === global.OFF) {
			canvas.draw_rect(this.left + padding, this.top + padding, this.get_center_x() - padding, this.bottom - padding, this.toggle_paint);
			if (this.draw_text) {
				canvas.draw_text(this.STATE, this.right - this.get_width() * 0.25, this.get_center_y(), this.text_paint);
			}
		}
		if (this.draw_stroke) {
			canvas.draw_rect2(this, this.line_paint);
		}
	}
	draw_toggle_switch_dxdy(canvas: GraphicsEngine, offset_x: number, offset_y: number): void {
		let padding: number = this.get_height() * 0.175;
		if (this.draw_fill) {
			canvas.draw_rect(this.left + offset_x, this.top + offset_y, this.right + offset_x, this.bottom + offset_y, this.fill_paint);
		}
		if (this.STATE === global.ON) {
			canvas.draw_rect(
				this.get_center_x() + padding + offset_x,
				this.top + padding + offset_y,
				this.right - this.get_height() * 0.1 + offset_x - (padding >> 1),
				this.bottom - padding + offset_y,
				this.toggle_paint
			);
			if (this.draw_text) {
				canvas.draw_text(this.STATE, this.left + this.get_width() * 0.25 + offset_x, this.get_center_y() + offset_y, this.text_paint);
			}
		} else if (this.STATE === global.OFF) {
			canvas.draw_rect(
				this.left + padding + offset_x,
				this.top + padding + offset_y,
				this.get_center_x() - this.get_height() * 0.1 + offset_x - (padding >> 1),
				this.bottom - padding + offset_y,
				this.toggle_paint
			);
			if (this.draw_text) {
				canvas.draw_text(this.STATE, this.right - this.get_width() * 0.25 + offset_x, this.get_center_y() + offset_y, this.text_paint);
			}
		}
		if (this.draw_stroke) {
			canvas.draw_rect(this.left + offset_x, this.top + offset_y, this.right + offset_x, this.bottom + offset_y, this.line_paint);
		}
	}
}
