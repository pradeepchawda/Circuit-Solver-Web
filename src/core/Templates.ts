'use strict';
class Templates {
	public readonly ELEMENT_TAG_TEMPLATE: string;
	public readonly ELEMENT_VAL_TEMPLATE: string;
	public readonly DIVISION_TEXT_TEMPLATE: string;
	public readonly PIXEL_TEMPLATE: string;
	public readonly PNG_TEMPLATE: string;
	public readonly TIME_DATA_TEMPLATE: TIME_DATA_TEMPLATE_T;
	public readonly FONT_TEMPLATE: string;
	constructor() {
		this.ELEMENT_TAG_TEMPLATE = '{TAG}{ID}';
		this.ELEMENT_VAL_TEMPLATE = '{VAL}{UNIT}';
		this.DIVISION_TEXT_TEMPLATE = '{A} / {B}';
		this.PIXEL_TEMPLATE = '{VALUE}px';
		this.PNG_TEMPLATE = '{NAME}.png';
		this.FONT_TEMPLATE = 'spx f';
		this.TIME_DATA_TEMPLATE = {
			Frequency: -1,
			Resistance: -1,
			Capacitance: -1,
			Inductance: -1
		};
	}
}
