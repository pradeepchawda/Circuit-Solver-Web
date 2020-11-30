/**********************************************************************
 * Project           : Circuit Solver
 * File		        : ElementOptionsEditWindow.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A general class to edit the properties of an element.
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
class ElementOptionsEditWindow {
  public TITLE_HEIGHT_RATIO: number = 0.25;
  public BUTTON_WIDTH_RATIO: number = 0.3;
  public BUTTON_HEIGHT_RATIO: number = 0.25;
  public PADDING: number = 0.0175;
  /* This paint is used for drawing the "lines" that the component is comprised of. */
  public line_paint: Paint = new Paint();
  /* This paint is used for drawing the "nodes" that the component is connected to. */
  public point_paint: Paint = new Paint();
  /* This paint is used for drawing the "text" that the component needs to display */
  public text_paint: Paint = new Paint();
  /* This paint is used for drawing the icons that the component is comprised of. */
  public hover_paint: Paint = new Paint();
  /* This paint is used for drawing the "fill" that the component is comprised of. */
  public bounds_paint: Paint = new Paint();
  public width: number = view_port.view_width * 0.15;
  public height: number = view_port.view_height * 0.075;
  public bounds: RectF = new RectF(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
  public title_bounds: Button = new Button(0, 0, 0, 0);

  public okay_button: Button = new Button(0, 0, 0, 0);

  public cancel_button: Button = new Button(0, 0, 0, 0);

  public exit_button: Button = new Button(0, 0, 0, 0);

  public input_button: Button = new Button(0, 0, 0, 0);

  /* This paint is used for drawing the selected portions of text. */
  public select_paint: Paint = new Paint();

  public option_index: number = -1;
  /* Controls where the insert of new characters occur. */
  public CURSOR_POSITION: number = 0;
  public SELECT_ALL: boolean = false;
  /* Controls for window dragging. */
  public OFFSET_X: number = 0;
  public OFFSET_Y: number = 0;
  public WINDOW_ANCHORED: boolean = true;
  public ANCHOR_X: number = 0;
  public ANCHOR_Y: number = 0;
  /* Enforcing the system from cascading events. */
  public first_touch_x: number = 0;
  public first_touch_y: number = 0;
  /* Keeps track of the width of the text input. */
  public measured_text: number = -1;
  public INITIAL_CURSOR_DOWN: number = -1;
  public SELECT_START: number = -1;
  public SELECT_END: number = -1;
  public SELECT_WIDTH: number = -1;
  public SELECT_OFFSET_X: number = -1;
  public MOUSE_DOWN: boolean = false;
  public ASCENDING: boolean = false;

  constructor() {
    this.TITLE_HEIGHT_RATIO = 0.25;
    this.BUTTON_WIDTH_RATIO = 0.3;
    this.BUTTON_HEIGHT_RATIO = 0.25;
    this.PADDING = 0.0175;
    /* This paint is used for drawing the "lines" that the component is comprised of. */
    this.line_paint = new Paint();
    this.line_paint.set_paint_style(this.line_paint.style.STROKE);
    this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
    this.line_paint.set_paint_join(this.line_paint.join.MITER);
    this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
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
    this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.point_paint.set_color(global.ELEMENT_COLOR);
    this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.point_paint.set_font(global.DEFAULT_FONT);
    this.point_paint.set_alpha(255);
    this.point_paint.set_paint_align(this.point_paint.align.CENTER);
    /* This paint is used for drawing the "text" that the component needs to display */
    this.text_paint = new Paint();
    this.text_paint.set_paint_style(this.text_paint.style.FILL);
    this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
    this.text_paint.set_paint_join(this.text_paint.join.MITER);
    this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.text_paint.set_color(global.GENERAL_YELLOW_COLOR);
    if (global.MOBILE_MODE) {
      this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    } else {
      this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    }
    this.text_paint.set_font(global.DEFAULT_FONT);
    this.text_paint.set_alpha(255);
    this.text_paint.set_paint_align(this.text_paint.align.LEFT);
    /* This paint is used for drawing the icons that the component is comprised of. */
    this.hover_paint = new Paint();
    this.hover_paint.set_paint_style(this.hover_paint.style.FILL);
    this.hover_paint.set_paint_cap(this.hover_paint.cap.ROUND);
    this.hover_paint.set_paint_join(this.hover_paint.join.MITER);
    this.hover_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
    this.hover_paint.set_color(global.GENERAL_CYAN_COLOR);
    this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.hover_paint.set_font(global.DEFAULT_FONT);
    this.hover_paint.set_alpha(192);
    this.hover_paint.set_paint_align(this.hover_paint.align.CENTER);
    /* This paint is used for drawing the "fill" that the component is comprised of. */
    this.bounds_paint = new Paint();
    this.bounds_paint.set_paint_style(this.bounds_paint.style.FILL);
    this.bounds_paint.set_paint_cap(this.bounds_paint.cap.ROUND);
    this.bounds_paint.set_paint_join(this.bounds_paint.join.MITER);
    this.bounds_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.bounds_paint.set_color(global.GENERAL_BOUNDS_COLOR);
    this.bounds_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.bounds_paint.set_font(global.DEFAULT_FONT);
    this.bounds_paint.set_alpha(255);
    this.bounds_paint.set_paint_align(this.bounds_paint.align.CENTER);
    if (global.MOBILE_MODE) {
      this.width = view_port.view_width * 0.2625;
      this.height = view_port.view_height * 0.15;
    } else {
      this.width = view_port.view_width * 0.15;
      this.height = view_port.view_height * 0.075;
    }
    this.bounds = new RectF(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
    this.title_bounds = new Button(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
    this.title_bounds.text = '';
    this.title_bounds.text_paint.set_paint_align(this.title_bounds.text_paint.align.LEFT);
    this.title_bounds.text_paint.set_color(global.GENERAL_WHITE_COLOR);
    this.title_bounds.fill_paint.set_color(global.GENERAL_BLACK_COLOR);
    this.title_bounds.fill_paint.set_alpha(130);
    this.title_bounds.draw_stroke = false;
    this.title_bounds.draw_fill = true;
    this.title_bounds.draw_text = false;
    let padding: number = this.PADDING * this.bounds.get_width();
    let width: number = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
    let height: number = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
    this.okay_button = new Button(this.bounds.right - 2 * padding - 2 * width, this.bounds.bottom - height - padding, this.bounds.right - 2 * padding - width, this.bounds.bottom - padding);
    this.okay_button.text = '';
    this.okay_button.text_paint.set_color(global.GENERAL_WHITE_COLOR);
    this.okay_button.fill_paint.set_color(global.GENERAL_BLACK_COLOR);
    this.okay_button.fill_paint.set_alpha(130);
    this.okay_button.draw_stroke = false;
    this.okay_button.draw_fill = true;
    this.cancel_button = new Button(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
    this.cancel_button.text = '';
    this.cancel_button.text_paint.set_color(global.GENERAL_WHITE_COLOR);
    this.cancel_button.fill_paint.set_color(global.GENERAL_BLACK_COLOR);
    this.cancel_button.fill_paint.set_alpha(130);
    this.cancel_button.draw_stroke = false;
    this.cancel_button.draw_fill = true;
    this.exit_button = new Button(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
    this.exit_button.draw_stroke = true;
    this.exit_button.draw_fill = false;
    this.exit_button.text_paint.set_color(global.GENERAL_WHITE_COLOR);
    this.input_button = new Button(this.title_bounds.left + padding, this.title_bounds.bottom + padding, this.cancel_button.right, this.okay_button.top - padding);
    this.input_button.text = '';
    this.input_button.fill_paint.set_color(global.GENERAL_WHITE_COLOR);
    this.input_button.line_paint.set_color(global.GENERAL_BLACK_COLOR);
    this.input_button.draw_stroke = true;
    this.input_button.draw_fill = true;
    this.input_button.draw_cursor = false;
    this.input_button.draw_text = false;
    this.input_button.text_paint.set_color(global.GENERAL_BLACK_COLOR);
    this.input_button.resize_paint();
    /* This paint is used for drawing the selected portions of text. */
    this.select_paint = new Paint();
    this.select_paint.set_paint_style(this.select_paint.style.FILL);
    this.select_paint.set_paint_cap(this.select_paint.cap.ROUND);
    this.select_paint.set_paint_join(this.select_paint.join.MITER);
    this.select_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
    this.select_paint.set_color(global.GENERAL_CYAN_COLOR);
    this.select_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.select_paint.set_font(global.DEFAULT_FONT);
    this.select_paint.set_alpha(64);
    this.select_paint.set_paint_align(this.select_paint.align.CENTER);
    this.option_index = -1;
    /* Controls where the insert of new characters occur. */
    this.CURSOR_POSITION = 0;
    this.SELECT_ALL = false;
    /* Controls for window dragging. */
    this.OFFSET_X = 0;
    this.OFFSET_Y = 0;
    this.WINDOW_ANCHORED = true;
    this.ANCHOR_X = 0;
    this.ANCHOR_Y = 0;
    /* Enforcing the system from cascading events. */
    this.first_touch_x = 0;
    this.first_touch_y = 0;
    /* Keeps track of the width of the text input. */
    this.measured_text = -1;
    this.INITIAL_CURSOR_DOWN = -1;
    this.SELECT_START = -1;
    this.SELECT_END = -1;
    this.SELECT_WIDTH = -1;
    this.SELECT_OFFSET_X = -1;
    this.MOUSE_DOWN = false;
    this.ASCENDING = false;
  }
  set_title(text: string): void {
    this.title_bounds.text = text;
  }
  set_input_text(text: string): void {
    this.input_button.text = text;
  }
  mouse_down(): void {
    if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
      if (
        this.title_bounds.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
        !this.exit_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y)
      ) {
        this.ANCHOR_X = global.mouse_x - this.OFFSET_X;
        this.ANCHOR_Y = global.mouse_y - this.OFFSET_Y;
        this.WINDOW_ANCHORED = false;
      }
      this.first_touch_x = global.mouse_x;
      this.first_touch_y = global.mouse_y;
      this.INITIAL_CURSOR_DOWN = this.insert_cursor(false, false);
      this.MOUSE_DOWN = true;
    }
  }
  mouse_move(): void {
    if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
      if (!this.WINDOW_ANCHORED) {
        this.OFFSET_X = global.mouse_x - this.ANCHOR_X;
        this.OFFSET_Y = global.mouse_y - this.ANCHOR_Y;
        if (this.bounds.right + this.OFFSET_X >= view_port.right) {
          this.OFFSET_X = view_port.right - this.bounds.right;
        }
        if (this.bounds.left + this.OFFSET_X <= view_port.left) {
          this.OFFSET_X = view_port.left - this.bounds.left;
        }
        if (this.bounds.top + this.OFFSET_Y <= view_port.top) {
          this.OFFSET_Y = view_port.top - this.bounds.top;
        }
        if (global.MOBILE_MODE) {
          if (this.bounds.bottom + this.OFFSET_Y >= on_screen_keyboard.bounds.top) {
            this.OFFSET_Y = on_screen_keyboard.bounds.top - this.bounds.bottom;
          }
        } else {
          if (this.bounds.bottom + this.OFFSET_Y >= view_port.bottom) {
            this.OFFSET_Y = view_port.bottom - this.bounds.bottom;
          }
        }
      } else {
        if (this.MOUSE_DOWN && this.INITIAL_CURSOR_DOWN != -1) {
          this.insert_cursor(true, true);
        }
      }
    }
  }
  mouse_up(): void {
    if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
      if (!global.MOUSE_KEYBOARD_LOCK) {
        if (this.WINDOW_ANCHORED) {
          this.insert_cursor(true, false);
          this.INITIAL_CURSOR_DOWN = -1;
          if (
            !this.bounds.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
            !this.bounds.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)
          ) {
            if (global.MOBILE_MODE) {
              if (!on_screen_keyboard.bounds.contains_xy(global.mouse_x, global.mouse_y)) {
                menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
                menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
                /* Block out the reset selection portion of the code! */
                global.component_touched = true;
                global.MOUSE_KEYBOARD_LOCK = true;
              }
            } else {
              menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
              menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
              /* Block out the reset selection portion of the code! */
              global.component_touched = true;
              global.MOUSE_KEYBOARD_LOCK = true;
            }
          } else if (
            this.okay_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
            this.okay_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)
          ) {
            if (!this.push_property_update()) {
              menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
              menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
            }
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
            global.MOUSE_KEYBOARD_LOCK = true;
          } else if (
            this.cancel_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
            this.cancel_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)
          ) {
            menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
            menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
            global.MOUSE_KEYBOARD_LOCK = true;
          } else if (
            this.exit_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
            this.exit_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)
          ) {
            menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
            menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
            global.MOUSE_KEYBOARD_LOCK = true;
          } else if (
            this.input_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
            this.input_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)
          ) {
            if (this.SELECT_ALL) {
              if (this.SELECT_ALL && !global.MOUSE_DOUBLE_CLICK_EVENT) {
                this.SELECT_ALL = false;
              }
            }
          }
        } else {
          this.ANCHOR_X = global.mouse_x - this.OFFSET_X;
          this.ANCHOR_Y = global.mouse_y - this.OFFSET_Y;
        }
        this.WINDOW_ANCHORED = true;
        this.MOUSE_DOWN = false;
      }
    }
  }
  insert_cursor(is_mouse_up: boolean, is_mouse_move: boolean): number {
    /* Figuring out where the cursor should go. */
    let min: number = this.input_button.get_center_x() - this.measured_text * 0.5;
    let max: number = this.input_button.get_center_x() + this.measured_text * 0.5;
    let remapped_x: number = global.mouse_x - this.OFFSET_X;
    let remapped_y: number = global.mouse_y - this.OFFSET_Y;
    if (remapped_x <= min) {
      remapped_x = min;
    }
    if (remapped_x >= max) {
      remapped_x = max;
    }
    let width: number = max - min;
    let char_length: number = (this.input_button.text.substring(0, this.CURSOR_POSITION) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length)).length;
    let percent: number = (remapped_x - min) / width;
    let insert_at: number = Math.ceil(percent * char_length);
    if (is_mouse_up && this.input_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)) {
      /* Only update cursor position on mouse up. We will use mouse move to make it possible to update the highlight when the mouse is moving.*/
      if (!is_mouse_move) {
        /* Assign the cursor position to the calculated insert. */
        this.CURSOR_POSITION = insert_at;
      }
      /* Make sure initial cursor down is calculated. */
      if (this.INITIAL_CURSOR_DOWN != -1 && insert_at != this.INITIAL_CURSOR_DOWN) {
        if (this.INITIAL_CURSOR_DOWN < insert_at) {
          this.ASCENDING = true;
        } else {
          this.ASCENDING = false;
        }
        this.SELECT_START = Math.min(insert_at, this.INITIAL_CURSOR_DOWN);
        this.SELECT_END = Math.max(insert_at, this.INITIAL_CURSOR_DOWN);
      } else {
        this.SELECT_START = -1;
        this.SELECT_END = -1;
      }
    }
    return insert_at;
  }
  key_down(key_event: KEY_EVENT_T): void {
    if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
      if (!global.MOUSE_KEYBOARD_LOCK) {
        this.handle_keyboard(key_event);
      }
    }
  }
  key_up(key_event: KEY_EVENT_T): void {
    if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
    }
  }
  /* Handle the user's input! */
  handle_keyboard(key_event: KEY_EVENT_T): void {
    if (!this.special_type(global.selected_type)) {
      if (global.is_valid_si_units(key_event) && key_event['event'].code != global.KEY_CODE_DELETE && !key_event['ctrl']) {
        if (this.input_button.text.length < global.MAX_TEXT_LENGTH) {
          if (!this.SELECT_ALL) {
            if (this.SELECT_START != -1 && this.SELECT_END != -1) {
              this.handle_partial_select();
            }
            this.input_button.text =
              this.input_button.text.substring(0, this.CURSOR_POSITION) + global.decode_key(key_event) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
            if (this.CURSOR_POSITION < this.input_button.text.length) {
              this.CURSOR_POSITION++;
            }
          } else {
            this.input_button.text = '';
            this.CURSOR_POSITION = 0;
            this.SELECT_ALL = false;
            this.input_button.text =
              this.input_button.text.substring(0, this.CURSOR_POSITION) + global.decode_key(key_event) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
            if (this.CURSOR_POSITION < this.input_button.text.length) {
              this.CURSOR_POSITION++;
            }
          }
        } else {
          if (this.SELECT_ALL) {
            this.input_button.text = '';
            this.CURSOR_POSITION = 0;
            this.SELECT_ALL = false;
            this.input_button.text =
              this.input_button.text.substring(0, this.CURSOR_POSITION) + global.decode_key(key_event) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
            if (this.CURSOR_POSITION < this.input_button.text.length) {
              this.CURSOR_POSITION++;
            }
          }
        }
      } else if (key_event['event'].code === global.KEY_CODE_BACKSPACE && !key_event['ctrl']) {
        if (this.input_button.text.length > 0) {
          if (!this.SELECT_ALL) {
            if (this.SELECT_START === this.SELECT_END) {
              this.SELECT_START = -1;
              this.SELECT_END = -1;
            }
            if (this.SELECT_START != -1 && this.SELECT_END != -1) {
              this.handle_partial_select();
            } else {
              this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION - 1) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION > 0) {
                this.CURSOR_POSITION--;
              }
            }
          } else {
            this.input_button.text = '';
            this.CURSOR_POSITION = 0;
            this.SELECT_ALL = false;
          }
        }
      } else if (key_event['event'].code === global.KEY_CODE_DELETE && !key_event['ctrl']) {
        if (this.input_button.text.length > 0) {
          if (!this.SELECT_ALL) {
            if (this.SELECT_START === this.SELECT_END) {
              this.SELECT_START = -1;
              this.SELECT_END = -1;
            }
            if (this.SELECT_START != -1 && this.SELECT_END != -1) {
              this.handle_partial_select();
            } else {
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + this.input_button.text.substring(this.CURSOR_POSITION + 1, this.input_button.text.length);
              }
            }
          } else {
            this.input_button.text = '';
            this.CURSOR_POSITION = 0;
            this.SELECT_ALL = false;
          }
        }
      } else if ((key_event['event'].code === global.KEY_CODE_MINUS || key_event['event'].code === global.KEY_CODE_NUMPAD_MINUS) && !key_event['shift']) {
        if (this.input_button.text.length < global.MAX_TEXT_LENGTH) {
          if (!this.SELECT_ALL) {
            if (this.SELECT_START != -1 && this.SELECT_END != -1) {
              this.handle_partial_select();
            }
            this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '-' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
            if (this.CURSOR_POSITION < this.input_button.text.length) {
              this.CURSOR_POSITION++;
            }
          } else {
            this.input_button.text = '';
            this.CURSOR_POSITION = 0;
            this.SELECT_ALL = false;
            this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '-' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
            if (this.CURSOR_POSITION < this.input_button.text.length) {
              this.CURSOR_POSITION++;
            }
          }
        }
      } else if (key_event['event'].code === global.KEY_CODE_PERIOD && !key_event['shift'] && !key_event['ctrl']) {
        if (this.input_button.text.length < global.MAX_TEXT_LENGTH) {
          if (!this.SELECT_ALL) {
            if (this.SELECT_START != -1 && this.SELECT_END != -1) {
              this.handle_partial_select();
            }
            this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '.' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
            if (this.CURSOR_POSITION < this.input_button.text.length) {
              this.CURSOR_POSITION++;
            }
          } else {
            this.input_button.text = '';
            this.CURSOR_POSITION = 0;
            this.SELECT_ALL = false;
            this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '.' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
            if (this.CURSOR_POSITION < this.input_button.text.length) {
              this.CURSOR_POSITION++;
            }
          }
        }
      } else if (key_event['event'].code === global.KEY_CODE_ENTER && !key_event['ctrl']) {
        if (!this.push_property_update()) {
          menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
          menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
        }
      } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT && !key_event['ctrl']) {
        if (key_event['shift'] === false) {
          this.SELECT_START = -1;
          this.SELECT_END = -1;
          if (this.CURSOR_POSITION > 0) {
            this.CURSOR_POSITION--;
            this.SELECT_ALL = false;
          }
        } else {
          if (this.SELECT_START === -1 && this.SELECT_END === -1) {
            this.SELECT_START = this.CURSOR_POSITION - 1;
            this.SELECT_END = this.CURSOR_POSITION;
            if (this.SELECT_START < 0) {
              this.SELECT_START = 0;
              this.SELECT_END = 0;
            }
            this.CURSOR_POSITION = this.SELECT_START;
            this.ASCENDING = false;
          } else {
            if (this.ASCENDING) {
              if (this.SELECT_END > 0) {
                this.SELECT_END--;
                this.CURSOR_POSITION = this.SELECT_END;
              }
            } else {
              if (this.SELECT_START > 0) {
                this.SELECT_START--;
                this.CURSOR_POSITION = this.SELECT_START;
              }
            }
          }
        }
      } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT && !key_event['ctrl']) {
        if (key_event['shift'] === false) {
          this.SELECT_START = -1;
          this.SELECT_END = -1;
          if (this.CURSOR_POSITION < this.input_button.text.length) {
            this.CURSOR_POSITION++;
            this.SELECT_ALL = false;
          }
        } else {
          if (this.SELECT_START === -1 && this.SELECT_END === -1) {
            this.SELECT_START = this.CURSOR_POSITION;
            this.SELECT_END = this.CURSOR_POSITION + 1;
            if (this.CURSOR_POSITION >= this.input_button.text.length) {
              this.SELECT_START = this.CURSOR_POSITION;
              this.SELECT_END = this.CURSOR_POSITION;
            }
            this.CURSOR_POSITION = this.SELECT_END;
            this.ASCENDING = true;
          } else {
            if (this.ASCENDING) {
              if (this.SELECT_END < this.input_button.text.length) {
                this.SELECT_END++;
                this.CURSOR_POSITION = this.SELECT_END;
              }
            } else {
              if (this.SELECT_START < this.input_button.text.length) {
                this.SELECT_START++;
                this.CURSOR_POSITION = this.SELECT_START;
              }
            }
          }
        }
      } else if (key_event['event'].code === global.KEY_CODE_ESCAPE && !key_event['ctrl']) {
        menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
        menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
      } else if (key_event['event'].code === global.KEY_CODE_HOME) {
        if (key_event['shift'] === false) {
          this.SELECT_START = -1;
          this.SELECT_END = -1;
          this.CURSOR_POSITION = 0;
          this.SELECT_ALL = false;
        } else {
          if (this.SELECT_START === -1 && this.SELECT_END === -1) {
            this.SELECT_ALL = false;
            this.SELECT_START = 0;
            this.SELECT_END = this.CURSOR_POSITION;
            if (this.SELECT_START < 0) {
              this.SELECT_START = 0;
              this.SELECT_END = 0;
            }
            this.CURSOR_POSITION = this.SELECT_START;
            this.ASCENDING = false;
          } else {
            if (this.ASCENDING) {
              this.SELECT_ALL = false;
              if (this.SELECT_END > 0) {
                this.SELECT_END = 0;
                this.CURSOR_POSITION = this.SELECT_END;
              }
            } else {
              this.SELECT_ALL = false;
              if (this.SELECT_START > 0) {
                this.SELECT_START = 0;
                this.CURSOR_POSITION = this.SELECT_START;
              }
            }
          }
        }
      } else if (key_event['event'].code === global.KEY_CODE_END && !key_event['ctrl']) {
        if (key_event['shift'] === false) {
          this.reset_cursor();
        } else {
          if (this.SELECT_START === -1 && this.SELECT_END === -1) {
            this.SELECT_ALL = false;
            this.SELECT_START = this.CURSOR_POSITION;
            this.SELECT_END = this.input_button.text.length;
            if (this.CURSOR_POSITION >= this.input_button.text.length) {
              this.SELECT_START = this.CURSOR_POSITION;
              this.SELECT_END = this.CURSOR_POSITION;
            }
            this.CURSOR_POSITION = this.SELECT_END;
            this.ASCENDING = true;
          } else {
            if (this.ASCENDING) {
              this.SELECT_ALL = false;
              if (this.SELECT_END < this.input_button.text.length) {
                this.SELECT_END = this.input_button.text.length;
                this.CURSOR_POSITION = this.SELECT_END;
              }
            } else {
              this.SELECT_ALL = false;
              if (this.SELECT_START < this.input_button.text.length) {
                this.SELECT_START = this.input_button.text.length;
                this.CURSOR_POSITION = this.SELECT_START;
              }
            }
          }
        }
      } else if (key_event['event'].code === global.KEY_CODE_A && key_event['ctrl'] === true) {
        this.SELECT_ALL = false;
        this.SELECT_START = 0;
        this.ASCENDING = true;
        this.SELECT_END = this.input_button.text.length;
        this.CURSOR_POSITION = this.input_button.text.length;
      }
    } else {
      if (global.selected_type === global.TYPE_NOTE) {
        if (global.is_alpha_numeric_note(key_event) && key_event['event'].code != global.KEY_CODE_DELETE && !key_event['ctrl']) {
          if (this.input_button.text.length < global.MAX_TEXT_LENGTH) {
            if (!this.SELECT_ALL) {
              if (this.SELECT_START != -1 && this.SELECT_END != -1) {
                this.handle_partial_select();
              }
              this.input_button.text =
                this.input_button.text.substring(0, this.CURSOR_POSITION) + global.decode_key(key_event) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            } else {
              this.input_button.text = '';
              this.CURSOR_POSITION = 0;
              this.SELECT_ALL = false;
              this.input_button.text =
                this.input_button.text.substring(0, this.CURSOR_POSITION) + global.decode_key(key_event) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            }
          } else {
            if (this.SELECT_ALL) {
              this.input_button.text = '';
              this.CURSOR_POSITION = 0;
              this.SELECT_ALL = false;
              this.input_button.text =
                this.input_button.text.substring(0, this.CURSOR_POSITION) + global.decode_key(key_event) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_BACKSPACE && !key_event['ctrl']) {
          if (this.input_button.text.length > 0) {
            if (!this.SELECT_ALL) {
              if (this.SELECT_START === this.SELECT_END) {
                this.SELECT_START = -1;
                this.SELECT_END = -1;
              }
              if (this.SELECT_START != -1 && this.SELECT_END != -1) {
                this.handle_partial_select();
              } else {
                this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION - 1) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
                if (this.CURSOR_POSITION > 0) {
                  this.CURSOR_POSITION--;
                }
              }
            } else {
              this.input_button.text = '';
              this.CURSOR_POSITION = 0;
              this.SELECT_ALL = false;
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_DELETE && !key_event['ctrl']) {
          if (this.input_button.text.length > 0) {
            if (!this.SELECT_ALL) {
              if (this.SELECT_START === this.SELECT_END) {
                this.SELECT_START = -1;
                this.SELECT_END = -1;
              }
              if (this.SELECT_START != -1 && this.SELECT_END != -1) {
                this.handle_partial_select();
              } else {
                if (this.CURSOR_POSITION < this.input_button.text.length) {
                  this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + this.input_button.text.substring(this.CURSOR_POSITION + 1, this.input_button.text.length);
                }
              }
            } else {
              this.input_button.text = '';
              this.CURSOR_POSITION = 0;
              this.SELECT_ALL = false;
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_MINUS || key_event['event'].code === global.KEY_CODE_NUMPAD_MINUS) {
          if (this.input_button.text.length < global.MAX_TEXT_LENGTH) {
            if (!this.SELECT_ALL) {
              if (this.SELECT_START != -1 && this.SELECT_END != -1) {
                this.handle_partial_select();
              }
              this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '-' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            } else {
              this.input_button.text = '';
              this.CURSOR_POSITION = 0;
              this.SELECT_ALL = false;
              this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '-' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_PERIOD && !key_event['shift'] && !key_event['ctrl']) {
          if (this.input_button.text.length < global.MAX_TEXT_LENGTH) {
            if (!this.SELECT_ALL) {
              if (this.SELECT_START != -1 && this.SELECT_END != -1) {
                this.handle_partial_select();
              }
              this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '.' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            } else {
              this.input_button.text = '';
              this.CURSOR_POSITION = 0;
              this.SELECT_ALL = false;
              this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '.' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_ENTER && !key_event['ctrl']) {
          if (!this.push_property_update()) {
            menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
            menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT && !key_event['ctrl']) {
          if (key_event['shift'] === false) {
            this.SELECT_START = -1;
            this.SELECT_END = -1;
            if (this.CURSOR_POSITION > 0) {
              this.CURSOR_POSITION--;
              this.SELECT_ALL = false;
            }
          } else {
            if (this.SELECT_START === -1 && this.SELECT_END === -1) {
              this.SELECT_START = this.CURSOR_POSITION - 1;
              this.SELECT_END = this.CURSOR_POSITION;
              if (this.SELECT_START < 0) {
                this.SELECT_START = 0;
                this.SELECT_END = 0;
              }
              this.CURSOR_POSITION = this.SELECT_START;
              this.ASCENDING = false;
            } else {
              if (this.ASCENDING) {
                if (this.SELECT_END > 0) {
                  this.SELECT_END--;
                  this.CURSOR_POSITION = this.SELECT_END;
                }
              } else {
                if (this.SELECT_START > 0) {
                  this.SELECT_START--;
                  this.CURSOR_POSITION = this.SELECT_START;
                }
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT && !key_event['ctrl']) {
          if (key_event['shift'] === false) {
            this.SELECT_START = -1;
            this.SELECT_END = -1;
            if (this.CURSOR_POSITION < this.input_button.text.length) {
              this.CURSOR_POSITION++;
              this.SELECT_ALL = false;
            }
          } else {
            if (this.SELECT_START === -1 && this.SELECT_END === -1) {
              this.SELECT_START = this.CURSOR_POSITION;
              this.SELECT_END = this.CURSOR_POSITION + 1;
              if (this.CURSOR_POSITION >= this.input_button.text.length) {
                this.SELECT_START = this.CURSOR_POSITION;
                this.SELECT_END = this.CURSOR_POSITION;
              }
              this.CURSOR_POSITION = this.SELECT_END;
              this.ASCENDING = true;
            } else {
              if (this.ASCENDING) {
                if (this.SELECT_END < this.input_button.text.length) {
                  this.SELECT_END++;
                  this.CURSOR_POSITION = this.SELECT_END;
                }
              } else {
                if (this.SELECT_START < this.input_button.text.length) {
                  this.SELECT_START++;
                  this.CURSOR_POSITION = this.SELECT_START;
                }
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_ESCAPE && !key_event['ctrl']) {
          menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
          menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
        } else if (key_event['event'].code === global.KEY_CODE_HOME) {
          if (key_event['shift'] === false) {
            this.SELECT_START = -1;
            this.SELECT_END = -1;
            this.CURSOR_POSITION = 0;
            this.SELECT_ALL = false;
          } else {
            if (this.SELECT_START === -1 && this.SELECT_END === -1) {
              this.SELECT_ALL = false;
              this.SELECT_START = 0;
              this.SELECT_END = this.CURSOR_POSITION;
              if (this.SELECT_START < 0) {
                this.SELECT_START = 0;
                this.SELECT_END = 0;
              }
              this.CURSOR_POSITION = this.SELECT_START;
              this.ASCENDING = false;
            } else {
              if (this.ASCENDING) {
                this.SELECT_ALL = false;
                if (this.SELECT_END > 0) {
                  this.SELECT_END = 0;
                  this.CURSOR_POSITION = this.SELECT_END;
                }
              } else {
                this.SELECT_ALL = false;
                if (this.SELECT_START > 0) {
                  this.SELECT_START = 0;
                  this.CURSOR_POSITION = this.SELECT_START;
                }
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_END && !key_event['ctrl']) {
          if (key_event['shift'] === false) {
            this.reset_cursor();
          } else {
            if (this.SELECT_START === -1 && this.SELECT_END === -1) {
              this.SELECT_ALL = false;
              this.SELECT_START = this.CURSOR_POSITION;
              this.SELECT_END = this.input_button.text.length;
              if (this.CURSOR_POSITION >= this.input_button.text.length) {
                this.SELECT_START = this.CURSOR_POSITION;
                this.SELECT_END = this.CURSOR_POSITION;
              }
              this.CURSOR_POSITION = this.SELECT_END;
              this.ASCENDING = true;
            } else {
              if (this.ASCENDING) {
                this.SELECT_ALL = false;
                if (this.SELECT_END < this.input_button.text.length) {
                  this.SELECT_END = this.input_button.text.length;
                  this.CURSOR_POSITION = this.SELECT_END;
                }
              } else {
                this.SELECT_ALL = false;
                if (this.SELECT_START < this.input_button.text.length) {
                  this.SELECT_START = this.input_button.text.length;
                  this.CURSOR_POSITION = this.SELECT_START;
                }
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_A && key_event['ctrl'] === true) {
          this.SELECT_ALL = false;
          this.SELECT_START = 0;
          this.ASCENDING = true;
          this.SELECT_END = this.input_button.text.length;
          this.CURSOR_POSITION = this.input_button.text.length;
        }
      } else if (global.selected_type === global.TYPE_NET) {
        if (global.is_alpha_numeric(key_event) && key_event['event'].code != global.KEY_CODE_DELETE && !key_event['ctrl']) {
          if (this.input_button.text.length < global.MAX_TEXT_LENGTH) {
            if (!this.SELECT_ALL) {
              if (this.SELECT_START != -1 && this.SELECT_END != -1) {
                this.handle_partial_select();
              }
              this.input_button.text =
                this.input_button.text.substring(0, this.CURSOR_POSITION) + global.decode_key(key_event) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            } else {
              this.input_button.text = '';
              this.CURSOR_POSITION = 0;
              this.SELECT_ALL = false;
              this.input_button.text =
                this.input_button.text.substring(0, this.CURSOR_POSITION) + global.decode_key(key_event) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            }
          } else {
            if (this.SELECT_ALL) {
              this.input_button.text = '';
              this.CURSOR_POSITION = 0;
              this.SELECT_ALL = false;
              this.input_button.text =
                this.input_button.text.substring(0, this.CURSOR_POSITION) + global.decode_key(key_event) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_BACKSPACE && !key_event['ctrl']) {
          if (this.input_button.text.length > 0) {
            if (!this.SELECT_ALL) {
              if (this.SELECT_START === this.SELECT_END) {
                this.SELECT_START = -1;
                this.SELECT_END = -1;
              }
              if (this.SELECT_START != -1 && this.SELECT_END != -1) {
                this.handle_partial_select();
              } else {
                this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION - 1) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
                if (this.CURSOR_POSITION > 0) {
                  this.CURSOR_POSITION--;
                }
              }
            } else {
              this.input_button.text = '';
              this.CURSOR_POSITION = 0;
              this.SELECT_ALL = false;
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_DELETE && !key_event['ctrl']) {
          if (this.input_button.text.length > 0) {
            if (!this.SELECT_ALL) {
              if (this.SELECT_START === this.SELECT_END) {
                this.SELECT_START = -1;
                this.SELECT_END = -1;
              }
              if (this.SELECT_START != -1 && this.SELECT_END != -1) {
                this.handle_partial_select();
              } else {
                if (this.CURSOR_POSITION < this.input_button.text.length) {
                  this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + this.input_button.text.substring(this.CURSOR_POSITION + 1, this.input_button.text.length);
                }
              }
            } else {
              this.input_button.text = '';
              this.CURSOR_POSITION = 0;
              this.SELECT_ALL = false;
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_MINUS || key_event['event'].code === global.KEY_CODE_NUMPAD_MINUS) {
          if (this.input_button.text.length < global.MAX_TEXT_LENGTH) {
            if (!this.SELECT_ALL) {
              if (this.SELECT_START != -1 && this.SELECT_END != -1) {
                this.handle_partial_select();
              }
              this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '-' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            } else {
              this.input_button.text = '';
              this.CURSOR_POSITION = 0;
              this.SELECT_ALL = false;
              this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '-' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_PERIOD && !key_event['shift'] && !key_event['ctrl']) {
          if (this.input_button.text.length < global.MAX_TEXT_LENGTH) {
            if (!this.SELECT_ALL) {
              if (this.SELECT_START != -1 && this.SELECT_END != -1) {
                this.handle_partial_select();
              }
              this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '.' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            } else {
              this.input_button.text = '';
              this.CURSOR_POSITION = 0;
              this.SELECT_ALL = false;
              this.input_button.text = this.input_button.text.substring(0, this.CURSOR_POSITION) + '.' + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
              if (this.CURSOR_POSITION < this.input_button.text.length) {
                this.CURSOR_POSITION++;
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_ENTER && !key_event['ctrl']) {
          if (!this.push_property_update()) {
            menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
            menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_LEFT && !key_event['ctrl']) {
          if (key_event['shift'] === false) {
            this.SELECT_START = -1;
            this.SELECT_END = -1;
            if (this.CURSOR_POSITION > 0) {
              this.CURSOR_POSITION--;
              this.SELECT_ALL = false;
            }
          } else {
            if (this.SELECT_START === -1 && this.SELECT_END === -1) {
              this.SELECT_START = this.CURSOR_POSITION - 1;
              this.SELECT_END = this.CURSOR_POSITION;
              if (this.SELECT_START < 0) {
                this.SELECT_START = 0;
                this.SELECT_END = 0;
              }
              this.CURSOR_POSITION = this.SELECT_START;
              this.ASCENDING = false;
            } else {
              if (this.ASCENDING) {
                if (this.SELECT_END > 0) {
                  this.SELECT_END--;
                  this.CURSOR_POSITION = this.SELECT_END;
                }
              } else {
                if (this.SELECT_START > 0) {
                  this.SELECT_START--;
                  this.CURSOR_POSITION = this.SELECT_START;
                }
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_ARROW_RIGHT && !key_event['ctrl']) {
          if (key_event['shift'] === false) {
            this.SELECT_START = -1;
            this.SELECT_END = -1;
            if (this.CURSOR_POSITION < this.input_button.text.length) {
              this.CURSOR_POSITION++;
              this.SELECT_ALL = false;
            }
          } else {
            if (this.SELECT_START === -1 && this.SELECT_END === -1) {
              this.SELECT_START = this.CURSOR_POSITION;
              this.SELECT_END = this.CURSOR_POSITION + 1;
              if (this.CURSOR_POSITION >= this.input_button.text.length) {
                this.SELECT_START = this.CURSOR_POSITION;
                this.SELECT_END = this.CURSOR_POSITION;
              }
              this.CURSOR_POSITION = this.SELECT_END;
              this.ASCENDING = true;
            } else {
              if (this.ASCENDING) {
                if (this.SELECT_END < this.input_button.text.length) {
                  this.SELECT_END++;
                  this.CURSOR_POSITION = this.SELECT_END;
                }
              } else {
                if (this.SELECT_START < this.input_button.text.length) {
                  this.SELECT_START++;
                  this.CURSOR_POSITION = this.SELECT_START;
                }
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_ESCAPE && !key_event['ctrl']) {
          menu_bar.handle_element_options_edit_flag(!global.FLAG_ELEMENT_OPTIONS_EDIT);
          menu_bar.handle_element_options_flag(!global.FLAG_ELEMENT_OPTIONS);
        } else if (key_event['event'].code === global.KEY_CODE_HOME) {
          if (key_event['shift'] === false) {
            this.SELECT_START = -1;
            this.SELECT_END = -1;
            this.CURSOR_POSITION = 0;
            this.SELECT_ALL = false;
          } else {
            if (this.SELECT_START === -1 && this.SELECT_END === -1) {
              this.SELECT_ALL = false;
              this.SELECT_START = 0;
              this.SELECT_END = this.CURSOR_POSITION;
              if (this.SELECT_START < 0) {
                this.SELECT_START = 0;
                this.SELECT_END = 0;
              }
              this.CURSOR_POSITION = this.SELECT_START;
              this.ASCENDING = false;
            } else {
              if (this.ASCENDING) {
                this.SELECT_ALL = false;
                if (this.SELECT_END > 0) {
                  this.SELECT_END = 0;
                  this.CURSOR_POSITION = this.SELECT_END;
                }
              } else {
                this.SELECT_ALL = false;
                if (this.SELECT_START > 0) {
                  this.SELECT_START = 0;
                  this.CURSOR_POSITION = this.SELECT_START;
                }
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_END && !key_event['ctrl']) {
          if (key_event['shift'] === false) {
            this.reset_cursor();
          } else {
            if (this.SELECT_START === -1 && this.SELECT_END === -1) {
              this.SELECT_ALL = false;
              this.SELECT_START = this.CURSOR_POSITION;
              this.SELECT_END = this.input_button.text.length;
              if (this.CURSOR_POSITION >= this.input_button.text.length) {
                this.SELECT_START = this.CURSOR_POSITION;
                this.SELECT_END = this.CURSOR_POSITION;
              }
              this.CURSOR_POSITION = this.SELECT_END;
              this.ASCENDING = true;
            } else {
              if (this.ASCENDING) {
                this.SELECT_ALL = false;
                if (this.SELECT_END < this.input_button.text.length) {
                  this.SELECT_END = this.input_button.text.length;
                  this.CURSOR_POSITION = this.SELECT_END;
                }
              } else {
                this.SELECT_ALL = false;
                if (this.SELECT_START < this.input_button.text.length) {
                  this.SELECT_START = this.input_button.text.length;
                  this.CURSOR_POSITION = this.SELECT_START;
                }
              }
            }
          }
        } else if (key_event['event'].code === global.KEY_CODE_A && key_event['ctrl'] === true) {
          this.SELECT_ALL = false;
          this.SELECT_START = 0;
          this.ASCENDING = true;
          this.SELECT_END = this.input_button.text.length;
          this.CURSOR_POSITION = this.input_button.text.length;
        }
      }
    }
  }
  /* Text based classes (i.e., net, note)*/
  special_type(elm_type: number): boolean {
    if (elm_type === global.TYPE_NET || elm_type === global.TYPE_NOTE) {
      return true;
    }
    return false;
  }
  push_property_update(): boolean {
    let ERROR_FLAG: boolean = false;
    /* #INSERT_GENERATE_ELEMENT_UPDATE_PROPERTY# */
    /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
    if (global.selected_type === global.TYPE_RESISTOR) {
      var index: number = -1;
      index = engine_functions.get_resistor(global.selected_id);
      if (index < resistors.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          resistors[index].elm.properties[resistors[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_CAPACITOR) {
      var index: number = -1;
      index = engine_functions.get_capacitor(global.selected_id);
      if (index < capacitors.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          capacitors[index].elm.properties[capacitors[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }

        /* Conservation of energy */
        if (capacitors[index].elm.properties['options'][this.option_index] === 'Capacitance') {
          capacitors[index].conserve_energy();
        }
      }
    } else if (global.selected_type === global.TYPE_INDUCTOR) {
      var index: number = -1;
      index = engine_functions.get_inductor(global.selected_id);
      if (index < inductors.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          inductors[index].elm.properties[inductors[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }

        /* Conservation of energy */
        if (inductors[index].elm.properties['options'][this.option_index] === 'Inductance') {
          inductors[index].conserve_energy();
        }
      }
    } else if (global.selected_type === global.TYPE_GROUND) {
      var index: number = -1;
      index = engine_functions.get_ground(global.selected_id);
      if (index < grounds.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          grounds[index].elm.properties[grounds[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_DCSOURCE) {
      var index: number = -1;
      index = engine_functions.get_dcsource(global.selected_id);
      if (index < dcsources.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          dcsources[index].elm.properties[dcsources[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_DCCURRENT) {
      var index: number = -1;
      index = engine_functions.get_dccurrent(global.selected_id);
      if (index < dccurrents.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          dccurrents[index].elm.properties[dccurrents[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_ACSOURCE) {
      var index: number = -1;
      index = engine_functions.get_acsource(global.selected_id);
      if (index < acsources.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          acsources[index].elm.properties[acsources[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_ACCURRENT) {
      var index: number = -1;
      index = engine_functions.get_accurrent(global.selected_id);
      if (index < accurrents.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          accurrents[index].elm.properties[accurrents[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_SQUAREWAVE) {
      var index: number = -1;
      index = engine_functions.get_squarewave(global.selected_id);
      if (index < squarewaves.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          squarewaves[index].elm.properties[squarewaves[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_SAW) {
      var index: number = -1;
      index = engine_functions.get_sawwave(global.selected_id);
      if (index < sawwaves.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          sawwaves[index].elm.properties[sawwaves[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_TRI) {
      var index: number = -1;
      index = engine_functions.get_trianglewave(global.selected_id);
      if (index < trianglewaves.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          trianglewaves[index].elm.properties[trianglewaves[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_CONSTANT) {
      var index: number = -1;
      index = engine_functions.get_constant(global.selected_id);
      if (index < constants.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          constants[index].elm.properties[constants[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_NET) {
      var index: number = -1;
      index = engine_functions.get_net(global.selected_id);
      if (index < nets.length) {
        let value: number = global.copy(this.input_button.text);
        global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
        //@ts-expect-error
        nets[index].elm.properties[nets[index].elm.properties['options'][this.option_index]] = value;
      }
    } else if (global.selected_type === global.TYPE_NOTE) {
      var index: number = -1;
      index = engine_functions.get_note(global.selected_id);
      if (index < notes.length) {
        let value: number = global.copy(this.input_button.text);
        global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
        //@ts-expect-error
        notes[index].elm.properties[notes[index].elm.properties['options'][this.option_index]] = value;
      }
    } else if (global.selected_type === global.TYPE_RAIL) {
      var index: number = -1;
      index = engine_functions.get_rail(global.selected_id);
      if (index < rails.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          rails[index].elm.properties[rails[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_VOLTMETER) {
      var index: number = -1;
      index = engine_functions.get_voltmeter(global.selected_id);
      if (index < voltmeters.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          voltmeters[index].elm.properties[voltmeters[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_OHMMETER) {
      var index: number = -1;
      index = engine_functions.get_ohmmeter(global.selected_id);
      if (index < ohmmeters.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          ohmmeters[index].elm.properties[ohmmeters[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_AMMETER) {
      var index: number = -1;
      index = engine_functions.get_ammeter(global.selected_id);
      if (index < ammeters.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          ammeters[index].elm.properties[ammeters[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_WATTMETER) {
      var index: number = -1;
      index = engine_functions.get_wattmeter(global.selected_id);
      if (index < wattmeters.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          wattmeters[index].elm.properties[wattmeters[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_FUSE) {
      var index: number = -1;
      index = engine_functions.get_fuse(global.selected_id);
      if (index < fuses.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          fuses[index].elm.properties[fuses[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_SPST) {
      var index: number = -1;
      index = engine_functions.get_spst(global.selected_id);
      if (index < spsts.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          spsts[index].elm.properties[spsts[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_SPDT) {
      var index: number = -1;
      index = engine_functions.get_spdt(global.selected_id);
      if (index < spdts.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          spdts[index].elm.properties[spdts[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_NOT) {
      var index: number = -1;
      index = engine_functions.get_not(global.selected_id);
      if (index < nots.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          nots[index].elm.properties[nots[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_DIODE) {
      var index: number = -1;
      index = engine_functions.get_diode(global.selected_id);
      if (index < diodes.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          diodes[index].elm.properties[diodes[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_LED) {
      var index: number = -1;
      index = engine_functions.get_led(global.selected_id);
      if (index < leds.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          leds[index].elm.properties[leds[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_ZENER) {
      var index: number = -1;
      index = engine_functions.get_zener(global.selected_id);
      if (index < zeners.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          zeners[index].elm.properties[zeners[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_POTENTIOMETER) {
      var index: number = -1;
      index = engine_functions.get_potentiometer(global.selected_id);
      if (index < potentiometers.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          potentiometers[index].elm.properties[potentiometers[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_AND) {
      var index: number = -1;
      index = engine_functions.get_and(global.selected_id);
      if (index < ands.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          ands[index].elm.properties[ands[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_OR) {
      var index: number = -1;
      index = engine_functions.get_or(global.selected_id);
      if (index < ors.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          ors[index].elm.properties[ors[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_NAND) {
      var index: number = -1;
      index = engine_functions.get_nand(global.selected_id);
      if (index < nands.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          nands[index].elm.properties[nands[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_NOR) {
      var index: number = -1;
      index = engine_functions.get_nor(global.selected_id);
      if (index < nors.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          nors[index].elm.properties[nors[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_XOR) {
      var index: number = -1;
      index = engine_functions.get_xor(global.selected_id);
      if (index < xors.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          xors[index].elm.properties[xors[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_XNOR) {
      var index: number = -1;
      index = engine_functions.get_xnor(global.selected_id);
      if (index < xnors.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          xnors[index].elm.properties[xnors[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_DFF) {
      var index: number = -1;
      index = engine_functions.get_dff(global.selected_id);
      if (index < dffs.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          dffs[index].elm.properties[dffs[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_VSAT) {
      var index: number = -1;
      index = engine_functions.get_vsat(global.selected_id);
      if (index < vsats.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          vsats[index].elm.properties[vsats[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_ADD) {
      var index: number = -1;
      index = engine_functions.get_adder(global.selected_id);
      if (index < adders.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          adders[index].elm.properties[adders[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_SUB) {
      var index: number = -1;
      index = engine_functions.get_subtractor(global.selected_id);
      if (index < subtractors.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          subtractors[index].elm.properties[subtractors[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_MUL) {
      var index: number = -1;
      index = engine_functions.get_multiplier(global.selected_id);
      if (index < multipliers.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          multipliers[index].elm.properties[multipliers[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_DIV) {
      var index: number = -1;
      index = engine_functions.get_divider(global.selected_id);
      if (index < dividers.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          dividers[index].elm.properties[dividers[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_GAIN) {
      var index: number = -1;
      index = engine_functions.get_gain(global.selected_id);
      if (index < gains.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          gains[index].elm.properties[gains[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_ABS) {
      var index: number = -1;
      index = engine_functions.get_absval(global.selected_id);
      if (index < absvals.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          absvals[index].elm.properties[absvals[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_VCSW) {
      var index: number = -1;
      index = engine_functions.get_vcsw(global.selected_id);
      if (index < vcsws.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          vcsws[index].elm.properties[vcsws[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_VCVS) {
      var index: number = -1;
      index = engine_functions.get_vcvs(global.selected_id);
      if (index < vcvss.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          vcvss[index].elm.properties[vcvss[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_VCCS) {
      var index: number = -1;
      index = engine_functions.get_vccs(global.selected_id);
      if (index < vccss.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          vccss[index].elm.properties[vccss[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_CCCS) {
      var index: number = -1;
      index = engine_functions.get_cccs(global.selected_id);
      if (index < cccss.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          cccss[index].elm.properties[cccss[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_CCVS) {
      var index: number = -1;
      index = engine_functions.get_ccvs(global.selected_id);
      if (index < ccvss.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          ccvss[index].elm.properties[ccvss[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_OPAMP) {
      var index: number = -1;
      index = engine_functions.get_opamp(global.selected_id);
      if (index < opamps.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          opamps[index].elm.properties[opamps[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_NMOS) {
      var index: number = -1;
      index = engine_functions.get_nmosfet(global.selected_id);
      if (index < nmosfets.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          nmosfets[index].elm.properties[nmosfets[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_PMOS) {
      var index: number = -1;
      index = engine_functions.get_pmosfet(global.selected_id);
      if (index < pmosfets.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          pmosfets[index].elm.properties[pmosfets[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_NPN) {
      var index: number = -1;
      index = engine_functions.get_npn(global.selected_id);
      if (index < npns.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          npns[index].elm.properties[npns[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_PNP) {
      var index: number = -1;
      index = engine_functions.get_pnp(global.selected_id);
      if (index < pnps.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          pnps[index].elm.properties[pnps[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_ADC) {
      var index: number = -1;
      index = engine_functions.get_adc(global.selected_id);
      if (index < adcs.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          adcs[index].elm.properties[adcs[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_DAC) {
      var index: number = -1;
      index = engine_functions.get_dac(global.selected_id);
      if (index < dacs.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          dacs[index].elm.properties[dacs[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_SAH) {
      var index: number = -1;
      index = engine_functions.get_samplers(global.selected_id);
      if (index < sandhs.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          sandhs[index].elm.properties[sandhs[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_PWM) {
      var index: number = -1;
      index = engine_functions.get_pwm(global.selected_id);
      if (index < pwms.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          pwms[index].elm.properties[pwms[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_INTEGRATOR) {
      var index: number = -1;
      index = engine_functions.get_integrator(global.selected_id);
      if (index < integrators.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          integrators[index].elm.properties[integrators[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
      var index: number = -1;
      index = engine_functions.get_differentiator(global.selected_id);
      if (index < differentiators.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          differentiators[index].elm.properties[differentiators[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_LPF) {
      var index: number = -1;
      index = engine_functions.get_lowpass(global.selected_id);
      if (index < lowpasses.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          lowpasses[index].elm.properties[lowpasses[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_HPF) {
      var index: number = -1;
      index = engine_functions.get_highpass(global.selected_id);
      if (index < highpasses.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          highpasses[index].elm.properties[highpasses[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_REL) {
      var index: number = -1;
      index = engine_functions.get_relay(global.selected_id);
      if (index < relays.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          relays[index].elm.properties[relays[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }

        /* Conservation of energy */
        if (relays[index].elm.properties['options'][this.option_index] === 'Inductance') {
          relays[index].conserve_energy();
        }
      }
    } else if (global.selected_type === global.TYPE_PID) {
      var index: number = -1;
      index = engine_functions.get_pid(global.selected_id);
      if (index < pids.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          pids[index].elm.properties[pids[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_LUT) {
      var index: number = -1;
      index = engine_functions.get_lut(global.selected_id);
      if (index < luts.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          luts[index].elm.properties[luts[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_VCR) {
      var index: number = -1;
      index = engine_functions.get_vcr(global.selected_id);
      if (index < vcrs.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          vcrs[index].elm.properties[vcrs[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_GRT) {
      var index: number = -1;
      index = engine_functions.get_grt(global.selected_id);
      if (index < grts.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          grts[index].elm.properties[grts[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_TPTZ) {
      var index: number = -1;
      index = engine_functions.get_tptz(global.selected_id);
      if (index < tptzs.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          tptzs[index].elm.properties[tptzs[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    } else if (global.selected_type === global.TYPE_TRAN) {
      var index: number = -1;
      index = engine_functions.get_transformer(global.selected_id);
      if (index < transformers.length) {
        let value: number = string_operator.parse(this.input_button.text);
        if (
          Math.abs(value) === 0 ||
          (Math.abs(value) >= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) &&
            Math.abs(value) <= Math.abs(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]))
        ) {
          global.selected_properties[global.selected_properties['options'][this.option_index]] = value;
          //@ts-expect-error
          transformers[index].elm.properties[transformers[index].elm.properties['options'][this.option_index]] = value;
        } else {
          toast.set_text(
            'PARAM = [|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MIN]) +
              '|, ' +
              '|' +
              global.exponentiate_quickly(global.selected_properties['option_limits'][global.selected_properties['options'][this.option_index]][global.PROPERTY_LIMIT_MAX]) +
              '|]'
          );
          toast.show();
          ERROR_FLAG = true;
        }
      }
    }
    /* <!-- END AUTOMATICALLY GENERATED !--> */
    if (!ERROR_FLAG) {
      /* We changed something! */
      global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
      this.option_index = -1;
    }
    return ERROR_FLAG;
  }
  handle_partial_select(): void {
    if (this.SELECT_START != this.SELECT_END) {
      let min: number = Math.min(this.SELECT_START, this.SELECT_END);
      let max: number = Math.max(this.SELECT_START, this.SELECT_END);
      this.input_button.text = this.input_button.text.substring(0, min) + this.input_button.text.substring(max, this.input_button.text.length);
      if (this.CURSOR_POSITION > 0) {
        this.CURSOR_POSITION = Math.min(min, max);
      }
    }
    this.SELECT_START = -1;
    this.SELECT_END = -1;
  }
  reset_cursor(): void {
    this.CURSOR_POSITION = this.input_button.text.length;
    this.SELECT_ALL = false;
    this.SELECT_START = -1;
    this.SELECT_END = -1;
  }
  double_click(): void {
    if (global.MOUSE_DOUBLE_CLICK_EVENT) {
      if (this.input_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y)) {
        this.SELECT_ALL = !this.SELECT_ALL;
        if (this.SELECT_ALL) {
          this.SELECT_START = 0;
          this.ASCENDING = true;
          this.SELECT_END = this.input_button.text.length;
          this.CURSOR_POSITION = this.input_button.text.length;
        }
      }
    }
  }
  resize_window(): void {
    if (global.MOBILE_MODE) {
      this.width = view_port.view_width * 0.2625;
      this.height = view_port.view_height * 0.15;
    } else {
      this.width = view_port.view_width * 0.15;
      this.height = view_port.view_height * 0.075;
    }
    this.bounds.set_bounds(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
    this.title_bounds.set_bounds(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
    this.title_bounds.resize_paint();
    let padding: number = this.PADDING * this.bounds.get_width();
    let width: number = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
    let height: number = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
    this.okay_button.set_bounds(this.bounds.right - 2 * padding - 2 * width, this.bounds.bottom - height - padding, this.bounds.right - 2 * padding - width, this.bounds.bottom - padding);
    this.okay_button.resize_paint();
    this.cancel_button.set_bounds(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
    this.cancel_button.resize_paint();
    this.exit_button.set_bounds(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
    this.exit_button.resize_paint();
    this.input_button.set_bounds(this.title_bounds.left + padding, this.title_bounds.bottom + padding, this.cancel_button.right, this.okay_button.top - padding);
    this.input_button.resize_paint();
    /* Resize the stroke widths and the text sizes. */
    this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.bounds_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.bounds_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    if (global.MOBILE_MODE) {
      this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    } else {
      this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    }
    this.hover_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
    this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.select_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.select_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.reset_cursor();
    if (global.MOBILE_MODE) {
      if (this.bounds.bottom + this.OFFSET_Y >= on_screen_keyboard.bounds.top) {
        this.OFFSET_Y = -0.25 * view_port.view_height;
      }
    }
  }
  /* Fix up escapes... also make sure notes are okay! */
  draw_window(canvas: GraphicsEngine): void {
    if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
      /* Makes sure the window is always visisble. */
      if (global.MOBILE_MODE) {
        if (this.bounds.bottom + this.OFFSET_Y >= on_screen_keyboard.bounds.top) {
          this.OFFSET_Y = on_screen_keyboard.bounds.top - this.bounds.bottom;
        }
      }
      this.okay_button.text = language_manager.OKAY[global.LANGUAGES[global.LANGUAGE_INDEX]];
      this.cancel_button.text = language_manager.CANCEL[global.LANGUAGES[global.LANGUAGE_INDEX]];

      /* This draws the bounds of the interface. */
      canvas.draw_round_rect(
        this.bounds.left + this.OFFSET_X,
        this.bounds.top + this.OFFSET_Y,
        this.bounds.right + this.OFFSET_X,
        this.bounds.bottom + this.OFFSET_Y,
        this.bounds_paint.get_stroke_width(),
        this.bounds_paint
      );
      /* This draws the title space */
      this.title_bounds.draw_button_dxdy(canvas, this.OFFSET_X, this.OFFSET_Y);
      this.title_bounds.draw_button_text(canvas, this.title_bounds.left + this.PADDING * this.title_bounds.get_width() + this.OFFSET_X, this.title_bounds.get_center_y() + this.OFFSET_Y);
      if (this.okay_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) && this.WINDOW_ANCHORED && !global.MOBILE_MODE) {
        canvas.draw_round_rect(
          this.okay_button.left + this.OFFSET_X,
          this.okay_button.top + this.OFFSET_Y,
          this.okay_button.right + this.OFFSET_X,
          this.okay_button.bottom + this.OFFSET_Y,
          this.okay_button.line_paint.get_stroke_width(),
          this.hover_paint
        );
      }
      this.okay_button.draw_button_dxdy(canvas, this.OFFSET_X, this.OFFSET_Y);
      if (this.cancel_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) && this.WINDOW_ANCHORED && !global.MOBILE_MODE) {
        canvas.draw_round_rect(
          this.cancel_button.left + this.OFFSET_X,
          this.cancel_button.top + this.OFFSET_Y,
          this.cancel_button.right + this.OFFSET_X,
          this.cancel_button.bottom + this.OFFSET_Y,
          this.cancel_button.line_paint.get_stroke_width(),
          this.hover_paint
        );
      }
      this.cancel_button.draw_button_dxdy(canvas, this.OFFSET_X, this.OFFSET_Y);
      this.input_button.draw_button_dxdy(canvas, this.OFFSET_X, this.OFFSET_Y);
      let text: string = this.input_button.text.substring(0, this.CURSOR_POSITION) + this.input_button.text.substring(this.CURSOR_POSITION, this.input_button.text.length);
      canvas.draw_text(text, this.input_button.get_center_x() + this.OFFSET_X, this.input_button.get_center_y() + this.OFFSET_Y, this.input_button.text_paint);
      this.measured_text = this.input_button.text_paint.measure_text(text);
      let adj_text: string = this.input_button.text;
      if (this.SELECT_ALL && this.SELECT_START === -1 && this.SELECT_END === -1) {
        canvas.draw_rect3(
          this.input_button.get_center_x() + this.OFFSET_X,
          this.input_button.get_center_y() + this.OFFSET_Y,
          this.measured_text * 1.1,
          this.input_button.get_height() * 0.7,
          this.select_paint
        );
      }
      let cached_measured_text: number = this.measured_text * 0.5;
      if (this.SELECT_START != -1 && this.SELECT_END != -1) {
        let min: number = Math.min(this.SELECT_START, this.SELECT_END);
        let max: number = Math.max(this.SELECT_START, this.SELECT_END);
        this.SELECT_WIDTH = this.text_paint.measure_text(adj_text.substring(min, max));
        this.SELECT_OFFSET_X = this.text_paint.measure_text(adj_text.substring(0, min));
        canvas.draw_rect(
          this.input_button.get_center_x() - cached_measured_text + this.SELECT_OFFSET_X + this.OFFSET_X,
          this.input_button.get_center_y() - this.input_button.get_height() * 0.35 + this.OFFSET_Y,
          this.input_button.get_center_x() - cached_measured_text + this.SELECT_OFFSET_X + this.OFFSET_X + this.SELECT_WIDTH,
          this.input_button.get_center_y() + this.input_button.get_height() * 0.35 + this.OFFSET_Y,
          this.select_paint
        );
      }
      canvas.draw_text(
        '  _',
        this.input_button.get_center_x() - cached_measured_text + this.input_button.text_paint.measure_text(adj_text.substring(0, this.CURSOR_POSITION)) + this.OFFSET_X,
        this.input_button.get_center_y() + this.OFFSET_Y,
        this.input_button.text_paint
      );
      if (this.exit_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) && this.WINDOW_ANCHORED && !global.MOBILE_MODE) {
        canvas.draw_round_rect(
          this.exit_button.left + this.OFFSET_X,
          this.exit_button.top + this.OFFSET_Y,
          this.exit_button.right + this.OFFSET_X,
          this.exit_button.bottom + this.OFFSET_Y,
          this.exit_button.line_paint.get_stroke_width(),
          this.hover_paint
        );
      }
      let width_mul_0p3636: number = this.exit_button.get_width() * 0.3636;
      let height_mul_0p3636: number = this.exit_button.get_height() * 0.3636;
      canvas.draw_line(
        this.exit_button.left + width_mul_0p3636 + this.OFFSET_X,
        this.exit_button.top + height_mul_0p3636 + this.OFFSET_Y,
        this.exit_button.right - width_mul_0p3636 + this.OFFSET_X,
        this.exit_button.bottom - height_mul_0p3636 + this.OFFSET_Y,
        this.line_paint
      );
      canvas.draw_line(
        this.exit_button.right - width_mul_0p3636 + this.OFFSET_X,
        this.exit_button.top + height_mul_0p3636 + this.OFFSET_Y,
        this.exit_button.left + width_mul_0p3636 + this.OFFSET_X,
        this.exit_button.bottom - height_mul_0p3636 + this.OFFSET_Y,
        this.line_paint
      );
      canvas.draw_text(
        '(' + this.input_button.text.length + ' / ' + global.MAX_TEXT_LENGTH + ')',
        this.input_button.left + this.OFFSET_X,
        this.okay_button.get_center_y() + this.OFFSET_Y,
        this.text_paint
      );
    }
  }
}
