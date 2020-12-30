"use strict";
/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Metadata.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : Structure of metadata inside saved circuit files.
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
class Metadata {
    constructor() {
        this.elm = new Element1(-1, global.TYPE_META_DATA, global.copy(global.PROPERTY_META_DATA));
        /* A snapshot of the scope settings */
        this.user_scope_settings = global.NULL;
        /* A snapshot of the user settings */
        this.user_settings = global.NULL;
        /* Time step */
        this.user_timestep = global.NULL;
        /* The file name */
        this.file_name = '';
        /* Calibration String */
        this.calibration_string = '';
    }
}
