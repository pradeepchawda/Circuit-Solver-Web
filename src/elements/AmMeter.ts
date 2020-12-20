/**********************************************************************
 * Project           : Circuit Solver
 * File		        : AmMeter.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to handle the AmMeter element. It will automatically generate
 *                   the stamps necessary to simulate and it will also draw the component and
 *                   handle its movement / node dependencies.
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
class AmMeter {
	public INITIALIZED: boolean;
	public X_AXIS_LENGTH: number;
	public Y_AXIS_LENGTH: number;
	public RATIO: number;
	/* Create a new rectangle for the bounds of this component */
	public bounds: RectF;
	public trace_bounds: RectF;
	public meter_trace: Trace;
	/* Inititalize the element2 class that will hold the basic data about our component */
	public elm: Element2;
	public plus_point: PointF;
	public p1: PointF;
	public p2: PointF;
	/* Angle from p1 to p2 minus 90 degrees */
	public theta_m90: number;
	/* Angle from p1 to p2 */
	public theta: number;
	/* The center (x-coord) of the bounds */
	public c_x: number;
	/* The center (y-coord) of the bounds */
	public c_y: number;
	/* The spacing of the nodes in the x-direction, divided by 2 */
	public x_space: number;
	/* The spacing of the nodes in the y-direction, divided by 2 */
	public y_space: number;
	/* Some points we'll be extending the leads of the resistor to. */
	public connect1_x: number;
	public connect1_y: number;
	public connect2_x: number;
	public connect2_y: number;
	public grid_point: Array<number>;
	/* This paint is used for drawing the "lines" that the component is comprised of. */
	public line_paint: Paint;
	/* This paint is used for drawing the "nodes" that the component is connected to. */
	public point_paint: Paint;
	/* This paint is used for drawing the "text" that the component needs to display */
	public text_paint: Paint;
	/* Flag to denote when the component is actually moving. */
	public is_translating: boolean;
	public meter_symbol: MeterSymbols;
	public temp_color: string;
	/* A flag to detail when a meter trace will be resized. This is because the resize
event is being called continuously for the elements but it's wasteful for the
traces. */
	public RESIZE_METER_TRACE: boolean;
	public SCOPE_INDEX_CHECK: number;
	public wire_reference: Array<WIRE_REFERENCE_T>;
	/* This is to keep track of the simulation id's */
	public simulation_id: number;
	/* Used to limit the amount of travel for the bounds (so the graphics don't get clipped
or overlapped)*/
	public indexer: number;
	public m_x: number;
	public m_y: number;
	public MULTI_SELECTED: boolean;
	/* Quickly drawing the lines for the workspace without wasting time on over-head calls.  */
	public line_buffer: Array<Array<number>>;
	public circle_buffer: Array<Array<number>>;
	public BUILD_ELEMENT: boolean;
	public ANGLE: number;
	constructor(type: number, id: number, n1: number, n2: number) {
		this.INITIALIZED = false;
		this.X_AXIS_LENGTH = 600;
		this.Y_AXIS_LENGTH = 100;
		this.RATIO = 0.75;
		/* Create a new rectangle for the bounds of this component */
		this.bounds = new RectF(0, 0, 0, 0);
		this.trace_bounds = new RectF(0, 0, 0, 0);
		this.meter_trace = new Trace(this.X_AXIS_LENGTH, this.Y_AXIS_LENGTH, this.RATIO);
		this.meter_trace.set_color(global.TRACE_DEFAULT_COLOR);
		/* Inititalize the element2 class that will hold the basic data about our component */
		this.elm = new Element2(id, type, global.copy(global.PROPERTY_AMMETER));
		/* Initialize the initial nodes that the component will be occupying */
		this.elm.set_nodes(n1, n2);
		if (this.elm.consistent()) {
			/* Re-locate the bounds of the component to the center of the two points. */
			this.bounds.set_center2(
				global.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x),
				global.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y),
				global.node_space_x * 2,
				global.node_space_y * 2
			);
			this.trace_bounds.set_bounds(this.c_x - global.node_space_x, this.c_y - 2 * global.node_space_y, this.c_x + global.node_space_x, this.c_y - 1 * global.node_space_y);
			this.meter_trace.update_parameters(this.trace_bounds, this.RATIO, this.trace_bounds.get_width(), this.trace_bounds.get_height(), 0);
		}
		/* Set the rotation of this component to 0. */
		this.elm.set_rotation(global.ROTATION_0);
		/* Set the flip of the component to 0, resistors should not be flippable. */
		this.elm.set_flip(global.FLIP_0);
		/* Re-map those bad boys! */
		this.release_nodes();
		let vertices: Array<number> = this.get_vertices();
		this.elm.map_node2(vertices[0], vertices[1], vertices[2], vertices[3]);
		/* Add this components references to the nodes it's attached to currently. */
		this.capture_nodes();
		this.plus_point = new PointF(0, 0);
		this.p1 = new PointF(0, 0);
		this.p2 = new PointF(0, 0);
		if (this.elm.consistent()) {
			/* Create some points to hold the node locations, this will be used for drawing components */
			this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
			this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
		}
		/* Angle from p1 to p2 minus 90 degrees */
		this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
		/* Angle from p1 to p2 */
		this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		/* The center (x-coord) of the bounds */
		this.c_x = this.bounds.get_center_x();
		/* The center (y-coord) of the bounds */
		this.c_y = this.bounds.get_center_y();
		/* The spacing of the nodes in the x-direction, divided by 2 */
		this.x_space = global.node_space_x >> 1;
		/* The spacing of the nodes in the y-direction, divided by 2 */
		this.y_space = global.node_space_y >> 1;
		/* Some points we'll be extending the leads of the resistor to. */
		this.connect1_x = 0;
		this.connect1_y = 0;
		this.connect2_x = 0;
		this.connect2_y = 0;
		this.grid_point = [];
		/* This paint is used for drawing the "lines" that the component is comprised of. */
		this.line_paint = new Paint();
		this.line_paint.set_paint_style(this.line_paint.style.STROKE);
		this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
		this.line_paint.set_paint_join(this.line_paint.join.MITER);
		this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
		this.line_paint.set_color(global.ELEMENT_COLOR);
		this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_3_ZOOM);
		this.line_paint.set_font(global.DEFAULT_FONT);
		this.line_paint.set_alpha(255);
		this.line_paint.set_paint_align(this.line_paint.align.CENTER);
		/* This paint is used for drawing the "nodes" that the component is connected to. */
		this.point_paint = new Paint();
		this.point_paint.set_paint_style(this.point_paint.style.FILL);
		this.point_paint.set_paint_cap(this.point_paint.cap.ROUND);
		this.point_paint.set_paint_join(this.point_paint.join.MITER);
		this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
		this.point_paint.set_color(global.ELEMENT_COLOR);
		this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_3_ZOOM);
		this.point_paint.set_font(global.DEFAULT_FONT);
		this.point_paint.set_alpha(255);
		this.point_paint.set_paint_align(this.point_paint.align.CENTER);
		/* This paint is used for drawing the "text" that the component needs to display */
		this.text_paint = new Paint();
		this.text_paint.set_paint_style(this.text_paint.style.FILL);
		this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
		this.text_paint.set_paint_join(this.text_paint.join.MITER);
		this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
		this.text_paint.set_color(global.ELEMENT_COLOR);
		this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_3_ZOOM);
		this.text_paint.set_font(global.DEFAULT_FONT);
		this.text_paint.set_alpha(255);
		this.text_paint.set_paint_align(this.text_paint.align.CENTER);
		/* Flag to denote when the component is actually moving. */
		this.is_translating = false;
		this.meter_symbol = new MeterSymbols();
		this.meter_symbol.reset(this.meter_symbol.METER_CURRENT, this.meter_symbol.STYLE_0);
		this.meter_symbol.set_bounds(
			this.bounds.left + this.bounds.get_width() * 0.4,
			this.bounds.top + this.bounds.get_height() * 0.4,
			this.bounds.right - this.bounds.get_width() * 0.4,
			this.bounds.bottom - this.bounds.get_height() * 0.4
		);
		this.meter_symbol.set_color(global.ELEMENT_COLOR);
		this.temp_color = global.GENERAL_RED_COLOR;
		this.build_element();
		/* A flag to detail when a meter trace will be resized. This is because the resize
    event is being called continuously for the elements but it's wasteful for the
    traces. */
		this.RESIZE_METER_TRACE = false;
		this.SCOPE_INDEX_CHECK = -1;
		this.wire_reference = [];
		/* This is to keep track of the simulation id's */
		this.simulation_id = 0;
		/* Used to limit the amount of travel for the bounds (so the graphics don't get clipped
  or overlapped)*/
		this.indexer = 0;
		this.m_x = 0;
		this.m_y = 0;
		this.INITIALIZED = true;
		this.MULTI_SELECTED = false;
		/* Quickly drawing the lines for the workspace without wasting time on over-head calls.  */
		this.line_buffer = [];
		this.circle_buffer = [];
		this.BUILD_ELEMENT = true;
		this.ANGLE = 0;
	}
	refresh_bounds(): void {
		if (this.elm.consistent()) {
			this.p1 = new PointF(0, 0);
			this.p2 = new PointF(0, 0);
			/* Create some points to hold the node locations, this will be used for drawing components */
			this.p1.set_point(nodes[this.elm.n1].location.x, nodes[this.elm.n1].location.y);
			this.p2.set_point(nodes[this.elm.n2].location.x, nodes[this.elm.n2].location.y);
			/* Re-locate the bounds of the component to the center of the two points. */
			this.bounds.set_center2(
				global.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x),
				global.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y),
				global.node_space_x * 2,
				global.node_space_y * 2
			);
			this.trace_bounds.set_bounds(this.c_x - global.node_space_x, this.c_y - 2 * global.node_space_y, this.c_x + global.node_space_x, this.c_y - 1 * global.node_space_y);
			this.meter_trace.update_parameters(this.trace_bounds, this.RATIO, this.trace_bounds.get_width(), this.trace_bounds.get_height(), 0);
		}
	}
	push_reference(ref: WIRE_REFERENCE_T): void {
		this.wire_reference.push(ref);
	}
	stamp(): void {
		if (this.elm.consistent()) {
			engine_functions.stamp_resistor(this.elm.n1, this.elm.n2, global.settings.WIRE_RESISTANCE);
			engine_functions.stamp_voltage(this.elm.n1, this.elm.n2, this.elm.properties['Test Voltage'], simulation_manager.ELEMENT_AMMETER_OFFSET + this.simulation_id);
		}
	}
	/* Vertex handling (for rotation) */
	get_vertices(): Array<number> {
		let vertices: Array<number> = [];
		let p1: Array<number> = [];
		let p2: Array<number> = [];
		if (this.elm.rotation === global.ROTATION_0) {
			p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			vertices = Array(p1[0], p1[1], p2[0], p2[1]);
		} else if (this.elm.rotation === global.ROTATION_90) {
			p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
			p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
			vertices = Array(p1[0], p1[1], p2[0], p2[1]);
		} else if (this.elm.rotation === global.ROTATION_180) {
			p1 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			p2 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			vertices = Array(p1[0], p1[1], p2[0], p2[1]);
		} else if (this.elm.rotation === global.ROTATION_270) {
			p1 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.bottom);
			p2 = this.elm.snap_to_grid(this.bounds.get_center_x(), this.bounds.top);
			vertices = Array(p1[0], p1[1], p2[0], p2[1]);
		} else {
			p1 = this.elm.snap_to_grid(this.bounds.left, this.bounds.get_center_y());
			p2 = this.elm.snap_to_grid(this.bounds.right, this.bounds.get_center_y());
			vertices = Array(p1[0], p1[1], p2[0], p2[1]);
		}
		return vertices;
	}
	release_wires(): void {
		if (this.wire_reference.length > 0) {
			let id: number = -1;
			for (var i: number = this.wire_reference.length - 1; i > -1; i--) {
				id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
				if (id > -1 && id < wires.length) {
					wires[id].release_nodes();
					wires.splice(id, 1);
				}
			}
			this.wire_reference = [];
		}
	}
	/* Handle capture and release from nodes themselves... (references) */
	release_nodes(): void {
		if (this.elm.consistent()) {
			nodes[this.elm.n1].remove_reference(this.elm.id, this.elm.type);
			nodes[this.elm.n2].remove_reference(this.elm.id, this.elm.type);
			this.elm.set_nodes(-1, -1);
		}
	}
	/* Push the components references to the Nodes */
	capture_nodes(): void {
		let vertices: Array<number> = this.get_vertices();
		this.elm.map_node2(vertices[0], vertices[1], vertices[2], vertices[3]);
		if (this.elm.consistent() && !this.is_translating) {
			nodes[this.elm.n1].add_reference(this.elm.id, this.elm.type);
			nodes[this.elm.n2].add_reference(this.elm.id, this.elm.type);
		}
	}
	/* Handling a mouse down event. */
	mouse_down(): void {
		if (
			global.FLAG_IDLE &&
			!global.FLAG_SAVE_IMAGE &&
			!global.FLAG_SAVE_CIRCUIT &&
			!global.FLAG_ZOOM &&
			!global.FLAG_ELEMENT_OPTIONS &&
			!global.FLAG_ELEMENT_OPTIONS_EDIT &&
			!global.FLAG_SELECT_ELEMENT &&
			!global.FLAG_SELECT_TIMESTEP &&
			!global.FLAG_SELECT_SETTINGS &&
			!global.FLAG_REMOVE_ALL &&
			!global.FLAG_MENU_OPEN_DOWN
		) {
			if (!global.focused && !global.component_touched && !global.multi_selected) {
				if (this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1) && !global.component_touched) {
					this.is_translating = false;
					global.focused_id = this.elm.id;
					global.focused_type = this.elm.type;
					global.focused_bounds = global.copy(this.bounds);
					global.focused = true;
					global.component_touched = true;
				} else {
					if (this.elm.consistent() && !global.component_touched && !global.FLAG_SIMULATING) {
						if (nodes[this.elm.n1].contains_xy(global.mouse_x, global.mouse_y)) {
							this.handle_wire_builder(this.elm.n1, global.ANCHOR_POINT['p1']);
							global.component_touched = true;
						} else if (nodes[this.elm.n2].contains_xy(global.mouse_x, global.mouse_y)) {
							this.handle_wire_builder(this.elm.n2, global.ANCHOR_POINT['p2']);
							global.component_touched = true;
						}
					}
				}
			}
		}
	}
	/* This is to help build wires! */
	handle_wire_builder(n: number, anchor: number): void {
		if (global.WIRE_BUILDER['step'] === 0) {
			global.WIRE_BUILDER['n1'] = n;
			global.WIRE_BUILDER['type1'] = this.elm.type;
			global.WIRE_BUILDER['id1'] = this.elm.id;
			global.WIRE_BUILDER['anchor_point1'] = anchor;
			global.WIRE_BUILDER['linkage1']['wire'] = global.WIRE_BUILDER['step'];
			global.WIRE_BUILDER['step']++;
		} else if (global.WIRE_BUILDER['step'] === 1) {
			global.WIRE_BUILDER['n2'] = n;
			global.WIRE_BUILDER['type2'] = this.elm.type;
			global.WIRE_BUILDER['id2'] = this.elm.id;
			global.WIRE_BUILDER['anchor_point2'] = anchor;
			global.WIRE_BUILDER['linkage2']['wire'] = global.WIRE_BUILDER['step'];
			global.WIRE_BUILDER['step']++;
		}
	}
	move_element(dx: number, dy: number): void {
		wire_manager.reset_wire_builder();
		this.unanchor_wires();
		this.release_nodes();
		this.m_x = this.c_x + dx;
		this.m_y = this.c_y + dy;
		if (this.m_x < workspace.bounds.left + 2.5 * global.node_space_x) {
			this.m_x = workspace.bounds.left + 2.5 * global.node_space_x;
		} else if (this.m_x > workspace.bounds.right - 2.0 * global.node_space_x) {
			this.m_x = workspace.bounds.right - 2.0 * global.node_space_x;
		}
		if (this.m_y < workspace.bounds.top + 2.5 * global.node_space_y) {
			this.m_y = workspace.bounds.top + 2.5 * global.node_space_y;
		} else if (this.m_y > workspace.bounds.bottom - 2.0 * global.node_space_y) {
			this.m_y = workspace.bounds.bottom - 2.0 * global.node_space_y;
		}
		this.grid_point = this.elm.snap_to_grid(this.m_x, this.m_y);
		this.bounds.set_center(this.grid_point[0], this.grid_point[1]);
		this.refactor();
		this.capture_nodes();
		this.anchor_wires();
	}
	reset_trace_path(): void {
		if (global.not_null(this.meter_trace)) {
			this.meter_trace.trace_path.reset();
		}
	}
	/* Handling a mouse move event. */
	mouse_move(): void {
		if (global.FLAG_IDLE && !global.FLAG_SIMULATING) {
			/* Move the bounds of the element. Re-locates the center of the bounds. */
			if (global.focused) {
				if (global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
					/* Prevent the screen from moving, we are only handling one wire point at a time. */
					global.is_dragging = false;
					if (!this.is_translating) {
						if (!this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() >> 1, this.bounds.get_height() >> 1)) {
							this.release_nodes();
							this.bounds.anchored = false;
							this.is_translating = true;
							global.component_translating = true;
							this.select();
						}
					} else {
						this.m_x = global.mouse_x;
						this.m_y = global.mouse_y;
						if (this.m_x < workspace.bounds.left + 2.5 * global.node_space_x) {
							this.m_x = workspace.bounds.left + 2.5 * global.node_space_x;
						} else if (this.m_x > workspace.bounds.right - 2.0 * global.node_space_x) {
							this.m_x = workspace.bounds.right - 2.0 * global.node_space_x;
						}
						if (this.m_y < workspace.bounds.top + 2.5 * global.node_space_y) {
							this.m_y = workspace.bounds.top + 2.5 * global.node_space_y;
						} else if (this.m_y > workspace.bounds.bottom - 2.0 * global.node_space_y) {
							this.m_y = workspace.bounds.bottom - 2.0 * global.node_space_y;
						}
						this.grid_point = this.elm.snap_to_grid(this.m_x, this.m_y);
						wire_manager.reset_wire_builder();
						this.bounds.set_center(this.grid_point[0], this.grid_point[1]);
						this.unanchor_wires();
						this.trace_bounds.set_bounds(this.c_x - global.node_space_x, this.c_y - 2 * global.node_space_y, this.c_x + global.node_space_x, this.c_y - 1 * global.node_space_y);
						this.meter_trace.update_parameters(this.trace_bounds, this.RATIO, this.trace_bounds.get_width(), this.trace_bounds.get_height(), 0);
						this.RESIZE_METER_TRACE = true;
						this.BUILD_ELEMENT = true;
					}
				}
			}
		}
	}
	/* Handling a mouse up event. */
	mouse_up(): void {
		if (global.FLAG_IDLE) {
			if (global.focused && global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
				if (this.is_translating) {
					this.is_translating = false;
					this.capture_nodes();
					this.push_history();
					this.bounds.anchored = true;
					this.anchor_wires();
				} else {
					if (!global.selected) {
						this.select();
					} else {
						if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
							global.selected_id = global.NULL;
							global.selected_type = -1;
							global.selected_bounds = global.NULL;
							global.selected_properties = global.NULL;
							global.selected_wire_style = global.NULL;
							global.selected = false;
						} else {
							this.select();
						}
					}
				}
				global.focused_id = global.NULL;
				global.focused_type = global.NULL;
				global.focused_bounds = global.NULL;
				global.focused = false;
			}
			if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
				global.selected_bounds = global.copy(this.bounds);
			}
		}
	}
	select(): void {
		if (global.WIRE_BUILDER['step'] !== 0) {
			wire_manager.reset_wire_builder();
		}
		global.selected_id = this.elm.id;
		global.selected_type = this.elm.type;
		global.selected_bounds = global.copy(this.bounds);
		global.selected_properties = global.copy(this.elm.properties);
		global.selected_wire_style = global.NULL;
		global.selected = true;
	}
	remove_focus(): void {
		if (global.focused && global.focused_id === this.elm.id && global.focused_type === this.elm.type) {
			global.focused_id = global.NULL;
			global.focused_type = global.NULL;
			global.focused_bounds = global.NULL;
			global.focused = false;
		}
	}
	remove_selection(): void {
		if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
			global.selected_id = global.NULL;
			global.selected_type = -1;
			global.selected_bounds = global.NULL;
			global.selected_properties = global.NULL;
			global.selected_wire_style = global.NULL;
			global.selected = false;
		}
	}
	wire_reference_maintenance(): void {
		if (this.wire_reference.length > 0 && global.SIGNAL_WIRE_DELETED) {
			let id: number = -1;
			for (var i: number = this.wire_reference.length - 1; i > -1; i--) {
				id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
				if (!(id > -1 && id < wires.length)) {
					this.wire_reference.splice(i, 1);
				}
			}
		}
	}
	unanchor_wires(): void {
		if (this.wire_reference.length > 0) {
			let vertices: Array<number> = this.get_vertices();
			let id: number = -1;
			for (var i: number = this.wire_reference.length - 1; i > -1; i--) {
				id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
				if (id > -1 && id < wires.length) {
					if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p1']) {
						wires[id].release_nodes();
						if (this.wire_reference[i]['linkage'] === 0) {
							wires[id].p1.x = vertices[0];
							wires[id].p1.y = vertices[1];
						} else if (this.wire_reference[i]['linkage'] === 1) {
							wires[id].p2.y = vertices[1];
							wires[id].p2.x = vertices[0];
						}
					} else if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p2']) {
						wires[id].release_nodes();
						if (this.wire_reference[i]['linkage'] === 0) {
							wires[id].p1.x = vertices[2];
							wires[id].p1.y = vertices[3];
						} else if (this.wire_reference[i]['linkage'] === 1) {
							wires[id].p2.x = vertices[2];
							wires[id].p2.y = vertices[3];
						}
					}
				} else {
					this.wire_reference.splice(i, 1);
				}
			}
		}
	}
	anchor_wires(): void {
		if (this.wire_reference.length > 0) {
			let vertices: Array<number> = this.get_vertices();
			let id: number = -1;
			for (var i: number = this.wire_reference.length - 1; i > -1; i--) {
				id = engine_functions.get_wire(this.wire_reference[i]['wire_id']);
				if (id > -1 && id < wires.length) {
					if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p1']) {
						if (this.wire_reference[i]['linkage'] === 0) {
							wires[id].p1.x = vertices[0];
							wires[id].p1.y = vertices[1];
						} else if (this.wire_reference[i]['linkage'] === 1) {
							wires[id].p2.x = vertices[0];
							wires[id].p2.y = vertices[1];
						}
						wires[id].capture_nodes();
					} else if (this.wire_reference[i]['anchor_point'] === global.ANCHOR_POINT['p2']) {
						if (this.wire_reference[i]['linkage'] === 0) {
							wires[id].p1.x = vertices[2];
							wires[id].p1.y = vertices[3];
						} else if (this.wire_reference[i]['linkage'] === 1) {
							wires[id].p2.x = vertices[2];
							wires[id].p2.y = vertices[3];
						}
						wires[id].capture_nodes();
					}
				} else {
					this.wire_reference.splice(i, 1);
				}
			}
		}
	}
	set_flip(flip: number): void {
		this.BUILD_ELEMENT = true;
		wire_manager.reset_wire_builder();
		this.unanchor_wires();
		this.push_history();
		this.release_nodes();
		this.elm.set_flip(flip);
		this.refactor();
		this.capture_nodes();
		this.anchor_wires();
	}
	/* Sets the rotation of the component */
	set_rotation(rotation: number): void {
		this.BUILD_ELEMENT = true;
		wire_manager.reset_wire_builder();
		this.unanchor_wires();
		this.push_history();
		this.release_nodes();
		this.elm.set_rotation(rotation);
		this.refactor();
		this.capture_nodes();
		this.anchor_wires();
	}
	/* Push the changes of this object to the element observer */
	push_history(): void {
		if (this.INITIALIZED) {
			global.HISTORY_MANAGER['packet'].push(engine_functions.history_snapshot());
		}
	}
	/* Generate the SVG for the component. */
	build_element(): void {
		if (this.BUILD_ELEMENT || global.SIGNAL_BUILD_ELEMENT) {
			let cache_0: number = 1.25 * this.x_space;
			let cache_1: number = 1.25 * this.y_space;
			let cache_2: number = this.x_space;
			let cache_3: number = this.y_space;
			let w_cache: number = this.bounds.get_width() * 0.4;
			let h_cache: number = this.bounds.get_height() * 0.4;
			this.connect1_x = this.c_x - cache_2 * global.cosine(this.theta);
			this.connect1_y = this.c_y - cache_3 * global.sine(this.theta);
			this.connect2_x = this.c_x + cache_2 * global.cosine(this.theta);
			this.connect2_y = this.c_y + cache_3 * global.sine(this.theta);
			this.plus_point.x = this.c_x - cache_0 * global.cosine(this.theta) - cache_0 * global.cosine(this.theta_m90);
			this.plus_point.y = this.c_y - cache_1 * global.sine(this.theta) - cache_1 * global.sine(this.theta_m90);
			this.meter_symbol.set_bounds(this.bounds.left + w_cache, this.bounds.top + h_cache, this.bounds.right - w_cache, this.bounds.bottom - h_cache);
			this.meter_symbol.resize_symbol(this.meter_symbol.STYLE_0);
			this.BUILD_ELEMENT = false;
		}
	}
	/* General function to help with resizing, i.e., canvas dimension change, zooming*/
	resize(): void {
		if (this.BUILD_ELEMENT || global.SIGNAL_BUILD_ELEMENT || this.RESIZE_METER_TRACE) {
			if (this.bounds.anchored) {
				if (this.elm.consistent()) {
					/* Set the bounds of the element */
					this.bounds.set_center2(
						global.get_average2(nodes[this.elm.n1].location.x, nodes[this.elm.n2].location.x),
						global.get_average2(nodes[this.elm.n1].location.y, nodes[this.elm.n2].location.y),
						global.node_space_x * 2,
						global.node_space_y * 2
					);
					this.refactor();
					this.trace_bounds.set_bounds(this.c_x - global.node_space_x, this.c_y - 2 * global.node_space_y, this.c_x + global.node_space_x, this.c_y - global.node_space_y);
					this.meter_trace.update_parameters(this.trace_bounds, this.RATIO, this.trace_bounds.get_width(), this.trace_bounds.get_height(), 0);
				}
				this.unanchor_wires();
				this.anchor_wires();
				if (this.RESIZE_METER_TRACE) {
					this.meter_trace.resize_trace();
					this.RESIZE_METER_TRACE = false;
				}
			} else {
				this.refactor();
			}
			/* Resize the stroke widths and the text sizes. */
			this.line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
			this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_3_ZOOM);
			this.point_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
			this.point_paint.set_text_size(global.CANVAS_TEXT_SIZE_3_ZOOM);
			this.text_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
			this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_3_ZOOM);
		}
	}
	/* This is used to update the SVG */
	refactor(): void {
		/* Movement of the bounds is handled in mouse move */
		/* Re-factor the vector graphics */
		let vertices: Array<number> = this.get_vertices();
		this.p1.x = vertices[0];
		this.p1.y = vertices[1];
		this.p2.x = vertices[2];
		this.p2.y = vertices[3];
		this.x_space = global.node_space_x >> 1;
		this.y_space = global.node_space_y >> 1;
		this.c_x = this.bounds.get_center_x();
		this.c_y = this.bounds.get_center_y();
		this.theta_m90 = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y) - global.PI_DIV_2;
		this.theta = global.retrieve_angle_radian(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
		this.build_element();
	}
	/* General function to handle any processing required by the component */
	update(): void {}
	increment_rotation(): void {
		this.elm.rotation++;
		if (this.elm.rotation > global.ROTATION_270) {
			this.elm.rotation = global.ROTATION_0;
		}
		this.set_rotation(this.elm.rotation);
	}
	increment_flip(): void {}
	map_rotation(): number {
		if (this.elm.rotation === global.ROTATION_0 || this.elm.rotation === global.ROTATION_180) {
			return this.x_space;
		} else if (this.elm.rotation === global.ROTATION_90 || this.elm.rotation === global.ROTATION_270) {
			return this.y_space;
		}
	}
	reset_trace(): void {
		this.meter_trace.reset();
	}
	reset_meter(): void {
		this.elm.properties['Current'] = 0;
	}
	push_current(current: number): void {
		if (global.FLAG_SIMULATING && global.simulation_time >= global.time_step + global.time_step + global.time_step && simulation_manager.SOLUTIONS_READY) {
			this.elm.properties['Current'] = current;
			this.meter_trace.push(current, global.simulation_time);
		}
	}
	get_simulation_index(): number {
		return simulation_manager.NODE_SIZE + simulation_manager.ELEMENT_AMMETER_OFFSET + this.simulation_id;
	}
	recolor(): void {
		if (global.selected) {
			if (global.selected_id === this.elm.id && global.selected_type === this.elm.type) {
				this.line_paint.set_color(global.SELECTED_COLOR);
				this.point_paint.set_color(global.SELECTED_COLOR);
				this.text_paint.set_color(global.SELECTED_COLOR);
				this.meter_symbol.set_color(global.SELECTED_COLOR);
			} else {
				this.line_paint.set_color(global.ELEMENT_COLOR);
				this.point_paint.set_color(global.ELEMENT_COLOR);
				this.text_paint.set_color(global.ELEMENT_COLOR);
				this.meter_symbol.set_color(global.ELEMENT_COLOR);
			}
		} else {
			if (this.MULTI_SELECTED) {
				this.line_paint.set_color(global.MULTI_SELECTED_COLOR);
				this.point_paint.set_color(global.MULTI_SELECTED_COLOR);
				this.text_paint.set_color(global.MULTI_SELECTED_COLOR);
				this.meter_symbol.set_color(global.MULTI_SELECTED_COLOR);
			} else {
				this.line_paint.set_color(global.ELEMENT_COLOR);
				this.point_paint.set_color(global.ELEMENT_COLOR);
				this.text_paint.set_color(global.ELEMENT_COLOR);
				this.meter_symbol.set_color(global.ELEMENT_COLOR);
			}
		}
		this.SCOPE_INDEX_CHECK = scope_manager.find_entry_index(this.elm.id, this.elm.type);
		if (this.SCOPE_INDEX_CHECK > -1) {
			if (this.SCOPE_INDEX_CHECK === graph_window.SCOPE_0_INDEX) {
				this.meter_trace.set_color(global.TRACE_I_COLOR);
			} else if (this.SCOPE_INDEX_CHECK === graph_window.SCOPE_1_INDEX) {
				this.meter_trace.set_color(global.TRACE_II_COLOR);
			} else if (this.SCOPE_INDEX_CHECK === graph_window.SCOPE_2_INDEX) {
				this.meter_trace.set_color(global.TRACE_III_COLOR);
			} else {
				this.meter_trace.set_color(global.TRACE_DEFAULT_COLOR);
			}
		} else {
			this.meter_trace.set_color(global.TRACE_DEFAULT_COLOR);
		}
	}
	is_selected_element(): boolean {
		return global.selected_id === this.elm.id && global.selected_type === this.elm.type;
	}
	/* Draws the component */
	draw_component(canvas: GraphicsEngine): void {
		this.wire_reference_maintenance();
		this.recolor();
		this.resize();
		/* Help multi-select determine the maximum bounds... */
		/* Each element has a finite bounds, let's help determine a box that bounds the entire grouping of selected elements. */
		if (this.MULTI_SELECTED) {
			multi_select_manager.determine_enveloping_bounds(this.bounds);
		}
		if (
			global.PICTURE_REQUEST ||
			(this.c_x >= view_port.left - global.node_space_x &&
				this.c_x - global.node_space_x <= view_port.right &&
				this.c_y >= view_port.top + -global.node_space_y &&
				this.c_y - global.node_space_y <= view_port.bottom)
		) {
			this.temp_color = this.line_paint.get_color();
			this.line_paint.set_color(global.GENERAL_RED_COLOR);
			this.indexer = 0;
			this.circle_buffer = [];
			this.line_buffer = [];
			this.line_buffer[this.indexer++] = Array(this.plus_point.x - this.bounds.get_width() * 0.05, this.plus_point.y, this.plus_point.x + this.bounds.get_width() * 0.05, this.plus_point.y);
			this.line_buffer[this.indexer++] = Array(this.plus_point.x, this.plus_point.y + this.bounds.get_width() * 0.05, this.plus_point.x, this.plus_point.y - this.bounds.get_width() * 0.05);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			this.indexer = 0;
			this.line_paint.set_color(this.temp_color);
			canvas.draw_circle(this.c_x, this.c_y, this.map_rotation(), this.line_paint);
			this.line_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, this.connect1_x, this.connect1_y);
			this.line_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, this.connect2_x, this.connect2_y);
			canvas.draw_line_buffer(this.line_buffer, this.line_paint);
			this.indexer = 0;
			this.circle_buffer[this.indexer++] = Array(this.p1.x, this.p1.y, global.CANVAS_STROKE_WIDTH_2_ZOOM);
			this.circle_buffer[this.indexer++] = Array(this.p2.x, this.p2.y, global.CANVAS_STROKE_WIDTH_2_ZOOM);
			canvas.draw_circle_buffer(this.circle_buffer, this.point_paint);
			if (global.DEVELOPER_MODE) {
				canvas.draw_rect2(this.bounds, this.line_paint);
			}
			this.ANGLE = global.retrieve_angle(this.p2.x - this.p1.x, this.p2.y - this.p1.y);
			if ((this.ANGLE > 170 && this.ANGLE < 190) || (this.ANGLE > -10 && this.ANGLE < 10)) {
				if (global.workspace_zoom_scale > 1.085 || (!global.MOBILE_MODE && global.workspace_zoom_scale >= 0.99)) {
					if (global.FLAG_SIMULATING && global.simulation_time >= global.time_step + global.time_step + global.time_step && simulation_manager.SOLUTIONS_READY) {
						this.text_paint.set_color(global.GENERAL_GREEN_COLOR);
						canvas.draw_text(
							global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.elm.properties['Current'])).replace('{UNIT}', this.elm.properties['units']),
							this.c_x,
							this.bounds.top + this.bounds.get_height() * 0.025,
							this.text_paint
						);
						this.text_paint.set_color(global.ELEMENT_COLOR);
					}
					canvas.draw_text(
						global.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.bottom - this.bounds.get_height() * 0.025,
						this.text_paint
					);
				}
				this.meter_symbol.draw_symbol(canvas);
			} else if ((this.ANGLE > 260 && this.ANGLE < 280) || (this.ANGLE > 80 && this.ANGLE < 100)) {
				canvas.rotate(this.c_x, this.c_y, -90);
				this.meter_symbol.draw_symbol(canvas);
				if (global.workspace_zoom_scale > 1.085 || (!global.MOBILE_MODE && global.workspace_zoom_scale >= 0.99)) {
					if (global.FLAG_SIMULATING && global.simulation_time >= global.time_step + global.time_step + global.time_step && simulation_manager.SOLUTIONS_READY) {
						this.text_paint.set_color(global.GENERAL_GREEN_COLOR);
						canvas.draw_text(
							global.ELEMENT_VAL_TEMPLATE.replace('{VAL}', global.exponentiate_quickly(this.elm.properties['Current'])).replace('{UNIT}', this.elm.properties['units']),
							this.c_x,
							this.bounds.top + this.bounds.get_height() * 0.025,
							this.text_paint
						);
						this.recolor();
					}
					canvas.draw_text(
						global.ELEMENT_TAG_TEMPLATE.replace('{TAG}', this.elm.properties['tag']).replace('{ID}', <string>(<unknown>this.elm.id)),
						this.c_x,
						this.bounds.bottom - this.bounds.get_height() * 0.025,
						this.text_paint
					);
				}
				canvas.restore();
			}
			if (!global.MOBILE_MODE) {
				if (
					global.WIRE_BUILDER['step'] === 0 &&
					this.bounds.contains_xywh(global.mouse_x, global.mouse_y, this.bounds.get_width() * 1.25, this.bounds.get_height() * 1.25) &&
					!global.FLAG_MENU_OPEN_DOWN &&
					!global.FLAG_SELECT_TIMESTEP &&
					!global.FLAG_ELEMENT_OPTIONS &&
					!global.FLAG_ELEMENT_OPTIONS_EDIT &&
					!global.FLAG_ZOOM &&
					!global.FLAG_GRAPH &&
					!global.FLAG_SIMULATING &&
					!global.FLAG_SELECT_SETTINGS &&
					!global.FLAG_SELECT_ELEMENT &&
					!global.FLAG_REMOVE_ALL &&
					!global.SIGNAL_ADD_ELEMENT
				) {
					if (this.elm.consistent()) {
						let node_id_array: Array<number> = this.elm.get_nodes();
						for (var i = 0; i < node_id_array.length; i++) {
							canvas.draw_rect2(nodes[node_id_array[i]].get_bounds(), this.line_paint);
						}
					}
				}
			}
			if (this.is_translating) {
				canvas.draw_rect3(this.bounds.get_center_x(), this.bounds.get_center_y(), global.node_space_x << 2, global.node_space_y << 2, global.move_paint);
			}
		}
	}
	draw_trace(canvas: GraphicsEngine): void {
		if (global.FLAG_SIMULATING) {
			this.meter_trace.draw_trace(canvas, this.bounds.left, 0);
		}
	}
	/* Handles future proofing of elements! */
	patch(): void {
		if (this.elm.properties['Test Voltage'] !== 1e-9) {
			this.elm.properties['Test Voltage'] = 1e-9;
		}
		if (!global.not_null(this.line_buffer)) {
			/* Quickly drawing the lines for the workspace without wasting time on over-head calls.  */
			this.line_buffer = [];
		}
		if (!global.not_null(this.circle_buffer)) {
			this.circle_buffer = [];
		}
		if (!global.not_null(this.BUILD_ELEMENT)) {
			this.BUILD_ELEMENT = false;
		}
		if (!global.not_null(this.ANGLE)) {
			this.ANGLE = 0;
		}
		if (!global.not_null(this.indexer)) {
			this.indexer = 0;
		}
	}
	time_data(): TIME_DATA_TEMPLATE_T {
		/* #INSERT_GENERATE_TIME_DATA# */
		/* <!-- AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY !--> */
		let time_data: TIME_DATA_TEMPLATE_T = global.copy(global.TIME_DATA_TEMPLATE);
		let keys: Array<string> = Object.keys(this.elm.properties);
		for (var i: number = keys.length - 1; i > -1; i--) {
			if (typeof this.elm.properties[keys[i]] === 'number') {
				if (keys[i] === 'Frequency' || keys[i] === 'Resistance' || keys[i] === 'Capacitance' || keys[i] === 'Inductance') {
					time_data[keys[i]] = global.copy(this.elm.properties[keys[i]]);
				}
			}
		}

		return time_data;
		/* <!-- END AUTOMATICALLY GENERATED !--> */
	}
	reset(): void {
		this.elm.properties['Current'] = 0;
	}
}
