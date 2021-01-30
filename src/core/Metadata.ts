'use strict';
class Metadata {
	public elm: Element1;
	public user_scope_settings: SCOPE_ENTRY_T;
	public user_settings: Settings;
	public user_timestep: number;
	public file_name: string;
	public calibration_string: string;
	constructor() {
		this.elm = new Element1(-1, global.ELEMENT_TYPES.TYPE_META_DATA, global.utils.copy(global.PROPERTY.PROPERTY_META_DATA));
		this.user_scope_settings = global.CONSTANTS.NULL;
		this.user_settings = global.CONSTANTS.NULL;
		this.user_timestep = global.CONSTANTS.NULL;
		this.file_name = '';
		this.calibration_string = '';
	}
}
