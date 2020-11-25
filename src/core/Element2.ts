/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Element2.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This is the bare-minimum that is required to describe a double node element.
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
class Element2 {
  /* Node 1 id */
  public n1: number = -1;
  /* Node 2 id */
  public n2: number = -1;
  /* The type of component */
  public type: number = -1;
  /* The unique identifier of the component */
  public id: number = -1;
  /* The number of inputs or outputs of the device */
  public port_size: number = 2;
  /* The rotation of the component  */
  public rotation: number = 0;
  /* The flip of the component */
  public flip: number = 0;
  /* The instrinsic properties of the component */
  public properties = null;
  /* The wire style of the component */
  public wire_style: number = 0;
  /* A factor used to make sure the node mapping algorithm doesn't succomb to javascripts
inprecise nature. */
  public FUDGE_FACTOR: number = 0.98;

  constructor(id: number, type: number, properties) {
    /* Node 1 id */
    this.n1 = -1;
    /* Node 2 id */
    this.n2 = -1;
    /* The type of component */
    this.type = type;
    /* The unique identifier of the component */
    this.id = id;
    /* The number of inputs or outputs of the device */
    this.port_size = 2;
    /* The rotation of the component  */
    this.rotation = 0;
    /* The flip of the component */
    this.flip = 0;
    /* The instrinsic properties of the component */
    this.properties = properties;
    /* The wire style of the component */
    this.wire_style = 0;
    /* A factor used to make sure the node mapping algorithm doesn't succomb to javascripts
    inprecise nature. */
    this.FUDGE_FACTOR = 0.98;
  }
  /* Set the properties of the component */
  set_properties(properties) {
    this.properties = properties;
  }
  /* Get the properties of the component */
  get_properties() {
    return this.properties;
  }
  /* Set the rotation of the component */
  set_rotation(rotation) {
    this.rotation = rotation;
  }
  /* Get the rotation of the component */
  get_rotation() {
    return this.rotation;
  }
  /* Set the style of the wire element. */
  set_wire_style(style: number) {
    this.wire_style = style;
  }
  /* Get the style of the wire element. */
  get_wire_style() {
    return this.wire_style;
  }
  /* Sets the flip of the component */
  set_flip(flip: number) {
    this.flip = flip;
  }
  /* Get the flip of hte component */
  get_flip() {
    return this.flip;
  }
  /* Get the component port size */
  get_port_size() {
    return this.port_size;
  }
  /* Set the id of attached node 1 */
  set_node_1(n1: number) {
    this.n1 = n1;
  }
  /* Set the id of attached node 2 */
  set_node_2(n2: number) {
    this.n2 = n2;
  }
  /* Get the id of attached node 1 */
  get_node_1() {
    return this.n1;
  }
  /* Get the id of attached node 2 */
  get_node_2() {
    return this.n2;
  }
  /* Set multiple nodes */
  set_nodes(n1: number, n2: number) {
    this.n1 = n1;
    this.n2 = n2;
  }
  /* Get multiple nodes */
  get_nodes() {
    return Array(this.n1, this.n2);
  }
  /* A quick check to see if the element is consistent, elements will have
  -1 as their reference when they are not anchored. */
  consistent() {
    return this.n1 > -1 && this.n2 > -1;
  }
  /* General algorithm to map the spacial location to nodes */
  map_node2(x1: number, y1: number, x2: number, y2: number) {
    let sqrt = this.round(global.settings.SQRT_MAXNODES);
    let w_factor = (this.FUDGE_FACTOR / workspace.bounds.get_width()) * sqrt;
    let h_factor = (this.FUDGE_FACTOR / workspace.bounds.get_height()) * sqrt;
    let x_1 = Math.floor((x1 - workspace.bounds.left) * w_factor);
    let y_1 = Math.floor((y1 - workspace.bounds.top) * h_factor);
    let x_2 = Math.floor((x2 - workspace.bounds.left) * w_factor);
    let y_2 = Math.floor((y2 - workspace.bounds.top) * h_factor);
    let n1 = this.to_index(sqrt, x_1, y_1);
    let n2 = this.to_index(sqrt, x_2, y_2);
    if (
      n1 >= 0 &&
      n1 < global.settings.MAXNODES &&
      n2 >= 0 &&
      n2 < global.settings.MAXNODES
    ) {
      this.n1 = n1;
      this.n2 = n2;
    }
  }
  /* Generates a unique id from a "row" and "col" */
  to_index(sqrt: number, ...i) {
    return i[1] * sqrt + i[0];
  }
  /* Helper function to keep the elements within the grid and on the intersections of it. */
  snap_to_grid(x1: number, y1: number) {
    x1 = global.limit(
      x1,
      workspace.bounds.left + global.node_space_x * 1.5,
      workspace.bounds.right - global.node_space_x * 1.25
    );
    y1 = global.limit(
      y1,
      workspace.bounds.top + global.node_space_y * 1.5,
      workspace.bounds.bottom - global.node_space_y * 1.25
    );
    let sqrt = this.round(global.settings.SQRT_MAXNODES);
    let x_1 = Math.floor(
      (((x1 - workspace.bounds.left) * this.FUDGE_FACTOR) /
        workspace.bounds.get_width()) *
        sqrt
    );
    let y_1 = Math.floor(
      (((y1 - workspace.bounds.top) * this.FUDGE_FACTOR) /
        workspace.bounds.get_height()) *
        sqrt
    );
    let n1 = this.to_index(sqrt, x_1, y_1);
    if (n1 >= 0 && n1 < global.settings.MAXNODES) {
      return Array(nodes[n1].location.x, nodes[n1].location.y);
    }
    return Array(x1, y1);
  }
  round(value: number) {
    return Math.round((value + Number.EPSILON) * 1000) / 1000;
  }
}
