'use strict';
class SineWave {
	public amplitude: number;
	public sine_wave_paint: Paint;
	private x1: number;
	private x2: number;
	private y1: number;
	private y2: number;
	private c_x: number;
	private c_y: number;
	private last_x1: number;
	private last_x2: number;
	private last_y1: number;
	private last_y2: number;
	constructor(x1: number, y1: number, x2: number, y2: number, amplitude: number) {
		this.amplitude = amplitude;
		this.sine_wave_paint = new Paint();
		this.sine_wave_paint.set_paint_style(paint.style.STROKE);
		this.sine_wave_paint.set_paint_cap(paint.cap.ROUND);
		this.sine_wave_paint.set_paint_join(paint.join.MITER);
		this.sine_wave_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
		this.sine_wave_paint.set_color(global.COLORS.ELEMENT_COLOR);
		this.sine_wave_paint.set_text_size(global.variables.canvas_text_size_4);
		this.sine_wave_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
		this.sine_wave_paint.set_alpha(255);
		this.sine_wave_paint.set_paint_align(paint.align.CENTER);
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
		this.c_x = 0;
		this.c_y = 0;
		this.last_x1 = -1;
		this.last_x2 = -1;
		this.last_y1 = -1;
		this.last_y2 = -1;
	}
	set_points(x1: number, y1: number, x2: number, y2: number): void {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
		this.last_x1 = -1;
		this.last_x2 = -1;
		this.last_y1 = -1;
		this.last_y2 = -1;
	}
	set_amplitude(amplitude: number): void {
		this.amplitude = amplitude;
	}
	set_color(color: string): void {
		this.sine_wave_paint.set_color(color);
	}
	resize(style: number): void {
		if (style === global.CONSTANTS.SINE_WAVE_STYLE_0) {
			this.sine_wave_paint.set_stroke_width(global.variables.canvas_stroke_width_2_zoom);
			this.sine_wave_paint.set_text_size(global.variables.canvas_text_size_4_zoom);
		} else if (style === global.CONSTANTS.SINE_WAVE_STYLE_1) {
			this.sine_wave_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
			this.sine_wave_paint.set_text_size(global.variables.canvas_text_size_4);
		}
		this.last_x1 = -1;
		this.last_x2 = -1;
		this.last_y1 = -1;
		this.last_y2 = -1;
	}
	draw_sine_wave(canvas: GraphicsEngine, style: number): void {
		if (this.last_x1 !== this.x1 || this.last_x2 !== this.x2) {
			this.last_x1 = this.x1;
			this.last_x2 = this.x2;
			this.c_x = (this.x2 + this.x1) * 0.5;
		}
		if (this.last_y1 !== this.y1 || this.last_y2 !== this.y2) {
			this.last_y1 = this.y1;
			this.last_y2 = this.y2;
			this.c_y = (this.y2 + this.y1) * 0.5;
		}
		canvas.draw_arc2(this.x1, this.y1, this.c_x, this.c_y, this.amplitude, this.sine_wave_paint);
		canvas.draw_arc2(this.c_x, this.c_y, this.x2, this.y2, -this.amplitude, this.sine_wave_paint);
	}
}
