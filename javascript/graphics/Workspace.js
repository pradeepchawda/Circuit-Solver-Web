'use strict';
class Workspace {
    constructor(left, top, right, bottom, scale) {
        this.first_resize_flag = false;
        this.draw_to_screen = false;
        this.view = new RectF(left, top, right, bottom);
        this.bounds = new RectF(view_port.center_x - view_port.view_width * global.settings.WORKSPACE_RATIO_X * scale, view_port.center_y - view_port.view_height * global.settings.WORKSPACE_RATIO_Y * scale, view_port.center_x + view_port.view_width * global.settings.WORKSPACE_RATIO_X * scale, view_port.center_y + view_port.view_height * global.settings.WORKSPACE_RATIO_Y * scale);
        global.variables.node_space_x = this.bounds.get_width() / global.settings.SQRT_MAXNODES;
        global.variables.node_space_y = this.bounds.get_height() / global.settings.SQRT_MAXNODES;
        this.view_paint = new Paint();
        this.view_paint.set_paint_style(PAINT.style.STROKE);
        this.view_paint.set_paint_cap(PAINT.cap.ROUND);
        this.view_paint.set_paint_join(PAINT.join.MITER);
        this.view_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.view_paint.set_color(global.COLORS.GENERAL_GREEN_COLOR);
        this.view_paint.set_text_size(global.variables.canvas_text_size_4);
        this.view_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.view_paint.set_alpha(255);
        this.view_paint.set_paint_align(PAINT.align.CENTER);
        this.bounds_paint = new Paint();
        this.bounds_paint.set_paint_style(PAINT.style.STROKE);
        this.bounds_paint.set_paint_cap(PAINT.cap.ROUND);
        this.bounds_paint.set_paint_join(PAINT.join.MITER);
        this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_3 >> 1);
        this.bounds_paint.set_color(global.COLORS.GENERAL_GRAY_COLOR);
        this.bounds_paint.set_text_size(global.variables.canvas_text_size_4);
        this.bounds_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.bounds_paint.set_alpha(160);
        this.bounds_paint.set_paint_align(PAINT.align.CENTER);
        this.grid_paint = new Paint();
        this.grid_paint.set_paint_style(PAINT.style.STROKE);
        this.grid_paint.set_paint_cap(PAINT.cap.ROUND);
        this.grid_paint.set_paint_join(PAINT.join.MITER);
        this.grid_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.grid_paint.set_color(global.COLORS.GENERAL_GRAY_COLOR);
        this.grid_paint.set_text_size(global.variables.canvas_text_size_4);
        this.grid_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.grid_paint.set_alpha(60);
        this.grid_paint.set_paint_align(PAINT.align.CENTER);
        this.work_area_paint = new Paint();
        this.work_area_paint.set_paint_style(PAINT.style.FILL);
        this.work_area_paint.set_paint_cap(PAINT.cap.ROUND);
        this.work_area_paint.set_paint_join(PAINT.join.MITER);
        this.work_area_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.work_area_paint.set_color(global.COLORS.WORKSPACE_WORK_AREA_COLOR);
        this.work_area_paint.set_text_size(25);
        this.work_area_paint.set_font(global.CONSTANTS.DEFAULT_FONT);
        this.work_area_paint.set_alpha(255);
        this.work_area_paint.set_paint_align(PAINT.align.CENTER);
        this.sqrt = -1;
        this.sqrt_m_1 = -1;
        this.DRAW_GRID = false;
        this.line_buffer = [];
        this.grid_moved = true;
    }
    workspace_resize() {
        this.grid_moved = true;
        this.view_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.view_paint.set_text_size(global.variables.canvas_text_size_4);
        this.bounds_paint.set_stroke_width(global.variables.canvas_stroke_width_3 >> 1);
        this.bounds_paint.set_text_size(global.variables.canvas_text_size_4);
        this.grid_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
        this.grid_paint.set_text_size(global.variables.canvas_text_size_4);
        this.view.left = global.utils.remap_position(this.view.left, true);
        this.view.top = global.utils.remap_position(this.view.top, false);
        this.view.right = global.utils.remap_position(this.view.right, true);
        this.view.bottom = global.utils.remap_position(this.view.bottom, false);
        this.bounds.left = global.utils.remap_position(this.bounds.left, true);
        this.bounds.top = global.utils.remap_position(this.bounds.top, false);
        this.bounds.right = global.utils.remap_position(this.bounds.right, true);
        this.bounds.bottom = global.utils.remap_position(this.bounds.bottom, false);
        if (global.settings.WORKSPACE_PERFECT_SQUARE) {
            this.bounds.set_center2(this.bounds.get_center_x(), this.bounds.get_center_y(), global.variables.natural_width * global.variables.workspace_zoom_scale, global.variables.natural_height * global.variables.workspace_zoom_scale);
        }
        global.variables.node_space_x = this.bounds.get_width() / global.settings.SQRT_MAXNODES;
        global.variables.node_space_y = this.bounds.get_height() / global.settings.SQRT_MAXNODES;
        if (!this.first_resize_flag || global.flags.flag_force_resize_event) {
            zoom_window.set_zoom(global.variables.workspace_zoom_scale);
            this.first_resize_flag = true;
        }
        this.grid_paint.set_stroke_width(global.variables.canvas_stroke_width_1);
    }
    workspace_zoom() {
        this.grid_moved = true;
        global.flags.flag_build_element = true;
        global.variables.signal_build_counter = 0;
        this.bounds.left = global.variables.delta_x;
        this.bounds.top = global.variables.delta_y;
        this.bounds.right = this.bounds.left + global.variables.natural_width * global.variables.workspace_zoom_scale;
        this.bounds.bottom = this.bounds.top + global.variables.natural_height * global.variables.workspace_zoom_scale;
        global.variables.node_space_x = this.bounds.get_width() / global.settings.SQRT_MAXNODES;
        global.variables.node_space_y = this.bounds.get_height() / global.settings.SQRT_MAXNODES;
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
        global.flags.flag_build_element = true;
        global.variables.signal_build_counter = 0;
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
                    let x_space = Math.floor(global.variables.node_space_x >> 1);
                    let y_space = Math.floor(global.variables.node_space_y >> 1);
                    let loop_temp = Math.floor(nodes.length - floored_sqrt);
                    let horizontal_index = 0;
                    let index = 0;
                    let node_index = 0;
                    let node_index_alt = 0;
                    let cached_location_i = global.CONSTANTS.NULL;
                    let cached_location_horizontal = global.CONSTANTS.NULL;
                    let cached_location_index = global.CONSTANTS.NULL;
                    let cached_location_alt = global.CONSTANTS.NULL;
                    let temp_index = 0;
                    for (var i = 0; i < floored_sqrt; i++) {
                        node_index = (horizontal_index + floored_sqrt_m_1) >> global.CONSTANTS.ZERO;
                        node_index_alt = (loop_temp + i) >> global.CONSTANTS.ZERO;
                        if (i < floored_sqrt_m_1) {
                            cached_location_i = nodes[i].location;
                            cached_location_horizontal = nodes[horizontal_index].location;
                            cached_location_index = nodes[node_index].location;
                            cached_location_alt = nodes[node_index_alt].location;
                            if (i > 0) {
                                this.line_buffer[index++] = Array(cached_location_i.x, cached_location_i.y, cached_location_alt.x, cached_location_alt.y);
                                this.line_buffer[index++] = Array(cached_location_horizontal.x, cached_location_horizontal.y, cached_location_index.x, cached_location_index.y);
                            }
                            temp_index = (nodes.length - floored_sqrt + i) >> global.CONSTANTS.ZERO;
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
