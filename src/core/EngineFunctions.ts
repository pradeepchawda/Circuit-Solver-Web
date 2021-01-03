'use strict';
/**********************************************************************
 * Project           : Circuit Solver
 * File		        : EngineFunctions.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This class will be used to keep a set of algorithms that will be
 *                   pertinent to the engine.
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
class EngineFunctions {
	public node_1: number;
	public node_2: number;
	public node_3: number;
	public node_4: number;
	public offset: number;
	public temp: number;
	public temp2: number;
	public output: number;
	public v_node_1: number;
	public v_node_2: number;
	public meta_data: Metadata;
	/* Temporary position holders for the generation of new elements. */
	public x1: number;
	public y1: number;
	public x2: number;
	public y2: number;
	public x3: number;
	public y3: number;
	public x4: number;
	public y4: number;
	/* Solely for mapping nodes (single nodes) baby! */
	public mapper1: Element1;
	/* Solely for mapping nodes (double nodes) baby! */
	public mapper2: Element2;
	/* Solely for mapping nodes (triple nodes) baby! */
	public mapper3: Element3;
	/* Solely for mapping nodes (quadruple nodes) baby! */
	public mapper4: Element4;
	constructor() {
		this.node_1 = -1;
		this.node_2 = -1;
		this.node_3 = -1;
		this.node_4 = -1;
		this.offset = -1;
		this.temp = -1;
		this.temp2 = -1;
		this.output = -1;
		this.v_node_1 = 0;
		this.v_node_2 = 0;
		this.meta_data = new Metadata();
		/* Temporary position holders for the generation of new elements. */
		this.x1 = -1;
		this.y1 = -1;
		this.x2 = -1;
		this.y2 = -1;
		this.x3 = -1;
		this.y3 = -1;
		this.x4 = -1;
		this.y4 = -1;
		/* Solely for mapping nodes (single nodes) baby! */
		this.mapper1 = new Element1(-1, -1, global.NULL);
		/* Solely for mapping nodes (double nodes) baby! */
		this.mapper2 = new Element2(-1, -1, global.NULL);
		/* Solely for mapping nodes (triple nodes) baby! */
		this.mapper3 = new Element3(-1, -1, global.NULL);
		/* Solely for mapping nodes (quadruple nodes) baby! */
		this.mapper4 = new Element4(-1, -1, global.NULL);
	}
	/* Create a series of nodes based on some arbitrary bounds. We will use this for the initial generation
  of the nodes, after that they should resize them selves. */
	create_nodes(bounds: RectF): void {
		/* A counter to keep track of where we are in the x-direciton */
		let counter_x: number = 0;
		/* A counter to keep traack of where we are in the y-direction */
		let counter_y: number = 0;
		/* The left of the bounds */
		let left: number = 0;
		/* The top of the bounds */
		let top: number = 0;
		/* A little bit of spacing to make sure that the nodes sit on the end corners
    of the bounds */
		let divider: number = Math.round(global.settings.SQRT_MAXNODES);
		/* A little nudge in the x direction */
		let shifter_x: number = global.node_space_x / divider;
		/* A little nudge in the y direction */
		let shifter_y: number = global.node_space_y / divider;
		/* The loop that makes the nodes. */
		if (global.settings.MAXNODES > 0) {
			let index: number = 0;
			for (var i: number = 0; i < global.settings.MAXNODES; i++) {
				left = bounds.left + (bounds.get_width() / divider + shifter_x) * counter_x;
				top = bounds.top + (bounds.get_height() / divider + shifter_y) * counter_y;
				nodes.push(new ElectricalNode(left, top, index++));
				counter_x++;
				if (counter_x >= divider && counter_y <= divider) {
					counter_x = 0;
					counter_y++;
				}
			}
		}
	}
	handle_nearest_neighbors(temp_translation_lock: boolean): void {
		/* History lock is only set when moving elements on new add or on paste. */
		if (!global.is_dragging && !global.SIGNAL_HISTORY_LOCK) {
			if (!global.is_right_click) {
				if (global.selected_type > -1) {
					global.selection_nearest_neighbors = [];
					global.nearest_neighbor_index = 0;
					let width: number = 1.5125 * global.selected_bounds.get_width();
					/* #INSERT_GENERATE_FIND_SELECTION_NEIGHBORS# */
					/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
					for (var i: number = 0; i < resistors.length; i++) {
						if (resistors[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: resistors[i].elm.type,
								Id: resistors[i].elm.id
							});
							if (resistors[i].elm.type === global.selected_type && resistors[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < capacitors.length; i++) {
						if (capacitors[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: capacitors[i].elm.type,
								Id: capacitors[i].elm.id
							});
							if (capacitors[i].elm.type === global.selected_type && capacitors[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < inductors.length; i++) {
						if (inductors[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: inductors[i].elm.type,
								Id: inductors[i].elm.id
							});
							if (inductors[i].elm.type === global.selected_type && inductors[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < grounds.length; i++) {
						if (grounds[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: grounds[i].elm.type,
								Id: grounds[i].elm.id
							});
							if (grounds[i].elm.type === global.selected_type && grounds[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < dcsources.length; i++) {
						if (dcsources[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: dcsources[i].elm.type,
								Id: dcsources[i].elm.id
							});
							if (dcsources[i].elm.type === global.selected_type && dcsources[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < dccurrents.length; i++) {
						if (dccurrents[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: dccurrents[i].elm.type,
								Id: dccurrents[i].elm.id
							});
							if (dccurrents[i].elm.type === global.selected_type && dccurrents[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < acsources.length; i++) {
						if (acsources[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: acsources[i].elm.type,
								Id: acsources[i].elm.id
							});
							if (acsources[i].elm.type === global.selected_type && acsources[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < accurrents.length; i++) {
						if (accurrents[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: accurrents[i].elm.type,
								Id: accurrents[i].elm.id
							});
							if (accurrents[i].elm.type === global.selected_type && accurrents[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < squarewaves.length; i++) {
						if (squarewaves[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: squarewaves[i].elm.type,
								Id: squarewaves[i].elm.id
							});
							if (squarewaves[i].elm.type === global.selected_type && squarewaves[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < sawwaves.length; i++) {
						if (sawwaves[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: sawwaves[i].elm.type,
								Id: sawwaves[i].elm.id
							});
							if (sawwaves[i].elm.type === global.selected_type && sawwaves[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < trianglewaves.length; i++) {
						if (trianglewaves[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: trianglewaves[i].elm.type,
								Id: trianglewaves[i].elm.id
							});
							if (trianglewaves[i].elm.type === global.selected_type && trianglewaves[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < constants.length; i++) {
						if (constants[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: constants[i].elm.type,
								Id: constants[i].elm.id
							});
							if (constants[i].elm.type === global.selected_type && constants[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < wires.length; i++) {
						if (wires[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: wires[i].elm.type,
								Id: wires[i].elm.id
							});
							if (wires[i].elm.type === global.selected_type && wires[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < nets.length; i++) {
						if (nets[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: nets[i].elm.type,
								Id: nets[i].elm.id
							});
							if (nets[i].elm.type === global.selected_type && nets[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < notes.length; i++) {
						if (notes[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: notes[i].elm.type,
								Id: notes[i].elm.id
							});
							if (notes[i].elm.type === global.selected_type && notes[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < rails.length; i++) {
						if (rails[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: rails[i].elm.type,
								Id: rails[i].elm.id
							});
							if (rails[i].elm.type === global.selected_type && rails[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < voltmeters.length; i++) {
						if (voltmeters[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: voltmeters[i].elm.type,
								Id: voltmeters[i].elm.id
							});
							if (voltmeters[i].elm.type === global.selected_type && voltmeters[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < ohmmeters.length; i++) {
						if (ohmmeters[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: ohmmeters[i].elm.type,
								Id: ohmmeters[i].elm.id
							});
							if (ohmmeters[i].elm.type === global.selected_type && ohmmeters[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < ammeters.length; i++) {
						if (ammeters[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: ammeters[i].elm.type,
								Id: ammeters[i].elm.id
							});
							if (ammeters[i].elm.type === global.selected_type && ammeters[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < wattmeters.length; i++) {
						if (wattmeters[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: wattmeters[i].elm.type,
								Id: wattmeters[i].elm.id
							});
							if (wattmeters[i].elm.type === global.selected_type && wattmeters[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < fuses.length; i++) {
						if (fuses[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: fuses[i].elm.type,
								Id: fuses[i].elm.id
							});
							if (fuses[i].elm.type === global.selected_type && fuses[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < spsts.length; i++) {
						if (spsts[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: spsts[i].elm.type,
								Id: spsts[i].elm.id
							});
							if (spsts[i].elm.type === global.selected_type && spsts[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < spdts.length; i++) {
						if (spdts[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: spdts[i].elm.type,
								Id: spdts[i].elm.id
							});
							if (spdts[i].elm.type === global.selected_type && spdts[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < nots.length; i++) {
						if (nots[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: nots[i].elm.type,
								Id: nots[i].elm.id
							});
							if (nots[i].elm.type === global.selected_type && nots[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < diodes.length; i++) {
						if (diodes[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: diodes[i].elm.type,
								Id: diodes[i].elm.id
							});
							if (diodes[i].elm.type === global.selected_type && diodes[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < leds.length; i++) {
						if (leds[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: leds[i].elm.type,
								Id: leds[i].elm.id
							});
							if (leds[i].elm.type === global.selected_type && leds[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < zeners.length; i++) {
						if (zeners[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: zeners[i].elm.type,
								Id: zeners[i].elm.id
							});
							if (zeners[i].elm.type === global.selected_type && zeners[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < potentiometers.length; i++) {
						if (potentiometers[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: potentiometers[i].elm.type,
								Id: potentiometers[i].elm.id
							});
							if (potentiometers[i].elm.type === global.selected_type && potentiometers[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < ands.length; i++) {
						if (ands[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: ands[i].elm.type,
								Id: ands[i].elm.id
							});
							if (ands[i].elm.type === global.selected_type && ands[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < ors.length; i++) {
						if (ors[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: ors[i].elm.type,
								Id: ors[i].elm.id
							});
							if (ors[i].elm.type === global.selected_type && ors[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < nands.length; i++) {
						if (nands[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: nands[i].elm.type,
								Id: nands[i].elm.id
							});
							if (nands[i].elm.type === global.selected_type && nands[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < nors.length; i++) {
						if (nors[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: nors[i].elm.type,
								Id: nors[i].elm.id
							});
							if (nors[i].elm.type === global.selected_type && nors[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < xors.length; i++) {
						if (xors[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: xors[i].elm.type,
								Id: xors[i].elm.id
							});
							if (xors[i].elm.type === global.selected_type && xors[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < xnors.length; i++) {
						if (xnors[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: xnors[i].elm.type,
								Id: xnors[i].elm.id
							});
							if (xnors[i].elm.type === global.selected_type && xnors[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < dffs.length; i++) {
						if (dffs[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: dffs[i].elm.type,
								Id: dffs[i].elm.id
							});
							if (dffs[i].elm.type === global.selected_type && dffs[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < vsats.length; i++) {
						if (vsats[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: vsats[i].elm.type,
								Id: vsats[i].elm.id
							});
							if (vsats[i].elm.type === global.selected_type && vsats[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < adders.length; i++) {
						if (adders[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: adders[i].elm.type,
								Id: adders[i].elm.id
							});
							if (adders[i].elm.type === global.selected_type && adders[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < subtractors.length; i++) {
						if (subtractors[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: subtractors[i].elm.type,
								Id: subtractors[i].elm.id
							});
							if (subtractors[i].elm.type === global.selected_type && subtractors[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < multipliers.length; i++) {
						if (multipliers[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: multipliers[i].elm.type,
								Id: multipliers[i].elm.id
							});
							if (multipliers[i].elm.type === global.selected_type && multipliers[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < dividers.length; i++) {
						if (dividers[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: dividers[i].elm.type,
								Id: dividers[i].elm.id
							});
							if (dividers[i].elm.type === global.selected_type && dividers[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < gains.length; i++) {
						if (gains[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: gains[i].elm.type,
								Id: gains[i].elm.id
							});
							if (gains[i].elm.type === global.selected_type && gains[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < absvals.length; i++) {
						if (absvals[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: absvals[i].elm.type,
								Id: absvals[i].elm.id
							});
							if (absvals[i].elm.type === global.selected_type && absvals[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < vcsws.length; i++) {
						if (vcsws[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: vcsws[i].elm.type,
								Id: vcsws[i].elm.id
							});
							if (vcsws[i].elm.type === global.selected_type && vcsws[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < vcvss.length; i++) {
						if (vcvss[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: vcvss[i].elm.type,
								Id: vcvss[i].elm.id
							});
							if (vcvss[i].elm.type === global.selected_type && vcvss[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < vccss.length; i++) {
						if (vccss[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: vccss[i].elm.type,
								Id: vccss[i].elm.id
							});
							if (vccss[i].elm.type === global.selected_type && vccss[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < cccss.length; i++) {
						if (cccss[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: cccss[i].elm.type,
								Id: cccss[i].elm.id
							});
							if (cccss[i].elm.type === global.selected_type && cccss[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < ccvss.length; i++) {
						if (ccvss[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: ccvss[i].elm.type,
								Id: ccvss[i].elm.id
							});
							if (ccvss[i].elm.type === global.selected_type && ccvss[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < opamps.length; i++) {
						if (opamps[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: opamps[i].elm.type,
								Id: opamps[i].elm.id
							});
							if (opamps[i].elm.type === global.selected_type && opamps[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < nmosfets.length; i++) {
						if (nmosfets[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: nmosfets[i].elm.type,
								Id: nmosfets[i].elm.id
							});
							if (nmosfets[i].elm.type === global.selected_type && nmosfets[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < pmosfets.length; i++) {
						if (pmosfets[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: pmosfets[i].elm.type,
								Id: pmosfets[i].elm.id
							});
							if (pmosfets[i].elm.type === global.selected_type && pmosfets[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < npns.length; i++) {
						if (npns[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: npns[i].elm.type,
								Id: npns[i].elm.id
							});
							if (npns[i].elm.type === global.selected_type && npns[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < pnps.length; i++) {
						if (pnps[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: pnps[i].elm.type,
								Id: pnps[i].elm.id
							});
							if (pnps[i].elm.type === global.selected_type && pnps[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < adcs.length; i++) {
						if (adcs[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: adcs[i].elm.type,
								Id: adcs[i].elm.id
							});
							if (adcs[i].elm.type === global.selected_type && adcs[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < dacs.length; i++) {
						if (dacs[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: dacs[i].elm.type,
								Id: dacs[i].elm.id
							});
							if (dacs[i].elm.type === global.selected_type && dacs[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < sandhs.length; i++) {
						if (sandhs[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: sandhs[i].elm.type,
								Id: sandhs[i].elm.id
							});
							if (sandhs[i].elm.type === global.selected_type && sandhs[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < pwms.length; i++) {
						if (pwms[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: pwms[i].elm.type,
								Id: pwms[i].elm.id
							});
							if (pwms[i].elm.type === global.selected_type && pwms[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < integrators.length; i++) {
						if (integrators[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: integrators[i].elm.type,
								Id: integrators[i].elm.id
							});
							if (integrators[i].elm.type === global.selected_type && integrators[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < differentiators.length; i++) {
						if (differentiators[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: differentiators[i].elm.type,
								Id: differentiators[i].elm.id
							});
							if (differentiators[i].elm.type === global.selected_type && differentiators[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < lowpasses.length; i++) {
						if (lowpasses[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: lowpasses[i].elm.type,
								Id: lowpasses[i].elm.id
							});
							if (lowpasses[i].elm.type === global.selected_type && lowpasses[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < highpasses.length; i++) {
						if (highpasses[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: highpasses[i].elm.type,
								Id: highpasses[i].elm.id
							});
							if (highpasses[i].elm.type === global.selected_type && highpasses[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < relays.length; i++) {
						if (relays[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: relays[i].elm.type,
								Id: relays[i].elm.id
							});
							if (relays[i].elm.type === global.selected_type && relays[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < pids.length; i++) {
						if (pids[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: pids[i].elm.type,
								Id: pids[i].elm.id
							});
							if (pids[i].elm.type === global.selected_type && pids[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < luts.length; i++) {
						if (luts[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: luts[i].elm.type,
								Id: luts[i].elm.id
							});
							if (luts[i].elm.type === global.selected_type && luts[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < vcrs.length; i++) {
						if (vcrs[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: vcrs[i].elm.type,
								Id: vcrs[i].elm.id
							});
							if (vcrs[i].elm.type === global.selected_type && vcrs[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < vccas.length; i++) {
						if (vccas[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: vccas[i].elm.type,
								Id: vccas[i].elm.id
							});
							if (vccas[i].elm.type === global.selected_type && vccas[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < vcls.length; i++) {
						if (vcls[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: vcls[i].elm.type,
								Id: vcls[i].elm.id
							});
							if (vcls[i].elm.type === global.selected_type && vcls[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < grts.length; i++) {
						if (grts[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: grts[i].elm.type,
								Id: grts[i].elm.id
							});
							if (grts[i].elm.type === global.selected_type && grts[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < tptzs.length; i++) {
						if (tptzs[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: tptzs[i].elm.type,
								Id: tptzs[i].elm.id
							});
							if (tptzs[i].elm.type === global.selected_type && tptzs[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					for (var i: number = 0; i < transformers.length; i++) {
						if (transformers[i].bounds.is_near(global.selected_bounds, width)) {
							global.selection_nearest_neighbors.push({
								Type: transformers[i].elm.type,
								Id: transformers[i].elm.id
							});
							if (transformers[i].elm.type === global.selected_type && transformers[i].elm.id === global.selected_id) {
								global.nearest_neighbor_index = global.selection_nearest_neighbors.length - 1;
							}
						}
					}
					/* <!-- END AUTOMATICALLY GENERATED !--> */
				}
			} else {
				if (global.selected_type > -1 && temp_translation_lock) {
					if (global.selection_nearest_neighbors.length > 1) {
						global.nearest_neighbor_index++;
						if (global.nearest_neighbor_index >= global.selection_nearest_neighbors.length) {
							global.nearest_neighbor_index = 0;
						}
						let index: number = -1;
						/* #INSERT_GENERATE_SWAP_SELECTION_NEIGHBORS# */
						/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_RESISTOR) {
							for (var i: number = 0; i < resistors.length; i++) {
								if (resistors[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									resistors[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_CAPACITOR) {
							for (var i: number = 0; i < capacitors.length; i++) {
								if (capacitors[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									capacitors[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_INDUCTOR) {
							for (var i: number = 0; i < inductors.length; i++) {
								if (inductors[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									inductors[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_GROUND) {
							for (var i: number = 0; i < grounds.length; i++) {
								if (grounds[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									grounds[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_DCSOURCE) {
							for (var i: number = 0; i < dcsources.length; i++) {
								if (dcsources[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									dcsources[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_DCCURRENT) {
							for (var i: number = 0; i < dccurrents.length; i++) {
								if (dccurrents[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									dccurrents[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_ACSOURCE) {
							for (var i: number = 0; i < acsources.length; i++) {
								if (acsources[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									acsources[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_ACCURRENT) {
							for (var i: number = 0; i < accurrents.length; i++) {
								if (accurrents[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									accurrents[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_SQUAREWAVE) {
							for (var i: number = 0; i < squarewaves.length; i++) {
								if (squarewaves[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									squarewaves[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_SAW) {
							for (var i: number = 0; i < sawwaves.length; i++) {
								if (sawwaves[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									sawwaves[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_TRI) {
							for (var i: number = 0; i < trianglewaves.length; i++) {
								if (trianglewaves[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									trianglewaves[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_CONSTANT) {
							for (var i: number = 0; i < constants.length; i++) {
								if (constants[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									constants[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_WIRE) {
							for (var i: number = 0; i < wires.length; i++) {
								if (wires[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									wires[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_NET) {
							for (var i: number = 0; i < nets.length; i++) {
								if (nets[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									nets[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_NOTE) {
							for (var i: number = 0; i < notes.length; i++) {
								if (notes[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									notes[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_RAIL) {
							for (var i: number = 0; i < rails.length; i++) {
								if (rails[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									rails[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_VOLTMETER) {
							for (var i: number = 0; i < voltmeters.length; i++) {
								if (voltmeters[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									voltmeters[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_OHMMETER) {
							for (var i: number = 0; i < ohmmeters.length; i++) {
								if (ohmmeters[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									ohmmeters[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_AMMETER) {
							for (var i: number = 0; i < ammeters.length; i++) {
								if (ammeters[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									ammeters[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_WATTMETER) {
							for (var i: number = 0; i < wattmeters.length; i++) {
								if (wattmeters[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									wattmeters[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_FUSE) {
							for (var i: number = 0; i < fuses.length; i++) {
								if (fuses[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									fuses[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_SPST) {
							for (var i: number = 0; i < spsts.length; i++) {
								if (spsts[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									spsts[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_SPDT) {
							for (var i: number = 0; i < spdts.length; i++) {
								if (spdts[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									spdts[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_NOT) {
							for (var i: number = 0; i < nots.length; i++) {
								if (nots[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									nots[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_DIODE) {
							for (var i: number = 0; i < diodes.length; i++) {
								if (diodes[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									diodes[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_LED) {
							for (var i: number = 0; i < leds.length; i++) {
								if (leds[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									leds[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_ZENER) {
							for (var i: number = 0; i < zeners.length; i++) {
								if (zeners[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									zeners[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_POTENTIOMETER) {
							for (var i: number = 0; i < potentiometers.length; i++) {
								if (potentiometers[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									potentiometers[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_AND) {
							for (var i: number = 0; i < ands.length; i++) {
								if (ands[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									ands[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_OR) {
							for (var i: number = 0; i < ors.length; i++) {
								if (ors[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									ors[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_NAND) {
							for (var i: number = 0; i < nands.length; i++) {
								if (nands[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									nands[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_NOR) {
							for (var i: number = 0; i < nors.length; i++) {
								if (nors[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									nors[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_XOR) {
							for (var i: number = 0; i < xors.length; i++) {
								if (xors[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									xors[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_XNOR) {
							for (var i: number = 0; i < xnors.length; i++) {
								if (xnors[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									xnors[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_DFF) {
							for (var i: number = 0; i < dffs.length; i++) {
								if (dffs[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									dffs[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_VSAT) {
							for (var i: number = 0; i < vsats.length; i++) {
								if (vsats[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									vsats[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_ADD) {
							for (var i: number = 0; i < adders.length; i++) {
								if (adders[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									adders[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_SUB) {
							for (var i: number = 0; i < subtractors.length; i++) {
								if (subtractors[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									subtractors[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_MUL) {
							for (var i: number = 0; i < multipliers.length; i++) {
								if (multipliers[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									multipliers[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_DIV) {
							for (var i: number = 0; i < dividers.length; i++) {
								if (dividers[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									dividers[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_GAIN) {
							for (var i: number = 0; i < gains.length; i++) {
								if (gains[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									gains[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_ABS) {
							for (var i: number = 0; i < absvals.length; i++) {
								if (absvals[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									absvals[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_VCSW) {
							for (var i: number = 0; i < vcsws.length; i++) {
								if (vcsws[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									vcsws[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_VCVS) {
							for (var i: number = 0; i < vcvss.length; i++) {
								if (vcvss[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									vcvss[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_VCCS) {
							for (var i: number = 0; i < vccss.length; i++) {
								if (vccss[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									vccss[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_CCCS) {
							for (var i: number = 0; i < cccss.length; i++) {
								if (cccss[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									cccss[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_CCVS) {
							for (var i: number = 0; i < ccvss.length; i++) {
								if (ccvss[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									ccvss[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_OPAMP) {
							for (var i: number = 0; i < opamps.length; i++) {
								if (opamps[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									opamps[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_NMOS) {
							for (var i: number = 0; i < nmosfets.length; i++) {
								if (nmosfets[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									nmosfets[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_PMOS) {
							for (var i: number = 0; i < pmosfets.length; i++) {
								if (pmosfets[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									pmosfets[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_NPN) {
							for (var i: number = 0; i < npns.length; i++) {
								if (npns[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									npns[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_PNP) {
							for (var i: number = 0; i < pnps.length; i++) {
								if (pnps[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									pnps[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_ADC) {
							for (var i: number = 0; i < adcs.length; i++) {
								if (adcs[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									adcs[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_DAC) {
							for (var i: number = 0; i < dacs.length; i++) {
								if (dacs[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									dacs[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_SAH) {
							for (var i: number = 0; i < sandhs.length; i++) {
								if (sandhs[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									sandhs[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_PWM) {
							for (var i: number = 0; i < pwms.length; i++) {
								if (pwms[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									pwms[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_INTEGRATOR) {
							for (var i: number = 0; i < integrators.length; i++) {
								if (integrators[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									integrators[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_DIFFERENTIATOR) {
							for (var i: number = 0; i < differentiators.length; i++) {
								if (differentiators[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									differentiators[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_LPF) {
							for (var i: number = 0; i < lowpasses.length; i++) {
								if (lowpasses[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									lowpasses[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_HPF) {
							for (var i: number = 0; i < highpasses.length; i++) {
								if (highpasses[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									highpasses[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_REL) {
							for (var i: number = 0; i < relays.length; i++) {
								if (relays[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									relays[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_PID) {
							for (var i: number = 0; i < pids.length; i++) {
								if (pids[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									pids[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_LUT) {
							for (var i: number = 0; i < luts.length; i++) {
								if (luts[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									luts[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_VCR) {
							for (var i: number = 0; i < vcrs.length; i++) {
								if (vcrs[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									vcrs[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_VCCA) {
							for (var i: number = 0; i < vccas.length; i++) {
								if (vccas[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									vccas[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_VCL) {
							for (var i: number = 0; i < vcls.length; i++) {
								if (vcls[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									vcls[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_GRT) {
							for (var i: number = 0; i < grts.length; i++) {
								if (grts[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									grts[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_TPTZ) {
							for (var i: number = 0; i < tptzs.length; i++) {
								if (tptzs[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									tptzs[i].select();
									break;
								}
							}
						}
						if (global.selection_nearest_neighbors[global.nearest_neighbor_index]['Type'] === global.TYPE_TRAN) {
							for (var i: number = 0; i < transformers.length; i++) {
								if (transformers[i].elm.id === global.selection_nearest_neighbors[global.nearest_neighbor_index]['Id']) {
									transformers[i].select();
									break;
								}
							}
						}
						/* <!-- END AUTOMATICALLY GENERATED !--> */
					}
				}
			}
		}
	}
	/* #INSERT_GENERATE_ELEMENT_INDEX# */
	/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
	get_resistor(id: number): number {
		for (var i: number = 0; i < resistors.length; i++) {
			if (resistors[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_capacitor(id: number): number {
		for (var i: number = 0; i < capacitors.length; i++) {
			if (capacitors[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_inductor(id: number): number {
		for (var i: number = 0; i < inductors.length; i++) {
			if (inductors[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_ground(id: number): number {
		for (var i: number = 0; i < grounds.length; i++) {
			if (grounds[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_dcsource(id: number): number {
		for (var i: number = 0; i < dcsources.length; i++) {
			if (dcsources[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_dccurrent(id: number): number {
		for (var i: number = 0; i < dccurrents.length; i++) {
			if (dccurrents[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_acsource(id: number): number {
		for (var i: number = 0; i < acsources.length; i++) {
			if (acsources[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_accurrent(id: number): number {
		for (var i: number = 0; i < accurrents.length; i++) {
			if (accurrents[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_squarewave(id: number): number {
		for (var i: number = 0; i < squarewaves.length; i++) {
			if (squarewaves[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_sawwave(id: number): number {
		for (var i: number = 0; i < sawwaves.length; i++) {
			if (sawwaves[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_trianglewave(id: number): number {
		for (var i: number = 0; i < trianglewaves.length; i++) {
			if (trianglewaves[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_constant(id: number): number {
		for (var i: number = 0; i < constants.length; i++) {
			if (constants[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_wire(id: number): number {
		for (var i: number = 0; i < wires.length; i++) {
			if (wires[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_net(id: number): number {
		for (var i: number = 0; i < nets.length; i++) {
			if (nets[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_note(id: number): number {
		for (var i: number = 0; i < notes.length; i++) {
			if (notes[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_rail(id: number): number {
		for (var i: number = 0; i < rails.length; i++) {
			if (rails[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_voltmeter(id: number): number {
		for (var i: number = 0; i < voltmeters.length; i++) {
			if (voltmeters[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_ohmmeter(id: number): number {
		for (var i: number = 0; i < ohmmeters.length; i++) {
			if (ohmmeters[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_ammeter(id: number): number {
		for (var i: number = 0; i < ammeters.length; i++) {
			if (ammeters[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_wattmeter(id: number): number {
		for (var i: number = 0; i < wattmeters.length; i++) {
			if (wattmeters[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_fuse(id: number): number {
		for (var i: number = 0; i < fuses.length; i++) {
			if (fuses[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_spst(id: number): number {
		for (var i: number = 0; i < spsts.length; i++) {
			if (spsts[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_spdt(id: number): number {
		for (var i: number = 0; i < spdts.length; i++) {
			if (spdts[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_not(id: number): number {
		for (var i: number = 0; i < nots.length; i++) {
			if (nots[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_diode(id: number): number {
		for (var i: number = 0; i < diodes.length; i++) {
			if (diodes[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_led(id: number): number {
		for (var i: number = 0; i < leds.length; i++) {
			if (leds[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_zener(id: number): number {
		for (var i: number = 0; i < zeners.length; i++) {
			if (zeners[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_potentiometer(id: number): number {
		for (var i: number = 0; i < potentiometers.length; i++) {
			if (potentiometers[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_and(id: number): number {
		for (var i: number = 0; i < ands.length; i++) {
			if (ands[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_or(id: number): number {
		for (var i: number = 0; i < ors.length; i++) {
			if (ors[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_nand(id: number): number {
		for (var i: number = 0; i < nands.length; i++) {
			if (nands[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_nor(id: number): number {
		for (var i: number = 0; i < nors.length; i++) {
			if (nors[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_xor(id: number): number {
		for (var i: number = 0; i < xors.length; i++) {
			if (xors[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_xnor(id: number): number {
		for (var i: number = 0; i < xnors.length; i++) {
			if (xnors[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_dff(id: number): number {
		for (var i: number = 0; i < dffs.length; i++) {
			if (dffs[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_vsat(id: number): number {
		for (var i: number = 0; i < vsats.length; i++) {
			if (vsats[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_adder(id: number): number {
		for (var i: number = 0; i < adders.length; i++) {
			if (adders[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_subtractor(id: number): number {
		for (var i: number = 0; i < subtractors.length; i++) {
			if (subtractors[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_multiplier(id: number): number {
		for (var i: number = 0; i < multipliers.length; i++) {
			if (multipliers[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_divider(id: number): number {
		for (var i: number = 0; i < dividers.length; i++) {
			if (dividers[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_gain(id: number): number {
		for (var i: number = 0; i < gains.length; i++) {
			if (gains[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_absval(id: number): number {
		for (var i: number = 0; i < absvals.length; i++) {
			if (absvals[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_vcsw(id: number): number {
		for (var i: number = 0; i < vcsws.length; i++) {
			if (vcsws[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_vcvs(id: number): number {
		for (var i: number = 0; i < vcvss.length; i++) {
			if (vcvss[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_vccs(id: number): number {
		for (var i: number = 0; i < vccss.length; i++) {
			if (vccss[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_cccs(id: number): number {
		for (var i: number = 0; i < cccss.length; i++) {
			if (cccss[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_ccvs(id: number): number {
		for (var i: number = 0; i < ccvss.length; i++) {
			if (ccvss[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_opamp(id: number): number {
		for (var i: number = 0; i < opamps.length; i++) {
			if (opamps[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_nmosfet(id: number): number {
		for (var i: number = 0; i < nmosfets.length; i++) {
			if (nmosfets[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_pmosfet(id: number): number {
		for (var i: number = 0; i < pmosfets.length; i++) {
			if (pmosfets[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_npn(id: number): number {
		for (var i: number = 0; i < npns.length; i++) {
			if (npns[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_pnp(id: number): number {
		for (var i: number = 0; i < pnps.length; i++) {
			if (pnps[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_adc(id: number): number {
		for (var i: number = 0; i < adcs.length; i++) {
			if (adcs[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_dac(id: number): number {
		for (var i: number = 0; i < dacs.length; i++) {
			if (dacs[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_samplers(id: number): number {
		for (var i: number = 0; i < sandhs.length; i++) {
			if (sandhs[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_pwm(id: number): number {
		for (var i: number = 0; i < pwms.length; i++) {
			if (pwms[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_integrator(id: number): number {
		for (var i: number = 0; i < integrators.length; i++) {
			if (integrators[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_differentiator(id: number): number {
		for (var i: number = 0; i < differentiators.length; i++) {
			if (differentiators[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_lowpass(id: number): number {
		for (var i: number = 0; i < lowpasses.length; i++) {
			if (lowpasses[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_highpass(id: number): number {
		for (var i: number = 0; i < highpasses.length; i++) {
			if (highpasses[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_relay(id: number): number {
		for (var i: number = 0; i < relays.length; i++) {
			if (relays[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_pid(id: number): number {
		for (var i: number = 0; i < pids.length; i++) {
			if (pids[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_lut(id: number): number {
		for (var i: number = 0; i < luts.length; i++) {
			if (luts[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_vcr(id: number): number {
		for (var i: number = 0; i < vcrs.length; i++) {
			if (vcrs[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_vcca(id: number): number {
		for (var i: number = 0; i < vccas.length; i++) {
			if (vccas[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_vcl(id: number): number {
		for (var i: number = 0; i < vcls.length; i++) {
			if (vcls[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_grt(id: number): number {
		for (var i: number = 0; i < grts.length; i++) {
			if (grts[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_tptz(id: number): number {
		for (var i: number = 0; i < tptzs.length; i++) {
			if (tptzs[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	get_transformer(id: number): number {
		for (var i: number = 0; i < transformers.length; i++) {
			if (transformers[i].elm.id === id) {
				return i;
			}
		}

		return -1;
	}

	/* <!-- END AUTOMATICALLY GENERATED !--> */
	sort_function(a: number, b: number): number {
		return a - b;
	}
	/* #INSERT_GENERATE_ASSIGNMENT_INDEX# */
	/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
	get_resistor_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < resistors.length; i++) {
			ids.push(resistors[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_capacitor_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < capacitors.length; i++) {
			ids.push(capacitors[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_inductor_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < inductors.length; i++) {
			ids.push(inductors[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_ground_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < grounds.length; i++) {
			ids.push(grounds[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_dcsource_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < dcsources.length; i++) {
			ids.push(dcsources[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_dccurrent_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < dccurrents.length; i++) {
			ids.push(dccurrents[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_acsource_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < acsources.length; i++) {
			ids.push(acsources[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_accurrent_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < accurrents.length; i++) {
			ids.push(accurrents[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_squarewave_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < squarewaves.length; i++) {
			ids.push(squarewaves[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_sawwave_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < sawwaves.length; i++) {
			ids.push(sawwaves[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_trianglewave_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < trianglewaves.length; i++) {
			ids.push(trianglewaves[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_constant_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < constants.length; i++) {
			ids.push(constants[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_wire_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < wires.length; i++) {
			ids.push(wires[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_net_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < nets.length; i++) {
			ids.push(nets[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_note_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < notes.length; i++) {
			ids.push(notes[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_rail_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < rails.length; i++) {
			ids.push(rails[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_voltmeter_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < voltmeters.length; i++) {
			ids.push(voltmeters[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_ohmmeter_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < ohmmeters.length; i++) {
			ids.push(ohmmeters[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_ammeter_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < ammeters.length; i++) {
			ids.push(ammeters[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_wattmeter_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < wattmeters.length; i++) {
			ids.push(wattmeters[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_fuse_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < fuses.length; i++) {
			ids.push(fuses[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_spst_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < spsts.length; i++) {
			ids.push(spsts[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_spdt_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < spdts.length; i++) {
			ids.push(spdts[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_not_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < nots.length; i++) {
			ids.push(nots[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_diode_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < diodes.length; i++) {
			ids.push(diodes[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_led_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < leds.length; i++) {
			ids.push(leds[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_zener_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < zeners.length; i++) {
			ids.push(zeners[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_potentiometer_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < potentiometers.length; i++) {
			ids.push(potentiometers[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_and_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < ands.length; i++) {
			ids.push(ands[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_or_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < ors.length; i++) {
			ids.push(ors[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_nand_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < nands.length; i++) {
			ids.push(nands[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_nor_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < nors.length; i++) {
			ids.push(nors[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_xor_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < xors.length; i++) {
			ids.push(xors[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_xnor_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < xnors.length; i++) {
			ids.push(xnors[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_dff_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < dffs.length; i++) {
			ids.push(dffs[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_vsat_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < vsats.length; i++) {
			ids.push(vsats[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_adder_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < adders.length; i++) {
			ids.push(adders[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_subtractor_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < subtractors.length; i++) {
			ids.push(subtractors[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_multiplier_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < multipliers.length; i++) {
			ids.push(multipliers[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_divider_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < dividers.length; i++) {
			ids.push(dividers[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_gain_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < gains.length; i++) {
			ids.push(gains[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_absval_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < absvals.length; i++) {
			ids.push(absvals[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_vcsw_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < vcsws.length; i++) {
			ids.push(vcsws[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_vcvs_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < vcvss.length; i++) {
			ids.push(vcvss[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_vccs_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < vccss.length; i++) {
			ids.push(vccss[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_cccs_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < cccss.length; i++) {
			ids.push(cccss[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_ccvs_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < ccvss.length; i++) {
			ids.push(ccvss[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_opamp_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < opamps.length; i++) {
			ids.push(opamps[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_nmosfet_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < nmosfets.length; i++) {
			ids.push(nmosfets[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_pmosfet_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < pmosfets.length; i++) {
			ids.push(pmosfets[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_npn_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < npns.length; i++) {
			ids.push(npns[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_pnp_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < pnps.length; i++) {
			ids.push(pnps[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_adc_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < adcs.length; i++) {
			ids.push(adcs[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_dac_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < dacs.length; i++) {
			ids.push(dacs[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_samplers_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < sandhs.length; i++) {
			ids.push(sandhs[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_pwm_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < pwms.length; i++) {
			ids.push(pwms[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_integrator_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < integrators.length; i++) {
			ids.push(integrators[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_differentiator_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < differentiators.length; i++) {
			ids.push(differentiators[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_lowpass_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < lowpasses.length; i++) {
			ids.push(lowpasses[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_highpass_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < highpasses.length; i++) {
			ids.push(highpasses[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_relay_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < relays.length; i++) {
			ids.push(relays[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_pid_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < pids.length; i++) {
			ids.push(pids[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_lut_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < luts.length; i++) {
			ids.push(luts[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_vcr_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < vcrs.length; i++) {
			ids.push(vcrs[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_vcca_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < vccas.length; i++) {
			ids.push(vccas[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_vcl_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < vcls.length; i++) {
			ids.push(vcls[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_grt_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < grts.length; i++) {
			ids.push(grts[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_tptz_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < tptzs.length; i++) {
			ids.push(tptzs[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	get_transformer_assignment(): number {
		let assignment: number = 0;
		var ids: Array<number> = [];

		for (var i: number = 0; i < transformers.length; i++) {
			ids.push(transformers[i].elm.id);
		}

		ids = ids.sort(this.sort_function);

		for (var i: number = 0; i < ids.length; i++) {
			if (ids[i] === assignment) {
				assignment++;
			} else {
				break;
			}
		}

		return assignment;
	}

	/* <!-- END AUTOMATICALLY GENERATED !--> */
	/* #INSERT_GENERATE_ADD_ELEMENT# */
	/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
	add_resistor(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		resistors.push(new Resistor(global.TYPE_RESISTOR, engine_functions.get_resistor_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = resistors.length - 1;
		if (index < resistors.length) {
			resistors[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = resistors[index].elm.id;
			global.focused_type = resistors[index].elm.type;
			global.focused_bounds = global.copy(resistors[index].bounds);
			global.focused = true;
			resistors[index].select();
			global.component_touched = true;
		}
	}

	add_capacitor(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		capacitors.push(new Capacitor(global.TYPE_CAPACITOR, engine_functions.get_capacitor_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = capacitors.length - 1;
		if (index < capacitors.length) {
			capacitors[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = capacitors[index].elm.id;
			global.focused_type = capacitors[index].elm.type;
			global.focused_bounds = global.copy(capacitors[index].bounds);
			global.focused = true;
			capacitors[index].select();
			global.component_touched = true;
		}
	}

	add_inductor(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		inductors.push(new Inductor(global.TYPE_INDUCTOR, engine_functions.get_inductor_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = inductors.length - 1;
		if (index < inductors.length) {
			inductors[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = inductors[index].elm.id;
			global.focused_type = inductors[index].elm.type;
			global.focused_bounds = global.copy(inductors[index].bounds);
			global.focused = true;
			inductors[index].select();
			global.component_touched = true;
		}
	}

	add_ground(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x;
		this.y1 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		this.mapper1.map_node1(p1[0], p1[1]);

		grounds.push(new Ground(global.TYPE_GROUND, engine_functions.get_ground_assignment(), this.mapper1.n1));
		var index: number = grounds.length - 1;
		if (index < grounds.length) {
			grounds[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = grounds[index].elm.id;
			global.focused_type = grounds[index].elm.type;
			global.focused_bounds = global.copy(grounds[index].bounds);
			global.focused = true;
			grounds[index].select();
			global.component_touched = true;
		}
	}

	add_dcsource(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		dcsources.push(new DCSource(global.TYPE_DCSOURCE, engine_functions.get_dcsource_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = dcsources.length - 1;
		if (index < dcsources.length) {
			dcsources[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = dcsources[index].elm.id;
			global.focused_type = dcsources[index].elm.type;
			global.focused_bounds = global.copy(dcsources[index].bounds);
			global.focused = true;
			dcsources[index].select();
			global.component_touched = true;
		}
	}

	add_dccurrent(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		dccurrents.push(new DCCurrent(global.TYPE_DCCURRENT, engine_functions.get_dccurrent_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = dccurrents.length - 1;
		if (index < dccurrents.length) {
			dccurrents[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = dccurrents[index].elm.id;
			global.focused_type = dccurrents[index].elm.type;
			global.focused_bounds = global.copy(dccurrents[index].bounds);
			global.focused = true;
			dccurrents[index].select();
			global.component_touched = true;
		}
	}

	add_acsource(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		acsources.push(new ACSource(global.TYPE_ACSOURCE, engine_functions.get_acsource_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = acsources.length - 1;
		if (index < acsources.length) {
			acsources[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = acsources[index].elm.id;
			global.focused_type = acsources[index].elm.type;
			global.focused_bounds = global.copy(acsources[index].bounds);
			global.focused = true;
			acsources[index].select();
			global.component_touched = true;
		}
	}

	add_accurrent(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		accurrents.push(new ACCurrent(global.TYPE_ACCURRENT, engine_functions.get_accurrent_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = accurrents.length - 1;
		if (index < accurrents.length) {
			accurrents[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = accurrents[index].elm.id;
			global.focused_type = accurrents[index].elm.type;
			global.focused_bounds = global.copy(accurrents[index].bounds);
			global.focused = true;
			accurrents[index].select();
			global.component_touched = true;
		}
	}

	add_squarewave(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		squarewaves.push(new SquareWave(global.TYPE_SQUAREWAVE, engine_functions.get_squarewave_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = squarewaves.length - 1;
		if (index < squarewaves.length) {
			squarewaves[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = squarewaves[index].elm.id;
			global.focused_type = squarewaves[index].elm.type;
			global.focused_bounds = global.copy(squarewaves[index].bounds);
			global.focused = true;
			squarewaves[index].select();
			global.component_touched = true;
		}
	}

	add_sawwave(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		sawwaves.push(new SawWave(global.TYPE_SAW, engine_functions.get_sawwave_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = sawwaves.length - 1;
		if (index < sawwaves.length) {
			sawwaves[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = sawwaves[index].elm.id;
			global.focused_type = sawwaves[index].elm.type;
			global.focused_bounds = global.copy(sawwaves[index].bounds);
			global.focused = true;
			sawwaves[index].select();
			global.component_touched = true;
		}
	}

	add_trianglewave(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		trianglewaves.push(new TriangleWave(global.TYPE_TRI, engine_functions.get_trianglewave_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = trianglewaves.length - 1;
		if (index < trianglewaves.length) {
			trianglewaves[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = trianglewaves[index].elm.id;
			global.focused_type = trianglewaves[index].elm.type;
			global.focused_bounds = global.copy(trianglewaves[index].bounds);
			global.focused = true;
			trianglewaves[index].select();
			global.component_touched = true;
		}
	}

	add_constant(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x;
		this.y1 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		this.mapper1.map_node1(p1[0], p1[1]);

		constants.push(new Constant(global.TYPE_CONSTANT, engine_functions.get_constant_assignment(), this.mapper1.n1));
		var index: number = constants.length - 1;
		if (index < constants.length) {
			constants[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = constants[index].elm.id;
			global.focused_type = constants[index].elm.type;
			global.focused_bounds = global.copy(constants[index].bounds);
			global.focused = true;
			constants[index].select();
			global.component_touched = true;
		}
	}

	add_net(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x;
		this.y1 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		this.mapper1.map_node1(p1[0], p1[1]);

		nets.push(new Net(global.TYPE_NET, engine_functions.get_net_assignment(), this.mapper1.n1));
		var index: number = nets.length - 1;
		if (index < nets.length) {
			nets[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = nets[index].elm.id;
			global.focused_type = nets[index].elm.type;
			global.focused_bounds = global.copy(nets[index].bounds);
			global.focused = true;
			nets[index].select();
			global.component_touched = true;
		}
	}

	add_note(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x;
		this.y1 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		this.mapper1.map_node1(p1[0], p1[1]);

		notes.push(new Note(global.TYPE_NOTE, engine_functions.get_note_assignment(), this.mapper1.n1));
		var index: number = notes.length - 1;
		if (index < notes.length) {
			notes[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = notes[index].elm.id;
			global.focused_type = notes[index].elm.type;
			global.focused_bounds = global.copy(notes[index].bounds);
			global.focused = true;
			notes[index].select();
			global.component_touched = true;
		}
	}

	add_rail(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x;
		this.y1 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		this.mapper1.map_node1(p1[0], p1[1]);

		rails.push(new Rail(global.TYPE_RAIL, engine_functions.get_rail_assignment(), this.mapper1.n1));
		var index: number = rails.length - 1;
		if (index < rails.length) {
			rails[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = rails[index].elm.id;
			global.focused_type = rails[index].elm.type;
			global.focused_bounds = global.copy(rails[index].bounds);
			global.focused = true;
			rails[index].select();
			global.component_touched = true;
		}
	}

	add_voltmeter(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		voltmeters.push(new VoltMeter(global.TYPE_VOLTMETER, engine_functions.get_voltmeter_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = voltmeters.length - 1;
		if (index < voltmeters.length) {
			voltmeters[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = voltmeters[index].elm.id;
			global.focused_type = voltmeters[index].elm.type;
			global.focused_bounds = global.copy(voltmeters[index].bounds);
			global.focused = true;
			voltmeters[index].select();
			global.component_touched = true;
		}
	}

	add_ohmmeter(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		ohmmeters.push(new OhmMeter(global.TYPE_OHMMETER, engine_functions.get_ohmmeter_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = ohmmeters.length - 1;
		if (index < ohmmeters.length) {
			ohmmeters[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = ohmmeters[index].elm.id;
			global.focused_type = ohmmeters[index].elm.type;
			global.focused_bounds = global.copy(ohmmeters[index].bounds);
			global.focused = true;
			ohmmeters[index].select();
			global.component_touched = true;
		}
	}

	add_ammeter(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		ammeters.push(new AmMeter(global.TYPE_AMMETER, engine_functions.get_ammeter_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = ammeters.length - 1;
		if (index < ammeters.length) {
			ammeters[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = ammeters[index].elm.id;
			global.focused_type = ammeters[index].elm.type;
			global.focused_bounds = global.copy(ammeters[index].bounds);
			global.focused = true;
			ammeters[index].select();
			global.component_touched = true;
		}
	}

	add_wattmeter(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x;
		this.y2 = global.mouse_y - 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		wattmeters.push(new WattMeter(global.TYPE_WATTMETER, engine_functions.get_wattmeter_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = wattmeters.length - 1;
		if (index < wattmeters.length) {
			wattmeters[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = wattmeters[index].elm.id;
			global.focused_type = wattmeters[index].elm.type;
			global.focused_bounds = global.copy(wattmeters[index].bounds);
			global.focused = true;
			wattmeters[index].select();
			global.component_touched = true;
		}
	}

	add_fuse(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		fuses.push(new Fuse(global.TYPE_FUSE, engine_functions.get_fuse_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = fuses.length - 1;
		if (index < fuses.length) {
			fuses[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = fuses[index].elm.id;
			global.focused_type = fuses[index].elm.type;
			global.focused_bounds = global.copy(fuses[index].bounds);
			global.focused = true;
			fuses[index].select();
			global.component_touched = true;
		}
	}

	add_spst(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		spsts.push(new SinglePoleSingleThrow(global.TYPE_SPST, engine_functions.get_spst_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = spsts.length - 1;
		if (index < spsts.length) {
			spsts[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = spsts[index].elm.id;
			global.focused_type = spsts[index].elm.type;
			global.focused_bounds = global.copy(spsts[index].bounds);
			global.focused = true;
			spsts[index].select();
			global.component_touched = true;
		}
	}

	add_spdt(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		spdts.push(new SinglePoleDoubleThrow(global.TYPE_SPDT, engine_functions.get_spdt_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = spdts.length - 1;
		if (index < spdts.length) {
			spdts[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = spdts[index].elm.id;
			global.focused_type = spdts[index].elm.type;
			global.focused_bounds = global.copy(spdts[index].bounds);
			global.focused = true;
			spdts[index].select();
			global.component_touched = true;
		}
	}

	add_not(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		nots.push(new NOTGate(global.TYPE_NOT, engine_functions.get_not_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = nots.length - 1;
		if (index < nots.length) {
			nots[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = nots[index].elm.id;
			global.focused_type = nots[index].elm.type;
			global.focused_bounds = global.copy(nots[index].bounds);
			global.focused = true;
			nots[index].select();
			global.component_touched = true;
		}
	}

	add_diode(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		diodes.push(new Diode(global.TYPE_DIODE, engine_functions.get_diode_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = diodes.length - 1;
		if (index < diodes.length) {
			diodes[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = diodes[index].elm.id;
			global.focused_type = diodes[index].elm.type;
			global.focused_bounds = global.copy(diodes[index].bounds);
			global.focused = true;
			diodes[index].select();
			global.component_touched = true;
		}
	}

	add_led(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		leds.push(new LightEmittingDiode(global.TYPE_LED, engine_functions.get_led_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = leds.length - 1;
		if (index < leds.length) {
			leds[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = leds[index].elm.id;
			global.focused_type = leds[index].elm.type;
			global.focused_bounds = global.copy(leds[index].bounds);
			global.focused = true;
			leds[index].select();
			global.component_touched = true;
		}
	}

	add_zener(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		zeners.push(new ZenerDiode(global.TYPE_ZENER, engine_functions.get_zener_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = zeners.length - 1;
		if (index < zeners.length) {
			zeners[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = zeners[index].elm.id;
			global.focused_type = zeners[index].elm.type;
			global.focused_bounds = global.copy(zeners[index].bounds);
			global.focused = true;
			zeners[index].select();
			global.component_touched = true;
		}
	}

	add_potentiometer(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x;
		this.y2 = global.mouse_y - 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		potentiometers.push(new Potentiometer(global.TYPE_POTENTIOMETER, engine_functions.get_potentiometer_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = potentiometers.length - 1;
		if (index < potentiometers.length) {
			potentiometers[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = potentiometers[index].elm.id;
			global.focused_type = potentiometers[index].elm.type;
			global.focused_bounds = global.copy(potentiometers[index].bounds);
			global.focused = true;
			potentiometers[index].select();
			global.component_touched = true;
		}
	}

	add_and(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		ands.push(new ANDGate(global.TYPE_AND, engine_functions.get_and_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = ands.length - 1;
		if (index < ands.length) {
			ands[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = ands[index].elm.id;
			global.focused_type = ands[index].elm.type;
			global.focused_bounds = global.copy(ands[index].bounds);
			global.focused = true;
			ands[index].select();
			global.component_touched = true;
		}
	}

	add_or(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		ors.push(new ORGate(global.TYPE_OR, engine_functions.get_or_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = ors.length - 1;
		if (index < ors.length) {
			ors[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = ors[index].elm.id;
			global.focused_type = ors[index].elm.type;
			global.focused_bounds = global.copy(ors[index].bounds);
			global.focused = true;
			ors[index].select();
			global.component_touched = true;
		}
	}

	add_nand(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		nands.push(new NANDGate(global.TYPE_NAND, engine_functions.get_nand_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = nands.length - 1;
		if (index < nands.length) {
			nands[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = nands[index].elm.id;
			global.focused_type = nands[index].elm.type;
			global.focused_bounds = global.copy(nands[index].bounds);
			global.focused = true;
			nands[index].select();
			global.component_touched = true;
		}
	}

	add_nor(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		nors.push(new NORGate(global.TYPE_NOR, engine_functions.get_nor_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = nors.length - 1;
		if (index < nors.length) {
			nors[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = nors[index].elm.id;
			global.focused_type = nors[index].elm.type;
			global.focused_bounds = global.copy(nors[index].bounds);
			global.focused = true;
			nors[index].select();
			global.component_touched = true;
		}
	}

	add_xor(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		xors.push(new XORGate(global.TYPE_XOR, engine_functions.get_xor_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = xors.length - 1;
		if (index < xors.length) {
			xors[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = xors[index].elm.id;
			global.focused_type = xors[index].elm.type;
			global.focused_bounds = global.copy(xors[index].bounds);
			global.focused = true;
			xors[index].select();
			global.component_touched = true;
		}
	}

	add_xnor(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		xnors.push(new XNORGate(global.TYPE_XNOR, engine_functions.get_xnor_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = xnors.length - 1;
		if (index < xnors.length) {
			xnors[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = xnors[index].elm.id;
			global.focused_type = xnors[index].elm.type;
			global.focused_bounds = global.copy(xnors[index].bounds);
			global.focused = true;
			xnors[index].select();
			global.component_touched = true;
		}
	}

	add_dff(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y - 2 * global.node_space_y;
		this.x4 = global.mouse_x + 2 * global.node_space_x;
		this.y4 = global.mouse_y + 2 * global.node_space_y;

		let p1: Array<number> = this.mapper4.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper4.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper4.snap_to_grid(this.x3, this.y3);
		let p4: Array<number> = this.mapper4.snap_to_grid(this.x4, this.y4);
		this.mapper4.map_node4(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);

		dffs.push(new DFlipFlop(global.TYPE_DFF, engine_functions.get_dff_assignment(), this.mapper4.n1, this.mapper4.n2, this.mapper4.n3, this.mapper4.n4));
		var index: number = dffs.length - 1;
		if (index < dffs.length) {
			dffs[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = dffs[index].elm.id;
			global.focused_type = dffs[index].elm.type;
			global.focused_bounds = global.copy(dffs[index].bounds);
			global.focused = true;
			dffs[index].select();
			global.component_touched = true;
		}
	}

	add_vsat(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		vsats.push(new VoltageSaturation(global.TYPE_VSAT, engine_functions.get_vsat_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = vsats.length - 1;
		if (index < vsats.length) {
			vsats[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = vsats[index].elm.id;
			global.focused_type = vsats[index].elm.type;
			global.focused_bounds = global.copy(vsats[index].bounds);
			global.focused = true;
			vsats[index].select();
			global.component_touched = true;
		}
	}

	add_adder(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		adders.push(new Adder(global.TYPE_ADD, engine_functions.get_adder_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = adders.length - 1;
		if (index < adders.length) {
			adders[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = adders[index].elm.id;
			global.focused_type = adders[index].elm.type;
			global.focused_bounds = global.copy(adders[index].bounds);
			global.focused = true;
			adders[index].select();
			global.component_touched = true;
		}
	}

	add_subtractor(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		subtractors.push(new Subtractor(global.TYPE_SUB, engine_functions.get_subtractor_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = subtractors.length - 1;
		if (index < subtractors.length) {
			subtractors[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = subtractors[index].elm.id;
			global.focused_type = subtractors[index].elm.type;
			global.focused_bounds = global.copy(subtractors[index].bounds);
			global.focused = true;
			subtractors[index].select();
			global.component_touched = true;
		}
	}

	add_multiplier(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		multipliers.push(new Multiplier(global.TYPE_MUL, engine_functions.get_multiplier_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = multipliers.length - 1;
		if (index < multipliers.length) {
			multipliers[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = multipliers[index].elm.id;
			global.focused_type = multipliers[index].elm.type;
			global.focused_bounds = global.copy(multipliers[index].bounds);
			global.focused = true;
			multipliers[index].select();
			global.component_touched = true;
		}
	}

	add_divider(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		dividers.push(new Divider(global.TYPE_DIV, engine_functions.get_divider_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = dividers.length - 1;
		if (index < dividers.length) {
			dividers[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = dividers[index].elm.id;
			global.focused_type = dividers[index].elm.type;
			global.focused_bounds = global.copy(dividers[index].bounds);
			global.focused = true;
			dividers[index].select();
			global.component_touched = true;
		}
	}

	add_gain(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		gains.push(new GainBlock(global.TYPE_GAIN, engine_functions.get_gain_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = gains.length - 1;
		if (index < gains.length) {
			gains[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = gains[index].elm.id;
			global.focused_type = gains[index].elm.type;
			global.focused_bounds = global.copy(gains[index].bounds);
			global.focused = true;
			gains[index].select();
			global.component_touched = true;
		}
	}

	add_absval(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		absvals.push(new AbsoluteValue(global.TYPE_ABS, engine_functions.get_absval_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = absvals.length - 1;
		if (index < absvals.length) {
			absvals[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = absvals[index].elm.id;
			global.focused_type = absvals[index].elm.type;
			global.focused_bounds = global.copy(absvals[index].bounds);
			global.focused = true;
			absvals[index].select();
			global.component_touched = true;
		}
	}

	add_vcsw(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x;
		this.y2 = global.mouse_y - 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		vcsws.push(new VoltageControlledSwitch(global.TYPE_VCSW, engine_functions.get_vcsw_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = vcsws.length - 1;
		if (index < vcsws.length) {
			vcsws[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = vcsws[index].elm.id;
			global.focused_type = vcsws[index].elm.type;
			global.focused_bounds = global.copy(vcsws[index].bounds);
			global.focused = true;
			vcsws[index].select();
			global.component_touched = true;
		}
	}

	add_vcvs(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y - 2 * global.node_space_y;
		this.x4 = global.mouse_x + 2 * global.node_space_x;
		this.y4 = global.mouse_y + 2 * global.node_space_y;

		let p1: Array<number> = this.mapper4.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper4.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper4.snap_to_grid(this.x3, this.y3);
		let p4: Array<number> = this.mapper4.snap_to_grid(this.x4, this.y4);
		this.mapper4.map_node4(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);

		vcvss.push(new VoltageControlledVoltageSource(global.TYPE_VCVS, engine_functions.get_vcvs_assignment(), this.mapper4.n1, this.mapper4.n2, this.mapper4.n3, this.mapper4.n4));
		var index: number = vcvss.length - 1;
		if (index < vcvss.length) {
			vcvss[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = vcvss[index].elm.id;
			global.focused_type = vcvss[index].elm.type;
			global.focused_bounds = global.copy(vcvss[index].bounds);
			global.focused = true;
			vcvss[index].select();
			global.component_touched = true;
		}
	}

	add_vccs(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y - 2 * global.node_space_y;
		this.x4 = global.mouse_x + 2 * global.node_space_x;
		this.y4 = global.mouse_y + 2 * global.node_space_y;

		let p1: Array<number> = this.mapper4.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper4.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper4.snap_to_grid(this.x3, this.y3);
		let p4: Array<number> = this.mapper4.snap_to_grid(this.x4, this.y4);
		this.mapper4.map_node4(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);

		vccss.push(new VoltageControlledCurrentSource(global.TYPE_VCCS, engine_functions.get_vccs_assignment(), this.mapper4.n1, this.mapper4.n2, this.mapper4.n3, this.mapper4.n4));
		var index: number = vccss.length - 1;
		if (index < vccss.length) {
			vccss[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = vccss[index].elm.id;
			global.focused_type = vccss[index].elm.type;
			global.focused_bounds = global.copy(vccss[index].bounds);
			global.focused = true;
			vccss[index].select();
			global.component_touched = true;
		}
	}

	add_cccs(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y - 2 * global.node_space_y;
		this.x4 = global.mouse_x + 2 * global.node_space_x;
		this.y4 = global.mouse_y + 2 * global.node_space_y;

		let p1: Array<number> = this.mapper4.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper4.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper4.snap_to_grid(this.x3, this.y3);
		let p4: Array<number> = this.mapper4.snap_to_grid(this.x4, this.y4);
		this.mapper4.map_node4(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);

		cccss.push(new CurrentControlledCurrentSource(global.TYPE_CCCS, engine_functions.get_cccs_assignment(), this.mapper4.n1, this.mapper4.n2, this.mapper4.n3, this.mapper4.n4));
		var index: number = cccss.length - 1;
		if (index < cccss.length) {
			cccss[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = cccss[index].elm.id;
			global.focused_type = cccss[index].elm.type;
			global.focused_bounds = global.copy(cccss[index].bounds);
			global.focused = true;
			cccss[index].select();
			global.component_touched = true;
		}
	}

	add_ccvs(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y - 2 * global.node_space_y;
		this.x4 = global.mouse_x + 2 * global.node_space_x;
		this.y4 = global.mouse_y + 2 * global.node_space_y;

		let p1: Array<number> = this.mapper4.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper4.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper4.snap_to_grid(this.x3, this.y3);
		let p4: Array<number> = this.mapper4.snap_to_grid(this.x4, this.y4);
		this.mapper4.map_node4(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);

		ccvss.push(new CurrentControlledVoltageSource(global.TYPE_CCVS, engine_functions.get_ccvs_assignment(), this.mapper4.n1, this.mapper4.n2, this.mapper4.n3, this.mapper4.n4));
		var index: number = ccvss.length - 1;
		if (index < ccvss.length) {
			ccvss[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = ccvss[index].elm.id;
			global.focused_type = ccvss[index].elm.type;
			global.focused_bounds = global.copy(ccvss[index].bounds);
			global.focused = true;
			ccvss[index].select();
			global.component_touched = true;
		}
	}

	add_opamp(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		opamps.push(new OperationalAmplifier(global.TYPE_OPAMP, engine_functions.get_opamp_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = opamps.length - 1;
		if (index < opamps.length) {
			opamps[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = opamps[index].elm.id;
			global.focused_type = opamps[index].elm.type;
			global.focused_bounds = global.copy(opamps[index].bounds);
			global.focused = true;
			opamps[index].select();
			global.component_touched = true;
		}
	}

	add_nmosfet(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x + 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x - 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		nmosfets.push(new NChannelMOSFET(global.TYPE_NMOS, engine_functions.get_nmosfet_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = nmosfets.length - 1;
		if (index < nmosfets.length) {
			nmosfets[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = nmosfets[index].elm.id;
			global.focused_type = nmosfets[index].elm.type;
			global.focused_bounds = global.copy(nmosfets[index].bounds);
			global.focused = true;
			nmosfets[index].select();
			global.component_touched = true;
		}
	}

	add_pmosfet(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x + 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x - 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		pmosfets.push(new PChannelMOSFET(global.TYPE_PMOS, engine_functions.get_pmosfet_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = pmosfets.length - 1;
		if (index < pmosfets.length) {
			pmosfets[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = pmosfets[index].elm.id;
			global.focused_type = pmosfets[index].elm.type;
			global.focused_bounds = global.copy(pmosfets[index].bounds);
			global.focused = true;
			pmosfets[index].select();
			global.component_touched = true;
		}
	}

	add_npn(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x + 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x - 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		npns.push(new NPNBipolarJunctionTransistor(global.TYPE_NPN, engine_functions.get_npn_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = npns.length - 1;
		if (index < npns.length) {
			npns[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = npns[index].elm.id;
			global.focused_type = npns[index].elm.type;
			global.focused_bounds = global.copy(npns[index].bounds);
			global.focused = true;
			npns[index].select();
			global.component_touched = true;
		}
	}

	add_pnp(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x + 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x - 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		pnps.push(new PNPBipolarJunctionTransistor(global.TYPE_PNP, engine_functions.get_pnp_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = pnps.length - 1;
		if (index < pnps.length) {
			pnps[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = pnps[index].elm.id;
			global.focused_type = pnps[index].elm.type;
			global.focused_bounds = global.copy(pnps[index].bounds);
			global.focused = true;
			pnps[index].select();
			global.component_touched = true;
		}
	}

	add_adc(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		adcs.push(new ADCModule(global.TYPE_ADC, engine_functions.get_adc_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = adcs.length - 1;
		if (index < adcs.length) {
			adcs[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = adcs[index].elm.id;
			global.focused_type = adcs[index].elm.type;
			global.focused_bounds = global.copy(adcs[index].bounds);
			global.focused = true;
			adcs[index].select();
			global.component_touched = true;
		}
	}

	add_dac(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		dacs.push(new DACModule(global.TYPE_DAC, engine_functions.get_dac_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = dacs.length - 1;
		if (index < dacs.length) {
			dacs[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = dacs[index].elm.id;
			global.focused_type = dacs[index].elm.type;
			global.focused_bounds = global.copy(dacs[index].bounds);
			global.focused = true;
			dacs[index].select();
			global.component_touched = true;
		}
	}

	add_samplers(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x;
		this.y2 = global.mouse_y - 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		sandhs.push(new SampleAndHold(global.TYPE_SAH, engine_functions.get_samplers_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = sandhs.length - 1;
		if (index < sandhs.length) {
			sandhs[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = sandhs[index].elm.id;
			global.focused_type = sandhs[index].elm.type;
			global.focused_bounds = global.copy(sandhs[index].bounds);
			global.focused = true;
			sandhs[index].select();
			global.component_touched = true;
		}
	}

	add_pwm(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		pwms.push(new PulseWidthModulator(global.TYPE_PWM, engine_functions.get_pwm_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = pwms.length - 1;
		if (index < pwms.length) {
			pwms[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = pwms[index].elm.id;
			global.focused_type = pwms[index].elm.type;
			global.focused_bounds = global.copy(pwms[index].bounds);
			global.focused = true;
			pwms[index].select();
			global.component_touched = true;
		}
	}

	add_integrator(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		integrators.push(new IntegratorModule(global.TYPE_INTEGRATOR, engine_functions.get_integrator_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = integrators.length - 1;
		if (index < integrators.length) {
			integrators[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = integrators[index].elm.id;
			global.focused_type = integrators[index].elm.type;
			global.focused_bounds = global.copy(integrators[index].bounds);
			global.focused = true;
			integrators[index].select();
			global.component_touched = true;
		}
	}

	add_differentiator(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		differentiators.push(new DifferentiatorModule(global.TYPE_DIFFERENTIATOR, engine_functions.get_differentiator_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = differentiators.length - 1;
		if (index < differentiators.length) {
			differentiators[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = differentiators[index].elm.id;
			global.focused_type = differentiators[index].elm.type;
			global.focused_bounds = global.copy(differentiators[index].bounds);
			global.focused = true;
			differentiators[index].select();
			global.component_touched = true;
		}
	}

	add_lowpass(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		lowpasses.push(new LowPassFilter(global.TYPE_LPF, engine_functions.get_lowpass_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = lowpasses.length - 1;
		if (index < lowpasses.length) {
			lowpasses[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = lowpasses[index].elm.id;
			global.focused_type = lowpasses[index].elm.type;
			global.focused_bounds = global.copy(lowpasses[index].bounds);
			global.focused = true;
			lowpasses[index].select();
			global.component_touched = true;
		}
	}

	add_highpass(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		highpasses.push(new HighPassFilter(global.TYPE_HPF, engine_functions.get_highpass_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = highpasses.length - 1;
		if (index < highpasses.length) {
			highpasses[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = highpasses[index].elm.id;
			global.focused_type = highpasses[index].elm.type;
			global.focused_bounds = global.copy(highpasses[index].bounds);
			global.focused = true;
			highpasses[index].select();
			global.component_touched = true;
		}
	}

	add_relay(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y - 2 * global.node_space_y;
		this.x4 = global.mouse_x + 2 * global.node_space_x;
		this.y4 = global.mouse_y + 2 * global.node_space_y;

		let p1: Array<number> = this.mapper4.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper4.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper4.snap_to_grid(this.x3, this.y3);
		let p4: Array<number> = this.mapper4.snap_to_grid(this.x4, this.y4);
		this.mapper4.map_node4(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);

		relays.push(new Relay(global.TYPE_REL, engine_functions.get_relay_assignment(), this.mapper4.n1, this.mapper4.n2, this.mapper4.n3, this.mapper4.n4));
		var index: number = relays.length - 1;
		if (index < relays.length) {
			relays[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = relays[index].elm.id;
			global.focused_type = relays[index].elm.type;
			global.focused_bounds = global.copy(relays[index].bounds);
			global.focused = true;
			relays[index].select();
			global.component_touched = true;
		}
	}

	add_pid(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x;
		this.y2 = global.mouse_y - 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		pids.push(new PIDModule(global.TYPE_PID, engine_functions.get_pid_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = pids.length - 1;
		if (index < pids.length) {
			pids[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = pids[index].elm.id;
			global.focused_type = pids[index].elm.type;
			global.focused_bounds = global.copy(pids[index].bounds);
			global.focused = true;
			pids[index].select();
			global.component_touched = true;
		}
	}

	add_lut(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		luts.push(new LookUpTable(global.TYPE_LUT, engine_functions.get_lut_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = luts.length - 1;
		if (index < luts.length) {
			luts[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = luts[index].elm.id;
			global.focused_type = luts[index].elm.type;
			global.focused_bounds = global.copy(luts[index].bounds);
			global.focused = true;
			luts[index].select();
			global.component_touched = true;
		}
	}

	add_vcr(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x;
		this.y2 = global.mouse_y - 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		vcrs.push(new VoltageControlledResistor(global.TYPE_VCR, engine_functions.get_vcr_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = vcrs.length - 1;
		if (index < vcrs.length) {
			vcrs[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = vcrs[index].elm.id;
			global.focused_type = vcrs[index].elm.type;
			global.focused_bounds = global.copy(vcrs[index].bounds);
			global.focused = true;
			vcrs[index].select();
			global.component_touched = true;
		}
	}

	add_vcca(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x;
		this.y2 = global.mouse_y - 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		vccas.push(new VoltageControlledCapacitor(global.TYPE_VCCA, engine_functions.get_vcca_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = vccas.length - 1;
		if (index < vccas.length) {
			vccas[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = vccas[index].elm.id;
			global.focused_type = vccas[index].elm.type;
			global.focused_bounds = global.copy(vccas[index].bounds);
			global.focused = true;
			vccas[index].select();
			global.component_touched = true;
		}
	}

	add_vcl(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x;
		this.y2 = global.mouse_y - 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		vcls.push(new VoltageControlledInductor(global.TYPE_VCL, engine_functions.get_vcl_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = vcls.length - 1;
		if (index < vcls.length) {
			vcls[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = vcls[index].elm.id;
			global.focused_type = vcls[index].elm.type;
			global.focused_bounds = global.copy(vcls[index].bounds);
			global.focused = true;
			vcls[index].select();
			global.component_touched = true;
		}
	}

	add_grt(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x;
		this.y2 = global.mouse_y - 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y;

		let p1: Array<number> = this.mapper3.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper3.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper3.snap_to_grid(this.x3, this.y3);
		this.mapper3.map_node3(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);

		grts.push(new GreaterThan(global.TYPE_GRT, engine_functions.get_grt_assignment(), this.mapper3.n1, this.mapper3.n2, this.mapper3.n3));
		var index: number = grts.length - 1;
		if (index < grts.length) {
			grts[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = grts[index].elm.id;
			global.focused_type = grts[index].elm.type;
			global.focused_bounds = global.copy(grts[index].bounds);
			global.focused = true;
			grts[index].select();
			global.component_touched = true;
		}
	}

	add_tptz(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y;
		this.x2 = global.mouse_x + 2 * global.node_space_x;
		this.y2 = global.mouse_y;

		let p1: Array<number> = this.mapper2.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper2.snap_to_grid(this.x2, this.y2);
		this.mapper2.map_node2(p1[0], p1[1], p2[0], p2[1]);

		tptzs.push(new TPTZModule(global.TYPE_TPTZ, engine_functions.get_tptz_assignment(), this.mapper2.n1, this.mapper2.n2));
		var index: number = tptzs.length - 1;
		if (index < tptzs.length) {
			tptzs[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = tptzs[index].elm.id;
			global.focused_type = tptzs[index].elm.type;
			global.focused_bounds = global.copy(tptzs[index].bounds);
			global.focused = true;
			tptzs[index].select();
			global.component_touched = true;
		}
	}

	add_transformer(): void {
		this.reset_selection(true);
		this.x1 = global.mouse_x - 2 * global.node_space_x;
		this.y1 = global.mouse_y - 2 * global.node_space_y;
		this.x2 = global.mouse_x - 2 * global.node_space_x;
		this.y2 = global.mouse_y + 2 * global.node_space_y;
		this.x3 = global.mouse_x + 2 * global.node_space_x;
		this.y3 = global.mouse_y - 2 * global.node_space_y;
		this.x4 = global.mouse_x + 2 * global.node_space_x;
		this.y4 = global.mouse_y + 2 * global.node_space_y;

		let p1: Array<number> = this.mapper4.snap_to_grid(this.x1, this.y1);
		let p2: Array<number> = this.mapper4.snap_to_grid(this.x2, this.y2);
		let p3: Array<number> = this.mapper4.snap_to_grid(this.x3, this.y3);
		let p4: Array<number> = this.mapper4.snap_to_grid(this.x4, this.y4);
		this.mapper4.map_node4(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1], p4[0], p4[1]);

		transformers.push(new Transformer(global.TYPE_TRAN, engine_functions.get_transformer_assignment(), this.mapper4.n1, this.mapper4.n2, this.mapper4.n3, this.mapper4.n4));
		var index: number = transformers.length - 1;
		if (index < transformers.length) {
			transformers[index].is_translating = false;
			global.SIGNAL_BUILD_ELEMENT = true;
			global.focused_id = transformers[index].elm.id;
			global.focused_type = transformers[index].elm.type;
			global.focused_bounds = global.copy(transformers[index].bounds);
			global.focused = true;
			transformers[index].select();
			global.component_touched = true;
		}
	}

	/* <!-- END AUTOMATICALLY GENERATED !--> */
	assign_element_simulation_ids() {
		/* #INSERT_GENERATE_ELEMENT_SIMULATION_IDS# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		let elm_max: number = global.element_max();
		for (var i: number = 0; i < elm_max; i++) {
			if (i > -1 && i < resistors.length) {
				resistors[i].simulation_id = i;
			}

			if (i > -1 && i < capacitors.length) {
				capacitors[i].simulation_id = i;
			}

			if (i > -1 && i < inductors.length) {
				inductors[i].simulation_id = i;
			}

			if (i > -1 && i < grounds.length) {
				grounds[i].simulation_id = i;
			}

			if (i > -1 && i < dcsources.length) {
				dcsources[i].simulation_id = i;
			}

			if (i > -1 && i < dccurrents.length) {
				dccurrents[i].simulation_id = i;
			}

			if (i > -1 && i < acsources.length) {
				acsources[i].simulation_id = i;
			}

			if (i > -1 && i < accurrents.length) {
				accurrents[i].simulation_id = i;
			}

			if (i > -1 && i < squarewaves.length) {
				squarewaves[i].simulation_id = i;
			}

			if (i > -1 && i < sawwaves.length) {
				sawwaves[i].simulation_id = i;
			}

			if (i > -1 && i < trianglewaves.length) {
				trianglewaves[i].simulation_id = i;
			}

			if (i > -1 && i < constants.length) {
				constants[i].simulation_id = i;
			}

			if (i > -1 && i < nets.length) {
				nets[i].simulation_id = i;
			}

			if (i > -1 && i < notes.length) {
				notes[i].simulation_id = i;
			}

			if (i > -1 && i < rails.length) {
				rails[i].simulation_id = i;
			}

			if (i > -1 && i < voltmeters.length) {
				voltmeters[i].simulation_id = i;
			}

			if (i > -1 && i < ohmmeters.length) {
				ohmmeters[i].simulation_id = i;
			}

			if (i > -1 && i < ammeters.length) {
				ammeters[i].simulation_id = i;
			}

			if (i > -1 && i < wattmeters.length) {
				wattmeters[i].simulation_id = i;
			}

			if (i > -1 && i < fuses.length) {
				fuses[i].simulation_id = i;
			}

			if (i > -1 && i < spsts.length) {
				spsts[i].simulation_id = i;
			}

			if (i > -1 && i < spdts.length) {
				spdts[i].simulation_id = i;
			}

			if (i > -1 && i < nots.length) {
				nots[i].simulation_id = i;
			}

			if (i > -1 && i < diodes.length) {
				diodes[i].simulation_id = i;
			}

			if (i > -1 && i < leds.length) {
				leds[i].simulation_id = i;
			}

			if (i > -1 && i < zeners.length) {
				zeners[i].simulation_id = i;
			}

			if (i > -1 && i < potentiometers.length) {
				potentiometers[i].simulation_id = i;
			}

			if (i > -1 && i < ands.length) {
				ands[i].simulation_id = i;
			}

			if (i > -1 && i < ors.length) {
				ors[i].simulation_id = i;
			}

			if (i > -1 && i < nands.length) {
				nands[i].simulation_id = i;
			}

			if (i > -1 && i < nors.length) {
				nors[i].simulation_id = i;
			}

			if (i > -1 && i < xors.length) {
				xors[i].simulation_id = i;
			}

			if (i > -1 && i < xnors.length) {
				xnors[i].simulation_id = i;
			}

			if (i > -1 && i < dffs.length) {
				dffs[i].simulation_id = i;
			}

			if (i > -1 && i < vsats.length) {
				vsats[i].simulation_id = i;
			}

			if (i > -1 && i < adders.length) {
				adders[i].simulation_id = i;
			}

			if (i > -1 && i < subtractors.length) {
				subtractors[i].simulation_id = i;
			}

			if (i > -1 && i < multipliers.length) {
				multipliers[i].simulation_id = i;
			}

			if (i > -1 && i < dividers.length) {
				dividers[i].simulation_id = i;
			}

			if (i > -1 && i < gains.length) {
				gains[i].simulation_id = i;
			}

			if (i > -1 && i < absvals.length) {
				absvals[i].simulation_id = i;
			}

			if (i > -1 && i < vcsws.length) {
				vcsws[i].simulation_id = i;
			}

			if (i > -1 && i < vcvss.length) {
				vcvss[i].simulation_id = i;
			}

			if (i > -1 && i < vccss.length) {
				vccss[i].simulation_id = i;
			}

			if (i > -1 && i < cccss.length) {
				cccss[i].simulation_id = i;
			}

			if (i > -1 && i < ccvss.length) {
				ccvss[i].simulation_id = i;
			}

			if (i > -1 && i < opamps.length) {
				opamps[i].simulation_id = i;
			}

			if (i > -1 && i < nmosfets.length) {
				nmosfets[i].simulation_id = i;
			}

			if (i > -1 && i < pmosfets.length) {
				pmosfets[i].simulation_id = i;
			}

			if (i > -1 && i < npns.length) {
				npns[i].simulation_id = i;
			}

			if (i > -1 && i < pnps.length) {
				pnps[i].simulation_id = i;
			}

			if (i > -1 && i < adcs.length) {
				adcs[i].simulation_id = i;
			}

			if (i > -1 && i < dacs.length) {
				dacs[i].simulation_id = i;
			}

			if (i > -1 && i < sandhs.length) {
				sandhs[i].simulation_id = i;
			}

			if (i > -1 && i < pwms.length) {
				pwms[i].simulation_id = i;
			}

			if (i > -1 && i < integrators.length) {
				integrators[i].simulation_id = i;
			}

			if (i > -1 && i < differentiators.length) {
				differentiators[i].simulation_id = i;
			}

			if (i > -1 && i < lowpasses.length) {
				lowpasses[i].simulation_id = i;
			}

			if (i > -1 && i < highpasses.length) {
				highpasses[i].simulation_id = i;
			}

			if (i > -1 && i < relays.length) {
				relays[i].simulation_id = i;
			}

			if (i > -1 && i < pids.length) {
				pids[i].simulation_id = i;
			}

			if (i > -1 && i < luts.length) {
				luts[i].simulation_id = i;
			}

			if (i > -1 && i < vcrs.length) {
				vcrs[i].simulation_id = i;
			}

			if (i > -1 && i < vccas.length) {
				vccas[i].simulation_id = i;
			}

			if (i > -1 && i < vcls.length) {
				vcls[i].simulation_id = i;
			}

			if (i > -1 && i < grts.length) {
				grts[i].simulation_id = i;
			}

			if (i > -1 && i < tptzs.length) {
				tptzs[i].simulation_id = i;
			}

			if (i > -1 && i < transformers.length) {
				transformers[i].simulation_id = i;
			}
		}

		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	stamp_elements() {
		/* #INSERT_GENERATE_ELEMENT_STAMP# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < resistors.length; i++) {
			resistors[i].stamp();
		}

		for (var i: number = 0; i < capacitors.length; i++) {
			capacitors[i].stamp();
		}

		for (var i: number = 0; i < inductors.length; i++) {
			inductors[i].stamp();
		}

		for (var i: number = 0; i < grounds.length; i++) {
			grounds[i].stamp();
		}

		for (var i: number = 0; i < dcsources.length; i++) {
			dcsources[i].stamp();
		}

		for (var i: number = 0; i < dccurrents.length; i++) {
			dccurrents[i].stamp();
		}

		for (var i: number = 0; i < acsources.length; i++) {
			acsources[i].stamp();
		}

		for (var i: number = 0; i < accurrents.length; i++) {
			accurrents[i].stamp();
		}

		for (var i: number = 0; i < squarewaves.length; i++) {
			squarewaves[i].stamp();
		}

		for (var i: number = 0; i < sawwaves.length; i++) {
			sawwaves[i].stamp();
		}

		for (var i: number = 0; i < trianglewaves.length; i++) {
			trianglewaves[i].stamp();
		}

		for (var i: number = 0; i < constants.length; i++) {
			constants[i].stamp();
		}

		for (var i: number = 0; i < nets.length; i++) {
			nets[i].stamp();
		}

		for (var i: number = 0; i < notes.length; i++) {
			notes[i].stamp();
		}

		for (var i: number = 0; i < rails.length; i++) {
			rails[i].stamp();
		}

		for (var i: number = 0; i < voltmeters.length; i++) {
			voltmeters[i].stamp();
		}

		for (var i: number = 0; i < ohmmeters.length; i++) {
			ohmmeters[i].stamp();
		}

		for (var i: number = 0; i < ammeters.length; i++) {
			ammeters[i].stamp();
		}

		for (var i: number = 0; i < wattmeters.length; i++) {
			wattmeters[i].stamp();
		}

		for (var i: number = 0; i < fuses.length; i++) {
			fuses[i].stamp();
		}

		for (var i: number = 0; i < spsts.length; i++) {
			spsts[i].stamp();
		}

		for (var i: number = 0; i < spdts.length; i++) {
			spdts[i].stamp();
		}

		for (var i: number = 0; i < nots.length; i++) {
			nots[i].stamp();
		}

		for (var i: number = 0; i < diodes.length; i++) {
			diodes[i].stamp();
		}

		for (var i: number = 0; i < leds.length; i++) {
			leds[i].stamp();
		}

		for (var i: number = 0; i < zeners.length; i++) {
			zeners[i].stamp();
		}

		for (var i: number = 0; i < potentiometers.length; i++) {
			potentiometers[i].stamp();
		}

		for (var i: number = 0; i < ands.length; i++) {
			ands[i].stamp();
		}

		for (var i: number = 0; i < ors.length; i++) {
			ors[i].stamp();
		}

		for (var i: number = 0; i < nands.length; i++) {
			nands[i].stamp();
		}

		for (var i: number = 0; i < nors.length; i++) {
			nors[i].stamp();
		}

		for (var i: number = 0; i < xors.length; i++) {
			xors[i].stamp();
		}

		for (var i: number = 0; i < xnors.length; i++) {
			xnors[i].stamp();
		}

		for (var i: number = 0; i < dffs.length; i++) {
			dffs[i].stamp();
		}

		for (var i: number = 0; i < vsats.length; i++) {
			vsats[i].stamp();
		}

		for (var i: number = 0; i < adders.length; i++) {
			adders[i].stamp();
		}

		for (var i: number = 0; i < subtractors.length; i++) {
			subtractors[i].stamp();
		}

		for (var i: number = 0; i < multipliers.length; i++) {
			multipliers[i].stamp();
		}

		for (var i: number = 0; i < dividers.length; i++) {
			dividers[i].stamp();
		}

		for (var i: number = 0; i < gains.length; i++) {
			gains[i].stamp();
		}

		for (var i: number = 0; i < absvals.length; i++) {
			absvals[i].stamp();
		}

		for (var i: number = 0; i < vcsws.length; i++) {
			vcsws[i].stamp();
		}

		for (var i: number = 0; i < vcvss.length; i++) {
			vcvss[i].stamp();
		}

		for (var i: number = 0; i < vccss.length; i++) {
			vccss[i].stamp();
		}

		for (var i: number = 0; i < cccss.length; i++) {
			cccss[i].stamp();
		}

		for (var i: number = 0; i < ccvss.length; i++) {
			ccvss[i].stamp();
		}

		for (var i: number = 0; i < opamps.length; i++) {
			opamps[i].stamp();
		}

		for (var i: number = 0; i < nmosfets.length; i++) {
			nmosfets[i].stamp();
		}

		for (var i: number = 0; i < pmosfets.length; i++) {
			pmosfets[i].stamp();
		}

		for (var i: number = 0; i < npns.length; i++) {
			npns[i].stamp();
		}

		for (var i: number = 0; i < pnps.length; i++) {
			pnps[i].stamp();
		}

		for (var i: number = 0; i < adcs.length; i++) {
			adcs[i].stamp();
		}

		for (var i: number = 0; i < dacs.length; i++) {
			dacs[i].stamp();
		}

		for (var i: number = 0; i < sandhs.length; i++) {
			sandhs[i].stamp();
		}

		for (var i: number = 0; i < pwms.length; i++) {
			pwms[i].stamp();
		}

		for (var i: number = 0; i < integrators.length; i++) {
			integrators[i].stamp();
		}

		for (var i: number = 0; i < differentiators.length; i++) {
			differentiators[i].stamp();
		}

		for (var i: number = 0; i < lowpasses.length; i++) {
			lowpasses[i].stamp();
		}

		for (var i: number = 0; i < highpasses.length; i++) {
			highpasses[i].stamp();
		}

		for (var i: number = 0; i < relays.length; i++) {
			relays[i].stamp();
		}

		for (var i: number = 0; i < pids.length; i++) {
			pids[i].stamp();
		}

		for (var i: number = 0; i < luts.length; i++) {
			luts[i].stamp();
		}

		for (var i: number = 0; i < vcrs.length; i++) {
			vcrs[i].stamp();
		}

		for (var i: number = 0; i < vccas.length; i++) {
			vccas[i].stamp();
		}

		for (var i: number = 0; i < vcls.length; i++) {
			vcls[i].stamp();
		}

		for (var i: number = 0; i < grts.length; i++) {
			grts[i].stamp();
		}

		for (var i: number = 0; i < tptzs.length; i++) {
			tptzs[i].stamp();
		}

		for (var i: number = 0; i < transformers.length; i++) {
			transformers[i].stamp();
		}

		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	map_node(node_id) {
		this.temp = -1;
		this.output = -1;
		for (var i: number = 0; i < node_manager.active_nodes.length; i++) {
			if (node_id === node_manager.active_nodes[i]) {
				this.temp = nodes[node_manager.active_nodes[i]].simulation_id;
				if (this.temp > -1 && this.temp < node_manager.active_nodes.length) {
					this.output = this.temp;
					break;
				}
			}
		}
		if (node_manager.active_nodes.length > 0 && node_id !== -1) {
			for (var i: number = 0; i < node_manager.unique_nodes.length; i++) {
				if (node_manager.unique_nodes[i].is_found(node_id)) {
					this.temp = this.check_node(node_manager.unique_nodes[i].get_lowest_id(node_id));
					if (this.temp !== -1) {
						this.output = this.temp;
						break;
					}
				}
			}
		}
		return this.output;
	}
	check_node(id: number): number {
		this.temp2 = -1;
		for (var i: number = 0; i < node_manager.active_nodes.length; i++) {
			if (node_manager.active_nodes[i] === id) {
				this.temp2 = i;
				break;
			}
		}
		return this.temp2;
	}
	/* Resistor */
	stamp_resistor(n1: number, n2: number, resistance: number): void {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		if (this.node_1 !== -1) {
			matrix_a[this.node_1][this.node_1] += 1.0 / resistance;
		}
		if (this.node_2 !== -1) {
			matrix_a[this.node_2][this.node_2] += 1.0 / resistance;
		}
		if (this.node_1 !== -1 && this.node_2 !== -1) {
			matrix_a[this.node_1][this.node_2] += -1.0 / resistance;
			matrix_a[this.node_2][this.node_1] += -1.0 / resistance;
		}
	}
	/* Node */
	stamp_node(n1: number, resistance: number): void {
		this.node_1 = this.map_node(n1);
		if (this.node_1 !== -1) {
			matrix_a[this.node_1][this.node_1] += 1.0 / resistance;
		}
	}
	/* Node */
	stamp_across_nodes(n1: number, n2: number, resistance: number): void {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		if (this.node_1 !== -1 && this.node_2 !== -1) {
			matrix_a[this.node_1][this.node_2] += 1.0 / resistance;
		}
	}
	/* Voltage Source */
	stamp_voltage(n1: number, n2: number, voltage: number, id: number): void {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		this.offset = simulation_manager.NODE_SIZE;
		if (this.node_1 !== -1) {
			matrix_a[this.node_1][this.offset + id] = 1;
			matrix_a[this.offset + id][this.node_1] = 1;
			/* Adding finite resistance. */
			matrix_a[this.node_1][this.node_1] += 1.0 / global.settings.R_MAX;
		}
		if (this.node_2 !== -1) {
			matrix_a[this.node_2][this.offset + id] = -1;
			matrix_a[this.offset + id][this.node_2] = -1;
			/* Adding finite resistance. */
			matrix_a[this.node_2][this.node_2] += 1.0 / global.settings.R_MAX;
		}
		/* Adding finite resistance. */
		if (this.node_1 !== -1 && this.node_2 !== -1) {
			matrix_a[this.node_1][this.node_2] += -1.0 / global.settings.R_MAX;
			matrix_a[this.node_2][this.node_1] += -1.0 / global.settings.R_MAX;
		}
		/* Prevent Singular Matrix. */
		matrix_z[this.offset + id][0] += voltage;
	}
	/* Current Source */
	stamp_current(n1: number, n2: number, current: number): void {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		if (this.node_1 !== -1) {
			matrix_z[this.node_1][0] += current;
		}
		if (this.node_2 !== -1) {
			matrix_z[this.node_2][0] += -current;
		}
	}
	/* Capacitor */
	stamp_capacitor(n1: number, n2: number, transient_resistance: number, transient_ieq: number): void {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		if (this.node_1 !== -1) {
			matrix_a[this.node_1][this.node_1] += 1.0 / transient_resistance;
			matrix_z[this.node_1][0] += -transient_ieq;
		}
		if (this.node_2 !== -1) {
			matrix_a[this.node_2][this.node_2] += 1.0 / transient_resistance;
			matrix_z[this.node_2][0] += transient_ieq;
		}
		if (this.node_1 !== -1 && this.node_2 !== -1) {
			matrix_a[this.node_1][this.node_2] += -1.0 / transient_resistance;
			matrix_a[this.node_2][this.node_1] += -1.0 / transient_resistance;
		}
	}
	/* Inductor */
	stamp_inductor(n1: number, n2: number, transient_resistance: number, transient_ieq: number): void {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		if (this.node_1 !== -1) {
			matrix_a[this.node_1][this.node_1] += 1.0 / transient_resistance;
			matrix_z[this.node_1][0] += -transient_ieq;
		}
		if (this.node_2 !== -1) {
			matrix_a[this.node_2][this.node_2] += 1.0 / transient_resistance;
			matrix_z[this.node_2][0] += transient_ieq;
		}
		if (this.node_1 !== -1 && this.node_2 !== -1) {
			matrix_a[this.node_1][this.node_2] += -1.0 / transient_resistance;
			matrix_a[this.node_2][this.node_1] += -1.0 / transient_resistance;
		}
	}
	/* Current Controlled Voltage Source */
	stamp_ccvs(n1: number, n2: number, n3: number, n4: number, gain: number, id: number): void {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		this.node_3 = this.map_node(n3);
		this.node_4 = this.map_node(n4);
		this.offset = simulation_manager.NODE_SIZE;
		if (this.node_1 !== -1) {
			matrix_a[this.offset + id][this.node_1] = 1;
			matrix_a[this.node_1][this.offset + id] = 1;
		}
		if (this.node_2 !== -1) {
			matrix_a[this.offset + id + 1][this.node_2] = 1;
			matrix_a[this.node_2][this.offset + id + 1] = 1;
		}
		if (this.node_3 !== -1) {
			matrix_a[this.offset + id + 1][this.node_3] = -1;
			matrix_a[this.node_3][this.offset + id + 1] = -1;
		}
		if (this.node_4 !== -1) {
			matrix_a[this.offset + id][this.node_4] = -1;
			matrix_a[this.node_4][this.offset + id] = -1;
		}
		matrix_a[this.offset + id + 1][this.offset + id] = -gain;
	}
	/* Voltage Controlled Current Source */
	stamp_vccs(n1: number, n2: number, n3: number, n4: number, gain: number): void {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		this.node_3 = this.map_node(n3);
		this.node_4 = this.map_node(n4);
		if (this.node_1 !== -1 && this.node_2 !== -1) {
			matrix_a[this.node_2][this.node_1] += gain;
		}
		if (this.node_2 !== -1 && this.node_4 !== -1) {
			matrix_a[this.node_2][this.node_4] += -gain;
		}
		if (this.node_1 !== -1 && this.node_3 !== -1) {
			matrix_a[this.node_3][this.node_1] += -gain;
		}
		if (this.node_3 !== -1 && this.node_4 !== -1) {
			matrix_a[this.node_3][this.node_4] += gain;
		}
	}
	/* Current Controlled Current Source */
	stamp_cccs(n1: number, n2: number, n3: number, n4: number, gain: number, id: number): void {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		this.node_3 = this.map_node(n3);
		this.node_4 = this.map_node(n4);
		this.offset = simulation_manager.NODE_SIZE;
		if (this.node_1 !== -1) {
			matrix_a[this.offset + id][this.node_1] = 1;
			matrix_a[this.node_1][this.offset + id] = 1;
		}
		if (this.node_2 !== -1) {
			matrix_a[this.node_2][this.offset + id] = gain;
		}
		if (this.node_3 !== -1) {
			matrix_a[this.node_3][this.offset + id] = -gain;
		}
		if (this.node_4 !== -1) {
			matrix_a[this.offset + id][this.node_4] = -1;
			matrix_a[this.node_4][this.offset + id] = -1;
		}
	}
	/* Voltage Controlled Voltage Source */
	stamp_vcvs(n1: number, n2: number, n3: number, n4: number, gain: number, id: number): void {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		this.node_3 = this.map_node(n3);
		this.node_4 = this.map_node(n4);
		this.offset = simulation_manager.NODE_SIZE;
		if (this.node_1 !== -1) {
			matrix_a[this.offset + id][this.node_1] = -gain;
		}
		if (this.node_2 !== -1) {
			matrix_a[this.offset + id][this.node_2] = 1;
			matrix_a[this.node_2][this.offset + id] = 1;
		}
		if (this.node_3 !== -1) {
			matrix_a[this.offset + id][this.node_3] = -1;
			matrix_a[this.node_3][this.offset + id] = -1;
		}
		if (this.node_4 !== -1) {
			matrix_a[this.offset + id][this.node_4] = gain;
		}
	}
	/* Operational Amplifier */
	stamp_ideal_opamp(n1: number, n2: number, n3: number, id: number): void {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		this.node_3 = this.map_node(n3);
		this.offset = simulation_manager.NODE_SIZE;
		if (this.node_1 !== -1) {
			matrix_a[this.offset + id][this.node_1] = 1;
		}
		if (this.node_2 !== -1) {
			matrix_a[this.offset + id][this.node_2] = -1;
		}
		if (this.node_3 !== -1) {
			matrix_a[this.node_3][this.offset + id] = 1;
		}
		/* Giving the op-amp finite gain. */
		matrix_a[this.offset + id][this.offset + id] += 1e-18;
	}
	/* Transformer */
	stamp_transformer(n1: number, n2: number, n3: number, n4: number, gain: number, id: number): void {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		this.node_3 = this.map_node(n3);
		this.node_4 = this.map_node(n4);
		this.offset = simulation_manager.NODE_SIZE;
		if (this.node_1 !== -1) {
			matrix_a[this.offset + id][this.node_1] = -1;
			matrix_a[this.node_1][this.offset + id] = 1;
		}
		if (this.node_2 !== -1) {
			matrix_a[this.offset + id][this.node_2] = 1;
			matrix_a[this.node_2][this.offset + id] = -1;
		}
		if (this.node_3 !== -1) {
			matrix_a[this.offset + id][this.node_3] = gain;
			matrix_a[this.node_3][this.offset + id] = -gain;
		}
		if (this.node_4 !== -1) {
			matrix_a[this.offset + id][this.node_4] = -gain;
			matrix_a[this.node_4][this.offset + id] = gain;
		}
	}
	/* Generic voltage extraction */
	get_voltage(n1: number, n2: number): number {
		this.node_1 = this.map_node(n1);
		this.node_2 = this.map_node(n2);
		this.v_node_1 = 0;
		this.v_node_2 = 0;
		if (this.node_1 !== -1) {
			this.v_node_1 = matrix_x[this.node_1][0];
		}
		if (this.node_2 !== -1) {
			this.v_node_2 = matrix_x[this.node_2][0];
		}
		/* Mever let NaN get into the elements. */
		return this.v_node_1 - this.v_node_2;
	}
	file_manager() {
		if (global.user_file_selected) {
			try {
				this.parse_elements(global.user_file.content);
			} catch (error) {}
			global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
			global.user_file_selected = false;
			MOUSE_EVENT_LATCH = false;
		}
	}
	image_manager() {
		if (global.PICTURE_REQUEST) {
			this.capture_image();
			global.PICTURE_REQUEST = false;
		}
	}
	parse_elements(packet: string) {
		/* Reset selection and focus. */
		global.focused = false;
		global.focused_id = global.NULL;
		global.focused_type = global.NULL;
		global.focused_bounds = global.NULL;
		global.selected_id = global.NULL;
		global.selected_type = -1;
		global.selected_bounds = global.NULL;
		global.selected_properties = global.NULL;
		global.selected = false;
		global.multi_selected = false;
		this.clear_all_elements();
		scope_manager.clear_entries();
		graph_window.reset();
		let elements: Array<string> = packet.split(global.PACKET_DIVIDER);
		for (var i: number = 0; i < elements.length; i++) {
			if (elements[i] !== '') {
				this.rebuild_elements(JSON.parse(elements[i]));
			}
		}
		/* #INSERT_METER_RESIZE_TRACE# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < voltmeters.length; i++) {
			voltmeters[i].RESIZE_METER_TRACE = true;
		}
		for (var i: number = 0; i < ohmmeters.length; i++) {
			ohmmeters[i].RESIZE_METER_TRACE = true;
		}
		for (var i: number = 0; i < ammeters.length; i++) {
			ammeters[i].RESIZE_METER_TRACE = true;
		}
		for (var i: number = 0; i < wattmeters.length; i++) {
			wattmeters[i].RESIZE_METER_TRACE = true;
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	rebuild_elements(obj: any) {
		if (obj.elm.type === global.TYPE_META_DATA) {
			if (global.not_null(obj.user_settings)) {
				Object.keys(global.settings).forEach(function (key) {
					if (global.not_null(obj.user_settings[key])) {
						global.settings[key] = global.copy(obj.user_settings[key]);
					}
				});
			}
			if (global.not_null(obj.user_scope_settings)) {
				scope_manager.ENTRY = global.copy(obj.user_scope_settings);
			}
			if (global.not_null(obj.user_timestep)) {
				global.time_step = obj.user_timestep;
				bottom_menu.resize_bottom_menu();
			}
			if (global.not_null(obj.file_name)) {
				global.user_file.title = obj.file_name;
			}
		}
		/* Support previous versions of saved files. */
		/* #INSERT_GENERATE_SUPPORT_LEGACY_FILES# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		if (obj.elm.properties['tag'] === global.PROPERTY_RESISTOR['tag']) {
			obj.elm.type = global.TYPE_RESISTOR;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_CAPACITOR['tag']) {
			obj.elm.type = global.TYPE_CAPACITOR;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_INDUCTOR['tag']) {
			obj.elm.type = global.TYPE_INDUCTOR;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_GROUND['tag']) {
			obj.elm.type = global.TYPE_GROUND;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_DCSOURCE['tag']) {
			obj.elm.type = global.TYPE_DCSOURCE;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_DCCURRENT['tag']) {
			obj.elm.type = global.TYPE_DCCURRENT;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_ACSOURCE['tag']) {
			obj.elm.type = global.TYPE_ACSOURCE;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_ACCURRENT['tag']) {
			obj.elm.type = global.TYPE_ACCURRENT;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_SQUAREWAVE['tag']) {
			obj.elm.type = global.TYPE_SQUAREWAVE;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_SAW['tag']) {
			obj.elm.type = global.TYPE_SAW;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_TRI['tag']) {
			obj.elm.type = global.TYPE_TRI;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_CONSTANT['tag']) {
			obj.elm.type = global.TYPE_CONSTANT;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_WIRE['tag']) {
			obj.elm.type = global.TYPE_WIRE;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_NET['tag']) {
			obj.elm.type = global.TYPE_NET;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_NOTE['tag']) {
			obj.elm.type = global.TYPE_NOTE;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_RAIL['tag']) {
			obj.elm.type = global.TYPE_RAIL;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_VOLTMETER['tag']) {
			obj.elm.type = global.TYPE_VOLTMETER;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_OHMMETER['tag']) {
			obj.elm.type = global.TYPE_OHMMETER;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_AMMETER['tag']) {
			obj.elm.type = global.TYPE_AMMETER;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_WATTMETER['tag']) {
			obj.elm.type = global.TYPE_WATTMETER;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_FUSE['tag']) {
			obj.elm.type = global.TYPE_FUSE;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_SPST['tag']) {
			obj.elm.type = global.TYPE_SPST;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_SPDT['tag']) {
			obj.elm.type = global.TYPE_SPDT;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_NOT['tag']) {
			obj.elm.type = global.TYPE_NOT;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_DIODE['tag']) {
			obj.elm.type = global.TYPE_DIODE;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_LED['tag']) {
			obj.elm.type = global.TYPE_LED;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_ZENER['tag']) {
			obj.elm.type = global.TYPE_ZENER;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_POTENTIOMETER['tag']) {
			obj.elm.type = global.TYPE_POTENTIOMETER;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_AND['tag']) {
			obj.elm.type = global.TYPE_AND;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_OR['tag']) {
			obj.elm.type = global.TYPE_OR;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_NAND['tag']) {
			obj.elm.type = global.TYPE_NAND;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_NOR['tag']) {
			obj.elm.type = global.TYPE_NOR;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_XOR['tag']) {
			obj.elm.type = global.TYPE_XOR;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_XNOR['tag']) {
			obj.elm.type = global.TYPE_XNOR;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_DFF['tag']) {
			obj.elm.type = global.TYPE_DFF;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_VSAT['tag']) {
			obj.elm.type = global.TYPE_VSAT;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_ADD['tag']) {
			obj.elm.type = global.TYPE_ADD;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_SUB['tag']) {
			obj.elm.type = global.TYPE_SUB;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_MUL['tag']) {
			obj.elm.type = global.TYPE_MUL;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_DIV['tag']) {
			obj.elm.type = global.TYPE_DIV;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_GAIN['tag']) {
			obj.elm.type = global.TYPE_GAIN;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_ABS['tag']) {
			obj.elm.type = global.TYPE_ABS;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_VCSW['tag']) {
			obj.elm.type = global.TYPE_VCSW;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_VCVS['tag']) {
			obj.elm.type = global.TYPE_VCVS;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_VCCS['tag']) {
			obj.elm.type = global.TYPE_VCCS;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_CCCS['tag']) {
			obj.elm.type = global.TYPE_CCCS;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_CCVS['tag']) {
			obj.elm.type = global.TYPE_CCVS;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_OPAMP['tag']) {
			obj.elm.type = global.TYPE_OPAMP;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_NMOS['tag']) {
			obj.elm.type = global.TYPE_NMOS;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_PMOS['tag']) {
			obj.elm.type = global.TYPE_PMOS;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_NPN['tag']) {
			obj.elm.type = global.TYPE_NPN;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_PNP['tag']) {
			obj.elm.type = global.TYPE_PNP;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_ADC['tag']) {
			obj.elm.type = global.TYPE_ADC;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_DAC['tag']) {
			obj.elm.type = global.TYPE_DAC;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_SAH['tag']) {
			obj.elm.type = global.TYPE_SAH;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_PWM['tag']) {
			obj.elm.type = global.TYPE_PWM;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_INTEGRATOR['tag']) {
			obj.elm.type = global.TYPE_INTEGRATOR;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_DIFFERENTIATOR['tag']) {
			obj.elm.type = global.TYPE_DIFFERENTIATOR;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_LPF['tag']) {
			obj.elm.type = global.TYPE_LPF;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_HPF['tag']) {
			obj.elm.type = global.TYPE_HPF;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_REL['tag']) {
			obj.elm.type = global.TYPE_REL;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_PID['tag']) {
			obj.elm.type = global.TYPE_PID;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_LUT['tag']) {
			obj.elm.type = global.TYPE_LUT;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_VCR['tag']) {
			obj.elm.type = global.TYPE_VCR;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_VCCA['tag']) {
			obj.elm.type = global.TYPE_VCCA;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_VCL['tag']) {
			obj.elm.type = global.TYPE_VCL;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_GRT['tag']) {
			obj.elm.type = global.TYPE_GRT;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_TPTZ['tag']) {
			obj.elm.type = global.TYPE_TPTZ;
		} else if (obj.elm.properties['tag'] === global.PROPERTY_TRAN['tag']) {
			obj.elm.type = global.TYPE_TRAN;
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		/* #INSERT_GENERATE_REBUILD_FUNCTION_ELEMENTS# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		if (obj.elm.type === global.TYPE_RESISTOR) {
			resistors.push(this.rebuild_resistor(obj));
		} else if (obj.elm.type === global.TYPE_CAPACITOR) {
			capacitors.push(this.rebuild_capacitor(obj));
		} else if (obj.elm.type === global.TYPE_INDUCTOR) {
			inductors.push(this.rebuild_inductor(obj));
		} else if (obj.elm.type === global.TYPE_GROUND) {
			grounds.push(this.rebuild_ground(obj));
		} else if (obj.elm.type === global.TYPE_DCSOURCE) {
			dcsources.push(this.rebuild_dcsource(obj));
		} else if (obj.elm.type === global.TYPE_DCCURRENT) {
			dccurrents.push(this.rebuild_dccurrent(obj));
		} else if (obj.elm.type === global.TYPE_ACSOURCE) {
			acsources.push(this.rebuild_acsource(obj));
		} else if (obj.elm.type === global.TYPE_ACCURRENT) {
			accurrents.push(this.rebuild_accurrent(obj));
		} else if (obj.elm.type === global.TYPE_SQUAREWAVE) {
			squarewaves.push(this.rebuild_squarewave(obj));
		} else if (obj.elm.type === global.TYPE_SAW) {
			sawwaves.push(this.rebuild_sawwave(obj));
		} else if (obj.elm.type === global.TYPE_TRI) {
			trianglewaves.push(this.rebuild_trianglewave(obj));
		} else if (obj.elm.type === global.TYPE_CONSTANT) {
			constants.push(this.rebuild_constant(obj));
		} else if (obj.elm.type === global.TYPE_WIRE) {
			wires.push(this.rebuild_wire(obj));
		} else if (obj.elm.type === global.TYPE_NET) {
			nets.push(this.rebuild_net(obj));
		} else if (obj.elm.type === global.TYPE_NOTE) {
			notes.push(this.rebuild_note(obj));
		} else if (obj.elm.type === global.TYPE_RAIL) {
			rails.push(this.rebuild_rail(obj));
		} else if (obj.elm.type === global.TYPE_VOLTMETER) {
			voltmeters.push(this.rebuild_voltmeter(obj));
		} else if (obj.elm.type === global.TYPE_OHMMETER) {
			ohmmeters.push(this.rebuild_ohmmeter(obj));
		} else if (obj.elm.type === global.TYPE_AMMETER) {
			ammeters.push(this.rebuild_ammeter(obj));
		} else if (obj.elm.type === global.TYPE_WATTMETER) {
			wattmeters.push(this.rebuild_wattmeter(obj));
		} else if (obj.elm.type === global.TYPE_FUSE) {
			fuses.push(this.rebuild_fuse(obj));
		} else if (obj.elm.type === global.TYPE_SPST) {
			spsts.push(this.rebuild_spst(obj));
		} else if (obj.elm.type === global.TYPE_SPDT) {
			spdts.push(this.rebuild_spdt(obj));
		} else if (obj.elm.type === global.TYPE_NOT) {
			nots.push(this.rebuild_not(obj));
		} else if (obj.elm.type === global.TYPE_DIODE) {
			diodes.push(this.rebuild_diode(obj));
		} else if (obj.elm.type === global.TYPE_LED) {
			leds.push(this.rebuild_led(obj));
		} else if (obj.elm.type === global.TYPE_ZENER) {
			zeners.push(this.rebuild_zener(obj));
		} else if (obj.elm.type === global.TYPE_POTENTIOMETER) {
			potentiometers.push(this.rebuild_potentiometer(obj));
		} else if (obj.elm.type === global.TYPE_AND) {
			ands.push(this.rebuild_and(obj));
		} else if (obj.elm.type === global.TYPE_OR) {
			ors.push(this.rebuild_or(obj));
		} else if (obj.elm.type === global.TYPE_NAND) {
			nands.push(this.rebuild_nand(obj));
		} else if (obj.elm.type === global.TYPE_NOR) {
			nors.push(this.rebuild_nor(obj));
		} else if (obj.elm.type === global.TYPE_XOR) {
			xors.push(this.rebuild_xor(obj));
		} else if (obj.elm.type === global.TYPE_XNOR) {
			xnors.push(this.rebuild_xnor(obj));
		} else if (obj.elm.type === global.TYPE_DFF) {
			dffs.push(this.rebuild_dff(obj));
		} else if (obj.elm.type === global.TYPE_VSAT) {
			vsats.push(this.rebuild_vsat(obj));
		} else if (obj.elm.type === global.TYPE_ADD) {
			adders.push(this.rebuild_adder(obj));
		} else if (obj.elm.type === global.TYPE_SUB) {
			subtractors.push(this.rebuild_subtractor(obj));
		} else if (obj.elm.type === global.TYPE_MUL) {
			multipliers.push(this.rebuild_multiplier(obj));
		} else if (obj.elm.type === global.TYPE_DIV) {
			dividers.push(this.rebuild_divider(obj));
		} else if (obj.elm.type === global.TYPE_GAIN) {
			gains.push(this.rebuild_gain(obj));
		} else if (obj.elm.type === global.TYPE_ABS) {
			absvals.push(this.rebuild_absval(obj));
		} else if (obj.elm.type === global.TYPE_VCSW) {
			vcsws.push(this.rebuild_vcsw(obj));
		} else if (obj.elm.type === global.TYPE_VCVS) {
			vcvss.push(this.rebuild_vcvs(obj));
		} else if (obj.elm.type === global.TYPE_VCCS) {
			vccss.push(this.rebuild_vccs(obj));
		} else if (obj.elm.type === global.TYPE_CCCS) {
			cccss.push(this.rebuild_cccs(obj));
		} else if (obj.elm.type === global.TYPE_CCVS) {
			ccvss.push(this.rebuild_ccvs(obj));
		} else if (obj.elm.type === global.TYPE_OPAMP) {
			opamps.push(this.rebuild_opamp(obj));
		} else if (obj.elm.type === global.TYPE_NMOS) {
			nmosfets.push(this.rebuild_nmosfet(obj));
		} else if (obj.elm.type === global.TYPE_PMOS) {
			pmosfets.push(this.rebuild_pmosfet(obj));
		} else if (obj.elm.type === global.TYPE_NPN) {
			npns.push(this.rebuild_npn(obj));
		} else if (obj.elm.type === global.TYPE_PNP) {
			pnps.push(this.rebuild_pnp(obj));
		} else if (obj.elm.type === global.TYPE_ADC) {
			adcs.push(this.rebuild_adc(obj));
		} else if (obj.elm.type === global.TYPE_DAC) {
			dacs.push(this.rebuild_dac(obj));
		} else if (obj.elm.type === global.TYPE_SAH) {
			sandhs.push(this.rebuild_samplers(obj));
		} else if (obj.elm.type === global.TYPE_PWM) {
			pwms.push(this.rebuild_pwm(obj));
		} else if (obj.elm.type === global.TYPE_INTEGRATOR) {
			integrators.push(this.rebuild_integrator(obj));
		} else if (obj.elm.type === global.TYPE_DIFFERENTIATOR) {
			differentiators.push(this.rebuild_differentiator(obj));
		} else if (obj.elm.type === global.TYPE_LPF) {
			lowpasses.push(this.rebuild_lowpass(obj));
		} else if (obj.elm.type === global.TYPE_HPF) {
			highpasses.push(this.rebuild_highpass(obj));
		} else if (obj.elm.type === global.TYPE_REL) {
			relays.push(this.rebuild_relay(obj));
		} else if (obj.elm.type === global.TYPE_PID) {
			pids.push(this.rebuild_pid(obj));
		} else if (obj.elm.type === global.TYPE_LUT) {
			luts.push(this.rebuild_lut(obj));
		} else if (obj.elm.type === global.TYPE_VCR) {
			vcrs.push(this.rebuild_vcr(obj));
		} else if (obj.elm.type === global.TYPE_VCCA) {
			vccas.push(this.rebuild_vcca(obj));
		} else if (obj.elm.type === global.TYPE_VCL) {
			vcls.push(this.rebuild_vcl(obj));
		} else if (obj.elm.type === global.TYPE_GRT) {
			grts.push(this.rebuild_grt(obj));
		} else if (obj.elm.type === global.TYPE_TPTZ) {
			tptzs.push(this.rebuild_tptz(obj));
		} else if (obj.elm.type === global.TYPE_TRAN) {
			transformers.push(this.rebuild_transformer(obj));
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		global.SIGNAL_BUILD_ELEMENT = true;
		global.signal_build_counter = 0;
	}
	/* #INSERT_GENERATE_REBUILD_ELEMENTS# */
	/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
	rebuild_resistor(obj: any): any {
		Object.setPrototypeOf(obj, Resistor.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_RESISTOR).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_RESISTOR[key];
			}
		});
		Object.keys(Resistor).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Resistor[key];
			}
		});
		return obj;
	}

	rebuild_capacitor(obj: any): any {
		Object.setPrototypeOf(obj, Capacitor.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_CAPACITOR).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_CAPACITOR[key];
			}
		});
		Object.keys(Capacitor).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Capacitor[key];
			}
		});
		return obj;
	}

	rebuild_inductor(obj: any): any {
		Object.setPrototypeOf(obj, Inductor.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;
		Object.setPrototypeOf(obj.inductor_arc_0, Arc.prototype);
		Object.setPrototypeOf(obj.inductor_arc_1, Arc.prototype);
		Object.setPrototypeOf(obj.inductor_arc_2, Arc.prototype);
		Object.setPrototypeOf(obj.inductor_arc_3, Arc.prototype);
		Object.setPrototypeOf(obj.inductor_arc_0.arc_paint, Paint.prototype);
		Object.setPrototypeOf(obj.inductor_arc_1.arc_paint, Paint.prototype);
		Object.setPrototypeOf(obj.inductor_arc_2.arc_paint, Paint.prototype);
		Object.setPrototypeOf(obj.inductor_arc_3.arc_paint, Paint.prototype);

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_INDUCTOR).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_INDUCTOR[key];
			}
		});
		Object.keys(Inductor).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Inductor[key];
			}
		});
		return obj;
	}

	rebuild_ground(obj: any): any {
		Object.setPrototypeOf(obj, Ground.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element1.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_GROUND).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_GROUND[key];
			}
		});
		Object.keys(Ground).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Ground[key];
			}
		});
		return obj;
	}

	rebuild_dcsource(obj: any): any {
		Object.setPrototypeOf(obj, DCSource.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_DCSOURCE).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_DCSOURCE[key];
			}
		});
		Object.keys(DCSource).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = DCSource[key];
			}
		});
		return obj;
	}

	rebuild_dccurrent(obj: any): any {
		Object.setPrototypeOf(obj, DCCurrent.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_DCCURRENT).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_DCCURRENT[key];
			}
		});
		Object.keys(DCCurrent).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = DCCurrent[key];
			}
		});
		return obj;
	}

	rebuild_acsource(obj: any): any {
		Object.setPrototypeOf(obj, ACSource.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;
		Object.setPrototypeOf(obj.sine_wave, SineWave.prototype);
		Object.setPrototypeOf(obj.sine_wave.sine_wave_paint, Paint.prototype);

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_ACSOURCE).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_ACSOURCE[key];
			}
		});
		Object.keys(ACSource).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = ACSource[key];
			}
		});
		return obj;
	}

	rebuild_accurrent(obj: any): any {
		Object.setPrototypeOf(obj, ACCurrent.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;
		Object.setPrototypeOf(obj.sine_wave, SineWave.prototype);
		Object.setPrototypeOf(obj.sine_wave.sine_wave_paint, Paint.prototype);

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_ACCURRENT).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_ACCURRENT[key];
			}
		});
		Object.keys(ACCurrent).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = ACCurrent[key];
			}
		});
		return obj;
	}

	rebuild_squarewave(obj: any): any {
		Object.setPrototypeOf(obj, SquareWave.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_SQUAREWAVE).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_SQUAREWAVE[key];
			}
		});
		Object.keys(SquareWave).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = SquareWave[key];
			}
		});
		return obj;
	}

	rebuild_sawwave(obj: any): any {
		Object.setPrototypeOf(obj, SawWave.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_SAW).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_SAW[key];
			}
		});
		Object.keys(SawWave).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = SawWave[key];
			}
		});
		return obj;
	}

	rebuild_trianglewave(obj: any): any {
		Object.setPrototypeOf(obj, TriangleWave.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_TRI).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_TRI[key];
			}
		});
		Object.keys(TriangleWave).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = TriangleWave[key];
			}
		});
		return obj;
	}

	rebuild_constant(obj: any): any {
		Object.setPrototypeOf(obj, Constant.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element1.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_CONSTANT).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_CONSTANT[key];
			}
		});
		Object.keys(Constant).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Constant[key];
			}
		});
		return obj;
	}

	rebuild_wire(obj: any): any {
		Object.setPrototypeOf(obj, Wire.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.total_bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_WIRE).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_WIRE[key];
			}
		});
		Object.keys(Wire).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Wire[key];
			}
		});
		return obj;
	}

	rebuild_net(obj: any): any {
		Object.setPrototypeOf(obj, Net.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element1.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_NET).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_NET[key];
			}
		});
		Object.keys(Net).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Net[key];
			}
		});
		return obj;
	}

	rebuild_note(obj: any): any {
		Object.setPrototypeOf(obj, Note.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element1.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_NOTE).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_NOTE[key];
			}
		});
		Object.keys(Note).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Note[key];
			}
		});
		return obj;
	}

	rebuild_rail(obj: any): any {
		Object.setPrototypeOf(obj, Rail.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element1.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_RAIL).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_RAIL[key];
			}
		});
		Object.keys(Rail).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Rail[key];
			}
		});
		return obj;
	}

	rebuild_voltmeter(obj: any): any {
		Object.setPrototypeOf(obj, VoltMeter.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;
		Object.setPrototypeOf(obj.meter_symbol, MeterSymbols.prototype);
		Object.setPrototypeOf(obj.trace_bounds, RectF.prototype);
		Object.setPrototypeOf(obj.meter_trace, Trace.prototype);
		Object.setPrototypeOf(obj.meter_trace.previous_point, PointF.prototype);
		Object.setPrototypeOf(obj.meter_trace.mid_point, PointF.prototype);
		Object.setPrototypeOf(obj.meter_trace.current_point, PointF.prototype);
		Object.setPrototypeOf(obj.meter_trace.trace_stroke_paint, Paint.prototype);
		Object.setPrototypeOf(obj.meter_trace.trace_fill_paint, Paint.prototype);
		Object.setPrototypeOf(obj.meter_trace.trace_path, Path.prototype);
		Object.setPrototypeOf(obj.meter_symbol.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.meter_symbol.meter_paint, Paint.prototype);

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_VOLTMETER).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_VOLTMETER[key];
			}
		});
		Object.keys(VoltMeter).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = VoltMeter[key];
			}
		});
		return obj;
	}

	rebuild_ohmmeter(obj: any): any {
		Object.setPrototypeOf(obj, OhmMeter.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;
		Object.setPrototypeOf(obj.meter_symbol, MeterSymbols.prototype);
		Object.setPrototypeOf(obj.trace_bounds, RectF.prototype);
		Object.setPrototypeOf(obj.meter_trace, Trace.prototype);
		Object.setPrototypeOf(obj.meter_trace.previous_point, PointF.prototype);
		Object.setPrototypeOf(obj.meter_trace.mid_point, PointF.prototype);
		Object.setPrototypeOf(obj.meter_trace.current_point, PointF.prototype);
		Object.setPrototypeOf(obj.meter_trace.trace_stroke_paint, Paint.prototype);
		Object.setPrototypeOf(obj.meter_trace.trace_fill_paint, Paint.prototype);
		Object.setPrototypeOf(obj.meter_trace.trace_path, Path.prototype);
		Object.setPrototypeOf(obj.meter_symbol.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.meter_symbol.meter_paint, Paint.prototype);

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_OHMMETER).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_OHMMETER[key];
			}
		});
		Object.keys(OhmMeter).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = OhmMeter[key];
			}
		});
		return obj;
	}

	rebuild_ammeter(obj: any): any {
		Object.setPrototypeOf(obj, AmMeter.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;
		Object.setPrototypeOf(obj.meter_symbol, MeterSymbols.prototype);
		Object.setPrototypeOf(obj.trace_bounds, RectF.prototype);
		Object.setPrototypeOf(obj.meter_trace, Trace.prototype);
		Object.setPrototypeOf(obj.meter_trace.previous_point, PointF.prototype);
		Object.setPrototypeOf(obj.meter_trace.mid_point, PointF.prototype);
		Object.setPrototypeOf(obj.meter_trace.current_point, PointF.prototype);
		Object.setPrototypeOf(obj.meter_trace.trace_stroke_paint, Paint.prototype);
		Object.setPrototypeOf(obj.meter_trace.trace_fill_paint, Paint.prototype);
		Object.setPrototypeOf(obj.meter_trace.trace_path, Path.prototype);
		Object.setPrototypeOf(obj.meter_symbol.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.meter_symbol.meter_paint, Paint.prototype);

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_AMMETER).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_AMMETER[key];
			}
		});
		Object.keys(AmMeter).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = AmMeter[key];
			}
		});
		return obj;
	}

	rebuild_wattmeter(obj: any): any {
		Object.setPrototypeOf(obj, WattMeter.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;
		Object.setPrototypeOf(obj.meter_symbol, MeterSymbols.prototype);
		Object.setPrototypeOf(obj.trace_bounds, RectF.prototype);
		Object.setPrototypeOf(obj.meter_trace, Trace.prototype);
		Object.setPrototypeOf(obj.meter_trace.previous_point, PointF.prototype);
		Object.setPrototypeOf(obj.meter_trace.mid_point, PointF.prototype);
		Object.setPrototypeOf(obj.meter_trace.current_point, PointF.prototype);
		Object.setPrototypeOf(obj.meter_trace.trace_stroke_paint, Paint.prototype);
		Object.setPrototypeOf(obj.meter_trace.trace_fill_paint, Paint.prototype);
		Object.setPrototypeOf(obj.meter_trace.trace_path, Path.prototype);
		Object.setPrototypeOf(obj.meter_symbol.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.meter_symbol.meter_paint, Paint.prototype);

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_WATTMETER).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_WATTMETER[key];
			}
		});
		Object.keys(WattMeter).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = WattMeter[key];
			}
		});
		return obj;
	}

	rebuild_fuse(obj: any): any {
		Object.setPrototypeOf(obj, Fuse.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_FUSE).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_FUSE[key];
			}
		});
		Object.keys(Fuse).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Fuse[key];
			}
		});
		return obj;
	}

	rebuild_spst(obj: any): any {
		Object.setPrototypeOf(obj, SinglePoleSingleThrow.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_SPST).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_SPST[key];
			}
		});
		Object.keys(SinglePoleSingleThrow).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = SinglePoleSingleThrow[key];
			}
		});
		return obj;
	}

	rebuild_spdt(obj: any): any {
		Object.setPrototypeOf(obj, SinglePoleDoubleThrow.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_SPDT).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_SPDT[key];
			}
		});
		Object.keys(SinglePoleDoubleThrow).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = SinglePoleDoubleThrow[key];
			}
		});
		return obj;
	}

	rebuild_not(obj: any): any {
		Object.setPrototypeOf(obj, NOTGate.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_NOT).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_NOT[key];
			}
		});
		Object.keys(NOTGate).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = NOTGate[key];
			}
		});
		return obj;
	}

	rebuild_diode(obj: any): any {
		Object.setPrototypeOf(obj, Diode.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_DIODE).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_DIODE[key];
			}
		});
		Object.keys(Diode).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Diode[key];
			}
		});
		return obj;
	}

	rebuild_led(obj: any): any {
		Object.setPrototypeOf(obj, LightEmittingDiode.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_LED).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_LED[key];
			}
		});
		Object.keys(LightEmittingDiode).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = LightEmittingDiode[key];
			}
		});
		return obj;
	}

	rebuild_zener(obj: any): any {
		Object.setPrototypeOf(obj, ZenerDiode.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_ZENER).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_ZENER[key];
			}
		});
		Object.keys(ZenerDiode).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = ZenerDiode[key];
			}
		});
		return obj;
	}

	rebuild_potentiometer(obj: any): any {
		Object.setPrototypeOf(obj, Potentiometer.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_POTENTIOMETER).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_POTENTIOMETER[key];
			}
		});
		Object.keys(Potentiometer).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Potentiometer[key];
			}
		});
		return obj;
	}

	rebuild_and(obj: any): any {
		Object.setPrototypeOf(obj, ANDGate.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_AND).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_AND[key];
			}
		});
		Object.keys(ANDGate).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = ANDGate[key];
			}
		});
		return obj;
	}

	rebuild_or(obj: any): any {
		Object.setPrototypeOf(obj, ORGate.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_OR).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_OR[key];
			}
		});
		Object.keys(ORGate).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = ORGate[key];
			}
		});
		return obj;
	}

	rebuild_nand(obj: any): any {
		Object.setPrototypeOf(obj, NANDGate.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_NAND).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_NAND[key];
			}
		});
		Object.keys(NANDGate).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = NANDGate[key];
			}
		});
		return obj;
	}

	rebuild_nor(obj: any): any {
		Object.setPrototypeOf(obj, NORGate.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_NOR).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_NOR[key];
			}
		});
		Object.keys(NORGate).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = NORGate[key];
			}
		});
		return obj;
	}

	rebuild_xor(obj: any): any {
		Object.setPrototypeOf(obj, XORGate.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_XOR).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_XOR[key];
			}
		});
		Object.keys(XORGate).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = XORGate[key];
			}
		});
		return obj;
	}

	rebuild_xnor(obj: any): any {
		Object.setPrototypeOf(obj, XNORGate.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_XNOR).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_XNOR[key];
			}
		});
		Object.keys(XNORGate).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = XNORGate[key];
			}
		});
		return obj;
	}

	rebuild_dff(obj: any): any {
		Object.setPrototypeOf(obj, DFlipFlop.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element4.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_DFF).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_DFF[key];
			}
		});
		Object.keys(DFlipFlop).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = DFlipFlop[key];
			}
		});
		return obj;
	}

	rebuild_vsat(obj: any): any {
		Object.setPrototypeOf(obj, VoltageSaturation.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_VSAT).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_VSAT[key];
			}
		});
		Object.keys(VoltageSaturation).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = VoltageSaturation[key];
			}
		});
		return obj;
	}

	rebuild_adder(obj: any): any {
		Object.setPrototypeOf(obj, Adder.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_ADD).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_ADD[key];
			}
		});
		Object.keys(Adder).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Adder[key];
			}
		});
		return obj;
	}

	rebuild_subtractor(obj: any): any {
		Object.setPrototypeOf(obj, Subtractor.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_SUB).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_SUB[key];
			}
		});
		Object.keys(Subtractor).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Subtractor[key];
			}
		});
		return obj;
	}

	rebuild_multiplier(obj: any): any {
		Object.setPrototypeOf(obj, Multiplier.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_MUL).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_MUL[key];
			}
		});
		Object.keys(Multiplier).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Multiplier[key];
			}
		});
		return obj;
	}

	rebuild_divider(obj: any): any {
		Object.setPrototypeOf(obj, Divider.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_DIV).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_DIV[key];
			}
		});
		Object.keys(Divider).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Divider[key];
			}
		});
		return obj;
	}

	rebuild_gain(obj: any): any {
		Object.setPrototypeOf(obj, GainBlock.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_GAIN).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_GAIN[key];
			}
		});
		Object.keys(GainBlock).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = GainBlock[key];
			}
		});
		return obj;
	}

	rebuild_absval(obj: any): any {
		Object.setPrototypeOf(obj, AbsoluteValue.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_ABS).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_ABS[key];
			}
		});
		Object.keys(AbsoluteValue).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = AbsoluteValue[key];
			}
		});
		return obj;
	}

	rebuild_vcsw(obj: any): any {
		Object.setPrototypeOf(obj, VoltageControlledSwitch.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_VCSW).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_VCSW[key];
			}
		});
		Object.keys(VoltageControlledSwitch).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = VoltageControlledSwitch[key];
			}
		});
		return obj;
	}

	rebuild_vcvs(obj: any): any {
		Object.setPrototypeOf(obj, VoltageControlledVoltageSource.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element4.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_VCVS).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_VCVS[key];
			}
		});
		Object.keys(VoltageControlledVoltageSource).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = VoltageControlledVoltageSource[key];
			}
		});
		return obj;
	}

	rebuild_vccs(obj: any): any {
		Object.setPrototypeOf(obj, VoltageControlledCurrentSource.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element4.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_VCCS).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_VCCS[key];
			}
		});
		Object.keys(VoltageControlledCurrentSource).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = VoltageControlledCurrentSource[key];
			}
		});
		return obj;
	}

	rebuild_cccs(obj: any): any {
		Object.setPrototypeOf(obj, CurrentControlledCurrentSource.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element4.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_CCCS).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_CCCS[key];
			}
		});
		Object.keys(CurrentControlledCurrentSource).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = CurrentControlledCurrentSource[key];
			}
		});
		return obj;
	}

	rebuild_ccvs(obj: any): any {
		Object.setPrototypeOf(obj, CurrentControlledVoltageSource.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element4.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_CCVS).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_CCVS[key];
			}
		});
		Object.keys(CurrentControlledVoltageSource).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = CurrentControlledVoltageSource[key];
			}
		});
		return obj;
	}

	rebuild_opamp(obj: any): any {
		Object.setPrototypeOf(obj, OperationalAmplifier.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_OPAMP).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_OPAMP[key];
			}
		});
		Object.keys(OperationalAmplifier).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = OperationalAmplifier[key];
			}
		});
		return obj;
	}

	rebuild_nmosfet(obj: any): any {
		Object.setPrototypeOf(obj, NChannelMOSFET.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_NMOS).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_NMOS[key];
			}
		});
		Object.keys(NChannelMOSFET).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = NChannelMOSFET[key];
			}
		});
		return obj;
	}

	rebuild_pmosfet(obj: any): any {
		Object.setPrototypeOf(obj, PChannelMOSFET.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_PMOS).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_PMOS[key];
			}
		});
		Object.keys(PChannelMOSFET).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = PChannelMOSFET[key];
			}
		});
		return obj;
	}

	rebuild_npn(obj: any): any {
		Object.setPrototypeOf(obj, NPNBipolarJunctionTransistor.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_NPN).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_NPN[key];
			}
		});
		Object.keys(NPNBipolarJunctionTransistor).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = NPNBipolarJunctionTransistor[key];
			}
		});
		return obj;
	}

	rebuild_pnp(obj: any): any {
		Object.setPrototypeOf(obj, PNPBipolarJunctionTransistor.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_PNP).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_PNP[key];
			}
		});
		Object.keys(PNPBipolarJunctionTransistor).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = PNPBipolarJunctionTransistor[key];
			}
		});
		return obj;
	}

	rebuild_adc(obj: any): any {
		Object.setPrototypeOf(obj, ADCModule.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_ADC).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_ADC[key];
			}
		});
		Object.keys(ADCModule).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = ADCModule[key];
			}
		});
		return obj;
	}

	rebuild_dac(obj: any): any {
		Object.setPrototypeOf(obj, DACModule.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_DAC).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_DAC[key];
			}
		});
		Object.keys(DACModule).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = DACModule[key];
			}
		});
		return obj;
	}

	rebuild_samplers(obj: any): any {
		Object.setPrototypeOf(obj, SampleAndHold.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_SAH).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_SAH[key];
			}
		});
		Object.keys(SampleAndHold).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = SampleAndHold[key];
			}
		});
		return obj;
	}

	rebuild_pwm(obj: any): any {
		Object.setPrototypeOf(obj, PulseWidthModulator.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_PWM).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_PWM[key];
			}
		});
		Object.keys(PulseWidthModulator).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = PulseWidthModulator[key];
			}
		});
		return obj;
	}

	rebuild_integrator(obj: any): any {
		Object.setPrototypeOf(obj, IntegratorModule.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_INTEGRATOR).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_INTEGRATOR[key];
			}
		});
		Object.keys(IntegratorModule).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = IntegratorModule[key];
			}
		});
		return obj;
	}

	rebuild_differentiator(obj: any): any {
		Object.setPrototypeOf(obj, DifferentiatorModule.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_DIFFERENTIATOR).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_DIFFERENTIATOR[key];
			}
		});
		Object.keys(DifferentiatorModule).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = DifferentiatorModule[key];
			}
		});
		return obj;
	}

	rebuild_lowpass(obj: any): any {
		Object.setPrototypeOf(obj, LowPassFilter.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_LPF).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_LPF[key];
			}
		});
		Object.keys(LowPassFilter).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = LowPassFilter[key];
			}
		});
		return obj;
	}

	rebuild_highpass(obj: any): any {
		Object.setPrototypeOf(obj, HighPassFilter.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_HPF).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_HPF[key];
			}
		});
		Object.keys(HighPassFilter).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = HighPassFilter[key];
			}
		});
		return obj;
	}

	rebuild_relay(obj: any): any {
		Object.setPrototypeOf(obj, Relay.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element4.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_REL).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_REL[key];
			}
		});
		Object.keys(Relay).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Relay[key];
			}
		});
		return obj;
	}

	rebuild_pid(obj: any): any {
		Object.setPrototypeOf(obj, PIDModule.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;
		Object.setPrototypeOf(obj.pid_controller, PIDController.prototype);

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_PID).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_PID[key];
			}
		});
		Object.keys(PIDModule).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = PIDModule[key];
			}
		});
		return obj;
	}

	rebuild_lut(obj: any): any {
		Object.setPrototypeOf(obj, LookUpTable.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_LUT).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_LUT[key];
			}
		});
		Object.keys(LookUpTable).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = LookUpTable[key];
			}
		});
		return obj;
	}

	rebuild_vcr(obj: any): any {
		Object.setPrototypeOf(obj, VoltageControlledResistor.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_VCR).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_VCR[key];
			}
		});
		Object.keys(VoltageControlledResistor).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = VoltageControlledResistor[key];
			}
		});
		return obj;
	}

	rebuild_vcca(obj: any): any {
		Object.setPrototypeOf(obj, VoltageControlledCapacitor.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_VCCA).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_VCCA[key];
			}
		});
		Object.keys(VoltageControlledCapacitor).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = VoltageControlledCapacitor[key];
			}
		});
		return obj;
	}

	rebuild_vcl(obj: any): any {
		Object.setPrototypeOf(obj, VoltageControlledInductor.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;
		Object.setPrototypeOf(obj.vcl_arc_0, Arc.prototype);
		Object.setPrototypeOf(obj.vcl_arc_1, Arc.prototype);
		Object.setPrototypeOf(obj.vcl_arc_2, Arc.prototype);
		Object.setPrototypeOf(obj.vcl_arc_3, Arc.prototype);
		Object.setPrototypeOf(obj.vcl_arc_0.arc_paint, Paint.prototype);
		Object.setPrototypeOf(obj.vcl_arc_1.arc_paint, Paint.prototype);
		Object.setPrototypeOf(obj.vcl_arc_2.arc_paint, Paint.prototype);
		Object.setPrototypeOf(obj.vcl_arc_3.arc_paint, Paint.prototype);

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_VCL).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_VCL[key];
			}
		});
		Object.keys(VoltageControlledInductor).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = VoltageControlledInductor[key];
			}
		});
		return obj;
	}

	rebuild_grt(obj: any): any {
		Object.setPrototypeOf(obj, GreaterThan.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element3.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_GRT).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_GRT[key];
			}
		});
		Object.keys(GreaterThan).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = GreaterThan[key];
			}
		});
		return obj;
	}

	rebuild_tptz(obj: any): any {
		Object.setPrototypeOf(obj, TPTZModule.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element2.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;
		Object.setPrototypeOf(obj.tptz_controller, TPTZController.prototype);

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_TPTZ).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_TPTZ[key];
			}
		});
		Object.keys(TPTZModule).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = TPTZModule[key];
			}
		});
		return obj;
	}

	rebuild_transformer(obj: any): any {
		Object.setPrototypeOf(obj, Transformer.prototype);
		obj.patch();
		Object.setPrototypeOf(obj.bounds, RectF.prototype);
		Object.setPrototypeOf(obj.elm, Element4.prototype);
		Object.setPrototypeOf(obj.line_paint, Paint.prototype);
		obj.line_paint.patch();
		Object.setPrototypeOf(obj.point_paint, Paint.prototype);
		obj.point_paint.patch();
		Object.setPrototypeOf(obj.text_paint, Paint.prototype);
		obj.text_paint.patch();
		obj.MULTI_SELECTED = false;

		obj.refresh_bounds();
		obj.capture_nodes();
		obj.bounds.anchored = true;

		Object.keys(global.PROPERTY_TRAN).forEach(function (key) {
			if (!global.not_null(obj.elm.properties[key])) {
				obj.elm.properties[key] = global.PROPERTY_TRAN[key];
			}
		});
		Object.keys(Transformer).forEach(function (key) {
			if (!global.not_null(obj[key])) {
				obj[key] = Transformer[key];
			}
		});
		return obj;
	}

	/* <!-- END AUTOMATICALLY GENERATED !--> */
	clear_all_elements() {
		for (var i: number = nodes.length - 1; i > -1; i--) {
			nodes[i].clear_references();
		}
		for (var i: number = wires.length - 1; i > -1; i--) {
			this.remove_wire(i);
		}
		let elm_max: number = global.element_max();
		for (var i: number = elm_max - 1; i > -1; i--) {
			/* #INSERT_GENERATE_CLEAR_ELEMENTS# */
			/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
			this.remove_resistor(i);

			this.remove_capacitor(i);

			this.remove_inductor(i);

			this.remove_ground(i);

			this.remove_dcsource(i);

			this.remove_dccurrent(i);

			this.remove_acsource(i);

			this.remove_accurrent(i);

			this.remove_squarewave(i);

			this.remove_sawwave(i);

			this.remove_trianglewave(i);

			this.remove_constant(i);

			this.remove_net(i);

			this.remove_note(i);

			this.remove_rail(i);

			this.remove_voltmeter(i);

			this.remove_ohmmeter(i);

			this.remove_ammeter(i);

			this.remove_wattmeter(i);

			this.remove_fuse(i);

			this.remove_spst(i);

			this.remove_spdt(i);

			this.remove_not(i);

			this.remove_diode(i);

			this.remove_led(i);

			this.remove_zener(i);

			this.remove_potentiometer(i);

			this.remove_and(i);

			this.remove_or(i);

			this.remove_nand(i);

			this.remove_nor(i);

			this.remove_xor(i);

			this.remove_xnor(i);

			this.remove_dff(i);

			this.remove_vsat(i);

			this.remove_adder(i);

			this.remove_subtractor(i);

			this.remove_multiplier(i);

			this.remove_divider(i);

			this.remove_gain(i);

			this.remove_absval(i);

			this.remove_vcsw(i);

			this.remove_vcvs(i);

			this.remove_vccs(i);

			this.remove_cccs(i);

			this.remove_ccvs(i);

			this.remove_opamp(i);

			this.remove_nmosfet(i);

			this.remove_pmosfet(i);

			this.remove_npn(i);

			this.remove_pnp(i);

			this.remove_adc(i);

			this.remove_dac(i);

			this.remove_samplers(i);

			this.remove_pwm(i);

			this.remove_integrator(i);

			this.remove_differentiator(i);

			this.remove_lowpass(i);

			this.remove_highpass(i);

			this.remove_relay(i);

			this.remove_pid(i);

			this.remove_lut(i);

			this.remove_vcr(i);

			this.remove_vcca(i);

			this.remove_vcl(i);

			this.remove_grt(i);

			this.remove_tptz(i);

			this.remove_transformer(i);

			/* <!-- END AUTOMATICALLY GENERATED !--> */
		}
	}
	history_snapshot() {
		let packet: Array<string> = [];
		let indexer: number = 0;
		this.meta_data.elm.properties['date'] = global.get_date_stamp();
		this.meta_data.user_scope_settings = global.copy(scope_manager.ENTRY);
		this.meta_data.user_settings = global.copy(global.settings);
		this.meta_data.user_timestep = global.time_step;
		this.meta_data.file_name = global.user_file.title;
		/* Add all element offsets for x and y so we can always know where everything is. */
		this.meta_data.calibration_string = workspace.bounds.left + ', ' + workspace.bounds.top + ', ' + workspace.bounds.right + ', ' + workspace.bounds.bottom;
		packet[indexer++] = JSON.stringify(this.meta_data);
		/* #INSERT_GENERATE_ELEMENT_HISTORY# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < resistors.length; i++) {
			packet[indexer++] = JSON.stringify(resistors[i]);
		}
		for (var i: number = 0; i < capacitors.length; i++) {
			packet[indexer++] = JSON.stringify(capacitors[i]);
		}
		for (var i: number = 0; i < inductors.length; i++) {
			packet[indexer++] = JSON.stringify(inductors[i]);
		}
		for (var i: number = 0; i < grounds.length; i++) {
			packet[indexer++] = JSON.stringify(grounds[i]);
		}
		for (var i: number = 0; i < dcsources.length; i++) {
			packet[indexer++] = JSON.stringify(dcsources[i]);
		}
		for (var i: number = 0; i < dccurrents.length; i++) {
			packet[indexer++] = JSON.stringify(dccurrents[i]);
		}
		for (var i: number = 0; i < acsources.length; i++) {
			packet[indexer++] = JSON.stringify(acsources[i]);
		}
		for (var i: number = 0; i < accurrents.length; i++) {
			packet[indexer++] = JSON.stringify(accurrents[i]);
		}
		for (var i: number = 0; i < squarewaves.length; i++) {
			packet[indexer++] = JSON.stringify(squarewaves[i]);
		}
		for (var i: number = 0; i < sawwaves.length; i++) {
			packet[indexer++] = JSON.stringify(sawwaves[i]);
		}
		for (var i: number = 0; i < trianglewaves.length; i++) {
			packet[indexer++] = JSON.stringify(trianglewaves[i]);
		}
		for (var i: number = 0; i < constants.length; i++) {
			packet[indexer++] = JSON.stringify(constants[i]);
		}
		for (var i: number = 0; i < wires.length; i++) {
			packet[indexer++] = JSON.stringify(wires[i]);
		}
		for (var i: number = 0; i < nets.length; i++) {
			packet[indexer++] = JSON.stringify(nets[i]);
		}
		for (var i: number = 0; i < notes.length; i++) {
			packet[indexer++] = JSON.stringify(notes[i]);
		}
		for (var i: number = 0; i < rails.length; i++) {
			packet[indexer++] = JSON.stringify(rails[i]);
		}
		for (var i: number = 0; i < voltmeters.length; i++) {
			packet[indexer++] = JSON.stringify(voltmeters[i]);
		}
		for (var i: number = 0; i < ohmmeters.length; i++) {
			packet[indexer++] = JSON.stringify(ohmmeters[i]);
		}
		for (var i: number = 0; i < ammeters.length; i++) {
			packet[indexer++] = JSON.stringify(ammeters[i]);
		}
		for (var i: number = 0; i < wattmeters.length; i++) {
			packet[indexer++] = JSON.stringify(wattmeters[i]);
		}
		for (var i: number = 0; i < fuses.length; i++) {
			packet[indexer++] = JSON.stringify(fuses[i]);
		}
		for (var i: number = 0; i < spsts.length; i++) {
			packet[indexer++] = JSON.stringify(spsts[i]);
		}
		for (var i: number = 0; i < spdts.length; i++) {
			packet[indexer++] = JSON.stringify(spdts[i]);
		}
		for (var i: number = 0; i < nots.length; i++) {
			packet[indexer++] = JSON.stringify(nots[i]);
		}
		for (var i: number = 0; i < diodes.length; i++) {
			packet[indexer++] = JSON.stringify(diodes[i]);
		}
		for (var i: number = 0; i < leds.length; i++) {
			packet[indexer++] = JSON.stringify(leds[i]);
		}
		for (var i: number = 0; i < zeners.length; i++) {
			packet[indexer++] = JSON.stringify(zeners[i]);
		}
		for (var i: number = 0; i < potentiometers.length; i++) {
			packet[indexer++] = JSON.stringify(potentiometers[i]);
		}
		for (var i: number = 0; i < ands.length; i++) {
			packet[indexer++] = JSON.stringify(ands[i]);
		}
		for (var i: number = 0; i < ors.length; i++) {
			packet[indexer++] = JSON.stringify(ors[i]);
		}
		for (var i: number = 0; i < nands.length; i++) {
			packet[indexer++] = JSON.stringify(nands[i]);
		}
		for (var i: number = 0; i < nors.length; i++) {
			packet[indexer++] = JSON.stringify(nors[i]);
		}
		for (var i: number = 0; i < xors.length; i++) {
			packet[indexer++] = JSON.stringify(xors[i]);
		}
		for (var i: number = 0; i < xnors.length; i++) {
			packet[indexer++] = JSON.stringify(xnors[i]);
		}
		for (var i: number = 0; i < dffs.length; i++) {
			packet[indexer++] = JSON.stringify(dffs[i]);
		}
		for (var i: number = 0; i < vsats.length; i++) {
			packet[indexer++] = JSON.stringify(vsats[i]);
		}
		for (var i: number = 0; i < adders.length; i++) {
			packet[indexer++] = JSON.stringify(adders[i]);
		}
		for (var i: number = 0; i < subtractors.length; i++) {
			packet[indexer++] = JSON.stringify(subtractors[i]);
		}
		for (var i: number = 0; i < multipliers.length; i++) {
			packet[indexer++] = JSON.stringify(multipliers[i]);
		}
		for (var i: number = 0; i < dividers.length; i++) {
			packet[indexer++] = JSON.stringify(dividers[i]);
		}
		for (var i: number = 0; i < gains.length; i++) {
			packet[indexer++] = JSON.stringify(gains[i]);
		}
		for (var i: number = 0; i < absvals.length; i++) {
			packet[indexer++] = JSON.stringify(absvals[i]);
		}
		for (var i: number = 0; i < vcsws.length; i++) {
			packet[indexer++] = JSON.stringify(vcsws[i]);
		}
		for (var i: number = 0; i < vcvss.length; i++) {
			packet[indexer++] = JSON.stringify(vcvss[i]);
		}
		for (var i: number = 0; i < vccss.length; i++) {
			packet[indexer++] = JSON.stringify(vccss[i]);
		}
		for (var i: number = 0; i < cccss.length; i++) {
			packet[indexer++] = JSON.stringify(cccss[i]);
		}
		for (var i: number = 0; i < ccvss.length; i++) {
			packet[indexer++] = JSON.stringify(ccvss[i]);
		}
		for (var i: number = 0; i < opamps.length; i++) {
			packet[indexer++] = JSON.stringify(opamps[i]);
		}
		for (var i: number = 0; i < nmosfets.length; i++) {
			packet[indexer++] = JSON.stringify(nmosfets[i]);
		}
		for (var i: number = 0; i < pmosfets.length; i++) {
			packet[indexer++] = JSON.stringify(pmosfets[i]);
		}
		for (var i: number = 0; i < npns.length; i++) {
			packet[indexer++] = JSON.stringify(npns[i]);
		}
		for (var i: number = 0; i < pnps.length; i++) {
			packet[indexer++] = JSON.stringify(pnps[i]);
		}
		for (var i: number = 0; i < adcs.length; i++) {
			packet[indexer++] = JSON.stringify(adcs[i]);
		}
		for (var i: number = 0; i < dacs.length; i++) {
			packet[indexer++] = JSON.stringify(dacs[i]);
		}
		for (var i: number = 0; i < sandhs.length; i++) {
			packet[indexer++] = JSON.stringify(sandhs[i]);
		}
		for (var i: number = 0; i < pwms.length; i++) {
			packet[indexer++] = JSON.stringify(pwms[i]);
		}
		for (var i: number = 0; i < integrators.length; i++) {
			packet[indexer++] = JSON.stringify(integrators[i]);
		}
		for (var i: number = 0; i < differentiators.length; i++) {
			packet[indexer++] = JSON.stringify(differentiators[i]);
		}
		for (var i: number = 0; i < lowpasses.length; i++) {
			packet[indexer++] = JSON.stringify(lowpasses[i]);
		}
		for (var i: number = 0; i < highpasses.length; i++) {
			packet[indexer++] = JSON.stringify(highpasses[i]);
		}
		for (var i: number = 0; i < relays.length; i++) {
			packet[indexer++] = JSON.stringify(relays[i]);
		}
		for (var i: number = 0; i < pids.length; i++) {
			packet[indexer++] = JSON.stringify(pids[i]);
		}
		for (var i: number = 0; i < luts.length; i++) {
			packet[indexer++] = JSON.stringify(luts[i]);
		}
		for (var i: number = 0; i < vcrs.length; i++) {
			packet[indexer++] = JSON.stringify(vcrs[i]);
		}
		for (var i: number = 0; i < vccas.length; i++) {
			packet[indexer++] = JSON.stringify(vccas[i]);
		}
		for (var i: number = 0; i < vcls.length; i++) {
			packet[indexer++] = JSON.stringify(vcls[i]);
		}
		for (var i: number = 0; i < grts.length; i++) {
			packet[indexer++] = JSON.stringify(grts[i]);
		}
		for (var i: number = 0; i < tptzs.length; i++) {
			packet[indexer++] = JSON.stringify(tptzs[i]);
		}
		for (var i: number = 0; i < transformers.length; i++) {
			packet[indexer++] = JSON.stringify(transformers[i]);
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		return packet.join(global.PACKET_DIVIDER);
	}
	/* #INSERT_GENERATE_REMOVE_ELEMENTS# */
	/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
	remove_resistor(index: number): void {
		if (index < resistors.length) {
			resistors[index].release_wires();
			resistors[index].release_nodes();
			resistors[index].remove_focus();
			resistors[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			resistors.splice(index, 1);
		}
	}

	remove_capacitor(index: number): void {
		if (index < capacitors.length) {
			capacitors[index].release_wires();
			capacitors[index].release_nodes();
			capacitors[index].remove_focus();
			capacitors[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			capacitors.splice(index, 1);
		}
	}

	remove_inductor(index: number): void {
		if (index < inductors.length) {
			inductors[index].release_wires();
			inductors[index].release_nodes();
			inductors[index].remove_focus();
			inductors[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			inductors.splice(index, 1);
		}
	}

	remove_ground(index: number): void {
		if (index < grounds.length) {
			grounds[index].release_wires();
			grounds[index].release_nodes();
			grounds[index].remove_focus();
			grounds[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			grounds.splice(index, 1);
		}
	}

	remove_dcsource(index: number): void {
		if (index < dcsources.length) {
			dcsources[index].release_wires();
			dcsources[index].release_nodes();
			dcsources[index].remove_focus();
			dcsources[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			dcsources.splice(index, 1);
		}
	}

	remove_dccurrent(index: number): void {
		if (index < dccurrents.length) {
			dccurrents[index].release_wires();
			dccurrents[index].release_nodes();
			dccurrents[index].remove_focus();
			dccurrents[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			dccurrents.splice(index, 1);
		}
	}

	remove_acsource(index: number): void {
		if (index < acsources.length) {
			acsources[index].release_wires();
			acsources[index].release_nodes();
			acsources[index].remove_focus();
			acsources[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			acsources.splice(index, 1);
		}
	}

	remove_accurrent(index: number): void {
		if (index < accurrents.length) {
			accurrents[index].release_wires();
			accurrents[index].release_nodes();
			accurrents[index].remove_focus();
			accurrents[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			accurrents.splice(index, 1);
		}
	}

	remove_squarewave(index: number): void {
		if (index < squarewaves.length) {
			squarewaves[index].release_wires();
			squarewaves[index].release_nodes();
			squarewaves[index].remove_focus();
			squarewaves[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			squarewaves.splice(index, 1);
		}
	}

	remove_sawwave(index: number): void {
		if (index < sawwaves.length) {
			sawwaves[index].release_wires();
			sawwaves[index].release_nodes();
			sawwaves[index].remove_focus();
			sawwaves[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			sawwaves.splice(index, 1);
		}
	}

	remove_trianglewave(index: number): void {
		if (index < trianglewaves.length) {
			trianglewaves[index].release_wires();
			trianglewaves[index].release_nodes();
			trianglewaves[index].remove_focus();
			trianglewaves[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			trianglewaves.splice(index, 1);
		}
	}

	remove_constant(index: number): void {
		if (index < constants.length) {
			constants[index].release_wires();
			constants[index].release_nodes();
			constants[index].remove_focus();
			constants[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			constants.splice(index, 1);
		}
	}

	remove_wire(index: number): void {
		if (index < wires.length) {
			wires[index].release_wires();
			wires[index].release_nodes();
			wires[index].remove_focus();
			wires[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			wires.splice(index, 1);
		}
	}

	remove_net(index: number): void {
		if (index < nets.length) {
			nets[index].release_wires();
			nets[index].release_nodes();
			nets[index].remove_focus();
			nets[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			nets.splice(index, 1);
		}
	}

	remove_note(index: number): void {
		if (index < notes.length) {
			notes[index].release_wires();
			notes[index].release_nodes();
			notes[index].remove_focus();
			notes[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			notes.splice(index, 1);
		}
	}

	remove_rail(index: number): void {
		if (index < rails.length) {
			rails[index].release_wires();
			rails[index].release_nodes();
			rails[index].remove_focus();
			rails[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			rails.splice(index, 1);
		}
	}

	remove_voltmeter(index: number): void {
		if (index < voltmeters.length) {
			voltmeters[index].release_wires();
			voltmeters[index].release_nodes();
			voltmeters[index].remove_focus();
			voltmeters[index].remove_selection();
			wire_manager.reset_wire_builder();
			scope_manager.remove(voltmeters[index].elm.id, voltmeters[index].elm.type);

			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			voltmeters.splice(index, 1);
		}
	}

	remove_ohmmeter(index: number): void {
		if (index < ohmmeters.length) {
			ohmmeters[index].release_wires();
			ohmmeters[index].release_nodes();
			ohmmeters[index].remove_focus();
			ohmmeters[index].remove_selection();
			wire_manager.reset_wire_builder();
			scope_manager.remove(ohmmeters[index].elm.id, ohmmeters[index].elm.type);

			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			ohmmeters.splice(index, 1);
		}
	}

	remove_ammeter(index: number): void {
		if (index < ammeters.length) {
			ammeters[index].release_wires();
			ammeters[index].release_nodes();
			ammeters[index].remove_focus();
			ammeters[index].remove_selection();
			wire_manager.reset_wire_builder();
			scope_manager.remove(ammeters[index].elm.id, ammeters[index].elm.type);

			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			ammeters.splice(index, 1);
		}
	}

	remove_wattmeter(index: number): void {
		if (index < wattmeters.length) {
			wattmeters[index].release_wires();
			wattmeters[index].release_nodes();
			wattmeters[index].remove_focus();
			wattmeters[index].remove_selection();
			wire_manager.reset_wire_builder();
			scope_manager.remove(wattmeters[index].elm.id, wattmeters[index].elm.type);

			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			wattmeters.splice(index, 1);
		}
	}

	remove_fuse(index: number): void {
		if (index < fuses.length) {
			fuses[index].release_wires();
			fuses[index].release_nodes();
			fuses[index].remove_focus();
			fuses[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			fuses.splice(index, 1);
		}
	}

	remove_spst(index: number): void {
		if (index < spsts.length) {
			spsts[index].release_wires();
			spsts[index].release_nodes();
			spsts[index].remove_focus();
			spsts[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			spsts.splice(index, 1);
		}
	}

	remove_spdt(index: number): void {
		if (index < spdts.length) {
			spdts[index].release_wires();
			spdts[index].release_nodes();
			spdts[index].remove_focus();
			spdts[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			spdts.splice(index, 1);
		}
	}

	remove_not(index: number): void {
		if (index < nots.length) {
			nots[index].release_wires();
			nots[index].release_nodes();
			nots[index].remove_focus();
			nots[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			nots.splice(index, 1);
		}
	}

	remove_diode(index: number): void {
		if (index < diodes.length) {
			diodes[index].release_wires();
			diodes[index].release_nodes();
			diodes[index].remove_focus();
			diodes[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			diodes.splice(index, 1);
		}
	}

	remove_led(index: number): void {
		if (index < leds.length) {
			leds[index].release_wires();
			leds[index].release_nodes();
			leds[index].remove_focus();
			leds[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			leds.splice(index, 1);
		}
	}

	remove_zener(index: number): void {
		if (index < zeners.length) {
			zeners[index].release_wires();
			zeners[index].release_nodes();
			zeners[index].remove_focus();
			zeners[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			zeners.splice(index, 1);
		}
	}

	remove_potentiometer(index: number): void {
		if (index < potentiometers.length) {
			potentiometers[index].release_wires();
			potentiometers[index].release_nodes();
			potentiometers[index].remove_focus();
			potentiometers[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			potentiometers.splice(index, 1);
		}
	}

	remove_and(index: number): void {
		if (index < ands.length) {
			ands[index].release_wires();
			ands[index].release_nodes();
			ands[index].remove_focus();
			ands[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			ands.splice(index, 1);
		}
	}

	remove_or(index: number): void {
		if (index < ors.length) {
			ors[index].release_wires();
			ors[index].release_nodes();
			ors[index].remove_focus();
			ors[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			ors.splice(index, 1);
		}
	}

	remove_nand(index: number): void {
		if (index < nands.length) {
			nands[index].release_wires();
			nands[index].release_nodes();
			nands[index].remove_focus();
			nands[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			nands.splice(index, 1);
		}
	}

	remove_nor(index: number): void {
		if (index < nors.length) {
			nors[index].release_wires();
			nors[index].release_nodes();
			nors[index].remove_focus();
			nors[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			nors.splice(index, 1);
		}
	}

	remove_xor(index: number): void {
		if (index < xors.length) {
			xors[index].release_wires();
			xors[index].release_nodes();
			xors[index].remove_focus();
			xors[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			xors.splice(index, 1);
		}
	}

	remove_xnor(index: number): void {
		if (index < xnors.length) {
			xnors[index].release_wires();
			xnors[index].release_nodes();
			xnors[index].remove_focus();
			xnors[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			xnors.splice(index, 1);
		}
	}

	remove_dff(index: number): void {
		if (index < dffs.length) {
			dffs[index].release_wires();
			dffs[index].release_nodes();
			dffs[index].remove_focus();
			dffs[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			dffs.splice(index, 1);
		}
	}

	remove_vsat(index: number): void {
		if (index < vsats.length) {
			vsats[index].release_wires();
			vsats[index].release_nodes();
			vsats[index].remove_focus();
			vsats[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			vsats.splice(index, 1);
		}
	}

	remove_adder(index: number): void {
		if (index < adders.length) {
			adders[index].release_wires();
			adders[index].release_nodes();
			adders[index].remove_focus();
			adders[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			adders.splice(index, 1);
		}
	}

	remove_subtractor(index: number): void {
		if (index < subtractors.length) {
			subtractors[index].release_wires();
			subtractors[index].release_nodes();
			subtractors[index].remove_focus();
			subtractors[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			subtractors.splice(index, 1);
		}
	}

	remove_multiplier(index: number): void {
		if (index < multipliers.length) {
			multipliers[index].release_wires();
			multipliers[index].release_nodes();
			multipliers[index].remove_focus();
			multipliers[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			multipliers.splice(index, 1);
		}
	}

	remove_divider(index: number): void {
		if (index < dividers.length) {
			dividers[index].release_wires();
			dividers[index].release_nodes();
			dividers[index].remove_focus();
			dividers[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			dividers.splice(index, 1);
		}
	}

	remove_gain(index: number): void {
		if (index < gains.length) {
			gains[index].release_wires();
			gains[index].release_nodes();
			gains[index].remove_focus();
			gains[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			gains.splice(index, 1);
		}
	}

	remove_absval(index: number): void {
		if (index < absvals.length) {
			absvals[index].release_wires();
			absvals[index].release_nodes();
			absvals[index].remove_focus();
			absvals[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			absvals.splice(index, 1);
		}
	}

	remove_vcsw(index: number): void {
		if (index < vcsws.length) {
			vcsws[index].release_wires();
			vcsws[index].release_nodes();
			vcsws[index].remove_focus();
			vcsws[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			vcsws.splice(index, 1);
		}
	}

	remove_vcvs(index: number): void {
		if (index < vcvss.length) {
			vcvss[index].release_wires();
			vcvss[index].release_nodes();
			vcvss[index].remove_focus();
			vcvss[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			vcvss.splice(index, 1);
		}
	}

	remove_vccs(index: number): void {
		if (index < vccss.length) {
			vccss[index].release_wires();
			vccss[index].release_nodes();
			vccss[index].remove_focus();
			vccss[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			vccss.splice(index, 1);
		}
	}

	remove_cccs(index: number): void {
		if (index < cccss.length) {
			cccss[index].release_wires();
			cccss[index].release_nodes();
			cccss[index].remove_focus();
			cccss[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			cccss.splice(index, 1);
		}
	}

	remove_ccvs(index: number): void {
		if (index < ccvss.length) {
			ccvss[index].release_wires();
			ccvss[index].release_nodes();
			ccvss[index].remove_focus();
			ccvss[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			ccvss.splice(index, 1);
		}
	}

	remove_opamp(index: number): void {
		if (index < opamps.length) {
			opamps[index].release_wires();
			opamps[index].release_nodes();
			opamps[index].remove_focus();
			opamps[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			opamps.splice(index, 1);
		}
	}

	remove_nmosfet(index: number): void {
		if (index < nmosfets.length) {
			nmosfets[index].release_wires();
			nmosfets[index].release_nodes();
			nmosfets[index].remove_focus();
			nmosfets[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			nmosfets.splice(index, 1);
		}
	}

	remove_pmosfet(index: number): void {
		if (index < pmosfets.length) {
			pmosfets[index].release_wires();
			pmosfets[index].release_nodes();
			pmosfets[index].remove_focus();
			pmosfets[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			pmosfets.splice(index, 1);
		}
	}

	remove_npn(index: number): void {
		if (index < npns.length) {
			npns[index].release_wires();
			npns[index].release_nodes();
			npns[index].remove_focus();
			npns[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			npns.splice(index, 1);
		}
	}

	remove_pnp(index: number): void {
		if (index < pnps.length) {
			pnps[index].release_wires();
			pnps[index].release_nodes();
			pnps[index].remove_focus();
			pnps[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			pnps.splice(index, 1);
		}
	}

	remove_adc(index: number): void {
		if (index < adcs.length) {
			adcs[index].release_wires();
			adcs[index].release_nodes();
			adcs[index].remove_focus();
			adcs[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			adcs.splice(index, 1);
		}
	}

	remove_dac(index: number): void {
		if (index < dacs.length) {
			dacs[index].release_wires();
			dacs[index].release_nodes();
			dacs[index].remove_focus();
			dacs[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			dacs.splice(index, 1);
		}
	}

	remove_samplers(index: number): void {
		if (index < sandhs.length) {
			sandhs[index].release_wires();
			sandhs[index].release_nodes();
			sandhs[index].remove_focus();
			sandhs[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			sandhs.splice(index, 1);
		}
	}

	remove_pwm(index: number): void {
		if (index < pwms.length) {
			pwms[index].release_wires();
			pwms[index].release_nodes();
			pwms[index].remove_focus();
			pwms[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			pwms.splice(index, 1);
		}
	}

	remove_integrator(index: number): void {
		if (index < integrators.length) {
			integrators[index].release_wires();
			integrators[index].release_nodes();
			integrators[index].remove_focus();
			integrators[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			integrators.splice(index, 1);
		}
	}

	remove_differentiator(index: number): void {
		if (index < differentiators.length) {
			differentiators[index].release_wires();
			differentiators[index].release_nodes();
			differentiators[index].remove_focus();
			differentiators[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			differentiators.splice(index, 1);
		}
	}

	remove_lowpass(index: number): void {
		if (index < lowpasses.length) {
			lowpasses[index].release_wires();
			lowpasses[index].release_nodes();
			lowpasses[index].remove_focus();
			lowpasses[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			lowpasses.splice(index, 1);
		}
	}

	remove_highpass(index: number): void {
		if (index < highpasses.length) {
			highpasses[index].release_wires();
			highpasses[index].release_nodes();
			highpasses[index].remove_focus();
			highpasses[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			highpasses.splice(index, 1);
		}
	}

	remove_relay(index: number): void {
		if (index < relays.length) {
			relays[index].release_wires();
			relays[index].release_nodes();
			relays[index].remove_focus();
			relays[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			relays.splice(index, 1);
		}
	}

	remove_pid(index: number): void {
		if (index < pids.length) {
			pids[index].release_wires();
			pids[index].release_nodes();
			pids[index].remove_focus();
			pids[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			pids.splice(index, 1);
		}
	}

	remove_lut(index: number): void {
		if (index < luts.length) {
			luts[index].release_wires();
			luts[index].release_nodes();
			luts[index].remove_focus();
			luts[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			luts.splice(index, 1);
		}
	}

	remove_vcr(index: number): void {
		if (index < vcrs.length) {
			vcrs[index].release_wires();
			vcrs[index].release_nodes();
			vcrs[index].remove_focus();
			vcrs[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			vcrs.splice(index, 1);
		}
	}

	remove_vcca(index: number): void {
		if (index < vccas.length) {
			vccas[index].release_wires();
			vccas[index].release_nodes();
			vccas[index].remove_focus();
			vccas[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			vccas.splice(index, 1);
		}
	}

	remove_vcl(index: number): void {
		if (index < vcls.length) {
			vcls[index].release_wires();
			vcls[index].release_nodes();
			vcls[index].remove_focus();
			vcls[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			vcls.splice(index, 1);
		}
	}

	remove_grt(index: number): void {
		if (index < grts.length) {
			grts[index].release_wires();
			grts[index].release_nodes();
			grts[index].remove_focus();
			grts[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			grts.splice(index, 1);
		}
	}

	remove_tptz(index: number): void {
		if (index < tptzs.length) {
			tptzs[index].release_wires();
			tptzs[index].release_nodes();
			tptzs[index].remove_focus();
			tptzs[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			tptzs.splice(index, 1);
		}
	}

	remove_transformer(index: number): void {
		if (index < transformers.length) {
			transformers[index].release_wires();
			transformers[index].release_nodes();
			transformers[index].remove_focus();
			transformers[index].remove_selection();
			wire_manager.reset_wire_builder();
			global.SIGNAL_WIRE_DELETED = true;
			global.signal_wire_deleted_counter = 0;
			transformers.splice(index, 1);
		}
	}

	/* <!-- END AUTOMATICALLY GENERATED !--> */
	reset_selection(urgent: boolean): void {
		if (
			!global.FLAG_SAVE_IMAGE &&
			!global.FLAG_SAVE_CIRCUIT &&
			!global.FLAG_ZOOM &&
			!global.FLAG_ELEMENT_OPTIONS &&
			!global.FLAG_ELEMENT_OPTIONS_EDIT &&
			!global.FLAG_GRAPH &&
			!global.FLAG_SELECT_ELEMENT &&
			!global.FLAG_SELECT_TIMESTEP &&
			!global.FLAG_SELECT_SETTINGS &&
			!global.FLAG_REMOVE_ALL &&
			!global.mouse_keyboard_lock
		) {
			if (!global.is_right_click) {
				if (global.selected) {
					if (!global.component_touched || urgent) {
						global.selected_id = global.NULL;
						global.selected_type = -1;
						global.selected_bounds = global.NULL;
						global.selected_properties = global.NULL;
						global.selected = false;
					}
				}
				if (!global.component_touched || urgent || global.selected) {
					/* #INSERT_GENERATE_RESET_MULTI_SELECT_ELEMENTS# */
					/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
					for (var i: number = 0; i < resistors.length; i++) {
						resistors[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < capacitors.length; i++) {
						capacitors[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < inductors.length; i++) {
						inductors[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < grounds.length; i++) {
						grounds[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < dcsources.length; i++) {
						dcsources[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < dccurrents.length; i++) {
						dccurrents[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < acsources.length; i++) {
						acsources[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < accurrents.length; i++) {
						accurrents[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < squarewaves.length; i++) {
						squarewaves[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < sawwaves.length; i++) {
						sawwaves[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < trianglewaves.length; i++) {
						trianglewaves[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < constants.length; i++) {
						constants[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < wires.length; i++) {
						wires[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < nets.length; i++) {
						nets[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < notes.length; i++) {
						notes[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < rails.length; i++) {
						rails[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < voltmeters.length; i++) {
						voltmeters[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < ohmmeters.length; i++) {
						ohmmeters[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < ammeters.length; i++) {
						ammeters[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < wattmeters.length; i++) {
						wattmeters[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < fuses.length; i++) {
						fuses[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < spsts.length; i++) {
						spsts[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < spdts.length; i++) {
						spdts[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < nots.length; i++) {
						nots[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < diodes.length; i++) {
						diodes[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < leds.length; i++) {
						leds[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < zeners.length; i++) {
						zeners[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < potentiometers.length; i++) {
						potentiometers[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < ands.length; i++) {
						ands[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < ors.length; i++) {
						ors[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < nands.length; i++) {
						nands[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < nors.length; i++) {
						nors[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < xors.length; i++) {
						xors[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < xnors.length; i++) {
						xnors[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < dffs.length; i++) {
						dffs[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < vsats.length; i++) {
						vsats[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < adders.length; i++) {
						adders[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < subtractors.length; i++) {
						subtractors[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < multipliers.length; i++) {
						multipliers[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < dividers.length; i++) {
						dividers[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < gains.length; i++) {
						gains[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < absvals.length; i++) {
						absvals[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < vcsws.length; i++) {
						vcsws[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < vcvss.length; i++) {
						vcvss[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < vccss.length; i++) {
						vccss[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < cccss.length; i++) {
						cccss[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < ccvss.length; i++) {
						ccvss[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < opamps.length; i++) {
						opamps[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < nmosfets.length; i++) {
						nmosfets[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < pmosfets.length; i++) {
						pmosfets[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < npns.length; i++) {
						npns[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < pnps.length; i++) {
						pnps[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < adcs.length; i++) {
						adcs[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < dacs.length; i++) {
						dacs[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < sandhs.length; i++) {
						sandhs[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < pwms.length; i++) {
						pwms[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < integrators.length; i++) {
						integrators[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < differentiators.length; i++) {
						differentiators[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < lowpasses.length; i++) {
						lowpasses[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < highpasses.length; i++) {
						highpasses[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < relays.length; i++) {
						relays[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < pids.length; i++) {
						pids[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < luts.length; i++) {
						luts[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < vcrs.length; i++) {
						vcrs[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < vccas.length; i++) {
						vccas[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < vcls.length; i++) {
						vcls[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < grts.length; i++) {
						grts[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < tptzs.length; i++) {
						tptzs[i].MULTI_SELECTED = false;
					}
					for (var i: number = 0; i < transformers.length; i++) {
						transformers[i].MULTI_SELECTED = false;
					}
					/* <!-- END AUTOMATICALLY GENERATED !--> */
				}
			}
			global.component_touched = false;
		}
		if (!global.is_right_click) {
			if (!global.selected) {
				multi_select_manager.refresh_multi_select();
			}
		}
	}
	draw_unselected_components(canvas) {
		/* #INSERT_GENERATE_DRAW_UNSELECTED# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < resistors.length; i++) {
			resistors[i].draw_component(canvas);
		}

		for (var i: number = 0; i < capacitors.length; i++) {
			capacitors[i].draw_component(canvas);
		}

		for (var i: number = 0; i < inductors.length; i++) {
			inductors[i].draw_component(canvas);
		}

		for (var i: number = 0; i < grounds.length; i++) {
			grounds[i].draw_component(canvas);
		}

		for (var i: number = 0; i < dcsources.length; i++) {
			dcsources[i].draw_component(canvas);
		}

		for (var i: number = 0; i < dccurrents.length; i++) {
			dccurrents[i].draw_component(canvas);
		}

		for (var i: number = 0; i < acsources.length; i++) {
			acsources[i].draw_component(canvas);
		}

		for (var i: number = 0; i < accurrents.length; i++) {
			accurrents[i].draw_component(canvas);
		}

		for (var i: number = 0; i < squarewaves.length; i++) {
			squarewaves[i].draw_component(canvas);
		}

		for (var i: number = 0; i < sawwaves.length; i++) {
			sawwaves[i].draw_component(canvas);
		}

		for (var i: number = 0; i < trianglewaves.length; i++) {
			trianglewaves[i].draw_component(canvas);
		}

		for (var i: number = 0; i < constants.length; i++) {
			constants[i].draw_component(canvas);
		}

		for (var i: number = 0; i < nets.length; i++) {
			nets[i].draw_component(canvas);
		}

		for (var i: number = 0; i < notes.length; i++) {
			notes[i].draw_component(canvas);
		}

		for (var i: number = 0; i < rails.length; i++) {
			rails[i].draw_component(canvas);
		}

		for (var i: number = 0; i < voltmeters.length; i++) {
			voltmeters[i].draw_component(canvas);
		}

		for (var i: number = 0; i < ohmmeters.length; i++) {
			ohmmeters[i].draw_component(canvas);
		}

		for (var i: number = 0; i < ammeters.length; i++) {
			ammeters[i].draw_component(canvas);
		}

		for (var i: number = 0; i < wattmeters.length; i++) {
			wattmeters[i].draw_component(canvas);
		}

		for (var i: number = 0; i < fuses.length; i++) {
			fuses[i].draw_component(canvas);
		}

		for (var i: number = 0; i < spsts.length; i++) {
			spsts[i].draw_component(canvas);
		}

		for (var i: number = 0; i < spdts.length; i++) {
			spdts[i].draw_component(canvas);
		}

		for (var i: number = 0; i < nots.length; i++) {
			nots[i].draw_component(canvas);
		}

		for (var i: number = 0; i < diodes.length; i++) {
			diodes[i].draw_component(canvas);
		}

		for (var i: number = 0; i < leds.length; i++) {
			leds[i].draw_component(canvas);
		}

		for (var i: number = 0; i < zeners.length; i++) {
			zeners[i].draw_component(canvas);
		}

		for (var i: number = 0; i < potentiometers.length; i++) {
			potentiometers[i].draw_component(canvas);
		}

		for (var i: number = 0; i < ands.length; i++) {
			ands[i].draw_component(canvas);
		}

		for (var i: number = 0; i < ors.length; i++) {
			ors[i].draw_component(canvas);
		}

		for (var i: number = 0; i < nands.length; i++) {
			nands[i].draw_component(canvas);
		}

		for (var i: number = 0; i < nors.length; i++) {
			nors[i].draw_component(canvas);
		}

		for (var i: number = 0; i < xors.length; i++) {
			xors[i].draw_component(canvas);
		}

		for (var i: number = 0; i < xnors.length; i++) {
			xnors[i].draw_component(canvas);
		}

		for (var i: number = 0; i < dffs.length; i++) {
			dffs[i].draw_component(canvas);
		}

		for (var i: number = 0; i < vsats.length; i++) {
			vsats[i].draw_component(canvas);
		}

		for (var i: number = 0; i < adders.length; i++) {
			adders[i].draw_component(canvas);
		}

		for (var i: number = 0; i < subtractors.length; i++) {
			subtractors[i].draw_component(canvas);
		}

		for (var i: number = 0; i < multipliers.length; i++) {
			multipliers[i].draw_component(canvas);
		}

		for (var i: number = 0; i < dividers.length; i++) {
			dividers[i].draw_component(canvas);
		}

		for (var i: number = 0; i < gains.length; i++) {
			gains[i].draw_component(canvas);
		}

		for (var i: number = 0; i < absvals.length; i++) {
			absvals[i].draw_component(canvas);
		}

		for (var i: number = 0; i < vcsws.length; i++) {
			vcsws[i].draw_component(canvas);
		}

		for (var i: number = 0; i < vcvss.length; i++) {
			vcvss[i].draw_component(canvas);
		}

		for (var i: number = 0; i < vccss.length; i++) {
			vccss[i].draw_component(canvas);
		}

		for (var i: number = 0; i < cccss.length; i++) {
			cccss[i].draw_component(canvas);
		}

		for (var i: number = 0; i < ccvss.length; i++) {
			ccvss[i].draw_component(canvas);
		}

		for (var i: number = 0; i < opamps.length; i++) {
			opamps[i].draw_component(canvas);
		}

		for (var i: number = 0; i < nmosfets.length; i++) {
			nmosfets[i].draw_component(canvas);
		}

		for (var i: number = 0; i < pmosfets.length; i++) {
			pmosfets[i].draw_component(canvas);
		}

		for (var i: number = 0; i < npns.length; i++) {
			npns[i].draw_component(canvas);
		}

		for (var i: number = 0; i < pnps.length; i++) {
			pnps[i].draw_component(canvas);
		}

		for (var i: number = 0; i < adcs.length; i++) {
			adcs[i].draw_component(canvas);
		}

		for (var i: number = 0; i < dacs.length; i++) {
			dacs[i].draw_component(canvas);
		}

		for (var i: number = 0; i < sandhs.length; i++) {
			sandhs[i].draw_component(canvas);
		}

		for (var i: number = 0; i < pwms.length; i++) {
			pwms[i].draw_component(canvas);
		}

		for (var i: number = 0; i < integrators.length; i++) {
			integrators[i].draw_component(canvas);
		}

		for (var i: number = 0; i < differentiators.length; i++) {
			differentiators[i].draw_component(canvas);
		}

		for (var i: number = 0; i < lowpasses.length; i++) {
			lowpasses[i].draw_component(canvas);
		}

		for (var i: number = 0; i < highpasses.length; i++) {
			highpasses[i].draw_component(canvas);
		}

		for (var i: number = 0; i < relays.length; i++) {
			relays[i].draw_component(canvas);
		}

		for (var i: number = 0; i < pids.length; i++) {
			pids[i].draw_component(canvas);
		}

		for (var i: number = 0; i < luts.length; i++) {
			luts[i].draw_component(canvas);
		}

		for (var i: number = 0; i < vcrs.length; i++) {
			vcrs[i].draw_component(canvas);
		}

		for (var i: number = 0; i < vccas.length; i++) {
			vccas[i].draw_component(canvas);
		}

		for (var i: number = 0; i < vcls.length; i++) {
			vcls[i].draw_component(canvas);
		}

		for (var i: number = 0; i < grts.length; i++) {
			grts[i].draw_component(canvas);
		}

		for (var i: number = 0; i < tptzs.length; i++) {
			tptzs[i].draw_component(canvas);
		}

		for (var i: number = 0; i < transformers.length; i++) {
			transformers[i].draw_component(canvas);
		}

		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	draw_selected_components(canvas: GraphicsEngine): void {
		/* Draw the selected component last! It'll always be on top. */
		/* #INSERT_GENERATE_DRAW_SELECTED# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		if (global.selected) {
			if (global.selected_type === global.TYPE_RESISTOR) {
				for (var i: number = 0; i < resistors.length; i++) {
					if (global.selected_id === resistors[i].elm.id) {
						resistors[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_CAPACITOR) {
				for (var i: number = 0; i < capacitors.length; i++) {
					if (global.selected_id === capacitors[i].elm.id) {
						capacitors[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_INDUCTOR) {
				for (var i: number = 0; i < inductors.length; i++) {
					if (global.selected_id === inductors[i].elm.id) {
						inductors[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_GROUND) {
				for (var i: number = 0; i < grounds.length; i++) {
					if (global.selected_id === grounds[i].elm.id) {
						grounds[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_DCSOURCE) {
				for (var i: number = 0; i < dcsources.length; i++) {
					if (global.selected_id === dcsources[i].elm.id) {
						dcsources[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_DCCURRENT) {
				for (var i: number = 0; i < dccurrents.length; i++) {
					if (global.selected_id === dccurrents[i].elm.id) {
						dccurrents[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_ACSOURCE) {
				for (var i: number = 0; i < acsources.length; i++) {
					if (global.selected_id === acsources[i].elm.id) {
						acsources[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_ACCURRENT) {
				for (var i: number = 0; i < accurrents.length; i++) {
					if (global.selected_id === accurrents[i].elm.id) {
						accurrents[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_SQUAREWAVE) {
				for (var i: number = 0; i < squarewaves.length; i++) {
					if (global.selected_id === squarewaves[i].elm.id) {
						squarewaves[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_SAW) {
				for (var i: number = 0; i < sawwaves.length; i++) {
					if (global.selected_id === sawwaves[i].elm.id) {
						sawwaves[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_TRI) {
				for (var i: number = 0; i < trianglewaves.length; i++) {
					if (global.selected_id === trianglewaves[i].elm.id) {
						trianglewaves[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_CONSTANT) {
				for (var i: number = 0; i < constants.length; i++) {
					if (global.selected_id === constants[i].elm.id) {
						constants[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_WIRE) {
				for (var i: number = 0; i < wires.length; i++) {
					if (global.selected_id === wires[i].elm.id) {
						wires[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_NET) {
				for (var i: number = 0; i < nets.length; i++) {
					if (global.selected_id === nets[i].elm.id) {
						nets[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_NOTE) {
				for (var i: number = 0; i < notes.length; i++) {
					if (global.selected_id === notes[i].elm.id) {
						notes[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_RAIL) {
				for (var i: number = 0; i < rails.length; i++) {
					if (global.selected_id === rails[i].elm.id) {
						rails[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_VOLTMETER) {
				for (var i: number = 0; i < voltmeters.length; i++) {
					if (global.selected_id === voltmeters[i].elm.id) {
						voltmeters[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_OHMMETER) {
				for (var i: number = 0; i < ohmmeters.length; i++) {
					if (global.selected_id === ohmmeters[i].elm.id) {
						ohmmeters[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_AMMETER) {
				for (var i: number = 0; i < ammeters.length; i++) {
					if (global.selected_id === ammeters[i].elm.id) {
						ammeters[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_WATTMETER) {
				for (var i: number = 0; i < wattmeters.length; i++) {
					if (global.selected_id === wattmeters[i].elm.id) {
						wattmeters[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_FUSE) {
				for (var i: number = 0; i < fuses.length; i++) {
					if (global.selected_id === fuses[i].elm.id) {
						fuses[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_SPST) {
				for (var i: number = 0; i < spsts.length; i++) {
					if (global.selected_id === spsts[i].elm.id) {
						spsts[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_SPDT) {
				for (var i: number = 0; i < spdts.length; i++) {
					if (global.selected_id === spdts[i].elm.id) {
						spdts[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_NOT) {
				for (var i: number = 0; i < nots.length; i++) {
					if (global.selected_id === nots[i].elm.id) {
						nots[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_DIODE) {
				for (var i: number = 0; i < diodes.length; i++) {
					if (global.selected_id === diodes[i].elm.id) {
						diodes[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_LED) {
				for (var i: number = 0; i < leds.length; i++) {
					if (global.selected_id === leds[i].elm.id) {
						leds[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_ZENER) {
				for (var i: number = 0; i < zeners.length; i++) {
					if (global.selected_id === zeners[i].elm.id) {
						zeners[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_POTENTIOMETER) {
				for (var i: number = 0; i < potentiometers.length; i++) {
					if (global.selected_id === potentiometers[i].elm.id) {
						potentiometers[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_AND) {
				for (var i: number = 0; i < ands.length; i++) {
					if (global.selected_id === ands[i].elm.id) {
						ands[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_OR) {
				for (var i: number = 0; i < ors.length; i++) {
					if (global.selected_id === ors[i].elm.id) {
						ors[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_NAND) {
				for (var i: number = 0; i < nands.length; i++) {
					if (global.selected_id === nands[i].elm.id) {
						nands[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_NOR) {
				for (var i: number = 0; i < nors.length; i++) {
					if (global.selected_id === nors[i].elm.id) {
						nors[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_XOR) {
				for (var i: number = 0; i < xors.length; i++) {
					if (global.selected_id === xors[i].elm.id) {
						xors[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_XNOR) {
				for (var i: number = 0; i < xnors.length; i++) {
					if (global.selected_id === xnors[i].elm.id) {
						xnors[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_DFF) {
				for (var i: number = 0; i < dffs.length; i++) {
					if (global.selected_id === dffs[i].elm.id) {
						dffs[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_VSAT) {
				for (var i: number = 0; i < vsats.length; i++) {
					if (global.selected_id === vsats[i].elm.id) {
						vsats[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_ADD) {
				for (var i: number = 0; i < adders.length; i++) {
					if (global.selected_id === adders[i].elm.id) {
						adders[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_SUB) {
				for (var i: number = 0; i < subtractors.length; i++) {
					if (global.selected_id === subtractors[i].elm.id) {
						subtractors[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_MUL) {
				for (var i: number = 0; i < multipliers.length; i++) {
					if (global.selected_id === multipliers[i].elm.id) {
						multipliers[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_DIV) {
				for (var i: number = 0; i < dividers.length; i++) {
					if (global.selected_id === dividers[i].elm.id) {
						dividers[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_GAIN) {
				for (var i: number = 0; i < gains.length; i++) {
					if (global.selected_id === gains[i].elm.id) {
						gains[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_ABS) {
				for (var i: number = 0; i < absvals.length; i++) {
					if (global.selected_id === absvals[i].elm.id) {
						absvals[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_VCSW) {
				for (var i: number = 0; i < vcsws.length; i++) {
					if (global.selected_id === vcsws[i].elm.id) {
						vcsws[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_VCVS) {
				for (var i: number = 0; i < vcvss.length; i++) {
					if (global.selected_id === vcvss[i].elm.id) {
						vcvss[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_VCCS) {
				for (var i: number = 0; i < vccss.length; i++) {
					if (global.selected_id === vccss[i].elm.id) {
						vccss[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_CCCS) {
				for (var i: number = 0; i < cccss.length; i++) {
					if (global.selected_id === cccss[i].elm.id) {
						cccss[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_CCVS) {
				for (var i: number = 0; i < ccvss.length; i++) {
					if (global.selected_id === ccvss[i].elm.id) {
						ccvss[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_OPAMP) {
				for (var i: number = 0; i < opamps.length; i++) {
					if (global.selected_id === opamps[i].elm.id) {
						opamps[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_NMOS) {
				for (var i: number = 0; i < nmosfets.length; i++) {
					if (global.selected_id === nmosfets[i].elm.id) {
						nmosfets[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_PMOS) {
				for (var i: number = 0; i < pmosfets.length; i++) {
					if (global.selected_id === pmosfets[i].elm.id) {
						pmosfets[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_NPN) {
				for (var i: number = 0; i < npns.length; i++) {
					if (global.selected_id === npns[i].elm.id) {
						npns[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_PNP) {
				for (var i: number = 0; i < pnps.length; i++) {
					if (global.selected_id === pnps[i].elm.id) {
						pnps[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_ADC) {
				for (var i: number = 0; i < adcs.length; i++) {
					if (global.selected_id === adcs[i].elm.id) {
						adcs[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_DAC) {
				for (var i: number = 0; i < dacs.length; i++) {
					if (global.selected_id === dacs[i].elm.id) {
						dacs[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_SAH) {
				for (var i: number = 0; i < sandhs.length; i++) {
					if (global.selected_id === sandhs[i].elm.id) {
						sandhs[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_PWM) {
				for (var i: number = 0; i < pwms.length; i++) {
					if (global.selected_id === pwms[i].elm.id) {
						pwms[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_INTEGRATOR) {
				for (var i: number = 0; i < integrators.length; i++) {
					if (global.selected_id === integrators[i].elm.id) {
						integrators[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_DIFFERENTIATOR) {
				for (var i: number = 0; i < differentiators.length; i++) {
					if (global.selected_id === differentiators[i].elm.id) {
						differentiators[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_LPF) {
				for (var i: number = 0; i < lowpasses.length; i++) {
					if (global.selected_id === lowpasses[i].elm.id) {
						lowpasses[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_HPF) {
				for (var i: number = 0; i < highpasses.length; i++) {
					if (global.selected_id === highpasses[i].elm.id) {
						highpasses[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_REL) {
				for (var i: number = 0; i < relays.length; i++) {
					if (global.selected_id === relays[i].elm.id) {
						relays[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_PID) {
				for (var i: number = 0; i < pids.length; i++) {
					if (global.selected_id === pids[i].elm.id) {
						pids[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_LUT) {
				for (var i: number = 0; i < luts.length; i++) {
					if (global.selected_id === luts[i].elm.id) {
						luts[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_VCR) {
				for (var i: number = 0; i < vcrs.length; i++) {
					if (global.selected_id === vcrs[i].elm.id) {
						vcrs[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_VCCA) {
				for (var i: number = 0; i < vccas.length; i++) {
					if (global.selected_id === vccas[i].elm.id) {
						vccas[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_VCL) {
				for (var i: number = 0; i < vcls.length; i++) {
					if (global.selected_id === vcls[i].elm.id) {
						vcls[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_GRT) {
				for (var i: number = 0; i < grts.length; i++) {
					if (global.selected_id === grts[i].elm.id) {
						grts[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_TPTZ) {
				for (var i: number = 0; i < tptzs.length; i++) {
					if (global.selected_id === tptzs[i].elm.id) {
						tptzs[i].draw_component(canvas);
						break;
					}
				}
			}
			if (global.selected_type === global.TYPE_TRAN) {
				for (var i: number = 0; i < transformers.length; i++) {
					if (global.selected_id === transformers[i].elm.id) {
						transformers[i].draw_component(canvas);
						break;
					}
				}
			}
		}

		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	draw_meter_traces(canvas: GraphicsEngine): void {
		/* #INSERT_GENERATE_ENGINE_FUNCTION_DRAW_TRACES# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < voltmeters.length; i++) {
			voltmeters[i].draw_trace(canvas);
		}
		for (var i: number = 0; i < ohmmeters.length; i++) {
			ohmmeters[i].draw_trace(canvas);
		}
		for (var i: number = 0; i < ammeters.length; i++) {
			ammeters[i].draw_trace(canvas);
		}
		for (var i: number = 0; i < wattmeters.length; i++) {
			wattmeters[i].draw_trace(canvas);
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	draw_wires(canvas: GraphicsEngine): void {
		for (var i: number = 0; i < wires.length; i++) {
			wires[i].draw_component(canvas);
		}
	}
	snapshot(surface: HTMLCanvasElement, canvas: GraphicsEngine): void {
		canvas.clear(surface);
		let NSX: number = 0.29375 * global.node_space_x;
		let NSY: number = 0.29375 * global.node_space_y;
		let MNSX: number = 1.25 * NSX;
		let MNSY: number = 1.25 * NSY;
		let NODE_LENGTH: number = nodes.length;
		for (var i: number = 0; i < NODE_LENGTH; i++) {
			nodes[i].resize(NSX, NSY, MNSX, MNSY);
			if (NODE_LENGTH - 1 - i === i + 1) {
				break;
			}
			nodes[NODE_LENGTH - 1 - i].resize(NSX, NSY, MNSX, MNSY);
		}
		workspace.workspace_draw(canvas);
		engine_functions.draw_unselected_components(canvas);
		engine_functions.draw_wires(canvas);
		engine_functions.draw_selected_components(canvas);
		engine_functions.draw_meter_traces(canvas);
		canvas.draw_text(language_manager.WATERMARK, 5, 10, general_paint);
		if (global.WIRE_BUILDER['step'] > 0) {
			if (global.WIRE_BUILDER['n1'] > -1 && global.WIRE_BUILDER['n1'] < global.settings.MAXNODES) {
				canvas.draw_rect2(nodes[global.WIRE_BUILDER['n1']].bounds, nodes[global.WIRE_BUILDER['n1']].node_fill_paint);
			}
		}
	}
	capture_image() {
		let temp_zoom: number = global.workspace_zoom_scale;
		global.workspace_zoom_scale = global.PICTURE_ZOOM;
		/* Zoom w/ respect to the center of the workspace bounds. */
		global.mouse_x = workspace.bounds.get_center_x();
		global.mouse_y = workspace.bounds.get_center_y();
		workspace.workspace_zoom();
		/* Move the traces to position */
		/* #INSERT_GENERATE_ENGINE_FUNCTION_REFRESH_TRACES# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < voltmeters.length; i++) {
			voltmeters[i].refresh_bounds();
		}
		for (var i: number = 0; i < ohmmeters.length; i++) {
			ohmmeters[i].refresh_bounds();
		}
		for (var i: number = 0; i < ammeters.length; i++) {
			ammeters[i].refresh_bounds();
		}
		for (var i: number = 0; i < wattmeters.length; i++) {
			wattmeters[i].refresh_bounds();
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		/* Save where we last where (left and top) */
		let temp_left: number = workspace.bounds.left;
		let temp_top: number = workspace.bounds.top;
		/* Go to 0, 0 (left and top) */
		workspace.workspace_translate_bounds(-temp_left, -temp_top);
		/* Create a temporary canvas element */
		let temp_surface: HTMLCanvasElement = document.createElement('canvas');
		temp_surface.width = workspace.bounds.get_width() + 1;
		temp_surface.height = workspace.bounds.get_height() + 1;
		/* Assign the temporary surface an id */
		temp_surface.id = 'temp_canvas';
		/* Access the styling for the canvas. */
		/* Keep it hidden! */
		temp_surface.style.position = 'absolute';
		temp_surface.style.padding = '0';
		temp_surface.style.margin = '0';
		temp_surface.style.zIndex = '0';
		temp_surface.style.visibility = 'hidden';
		temp_surface.style.display = 'none';
		/* Get the drawing context */
		let temp_ctx: CanvasRenderingContext2D = temp_surface.getContext('2d');
		/* Create a temporary drawing engine */
		let temp_canvas: GraphicsEngine = new GraphicsEngine(temp_ctx);
		global.CANVAS_STROKE_WIDTH_1_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 2.25 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_2_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 2.65 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_3_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 9 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_4_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 16 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_5_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 21 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_6_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 43 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_1_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 2.25 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_2_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 2.65 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_3_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 9 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_4_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 16 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_5_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 21 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_6_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 43 * global.workspace_zoom_scale;
		/* Capture several frames to make sure everythings there! */
		for (var i: number = 0; i < global.PICTURE_EXPOSURE_TIME; i++) {
			global.SIGNAL_BUILD_ELEMENT = true;
			global.signal_build_counter = 0;
			this.snapshot(temp_surface, temp_canvas);
		}
		/* Save the image w/ the name of the global file. */
		if (!global.MOBILE_MODE) {
			save_image(global.PNG_TEMPLATE.replace('{NAME}', save_image_window.input_button.text), temp_surface);
		} else {
			save_image_mobile(global.PNG_TEMPLATE.replace('{NAME}', save_image_window.input_button.text), temp_surface);
		}
		/* Translate the bounds back to where we need it to be. */
		workspace.workspace_translate_bounds(temp_left, temp_top);
		/* Restore the zoom! */
		global.workspace_zoom_scale = temp_zoom;
		/* Zoom w/ respect to the center of the workspace bounds. */
		global.mouse_x = workspace.bounds.get_center_x();
		global.mouse_y = workspace.bounds.get_center_y();
		workspace.workspace_zoom();
		global.CANVAS_STROKE_WIDTH_1_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 2.25 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_2_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 2.65 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_3_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 9 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_4_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 16 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_5_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 21 * global.workspace_zoom_scale;
		global.CANVAS_STROKE_WIDTH_6_ZOOM = global.CANVAS_STROKE_WIDTH_BASE * 43 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_1_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 2.25 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_2_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 2.65 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_3_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 9 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_4_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 16 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_5_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 21 * global.workspace_zoom_scale;
		global.CANVAS_TEXT_SIZE_6_ZOOM = global.CANVAS_TEXT_SIZE_BASE * 43 * global.workspace_zoom_scale;
		/* Move the traces to position */
		/* #INSERT_GENERATE_ENGINE_FUNCTION_REFRESH_TRACES# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		for (var i: number = 0; i < voltmeters.length; i++) {
			voltmeters[i].refresh_bounds();
		}
		for (var i: number = 0; i < ohmmeters.length; i++) {
			ohmmeters[i].refresh_bounds();
		}
		for (var i: number = 0; i < ammeters.length; i++) {
			ammeters[i].refresh_bounds();
		}
		for (var i: number = 0; i < wattmeters.length; i++) {
			wattmeters[i].refresh_bounds();
		}
		/* <!-- END AUTOMATICALLY GENERATED !--> */
		temp_surface = global.NULL;
	}
}
