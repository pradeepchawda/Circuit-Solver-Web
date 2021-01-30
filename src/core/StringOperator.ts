'use strict';
class StringOperator {
	public bases: Array<number>;
	public prefix: Array<string>;
	public shift_variable: number;
	public index: number;
	public prefix_index: number;
	public valid_characters: Array<string>;
	public readonly NEGATIVE_SIGN: number;
	public readonly DECIMAL_POINT: number;
	constructor() {
		this.bases = [-18, -15, -12, -9, -6, -3, 0, 3, 6, 9, 12, 15, 18];
		this.prefix = ['a', 'f', 'p', 'n', 'u', 'm', '', 'k', 'M', 'G', 'T', 'P'];
		this.shift_variable = 0;
		this.index = 0;
		this.prefix_index = -1;
		this.valid_characters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
		this.NEGATIVE_SIGN = Math.round(50);
		this.DECIMAL_POINT = Math.round(100);
	}
	exponentiate_string(input: string): string {
		return this.correction(this.process(this.correction(input)) + this.prefix[this.index]);
	}
	correction(input: string): string {
		let output: string = '';
		if (input === '') {
			input = '0';
		}
		let is_found: boolean = false;
		if (input.length === 1) {
			for (var i: number = 0; i < this.prefix.length; i++) {
				if (i !== 6 && input.charAt(0) === this.prefix[i].charAt(0)) {
					output = '1' + input;
					is_found = true;
					break;
				}
			}
		}
		if (!is_found) {
			output = input;
		}
		return output;
	}
	truncate(input: Array<Digit>, decimal_place: number): Array<Digit> {
		let decimal_location: number = -1;
		decimal_location = this.get_decimal_index(input);
		if (decimal_location !== -1) {
			for (var i: number = input.length - 1; i > decimal_location + decimal_place; i--) {
				input.splice(i, 1);
			}
		}
		return input;
	}
	is_valid_prefix(input: string): number {
		let index: number = -1;
		for (var i: number = 0; i < this.prefix.length; i++) {
			if (this.prefix[i] === input) {
				index = i;
				this.prefix_index = i;
				break;
			}
		}
		return index;
	}
	is_valid(input: string): boolean {
		let is_valid: boolean = false;
		for (var i: number = 0; i < this.valid_characters.length; i++) {
			if (this.valid_characters[i] === input) {
				is_valid = true;
				break;
			}
		}
		return is_valid;
	}
	exponentiate(input: string): string {
		if (input === '0') {
			return '0';
		} else if (!global.utils.not_null(input)) {
			return '0';
		} else {
			return this.correction(this.process(this.format_exponent(input)) + this.prefix[this.index]);
		}
	}
	process(input: string): string {
		let number: Array<Digit> = [];
		let round: number = 3;
		let exponent: number = 0;
		let str: string = '';
		this.shift_variable = 0;
		number = this.generate(input);
		number = this.format(this.copy_num(number));
		exponent = this.get_exponent(this.copy_num(number));
		this.get_closest(exponent);
		number = this.left_most_decimal(this.copy_num(number));
		number = this.format(this.copy_num(number));
		number = this.pad(this.copy_num(number), this.absolute_value(exponent) + 2);
		number = this.shift(this.copy_num(number), this.shift_variable);
		number = this.truncate(this.copy_num(number), round);
		number = this.format(this.copy_num(number));
		str = this.stringify(number);
		return str;
	}
	copy_num(number: Array<Digit>): Array<Digit> {
		let output: Array<Digit> = [];
		for (var i: number = 0; i < number.length; i++) {
			output.push(new Digit(number[i].get_digit()));
		}
		return output;
	}
	absolute_value(input: number): number {
		if (input < 0) {
			return Math.round(-input);
		} else {
			return Math.round(input);
		}
	}
	pad(input: Array<Digit>, padding: number): Array<Digit> {
		for (var i: number = 0; i < padding; i++) {
			input.splice(0, 0, new Digit(0));
		}
		for (var i: number = 0; i < padding; i++) {
			input.splice(input.length, 0, new Digit(0));
		}
		return input;
	}
	shift(input: Array<Digit>, shift: number): Array<Digit> {
		let decimal_location: number = this.get_decimal_index(input);
		if (shift !== 0) {
			let place_at: number = decimal_location + (shift + 1);
			input.splice(place_at, 0, new Digit(this.DECIMAL_POINT));
			for (var i: number = 0; i < input.length; i++) {
				if (input[i].get_digit() === this.DECIMAL_POINT && i !== place_at) {
					input.splice(i, 1);
					break;
				}
			}
		}
		return input;
	}
	get_closest(exponent: number): number {
		let closest: number = 30;
		let location: number = -1;
		for (var i: number = 0; i < this.bases.length; i++) {
			if (exponent - this.bases[i] < closest) {
				if (Math.pow(10, exponent) >= Math.pow(10, this.bases[i])) {
					closest = exponent - this.bases[i];
					location = i;
				} else {
					break;
				}
			}
		}
		this.shift_variable = closest;
		if (location !== -1) {
			this.index = location;
			return this.bases[location];
		} else {
			return exponent;
		}
	}
	generate(input: string): Array<Digit> {
		let string_input: string = input + '';
		let output: Array<Digit> = [];
		let index: number = -1;
		let magnitude: string = '';
		let base: number = 0;
		let exp: number = -100;
		let exponent: string = '';
		for (var i: number = 0; i < string_input.length; i++) {
			if (this.is_valid_prefix(string_input.charAt(i) + '') > -1) {
				index = this.prefix_index;
				for (var j: number = 0; j < i; j++) {
					magnitude = magnitude + string_input.charAt(j) + '';
				}
				break;
			}
		}
		for (var i: number = 0; i < string_input.length; i++) {
			if ('E' === string_input.charAt(i) + '') {
				index = this.prefix_index;
				for (var j: number = 0; j < i; j++) {
					magnitude = magnitude + string_input.charAt(j) + '';
				}
				for (var x = i; x < string_input.length; x++) {
					if (this.is_valid(string_input.charAt(x) + '') || '.' === string_input.charAt(x) + '' || '-' === string_input.charAt(x) + '') {
						exponent = exponent + string_input.charAt(x);
					}
				}
				if (exponent.length > 0) {
					exp = parseInt(exponent);
				}
				break;
			}
		}
		if (magnitude === '') {
			magnitude = string_input;
		}
		for (var i: number = 0; i < magnitude.length; i++) {
			if (this.is_valid(magnitude.charAt(i) + '')) {
				output.push(new Digit(parseInt(magnitude.charAt(i) + '')));
			} else if ('.' === magnitude.charAt(i) + '') {
				output.push(new Digit(this.DECIMAL_POINT));
			} else if ('-' === magnitude.charAt(i) + '') {
				output.push(new Digit(this.NEGATIVE_SIGN));
			}
		}
		if (index > -1) {
			base = this.bases[index];
			output = this.format(output);
			output = this.pad(output, this.absolute_value(base) + 2);
			if (base > 0) {
				output = this.shift(output, this.bases[index]);
			} else {
				output = this.shift(output, this.bases[index] - 1);
			}
		}
		if (exp >= this.bases[0]) {
			output = this.format(output);
			output = this.pad(output, this.absolute_value(exp) + 2);
			if (exp > 0) {
				output = this.shift(output, exp);
			} else {
				output = this.shift(output, exp - 1);
			}
		}
		return output;
	}
	left_most_decimal(input: Array<Digit>): Array<Digit> {
		let first_bit: number = 0;
		let second_bit: number = 0;
		let begin: boolean = false;
		let decimal: number = -1;
		if (input.length > 1) {
			first_bit = input[0].get_digit();
			second_bit = input[1].get_digit();
			if ((first_bit < this.NEGATIVE_SIGN && first_bit > 0) || (first_bit === this.NEGATIVE_SIGN && second_bit < this.NEGATIVE_SIGN && second_bit > 0)) {
				for (var i: number = input.length - 1; i > -1; i--) {
					if (input[i].get_digit() === this.DECIMAL_POINT) {
						input.splice(i, 1);
						if (input[0].get_digit() === this.NEGATIVE_SIGN) {
							input.splice(2, 0, new Digit(this.DECIMAL_POINT));
						} else {
							input.splice(1, 0, new Digit(this.DECIMAL_POINT));
						}
						break;
					}
				}
			} else {
				for (var i: number = 0; i < input.length; i++) {
					if (begin && input[i].get_digit() > 0) {
						input.splice(i + 1, 0, new Digit(this.DECIMAL_POINT));
						if (decimal !== -1) {
							input.splice(decimal, 1);
						}
						break;
					}
					if (input[i].get_digit() === this.DECIMAL_POINT && !begin) {
						begin = true;
						decimal = i;
					}
				}
			}
		}
		return input;
	}
	stringify(input: Array<Digit>): string {
		let output: string = '';
		for (var i: number = 0; i < input.length; i++) {
			if (input[i].get_digit() < this.NEGATIVE_SIGN) {
				output = output + Math.round(input[i].get_digit());
			} else if (input[i].get_digit() === this.DECIMAL_POINT) {
				if (i !== input.length - 1) {
					output = output + '.';
				}
			} else if (input[i].get_digit() === this.NEGATIVE_SIGN) {
				output = output + '-';
			}
		}
		return output;
	}
	get_decimal_index(input: Array<Digit>): number {
		let output: number = -1;
		for (var i: number = 0; i < input.length; i++) {
			if (input[i].get_digit() === this.DECIMAL_POINT) {
				output = i;
				break;
			}
		}
		return output;
	}
	has_decimal(input: Array<Digit>): boolean {
		let output: boolean = false;
		for (var i: number = 0; i < input.length; i++) {
			if (input[i].get_digit() === this.DECIMAL_POINT) {
				output = true;
				break;
			}
		}
		return output;
	}
	invert(input: Array<Digit>): Array<Digit> {
		let output: Array<Digit> = [];
		for (var i: number = input.length - 1; i > -1; i--) {
			output.push(input[i]);
		}
		return output;
	}
	format(input: Array<Digit>): Array<Digit> {
		let has_decimal: boolean = this.has_decimal(input);
		if (!has_decimal) {
			input.push(new Digit(this.DECIMAL_POINT));
		}
		if (input.length > 0) {
			for (var i: number = input.length - 1; i > -1; i--) {
				if (input[i].get_digit() < 1) {
					input.splice(i, 1);
				} else {
					if (input[i].get_digit() !== this.NEGATIVE_SIGN) {
						break;
					}
				}
			}
			input = this.invert(input);
			for (var i: number = input.length - 1; i > -1; i--) {
				if (input[i].get_digit() < 1) {
					input.splice(i, 1);
				} else {
					if (input[i].get_digit() !== this.NEGATIVE_SIGN) {
						break;
					}
				}
			}
			input = this.invert(input);
		}
		for (var i: number = input.length - 1; i > -1; i--) {
			if (i > 0) {
				if (input[i].get_digit() === this.DECIMAL_POINT && input[i - 1].get_digit() === this.NEGATIVE_SIGN) {
					input.splice(i, 0, new Digit(0));
					break;
				}
			}
		}
		return input;
	}
	get_exponent(input: Array<Digit>): number {
		let count: number = 0;
		let begin: boolean = false;
		let first_bit: number = 0;
		let second_bit: number = 0;
		let loop: number = 0;
		if (input.length > 1) {
			first_bit = input[0].get_digit();
			second_bit = input[1].get_digit();
			if ((first_bit < this.NEGATIVE_SIGN && first_bit > 0) || (first_bit === this.NEGATIVE_SIGN && second_bit < this.NEGATIVE_SIGN && second_bit > 0)) {
				for (var i: number = 0; i < input.length; i++) {
					if (input[i].get_digit() < this.DECIMAL_POINT && input[i].get_digit() !== this.NEGATIVE_SIGN) {
						count++;
					} else if (input[i].get_digit() === this.DECIMAL_POINT) {
						break;
					}
				}
			} else {
				for (var i: number = 0; i < input.length; i++) {
					if (begin && loop > 0) {
						break;
					}
					if (begin && input[i].get_digit() > 0) {
						loop++;
					}
					if (begin) {
						count--;
					}
					if (input[i].get_digit() === this.DECIMAL_POINT && !begin) {
						begin = true;
					}
				}
			}
		} else {
			count = 1;
		}
		if (count > 0) {
			count--;
		}
		return count;
	}
	parse(input: string): number {
		let inp: Array<Digit> = [];
		inp = this.copy_num(this.generate(input));
		inp = this.copy_num(this.format(inp));
		let decimal: number = this.get_decimal_index(inp);
		let output: number = 0;
		let negate: boolean = false;
		let count: number = 0;
		for (var i: number = decimal; i < inp.length; i++) {
			if (Math.round(inp[i].get_digit()) !== this.DECIMAL_POINT && Math.round(inp[i].get_digit()) !== this.NEGATIVE_SIGN) {
				output += Math.round(inp[i].get_digit()) * Math.pow(10, count);
			}
			count--;
			if (Math.round(inp[i].get_digit()) === this.NEGATIVE_SIGN) {
				negate = true;
			}
		}
		count = 0;
		for (var i: number = decimal - 1; i > -1; i--) {
			if (Math.round(inp[i].get_digit()) !== this.DECIMAL_POINT && Math.round(inp[i].get_digit()) !== this.NEGATIVE_SIGN) {
				output += Math.round(inp[i].get_digit()) * Math.pow(10, count);
			}
			count++;
			if (Math.round(inp[i].get_digit()) === this.NEGATIVE_SIGN) {
				negate = true;
			}
		}
		if (negate) {
			output = -output;
		}
		return output;
	}
	format_exponent(input: string): string {
		let symbolic: Array<Digit> = [];
		let inp: string = input + '';
		let output: string = '';
		let exponent: string = '';
		let negate: boolean = false;
		let _switch: boolean = false;
		let loop: number = 0;
		if (inp.length > 0) {
			if ('-' === inp.charAt(0) + '') {
				negate = true;
			}
		}
		for (var i: number = 0; i < inp.length; i++) {
			if (!_switch && 'E' === inp.charAt(i) + '') {
				_switch = true;
			}
			if (!_switch) {
				if (!('-' === inp.charAt(i) + '')) {
					output = output + inp.charAt(i);
				}
			} else {
				if (loop > 0) {
					exponent = exponent + inp.charAt(i);
				}
				loop++;
			}
		}
		symbolic = this.generate(output);
		if (exponent.length > 0) {
			symbolic = this.pad(symbolic, this.absolute_value(parseFloat(exponent)));
			if (Math.round(parseFloat(exponent)) < 0) {
				symbolic = this.shift(symbolic, Math.round(parseFloat(exponent)) - 1);
			} else {
				symbolic = this.shift(symbolic, Math.round(parseFloat(exponent)));
			}
			symbolic = this.format(symbolic);
		}
		output = this.stringify(symbolic);
		if (negate) {
			output = '-' + output;
		}
		return output;
	}
}
