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
    constructor(width, height, id) {
        this.ASSIGN_ID = false;
        this.id = -1;
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
    resize() {
        this.surface.width = view_port.right;
        this.surface.height = view_port.bottom;
        try {
            this.surface.style.position = 'absolute';
            this.surface.style.visibility = 'hidden';
            this.surface.style.display = 'none';
            this.surface.style.zIndex = '0';
            this.context.globalCompositeOperation = 'source-over';
            this.surface.style.backfaceVisibility = 'hidden';
            this.context.imageSmoothingEnabled = false;
            this.context.mozImageSmoothingEnabled = false;
            this.context.oImageSmoothingEnabled = false;
            this.context.webkitImageSmoothingEnabled = false;
            this.context.msImageSmoothingEnabled = false;
        }
        catch (e) { }
    }
    get_surface() {
        return this.surface;
    }
}
