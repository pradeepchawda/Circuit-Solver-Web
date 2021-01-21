'use strict';
class Arc {
    constructor(x1, y1, x2, y2, amplitude) {
        this.amplitude = amplitude;
        this.arc_paint = new Paint();
        this.arc_paint.set_paint_style(this.arc_paint.style.STROKE);
        this.arc_paint.set_paint_cap(this.arc_paint.cap.ROUND);
        this.arc_paint.set_paint_join(this.arc_paint.join.MITER);
        this.arc_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2_ZOOM);
        this.arc_paint.set_color(global.ELEMENT_COLOR);
        this.arc_paint.set_text_size(global.CANVAS_TEXT_SIZE_4_ZOOM);
        this.arc_paint.set_font(global.DEFAULT_FONT);
        this.arc_paint.set_alpha(255);
        this.arc_paint.set_paint_align(this.arc_paint.align.CENTER);
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.IS_TRANSFORM_SCALED = true;
    }
    set_points(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    resize() {
        this.arc_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_1_ZOOM);
        this.arc_paint.set_text_size(global.CANVAS_TEXT_SIZE_4_ZOOM);
    }
    resize2() {
        this.arc_paint.set_stroke_width(global.CANVAS_STROKE_WIDTH_2);
        this.arc_paint.set_text_size(global.CANVAS_TEXT_SIZE_4);
    }
    set_color(color) {
        this.arc_paint.set_color(color);
    }
    draw_arc(canvas) {
        if (this.IS_TRANSFORM_SCALED) {
            this.resize();
        }
        else {
            this.resize2();
        }
        canvas.draw_arc2(this.x1, this.y1, this.x2, this.y2, -this.amplitude, this.arc_paint);
    }
}
