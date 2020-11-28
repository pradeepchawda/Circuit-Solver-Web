/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Global.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This class will handle all the drawing for the entire application. It
 *                   is a general drawing wrapper for the HTML Canvas in "2d" mode.
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
class GraphicsEngine {
  public ctx: CanvasRenderingContext2D = null;
  public fill_paint: Paint = new Paint();
  public width: number = 0;
  public height: number = 0;
  public x: number = 0;
  public y: number = 0;
  public temp_x: number = 0;
  public temp_y: number = 0;
  public radius: number = 0;
  public general_path: Path = new Path();
  public degree: number = 0;
  public r_theta: number = 0;
  public r_x: number = 0;
  public r_y: number = 0;
  public DISABLE_ROUND_RECT: boolean = true;
  public general_integer: number = 0;
  public padding: number = 6;
  public transform_var_1: number = 0;
  public transform_var_2: number = 0;
  public last_alpha: number = -1;
  public last_fill_color: string = '';
  public last_stroke_color: string = '';
  public last_width: number = -1;
  public last_join: string = '';
  public last_font: string = '';
  public last_text_size: number = -1;
  public last_text_baseline: string = '';
  public last_text_align: string = '';
  public last_line_cap: string = '';
  public ENABLE_LINE_JOIN: boolean = false;
  public FONT_TEMPLATE: string = 'spx f';
  public FAST_PI_MUL_2: number = 7;
  public dict: PATH_T;
  public command: string = '';
  public cache: Array<number> = [];
  public c_xp: number = 0;
  public c_yp: number = 0;
  public radiusp: number = 0;
  public end_degree_radians: number = 0;
  public start_degree_radians: number = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.fill_paint = new Paint();
    this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
    this.temp_x = 0;
    this.temp_y = 0;
    this.radius = 0;
    this.general_path = new Path();
    this.degree = 0;
    this.r_theta = 0;
    this.r_x = 0;
    this.r_y = 0;
    this.DISABLE_ROUND_RECT = true;
    this.general_integer = 0;
    this.padding = 6;
    this.transform_var_1 = 0;
    this.transform_var_2 = 0;
    this.last_alpha = -1;
    this.last_fill_color = '';
    this.last_stroke_color = '';
    this.last_width = -1;
    this.last_join = '';
    this.last_font = '';
    this.last_text_size = -1;
    this.last_text_baseline = '';
    this.last_text_align = '';
    this.last_line_cap = '';
    this.ENABLE_LINE_JOIN = false;
    this.FONT_TEMPLATE = 'spx f';
    this.FAST_PI_MUL_2 = 7;
    this.dict = global.NULL;
    this.command = '';
    this.cache = [];
    this.c_xp = 0;
    this.c_yp = 0;
    this.radiusp = 0;
    this.end_degree_radians = 0;
    this.start_degree_radians = 0;
  }
  /* Set the context of the engine */
  set_context(ctx: CanvasRenderingContext2D): void {
    this.ctx = ctx;
  }
  get_context(): CanvasRenderingContext2D {
    return this.ctx;
  }
  /* The canavs's context isn't saved on resize! */
  on_resize(): void {
    this.last_alpha = -1;
    this.last_fill_color = '';
    this.last_stroke_color = '';
    this.last_width = -1;
    this.last_join = '';
    this.last_font = '';
    this.last_text_baseline = '';
    this.last_text_size = -1;
    this.last_text_align = '';
    this.last_line_cap = '';
  }
  /* Applies the paint's properties to the context */
  apply_paint(paint: Paint, is_text: boolean): void {
    this.ctx.beginPath();
    if (this.last_fill_color != paint.color && paint.style.FILL === paint.paint_style) {
      this.ctx.fillStyle = paint.color;
      this.last_fill_color = paint.color;
    }
    if (this.last_alpha != paint.alpha) {
      this.ctx.globalAlpha = paint.alpha;
      this.last_alpha = paint.alpha;
    }
    if (is_text) {
      if (this.last_text_align != paint.text_align) {
        this.ctx.textAlign = paint.text_align;
        this.last_text_align = paint.text_align;
      }
      if (this.last_text_size != paint.text_size || this.last_font != paint.font) {
        this.ctx.font = this.FONT_TEMPLATE.replace('s', String(paint.text_size)).replace('f', paint.font);
        this.last_text_size = paint.text_size;
        this.last_font = paint.font;
      }
      if (this.last_text_baseline != paint.text_baseline) {
        this.ctx.textBaseline = paint.text_baseline;
        this.last_text_baseline = paint.text_baseline;
      }
    } else {
      if (paint.style.STROKE === paint.paint_style || paint.style.FILL_AND_STROKE === paint.paint_style) {
        if (this.last_stroke_color != paint.color) {
          this.ctx.strokeStyle = paint.color;
          this.last_stroke_color = paint.color;
        }
        if (this.ENABLE_LINE_JOIN && this.last_join != paint.paint_join) {
          this.ctx.lineJoin = paint.paint_join;
          this.last_join = paint.paint_join;
        }
        if (this.last_line_cap != paint.paint_cap) {
          this.ctx.lineCap = paint.paint_cap;
          this.last_line_cap = paint.paint_cap;
        }
        if (this.last_width != paint.stroke_width) {
          this.ctx.lineWidth = paint.stroke_width;
          this.last_width = paint.stroke_width;
        }
      }
    }
  }
  /* Draw a line */
  draw_line(x1: number, y1: number, x2: number, y2: number, paint: Paint): void {
    this.apply_paint(paint, false);
    this.ctx.moveTo((global.ZERO_PT_FIVE + x1) >> global.ZERO, (global.ZERO_PT_FIVE + y1) >> global.ZERO);
    this.ctx.lineTo((global.ZERO_PT_FIVE + x2) >> global.ZERO, (global.ZERO_PT_FIVE + y2) >> global.ZERO);
    this.ctx.stroke();
  }
  /* Draw a line */
  draw_line_buffer(coords: Array<Array<number>>, paint: Paint): void {
    this.apply_paint(paint, false);
    for (var i = coords.length - 1; i > -1; i--) {
      this.cache = coords[i];
      this.ctx.moveTo((global.ZERO_PT_FIVE + this.cache[0]) >> global.ZERO, (global.ZERO_PT_FIVE + this.cache[1]) >> global.ZERO);
      this.ctx.lineTo((global.ZERO_PT_FIVE + this.cache[2]) >> global.ZERO, (global.ZERO_PT_FIVE + this.cache[3]) >> global.ZERO);
    }
    this.ctx.stroke();
  }
  /* Draws a rounded Rect */
  draw_round_rect(left: number, top: number, right: number, bottom: number, radius: number, paint: Paint): void {
    this.width = (global.ZERO_PT_FIVE + (right - left)) >> global.ZERO;
    this.height = (global.ZERO_PT_FIVE + (bottom - top)) >> global.ZERO;
    this.x = (global.ZERO_PT_FIVE + left) >> global.ZERO;
    this.y = (global.ZERO_PT_FIVE + top) >> global.ZERO;
    this.radius = (global.ZERO_PT_FIVE + radius) >> global.ZERO;
    if (!this.DISABLE_ROUND_RECT) {
      this.general_path.reset();
      this.general_path.move_to(this.x + this.radius, this.y);
      this.general_path.line_to(this.x + this.width - this.radius, this.y);
      this.general_path.curve_to(this.x + this.width - this.radius, this.y, this.x + this.width, this.y, this.x + this.width, this.y + this.radius);
      this.general_path.line_to(this.x + this.width, this.y + this.height - this.radius);
      this.general_path.curve_to(
        this.x + this.width,
        this.y + this.height - this.radius,
        this.x + this.width,
        this.y + this.height,
        this.x + this.width - this.radius,
        this.y + this.height
      );
      this.general_path.line_to(this.x + this.radius, this.y + this.height);
      this.general_path.curve_to(this.x + this.radius, this.y + this.height, this.x, this.y + this.height, this.x, this.y + this.height - this.radius);
      this.general_path.line_to(this.x, this.y + this.radius);
      this.general_path.curve_to(this.x, this.y + this.radius, this.x, this.y, this.x + this.radius, this.y);
      this.draw_path(this.general_path, paint);
    } else {
      this.draw_rect(left, top, right, bottom, paint);
    }
  }
  /* Draws a rounded Rect */
  draw_round_rect2(rect: RectF, radius: number, paint: Paint): void {
    this.width = (global.ZERO_PT_FIVE + rect.get_width()) >> global.ZERO;
    this.height = (global.ZERO_PT_FIVE + rect.get_height()) >> global.ZERO;
    this.x = (global.ZERO_PT_FIVE + rect.left) >> global.ZERO;
    this.y = (global.ZERO_PT_FIVE + rect.top) >> global.ZERO;
    this.radius = (global.ZERO_PT_FIVE + radius) >> global.ZERO;
    if (!this.DISABLE_ROUND_RECT) {
      this.general_path.reset();
      this.general_path.move_to(this.x + this.radius, this.y);
      this.general_path.line_to(this.x + this.width - this.radius, this.y);
      this.general_path.curve_to(this.x + this.width - this.radius, this.y, this.x + this.width, this.y, this.x + this.width, this.y + this.radius);
      this.general_path.line_to(this.x + this.width, this.y + this.height - this.radius);
      this.general_path.curve_to(
        this.x + this.width,
        this.y + this.height - this.radius,
        this.x + this.width,
        this.y + this.height,
        this.x + this.width - this.radius,
        this.y + this.height
      );
      this.general_path.line_to(this.x + this.radius, this.y + this.height);
      this.general_path.curve_to(this.x + this.radius, this.y + this.height, this.x, this.y + this.height, this.x, this.y + this.height - this.radius);
      this.general_path.line_to(this.x, this.y + this.radius);
      this.general_path.curve_to(this.x, this.y + this.radius, this.x, this.y, this.x + this.radius, this.y);
      this.draw_path(this.general_path, paint);
    } else {
      this.draw_rect2(rect, paint);
    }
  }
  /* Draws a rounded Rect */
  draw_round_rect3(x: number, y: number, w: number, h: number, radius: number, paint: Paint): void {
    this.width = (global.ZERO_PT_FIVE + w) >> global.ZERO;
    this.height = (global.ZERO_PT_FIVE + h) >> global.ZERO;
    this.x = (global.ZERO_PT_FIVE + (x - (w >> 1))) >> global.ZERO;
    this.y = (global.ZERO_PT_FIVE + (y - (h >> 1))) >> global.ZERO;
    this.radius = (global.ZERO_PT_FIVE + radius) >> global.ZERO;
    if (!this.DISABLE_ROUND_RECT) {
      this.draw_round_rect(this.x, this.y, this.x + this.width, this.y + this.height, this.radius, paint);
    } else {
      this.draw_rect3(x, y, w, h, paint);
    }
  }
  /* Draw a Rect */
  draw_rect(left: number, top: number, right: number, bottom: number, paint: Paint): void {
    this.width = (global.ZERO_PT_FIVE + (right - left)) >> global.ZERO;
    this.height = (global.ZERO_PT_FIVE + (bottom - top)) >> global.ZERO;
    this.x = (global.ZERO_PT_FIVE + left) >> global.ZERO;
    this.y = (global.ZERO_PT_FIVE + top) >> global.ZERO;
    this.apply_paint(paint, false);
    switch (paint.paint_style) {
      case paint.style.FILL:
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        break;
      case paint.style.STROKE:
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        break;
      case paint.style.FILL_AND_STROKE:
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        break;
      default:
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        break;
    }
  }
  /* Draw a Rect */
  draw_rect2(rect: RectF, paint: Paint): void {
    this.width = (global.ZERO_PT_FIVE + rect.get_width()) >> global.ZERO;
    this.height = (global.ZERO_PT_FIVE + rect.get_height()) >> global.ZERO;
    this.x = (global.ZERO_PT_FIVE + rect.left) >> global.ZERO;
    this.y = (global.ZERO_PT_FIVE + rect.top) >> global.ZERO;
    this.apply_paint(paint, false);
    switch (paint.paint_style) {
      case paint.style.FILL:
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        break;
      case paint.style.STROKE:
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        break;
      case paint.style.FILL_AND_STROKE:
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        break;
      default:
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        break;
    }
  }
  /* Draw a Rect */
  draw_rect3(x: number, y: number, w: number, h: number, paint: Paint): void {
    this.width = (global.ZERO_PT_FIVE + w) >> global.ZERO;
    this.height = (global.ZERO_PT_FIVE + h) >> global.ZERO;
    this.x = (global.ZERO_PT_FIVE + (x - (w >> 1))) >> global.ZERO;
    this.y = (global.ZERO_PT_FIVE + (y - (h >> 1))) >> global.ZERO;
    this.apply_paint(paint, false);
    switch (paint.paint_style) {
      case paint.style.FILL:
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        break;
      case paint.style.STROKE:
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        break;
      case paint.style.FILL_AND_STROKE:
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        break;
      default:
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
        break;
    }
  }
  /* Draws a triangle */
  draw_arrow(c_x: number, c_y: number, radius: number, is_up: boolean, paint: Paint): void {
    this.general_path.reset();
    this.c_xp = (global.ZERO_PT_FIVE + c_x) >> global.ZERO;
    this.c_yp = (global.ZERO_PT_FIVE + c_y) >> global.ZERO;
    this.radiusp = (global.ZERO_PT_FIVE + radius) >> global.ZERO;
    if (is_up) {
      this.general_path.move_to(this.c_xp, this.c_yp - this.radiusp);
      this.general_path.line_to(this.c_xp + this.radiusp, this.c_yp + this.radiusp);
      this.general_path.line_to(this.c_xp, this.c_yp + (this.radiusp >> 1));
      this.general_path.line_to(this.c_xp - this.radiusp, this.c_yp + this.radiusp);
      this.general_path.line_to(this.c_xp, this.c_yp - this.radiusp);
    } else {
      this.general_path.move_to(this.c_xp, this.c_yp + this.radiusp);
      this.general_path.line_to(this.c_xp + this.radiusp, this.c_yp - this.radiusp);
      this.general_path.line_to(this.c_xp, this.c_yp - (this.radiusp >> 1));
      this.general_path.line_to(this.c_xp - this.radiusp, this.c_yp - this.radiusp);
      this.general_path.line_to(this.c_xp, this.c_yp + this.radiusp);
    }
    this.draw_path(this.general_path, paint);
  }
  /* Draw a circle */
  draw_circle(x: number, y: number, radius: number, paint: Paint): void {
    this.x = (global.ZERO_PT_FIVE + x) >> global.ZERO;
    this.y = (global.ZERO_PT_FIVE + y) >> global.ZERO;
    this.apply_paint(paint, false);
    this.ctx.arc(this.x, this.y, radius, 0, this.FAST_PI_MUL_2);
    switch (paint.paint_style) {
      case paint.style.FILL:
        this.ctx.fill();
        break;
      case paint.style.STROKE:
        this.ctx.stroke();
        break;
      case paint.style.FILL_AND_STROKE:
        this.ctx.fill();
        this.ctx.stroke();
        break;
      default:
        this.ctx.fill();
        break;
    }
  }
  /* Draw a circle */
  draw_circle_buffer(buffer: Array<Array<number>>, paint: Paint): void {
    this.apply_paint(paint, false);
    for (var i = buffer.length - 1; i > -1; i--) {
      this.cache = buffer[i];
      this.x = (global.ZERO_PT_FIVE + this.cache[0]) >> global.ZERO;
      this.y = (global.ZERO_PT_FIVE + this.cache[1]) >> global.ZERO;
      this.ctx.moveTo(this.x, this.y);
      this.ctx.arc(this.x, this.y, this.cache[2], 0, this.FAST_PI_MUL_2);
    }
    switch (paint.paint_style) {
      case paint.style.FILL:
        this.ctx.fill();
        break;
      case paint.style.STROKE:
        this.ctx.stroke();
        break;
      case paint.style.FILL_AND_STROKE:
        this.ctx.fill();
        this.ctx.stroke();
        break;
      default:
        this.ctx.fill();
        break;
    }
  }
  /* Draw a color */
  draw_color(_surface: HTMLCanvasElement, color: string, alpha: number): void {
    this.fill_paint.set_color(color);
    this.fill_paint.set_alpha(alpha);
    this.apply_paint(this.fill_paint, false);
    this.ctx.fillRect(0, 0, (global.ZERO_PT_FIVE + _surface.width) >> global.ZERO, (global.ZERO_PT_FIVE + _surface.height) >> global.ZERO);
  }
  /* Draw a color */
  draw_color2(color: string, alpha: number, x: number, y: number, w: number, h: number): void {
    this.fill_paint.set_color(color);
    this.fill_paint.set_alpha(alpha);
    this.apply_paint(this.fill_paint, false);
    this.ctx.fillRect(
      (global.ZERO_PT_FIVE + x) >> global.ZERO,
      (global.ZERO_PT_FIVE + y) >> global.ZERO,
      (global.ZERO_PT_FIVE + w) >> global.ZERO,
      (global.ZERO_PT_FIVE + h) >> global.ZERO
    );
  }
  /* Draw text */
  draw_text(txt: string, x: number, y: number, paint: Paint): void {
    this.x = (global.ZERO_PT_FIVE + x) >> global.ZERO;
    this.y = (global.ZERO_PT_FIVE + y) >> global.ZERO;
    this.apply_paint(paint, true);
    this.ctx.fillText(txt, this.x, this.y);
  }
  /* Draw arc */
  draw_arc(rect: RectF, start_degree: number, end_degree: number, paint: Paint): void {
    this.radius = (global.ZERO_PT_FIVE + Math.max(rect.get_width() >> 1, rect.get_height() >> 1)) >> global.ZERO;
    this.x = (global.ZERO_PT_FIVE + rect.get_center_x()) >> global.ZERO;
    this.y = (global.ZERO_PT_FIVE + rect.get_center_y()) >> global.ZERO;
    this.end_degree_radians = (end_degree * global.NEG_PI_DIV_180) >> global.ZERO;
    this.start_degree_radians = (start_degree * global.NEG_PI_DIV_180) >> global.ZERO;
    this.apply_paint(paint, false);
    this.ctx.arc(this.x, this.y, this.radius, this.start_degree_radians, this.end_degree_radians, true);
    switch (paint.paint_style) {
      case paint.style.FILL:
        this.ctx.fill();
        break;
      case paint.style.STROKE:
        this.ctx.stroke();
        break;
      case paint.style.FILL_AND_STROKE:
        this.ctx.fill();
        this.ctx.stroke();
        break;
      default:
        this.ctx.fill();
        break;
    }
  }
  /* Draw arc */
  draw_arc2(x1: number, y1: number, x2: number, y2: number, amplitude: number, paint: Paint): void {
    this.x = (x1 + x2) >> 1;
    this.y = (y1 + y2) >> 1;
    this.temp_x = (global.ZERO_PT_FIVE + x1) >> global.ZERO;
    this.temp_y = (global.ZERO_PT_FIVE + y1) >> global.ZERO;
    this.degree = global.retrieve_angle_radian(x2 - x1, y2 - y1) - global.PI_DIV_2;
    this.general_path.reset();
    this.general_path.move_to(this.temp_x, this.temp_y);
    this.general_path.curve_to(
      this.temp_x,
      this.temp_y,
      (this.x + amplitude * global.cosine(this.degree)) >> global.ZERO,
      (this.y + amplitude * global.sine(this.degree)) >> global.ZERO,
      (global.ZERO_PT_FIVE + x2) >> global.ZERO,
      (global.ZERO_PT_FIVE + y2) >> global.ZERO
    );
    this.draw_path(this.general_path, paint);
  }
  /* Draw arc */
  draw_arc3(c_x: number, c_y: number, radius: number, start_degree: number, end_degree: number, paint: Paint): void {
    this.radius = (global.ZERO_PT_FIVE + radius) >> global.ZERO;
    this.x = (global.ZERO_PT_FIVE + c_x) >> global.ZERO;
    this.y = (global.ZERO_PT_FIVE + c_y) >> global.ZERO;
    this.end_degree_radians = (end_degree * global.NEG_PI_DIV_180) >> global.ZERO;
    this.start_degree_radians = (start_degree * global.NEG_PI_DIV_180) >> global.ZERO;
    this.apply_paint(paint, false);
    this.ctx.arc(this.x, this.y, this.radius, this.start_degree_radians, this.end_degree_radians, true);
    switch (paint.paint_style) {
      case paint.style.FILL:
        this.ctx.fill();
        break;
      case paint.style.STROKE:
        this.ctx.stroke();
        break;
      case paint.style.FILL_AND_STROKE:
        this.ctx.fill();
        this.ctx.stroke();
        break;
      default:
        this.ctx.fill();
        break;
    }
  }
  /* Draw a path */
  draw_path(path: Path, paint: Paint): void {
    this.apply_paint(paint, false);
    for (var i = 0; i < path.path_2d.length; i++) {
      this.dict = path.path_2d[i];
      this.command = this.dict['command'];
      if (this.command === 'MOVE') {
        this.ctx.moveTo(this.dict['x1'], this.dict['y1']);
      } else if (this.command === 'LINE') {
        this.ctx.lineTo(this.dict['x1'], this.dict['y1']);
      } else if (this.command === 'QUAD') {
        this.ctx.quadraticCurveTo(this.dict['x1'], this.dict['y1'], this.dict['x2'], this.dict['y2']);
      } else if (this.command === 'CURVE') {
        this.ctx.bezierCurveTo(this.dict['x1'], this.dict['y1'], this.dict['x2'], this.dict['y2'], this.dict['x3'], this.dict['y3']);
      }
    }
    switch (paint.paint_style) {
      case paint.style.FILL:
        this.ctx.fill();
        break;
      case paint.style.STROKE:
        this.ctx.stroke();
        break;
      case paint.style.FILL_AND_STROKE:
        this.ctx.fill();
        this.ctx.stroke();
        break;
      default:
        this.ctx.fill();
        break;
    }
  }
  /* Draw a path */
  draw_path2(path: Path, x_offset: number, y_offset: number, paint: Paint): void {
    this.apply_paint(paint, false);
    this.ctx.translate(x_offset, y_offset);
    for (var i = 0; i < path.path_2d.length; i++) {
      this.dict = path.path_2d[i];
      this.command = this.dict['command'];
      if (this.command === 'MOVE') {
        this.ctx.moveTo(this.dict['x1'], this.dict['y1']);
      } else if (this.command === 'LINE') {
        this.ctx.lineTo(this.dict['x1'], this.dict['y1']);
      } else if (this.command === 'QUAD') {
        this.ctx.quadraticCurveTo(this.dict['x1'], this.dict['y1'], this.dict['x2'], this.dict['y2']);
      } else if (this.command === 'CURVE') {
        this.ctx.bezierCurveTo(this.dict['x1'], this.dict['y1'], this.dict['x2'], this.dict['y2'], this.dict['x3'], this.dict['y3']);
      }
    }
    this.ctx.translate(-x_offset, -y_offset);
    switch (paint.paint_style) {
      case paint.style.FILL:
        this.ctx.fill();
        break;
      case paint.style.STROKE:
        this.ctx.stroke();
        break;
      case paint.style.FILL_AND_STROKE:
        this.ctx.fill();
        this.ctx.stroke();
        break;
      default:
        this.ctx.fill();
        break;
    }
  }
  /* Rotate the canvas */
  rotate(x: number, y: number, angle: number): void {
    this.r_theta = ((global.ZERO_PT_FIVE + angle) >> global.ZERO) * global.PI_DIV_180;
    this.transform_var_1 = global.sine(this.r_theta);
    this.transform_var_2 = global.cosine(this.r_theta);
    this.r_x = (global.ZERO_PT_FIVE + x) >> global.ZERO;
    this.r_y = (global.ZERO_PT_FIVE + y) >> global.ZERO;
    this.ctx.transform(this.transform_var_2, this.transform_var_1, -this.transform_var_1, this.transform_var_2, this.r_x, this.r_y);
    this.ctx.translate(-this.r_x, -this.r_y);
  }
  /* Restore the canvas settings. Don't use reset transform because of microsoft edge. */
  restore(): void {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  /* Clear the screen */
  clear(_surface: HTMLCanvasElement): void {
    this.ctx.clearRect(0, 0, _surface.width >> global.ZERO, _surface.height >> global.ZERO);
  }
  /* Clear the screen */
  clear_xywh(x: number, y: number, w: number, h: number): void {
    this.ctx.clearRect((x - this.padding) >> global.ZERO, (y - this.padding) >> global.ZERO, ((w + this.padding) << 1) >> global.ZERO, ((h + this.padding) << 1) >> global.ZERO);
  }
  release(): void {
    this.general_path.reset();
    this.cache = [];
    this.dict = global.NULL;
    this.restore();
  }
}
