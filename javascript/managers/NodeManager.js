'use strict';
class NodeManager {
    constructor() {
        this.active_nodes = [];
        this.unique_nodes = [];
    }
    clear_active_nodes() {
        this.active_nodes.splice(0, this.active_nodes.length);
    }
    add_node(id) {
        if (id > -1 && id < global.settings.MAXNODES) {
            if (this.find_node(id) === false) {
                this.active_nodes.push(id);
            }
        }
    }
    remove_node(id) {
        if (id > -1 && id < global.settings.MAXNODES) {
            let index = this.find_node_index(id);
            if (index > -1 && index < this.active_nodes.length) {
                this.active_nodes.splice(index, 1);
            }
        }
    }
    find_node(id) {
        for (var i = 0; i < this.active_nodes.length; i++) {
            if (this.active_nodes[i] === id) {
                return true;
            }
        }
        return false;
    }
    find_node_index(id) {
        for (var i = 0; i < this.active_nodes.length; i++) {
            if (this.active_nodes[i] === id) {
                return i;
            }
        }
        return -1;
    }
    assign_node_simulation_ids() {
        for (var i = 0; i < this.active_nodes.length; i++) {
            nodes[this.active_nodes[i]].simulation_id = i;
        }
    }
    generate_unique_nodes_list() {
        this.unique_nodes.splice(0, this.unique_nodes.length);
        for (var i = 0; i < grounds.length; i++) {
            this.unique_nodes.push(new NodeNetwork(grounds[i].elm.n1, grounds[i].elm.n1));
        }
        for (var i = 0; i < this.unique_nodes.length; i++) {
            for (var j = 0; j < this.unique_nodes.length; j++) {
                if (i !== j) {
                    this.unique_nodes[i].add_references(this.unique_nodes[j].get_references());
                    this.unique_nodes[j].add_references(this.unique_nodes[i].get_references());
                }
            }
        }
        let net_list = [];
        for (var i = 0; i < nets.length; i++) {
            for (var j = 0; j < nets.length; j++) {
                if (i !== j) {
                    if (nets[i].elm.properties['Name'] === nets[j].elm.properties['Name']) {
                        if (!this.net_redundancy_check(nets[i].elm.n1, nets[j].elm.n1, net_list)) {
                            net_list.push(Array(nets[i].elm.n1, nets[j].elm.n1));
                            this.unique_nodes.push(new NodeNetwork(nets[i].elm.n1, nets[j].elm.n1));
                        }
                    }
                }
            }
        }
        for (var i = 0; i < wires.length; i++) {
            this.unique_nodes.push(new NodeNetwork(wires[i].elm.n1, wires[i].elm.n2));
        }
        for (var i = 0; i < this.unique_nodes.length; i++) {
            for (var j = 0; j < this.unique_nodes.length; j++) {
                if (j !== i) {
                    if (this.unique_nodes[i].is_connected(this.unique_nodes[j].get_references())) {
                        this.unique_nodes[i].add_references(this.unique_nodes[j].get_references());
                        this.unique_nodes[j].add_references(this.unique_nodes[i].get_references());
                    }
                }
            }
        }
        for (var i = 0; i < this.unique_nodes.length; i++) {
            for (var j = this.active_nodes.length - 1; j > -1; j--) {
                if (this.unique_nodes[i].is_removed(this.active_nodes[j]) && this.active_nodes[j] < global.settings.MAXNODES) {
                    this.active_nodes.splice(j, 1);
                }
            }
        }
    }
    net_redundancy_check(n1, n2, net_list) {
        let output = false;
        for (var i = 0; i < net_list.length; i++) {
            if ((n1 === net_list[i][0] && n2 === net_list[i][1]) || (n2 === net_list[i][0] && n1 === net_list[i][1])) {
                output = true;
                break;
            }
        }
        return output;
    }
}
