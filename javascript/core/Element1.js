'use strict';
class Element1 {
    constructor(id, type, properties) {
        this.n1 = -1;
        this.type = type;
        this.id = id;
        this.port_size = 1;
        this.rotation = 0;
        this.flip = 0;
        this.properties = properties;
        this.FUDGE_FACTOR = 0.98;
    }
    set_properties(properties) {
        this.properties = properties;
    }
    get_properties() {
        return this.properties;
    }
    set_rotation(rotation) {
        this.rotation = rotation;
    }
    get_rotation() {
        return this.rotation;
    }
    set_flip(flip) {
        this.flip = flip;
    }
    get_flip() {
        return this.flip;
    }
    get_port_size() {
        return this.port_size;
    }
    set_node_1(n1) {
        this.n1 = n1;
    }
    get_node_1() {
        return this.n1;
    }
    set_nodes(n1) {
        this.n1 = n1;
    }
    get_nodes() {
        return [this.n1];
    }
    consistent() {
        return this.n1 > -1;
    }
    map_node1(x1, y1) {
        let sqrt = this.round(global.settings.SQRT_MAXNODES);
        let w_factor = (this.FUDGE_FACTOR / workspace.bounds.get_width()) * sqrt;
        let h_factor = (this.FUDGE_FACTOR / workspace.bounds.get_height()) * sqrt;
        let x_1 = Math.floor((x1 - workspace.bounds.left) * w_factor);
        let y_1 = Math.floor((y1 - workspace.bounds.top) * h_factor);
        let n1 = this.to_index(sqrt, x_1, y_1);
        if (n1 >= 0 && n1 < global.settings.MAXNODES) {
            this.n1 = n1;
        }
    }
    to_index(sqrt, x, y) {
        return y * sqrt + x;
    }
    snap_to_grid(x1, y1) {
        x1 = global.limit(x1, workspace.bounds.left + global.node_space_x * 1.5, workspace.bounds.right - global.node_space_x * 1.25);
        y1 = global.limit(y1, workspace.bounds.top + global.node_space_y * 1.5, workspace.bounds.bottom - global.node_space_y * 1.25);
        let sqrt = this.round(global.settings.SQRT_MAXNODES);
        let x_1 = Math.floor((((x1 - workspace.bounds.left) * this.FUDGE_FACTOR) / workspace.bounds.get_width()) * sqrt);
        let y_1 = Math.floor((((y1 - workspace.bounds.top) * this.FUDGE_FACTOR) / workspace.bounds.get_height()) * sqrt);
        let n1 = this.to_index(sqrt, x_1, y_1);
        if (n1 >= 0 && n1 < global.settings.MAXNODES) {
            return Array(nodes[n1].location.x, nodes[n1].location.y);
        }
        return Array(x1, y1);
    }
    round(value) {
        return Math.round((value + Number.EPSILON) * 1000) / 1000;
    }
}
