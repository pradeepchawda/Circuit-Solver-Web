'use strict';
class PointF {
	public x: number;
	public y: number;
	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
	get_x(): number {
		return this.x;
	}
	set_x(x: number): void {
		this.x = x;
	}
	get_y(): number {
		return this.y;
	}
	set_y(y: number): void {
		this.y = y;
	}
	set_point(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}
}
