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
var PointF = /** @class */ (function () {
    function PointF(x, y) {
        this.x = 0;
        this.y = 0;
        this.x = x;
        this.y = y;
    }
    /* Get the x location */
    PointF.prototype.get_x = function () {
        return this.x;
    };
    /* Set the x location */
    PointF.prototype.set_x = function (x) {
        this.x = x;
    };
    /* Get the y location */
    PointF.prototype.get_y = function () {
        return this.y;
    };
    /* Set the y location */
    PointF.prototype.set_y = function (y) {
        this.y = y;
    };
    /* Set both the x and y location */
    PointF.prototype.set_point = function (x, y) {
        this.x = x;
        this.y = y;
    };
    return PointF;
}());
