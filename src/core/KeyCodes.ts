'use strict';

class KeyCodes {
	public readonly KEY_CODE_ESCAPE: string;
	public readonly KEY_CODE_BACK_QUOTE: string;
	public readonly KEY_CODE_0: string;
	public readonly KEY_CODE_1: string;
	public readonly KEY_CODE_2: string;
	public readonly KEY_CODE_3: string;
	public readonly KEY_CODE_4: string;
	public readonly KEY_CODE_5: string;
	public readonly KEY_CODE_6: string;
	public readonly KEY_CODE_7: string;
	public readonly KEY_CODE_8: string;
	public readonly KEY_CODE_9: string;
	public readonly KEY_CODE_MINUS: string;
	public readonly KEY_CODE_EQUAL: string;
	public readonly KEY_CODE_BACKSPACE: string;
	public readonly KEY_CODE_Q: string;
	public readonly KEY_CODE_W: string;
	public readonly KEY_CODE_E: string;
	public readonly KEY_CODE_R: string;
	public readonly KEY_CODE_T: string;
	public readonly KEY_CODE_Y: string;
	public readonly KEY_CODE_U: string;
	public readonly KEY_CODE_I: string;
	public readonly KEY_CODE_O: string;
	public readonly KEY_CODE_P: string;
	public readonly KEY_CODE_LEFT_BRACKET: string;
	public readonly KEY_CODE_RIGHT_BRACKET: string;
	public readonly KEY_CODE_BACKSLASH: string;
	public readonly KEY_CODE_A: string;
	public readonly KEY_CODE_S: string;
	public readonly KEY_CODE_D: string;
	public readonly KEY_CODE_F: string;
	public readonly KEY_CODE_G: string;
	public readonly KEY_CODE_H: string;
	public readonly KEY_CODE_J: string;
	public readonly KEY_CODE_K: string;
	public readonly KEY_CODE_L: string;
	public readonly KEY_CODE_SEMI_COLON: string;
	public readonly KEY_CODE_QUOTE: string;
	public readonly KEY_CODE_ENTER: string;
	public readonly KEY_CODE_LEFT_SHIFT: string;
	public readonly KEY_CODE_Z: string;
	public readonly KEY_CODE_X: string;
	public readonly KEY_CODE_C: string;
	public readonly KEY_CODE_V: string;
	public readonly KEY_CODE_B: string;
	public readonly KEY_CODE_N: string;
	public readonly KEY_CODE_M: string;
	public readonly KEY_CODE_COMMA: string;
	public readonly KEY_CODE_PERIOD: string;
	public readonly KEY_CODE_FORWARD_SLASH: string;
	public readonly KEY_CODE_RIGHT_SHIFT: string;
	public readonly KEY_CODE_LEFT_CONTROL: string;
	public readonly KEY_CODE_LEFT_ALT: string;
	public readonly KEY_CODE_SPACE: string;
	public readonly KEY_CODE_RIGHT_ALT: string;
	public readonly KEY_CODE_RIGHT_CONTROL: string;
	public readonly KEY_CODE_DELETE: string;
	public readonly KEY_CODE_HOME: string;
	public readonly KEY_CODE_END: string;
	public readonly KEY_CODE_NUMPAD_MINUS: string;
	public readonly KEY_CODE_NUMPAD_DIVIDE: string;
	public readonly KEY_CODE_NUMPAD_MULTIPLY: string;
	public readonly KEY_CODE_NUMPAD_SUBTRACT: string;
	public readonly KEY_CODE_NUMPAD_ENTER: string;
	public readonly KEY_CODE_NUMPAD_DECIMAL: string;
	public readonly KEY_CODE_ARROW_LEFT: string;
	public readonly KEY_CODE_ARROW_UP: string;
	public readonly KEY_CODE_ARROW_DOWN: string;
	public readonly KEY_CODE_ARROW_RIGHT: string;
	public readonly KEY_CODE_NUMPAD0: string;
	public readonly KEY_CODE_NUMPAD1: string;
	public readonly KEY_CODE_NUMPAD2: string;
	public readonly KEY_CODE_NUMPAD3: string;
	public readonly KEY_CODE_NUMPAD4: string;
	public readonly KEY_CODE_NUMPAD5: string;
	public readonly KEY_CODE_NUMPAD6: string;
	public readonly KEY_CODE_NUMPAD7: string;
	public readonly KEY_CODE_NUMPAD8: string;
	public readonly KEY_CODE_NUMPAD9: string;
	public readonly KEY_EVENT_CODES: any;
	public readonly KEY_EVENT_CODES_KEYS: Array<string>;
	constructor() {
		this.KEY_CODE_ESCAPE = 'Escape';
		this.KEY_CODE_BACK_QUOTE = 'Backquote';
		this.KEY_CODE_0 = 'Digit0';
		this.KEY_CODE_1 = 'Digit1';
		this.KEY_CODE_2 = 'Digit2';
		this.KEY_CODE_3 = 'Digit3';
		this.KEY_CODE_4 = 'Digit4';
		this.KEY_CODE_5 = 'Digit5';
		this.KEY_CODE_6 = 'Digit6';
		this.KEY_CODE_7 = 'Digit7';
		this.KEY_CODE_8 = 'Digit8';
		this.KEY_CODE_9 = 'Digit9';
		this.KEY_CODE_MINUS = 'Minus';
		this.KEY_CODE_EQUAL = 'Equal';
		this.KEY_CODE_BACKSPACE = 'Backspace';
		this.KEY_CODE_Q = 'KeyQ';
		this.KEY_CODE_W = 'KeyW';
		this.KEY_CODE_E = 'KeyE';
		this.KEY_CODE_R = 'KeyR';
		this.KEY_CODE_T = 'KeyT';
		this.KEY_CODE_Y = 'KeyY';
		this.KEY_CODE_U = 'KeyU';
		this.KEY_CODE_I = 'KeyI';
		this.KEY_CODE_O = 'KeyO';
		this.KEY_CODE_P = 'KeyP';
		this.KEY_CODE_LEFT_BRACKET = 'BracketLeft';
		this.KEY_CODE_RIGHT_BRACKET = 'BracketRight';
		this.KEY_CODE_BACKSLASH = 'Backslash';
		this.KEY_CODE_A = 'KeyA';
		this.KEY_CODE_S = 'KeyS';
		this.KEY_CODE_D = 'KeyD';
		this.KEY_CODE_F = 'KeyF';
		this.KEY_CODE_G = 'KeyG';
		this.KEY_CODE_H = 'KeyH';
		this.KEY_CODE_J = 'KeyJ';
		this.KEY_CODE_K = 'KeyK';
		this.KEY_CODE_L = 'KeyL';
		this.KEY_CODE_SEMI_COLON = 'Semicolon';
		this.KEY_CODE_QUOTE = 'Quote';
		this.KEY_CODE_ENTER = 'Enter';
		this.KEY_CODE_LEFT_SHIFT = 'ShiftLeft';
		this.KEY_CODE_Z = 'KeyZ';
		this.KEY_CODE_X = 'KeyX';
		this.KEY_CODE_C = 'KeyC';
		this.KEY_CODE_V = 'KeyV';
		this.KEY_CODE_B = 'KeyB';
		this.KEY_CODE_N = 'KeyN';
		this.KEY_CODE_M = 'KeyM';
		this.KEY_CODE_COMMA = 'Comma';
		this.KEY_CODE_PERIOD = 'Period';
		this.KEY_CODE_FORWARD_SLASH = 'Slash';
		this.KEY_CODE_RIGHT_SHIFT = 'ShiftRight';
		this.KEY_CODE_LEFT_CONTROL = 'ControlLeft';
		this.KEY_CODE_LEFT_ALT = 'AltLeft';
		this.KEY_CODE_SPACE = 'Space';
		this.KEY_CODE_RIGHT_ALT = 'AltRight';
		this.KEY_CODE_RIGHT_CONTROL = 'ControlRight';
		this.KEY_CODE_DELETE = 'Delete';
		this.KEY_CODE_HOME = 'Home';
		this.KEY_CODE_END = 'End';
		this.KEY_CODE_NUMPAD_MINUS = 'NumpadSubtract';
		this.KEY_CODE_NUMPAD_DIVIDE = 'NumpadDivide';
		this.KEY_CODE_NUMPAD_MULTIPLY = 'NumpadMultiply';
		this.KEY_CODE_NUMPAD_SUBTRACT = 'NumpadSubtract';
		this.KEY_CODE_NUMPAD_ENTER = 'NumpadEnter';
		this.KEY_CODE_NUMPAD_DECIMAL = 'NumpadDecimal';
		this.KEY_CODE_ARROW_LEFT = 'ArrowLeft';
		this.KEY_CODE_ARROW_UP = 'ArrowUp';
		this.KEY_CODE_ARROW_DOWN = 'ArrowDown';
		this.KEY_CODE_ARROW_RIGHT = 'ArrowRight';
		this.KEY_CODE_NUMPAD0 = 'Numpad0';
		this.KEY_CODE_NUMPAD1 = 'Numpad1';
		this.KEY_CODE_NUMPAD2 = 'Numpad2';
		this.KEY_CODE_NUMPAD3 = 'Numpad3';
		this.KEY_CODE_NUMPAD4 = 'Numpad4';
		this.KEY_CODE_NUMPAD5 = 'Numpad5';
		this.KEY_CODE_NUMPAD6 = 'Numpad6';
		this.KEY_CODE_NUMPAD7 = 'Numpad7';
		this.KEY_CODE_NUMPAD8 = 'Numpad8';
		this.KEY_CODE_NUMPAD9 = 'Numpad9';
		this.KEY_EVENT_CODES = {
			Escape: ['', '', ''],
			Backquote: ['`', '~', ''],
			Digit0: ['0', ')', ''],
			Digit1: ['1', '!', ''],
			Digit2: ['2', '@', ''],
			Digit3: ['3', '#', ''],
			Digit4: ['4', '$', ''],
			Digit5: ['5', '%', ''],
			Digit6: ['6', '^', ''],
			Digit7: ['7', '&', ''],
			Digit8: ['8', '*', ''],
			Digit9: ['9', '(', ''],
			Minus: ['-', '_', ''],
			Equal: ['=', '+', ''],
			Backspace: ['', '', ''],
			KeyQ: ['q', 'Q', 'Q'],
			KeyW: ['w', 'W', 'W'],
			KeyE: ['e', 'E', 'E'],
			KeyR: ['r', 'R', 'R'],
			KeyT: ['t', 'T', 'T'],
			KeyY: ['y', 'Y', 'Y'],
			KeyU: ['u', 'U', 'U'],
			KeyI: ['i', 'I', 'I'],
			KeyO: ['o', 'O', 'O'],
			KeyP: ['p', 'P', 'P'],
			BracketLeft: ['[', '{', ''],
			BracketRight: [']', '}', ''],
			Backslash: ['\\', '|', ''],
			KeyA: ['a', 'A', 'A'],
			KeyS: ['s', 'S', 'S'],
			KeyD: ['d', 'D', 'D'],
			KeyF: ['f', 'F', 'F'],
			KeyG: ['g', 'G', 'G'],
			KeyH: ['h', 'H', 'H'],
			KeyJ: ['j', 'J', 'J'],
			KeyK: ['k', 'K', 'K'],
			KeyL: ['l', 'L', 'L'],
			Semicolon: [';', ':', ''],
			Quote: ["'", '"', ''],
			Enter: ['', '', ''],
			ShiftLeft: ['', '', ''],
			KeyZ: ['z', 'Z', 'Z'],
			KeyX: ['x', 'X', 'X'],
			KeyC: ['c', 'C', 'C'],
			KeyV: ['v', 'V', 'V'],
			KeyB: ['b', 'B', 'B'],
			KeyN: ['n', 'N', 'N'],
			KeyM: ['m', 'M', 'M'],
			Comma: [',', '<', ''],
			Period: ['.', '>', ''],
			Slash: ['/', '?', ''],
			ShiftRight: ['', '', ''],
			ControlLeft: ['', '', ''],
			AltLeft: ['', '', ''],
			Space: [' ', ' ', ' '],
			AltRight: ['', '', ''],
			ControlRight: ['', '', ''],
			Delete: ['', '', ''],
			Home: ['', '', ''],
			End: ['', '', ''],
			NumpadSubtract: ['-', '', ''],
			NumpadDivide: ['/', '', ''],
			NumpadMultiply: ['*', '', ''],
			NumpadAdd: ['+', '', ''],
			NumpadEnter: ['', '', ''],
			NumpadDecimal: ['', '', ''],
			ArrowLeft: ['', '', ''],
			ArrowUp: ['', '', ''],
			ArrowDown: ['', '', ''],
			ArrowRight: ['', '', ''],
			Numpad0: ['0', '', ''],
			Numpad1: ['1', '', ''],
			Numpad2: ['2', '', ''],
			Numpad3: ['3', '', ''],
			Numpad4: ['4', '', ''],
			Numpad5: ['5', '', ''],
			Numpad6: ['6', '', ''],
			Numpad7: ['7', '', ''],
			Numpad8: ['8', '', ''],
			Numpad9: ['9', '', '']
		};
		this.KEY_EVENT_CODES_KEYS = Object.keys(this.KEY_EVENT_CODES);
	}
}
