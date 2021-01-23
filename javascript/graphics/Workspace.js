'use strict';
class Workspace {
    constructor(left, top, right, bottom, scale) {
        this.first_resize_flag = false;
        this.draw_to_screen = false;
        this.view = new RectF(left, top, right, bottom);
        this.bounds = new RectF(view_port.center_x - view_port.view_width * global.settings.WORKSPACE_RATIO_X * scale, view_port.center_y - view_port.view_height * global.settings.WORKSPACE_RATIO_Y * scale, view_port.center_x + view_port.view_width * global.settings.WORKSPACE_RATIO_X * scale, view_port.center_y + view_port.view_height * global.settings.WORKSPACE_RATIO_Y * scale);
        global.node_space_x = this.bounds.get_width() / global.settings.SQRT_MAXNODES;
        global.node_space_y = this.bounds.get_height() / global.settings.SQRT_MAXNODES;
        this.view_paint = new Paint();
        this.view_paint.set_paint_style(this.view_paint.style.STROKE);
        this.view_paint.set_paint_cap(this.view_paint.cap.ROUND);
        this.view_paint.set_paint_join(this.view_paint.join.MITER);
        this.view_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.view_paint.set_color(global.GENERAL_GREEN_COLOR);
        this.view_paint.set_text_size(global.canvas_text_size_4);
        this.view_paint.set_font(global.DEFAULT_FONT);
        this.view_paint.set_alpha(255);
        this.view_paint.set_paint_align(this.view_paint.align.CENTER);
        this.bounds_paint = new Paint();
        this.bounds_paint.set_paint_style(this.bounds_paint.style.STROKE);
        this.bounds_paint.set_paint_cap(this.bounds_paint.cap.ROUND);
        this.bounds_paint.set_paint_join(this.bounds_paint.join.MITER);
        this.bounds_paint.set_stroke_width(global.canvas_stroke_width_3 >> 1);
        this.bounds_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.bounds_paint.set_text_size(global.canvas_text_size_4);
        this.bounds_paint.set_font(global.DEFAULT_FONT);
        this.bounds_paint.set_alpha(160);
        this.bounds_paint.set_paint_align(this.bounds_paint.align.CENTER);
        this.grid_paint = new Paint();
        this.grid_paint.set_paint_style(this.grid_paint.style.STROKE);
        this.grid_paint.set_paint_cap(this.grid_paint.cap.ROUND);
        this.grid_paint.set_paint_join(this.grid_paint.join.MITER);
        this.grid_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.grid_paint.set_color(global.GENERAL_GRAY_COLOR);
        this.grid_paint.set_text_size(global.canvas_text_size_4);
        this.grid_paint.set_font(global.DEFAULT_FONT);
        this.grid_paint.set_alpha(60);
        this.grid_paint.set_paint_align(this.grid_paint.align.CENTER);
        this.work_area_paint = new Paint();
        this.work_area_paint.set_paint_style(this.work_area_paint.style.FILL);
        this.work_area_paint.set_paint_cap(this.work_area_paint.cap.ROUND);
        this.work_area_paint.set_paint_join(this.work_area_paint.join.MITER);
        this.work_area_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.work_area_paint.set_color(global.WORKSPACE_WORK_AREA_COLOR);
        this.work_area_paint.set_text_size(25);
        this.work_area_paint.set_font(global.DEFAULT_FONT);
        this.work_area_paint.set_alpha(255);
        this.work_area_paint.set_paint_align(this.work_area_paint.align.CENTER);
        this.sqrt = -1;
        this.sqrt_m_1 = -1;
        this.DRAW_GRID = false;
        this.line_buffer = [];
        this.grid_moved = true;
    }
    workspace_resize() {
        this.grid_moved = true;
        this.view_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.view_paint.set_text_size(global.canvas_text_size_4);
        this.bounds_paint.set_stroke_width(global.canvas_stroke_width_3 >> 1);
        this.bounds_paint.set_text_size(global.canvas_text_size_4);
        this.grid_paint.set_stroke_width(global.canvas_stroke_width_1);
        this.grid_paint.set_text_size(global.canvas_text_size_4);
        this.view.left = global.remap_position(this.view.left, true);
        this.view.top = global.remap_position(this.view.top, false);
        this.view.right = global.remap_position(this.view.right, true);
        this.view.bottom = global.remap_position(this.view.bottom, false);
        this.bounds.left = global.remap_position(this.bounds.left, true);
        this.bounds.top = global.remap_position(this.bounds.top, false);
        this.bounds.right = global.remap_position(this.bounds.right, true);
        this.bounds.bottom = global.remap_position(this.bounds.bottom, false);
        if (global.settings.WORKSPACE_PERFECT_SQUARE) {
            this.bounds.set_center2(this.bounds.get_center_x(), this.bounds.get_center_y(), global.natural_width * global.workspace_zoom_scale, global.natural_height * global.workspace_zoom_scale);
        }
        global.node_space_x = this.bounds.get_width() / global.settings.SQRT_MAXNODES;
        global.node_space_y = this.bounds.get_height() / global.settings.SQRT_MAXNODES;
        if (!this.first_resize_flag || global.force_resize_event) {
            zoom_window.set_zoom(global.workspace_zoom_scale);
            this.first_resize_flag = true;
        }
        this.grid_paint.set_stroke_width(global.canvas_stroke_width_1);
    }
    workspace_zoom() {
        this.grid_moved = true;
        global.signal_build_element = true;
        global.signal_build_counter = 0;
        this.bounds.left = global.delta_x;
        this.bounds.top = global.delta_y;
        this.bounds.right = this.bounds.left + global.natural_width * global.workspace_zoom_scale;
        this.bounds.bottom = this.bounds.top + global.natural_height * global.workspace_zoom_scale;
        global.node_space_x = this.bounds.get_width() / global.settings.SQRT_MAXNODES;
        global.node_space_y = this.bounds.get_height() / global.settings.SQRT_MAXNODES;
        /* #INSERT_METER_RESIZE_TRACE# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        for (var i = 0; i < voltmeters.length; i++) {
            voltmeters[i].resize_meter_trace = true;
        }
        for (var i = 0; i < ohmmeters.length; i++) {
            ohmmeters[i].resize_meter_trace = true;
        }
        for (var i = 0; i < ammeters.length; i++) {
            ammeters[i].resize_meter_trace = true;
        }
        for (var i = 0; i < wattmeters.length; i++) {
            wattmeters[i].resize_meter_trace = true;
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    workspace_translate_bounds(dx, dy) {
        this.grid_moved = true;
        global.signal_build_element = true;
        global.signal_build_counter = 0;
        this.bounds.left += dx;
        this.bounds.right += dx;
        this.bounds.top += dy;
        this.bounds.bottom += dy;
    }
    workspace_draw(canvas) {
        if (this.draw_to_screen) {
            if (this.DRAW_GRID === true) {
                canvas.draw_rect2(this.bounds, this.work_area_paint);
                canvas.draw_rect2(this.bounds, this.grid_paint);
            }
            canvas.draw_rect2(this.bounds, this.bounds_paint);
            if (this.DRAW_GRID === true) {
                if (this.grid_moved === true) {
                    let floored_sqrt_m_1 = Math.floor(global.settings.SQRT_MAXNODES_M1);
                    let floored_sqrt = Math.floor(global.settings.SQRT_MAXNODES);
                    let x_space = Math.floor(global.node_space_x >> 1);
                    let y_space = Math.floor(global.node_space_y >> 1);
                    let loop_temp = Math.floor(nodes.length - floored_sqrt);
                    let horizontal_index = 0;
                    let index = 0;
                    let node_index = 0;
                    let node_index_alt = 0;
                    let cached_location_i = global.NULL;
                    let cached_location_horizontal = global.NULL;
                    let cached_location_index = global.NULL;
                    let cached_location_alt = global.NULL;
                    let temp_index = 0;
                    for (var i = 0; i < floored_sqrt; i++) {
                        node_index = (horizontal_index + floored_sqrt_m_1) >> global.ZERO;
                        node_index_alt = (loop_temp + i) >> global.ZERO;
                        if (i < floored_sqrt_m_1) {
                            cached_location_i = nodes[i].location;
                            cached_location_horizontal = nodes[horizontal_index].location;
                            cached_location_index = nodes[node_index].location;
                            cached_location_alt = nodes[node_index_alt].location;
                            if (i > 0) {
                                this.line_buffer[index++] = Array(cached_location_i.x, cached_location_i.y, cached_location_alt.x, cached_location_alt.y);
                                this.line_buffer[index++] = Array(cached_location_horizontal.x, cached_location_horizontal.y, cached_location_index.x, cached_location_index.y);
                            }
                            temp_index = (nodes.length - floored_sqrt + i) >> global.ZERO;
                            this.line_buffer[index++] = Array(cached_location_i.x + x_space, cached_location_i.y, cached_location_alt.x + x_space, nodes[temp_index].location.y);
                            this.line_buffer[index++] = Array(cached_location_horizontal.x, cached_location_horizontal.y + y_space, cached_location_index.x, cached_location_index.y + y_space);
                        }
                        horizontal_index += floored_sqrt;
                    }
                    this.grid_moved = false;
                }
                canvas.draw_line_buffer(this.line_buffer, this.grid_paint);
            }
        }
        if (this.first_resize_flag) {
            if (!this.draw_to_screen) {
                this.draw_to_screen = true;
            }
        }
    }
}
