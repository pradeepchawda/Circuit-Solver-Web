var Metadata = /** @class */ (function () {
    function Metadata() {
        this.elm = new Element1(-1, global.TYPE_META_DATA, global.copy(global.PROPERTY_META_DATA));
        /* A snapshot of the scope settings */
        this.user_scope_settings = global.NULL;
        /* A snapshot of the user settings */
        this.user_settings = global.NULL;
        /* Time step */
        this.user_timestep = global.NULL;
        /* The file name */
        this.file_name = '';
        /* Calibration String */
        this.calibration_string = '';
    }
    return Metadata;
}());
