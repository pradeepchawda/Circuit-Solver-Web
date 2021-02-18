'use strict';
class Global {
	public readonly CONSTANTS: Constants;
	public readonly COLORS: Colors;
	public readonly TEMPLATES: Templates;
	public readonly ELEMENT_TYPES: ElementTypes;
	public readonly PROPERTY: ElementProperties;
	public readonly KEY_CODES: KeyCodes;
	public events: Events;
	public flags: Flags;
	public utils: Util;
	public settings: Settings;
	public variables: Variables;
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