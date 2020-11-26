/**********************************************************************
 * Project           : Circuit Solver
 * File		        : MeterSymbols.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to draw the meter symbols without resizing
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
var MeterSymbols = /** @class */ (function () {
    function MeterSymbols() {
        this.bounds = new RectF(0, 0, 0, 0);
        this.METER_VOLTAGE = 0;
        this.METER_CURRENT = 1;
        this.METER_RESISTANCE = 2;
        this.METER_POWER = 3;
        this.STYLE_0 = 0;
        this.STYLE_1 = 1;
        this.meter_type = this.METER_VOLTAGE;
        this.meter_paint = new Paint();
        this.points = [];
        this.LINE_BUFFER = [];
        this.CIRCLE_BUFFER = [];
        this.bounds = new RectF(0, 0, 0, 0);
        this.METER_VOLTAGE = 0;
        this.METER_CURRENT = 1;
        this.METER_RESISTANCE = 2;
        this.METER_POWER = 3;
        this.STYLE_0 = 0;
        this.STYLE_1 = 1;
        this.meter_type = this.METER_VOLTAGE;
        this.meter_paint = new Paint();
        this.meter_paint.set_paint_style(this.meter_paint.style.STROKE);
        this.meter_paint.set_paint_cap(this.meter_paint.cap.ROUND);
        this.meter_paint.set_paint_join(this.meter_paint.join.MITER);
        this.meter_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
        this.meter_paint.set_color(global.ELEMENT_COLOR);
        this.meter_paint.set_text_size(global.CANVAS_TEXT_SIZE_1);
        this.meter_paint.set_font(global.DEFAULT_FONT);
        this.meter_paint.set_alpha(255);
        this.meter_paint.set_paint_align(this.meter_paint.align.CENTER);
        this.points = [];
        this.LINE_BUFFER = [];
        this.CIRCLE_BUFFER = [];
    }
    MeterSymbols.prototype.set_bounds = function (left, top, right, bottom) {
        this.bounds.left = left;
        this.bounds.top = top;
        this.bounds.right = right;
        this.bounds.bottom = bottom;
        this.edit(this.meter_type);
    };
    MeterSymbols.prototype.set_stroke_width = function (setter) {
        this.meter_paint.set_stroke_width(setter);
    };
    MeterSymbols.prototype.reset = function (setter, style) {
        this.meter_type = setter;
        if (style === this.STYLE_0) {
            this.meter_paint.set_color(global.ELEMENT_COLOR);
            this.meter_paint.set_paint_style(this.meter_paint.style.STROKE);
            this.meter_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
            this.meter_paint.set_paint_cap(this.meter_paint.cap.ROUND);
        }
        else if (style === this.STYLE_1) {
            this.meter_paint.set_color(global.GENERAL_GRAY_COLOR);
            this.meter_paint.set_paint_style(this.meter_paint.style.STROKE);
            this.meter_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
            this.meter_paint.set_paint_cap(this.meter_paint.cap.ROUND);
        }
        this.points.splice(0, this.points.length);
        this.populate();
    };
    MeterSymbols.prototype.set_color = function (color) {
        this.meter_paint.set_color(color);
    };
    MeterSymbols.prototype.populate = function () {
        var temp_width = this.bounds.get_width() >> 2;
        var temp_height = this.bounds.get_height() >> 2;
        if (this.meter_type === this.METER_CURRENT) {
            this.points.push(new PointF(this.bounds.get_center_x(), this.bounds.top));
            this.points.push(new PointF(this.bounds.get_center_x() - temp_width, this.bounds.get_center_y()));
            this.points.push(new PointF(this.bounds.left, this.bounds.bottom));
            this.points.push(new PointF(this.bounds.get_center_x() + temp_width, this.bounds.get_center_y()));
            this.points.push(new PointF(this.bounds.right, this.bounds.bottom));
        }
        else if (this.meter_type === this.METER_VOLTAGE) {
            this.points.push(new PointF(this.bounds.left, this.bounds.top));
            this.points.push(new PointF(this.bounds.get_center_x(), this.bounds.bottom));
            this.points.push(new PointF(this.bounds.right, this.bounds.top));
        }
        else if (this.meter_type === this.METER_RESISTANCE) {
            this.points.push(new PointF(this.bounds.left, this.bounds.bottom));
            this.points.push(new PointF(this.bounds.left + temp_width, this.bounds.bottom));
            this.points.push(new PointF(this.bounds.left + temp_width, this.bounds.bottom - temp_height));
            this.points.push(new PointF(this.bounds.left, this.bounds.bottom - temp_height * 1.6));
            this.points.push(new PointF(this.bounds.left, this.bounds.top + temp_height));
            this.points.push(new PointF(this.bounds.left + temp_width, this.bounds.top));
            this.points.push(new PointF(this.bounds.right - temp_width, this.bounds.top));
            this.points.push(new PointF(this.bounds.right, this.bounds.top + temp_height));
            this.points.push(new PointF(this.bounds.right, this.bounds.bottom - temp_height * 1.6));
            this.points.push(new PointF(this.bounds.right - temp_width, this.bounds.bottom - temp_height));
            this.points.push(new PointF(this.bounds.right - temp_width, this.bounds.bottom));
            this.points.push(new PointF(this.bounds.right, this.bounds.bottom));
        }
        else if (this.meter_type === this.METER_POWER) {
            this.points.push(new PointF(this.bounds.left, this.bounds.top));
            this.points.push(new PointF(this.bounds.left + this.bounds.get_width() * 0.25, this.bounds.bottom));
            this.points.push(new PointF(this.bounds.get_center_x(), this.bounds.get_center_y()));
            this.points.push(new PointF(this.bounds.left + this.bounds.get_width() * 0.75, this.bounds.bottom));
            this.points.push(new PointF(this.bounds.right, this.bounds.top));
        }
    };
    MeterSymbols.prototype.edit = function (type) {
        var temp_width = this.bounds.get_width() >> 2;
        var temp_height = this.bounds.get_height() >> 2;
        if (type === this.METER_CURRENT) {
            this.points[0].x = this.bounds.get_center_x();
            this.points[0].y = this.bounds.top;
            this.points[1].x = this.bounds.get_center_x() - temp_width;
            this.points[1].y = this.bounds.get_center_y();
            this.points[2].x = this.bounds.left;
            this.points[2].y = this.bounds.bottom;
            this.points[3].x = this.bounds.get_center_x() + temp_width;
            this.points[3].y = this.bounds.get_center_y();
            this.points[4].x = this.bounds.right;
            this.points[4].y = this.bounds.bottom;
        }
        else if (type === this.METER_VOLTAGE) {
            this.points[0].x = this.bounds.left;
            this.points[0].y = this.bounds.top;
            this.points[1].x = this.bounds.get_center_x();
            this.points[1].y = this.bounds.bottom;
            this.points[2].x = this.bounds.right;
            this.points[2].y = this.bounds.top;
        }
        else if (type === this.METER_RESISTANCE) {
            this.points[0].x = this.bounds.left;
            this.points[0].y = this.bounds.bottom;
            this.points[1].x = this.bounds.left + temp_width;
            this.points[1].y = this.bounds.bottom;
            this.points[2].x = this.bounds.left + temp_width;
            this.points[2].y = this.bounds.bottom - temp_height;
            this.points[3].x = this.bounds.left;
            this.points[3].y = this.bounds.bottom - temp_height * 1.6;
            this.points[4].x = this.bounds.left;
            this.points[4].y = this.bounds.top + temp_height;
            this.points[5].x = this.bounds.left + temp_width;
            this.points[5].y = this.bounds.top;
            this.points[6].x = this.bounds.right - temp_width;
            this.points[6].y = this.bounds.top;
            this.points[7].x = this.bounds.right;
            this.points[7].y = this.bounds.top + temp_height;
            this.points[8].x = this.bounds.right;
            this.points[8].y = this.bounds.bottom - temp_height * 1.6;
            this.points[9].x = this.bounds.right - temp_width;
            this.points[9].y = this.bounds.bottom - temp_height;
            this.points[10].x = this.bounds.right - temp_width;
            this.points[10].y = this.bounds.bottom;
            this.points[11].x = this.bounds.right;
            this.points[11].y = this.bounds.bottom;
        }
        else if (type === this.METER_POWER) {
            this.points[0].x = this.bounds.left;
            this.points[0].y = this.bounds.top;
            this.points[1].x = this.bounds.left + this.bounds.get_width() * 0.25;
            this.points[1].y = this.bounds.bottom;
            this.points[2].x = this.bounds.get_center_x();
            this.points[2].y = this.bounds.get_center_y();
            this.points[3].x = this.bounds.left + this.bounds.get_width() * 0.75;
            this.points[3].y = this.bounds.bottom;
            this.points[4].x = this.bounds.right;
            this.points[4].y = this.bounds.top;
        }
    };
    MeterSymbols.prototype.resize_symbol = function (style) {
        if (style === this.STYLE_0) {
            this.meter_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
            this.meter_paint.set_text_size(global.CANVAS_TEXT_SIZE_1);
        }
        else if (style === this.STYLE_1) {
            this.meter_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
            this.meter_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
        }
    };
    MeterSymbols.prototype.draw_symbol = function (canvas) {
        var indexer = 0;
        this.CIRCLE_BUFFER = [];
        this.LINE_BUFFER = [];
        if (this.meter_type === this.METER_CURRENT) {
            this.LINE_BUFFER[indexer++] = Array(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[0].x, this.points[0].y, this.points[3].x, this.points[3].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[3].x, this.points[3].y, this.points[4].x, this.points[4].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[1].x, this.points[1].y, this.points[3].x, this.points[3].y);
        }
        else if (this.meter_type === this.METER_VOLTAGE) {
            this.LINE_BUFFER[indexer++] = Array(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
        }
        else if (this.meter_type === this.METER_RESISTANCE) {
            this.LINE_BUFFER[indexer++] = Array(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[3].x, this.points[3].y, this.points[4].x, this.points[4].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[4].x, this.points[4].y, this.points[5].x, this.points[5].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[5].x, this.points[5].y, this.points[6].x, this.points[6].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[6].x, this.points[6].y, this.points[7].x, this.points[7].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[7].x, this.points[7].y, this.points[8].x, this.points[8].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[8].x, this.points[8].y, this.points[9].x, this.points[9].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[9].x, this.points[9].y, this.points[10].x, this.points[10].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[10].x, this.points[10].y, this.points[11].x, this.points[11].y);
        }
        else if (this.meter_type === this.METER_POWER) {
            this.LINE_BUFFER[indexer++] = Array(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);
            this.LINE_BUFFER[indexer++] = Array(this.points[3].x, this.points[3].y, this.points[4].x, this.points[4].y);
        }
        canvas.draw_line_buffer(this.LINE_BUFFER, this.meter_paint);
    };
    return MeterSymbols;
}());
