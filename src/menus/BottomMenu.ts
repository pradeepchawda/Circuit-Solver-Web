/**********************************************************************
* Project           : Circuit Solver
* File		        : BottomMenu.js
* Author            : nboatengc
* Date created      : 20190928
*
* Purpose           : This class handles the file explorer functionality as well as the timestep
                    button. This also draws the bottom path gui.
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
class BottomMenu {
	/* A flag to dictate if we draw the bottom path or not. */
	public DRAW_BOTTOM_PATH: boolean;
	public TIME_STEP_BUTTON_WIDTH: number;
	public VERSION_TAG_TEMPLATE: string;
	public TIMESTEP_TEMPLATE: string;
	public FILE_BUTTON_TEXT_TEMPLATE: string;
	/* This paint is used for drawing the "lines" that the component is comprised of. */
	public line_paint: Paint;
	/* This paint is used for drawing the "fill" that the component is comprised of. */
	public fill_paint: Paint;
	/* This paint is used for drawing the "text" that the component needs to display */
	public text_paint: Paint;
	/* The trim along the bottom side of the screen. We use a path to draw the arbitrary shape. */
	public bottom_path: Path;
	/* A button to access the users files. This will eventually be a call to a database once i get
that setup. */
	public file_button: Button;
	/* This is so that the user may pick the timestep when the "automatic_timestep" settings is off.
When it is on, the system shall figure out a good starting point and change the timestep to this
value. */
	public time_step_button: Button;
	public first_touch_x: number;
	public first_touch_y: number;
	public INITIAL_RESIZE_COUNTER: number;
	public INITIAL_RESIZE_COUNTER_MAX: number;
	public RELOAD_BOTTOM_PATH: boolean;
	constructor() {
		/* A flag to dictate if we draw the bottom path or not. */
		this.DRAW_BOTTOM_PATH = true;
		this.TIME_STEP_BUTTON_WIDTH = 1;
		this.VERSION_TAG_TEMPLATE = 'v{VERSION_TAG}   ';
		this.TIMESTEP_TEMPLATE = 'Δt:={TIMESTEP}s';
		this.FILE_BUTTON_TEXT_TEMPLATE = '  {TEXT}  ';
		/* This paint is used for drawing the "lines" that the component is comprised of. */
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(this.line_paint.style.STROKE);
		this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
		this.line_paint.set_paint_join(this.line_paint.join.MITER);
		this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_3);
		this.line_paint.set_color(global.GENERAL_GRAY_COLOR);
		this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.line_paint.set_font(global.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(this.line_paint.align.CENTER);
		/* This paint is used for drawing the "fill" that the component is comprised of. */
		this.fill_paint = new Paint();
		this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
		this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
		this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
		this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_3);
		this.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
		this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.fill_paint.set_font(global.DEFAULT_FONT);
		this.fill_paint.set_alpha(255);
		this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
		/* This paint is used for drawing the "text" that the component needs to display */
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(this.text_paint.style.FILL);
		this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
		this.text_paint.set_paint_join(this.text_paint.join.MITER);
		this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.text_paint.set_color(global.GENERAL_GREEN_COLOR);
		if (global.MOBILE_MODE) {
			this.text_paint.set_text_size(0.75 * global.CANVAS_TEXT_SIZE_6);
		} else {
			this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		}
		this.text_paint.set_font(global.DEFAULT_FONT);
		this.text_paint.set_paint_align(this.text_paint.align.RIGHT);
		/* The trim along the bottom side of the screen. We use a path to draw the arbitrary shape. */
		this.bottom_path = new Path();
		/* A button to access the users files. This will eventually be a call to a database once i get
    that setup. */
		this.file_button = new Button(view_port.left, menu_bar.settings_button.bottom + 2 * global.CANVAS_STROKE_WIDTH_4, view_port.left + 1, view_port.bottom);
		this.file_button.text = '';
		this.file_button.draw_stroke = false;
		this.file_button.text_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
		this.file_button.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
		this.file_button.resize_paint();
		/* This is so that the user may pick the timestep when the "automatic_timestep" settings is off.
    When it is on, the system shall figure out a good starting point and change the timestep to this
    value. */
		this.time_step_button = new Button(view_port.right - this.TIME_STEP_BUTTON_WIDTH, menu_bar.settings_button.bottom + 2 * global.CANVAS_STROKE_WIDTH_4, view_port.right, view_port.bottom);
		this.time_step_button.text = this.TIMESTEP_TEMPLATE.replace('{TIMESTEP}', global.exponentiate_quickly(global.time_step));
		this.time_step_button.draw_stroke = false;
		this.time_step_button.text_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
		this.time_step_button.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
		this.time_step_button.resize_paint();
		/* Loads the bottom path. */
		this.load_bottom_path();
		this.first_touch_x = 0;
		this.first_touch_y = 0;
		this.INITIAL_RESIZE_COUNTER = 0;
		this.INITIAL_RESIZE_COUNTER_MAX = global.CANVAS_REDRAW_MAX;
		this.RELOAD_BOTTOM_PATH = true;
	}
	/* Loads the bottom path. */
	load_bottom_path(): void {
		this.bottom_path.reset();
		this.bottom_path.move_to(view_port.left, this.file_button.top);
		this.bottom_path.line_to(this.file_button.right + global.CANVAS_STROKE_WIDTH_3, this.file_button.top);
		this.bottom_path.line_to(this.file_button.right + global.CANVAS_STROKE_WIDTH_6, view_port.bottom - global.CANVAS_STROKE_WIDTH_3);
		this.bottom_path.line_to(this.time_step_button.left - global.CANVAS_STROKE_WIDTH_6, view_port.bottom - global.CANVAS_STROKE_WIDTH_3);
		this.bottom_path.line_to(this.time_step_button.left - global.CANVAS_STROKE_WIDTH_3, this.time_step_button.top);
		this.bottom_path.line_to(view_port.right, this.time_step_button.top);
		this.bottom_path.line_to(view_port.right, view_port.bottom);
		this.bottom_path.line_to(view_port.left, view_port.bottom);
		this.bottom_path.close();
	}
	/* Incase there is any proccessing required for this element. */
	update(): void {}
	/* This is an event that will fire when the screen is resized. */
	resize_bottom_menu(): void {
		this.INITIAL_RESIZE_COUNTER = 0;
		this.RELOAD_BOTTOM_PATH = true;
		this.file_button.resize();
		this.time_step_button.resize();
		this.file_button.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.file_button.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.file_button.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.file_button.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.file_button.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.time_step_button.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.time_step_button.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.time_step_button.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.time_step_button.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.time_step_button.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		if (global.MOBILE_MODE) {
			this.file_button.text_paint.set_text_size(0.75 * global.CANVAS_TEXT_SIZE_6);
			this.time_step_button.text_paint.set_text_size(0.75 * global.CANVAS_TEXT_SIZE_6);
		} else {
			this.file_button.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
			this.time_step_button.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		}
		this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		if (global.MOBILE_MODE) {
			this.text_paint.set_text_size(0.75 * global.CANVAS_TEXT_SIZE_6);
		} else {
			this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		}
	}
	/* Handling any mouse down events. */
	mouse_down(): void {
		if (this.time_step_button.contains_xy(global.mouse_x, global.mouse_y)) {
			global.component_touched = true;
		}
		if (this.file_button.contains_xy(global.mouse_x, global.mouse_y)) {
			global.component_touched = true;
		}
		this.first_touch_x = global.mouse_x;
		this.first_touch_y = global.mouse_y;
	}
	/* Handling any mouse move events. */
	mouse_move(): void {}
	/* Handling any mouse up events. */
	mouse_up(): void {
		if (!global.is_right_click && this.time_step_button.contains_xy(this.first_touch_x, this.first_touch_y)) {
			if (!global.mouse_keyboard_lock && !multi_select_manager.CTRL_PRESSED && global.component_touched) {
				if (
					!global.FLAG_SIMULATING &&
					!global.FLAG_SAVE_IMAGE &&
					!global.FLAG_SAVE_CIRCUIT &&
					!global.FLAG_ZOOM &&
					!global.FLAG_ELEMENT_OPTIONS &&
					!global.FLAG_ELEMENT_OPTIONS_EDIT &&
					!global.FLAG_GRAPH &&
					!global.FLAG_SELECT_ELEMENT &&
					!global.FLAG_SELECT_TIMESTEP &&
					!global.FLAG_SELECT_SETTINGS &&
					!global.FLAG_REMOVE_ALL
				) {
					if (this.time_step_button.contains_xy(global.mouse_x, global.mouse_y)) {
						time_step_window.input_button.text = global.exponentiate_quickly(global.time_step);
						this.handle_timestep_flag(!global.FLAG_SELECT_TIMESTEP);
						/* Block out the reset selection portion of the code! */
						global.component_touched = true;
					}
				}
			}
		}
	}
	handle_file_explorer(): boolean {
		if (global.MOBILE_MODE) {
			global.mouse_keyboard_lock = false;
			global.component_touched = false;
		}
		if (!global.mouse_keyboard_lock) {
			if (
				!global.FLAG_SIMULATING &&
				!global.FLAG_SAVE_IMAGE &&
				!global.FLAG_SAVE_CIRCUIT &&
				!global.FLAG_ZOOM &&
				!global.FLAG_ELEMENT_OPTIONS &&
				!global.FLAG_ELEMENT_OPTIONS_EDIT &&
				!global.FLAG_GRAPH &&
				!global.FLAG_SELECT_ELEMENT &&
				!global.FLAG_SELECT_TIMESTEP &&
				!global.FLAG_SELECT_SETTINGS &&
				!global.FLAG_REMOVE_ALL &&
				!global.FLAG_MENU_OPEN_DOWN &&
				!global.component_touched
			) {
				if (this.file_button.contains_xy(global.mouse_x, global.mouse_y)) {
					/* Block out the reset selection portion of the code! */
					global.component_touched = true;
					return true;
				}
			}
		}
		return false;
	}
	handle_timestep_flag(ON: boolean): void {
		global.mouse_keyboard_lock = true;
		if (ON) {
			time_step_window.reset_cursor();
		}
		bottom_menu.resize_bottom_menu();
		global.FLAG_SELECT_TIMESTEP = ON;
	}
	recolor(): void {
		if (!global.FLAG_SIMULATING && !global.FLAG_GRAPH && !global.FLAG_MENU_OPEN_DOWN) {
			if (
				this.file_button.contains_xy(global.mouse_x, global.mouse_y) &&
				!global.FLAG_MENU_OPEN_DOWN &&
				!global.FLAG_MENU_OPEN_DOWN &&
				!global.FLAG_SIMULATING &&
				!global.FLAG_ZOOM &&
				!global.FLAG_SELECT_SETTINGS &&
				!global.FLAG_SAVE_IMAGE &&
				!global.FLAG_SAVE_CIRCUIT &&
				!global.FLAG_SELECT_TIMESTEP &&
				!global.FLAG_ELEMENT_OPTIONS_EDIT &&
				!global.FLAG_ELEMENT_OPTIONS &&
				!global.FLAG_GRAPH &&
				!global.FLAG_REMOVE_ALL &&
				!multi_select_manager.CTRL_PRESSED_STARTED &&
				!global.MOBILE_MODE
			) {
				this.file_button.text_paint.set_color(global.GENERAL_CYAN_COLOR);
			} else {
				this.file_button.text_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
			}
			if (
				this.time_step_button.contains_xy(global.mouse_x, global.mouse_y) &&
				!global.FLAG_MENU_OPEN_DOWN &&
				!global.FLAG_MENU_OPEN_DOWN &&
				!global.FLAG_SIMULATING &&
				!global.FLAG_ZOOM &&
				!global.FLAG_SELECT_SETTINGS &&
				!global.FLAG_SAVE_IMAGE &&
				!global.FLAG_SAVE_CIRCUIT &&
				!global.FLAG_SELECT_TIMESTEP &&
				!global.FLAG_ELEMENT_OPTIONS_EDIT &&
				!global.FLAG_ELEMENT_OPTIONS &&
				!global.FLAG_GRAPH &&
				!global.FLAG_REMOVE_ALL &&
				!multi_select_manager.CTRL_PRESSED_STARTED &&
				!global.MOBILE_MODE
			) {
				this.time_step_button.text_paint.set_color(global.GENERAL_CYAN_COLOR);
			} else {
				this.time_step_button.text_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
			}
		} else {
			if (
				this.file_button.contains_xy(global.mouse_x, global.mouse_y) &&
				!global.FLAG_MENU_OPEN_DOWN &&
				!global.FLAG_MENU_OPEN_DOWN &&
				!global.FLAG_SIMULATING &&
				!global.FLAG_ZOOM &&
				!global.FLAG_SELECT_SETTINGS &&
				!global.FLAG_SAVE_IMAGE &&
				!global.FLAG_SAVE_CIRCUIT &&
				!global.FLAG_SELECT_TIMESTEP &&
				!global.FLAG_ELEMENT_OPTIONS_EDIT &&
				!global.FLAG_ELEMENT_OPTIONS &&
				!global.FLAG_GRAPH &&
				!global.FLAG_REMOVE_ALL &&
				!multi_select_manager.CTRL_PRESSED_STARTED &&
				!global.MOBILE_MODE
			) {
				this.file_button.text_paint.set_color(global.GENERAL_CYAN_COLOR);
			} else {
				this.file_button.text_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
			}
			if (
				this.time_step_button.contains_xy(global.mouse_x, global.mouse_y) &&
				!global.FLAG_MENU_OPEN_DOWN &&
				!global.FLAG_MENU_OPEN_DOWN &&
				!global.FLAG_SIMULATING &&
				!global.FLAG_ZOOM &&
				!global.FLAG_SELECT_SETTINGS &&
				!global.FLAG_SAVE_IMAGE &&
				!global.FLAG_SAVE_CIRCUIT &&
				!global.FLAG_SELECT_TIMESTEP &&
				!global.FLAG_ELEMENT_OPTIONS_EDIT &&
				!global.FLAG_ELEMENT_OPTIONS &&
				!global.FLAG_GRAPH &&
				!global.FLAG_REMOVE_ALL &&
				!multi_select_manager.CTRL_PRESSED_STARTED &&
				!global.MOBILE_MODE
			) {
				this.time_step_button.text_paint.set_color(global.GENERAL_CYAN_COLOR);
			} else {
				this.time_step_button.text_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
			}
		}
	}
	/* Draws the bottom menu. */
	draw_bottom_menu(canvas: GraphicsEngine): void {
		this.recolor();
		this.file_button.text = language_manager.FILE[global.LANGUAGES[global.LANGUAGE_INDEX]] + global.user_file.title;
		this.time_step_button.text = this.TIMESTEP_TEMPLATE.replace('{TIMESTEP}', global.exponentiate_quickly(global.time_step));
		this.TIME_STEP_BUTTON_WIDTH = 1.25 * this.time_step_button.text_paint.measure_text(this.time_step_button.text);
		let padding: number = 2 * global.CANVAS_STROKE_WIDTH_4;
		/* Keep updating that bottom path's width baby! */
		this.file_button.set_bounds(
			view_port.left,
			menu_bar.settings_button.bottom + padding,
			view_port.left + this.file_button.text_paint.measure_text(this.FILE_BUTTON_TEXT_TEMPLATE.replace('{TEXT}', this.file_button.text)),
			view_port.bottom
		);
		this.time_step_button.set_bounds(view_port.right - this.TIME_STEP_BUTTON_WIDTH, menu_bar.settings_button.bottom + padding, view_port.right, view_port.bottom);
		if (this.DRAW_BOTTOM_PATH) {
			if (this.file_button.draw_fill) {
				this.file_button.draw_fill = false;
			}
			if (this.time_step_button.draw_fill) {
				this.time_step_button.draw_fill = false;
			}
			if (this.RELOAD_BOTTOM_PATH === true) {
				this.load_bottom_path();
				this.INITIAL_RESIZE_COUNTER++;
				if (this.INITIAL_RESIZE_COUNTER >= this.INITIAL_RESIZE_COUNTER_MAX) {
					this.INITIAL_RESIZE_COUNTER = 0;
					this.RELOAD_BOTTOM_PATH = false;
				}
			}
			canvas.draw_path(this.bottom_path, this.fill_paint);
		} else {
			if (!this.file_button.draw_fill) {
				this.file_button.draw_fill = true;
			}
			if (!this.time_step_button.draw_fill) {
				this.time_step_button.draw_fill = true;
			}
		}
		this.file_button.draw_button(canvas);
		this.time_step_button.draw_button(canvas);
		canvas.draw_text(this.VERSION_TAG_TEMPLATE.replace('{VERSION_TAG}', global.VERSION_TAG), view_port.right, menu_bar.settings_button.bottom, this.text_paint);
	}
}