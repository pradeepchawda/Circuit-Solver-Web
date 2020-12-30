"use strict";
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
class HistoryManager {
	/* A variable to keep track of the changes of the system */
	public history: Array<string>;
	/* History index */
	public history_index: number;
	constructor() {
		/* A variable to keep track of the changes of the system */
		this.history = [];
		/* History index */
		this.history_index = -1;
	}
	/* Master function to handle the main logic for adding new history events */
	watch(): void {
		if (global.HISTORY_MANAGER['packet'].length > 0) {
			this.push(global.HISTORY_MANAGER['packet'][0]);
			global.HISTORY_MANAGER['packet'].splice(0, 1);
		}
	}
	/* A request to update the history */
	push(packet: string): void {
		if (!global.SIGNAL_ADD_ELEMENT && !global.SIGNAL_HISTORY_LOCK) {
			/* Logic to prevent multiples of the same events from being registered. */
			if (this.history.length > 0) {
				let last_history_index = this.history.length - 1;
				if (this.history[last_history_index] !== packet) {
					/* If we're back in time, remove all the future events that might have taken place */
					if (this.history_index > -1) {
						this.history.splice(this.history_index + 1, this.history.length - this.history_index);
					}
					/* Push the new event and update the history index. */
					this.history.push(packet);
					this.history_index = this.history.length - 1;
				}
			} else {
				/* If we're back in time, remove all the future events that might have taken place */
				if (this.history_index > -1) {
					this.history.splice(this.history_index + 1, this.history.length - this.history_index);
				}
				/* Push the new event and update the history index. */
				this.history.push(packet);
				this.history_index = this.history.length - 1;
			}
		}
	}
	/* Going back in time */
	undo(): void {
		if (this.history_index > 0) {
			this.history_index--;
			engine_functions.parse_elements(this.history[this.history_index]);
		}
	}
	/* Going forward in time */
	redo(): void {
		if (this.history_index < this.history.length - 1) {
			this.history_index++;
			engine_functions.parse_elements(this.history[this.history_index]);
		}
	}
	/* Erase all history */
	clear(): void {
		this.history.splice(0, this.history.length);
	}
}