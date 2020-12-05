/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Arc.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to handle drawing arcs and editing their properties on the fly.
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
class Arc {
	/* The amplitude of the arc. */
	public amplitude: number;
	private arc_paint: Paint;
	/* This sets the x and y locations of the arc (start and stop point) */
	private x1: number;
	private x2: number;
	private y1: number;
	private y2: number;
	public IS_TRANSFORM_SCALED: boolean;

	constructor(x1: number, y1: number, x2: number, y2: number, amplitude: number) {
		/* A paint object to paint the arc with. */
		this.arc_paint = new Paint();
		this.arc_paint.set_paint_style(this.arc_paint.style.STROKE);
		this.arc_paint.set_paint_cap(this.arc_paint.cap.ROUND);
		this.arc_paint.set_paint_join(this.arc_paint.join.MITER);
		this.arc_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2_ZOOM);
		this.arc_paint.set_color(global.ELEMENT_COLOR);
		this.arc_paint.set_text_size(global.CANVAS_TEXT_SIZE_4_ZOOM);
		this.arc_paint.set_font(global.DEFAULT_FONT);
		this.arc_paint.set_alpha(255);
		this.arc_paint.set_paint_align(this.arc_paint.align.CENTER);
		/* This sets the x and y locations of the arc (start and stop point) */
		this.x1 = x1;
		this.x2 = x2;
		this.y1 = y1;
		this.y2 = y2;
		this.IS_TRANSFORM_SCALED = true;
	}
	/* A quick function to re-set the points of the arc. */
	set_points(x1: number, y1: number, x2: number, y2: number): void {
		this.x1 = x1;
		this.y1 = y1;
		this.x2 = x2;
		this.y2 = y2;
	}
	/* Resize the arc paint stroke width and the text size. */
	resize(): void {
		/* Resize the stroke widths and the text sizes. */
		this.arc_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
		this.arc_paint.set_text_size(global.CANVAS_TEXT_SIZE_4_ZOOM);
	}
	/* Resize the arc paint stroke width and the text size. */
	resize2(): void {
		/* Resize the stroke widths and the text sizes. */
		this.arc_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
		this.arc_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
	}
	/* Change the paint objects color. */
	set_color(color: string): void {
		this.arc_paint.set_color(color);
	}
	/* Draw the arc w/ the instance of graphics engine */
	draw_arc(canvas: GraphicsEngine): void {
		if (this.IS_TRANSFORM_SCALED) {
			this.resize();
		} else {
			this.resize2();
		}
		canvas.draw_arc2(this.x1, this.y1, this.x2, this.y2, -this.amplitude, this.arc_paint);
	}
}
