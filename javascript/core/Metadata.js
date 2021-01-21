'use strict';
class Metadata {
    constructor() {
        this.elm = new Element1(-1, global.TYPE_META_DATA, global.copy(global.PROPERTY_META_DATA));
        this.user_scope_settings = global.NULL;
        this.user_settings = global.NULL;
        this.user_timestep = global.NULL;
        this.file_name = '';
        this.calibration_string = '';
    }
}
