'use strict';
class ToggleSwitch extends RectF {
    constructor(left, top, right, bottom) {
        super(left, top, right, bottom);
        this.draw_fill = false;
        this.draw_stroke = true;
        this.draw_text = true;
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(paint.style.STROKE);
        this.line_paint.set_paint_cap(paint.cap.ROUND);
        this.line_paint.set_paint_join(paint.join.ROUND);
        this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.line_paint.set_color(global.COLORS.GENERAL_GRAY_COLOR);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.line_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(paint.align.CENTER);
        this.fill_paint = new Paint();
        this.fill_paint.set_paint_style(paint.style.FILL);
        this.fill_paint.set_paint_cap(paint.cap.ROUND);
        this.fill_paint.set_paint_join(paint.join.ROUND);
        this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
        this.fill_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.fill_paint.set_alpha(255);
        this.fill_paint.set_paint_align(paint.align.CENTER);
        this.toggle_paint = new Paint();
        this.toggle_paint.set_paint_style(paint.style.FILL);
        this.toggle_paint.set_paint_cap(paint.cap.ROUND);
        this.toggle_paint.set_paint_join(paint.join.ROUND);
        this.toggle_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.toggle_paint.set_color(global.COLORS.GENERAL_CYAN_COLOR);
        this.toggle_paint.set_text_size(global.variables.canvas_text_size_4);
        this.toggle_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.toggle_paint.set_alpha(192);
        this.toggle_paint.set_paint_align(paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(paint.style.FILL);
        this.text_paint.set_paint_cap(paint.cap.ROUND);
        this.text_paint.set_paint_join(paint.join.ROUND);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.text_paint.set_color(global.COLORS.GENERAL_WHITE_COLOR);
        if (MOBILE_MODE) {
            this.text_paint.set_text_size(global.variables.canvas_text_size_5);
        }
        else {
            this.text_paint.set_text_size(global.variables.canvas_text_size_4);
        }
        this.text_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(paint.align.CENTER);
        this.state = global.CONSTANTS.ON;
    }
    resize_paint() {
        this.line_paint.set_stroke_width(global.variables.canvas_stroke_width_2);
        this.line_paint.set_text_size(global.variables.canvas_text_size_4);
        this.fill_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.fill_paint.set_text_size(global.variables.canvas_text_size_4);
        this.toggle_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.toggle_paint.set_text_size(global.variables.canvas_text_size_4);
        this.text_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        if (MOBILE_MODE) {
            this.text_paint.set_text_size(global.variables.canvas_text_size_5);
        }
        else {
            this.text_paint.set_text_size(global.variables.canvas_text_size_4);
        }
    }
    resize_toggle_switch() {
        this.resize();
    }
    draw_toggle_switch(canvas) {
        let padding = this.get_height() * 0.15;
        if (this.draw_fill) {
            canvas.draw_rect2(this, this.fill_paint);
        }
        if (this.state === global.CONSTANTS.ON) {
            canvas.draw_rect(this.get_center_x() + padding, this.top + padding, this.right - padding, this.bottom - padding, this.toggle_paint);
            if (this.draw_text) {
                canvas.draw_text(this.state, this.left + this.get_width() * 0.25, this.get_center_y(), this.text_paint);
            }
        }
        else if (this.state === global.CONSTANTS.OFF) {
            canvas.draw_rect(this.left + padding, this.top + padding, this.get_center_x() - padding, this.bottom - padding, this.toggle_paint);
            if (this.draw_text) {
                canvas.draw_text(this.state, this.right - this.get_width() * 0.25, this.get_center_y(), this.text_paint);
            }
        }
        if (this.draw_stroke) {
            canvas.draw_rect2(this, this.line_paint);
        }
    }
    draw_toggle_switch_dxdy(canvas, offset_x, offset_y) {
        let padding = this.get_height() * 0.175;
        if (this.draw_fill) {
            canvas.draw_rect(this.left + offset_x, this.top + offset_y, this.right + offset_x, this.bottom + offset_y, this.fill_paint);
        }
        if (this.state === global.CONSTANTS.ON) {
            canvas.draw_rect(this.get_center_x() + padding + offset_x, this.top + padding + offset_y, this.right - this.get_height() * 0.1 + offset_x - (padding >> 1), this.bottom - padding + offset_y, this.toggle_paint);
            if (this.draw_text) {
                canvas.draw_text(this.state, this.left + this.get_width() * 0.25 + offset_x, this.get_center_y() + offset_y, this.text_paint);
            }
        }
        else if (this.state === global.CONSTANTS.OFF) {
            canvas.draw_rect(this.left + padding + offset_x, this.top + padding + offset_y, this.get_center_x() - this.get_height() * 0.1 + offset_x - (padding >> 1), this.bottom - padding + offset_y, this.toggle_paint);
            if (this.draw_text) {
                canvas.draw_text(this.state, this.right - this.get_width() * 0.25 + offset_x, this.get_center_y() + offset_y, this.text_paint);
            }
        }
        if (this.draw_stroke) {
            canvas.draw_rect(this.left + offset_x, this.top + offset_y, this.right + offset_x, this.bottom + offset_y, this.line_paint);
        }
    }
}
