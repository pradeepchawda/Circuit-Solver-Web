/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Element4.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This is the bare-minimum that is required to describe a quadruple node element.
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
class Element4 {
  /* Node 1 id */
  public n1 = -1;
  /* Node 2 id */
  public n2 = -1;
  /* Node 3 id */
  public n3 = -1;
  /* Node 4 id */
  public n4 = -1;
  /* The type of component */
  public type = -1;
  /* The unique identifier of the component */
  public id = -1;
  /* The number of inputs or outputs of the device */
  public port_size = 4;
  /* The rotation of the component  */
  public rotation = 0;
  /* The flip of the component */
  public flip = 0;
  /* The instrinsic properties of the component */
  public properties = null;
  /* A factor used to make sure the node mapping algorithm doesn't succomb to javascripts
inprecise nature. */
  public FUDGE_FACTOR = 0.98;

  constructor(id, type, properties) {
    /* Node 1 id */
    this.n1 = -1;
    /* Node 2 id */
    this.n2 = -1;
    /* Node 3 id */
    this.n3 = -1;
    /* Node 4 id */
    this.n4 = -1;
    /* The type of component */
    this.type = type;
    /* The unique identifier of the component */
    this.id = id;
    /* The number of inputs or outputs of the device */
    this.port_size = 4;
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
  /* Sets the flip of the component */
  set_flip(flip) {
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
  set_node_1(n1) {
    this.n1 = n1;
  }
  /* Set the id of attached node 2 */
  set_node_2(n2) {
    this.n2 = n2;
  }
  /* Set the id of attached node 3 */
  set_node_3(n3) {
    this.n3 = n3;
  }
  /* Set the id of attached node 4 */
  set_node_4(n4) {
    this.n4 = n4;
  }
  /* Get the id of attached node 1 */
  get_node_1() {
    return this.n1;
  }
  /* Get the id of attached node 2 */
  get_node_2() {
    return this.n2;
  }
  /* Get the id of attached node 3 */
  get_node_3() {
    return this.n3;
  }
  /* Get the id of attached node 4 */
  get_node_4() {
    return this.n4;
  }
  /* Set multiple nodes */
  set_nodes(n1, n2, n3, n4) {
    this.n1 = n1;
    this.n2 = n2;
    this.n3 = n3;
    this.n4 = n4;
  }
  /* Get multiple nodes */
  get_nodes() {
    return Array(this.n1, this.n2, this.n3, this.n4);
  }
  /* A quick check to see if the element is consistent, elements will have
  -1 as their reference when they are not anchored. */
  consistent() {
    return this.n1 > -1 && this.n2 > -1 && this.n3 > -1 && this.n4 > -1;
  }
  /* General algorithm to map the spacial location to nodes */
  map_node4(x1, y1, x2, y2, x3, y3, x4, y4) {
    let sqrt = this.round(global.settings.SQRT_MAXNODES);
    let w_factor = (this.FUDGE_FACTOR / workspace.bounds.get_width()) * sqrt;
    let h_factor = (this.FUDGE_FACTOR / workspace.bounds.get_height()) * sqrt;
    let x_1 = Math.floor((x1 - workspace.bounds.left) * w_factor);
    let y_1 = Math.floor((y1 - workspace.bounds.top) * h_factor);
    let x_2 = Math.floor((x2 - workspace.bounds.left) * w_factor);
    let y_2 = Math.floor((y2 - workspace.bounds.top) * h_factor);
    let x_3 = Math.floor((x3 - workspace.bounds.left) * w_factor);
    let y_3 = Math.floor((y3 - workspace.bounds.top) * h_factor);
    let x_4 = Math.floor((x4 - workspace.bounds.left) * w_factor);
    let y_4 = Math.floor((y4 - workspace.bounds.top) * h_factor);
    let n1 = this.to_index(sqrt, x_1, y_1);
    let n2 = this.to_index(sqrt, x_2, y_2);
    let n3 = this.to_index(sqrt, x_3, y_3);
    let n4 = this.to_index(sqrt, x_4, y_4);
    if (
      n1 >= 0 &&
      n1 < global.settings.MAXNODES &&
      n2 >= 0 &&
      n2 < global.settings.MAXNODES &&
      n3 >= 0 &&
      n3 < global.settings.MAXNODES &&
      n4 >= 0 &&
      n4 < global.settings.MAXNODES
    ) {
      this.n1 = n1;
      this.n2 = n2;
      this.n3 = n3;
      this.n4 = n4;
    }
  }
  to_index(sqrt, ...i) {
    return i[1] * sqrt + i[0];
  }
  snap_to_grid(x1, y1) {
    x1 = this.limit(
      x1,
      workspace.bounds.left + global.node_space_x * 1.5,
      workspace.bounds.right - global.node_space_x * 1.25
    );
    y1 = this.limit(
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
  limit(inp, low, high) {
    if (inp < low) {
      return low;
    } else if (inp > high) {
      return high;
    } else {
      return inp;
    }
  }
  round(value) {
    return Math.round((value + Number.EPSILON) * 1000) / 1000;
  }
}
