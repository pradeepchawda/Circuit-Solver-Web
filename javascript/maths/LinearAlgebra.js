/**********************************************************************
 * Project           : Circuit Solver
 * File		        : LinearAlgebra.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to handle the linear algebra required for the solver. It also
 *                   contains helpter functions to create vectors, matrices, etc.
 *
 * Copyright PHASORSYSTEMS, 2019. All Rights Reserved.
 * UNPUBLISHED, LICENSED SOFTWARE.
 *
 * CONFIDENTIAL AND PROPRIETARY INFORMATION
 * WHICH IS THE PROPERTY OF PHASORSYSTEMS.
 *
 * Revision History  :
 *
 * Date        Author      	Ref    Revision (Date in YYYYMMDD format)
 * 20190928    nboatengc     1      Initial Commit.
 *
 ***********************************************************************/
class LinearAlgebra {
    constructor() {
        this.x_matrix = [[], []];
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
        this.GENERAL_MATRIX;
        this.GENERAL_VECTOR;
        this.FIRST_LUP_SOLVE = true;
    }
    lup_solve(a_matrix, b_matrix) {
        if (a_matrix.length > 0 && a_matrix[0].length > 0) {
            this.SIZE = a_matrix[0].length;
            this._i = 0;
            this._j = 0;
            this._k = 0;
            this._i_max = 0;
            this.max_a = 0;
            this.abs_a = 0;
            if (this.FIRST_LUP_SOLVE) {
                this.P = this.vector2(this.SIZE + 1);
                this.x_matrix = this.matrix(this.SIZE, 1);
                this.FIRST_LUP_SOLVE = false;
            }
            else {
                for (var i = 0; i < this.P.length; i++) {
                    this.P[i] = i;
                }
                for (var i = 0; i < this.x_matrix.length; i++) {
                    for (var j = 0; j < this.x_matrix[0].length; j++) {
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
                if (this._i_max != this._i) {
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
    set_matrix_diagonal(matrix, value, n) {
        for (var i = 0; i < n; i++) {
            matrix[i][i] = value;
        }
        return matrix;
    }
    matrix(rows, cols) {
        this.GENERAL_MATRIX = [];
        for (var i = 0; i < rows; i++) {
            this.GENERAL_MATRIX.push(new Array(cols));
            for (var j = 0; j < cols; j++) {
                this.GENERAL_MATRIX[i][j] = 0;
            }
        }
        return this.GENERAL_MATRIX;
    }
    vector(size) {
        this.GENERAL_VECTOR = new Array(size);
        for (var i = 0; i < size; i++) {
            this.GENERAL_VECTOR[i] = 0;
        }
        return this.GENERAL_VECTOR;
    }
    vector2(size) {
        this.GENERAL_VECTOR = new Array(size);
        for (var i = 0; i < size; i++) {
            this.GENERAL_VECTOR[i] = i;
        }
        return this.GENERAL_VECTOR;
    }
}
