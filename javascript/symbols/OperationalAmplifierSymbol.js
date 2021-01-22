'use strict';
class OperationalAmplifierSymbol {
    constructor(rect, index, page) {
        this.index = index;
        this.page = page;
        this.bounds = new RectF(0, 0, 0, 0);
        if (global.not_null(rect)) {
            this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
        }
        this.p1 = new PointF(this.bounds.left, this.bounds.top);
        this.p2 = new PointF(this.bounds.left, this.bounds.bottom);
        this.p3 = new PointF(this.bounds.right, this.bounds.get_center_y());
        this.op_0 = new PointF(0, 0);
        this.op_1 = new PointF(0, 0);
        this.op_2 = new PointF(0, 0);
        this.op_3 = new PointF(0, 0);
        this.op_4 = new PointF(0, 0);
        this.op_5 = new PointF(0, 0);
        this.op_6 = new PointF(0, 0);
        this.op_7 = new PointF(0, 0);
        this.op_8 = new PointF(0, 0);
        this.op_9 = new PointF(0, 0);
        this.op_10 = new PointF(0, 0);
        this.op_11 = new PointF(0, 0);
        this.op_12 = new PointF(0, 0);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
        this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
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
        this.text_paint.set_text_size(global.canvas_text_size_4);
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.CENTER);
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
        this.tag = language_manager.TAG_OPAMP;
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
                engine_functions.add_opamp();
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
        this.op_0.x = this.p1.x + 1.5 * this.x_space * global.cosine(this.theta);
        this.op_0.y = this.p1.y + 1.5 * this.y_space * global.sine(this.theta);
        this.op_1.x = this.op_0.x + 0.75 * this.x_space * global.cosine(this.theta_m90);
        this.op_1.y = this.op_0.y + 0.75 * this.y_space * global.sine(this.theta_m90);
        this.op_2.x = this.op_1.x + 0.75 * this.x_space * global.cosine(this.theta - Math.PI);
        this.op_2.y = this.op_1.y + 0.75 * this.y_space * global.sine(this.theta - Math.PI);
        this.op_3.x = this.p1.x + 2.5 * this.x_space * global.cosine(this.theta);
        this.op_3.y = this.p1.y + 2.5 * this.y_space * global.sine(this.theta);
        this.op_4.x = this.op_3.x + 0.75 * this.x_space * global.cosine(this.theta_m90);
        this.op_4.y = this.op_3.y + 0.75 * this.y_space * global.sine(this.theta_m90);
        this.op_5.x = this.op_4.x + 0.75 * this.x_space * global.cosine(this.theta);
        this.op_5.y = this.op_4.y + 0.75 * this.y_space * global.sine(this.theta);
        this.op_6.x = this.p3.x - 0.75 * this.x_space * global.cosine(this.theta_m90);
        this.op_6.y = this.p3.y - 0.75 * this.y_space * global.sine(this.theta_m90);
        this.op_7.x = this.p1.x + 1.5 * this.x_space * global.cosine(this.theta) + this.x_space * global.cosine(this.theta_m90);
        this.op_7.y = this.p1.y + 1.5 * this.y_space * global.sine(this.theta) + this.y_space * global.sine(this.theta_m90);
        this.op_8.x = this.p1.x + 1.5 * this.x_space * global.cosine(this.theta) + 1.4 * this.x_space * global.cosine(this.theta_m90);
        this.op_8.y = this.p1.y + 1.5 * this.y_space * global.sine(this.theta) + 1.4 * this.y_space * global.sine(this.theta_m90);
        this.op_9.x = this.p1.x + 1.3 * this.x_space * global.cosine(this.theta) + 1.2 * this.x_space * global.cosine(this.theta_m90);
        this.op_9.y = this.p1.y + 1.3 * this.y_space * global.sine(this.theta) + 1.2 * this.y_space * global.sine(this.theta_m90);
        this.op_10.x = this.p1.x + 1.7 * this.x_space * global.cosine(this.theta) + 1.2 * this.x_space * global.cosine(this.theta_m90);
        this.op_10.y = this.p1.y + 1.7 * this.y_space * global.sine(this.theta) + 1.2 * this.y_space * global.sine(this.theta_m90);
        this.op_11.x = this.p1.x + 2.5 * this.x_space * global.cosine(this.theta) + this.x_space * global.cosine(this.theta_m90);
        this.op_11.y = this.p1.y + 2.5 * this.y_space * global.sine(this.theta) + this.y_space * global.sine(this.theta_m90);
        this.op_12.x = this.p1.x + 2.5 * this.x_space * global.cosine(this.theta) + 1.4 * this.x_space * global.cosine(this.theta_m90);
        this.op_12.y = this.p1.y + 2.5 * this.y_space * global.sine(this.theta) + 1.4 * this.y_space * global.sine(this.theta_m90);
    }
    resize(rect) {
        this.bounds.set_bounds(rect.left, rect.top, rect.right, rect.bottom);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.x_space = this.bounds.get_width() >> 2;
        this.y_space = this.bounds.get_height() >> 2;
        this.p1.set_point(this.bounds.left, this.bounds.top);
        this.p2.set_point(this.bounds.left, this.bounds.bottom);
        this.p3.set_point(this.bounds.right, this.bounds.get_center_y());
        this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
        this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.phi = global.retrieve_angle_radian(this.c_x - this.p2.x, this.c_y - this.p2.y);
        this.build_element();
        this.line_paint.set_stroke_width(global.canvas_stroke_width_2);
        this.line_paint.set_text_size(global.canvas_text_size_4);
        this.point_paint.set_stroke_width(global.canvas_stroke_width_2);
        this.point_paint.set_text_size(global.canvas_text_size_4);
        this.text_paint.set_stroke_width(global.canvas_stroke_width_2);
        this.text_paint.set_text_size(global.canvas_text_size_4);
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
            this.line_buffer[indexer++] = Array(this.p1.x, this.p1.y, this.op_0.x, this.op_0.y);
            this.line_buffer[indexer++] = Array(this.op_0.x, this.op_0.y, this.op_1.x, this.op_1.y);
            this.line_buffer[indexer++] = Array(this.p2.x, this.p2.y, this.op_3.x, this.op_3.y);
            this.line_buffer[indexer++] = Array(this.op_3.x, this.op_3.y, this.op_4.x, this.op_4.y);
            this.line_buffer[indexer++] = Array(this.op_2.x, this.op_2.y, this.op_5.x, this.op_5.y);
            this.line_buffer[indexer++] = Array(this.op_2.x, this.op_2.y, this.op_6.x, this.op_6.y);
            this.line_buffer[indexer++] = Array(this.op_5.x, this.op_5.y, this.op_6.x, this.op_6.y);
            this.line_buffer[indexer++] = Array(this.op_6.x, this.op_6.y, this.p3.x, this.p3.y);
            this.line_buffer[indexer++] = Array(this.op_7.x, this.op_7.y, this.op_8.x, this.op_8.y);
            this.line_buffer[indexer++] = Array(this.op_9.x, this.op_9.y, this.op_10.x, this.op_10.y);
            this.line_buffer[indexer++] = Array(this.op_11.x, this.op_11.y, this.op_12.x, this.op_12.y);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            indexer = 0;
            this.circle_buffer[indexer++] = Array(this.p1.x, this.p1.y, 1.5 * global.canvas_stroke_width_2);
            this.circle_buffer[indexer++] = Array(this.p2.x, this.p2.y, 1.5 * global.canvas_stroke_width_2);
            this.circle_buffer[indexer++] = Array(this.p3.x, this.p3.y, 1.5 * global.canvas_stroke_width_2);
            canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
            if (this.draw_tag && !global.signal_add_element) {
                this.text_bounds.left = this.bounds.get_center_x() - 1.25 * (this.text_paint.measure_text(this.tag) >> 1);
                this.text_bounds.top = this.bounds.bottom + this.bounds.get_height() - this.height_ratio * this.bounds.get_height();
                this.text_bounds.right = this.bounds.get_center_x() + 1.25 * (this.text_paint.measure_text(this.tag) >> 1);
                this.text_bounds.bottom = this.bounds.bottom + this.bounds.get_height() + this.height_ratio * this.bounds.get_height();
                canvas.draw_rect2(this.text_bounds, this.text_background_paint);
                canvas.draw_text(this.tag, this.bounds.get_center_x(), this.text_bounds.get_center_y(), this.text_paint);
            }
        }
    }
}
