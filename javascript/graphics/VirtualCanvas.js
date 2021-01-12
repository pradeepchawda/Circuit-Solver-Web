'use strict';
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
        this.context = this.surface.getContext('2d', { alpha: false });
    }
    resize() {
        this.surface.width = window.innerWidth * global.DEVICE_PIXEL_RATIO;
        this.surface.height = window.innerHeight * global.DEVICE_PIXEL_RATIO;
        this.surface.style.width = global.PIXEL_TEMPLATE.replace('{VALUE}', window.innerWidth);
        this.surface.style.height = global.PIXEL_TEMPLATE.replace('{VALUE}', window.innerHeight);
        try {
            this.surface.style.position = 'absolute';
            this.surface.style.visibility = 'hidden';
            this.surface.style.display = 'none';
            this.surface.style.zIndex = '0';
            this.context.imageSmoothingEnabled = false;
            //@ts-expect-error
            this.context.mozImageSmoothingEnabled = false;
            //@ts-expect-error
            this.context.oImageSmoothingEnabled = false;
            //@ts-expect-error
            this.context.webkitImageSmoothingEnabled = false;
            //@ts-expect-error
            this.context.msImageSmoothingEnabled = false;
            this.context.globalCompositeOperation = 'source-over';
            this.surface.style.backfaceVisibility = 'hidden';
        }
        catch (e) { }
    }
    get_surface() {
        return this.surface;
    }
}
