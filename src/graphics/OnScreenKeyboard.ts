/**********************************************************************
 * Project           : Circuit Solver
 * File		        : OnScreenKeyboard.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to key inputs for mobile platforms.
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
class OnScreenKeyboard {
  public KEYBOARD_MAX_KEYS: number = 67;
  public bounds: RectF = new RectF(0, 0, 0, 0);
  public HEIGHT_RATIO: number = 0.5;
  /* This paint is used for drawing the "lines" that the component is comprised of. */
  public line_paint: Paint = new Paint();
  /* This paint is used for drawing the "fill" that the component is comprised of. */
  public bounds_paint: Paint = new Paint();
  /* This paint is used for drawing the "fill" that the component is comprised of. */
  public fill_paint: Paint = new Paint();
  /* This paint is used for drawing the "fill" that the component is comprised of. */
  public fill_paint_alt: Paint = new Paint();
  /* This paint is used for drawing the "text" that the component needs to display */
  public text_paint: Paint = new Paint();
  /* Flags to help us determine what keys are being pressed. */
  public FLAG_CAPS_LOCK: boolean = false;
  public FLAG_SHIFT: boolean = false;
  public FLAG_ENTER: boolean = false;
  public CAP_REF: number = 0;
  public LETTER_ROW_1: string = 'qwertyuiop';
  public LETTER_ROW_2: string = 'asdfghjkl';
  public LETTER_ROW_3: string = 'zxcvbnm';
  public ALT_1_REF: number = 0;
  public ALT_2_REF: number = 0;
  public EXIT_REF: number = 0;
  public TAB_REF: number = 0;
  public BACKSPACE_REF: number = 0;
  public SHIFT_1_REF: number = 0;
  public ENTER_REF: number = 0;
  public CTRL_1_REF: number = 0;
  public CTRL_2_REF: number = 0;
  public SHIFT_2_REF: number = 0;
  public KEYBOARD_LETTER_REF: Array<number> = [];
  public KEYBOARD_SPECIAL_REF: Array<number> = [];
  public KEYBOARD_MAPPING: Array<string> = [];
  public KEYBOARD_INCREMENT_AT: Array<number> = [];
  public KEYBOARD_BLOCK_EXPAND: Array<number> = [];
  public KEYBOARD_EXPAND_TEMPLATE: KEYBOARD_EXPAND_T = {
    Id: null,
    Factor: null
  };
  public KEYBOARD_KEYS: Array<RectF> = [];
  public FLAG_KEY_DOWN: boolean = false;
  public FLAG_KEY_UP: boolean = false;
  public ENGINEERING_KEYBOARD_MODE: boolean = false;
  public ENGINEERING_KEYBOARD_FILTER: RegExp = /[-.kmu0123456789MnGpf]/;
  public FILE_NAME_KEYBOARD_FILTER: RegExp = /[-abcdefghijklmn opqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()]/;
  public ENGINEERING_KEYBOARD_FILTER_INDEX: Array<boolean> = [];
  public FILE_NAME_KEYBOARD_FILTER_INDEX: Array<boolean> = [];
  public HOVER_INDEX: number = -1;
  public KEYBOARD_KEY_EVENT: ON_SCREEN_KEYBOARD_KEY_EVENT_T = {
    code: 'KeyA'
  };
  public line_buffer: Array<Array<number>> = [];

  constructor() {
    this.KEYBOARD_MAX_KEYS = 67;
    this.bounds = new RectF(0, 0, 0, 0);
    this.HEIGHT_RATIO = 0.5;
    this.bounds.left = view_port.left;
    this.bounds.right = view_port.right;
    this.bounds.top = view_port.bottom - view_port.view_height * this.HEIGHT_RATIO;
    this.bounds.bottom = view_port.bottom;
    /* This paint is used for drawing the "lines" that the component is comprised of. */
    this.line_paint = new Paint();
    this.line_paint.set_paint_style(this.line_paint.style.STROKE);
    this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
    this.line_paint.set_paint_join(this.line_paint.join.MITER);
    this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
    this.line_paint.set_color(global.GENERAL_BLACK_COLOR);
    this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.line_paint.set_font(global.DEFAULT_FONT);
    this.line_paint.set_alpha(255);
    this.line_paint.set_paint_align(this.line_paint.align.CENTER);
    /* This paint is used for drawing the "fill" that the component is comprised of. */
    this.bounds_paint = new Paint();
    this.bounds_paint.set_paint_style(this.bounds_paint.style.FILL);
    this.bounds_paint.set_paint_cap(this.bounds_paint.cap.ROUND);
    this.bounds_paint.set_paint_join(this.bounds_paint.join.MITER);
    this.bounds_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.bounds_paint.set_color(global.GENERAL_GRAY_COLOR);
    this.bounds_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.bounds_paint.set_font(global.DEFAULT_FONT);
    this.bounds_paint.set_alpha(255);
    this.bounds_paint.set_paint_align(this.bounds_paint.align.CENTER);
    /* This paint is used for drawing the "fill" that the component is comprised of. */
    this.fill_paint = new Paint();
    this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
    this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
    this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
    this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.fill_paint.set_color(global.GENERAL_CYAN_COLOR);
    this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.fill_paint.set_font(global.DEFAULT_FONT);
    this.fill_paint.set_alpha(255);
    this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
    /* This paint is used for drawing the "fill" that the component is comprised of. */
    this.fill_paint_alt = new Paint();
    this.fill_paint_alt.set_paint_style(this.fill_paint_alt.style.FILL);
    this.fill_paint_alt.set_paint_cap(this.fill_paint_alt.cap.ROUND);
    this.fill_paint_alt.set_paint_join(this.fill_paint_alt.join.MITER);
    this.fill_paint_alt.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.fill_paint_alt.set_color(global.GENERAL_GRAY_COLOR);
    this.fill_paint_alt.set_text_size(global.CANVAS_TEXT_SIZE_4);
    this.fill_paint_alt.set_font(global.DEFAULT_FONT);
    this.fill_paint_alt.set_alpha(255);
    this.fill_paint_alt.set_paint_align(this.fill_paint_alt.align.CENTER);
    /* This paint is used for drawing the "text" that the component needs to display */
    this.text_paint = new Paint();
    this.text_paint.set_paint_style(this.text_paint.style.FILL);
    this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
    this.text_paint.set_paint_join(this.text_paint.join.MITER);
    this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
    this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
    this.text_paint.set_text_size(1.5 * global.CANVAS_TEXT_SIZE_3);
    this.text_paint.set_font(global.DEFAULT_FONT);
    this.text_paint.set_alpha(255);
    this.text_paint.set_paint_align(this.text_paint.align.CENTER);
    /* Flags to help us determine what keys are being pressed. */
    this.FLAG_CAPS_LOCK = false;
    this.FLAG_SHIFT = false;
    this.FLAG_ENTER = false;
    this.CAP_REF = 0;
    this.LETTER_ROW_1 = 'qwertyuiop';
    this.LETTER_ROW_2 = 'asdfghjkl';
    this.LETTER_ROW_3 = 'zxcvbnm';
    this.ALT_1_REF = 0;
    this.ALT_2_REF = 0;
    this.EXIT_REF = 0;
    this.TAB_REF = 0;
    this.BACKSPACE_REF = 0;
    this.SHIFT_1_REF = 0;
    this.ENTER_REF = 0;
    this.CTRL_1_REF = 0;
    this.CTRL_2_REF = 0;
    this.SHIFT_2_REF = 0;
    this.KEYBOARD_LETTER_REF = [];
    this.KEYBOARD_SPECIAL_REF = [];
    this.KEYBOARD_MAPPING = [];
    this.KEYBOARD_INCREMENT_AT = [];
    this.KEYBOARD_BLOCK_EXPAND = [];
    this.KEYBOARD_INCREMENT_AT.push(14);
    this.KEYBOARD_INCREMENT_AT.push(29);
    this.KEYBOARD_INCREMENT_AT.push(42);
    this.KEYBOARD_INCREMENT_AT.push(55);
    this.KEYBOARD_EXPAND_TEMPLATE = {
      Id: null,
      Factor: null
    };
    this.KEYBOARD_EXPAND_TEMPLATE['Id'] = 14;
    this.KEYBOARD_EXPAND_TEMPLATE['Factor'] = 1.5;
    this.KEYBOARD_BLOCK_EXPAND.push(global.copy(this.KEYBOARD_EXPAND_TEMPLATE));
    this.KEYBOARD_EXPAND_TEMPLATE['Id'] = 15;
    this.KEYBOARD_EXPAND_TEMPLATE['Factor'] = 1.5;
    this.KEYBOARD_BLOCK_EXPAND.push(global.copy(this.KEYBOARD_EXPAND_TEMPLATE));
    this.KEYBOARD_EXPAND_TEMPLATE['Id'] = 30;
    this.KEYBOARD_EXPAND_TEMPLATE['Factor'] = 2.0;
    this.KEYBOARD_BLOCK_EXPAND.push(global.copy(this.KEYBOARD_EXPAND_TEMPLATE));
    this.KEYBOARD_EXPAND_TEMPLATE['Id'] = 42;
    this.KEYBOARD_EXPAND_TEMPLATE['Factor'] = 2.5;
    this.KEYBOARD_BLOCK_EXPAND.push(global.copy(this.KEYBOARD_EXPAND_TEMPLATE));
    this.KEYBOARD_EXPAND_TEMPLATE['Id'] = 43;
    this.KEYBOARD_EXPAND_TEMPLATE['Factor'] = 2.5;
    this.KEYBOARD_BLOCK_EXPAND.push(global.copy(this.KEYBOARD_EXPAND_TEMPLATE));
    this.KEYBOARD_EXPAND_TEMPLATE['Id'] = 55;
    this.KEYBOARD_EXPAND_TEMPLATE['Factor'] = 2.0;
    this.KEYBOARD_BLOCK_EXPAND.push(global.copy(this.KEYBOARD_EXPAND_TEMPLATE));
    this.KEYBOARD_EXPAND_TEMPLATE['Id'] = 60;
    this.KEYBOARD_EXPAND_TEMPLATE['Factor'] = 5.5;
    this.KEYBOARD_BLOCK_EXPAND.push(global.copy(this.KEYBOARD_EXPAND_TEMPLATE));
    this.KEYBOARD_KEYS = [];
    this.FLAG_KEY_DOWN = false;
    this.FLAG_KEY_UP = false;
    this.ENGINEERING_KEYBOARD_MODE = false;
    this.ENGINEERING_KEYBOARD_FILTER = /[-.kmu0123456789MnGpf]/;
    this.FILE_NAME_KEYBOARD_FILTER = /[-abcdefghijklmn opqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789()]/;
    this.ENGINEERING_KEYBOARD_FILTER_INDEX = [];
    this.FILE_NAME_KEYBOARD_FILTER_INDEX = [];
    this.HOVER_INDEX = -1;
    this.KEYBOARD_KEY_EVENT = {
      code: 'keyA'
    };
    this.line_buffer = [];
    this.load_keyboard();
  }
  /* Load the structure of the on screen keyboard. */
  load_keyboard(): void {
    this.KEYBOARD_KEYS.splice(0, this.KEYBOARD_KEYS.length);
    this.KEYBOARD_MAPPING.splice(0, this.KEYBOARD_MAPPING.length);
    this.KEYBOARD_LETTER_REF.splice(0, this.KEYBOARD_LETTER_REF.length);
    this.ENGINEERING_KEYBOARD_FILTER_INDEX.splice(0, this.ENGINEERING_KEYBOARD_FILTER_INDEX.length);
    this.FILE_NAME_KEYBOARD_FILTER_INDEX.splice(0, this.FILE_NAME_KEYBOARD_FILTER_INDEX.length);
    let DEFAULT_WIDTH: number = this.bounds.get_width() * 0.06452 - 1.0;
    let DEFAULT_HEIGHT: number = this.bounds.get_height() * 0.2;
    let Y_COUNTER: number = 0;
    let BLOCK_EXPAND_INDEX: number = 0;
    let INCREMENT_INDEX: number = 0;
    let IS_SPECIAL_KEY: boolean = false;
    let MULTIPLIER: number = 0;
    let SKIP_INDEX: number = 0;
    for (var i: number = 0; i < this.KEYBOARD_MAX_KEYS; i++) {
      IS_SPECIAL_KEY = false;
      if (i === 0) {
        this.KEYBOARD_KEYS.push(new RectF(this.bounds.left, this.bounds.top + Y_COUNTER * DEFAULT_HEIGHT, this.bounds.left + DEFAULT_WIDTH, this.bounds.top + (Y_COUNTER + 1) * DEFAULT_HEIGHT));
      } else {
        if (BLOCK_EXPAND_INDEX < this.KEYBOARD_BLOCK_EXPAND.length) {
          if (i === this.KEYBOARD_BLOCK_EXPAND[BLOCK_EXPAND_INDEX]['Id']) {
            IS_SPECIAL_KEY = true;
            MULTIPLIER = this.KEYBOARD_BLOCK_EXPAND[BLOCK_EXPAND_INDEX]['Factor'];
            BLOCK_EXPAND_INDEX++;
          }
        }
        if (!IS_SPECIAL_KEY) {
          if (i != SKIP_INDEX + 1 || i === 1) {
            this.KEYBOARD_KEYS.push(
              new RectF(
                this.KEYBOARD_KEYS[i - 1].right,
                this.bounds.top + Y_COUNTER * DEFAULT_HEIGHT,
                this.KEYBOARD_KEYS[i - 1].right + DEFAULT_WIDTH,
                this.bounds.top + (Y_COUNTER + 1) * DEFAULT_HEIGHT
              )
            );
          } else {
            this.KEYBOARD_KEYS.push(new RectF(this.bounds.left, this.bounds.top + Y_COUNTER * DEFAULT_HEIGHT, this.bounds.left + DEFAULT_WIDTH, this.bounds.top + (Y_COUNTER + 1) * DEFAULT_HEIGHT));
          }
        } else {
          if (i != SKIP_INDEX + 1 || i === 1) {
            this.KEYBOARD_KEYS.push(
              new RectF(
                this.KEYBOARD_KEYS[i - 1].right,
                this.bounds.top + Y_COUNTER * DEFAULT_HEIGHT,
                this.KEYBOARD_KEYS[i - 1].right + DEFAULT_WIDTH * MULTIPLIER,
                this.bounds.top + (Y_COUNTER + 1) * DEFAULT_HEIGHT
              )
            );
          } else {
            this.KEYBOARD_KEYS.push(
              new RectF(this.bounds.left, this.bounds.top + Y_COUNTER * DEFAULT_HEIGHT, this.bounds.left + DEFAULT_WIDTH * MULTIPLIER, this.bounds.top + (Y_COUNTER + 1) * DEFAULT_HEIGHT)
            );
          }
        }
      }
      if (i === this.KEYBOARD_MAX_KEYS - 1) {
        this.KEYBOARD_KEYS[i].right = this.bounds.right;
      }
      if (INCREMENT_INDEX < this.KEYBOARD_INCREMENT_AT.length) {
        if (i === this.KEYBOARD_INCREMENT_AT[INCREMENT_INDEX]) {
          this.KEYBOARD_KEYS[i].right = this.bounds.right;
          SKIP_INDEX = this.KEYBOARD_INCREMENT_AT[INCREMENT_INDEX];
          Y_COUNTER++;
          INCREMENT_INDEX++;
        }
      }
    }
    this.KEYBOARD_MAPPING.push('ESC');
    this.KEYBOARD_MAPPING.push("'");
    for (var i: number = 1; i < 11; i++) {
      if (i != 11 - 1) {
        this.KEYBOARD_MAPPING.push(i + '');
      } else {
        this.KEYBOARD_MAPPING.push(0 + '');
      }
    }
    this.KEYBOARD_MAPPING.push('-');
    this.KEYBOARD_MAPPING.push('=');
    this.KEYBOARD_MAPPING.push('<<');
    this.BACKSPACE_REF = this.KEYBOARD_MAPPING.length - 1;
    this.KEYBOARD_MAPPING.push('TAB');
    this.TAB_REF = this.KEYBOARD_MAPPING.length - 1;
    for (var i: number = 0; i < this.LETTER_ROW_1.length; i++) {
      this.KEYBOARD_MAPPING.push(this.LETTER_ROW_1.charAt(i) + '');
      this.KEYBOARD_LETTER_REF.push(this.KEYBOARD_MAPPING.length - 1);
    }
    this.KEYBOARD_MAPPING.push('[');
    this.KEYBOARD_MAPPING.push(']');
    this.KEYBOARD_MAPPING.push("''");
    this.KEYBOARD_MAPPING.push('\\');
    this.KEYBOARD_MAPPING.push('CAPS');
    this.CAP_REF = this.KEYBOARD_MAPPING.length - 1;
    for (var i: number = 0; i < this.LETTER_ROW_2.length; i++) {
      this.KEYBOARD_MAPPING.push(this.LETTER_ROW_2.charAt(i) + '');
      this.KEYBOARD_LETTER_REF.push(this.KEYBOARD_MAPPING.length - 1);
    }
    this.KEYBOARD_MAPPING.push(';');
    this.KEYBOARD_MAPPING.push("'");
    this.KEYBOARD_MAPPING.push('ENTER');
    this.ENTER_REF = this.KEYBOARD_MAPPING.length - 1;
    this.KEYBOARD_MAPPING.push('SHIFT');
    this.SHIFT_1_REF = this.KEYBOARD_MAPPING.length - 1;
    for (var i: number = 0; i < this.LETTER_ROW_3.length; i++) {
      this.KEYBOARD_MAPPING.push(this.LETTER_ROW_3.charAt(i) + '');
      this.KEYBOARD_LETTER_REF.push(this.KEYBOARD_MAPPING.length - 1);
    }
    this.KEYBOARD_MAPPING.push(',');
    this.KEYBOARD_MAPPING.push('.');
    this.KEYBOARD_MAPPING.push('/');
    this.KEYBOARD_MAPPING.push('^');
    this.KEYBOARD_MAPPING.push('SHIFT');
    this.SHIFT_2_REF = this.KEYBOARD_MAPPING.length - 1;
    this.KEYBOARD_MAPPING.push('FN');
    this.KEYBOARD_MAPPING.push('CTRL');
    this.CTRL_1_REF = this.KEYBOARD_MAPPING.length - 1;
    this.KEYBOARD_MAPPING.push('WIN');
    this.KEYBOARD_MAPPING.push('ALT');
    this.ALT_1_REF = this.KEYBOARD_MAPPING.length - 1;
    this.KEYBOARD_MAPPING.push(language_manager.SPACE);
    this.KEYBOARD_MAPPING.push('ALT');
    this.ALT_2_REF = this.KEYBOARD_MAPPING.length - 1;
    this.KEYBOARD_MAPPING.push('CTRL');
    this.CTRL_2_REF = this.KEYBOARD_MAPPING.length - 1;
    this.KEYBOARD_MAPPING.push('<');
    this.KEYBOARD_MAPPING.push('_');
    this.KEYBOARD_MAPPING.push('>');
    this.KEYBOARD_MAPPING.push('INS');
    this.EXIT_REF = this.KEYBOARD_MAPPING.length - 1;
    this.KEYBOARD_SPECIAL_REF.push(this.CAP_REF);
    this.KEYBOARD_SPECIAL_REF.push(this.BACKSPACE_REF);
    this.KEYBOARD_SPECIAL_REF.push(this.SHIFT_1_REF);
    this.KEYBOARD_SPECIAL_REF.push(this.SHIFT_2_REF);
    this.KEYBOARD_SPECIAL_REF.push(this.ENTER_REF);
    this.KEYBOARD_SPECIAL_REF.push(this.CTRL_1_REF);
    this.KEYBOARD_SPECIAL_REF.push(this.ALT_1_REF);
    this.KEYBOARD_SPECIAL_REF.push(this.CTRL_2_REF);
    this.KEYBOARD_SPECIAL_REF.push(this.ALT_2_REF);
    this.KEYBOARD_SPECIAL_REF.push(this.EXIT_REF);
    this.KEYBOARD_SPECIAL_REF.push(this.TAB_REF);
    /* Cache the filter results for each index. */
    for (var i: number = 0; i < this.KEYBOARD_MAPPING.length; i++) {
      this.ENGINEERING_KEYBOARD_MODE = true;
      if (this.filter_keys(this.KEYBOARD_MAPPING[i])) {
        this.ENGINEERING_KEYBOARD_FILTER_INDEX.push(true);
      } else {
        this.ENGINEERING_KEYBOARD_FILTER_INDEX.push(false);
      }
      this.ENGINEERING_KEYBOARD_MODE = false;
      if (this.filter_keys(this.KEYBOARD_MAPPING[i])) {
        this.FILE_NAME_KEYBOARD_FILTER_INDEX.push(true);
      } else {
        this.FILE_NAME_KEYBOARD_FILTER_INDEX.push(false);
      }
    }
  }
  /* Resize the on-screen keyboard */
  resize_keyboard(): void {
    if (global.MOBILE_MODE) {
      /* Padding for the graph window. */
      this.bounds.left = view_port.left;
      this.bounds.right = view_port.right;
      this.bounds.top = view_port.bottom - view_port.view_height * this.HEIGHT_RATIO;
      this.bounds.bottom = view_port.bottom;
      this.load_keyboard();
      /* Resize the stroke widths and the text sizes. */
      this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
      this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
      this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
      this.text_paint.set_text_size(1.5 * global.CANVAS_TEXT_SIZE_3);
      this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
      this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
      this.bounds_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
      this.bounds_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
      this.fill_paint_alt.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
      this.fill_paint_alt.set_text_size(global.CANVAS_TEXT_SIZE_4);
    }
  }
  mouse_down(): void {
    if (global.MOBILE_MODE) {
      this.FLAG_KEY_UP = false;
      for (var i: number = 0; i < this.KEYBOARD_MAPPING.length; i++) {
        if (this.KEYBOARD_KEYS[i].contains_xy(global.mouse_x, global.mouse_y)) {
          this.FLAG_KEY_DOWN = true;
          this.HOVER_INDEX = i;
          break;
        }
      }
    }
  }
  mouse_move(): void {
    if (global.MOBILE_MODE) {
    }
  }
  mouse_up(): void {
    if (global.MOBILE_MODE && (global.FLAG_SAVE_CIRCUIT || global.FLAG_SAVE_IMAGE || global.FLAG_SELECT_TIMESTEP || global.FLAG_ELEMENT_OPTIONS_EDIT)) {
      this.HOVER_INDEX = -1;
      let FOUND: boolean = false;
      for (var i: number = 0; i < this.KEYBOARD_MAPPING.length; i++) {
        if (this.KEYBOARD_KEYS[i].contains_xy(global.mouse_x, global.mouse_y)) {
          FOUND = true;
          if (this.KEYBOARD_MAPPING[i].length === 1 && this.approve_keys(i)) {
            this.KEYBOARD_KEY_EVENT.code = global.key_to_code(this.KEYBOARD_MAPPING[i]);
            global.KEY_DOWN_EVENT = true;
            global.KEY_UP_EVENT = true;
            global.key_down_event_queue.push({
              event: global.copy(this.KEYBOARD_KEY_EVENT),
              alt: false,
              shift: this.FLAG_SHIFT,
              ctrl: false,
              caps: this.FLAG_CAPS_LOCK
            });
            break;
          } else {
            if (this.KEYBOARD_MAPPING[i] === 'SHIFT') {
              this.FLAG_SHIFT = !this.FLAG_SHIFT;
              FOUND = false;
              break;
            } else if (this.KEYBOARD_MAPPING[i] === 'CAPS') {
              this.FLAG_CAPS_LOCK = !this.FLAG_CAPS_LOCK;
              break;
            } else if (this.KEYBOARD_MAPPING[i] === 'ENTER') {
              /* ENTER */
              this.FLAG_ENTER = !this.FLAG_ENTER;
              this.KEYBOARD_KEY_EVENT.code = global.KEY_CODE_ENTER;
              global.KEY_DOWN_EVENT = true;
              global.KEY_UP_EVENT = true;
              global.key_down_event_queue.push({
                event: global.copy(this.KEYBOARD_KEY_EVENT),
                alt: false,
                shift: this.FLAG_SHIFT,
                ctrl: false,
                caps: this.FLAG_CAPS_LOCK
              });
              break;
            } else if (this.KEYBOARD_MAPPING[i] === '<<') {
              /* BACK SPACE */
              this.KEYBOARD_KEY_EVENT.code = global.KEY_CODE_BACKSPACE;
              global.KEY_DOWN_EVENT = true;
              global.KEY_UP_EVENT = true;
              global.key_down_event_queue.push({
                event: global.copy(this.KEYBOARD_KEY_EVENT),
                alt: false,
                shift: this.FLAG_SHIFT,
                ctrl: false,
                caps: this.FLAG_CAPS_LOCK
              });
              break;
            }
          }
        }
      }
      if (FOUND === true) {
        if (this.FLAG_SHIFT) {
          this.FLAG_SHIFT = false;
        }
      }
      this.FLAG_KEY_UP = true;
    }
  }
  filter_keys(input: string): boolean {
    let output: boolean = false;
    let filter: RegExp;
    if (this.FLAG_SHIFT || this.FLAG_CAPS_LOCK) {
      input = input.toUpperCase();
    }
    if (this.ENGINEERING_KEYBOARD_MODE === true) {
      filter = this.ENGINEERING_KEYBOARD_FILTER;
    } else {
      filter = this.FILE_NAME_KEYBOARD_FILTER;
    }
    output = filter.test(input);
    if (input === 'INS' || input === 'CTRL' || input === 'ALT' || input === 'WIN' || input === 'FN' || input === 'TAB' || input === 'ESC') {
      output = false;
    }
    return output || input === 'CAPS' || input === 'ENTER' || input === '<<' || input === 'SHIFT' || input === ' ';
  }
  approve_keys(index: number): boolean {
    if (this.ENGINEERING_KEYBOARD_MODE === true) {
      return this.ENGINEERING_KEYBOARD_FILTER_INDEX[index];
    } else {
      return this.FILE_NAME_KEYBOARD_FILTER_INDEX[index];
    }
  }
  /* Draw the on screen keyboard */
  draw_keyboard(canvas: GraphicsEngine): void {
    if (global.MOBILE_MODE && (global.FLAG_SAVE_CIRCUIT || global.FLAG_SAVE_IMAGE || global.FLAG_SELECT_TIMESTEP || global.FLAG_ELEMENT_OPTIONS_EDIT)) {
      if (global.FLAG_ELEMENT_OPTIONS_EDIT === true || global.FLAG_SELECT_TIMESTEP === true) {
        if (global.selected_type != global.TYPE_NOTE && global.selected_type != global.TYPE_NET) {
          this.ENGINEERING_KEYBOARD_MODE = true;
        } else {
          if (global.FLAG_ELEMENT_OPTIONS_EDIT) {
            this.ENGINEERING_KEYBOARD_MODE = false;
          } else {
            this.ENGINEERING_KEYBOARD_MODE = true;
          }
        }
      } else {
        this.ENGINEERING_KEYBOARD_MODE = false;
      }
      canvas.draw_rect2(this.bounds, this.bounds_paint);
      let indexer: number = 0;
      for (var i: number = 0; i < this.KEYBOARD_MAPPING.length; i++) {
        this.line_buffer[indexer++] = Array(this.KEYBOARD_KEYS[i].left, this.KEYBOARD_KEYS[i].top, this.KEYBOARD_KEYS[i].left, this.KEYBOARD_KEYS[i].bottom);
        this.line_buffer[indexer++] = Array(this.KEYBOARD_KEYS[i].right, this.KEYBOARD_KEYS[i].top, this.KEYBOARD_KEYS[i].right, this.KEYBOARD_KEYS[i].bottom);
        if (this.ENGINEERING_KEYBOARD_MODE) {
          if (this.ENGINEERING_KEYBOARD_FILTER_INDEX[i]) {
            if (this.HOVER_INDEX === i) {
              canvas.draw_round_rect2(this.KEYBOARD_KEYS[i], this.fill_paint.get_stroke_width() << 1, this.fill_paint);
            }
            if (this.FLAG_SHIFT || this.FLAG_CAPS_LOCK) {
              canvas.draw_text(this.KEYBOARD_MAPPING[i].toUpperCase(), this.KEYBOARD_KEYS[i].get_center_x(), this.KEYBOARD_KEYS[i].get_center_y(), this.text_paint);
            } else {
              canvas.draw_text(this.KEYBOARD_MAPPING[i], this.KEYBOARD_KEYS[i].get_center_x(), this.KEYBOARD_KEYS[i].get_center_y(), this.text_paint);
            }
          }
        } else {
          if (this.FILE_NAME_KEYBOARD_FILTER_INDEX[i]) {
            if (this.HOVER_INDEX === i) {
              canvas.draw_round_rect2(this.KEYBOARD_KEYS[i], this.fill_paint.get_stroke_width() << 1, this.fill_paint);
            }
            if (this.FLAG_SHIFT || this.FLAG_CAPS_LOCK) {
              canvas.draw_text(this.KEYBOARD_MAPPING[i].toUpperCase(), this.KEYBOARD_KEYS[i].get_center_x(), this.KEYBOARD_KEYS[i].get_center_y(), this.text_paint);
            } else {
              canvas.draw_text(this.KEYBOARD_MAPPING[i], this.KEYBOARD_KEYS[i].get_center_x(), this.KEYBOARD_KEYS[i].get_center_y(), this.text_paint);
            }
          }
        }
      }
      this.line_buffer[indexer++] = Array(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top);
      this.line_buffer[indexer++] = Array(this.bounds.left, this.bounds.bottom, this.bounds.right, this.bounds.bottom);
      this.line_buffer[indexer++] = Array(this.bounds.left, this.bounds.top, this.bounds.left, this.bounds.bottom);
      this.line_buffer[indexer++] = Array(this.bounds.right, this.bounds.top, this.bounds.right, this.bounds.bottom);
      this.line_buffer[indexer++] = Array(this.bounds.left, this.KEYBOARD_KEYS[0].bottom, this.bounds.right, this.KEYBOARD_KEYS[0].bottom);
      this.line_buffer[indexer++] = Array(this.bounds.left, this.KEYBOARD_KEYS[15].bottom, this.bounds.right, this.KEYBOARD_KEYS[15].bottom);
      this.line_buffer[indexer++] = Array(this.bounds.left, this.KEYBOARD_KEYS[30].bottom, this.bounds.right, this.KEYBOARD_KEYS[30].bottom);
      this.line_buffer[indexer++] = Array(this.bounds.left, this.KEYBOARD_KEYS[43].bottom, this.bounds.right, this.KEYBOARD_KEYS[43].bottom);
      canvas.draw_line_buffer(this.line_buffer, this.line_paint);
    }
    if (this.FLAG_KEY_UP) {
      this.FLAG_KEY_UP = false;
      this.FLAG_KEY_DOWN = false;
    }
  }
}
