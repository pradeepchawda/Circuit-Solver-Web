/**********************************************************************
 * Project           : Circuit Solver
 * File		        : PointF.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A point class to keep track of where an object is within the html canvas.
 *                   Note: "F" stands for float.
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
class PointF {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /* Get the x location */
    get_x() {
        return this.x;
    }
    /* Set the x location */
    set_x(x) {
        this.x = x;
    }
    /* Get the y location */
    get_y() {
        return this.y;
    }
    /* Set the y location */
    set_y(y) {
        this.y = y;
    }
    /* Set both the x and y location */
    set_point(x, y) {
        this.x = x;
        this.y = y;
    }
}
