/**********************************************************************
 * Project           : Circuit Solver
 * File		        : ScopeManager.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This class handles the resources for the scope display.
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
class ScopeManager {
	public MAX_ENTRIES: number;
	public ENTRY: Array<SCOPE_ENTRY_T>;
	public index: number;
	public met_max: number;
	public iteration_size: number;
	public v_side_1: number;
	public v_side_2: number;
	public curr: number;
	public voltage: number;
	public power: number;
	constructor() {
		this.MAX_ENTRIES = 3;
		this.ENTRY = [];
		this.index = -1;
		this.met_max = -1;
		this.iteration_size = -1;
		this.v_side_1 = 0;
		this.v_side_2 = 0;
		this.curr = -1;
		this.voltage = -1;
		this.power = -1;
	}
	/* Clear all entries. */
	clear_entries(): void {
		this.ENTRY.splice(0, this.ENTRY.length);
	}
	/* Automatically generate the units of the scope based on the type of meter. */
	get_units(index: number): string {
		if (index > -1 && index < this.ENTRY.length) {
			if (this.ENTRY[index]['element_type'] === global.TYPE_VOLTMETER) {
				return global.PROPERTY_VOLTMETER['units'];
			} else if (this.ENTRY[index]['element_type'] === global.TYPE_AMMETER) {
				return global.PROPERTY_AMMETER['units'];
			} else if (this.ENTRY[index]['element_type'] === global.TYPE_OHMMETER) {
				return global.PROPERTY_OHMMETER['units'];
			} else if (this.ENTRY[index]['element_type'] === global.TYPE_WATTMETER) {
				return global.PROPERTY_WATTMETER['units'];
			}
		}
		return '';
	}
	/* Generate the scope name, i.e. "VM1", tag + id */
	get_scope_name(index: number): string {
		if (index > -1 && index < this.ENTRY.length) {
			return this.ENTRY[index]['element_tag'] + this.ENTRY[index]['element_id'];
		}
		return '';
	}
	/* Check to see if a meter is in the list of entries. */
	find_entry(id: number, type: number): boolean {
		for (var i: number = 0; i < this.ENTRY.length; i++) {
			if (this.ENTRY[i]['element_type'] === type && this.ENTRY[i]['element_id'] === id) {
				return true;
			}
		}
		return false;
	}
	/* Grab the index of the meter is it is within the list of entries. */
	find_entry_index(id: number, type: number): number {
		for (var i: number = 0; i < this.ENTRY.length; i++) {
			if (this.ENTRY[i]['element_type'] === type && this.ENTRY[i]['element_id'] === id) {
				return i;
			}
		}
		return -1;
	}
	/* A quick check to see if an element is a meter type or not. */
	is_meter(type: number): boolean {
		return type === global.TYPE_VOLTMETER || type === global.TYPE_OHMMETER || type === global.TYPE_AMMETER || type === global.TYPE_WATTMETER;
	}
	/* Request a meter to be added to the list of entries. */
	push(id: number, type: number, tag: string): void {
		if (this.is_meter(type)) {
			if (this.ENTRY.length < this.MAX_ENTRIES) {
				if (!this.find_entry(id, type)) {
					this.ENTRY.push({
						/* The id of the element (should be the same as elm.properties.id) */
						element_id: id,
						/* The type of the element (should be the same as elm.properties.type) */
						element_type: type,
						/* The tag of the element (should be the same as property.tag) */
						element_tag: tag
					});
				}
			} else {
				toast.set_text('SCOPE LIMIT = {' + this.MAX_ENTRIES + '}');
				toast.show();
			}
		} else {
			/* This should never fire unless we make a mistake :> */
		}
	}
	/* Remove a meter from the list of entries based on its id and type (unique combination) */
	remove(id: number, type: number): void {
		let index: number = this.find_entry_index(id, type);
		if (index != -1) {
			graph_window.reset_trace(index);
			this.ENTRY.splice(index, 1);
		}
	}
	/* Automatically update the scopes when the system is simulating. It will add the new
  solutions values into the scope trace. If a meter is connected to the graph trace it will
  update that as well. */
	update_scopes(): void {
		this.index = -1;
		this.met_max = global.meter_max();
		this.iteration_size = Math.max(this.met_max, this.ENTRY.length);
		this.v_side_1 = 0;
		this.v_side_2 = 0;
		for (var i: number = 0; i < this.iteration_size; i++) {
			if (i < this.ENTRY.length) {
				if (this.ENTRY[i]['element_type'] === global.TYPE_VOLTMETER) {
					this.index = engine_functions.get_voltmeter(this.ENTRY[i]['element_id']);
					if (this.index > -1 && this.index < voltmeters.length) {
						this.push_to_graph(i, engine_functions.get_voltage(voltmeters[this.index].elm.n1, voltmeters[this.index].elm.n2), global.simulation_time);
					}
				} else if (this.ENTRY[i]['element_type'] === global.TYPE_AMMETER) {
					this.index = engine_functions.get_ammeter(this.ENTRY[i]['element_id']);
					if (this.index > -1 && this.index < ammeters.length) {
						this.push_to_graph(i, matrix_x[ammeters[this.index].get_simulation_index()][0], global.simulation_time);
					}
				} else if (this.ENTRY[i]['element_type'] === global.TYPE_OHMMETER) {
					this.index = engine_functions.get_ohmmeter(this.ENTRY[i]['element_id']);
					if (this.index > -1 && this.index < ohmmeters.length) {
						this.push_to_graph(
							i,
							Math.abs(engine_functions.get_voltage(ohmmeters[this.index].elm.n1, ohmmeters[this.index].elm.n2) / matrix_x[ohmmeters[this.index].get_simulation_index()][0]),
							global.simulation_time
						);
					}
				} else if (this.ENTRY[i]['element_type'] === global.TYPE_WATTMETER) {
					this.index = engine_functions.get_wattmeter(this.ENTRY[i]['element_id']);
					if (this.index > -1 && this.index < wattmeters.length) {
						this.v_side_1 = Math.abs(engine_functions.get_voltage(wattmeters[this.index].elm.n1, -1));
						this.v_side_2 = Math.abs(engine_functions.get_voltage(wattmeters[this.index].elm.n2, -1));
						this.curr = (this.v_side_1 - this.v_side_2) / global.settings.WIRE_RESISTANCE;
						this.voltage = Math.max(this.v_side_1, this.v_side_1);
						this.power = this.curr * this.voltage;
						this.push_to_graph(i, this.power, global.simulation_time);
					}
				}
			}
			/* #METER_TAG# */
			if (i < voltmeters.length) {
				/* Push to the element. */
				voltmeters[i].push_voltage(engine_functions.get_voltage(voltmeters[i].elm.n1, voltmeters[i].elm.n2));
			}
			if (i < ammeters.length) {
				/* Push to the element. */
				if (ammeters[i].get_simulation_index() < matrix_x.length) {
					ammeters[i].push_current(matrix_x[ammeters[i].get_simulation_index()][0]);
				}
			}
			if (i < ohmmeters.length) {
				/* Push to the element. */
				if (ohmmeters[i].get_simulation_index() < matrix_x.length) {
					ohmmeters[i].push_voltage_current(engine_functions.get_voltage(ohmmeters[i].elm.n1, ohmmeters[i].elm.n2), matrix_x[ohmmeters[i].get_simulation_index()][0]);
				}
			}
			if (i < wattmeters.length) {
				/* Push to the element. */
				if (wattmeters[i].get_simulation_index() < matrix_x.length) {
					this.v_side_1 = Math.abs(engine_functions.get_voltage(wattmeters[i].elm.n1, -1));
					this.v_side_2 = Math.abs(engine_functions.get_voltage(wattmeters[i].elm.n2, -1));
					wattmeters[i].push_voltage(this.v_side_1, this.v_side_2);
				}
			}
		}
	}
	/* Push the meter values tothe graph window. */
	push_to_graph(selector: number, value: number, time: number): void {
		if (selector === 0) {
			/* Push to the scope A. */
			graph_window.push_trace_a(value, time);
		} else if (selector === 1) {
			/* Push to the scope B. */
			graph_window.push_trace_b(value, time);
		} else if (selector === 2) {
			/* Push to the scope C. */
			graph_window.push_trace_c(value, time);
		}
	}
}