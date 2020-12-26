/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Path.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to handle the path element for the html canvas. It's a convenient way
 *                   of storing an arbitrary collection of lines
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
class Path {
	public path_2d: Array<PATH_T>;
	private indexer: number;
	constructor() {
		this.path_2d = [];
		this.indexer = 0;
	}
	resize() {
		let temp: PATH_T;
		for (var i: number = 0; i < this.path_2d.length; i++) {
			temp = this.path_2d[i];
			if (temp['command'] === 'MOVE') {
				temp['x1'] = global.remap_position(temp['x1'], true);
				temp['y1'] = global.remap_position(temp['y1'], false);
			} else if (temp['command'] === 'LINE') {
				temp['x1'] = global.remap_position(temp['x1'], true);
				temp['y1'] = global.remap_position(temp['y1'], false);
			} else if (temp['command'] === 'QUAD') {
				temp['x1'] = global.remap_position(temp['x1'], true);
				temp['y1'] = global.remap_position(temp['y1'], false);
				temp['x2'] = global.remap_position(temp['x2'], true);
				temp['y2'] = global.remap_position(temp['y2'], false);
			} else if (temp['command'] === 'CURVE') {
				temp['x1'] = global.remap_position(temp['x1'], true);
				temp['y1'] = global.remap_position(temp['y1'], false);
				temp['x2'] = global.remap_position(temp['x2'], true);
				temp['y2'] = global.remap_position(temp['y2'], false);
				temp['x3'] = global.remap_position(temp['x3'], true);
				temp['y3'] = global.remap_position(temp['y3'], false);
			}
		}
	}
	/* Moves the location of the path element */
	move_to(x: number, y: number): void {
		this.path_2d[this.indexer++] = {
			command: 'MOVE',
			x1: (global.ZERO_PT_FIVE + x) >> global.ZERO,
			y1: (global.ZERO_PT_FIVE + y) >> global.ZERO
		};
	}
	/* creates a curve from the current location of the path element to the
  destination point */
	curve_to(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
		this.path_2d[this.indexer++] = {
			command: 'CURVE',
			x1: (global.ZERO_PT_FIVE + x1) >> global.ZERO,
			y1: (global.ZERO_PT_FIVE + y1) >> global.ZERO,
			x2: (global.ZERO_PT_FIVE + x2) >> global.ZERO,
			y2: (global.ZERO_PT_FIVE + y2) >> global.ZERO,
			x3: (global.ZERO_PT_FIVE + x3) >> global.ZERO,
			y3: (global.ZERO_PT_FIVE + y3) >> global.ZERO
		};
	}
	/* creates a quadratic bezier spline from the current location of the path element to the
  destination point */
	quad_to(x1: number, y1: number, x2: number, y2: number): void {
		this.path_2d[this.indexer++] = {
			command: 'QUAD',
			x1: (global.ZERO_PT_FIVE + (x2 + x1) * 0.5) >> global.ZERO,
			y1: (global.ZERO_PT_FIVE + (y2 + y1) * 0.5) >> global.ZERO,
			x2: (global.ZERO_PT_FIVE + x2) >> global.ZERO,
			y2: (global.ZERO_PT_FIVE + y2) >> global.ZERO
		};
	}
	/* Creates a line from the current location to the detailed point */
	line_to(x: number, y: number): void {
		this.path_2d[this.indexer++] = {
			command: 'LINE',
			x1: (global.ZERO_PT_FIVE + x) >> global.ZERO,
			y1: (global.ZERO_PT_FIVE + y) >> global.ZERO
		};
	}
	/* Closes the path */
	close(): void {
		this.path_2d[this.indexer++] = {
			command: 'CLOSE',
			x1: 0,
			y1: 0
		};
	}
	/* Reset the path element */
	reset(): void {
		this.indexer = 0;
		this.path_2d = [];
	}
	/* Get the path element */
	get_path(): Array<PATH_T> {
		return this.path_2d;
	}
}
