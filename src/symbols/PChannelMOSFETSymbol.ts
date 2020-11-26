/**********************************************************************
 * Project           : Circuit Solver
 * File		        : PChannelMOSFETSymbol.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to draw the and-gate element without worrying about the
 *                   nodes / other properties.
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
class PChannelMOSFETSymbol {
  /* Index of the bounds (Inside New Element Window) */
  public index = -1;
  /* Page to be drawn on (Inside New Element Window) */
  public page = -1;
  public bounds = new RectF(0, 0, 0, 0);
  public p1 = new PointF(this.bounds.right, this.bounds.top);
  public p2 = new PointF(this.bounds.right, this.bounds.bottom);
  public p3 = new PointF(this.bounds.left, this.bounds.get_center_y());
  public pmos_0 = new PointF(0, 0);
  public pmos_1 = new PointF(0, 0);
  public pmos_2 = new PointF(0, 0);
  public pmos_3 = new PointF(0, 0);
  public pmos_4 = new PointF(0, 0);
  public pmos_5 = new PointF(0, 0);
  public pmos_6 = new PointF(0, 0);
  public pmos_7 = new PointF(0, 0);
  public pmos_8 = new PointF(0, 0);
  /* The center (x-coord) of the bounds */
  public c_x = this.bounds.get_center_x();
  /* The center (y-coord) of the bounds */
  public c_y = this.bounds.get_center_y();
  /* Angle from p1 to p2 minus 90 degrees */
  public theta_m90 =
    global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) +
    global.PI_DIV_2;
  /* Angle from p1 to p2 */
  public theta = global.retrieve_angle_radian(
    this.p2.x - this.p1.x,
    this.p2.y - this.p1.y
  );
  /* Angle from center to p2 */
  public phi = global.retrieve_angle_radian(
    this.c_x - this.p2.x,
    this.c_y - this.p2.y
  );
  /* The spacing of the nodes in the x-direction, divided by 2 */
  public x_space = this.bounds.get_width() >> 2;
  /* The spacing of the nodes in the y-direction, divided by 2 */
  public y_space = this.bounds.get_height() >> 2;
  /* Some points we'll be extending the leads of the resistor to. */
  public connect1_x = 0;
  public connect1_y = 0;
  public connect2_x = 0;
  public connect2_y = 0;
  /* This paint is used for drawing the "lines" that the component is comprised of. */
  public line_paint = new Paint();
  /* This paint is used for drawing the "nodes" that the component is connected to. */
  public point_paint = new Paint();
  /* This paint is used for drawing the "text" that the component needs to display */
  public text_paint = new Paint();
  /* Text background paint */
  public text_background_paint = new Paint();
  public FLAG_ADD_ELEMENT = false;
  public TAG = language_manager.TAG_PMOS;
  public DRAW_TAG = false;
  public text_bounds = new RectF(0, 0, 0, 0);
  public HEIGHT_RATIO = 0.35;
  public LINE_BUFFER = [];
  public CIRCLE_BUFFER = [];

  constructor(rect, index, page) {
    /* Index of the bounds (Inside New Element Window) */
    this.index = index;
    /* Page to be drawn on (Inside New Element Window) */
    this.page = page;
    this.bounds = new RectF(0, 0, 0, 0);
    if (global.not_null(rect)) {
      /* Create a new rectangle for the bounds of this component */
      this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
    }
    this.p1 = new PointF(this.bounds.right, this.bounds.top);
    this.p2 = new PointF(this.bounds.right, this.bounds.bottom);
    this.p3 = new PointF(this.bounds.left, this.bounds.get_center_y());
    this.pmos_0 = new PointF(0, 0);
    this.pmos_1 = new PointF(0, 0);
    this.pmos_2 = new PointF(0, 0);
    this.pmos_3 = new PointF(0, 0);
    this.pmos_4 = new PointF(0, 0);
    this.pmos_5 = new PointF(0, 0);
    this.pmos_6 = new PointF(0, 0);
    this.pmos_7 = new PointF(0, 0);
    this.pmos_8 = new PointF(0, 0);
    /* The center (x-coord) of the bounds */
    this.c_x = this.bounds.get_center_x();
    /* The center (y-coord) of the bounds */
    this.c_y = this.bounds.get_center_y();
    /* Angle from p1 to p2 minus 90 degrees */
    this.theta_m90 =
      global.retrieve_angle_radian(
        this.p2.x - this.p1.x,
        this.p2.y - this.p1.y
      ) + global.PI_DIV_2;
    /* Angle from p1 to p2 */
    this.theta = global.retrieve_angle_radian(
      this.p2.x - this.p1.x,
      this.p2.y - this.p1.y
    );
    /* Angle from center to p2 */
    this.phi = global.retrieve_angle_radian(
      this.c_x - this.p2.x,
      this.c_y - this.p2.y
    );
    /* The spacing of the nodes in the x-direction, divided by 2 */
    this.x_space = this.bounds.get_width() >> 2;
    /* The spacing of the nodes in the y-direction, divided by 2 */
    this.y_space = this.bounds.get_height() >> 2;
    /* Some points we'll be extending the leads of the resistor to. */
    this.connect1_x = 0;
    this.connect1_y = 0;
    this.connect2_x = 0;
    this.connect2_y = 0;
    /* This paint is used for drawing the "lines" that the component is comprised of. */
    this.line_paint = new Paint();
    this.line_paint.set_paint_style(this.line_paint.style.STROKE);
    this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
    this.line_paint.set_paint_join(this.line_paint.join.MITER);
    this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
    this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
    this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.line_paint.set_font(global.DEFAULT_FONT);
    this.line_paint.set_alpha(255);
    this.line_paint.set_paint_align(this.line_paint.align.CENTER);
    /* This paint is used for drawing the "nodes" that the component is connected to. */
    this.point_paint = new Paint();
    this.point_paint.set_paint_style(this.point_paint.style.FILL);
    this.point_paint.set_paint_cap(this.point_paint.cap.ROUND);
    this.point_paint.set_paint_join(this.point_paint.join.MITER);
    this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
    this.point_paint.set_color(global.GENERAL_WHITE_COLOR);
    this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.point_paint.set_font(global.DEFAULT_FONT);
    this.point_paint.set_alpha(255);
    this.point_paint.set_paint_align(this.point_paint.align.CENTER);
    /* This paint is used for drawing the "text" that the component needs to display */
    this.text_paint = new Paint();
    this.text_paint.set_paint_style(this.text_paint.style.FILL);
    this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
    this.text_paint.set_paint_join(this.text_paint.join.MITER);
    this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
    this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
    this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.text_paint.set_font(global.DEFAULT_FONT);
    this.text_paint.set_alpha(255);
    this.text_paint.set_paint_align(this.text_paint.align.CENTER);
    /* Text background paint */
    this.text_background_paint = new Paint();
    this.text_background_paint.set_paint_style(
      this.text_background_paint.style.FILL
    );
    this.text_background_paint.set_paint_cap(
      this.text_background_paint.cap.ROUND
    );
    this.text_background_paint.set_paint_join(
      this.text_background_paint.join.MITER
    );
    this.text_background_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
    this.text_background_paint.set_color(global.GENERAL_CYAN_COLOR);
    this.text_background_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.text_background_paint.set_font(global.DEFAULT_FONT);
    this.text_background_paint.set_alpha(192);
    this.text_background_paint.set_paint_align(
      this.text_background_paint.align.CENTER
    );
    this.build_element();
    this.FLAG_ADD_ELEMENT = false;
    this.TAG = language_manager.TAG_PMOS;
    this.DRAW_TAG = false;
    this.text_bounds = new RectF(0, 0, 0, 0);
    this.HEIGHT_RATIO = 0.35;
    this.LINE_BUFFER = [];
    this.CIRCLE_BUFFER = [];
  }
  update() {
    if (this.FLAG_ADD_ELEMENT) {
      if (
        workspace.bounds.contains_xywh(
          global.mouse_x,
          global.mouse_y,
          workspace.bounds.get_width() - 4.5 * global.node_space_x,
          workspace.bounds.get_height() - 4.5 * global.node_space_y
        ) &&
        !this.bounds.contains_xy(global.mouse_x, global.mouse_y)
      ) {
        shortcut_manager.TEMP_HISTORY_SNAPSHOT = engine_functions.history_snapshot();
        global.SIGNAL_HISTORY_LOCK = true;
        engine_functions.add_pmosfet();
        this.FLAG_ADD_ELEMENT = false;
      }
    }
  }
  mouse_down(page, width, height) {
    if (this.page === page) {
      if (
        this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)
      ) {
        if (!this.FLAG_ADD_ELEMENT) {
          this.FLAG_ADD_ELEMENT = true;
          global.SIGNAL_ADD_ELEMENT = true;
          /* Block out the reset selection portion of the code! */
          global.component_touched = true;
        }
      }
    }
  }
  mouse_move(page, width, height) {
    if (
      this.bounds.contains_xywh(
        global.mouse_x,
        global.mouse_y,
        width,
        height
      ) &&
      !global.MOBILE_MODE
    ) {
      this.DRAW_TAG = true;
    } else {
      this.DRAW_TAG = false;
    }
    if (this.page === page) {
    }
  }
  mouse_up(page, width, height) {
    if (this.page === page) {
      if (
        this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)
      ) {
      }
      this.FLAG_ADD_ELEMENT = false;
      global.SIGNAL_ADD_ELEMENT = false;
    }
  }
  /* Generate the SVG for the component. */
  build_element() {
    /* Top segment */
    this.pmos_0.x = this.p1.x + this.x_space * global.cosine(this.theta);
    this.pmos_0.y = this.p1.y + this.y_space * global.sine(this.theta);
    this.pmos_1.x =
      this.pmos_0.x + 2 * this.x_space * global.cosine(this.theta_m90);
    this.pmos_1.y =
      this.pmos_0.y + 2 * this.y_space * global.sine(this.theta_m90);
    this.pmos_2.x =
      this.p1.x +
      1.5 * this.x_space * global.cosine(this.theta) +
      2.5 * this.x_space * global.cosine(this.theta_m90);
    this.pmos_2.y =
      this.p1.y +
      1.5 * this.y_space * global.sine(this.theta) +
      2.5 * this.y_space * global.sine(this.theta_m90);
    this.pmos_3.x = this.p1.x + 3.0 * this.x_space * global.cosine(this.theta);
    this.pmos_3.y = this.p1.y + 3.0 * this.y_space * global.sine(this.theta);
    this.pmos_4.x =
      this.pmos_3.x + 2 * this.x_space * global.cosine(this.theta_m90);
    this.pmos_4.y =
      this.pmos_3.y + 2 * this.y_space * global.sine(this.theta_m90);
    this.pmos_5.x =
      this.p1.x +
      2.5 * this.x_space * global.cosine(this.theta) +
      2.5 * this.x_space * global.cosine(this.theta_m90);
    this.pmos_5.y =
      this.p1.y +
      2.5 * this.y_space * global.sine(this.theta) +
      2.5 * this.y_space * global.sine(this.theta_m90);
    this.pmos_6.x =
      this.p3.x - 1.605 * this.x_space * global.cosine(this.theta_m90);
    this.pmos_6.y =
      this.p3.y - 1.605 * this.y_space * global.sine(this.theta_m90);
    /* Arrow */
    this.pmos_7.x =
      this.pmos_1.x -
      0.707 * this.x_space * global.cosine(this.theta_m90 + global.PI_DIV_6);
    this.pmos_7.y =
      this.pmos_1.y -
      0.707 * this.y_space * global.sine(this.theta_m90 + global.PI_DIV_6);
    this.pmos_8.x =
      this.pmos_1.x -
      0.707 * this.x_space * global.cosine(this.theta_m90 - global.PI_DIV_6);
    this.pmos_8.y =
      this.pmos_1.y -
      0.707 * this.y_space * global.sine(this.theta_m90 - global.PI_DIV_6);
  }
  resize(rect) {
    /* Create a new rectangle for the bounds of this component */
    this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
    /* The center (x-coord) of the bounds */
    this.c_x = this.bounds.get_center_x();
    /* The center (y-coord) of the bounds */
    this.c_y = this.bounds.get_center_y();
    /* The spacing of the nodes in the x-direction, divided by 2 */
    this.x_space = this.bounds.get_width() >> 2;
    /* The spacing of the nodes in the y-direction, divided by 2 */
    this.y_space = this.bounds.get_height() >> 2;
    this.p1.set_point(this.bounds.right, this.bounds.top);
    this.p2.set_point(this.bounds.right, this.bounds.bottom);
    this.p3.set_point(this.bounds.left, this.bounds.get_center_y());
    /* Angle from p1 to p2 minus 90 degrees */
    this.theta_m90 =
      global.retrieve_angle_radian(
        this.p2.x - this.p1.x,
        this.p2.y - this.p1.y
      ) + global.PI_DIV_2;
    /* Angle from p1 to p2 */
    this.theta = global.retrieve_angle_radian(
      this.p2.x - this.p1.x,
      this.p2.y - this.p1.y
    );
    /* Angle from center to p2 */
    this.phi = global.retrieve_angle_radian(
      this.c_x - this.p2.x,
      this.c_y - this.p2.y
    );
    this.build_element();
    this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
    this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
    this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
    this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
  }
  recolor() {
    if (this.FLAG_ADD_ELEMENT) {
      this.line_paint.set_color(global.SELECTED_COLOR);
      this.point_paint.set_color(global.SELECTED_COLOR);
      this.text_paint.set_color(global.SELECTED_COLOR);
    } else {
      this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
      this.point_paint.set_color(global.GENERAL_WHITE_COLOR);
      this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
    }
  }
  /* Draws the Symbol */
  draw_symbol(canvas, page) {
    this.recolor();
    if (this.page === page) {
      let indexer = 0;
      this.CIRCLE_BUFFER = [];
      this.LINE_BUFFER = [];
      this.LINE_BUFFER[indexer++] = Array(
        this.p1.x,
        this.p1.y,
        this.pmos_0.x,
        this.pmos_0.y
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.pmos_0.x,
        this.pmos_0.y,
        this.pmos_1.x,
        this.pmos_1.y
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.p2.x,
        this.p2.y,
        this.pmos_3.x,
        this.pmos_3.y
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.pmos_3.x,
        this.pmos_3.y,
        this.pmos_4.x,
        this.pmos_4.y
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.pmos_1.x,
        this.pmos_1.y,
        this.pmos_4.x,
        this.pmos_4.y
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.pmos_2.x,
        this.pmos_2.y,
        this.pmos_5.x,
        this.pmos_5.y
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.pmos_6.x,
        this.pmos_6.y,
        this.p3.x,
        this.p3.y
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.pmos_1.x,
        this.pmos_1.y,
        this.pmos_7.x,
        this.pmos_7.y
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.pmos_1.x,
        this.pmos_1.y,
        this.pmos_8.x,
        this.pmos_8.y
      );
      canvas.draw_line_buffer(this.LINE_BUFFER, this.line_paint);
      indexer = 0;
      this.CIRCLE_BUFFER[indexer++] = Array(
        this.p1.x,
        this.p1.y,
        1.5 * global.CANVAS_STROKE_WIDTH_2
      );
      this.CIRCLE_BUFFER[indexer++] = Array(
        this.p2.x,
        this.p2.y,
        1.5 * global.CANVAS_STROKE_WIDTH_2
      );
      this.CIRCLE_BUFFER[indexer++] = Array(
        this.p3.x,
        this.p3.y,
        1.5 * global.CANVAS_STROKE_WIDTH_2
      );
      canvas.draw_circle_buffer(this.CIRCLE_BUFFER, this.point_paint);
      if (this.DRAW_TAG && !global.SIGNAL_ADD_ELEMENT) {
        this.text_bounds.left =
          this.bounds.get_center_x() -
          1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
        this.text_bounds.top =
          this.bounds.bottom +
          this.bounds.get_height() -
          this.HEIGHT_RATIO * this.bounds.get_height();
        this.text_bounds.right =
          this.bounds.get_center_x() +
          1.25 * (this.text_paint.measure_text(this.TAG) >> 1);
        this.text_bounds.bottom =
          this.bounds.bottom +
          this.bounds.get_height() +
          this.HEIGHT_RATIO * this.bounds.get_height();
        canvas.draw_round_rect2(
          this.text_bounds,
          this.text_background_paint.get_stroke_width(),
          this.text_background_paint
        );
        canvas.draw_text(
          this.TAG,
          this.bounds.get_center_x(),
          this.text_bounds.get_center_y(),
          this.text_paint
        );
      }
    }
  }
}
