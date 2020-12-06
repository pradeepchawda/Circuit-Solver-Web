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
	public x: number;
	public y: number;
	
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	/* Get the x location */
	get_x(): number {
		return this.x;
	}
	/* Set the x location */
	set_x(x: number): void {
		this.x = x;
	}
	/* Get the y location */
	get_y(): number {
		return this.y;
	}
	/* Set the y location */
	set_y(y: number): void {
		this.y = y;
	}
	/* Set both the x and y location */
	set_point(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}
}