'use strict';
class Element2 {
	public n1: number;
	public n2: number;
	public type: number;
	public id: number;
	public port_size: number;
	public rotation: number;
	public flip: number;
	public properties: ELEMENT_PROPERTY_T;
	public wire_style: number;
	public FUDGE_FACTOR: number;
	constructor(id: number, type: number, properties: ELEMENT_PROPERTY_T) {
		this.n1 = -1;
		this.n2 = -1;
		this.type = type;
		this.id = id;
		this.port_size = 2;
		this.rotation = 0;
		this.flip = 0;
		this.properties = properties;
		this.wire_style = 0;
		this.FUDGE_FACTOR = 0.98;
	}
	set_properties(properties: ELEMENT_PROPERTY_T) {
		this.properties = properties;
	}
	get_properties(): ELEMENT_PROPERTY_T {
		return this.properties;
	}
	set_rotation(rotation: number): void {
		this.rotation = rotation;
	}
	get_rotation(): number {
		return this.rotation;
	}
	set_wire_style(style: number) {
		this.wire_style = style;
	}
	get_wire_style(): number {
		return this.wire_style;
	}
	set_flip(flip: number) {
		this.flip = flip;
	}
	get_flip(): number {
		return this.flip;
	}
	get_port_size(): number {
		return this.port_size;
	}
	set_node_1(n1: number): void {
		this.n1 = n1;
	}
	set_node_2(n2: number): void {
		this.n2 = n2;
	}
	get_node_1(): number {
		return this.n1;
	}
	get_node_2(): number {
		return this.n2;
	}
	set_nodes(n1: number, n2: number): void {
		this.n1 = n1;
		this.n2 = n2;
	}
	get_nodes(): Array<number> {
		return Array(this.n1, this.n2);
	}
	consistent(): boolean {
		return this.n1 > -1 && this.n2 > -1;
	}
	map_node2(x1: number, y1: number, x2: number, y2: number): void {
		let sqrt: number = this.round(global.settings.SQRT_MAXNODES);
		let w_factor: number = (this.FUDGE_FACTOR / workspace.bounds.get_width()) * sqrt;
		let h_factor: number = (this.FUDGE_FACTOR / workspace.bounds.get_height()) * sqrt;
		let x_1: number = Math.floor((x1 - workspace.bounds.left) * w_factor);
		let y_1: number = Math.floor((y1 - workspace.bounds.top) * h_factor);
		let x_2: number = Math.floor((x2 - workspace.bounds.left) * w_factor);
		let y_2: number = Math.floor((y2 - workspace.bounds.top) * h_factor);
		let n1: number = this.to_index(sqrt, x_1, y_1);
		let n2: number = this.to_index(sqrt, x_2, y_2);
		if (n1 >= 0 && n1 < global.settings.MAXNODES && n2 >= 0 && n2 < global.settings.MAXNODES) {
			this.n1 = n1;
			this.n2 = n2;
		}
	}
	to_index(sqrt: number, x: number, y: number): number {
		return y * sqrt + x;
	}
	snap_to_grid(x1: number, y1: number): Array<number> {
		x1 = global.limit(x1, workspace.bounds.left + global.node_space_x * 1.5, workspace.bounds.right - global.node_space_x * 1.25);
		y1 = global.limit(y1, workspace.bounds.top + global.node_space_y * 1.5, workspace.bounds.bottom - global.node_space_y * 1.25);
		let sqrt: number = this.round(global.settings.SQRT_MAXNODES);
		let x_1: number = Math.floor((((x1 - workspace.bounds.left) * this.FUDGE_FACTOR) / workspace.bounds.get_width()) * sqrt);
		let y_1: number = Math.floor((((y1 - workspace.bounds.top) * this.FUDGE_FACTOR) / workspace.bounds.get_height()) * sqrt);
		let n1: number = this.to_index(sqrt, x_1, y_1);
		if (n1 >= 0 && n1 < global.settings.MAXNODES) {
			return Array(nodes[n1].location.x, nodes[n1].location.y);
		}
		return Array(x1, y1);
	}
	round(value: number): number {
		return Math.round((value + Number.EPSILON) * 1000) / 1000;
	}
}
