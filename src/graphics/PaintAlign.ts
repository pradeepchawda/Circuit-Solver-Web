/**********************************************************************
 * Project           : Circuit Solver
 * File		        : PaintAlign.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : The Paint Align class is to standadize the access to the different
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
class PaintAlign {
	public readonly LEFT: CanvasTextAlign;
	public readonly CENTER: CanvasTextAlign;
	public readonly RIGHT: CanvasTextAlign;
	
	constructor() {
		this.LEFT = 'left';
		this.CENTER = 'center';
		this.RIGHT = 'right';
	}
}