'use strict';
class Toast {
    constructor() {
        if (global.CONSTANTS.MOBILE_MODE) {
            this.height_ratio = 0.85;
            this.HEIGHT_FACTOR = 0.7;
        }
        else {
            this.height_ratio = 0.9;
            this.HEIGHT_FACTOR = 0.5;
        }
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(PAINT.style.STROKE);
        this.line_paint.set_paint_cap(PAINT.cap.ROUND);
        this.line_paint.set_paint_join(PAINT.join.MITER);
        this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.line_paint.set_color(global.COLORS.GENERAL_BLACK_COLOR);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(PAINT.align.CENTER);
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(PAINT.style.FILL);
        this.fill_paint.set_paint_cap(PAINT.cap.ROUND);
        this.fill_paint.set_paint_join(PAINT.join.MITER);
        this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint.set_color(global.COLORS.GENERAL_BOUNDS_COLOR);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
        this.fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.fill_paint.set_alpha(255);
        this.fill_paint.set_paint_align(PAINT.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(PAINT.style.FILL);
        this.text_paint.set_paint_cap(PAINT.cap.ROUND);
        this.text_paint.set_paint_join(PAINT.join.MITER);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        if (global.CONSTANTS.MOBILE_MODE) {
            this.text_paint.set_text_size(global.variables.canvas_text_size_5 * 1.25);
        }
        else {
            this.text_paint.set_text_size(global.variables.canvas_text_size_4);
        }
        this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(PAINT.align.CENTER);
        this.text = '';
        this.timer = 0;
        this.MAX_SECONDS = 2;
        this.MAX_TIME = FPS;
        this.draw_text = false;
        this.bounds = new RectF(0, 0, 0, 0);
        this.toast_request_draw = false;
        this.last_text = '-';
        this.text_measure_div2 = -1;
    }
    update() {
        if (this.draw_text) {
            this.timer++;
            if (this.timer >= this.MAX_TIME * this.MAX_SECONDS) {
                this.reset();
            }
        }
    }
    reset() {
        this.text = '';
        this.last_text = '-';
        this.timer = 0;
        this.draw_text = false;
        this.toast_request_draw = true;
    }
    set_text(str) {
        this.text = language_manager.TEXT_PADDING + str + language_manager.TEXT_PADDING;
        this.last_text = '-';
    }
    show() {
        this.timer = 0;
        this.draw_text = true;
    }
    resize_toast() {
        this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        if (global.CONSTANTS.MOBILE_MODE) {
            this.text_paint.set_text_size(global.variables.canvas_text_size_5 * 1.25);
        }
        else {
            this.text_paint.set_text_size(global.variables.canvas_text_size_4);
        }
        this.last_text = this.text;
        this.text_measure_div2 = this.text_paint.measure_text(this.text) * 0.5;
    }
    draw_toast(canvas) {
        if (this.draw_text) {
            if (this.last_text !== this.text) {
                this.last_text = this.text;
                this.text_measure_div2 = this.text_paint.measure_text(this.text) * 0.5;
            }
            this.bounds.left = view_port.center_x - this.text_measure_div2;
            this.bounds.top = view_port.top + view_port.view_height * this.height_ratio;
            this.bounds.right = view_port.center_x + this.text_measure_div2;
            this.bounds.bottom = view_port.top + view_port.view_height * (this.height_ratio + (1.0 - this.height_ratio) * this.HEIGHT_FACTOR);
            canvas.draw_rect2(this.bounds, this.fill_paint);
            canvas.draw_rect2(this.bounds, this.line_paint);
            canvas.draw_text(this.text, this.bounds.get_center_x(), this.bounds.get_center_y(), this.text_paint);
            this.update();
        }
        if (this.toast_request_draw) {
            this.toast_request_draw = false;
        }
    }
}
