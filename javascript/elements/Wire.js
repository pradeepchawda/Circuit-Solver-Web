'use strict';
class Wire {
    constructor(type, id, n1, n2) {
        this.initialized = false;
        this.elm = new Element2(id, type, global.copy(global.PROPERTY_WIRE));
        this.elm.set_nodes(n1, n2);
        this.p1 = new PointF(0, 0);
        this.p2 = new PointF(0, 0);
        if (this.elm.consistent()) {
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
            this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
        }
        this.capture_nodes();
        this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
        this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.c_x = 0;
        this.c_y = 0;
        if (this.elm.consistent()) {
            this.c_x = global.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x);
            this.c_y = global.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y);
        }
        this.x_space = global.node_space_x >> 1;
        this.y_space = global.node_space_y >> 1;
        this.line_paint = new Paint();
        this.line_paint.set_paint_style(this.line_paint.style.STROKE);
        this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
        this.line_paint.set_paint_join(this.line_paint.join.MITER);
        this.line_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
        this.line_paint.set_color(global.ELEMENT_COLOR);
        this.line_paint.set_text_size(global.canvas_text_size_3_zoom);
        this.line_paint.set_font(global.DEFAULT_FONT);
        this.line_paint.set_alpha(255);
        this.line_paint.set_paint_align(this.line_paint.align.CENTER);
        this.point_paint = new Paint();
        this.point_paint.set_paint_style(this.point_paint.style.FILL);
        this.point_paint.set_paint_cap(this.point_paint.cap.ROUND);
        this.point_paint.set_paint_join(this.point_paint.join.MITER);
        this.point_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
        this.point_paint.set_color(global.ELEMENT_COLOR);
        this.point_paint.set_text_size(global.canvas_text_size_3_zoom);
        this.point_paint.set_font(global.DEFAULT_FONT);
        this.point_paint.set_alpha(255);
        this.point_paint.set_paint_align(this.point_paint.align.CENTER);
        this.text_paint = new Paint();
        this.text_paint.set_paint_style(this.text_paint.style.FILL);
        this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
        this.text_paint.set_paint_join(this.text_paint.join.MITER);
        this.text_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
        this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
        this.text_paint.set_text_size(global.canvas_text_size_3_zoom);
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.CENTER);
        this.wire_point = new PointF(0, 0);
        this.update_wire_style();
        this.bounds = new RectF(0, 0, 0, 0);
        this.total_bounds = new RectF(0, 0, 0, 0);
        this.wire_voltage = 0;
        this.initialized = true;
        this.multi_selected = false;
        this.line_buffer = [];
        this.circle_buffer = [];
        this.build_element_flag = true;
        this.angle = 0;
        this.indexer = 0;
        this.is_translating = false;
    }
    refresh_bounds() {
        if (this.elm.consistent()) {
            this.p1 = new PointF(0, 0);
            this.p2 = new PointF(0, 0);
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
            this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
        }
    }
    stamp() { }
    release_wires() { }
    release_nodes() {
        if (this.elm.consistent()) {
            nodes[this.elm.n1].remove_reference(this.elm.id, this.elm.type);
            nodes[this.elm.n2].remove_reference(this.elm.id, this.elm.type);
            this.elm.set_nodes(-1, -1);
        }
        this.build_element_flag = true;
    }
    release_node_1() {
        if (this.elm.n1 !== -1) {
            nodes[this.elm.n1].remove_reference(this.elm.id, this.elm.type);
            this.elm.set_node_1(-1);
        }
        this.build_element_flag = true;
    }
    release_node_2() {
        if (this.elm.n2 !== -1) {
            nodes[this.elm.n2].remove_reference(this.elm.id, this.elm.type);
            this.elm.set_node_2(-1);
        }
        this.build_element_flag = true;
    }
    capture_nodes() {
        this.elm.map_node2(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
        if (this.elm.consistent() && !this.is_translating) {
            nodes[this.elm.n1].add_reference(this.elm.id, this.elm.type);
            nodes[this.elm.n2].add_reference(this.elm.id, this.elm.type);
        }
        this.build_element_flag = true;
    }
    move_element(dx, dy) { }
    mouse_down() {
        if (global.flag_idle &&
            !global.flag_save_image &&
            !global.flag_save_circuit &&
            !global.flag_zoom &&
            !global.flag_element_options &&
            !global.flag_element_options_edit &&
            !global.flag_select_element &&
            !global.flag_select_timestep &&
            !global.flag_select_settings &&
            !global.flag_remove_all &&
            !global.flag_menu_element_toolbox) {
            if (!global.focused && !global.component_touched && !global.multi_selected) {
                if (this.wire_collision() && !global.component_touched) {
                    global.focused_id = this.elm.id;
                    global.focused_type = this.elm.type;
                    global.focused_bounds = global.NULL;
                    global.focused = true;
                    global.component_touched = true;
                }
            }
        }
    }
    mouse_move() { }
    mouse_up() {
        if (global.flag_idle) {
            if (global.focused && global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
                if (!global.selected) {
                    this.select();
                }
                else {
                    if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
                        global.selected_id = global.NULL;
                        global.selected_type = -1;
                        global.selected_bounds = global.NULL;
                        global.selected_properties = global.NULL;
                        global.selected_wire_style = global.NULL;
                        global.selected = false;
                    }
                    else {
                        this.select();
                    }
                }
                global.focused_id = global.NULL;
                global.focused_type = global.NULL;
                global.focused_bounds = global.NULL;
                global.focused = false;
            }
            if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
                this.update_total_bounds();
                global.selected_bounds = global.copy(this.total_bounds);
            }
        }
    }
    select() {
        if (global.wire_builder['step'] !== 0) {
            wire_manager.reset_wire_builder();
        }
        global.selected_id = this.elm.id;
        global.selected_type = this.elm.type;
        this.update_total_bounds();
        global.selected_bounds = global.copy(this.total_bounds);
        global.selected_properties = global.copy(this.elm.properties);
        global.selected_wire_style = this.elm.wire_style;
        global.selected = true;
    }
    update_total_bounds() {
        this.total_bounds.left = Math.min(this.p1.x, this.p2.x);
        this.total_bounds.top = Math.min(this.p1.y, this.p2.y);
        this.total_bounds.right = Math.max(this.p1.x, this.p2.x);
        this.total_bounds.bottom = Math.max(this.p1.y, this.p2.y);
        if (this.total_bounds.get_width() < 2 * global.node_space_x) {
            this.total_bounds.set_center2(this.c_x, this.c_y, 2 * global.node_space_x, this.total_bounds.get_height());
        }
        if (this.total_bounds.get_height() < 2 * global.node_space_y) {
            this.total_bounds.set_center2(this.c_x, this.c_y, this.total_bounds.get_width(), 2 * global.node_space_y);
        }
    }
    update_wire_style() {
        if (this.elm.wire_style === global.WIRE_STYLE_1) {
            this.wire_point.x = Math.max(this.p1.x, this.p2.x);
            this.wire_point.y = Math.min(this.p1.y, this.p2.y);
        }
        else if (this.elm.wire_style === global.WIRE_STYLE_2) {
            this.wire_point.x = Math.max(this.p1.x, this.p2.x);
            this.wire_point.y = Math.max(this.p1.y, this.p2.y);
        }
        else if (this.elm.wire_style === global.WIRE_STYLE_3) {
            this.wire_point.x = Math.min(this.p1.x, this.p2.x);
            this.wire_point.y = Math.max(this.p1.y, this.p2.y);
        }
        else if (this.elm.wire_style === global.WIRE_STYLE_4) {
            this.wire_point.x = Math.min(this.p1.x, this.p2.x);
            this.wire_point.y = Math.min(this.p1.y, this.p2.y);
        }
        else {
            this.wire_point.x = global.get_average2(this.p1.x, this.p2.x);
            this.wire_point.y = global.get_average2(this.p1.y, this.p2.y);
        }
        global.signal_build_element = true;
    }
    refactor() {
        if (this.build_element_flag || global.signal_build_element) {
            this.x_space = global.node_space_x >> 1;
            this.y_space = global.node_space_y >> 1;
            this.c_x = this.bounds.get_center_x();
            this.c_y = this.bounds.get_center_y();
        }
    }
    resize() {
        if (this.build_element_flag || global.signal_build_element) {
            this.update_wire_style();
            if (this.elm.consistent()) {
                this.c_x = global.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x);
                this.c_y = global.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y);
            }
            this.line_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
            this.line_paint.set_text_size(global.canvas_text_size_3_zoom);
            this.point_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
            this.point_paint.set_text_size(global.canvas_text_size_3_zoom);
            this.text_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
            this.text_paint.set_text_size(global.canvas_text_size_3_zoom);
            if (this.elm.n1 !== -1) {
                this.p1.x = nodes[this.elm.n1].location.x;
                this.p1.y = nodes[this.elm.n1].location.y;
            }
            if (this.elm.n2 !== -1) {
                this.p2.x = nodes[this.elm.n2].location.x;
                this.p2.y = nodes[this.elm.n2].location.y;
            }
            if (this.elm.consistent()) {
                this.bounds.left = this.c_x - this.x_space;
                this.bounds.top = this.c_y - this.y_space;
                this.bounds.right = this.c_x + this.x_space;
                this.bounds.bottom = this.c_y + this.y_space;
                this.update_total_bounds();
            }
            this.build_element_flag = false;
        }
    }
    update() {
        if (global.flag_simulating && simulation_manager.solutions_ready) {
            if (this.elm.consistent()) {
                this.wire_voltage = Math.max(engine_functions.get_voltage(this.elm.n1, -1), engine_functions.get_voltage(this.elm.n2, -1));
            }
        }
    }
    set_flip(flip) {
        this.build_element_flag = true;
        wire_manager.reset_wire_builder();
        this.release_nodes();
        this.elm.set_flip(flip);
        this.refactor();
        this.capture_nodes();
    }
    set_rotation(rotation) {
        this.build_element_flag = true;
        wire_manager.reset_wire_builder();
        this.release_nodes();
        this.elm.set_rotation(rotation);
        this.refactor();
        this.capture_nodes();
    }
    push_history() {
        if (this.initialized) {
            global.history_manager['packet'].push(engine_functions.history_snapshot());
        }
    }
    set_wire_style(style) {
        this.elm.set_wire_style(style);
        this.refactor();
        if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
            global.selected_wire_style = this.elm.wire_style;
        }
        this.push_history();
    }
    increment_style() {
        this.elm.wire_style++;
        if (this.elm.wire_style > global.WIRE_STYLE_4) {
            this.elm.wire_style = global.WIRE_STYLE_0;
        }
        this.set_wire_style(this.elm.wire_style);
    }
    increment_flip() { }
    remove_focus() {
        if (global.focused && global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
            global.focused_id = global.NULL;
            global.focused_type = global.NULL;
            global.focused_bounds = global.NULL;
            global.focused = false;
        }
    }
    remove_selection() {
        if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
            global.selected_id = global.NULL;
            global.selected_type = -1;
            global.selected_bounds = global.NULL;
            global.selected_properties = global.NULL;
            global.selected_wire_style = global.NULL;
            global.selected = false;
        }
    }
    recolor() {
        if (global.selected) {
            if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
                this.line_paint.set_color(global.SELECTED_COLOR);
                this.point_paint.set_color(global.SELECTED_COLOR);
                this.text_paint.set_color(global.SELECTED_COLOR);
            }
            else {
                this.line_paint.set_color(global.ELEMENT_COLOR);
                this.point_paint.set_color(global.ELEMENT_COLOR);
                this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
            }
        }
        else {
            if (this.multi_selected) {
                this.line_paint.set_color(global.MULTI_SELECTED_COLOR);
                this.point_paint.set_color(global.MULTI_SELECTED_COLOR);
                this.text_paint.set_color(global.MULTI_SELECTED_COLOR);
            }
            else {
                this.line_paint.set_color(global.ELEMENT_COLOR);
                this.point_paint.set_color(global.ELEMENT_COLOR);
                this.text_paint.set_color(global.GENERAL_WHITE_COLOR);
            }
        }
    }
    wire_collision() {
        if (this.elm.wire_style === global.WIRE_STYLE_0) {
            let collision_0 = global.line_collision(global.mouse_x - (global.node_space_x >> 1), global.mouse_y - global.canvas_stroke_width_1_zoom, global.mouse_x + (global.node_space_x >> 1), global.mouse_y + global.canvas_stroke_width_1_zoom, this.p1.x, this.p1.y, this.p2.x, this.p2.y);
            let collision_1 = global.line_collision(global.mouse_x - global.canvas_stroke_width_1_zoom, global.mouse_y - (global.node_space_x >> 1), global.mouse_x + global.canvas_stroke_width_1, global.mouse_y + (global.node_space_x >> 1), this.p1.x, this.p1.y, this.p2.x, this.p2.y);
            return collision_0 || collision_1;
        }
        else {
            let collision_2 = global.line_collision(global.mouse_x - (global.node_space_x >> 1), global.mouse_y, global.mouse_x + (global.node_space_x >> 1), global.mouse_y, this.p1.x, this.p1.y, this.wire_point.x, this.wire_point.y);
            let collision_3 = global.line_collision(global.mouse_x, global.mouse_y - (global.node_space_x >> 1), global.mouse_x, global.mouse_y + global.node_space_x / 2, this.p1.x, this.p1.y, this.wire_point.x, this.wire_point.y);
            let collision_4 = global.line_collision(global.mouse_x - (global.node_space_x >> 1), global.mouse_y, global.mouse_x + (global.node_space_x >> 1), global.mouse_y, this.wire_point.x, this.wire_point.y, this.p2.x, this.p2.y);
            let collision_5 = global.line_collision(global.mouse_x, global.mouse_y - (global.node_space_x >> 1), global.mouse_x, global.mouse_y + global.node_space_x / 2, this.wire_point.x, this.wire_point.y, this.p2.x, this.p2.y);
            return collision_2 || collision_3 || collision_4 || collision_5;
        }
    }
    is_selected_element() {
        return global.selected_id === this.elm.id && global.selected_type === this.elm.type;
    }
    draw_component(canvas) {
        this.refactor();
        this.recolor();
        this.resize();
        if (this.multi_selected) {
            multi_select_manager.determine_enveloping_bounds(this.bounds);
        }
        if (this.elm.wire_style === global.WIRE_STYLE_0) {
            this.indexer = 0;
            this.line_buffer = [];
            this.line_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            if (global.flag_simulating && simulation_manager.solutions_ready && this.is_selected_element() && global.simulation_time >= global.time_step + global.time_step) {
                if (this.elm.consistent()) {
                    this.angle = global.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
                    if ((this.angle > 170 && this.angle < 190) || (this.angle > -10 && this.angle < 10)) {
                        canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'), this.c_x, this.c_y - this.y_space * 1.5, this.text_paint);
                    }
                    else if ((this.angle > 260 && this.angle < 280) || (this.angle > 80 && this.angle < 100)) {
                        canvas.rotate(this.c_x, this.c_y, -90);
                        canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'), this.c_x, this.c_y - this.y_space * 1.5, this.text_paint);
                        canvas.restore();
                    }
                    else {
                        canvas.rotate(this.c_x, this.c_y, Math.round(this.angle));
                        canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'), this.c_x, this.c_y - this.y_space * 1.5, this.text_paint);
                        canvas.restore();
                    }
                }
            }
        }
        else {
            this.indexer = 0;
            this.circle_buffer = [];
            this.line_buffer = [];
            this.line_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, this.wire_point.x, this.wire_point.y);
            this.line_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, this.wire_point.x, this.wire_point.y);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            if (global.flag_simulating && simulation_manager.solutions_ready && this.is_selected_element() && global.simulation_time >= global.time_step + global.time_step + global.time_step) {
                if (this.elm.consistent()) {
                    if (global.workspace_zoom_scale > 1.085 || (!global.MOBILE_MODE && global.workspace_zoom_scale >= 0.99)) {
                        if (global.norm(this.wire_point.x - this.p1.x, this.wire_point.y - this.p1.y) > global.norm(this.p2.x - this.wire_point.x, this.p2.y - this.wire_point.y) * 1.05) {
                            this.angle = global.retrieve_angle(this.wire_point.x - this.p1.x, this.wire_point.y - this.p1.y);
                            if ((this.angle > 170 && this.angle < 190) || (this.angle > -10 && global.retrieve_angle(this.wire_point.x - this.p1.x, this.wire_point.y - this.p1.y) < 10)) {
                                canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'), global.get_average2(this.wire_point.x, this.p1.x), global.get_average2(this.wire_point.y, this.p1.y) - this.y_space * 1.5, this.text_paint);
                            }
                            else if ((this.angle > 260 && this.angle < 280) || (this.angle > 80 && this.angle < 100)) {
                                canvas.rotate(global.get_average2(this.wire_point.x, this.p1.x), global.get_average2(this.wire_point.y, this.p1.y), -90);
                                canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'), global.get_average2(this.wire_point.x, this.p1.x), global.get_average2(this.wire_point.y, this.p1.y) - this.y_space * 1.5, this.text_paint);
                                canvas.restore();
                            }
                            else {
                                canvas.rotate(this.c_x, this.c_y, Math.round(global.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y)));
                                canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'), this.c_x, this.c_y - this.y_space * 1.5, this.text_paint);
                                canvas.restore();
                            }
                        }
                        else {
                            this.angle = global.retrieve_angle(this.p2.x - this.wire_point.x, this.p2.y - this.wire_point.y);
                            if ((this.angle > 170 && this.angle < 190) || (this.angle > -10 && global.retrieve_angle(this.p2.x - this.wire_point.x, this.p2.y - this.wire_point.y) < 10)) {
                                canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'), global.get_average2(this.wire_point.x, this.p2.x), global.get_average2(this.wire_point.y, this.p2.y) - this.y_space * 1.5, this.text_paint);
                            }
                            else if ((this.angle > 260 && this.angle < 280) || (this.angle > 80 && this.angle < 100)) {
                                canvas.rotate(global.get_average2(this.wire_point.x, this.p2.x), global.get_average2(this.wire_point.y, this.p2.y), -90);
                                canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'), global.get_average2(this.wire_point.x, this.p2.x), global.get_average2(this.wire_point.y, this.p2.y) - this.y_space * 1.5, this.text_paint);
                                canvas.restore();
                            }
                            else {
                                canvas.rotate(this.c_x, this.c_y, Math.round(global.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y)));
                                canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.wire_voltage)).replace('{UNIT}', 'V'), this.c_x, this.c_y - this.y_space * 1.5, this.text_paint);
                                canvas.restore();
                            }
                        }
                    }
                }
            }
        }
        if (global.DEVELOPER_MODE) {
            canvas.draw_text(this.elm.id, this.c_x, this.c_y, this.text_paint);
            canvas.draw_rect2(this.total_bounds, this.line_paint);
        }
    }
    patch() {
        if (!global.not_null(this.total_bounds)) {
            this.total_bounds = new RectF(0, 0, 0, 0);
        }
        if (!global.not_null(this.line_buffer)) {
            this.line_buffer = [];
        }
        if (!global.not_null(this.circle_buffer)) {
            this.circle_buffer = [];
        }
        if (!global.not_null(this.build_element_flag)) {
            this.build_element_flag = false;
        }
        if (!global.not_null(this.angle)) {
            this.angle = 0;
        }
        if (!global.not_null(this.indexer)) {
            this.indexer = 0;
        }
    }
    time_data() {
        /* #INSERT_GENERATE_TIME_DATA# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        let time_data = global.copy(global.TIME_DATA_TEMPLATE);
        let keys = Object.keys(this.elm.properties);
        for (var i = keys.length - 1; i > -1; i--) {
            if (typeof this.elm.properties[keys[i]] === 'number') {
                if (keys[i] === 'Frequency' || keys[i] === 'Resistance' || keys[i] === 'Capacitance' || keys[i] === 'Inductance') {
                    time_data[keys[i]] = global.copy(this.elm.properties[keys[i]]);
                }
            }
        }
        return time_data;
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    reset() { }
}
