/**
  ported from SimplyPID.java
 * A simple PID closed control loop.
 * <br><br>
 * License : MIT
 * @author Charles Grassin
 */
class PIDController {
    constructor(set_point, k_p, k_i, k_d) {
        /* User set-point */
        this.set_point = 0;
        /* PID Coefficients */
        this.k_p = 0;
        this.k_i = 0;
        this.k_d = 0;
        /* Limit the bounds of the output */
        this.min_limit = -global.settings.MAX_VOLTAGE;
        this.max_limit = global.settings.MAX_VOLTAGE;
        /* Dynamic Variables */
        this.previous_time = 0;
        this.last_error = 0;
        this.integral_error = 0;
        /* User set-point */
        this.set_point = 0;
        /* PID Coefficients */
        this.k_p = k_d;
        this.k_i = k_i;
        this.k_d = k_d;
        /* Limit the bounds of the output */
        this.min_limit = -global.settings.MAX_VOLTAGE;
        this.max_limit = global.settings.MAX_VOLTAGE;
        /* Dynamic Variables */
        this.previous_time = 0;
        this.last_error = 0;
        this.integral_error = 0;
    }
    /* Compute the output of the controller given the current time and the current input value. */
    get_output(current_time, current_value) {
        let error = this.set_point - current_value;
        let dt = current_time - this.previous_time;
        /* Compute integral & derative error */
        let derivative_error = dt != 0 ? (error - this.last_error) / dt : 0;
        this.integral_error += error * dt;
        /* Save history */
        this.previous_time = current_time;
        this.last_error = error;
        return this.check_limits(this.k_p * error +
            this.k_i * this.integral_error +
            this.k_d * derivative_error);
    }
    reset() {
        this.previous_time = 0;
        this.last_error = 0;
        this.integral_error = 0;
    }
    check_limits(output) {
        if (output < this.min_limit) {
            return this.min_limit;
        }
        else if (output > this.max_limit) {
            return this.max_limit;
        }
        else {
            return output;
        }
    }
    set_output_limits(min_limit, max_limit) {
        if (min_limit < max_limit) {
            this.min_limit = min_limit;
            this.max_limit = max_limit;
        }
        else {
            this.min_limit = max_limit;
            this.max_limit = min_limit;
        }
    }
    /* Set the propertional parameter. */
    set_kp(k_p) {
        this.k_p = k_p;
        this.reset();
    }
    /* Set the integeral parameter. */
    set_ki(k_i) {
        this.k_i = k_i;
        this.reset();
    }
    /* Set the derivative parameter. */
    set_kd(k_d) {
        this.k_d = k_d;
        this.reset();
    }
    /* Set the set-point parameter. */
    set_setpoint(set_point) {
        this.reset();
        this.set_point = set_point;
    }
}
