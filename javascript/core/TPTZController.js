'use strict';
class TPTZController {
    constructor(tptz_buffer) {
        this.buffer = global.utils.copy(tptz_buffer);
        this.x = [0, 0];
        this.y = [0, 0];
        this.a1 = 0;
        this.a2 = 1;
        this.b0 = 2;
        this.b1 = 3;
        this.b2 = 4;
        this.n_1 = 0;
        this.n_2 = 1;
        this.center = 0;
        this._y = 0;
    }
    get_output(input_error) {
        return this._2p2z(input_error);
    }
    set_initial(setter) {
        this.y[this.n_1] = setter;
        this.y[this.n_2] = setter;
    }
    _2p2z(_x) {
        this.center = _x * this.buffer[this.b0] + this.buffer[this.b1] * this.x[this.n_1] + this.buffer[this.b2] * this.x[this.n_2];
        this._y = this.center - this.buffer[this.a1] * this.y[this.n_1] - this.buffer[this.a2] * this.y[this.n_2];
        this.x[this.n_2] = this.x[this.n_1];
        this.x[this.n_1] = _x;
        this.y[this.n_2] = this.y[this.n_1];
        this.y[this.n_1] = this._y;
        return this._y;
    }
    set_tptz_coefficients(tptz_buffer) {
        this.buffer = global.utils.copy(tptz_buffer);
    }
}
