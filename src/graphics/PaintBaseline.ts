'use strict';
class PaintBaseline {
	public readonly TOP: CanvasTextBaseline;
	public readonly MIDDLE: CanvasTextBaseline;
	public readonly BOTTOM: CanvasTextBaseline;
	public readonly ALPHABETIC: CanvasTextBaseline;
	public readonly HANGING: CanvasTextBaseline;
	constructor() {
		this.TOP = 'top';
		this.MIDDLE = 'middle';
		this.BOTTOM = 'bottom';
		this.ALPHABETIC = 'alphabetic';
		this.HANGING = 'hanging';
	}
}
