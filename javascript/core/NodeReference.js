"use strict";
/**********************************************************************
 * Project           : Circuit Solver
 * File		        : NodeReference.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This class describes the formatting for how a node reference will be
 *                   constructed.
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
class NodeReference {
    constructor(id, type) {
        /* id of the node */
        this.id = id;
        /* The type of component attached to this node */
        this.type = type;
    }
}
