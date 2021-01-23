'use strict';
class TriangleWave {
    constructor(type, id, n1, n2) {
        this.initialized = false;
        this.bounds = new RectF(0, 0, 0, 0);
        this.elm = new Element2(id, type, global.copy(global.PROPERTY_TRI));
        this.elm.set_nodes(n1, n2);
        if (this.elm.consistent()) {
            this.bounds.set_center2(global.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x), global.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y), global.node_space_x * 2, global.node_space_y * 2);
        }
        this.elm.set_rotation(global.ROTATION_0);
        this.elm.set_flip(global.FLIP_0);
        this.release_nodes();
        let vertices = this.get_vertices();
        this.elm.map_node2(vertices[0], vertices[1], vertices[2], vertices[3]);
        this.capture_nodes();
        this.plus_point = new PointF(0, 0);
        this.p1 = new PointF(0, 0);
        this.p2 = new PointF(0, 0);
        if (this.elm.consistent()) {
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
            this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
        }
        this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
        this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.sq_0 = new PointF(0, 0);
        this.sq_1 = new PointF(0, 0);
        this.sq_2 = new PointF(0, 0);
        this.sq_3 = new PointF(0, 0);
        this.sq_4 = new PointF(0, 0);
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.x_space = global.node_space_x >> 1;
        this.y_space = global.node_space_y >> 1;
        this.connect1_x = 0;
        this.connect1_y = 0;
        this.connect2_x = 0;
        this.connect2_y = 0;
        this.grid_point = [];
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
        this.text_paint.set_color(global.ELEMENT_COLOR);
        this.text_paint.set_text_size(global.canvas_text_size_3_zoom);
        this.text_paint.set_font(global.DEFAULT_FONT);
        this.text_paint.set_alpha(255);
        this.text_paint.set_paint_align(this.text_paint.align.CENTER);
        this.is_translating = false;
        this.temp_color = global.GENERAL_RED_COLOR;
        this.build_element();
        this.wire_reference = [];
        this.simulation_id = 0;
        this.indexer = 0;
        this.m_x = 0;
        this.m_y = 0;
        this.initialized = true;
        this.multi_selected = false;
        this.line_buffer = [];
        this.circle_buffer = [];
        this.build_element_flag = true;
        this.angle = 0;
    }
    refresh_bounds() {
        if (this.elm.consistent()) {
            this.p1 = new PointF(0, 0);
            this.p2 = new PointF(0, 0);
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
            this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
            this.bounds.set_center2(global.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x), global.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y), global.node_space_x * 2, global.node_space_y * 2);
        }
    }
    push_reference(ref) {
        this.wire_reference.push(ref);
    }
    stamp() {
        if (this.elm.consistent()) {
            engine_functions.stamp_voltage(this.elm.n1, this.elm.n2, this.elm.properties['Offset'] +
                ((2 * this.elm.properties['Voltage']) / Math.PI) *
                    Math.asin(Math.sin(2 * global.simulation_time * Math.PI * this.elm.properties['Frequency'] + global.to_radians(this.elm.properties['Phase']))), simulation_manager.ELEMENT_TRI_OFFSET + this.simulation_id);
        }
    }
    get_vertices() {
        let vertices = [];
        let p1 = [];
        let p2 = [];
        if (this.elm.rotation === global.ROTATION_0) {
            p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            vertices = Array(p1[0], p1[1], p2[0], p2[1]);
        }
        else if (this.elm.rotation === global.ROTATION_90) {
            p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
            p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
            vertices = Array(p1[0], p1[1], p2[0], p2[1]);
        }
        else if (this.elm.rotation === global.ROTATION_180) {
            p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            vertices = Array(p1[0], p1[1], p2[0], p2[1]);
        }
        else if (this.elm.rotation === global.ROTATION_270) {
            p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
            p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
            vertices = Array(p1[0], p1[1], p2[0], p2[1]);
        }
        else {
            p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
            p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
            vertices = Array(p1[0], p1[1], p2[0], p2[1]);
        }
        return vertices;
    }
    release_wires() {
        if (this.wire_reference.length > 0) {
            let id = -1;
            for (var i = this.wire_reference.length - 1; i > -1; i--) {
                id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
                if (id > -1 && id < wires.length) {
                    wires[id].release_nodes();
                    wires.splice(id, 1);
                }
            }
            this.wire_reference = [];
        }
    }
    release_nodes() {
        if (this.elm.consistent()) {
            nodes[this.elm.n1].remove_reference(this.elm.id, this.elm.type);
            nodes[this.elm.n2].remove_reference(this.elm.id, this.elm.type);
            this.elm.set_nodes(-1, -1);
        }
    }
    capture_nodes() {
        let vertices = this.get_vertices();
        this.elm.map_node2(vertices[0], vertices[1], vertices[2], vertices[3]);
        if (this.elm.consistent() && !this.is_translating) {
            nodes[this.elm.n1].add_reference(this.elm.id, this.elm.type);
            nodes[this.elm.n2].add_reference(this.elm.id, this.elm.type);
        }
    }
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
                if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1) && !global.component_touched) {
                    this.is_translating = false;
                    global.focused_id = this.elm.id;
                    global.focused_type = this.elm.type;
                    global.focused_bounds = global.copy(this.bounds);
                    global.focused = true;
                    global.component_touched = true;
                }
                else {
                    if (this.elm.consistent() && !global.component_touched && !global.flag_simulating) {
                        if (nodes[this.elm.n1].contains_xy(global.mouse_x, global.mouse_y)) {
                            this.handle_wire_builder(this.elm.n1, global.ANCHOR_POINT['p1']);
                            global.component_touched = true;
                        }
                        else if (nodes[this.elm.n2].contains_xy(global.mouse_x, global.mouse_y)) {
                            this.handle_wire_builder(this.elm.n2, global.ANCHOR_POINT['p2']);
                            global.component_touched = true;
                        }
                    }
                }
            }
        }
    }
    handle_wire_builder(n, anchor) {
        if (global.wire_builder['step'] === 0) {
            global.wire_builder['n1'] = n;
            global.wire_builder['type1'] = this.elm.type;
            global.wire_builder['id1'] = this.elm.id;
            global.wire_builder['anchor_point1'] = anchor;
            global.wire_builder['linkage1']['wire'] = global.wire_builder['step'];
            global.wire_builder['step']++;
        }
        else if (global.wire_builder['step'] === 1) {
            global.wire_builder['n2'] = n;
            global.wire_builder['type2'] = this.elm.type;
            global.wire_builder['id2'] = this.elm.id;
            global.wire_builder['anchor_point2'] = anchor;
            global.wire_builder['linkage2']['wire'] = global.wire_builder['step'];
            global.wire_builder['step']++;
        }
    }
    move_element(dx, dy) {
        wire_manager.reset_wire_builder();
        this.unanchor_wires();
        this.release_nodes();
        this.m_x = this.c_x + dx;
        this.m_y = this.c_y + dy;
        if (this.m_x < workspace.bounds.left + 2.5 * global.node_space_x) {
            this.m_x = workspace.bounds.left + 2.5 * global.node_space_x;
        }
        else if (this.m_x > workspace.bounds.right - 2.0 * global.node_space_x) {
            this.m_x = workspace.bounds.right - 2.0 * global.node_space_x;
        }
        if (this.m_y < workspace.bounds.top + 2.5 * global.node_space_y) {
            this.m_y = workspace.bounds.top + 2.5 * global.node_space_y;
        }
        else if (this.m_y > workspace.bounds.bottom - 2.0 * global.node_space_y) {
            this.m_y = workspace.bounds.bottom - 2.0 * global.node_space_y;
        }
        this.grid_point = this.elm.snap_to_grid(this.m_x, this.m_y);
        this.bounds.set_center(this.grid_point[0], this.grid_point[1]);
        this.refactor();
        this.capture_nodes();
        this.anchor_wires();
    }
    mouse_move() {
        if (global.flag_idle && !global.flag_simulating) {
            if (global.focused) {
                if (global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
                    global.is_dragging = false;
                    if (!this.is_translating) {
                        if (!this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1)) {
                            this.release_nodes();
                            this.bounds.anchored = false;
                            this.is_translating = true;
                            global.component_translating = true;
                            this.select();
                        }
                    }
                    else {
                        this.m_x = global.mouse_x;
                        this.m_y = global.mouse_y;
                        if (this.m_x < workspace.bounds.left + 2.5 * global.node_space_x) {
                            this.m_x = workspace.bounds.left + 2.5 * global.node_space_x;
                        }
                        else if (this.m_x > workspace.bounds.right - 2.0 * global.node_space_x) {
                            this.m_x = workspace.bounds.right - 2.0 * global.node_space_x;
                        }
                        if (this.m_y < workspace.bounds.top + 2.5 * global.node_space_y) {
                            this.m_y = workspace.bounds.top + 2.5 * global.node_space_y;
                        }
                        else if (this.m_y > workspace.bounds.bottom - 2.0 * global.node_space_y) {
                            this.m_y = workspace.bounds.bottom - 2.0 * global.node_space_y;
                        }
                        this.grid_point = this.elm.snap_to_grid(this.m_x, this.m_y);
                        wire_manager.reset_wire_builder();
                        this.bounds.set_center(this.grid_point[0], this.grid_point[1]);
                        this.unanchor_wires();
                        this.build_element_flag = true;
                    }
                }
            }
        }
    }
    mouse_up() {
        if (global.flag_idle) {
            if (global.focused && global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
                if (this.is_translating) {
                    this.is_translating = false;
                    this.capture_nodes();
                    this.push_history();
                    this.bounds.anchored = true;
                    this.anchor_wires();
                }
                else {
                    if (!global.selected) {
                        this.select();
                    }
                    else {
                        if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
                            global.selected_id = global.NULL;
                            global.selected_type = -1;
                            global.selected_bounds = global.NULL;
                            global.selected_properties = global.NULL;
                            global.selected = false;
                        }
                        else {
                            this.select();
                        }
                    }
                }
                global.focused_id = global.NULL;
                global.focused_type = global.NULL;
                global.focused_bounds = global.NULL;
                global.focused = false;
            }
            if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
                global.selected_bounds = global.copy(this.bounds);
            }
        }
    }
    select() {
        if (global.wire_builder['step'] !== 0) {
            wire_manager.reset_wire_builder();
        }
        global.selected_id = this.elm.id;
        global.selected_type = this.elm.type;
        global.selected_bounds = global.copy(this.bounds);
        global.selected_properties = global.copy(this.elm.properties);
        global.selected_wire_style = global.NULL;
        global.selected = true;
    }
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
    wire_reference_maintenance() {
        if (this.wire_reference.length > 0 && global.signal_wire_deleted) {
            let id = -1;
            for (var i = this.wire_reference.length - 1; i > -1; i--) {
                id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
                if (!(id > -1 && id < wires.length)) {
                    this.wire_reference.splice(i, 1);
                }
            }
        }
    }
    unanchor_wires() {
        if (this.wire_reference.length > 0) {
            let vertices = this.get_vertices();
            let id = -1;
            for (var i = this.wire_reference.length - 1; i > -1; i--) {
                id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
                if (id > -1 && id < wires.length) {
                    if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p1']) {
                        wires[id].release_nodes();
                        if (this.wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[0];
                            wires[id].p1.y = vertices[1];
                        }
                        else if (this.wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.y = vertices[1];
                            wires[id].p2.x = vertices[0];
                        }
                    }
                    else if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p2']) {
                        wires[id].release_nodes();
                        if (this.wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[2];
                            wires[id].p1.y = vertices[3];
                        }
                        else if (this.wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[2];
                            wires[id].p2.y = vertices[3];
                        }
                    }
                }
                else {
                    this.wire_reference.splice(i, 1);
                }
            }
        }
    }
    anchor_wires() {
        if (this.wire_reference.length > 0) {
            let vertices = this.get_vertices();
            let id = -1;
            for (var i = this.wire_reference.length - 1; i > -1; i--) {
                id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
                if (id > -1 && id < wires.length) {
                    if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p1']) {
                        if (this.wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[0];
                            wires[id].p1.y = vertices[1];
                        }
                        else if (this.wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[0];
                            wires[id].p2.y = vertices[1];
                        }
                        wires[id].capture_nodes();
                    }
                    else if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p2']) {
                        if (this.wire_reference[i]['linkage'] === 0) {
                            wires[id].p1.x = vertices[2];
                            wires[id].p1.y = vertices[3];
                        }
                        else if (this.wire_reference[i]['linkage'] === 1) {
                            wires[id].p2.x = vertices[2];
                            wires[id].p2.y = vertices[3];
                        }
                        wires[id].capture_nodes();
                    }
                }
                else {
                    this.wire_reference.splice(i, 1);
                }
            }
        }
    }
    set_flip(flip) {
        this.build_element_flag = true;
        wire_manager.reset_wire_builder();
        this.unanchor_wires();
        this.push_history();
        this.release_nodes();
        this.elm.set_flip(flip);
        this.refactor();
        this.capture_nodes();
        this.anchor_wires();
    }
    set_rotation(rotation) {
        this.build_element_flag = true;
        wire_manager.reset_wire_builder();
        this.unanchor_wires();
        this.push_history();
        this.release_nodes();
        this.elm.set_rotation(rotation);
        this.refactor();
        this.capture_nodes();
        this.anchor_wires();
    }
    push_history() {
        if (this.initialized) {
            global.history_manager['packet'].push(engine_functions.history_snapshot());
        }
    }
    build_element() {
        if (this.build_element_flag || global.signal_build_element) {
            let cache_0 = 1.25 * this.x_space;
            let cache_1 = 1.25 * this.y_space;
            let cache_2 = this.x_space;
            let cache_3 = this.y_space;
            this.plus_point.x = this.c_x - cache_0 * global.cosine(this.theta) - cache_0 * global.cosine(this.theta_m90);
            this.plus_point.y = this.c_y - cache_1 * global.sine(this.theta) - cache_1 * global.sine(this.theta_m90);
            this.sq_0.x = this.c_x - (cache_2 >> 2) * global.cosine(this.theta - global.PI_DIV_4);
            this.sq_0.y = this.c_y - (cache_2 >> 2) * global.sine(this.theta - global.PI_DIV_4);
            this.sq_1.x = this.c_x + (cache_2 >> 2) * global.cosine(this.theta - global.PI_DIV_4);
            this.sq_1.y = this.c_y + (cache_2 >> 2) * global.sine(this.theta - global.PI_DIV_4);
            this.sq_2.x = this.sq_0.x + (cache_2 >> 1) * global.cosine(this.theta_m90);
            this.sq_2.y = this.sq_0.y + (cache_2 >> 1) * global.sine(this.theta_m90);
            this.sq_3.x = this.sq_0.x - (cache_2 >> 1) * global.cosine(this.theta_m90 - global.PI_DIV_4);
            this.sq_3.y = this.sq_0.y - (cache_2 >> 1) * global.sine(this.theta_m90 - global.PI_DIV_4);
            this.sq_4.x = this.sq_1.x + (cache_2 >> 1) * global.cosine(this.theta_m90 - global.PI_DIV_4);
            this.sq_4.y = this.sq_1.y + (cache_2 >> 1) * global.sine(this.theta_m90 - global.PI_DIV_4);
            this.connect1_x = this.c_x - cache_2 * global.cosine(this.theta);
            this.connect1_y = this.c_y - cache_3 * global.sine(this.theta);
            this.connect2_x = this.c_x + cache_2 * global.cosine(this.theta);
            this.connect2_y = this.c_y + cache_3 * global.sine(this.theta);
            this.build_element_flag = false;
        }
    }
    resize() {
        if (this.build_element_flag || global.signal_build_element) {
            if (this.bounds.anchored) {
                if (this.elm.consistent()) {
                    this.bounds.set_center2(global.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x), global.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y), global.node_space_x * 2, global.node_space_y * 2);
                    this.refactor();
                }
                this.unanchor_wires();
                this.anchor_wires();
            }
            else {
                this.refactor();
            }
            this.line_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
            this.line_paint.set_text_size(global.canvas_text_size_3_zoom);
            this.point_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
            this.point_paint.set_text_size(global.canvas_text_size_3_zoom);
            this.text_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
            this.text_paint.set_text_size(global.canvas_text_size_3_zoom);
        }
    }
    refactor() {
        let vertices = this.get_vertices();
        this.p1.x = vertices[0];
        this.p1.y = vertices[1];
        this.p2.x = vertices[2];
        this.p2.y = vertices[3];
        this.x_space = global.node_space_x >> 1;
        this.y_space = global.node_space_y >> 1;
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
        this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
        this.build_element();
    }
    update() { }
    increment_rotation() {
        this.elm.rotation++;
        if (this.elm.rotation > global.ROTATION_270) {
            this.elm.rotation = global.ROTATION_0;
        }
        this.set_rotation(this.elm.rotation);
    }
    increment_flip() { }
    map_rotation() {
        if (this.elm.rotation === global.ROTATION_0 || this.elm.rotation === global.ROTATION_180) {
            return this.x_space;
        }
        else if (this.elm.rotation === global.ROTATION_90 || this.elm.rotation === global.ROTATION_270) {
            return this.y_space;
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
                this.text_paint.set_color(global.ELEMENT_COLOR);
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
                this.text_paint.set_color(global.ELEMENT_COLOR);
            }
        }
    }
    is_selected_element() {
        return global.selected_id === this.elm.id && global.selected_type === this.elm.type;
    }
    draw_component(canvas) {
        this.wire_reference_maintenance();
        this.recolor();
        this.resize();
        if (this.multi_selected) {
            multi_select_manager.determine_enveloping_bounds(this.bounds);
        }
        if (global.picture_request_flag ||
            (this.c_x >= view_port.left - global.node_space_x &&
                this.c_x - global.node_space_x <= view_port.right &&
                this.c_y >= view_port.top + -global.node_space_y &&
                this.c_y - global.node_space_y <= view_port.bottom)) {
            this.temp_color = this.line_paint.get_color();
            this.line_paint.set_color(global.GENERAL_RED_COLOR);
            this.indexer = 0;
            this.circle_buffer = [];
            this.line_buffer = [];
            this.line_buffer[this.indexer++] = Array(this.plus_point.x - this.bounds.get_width() * 0.05, this.plus_point.y, this.plus_point.x + this.bounds.get_width() * 0.05, this.plus_point.y);
            this.line_buffer[this.indexer++] = Array(this.plus_point.x, this.plus_point.y + this.bounds.get_width() * 0.05, this.plus_point.x, this.plus_point.y - this.bounds.get_width() * 0.05);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            this.indexer = 0;
            this.line_paint.set_color(this.temp_color);
            canvas.draw_circle(this.c_x, this.c_y, this.map_rotation(), this.line_paint);
            this.line_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
            this.line_buffer[this.indexer++] = Array(this.connect2_x, this.connect2_y, this.p2.x, this.p2.y);
            this.line_buffer[this.indexer++] = Array(this.sq_3.x, this.sq_3.y, this.sq_0.x, this.sq_0.y);
            this.line_buffer[this.indexer++] = Array(this.sq_0.x, this.sq_0.y, this.sq_1.x, this.sq_1.y);
            this.line_buffer[this.indexer++] = Array(this.sq_1.x, this.sq_1.y, this.sq_4.x, this.sq_4.y);
            canvas.draw_line_buffer(this.line_buffer, this.line_paint);
            this.indexer = 0;
            this.circle_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, global.canvas_stroke_width_2_zoom);
            this.circle_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, global.canvas_stroke_width_2_zoom);
            canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
            if (global.DEVELOPER_MODE) {
                canvas.draw_rect2(this.bounds, this.line_paint);
            }
            if (global.workspace_zoom_scale > 1.085 || (!global.MOBILE_MODE && global.workspace_zoom_scale >= 0.99)) {
                this.angle = global.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
                if ((this.angle > 170 && this.angle < 190) || (this.angle > -10 && this.angle < 10)) {
                    canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.elm.properties['Voltage'])).replace('{UNIT}', this.elm.properties['units']), this.c_x, this.bounds.top + this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.draw_text(global.exponentiate_quickly(this.elm.properties['Frequency']) + this.elm.properties['options_units'][1], this.c_x, this.bounds.bottom - this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.draw_text(global.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', this.elm.id), this.c_x, this.bounds.bottom + this.bounds.get_height() * 0.1, this.text_paint);
                }
                else if ((this.angle > 260 && this.angle < 280) || (this.angle > 80 && this.angle < 100)) {
                    canvas.rotate(this.c_x, this.c_y, -90);
                    canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.elm.properties['Voltage'])).replace('{UNIT}', this.elm.properties['units']), this.c_x, this.bounds.top + this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.draw_text(global.exponentiate_quickly(this.elm.properties['Frequency']) + this.elm.properties['options_units'][1], this.c_x, this.bounds.bottom - this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.draw_text(global.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', this.elm.id), this.c_x, this.bounds.bottom + this.bounds.get_height() * 0.1, this.text_paint);
                    canvas.restore();
                }
            }
            if (!global.MOBILE_MODE) {
                if (global.wire_builder['step'] === 0 &&
                    this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() * 1.25, this.bounds.get_height() * 1.25) &&
                    global.NODE_HINTS &&
                    !multi_select_manager.multi_select &&
                    !this.multi_selected &&
                    !global.signal_add_element &&
                    !global.signal_history_lock &&
                    !global.picture_request_flag &&
                    !global.flag_save_circuit &&
                    !global.flag_save_image &&
                    !global.flag_menu_element_toolbox &&
                    !global.flag_select_timestep &&
                    !global.flag_element_options &&
                    !global.flag_element_options_edit &&
                    !global.flag_zoom &&
                    !global.flag_graph &&
                    !global.flag_simulating &&
                    !global.flag_select_settings &&
                    !global.flag_select_element &&
                    !global.flag_remove_all &&
                    !global.signal_add_element) {
                    if (this.elm.consistent()) {
                        let node_id_array = this.elm.get_nodes();
                        for (var i = 0; i < node_id_array.length; i++) {
                            canvas.draw_rect2(nodes[node_id_array[i]].get_bounds(), this.line_paint);
                        }
                    }
                }
            }
            if (this.is_translating) {
                canvas.draw_rect3(this.bounds.get_center_x(), this.bounds.get_center_y(), global.node_space_x << 2, global.node_space_y << 2, global.move_paint);
            }
        }
    }
    patch() {
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
        if (!global.not_null(this.initialized)) {
            this.initialized = false;
        }
        if (!global.not_null(this.multi_selected)) {
            this.multi_selected = false;
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
