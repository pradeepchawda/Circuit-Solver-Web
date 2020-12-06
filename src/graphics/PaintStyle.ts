/**********************************************************************
 * Project           : Circuit Solver
 * File		        : PaintStyle.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : The Paint Style class is to standadize the access to the different
 *                   options available in the html canvas
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
class PaintStyle {
	public readonly STROKE: number;
	public readonly FILL: number;
	public readonly FILL_AND_STROKE: number;

	constructor() {
		this.STROKE = 0;
		this.FILL = 1;
		this.FILL_AND_STROKE = 2;
	}
}