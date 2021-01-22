'use strict';
class ElectricalNode {
	public location: PointF;
	public node_line_paint: Paint;
	public node_fill_paint: Paint;
	public node_fill_paint_alt: Paint;
	public id: number;
	public simulation_id: number;
	public references: Array<NodeReference>;
	public column: number;
	public row: number;
	public bounds: RectF;
	public loc_x_precalc: number;
	public loc_y_precalc: number;
	constructor(x: number, y: number, id: number) {
		this.location = new PointF(x, y);
		this.node_line_paint = new Paint();
		this.node_line_paint.set_paint_style(this.node_line_paint.style.STROKE);
		this.node_line_paint.set_paint_cap(this.node_line_paint.cap.ROUND);
		this.node_line_paint.set_paint_join(this.node_line_paint.join.MITER);
		this.node_line_paint.set_stroke_width(global.canvas_stroke_width_1);
		this.node_line_paint.set_color(global.GENERAL_CYAN_COLOR);
		this.node_line_paint.set_text_size(global.canvas_text_size_5);
		this.node_line_paint.set_font(global.DEFAULT_FONT);
		this.node_line_paint.set_alpha(192);
		this.node_line_paint.set_paint_align(this.node_line_paint.align.CENTER);
		this.node_fill_paint = new Paint();
		this.node_fill_paint.set_paint_style(this.node_fill_paint.style.FILL);
		this.node_fill_paint.set_paint_cap(this.node_fill_paint.cap.ROUND);
		this.node_fill_paint.set_paint_join(this.node_fill_paint.join.MITER);
		this.node_fill_paint.set_stroke_width(global.canvas_stroke_width_1);
		this.node_fill_paint.set_color(global.GENERAL_CYAN_COLOR);
		this.node_fill_paint.set_text_size(global.canvas_text_size_5);
		this.node_fill_paint.set_font(global.DEFAULT_FONT);
		this.node_fill_paint.set_alpha(192);
		this.node_fill_paint.set_paint_align(this.node_fill_paint.align.CENTER);
		this.node_fill_paint_alt = new Paint();
		this.node_fill_paint_alt.set_paint_style(this.node_fill_paint_alt.style.FILL);
		this.node_fill_paint_alt.set_paint_cap(this.node_fill_paint_alt.cap.ROUND);
		this.node_fill_paint_alt.set_paint_join(this.node_fill_paint_alt.join.MITER);
		this.node_fill_paint_alt.set_stroke_width(global.canvas_stroke_width_1);
		this.node_fill_paint_alt.set_color(global.GENERAL_GREEN_COLOR);
		this.node_fill_paint_alt.set_text_size(global.canvas_text_size_5);
		this.node_fill_paint_alt.set_font(global.DEFAULT_FONT);
		this.node_fill_paint_alt.set_alpha(192);
		this.node_fill_paint_alt.set_paint_align(this.node_fill_paint_alt.align.CENTER);
		this.id = id;
		this.simulation_id = -1;
		this.references = [];
		this.column = Math.floor(this.id / Math.round(global.settings.SQRT_MAXNODES));
		this.row = this.id % Math.round(global.settings.SQRT_MAXNODES);
		let node_space_x: number = 1.175 * (global.node_space_x >> 2);
		let node_space_y: number = 1.175 * (global.node_space_y >> 2);
		if (global.MOBILE_MODE) {
			node_space_x *= 1.25;
			node_space_y *= 1.25;
		}
		this.bounds = new RectF(this.location.x - node_space_x, this.location.y - node_space_y, this.location.x + node_space_x, this.location.y + node_space_y);
		this.loc_x_precalc = this.row * global.settings.INV_SQRT_M_1;
		this.loc_y_precalc = this.column * global.settings.INV_SQRT_M_1;
	}
	resize(n_x: number, n_y: number, m_n_x: number, m_n_y: number): void {
		if (global.signal_build_element) {
			this.location.x = workspace.bounds.left + this.loc_x_precalc * workspace.bounds.get_width();
			this.location.y = workspace.bounds.top + this.loc_y_precalc * workspace.bounds.get_height();
			if (!global.MOBILE_MODE) {
				this.bounds.set_bounds(this.location.x - n_x, this.location.y - n_y, this.location.x + n_x, this.location.y + n_y);
			} else {
				this.bounds.set_bounds(this.location.x - m_n_x, this.location.y - m_n_y, this.location.x + m_n_x, this.location.y + m_n_y);
			}
			this.node_line_paint.set_stroke_width(global.canvas_stroke_width_1);
			this.node_line_paint.set_text_size(global.canvas_text_size_5);
			this.node_fill_paint.set_stroke_width(global.canvas_stroke_width_1);
			this.node_fill_paint.set_text_size(global.canvas_text_size_5);
			this.node_fill_paint_alt.set_stroke_width(global.canvas_stroke_width_1);
			this.node_fill_paint_alt.set_text_size(global.canvas_text_size_5);
		}
	}
	set_color(color: string): void {
		this.node_line_paint.set_color(color);
		this.node_fill_paint.set_color(color);
		this.node_fill_paint_alt.set_color(color);
	}
	get_bounds(): RectF {
		return this.bounds;
	}
	contains_xy(x: number, y: number): boolean {
		return this.bounds.contains_xy(x, y);
	}
	contains_xywh(x: number, y: number, w: number, h: number): boolean {
		return this.bounds.contains_xywh(x, y, w, h);
	}
	get_id(): number {
		return this.id;
	}
	clear_references(): void {
		this.references = [];
		node_manager.remove_node(this.id);
	}
	add_reference_list(reference_list: Array<NodeReference>): void {
		for (var i: number = 0; i < reference_list.length; i++) {
			this.add_reference(reference_list[i].id, reference_list[i].type);
		}
	}
	add_reference(id: number, type: number): void {
		let is_found: boolean = false;
		for (var i: number = 0; i < this.references.length; i++) {
			if (this.references[i].id === id && this.references[i].type === type) {
				is_found = true;
				break;
			}
		}
		if (!is_found) {
			this.references.push(new NodeReference(id, type));
			if (this.references.length > 0) {
				node_manager.add_node(this.id);
			}
		}
	}
	remove_reference(id: number, type: number): void {
		if (this.references.length > 0) {
			for (var i: number = 0; i < this.references.length; i++) {
				if (this.references[i].id === id && this.references[i].type === type) {
					this.references.splice(i, 1);
					break;
				}
			}
			if (this.references.length === 0) {
				node_manager.remove_node(this.id);
			}
		}
	}
	contains_element_type(type: number): boolean {
		let out: boolean = false;
		for (var i: number = 0; i < this.references.length; i++) {
			if (this.references[i].type === type) {
				out = true;
				break;
			}
		}
		return out;
	}
	draw_node_builder_helper(): boolean {
		let count: number = 0;
		let index: number = -1;
		for (var i: number = 0; i < this.references.length; i++) {
			if (this.references[i].type === global.TYPE_NOTE) {
				index = engine_functions.get_note(this.references[i].id);
				if (index > -1 && index < notes.length) {
					if (notes[index].elm.properties['Show Marker'] === global.OFF) {
						count++;
					}
				}
			} else {
				count = -1;
				break;
			}
		}
		if (count === this.references.length) {
			return false;
		} else {
			return true;
		}
	}
	debug_info(): string {
		let str: string = '';
		let DEBUG_TEMPLATE: string = '({ID},{TYPE}),';
		for (var i: number = 0; i < this.references.length; i++) {
			str += DEBUG_TEMPLATE.replace('{ID}', <string>(<unknown>this.references[i].id)).replace('{TYPE}', <string>(<unknown>this.references[i].type));
		}
		return str;
	}
	draw(canvas: GraphicsEngine): void {
		if (this.references.length > 0) {
			if (global.DEVELOPER_MODE) {
				canvas.draw_circle(this.location.x, this.location.y, 2 * global.canvas_stroke_width_3, this.node_line_paint);
				canvas.draw_text(this.debug_info(), this.location.x, this.location.y, this.node_line_paint);
			} else {
				if (global.wire_builder['step'] > 0) {
					if (global.wire_builder['n1'] > -1 && global.wire_builder['n1'] < global.settings.MAXNODES) {
						if (global.wire_builder['n1'] !== this.id && this.draw_node_builder_helper()) {
							global.node_line_buffer[global.node_line_buffer_index++] = Array(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top);
							global.node_line_buffer[global.node_line_buffer_index++] = Array(this.bounds.left, this.bounds.bottom, this.bounds.right, this.bounds.bottom);
							global.node_line_buffer[global.node_line_buffer_index++] = Array(this.bounds.left, this.bounds.top, this.bounds.left, this.bounds.bottom);
							global.node_line_buffer[global.node_line_buffer_index++] = Array(this.bounds.right, this.bounds.top, this.bounds.right, this.bounds.bottom);
						}
					}
				}
			}
		} else {
			this.simulation_id = -1;
		}
	}
}
