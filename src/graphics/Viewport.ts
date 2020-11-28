/**********************************************************************
 * Project           : Circuit Solver
 * File		        : ViewPort.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A Rectangle class to keep track of the bounds of an object located on the
 *                   html canvas. Note: "F" stands for float.
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
class Viewport {
  /* This paint is used for drawing the "lines" that the component is comprised of. */
  public line_paint: Paint = new Paint();

  public DRAW_BOUNDS: boolean = false;

  public APPLY_SPREAD_FACTOR: boolean = false;

  public screen_width: number = 1;
  public screen_height: number = 1;
  public center_x: number = this.screen_width >> 1;
  public center_y: number = this.screen_height >> 1;
  public aspect_ratio: number = 1;
  public view_width: number = Math.min(this.screen_width, this.screen_height);
  public view_height: number = this.view_width / this.aspect_ratio;
  /* Determine how much more we can spread this view port over the screen in the x and y direction. */
  public width_spread_factor: number = this.screen_width / this.view_width;
  public height_spread_factor: number = this.screen_height / this.view_height;
  /* Take the smallest spread factor to make sure we aren't going to get clipped off the screen.  */
  public spread_factor: number = Math.min(this.width_spread_factor, this.height_spread_factor);
  /* left, top, right, and bottom of the rectangle */
  public left: number = this.center_x - (this.view_width >> 1);
  public top: number = this.center_y - (this.view_height >> 1);
  public right: number = this.center_x + (this.view_width >> 1);
  public bottom: number = this.center_y + (this.view_height >> 1);

  constructor(aspect_ratio: number, screen_width: number, screen_height: number) {
    /* This paint is used for drawing the "lines" that the component is comprised of. */
    this.line_paint = new Paint();
    this.line_paint.set_paint_style(this.line_paint.style.STROKE);
    this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
    this.line_paint.set_paint_join(this.line_paint.join.MITER);
    this.line_paint.set_stroke_width(1.5 * global.CANVAS_STROKE_WIDTH_2);
    this.line_paint.set_color(global.MENU_HIGHLIGHT_COLOR);
    this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.line_paint.set_font(global.DEFAULT_FONT);
    this.line_paint.set_alpha(255);
    this.line_paint.set_paint_align(this.line_paint.align.CENTER);
    this.DRAW_BOUNDS = false;
    if (global.MOBILE_MODE === false) {
      this.APPLY_SPREAD_FACTOR = false;
    } else {
      this.APPLY_SPREAD_FACTOR = true;
    }
    this.screen_width = screen_width;
    this.screen_height = screen_height;
    this.center_x = this.screen_width >> 1;
    this.center_y = this.screen_height >> 1;
    this.aspect_ratio = aspect_ratio;
    this.view_width = Math.min(this.screen_width, this.screen_height);
    this.view_height = this.view_width / this.aspect_ratio;
    if (this.APPLY_SPREAD_FACTOR) {
      /* Determine how much more we can spread this view port over the screen in the x and y direction. */
      this.width_spread_factor = this.screen_width / this.view_width;
      this.height_spread_factor = this.screen_height / this.view_height;
      /* Take the smallest spread factor to make sure we aren't going to get clipped off the screen.  */
      this.spread_factor = Math.min(this.width_spread_factor, this.height_spread_factor);
      /* Apply the spread factor to the width and height, maintaining the aspect ratio. */
      this.view_width *= this.spread_factor;
      this.view_height *= this.spread_factor;
    }
    /* left, top, right, and bottom of the rectangle */
    this.left = this.center_x - (this.view_width >> 1);
    this.top = this.center_y - (this.view_height >> 1);
    this.right = this.center_x + (this.view_width >> 1);
    this.bottom = this.center_y + (this.view_height >> 1);
    this.line_paint.set_stroke_width(1.5 * global.CANVAS_STROKE_WIDTH_2);
    this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    global.SIGNAL_BUILD_ELEMENT = true;
    global.SIGNAL_BUILD_COUNTER = 0;
  }
  /* Handles resizing the RectF Element */
  resize(aspect_ratio: number, screen_width: number, screen_height: number): void {
    this.screen_width = screen_width;
    this.screen_height = screen_height;
    this.center_x = this.screen_width >> 1;
    this.center_y = this.screen_height >> 1;
    this.aspect_ratio = aspect_ratio;
    this.view_width = Math.min(this.screen_width, this.screen_height);
    this.view_height = this.view_width / this.aspect_ratio;
    if (this.APPLY_SPREAD_FACTOR) {
      /* Determine how much more we can spread this view port over the screen in the x and y direction. */
      this.width_spread_factor = this.screen_width / this.view_width;
      this.height_spread_factor = this.screen_height / this.view_height;
      /* Take the smallest spread factor to make sure we aren't going to get clipped off the screen.  */
      this.spread_factor = Math.min(this.width_spread_factor, this.height_spread_factor);
      /* Apply the spread factor to the width and height, maintaining the aspect ratio. */
      this.view_width *= this.spread_factor;
      this.view_height *= this.spread_factor;
    }
    /* left, top, right, and bottom of the rectangle */
    this.left = this.center_x - (this.view_width >> 1);
    this.top = this.center_y - (this.view_height >> 1);
    this.right = this.center_x + (this.view_width >> 1);
    this.bottom = this.center_y + (this.view_height >> 1);
    this.line_paint.set_stroke_width(1.5 * global.CANVAS_STROKE_WIDTH_2);
    this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    global.SIGNAL_BUILD_ELEMENT = true;
    global.SIGNAL_BUILD_COUNTER = 0;
  }
  draw_viewport(canvas: GraphicsEngine): void {
    if (this.DRAW_BOUNDS) {
      canvas.draw_rect(this.left, this.top, this.right, this.bottom, this.line_paint);
    }
  }
}
