/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Element1.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This is the bare-minimum that is required to describe a single node element.
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
class Element1 {
	/* Node 1 id */
	public n1: number;
	/* The type of component */
	public type: number;
	/* The unique identifier of the component */
	public id: number;
	/* The number of inputs or outputs of the device */
	public port_size: number;
	/* The rotation of the component  */
	public rotation: number;
	/* The flip of the component */
	public flip: number;
	/* The instrinsic properties of the component */
	public properties: ELEMENT_PROPERTY_T;
	/* A factor used to make sure the node mapping algorithm doesn't succomb to javascripts
inprecise nature. */
	public FUDGE_FACTOR: number;

	constructor(id: number, type: number, properties: ELEMENT_PROPERTY_T) {
		/* Node 1 id */
		this.n1 = -1;
		/* The type of component */
		this.type = type;
		/* The unique identifier of the component */
		this.id = id;
		/* The number of inputs or outputs of the device */
		this.port_size = 1;
		/* The rotation of the component  */
		this.rotation = 0;
		/* The flip of the component */
		this.flip = 0;
		/* The instrinsic properties of the component */
		this.properties = properties;
		/* A factor used to make sure the node mapping algorithm doesn't succomb to javascripts
    inprecise nature. */
		this.FUDGE_FACTOR = 0.98;
	}
	/* Set the properties of the component */
	set_properties(properties: ELEMENT_PROPERTY_T): void {
		this.properties = properties;
	}
	/* Get the properties of the component */
	get_properties(): ELEMENT_PROPERTY_T {
		return this.properties;
	}
	/* Set the rotation of the component */
	set_rotation(rotation: number): void {
		this.rotation = rotation;
	}
	/* Get the rotation of the component */
	get_rotation(): number {
		return this.rotation;
	}
	/* Sets the flip of the component */
	set_flip(flip: number) {
		this.flip = flip;
	}
	/* Get the flip of hte component */
	get_flip(): number {
		return this.flip;
	}
	/* Get the component port size */
	get_port_size(): number {
		return this.port_size;
	}
	/* Set the id of attached node 1 */
	set_node_1(n1: number): void {
		this.n1 = n1;
	}
	/* Get the id of attached node 1 */
	get_node_1(): number {
		return this.n1;
	}
	/* Set multiple nodes */
	set_nodes(n1: number): void {
		this.n1 = n1;
	}
	/* Get multiple nodes */
	get_nodes(): Array<number> {
		return Array(this.n1);
	}
	/* A quick check to see if the element is consistent, elements will have
  -1 as their reference when they are not anchored. */
	consistent(): boolean {
		return this.n1 > -1;
	}
	/* General algorithm to map the spacial location to nodes */
	map_node1(x1: number, y1: number): void {
		let sqrt: number = this.round(global.settings.SQRT_MAXNODES);
		let w_factor: number = (this.FUDGE_FACTOR / workspace.bounds.get_width()) * sqrt;
		let h_factor: number = (this.FUDGE_FACTOR / workspace.bounds.get_height()) * sqrt;
		let x_1: number = Math.floor((x1 - workspace.bounds.left) * w_factor);
		let y_1: number = Math.floor((y1 - workspace.bounds.top) * h_factor);
		let n1: number = this.to_index(sqrt, x_1, y_1);
		if (n1 >= 0 && n1 < global.settings.MAXNODES) {
			this.n1 = n1;
		}
	}
	/* Generates a unique id from a "row" and "col" */
	to_index(sqrt: number, ...i: Array<number>): number {
		return i[1] * sqrt + i[0];
	}
	/* Helper function to keep the elements within the grid and on the intersections of it. */
	snap_to_grid(x1: number, y1: number): Array<number> {
		/* Limit the x and y values to fit within the bounds of the grid. */
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
