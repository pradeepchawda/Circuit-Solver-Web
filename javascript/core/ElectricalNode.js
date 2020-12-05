/**********************************************************************
 * Project           : Circuit Solver
 * File		        : ElectricalNode.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : This is a general class that holds the positions of the nodes as well as
 *                   collects information about what is attached to this specific location in
 *                   the application. It will be the corner stone of reducing the amount of
 *                   unnecessary computations.
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
class ElectricalNode {
    constructor(x, y, id) {
        /* The radius of the node when it is drawn. */
        /* The location of the node */
        this.location = new PointF(0, 0);
        /* This is the paint that will be used to draw anything for debugging */
        this.node_line_paint = new Paint();
        /* This is the paint that will be used to draw anything for debugging */
        this.node_fill_paint = new Paint();
        /* This is the paint that will be used to draw anything for debugging */
        this.node_fill_paint_alt = new Paint();
        /* This is used to keep a unique tag of the node in question. */
        this.id = -1;
        /* This is used to re-map the nodes when doing simulation. */
        this.simulation_id = -1;
        /* The references attached to this node, essentially whatever is residing the the same location of this node. */
        this.references = [];
        /* Mapping the ID to a row and column. This is useful to know where the node must go upon resizing. */
        this.column = -1;
        this.row = -1;
        this.bounds = new RectF(0, 0, 0, 0);
        /* The radius of the node when it is drawn. */
        /* The location of the node */
        this.location = new PointF(x, y);
        /* This is the paint that will be used to draw anything for debugging */
        this.node_line_paint = new Paint();
        this.node_line_paint.set_paint_style(this.node_line_paint.style.STROKE);
        this.node_line_paint.set_paint_cap(this.node_line_paint.cap.ROUND);
        this.node_line_paint.set_paint_join(this.node_line_paint.join.MITER);
        this.node_line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.node_line_paint.set_color(global.GENERAL_CYAN_COLOR);
        this.node_line_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.node_line_paint.set_font(global.DEFAULT_FONT);
        this.node_line_paint.set_alpha(192);
        this.node_line_paint.set_paint_align(this.node_line_paint.align.CENTER);
        /* This is the paint that will be used to draw anything for debugging */
        this.node_fill_paint = new Paint();
        this.node_fill_paint.set_paint_style(this.node_fill_paint.style.FILL);
        this.node_fill_paint.set_paint_cap(this.node_fill_paint.cap.ROUND);
        this.node_fill_paint.set_paint_join(this.node_fill_paint.join.MITER);
        this.node_fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.node_fill_paint.set_color(global.GENERAL_CYAN_COLOR);
        this.node_fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.node_fill_paint.set_font(global.DEFAULT_FONT);
        this.node_fill_paint.set_alpha(192);
        this.node_fill_paint.set_paint_align(this.node_fill_paint.align.CENTER);
        /* This is the paint that will be used to draw anything for debugging */
        this.node_fill_paint_alt = new Paint();
        this.node_fill_paint_alt.set_paint_style(this.node_fill_paint_alt.style.FILL);
        this.node_fill_paint_alt.set_paint_cap(this.node_fill_paint_alt.cap.ROUND);
        this.node_fill_paint_alt.set_paint_join(this.node_fill_paint_alt.join.MITER);
        this.node_fill_paint_alt.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
        this.node_fill_paint_alt.set_color(global.GENERAL_GREEN_COLOR);
        this.node_fill_paint_alt.set_text_size(global.CANVAS_TEXT_SIZE_5);
        this.node_fill_paint_alt.set_font(global.DEFAULT_FONT);
        this.node_fill_paint_alt.set_alpha(192);
        this.node_fill_paint_alt.set_paint_align(this.node_fill_paint_alt.align.CENTER);
        /* This is used to keep a unique tag of the node in question. */
        this.id = id;
        /* This is used to re-map the nodes when doing simulation. */
        this.simulation_id = -1;
        /* The references attached to this node, essentially whatever is residing the the same location of this node. */
        this.references = [];
        /* Mapping the ID to a row and column. This is useful to know where the node must go upon resizing. */
        this.column = Math.floor(this.id / Math.round(global.settings.SQRT_MAXNODES));
        this.row = this.id % Math.round(global.settings.SQRT_MAXNODES);
        let node_space_x = 1.175 * (global.node_space_x >> 2);
        let node_space_y = 1.175 * (global.node_space_y >> 2);
        if (global.MOBILE_MODE) {
            node_space_x *= 1.25;
            node_space_y *= 1.25;
        }
        this.bounds = new RectF(this.location.x - node_space_x, this.location.y - node_space_y, this.location.x + node_space_x, this.location.y + node_space_y);
    }
    /* A resizing handler, it will compute the new locations of the nodes as well as handle any zooming
    the user does. */
    resize(n_x, n_y, m_n_x, m_n_y) {
        if (global.SIGNAL_BUILD_ELEMENT) {
            this.location.x = workspace.bounds.left + this.row * (workspace.bounds.get_width() * global.settings.INV_SQRT_M_1);
            this.location.y = workspace.bounds.top + this.column * (workspace.bounds.get_height() * global.settings.INV_SQRT_M_1);
            if (!global.MOBILE_MODE) {
                this.bounds.set_bounds(this.location.x - n_x, this.location.y - n_y, this.location.x + n_x, this.location.y + n_y);
            }
            else {
                this.bounds.set_bounds(this.location.x - m_n_x, this.location.y - m_n_y, this.location.x + m_n_x, this.location.y + m_n_y);
            }
            this.node_line_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
            this.node_line_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
            this.node_fill_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
            this.node_fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
            this.node_fill_paint_alt.set_stroke_width(global.CANVAS_STROKE_WIDTH_1);
            this.node_fill_paint_alt.set_text_size(global.CANVAS_TEXT_SIZE_5);
        }
    }
    /* Sets the color of the node interface paint */
    set_color(color) {
        this.node_line_paint.set_color(color);
        this.node_fill_paint.set_color(color);
        this.node_fill_paint_alt.set_color(color);
    }
    /* Gets the bounds of the node (some default padding is applied)*/
    get_bounds() {
        return this.bounds;
    }
    /* A quick check to see if the rectangle contains an x,y coordinate */
    contains_xy(x, y) {
        return this.bounds.contains_xy(x, y);
    }
    /* A quick check to see if the rectangle contains an x,y coordinate (width and height constraints) */
    contains_xywh(x, y, w, h) {
        return this.bounds.contains_xywh(x, y, w, h);
    }
    /* Gets the node's ID */
    get_id() {
        return this.id;
    }
    /* Clears the references attached to this node */
    clear_references() {
        this.references = [];
        node_manager.remove_node(this.id);
    }
    /* Add a reference list to this node. */
    add_reference_list(reference_list) {
        for (var i = 0; i < reference_list.length; i++) {
            this.add_reference(reference_list[i].id, reference_list[i].type);
        }
    }
    /* Add a reference to this node. */
    add_reference(id, type) {
        let is_found = false;
        for (var i = 0; i < this.references.length; i++) {
            if (this.references[i].id === id && this.references[i].type === type) {
                is_found = true;
                break;
            }
        }
        if (!is_found) {
            this.references.push(new NodeReference(id, type));
            if (this.references.length > 0) {
                node_manager.add_node(this.id);
            }
        }
    }
    /* Removes the reference from this node. */
    remove_reference(id, type) {
        if (this.references.length > 0) {
            for (var i = 0; i < this.references.length; i++) {
                if (this.references[i].id === id && this.references[i].type === type) {
                    this.references.splice(i, 1);
                    break;
                }
            }
            if (this.references.length === 0) {
                node_manager.remove_node(this.id);
            }
        }
    }
    /* Checks to see if the references contain an element type */
    contains_element_type(type) {
        let out = false;
        for (var i = 0; i < this.references.length; i++) {
            if (this.references[i].type === type) {
                out = true;
                break;
            }
        }
        return out;
    }
    /* Checks to see if the references contain an element type */
    draw_node_builder_helper() {
        let count = 0;
        let index = -1;
        for (var i = 0; i < this.references.length; i++) {
            if (this.references[i].type === global.TYPE_NOTE) {
                index = engine_functions.get_note(this.references[i].id);
                if (index > -1 && index < notes.length) {
                    if (notes[index].elm.properties['Show Marker'] === global.OFF) {
                        count++;
                    }
                }
            }
            else {
                count = -1;
                break;
            }
        }
        if (count === this.references.length) {
            return false;
        }
        else {
            return true;
        }
    }
    debug_info() {
        let str = '';
        let DEBUG_TEMPLATE = '({ID},{TYPE}),';
        for (var i = 0; i < this.references.length; i++) {
            str += DEBUG_TEMPLATE.replace('{ID}', this.references[i].id).replace('{TYPE}', this.references[i].type);
        }
        return str;
    }
    /* Draw the node using the graphics engine */
    draw(canvas) {
        if (this.references.length > 0) {
            if (global.DEVELOPER_MODE) {
                canvas.draw_circle(this.location.x, this.location.y, 2 * global.CANVAS_STROKE_WIDTH_3, this.node_line_paint);
                canvas.draw_text(this.debug_info(), this.location.x, this.location.y, this.node_line_paint);
            }
            else {
                if (global.WIRE_BUILDER['step'] > 0) {
                    if (global.WIRE_BUILDER['n1'] > -1 && global.WIRE_BUILDER['n1'] < global.settings.MAXNODES) {
                        if (global.WIRE_BUILDER['n1'] != this.id && this.draw_node_builder_helper()) {
                            global.node_line_buffer[global.node_line_buffer_index++] = Array(this.bounds.left, this.bounds.top, this.bounds.right, this.bounds.top);
                            global.node_line_buffer[global.node_line_buffer_index++] = Array(this.bounds.left, this.bounds.bottom, this.bounds.right, this.bounds.bottom);
                            global.node_line_buffer[global.node_line_buffer_index++] = Array(this.bounds.left, this.bounds.top, this.bounds.left, this.bounds.bottom);
                            global.node_line_buffer[global.node_line_buffer_index++] = Array(this.bounds.right, this.bounds.top, this.bounds.right, this.bounds.bottom);
                        }
                    }
                }
            }
        }
        else {
            this.simulation_id = -1;
        }
    }
}
