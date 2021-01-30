'use strict';
class Global {
    constructor() {
        this.settings = new Settings();
        this.CONSTANTS = new Constants();
        this.COLORS = new Colors();
        this.TEMPLATES = new Templates();
        this.ELEMENT_TYPES = new ElementTypes();
        this.PROPERTY = new ElementProperties(this.CONSTANTS, this.settings);
        this.KEY_CODES = new KeyCodes();
        this.events = new Events(this.CONSTANTS.NULL);
        this.flags = new Flags();
        this.utils = new Util(this.CONSTANTS, this.TEMPLATES, this.KEY_CODES);
        this.variables = new Variables(this.CONSTANTS, this.COLORS);
        this.vt = 25.6e-3;
        this.gmin_default = 1e-9;
        this.v_max_err = [];
        this.i_max_err = [];
        this.v_locked = false;
        this.i_locked = false;
        this.v_conv = false;
        this.i_conv = false;
        this.time_step = 5e-6;
        this.simulation_time = 0;
    }
}
