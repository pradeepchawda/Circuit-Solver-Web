'use strict';
class Viewport {
	public line_paint: Paint;
	public readonly DRAW_BOUNDS_FLAG: boolean;
	public apply_spread_factor: boolean;
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
		this.line_paint.set_paint_style(PAINT.style.STROKE);
		this.line_paint.set_paint_cap(PAINT.cap.ROUND);
		this.line_paint.set_paint_join(PAINT.join.MITER);
		this.line_paint.set_stroke_width(1.5 * global.variables.canvas_stroke_width_2);
		this.line_paint.set_color(global.MENU_HIGHLIGHT_COLOR);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(PAINT.align.CENTER);
		this.DRAW_BOUNDS_FLAG = false;
		if (global.CONSTANTS.MOBILE_MODE === true || global.DESKTOP_MODE === true) {
			this.apply_spread_factor = true;
		} else {
			this.apply_spread_factor = false;
		}
		this.screen_width = screen_width;
		this.screen_height = screen_height;
		this.center_x = this.screen_width >> 1;
		this.center_y = this.screen_height >> 1;
		this.aspect_ratio = aspect_ratio;
		this.view_width = Math.min(this.screen_width, this.screen_height);
		this.view_height = this.view_width / this.aspect_ratio;
		if (this.apply_spread_factor) {
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
		this.line_paint.set_stroke_width(1.5 * global.variables.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		global.flags.signal_build_element = true;
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
		if (this.apply_spread_factor) {
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
		this.line_paint.set_stroke_width(1.5 * global.variables.canvas_stroke_width_2);
		this.line_paint.set_text_size(global.variables.canvas_text_size_4);
		global.flags.signal_build_element = true;
		global.signal_build_counter = 0;
	}
	draw_viewport(canvas: GraphicsEngine): void {
		if (this.DRAW_BOUNDS_FLAG) {
			canvas.draw_rect(this.left, this.top, this.right, this.bottom, this.line_paint);
		}
	}
}
