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
var Element4 = /** @class */ (function () {
    function Element4(id, type, properties) {
        /* Node 1 id */
        this.n1 = -1;
        /* Node 2 id */
        this.n2 = -1;
        /* Node 3 id */
        this.n3 = -1;
        /* Node 4 id */
        this.n4 = -1;
        /* The type of component */
        this.type = -1;
        /* The unique identifier of the component */
        this.id = -1;
        /* The number of inputs or outputs of the device */
        this.port_size = 4;
        /* The rotation of the component  */
        this.rotation = 0;
        /* The flip of the component */
        this.flip = 0;
        /* The instrinsic properties of the component */
        this.properties = null;
        /* A factor used to make sure the node mapping algorithm doesn't succomb to javascripts
      inprecise nature. */
        this.FUDGE_FACTOR = 0.98;
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
    Element4.prototype.set_properties = function (properties) {
        this.properties = properties;
    };
    /* Get the properties of the component */
    Element4.prototype.get_properties = function () {
        return this.properties;
    };
    /* Set the rotation of the component */
    Element4.prototype.set_rotation = function (rotation) {
        this.rotation = rotation;
    };
    /* Get the rotation of the component */
    Element4.prototype.get_rotation = function () {
        return this.rotation;
    };
    /* Sets the flip of the component */
    Element4.prototype.set_flip = function (flip) {
        this.flip = flip;
    };
    /* Get the flip of hte component */
    Element4.prototype.get_flip = function () {
        return this.flip;
    };
    /* Get the component port size */
    Element4.prototype.get_port_size = function () {
        return this.port_size;
    };
    /* Set the id of attached node 1 */
    Element4.prototype.set_node_1 = function (n1) {
        this.n1 = n1;
    };
    /* Set the id of attached node 2 */
    Element4.prototype.set_node_2 = function (n2) {
        this.n2 = n2;
    };
    /* Set the id of attached node 3 */
    Element4.prototype.set_node_3 = function (n3) {
        this.n3 = n3;
    };
    /* Set the id of attached node 4 */
    Element4.prototype.set_node_4 = function (n4) {
        this.n4 = n4;
    };
    /* Get the id of attached node 1 */
    Element4.prototype.get_node_1 = function () {
        return this.n1;
    };
    /* Get the id of attached node 2 */
    Element4.prototype.get_node_2 = function () {
        return this.n2;
    };
    /* Get the id of attached node 3 */
    Element4.prototype.get_node_3 = function () {
        return this.n3;
    };
    /* Get the id of attached node 4 */
    Element4.prototype.get_node_4 = function () {
        return this.n4;
    };
    /* Set multiple nodes */
    Element4.prototype.set_nodes = function (n1, n2, n3, n4) {
        this.n1 = n1;
        this.n2 = n2;
        this.n3 = n3;
        this.n4 = n4;
    };
    /* Get multiple nodes */
    Element4.prototype.get_nodes = function () {
        return Array(this.n1, this.n2, this.n3, this.n4);
    };
    /* A quick check to see if the element is consistent, elements will have
    -1 as their reference when they are not anchored. */
    Element4.prototype.consistent = function () {
        return this.n1 > -1 && this.n2 > -1 && this.n3 > -1 && this.n4 > -1;
    };
    /* General algorithm to map the spacial location to nodes */
    Element4.prototype.map_node4 = function (x1, y1, x2, y2, x3, y3, x4, y4) {
        var sqrt = this.round(global.settings.SQRT_MAXNODES);
        var w_factor = (this.FUDGE_FACTOR / workspace.bounds.get_width()) * sqrt;
        var h_factor = (this.FUDGE_FACTOR / workspace.bounds.get_height()) * sqrt;
        var x_1 = Math.floor((x1 - workspace.bounds.left) * w_factor);
        var y_1 = Math.floor((y1 - workspace.bounds.top) * h_factor);
        var x_2 = Math.floor((x2 - workspace.bounds.left) * w_factor);
        var y_2 = Math.floor((y2 - workspace.bounds.top) * h_factor);
        var x_3 = Math.floor((x3 - workspace.bounds.left) * w_factor);
        var y_3 = Math.floor((y3 - workspace.bounds.top) * h_factor);
        var x_4 = Math.floor((x4 - workspace.bounds.left) * w_factor);
        var y_4 = Math.floor((y4 - workspace.bounds.top) * h_factor);
        var n1 = this.to_index(sqrt, x_1, y_1);
        var n2 = this.to_index(sqrt, x_2, y_2);
        var n3 = this.to_index(sqrt, x_3, y_3);
        var n4 = this.to_index(sqrt, x_4, y_4);
        if (n1 >= 0 &&
            n1 < global.settings.MAXNODES &&
            n2 >= 0 &&
            n2 < global.settings.MAXNODES &&
            n3 >= 0 &&
            n3 < global.settings.MAXNODES &&
            n4 >= 0 &&
            n4 < global.settings.MAXNODES) {
            this.n1 = n1;
            this.n2 = n2;
            this.n3 = n3;
            this.n4 = n4;
        }
    };
    Element4.prototype.to_index = function (sqrt) {
        var i = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            i[_i - 1] = arguments[_i];
        }
        return i[1] * sqrt + i[0];
    };
    Element4.prototype.snap_to_grid = function (x1, y1) {
        x1 = this.limit(x1, workspace.bounds.left + global.node_space_x * 1.5, workspace.bounds.right - global.node_space_x * 1.25);
        y1 = this.limit(y1, workspace.bounds.top + global.node_space_y * 1.5, workspace.bounds.bottom - global.node_space_y * 1.25);
        var sqrt = this.round(global.settings.SQRT_MAXNODES);
        var x_1 = Math.floor((((x1 - workspace.bounds.left) * this.FUDGE_FACTOR) /
            workspace.bounds.get_width()) *
            sqrt);
        var y_1 = Math.floor((((y1 - workspace.bounds.top) * this.FUDGE_FACTOR) /
            workspace.bounds.get_height()) *
            sqrt);
        var n1 = this.to_index(sqrt, x_1, y_1);
        if (n1 >= 0 && n1 < global.settings.MAXNODES) {
            return Array(nodes[n1].location.x, nodes[n1].location.y);
        }
        return Array(x1, y1);
    };
    Element4.prototype.limit = function (inp, low, high) {
        if (inp < low) {
            return low;
        }
        else if (inp > high) {
            return high;
        }
        else {
            return inp;
        }
    };
    Element4.prototype.round = function (value) {
        return Math.round((value + Number.EPSILON) * 1000) / 1000;
    };
    return Element4;
}());
