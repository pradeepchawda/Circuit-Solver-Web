'use strict';
class Global {
	public readonly Paint: Paint;

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

	// public 'circle_buffer': Array<Array<number>>;
	// public 'line_buffer': Array<Array<number>>;

	public 'time_step': number;
	public 'simulation_time': number;
	public 'vt': number;
	public 'gmin_default': number;
	public 'v_max_err': Array<Array<number>>;
	public 'i_max_err': Array<Array<number>>;
	public 'v_locked': boolean;
	public 'i_locked': boolean;
	public 'v_conv': boolean;
	public 'i_conv': boolean;

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
