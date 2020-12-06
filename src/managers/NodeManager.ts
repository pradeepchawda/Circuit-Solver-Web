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
class NodeManager {
	/* The list of active nodes, it makes it easier when building the circuit.
public is just a list of their id's  */
	public active_nodes: Array<number>;
	/* All the active nodes (filtered w/ ground and wire connections.) */
	/* This is done to gurantee we are solving the smallest possible circuit. */
	public unique_nodes: Array<NodeNetwork>;

	constructor() {
		/* The list of active nodes, it makes it easier when building the circuit.
    This is just a list of their id's  */
		this.active_nodes = [];
		/* All the active nodes (filtered w/ ground and wire connections.) */
		/* This is done to gurantee we are solving the smallest possible circuit. */
		this.unique_nodes = [];
	}
	clear_active_nodes(): void {
		this.active_nodes.splice(0, this.active_nodes.length);
	}
	/* Add a node id to the list! (If it already doesn't exist!)*/
	add_node(id: number): void {
		if (id > -1 && id < global.settings.MAXNODES) {
			if (this.find_node(id) === false) {
				this.active_nodes.push(id);
			}
		}
	}
	/* Remove a node id from the list! (If it actually exists!) */
	remove_node(id: number): void {
		if (id > -1 && id < global.settings.MAXNODES) {
			let index: number = this.find_node_index(id);
			if (index > -1 && index < this.active_nodes.length) {
				this.active_nodes.splice(index, 1);
			}
		}
	}
	/* Check if we can actually find the node id inside the list already */
	find_node(id: number): boolean {
		for (var i: number = 0; i < this.active_nodes.length; i++) {
			if (this.active_nodes[i] === id) {
				return true;
			}
		}
		return false;
	}
	/* Let's grab the indicies of the node id (if we can find it!) */
	find_node_index(id: number): number {
		for (var i: number = 0; i < this.active_nodes.length; i++) {
			if (this.active_nodes[i] === id) {
				return i;
			}
		}
		return -1;
	}
	/* Assign the simulation ids of the active nodes! */
	assign_node_simulation_ids(): void {
		for (var i: number = 0; i < this.active_nodes.length; i++) {
			nodes[this.active_nodes[i]].simulation_id = i;
		}
	}
	generate_unique_nodes_list(): void {
		this.unique_nodes.splice(0, this.unique_nodes.length);
		/* All the references for ground node id's */
		for (var i: number = 0; i < grounds.length; i++) {
			this.unique_nodes.push(new NodeNetwork(grounds[i].elm.n1, grounds[i].elm.n1));
		}
		for (var i: number = 0; i < this.unique_nodes.length; i++) {
			for (var j: number = 0; j < this.unique_nodes.length; j++) {
				if (i != j) {
					this.unique_nodes[i].add_references(this.unique_nodes[j].get_references());
					this.unique_nodes[j].add_references(this.unique_nodes[i].get_references());
				}
			}
		}
		let net_list: Array<Array<number>> = [];
		for (var i: number = 0; i < nets.length; i++) {
			for (var j: number = 0; j < nets.length; j++) {
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
		for (var i: number = 0; i < wires.length; i++) {
			this.unique_nodes.push(new NodeNetwork(wires[i].elm.n1, wires[i].elm.n2));
		}
		for (var i: number = 0; i < this.unique_nodes.length; i++) {
			for (var j: number = 0; j < this.unique_nodes.length; j++) {
				if (j != i) {
					if (this.unique_nodes[i].is_connected(this.unique_nodes[j].get_references())) {
						this.unique_nodes[i].add_references(this.unique_nodes[j].get_references());
						this.unique_nodes[j].add_references(this.unique_nodes[i].get_references());
					}
				}
			}
		}
		for (var i: number = 0; i < this.unique_nodes.length; i++) {
			for (var j: number = this.active_nodes.length - 1; j > -1; j--) {
				if (this.unique_nodes[i].is_removed(this.active_nodes[j]) && this.active_nodes[j] < global.settings.MAXNODES) {
					this.active_nodes.splice(j, 1);
				}
			}
		}
	}
	net_redundancy_check(n1: number, n2: number, net_list: Array<Array<number>>) {
		let output: boolean = false;
		for (var i: number = 0; i < net_list.length; i++) {
			if ((n1 === net_list[i][0] && n2 === net_list[i][1]) || (n2 === net_list[i][0] && n1 === net_list[i][1])) {
				output = true;
				break;
			}
		}
		return output;
	}
}