"use strict";
/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Circuit.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to keep track of the circuits that the user inputs into the system.
 *                   This class will also be responsible for loading them into the system.
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
class Circuit {
	public title: string;
	public content: string;
	constructor() {
		this.title = 'untitled';
		this.content = '';
	}
}