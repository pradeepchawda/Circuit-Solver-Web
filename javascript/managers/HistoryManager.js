/**********************************************************************
 * Project           : Circuit Solver
 * File		        : HistoryManager.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This class is used to observe any changes in the elements. It will
 *                   handle the undo and redo capabilities.
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
var HistoryManager = /** @class */ (function () {
    function HistoryManager() {
        /* A variable to keep track of the changes of the system */
        this.history = [];
        /* History index */
        this.history_index = -1;
        /* A variable to keep track of the changes of the system */
        this.history = [];
        /* History index */
        this.history_index = -1;
    }
    /* Master function to handle the main logic for adding new history events */
    HistoryManager.prototype.watch = function () {
        if (global.HISTORY_MANAGER['packet'].length > 0) {
            this.push.apply(this, global.HISTORY_MANAGER['packet']);
            global.HISTORY_MANAGER['packet'].splice(0, global.HISTORY_MANAGER['packet'].length);
        }
    };
    /* A request to update the history */
    HistoryManager.prototype.push = function () {
        var packet = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            packet[_i] = arguments[_i];
        }
        if (!global.SIGNAL_ADD_ELEMENT && !global.SIGNAL_HISTORY_LOCK) {
            /* Logic to prevent multiples of the same events from being registered. */
            if (this.history.length > 0) {
                var last_history_index = this.history.length - 1;
                if (this.history[last_history_index] != packet) {
                    /* If we're back in time, remove all the future events that might have taken place */
                    if (this.history_index > -1) {
                        this.history.splice(this.history_index + 1, this.history.length - this.history_index);
                    }
                    /* Push the new event and update the history index. */
                    this.history.push(packet);
                    this.history_index = this.history.length - 1;
                }
            }
            else {
                /* If we're back in time, remove all the future events that might have taken place */
                if (this.history_index > -1) {
                    this.history.splice(this.history_index + 1, this.history.length - this.history_index);
                }
                /* Push the new event and update the history index. */
                this.history.push(packet);
                this.history_index = this.history.length - 1;
            }
        }
    };
    /* Going back in time */
    HistoryManager.prototype.undo = function () {
        if (this.history_index > 0) {
            this.history_index--;
            engine_functions.parse_elements(this.history[this.history_index]);
        }
    };
    /* Going forward in time */
    HistoryManager.prototype.redo = function () {
        if (this.history_index < this.history.length - 1) {
            this.history_index++;
            engine_functions.parse_elements(this.history[this.history_index]);
        }
    };
    /* Erase all history */
    HistoryManager.prototype.clear = function () {
        this.history.splice(0, this.history.length);
    };
    return HistoryManager;
}());
