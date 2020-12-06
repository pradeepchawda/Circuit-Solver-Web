/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Digit.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A helper class for the StringOperator class. It essentially stores digits
 *                   in a stream of a number representation.
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
class Digit {
	public num: number;

	constructor(setter: number) {
		this.num = setter;
	}
	get_digit() {
		return this.num;
	}
}