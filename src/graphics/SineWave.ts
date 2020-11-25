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
  public readonly STYLE_0: number = 0;
  public readonly STYLE_1: number = 1;
  public amplitude: number = 0.1;
  public sine_wave_paint: Paint = new Paint();
  public x1: number = 0;
  public x2: number = 0;
  public y1: number = 0;
  public y2: number = 0;
  public c_x: number = 0;
  public c_y: number = 0;
  public last_x1: number = -1;
  public last_x2: number = -1;
  public last_y1: number = -1;
  public last_y2: number = -1;

  constructor(x1, y1, x2, y2, amplitude) {
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
  set_points(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.last_x1 = -1;
    this.last_x2 = -1;
    this.last_y1 = -1;
    this.last_y2 = -1;
  }
  set_amplitude(amplitude) {
    this.amplitude = amplitude;
  }
  set_color(color) {
    this.sine_wave_paint.set_color(color);
  }
  resize(style) {
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
  draw_sine_wave(canvas, style) {
    if (this.last_x1 != this.x1 || this.last_x2 != this.x2) {
      this.last_x1 = this.x1;
      this.last_x2 = this.x2;
      this.c_x = (this.x2 + this.x1) * 0.5;
    }
    if (this.last_y1 != this.y1 || this.last_y2 != this.y2) {
      this.last_y1 = this.y1;
      this.last_y2 = this.y2;
      this.c_y = (this.y2 + this.y1) * 0.5;
    }
    canvas.draw_arc2(
      this.x1,
      this.y1,
      this.c_x,
      this.c_y,
      this.amplitude,
      this.sine_wave_paint
    );
    canvas.draw_arc2(
      this.c_x,
      this.c_y,
      this.x2,
      this.y2,
      -this.amplitude,
      this.sine_wave_paint
    );
  }
}
