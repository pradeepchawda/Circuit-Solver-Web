/**********************************************************************
 * Project           : Circuit Solver
 * File		        : SineWave.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to handle drawing sine waves and editing their properties on
 *                   the fly.
 *
 * Copyright PHASORSYSTEMS, 2019. All Rights Reserved.
 * UNPUBLISHED, LICENSED SOFTWARE.
 *
 * CONFIDENTIAL AND PROPRIETARY INFORMATION
 * WHICH IS THE PROPERTY OF PHASORSYSTEMS.
 *
 * Revision History  :
 *
 * Date        Author      	Ref    Revision (Date in YYYYMMDD format)
 * 20190928    nboatengc     1      Initial Commit.
 *
 ***********************************************************************/
class SineWave {
	public readonly STYLE_0: number;
	public readonly STYLE_1: number;
	public amplitude: number;
	public sine_wave_paint: Paint;
	public x1: number;
	public x2: number;
	public y1: number;
	public y2: number;
	public c_x: number;
	public c_y: number;
	public last_x1: number;
	public last_x2: number;
	public last_y1: number;
	public last_y2: number;
	constructor(x1: number, y1: number, x2: number, y2: number, amplitude: number) {
		this.STYLE_0 = 0;
		this.STYLE_1 = 1;
		this.amplitude = amplitude;
		this.sine_wave_paint = new Paint();
		this.sine_wave_paint.set_paint_style(this.sine_wave_paint.style.STROKE);
		this.sine_wave_paint.set_paint_cap(this.sine_wave_paint.cap.ROUND);
		this.sine_wave_paint.set_paint_join(this.sine_wave_paint.join.MITER);
		this.sine_wave_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
		this.sine_wave_paint.set_color(global.ELEMENT_COLOR);
		this.sine_wave_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
		this.sine_wave_paint.set_font(global.DEFAULT_FONT);
		this.sine_wave_paint.set_alpha(255);
		this.sine_wave_paint.set_paint_align(this.sine_wave_paint.align.CENTER);
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
		/* Resize the stroke widths and the text sizes. */
		if (style === this.STYLE_0) {
			this.sine_wave_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2_ZOOM);
			this.sine_wave_paint.set_text_size(global.CANVAS_TEXT_SIZE_4_ZOOM);
		} else if (style === this.STYLE_1) {
			this.sine_wave_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
			this.sine_wave_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
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