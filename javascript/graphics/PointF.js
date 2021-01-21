'use strict';
class PointF {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    get_x() {
        return this.x;
    }
    set_x(x) {
        this.x = x;
    }
    get_y() {
        return this.y;
    }
    set_y(y) {
        this.y = y;
    }
    set_point(x, y) {
        this.x = x;
        this.y = y;
    }
}
