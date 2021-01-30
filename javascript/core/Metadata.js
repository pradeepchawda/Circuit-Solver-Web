'use strict';
class Metadata {
    constructor() {
        this.elm = new Element1(-1, global.ELEMENT_TYPES.TYPE_META_DATA, global.utils.copy(global.PROPERTY_META_DATA));
        this.user_scope_settings = global.CONSTANTS.NULL;
        this.user_settings = global.CONSTANTS.NULL;
        this.user_timestep = global.CONSTANTS.NULL;
        this.file_name = '';
        this.calibration_string = '';
    }
}
