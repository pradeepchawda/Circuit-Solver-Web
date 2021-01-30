'use strict';
class Templates {
    constructor() {
        this.ELEMENT_TAG_TEMPLATE = '{TAG}{ID}';
        this.ELEMENT_VAL_TEMPLATE = '{VAL}{UNIT}';
        this.DIVISION_TEXT_TEMPLATE = '{A} / {B}';
        this.PIXEL_TEMPLATE = '{VALUE}px';
        this.PNG_TEMPLATE = '{NAME}.png';
        this.TIME_DATA_TEMPLATE = {
            Frequency: -1,
            Resistance: -1,
            Capacitance: -1,
            Inductance: -1
        };
    }
}
