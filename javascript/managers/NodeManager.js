/**********************************************************************
 * Project           : Circuit Solver
 * File		        : NodeManager.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : The sole responsiblity of this class is to pre-sort the list
 *                   of active nodes so life is easier when simulation time comes.
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
var NodeManager = /** @class */ (function () {
    function NodeManager() {
        /* The list of active nodes, it makes it easier when building the circuit.
      public is just a list of their id's  */
        this.active_nodes = [];
        /* All the active nodes (filtered w/ ground and wire connections.) */
        /* This is done to gurantee we are solving the smallest possible circuit. */
        this.unique_nodes = [];
        /* The list of active nodes, it makes it easier when building the circuit.
        This is just a list of their id's  */
        this.active_nodes = [];
        /* All the active nodes (filtered w/ ground and wire connections.) */
        /* This is done to gurantee we are solving the smallest possible circuit. */
        this.unique_nodes = [];
    }
    NodeManager.prototype.clear_active_nodes = function () {
        this.active_nodes.splice(0, this.active_nodes.length);
    };
    /* Add a node id to the list! (If it already doesn't exist!)*/
    NodeManager.prototype.add_node = function (id) {
        if (id > -1 && id < global.settings.MAXNODES) {
            if (this.find_node(id) === false) {
                this.active_nodes.push(id);
            }
        }
    };
    /* Remove a node id from the list! (If it actually exists!) */
    NodeManager.prototype.remove_node = function (id) {
        if (id > -1 && id < global.settings.MAXNODES) {
            var index = this.find_node_index(id);
            if (index > -1 && index < this.active_nodes.length) {
                this.active_nodes.splice(index, 1);
            }
        }
    };
    /* Check if we can actually find the node id inside the list already */
    NodeManager.prototype.find_node = function (id) {
        for (var i = 0; i < this.active_nodes.length; i++) {
            if (this.active_nodes[i] === id) {
                return true;
            }
        }
        return false;
    };
    /* Let's grab the indicies of the node id (if we can find it!) */
    NodeManager.prototype.find_node_index = function (id) {
        for (var i = 0; i < this.active_nodes.length; i++) {
            if (this.active_nodes[i] === id) {
                return i;
            }
        }
        return -1;
    };
    /* Assign the simulation ids of the active nodes! */
    NodeManager.prototype.assign_node_simulation_ids = function () {
        for (var i = 0; i < this.active_nodes.length; i++) {
            nodes[this.active_nodes[i]].simulation_id = i;
        }
    };
    NodeManager.prototype.generate_unique_nodes_list = function () {
        this.unique_nodes.splice(0, this.unique_nodes.length);
        /* All the references for ground node id's */
        for (var i = 0; i < grounds.length; i++) {
            this.unique_nodes.push(new NodeNetwork(grounds[i].elm.n1, grounds[i].elm.n1));
        }
        for (var i = 0; i < this.unique_nodes.length; i++) {
            for (var j = 0; j < this.unique_nodes.length; j++) {
                if (i != j) {
                    this.unique_nodes[i].add_references(this.unique_nodes[j].get_references());
                    this.unique_nodes[j].add_references(this.unique_nodes[i].get_references());
                }
            }
        }
        var net_list = [];
        for (var i = 0; i < nets.length; i++) {
            for (var j = 0; j < nets.length; j++) {
                if (i != j) {
                    if (nets[i].elm.properties['Name'] === nets[j].elm.properties['Name']) {
                        if (!this.net_redundancy_check(nets[i].elm.n1, nets[j].elm.n1, net_list)) {
                            net_list.push(Array(nets[i].elm.n1, nets[j].elm.n1));
                            this.unique_nodes.push(new NodeNetwork(nets[i].elm.n1, nets[j].elm.n1));
                        }
                    }
                }
            }
        }
        /* Wire's also bridge two like potential objects, this is assuming that the resistance of the wires are negligible. If not,
         * the user must use a resistor w/ a resistance value that matches the resistance of the wire. */
        for (var i = 0; i < wires.length; i++) {
            this.unique_nodes.push(new NodeNetwork(wires[i].elm.n1, wires[i].elm.n2));
        }
        for (var i = 0; i < this.unique_nodes.length; i++) {
            for (var j = 0; j < this.unique_nodes.length; j++) {
                if (j != i) {
                    if (this.unique_nodes[i].is_connected(this.unique_nodes[j].get_references())) {
                        this.unique_nodes[i].add_references(this.unique_nodes[j].get_references());
                        this.unique_nodes[j].add_references(this.unique_nodes[i].get_references());
                    }
                }
            }
        }
        for (var i = 0; i < this.unique_nodes.length; i++) {
            for (var j = this.active_nodes.length - 1; j > -1; j--) {
                if (this.unique_nodes[i].is_removed(this.active_nodes[j]) &&
                    this.active_nodes[j] < global.settings.MAXNODES) {
                    this.active_nodes.splice(j, 1);
                }
            }
        }
    };
    NodeManager.prototype.net_redundancy_check = function (n1, n2, net_list) {
        var output = false;
        for (var i = 0; i < net_list.length; i++) {
            if ((n1 === net_list[i][0] && n2 === net_list[i][1]) ||
                (n2 === net_list[i][0] && n1 === net_list[i][1])) {
                output = true;
                break;
            }
        }
        return output;
    };
    return NodeManager;
}());
