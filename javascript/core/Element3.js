'use strict';
class Element3 {
    constructor(id, type, properties) {
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
    set_node_2(n2) {
        this.n2 = n2;
    }
    set_node_3(n3) {
        this.n3 = n3;
    }
    get_node_1() {
        return this.n1;
    }
    get_node_2() {
        return this.n2;
    }
    get_node_3() {
        return this.n3;
    }
    set_nodes(n1, n2, n3) {
        this.n1 = n1;
        this.n2 = n2;
        this.n3 = n3;
    }
    get_nodes() {
        return Array(this.n1, this.n2, this.n3);
    }
    consistent() {
        return this.n1 > -1 && this.n2 > -1 && this.n3 > -1;
    }
    map_node3(x1, y1, x2, y2, x3, y3) {
        let sqrt = this.round(global.settings.SQRT_MAXNODES);
        let w_factor = (this.FUDGE_FACTOR / workspace.bounds.get_width()) * sqrt;
        let h_factor = (this.FUDGE_FACTOR / workspace.bounds.get_height()) * sqrt;
        let x_1 = Math.floor((x1 - workspace.bounds.left) * w_factor);
        let y_1 = Math.floor((y1 - workspace.bounds.top) * h_factor);
        let x_2 = Math.floor((x2 - workspace.bounds.left) * w_factor);
        let y_2 = Math.floor((y2 - workspace.bounds.top) * h_factor);
        let x_3 = Math.floor((x3 - workspace.bounds.left) * w_factor);
        let y_3 = Math.floor((y3 - workspace.bounds.top) * h_factor);
        let n1 = this.to_index(sqrt, x_1, y_1);
        let n2 = this.to_index(sqrt, x_2, y_2);
        let n3 = this.to_index(sqrt, x_3, y_3);
        if (n1 >= 0 && n1 < global.settings.MAXNODES && n2 >= 0 && n2 < global.settings.MAXNODES && n3 >= 0 && n3 < global.settings.MAXNODES) {
            this.n1 = n1;
            this.n2 = n2;
            this.n3 = n3;
        }
    }
    to_index(sqrt, x, y) {
        return y * sqrt + x;
    }
    snap_to_grid(x1, y1) {
        x1 = this.limit(x1, workspace.bounds.left + global.node_space_x * 1.5, workspace.bounds.right - global.node_space_x * 1.25);
        y1 = this.limit(y1, workspace.bounds.top + global.node_space_y * 1.5, workspace.bounds.bottom - global.node_space_y * 1.25);
        let sqrt = this.round(global.settings.SQRT_MAXNODES);
        let x_1 = Math.floor((((x1 - workspace.bounds.left) * this.FUDGE_FACTOR) / workspace.bounds.get_width()) * sqrt);
        let y_1 = Math.floor((((y1 - workspace.bounds.top) * this.FUDGE_FACTOR) / workspace.bounds.get_height()) * sqrt);
        let n1 = this.to_index(sqrt, x_1, y_1);
        if (n1 >= 0 && n1 < global.settings.MAXNODES) {
            return Array(nodes[n1].location.x, nodes[n1].location.y);
        }
        return Array(x1, y1);
    }
    limit(inp, low, high) {
        if (inp < low) {
            return low;
        }
        else if (inp > high) {
            return high;
        }
        else {
            return inp;
        }
    }
    round(value) {
        return Math.round((value + Number.EPSILON) * 1000) / 1000;
    }
}
