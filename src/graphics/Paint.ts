/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Paint.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A paint class to hold configurations for the html canvas. The paint for
 *                   the canvas.
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
class Paint {
	/* A paint style to standardize the different styles available in the html canvas */
	public style: PaintStyle;
	/* A paint align to standardize the different alignments available in the html canvas */
	public align: PaintAlign;
	/* A paint cap to standardize the different alignments available in the html canvas */
	public cap: PaintCap;
	/* A paint join to standardize the different alignments available in the html canvas */
	public join: PaintJoin;
	/* A paint text baseline to standardize the different alignments available in the html canvas */
	public baseline: PaintBaseline;
	/* A color object to hold the color of the paint using TinyColor */
	/* Don't use global, not sure what the order of the calls are but it errors out...
    thanks javascript. */
	public color: string;
	/* The stroke width of the paint element */
	public stroke_width: number;
	/* The paint style of the paint element */
	public paint_style: number;
	/* The paint cap of the paint element */
	public paint_cap: CanvasLineCap;
	public paint_join: CanvasLineJoin;
	/* The alignment of the text when drawing drawing text. */
	public text_align: CanvasTextAlign;
	/* The paint cap of the paint element */
	public text_baseline: CanvasTextBaseline;
	/* The text size of the paint element */
	public text_size: number;
	/* The font of the paint element */
	public font: string;
	/* The alpha (transparency) of the paint element */
	public alpha: number;
	/* A maintained array of computed text sizes.*/
	public metric_array: Array<PAINT_METRICS_ARRAY_T>;
	public saved_metric: PAINT_METRICS_T;
	public GARBAGE_COLLECTOR_SIZE: number;
	private temp_boolean: boolean;
	private general_index: number;
	private readonly FONT_TEMPLATE: string;
	private paint_surface: VirtualCanvas;
	private last_font: string;
	private last_text_size: number;
	private metric: TextMetrics;

	constructor() {
		/* A paint style to standardize the different styles available in the html canvas */
		this.style = new PaintStyle();
		/* A paint align to standardize the different alignments available in the html canvas */
		this.align = new PaintAlign();
		/* A paint cap to standardize the different alignments available in the html canvas */
		this.cap = new PaintCap();
		/* A paint join to standardize the different alignments available in the html canvas */
		this.join = new PaintJoin();
		/* A paint text baseline to standardize the different alignments available in the html canvas */
		this.baseline = new PaintBaseline();
		/* A color object to hold the color of the paint using TinyColor */
		/* Don't use global, not sure what the order of the calls are but it errors out...
    thanks javascript. */
		this.color = '#000000';
		/* The stroke width of the paint element */
		this.stroke_width = 1;
		/* The paint style of the paint element */
		this.paint_style = this.style.STROKE;
		/* The paint cap of the paint element */
		this.paint_cap = this.cap.ROUND;
		this.paint_join = this.join.MITER;
		/* The alignment of the text when drawing drawing text. */
		this.text_align = this.align.CENTER;
		/* The paint cap of the paint element */
		this.text_baseline = this.baseline.MIDDLE;
		/* The text size of the paint element */
		this.text_size = 1;
		/* The font of the paint element */
		this.font = 'Arial';
		/* The alpha (transparency) of the paint element */
		this.alpha = 1;
		/* A maintained array of computed text sizes.*/
		this.metric_array = [];
		this.saved_metric = null;
		this.GARBAGE_COLLECTOR_SIZE = 16;
		this.temp_boolean = false;
		this.general_index = 0;
		this.FONT_TEMPLATE = 'spx f';
		this.paint_surface = new VirtualCanvas(1, 1, -1);
		this.last_font = '';
		this.last_text_size = -1;
		this.metric = null;
		this.reset_array();
	}
	/* Set the alpha (transparency) of the paint element */
	set_alpha(alpha: number): void {
		this.alpha = alpha * 0.0039215686;
	}
	/* get the alpha (transparency) of the paint element */
	get_alpha(): number {
		return this.alpha;
	}
	/* Set the font of the paint element */
	set_font(font: string): void {
		this.last_font = '';
		this.font = font;
	}
	/* Get the font of the paint element */
	get_font(): string {
		return this.font;
	}
	/* Set the color of the paint element */
	set_color(color: string): void {
		this.color = color;
	}
	/* Get the color of the paint element */
	get_color(): string {
		return this.color;
	}
	/* Set the stroke width of the paint element */
	set_stroke_width(setter: number): void {
		this.stroke_width = setter;
	}
	/* Get the stroke width of the paint element */
	get_stroke_width(): number {
		return this.stroke_width;
	}
	/* Set the paint style of the paint element */
	set_paint_style(setter: number): void {
		this.paint_style = setter;
	}
	/* Get the paint style of the paint element */
	get_paint_style(): number {
		return this.paint_style;
	}
	/* Set the paint join of the paint element */
	set_paint_join(setter: CanvasLineJoin): void {
		this.paint_join = setter;
	}
	/* Get the paint join of the paint element */
	get_paint_join(): CanvasLineJoin {
		return this.paint_join;
	}
	/* Set the paint join of the paint element */
	set_paint_baseline(setter: CanvasTextBaseline): void {
		this.text_baseline = setter;
	}
	/* Get the paint join of the paint element */
	get_paint_baseline(): CanvasTextBaseline {
		return this.text_baseline;
	}
	/* Set the text size of the paint element */
	set_text_size(setter: number): void {
		this.last_text_size = -1;
		this.text_size = setter;
	}
	/* Get the text size of the paint element */
	get_text_size(): number {
		return this.text_size;
	}
	/* Set the paint cap of the paint element */
	set_paint_cap(setter: CanvasLineCap): void {
		this.paint_cap = setter;
	}
	/* Get the paint cap of the paint element */
	get_paint_cap(): CanvasLineCap {
		return this.paint_cap;
	}
	/* Set the paint alignment of the paint element */
	set_paint_align(setter: CanvasTextAlign): void {
		this.text_align = setter;
	}
	/* Get the paint alignment of the paint element */
	get_paint_align(): CanvasTextAlign {
		return this.text_align;
	}
	/* Get the font metrics */
	measure(txt: string): PAINT_METRICS_T {
		if (this.last_font != this.font || this.last_text_size != this.text_size) {
			this.paint_surface.context.font = this.FONT_TEMPLATE.replace('s', this.text_size + '').replace('f', this.font);
			this.last_font = this.font;
			this.last_text_size = this.text_size;
		}
		this.metric = this.paint_surface.context.measureText(txt);
		return {
			width: this.metric.width,
			ascent: this.metric.fontBoundingBoxAscent,
			descent: this.metric.fontBoundingBoxDescent
		};
	}
	/* Measure arbitrary text length using the current settings of the paint element */
	measure_text(txt: string): number {
		return this.retrieve_metrics(txt)['width'];
	}
	/* Measure arbitrary text ascent using the current settings of the paint element */
	measure_ascent(txt: string): number {
		return this.retrieve_metrics(txt)['ascent'];
	}
	/* Measure arbitrary text descent using the current settings of the paint element */
	measure_descent(txt: string): number {
		return this.retrieve_metrics(txt)['descent'];
	}

	/* Clear the contents of the metrics array. */
	reset_array(): void {
		this.metric_array = [];
	}
	/* Search the array to see if any metrics exist for the text w/ the input paint. The function also cleans up the storage array. */
	search_array(txt: string): boolean {
		this.temp_boolean = false;
		this.saved_metric = global.NULL;
		for (var i: number = 0; i < this.metric_array.length; i++) {
			if (!this.temp_boolean) {
				if (this.metric_array[i]['text'] === txt && this.metric_array[i]['font'] === this.font && this.metric_array[i]['text size'] === this.text_size) {
					this.saved_metric = this.metric_array[i]['metric'];
					this.temp_boolean = true;
					break;
				}
			}
		}
		return this.temp_boolean;
	}
	retrieve_metrics(txt: string): PAINT_METRICS_T {
		if (this.search_array(txt)) {
			return this.saved_metric;
		} else {
			if (this.metric_array.length > this.GARBAGE_COLLECTOR_SIZE) {
				this.house_keeping(txt);
			}
			this.metric_array.push({
				'text': txt,
				'font': this.font,
				'text size': this.text_size,
				'metric': this.measure(txt)
			});
			return this.metric_array[this.metric_array.length - 1]['metric'];
		}
	}
	house_keeping(txt: string): void {
		for (var i: number = this.metric_array.length - 1; i > -1; i--) {
			if (this.metric_array[i]['text'] === txt && this.metric_array[i]['font'] === this.font && this.metric_array[i]['text size'] != this.text_size) {
				this.metric_array.splice(i, 1);
			}
		}
	}
	/* Future proofing objects! */
	patch(): void {
		/* A paint text baseline to standardize the different alignments available in the html canvas */
		if (!global.not_null(this.baseline)) {
			this.baseline = new PaintBaseline();
		}
		/* A maintained array of computed text sizes.*/
		if (!global.not_null(this.metric_array)) {
			this.metric_array = [];
		}
		if (!global.not_null(this.saved_metric)) {
			this.saved_metric = global.NULL;
		}
		if (!global.not_null(this.GARBAGE_COLLECTOR_SIZE)) {
			this.GARBAGE_COLLECTOR_SIZE = 16;
		}
		/* The paint style of the paint element */
		if (!global.not_null(this.paint_style)) {
			this.paint_style = this.style.STROKE;
		}
		/* The paint cap of the paint element */
		if (!global.not_null(this.paint_cap)) {
			this.paint_cap = this.cap.ROUND;
		}
		if (!global.not_null(this.paint_join)) {
			this.paint_join = this.join.MITER;
		}
		/* The alignment of the text when drawing drawing text. */
		if (!global.not_null(this.text_align)) {
			this.text_align = this.align.CENTER;
		}
		/* The paint cap of the paint element */
		if (!global.not_null(this.text_baseline)) {
			this.text_baseline = this.baseline.MIDDLE;
		}
	}
}
