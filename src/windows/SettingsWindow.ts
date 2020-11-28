/**********************************************************************
 * Project           : Circuit Solver
 * File		        : SettingsWindow.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This class displays the different settings available and it will provide
 *                   a means to edit them.
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
class SettingsWindow {
  /**
   * [TITLE_HEIGHT_RATIO This controls the height of the title bar relative to the height of the window]
   * @type {Number}
   */
  public TITLE_HEIGHT_RATIO = 0.1;
  /**
   * [BUTTON_WIDTH_RATIO This controls the width of the buttons relative to the width of the window]
   * @type {Number}
   */
  public BUTTON_WIDTH_RATIO = 0.3;
  /**
   * [BUTTON_HEIGHT_RATIO This controls the height of the buttons relative to the height of the window]
   * @type {Number}
   */
  public BUTTON_HEIGHT_RATIO = 0.1;
  /* The amount of padding around elements, relative to the width and height of the window. */
  public PADDING = 0.0175;
  /* The amount of pre-loaded attributes. There should be no more than 5 for this application. */
  public ATTRIBUTE_SIZE = 6;
  public ATTRIBUTE_SHOW_SIZE = 4;
  /* Used to quick select. */
  public ATTRIBUTE_SELECT = ['1', '2', '3', '4', '5', '6'];
  /* This paint is used for drawing the "lines" that the component is comprised of. */
  public line_paint = new Paint();
  /* This paint is used for drawing background colors. */
  public fill_paint = new Paint();

  /* This paint is used for drawing the "text" that the component needs to display */
  public text_paint = new Paint();

  /* This paint is used for drawing the icons that the component is comprised of. */
  public hover_paint = new Paint();

  /* This paint is used for drawing the "text" that the component needs to display */
  public shorcut_text_paint = new Paint();

  /* This paint is used for drawing the "text" that the component needs to display */
  public value_paint = new Paint();

  /* This paint is used for drawing the "fill" that the component is comprised of. */
  public bounds_paint = new Paint();

  public width = view_port.view_width * 0.15;
  public height = view_port.view_height * 0.3;
  public bounds = new RectF(0, 0, 0, 0);
  public title_bounds = new Button(0, 0, 0, 0);
  public okay_button = new Button(0, 0, 0, 0);
  public exit_button = new Button(0, 0, 0, 0);
  /* We shall pre-load 5 attributes and enable / disable what we don't need. */
  public attributes = [];
  public ATTRIBUTE_HEIGHT = 1;
  /* Controls for window dragging. */
  public OFFSET_X = 0;
  public OFFSET_Y = 0;
  public WINDOW_ANCHORED = true;
  public ANCHOR_X = 0;
  public ANCHOR_Y = 0;
  /* Enforcing the system from cascading events. */
  public first_touch_x = 0;
  public first_touch_y = 0;
  public toggle_switch_button = new ToggleSwitch(view_port.left, view_port.top, view_port.left + 200, view_port.top + 100);

  constructor() {
    /**
     * [TITLE_HEIGHT_RATIO This controls the height of the title bar relative to the height of the window]
     * @type {Number}
     */
    this.TITLE_HEIGHT_RATIO = 0.1;
    /**
     * [BUTTON_WIDTH_RATIO This controls the width of the buttons relative to the width of the window]
     * @type {Number}
     */
    this.BUTTON_WIDTH_RATIO = 0.3;
    /**
     * [BUTTON_HEIGHT_RATIO This controls the height of the buttons relative to the height of the window]
     * @type {Number}
     */
    this.BUTTON_HEIGHT_RATIO = 0.1;
    /* The amount of padding around elements, relative to the width and height of the window. */
    this.PADDING = 0.0175;
    /* The amount of pre-loaded attributes. There should be no more than 5 for this application. */
    this.ATTRIBUTE_SIZE = 6;
    if (global.MOBILE_MODE === false) {
      this.ATTRIBUTE_SHOW_SIZE = 4;
    } else {
      this.ATTRIBUTE_SHOW_SIZE = 2;
    }
    /* Used to quick select. */
    this.ATTRIBUTE_SELECT = ['1', '2', '3', '4', '5', '6'];
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
    /* This paint is used for drawing background colors. */
    this.fill_paint = new Paint();
    this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
    this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
    this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
    this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
    this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.fill_paint.set_font(global.DEFAULT_FONT);
    this.fill_paint.set_alpha(130);
    this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
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
    /* This paint is used for drawing the "text" that the component needs to display */
    this.shorcut_text_paint = new Paint();
    this.shorcut_text_paint.set_paint_style(this.shorcut_text_paint.style.FILL);
    this.shorcut_text_paint.set_paint_cap(this.shorcut_text_paint.cap.ROUND);
    this.shorcut_text_paint.set_paint_join(this.shorcut_text_paint.join.MITER);
    this.shorcut_text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.shorcut_text_paint.set_color(global.GENERAL_CYAN_COLOR);
    this.shorcut_text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.shorcut_text_paint.set_font(global.DEFAULT_FONT);
    this.shorcut_text_paint.set_alpha(255);
    this.shorcut_text_paint.set_paint_align(this.shorcut_text_paint.align.CENTER);
    /* This paint is used for drawing the "text" that the component needs to display */
    this.value_paint = new Paint();
    this.value_paint.set_paint_style(this.value_paint.style.FILL);
    this.value_paint.set_paint_cap(this.value_paint.cap.ROUND);
    this.value_paint.set_paint_join(this.value_paint.join.MITER);
    this.value_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.value_paint.set_color(global.GENERAL_WHITE_COLOR);
    if (global.MOBILE_MODE) {
      this.value_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    } else {
      this.value_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    }
    this.value_paint.set_font(global.DEFAULT_FONT);
    this.value_paint.set_alpha(255);
    this.value_paint.set_paint_align(this.value_paint.align.RIGHT);
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
      this.width = view_port.view_width * 0.2;
      this.height = view_port.view_height * 0.4;
    } else {
      this.width = view_port.view_width * 0.15;
      this.height = view_port.view_height * 0.3;
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
    let padding = this.PADDING * this.bounds.get_width();
    let width = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
    let height = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
    this.okay_button = new Button(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
    this.okay_button.text = '';
    this.okay_button.text_paint.set_color(global.GENERAL_WHITE_COLOR);
    this.okay_button.fill_paint.set_color(global.GENERAL_BLACK_COLOR);
    this.okay_button.fill_paint.set_alpha(130);
    this.okay_button.draw_stroke = false;
    this.okay_button.draw_fill = true;
    this.exit_button = new Button(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
    this.exit_button.draw_stroke = true;
    this.exit_button.draw_fill = false;
    this.exit_button.text_paint.set_color(global.GENERAL_WHITE_COLOR);
    /* We shall pre-load 5 attributes and enable / disable what we don't need. */
    this.attributes = [];
    this.ATTRIBUTE_HEIGHT = (this.okay_button.top - padding - (this.title_bounds.bottom + padding)) / this.ATTRIBUTE_SIZE;
    /* Populating the attributes */
    for (var i = 0; i < this.ATTRIBUTE_SIZE; i++) {
      this.attributes.push(
        new RectF(
          this.title_bounds.left + padding,
          this.title_bounds.bottom + padding * 1.5 + i * this.ATTRIBUTE_HEIGHT,
          this.title_bounds.right - padding,
          this.title_bounds.bottom + padding + (i + 1) * this.ATTRIBUTE_HEIGHT - 1.25 * padding
        )
      );
    }
    /* Controls for window dragging. */
    this.OFFSET_X = 0;
    this.OFFSET_Y = 0;
    this.WINDOW_ANCHORED = true;
    this.ANCHOR_X = 0;
    this.ANCHOR_Y = 0;
    /* Enforcing the system from cascading events. */
    this.first_touch_x = 0;
    this.first_touch_y = 0;
    this.toggle_switch_button = new ToggleSwitch(view_port.left, view_port.top, view_port.left + 200, view_port.top + 100);
    this.toggle_switch_button.draw_fill = false;
    this.toggle_switch_button.draw_stroke = true;
    this.toggle_switch_button.draw_text = true;
    this.toggle_switch_button.line_paint.set_color(global.GENERAL_BOUNDS_COLOR);
  }
  mouse_down() {
    if (global.FLAG_SELECT_SETTINGS) {
      if (
        this.title_bounds.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
        !this.exit_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y)
      ) {
        this.ANCHOR_X = global.mouse_x - this.OFFSET_X;
        this.ANCHOR_Y = global.mouse_y - this.OFFSET_Y;
        this.WINDOW_ANCHORED = false;
      }
      /* Enforcing the system from cascading events. */
      this.first_touch_x = global.mouse_x;
      this.first_touch_y = global.mouse_y;
    }
  }
  mouse_move() {
    if (global.FLAG_SELECT_SETTINGS) {
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
        if (this.bounds.bottom + this.OFFSET_Y >= view_port.bottom) {
          this.OFFSET_Y = view_port.bottom - this.bounds.bottom;
        }
      }
    }
  }
  mouse_up() {
    if (global.FLAG_SELECT_SETTINGS) {
      if (!global.MOUSE_KEYBOARD_LOCK) {
        if (this.WINDOW_ANCHORED) {
          if (
            !this.bounds.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
            !this.bounds.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)
          ) {
            menu_bar.handle_select_settings_flag(!global.FLAG_SELECT_SETTINGS);
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
          } else if (
            this.okay_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
            this.okay_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)
          ) {
            menu_bar.handle_select_settings_flag(!global.FLAG_SELECT_SETTINGS);
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
          } else if (
            this.exit_button.contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
            this.exit_button.contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)
          ) {
            menu_bar.handle_select_settings_flag(!global.FLAG_SELECT_SETTINGS);
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
          } else {
            if (
              this.null_index_check(this.attributes, global.SYSTEM_OPTION_LANGUAGE) &&
              this.attributes[global.SYSTEM_OPTION_LANGUAGE].contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
              this.attributes[global.SYSTEM_OPTION_LANGUAGE].contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)
            ) {
              this.on_attribute_clicked(global.SYSTEM_OPTION_LANGUAGE);
            } else if (
              this.null_index_check(this.attributes, global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP) &&
              this.attributes[global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP].contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
              this.attributes[global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP].contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)
            ) {
              this.on_attribute_clicked(global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP);
            } else if (
              this.null_index_check(this.attributes, global.SYSTEM_OPTION_SHORTCUT_HINTS) &&
              this.attributes[global.SYSTEM_OPTION_SHORTCUT_HINTS].contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
              this.attributes[global.SYSTEM_OPTION_SHORTCUT_HINTS].contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)
            ) {
              this.on_attribute_clicked(global.SYSTEM_OPTION_SHORTCUT_HINTS);
            } else if (
              this.null_index_check(this.attributes, global.SYSTEM_OPTION_STRETCH_WINDOW) &&
              this.attributes[global.SYSTEM_OPTION_STRETCH_WINDOW].contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) &&
              this.attributes[global.SYSTEM_OPTION_STRETCH_WINDOW].contains_xy(this.first_touch_x - this.OFFSET_X, this.first_touch_y - this.OFFSET_Y)
            ) {
              this.on_attribute_clicked(global.SYSTEM_OPTION_STRETCH_WINDOW);
            }
          }
        } else {
          this.ANCHOR_X = global.mouse_x - this.OFFSET_X;
          this.ANCHOR_Y = global.mouse_y - this.OFFSET_Y;
        }
        this.WINDOW_ANCHORED = true;
      }
    }
  }
  null_index_check(param, index) {
    return global.not_null(param[index]);
  }
  on_attribute_clicked(index) {
    if (index < this.ATTRIBUTE_SHOW_SIZE) {
      if (index === global.SYSTEM_OPTION_LANGUAGE) {
        if (global.SYSTEM_OPTION_LANGUAGE < this.ATTRIBUTE_SHOW_SIZE) {
          global.LANGUAGE_INDEX++;
          if (global.LANGUAGE_INDEX >= global.LANGUGE_INDEX_COUNTER) {
            global.LANGUAGE_INDEX = 0;
          }
          global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_LANGUAGE] = global.LANGUAGES[global.LANGUAGE_INDEX];
        }
        /* Block out the reset selection portion of the code! */
        global.component_touched = true;
      } else if (index === global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP) {
        if (global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP < this.ATTRIBUTE_SHOW_SIZE) {
          if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP] === global.OFF) {
            global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP] = global.ON;
          } else {
            global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP] = global.OFF;
          }
        }
        /* Block out the reset selection portion of the code! */
        global.component_touched = true;
      } else if (index === global.SYSTEM_OPTION_SHORTCUT_HINTS) {
        if (global.SYSTEM_OPTION_SHORTCUT_HINTS < this.ATTRIBUTE_SHOW_SIZE) {
          if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.OFF) {
            global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] = global.ON;
          } else {
            global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] = global.OFF;
          }
        }
        /* Block out the reset selection portion of the code! */
        global.component_touched = true;
      } else if (index === global.SYSTEM_OPTION_STRETCH_WINDOW) {
        if (global.SYSTEM_OPTION_STRETCH_WINDOW < this.ATTRIBUTE_SHOW_SIZE) {
          if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_STRETCH_WINDOW] === global.OFF) {
            global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_STRETCH_WINDOW] = global.ON;
            view_port.APPLY_SPREAD_FACTOR = true;
            global.FORCE_RESIZE_EVENT = true;
          } else {
            global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_STRETCH_WINDOW] = global.OFF;
            view_port.APPLY_SPREAD_FACTOR = false;
            global.FORCE_RESIZE_EVENT = true;
          }
        }
        /* Block out the reset selection portion of the code! */
        global.component_touched = true;
      }
    }
    bottom_menu.resize_bottom_menu();
  }
  key_down(key_event) {
    if (global.FLAG_SELECT_SETTINGS) {
      if (key_event['event'].code === global.KEY_CODE_ENTER || key_event['event'].code === global.KEY_CODE_ESCAPE) {
        menu_bar.handle_select_settings_flag(!global.FLAG_SELECT_SETTINGS);
        /* Block out the reset selection portion of the code! */
        global.component_touched = true;
      }
      if (!global.MOUSE_KEYBOARD_LOCK) {
        for (var i = 0; i < this.ATTRIBUTE_SELECT.length; i++) {
          if (global.decode_key(key_event) === this.ATTRIBUTE_SELECT[i]) {
            this.on_attribute_clicked(i);
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
            global.MOUSE_KEYBOARD_LOCK = true;
            break;
          }
        }
      }
    }
  }
  /* A function to resize the entire component. */
  resize_window() {
    if (global.MOBILE_MODE) {
      this.width = view_port.view_width * 0.2;
      this.height = view_port.view_height * 0.4;
    } else {
      this.width = view_port.view_width * 0.15;
      this.height = view_port.view_height * 0.3;
    }
    /* Refactors the bounds / title bounds of the window. */
    this.bounds.set_bounds(view_port.center_x - this.width, view_port.center_y - this.height, view_port.center_x + this.width, view_port.center_y + this.height);
    this.title_bounds.set_bounds(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top + this.TITLE_HEIGHT_RATIO * this.bounds.get_height());
    this.title_bounds.resize_paint();
    /* Recalculates the padding with and height of the buttons as well as refactors the attribute rectangles */
    let padding = this.PADDING * this.bounds.get_width();
    let width = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
    let height = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
    this.okay_button.set_bounds(this.bounds.right - padding - width, this.bounds.bottom - height - padding, this.bounds.right - padding, this.bounds.bottom - padding);
    this.okay_button.resize_paint();
    this.exit_button.set_bounds(this.title_bounds.right - this.title_bounds.get_height(), this.title_bounds.top, this.title_bounds.right, this.title_bounds.bottom);
    this.exit_button.resize_paint();
    this.ATTRIBUTE_HEIGHT = (this.okay_button.top - padding - (this.title_bounds.bottom + padding)) / this.ATTRIBUTE_SIZE;
    for (var i = 0; i < this.ATTRIBUTE_SIZE; i++) {
      this.attributes[i].set_bounds(
        this.title_bounds.left + padding,
        this.title_bounds.bottom + padding * 1.5 + i * this.ATTRIBUTE_HEIGHT,
        this.title_bounds.right - padding,
        this.title_bounds.bottom + padding + (i + 1) * this.ATTRIBUTE_HEIGHT - 1.25 * padding
      );
    }
    /* Resize the stroke widths and the text sizes. */
    this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    if (global.MOBILE_MODE) {
      this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    } else {
      this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    }
    this.value_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    if (global.MOBILE_MODE) {
      this.value_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    } else {
      this.value_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    }
    this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.bounds_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.bounds_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.shorcut_text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.shorcut_text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.hover_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
    this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    if (global.not_null(this.toggle_switch_button)) {
      this.toggle_switch_button.resize_toggle_switch();
      this.toggle_switch_button.resize_paint();
    }
  }
  /* A function to handle the drawing of the component. */
  draw_window(canvas) {
    if (global.FLAG_SELECT_SETTINGS) {
      this.title_bounds.text = language_manager.SYSTEM_SETTINGS[global.LANGUAGES[global.LANGUAGE_INDEX]];
      this.okay_button.text = language_manager.OKAY[global.LANGUAGES[global.LANGUAGE_INDEX]];

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
      this.title_bounds.draw_button_text(
        canvas,
        this.title_bounds.left + this.PADDING * this.title_bounds.get_width() + this.OFFSET_X,
        this.title_bounds.get_center_y() + this.OFFSET_Y
      );
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
      /* Draws the okay button */
      this.okay_button.draw_button_dxdy(canvas, this.OFFSET_X, this.OFFSET_Y);
      /* Run through the attributes and print off their info. (from selected component) */
      for (var i = 0; i < this.ATTRIBUTE_SHOW_SIZE; i++) {
        if (global.not_null(global.SYSTEM_OPTIONS)) {
          if (i < global.SYSTEM_OPTIONS['options'].length && global.not_null(this.attributes[i])) {
            if (this.attributes[i].contains_xy(global.mouse_x - this.OFFSET_X, global.mouse_y - this.OFFSET_Y) && this.WINDOW_ANCHORED && !global.MOBILE_MODE) {
              canvas.draw_round_rect(
                this.attributes[i].left + this.OFFSET_X,
                this.attributes[i].top + this.OFFSET_Y,
                this.attributes[i].right + this.OFFSET_X,
                this.attributes[i].bottom + this.OFFSET_Y,
                this.fill_paint.get_stroke_width(),
                this.hover_paint
              );
            } else {
              canvas.draw_round_rect(
                this.attributes[i].left + this.OFFSET_X,
                this.attributes[i].top + this.OFFSET_Y,
                this.attributes[i].right + this.OFFSET_X,
                this.attributes[i].bottom + this.OFFSET_Y,
                this.fill_paint.get_stroke_width(),
                this.fill_paint
              );
            }
            if (i === global.SYSTEM_OPTION_LANGUAGE) {
              canvas.draw_text(
                language_manager.LANGUAGE[global.LANGUAGES[global.LANGUAGE_INDEX]] + ':=',
                this.attributes[i].left + this.PADDING * this.bounds.get_width() + this.OFFSET_X,
                this.attributes[i].get_center_y() + this.OFFSET_Y,
                this.text_paint
              );
            } else if (i === global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP) {
              canvas.draw_text(
                language_manager.AUTOMATIC_TIMESTEP[global.LANGUAGES[global.LANGUAGE_INDEX]] + ':=',
                this.attributes[i].left + this.PADDING * this.bounds.get_width() + this.OFFSET_X,
                this.attributes[i].get_center_y() + this.OFFSET_Y,
                this.text_paint
              );
            } else if (i === global.SYSTEM_OPTION_SHORTCUT_HINTS) {
              canvas.draw_text(
                language_manager.SHORTCUT_HINTS[global.LANGUAGES[global.LANGUAGE_INDEX]] + ':=',
                this.attributes[i].left + this.PADDING * this.bounds.get_width() + this.OFFSET_X,
                this.attributes[i].get_center_y() + this.OFFSET_Y,
                this.text_paint
              );
            } else if (i === global.SYSTEM_OPTION_STRETCH_WINDOW) {
              canvas.draw_text(
                language_manager.STRETCH_WINDOW[global.LANGUAGES[global.LANGUAGE_INDEX]] + ':=',
                this.attributes[i].left + this.PADDING * this.bounds.get_width() + this.OFFSET_X,
                this.attributes[i].get_center_y() + this.OFFSET_Y,
                this.text_paint
              );
            } else {
              canvas.draw_text(
                global.SYSTEM_OPTIONS['options'][i] + ':=',
                this.attributes[i].left + this.PADDING * this.bounds.get_width(),
                this.attributes[i].get_center_y() + this.OFFSET_Y,
                this.text_paint
              );
            }
            if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
              canvas.draw_text(i + 1 + '', this.attributes[i].left + this.OFFSET_X, this.attributes[i].top + this.OFFSET_Y, this.shorcut_text_paint);
            }
            if (global.SYSTEM_OPTIONS['values'][i] === global.ON || global.SYSTEM_OPTIONS['values'][i] === global.OFF) {
              let padding = this.attributes[i].get_height() * 0.1;
              this.toggle_switch_button.STATE = global.SYSTEM_OPTIONS['values'][i];
              this.toggle_switch_button.left = this.attributes[i].right - this.attributes[i].get_width() * 0.3;
              this.toggle_switch_button.right = this.attributes[i].right - this.PADDING * this.bounds.get_width();
              this.toggle_switch_button.top = this.attributes[i].top + padding;
              this.toggle_switch_button.bottom = this.attributes[i].bottom - padding;
              if (global.SYSTEM_OPTIONS['values'][i] === global.ON) {
                this.toggle_switch_button.toggle_paint.set_color(global.GENERAL_CYAN_COLOR);
              } else if (global.SYSTEM_OPTIONS['values'][i] === global.OFF) {
                this.toggle_switch_button.toggle_paint.set_color(global.GENERAL_GRAY_COLOR);
              }
              if (global.not_null(this.toggle_switch_button)) {
                this.toggle_switch_button.draw_toggle_switch_dxdy(canvas, this.OFFSET_X, this.OFFSET_Y);
              }
            } else {
              canvas.draw_text(
                global.SYSTEM_OPTIONS['values'][i],
                this.attributes[i].right - this.PADDING * this.bounds.get_width() + this.OFFSET_X,
                this.attributes[i].get_center_y() + this.OFFSET_Y,
                this.value_paint
              );
            }
          }
        }
      }
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
      let width_mul_0p3636 = this.exit_button.get_width() * 0.3636;
      let height_mul_0p3636 = this.exit_button.get_height() * 0.3636;
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
    }
  }
}