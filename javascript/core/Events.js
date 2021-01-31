'use strict';
class Events {
    constructor(NULL) {
        this.mouse_down_event = NULL;
        this.mouse_move_event = NULL;
        this.mouse_up_event = NULL;
        this.mouse_wheel_event = NULL;
        this.mouse_double_click_event = NULL;
        this.mouse_down_event_queue = [];
        this.mouse_up_event_queue = [];
        this.mouse_wheel_event_queue = [];
        this.mouse_double_click_event_queue = [];
        this.key_down_event_queue = [];
        this.key_up_event_queue = [];
        this.key_down_event = {
            event: null,
            alt: false,
            shift: false,
            ctrl: false,
            caps: false
        };
        this.key_up_event = {
            event: null,
            alt: false,
            shift: false,
            ctrl: false,
            caps: false
        };
    }
}
