'use strict';
class Workspace {
	public FIRST_RESIZE_FLAG: boolean;
	public DRAW_TO_SCREEN: boolean;
	public view: RectF;
	public bounds: RectF;
	public view_paint: Paint;
	public bounds_paint: Paint;
	public grid_paint: Paint;
	public work_area_paint: Paint;
	public sqrt: number;
	public sqrt_m_1: number;
	public DRAW_GRID: boolean;
	public line_buffer: Array<Array<number>>;
	public GRID_MOVED: boolean;
	constructor(left: number, top: number, right: number, bottom: number, scale: number) {
		this.FIRST_RESIZE_FLAG = false;
		this.DRAW_TO_SCREEN = false;
		this.view = new RectF(left, top, right, bottom);
		this.bounds = new RectF(
			view_port.center_x - view_port.view_width * global.settings.WORKSPACE_RATIO_X * scale,
			view_port.center_y - view_port.view_height * global.settings.WORKSPACE_RATIO_Y * scale,
			view_port.center_x + view_port.view_width * global.settings.WORKSPACE_RATIO_X * scale,
			view_port.center_y + view_port.view_height * global.settings.WORKSPACE_RATIO_Y * scale
		);
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
		this.GRID_MOVED = true;
	}
	workspace_resize(): void {
		this.GRID_MOVED = true;
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
		if (!this.FIRST_RESIZE_FLAG || global.force_resize_event) {
			zoom_window.set_zoom(global.workspace_zoom_scale);
			this.FIRST_RESIZE_FLAG = true;
		}
		this.grid_paint.set_stroke_width(global.canvas_stroke_width_1);
	}
	workspace_zoom(): void {
		this.GRID_MOVED = true;
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
for (var i : number = 0; i < voltmeters.length; i++) {
      voltmeters[i].RESIZE_METER_TRACE = true;
    }
for (var i : number = 0; i < ohmmeters.length; i++) {
      ohmmeters[i].RESIZE_METER_TRACE = true;
    }
for (var i : number = 0; i < ammeters.length; i++) {
      ammeters[i].RESIZE_METER_TRACE = true;
    }
for (var i : number = 0; i < wattmeters.length; i++) {
      wattmeters[i].RESIZE_METER_TRACE = true;
    }
/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	workspace_translate_bounds(dx: number, dy: number): void {
		this.GRID_MOVED = true;
		global.signal_build_element = true;
		global.signal_build_counter = 0;
		this.bounds.left += dx;
		this.bounds.right += dx;
		this.bounds.top += dy;
		this.bounds.bottom += dy;
	}
	workspace_draw(canvas: GraphicsEngine): void {
		if (this.DRAW_TO_SCREEN) {
			if (this.DRAW_GRID === true) {
				canvas.draw_rect2(this.bounds, this.work_area_paint);
				canvas.draw_rect2(this.bounds, this.grid_paint);
			}
			canvas.draw_rect2(this.bounds, this.bounds_paint);
			if (this.DRAW_GRID === true) {
				if (this.GRID_MOVED === true) {
					let floored_sqrt_m_1: number = Math.floor(global.settings.SQRT_MAXNODES_M1);
					let floored_sqrt: number = Math.floor(global.settings.SQRT_MAXNODES);
					let x_space: number = Math.floor(global.node_space_x >> 1);
					let y_space: number = Math.floor(global.node_space_y >> 1);
					let loop_temp: number = Math.floor(nodes.length - floored_sqrt);
					let horizontal_index: number = 0;
					let index: number = 0;
					let node_index: number = 0;
					let node_index_alt: number = 0;
					let cached_location_i: PointF = global.NULL;
					let cached_location_horizontal: PointF = global.NULL;
					let cached_location_index: PointF = global.NULL;
					let cached_location_alt: PointF = global.NULL;
					let temp_index: number = 0;
					for (var i: number = 0; i < floored_sqrt; i++) {
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
					this.GRID_MOVED = false;
				}
				canvas.draw_line_buffer(this.line_buffer, this.grid_paint);
			}
		}
		if (this.FIRST_RESIZE_FLAG) {
			if (!this.DRAW_TO_SCREEN) {
				this.DRAW_TO_SCREEN = true;
			}
		}
	}
}
