'use strict';
class Viewport {
	public line_paint: Paint;
	public DRAW_BOUNDS: boolean;
	public APPLY_SPREAD_FACTOR: boolean;
	public screen_width: number;
	public screen_height: number;
	public center_x: number;
	public center_y: number;
	public aspect_ratio: number;
	public view_width: number;
	public view_height: number;
	public width_spread_factor: number;
	public height_spread_factor: number;
	public spread_factor: number;
	public left: number;
	public top: number;
	public right: number;
	public bottom: number;
	constructor(aspect_ratio: number, screen_width: number, screen_height: number) {
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(this.line_paint.style.STROKE);
		this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
		this.line_paint.set_paint_join(this.line_paint.join.MITER);
		this.line_paint.set_stroke_width(1.5 * global.canvas_stroke_width_2);
		this.line_paint.set_color(global.MENU_HIGHLIGHT_COLOR);
		this.line_paint.set_text_size(global.canvas_text_size_4);
		this.line_paint.set_font(global.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(this.line_paint.align.CENTER);
		this.DRAW_BOUNDS = false;
		if (global.MOBILE_MODE === true || global.DESKTOP_MODE === true) {
			this.APPLY_SPREAD_FACTOR = true;
		} else {
			this.APPLY_SPREAD_FACTOR = false;
		}
		this.screen_width = screen_width;
		this.screen_height = screen_height;
		this.center_x = this.screen_width >> 1;
		this.center_y = this.screen_height >> 1;
		this.aspect_ratio = aspect_ratio;
		this.view_width = Math.min(this.screen_width, this.screen_height);
		this.view_height = this.view_width / this.aspect_ratio;
		if (this.APPLY_SPREAD_FACTOR) {
			this.width_spread_factor = this.screen_width / this.view_width;
			this.height_spread_factor = this.screen_height / this.view_height;
			this.spread_factor = Math.min(this.width_spread_factor, this.height_spread_factor);
			this.view_width *= this.spread_factor;
			this.view_height *= this.spread_factor;
		}
		this.left = this.center_x - (this.view_width >> 1);
		this.top = this.center_y - (this.view_height >> 1);
		this.right = this.center_x + (this.view_width >> 1);
		this.bottom = this.center_y + (this.view_height >> 1);
		this.line_paint.set_stroke_width(1.5 * global.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.canvas_text_size_4);
		global.signal_build_element = true;
		global.signal_build_counter = 0;
	}
	resize(aspect_ratio: number, screen_width: number, screen_height: number): void {
		this.screen_width = screen_width;
		this.screen_height = screen_height;
		this.center_x = this.screen_width >> 1;
		this.center_y = this.screen_height >> 1;
		this.aspect_ratio = aspect_ratio;
		this.view_width = Math.min(this.screen_width, this.screen_height);
		this.view_height = this.view_width / this.aspect_ratio;
		if (this.APPLY_SPREAD_FACTOR) {
			this.width_spread_factor = this.screen_width / this.view_width;
			this.height_spread_factor = this.screen_height / this.view_height;
			this.spread_factor = Math.min(this.width_spread_factor, this.height_spread_factor);
			this.view_width *= this.spread_factor;
			this.view_height *= this.spread_factor;
		}
		this.left = this.center_x - (this.view_width >> 1);
		this.top = this.center_y - (this.view_height >> 1);
		this.right = this.center_x + (this.view_width >> 1);
		this.bottom = this.center_y + (this.view_height >> 1);
		this.line_paint.set_stroke_width(1.5 * global.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.canvas_text_size_4);
		global.signal_build_element = true;
		global.signal_build_counter = 0;
	}
	draw_viewport(canvas: GraphicsEngine): void {
		if (this.DRAW_BOUNDS) {
			canvas.draw_rect(this.left, this.top, this.right, this.bottom, this.line_paint);
		}
	}
}
