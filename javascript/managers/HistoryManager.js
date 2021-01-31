'use strict';
class HistoryManager {
    constructor() {
        this.history = [];
        this.history_index = -1;
    }
    watch() {
        if (global.variables.history['packet'].length > 0) {
            this.push(global.variables.history['packet'][0]);
            global.variables.history['packet'].splice(0, 1);
        }
    }
    push(packet) {
        if (!global.flags.flag_add_element && !global.flags.flag_history_lock) {
            if (this.history.length > 0) {
                let last_history_index = this.history.length - 1;
                if (this.history[last_history_index] !== packet) {
                    if (this.history_index > -1) {
                        this.history.splice(this.history_index + 1, this.history.length - this.history_index);
                    }
                    this.history.push(packet);
                    this.history_index = this.history.length - 1;
                }
            }
            else {
                if (this.history_index > -1) {
                    this.history.splice(this.history_index + 1, this.history.length - this.history_index);
                }
                this.history.push(packet);
                this.history_index = this.history.length - 1;
            }
        }
    }
    undo() {
        if (this.history_index > 0) {
            this.history_index--;
            engine_functions.parse_elements(this.history[this.history_index]);
        }
    }
    redo() {
        if (this.history_index < this.history.length - 1) {
            this.history_index++;
            engine_functions.parse_elements(this.history[this.history_index]);
        }
    }
    clear() {
        this.history.splice(0, this.history.length);
    }
}
