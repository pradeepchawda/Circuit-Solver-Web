'use strict';
class GainBlockSymbol {
    constructor(rect, index, page) {
        this.index = index;
        this.page = page;
        this.bounds = new RectF(0, 0, 0, 0);
        if (global.not_null(rect)) {
            this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
        }
        this.p1 = new PointF(this.bounds.left, this.bounds.get_center_y());
        this.p2 = new PointF(this.bounds.right, this.bounds.get_center_y());
        this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
        this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.gain_0 = new PointF(0, 0);
        this.gain_1 = new PointF(0, 0);
        this.gain_2 = new PointF(0, 0);
        this.gain_3 = new PointF(0, 0);
        this.gain_4 = new PointF(0, 0);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.x_space = this.bounds.get_width() >> 2;
        this.y_space = this.bounds.get_height() >> 2;
        this.connect1_x = 0;
        this.connect1_y = 0;
        this.connect2_x = 0;
        this.connect2_y = 0;
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.canvas_stroke_width_2);
        this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.line_paint.set_text_size(global.canvas_text_size_4);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        this.point_paint = new Paint();
        this.point_paint.set_paint_style(this.point_paint.style.FILL);
        this.point_paint.set_paint_cap(this.point_paint.cap.ROUND);
        this.point_paint.set_paint_join(this.point_paint.join.MITER);
        this.point_paint.set_stroke_width(global.canvas_stroke_width_2);
        this.point_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.point_paint.set_text_size(global.canvas_text_size_4);
        this.point_paint.set_font(global.DEFAULT_FONT);
        this.point_paint.set_alpha(255);
        this.point_paint.set_paint_align(this.point_paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.canvas_stroke_width_2);
        this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.canvas_text_size_4);
        }
        else {
            this.text_paint.set_text_size(global.canvas_text_size_3);
        }
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.CENTER);
        this.text_paint_alt = new Paint();
        this.text_paint_alt.set_paint_style(this.text_paint_alt.style.FILL);
        this.text_paint_alt.set_paint_cap(this.text_paint_alt.cap.ROUND);
        this.text_paint_alt.set_paint_join(this.text_paint_alt.join.MITER);
        this.text_paint_alt.set_stroke_width(global.canvas_stroke_width_2);
        this.text_paint_alt.set_color(global.GENERAL_WHITE_COLOR);
        this.text_paint_alt.set_text_size(global.canvas_text_size_4);
        this.text_paint_alt.set_font(global.DEFAULT_FONT);
        this.text_paint_alt.set_alpha(255);
        this.text_paint_alt.set_paint_align(this.text_paint_alt.align.CENTER);
        this.text_background_paint = new Paint();
        this.text_background_paint.set_paint_style(this.text_background_paint.style.FILL);
        this.text_background_paint.set_paint_cap(this.text_background_paint.cap.ROUND);
        this.text_background_paint.set_paint_join(this.text_background_paint.join.MITER);
        this.text_background_paint.set_stroke_width(global.canvas_stroke_width_2);
        this.text_background_paint.set_color(global.GENERAL_HOVER_COLOR);
        this.text_background_paint.set_text_size(global.canvas_text_size_4);
        this.text_background_paint.set_font(global.DEFAULT_FONT);
        this.text_background_paint.set_alpha(255);
        this.text_background_paint.set_paint_align(this.text_background_paint.align.CENTER);
        this.build_element();
        this.flag_add_element = false;
        this.TAG = language_manager.TAG_GAIN;
        this.draw_tag = false;
        this.text_bounds = new RectF(0, 0, 0, 0);
        this.height_ratio = 0.35;
        this.line_buffer = [];
        this.circle_buffer = [];
    }
    update() {
        if (this.flag_add_element) {
            if (workspace.bounds.contains_xywh(global.mouse_x, global.mouse_y, workspace.bounds.get_width() - 4.5 * global.node_space_x, workspace.bounds.get_height() - 4.5 * global.node_space_y) &&
                !this.bounds.contains_xy(global.mouse_x, global.mouse_y)) {
                shortcut_manager.temp_history_snapshot = engine_functions.history_snapshot();
                global.signal_history_lock = true;
                engine_functions.add_gain();
                this.flag_add_element = false;
            }
        }
    }
    mouse_down(page, width, height) {
        if (this.page === page) {
            if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
                if (!this.flag_add_element) {
                    this.flag_add_element = true;
                    global.signal_add_element = true;
                    global.component_touched = true;
                }
            }
        }
    }
    mouse_move(page, width, height) {
        if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height) && !global.MOBILE_MODE) {
            this.draw_tag = true;
        }
        else {
            this.draw_tag = false;
        }
        if (this.page === page) {
        }
    }
    mouse_up(page, width, height) {
        if (this.page === page) {
            if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, width, height)) {
            }
            this.flag_add_element = false;
            global.signal_add_element = false;
        }
    }
    build_element() {
        this.gain_0.x = this.c_x - this.x_space * global.cosine(this.theta) + this.x_space * global.cosine(this.theta_m90);
        this.gain_0.y = this.c_y - this.x_space * global.sine(this.theta) + this.x_space * global.sine(this.theta_m90);
        this.gain_1.x = this.c_x - this.x_space * global.cosine(this.theta) - this.x_space * global.cosine(this.theta_m90);
        this.gain_1.y = this.c_y - this.x_space * global.sine(this.theta) - this.x_space * global.sine(this.theta_m90);
        this.gain_2.x = this.c_x + this.x_space * global.cosine(this.theta);
        this.gain_2.y = this.c_y + this.x_space * global.sine(this.theta);
        this.gain_3.x = this.c_x + this.x_space * 1.3 * global.cosine(this.theta);
        this.gain_3.y = this.c_y + this.x_space * 1.3 * global.sine(this.theta);
        this.gain_4.x = this.c_x - this.x_space * 0.4 * global.cosine(this.theta);
        this.gain_4.y = this.c_y - this.x_space * 0.4 * global.sine(this.theta);
        this.connect1_x = this.c_x - this.x_space * global.cosine(this.theta);
        this.connect1_y = this.c_y - this.y_space * global.sine(this.theta);
        this.connect2_x = this.c_x + this.x_space * global.cosine(this.theta);
        this.connect2_y = this.c_y + this.y_space * global.sine(this.theta);
    }
    resize(rect) {
        this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.x_space = this.bounds.get_width() >> 2;
        this.y_space = this.bounds.get_height() >> 2;
        this.p1.set_point(this.bounds.left, this.bounds.get_center_y());
        this.p2.set_point(this.bounds.right, this.bounds.get_center_y());
        this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
        this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.build_element();
        this.line_paint.set_stroke_width(global.canvas_stroke_width_2);
        this.line_paint.set_text_size(global.canvas_text_size_4);
        this.point_paint.set_stroke_width(global.canvas_stroke_width_2);
        this.point_paint.set_text_size(global.canvas_text_size_4);
        this.text_paint.set_stroke_width(global.canvas_stroke_width_2);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.canvas_text_size_4);
        }
        else {
            this.text_paint.set_text_size(global.canvas_text_size_3);
        }
        this.text_paint_alt.set_stroke_width(global.canvas_stroke_width_2);
        this.text_paint_alt.set_text_size(global.canvas_text_size_4);
    }
    recolor() {
        if (this.flag_add_element) {
            this.line_paint.set_color(global.SELECTED_COLOR);
            this.point_paint.set_color(global.SELECTED_COLOR);
            this.text_paint.set_color(global.SELECTED_COLOR);
        }
        else {
            this.line_paint.set_color(global.GENERAL_WHITE_COLOR);
            this.point_paint.set_color(global.GENERAL_WHITE_COLOR);
            this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        }
    }
    draw_symbol(canvas, page) {
        this.recolor();
        if (this.page === page) {
            let indexer = 0;
            this.circle_buffer = [];
            this.line_buffer = [];
            this.line_buffer[indexer++] = Array(this.gain_0.x, this.gain_0.y, this.gain_1.x, this.gain_1.y);
            this.line_buffer[indexer++] = Array(this.gain_0.x, this.gain_0.y, this.gain_2.x, this.gain_2.y);
            this.line_buffer[indexer++] = Array(this.gain_1.x, this.gain_1.y, this.gain_2.x, this.gain_2.y);
            this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
            this.line_buffer[indexer++] = Array(this.connect2_x, this.connect2_y, this.p2.x, this.p2.y);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            indexer = 0;
            canvas.draw_text('K', this.gain_4.x, this.gain_4.y, this.text_paint);
            this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.canvas_stroke_width_2);
            this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.canvas_stroke_width_2);
            canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
            if (this.draw_tag && !global.signal_add_element) {
                this.text_bounds.left = this.bounds.get_center_x() - 1.25 * (this.text_paint_alt.measure_text(this.TAG) >> 1);
                this.text_bounds.top = this.bounds.bottom + this.bounds.get_height() - this.height_ratio * this.bounds.get_height();
                this.text_bounds.right = this.bounds.get_center_x() + 1.25 * (this.text_paint_alt.measure_text(this.TAG) >> 1);
                this.text_bounds.bottom = this.bounds.bottom + this.bounds.get_height() + this.height_ratio * this.bounds.get_height();
            }
        }
    }
}
