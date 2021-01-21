'use strict';
class Note {
    constructor(type, id, n1) {
        this.INITIALIZED = false;
        this.bounds = new RectF(0, 0, 0, 0);
        this.elm = new Element1(id, type, global.copy(global.PROPERTY_NOTE));
        this.elm.set_nodes(n1);
        this.elm.properties['Note'] = 'Note' + id;
        if (this.elm.consistent()) {
            this.bounds.set_center2(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y, global.node_space_x * 2, global.node_space_y * 2);
        }
        this.elm.set_rotation(global.ROTATION_90);
        this.release_nodes();
        let vertices = this.get_vertices();
        this.elm.map_node1(vertices[0], vertices[1]);
        this.capture_nodes();
        this.p1 = new PointF(0, 0);
        if (this.elm.consistent()) {
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
        }
        this.x_space = global.node_space_x >> 1;
        this.y_space = global.node_space_y >> 1;
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
        this.wire_reference = [];
        this.simulation_id = 0;
        this.indexer = 0;
        this.m_x = 0;
        this.m_y = 0;
        this.c_x = 0;
        this.c_y = 0;
        this.INITIALIZED = true;
        this.MULTI_SELECTED = false;
        this.line_buffer = [];
        this.circle_buffer = [];
        this.BUILD_ELEMENT = true;
        this.ANGLE = 0;
    }
    refresh_bounds() {
        if (this.elm.consistent()) {
            this.p1 = new PointF(0, 0);
            this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
            this.bounds.set_center2(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y, global.node_space_x * 2, global.node_space_y * 2);
        }
    }
    push_reference(ref) {
        this.wire_reference.push(ref);
    }
    stamp() { }
    get_vertices() {
        let p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.get_center_y());
        let vertices = Array(p1[0], p1[1]);
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
            this.elm.set_nodes(-1);
        }
    }
    capture_nodes() {
        let vertices = this.get_vertices();
        this.elm.map_node1(vertices[0], vertices[1]);
        if (this.elm.consistent() && !this.is_translating) {
            nodes[this.elm.n1].add_reference(this.elm.id, this.elm.type);
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
                if (this.elm.consistent() && !global.component_touched && !global.flag_simulating) {
                    if (nodes[this.elm.n1].contains_xy(global.mouse_x, global.mouse_y) && this.elm.properties['Show Marker'] === global.ON) {
                        this.handle_wire_builder(this.elm.n1, global.ANCHOR_POINT['p1']);
                        global.component_touched = true;
                    }
                    else if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() * 0.8, this.bounds.get_height() * 0.8)) {
                        this.is_translating = false;
                        global.focused_id = this.elm.id;
                        global.focused_type = this.elm.type;
                        global.focused_bounds = global.copy(this.bounds);
                        global.focused = true;
                        global.component_touched = true;
                    }
                }
            }
        }
    }
    handle_wire_builder(n, anchor) {
        if (this.elm.properties['Show Marker'] === global.ON) {
            if (global.WIRE_BUILDER['step'] === 0) {
                global.WIRE_BUILDER['n1'] = n;
                global.WIRE_BUILDER['type1'] = this.elm.type;
                global.WIRE_BUILDER['id1'] = this.elm.id;
                global.WIRE_BUILDER['anchor_point1'] = anchor;
                global.WIRE_BUILDER['linkage1']['wire'] = global.WIRE_BUILDER['step'];
                global.WIRE_BUILDER['step']++;
            }
            else if (global.WIRE_BUILDER['step'] === 1) {
                global.WIRE_BUILDER['n2'] = n;
                global.WIRE_BUILDER['type2'] = this.elm.type;
                global.WIRE_BUILDER['id2'] = this.elm.id;
                global.WIRE_BUILDER['anchor_point2'] = anchor;
                global.WIRE_BUILDER['linkage2']['wire'] = global.WIRE_BUILDER['step'];
                global.WIRE_BUILDER['step']++;
            }
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
                        if (!this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() * 0.8, this.bounds.get_height() * 0.8)) {
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
                        this.BUILD_ELEMENT = true;
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
                            global.selected_wire_style = global.NULL;
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
        if (global.WIRE_BUILDER['step'] !== 0) {
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
    push_history() {
        if (this.INITIALIZED) {
            global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
        }
    }
    resize() {
        if (this.BUILD_ELEMENT || global.signal_build_element) {
            if (this.bounds.anchored) {
                if (this.elm.consistent()) {
                    this.bounds.set_center2(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y, global.node_space_x * 2, global.node_space_y * 2);
                    this.refactor();
                }
                this.unanchor_wires();
                this.anchor_wires();
            }
            else {
                this.refactor();
            }
            let temp_size = global.canvas_text_size_1 * global.workspace_zoom_scale;
            if (this.elm.properties['Text Style'] === global.TEXT_STYLE_1) {
                temp_size = global.canvas_text_size_3 * global.workspace_zoom_scale;
            }
            else if (this.elm.properties['Text Style'] === global.TEXT_STYLE_2) {
                temp_size = 0.85 * global.canvas_text_size_4 * global.workspace_zoom_scale;
            }
            else if (this.elm.properties['Text Style'] === global.TEXT_STYLE_3) {
                temp_size = 0.85 * global.canvas_text_size_5 * global.workspace_zoom_scale;
            }
            this.line_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
            this.line_paint.set_text_size(global.canvas_text_size_3_zoom);
            this.point_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
            this.point_paint.set_text_size(global.canvas_text_size_3_zoom);
            this.text_paint.set_stroke_width(global.canvas_stroke_width_1_zoom);
            this.text_paint.set_text_size(temp_size);
        }
    }
    refactor() {
        let vertices = this.get_vertices();
        this.p1.x = vertices[0];
        this.p1.y = vertices[1];
        this.x_space = global.node_space_x >> 1;
        this.y_space = global.node_space_y >> 1;
        this.c_x = this.bounds.get_center_x();
        this.c_y = this.bounds.get_center_y();
        this.BUILD_ELEMENT = false;
    }
    update() { }
    set_flip(flip) { }
    set_rotation(rotation) {
        this.BUILD_ELEMENT = true;
        wire_manager.reset_wire_builder();
        this.push_history();
        this.release_nodes();
        this.elm.set_rotation(rotation);
        this.refactor();
        this.capture_nodes();
    }
    increment_rotation() {
        this.elm.rotation++;
        if (this.elm.rotation > global.ROTATION_270) {
            this.elm.rotation = global.ROTATION_0;
        }
        this.set_rotation(this.elm.rotation);
    }
    increment_flip() { }
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
            if (this.MULTI_SELECTED) {
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
        if (this.MULTI_SELECTED) {
            multi_select_manager.determine_enveloping_bounds(this.bounds);
        }
        if (global.picture_request_flag ||
            (this.c_x >= view_port.left - global.node_space_x &&
                this.c_x - global.node_space_x <= view_port.right &&
                this.c_y >= view_port.top + -global.node_space_y &&
                this.c_y - global.node_space_y <= view_port.bottom)) {
            if (this.elm.rotation === global.ROTATION_90) {
                canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', this.elm.properties['Note']).replace('{UNIT}', this.elm.properties['units']), this.c_x, this.bounds.top + this.bounds.get_height() * 0.25, this.text_paint);
            }
            else if (this.elm.rotation === global.ROTATION_270) {
                canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', this.elm.properties['Note']).replace('{UNIT}', this.elm.properties['units']), this.c_x, this.bounds.bottom - this.bounds.get_height() * 0.25, this.text_paint);
            }
            else if (this.elm.rotation === global.ROTATION_0) {
                canvas.rotate(this.bounds.left, this.c_y, -90);
                canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', this.elm.properties['Note']).replace('{UNIT}', this.elm.properties['units']), this.bounds.left, this.c_y + this.bounds.get_height() * 0.25, this.text_paint);
                canvas.restore();
            }
            else if (this.elm.rotation === global.ROTATION_180) {
                canvas.rotate(this.bounds.right, this.c_y, -90);
                canvas.draw_text(global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', this.elm.properties['Note']).replace('{UNIT}', this.elm.properties['units']), this.bounds.right, this.c_y - this.bounds.get_height() * 0.25, this.text_paint);
                canvas.restore();
            }
            if (this.elm.properties['Show Marker'] === global.ON) {
                if (this.elm.rotation === global.ROTATION_0) {
                    canvas.draw_circle(this.c_x, this.c_y, global.canvas_stroke_width_2_zoom, this.point_paint);
                }
                else if (this.elm.rotation === global.ROTATION_90) {
                    canvas.draw_circle(this.c_x, this.c_y, global.canvas_stroke_width_2_zoom, this.point_paint);
                }
                else if (this.elm.rotation === global.ROTATION_180) {
                    canvas.draw_circle(this.c_x, this.c_y, global.canvas_stroke_width_2_zoom, this.point_paint);
                }
                else if (this.elm.rotation === global.ROTATION_270) {
                    canvas.draw_circle(this.c_x, this.c_y, global.canvas_stroke_width_2_zoom, this.point_paint);
                }
            }
            if (global.DEVELOPER_MODE) {
                canvas.draw_rect2(this.bounds, this.line_paint);
                canvas.draw_text(this.wire_reference.length, this.c_x, this.c_y - 50, this.text_paint);
            }
            if (this.elm.properties['Show Marker'] === global.ON) {
                if (!global.MOBILE_MODE) {
                    if (global.WIRE_BUILDER['step'] === 0 &&
                        !global.flag_menu_element_toolbox &&
                        this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() * 1.25, this.bounds.get_height() * 1.25) &&
                        !global.signal_add_element &&
                        !global.signal_history_lock &&
                        global.NODE_HINTS &&
                        !global.picture_request_flag &&
                        !multi_select_manager.MULTI_SELECT &&
                        !this.MULTI_SELECTED &&
                        !global.flag_save_circuit &&
                        !global.flag_save_image &&
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
            }
            if (this.is_translating) {
                canvas.draw_rect3(this.bounds.get_center_x(), this.bounds.get_center_y(), global.node_space_x << 2, global.node_space_y << 2, global.move_paint);
            }
        }
    }
    patch() {
        if (!global.not_null(this.elm.properties['Text Style'])) {
            this.elm.properties['Text Style'] = global.TEXT_STYLE_1;
            this.elm.properties['options'].push('Text Style');
            this.elm.properties['options_units'].push('');
        }
        if (!global.not_null(this.elm.properties['Show Marker'])) {
            this.elm.properties['Show Marker'] = global.ON;
            this.elm.properties['options'].push('Show Marker');
            this.elm.properties['options_units'].push('');
        }
        if (!global.not_null(this.line_buffer)) {
            this.line_buffer = [];
        }
        if (!global.not_null(this.circle_buffer)) {
            this.circle_buffer = [];
        }
        if (!global.not_null(this.BUILD_ELEMENT)) {
            this.BUILD_ELEMENT = false;
        }
        if (!global.not_null(this.ANGLE)) {
            this.ANGLE = 0;
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
