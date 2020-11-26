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
var Element1 = /** @class */ (function () {
    function Element1(id, type, properties) {
        /* Node 1 id */
        this.n1 = -1;
        /* The type of component */
        this.type = -1;
        /* The unique identifier of the component */
        this.id = -1;
        /* The number of inputs or outputs of the device */
        this.port_size = 1;
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
    Element1.prototype.set_properties = function (properties) {
        this.properties = properties;
    };
    /* Get the properties of the component */
    Element1.prototype.get_properties = function () {
        return this.properties;
    };
    /* Set the rotation of the component */
    Element1.prototype.set_rotation = function (rotation) {
        this.rotation = rotation;
    };
    /* Get the rotation of the component */
    Element1.prototype.get_rotation = function () {
        return this.rotation;
    };
    /* Sets the flip of the component */
    Element1.prototype.set_flip = function (flip) {
        this.flip = flip;
    };
    /* Get the flip of hte component */
    Element1.prototype.get_flip = function () {
        return this.flip;
    };
    /* Get the component port size */
    Element1.prototype.get_port_size = function () {
        return this.port_size;
    };
    /* Set the id of attached node 1 */
    Element1.prototype.set_node_1 = function (n1) {
        this.n1 = n1;
    };
    /* Get the id of attached node 1 */
    Element1.prototype.get_node_1 = function () {
        return this.n1;
    };
    /* Set multiple nodes */
    Element1.prototype.set_nodes = function (n1) {
        this.n1 = n1;
    };
    /* Get multiple nodes */
    Element1.prototype.get_nodes = function () {
        return Array(this.n1);
    };
    /* A quick check to see if the element is consistent, elements will have
    -1 as their reference when they are not anchored. */
    Element1.prototype.consistent = function () {
        return this.n1 > -1;
    };
    /* General algorithm to map the spacial location to nodes */
    Element1.prototype.map_node1 = function (x1, y1) {
        var sqrt = this.round(global.settings.SQRT_MAXNODES);
        var w_factor = (this.FUDGE_FACTOR / workspace.bounds.get_width()) * sqrt;
        var h_factor = (this.FUDGE_FACTOR / workspace.bounds.get_height()) * sqrt;
        var x_1 = Math.floor((x1 - workspace.bounds.left) * w_factor);
        var y_1 = Math.floor((y1 - workspace.bounds.top) * h_factor);
        var n1 = this.to_index(sqrt, x_1, y_1);
        if (n1 >= 0 && n1 < global.settings.MAXNODES) {
            this.n1 = n1;
        }
    };
    /* Generates a unique id from a "row" and "col" */
    Element1.prototype.to_index = function (sqrt) {
        var i = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            i[_i - 1] = arguments[_i];
        }
        return i[1] * sqrt + i[0];
    };
    /* Helper function to keep the elements within the grid and on the intersections of it. */
    Element1.prototype.snap_to_grid = function (x1, y1) {
        /* Limit the x and y values to fit within the bounds of the grid. */
        x1 = global.limit(x1, workspace.bounds.left + global.node_space_x * 1.5, workspace.bounds.right - global.node_space_x * 1.25);
        y1 = global.limit(y1, workspace.bounds.top + global.node_space_y * 1.5, workspace.bounds.bottom - global.node_space_y * 1.25);
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
    Element1.prototype.round = function (value) {
        return Math.round((value + Number.EPSILON) * 1000) / 1000;
    };
    return Element1;
}());
