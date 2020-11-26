/**********************************************************************
 * Project           : Circuit Solver
 * File		        : GraphWindow.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to draw all the graphs required by the application.
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
var GraphWindow = /** @class */ (function () {
    function GraphWindow() {
        this.bounds = new RectF(0, 0, 0, 0);
        this.inner_bounds = new RectF(0, 0, 0, 0);
        this.X_AXIS_LENGTH = 1200;
        this.Y_AXIS_LENGTH = 100;
        this.RATIO = 0.75;
        this.SCOPE_0_INDEX = 0;
        this.SCOPE_1_INDEX = 1;
        this.SCOPE_2_INDEX = 2;
        /* Padding for the graph window. */
        this.PADDING = global.CANVAS_STROKE_WIDTH_5;
        /* This controls the width of the buttons relative to the width of the window */
        this.BUTTON_WIDTH_RATIO = 0.085;
        /* This controls the height of the buttons relative to the height of the window */
        this.BUTTON_HEIGHT_RATIO = 0.05;
        /* This paint is used for drawing the "lines" that the component is comprised of. */
        this.line_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.bounds_paint = new Paint();
        /* This paint is used for drawing the "fill" that the component is comprised of. */
        this.fill_paint = new Paint();
        /* This paint is used for drawing the "text" that the component needs to display */
        this.text_paint = new Paint();
        /* This paint is used for drawing the icons that the component is comprised of. */
        this.hover_paint = new Paint();
        /* This paint is used for drawing the "text" that the component needs to display */
        this.graph_text_a_paint = new Paint();
        /* This paint is used for drawing the "text" that the component needs to display */
        this.graph_text_b_paint = new Paint();
        /* This paint is used for drawing the "text" that the component needs to display */
        this.graph_text_c_paint = new Paint();
        this.x_axis = new Array(this.X_AXIS_LENGTH).fill(new PointF(0, 0));
        this.y_axis = new Array(this.Y_AXIS_LENGTH).fill(new PointF(0, 0));
        this.graph_trace_a = new Trace(this.X_AXIS_LENGTH, this.Y_AXIS_LENGTH, this.RATIO);
        this.graph_trace_b = new Trace(this.X_AXIS_LENGTH, this.Y_AXIS_LENGTH, this.RATIO);
        this.graph_trace_c = new Trace(this.X_AXIS_LENGTH, this.Y_AXIS_LENGTH, this.RATIO);
        this.meter_hover_index = -1;
        this.time_axis_value = '';
        this.time_tag = '';
        this.download_button = new Button(0, 0, 0, 0);
        /* Enforcing the system from cascading events. */
        this.first_touch_x = 0;
        this.first_touch_y = 0;
        /* Quickly drawing the lines for the workspace without wasting time on over-head calls.  */
        this.LINE_BUFFER = [];
        this.trim = 0;
        this.width = 0;
        this.height = 0;
        this.bounds = new RectF(0, 0, 0, 0);
        this.inner_bounds = new RectF(0, 0, 0, 0);
        this.X_AXIS_LENGTH = 1200;
        this.Y_AXIS_LENGTH = 100;
        this.RATIO = 0.75;
        this.SCOPE_0_INDEX = 0;
        this.SCOPE_1_INDEX = 1;
        this.SCOPE_2_INDEX = 2;
        this.bounds.left = view_port.left;
        this.bounds.right = view_port.right;
        this.bounds.top =
            menu_bar.graph_button.bottom + 2 * global.CANVAS_STROKE_WIDTH_3;
        this.bounds.bottom = view_port.bottom;
        /* Padding for the graph window. */
        this.PADDING = global.CANVAS_STROKE_WIDTH_5;
        if (global.MOBILE_MODE) {
            /* This controls the width of the buttons relative to the width of the window */
            this.BUTTON_WIDTH_RATIO = 0.12;
            /* This controls the height of the buttons relative to the height of the window */
            this.BUTTON_HEIGHT_RATIO = 0.08;
        }
        else {
            /* This controls the width of the buttons relative to the width of the window */
            this.BUTTON_WIDTH_RATIO = 0.085;
            /* This controls the height of the buttons relative to the height of the window */
            this.BUTTON_HEIGHT_RATIO = 0.05;
        }
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
        this.fill_paint.set_color(global.GRAPH_AREA_COLOR);
        this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.fill_paint.set_font(global.DEFAULT_FONT);
        this.fill_paint.set_alpha(255);
        this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
        /* This paint is used for drawing the "text" that the component needs to display */
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.text_paint.set_color(global.GENERAL_RED_COLOR);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        }
        else {
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
        this.hover_paint.set_alpha(191);
        this.hover_paint.set_paint_align(this.hover_paint.align.CENTER);
        /* This paint is used for drawing the "text" that the component needs to display */
        this.graph_text_a_paint = new Paint();
        this.graph_text_a_paint.set_paint_style(this.graph_text_a_paint.style.FILL);
        this.graph_text_a_paint.set_paint_cap(this.graph_text_a_paint.cap.ROUND);
        this.graph_text_a_paint.set_paint_join(this.graph_text_a_paint.join.MITER);
        this.graph_text_a_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.graph_text_a_paint.set_color(global.TRACE_I_COLOR);
        this.graph_text_a_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.graph_text_a_paint.set_font(global.DEFAULT_FONT);
        this.graph_text_a_paint.set_alpha(255);
        this.graph_text_a_paint.set_paint_align(this.graph_text_a_paint.align.LEFT);
        /* This paint is used for drawing the "text" that the component needs to display */
        this.graph_text_b_paint = new Paint();
        this.graph_text_b_paint.set_paint_style(this.graph_text_b_paint.style.FILL);
        this.graph_text_b_paint.set_paint_cap(this.graph_text_b_paint.cap.ROUND);
        this.graph_text_b_paint.set_paint_join(this.graph_text_b_paint.join.MITER);
        this.graph_text_b_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.graph_text_b_paint.set_color(global.TRACE_II_COLOR);
        this.graph_text_b_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.graph_text_b_paint.set_font(global.DEFAULT_FONT);
        this.graph_text_b_paint.set_alpha(255);
        this.graph_text_b_paint.set_paint_align(this.graph_text_b_paint.align.LEFT);
        /* This paint is used for drawing the "text" that the component needs to display */
        this.graph_text_c_paint = new Paint();
        this.graph_text_c_paint.set_paint_style(this.graph_text_c_paint.style.FILL);
        this.graph_text_c_paint.set_paint_cap(this.graph_text_c_paint.cap.ROUND);
        this.graph_text_c_paint.set_paint_join(this.graph_text_c_paint.join.MITER);
        this.graph_text_c_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.graph_text_c_paint.set_color(global.TRACE_III_COLOR);
        this.graph_text_c_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.graph_text_c_paint.set_font(global.DEFAULT_FONT);
        this.graph_text_c_paint.set_alpha(255);
        this.graph_text_c_paint.set_paint_align(this.graph_text_c_paint.align.LEFT);
        this.x_axis = new Array(this.X_AXIS_LENGTH).fill(new PointF(0, 0));
        this.y_axis = new Array(this.Y_AXIS_LENGTH).fill(new PointF(0, 0));
        this.graph_trace_a = new Trace(this.X_AXIS_LENGTH, this.Y_AXIS_LENGTH, this.RATIO);
        this.graph_trace_a.set_color(global.TRACE_I_COLOR);
        this.graph_trace_b = new Trace(this.X_AXIS_LENGTH, this.Y_AXIS_LENGTH, this.RATIO);
        this.graph_trace_b.set_color(global.TRACE_II_COLOR);
        this.graph_trace_c = new Trace(this.X_AXIS_LENGTH, this.Y_AXIS_LENGTH, this.RATIO);
        this.graph_trace_c.set_color(global.TRACE_III_COLOR);
        this.meter_hover_index = -1;
        this.time_axis_value = '';
        this.time_tag = '';
        this.load_axis();
        var padding = 0.0125 * this.bounds.get_width();
        if (global.MOBILE_MODE) {
            padding = 0.00875 * this.bounds.get_width();
        }
        var width = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
        var height = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
        this.download_button = new Button(this.inner_bounds.right - width, this.inner_bounds.top + padding, this.inner_bounds.right - padding, this.inner_bounds.top + padding + height);
        this.download_button.text = 'CSV';
        this.download_button.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.download_button.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.download_button.fill_paint.set_alpha(130);
        this.download_button.draw_stroke = false;
        this.download_button.draw_fill = true;
        /* Enforcing the system from cascading events. */
        this.first_touch_x = 0;
        this.first_touch_y = 0;
        /* Quickly drawing the lines for the workspace without wasting time on over-head calls.  */
        this.LINE_BUFFER = [];
    }
    GraphWindow.prototype.load_axis = function () {
        this.x_axis = new Array(this.X_AXIS_LENGTH).fill(new PointF(0, 0));
        this.y_axis = new Array(this.Y_AXIS_LENGTH).fill(new PointF(0, 0));
        var left = this.bounds.left + this.PADDING;
        var top = this.bounds.top + 2 * this.PADDING;
        var right = this.bounds.right - this.PADDING;
        var bottom = this.bounds.bottom - this.PADDING;
        this.inner_bounds = new RectF(left, top, right, bottom);
        this.trim = (this.bounds.get_width() - this.inner_bounds.get_width()) * 0.5;
        this.width = this.inner_bounds.get_width();
        this.height = this.inner_bounds.get_height();
        this.graph_trace_a.update_parameters(this.inner_bounds, this.RATIO, this.width, this.height, this.trim);
        this.graph_trace_b.update_parameters(this.inner_bounds, this.RATIO, this.width, this.height, this.trim);
        this.graph_trace_c.update_parameters(this.inner_bounds, this.RATIO, this.width, this.height, this.trim);
        for (var i = 0; i < this.X_AXIS_LENGTH >> 1; i++) {
            this.x_axis[i] = new PointF(left + (this.width / (this.x_axis.length >> 1)) * i, top);
            this.x_axis[i + (this.x_axis.length >> 1)] = new PointF(left + (this.width / (this.x_axis.length >> 1)) * i, bottom);
            if (i < this.y_axis.length * 0.5) {
                this.y_axis[i] = new PointF(left, top + (this.height / (this.y_axis.length * 0.5)) * i);
                this.y_axis[i + this.y_axis.length * 0.5] = new PointF(right, top + (this.height / (this.y_axis.length * 0.5)) * i);
            }
        }
    };
    GraphWindow.prototype.resize_window = function () {
        /* Padding for the graph window. */
        this.PADDING = global.CANVAS_STROKE_WIDTH_5;
        this.bounds.left = view_port.left;
        this.bounds.right = view_port.right;
        this.bounds.top =
            menu_bar.graph_button.bottom + 2 * global.CANVAS_STROKE_WIDTH_3;
        this.bounds.bottom = view_port.bottom;
        this.load_axis();
        /* Resize the stroke widths and the text sizes. */
        this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        if (global.MOBILE_MODE) {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        }
        else {
            this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        }
        this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.bounds_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.bounds_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.graph_text_a_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.graph_text_a_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.graph_text_b_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.graph_text_b_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.graph_text_c_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.graph_text_c_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        this.hover_paint.set_stroke_width(0.6 * global.CANVAS_STROKE_WIDTH_3);
        this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        /* Resize the traces */
        this.graph_trace_a.resize_trace();
        this.graph_trace_b.resize_trace();
        this.graph_trace_c.resize_trace();
        /* Recalculates the padding with and height of the buttons as well as refactors the attribute rectangles */
        var padding = 0.0125 * this.bounds.get_width();
        if (global.MOBILE_MODE) {
            padding = 0.00875 * this.bounds.get_width();
        }
        var width = this.BUTTON_WIDTH_RATIO * this.bounds.get_width();
        var height = this.BUTTON_HEIGHT_RATIO * this.bounds.get_height();
        this.download_button.set_bounds(this.inner_bounds.right - width, this.inner_bounds.top + padding, this.inner_bounds.right - padding, this.inner_bounds.top + padding + height);
        this.download_button.resize_paint();
    };
    GraphWindow.prototype.reset_trace = function (index) {
        if (index === 0) {
            this.graph_trace_a.reset();
        }
        else if (index === 1) {
            this.graph_trace_b.reset();
        }
        else if (index === 2) {
            this.graph_trace_c.reset();
        }
    };
    /* reset the trace and remove all the points. */
    GraphWindow.prototype.reset = function () {
        this.graph_trace_a.reset();
        this.graph_trace_b.reset();
        this.graph_trace_c.reset();
    };
    /* Add a new value to the trace (A) */
    GraphWindow.prototype.push_trace_a = function (value, t) {
        this.graph_trace_a.push(value, t);
    };
    /* Add a new value to the trace (B) */
    GraphWindow.prototype.push_trace_b = function (value, t) {
        this.graph_trace_b.push(value, t);
    };
    /* Add a new value to the trace (C) */
    GraphWindow.prototype.push_trace_c = function (value, t) {
        this.graph_trace_c.push(value, t);
    };
    /* Catch any mouse events within the graph view, this makes the main program look
    cleaner! */
    GraphWindow.prototype.mouse_down = function () {
        if (global.FLAG_GRAPH) {
            this.first_touch_x = global.mouse_x;
            this.first_touch_y = global.mouse_y;
            if (this.download_button.contains_xy(global.mouse_x, global.mouse_y)) {
                this.generate_csv();
            }
        }
    };
    GraphWindow.prototype.generate_csv = function () {
        var str = '';
        var temp_str = '';
        var time_stamp = '';
        str += 'time, trace_a, trace_b, trace_c\n';
        var max = Math.max(Math.max(this.graph_trace_a.trace.length, this.graph_trace_b.trace.length), this.graph_trace_c.trace.length);
        var updated_time = false;
        for (var i = 0; i < max; i++) {
            time_stamp = '0, ';
            updated_time = false;
            temp_str = '';
            if (i < this.graph_trace_a.trace.length) {
                if (!updated_time) {
                    time_stamp = this.graph_trace_a.get_value_double(i)[0] + ', ';
                    updated_time = true;
                }
                temp_str += this.graph_trace_a.get_value_double(i)[1] + ', ';
            }
            else {
                temp_str += '0, ';
            }
            if (i < this.graph_trace_b.trace.length) {
                if (!updated_time) {
                    time_stamp = this.graph_trace_b.get_value_double(i)[0] + ', ';
                    updated_time = true;
                }
                temp_str += this.graph_trace_b.get_value_double(i)[1] + ', ';
            }
            else {
                temp_str += '0, ';
            }
            if (i < this.graph_trace_c.trace.length) {
                if (!updated_time) {
                    time_stamp = this.graph_trace_c.get_value_double(i)[0] + ', ';
                    updated_time = true;
                }
                temp_str += this.graph_trace_c.get_value_double(i)[1] + ', ';
            }
            else {
                temp_str += '0, ';
            }
            temp_str = temp_str.substring(0, temp_str.length - 2);
            temp_str += '\n';
            str += time_stamp + temp_str;
        }
        if (!global.MOBILE_MODE) {
            save_file(global.USER_FILE.title + '_csv.txt', str);
        }
        else {
            window.JsInterface.javascript_native_hook('push-csv', global.USER_FILE.title + '_csv.txt', str);
        }
    };
    GraphWindow.prototype.mouse_move = function () {
        if (global.FLAG_GRAPH) {
            this.mouse_hover();
        }
    };
    GraphWindow.prototype.mouse_up = function () { };
    /* This function converts the users xy coordinates into an index so the graph's
    information can be displayed for easy visualization. */
    GraphWindow.prototype.mouse_hover = function () {
        if (this.inner_bounds.contains_xy(global.mouse_x, global.mouse_y)) {
            this.meter_hover_index = Math.round(((global.mouse_x - this.inner_bounds.left) /
                (this.inner_bounds.get_width() / this.X_AXIS_LENGTH)) *
                0.5);
        }
        else {
            this.meter_hover_index = -1;
        }
    };
    GraphWindow.prototype.key_down = function (key_event) {
        if (global.FLAG_GRAPH) {
            if (key_event['event'].keyCode === global.KEY_CODE_ESCAPE) {
                menu_bar.handle_graph_flag(!global.FLAG_GRAPH);
                /* Block out the reset selection portion of the code! */
                global.component_touched = true;
            }
        }
    };
    /* Draw the Graph Window */
    GraphWindow.prototype.draw_window = function (canvas) {
        if (global.FLAG_GRAPH) {
            /* The graph view is comprised of two views, a main bounds and an inner bounds. */
            /* First we draw the main bounds and then the inner bounds. Note the types of paint
            being used to draw each one of these portions. */
            canvas.draw_rect2(this.bounds, this.fill_paint);
            canvas.draw_round_rect2(this.inner_bounds, this.PADDING >> 1, this.line_paint);
            var cached_value = this.x_axis.length >> 1;
            var cached_value_t_p_o1 = (global.ZERO_PT_FIVE + cached_value * 0.1) >> global.ZERO;
            var temp = 0;
            var index = 0;
            for (var i = 0; i < cached_value; i += cached_value_t_p_o1) {
                temp = i + cached_value;
                this.LINE_BUFFER[index++] = Array(this.x_axis[temp].x, this.x_axis[temp].y, this.x_axis[temp].x, this.x_axis[temp].y - this.inner_bounds.get_width() * 0.01);
            }
            canvas.draw_line_buffer(this.LINE_BUFFER, this.line_paint);
            /* This handles all the bells and whistles for drawing scope trace number one! */
            if (scope_manager.ENTRY.length > 0) {
                /* Display the element that is attached to scope trace number one. */
                canvas.draw_text(scope_manager.get_scope_name(this.SCOPE_0_INDEX), this.bounds.get_center_x() -
                    1.25 *
                        global.CANVAS_TEXT_SIZE_BASE *
                        (3.5 *
                            this.text_paint.measure_text(scope_manager.get_scope_name(this.SCOPE_0_INDEX))), this.inner_bounds.top -
                    ((this.inner_bounds.top - this.bounds.top) >> 1), this.graph_text_a_paint);
                /* Draw the meter value that corresponds to the location of the mouse. */
                if (this.meter_hover_index > -1 &&
                    this.meter_hover_index < this.graph_trace_a.trace.length) {
                    if (this.graph_trace_a.get_value(this.meter_hover_index)[1] != '') {
                        canvas.draw_text(this.graph_trace_a.get_value(this.meter_hover_index)[1] +
                            scope_manager.get_units(this.SCOPE_0_INDEX), this.inner_bounds.left, this.inner_bounds.top -
                            ((this.inner_bounds.top - this.bounds.top) >> 1), this.graph_text_a_paint);
                    }
                    else {
                        /* Draw the empty signal sign! We got nothing! */
                        canvas.draw_text('0' + scope_manager.get_units(this.SCOPE_0_INDEX), this.inner_bounds.left, this.inner_bounds.top -
                            (this.inner_bounds.top - this.bounds.top) * 0.5, this.graph_text_a_paint);
                    }
                    /* Pick up the time index from the trace, we shall do this 3x, this is out of
                    laziness in figuring out if theres atleast one scope trace to grab this value
                    from (they should all be the same! (after the graphs line up) )*/
                    this.time_axis_value = this.graph_trace_a.get_value(this.meter_hover_index)[0];
                    if (global.MOBILE_MODE) {
                        canvas.draw_line(this.bounds.left +
                            this.graph_trace_a.trace[this.meter_hover_index].x, this.inner_bounds.top, this.bounds.left +
                            this.graph_trace_a.trace[this.meter_hover_index].x, this.inner_bounds.bottom, this.line_paint);
                    }
                }
            }
            /* This handles all the bells and whistles for drawing scope trace number two! */
            if (scope_manager.ENTRY.length > 1) {
                canvas.draw_text(scope_manager.get_scope_name(this.SCOPE_1_INDEX), this.bounds.get_center_x(), this.inner_bounds.top -
                    ((this.inner_bounds.top - this.bounds.top) >> 1), this.graph_text_b_paint);
                /* Draw the meter value that corresponds to the location of the mouse. */
                if (this.meter_hover_index > -1 &&
                    this.meter_hover_index < this.graph_trace_b.trace.length) {
                    if (this.graph_trace_b.get_value(this.meter_hover_index)[1] != '') {
                        canvas.draw_text(this.graph_trace_b.get_value(this.meter_hover_index)[1] +
                            scope_manager.get_units(this.SCOPE_1_INDEX), this.inner_bounds.left + view_port.view_width * 0.1, this.inner_bounds.top -
                            ((this.inner_bounds.top - this.bounds.top) >> 1), this.graph_text_b_paint);
                    }
                    else {
                        /* Draw the empty signal sign! We got nothing! */
                        canvas.draw_text('0' + scope_manager.get_units(this.SCOPE_1_INDEX), this.inner_bounds.left + view_port.view_width * 0.1, this.inner_bounds.top -
                            (this.inner_bounds.top - this.bounds.top) * 0.5, this.graph_text_b_paint);
                    }
                    this.time_axis_value = this.graph_trace_b.get_value(this.meter_hover_index)[0];
                    if (global.MOBILE_MODE) {
                        canvas.draw_line(this.bounds.left +
                            this.graph_trace_b.trace[this.meter_hover_index].x, this.inner_bounds.top, this.bounds.left +
                            this.graph_trace_b.trace[this.meter_hover_index].x, this.inner_bounds.bottom, this.line_paint);
                    }
                }
            }
            /* This handles all the bells and whistles for drawing scope trace number three! */
            if (scope_manager.ENTRY.length > 2) {
                canvas.draw_text(scope_manager.get_scope_name(this.SCOPE_2_INDEX), this.bounds.get_center_x() +
                    1.25 *
                        global.CANVAS_TEXT_SIZE_BASE *
                        (3.5 *
                            this.text_paint.measure_text(scope_manager.get_scope_name(this.SCOPE_2_INDEX))), this.inner_bounds.top -
                    ((this.inner_bounds.top - this.bounds.top) >> 1), this.graph_text_c_paint);
                /* Draw the meter value that corresponds to the location of the mouse. */
                if (this.meter_hover_index > -1 &&
                    this.meter_hover_index < this.graph_trace_c.trace.length) {
                    if (this.graph_trace_c.get_value(this.meter_hover_index)[1] != '') {
                        canvas.draw_text(this.graph_trace_c.get_value(this.meter_hover_index)[1] +
                            scope_manager.get_units(this.SCOPE_2_INDEX), this.inner_bounds.left + view_port.view_width * 0.2, this.inner_bounds.top -
                            ((this.inner_bounds.top - this.bounds.top) >> 1), this.graph_text_c_paint);
                    }
                    else {
                        /* Draw the empty signal sign! We got nothing! */
                        canvas.draw_text('0' + scope_manager.get_units(this.SCOPE_2_INDEX), this.inner_bounds.left + view_port.view_width * 0.2, this.inner_bounds.top -
                            (this.inner_bounds.top - this.bounds.top) * 0.5, this.graph_text_c_paint);
                    }
                    this.time_axis_value = this.graph_trace_c.get_value(this.meter_hover_index)[0];
                    if (global.MOBILE_MODE) {
                        canvas.draw_line(this.bounds.left +
                            this.graph_trace_c.trace[this.meter_hover_index].x, this.inner_bounds.top, this.bounds.left +
                            this.graph_trace_c.trace[this.meter_hover_index].x, this.inner_bounds.bottom, this.line_paint);
                    }
                }
            }
            /* Draw the time axis value so the user can see if it they scroll over the graph! This
            is bench-boarding of the meter index (hover) values. */
            if (scope_manager.ENTRY.length > 0) {
                if (this.meter_hover_index > -1 &&
                    (this.meter_hover_index < this.graph_trace_a.trace.length ||
                        this.meter_hover_index < this.graph_trace_b.trace.length ||
                        this.meter_hover_index < this.graph_trace_c.trace.length)) {
                    canvas.draw_text(this.time_axis_value + 's', this.inner_bounds.right -
                        this.text_paint.measure_text(global.exponentiate_quickly(global.TIME_STEP) + 's/step   ') -
                        this.text_paint.measure_text(this.time_axis_value + 's') * 0.5 -
                        view_port.view_width * 0.1, this.inner_bounds.top -
                        ((this.inner_bounds.top - this.bounds.top) >> 1), this.text_paint);
                }
            }
            /* Let's draw the time stamps for the tick marks! Only one of the scopes has to
            do it though! */
            if (this.graph_trace_a.magnitude_list.length > 0) {
                /* Stepping at a fixed interval through the elements. */
                for (var i = Math.round(this.X_AXIS_LENGTH * 0.1); i < Math.round(this.X_AXIS_LENGTH >> 1); i += Math.round(this.X_AXIS_LENGTH * 0.1)) {
                    if (i < this.graph_trace_a.magnitude_list.length) {
                        this.time_tag = global.exponentiate_quickly(this.graph_trace_a.magnitude_list[i].x);
                        canvas.draw_text(this.time_tag + 's', view_port.left +
                            this.graph_trace_a.trace[i].x -
                            (this.text_paint.measure_text(this.time_tag) >> 1), this.inner_bounds.bottom - global.CANVAS_STROKE_WIDTH_6, this.text_paint);
                    }
                    else {
                        break;
                    }
                }
            }
            else if (this.graph_trace_a.magnitude_list.length === 0 &&
                this.graph_trace_b.magnitude_list.length > 0) {
                for (var i = (this.X_AXIS_LENGTH >> 1) * 0.1; i < this.X_AXIS_LENGTH >> 1; i += (this.X_AXIS_LENGTH >> 1) * 0.1) {
                    if (i < this.graph_trace_b.magnitude_list.length) {
                        this.time_tag = global.exponentiate_quickly(this.graph_trace_b.magnitude_list[i].x);
                        canvas.draw_text(this.time_tag + 's', view_port.left +
                            this.graph_trace_b.trace[i].x -
                            (this.text_paint.measure_text(this.time_tag) >> 1), this.inner_bounds.bottom - global.CANVAS_STROKE_WIDTH_6, this.text_paint);
                    }
                    else {
                        break;
                    }
                }
            }
            else if (this.graph_trace_a.magnitude_list.length === 0 &&
                this.graph_trace_b.magnitude_list.length === 0 &&
                this.graph_trace_c.magnitude_list.length > 0) {
                for (var i = (this.X_AXIS_LENGTH >> 1) * 0.1; i < this.X_AXIS_LENGTH >> 1; i += (this.X_AXIS_LENGTH >> 1) * 0.1) {
                    if (i < this.graph_trace_c.magnitude_list.length) {
                        this.time_tag = global.exponentiate_quickly(this.graph_trace_c.magnitude_list[i].x);
                        canvas.draw_text(this.time_tag + 's', view_port.left +
                            this.graph_trace_c.trace[i].x -
                            (this.text_paint.measure_text(this.time_tag) >> 1), this.inner_bounds.bottom - global.CANVAS_STROKE_WIDTH_6, this.text_paint);
                    }
                    else {
                        break;
                    }
                }
            }
            /* Draw the timestep of the graph at the top right. */
            canvas.draw_text(global.exponentiate_quickly(global.TIME_STEP) + 's/step', this.inner_bounds.right -
                this.text_paint.measure_text(global.exponentiate_quickly(global.TIME_STEP) + 's/step   '), this.inner_bounds.top -
                ((this.inner_bounds.top - this.bounds.top) >> 1), this.text_paint);
            if (this.download_button.contains_xy(global.mouse_x, global.mouse_y) &&
                !global.MOBILE_MODE) {
                canvas.draw_round_rect2(this.download_button, 0.6 * global.CANVAS_STROKE_WIDTH_3, this.hover_paint);
            }
            this.download_button.draw_button(canvas);
            /* Last but not least, draw trace a, b, and c */
            this.graph_trace_a.draw_trace(canvas, view_port.left, 0);
            this.graph_trace_b.draw_trace(canvas, view_port.left, 0);
            this.graph_trace_c.draw_trace(canvas, view_port.left, 0);
        }
    };
    return GraphWindow;
}());
