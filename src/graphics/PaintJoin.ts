'use strict';
class PaintJoin {
	public readonly BEVEL: CanvasLineJoin;
	public readonly ROUND: CanvasLineJoin;
	public readonly MITER: CanvasLineJoin;
	constructor() {
		this.BEVEL = 'bevel';
		this.ROUND = 'round';
		this.MITER = 'miter';
	}
}
