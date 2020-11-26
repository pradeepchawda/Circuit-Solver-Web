/**********************************************************************
 * Project           : Circuit Solver
 * File		        : NodeNetwork.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This class handles the inter-connections of nodes. It maps out how each
 *                   node is related to another in order to group them and reduce the complexity
 *                   of the circuit.
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
var NodeNetwork = /** @class */ (function () {
    function NodeNetwork(node_a, node_b) {
        this.references = [];
        this.lowest = -1;
        this.general_boolean = false;
        this.references = [];
        this.lowest = -1;
        if (node_a != node_b) {
            this.references.push(node_a);
            this.references.push(node_b);
        }
        else {
            this.references.push(node_a);
        }
        this.general_boolean = false;
    }
    NodeNetwork.prototype.get_lowest_id = function (node) {
        this.lowest = this.find_lowest_id();
        if (this.is_found(node) && this.lowest != -1) {
            return this.lowest;
        }
        else {
            return node;
        }
    };
    NodeNetwork.prototype.is_found = function (node) {
        this.general_boolean = false;
        for (var i = 0; i < this.references.length; i++) {
            if (this.references[i] === node) {
                this.general_boolean = true;
                break;
            }
        }
        return this.general_boolean;
    };
    NodeNetwork.prototype.get_references = function () {
        return this.references;
    };
    NodeNetwork.prototype.add_references = function (refs) {
        for (var i = 0; i < refs.length; i++) {
            if (!this.is_found(refs[i])) {
                this.references.push(refs[i]);
            }
        }
    };
    NodeNetwork.prototype.is_connected = function (inp) {
        var is_found = false;
        for (var i = 0; i < inp.length; i++) {
            if (this.is_found(inp[i])) {
                is_found = true;
                break;
            }
        }
        return is_found;
    };
    NodeNetwork.prototype.is_removed = function (node) {
        return ((this.is_found(node) && node != this.find_lowest_id()) ||
            this.find_lowest_id() === -1 ||
            node === -1);
    };
    NodeNetwork.prototype.find_lowest_id = function () {
        var lowest = -1;
        if (this.references.length > 0) {
            lowest = this.references[0];
        }
        else {
            lowest = -1;
        }
        for (var i = 1; i < this.references.length; i++) {
            if (this.references[i] < lowest) {
                lowest = this.references[i];
            }
        }
        return lowest;
    };
    return NodeNetwork;
}());
