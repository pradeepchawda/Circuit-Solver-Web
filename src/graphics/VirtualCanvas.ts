"use strict";
/**********************************************************************
 * Project           : Circuit Solver
 * File		        : VirtualCanvas.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : The virtual canvas is to optimize the canvas drawing resources.
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
class VirtualCanvas {
	private readonly ASSIGN_ID: boolean;
	private surface: HTMLCanvasElement;
	private id: number;
	/* Get the drawing context */
	public context: CanvasRenderingContext2D;
	constructor(width: number, height: number, id: number) {
		this.ASSIGN_ID = false;
		/* Create a virtual canvas element */
		this.surface = document.createElement('canvas');
		/* Temporary width and height */
		this.surface.width = 1;
		this.surface.height = 1;
		if (this.ASSIGN_ID) {
			this.id = id;
			/* Assign the temporary surface an id */
			this.surface.id = 'virutal_canvas_' + this.id;
		}
		/* Get the drawing context */
		this.context = this.surface.getContext('2d', {
			alpha: false
		});
	}
	resize(): void {
		this.surface.width = window.innerWidth;
		this.surface.height = window.innerHeight;
		this.surface.style.width = global.PIXEL_TEMPLATE.replace('{VALUE}', <string>(<unknown>window.innerWidth));
		this.surface.style.height = global.PIXEL_TEMPLATE.replace('{VALUE}', <string>(<unknown>window.innerHeight));
		try {
			this.surface.style.position = 'absolute';
			this.surface.style.visibility = 'hidden';
			this.surface.style.display = 'none';
			this.surface.style.zIndex = '0';
			this.context.globalCompositeOperation = 'source-over';
			this.surface.style.backfaceVisibility = 'hidden';
		} catch (e) {}
	}
	get_surface(): HTMLCanvasElement {
		return this.surface;
	}
}