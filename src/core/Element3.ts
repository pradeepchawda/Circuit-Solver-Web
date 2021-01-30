'use strict';
class Element3 {
	public n1: number;
	public n2: number;
	public n3: number;
	public type: number;
	public id: number;
	public port_size: number;
	public rotation: number;
	public flip: number;
	public properties: ELEMENT_PROPERTY_T;
	public readonly FUDGE_FACTOR: number;
	constructor(id: number, type: number, properties: ELEMENT_PROPERTY_T) {
		this.n1 = -1;
		this.n2 = -1;
		this.n3 = -1;
		this.type = type;
		this.id = id;
		this.port_size = 3;
		this.rotation = 0;
		this.flip = 0;
		this.properties = properties;
		this.FUDGE_FACTOR = 0.98;
	}
	set_properties(properties: ELEMENT_PROPERTY_T): void {
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
	set_flip(flip: number): void {
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
	set_node_3(n3: number): void {
		this.n3 = n3;
	}
	get_node_1(): number {
		return this.n1;
	}
	get_node_2(): number {
		return this.n2;
	}
	get_node_3(): number {
		return this.n3;
	}
	set_nodes(n1: number, n2: number, n3: number): void {
		this.n1 = n1;
		this.n2 = n2;
		this.n3 = n3;
	}
	get_nodes(): Array<number> {
		return Array(this.n1, this.n2, this.n3);
	}
	consistent(): boolean {
		return this.n1 > -1 && this.n2 > -1 && this.n3 > -1;
	}
	map_node3(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
		let sqrt: number = this.round(global.settings.SQRT_MAXNODES);
		let w_factor: number = (this.FUDGE_FACTOR / workspace.bounds.get_width()) * sqrt;
		let h_factor: number = (this.FUDGE_FACTOR / workspace.bounds.get_height()) * sqrt;
		let x_1: number = Math.floor((x1 - workspace.bounds.left) * w_factor);
		let y_1: number = Math.floor((y1 - workspace.bounds.top) * h_factor);
		let x_2: number = Math.floor((x2 - workspace.bounds.left) * w_factor);
		let y_2: number = Math.floor((y2 - workspace.bounds.top) * h_factor);
		let x_3: number = Math.floor((x3 - workspace.bounds.left) * w_factor);
		let y_3: number = Math.floor((y3 - workspace.bounds.top) * h_factor);
		let n1: number = this.to_index(sqrt, x_1, y_1);
		let n2: number = this.to_index(sqrt, x_2, y_2);
		let n3: number = this.to_index(sqrt, x_3, y_3);
		if (n1 >= 0 && n1 < global.settings.MAXNODES && n2 >= 0 && n2 < global.settings.MAXNODES && n3 >= 0 && n3 < global.settings.MAXNODES) {
			this.n1 = n1;
			this.n2 = n2;
			this.n3 = n3;
		}
	}
	to_index(sqrt: number, x: number, y: number): number {
		return y * sqrt + x;
	}
	snap_to_grid(x1: number, y1: number): Array<number> {
		x1 = this.limit(x1, workspace.bounds.left + global.variables.node_space_x * 1.5, workspace.bounds.right - global.variables.node_space_x * 1.25);
		y1 = this.limit(y1, workspace.bounds.top + global.variables.node_space_y * 1.5, workspace.bounds.bottom - global.variables.node_space_y * 1.25);
		let sqrt: number = this.round(global.settings.SQRT_MAXNODES);
		let x_1: number = Math.floor((((x1 - workspace.bounds.left) * this.FUDGE_FACTOR) / workspace.bounds.get_width()) * sqrt);
		let y_1: number = Math.floor((((y1 - workspace.bounds.top) * this.FUDGE_FACTOR) / workspace.bounds.get_height()) * sqrt);
		let n1: number = this.to_index(sqrt, x_1, y_1);
		if (n1 >= 0 && n1 < global.settings.MAXNODES) {
			return Array(nodes[n1].location.x, nodes[n1].location.y);
		}
		return Array(x1, y1);
	}
	limit(inp: number, low: number, high: number): number {
		if (inp < low) {
			return low;
		} else if (inp > high) {
			return high;
		} else {
			return inp;
		}
	}
	round(value: number): number {
		return Math.round((value + Number.EPSILON) * 1000) / 1000;
	}
}
