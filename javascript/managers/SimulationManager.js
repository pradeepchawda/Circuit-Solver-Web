'use strict';
/**********************************************************************
 * Project           : Circuit Solver
 * File		        : SimulationManager.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This class coordinates the circuit simulation (setup and termination as
 *                   well as active solving).
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
class SimulationManager {
    /* <!-- END AUTOMATICALLY GENERATED !--> */
    constructor() {
        /* The amount of unique nodes in the system. Each one will have a voltage associated with it
    after we solve the modified nodal analysis matrix. */
        this.NODE_SIZE = 0;
        /* Essentially keeps track of the independent / dependent sources in the system. */
        this.OFFSET = 0;
        /* A flag to force initialization before simulation begins. */
        this.INITIALIZED = false;
        /* A parameter to detail the maximum time we can achieve in the simulation. */
        /* This is kept here because it should be a constant (not a setting!) */
        this.SIMULATION_MAX_TIME = 1e18;
        /* Helper flags for solving a non-linear system of equations. */
        /* Checks to see if each element is satisfied w/ the simulation results. */
        this.CONTINUE_SOLVING = true;
        /* Counts how many times we solve the circuit for a single time-step */
        this.ITERATOR = 0;
        /* Make sure we have a solution before the rest of the components grab data from matrix_x */
        this.SOLUTIONS_READY = false;
        this.SIMULATION_STEP = 0;
        this.FIRST_MATRIX_BUILD = true;
        this.FIRST_ERROR_CHECK = true;
        this.FIRST_X_MATRIX_COPY = true;
        this.FIST_X_MATRIX_SOLUTION = false;
        /* Array Containing all time varying sources and their key parameters. This array will be
    used to determine the best time-step for the system. */
        this.TIME_DATA = [];
        /* #INSERT_GENERATE_ELEMENT_SIMULATION_OFFSETS# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        this.ELEMENT_DCSOURCE_OFFSET = 0;
        this.ELEMENT_ACSOURCE_OFFSET = this.ELEMENT_DCSOURCE_OFFSET + dcsources.length;
        this.ELEMENT_SQUAREWAVE_OFFSET = this.ELEMENT_ACSOURCE_OFFSET + acsources.length;
        this.ELEMENT_SAW_OFFSET = this.ELEMENT_SQUAREWAVE_OFFSET + squarewaves.length;
        this.ELEMENT_TRI_OFFSET = this.ELEMENT_SAW_OFFSET + sawwaves.length;
        this.ELEMENT_CONSTANT_OFFSET = this.ELEMENT_TRI_OFFSET + trianglewaves.length;
        this.ELEMENT_RAIL_OFFSET = this.ELEMENT_CONSTANT_OFFSET + constants.length;
        this.ELEMENT_OHMMETER_OFFSET = this.ELEMENT_RAIL_OFFSET + rails.length;
        this.ELEMENT_AMMETER_OFFSET = this.ELEMENT_OHMMETER_OFFSET + ohmmeters.length;
        this.ELEMENT_WATTMETER_OFFSET = this.ELEMENT_AMMETER_OFFSET + ammeters.length;
        this.ELEMENT_NOT_OFFSET = this.ELEMENT_WATTMETER_OFFSET + wattmeters.length;
        this.ELEMENT_AND_OFFSET = this.ELEMENT_NOT_OFFSET + nots.length;
        this.ELEMENT_OR_OFFSET = this.ELEMENT_AND_OFFSET + ands.length;
        this.ELEMENT_NAND_OFFSET = this.ELEMENT_OR_OFFSET + ors.length;
        this.ELEMENT_NOR_OFFSET = this.ELEMENT_NAND_OFFSET + nands.length;
        this.ELEMENT_XOR_OFFSET = this.ELEMENT_NOR_OFFSET + nors.length;
        this.ELEMENT_XNOR_OFFSET = this.ELEMENT_XOR_OFFSET + xors.length;
        this.ELEMENT_DFF_OFFSET = this.ELEMENT_XNOR_OFFSET + 1 * dffs.length;
        this.ELEMENT_VSAT_OFFSET = this.ELEMENT_DFF_OFFSET + dffs.length;
        this.ELEMENT_ADD_OFFSET = this.ELEMENT_VSAT_OFFSET + vsats.length;
        this.ELEMENT_SUB_OFFSET = this.ELEMENT_ADD_OFFSET + adders.length;
        this.ELEMENT_MUL_OFFSET = this.ELEMENT_SUB_OFFSET + subtractors.length;
        this.ELEMENT_DIV_OFFSET = this.ELEMENT_MUL_OFFSET + multipliers.length;
        this.ELEMENT_GAIN_OFFSET = this.ELEMENT_DIV_OFFSET + dividers.length;
        this.ELEMENT_ABS_OFFSET = this.ELEMENT_GAIN_OFFSET + gains.length;
        this.ELEMENT_VCVS_OFFSET = this.ELEMENT_ABS_OFFSET + absvals.length;
        this.ELEMENT_CCCS_OFFSET = this.ELEMENT_VCVS_OFFSET + vcvss.length;
        this.ELEMENT_CCVS_OFFSET = this.ELEMENT_CCCS_OFFSET + 1 * ccvss.length;
        this.ELEMENT_OPAMP_OFFSET = this.ELEMENT_CCVS_OFFSET + ccvss.length;
        this.ELEMENT_ADC_OFFSET = this.ELEMENT_OPAMP_OFFSET + opamps.length;
        this.ELEMENT_DAC_OFFSET = this.ELEMENT_ADC_OFFSET + adcs.length;
        this.ELEMENT_SAH_OFFSET = this.ELEMENT_DAC_OFFSET + dacs.length;
        this.ELEMENT_PWM_OFFSET = this.ELEMENT_SAH_OFFSET + sandhs.length;
        this.ELEMENT_INTEGRATOR_OFFSET = this.ELEMENT_PWM_OFFSET + pwms.length;
        this.ELEMENT_DIFFERENTIATOR_OFFSET = this.ELEMENT_INTEGRATOR_OFFSET + integrators.length;
        this.ELEMENT_LPF_OFFSET = this.ELEMENT_DIFFERENTIATOR_OFFSET + differentiators.length;
        this.ELEMENT_HPF_OFFSET = this.ELEMENT_LPF_OFFSET + lowpasses.length;
        this.ELEMENT_PID_OFFSET = this.ELEMENT_HPF_OFFSET + highpasses.length;
        this.ELEMENT_LUT_OFFSET = this.ELEMENT_PID_OFFSET + pids.length;
        this.ELEMENT_GRT_OFFSET = this.ELEMENT_LUT_OFFSET + luts.length;
        this.ELEMENT_TPTZ_OFFSET = this.ELEMENT_GRT_OFFSET + grts.length;
        this.ELEMENT_TRAN_OFFSET = this.ELEMENT_TPTZ_OFFSET + tptzs.length;
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    /* Prepare the system for another simulation! (Called once, like an init) */
    reset_simulation() {
        /* Reset the initialized flag, we haven't setup the environment yet. */
        this.INITIALIZED = false;
        /* Start the simulation back at time 0 */
        global.simulation_time = 0;
        /* Reset the flag to true for first instance. (So we can compute when we get into that phase).
    Also set the iterator back to zero! */
        this.CONTINUE_SOLVING = true;
        this.SOLUTIONS_READY = false;
        this.ITERATOR = 0;
        this.SIMULATION_STEP = 0;
        this.FIRST_MATRIX_BUILD = true;
        this.FIRST_ERROR_CHECK = true;
        this.FIRST_X_MATRIX_COPY = true;
        this.FIST_X_MATRIX_SOLUTION = false;
        linear_algebra.FIRST_LUP_SOLVE = true;
    }
    setup() {
        this.patch();
        /* Reset the singular matrix flag. */
        global.is_singular = false;
        this.FIRST_MATRIX_BUILD = true;
        /* Reset the system and get it ready for simulation! */
        this.reset_simulation();
        /* Determine the optimal time-step. */
        if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_AUTOMATIC_TIMESTEP] === global.ON) {
            global.time_step = this.determine_optimal_timestep();
            bottom_menu.resize_bottom_menu();
        }
        else {
            /* Remove all time data */
            this.TIME_DATA.splice(0, this.TIME_DATA.length);
        }
        this.reset_elements();
        /* Reset the components that are non-linear or have memory */
        this.reset_memory_devices();
        this.reset_reactive_elements();
        this.reset_non_linear_elements();
        /* Clear all values stored in the meters. */
        this.reset_meter_values();
        /* Do some house-keeping to reduce the node size (eliminate superfluous nodes) */
        node_manager.generate_unique_nodes_list();
        /* Assign simulation id's to the nodes that are unique. */
        node_manager.assign_node_simulation_ids();
        /* Assign the elements their simulation id's */
        engine_functions.assign_element_simulation_ids();
        /* Start constructing the matrix sizes based on the elements sizes. */
        this.NODE_SIZE = node_manager.active_nodes.length;
        /* #INSERT_GENERATE_SIMULATION_MATRIX_SIZE# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        this.OFFSET = dcsources.length + acsources.length + squarewaves.length + sawwaves.length + trianglewaves.length + constants.length + rails.length + ohmmeters.length + ammeters.length + wattmeters.length + nots.length + ands.length + ors.length + nands.length + nors.length + xors.length + xnors.length + 2 * dffs.length + vsats.length + adders.length + subtractors.length + multipliers.length + dividers.length + gains.length + absvals.length + vcvss.length + cccss.length + 2 * ccvss.length + opamps.length + adcs.length + dacs.length + sandhs.length + pwms.length + integrators.length + differentiators.length + lowpasses.length + highpasses.length + pids.length + luts.length + grts.length + tptzs.length + transformers.length;
        /* <!-- END AUTOMATICALLY GENERATED !--> */
        /* #INSERT_GENERATE_ELEMENT_SIMULATION_OFFSETS# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        this.ELEMENT_DCSOURCE_OFFSET = 0;
        this.ELEMENT_ACSOURCE_OFFSET = this.ELEMENT_DCSOURCE_OFFSET + dcsources.length;
        this.ELEMENT_SQUAREWAVE_OFFSET = this.ELEMENT_ACSOURCE_OFFSET + acsources.length;
        this.ELEMENT_SAW_OFFSET = this.ELEMENT_SQUAREWAVE_OFFSET + squarewaves.length;
        this.ELEMENT_TRI_OFFSET = this.ELEMENT_SAW_OFFSET + sawwaves.length;
        this.ELEMENT_CONSTANT_OFFSET = this.ELEMENT_TRI_OFFSET + trianglewaves.length;
        this.ELEMENT_RAIL_OFFSET = this.ELEMENT_CONSTANT_OFFSET + constants.length;
        this.ELEMENT_OHMMETER_OFFSET = this.ELEMENT_RAIL_OFFSET + rails.length;
        this.ELEMENT_AMMETER_OFFSET = this.ELEMENT_OHMMETER_OFFSET + ohmmeters.length;
        this.ELEMENT_WATTMETER_OFFSET = this.ELEMENT_AMMETER_OFFSET + ammeters.length;
        this.ELEMENT_NOT_OFFSET = this.ELEMENT_WATTMETER_OFFSET + wattmeters.length;
        this.ELEMENT_AND_OFFSET = this.ELEMENT_NOT_OFFSET + nots.length;
        this.ELEMENT_OR_OFFSET = this.ELEMENT_AND_OFFSET + ands.length;
        this.ELEMENT_NAND_OFFSET = this.ELEMENT_OR_OFFSET + ors.length;
        this.ELEMENT_NOR_OFFSET = this.ELEMENT_NAND_OFFSET + nands.length;
        this.ELEMENT_XOR_OFFSET = this.ELEMENT_NOR_OFFSET + nors.length;
        this.ELEMENT_XNOR_OFFSET = this.ELEMENT_XOR_OFFSET + xors.length;
        this.ELEMENT_DFF_OFFSET = this.ELEMENT_XNOR_OFFSET + 1 * dffs.length;
        this.ELEMENT_VSAT_OFFSET = this.ELEMENT_DFF_OFFSET + dffs.length;
        this.ELEMENT_ADD_OFFSET = this.ELEMENT_VSAT_OFFSET + vsats.length;
        this.ELEMENT_SUB_OFFSET = this.ELEMENT_ADD_OFFSET + adders.length;
        this.ELEMENT_MUL_OFFSET = this.ELEMENT_SUB_OFFSET + subtractors.length;
        this.ELEMENT_DIV_OFFSET = this.ELEMENT_MUL_OFFSET + multipliers.length;
        this.ELEMENT_GAIN_OFFSET = this.ELEMENT_DIV_OFFSET + dividers.length;
        this.ELEMENT_ABS_OFFSET = this.ELEMENT_GAIN_OFFSET + gains.length;
        this.ELEMENT_VCVS_OFFSET = this.ELEMENT_ABS_OFFSET + absvals.length;
        this.ELEMENT_CCCS_OFFSET = this.ELEMENT_VCVS_OFFSET + vcvss.length;
        this.ELEMENT_CCVS_OFFSET = this.ELEMENT_CCCS_OFFSET + 1 * ccvss.length;
        this.ELEMENT_OPAMP_OFFSET = this.ELEMENT_CCVS_OFFSET + ccvss.length;
        this.ELEMENT_ADC_OFFSET = this.ELEMENT_OPAMP_OFFSET + opamps.length;
        this.ELEMENT_DAC_OFFSET = this.ELEMENT_ADC_OFFSET + adcs.length;
        this.ELEMENT_SAH_OFFSET = this.ELEMENT_DAC_OFFSET + dacs.length;
        this.ELEMENT_PWM_OFFSET = this.ELEMENT_SAH_OFFSET + sandhs.length;
        this.ELEMENT_INTEGRATOR_OFFSET = this.ELEMENT_PWM_OFFSET + pwms.length;
        this.ELEMENT_DIFFERENTIATOR_OFFSET = this.ELEMENT_INTEGRATOR_OFFSET + integrators.length;
        this.ELEMENT_LPF_OFFSET = this.ELEMENT_DIFFERENTIATOR_OFFSET + differentiators.length;
        this.ELEMENT_HPF_OFFSET = this.ELEMENT_LPF_OFFSET + lowpasses.length;
        this.ELEMENT_PID_OFFSET = this.ELEMENT_HPF_OFFSET + highpasses.length;
        this.ELEMENT_LUT_OFFSET = this.ELEMENT_PID_OFFSET + pids.length;
        this.ELEMENT_GRT_OFFSET = this.ELEMENT_LUT_OFFSET + luts.length;
        this.ELEMENT_TPTZ_OFFSET = this.ELEMENT_GRT_OFFSET + grts.length;
        this.ELEMENT_TRAN_OFFSET = this.ELEMENT_TPTZ_OFFSET + tptzs.length;
        /* <!-- END AUTOMATICALLY GENERATED !--> */
        /* Let's display that we are simulating to the user! */
        toast.set_text(language_manager.START_SIMULATION[global.LANGUAGES[global.LANGUAGE_INDEX]]);
        toast.show();
        this.SOLUTIONS_READY = false;
        global.SIGNAL_BUILD_ELEMENT = true;
        /* Set the flag to indicate that we have prepared the system. */
        this.INITIALIZED = true;
    }
    determine_optimal_timestep() {
        /* Remove all time data */
        this.TIME_DATA.splice(0, this.TIME_DATA.length);
        /* #INSERT_GENERATE_PUSH_TIME_DATA# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        for (var i = 0; i < resistors.length; i++) {
            this.TIME_DATA.push(resistors[i].time_data());
        }
        for (var i = 0; i < capacitors.length; i++) {
            this.TIME_DATA.push(capacitors[i].time_data());
        }
        for (var i = 0; i < inductors.length; i++) {
            this.TIME_DATA.push(inductors[i].time_data());
        }
        for (var i = 0; i < grounds.length; i++) {
            this.TIME_DATA.push(grounds[i].time_data());
        }
        for (var i = 0; i < dcsources.length; i++) {
            this.TIME_DATA.push(dcsources[i].time_data());
        }
        for (var i = 0; i < dccurrents.length; i++) {
            this.TIME_DATA.push(dccurrents[i].time_data());
        }
        for (var i = 0; i < acsources.length; i++) {
            this.TIME_DATA.push(acsources[i].time_data());
        }
        for (var i = 0; i < accurrents.length; i++) {
            this.TIME_DATA.push(accurrents[i].time_data());
        }
        for (var i = 0; i < squarewaves.length; i++) {
            this.TIME_DATA.push(squarewaves[i].time_data());
        }
        for (var i = 0; i < sawwaves.length; i++) {
            this.TIME_DATA.push(sawwaves[i].time_data());
        }
        for (var i = 0; i < trianglewaves.length; i++) {
            this.TIME_DATA.push(trianglewaves[i].time_data());
        }
        for (var i = 0; i < constants.length; i++) {
            this.TIME_DATA.push(constants[i].time_data());
        }
        for (var i = 0; i < wires.length; i++) {
            this.TIME_DATA.push(wires[i].time_data());
        }
        for (var i = 0; i < nets.length; i++) {
            this.TIME_DATA.push(nets[i].time_data());
        }
        for (var i = 0; i < notes.length; i++) {
            this.TIME_DATA.push(notes[i].time_data());
        }
        for (var i = 0; i < rails.length; i++) {
            this.TIME_DATA.push(rails[i].time_data());
        }
        for (var i = 0; i < voltmeters.length; i++) {
            this.TIME_DATA.push(voltmeters[i].time_data());
        }
        for (var i = 0; i < ohmmeters.length; i++) {
            this.TIME_DATA.push(ohmmeters[i].time_data());
        }
        for (var i = 0; i < ammeters.length; i++) {
            this.TIME_DATA.push(ammeters[i].time_data());
        }
        for (var i = 0; i < wattmeters.length; i++) {
            this.TIME_DATA.push(wattmeters[i].time_data());
        }
        for (var i = 0; i < fuses.length; i++) {
            this.TIME_DATA.push(fuses[i].time_data());
        }
        for (var i = 0; i < spsts.length; i++) {
            this.TIME_DATA.push(spsts[i].time_data());
        }
        for (var i = 0; i < spdts.length; i++) {
            this.TIME_DATA.push(spdts[i].time_data());
        }
        for (var i = 0; i < nots.length; i++) {
            this.TIME_DATA.push(nots[i].time_data());
        }
        for (var i = 0; i < diodes.length; i++) {
            this.TIME_DATA.push(diodes[i].time_data());
        }
        for (var i = 0; i < leds.length; i++) {
            this.TIME_DATA.push(leds[i].time_data());
        }
        for (var i = 0; i < zeners.length; i++) {
            this.TIME_DATA.push(zeners[i].time_data());
        }
        for (var i = 0; i < potentiometers.length; i++) {
            this.TIME_DATA.push(potentiometers[i].time_data());
        }
        for (var i = 0; i < ands.length; i++) {
            this.TIME_DATA.push(ands[i].time_data());
        }
        for (var i = 0; i < ors.length; i++) {
            this.TIME_DATA.push(ors[i].time_data());
        }
        for (var i = 0; i < nands.length; i++) {
            this.TIME_DATA.push(nands[i].time_data());
        }
        for (var i = 0; i < nors.length; i++) {
            this.TIME_DATA.push(nors[i].time_data());
        }
        for (var i = 0; i < xors.length; i++) {
            this.TIME_DATA.push(xors[i].time_data());
        }
        for (var i = 0; i < xnors.length; i++) {
            this.TIME_DATA.push(xnors[i].time_data());
        }
        for (var i = 0; i < dffs.length; i++) {
            this.TIME_DATA.push(dffs[i].time_data());
        }
        for (var i = 0; i < vsats.length; i++) {
            this.TIME_DATA.push(vsats[i].time_data());
        }
        for (var i = 0; i < adders.length; i++) {
            this.TIME_DATA.push(adders[i].time_data());
        }
        for (var i = 0; i < subtractors.length; i++) {
            this.TIME_DATA.push(subtractors[i].time_data());
        }
        for (var i = 0; i < multipliers.length; i++) {
            this.TIME_DATA.push(multipliers[i].time_data());
        }
        for (var i = 0; i < dividers.length; i++) {
            this.TIME_DATA.push(dividers[i].time_data());
        }
        for (var i = 0; i < gains.length; i++) {
            this.TIME_DATA.push(gains[i].time_data());
        }
        for (var i = 0; i < absvals.length; i++) {
            this.TIME_DATA.push(absvals[i].time_data());
        }
        for (var i = 0; i < vcsws.length; i++) {
            this.TIME_DATA.push(vcsws[i].time_data());
        }
        for (var i = 0; i < vcvss.length; i++) {
            this.TIME_DATA.push(vcvss[i].time_data());
        }
        for (var i = 0; i < vccss.length; i++) {
            this.TIME_DATA.push(vccss[i].time_data());
        }
        for (var i = 0; i < cccss.length; i++) {
            this.TIME_DATA.push(cccss[i].time_data());
        }
        for (var i = 0; i < ccvss.length; i++) {
            this.TIME_DATA.push(ccvss[i].time_data());
        }
        for (var i = 0; i < opamps.length; i++) {
            this.TIME_DATA.push(opamps[i].time_data());
        }
        for (var i = 0; i < nmosfets.length; i++) {
            this.TIME_DATA.push(nmosfets[i].time_data());
        }
        for (var i = 0; i < pmosfets.length; i++) {
            this.TIME_DATA.push(pmosfets[i].time_data());
        }
        for (var i = 0; i < npns.length; i++) {
            this.TIME_DATA.push(npns[i].time_data());
        }
        for (var i = 0; i < pnps.length; i++) {
            this.TIME_DATA.push(pnps[i].time_data());
        }
        for (var i = 0; i < adcs.length; i++) {
            this.TIME_DATA.push(adcs[i].time_data());
        }
        for (var i = 0; i < dacs.length; i++) {
            this.TIME_DATA.push(dacs[i].time_data());
        }
        for (var i = 0; i < sandhs.length; i++) {
            this.TIME_DATA.push(sandhs[i].time_data());
        }
        for (var i = 0; i < pwms.length; i++) {
            this.TIME_DATA.push(pwms[i].time_data());
        }
        for (var i = 0; i < integrators.length; i++) {
            this.TIME_DATA.push(integrators[i].time_data());
        }
        for (var i = 0; i < differentiators.length; i++) {
            this.TIME_DATA.push(differentiators[i].time_data());
        }
        for (var i = 0; i < lowpasses.length; i++) {
            this.TIME_DATA.push(lowpasses[i].time_data());
        }
        for (var i = 0; i < highpasses.length; i++) {
            this.TIME_DATA.push(highpasses[i].time_data());
        }
        for (var i = 0; i < relays.length; i++) {
            this.TIME_DATA.push(relays[i].time_data());
        }
        for (var i = 0; i < pids.length; i++) {
            this.TIME_DATA.push(pids[i].time_data());
        }
        for (var i = 0; i < luts.length; i++) {
            this.TIME_DATA.push(luts[i].time_data());
        }
        for (var i = 0; i < vcrs.length; i++) {
            this.TIME_DATA.push(vcrs[i].time_data());
        }
        for (var i = 0; i < vccas.length; i++) {
            this.TIME_DATA.push(vccas[i].time_data());
        }
        for (var i = 0; i < vcls.length; i++) {
            this.TIME_DATA.push(vcls[i].time_data());
        }
        for (var i = 0; i < grts.length; i++) {
            this.TIME_DATA.push(grts[i].time_data());
        }
        for (var i = 0; i < tptzs.length; i++) {
            this.TIME_DATA.push(tptzs[i].time_data());
        }
        for (var i = 0; i < transformers.length; i++) {
            this.TIME_DATA.push(transformers[i].time_data());
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
        let max_frequency = global.ZERO;
        let min_frequency = Number.MAX_VALUE;
        let max_resistance = global.ZERO;
        let min_resistance = Number.MAX_VALUE;
        let max_capacitance = global.ZERO;
        let min_capacitance = Number.MAX_VALUE;
        let max_inductance = global.ZERO;
        let min_inductance = Number.MAX_VALUE;
        let parallel_resistance = global.ZERO;
        let series_resistance = global.ZERO;
        let parallel_series_updated = false;
        let min_freq_updated = false;
        let max_freq_updated = false;
        let min_res_updated = false;
        let max_res_updated = false;
        let min_cap_updated = false;
        let max_cap_updated = false;
        let min_ind_updated = false;
        let max_ind_updated = false;
        for (var i = 0; i < this.TIME_DATA.length; i++) {
            if (this.TIME_DATA[i]['Resistance'] > 0) {
                parallel_resistance += global.copy(1.0 / this.TIME_DATA[i]['Resistance']);
                series_resistance += global.copy(this.TIME_DATA[i]['Resistance']);
                if (!parallel_series_updated) {
                    parallel_series_updated = true;
                }
            }
            if (this.TIME_DATA[i]['Frequency'] < min_frequency && this.TIME_DATA[i]['Frequency'] > 0) {
                min_frequency = global.copy(this.TIME_DATA[i]['Frequency']);
                if (!min_freq_updated) {
                    min_freq_updated = true;
                }
            }
            if (this.TIME_DATA[i]['Frequency'] > max_frequency && this.TIME_DATA[i]['Frequency'] > 0) {
                max_frequency = global.copy(this.TIME_DATA[i]['Frequency']);
                if (!max_freq_updated) {
                    max_freq_updated = true;
                }
            }
            if (this.TIME_DATA[i]['Capacitance'] > max_capacitance && this.TIME_DATA[i]['Capacitance'] > 0) {
                max_capacitance = global.copy(this.TIME_DATA[i]['Capacitance']);
                if (!max_cap_updated) {
                    max_cap_updated = true;
                }
            }
            if (this.TIME_DATA[i]['Resistance'] > max_resistance && this.TIME_DATA[i]['Resistance'] > 0) {
                max_resistance = global.copy(this.TIME_DATA[i]['Resistance']);
                if (!max_res_updated) {
                    max_res_updated = true;
                }
            }
            if (this.TIME_DATA[i]['Inductance'] > max_inductance && this.TIME_DATA[i]['Inductance'] > 0) {
                max_inductance = global.copy(this.TIME_DATA[i]['Inductance']);
                if (!max_ind_updated) {
                    max_ind_updated = true;
                }
            }
            if (this.TIME_DATA[i]['Capacitance'] < min_capacitance && this.TIME_DATA[i]['Capacitance'] > 0) {
                min_capacitance = global.copy(this.TIME_DATA[i]['Capacitance']);
                if (!min_cap_updated) {
                    min_cap_updated = true;
                }
            }
            if (this.TIME_DATA[i]['Resistance'] < min_resistance && this.TIME_DATA[i]['Resistance'] > 0) {
                min_resistance = global.copy(this.TIME_DATA[i]['Resistance']);
                if (!min_res_updated) {
                    min_res_updated = true;
                }
            }
            if (this.TIME_DATA[i]['Inductance'] < min_inductance && this.TIME_DATA[i]['Inductance'] > 0) {
                min_inductance = global.copy(this.TIME_DATA[i]['Inductance']);
                if (!min_ind_updated) {
                    min_ind_updated = true;
                }
            }
        }
        parallel_resistance = 1.0 / parallel_resistance;
        if (!parallel_series_updated) {
            /* Impedance of free-space. */
            parallel_resistance = 376.73;
            series_resistance = 376.73;
        }
        if (!min_freq_updated) {
            min_frequency = global.settings.MIN_FREQUENCY;
        }
        if (!max_freq_updated) {
            max_frequency = global.settings.MIN_FREQUENCY;
        }
        if (!min_res_updated) {
            min_resistance = global.settings.R_MAX * 0.5;
        }
        if (!max_res_updated) {
            max_resistance = global.settings.R_MAX * 0.5;
        }
        if (!min_cap_updated) {
            min_capacitance = global.settings.MAX_CAPACITANCE;
        }
        if (!max_cap_updated) {
            max_capacitance = global.settings.MAX_CAPACITANCE;
        }
        if (!min_ind_updated) {
            min_inductance = global.settings.MAX_INDUCTANCE;
        }
        if (!max_ind_updated) {
            max_inductance = global.settings.MAX_INDUCTANCE;
        }
        let ts_final = 1;
        let multiplier = 0.016;
        if (parallel_series_updated) {
            let rc_parallel = Math.min(Math.max(parallel_resistance * min_capacitance * multiplier, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
            let rl_parallel = Math.min(Math.max((min_inductance / parallel_resistance) * multiplier, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
            let t_lc = Math.min(Math.max(Math.sqrt(min_capacitance * min_inductance) * multiplier, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
            let max_period = (1.0 / max_frequency) * multiplier;
            let rc_series = Math.min(Math.max(series_resistance * min_capacitance * multiplier, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
            let rl_series = Math.min(Math.max((min_inductance / series_resistance) * multiplier, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
            let min_period = (1.0 / min_frequency) * multiplier;
            let ts1 = global.min3(rc_parallel, rl_parallel, max_period);
            let ts2 = global.min3(rc_series, rl_series, min_period);
            ts_final = global.min3(ts1, ts2, t_lc);
            ts_final = Math.min(Math.max(ts_final, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
            if (!max_freq_updated && !min_freq_updated && !min_cap_updated && !max_cap_updated && !min_ind_updated && !max_ind_updated) {
                ts_final = 1;
            }
        }
        else {
            let t_lc = Math.min(Math.max(Math.sqrt(min_capacitance * min_inductance) * multiplier, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
            let max_period = (1.0 / max_frequency) * multiplier;
            let min_period = (1.0 / min_frequency) * multiplier;
            ts_final = global.min3(max_period, min_period, t_lc);
            ts_final = Math.min(Math.max(ts_final, global.settings.MIN_TIME_CONSTANT), global.settings.MAX_TIME_CONSTANT);
            if (!max_freq_updated && !min_freq_updated && !min_cap_updated && !max_cap_updated && !min_ind_updated && !max_ind_updated) {
                ts_final = 1;
            }
        }
        return ts_final;
    }
    terminate() {
        this.NODE_SIZE = 0;
        this.OFFSET = 0;
        this.INITIALIZED = false;
        this.CONTINUE_SOLVING = true;
        this.ITERATOR = 0;
        global.simulation_time = 0;
        this.SIMULATION_STEP = 0;
        this.SOLUTIONS_READY = false;
        global.is_singular = false;
        /* Let's display that we are not simulating to the user! */
        toast.set_text(language_manager.STOP_SIMULATION[global.LANGUAGES[global.LANGUAGE_INDEX]]);
        toast.show();
    }
    reset_elements() {
        /* #INSERT_GENERATE_RESET_ELEMENTS# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        for (var i = 0; i < resistors.length; i++) {
            resistors[i].reset();
        }
        for (var i = 0; i < capacitors.length; i++) {
            capacitors[i].reset();
        }
        for (var i = 0; i < inductors.length; i++) {
            inductors[i].reset();
        }
        for (var i = 0; i < grounds.length; i++) {
            grounds[i].reset();
        }
        for (var i = 0; i < dcsources.length; i++) {
            dcsources[i].reset();
        }
        for (var i = 0; i < dccurrents.length; i++) {
            dccurrents[i].reset();
        }
        for (var i = 0; i < acsources.length; i++) {
            acsources[i].reset();
        }
        for (var i = 0; i < accurrents.length; i++) {
            accurrents[i].reset();
        }
        for (var i = 0; i < squarewaves.length; i++) {
            squarewaves[i].reset();
        }
        for (var i = 0; i < sawwaves.length; i++) {
            sawwaves[i].reset();
        }
        for (var i = 0; i < trianglewaves.length; i++) {
            trianglewaves[i].reset();
        }
        for (var i = 0; i < constants.length; i++) {
            constants[i].reset();
        }
        for (var i = 0; i < wires.length; i++) {
            wires[i].reset();
        }
        for (var i = 0; i < nets.length; i++) {
            nets[i].reset();
        }
        for (var i = 0; i < notes.length; i++) {
            notes[i].reset();
        }
        for (var i = 0; i < rails.length; i++) {
            rails[i].reset();
        }
        for (var i = 0; i < voltmeters.length; i++) {
            voltmeters[i].reset();
        }
        for (var i = 0; i < ohmmeters.length; i++) {
            ohmmeters[i].reset();
        }
        for (var i = 0; i < ammeters.length; i++) {
            ammeters[i].reset();
        }
        for (var i = 0; i < wattmeters.length; i++) {
            wattmeters[i].reset();
        }
        for (var i = 0; i < fuses.length; i++) {
            fuses[i].reset();
        }
        for (var i = 0; i < spsts.length; i++) {
            spsts[i].reset();
        }
        for (var i = 0; i < spdts.length; i++) {
            spdts[i].reset();
        }
        for (var i = 0; i < nots.length; i++) {
            nots[i].reset();
        }
        for (var i = 0; i < diodes.length; i++) {
            diodes[i].reset();
        }
        for (var i = 0; i < leds.length; i++) {
            leds[i].reset();
        }
        for (var i = 0; i < zeners.length; i++) {
            zeners[i].reset();
        }
        for (var i = 0; i < potentiometers.length; i++) {
            potentiometers[i].reset();
        }
        for (var i = 0; i < ands.length; i++) {
            ands[i].reset();
        }
        for (var i = 0; i < ors.length; i++) {
            ors[i].reset();
        }
        for (var i = 0; i < nands.length; i++) {
            nands[i].reset();
        }
        for (var i = 0; i < nors.length; i++) {
            nors[i].reset();
        }
        for (var i = 0; i < xors.length; i++) {
            xors[i].reset();
        }
        for (var i = 0; i < xnors.length; i++) {
            xnors[i].reset();
        }
        for (var i = 0; i < dffs.length; i++) {
            dffs[i].reset();
        }
        for (var i = 0; i < vsats.length; i++) {
            vsats[i].reset();
        }
        for (var i = 0; i < adders.length; i++) {
            adders[i].reset();
        }
        for (var i = 0; i < subtractors.length; i++) {
            subtractors[i].reset();
        }
        for (var i = 0; i < multipliers.length; i++) {
            multipliers[i].reset();
        }
        for (var i = 0; i < dividers.length; i++) {
            dividers[i].reset();
        }
        for (var i = 0; i < gains.length; i++) {
            gains[i].reset();
        }
        for (var i = 0; i < absvals.length; i++) {
            absvals[i].reset();
        }
        for (var i = 0; i < vcsws.length; i++) {
            vcsws[i].reset();
        }
        for (var i = 0; i < vcvss.length; i++) {
            vcvss[i].reset();
        }
        for (var i = 0; i < vccss.length; i++) {
            vccss[i].reset();
        }
        for (var i = 0; i < cccss.length; i++) {
            cccss[i].reset();
        }
        for (var i = 0; i < ccvss.length; i++) {
            ccvss[i].reset();
        }
        for (var i = 0; i < opamps.length; i++) {
            opamps[i].reset();
        }
        for (var i = 0; i < nmosfets.length; i++) {
            nmosfets[i].reset();
        }
        for (var i = 0; i < pmosfets.length; i++) {
            pmosfets[i].reset();
        }
        for (var i = 0; i < npns.length; i++) {
            npns[i].reset();
        }
        for (var i = 0; i < pnps.length; i++) {
            pnps[i].reset();
        }
        for (var i = 0; i < adcs.length; i++) {
            adcs[i].reset();
        }
        for (var i = 0; i < dacs.length; i++) {
            dacs[i].reset();
        }
        for (var i = 0; i < sandhs.length; i++) {
            sandhs[i].reset();
        }
        for (var i = 0; i < pwms.length; i++) {
            pwms[i].reset();
        }
        for (var i = 0; i < integrators.length; i++) {
            integrators[i].reset();
        }
        for (var i = 0; i < differentiators.length; i++) {
            differentiators[i].reset();
        }
        for (var i = 0; i < lowpasses.length; i++) {
            lowpasses[i].reset();
        }
        for (var i = 0; i < highpasses.length; i++) {
            highpasses[i].reset();
        }
        for (var i = 0; i < relays.length; i++) {
            relays[i].reset();
        }
        for (var i = 0; i < pids.length; i++) {
            pids[i].reset();
        }
        for (var i = 0; i < luts.length; i++) {
            luts[i].reset();
        }
        for (var i = 0; i < vcrs.length; i++) {
            vcrs[i].reset();
        }
        for (var i = 0; i < vccas.length; i++) {
            vccas[i].reset();
        }
        for (var i = 0; i < vcls.length; i++) {
            vcls[i].reset();
        }
        for (var i = 0; i < grts.length; i++) {
            grts[i].reset();
        }
        for (var i = 0; i < tptzs.length; i++) {
            tptzs[i].reset();
        }
        for (var i = 0; i < transformers.length; i++) {
            transformers[i].reset();
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    reset_memory_devices() {
        /* #INSERT_GENERATE_RESET_MEMORY_ELEMENTS# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        for (var i = 0; i < fuses.length; i++) {
            fuses[i].reset_fuse();
        }
        for (var i = 0; i < dffs.length; i++) {
            dffs[i].reset_dff();
        }
        for (var i = 0; i < sandhs.length; i++) {
            sandhs[i].reset_samplers();
        }
        for (var i = 0; i < lowpasses.length; i++) {
            lowpasses[i].reset_lowpass();
        }
        for (var i = 0; i < highpasses.length; i++) {
            highpasses[i].reset_highpass();
        }
        for (var i = 0; i < pids.length; i++) {
            pids[i].reset_pid();
        }
        for (var i = 0; i < tptzs.length; i++) {
            tptzs[i].reset_tptz();
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    reset_reactive_elements() {
        /* #INSERT_GENERATE_RESET_REACTIVE_ELEMENTS_TEMPLATE# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        for (var i = 0; i < capacitors.length; i++) {
            capacitors[i].reset_capacitor();
        }
        for (var i = 0; i < inductors.length; i++) {
            inductors[i].reset_inductor();
        }
        for (var i = 0; i < relays.length; i++) {
            relays[i].reset_relay();
        }
        for (var i = 0; i < vccas.length; i++) {
            vccas[i].reset_vcca();
        }
        for (var i = 0; i < vcls.length; i++) {
            vcls[i].reset_vcl();
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    reset_non_linear_elements() {
        /* #INSERT_GENERATE_RESET_NON_LINEAR_ELEMENTS# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        for (var i = 0; i < diodes.length; i++) {
            diodes[i].reset_diode();
        }
        for (var i = 0; i < leds.length; i++) {
            leds[i].reset_led();
        }
        for (var i = 0; i < zeners.length; i++) {
            zeners[i].reset_zener();
        }
        for (var i = 0; i < nmosfets.length; i++) {
            nmosfets[i].reset_nmosfet();
        }
        for (var i = 0; i < pmosfets.length; i++) {
            pmosfets[i].reset_pmosfet();
        }
        for (var i = 0; i < npns.length; i++) {
            npns[i].reset_npn();
        }
        for (var i = 0; i < pnps.length; i++) {
            pnps[i].reset_pnp();
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    reset_meter_values() {
        graph_window.reset();
        /* #INSERT_GENERATE_RESET_METER_TRACE# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        for (var i = 0; i < voltmeters.length; i++) {
            voltmeters[i].reset_trace();
        }
        for (var i = 0; i < ohmmeters.length; i++) {
            ohmmeters[i].reset_trace();
        }
        for (var i = 0; i < ammeters.length; i++) {
            ammeters[i].reset_trace();
        }
        for (var i = 0; i < wattmeters.length; i++) {
            wattmeters[i].reset_trace();
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    /* Clear the immediate value used for i,v,r calculation */
    clear_meter_values() {
        /* #INSERT_GENERATE_RESET_METER# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        for (var i = 0; i < voltmeters.length; i++) {
            voltmeters[i].reset_meter();
        }
        for (var i = 0; i < ohmmeters.length; i++) {
            ohmmeters[i].reset_meter();
        }
        for (var i = 0; i < ammeters.length; i++) {
            ammeters[i].reset_meter();
        }
        for (var i = 0; i < wattmeters.length; i++) {
            wattmeters[i].reset_meter();
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    update_vir() {
        if (global.simulation_time >= global.time_step + global.time_step) {
            scope_manager.update_scopes();
        }
        else {
            this.clear_meter_values();
        }
    }
    /* Check to see if the LED's should be on! */
    led_check() {
        for (var i = 0; i < leds.length; i++) {
            leds[i].turn_on_check();
        }
    }
    /* Alternate convergence algorithm */
    convergence_check() {
        /* Run the other convergence algorithm */
        if (this.NODE_SIZE > 0 && matrix_x.length === matrix_x_copy.length) {
            if (this.FIRST_ERROR_CHECK) {
                global.v_max_err = linear_algebra.matrix(matrix_x.length, matrix_x[0].length);
                global.i_max_err = linear_algebra.matrix(matrix_x.length, matrix_x[0].length);
                this.FIRST_ERROR_CHECK = false;
            }
            else {
                for (var i = 0; i < global.v_max_err.length; i++) {
                    for (var j = 0; j < global.v_max_err[0].length; j++) {
                        global.v_max_err[i][j] = 0;
                        global.i_max_err[i][j] = 0;
                    }
                }
            }
            global.v_locked = false;
            global.i_locked = false;
            global.v_conv = false;
            global.i_conv = false;
            for (var i = 0; i < matrix_x.length; i++) {
                if (i < this.NODE_SIZE) {
                    global.v_max_err[i][0] = Math.max(Math.max(Math.abs(matrix_x[i][0]), Math.abs(matrix_x_copy[i][0])), global.settings.VNTOL);
                }
                else {
                    global.i_max_err[i][0] = Math.max(Math.max(Math.abs(matrix_x[i][0]), Math.abs(matrix_x_copy[i][0])), global.settings.ABSTOL);
                }
            }
            for (var i = 0; i < matrix_x.length; i++) {
                if (i < this.NODE_SIZE) {
                    if (Math.abs(matrix_x[i][0] - matrix_x_copy[i][0]) < global.settings.RELTOL * global.v_max_err[i][0] + global.settings.VNTOL) {
                        if (!global.v_locked) {
                            global.v_conv = true;
                        }
                    }
                    else {
                        global.v_locked = true;
                        global.v_conv = false;
                    }
                }
                else {
                    if (Math.abs(matrix_x[i][0] - matrix_x_copy[i][0]) < global.settings.RELTOL * global.i_max_err[i][0] + global.settings.ABSTOL) {
                        if (!global.i_locked) {
                            global.i_conv = true;
                        }
                    }
                    else {
                        global.i_locked = true;
                        global.i_conv = false;
                    }
                }
            }
            /* In case there are no currents */
            if (matrix_x.length - this.NODE_SIZE <= 0) {
                global.i_conv = true;
            }
            if (!global.v_conv || !global.i_conv) {
                this.CONTINUE_SOLVING = true;
            }
        }
    }
    non_linear_update() {
        /* #INSERT_GENERATE_NON_LINEAR_CHECK# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        for (var i = 0; i < diodes.length; i++) {
            diodes[i].update();
        }
        for (var i = 0; i < leds.length; i++) {
            leds[i].update();
        }
        for (var i = 0; i < zeners.length; i++) {
            zeners[i].update();
        }
        for (var i = 0; i < nmosfets.length; i++) {
            nmosfets[i].update();
        }
        for (var i = 0; i < pmosfets.length; i++) {
            pmosfets[i].update();
        }
        for (var i = 0; i < npns.length; i++) {
            npns[i].update();
        }
        for (var i = 0; i < pnps.length; i++) {
            pnps[i].update();
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    update_reactive_elements() {
        /* #INSERT_GENERATE_UPDATE_REACTIVE_ELEMENTS_TEMPLATE_II# */
        /* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
        for (var i = 0; i < capacitors.length; i++) {
            capacitors[i].update_capacitor();
        }
        for (var i = 0; i < inductors.length; i++) {
            inductors[i].update_inductor();
        }
        for (var i = 0; i < relays.length; i++) {
            relays[i].update_relay();
        }
        for (var i = 0; i < vccas.length; i++) {
            vccas[i].update_vcca();
        }
        for (var i = 0; i < vcls.length; i++) {
            vcls[i].update_vcl();
        }
        /* <!-- END AUTOMATICALLY GENERATED !--> */
    }
    simulate() {
        if (global.FLAG_SIMULATING && this.INITIALIZED) {
            if (this.SIMULATION_STEP === 0) {
                /* Try to simulate at least two matrices per frame. */
                this.solve();
                if (this.CONTINUE_SOLVING && !global.MOBILE_MODE) {
                    this.solve();
                }
            }
            else {
                /* Update capacitors and inductors */
                this.update_reactive_elements();
                if (!this.CONTINUE_SOLVING || this.ITERATOR >= global.settings.ITL4 || global.is_singular || global.simulation_time >= this.SIMULATION_MAX_TIME) {
                    if (this.ITERATOR >= global.settings.ITL4) {
                        menu_bar.handle_simulation_flag(!global.FLAG_SIMULATING);
                        toast.set_text(language_manager.CONVERGENCE_ERROR[global.LANGUAGES[global.LANGUAGE_INDEX]]);
                        toast.show();
                    }
                    else if (global.is_singular) {
                        menu_bar.handle_simulation_flag(!global.FLAG_SIMULATING);
                        toast.set_text(language_manager.SINGULAR_MATRIX[global.LANGUAGES[global.LANGUAGE_INDEX]]);
                        toast.show();
                    }
                    else if (global.simulation_time >= this.SIMULATION_MAX_TIME) {
                        menu_bar.handle_simulation_flag(!global.FLAG_SIMULATING);
                        toast.set_text(language_manager.END_OF_TIME[global.LANGUAGES[global.LANGUAGE_INDEX]]);
                        toast.show();
                    }
                }
                global.canvas_draw_request_counter = 0;
                global.canvas_draw_request = true;
                this.CONTINUE_SOLVING = true;
                this.ITERATOR = 0;
                this.update_vir();
                this.led_check();
                global.simulation_time += global.time_step;
                this.SIMULATION_STEP = 0;
            }
        }
    }
    solve() {
        if (this.CONTINUE_SOLVING && this.ITERATOR < global.settings.ITL4) {
            this.CONTINUE_SOLVING = false;
            if (this.FIRST_MATRIX_BUILD) {
                matrix_a = linear_algebra.matrix(this.NODE_SIZE + this.OFFSET, this.NODE_SIZE + this.OFFSET);
                matrix_z = linear_algebra.matrix(this.NODE_SIZE + this.OFFSET, 1);
                this.FIRST_MATRIX_BUILD = false;
            }
            else {
                for (var i = 0; i < matrix_z.length; i++) {
                    matrix_z[i][0] = 0;
                }
                for (var i = 0; i < matrix_a.length; i++) {
                    for (var j = 0; j < matrix_a[0].length; j++) {
                        matrix_a[i][j] = 0;
                    }
                }
            }
            /* Sprinkle some resistance in the diagonal to avoid a singular matrix. */
            matrix_a = linear_algebra.set_matrix_diagonal(matrix_a, global.settings.INV_R_MAX, this.NODE_SIZE);
            /* Stamp all the elements into the matrix! */
            engine_functions.stamp_elements();
            /* Copy the x-matrix! */
            if (this.FIRST_X_MATRIX_COPY) {
                if (!this.FIST_X_MATRIX_SOLUTION) {
                    matrix_x_copy = linear_algebra.matrix(this.NODE_SIZE + this.OFFSET, 1);
                }
                else {
                    matrix_x_copy = global.copy(matrix_x);
                    this.FIRST_X_MATRIX_COPY = false;
                }
            }
            else {
                for (var i = 0; i < matrix_x.length; i++) {
                    matrix_x_copy[i][0] = matrix_x[i][0];
                }
            }
            /* Solve the matrix! */
            matrix_x = linear_algebra.lup_solve(matrix_a, matrix_z);
            for (var i = 0; i < matrix_x.length; i++) {
                if (isNaN(matrix_x[i][0])) {
                    /* Terminate the simulation */
                    this.CONTINUE_SOLVING = false;
                    this.ITERATOR = global.settings.ITL4;
                    matrix_x[i][0] = 0;
                }
            }
            if (!this.FIST_X_MATRIX_SOLUTION) {
                this.FIST_X_MATRIX_SOLUTION = true;
            }
            /* Check for a singular matrix */
            if (global.is_singular) {
                /* Make sure that the singular matrix is flag is the only one shown. */
                this.ITERATOR = 0;
                /* Terminate the simulation */
                this.CONTINUE_SOLVING = false;
                /* Fall out of the solving loop, any answer is useless at this point. */
                this.SIMULATION_STEP++;
            }
            this.SOLUTIONS_READY = true;
            /* Check non-linear elements */
            this.non_linear_update();
            /* Run the alternative convergence algorithm */
            this.convergence_check();
            /* Increment the iterator */
            this.ITERATOR++;
            if (!this.CONTINUE_SOLVING) {
                this.SIMULATION_STEP++;
            }
        }
        else {
            this.SIMULATION_STEP++;
        }
    }
    /* Handles furture proofing of system settings. */
    patch() {
        global.settings.patch();
    }
}
