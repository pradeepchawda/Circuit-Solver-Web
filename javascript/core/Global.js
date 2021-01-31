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
    }
}
