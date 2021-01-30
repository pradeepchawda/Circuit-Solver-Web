'use strict';
class Constants {
	public readonly NULL: any;
	public readonly MOBILE_MODE: boolean;
	public readonly DESKTOP_MODE: boolean;
	public readonly NODE_HINTS: boolean;
	public readonly VERSION_TAG: string;
	public readonly ZOOM_MAX: number;
	public readonly ZOOM_MIN: number;
	public readonly ZOOM_FACTOR: number;
	public readonly ZERO_PT_FIVE: number;
	public readonly ZERO: number;
	public readonly DEVELOPER_MODE: boolean;
	public readonly PRODUCTION_MODE: boolean;
	public readonly ON: string;
	public readonly OFF: string;
	public readonly ROTATION_0: number;
	public readonly ROTATION_90: number;
	public readonly ROTATION_180: number;
	public readonly ROTATION_270: number;
	public readonly FLIP_0: number;
	public readonly FLIP_180: number;
	public readonly WIRE_STYLE_0: number;
	public readonly WIRE_STYLE_1: number;
	public readonly WIRE_STYLE_2: number;
	public readonly WIRE_STYLE_3: number;
	public readonly WIRE_STYLE_4: number;
	public readonly SIGNAL_BUILD_COUNTER_MAX: number;
	public readonly SIGNAL_WIRE_DELETED_COUNTER_MAX: number;
	public readonly TEXT_STYLE_1: string;
	public readonly TEXT_STYLE_2: string;
	public readonly TEXT_STYLE_3: string;
	public readonly TEXT_STYLE_4: string;
	public readonly TEXT_STYLE_5: string;
	public readonly ANCHOR_POINT: ANCHOR_POINT_T;
	public readonly SI_UNIT_ARRAY: Array<number>;
	public readonly SI_UNIT_THRESHOLD_ARRAY: Array<number>;
	public readonly SI_UNIT_ABBREVIATION: Array<string>;
	public readonly WIRE_REFERENCE: WIRE_REFERENCE_T;
	public readonly history_manager: HISTORY_MANAGER_T;
	public readonly LANGUAGES: Array<string>;
	public readonly LANGUAGE_INDEX_ENGLISH: number;
	public readonly LANGUAGE_INDEX_SPANISH: number;
	public readonly LANGUAGE_INDEX_FRENCH: number;
	public readonly LANGUAGE_INDEX_ITALIAN: number;
	public readonly LANGUAGE_INDEX_DUTCH: number;
	public readonly LANGUAGE_INDEX_RUSSIAN: number;
	public readonly LANGUAGE_INDEX_GERMAN: number;
	public readonly LANGUAGE_INDEX_INDONESIAN: number;
	public readonly SYSTEM_OPTION_LANGUAGE: number;
	public readonly SYSTEM_OPTION_AUTOMATIC_TIMESTEP: number;
	public readonly SYSTEM_OPTION_SHORTCUT_HINTS: number;
	public readonly SYSTEM_OPTION_STRETCH_WINDOW: number;
	public readonly DEFAULT_FONT: string;

	public readonly PICTURE_ZOOM: number;
	public readonly PICTURE_REQUEST_MAX_TIME: number;
	public readonly CANVAS_DRAW_REQUEST_COUNTER_MAX: number;
	public readonly CANVAS_REDRAW_MAX: number;
	public readonly PACKET_DIVIDER: string;
	public readonly PI_DIV_2: number;
	public readonly PI_DIV_4: number;
	public readonly PI_MUL_3_DIV_4: number;
	public readonly PI_DIV_6: number;
	public readonly PI_DIV_12: number;
	public readonly PI_DIV_180: number;
	public readonly NEG_PI_DIV_180: number;
	public readonly _180_DIV_PI: number;
	public readonly PI_MUL_2: number;
	public readonly TRIG_TABLE_Q_NUMBER: number;
	public readonly TRIG_SINE_TABLE: Array<number>;
	public readonly TRIG_TABLE_SIZE: number;
	public readonly TRIG_TABLE_SCALE_CONSTANT: number;
	public readonly TRIG_TABLE_INDEX_CONSTANT: number;
	public readonly TRIG_TABLE_MASK: number;
	public readonly TRIG_TABLE_ROUND: number;
	public readonly MAX_TEXT_LENGTH: number;
	public readonly inv_sqrt_buf: ArrayBuffer;
	public readonly inv_sqrt_f32: Float32Array;
	public readonly inv_sqrt_u32: Uint32Array;
	public readonly ALPHA_ARRAY: Array<number>;
	public readonly GARBAGE_COLLECTOR_SIZE: number;

	constructor() {
		this.NULL = null;
		this.MOBILE_MODE = false;
		this.DESKTOP_MODE = false;
		this.NODE_HINTS = true;
		this.VERSION_TAG = '1.1.02';
		if (this.MOBILE_MODE) {
			this.ZOOM_MAX = 3.5;
			this.ZOOM_MIN = 1.0;
		} else {
			this.ZOOM_MAX = 2.0;
			this.ZOOM_MIN = 0.5;
		}
		this.ZERO_PT_FIVE = 0.5;
		this.ZERO = 0 >> 0;
		this.ZOOM_FACTOR = 1.085;
		this.DEVELOPER_MODE = false;
		this.PRODUCTION_MODE = false;
		this.ON = 'ON';
		this.OFF = 'OFF';
		this.ROTATION_0 = 0;
		this.ROTATION_90 = 1;
		this.ROTATION_180 = 2;
		this.ROTATION_270 = 3;
		this.WIRE_STYLE_0 = 0;
		this.WIRE_STYLE_1 = 1;
		this.WIRE_STYLE_2 = 2;
		this.WIRE_STYLE_3 = 3;
		this.WIRE_STYLE_4 = 4;
		this.FLIP_0 = 0;
		this.FLIP_180 = 1;
		this.SIGNAL_BUILD_COUNTER_MAX = 3;
		this.SIGNAL_WIRE_DELETED_COUNTER_MAX = 3;
		this.TEXT_STYLE_1 = 'Style1';
		this.TEXT_STYLE_2 = 'Style2';
		this.TEXT_STYLE_3 = 'Style3';
		this.TEXT_STYLE_4 = 'Style4';
		this.TEXT_STYLE_5 = 'Style5';
		this.ANCHOR_POINT = {
			p1: 0,
			p2: 1,
			p3: 2,
			p4: 3
		};
		this.SI_UNIT_ARRAY = [1 / 1e21, 1 / 1e18, 1 / 1e15, 1 / 1e12, 1 / 1e9, 1 / 1e6, 1 / 1e3, 1, 1 / 1e-3, 1 / 1e-6, 1 / 1e-9, 1 / 1e-12, 1 / 1e-15, 1 / 1e-18, 1 / 1e-21];
		this.SI_UNIT_THRESHOLD_ARRAY = [
			0.99 * 1e21,
			0.99 * 1e18,
			0.99 * 1e15,
			0.99 * 1e12,
			0.99 * 1e9,
			0.99 * 1e6,
			0.99 * 1e3,
			0.99 * 1,
			0.99 * 1e-3,
			0.99 * 1e-6,
			0.99 * 1e-9,
			0.99 * 1e-12,
			0.99 * 1e-15,
			0.99 * 1e-18,
			0.99 * 1e-21
		];
		this.SI_UNIT_ABBREVIATION = ['Z', 'E', 'P', 'T', 'G', 'M', 'k', '', 'm', 'u', 'n', 'p', 'f', 'a', 'z'];

		this.WIRE_REFERENCE = {
			wire_id: -1,
			anchor_point: -1,
			linkage: -1
		};
		this.DEFAULT_FONT = 'Arial';
		let indexer: number = 0;
		this.SYSTEM_OPTION_LANGUAGE = indexer++;
		this.SYSTEM_OPTION_AUTOMATIC_TIMESTEP = indexer++;
		this.SYSTEM_OPTION_SHORTCUT_HINTS = indexer++;
		this.SYSTEM_OPTION_STRETCH_WINDOW = indexer++;
		this.LANGUAGES = ['English', 'Spanish', 'French', 'Italian', 'Dutch', 'Russian', 'German', 'Indonesian'];
		indexer = 0;
		this.LANGUAGE_INDEX_ENGLISH = indexer++;
		this.LANGUAGE_INDEX_SPANISH = indexer++;
		this.LANGUAGE_INDEX_FRENCH = indexer++;
		this.LANGUAGE_INDEX_ITALIAN = indexer++;
		this.LANGUAGE_INDEX_DUTCH = indexer++;
		this.LANGUAGE_INDEX_RUSSIAN = indexer++;
		this.LANGUAGE_INDEX_GERMAN = indexer++;
		this.LANGUAGE_INDEX_INDONESIAN = indexer++;
		this.PICTURE_ZOOM = this.ZOOM_MAX;
		this.PICTURE_REQUEST_MAX_TIME = 3;
		this.CANVAS_DRAW_REQUEST_COUNTER_MAX = 3;
		this.CANVAS_REDRAW_MAX = 3;
		this.PACKET_DIVIDER = '#DIVIDER#';
	}
}
