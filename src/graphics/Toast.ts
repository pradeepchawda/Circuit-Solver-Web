'use strict';
class Toast {
	private readonly HEIGHT_FACTOR: number;
	private readonly MAX_SECONDS: number;
	private readonly MAX_TIME: number;
	private height_ratio: number;
	private line_paint: Paint;
	private fill_paint: Paint;
	private text_paint: Paint;
	private text: string;
	private timer: number;
	public draw_text: boolean;
	private bounds: RectF;
	private toast_request_draw: boolean;
	private last_text: string;
	private text_measure_div2: number;
	constructor() {
		if (global.MOBILE_MODE) {
			this.height_ratio = 0.85;
			this.HEIGHT_FACTOR = 0.7;
		} else {
			this.height_ratio = 0.9;
			this.HEIGHT_FACTOR = 0.5;
		}
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(this.line_paint.style.STROKE);
		this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
		this.line_paint.set_paint_join(this.line_paint.join.MITER);
		this.line_paint.set_stroke_width(global.canvas_stroke_width_1);
		this.line_paint.set_color(global.GENERAL_BLACK_COLOR);
		this.line_paint.set_text_size(global.canvas_text_size_4);
		this.line_paint.set_font(global.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(this.line_paint.align.CENTER);
		this.fill_paint = new Paint();
		this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
		this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
		this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
		this.fill_paint.set_stroke_width(global.canvas_stroke_width_1);
		this.fill_paint.set_color(global.GENERAL_BOUNDS_COLOR);
		this.fill_paint.set_text_size(global.canvas_text_size_4);
		this.fill_paint.set_font(global.DEFAULT_FONT);
		this.fill_paint.set_alpha(255);
		this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(this.text_paint.style.FILL);
		this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
		this.text_paint.set_paint_join(this.text_paint.join.MITER);
		this.text_paint.set_stroke_width(global.canvas_stroke_width_1);
		this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
		if (global.MOBILE_MODE) {
			this.text_paint.set_text_size(global.canvas_text_size_5 * 1.25);
		} else {
			this.text_paint.set_text_size(global.canvas_text_size_4);
		}
		this.text_paint.set_font(global.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(this.text_paint.align.CENTER);
		this.text = '';
		this.timer = 0;
		this.MAX_SECONDS = 2;
		this.MAX_TIME = FPS;
		this.draw_text = false;
		this.bounds = new RectF(0, 0, 0, 0);
		this.toast_request_draw = false;
		this.last_text = '-';
		this.text_measure_div2 = -1;
	}
	update(): void {
		if (this.draw_text) {
			this.timer++;
			if (this.timer >= this.MAX_TIME * this.MAX_SECONDS) {
				this.reset();
			}
		}
	}
	reset(): void {
		this.text = '';
		this.last_text = '-';
		this.timer = 0;
		this.draw_text = false;
		this.toast_request_draw = true;
	}
	set_text(str: string): void {
		this.text = language_manager.TEXT_PADDING + str + language_manager.TEXT_PADDING;
		this.last_text = '-';
	}
	show(): void {
		this.timer = 0;
		this.draw_text = true;
	}
	resize_toast(): void {
		this.line_paint.set_stroke_width(global.canvas_stroke_width_1);
		this.line_paint.set_text_size(global.canvas_text_size_4);
		this.fill_paint.set_stroke_width(global.canvas_stroke_width_1);
		this.fill_paint.set_text_size(global.canvas_text_size_4);
		this.text_paint.set_stroke_width(global.canvas_stroke_width_1);
		if (global.MOBILE_MODE) {
			this.text_paint.set_text_size(global.canvas_text_size_5 * 1.25);
		} else {
			this.text_paint.set_text_size(global.canvas_text_size_4);
		}
		this.last_text = this.text;
		this.text_measure_div2 = this.text_paint.measure_text(this.text) * 0.5;
	}
	draw_toast(canvas: GraphicsEngine): void {
		if (this.draw_text) {
			if (this.last_text !== this.text) {
				this.last_text = this.text;
				this.text_measure_div2 = this.text_paint.measure_text(this.text) * 0.5;
			}
			this.bounds.left = view_port.center_x - this.text_measure_div2;
			this.bounds.top = view_port.top + view_port.view_height * this.height_ratio;
			this.bounds.right = view_port.center_x + this.text_measure_div2;
			this.bounds.bottom = view_port.top + view_port.view_height * (this.height_ratio + (1.0 - this.height_ratio) * this.HEIGHT_FACTOR);
			canvas.draw_rect2(this.bounds, this.fill_paint);
			canvas.draw_rect2(this.bounds, this.line_paint);
			canvas.draw_text(this.text, this.bounds.get_center_x(), this.bounds.get_center_y(), this.text_paint);
			this.update();
		}
		if (this.toast_request_draw) {
			this.toast_request_draw = false;
		}
		
	}
}
