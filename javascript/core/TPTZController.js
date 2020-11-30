/**********************************************************************
 * Project           : Circuit Solver
 * File		        : Capacitor.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to handle the capacitor element. It will automatically generate
 *                   the stamps necessary to simulate and it will also draw the component and
 *                   handle its movement / node dependencies.
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
class TPTZController {
    constructor(tptz_buffer) {
        this.buffer = [];
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
        this.buffer = global.copy(tptz_buffer);
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
    /* Compute the two-pole two-zero output given the error signal. */
    get_output(input_error) {
        return this._2p2z(input_error);
    }
    /* Set the initial value of the two-pole two-zero compensator. */
    set_initial(setter) {
        this.y[this.n_1] = setter;
        this.y[this.n_2] = setter;
    }
    /* The difference equation that realizes the compensator. */
    _2p2z(_x) {
        this.center = _x * this.buffer[this.b0] + this.buffer[this.b1] * this.x[this.n_1] + this.buffer[this.b2] * this.x[this.n_2];
        this._y = this.center - this.buffer[this.a1] * this.y[this.n_1] - this.buffer[this.a2] * this.y[this.n_2];
        this.x[this.n_2] = this.x[this.n_1];
        this.x[this.n_1] = _x;
        this.y[this.n_2] = this.y[this.n_1];
        this.y[this.n_1] = this._y;
        return this._y;
    }
    /* Update the coefficients of the compensator. */
    set_tptz_coefficients(tptz_buffer) {
        this.buffer = global.copy(tptz_buffer);
    }
}
