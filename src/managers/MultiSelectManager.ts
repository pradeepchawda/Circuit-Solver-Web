/**********************************************************************
 * Project           : Circuit Solver
 * File		        : MultiSelectManager.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This class handles the multi-select capabilities of the system.
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
class MultiSelectManager {
	public OFFSCREEN_X: number;
	public OFFSCREEN_Y: number;
	public MULTI_SELECT_BOUNDS: RectF;
	public MULTI_SELECT: boolean;
	/* This paint is used for drawing the "lines" that the component is comprised of. */
	public line_paint: Paint;
	/* This paint is used for drawing the "fill" that the component is comprised of. */
	public fill_paint: Paint;
	public SELECT_X: number;
	public SELECT_Y: number;
	public DELTA_CENTER_X: number;
	public DELTA_CENTER_Y: number;
	public DELTA_END_X: number;
	public DELTA_END_Y: number;
	public DELTA_DX: number;
	public DELTA_DY: number;
	public DELTA_LAST_DX: number;
	public DELTA_LAST_DY: number;
	public DELTA_LATCH: boolean;
	public ELEMENTS_MOVED: boolean;
	public CTRL_PRESSED_STARTED: boolean;
	public CTRL_PRESSED: boolean;
	public MULTI_SELECTED_ELEMENT: boolean;
	public MOUSE_DOWN: boolean;
	/* The initalization values are important! */
	public SELECTED_COMPONENTS_BOUNDS: RectF;
	/* A flag to map the multi-select to a shortcut or to enable it always. */
	public ENABLE_KEYS: boolean;
	public DRAW_BOUNDS: RectF;

	constructor() {
		this.OFFSCREEN_X = -500e3;
		this.OFFSCREEN_Y = -500e3;
		this.MULTI_SELECT_BOUNDS = new RectF(this.OFFSCREEN_X, this.OFFSCREEN_Y, this.OFFSCREEN_X + 1, this.OFFSCREEN_Y + 1);
		this.MULTI_SELECT = false;
		/* This paint is used for drawing the "lines" that the component is comprised of. */
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(this.line_paint.style.STROKE);
		this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
		this.line_paint.set_paint_join(this.line_paint.join.MITER);
		this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.line_paint.set_color(global.MULTI_SELECTED_COLOR);
		this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.line_paint.set_font(global.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(this.line_paint.align.CENTER);
		/* This paint is used for drawing the "fill" that the component is comprised of. */
		this.fill_paint = new Paint();
		this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
		this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
		this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
		this.fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
		this.fill_paint.set_color(global.GENERAL_GRAY_COLOR);
		this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
		this.fill_paint.set_font(global.DEFAULT_FONT);
		this.fill_paint.set_alpha(90);
		this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
		this.SELECT_X = 0;
		this.SELECT_Y = 0;
		this.DELTA_CENTER_X = 0;
		this.DELTA_CENTER_Y = 0;
		this.DELTA_END_X = 0;
		this.DELTA_END_Y = 0;
		this.DELTA_DX = 0;
		this.DELTA_DY = 0;
		this.DELTA_LAST_DX = 0;
		this.DELTA_LAST_DY = 0;
		this.DELTA_LATCH = false;
		this.ELEMENTS_MOVED = false;
		this.CTRL_PRESSED_STARTED = false;
		this.CTRL_PRESSED = false;
		this.MULTI_SELECTED_ELEMENT = false;
		this.MOUSE_DOWN = false;
		/* The initalization values are important! */
		this.SELECTED_COMPONENTS_BOUNDS = new RectF(-this.OFFSCREEN_X, -this.OFFSCREEN_Y, this.OFFSCREEN_X + 1, this.OFFSCREEN_Y + 1);
		/* A flag to map the multi-select to a shortcut or to enable it always. */
		this.ENABLE_KEYS = true;
		this.DRAW_BOUNDS = new RectF(0, 0, 0, 0);
	}
	/* Reset the enveloping bounds. */
	reset_enveloping_bounds(): void {
		global.multi_selected = false;
		this.SELECTED_COMPONENTS_BOUNDS.left = -this.OFFSCREEN_X;
		this.SELECTED_COMPONENTS_BOUNDS.top = -this.OFFSCREEN_Y;
		this.SELECTED_COMPONENTS_BOUNDS.right = this.OFFSCREEN_X + 1;
		this.SELECTED_COMPONENTS_BOUNDS.bottom = this.OFFSCREEN_Y + 1;
	}
	refresh_multi_select(): void {
		this.MULTI_SELECTED_ELEMENT = false;
		if (global.selected) {
			if (!global.component_touched) {
				global.selected_id = global.NULL;
				global.selected_type = -1;
				global.selected_bounds = global.NULL;
				global.selected_properties = global.NULL;
				global.selected = false;
			}
		}
		if (this.MULTI_SELECT) {
			/* #INSERT_GENERATE_MULTI_SELECT_ELEMENTS# */
			/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
			for (var i: number = 0; i < resistors.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(resistors[i].bounds.get_center_x(), resistors[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					resistors[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < capacitors.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(capacitors[i].bounds.get_center_x(), capacitors[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					capacitors[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < inductors.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(inductors[i].bounds.get_center_x(), inductors[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					inductors[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < grounds.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(grounds[i].bounds.get_center_x(), grounds[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					grounds[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < dcsources.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(dcsources[i].bounds.get_center_x(), dcsources[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					dcsources[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < dccurrents.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(dccurrents[i].bounds.get_center_x(), dccurrents[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					dccurrents[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < acsources.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(acsources[i].bounds.get_center_x(), acsources[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					acsources[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < accurrents.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(accurrents[i].bounds.get_center_x(), accurrents[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					accurrents[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < squarewaves.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(squarewaves[i].bounds.get_center_x(), squarewaves[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					squarewaves[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < sawwaves.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(sawwaves[i].bounds.get_center_x(), sawwaves[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					sawwaves[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < trianglewaves.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(trianglewaves[i].bounds.get_center_x(), trianglewaves[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					trianglewaves[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < constants.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(constants[i].bounds.get_center_x(), constants[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					constants[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < wires.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(wires[i].bounds.get_center_x(), wires[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					wires[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < nets.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(nets[i].bounds.get_center_x(), nets[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					nets[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < notes.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(notes[i].bounds.get_center_x(), notes[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					notes[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < rails.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(rails[i].bounds.get_center_x(), rails[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					rails[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < voltmeters.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(voltmeters[i].bounds.get_center_x(), voltmeters[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					voltmeters[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < ohmmeters.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(ohmmeters[i].bounds.get_center_x(), ohmmeters[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					ohmmeters[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < ammeters.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(ammeters[i].bounds.get_center_x(), ammeters[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					ammeters[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < wattmeters.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(wattmeters[i].bounds.get_center_x(), wattmeters[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					wattmeters[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < fuses.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(fuses[i].bounds.get_center_x(), fuses[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					fuses[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < spsts.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(spsts[i].bounds.get_center_x(), spsts[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					spsts[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < spdts.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(spdts[i].bounds.get_center_x(), spdts[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					spdts[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < nots.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(nots[i].bounds.get_center_x(), nots[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					nots[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < diodes.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(diodes[i].bounds.get_center_x(), diodes[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					diodes[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < leds.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(leds[i].bounds.get_center_x(), leds[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					leds[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < zeners.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(zeners[i].bounds.get_center_x(), zeners[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					zeners[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < potentiometers.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(potentiometers[i].bounds.get_center_x(), potentiometers[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					potentiometers[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < ands.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(ands[i].bounds.get_center_x(), ands[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					ands[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < ors.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(ors[i].bounds.get_center_x(), ors[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					ors[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < nands.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(nands[i].bounds.get_center_x(), nands[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					nands[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < nors.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(nors[i].bounds.get_center_x(), nors[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					nors[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < xors.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(xors[i].bounds.get_center_x(), xors[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					xors[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < xnors.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(xnors[i].bounds.get_center_x(), xnors[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					xnors[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < dffs.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(dffs[i].bounds.get_center_x(), dffs[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					dffs[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < vsats.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(vsats[i].bounds.get_center_x(), vsats[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					vsats[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < adders.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(adders[i].bounds.get_center_x(), adders[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					adders[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < subtractors.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(subtractors[i].bounds.get_center_x(), subtractors[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					subtractors[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < multipliers.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(multipliers[i].bounds.get_center_x(), multipliers[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					multipliers[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < dividers.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(dividers[i].bounds.get_center_x(), dividers[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					dividers[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < gains.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(gains[i].bounds.get_center_x(), gains[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					gains[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < absvals.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(absvals[i].bounds.get_center_x(), absvals[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					absvals[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < vcsws.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(vcsws[i].bounds.get_center_x(), vcsws[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					vcsws[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < vcvss.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(vcvss[i].bounds.get_center_x(), vcvss[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					vcvss[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < vccss.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(vccss[i].bounds.get_center_x(), vccss[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					vccss[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < cccss.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(cccss[i].bounds.get_center_x(), cccss[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					cccss[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < ccvss.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(ccvss[i].bounds.get_center_x(), ccvss[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					ccvss[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < opamps.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(opamps[i].bounds.get_center_x(), opamps[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					opamps[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < nmosfets.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(nmosfets[i].bounds.get_center_x(), nmosfets[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					nmosfets[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < pmosfets.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(pmosfets[i].bounds.get_center_x(), pmosfets[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					pmosfets[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < npns.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(npns[i].bounds.get_center_x(), npns[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					npns[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < pnps.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(pnps[i].bounds.get_center_x(), pnps[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					pnps[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < adcs.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(adcs[i].bounds.get_center_x(), adcs[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					adcs[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < dacs.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(dacs[i].bounds.get_center_x(), dacs[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					dacs[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < sandhs.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(sandhs[i].bounds.get_center_x(), sandhs[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					sandhs[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < pwms.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(pwms[i].bounds.get_center_x(), pwms[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					pwms[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < integrators.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(integrators[i].bounds.get_center_x(), integrators[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					integrators[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < differentiators.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(differentiators[i].bounds.get_center_x(), differentiators[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					differentiators[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < lowpasses.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(lowpasses[i].bounds.get_center_x(), lowpasses[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					lowpasses[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < highpasses.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(highpasses[i].bounds.get_center_x(), highpasses[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					highpasses[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < relays.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(relays[i].bounds.get_center_x(), relays[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					relays[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < pids.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(pids[i].bounds.get_center_x(), pids[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					pids[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < luts.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(luts[i].bounds.get_center_x(), luts[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					luts[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < vcrs.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(vcrs[i].bounds.get_center_x(), vcrs[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					vcrs[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < grts.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(grts[i].bounds.get_center_x(), grts[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					grts[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < tptzs.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(tptzs[i].bounds.get_center_x(), tptzs[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					tptzs[i].MULTI_SELECTED = true;
				}
			}
			for (var i: number = 0; i < transformers.length; i++) {
				if (this.MULTI_SELECT_BOUNDS.contains_xy(transformers[i].bounds.get_center_x(), transformers[i].bounds.get_center_y())) {
					this.MULTI_SELECTED_ELEMENT = true;
					transformers[i].MULTI_SELECTED = true;
				}
			}
			/* <!-- END AUTOMATICALLY GENERATED !--> */
		}
		if (this.MULTI_SELECTED_ELEMENT) {
			this.MULTI_SELECTED_ELEMENT = false;
		}
		this.MULTI_SELECT_BOUNDS.left = this.OFFSCREEN_X;
		this.MULTI_SELECT_BOUNDS.top = this.OFFSCREEN_Y;
		this.MULTI_SELECT_BOUNDS.right = this.OFFSCREEN_X + 1;
		this.MULTI_SELECT_BOUNDS.bottom = this.OFFSCREEN_Y + 1;
		this.MULTI_SELECT = false;
	}
	key_down(key_event: KEY_EVENT_T): void {
		if (this.ENABLE_KEYS && !global.MOBILE_MODE) {
			if (
				!global.FLAG_SIMULATING &&
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
				!global.FLAG_MENU_OPEN_DOWN &&
				!global.SIGNAL_HISTORY_LOCK
			) {
				if (key_event['ctrl']) {
					this.CTRL_PRESSED_STARTED = true;
				}
			}
		}
	}
	key_up(key_event: KEY_EVENT_T): void {
		if (this.ENABLE_KEYS && !global.SIGNAL_HISTORY_LOCK && !global.MOBILE_MODE) {
			if (!this.MOUSE_DOWN) {
				this.CTRL_PRESSED_STARTED = false;
				this.CTRL_PRESSED = false;
				this.DELTA_LATCH = false;
			}
		}
	}
	mouse_down(): void {
		if (
			!global.FLAG_SIMULATING &&
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
			!global.FLAG_MENU_OPEN_DOWN &&
			!global.SIGNAL_HISTORY_LOCK &&
			!global.MOBILE_MODE
		) {
			if (this.ENABLE_KEYS && !global.SIGNAL_HISTORY_LOCK) {
				this.MOUSE_DOWN = true;
				if (this.CTRL_PRESSED_STARTED) {
					this.CTRL_PRESSED_STARTED = true;
					this.MULTI_SELECT = true;
					this.SELECT_X = global.mouse_x;
					this.SELECT_Y = global.mouse_y;
					this.MULTI_SELECT_BOUNDS.left = global.mouse_x;
					this.MULTI_SELECT_BOUNDS.top = global.mouse_y;
					this.MULTI_SELECT_BOUNDS.right = global.mouse_x;
					this.MULTI_SELECT_BOUNDS.bottom = global.mouse_y;
					this.SELECTED_COMPONENTS_BOUNDS.left = -this.OFFSCREEN_X;
					this.SELECTED_COMPONENTS_BOUNDS.top = -this.OFFSCREEN_Y;
					this.SELECTED_COMPONENTS_BOUNDS.right = this.OFFSCREEN_X + 1;
					this.SELECTED_COMPONENTS_BOUNDS.bottom = this.OFFSCREEN_Y + 1;
				}
			} else {
				if (!global.component_touched) {
					this.CTRL_PRESSED_STARTED = true;
					this.MULTI_SELECT = true;
					this.SELECT_X = global.mouse_x;
					this.SELECT_Y = global.mouse_y;
					this.MULTI_SELECT_BOUNDS.left = global.mouse_x;
					this.MULTI_SELECT_BOUNDS.top = global.mouse_y;
					this.MULTI_SELECT_BOUNDS.right = global.mouse_x;
					this.MULTI_SELECT_BOUNDS.bottom = global.mouse_y;
					this.SELECTED_COMPONENTS_BOUNDS.left = -this.OFFSCREEN_X;
					this.SELECTED_COMPONENTS_BOUNDS.top = -this.OFFSCREEN_Y;
					this.SELECTED_COMPONENTS_BOUNDS.right = this.OFFSCREEN_X + 1;
					this.SELECTED_COMPONENTS_BOUNDS.bottom = this.OFFSCREEN_Y + 1;
				}
			}
			if (global.multi_selected) {
				this.DELTA_CENTER_X = global.mouse_x;
				this.DELTA_CENTER_Y = global.mouse_y;
				this.DELTA_DX = 0;
				this.DELTA_DY = 0;
				this.DELTA_LAST_DX = 0;
				this.DELTA_LAST_DY = 0;
				this.ELEMENTS_MOVED = false;
				if (this.SELECTED_COMPONENTS_BOUNDS.contains_xy(global.mouse_x, global.mouse_y)) {
					this.DELTA_LATCH = true;
				} else {
					this.DELTA_LATCH = false;
				}
			}
		}
	}
	mouse_move(): void {
		if (
			!global.FLAG_SIMULATING &&
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
			!global.FLAG_MENU_OPEN_DOWN &&
			!global.SIGNAL_HISTORY_LOCK &&
			!global.MOBILE_MODE
		) {
			if (this.CTRL_PRESSED_STARTED) {
				if (Math.abs(global.mouse_x - this.SELECT_X) > global.node_space_x || Math.abs(global.mouse_y - this.SELECT_Y) > global.node_space_y) {
					this.CTRL_PRESSED = true;
				}
				if (global.component_translating) {
					this.CTRL_PRESSED = false;
					this.CTRL_PRESSED_STARTED = false;
				}
			}
			if (global.multi_selected && this.DELTA_LATCH) {
				this.DELTA_END_X = global.mouse_x;
				this.DELTA_END_Y = global.mouse_y;
				if (this.DELTA_CENTER_X > 0 && this.DELTA_CENTER_Y > 0) {
					this.DELTA_LAST_DX = this.DELTA_DX;
					this.DELTA_LAST_DY = this.DELTA_DY;
					this.DELTA_DX = Math.floor((this.DELTA_END_X - this.DELTA_CENTER_X) / global.node_space_x);
					this.DELTA_DY = Math.floor((this.DELTA_END_Y - this.DELTA_CENTER_Y) / global.node_space_y);
					if (this.DELTA_DX != this.DELTA_LAST_DX || this.DELTA_DY != this.DELTA_LAST_DY) {
						this.handle_multi_move();
					}
				}
			}
		}
		if (this.CTRL_PRESSED) {
			if (global.mouse_x >= this.SELECT_X) {
				this.MULTI_SELECT_BOUNDS.left = this.SELECT_X;
				this.MULTI_SELECT_BOUNDS.right = global.mouse_x;
			} else {
				this.MULTI_SELECT_BOUNDS.right = this.SELECT_X;
				this.MULTI_SELECT_BOUNDS.left = global.mouse_x;
			}
			if (global.mouse_y >= this.SELECT_Y) {
				this.MULTI_SELECT_BOUNDS.top = this.SELECT_Y;
				this.MULTI_SELECT_BOUNDS.bottom = global.mouse_y;
			} else {
				this.MULTI_SELECT_BOUNDS.bottom = this.SELECT_Y;
				this.MULTI_SELECT_BOUNDS.top = global.mouse_y;
			}
		}
	}
	mouse_up(): void {
		if (!global.MOBILE_MODE) {
			this.MOUSE_DOWN = false;
			this.CTRL_PRESSED_STARTED = false;
			this.CTRL_PRESSED = false;
			this.DELTA_LATCH = false;
			if (this.ELEMENTS_MOVED) {
				global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
				this.ELEMENTS_MOVED = false;
			}
		}
	}
	handle_multi_move(): void {
		/* This logic works... i'll have to block the actual mouse movements for the rest of the elements... */
		/* Add undo / redo capabilities. */
		let dx: number = (this.DELTA_DX - this.DELTA_LAST_DX) * global.node_space_x;
		let dy: number = (this.DELTA_DY - this.DELTA_LAST_DY) * global.node_space_y;
		/* Block the selected components if the bounding rect is too close to the top. */
		if (!(multi_select_manager.SELECTED_COMPONENTS_BOUNDS.top > workspace.bounds.top + global.node_space_y)) {
			if (dy < 0) {
				dy = 0;
			}
		}
		/* Block the selected components if the bounding rect is too close to the bottom. */
		if (!(multi_select_manager.SELECTED_COMPONENTS_BOUNDS.bottom < workspace.bounds.bottom - global.node_space_y)) {
			if (dy > 0) {
				dy = 0;
			}
		}
		/* Block the selected components if the bounding rect is too close to the left. */
		if (!(multi_select_manager.SELECTED_COMPONENTS_BOUNDS.left > workspace.bounds.left + global.node_space_x)) {
			if (dx < 0) {
				dx = 0;
			}
		}
		/* Block the selected components if the bounding rect is too close to the right. */
		if (!(multi_select_manager.SELECTED_COMPONENTS_BOUNDS.right < workspace.bounds.right - global.node_space_x)) {
			if (dx > 0) {
				dx = 0;
			}
		}
		if (dx != 0 || dy != 0) {
			global.SIGNAL_BUILD_ELEMENT = true;
			global.signal_build_counter = 0;
			this.ELEMENTS_MOVED = true;
			/* #INSERT_GENERATE_MULTI_SELECT_ELEMENT_MOVE# */
			/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
			for (var i: number = 0; i < resistors.length; i++) {
				if (resistors[i].MULTI_SELECTED) {
					{
						resistors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < capacitors.length; i++) {
				if (capacitors[i].MULTI_SELECTED) {
					{
						capacitors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < inductors.length; i++) {
				if (inductors[i].MULTI_SELECTED) {
					{
						inductors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < grounds.length; i++) {
				if (grounds[i].MULTI_SELECTED) {
					{
						grounds[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < dcsources.length; i++) {
				if (dcsources[i].MULTI_SELECTED) {
					{
						dcsources[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < dccurrents.length; i++) {
				if (dccurrents[i].MULTI_SELECTED) {
					{
						dccurrents[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < acsources.length; i++) {
				if (acsources[i].MULTI_SELECTED) {
					{
						acsources[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < accurrents.length; i++) {
				if (accurrents[i].MULTI_SELECTED) {
					{
						accurrents[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < squarewaves.length; i++) {
				if (squarewaves[i].MULTI_SELECTED) {
					{
						squarewaves[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < sawwaves.length; i++) {
				if (sawwaves[i].MULTI_SELECTED) {
					{
						sawwaves[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < trianglewaves.length; i++) {
				if (trianglewaves[i].MULTI_SELECTED) {
					{
						trianglewaves[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < constants.length; i++) {
				if (constants[i].MULTI_SELECTED) {
					{
						constants[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < wires.length; i++) {
				if (wires[i].MULTI_SELECTED) {
					{
						wires[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < nets.length; i++) {
				if (nets[i].MULTI_SELECTED) {
					{
						nets[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < notes.length; i++) {
				if (notes[i].MULTI_SELECTED) {
					{
						notes[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < rails.length; i++) {
				if (rails[i].MULTI_SELECTED) {
					{
						rails[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < voltmeters.length; i++) {
				if (voltmeters[i].MULTI_SELECTED) {
					{
						voltmeters[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < ohmmeters.length; i++) {
				if (ohmmeters[i].MULTI_SELECTED) {
					{
						ohmmeters[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < ammeters.length; i++) {
				if (ammeters[i].MULTI_SELECTED) {
					{
						ammeters[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < wattmeters.length; i++) {
				if (wattmeters[i].MULTI_SELECTED) {
					{
						wattmeters[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < fuses.length; i++) {
				if (fuses[i].MULTI_SELECTED) {
					{
						fuses[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < spsts.length; i++) {
				if (spsts[i].MULTI_SELECTED) {
					{
						spsts[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < spdts.length; i++) {
				if (spdts[i].MULTI_SELECTED) {
					{
						spdts[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < nots.length; i++) {
				if (nots[i].MULTI_SELECTED) {
					{
						nots[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < diodes.length; i++) {
				if (diodes[i].MULTI_SELECTED) {
					{
						diodes[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < leds.length; i++) {
				if (leds[i].MULTI_SELECTED) {
					{
						leds[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < zeners.length; i++) {
				if (zeners[i].MULTI_SELECTED) {
					{
						zeners[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < potentiometers.length; i++) {
				if (potentiometers[i].MULTI_SELECTED) {
					{
						potentiometers[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < ands.length; i++) {
				if (ands[i].MULTI_SELECTED) {
					{
						ands[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < ors.length; i++) {
				if (ors[i].MULTI_SELECTED) {
					{
						ors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < nands.length; i++) {
				if (nands[i].MULTI_SELECTED) {
					{
						nands[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < nors.length; i++) {
				if (nors[i].MULTI_SELECTED) {
					{
						nors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < xors.length; i++) {
				if (xors[i].MULTI_SELECTED) {
					{
						xors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < xnors.length; i++) {
				if (xnors[i].MULTI_SELECTED) {
					{
						xnors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < dffs.length; i++) {
				if (dffs[i].MULTI_SELECTED) {
					{
						dffs[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < vsats.length; i++) {
				if (vsats[i].MULTI_SELECTED) {
					{
						vsats[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < adders.length; i++) {
				if (adders[i].MULTI_SELECTED) {
					{
						adders[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < subtractors.length; i++) {
				if (subtractors[i].MULTI_SELECTED) {
					{
						subtractors[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < multipliers.length; i++) {
				if (multipliers[i].MULTI_SELECTED) {
					{
						multipliers[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < dividers.length; i++) {
				if (dividers[i].MULTI_SELECTED) {
					{
						dividers[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < gains.length; i++) {
				if (gains[i].MULTI_SELECTED) {
					{
						gains[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < absvals.length; i++) {
				if (absvals[i].MULTI_SELECTED) {
					{
						absvals[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < vcsws.length; i++) {
				if (vcsws[i].MULTI_SELECTED) {
					{
						vcsws[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < vcvss.length; i++) {
				if (vcvss[i].MULTI_SELECTED) {
					{
						vcvss[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < vccss.length; i++) {
				if (vccss[i].MULTI_SELECTED) {
					{
						vccss[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < cccss.length; i++) {
				if (cccss[i].MULTI_SELECTED) {
					{
						cccss[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < ccvss.length; i++) {
				if (ccvss[i].MULTI_SELECTED) {
					{
						ccvss[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < opamps.length; i++) {
				if (opamps[i].MULTI_SELECTED) {
					{
						opamps[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < nmosfets.length; i++) {
				if (nmosfets[i].MULTI_SELECTED) {
					{
						nmosfets[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < pmosfets.length; i++) {
				if (pmosfets[i].MULTI_SELECTED) {
					{
						pmosfets[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < npns.length; i++) {
				if (npns[i].MULTI_SELECTED) {
					{
						npns[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < pnps.length; i++) {
				if (pnps[i].MULTI_SELECTED) {
					{
						pnps[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < adcs.length; i++) {
				if (adcs[i].MULTI_SELECTED) {
					{
						adcs[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < dacs.length; i++) {
				if (dacs[i].MULTI_SELECTED) {
					{
						dacs[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < sandhs.length; i++) {
				if (sandhs[i].MULTI_SELECTED) {
					{
						sandhs[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < pwms.length; i++) {
				if (pwms[i].MULTI_SELECTED) {
					{
						pwms[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < integrators.length; i++) {
				if (integrators[i].MULTI_SELECTED) {
					{
						integrators[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < differentiators.length; i++) {
				if (differentiators[i].MULTI_SELECTED) {
					{
						differentiators[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < lowpasses.length; i++) {
				if (lowpasses[i].MULTI_SELECTED) {
					{
						lowpasses[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < highpasses.length; i++) {
				if (highpasses[i].MULTI_SELECTED) {
					{
						highpasses[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < relays.length; i++) {
				if (relays[i].MULTI_SELECTED) {
					{
						relays[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < pids.length; i++) {
				if (pids[i].MULTI_SELECTED) {
					{
						pids[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < luts.length; i++) {
				if (luts[i].MULTI_SELECTED) {
					{
						luts[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < vcrs.length; i++) {
				if (vcrs[i].MULTI_SELECTED) {
					{
						vcrs[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < grts.length; i++) {
				if (grts[i].MULTI_SELECTED) {
					{
						grts[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < tptzs.length; i++) {
				if (tptzs[i].MULTI_SELECTED) {
					{
						tptzs[i].move_element(dx, dy);
					}
				}
			}

			for (var i: number = 0; i < transformers.length; i++) {
				if (transformers[i].MULTI_SELECTED) {
					{
						transformers[i].move_element(dx, dy);
					}
				}
			}

			/* <!-- END AUTOMATICALLY GENERATED !--> */
			if (!global.component_touched) {
				global.component_touched = true;
			}
		}
	}
	/* Called by all elements in update... */
	determine_enveloping_bounds(bounds: RectF): void {
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
			!global.FLAG_MENU_OPEN_DOWN
		) {
			global.multi_selected = true;
			this.SELECTED_COMPONENTS_BOUNDS.left = Math.min(this.SELECTED_COMPONENTS_BOUNDS.left, bounds.left - global.node_space_x);
			this.SELECTED_COMPONENTS_BOUNDS.top = Math.min(this.SELECTED_COMPONENTS_BOUNDS.top, bounds.top - global.node_space_y);
			this.SELECTED_COMPONENTS_BOUNDS.right = Math.max(this.SELECTED_COMPONENTS_BOUNDS.right, bounds.right + global.node_space_x);
			this.SELECTED_COMPONENTS_BOUNDS.bottom = Math.max(this.SELECTED_COMPONENTS_BOUNDS.bottom, bounds.bottom + global.node_space_y);
		}
	}
	draw_bounds(canvas: GraphicsEngine): void {
		if (this.MULTI_SELECT) {
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
				!global.FLAG_MENU_OPEN_DOWN
			) {
				canvas.draw_rect2(this.MULTI_SELECT_BOUNDS, this.fill_paint);
			}
		}
		if (global.multi_selected) {
			if (
				this.SELECTED_COMPONENTS_BOUNDS.left > this.OFFSCREEN_X >> 1 &&
				this.SELECTED_COMPONENTS_BOUNDS.top > this.OFFSCREEN_Y >> 1 &&
				this.SELECTED_COMPONENTS_BOUNDS.right > this.OFFSCREEN_X >> 1 &&
				this.SELECTED_COMPONENTS_BOUNDS.bottom > this.OFFSCREEN_Y >> 1
			) {
				this.DRAW_BOUNDS.left = this.SELECTED_COMPONENTS_BOUNDS.left;
				this.DRAW_BOUNDS.top = this.SELECTED_COMPONENTS_BOUNDS.top;
				this.DRAW_BOUNDS.right = this.SELECTED_COMPONENTS_BOUNDS.right;
				this.DRAW_BOUNDS.bottom = this.SELECTED_COMPONENTS_BOUNDS.bottom;
				canvas.draw_rect2(this.DRAW_BOUNDS, this.line_paint);
			}
		}
		if (global.DEVELOPER_MODE) {
			canvas.draw_line(this.DELTA_CENTER_X, this.DELTA_CENTER_Y, this.DELTA_END_X, this.DELTA_END_Y, this.line_paint);
		}
	}
}
