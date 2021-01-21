'use strict';
class WireManager {
	public wire_id: number;
	public unique_wire: boolean;
	constructor() {
		this.wire_id = -1;
		this.unique_wire = true;
	}
	watch(): void {
		if (global.WIRE_BUILDER['step'] > 0) {
			if (global.WIRE_BUILDER['step'] >= 2) {
				if (
					(global.WIRE_BUILDER['n1'] !== global.WIRE_BUILDER['n2'] && !(global.WIRE_BUILDER['id1'] === global.WIRE_BUILDER['id2'] && global.WIRE_BUILDER['type1'] === global.WIRE_BUILDER['type2'])) ||
					this.exclude_nmosfet() ||
					this.exclude_opamps() ||
					this.exclude_vcvs() ||
					this.exclude_vccs() ||
					this.exclude_ccvs() ||
					this.exclude_cccs() ||
					this.exclude_pmosfet() ||
					this.exclude_npn() ||
					this.exclude_pnp() ||
					this.exclude_dffs()
				) {
					this.wire_id = engine_functions.get_wire_assignment();
					this.unique_wire = true;
					for (var i: number = 0; i < wires.length; i++) {
						if (
							(wires[i].elm.n1 === global.WIRE_BUILDER['n1'] && wires[i].elm.n2 === global.WIRE_BUILDER['n2']) ||
							(wires[i].elm.n2 === global.WIRE_BUILDER['n1'] && wires[i].elm.n1 === global.WIRE_BUILDER['n2'])
						) {
							this.unique_wire = false;
							break;
						}
					}
					if (this.unique_wire) {
						wires.push(new Wire(global.TYPE_WIRE, this.wire_id, global.copy(global.WIRE_BUILDER['n1']), global.copy(global.WIRE_BUILDER['n2'])));
						let index: number = engine_functions.get_wire(this.wire_id);
						this.handle_wire_references(this.wire_id);
						if (index > -1 && index < wires.length) {
							wires[index].select();
						}
						global.SIGNAL_WIRE_CREATED = true;
					}
				} else {
					if (global.WIRE_BUILDER['n1'] !== global.WIRE_BUILDER['n2'] && global.WIRE_BUILDER['id1'] === global.WIRE_BUILDER['id2'] && global.WIRE_BUILDER['type1'] === global.WIRE_BUILDER['type2']) {
						toast.set_text(language_manager.CONNECTION_NOT_ALLOWED[global.LANGUAGES[global.LANGUAGE_INDEX]] + '.');
						toast.show();
					}
				}
				this.reset_wire_builder();
			}
		}
	}
	exclude_nmosfet(): boolean {
		return global.WIRE_BUILDER['type1'] === global.TYPE_NMOS && global.WIRE_BUILDER['type2'] === global.TYPE_NMOS;
	}
	exclude_pmosfet(): boolean {
		return global.WIRE_BUILDER['type1'] === global.TYPE_PMOS && global.WIRE_BUILDER['type2'] === global.TYPE_PMOS;
	}
	exclude_npn(): boolean {
		return global.WIRE_BUILDER['type1'] === global.TYPE_NPN && global.WIRE_BUILDER['type2'] === global.TYPE_NPN;
	}
	exclude_pnp(): boolean {
		return global.WIRE_BUILDER['type1'] === global.TYPE_PNP && global.WIRE_BUILDER['type2'] === global.TYPE_PNP;
	}
	exclude_opamps(): boolean {
		return global.WIRE_BUILDER['type1'] === global.TYPE_OPAMP && global.WIRE_BUILDER['type2'] === global.TYPE_OPAMP;
	}
	exclude_vcvs(): boolean {
		return global.WIRE_BUILDER['type1'] === global.TYPE_VCVS && global.WIRE_BUILDER['type2'] === global.TYPE_VCVS;
	}
	exclude_vccs(): boolean {
		return global.WIRE_BUILDER['type1'] === global.TYPE_VCCS && global.WIRE_BUILDER['type2'] === global.TYPE_VCCS;
	}
	exclude_ccvs(): boolean {
		return global.WIRE_BUILDER['type1'] === global.TYPE_CCVS && global.WIRE_BUILDER['type2'] === global.TYPE_CCVS;
	}
	exclude_cccs(): boolean {
		return global.WIRE_BUILDER['type1'] === global.TYPE_CCCS && global.WIRE_BUILDER['type2'] === global.TYPE_CCCS;
	}
	exclude_dffs(): boolean {
		return global.WIRE_BUILDER['type1'] === global.TYPE_DFF && global.WIRE_BUILDER['type2'] === global.TYPE_DFF;
	}
	reset_wire_builder(): void {
		if (global.WIRE_BUILDER['n1'] !== -1 || global.WIRE_BUILDER['n2'] !== -1) {
			global.WIRE_BUILDER['n1'] = -1;
			global.WIRE_BUILDER['id1'] = -1;
			global.WIRE_BUILDER['type1'] = -1;
			global.WIRE_BUILDER['anchor_point1'] = -1;
			global.WIRE_BUILDER['linkage1']['wire'] = -1;
			global.WIRE_BUILDER['n2'] = -1;
			global.WIRE_BUILDER['id2'] = -1;
			global.WIRE_BUILDER['type2'] = -1;
			global.WIRE_BUILDER['anchor_point2'] = -1;
			global.WIRE_BUILDER['linkage2']['wire'] = -1;
			global.WIRE_BUILDER['step'] = 0;
		}
	}
	handle_wire_references(wire_id: number): void {
		/* #INSERT_GENERATE_WIRE_GENERATION# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		if (global.WIRE_BUILDER['type1'] === global.TYPE_RESISTOR) {
			var index: number = engine_functions.get_resistor(global.WIRE_BUILDER['id1']);
			if (index < resistors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				resistors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				resistors[index].unanchor_wires();
				resistors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_CAPACITOR) {
			var index: number = engine_functions.get_capacitor(global.WIRE_BUILDER['id1']);
			if (index < capacitors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				capacitors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				capacitors[index].unanchor_wires();
				capacitors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_INDUCTOR) {
			var index: number = engine_functions.get_inductor(global.WIRE_BUILDER['id1']);
			if (index < inductors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				inductors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				inductors[index].unanchor_wires();
				inductors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_GROUND) {
			var index: number = engine_functions.get_ground(global.WIRE_BUILDER['id1']);
			if (index < grounds.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				grounds[index].push_reference(global.copy(global.WIRE_REFERENCE));
				grounds[index].unanchor_wires();
				grounds[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_DCSOURCE) {
			var index: number = engine_functions.get_dcsource(global.WIRE_BUILDER['id1']);
			if (index < dcsources.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				dcsources[index].push_reference(global.copy(global.WIRE_REFERENCE));
				dcsources[index].unanchor_wires();
				dcsources[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_DCCURRENT) {
			var index: number = engine_functions.get_dccurrent(global.WIRE_BUILDER['id1']);
			if (index < dccurrents.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				dccurrents[index].push_reference(global.copy(global.WIRE_REFERENCE));
				dccurrents[index].unanchor_wires();
				dccurrents[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_ACSOURCE) {
			var index: number = engine_functions.get_acsource(global.WIRE_BUILDER['id1']);
			if (index < acsources.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				acsources[index].push_reference(global.copy(global.WIRE_REFERENCE));
				acsources[index].unanchor_wires();
				acsources[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_ACCURRENT) {
			var index: number = engine_functions.get_accurrent(global.WIRE_BUILDER['id1']);
			if (index < accurrents.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				accurrents[index].push_reference(global.copy(global.WIRE_REFERENCE));
				accurrents[index].unanchor_wires();
				accurrents[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_SQUAREWAVE) {
			var index: number = engine_functions.get_squarewave(global.WIRE_BUILDER['id1']);
			if (index < squarewaves.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				squarewaves[index].push_reference(global.copy(global.WIRE_REFERENCE));
				squarewaves[index].unanchor_wires();
				squarewaves[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_SAW) {
			var index: number = engine_functions.get_sawwave(global.WIRE_BUILDER['id1']);
			if (index < sawwaves.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				sawwaves[index].push_reference(global.copy(global.WIRE_REFERENCE));
				sawwaves[index].unanchor_wires();
				sawwaves[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_TRI) {
			var index: number = engine_functions.get_trianglewave(global.WIRE_BUILDER['id1']);
			if (index < trianglewaves.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				trianglewaves[index].push_reference(global.copy(global.WIRE_REFERENCE));
				trianglewaves[index].unanchor_wires();
				trianglewaves[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_CONSTANT) {
			var index: number = engine_functions.get_constant(global.WIRE_BUILDER['id1']);
			if (index < constants.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				constants[index].push_reference(global.copy(global.WIRE_REFERENCE));
				constants[index].unanchor_wires();
				constants[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_NET) {
			var index: number = engine_functions.get_net(global.WIRE_BUILDER['id1']);
			if (index < nets.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				nets[index].push_reference(global.copy(global.WIRE_REFERENCE));
				nets[index].unanchor_wires();
				nets[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_NOTE) {
			var index: number = engine_functions.get_note(global.WIRE_BUILDER['id1']);
			if (index < notes.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				notes[index].push_reference(global.copy(global.WIRE_REFERENCE));
				notes[index].unanchor_wires();
				notes[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_RAIL) {
			var index: number = engine_functions.get_rail(global.WIRE_BUILDER['id1']);
			if (index < rails.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				rails[index].push_reference(global.copy(global.WIRE_REFERENCE));
				rails[index].unanchor_wires();
				rails[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_VOLTMETER) {
			var index: number = engine_functions.get_voltmeter(global.WIRE_BUILDER['id1']);
			if (index < voltmeters.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				voltmeters[index].push_reference(global.copy(global.WIRE_REFERENCE));
				voltmeters[index].unanchor_wires();
				voltmeters[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_OHMMETER) {
			var index: number = engine_functions.get_ohmmeter(global.WIRE_BUILDER['id1']);
			if (index < ohmmeters.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				ohmmeters[index].push_reference(global.copy(global.WIRE_REFERENCE));
				ohmmeters[index].unanchor_wires();
				ohmmeters[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_AMMETER) {
			var index: number = engine_functions.get_ammeter(global.WIRE_BUILDER['id1']);
			if (index < ammeters.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				ammeters[index].push_reference(global.copy(global.WIRE_REFERENCE));
				ammeters[index].unanchor_wires();
				ammeters[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_WATTMETER) {
			var index: number = engine_functions.get_wattmeter(global.WIRE_BUILDER['id1']);
			if (index < wattmeters.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				wattmeters[index].push_reference(global.copy(global.WIRE_REFERENCE));
				wattmeters[index].unanchor_wires();
				wattmeters[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_FUSE) {
			var index: number = engine_functions.get_fuse(global.WIRE_BUILDER['id1']);
			if (index < fuses.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				fuses[index].push_reference(global.copy(global.WIRE_REFERENCE));
				fuses[index].unanchor_wires();
				fuses[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_SPST) {
			var index: number = engine_functions.get_spst(global.WIRE_BUILDER['id1']);
			if (index < spsts.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				spsts[index].push_reference(global.copy(global.WIRE_REFERENCE));
				spsts[index].unanchor_wires();
				spsts[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_SPDT) {
			var index: number = engine_functions.get_spdt(global.WIRE_BUILDER['id1']);
			if (index < spdts.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				spdts[index].push_reference(global.copy(global.WIRE_REFERENCE));
				spdts[index].unanchor_wires();
				spdts[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_NOT) {
			var index: number = engine_functions.get_not(global.WIRE_BUILDER['id1']);
			if (index < nots.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				nots[index].push_reference(global.copy(global.WIRE_REFERENCE));
				nots[index].unanchor_wires();
				nots[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_DIODE) {
			var index: number = engine_functions.get_diode(global.WIRE_BUILDER['id1']);
			if (index < diodes.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				diodes[index].push_reference(global.copy(global.WIRE_REFERENCE));
				diodes[index].unanchor_wires();
				diodes[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_LED) {
			var index: number = engine_functions.get_led(global.WIRE_BUILDER['id1']);
			if (index < leds.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				leds[index].push_reference(global.copy(global.WIRE_REFERENCE));
				leds[index].unanchor_wires();
				leds[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_ZENER) {
			var index: number = engine_functions.get_zener(global.WIRE_BUILDER['id1']);
			if (index < zeners.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				zeners[index].push_reference(global.copy(global.WIRE_REFERENCE));
				zeners[index].unanchor_wires();
				zeners[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_POTENTIOMETER) {
			var index: number = engine_functions.get_potentiometer(global.WIRE_BUILDER['id1']);
			if (index < potentiometers.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				potentiometers[index].push_reference(global.copy(global.WIRE_REFERENCE));
				potentiometers[index].unanchor_wires();
				potentiometers[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_AND) {
			var index: number = engine_functions.get_and(global.WIRE_BUILDER['id1']);
			if (index < ands.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				ands[index].push_reference(global.copy(global.WIRE_REFERENCE));
				ands[index].unanchor_wires();
				ands[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_OR) {
			var index: number = engine_functions.get_or(global.WIRE_BUILDER['id1']);
			if (index < ors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				ors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				ors[index].unanchor_wires();
				ors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_NAND) {
			var index: number = engine_functions.get_nand(global.WIRE_BUILDER['id1']);
			if (index < nands.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				nands[index].push_reference(global.copy(global.WIRE_REFERENCE));
				nands[index].unanchor_wires();
				nands[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_NOR) {
			var index: number = engine_functions.get_nor(global.WIRE_BUILDER['id1']);
			if (index < nors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				nors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				nors[index].unanchor_wires();
				nors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_XOR) {
			var index: number = engine_functions.get_xor(global.WIRE_BUILDER['id1']);
			if (index < xors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				xors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				xors[index].unanchor_wires();
				xors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_XNOR) {
			var index: number = engine_functions.get_xnor(global.WIRE_BUILDER['id1']);
			if (index < xnors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				xnors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				xnors[index].unanchor_wires();
				xnors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_DFF) {
			var index: number = engine_functions.get_dff(global.WIRE_BUILDER['id1']);
			if (index < dffs.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				dffs[index].push_reference(global.copy(global.WIRE_REFERENCE));
				dffs[index].unanchor_wires();
				dffs[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_VSAT) {
			var index: number = engine_functions.get_vsat(global.WIRE_BUILDER['id1']);
			if (index < vsats.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				vsats[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vsats[index].unanchor_wires();
				vsats[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_ADD) {
			var index: number = engine_functions.get_adder(global.WIRE_BUILDER['id1']);
			if (index < adders.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				adders[index].push_reference(global.copy(global.WIRE_REFERENCE));
				adders[index].unanchor_wires();
				adders[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_SUB) {
			var index: number = engine_functions.get_subtractor(global.WIRE_BUILDER['id1']);
			if (index < subtractors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				subtractors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				subtractors[index].unanchor_wires();
				subtractors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_MUL) {
			var index: number = engine_functions.get_multiplier(global.WIRE_BUILDER['id1']);
			if (index < multipliers.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				multipliers[index].push_reference(global.copy(global.WIRE_REFERENCE));
				multipliers[index].unanchor_wires();
				multipliers[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_DIV) {
			var index: number = engine_functions.get_divider(global.WIRE_BUILDER['id1']);
			if (index < dividers.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				dividers[index].push_reference(global.copy(global.WIRE_REFERENCE));
				dividers[index].unanchor_wires();
				dividers[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_GAIN) {
			var index: number = engine_functions.get_gain(global.WIRE_BUILDER['id1']);
			if (index < gains.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				gains[index].push_reference(global.copy(global.WIRE_REFERENCE));
				gains[index].unanchor_wires();
				gains[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_ABS) {
			var index: number = engine_functions.get_absval(global.WIRE_BUILDER['id1']);
			if (index < absvals.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				absvals[index].push_reference(global.copy(global.WIRE_REFERENCE));
				absvals[index].unanchor_wires();
				absvals[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_VCSW) {
			var index: number = engine_functions.get_vcsw(global.WIRE_BUILDER['id1']);
			if (index < vcsws.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				vcsws[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vcsws[index].unanchor_wires();
				vcsws[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_VCVS) {
			var index: number = engine_functions.get_vcvs(global.WIRE_BUILDER['id1']);
			if (index < vcvss.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				vcvss[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vcvss[index].unanchor_wires();
				vcvss[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_VCCS) {
			var index: number = engine_functions.get_vccs(global.WIRE_BUILDER['id1']);
			if (index < vccss.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				vccss[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vccss[index].unanchor_wires();
				vccss[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_CCCS) {
			var index: number = engine_functions.get_cccs(global.WIRE_BUILDER['id1']);
			if (index < cccss.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				cccss[index].push_reference(global.copy(global.WIRE_REFERENCE));
				cccss[index].unanchor_wires();
				cccss[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_CCVS) {
			var index: number = engine_functions.get_ccvs(global.WIRE_BUILDER['id1']);
			if (index < ccvss.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				ccvss[index].push_reference(global.copy(global.WIRE_REFERENCE));
				ccvss[index].unanchor_wires();
				ccvss[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_OPAMP) {
			var index: number = engine_functions.get_opamp(global.WIRE_BUILDER['id1']);
			if (index < opamps.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				opamps[index].push_reference(global.copy(global.WIRE_REFERENCE));
				opamps[index].unanchor_wires();
				opamps[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_NMOS) {
			var index: number = engine_functions.get_nmosfet(global.WIRE_BUILDER['id1']);
			if (index < nmosfets.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				nmosfets[index].push_reference(global.copy(global.WIRE_REFERENCE));
				nmosfets[index].unanchor_wires();
				nmosfets[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_PMOS) {
			var index: number = engine_functions.get_pmosfet(global.WIRE_BUILDER['id1']);
			if (index < pmosfets.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				pmosfets[index].push_reference(global.copy(global.WIRE_REFERENCE));
				pmosfets[index].unanchor_wires();
				pmosfets[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_NPN) {
			var index: number = engine_functions.get_npn(global.WIRE_BUILDER['id1']);
			if (index < npns.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				npns[index].push_reference(global.copy(global.WIRE_REFERENCE));
				npns[index].unanchor_wires();
				npns[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_PNP) {
			var index: number = engine_functions.get_pnp(global.WIRE_BUILDER['id1']);
			if (index < pnps.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				pnps[index].push_reference(global.copy(global.WIRE_REFERENCE));
				pnps[index].unanchor_wires();
				pnps[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_ADC) {
			var index: number = engine_functions.get_adc(global.WIRE_BUILDER['id1']);
			if (index < adcs.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				adcs[index].push_reference(global.copy(global.WIRE_REFERENCE));
				adcs[index].unanchor_wires();
				adcs[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_DAC) {
			var index: number = engine_functions.get_dac(global.WIRE_BUILDER['id1']);
			if (index < dacs.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				dacs[index].push_reference(global.copy(global.WIRE_REFERENCE));
				dacs[index].unanchor_wires();
				dacs[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_SAH) {
			var index: number = engine_functions.get_samplers(global.WIRE_BUILDER['id1']);
			if (index < sandhs.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				sandhs[index].push_reference(global.copy(global.WIRE_REFERENCE));
				sandhs[index].unanchor_wires();
				sandhs[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_PWM) {
			var index: number = engine_functions.get_pwm(global.WIRE_BUILDER['id1']);
			if (index < pwms.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				pwms[index].push_reference(global.copy(global.WIRE_REFERENCE));
				pwms[index].unanchor_wires();
				pwms[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_INTEGRATOR) {
			var index: number = engine_functions.get_integrator(global.WIRE_BUILDER['id1']);
			if (index < integrators.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				integrators[index].push_reference(global.copy(global.WIRE_REFERENCE));
				integrators[index].unanchor_wires();
				integrators[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_DIFFERENTIATOR) {
			var index: number = engine_functions.get_differentiator(global.WIRE_BUILDER['id1']);
			if (index < differentiators.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				differentiators[index].push_reference(global.copy(global.WIRE_REFERENCE));
				differentiators[index].unanchor_wires();
				differentiators[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_LPF) {
			var index: number = engine_functions.get_lowpass(global.WIRE_BUILDER['id1']);
			if (index < lowpasses.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				lowpasses[index].push_reference(global.copy(global.WIRE_REFERENCE));
				lowpasses[index].unanchor_wires();
				lowpasses[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_HPF) {
			var index: number = engine_functions.get_highpass(global.WIRE_BUILDER['id1']);
			if (index < highpasses.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				highpasses[index].push_reference(global.copy(global.WIRE_REFERENCE));
				highpasses[index].unanchor_wires();
				highpasses[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_REL) {
			var index: number = engine_functions.get_relay(global.WIRE_BUILDER['id1']);
			if (index < relays.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				relays[index].push_reference(global.copy(global.WIRE_REFERENCE));
				relays[index].unanchor_wires();
				relays[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_PID) {
			var index: number = engine_functions.get_pid(global.WIRE_BUILDER['id1']);
			if (index < pids.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				pids[index].push_reference(global.copy(global.WIRE_REFERENCE));
				pids[index].unanchor_wires();
				pids[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_LUT) {
			var index: number = engine_functions.get_lut(global.WIRE_BUILDER['id1']);
			if (index < luts.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				luts[index].push_reference(global.copy(global.WIRE_REFERENCE));
				luts[index].unanchor_wires();
				luts[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_VCR) {
			var index: number = engine_functions.get_vcr(global.WIRE_BUILDER['id1']);
			if (index < vcrs.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				vcrs[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vcrs[index].unanchor_wires();
				vcrs[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_VCCA) {
			var index: number = engine_functions.get_vcca(global.WIRE_BUILDER['id1']);
			if (index < vccas.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				vccas[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vccas[index].unanchor_wires();
				vccas[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_VCL) {
			var index: number = engine_functions.get_vcl(global.WIRE_BUILDER['id1']);
			if (index < vcls.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				vcls[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vcls[index].unanchor_wires();
				vcls[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_GRT) {
			var index: number = engine_functions.get_grt(global.WIRE_BUILDER['id1']);
			if (index < grts.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				grts[index].push_reference(global.copy(global.WIRE_REFERENCE));
				grts[index].unanchor_wires();
				grts[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_TPTZ) {
			var index: number = engine_functions.get_tptz(global.WIRE_BUILDER['id1']);
			if (index < tptzs.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				tptzs[index].push_reference(global.copy(global.WIRE_REFERENCE));
				tptzs[index].unanchor_wires();
				tptzs[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type1'] === global.TYPE_TRAN) {
			var index: number = engine_functions.get_transformer(global.WIRE_BUILDER['id1']);
			if (index < transformers.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage1']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point1']);
				transformers[index].push_reference(global.copy(global.WIRE_REFERENCE));
				transformers[index].unanchor_wires();
				transformers[index].anchor_wires();
			}
		}
		if (global.WIRE_BUILDER['type2'] === global.TYPE_RESISTOR) {
			var index: number = engine_functions.get_resistor(global.WIRE_BUILDER['id2']);
			if (index < resistors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				resistors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				resistors[index].unanchor_wires();
				resistors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_CAPACITOR) {
			var index: number = engine_functions.get_capacitor(global.WIRE_BUILDER['id2']);
			if (index < capacitors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				capacitors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				capacitors[index].unanchor_wires();
				capacitors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_INDUCTOR) {
			var index: number = engine_functions.get_inductor(global.WIRE_BUILDER['id2']);
			if (index < inductors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				inductors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				inductors[index].unanchor_wires();
				inductors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_GROUND) {
			var index: number = engine_functions.get_ground(global.WIRE_BUILDER['id2']);
			if (index < grounds.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				grounds[index].push_reference(global.copy(global.WIRE_REFERENCE));
				grounds[index].unanchor_wires();
				grounds[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_DCSOURCE) {
			var index: number = engine_functions.get_dcsource(global.WIRE_BUILDER['id2']);
			if (index < dcsources.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				dcsources[index].push_reference(global.copy(global.WIRE_REFERENCE));
				dcsources[index].unanchor_wires();
				dcsources[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_DCCURRENT) {
			var index: number = engine_functions.get_dccurrent(global.WIRE_BUILDER['id2']);
			if (index < dccurrents.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				dccurrents[index].push_reference(global.copy(global.WIRE_REFERENCE));
				dccurrents[index].unanchor_wires();
				dccurrents[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_ACSOURCE) {
			var index: number = engine_functions.get_acsource(global.WIRE_BUILDER['id2']);
			if (index < acsources.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				acsources[index].push_reference(global.copy(global.WIRE_REFERENCE));
				acsources[index].unanchor_wires();
				acsources[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_ACCURRENT) {
			var index: number = engine_functions.get_accurrent(global.WIRE_BUILDER['id2']);
			if (index < accurrents.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				accurrents[index].push_reference(global.copy(global.WIRE_REFERENCE));
				accurrents[index].unanchor_wires();
				accurrents[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_SQUAREWAVE) {
			var index: number = engine_functions.get_squarewave(global.WIRE_BUILDER['id2']);
			if (index < squarewaves.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				squarewaves[index].push_reference(global.copy(global.WIRE_REFERENCE));
				squarewaves[index].unanchor_wires();
				squarewaves[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_SAW) {
			var index: number = engine_functions.get_sawwave(global.WIRE_BUILDER['id2']);
			if (index < sawwaves.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				sawwaves[index].push_reference(global.copy(global.WIRE_REFERENCE));
				sawwaves[index].unanchor_wires();
				sawwaves[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_TRI) {
			var index: number = engine_functions.get_trianglewave(global.WIRE_BUILDER['id2']);
			if (index < trianglewaves.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				trianglewaves[index].push_reference(global.copy(global.WIRE_REFERENCE));
				trianglewaves[index].unanchor_wires();
				trianglewaves[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_CONSTANT) {
			var index: number = engine_functions.get_constant(global.WIRE_BUILDER['id2']);
			if (index < constants.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				constants[index].push_reference(global.copy(global.WIRE_REFERENCE));
				constants[index].unanchor_wires();
				constants[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_NET) {
			var index: number = engine_functions.get_net(global.WIRE_BUILDER['id2']);
			if (index < nets.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				nets[index].push_reference(global.copy(global.WIRE_REFERENCE));
				nets[index].unanchor_wires();
				nets[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_NOTE) {
			var index: number = engine_functions.get_note(global.WIRE_BUILDER['id2']);
			if (index < notes.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				notes[index].push_reference(global.copy(global.WIRE_REFERENCE));
				notes[index].unanchor_wires();
				notes[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_RAIL) {
			var index: number = engine_functions.get_rail(global.WIRE_BUILDER['id2']);
			if (index < rails.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				rails[index].push_reference(global.copy(global.WIRE_REFERENCE));
				rails[index].unanchor_wires();
				rails[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_VOLTMETER) {
			var index: number = engine_functions.get_voltmeter(global.WIRE_BUILDER['id2']);
			if (index < voltmeters.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				voltmeters[index].push_reference(global.copy(global.WIRE_REFERENCE));
				voltmeters[index].unanchor_wires();
				voltmeters[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_OHMMETER) {
			var index: number = engine_functions.get_ohmmeter(global.WIRE_BUILDER['id2']);
			if (index < ohmmeters.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				ohmmeters[index].push_reference(global.copy(global.WIRE_REFERENCE));
				ohmmeters[index].unanchor_wires();
				ohmmeters[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_AMMETER) {
			var index: number = engine_functions.get_ammeter(global.WIRE_BUILDER['id2']);
			if (index < ammeters.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				ammeters[index].push_reference(global.copy(global.WIRE_REFERENCE));
				ammeters[index].unanchor_wires();
				ammeters[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_WATTMETER) {
			var index: number = engine_functions.get_wattmeter(global.WIRE_BUILDER['id2']);
			if (index < wattmeters.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				wattmeters[index].push_reference(global.copy(global.WIRE_REFERENCE));
				wattmeters[index].unanchor_wires();
				wattmeters[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_FUSE) {
			var index: number = engine_functions.get_fuse(global.WIRE_BUILDER['id2']);
			if (index < fuses.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				fuses[index].push_reference(global.copy(global.WIRE_REFERENCE));
				fuses[index].unanchor_wires();
				fuses[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_SPST) {
			var index: number = engine_functions.get_spst(global.WIRE_BUILDER['id2']);
			if (index < spsts.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				spsts[index].push_reference(global.copy(global.WIRE_REFERENCE));
				spsts[index].unanchor_wires();
				spsts[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_SPDT) {
			var index: number = engine_functions.get_spdt(global.WIRE_BUILDER['id2']);
			if (index < spdts.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				spdts[index].push_reference(global.copy(global.WIRE_REFERENCE));
				spdts[index].unanchor_wires();
				spdts[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_NOT) {
			var index: number = engine_functions.get_not(global.WIRE_BUILDER['id2']);
			if (index < nots.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				nots[index].push_reference(global.copy(global.WIRE_REFERENCE));
				nots[index].unanchor_wires();
				nots[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_DIODE) {
			var index: number = engine_functions.get_diode(global.WIRE_BUILDER['id2']);
			if (index < diodes.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				diodes[index].push_reference(global.copy(global.WIRE_REFERENCE));
				diodes[index].unanchor_wires();
				diodes[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_LED) {
			var index: number = engine_functions.get_led(global.WIRE_BUILDER['id2']);
			if (index < leds.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				leds[index].push_reference(global.copy(global.WIRE_REFERENCE));
				leds[index].unanchor_wires();
				leds[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_ZENER) {
			var index: number = engine_functions.get_zener(global.WIRE_BUILDER['id2']);
			if (index < zeners.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				zeners[index].push_reference(global.copy(global.WIRE_REFERENCE));
				zeners[index].unanchor_wires();
				zeners[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_POTENTIOMETER) {
			var index: number = engine_functions.get_potentiometer(global.WIRE_BUILDER['id2']);
			if (index < potentiometers.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				potentiometers[index].push_reference(global.copy(global.WIRE_REFERENCE));
				potentiometers[index].unanchor_wires();
				potentiometers[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_AND) {
			var index: number = engine_functions.get_and(global.WIRE_BUILDER['id2']);
			if (index < ands.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				ands[index].push_reference(global.copy(global.WIRE_REFERENCE));
				ands[index].unanchor_wires();
				ands[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_OR) {
			var index: number = engine_functions.get_or(global.WIRE_BUILDER['id2']);
			if (index < ors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				ors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				ors[index].unanchor_wires();
				ors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_NAND) {
			var index: number = engine_functions.get_nand(global.WIRE_BUILDER['id2']);
			if (index < nands.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				nands[index].push_reference(global.copy(global.WIRE_REFERENCE));
				nands[index].unanchor_wires();
				nands[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_NOR) {
			var index: number = engine_functions.get_nor(global.WIRE_BUILDER['id2']);
			if (index < nors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				nors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				nors[index].unanchor_wires();
				nors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_XOR) {
			var index: number = engine_functions.get_xor(global.WIRE_BUILDER['id2']);
			if (index < xors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				xors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				xors[index].unanchor_wires();
				xors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_XNOR) {
			var index: number = engine_functions.get_xnor(global.WIRE_BUILDER['id2']);
			if (index < xnors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				xnors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				xnors[index].unanchor_wires();
				xnors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_DFF) {
			var index: number = engine_functions.get_dff(global.WIRE_BUILDER['id2']);
			if (index < dffs.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				dffs[index].push_reference(global.copy(global.WIRE_REFERENCE));
				dffs[index].unanchor_wires();
				dffs[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_VSAT) {
			var index: number = engine_functions.get_vsat(global.WIRE_BUILDER['id2']);
			if (index < vsats.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				vsats[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vsats[index].unanchor_wires();
				vsats[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_ADD) {
			var index: number = engine_functions.get_adder(global.WIRE_BUILDER['id2']);
			if (index < adders.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				adders[index].push_reference(global.copy(global.WIRE_REFERENCE));
				adders[index].unanchor_wires();
				adders[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_SUB) {
			var index: number = engine_functions.get_subtractor(global.WIRE_BUILDER['id2']);
			if (index < subtractors.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				subtractors[index].push_reference(global.copy(global.WIRE_REFERENCE));
				subtractors[index].unanchor_wires();
				subtractors[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_MUL) {
			var index: number = engine_functions.get_multiplier(global.WIRE_BUILDER['id2']);
			if (index < multipliers.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				multipliers[index].push_reference(global.copy(global.WIRE_REFERENCE));
				multipliers[index].unanchor_wires();
				multipliers[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_DIV) {
			var index: number = engine_functions.get_divider(global.WIRE_BUILDER['id2']);
			if (index < dividers.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				dividers[index].push_reference(global.copy(global.WIRE_REFERENCE));
				dividers[index].unanchor_wires();
				dividers[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_GAIN) {
			var index: number = engine_functions.get_gain(global.WIRE_BUILDER['id2']);
			if (index < gains.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				gains[index].push_reference(global.copy(global.WIRE_REFERENCE));
				gains[index].unanchor_wires();
				gains[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_ABS) {
			var index: number = engine_functions.get_absval(global.WIRE_BUILDER['id2']);
			if (index < absvals.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				absvals[index].push_reference(global.copy(global.WIRE_REFERENCE));
				absvals[index].unanchor_wires();
				absvals[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_VCSW) {
			var index: number = engine_functions.get_vcsw(global.WIRE_BUILDER['id2']);
			if (index < vcsws.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				vcsws[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vcsws[index].unanchor_wires();
				vcsws[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_VCVS) {
			var index: number = engine_functions.get_vcvs(global.WIRE_BUILDER['id2']);
			if (index < vcvss.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				vcvss[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vcvss[index].unanchor_wires();
				vcvss[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_VCCS) {
			var index: number = engine_functions.get_vccs(global.WIRE_BUILDER['id2']);
			if (index < vccss.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				vccss[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vccss[index].unanchor_wires();
				vccss[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_CCCS) {
			var index: number = engine_functions.get_cccs(global.WIRE_BUILDER['id2']);
			if (index < cccss.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				cccss[index].push_reference(global.copy(global.WIRE_REFERENCE));
				cccss[index].unanchor_wires();
				cccss[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_CCVS) {
			var index: number = engine_functions.get_ccvs(global.WIRE_BUILDER['id2']);
			if (index < ccvss.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				ccvss[index].push_reference(global.copy(global.WIRE_REFERENCE));
				ccvss[index].unanchor_wires();
				ccvss[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_OPAMP) {
			var index: number = engine_functions.get_opamp(global.WIRE_BUILDER['id2']);
			if (index < opamps.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				opamps[index].push_reference(global.copy(global.WIRE_REFERENCE));
				opamps[index].unanchor_wires();
				opamps[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_NMOS) {
			var index: number = engine_functions.get_nmosfet(global.WIRE_BUILDER['id2']);
			if (index < nmosfets.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				nmosfets[index].push_reference(global.copy(global.WIRE_REFERENCE));
				nmosfets[index].unanchor_wires();
				nmosfets[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_PMOS) {
			var index: number = engine_functions.get_pmosfet(global.WIRE_BUILDER['id2']);
			if (index < pmosfets.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				pmosfets[index].push_reference(global.copy(global.WIRE_REFERENCE));
				pmosfets[index].unanchor_wires();
				pmosfets[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_NPN) {
			var index: number = engine_functions.get_npn(global.WIRE_BUILDER['id2']);
			if (index < npns.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				npns[index].push_reference(global.copy(global.WIRE_REFERENCE));
				npns[index].unanchor_wires();
				npns[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_PNP) {
			var index: number = engine_functions.get_pnp(global.WIRE_BUILDER['id2']);
			if (index < pnps.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				pnps[index].push_reference(global.copy(global.WIRE_REFERENCE));
				pnps[index].unanchor_wires();
				pnps[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_ADC) {
			var index: number = engine_functions.get_adc(global.WIRE_BUILDER['id2']);
			if (index < adcs.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				adcs[index].push_reference(global.copy(global.WIRE_REFERENCE));
				adcs[index].unanchor_wires();
				adcs[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_DAC) {
			var index: number = engine_functions.get_dac(global.WIRE_BUILDER['id2']);
			if (index < dacs.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				dacs[index].push_reference(global.copy(global.WIRE_REFERENCE));
				dacs[index].unanchor_wires();
				dacs[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_SAH) {
			var index: number = engine_functions.get_samplers(global.WIRE_BUILDER['id2']);
			if (index < sandhs.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				sandhs[index].push_reference(global.copy(global.WIRE_REFERENCE));
				sandhs[index].unanchor_wires();
				sandhs[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_PWM) {
			var index: number = engine_functions.get_pwm(global.WIRE_BUILDER['id2']);
			if (index < pwms.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				pwms[index].push_reference(global.copy(global.WIRE_REFERENCE));
				pwms[index].unanchor_wires();
				pwms[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_INTEGRATOR) {
			var index: number = engine_functions.get_integrator(global.WIRE_BUILDER['id2']);
			if (index < integrators.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				integrators[index].push_reference(global.copy(global.WIRE_REFERENCE));
				integrators[index].unanchor_wires();
				integrators[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_DIFFERENTIATOR) {
			var index: number = engine_functions.get_differentiator(global.WIRE_BUILDER['id2']);
			if (index < differentiators.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				differentiators[index].push_reference(global.copy(global.WIRE_REFERENCE));
				differentiators[index].unanchor_wires();
				differentiators[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_LPF) {
			var index: number = engine_functions.get_lowpass(global.WIRE_BUILDER['id2']);
			if (index < lowpasses.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				lowpasses[index].push_reference(global.copy(global.WIRE_REFERENCE));
				lowpasses[index].unanchor_wires();
				lowpasses[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_HPF) {
			var index: number = engine_functions.get_highpass(global.WIRE_BUILDER['id2']);
			if (index < highpasses.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				highpasses[index].push_reference(global.copy(global.WIRE_REFERENCE));
				highpasses[index].unanchor_wires();
				highpasses[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_REL) {
			var index: number = engine_functions.get_relay(global.WIRE_BUILDER['id2']);
			if (index < relays.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				relays[index].push_reference(global.copy(global.WIRE_REFERENCE));
				relays[index].unanchor_wires();
				relays[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_PID) {
			var index: number = engine_functions.get_pid(global.WIRE_BUILDER['id2']);
			if (index < pids.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				pids[index].push_reference(global.copy(global.WIRE_REFERENCE));
				pids[index].unanchor_wires();
				pids[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_LUT) {
			var index: number = engine_functions.get_lut(global.WIRE_BUILDER['id2']);
			if (index < luts.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				luts[index].push_reference(global.copy(global.WIRE_REFERENCE));
				luts[index].unanchor_wires();
				luts[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_VCR) {
			var index: number = engine_functions.get_vcr(global.WIRE_BUILDER['id2']);
			if (index < vcrs.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				vcrs[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vcrs[index].unanchor_wires();
				vcrs[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_VCCA) {
			var index: number = engine_functions.get_vcca(global.WIRE_BUILDER['id2']);
			if (index < vccas.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				vccas[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vccas[index].unanchor_wires();
				vccas[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_VCL) {
			var index: number = engine_functions.get_vcl(global.WIRE_BUILDER['id2']);
			if (index < vcls.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				vcls[index].push_reference(global.copy(global.WIRE_REFERENCE));
				vcls[index].unanchor_wires();
				vcls[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_GRT) {
			var index: number = engine_functions.get_grt(global.WIRE_BUILDER['id2']);
			if (index < grts.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				grts[index].push_reference(global.copy(global.WIRE_REFERENCE));
				grts[index].unanchor_wires();
				grts[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_TPTZ) {
			var index: number = engine_functions.get_tptz(global.WIRE_BUILDER['id2']);
			if (index < tptzs.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				tptzs[index].push_reference(global.copy(global.WIRE_REFERENCE));
				tptzs[index].unanchor_wires();
				tptzs[index].anchor_wires();
			}
		} else if (global.WIRE_BUILDER['type2'] === global.TYPE_TRAN) {
			var index: number = engine_functions.get_transformer(global.WIRE_BUILDER['id2']);
			if (index < transformers.length) {
				global.WIRE_REFERENCE['wire_id'] = wire_id;
				global.WIRE_REFERENCE['linkage'] = global.copy(global.WIRE_BUILDER['linkage2']['wire']);
				global.WIRE_REFERENCE['anchor_point'] = global.copy(global.WIRE_BUILDER['anchor_point2']);
				transformers[index].push_reference(global.copy(global.WIRE_REFERENCE));
				transformers[index].unanchor_wires();
				transformers[index].anchor_wires();
			}
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
}
