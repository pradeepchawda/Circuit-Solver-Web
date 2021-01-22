'use strict';
class LinearAlgebra {
	public x_matrix: Array<Array<number>>;
	public det_threshold: number;
	public row: Array<number>;
	public _i: number;
	public SIZE: number;
	public _j: number;
	public _k: number;
	public _i_max: number;
	public max_a: number;
	public abs_a: number;
	public P: Array<number>;
	public lup_det: number;
	public general_vector: Array<number>;
	public general_matrix: Array<Array<number>>;
	public first_lup_solve: boolean;
	constructor() {
		this.x_matrix = [[0], [0]];
		this.det_threshold = 0;
		this.row = [];
		this._i = 0;
		this.SIZE = 0;
		this._j = 0;
		this._k = 0;
		this._i_max = 0;
		this.max_a = 0;
		this.abs_a = 0;
		this.P = [];
		this.lup_det = 0;
		this.general_matrix;
		this.general_vector;
		this.first_lup_solve = true;
	}
	lup_solve(a_matrix: Array<Array<number>>, b_matrix: Array<Array<number>>): Array<Array<number>> {
		if (a_matrix.length > 0 && a_matrix[0].length > 0) {
			this.SIZE = a_matrix[0].length;
			this._i = 0;
			this._j = 0;
			this._k = 0;
			this._i_max = 0;
			this.max_a = 0;
			this.abs_a = 0;
			if (this.first_lup_solve) {
				this.P = this.vector2(this.SIZE + 1);
				this.x_matrix = this.matrix(this.SIZE, 1);
				this.first_lup_solve = false;
			} else {
				for (var i: number = 0; i < this.P.length; i++) {
					this.P[i] = i;
				}
				for (var i: number = 0; i < this.x_matrix.length; i++) {
					for (var j: number = 0; j < this.x_matrix[0].length; j++) {
						this.x_matrix[i][j] = 0;
					}
				}
			}
			for (this._i = 0; this._i < this.SIZE; this._i++) {
				this.max_a = 0.0;
				this._i_max = this._i;
				for (this._k = this._i; this._k < this.SIZE; this._k++) {
					if ((this.abs_a = Math.abs(a_matrix[this._k][this._i])) > this.max_a) {
						this.max_a = this.abs_a;
						this._i_max = this._k;
					}
				}
				if (this._i_max !== this._i) {
					this._j = this.P[this._i];
					this.P[this._i] = this.P[this._i_max];
					this.P[this._i_max] = this._j;
					this.row = a_matrix[this._i];
					a_matrix[this._i] = a_matrix[this._i_max];
					a_matrix[this._i_max] = this.row;
					this.P[this.SIZE]++;
				}
				for (this._j = this._i + 1; this._j < this.SIZE; this._j++) {
					a_matrix[this._j][this._i] /= a_matrix[this._i][this._i];
					for (this._k = this._i + 1; this._k < this.SIZE; this._k++) {
						a_matrix[this._j][this._k] -= a_matrix[this._j][this._i] * a_matrix[this._i][this._k];
					}
				}
			}
			this.lup_det = a_matrix[0][0];
			for (this._i = 1; this._i < this.SIZE; this._i++) {
				this.lup_det *= a_matrix[this._i][this._i];
			}
			if (!((this.P[this.SIZE] - this.SIZE) % 2 === 0)) {
				this.lup_det = -this.lup_det;
			}
			if (Math.abs(this.lup_det) <= this.det_threshold) {
				global.is_singular = true;
				return this.x_matrix;
			}
			for (this._i = 0; this._i < this.SIZE; this._i++) {
				this.x_matrix[this._i][0] = b_matrix[this.P[this._i]][0];
				for (this._k = 0; this._k < this._i; this._k++) {
					this.x_matrix[this._i][0] -= a_matrix[this._i][this._k] * this.x_matrix[this._k][0];
				}
			}
			for (this._i = this.SIZE - 1; this._i >= 0; this._i--) {
				for (this._k = this._i + 1; this._k < this.SIZE; this._k++) {
					this.x_matrix[this._i][0] -= a_matrix[this._i][this._k] * this.x_matrix[this._k][0];
				}
				this.x_matrix[this._i][0] = this.x_matrix[this._i][0] / a_matrix[this._i][this._i];
			}
		}
		return this.x_matrix;
	}
	set_matrix_diagonal(matrix: Array<Array<number>>, value: number, n: number): Array<Array<number>> {
		for (var i: number = 0; i < n; i++) {
			matrix[i][i] = value;
		}
		return matrix;
	}
	matrix(rows: number, cols: number): Array<Array<number>> {
		this.general_matrix = [];
		for (var i: number = 0; i < rows; i++) {
			this.general_matrix.push(new Array(cols));
			for (var j: number = 0; j < cols; j++) {
				this.general_matrix[i][j] = 0;
			}
		}
		return this.general_matrix;
	}
	vector(size: number): Array<number> {
		this.general_vector = new Array(size);
		for (var i: number = 0; i < size; i++) {
			this.general_vector[i] = 0;
		}
		return this.general_vector;
	}
	vector2(size: number): Array<number> {
		this.general_vector = new Array(size);
		for (var i: number = 0; i < size; i++) {
			this.general_vector[i] = i;
		}
		return this.general_vector;
	}
}
