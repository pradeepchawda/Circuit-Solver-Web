/**********************************************************************
 * Project           : Circuit Solver
 * File		        : MenuBar.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : A class to handle the various "menu" buttons within the system.
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
class MenuBar {
  public MAX_ICONS = 8;
  public HEIGHT_RATIO = 0.1;
  public bounds = new RectF(view_port.left, view_port.top, view_port.right, view_port.top + view_port.view_height * this.HEIGHT_RATIO);
  public menu_icons = [];
  public REMOVE_ALL_INDEX = 0;
  public SAVE_INDEX = 1;
  public SAVE_IMG_INDEX = 2;
  public UNDO_INDEX = 3;
  public REDO_INDEX = 4;
  public GO_INDEX = 5;
  public ADD_INDEX = 6;
  public UP_DOWN_INDEX = 7;
  public ESCAPE_INTERRUPT = false;
  /* This paint is used for drawing the "lines" that the component is comprised of. */
  public line_paint = new Paint();
  /* This paint is used for drawing the "fill" that the component is comprised of. */
  public fill_paint = new Paint();
  /* This paint is used for drawing the "text" that the component needs to display */
  public line_paint_alt = new Paint();
  /* This paint is used for drawing the icons that the component is comprised of. */
  public fill_paint_alt = new Paint();
  /* This paint is used for drawing the icons that the component is comprised of. */
  public up_down_paint = new Paint();
  /* This paint is used for drawing the icons that the component is comprised of. */
  public add_paint = new Paint();
  /* This paint is used for drawing the go icon. This is on it's own because it gets recolored
during simulation. */
  public go_paint = new Paint();
  /* This paint is used for drawing the icons that the component is comprised of. */
  public hover_paint = new Paint();
  /* This paint is used for drawing the icons that the component is comprised of. */
  public undo_paint = new Paint();
  /* This paint is used for drawing the icons that the component is comprised of. */
  public redo_paint = new Paint();
  /* This paint is used for drawing the icons that the component is comprised of. */
  public remove_all_paint = new Paint();
  /* This paint is used for drawing the icons that the component is comprised of. */
  public settings_paint = new Paint();
  /* This paint is used for drawing the icons that the component is comprised of. */
  public zoom_paint = new Paint();
  /* This paint is used for drawing the icons that the component is comprised of. */
  public save_circuit_paint = new Paint();
  /* This paint is used for drawing the icons that the component is comprised of. */
  public save_image_fill_paint = new Paint();
  /* This paint is used for drawing the "text" that the component needs to display */
  public text_paint = new Paint();
  public save_ckt_path1 = new Path();
  public save_ckt_path2 = new Path();
  public go_path = new Path();
  public undo_path = new Path();
  public redo_path = new Path();
  public save_img_path = new Path();
  public settings_path = new Path();
  public graph_button = new RectF(0, 0, 0, 0);
  public settings_button = new RectF(0, 0, 0, 0);
  public sine_wave = new SineWave(0, 0, 0, 0, 1);
  public BASE_WIDTH = this.bounds.get_width() / this.MAX_ICONS;

  public element_window = new ElementWindow(
    this.bounds.left,
    this.bounds.bottom + (global.CANVAS_STROKE_WIDTH_4 >> 1),
    this.bounds.right,
    this.bounds.bottom + this.bounds.get_height() - (global.CANVAS_STROKE_WIDTH_4 >> 1)
  );
  /* Enforcing the system from cascading events. */
  public first_touch_x = 0;
  public first_touch_y = 0;
  public LINE_BUFFER = [];
  public CIRCLE_BUFFER = [];

  constructor() {
    let temp_stroke_width = 0.65 * global.CANVAS_STROKE_WIDTH_3;
    this.MAX_ICONS = 8;
    if (global.MOBILE_MODE) {
      this.HEIGHT_RATIO = 0.15;
      temp_stroke_width = 0.85 * global.CANVAS_STROKE_WIDTH_3;
    } else {
      this.HEIGHT_RATIO = 0.1;
    }
    this.bounds = new RectF(view_port.left, view_port.top, view_port.right, view_port.top + view_port.view_height * this.HEIGHT_RATIO);
    this.menu_icons = [];
    this.REMOVE_ALL_INDEX = 0;
    this.SAVE_INDEX = 1;
    this.SAVE_IMG_INDEX = 2;
    this.UNDO_INDEX = 3;
    this.REDO_INDEX = 4;
    this.GO_INDEX = 5;
    this.ADD_INDEX = 6;
    this.UP_DOWN_INDEX = 7;
    this.ESCAPE_INTERRUPT = false;
    /* This paint is used for drawing the "lines" that the component is comprised of. */
    this.line_paint = new Paint();
    this.line_paint.set_paint_style(this.line_paint.style.STROKE);
    this.line_paint.set_paint_cap(this.line_paint.cap.ROUND);
    this.line_paint.set_paint_join(this.line_paint.join.MITER);
    this.line_paint.set_stroke_width(temp_stroke_width);
    this.line_paint.set_color(global.MENU_HIGHLIGHT_COLOR);
    this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.line_paint.set_font(global.DEFAULT_FONT);
    this.line_paint.set_alpha(255);
    this.line_paint.set_paint_align(this.line_paint.align.CENTER);
    /* This paint is used for drawing the "fill" that the component is comprised of. */
    this.fill_paint = new Paint();
    this.fill_paint.set_paint_style(this.fill_paint.style.FILL);
    this.fill_paint.set_paint_cap(this.fill_paint.cap.ROUND);
    this.fill_paint.set_paint_join(this.fill_paint.join.MITER);
    this.fill_paint.set_stroke_width(temp_stroke_width);
    this.fill_paint.set_color(global.MENU_FILL_COLOR);
    this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.fill_paint.set_font(global.DEFAULT_FONT);
    this.fill_paint.set_alpha(192);
    this.fill_paint.set_paint_align(this.fill_paint.align.CENTER);
    /* This paint is used for drawing the "text" that the component needs to display */
    this.line_paint_alt = new Paint();
    this.line_paint_alt.set_paint_style(this.line_paint_alt.style.STROKE);
    this.line_paint_alt.set_paint_cap(this.line_paint_alt.cap.ROUND);
    this.line_paint_alt.set_paint_join(this.line_paint_alt.join.MITER);
    this.line_paint_alt.set_stroke_width(temp_stroke_width);
    this.line_paint_alt.set_color(global.MENU_ICON_DEFAULT_COLOR);
    this.line_paint_alt.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.line_paint_alt.set_font(global.DEFAULT_FONT);
    this.line_paint_alt.set_alpha(255);
    this.line_paint_alt.set_paint_align(this.line_paint_alt.align.CENTER);
    /* This paint is used for drawing the icons that the component is comprised of. */
    this.fill_paint_alt = new Paint();
    this.fill_paint_alt.set_paint_style(this.fill_paint_alt.style.FILL);
    this.fill_paint_alt.set_paint_cap(this.fill_paint_alt.cap.ROUND);
    this.fill_paint_alt.set_paint_join(this.fill_paint_alt.join.MITER);
    this.fill_paint_alt.set_stroke_width(temp_stroke_width);
    this.fill_paint_alt.set_color(global.MENU_HIGHLIGHT_COLOR);
    this.fill_paint_alt.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.fill_paint_alt.set_font(global.DEFAULT_FONT);
    this.fill_paint_alt.set_alpha(255);
    this.fill_paint_alt.set_paint_align(this.fill_paint_alt.align.CENTER);
    /* This paint is used for drawing the icons that the component is comprised of. */
    this.up_down_paint = new Paint();
    this.up_down_paint.set_paint_style(this.up_down_paint.style.FILL);
    this.up_down_paint.set_paint_cap(this.up_down_paint.cap.ROUND);
    this.up_down_paint.set_paint_join(this.up_down_paint.join.MITER);
    this.up_down_paint.set_stroke_width(temp_stroke_width);
    this.up_down_paint.set_color(global.GENERAL_WHITE_COLOR);
    this.up_down_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.up_down_paint.set_font(global.DEFAULT_FONT);
    this.up_down_paint.set_alpha(255);
    this.up_down_paint.set_paint_align(this.up_down_paint.align.CENTER);
    /* This paint is used for drawing the icons that the component is comprised of. */
    this.add_paint = new Paint();
    this.add_paint.set_paint_style(this.add_paint.style.FILL);
    this.add_paint.set_paint_cap(this.add_paint.cap.ROUND);
    this.add_paint.set_paint_join(this.add_paint.join.MITER);
    this.add_paint.set_stroke_width(temp_stroke_width);
    this.add_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    this.add_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.add_paint.set_font(global.DEFAULT_FONT);
    this.add_paint.set_alpha(255);
    this.add_paint.set_paint_align(this.add_paint.align.CENTER);
    /* This paint is used for drawing the go icon. This is on it's own because it gets recolored
    during simulation. */
    this.go_paint = new Paint();
    this.go_paint.set_paint_style(this.go_paint.style.FILL);
    this.go_paint.set_paint_cap(this.go_paint.cap.BUTT);
    this.go_paint.set_paint_join(this.go_paint.join.MITER);
    this.go_paint.set_stroke_width(temp_stroke_width);
    this.go_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    this.go_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.go_paint.set_font(global.DEFAULT_FONT);
    this.go_paint.set_alpha(255);
    this.go_paint.set_paint_align(this.go_paint.align.CENTER);
    /* This paint is used for drawing the icons that the component is comprised of. */
    this.hover_paint = new Paint();
    this.hover_paint.set_paint_style(this.hover_paint.style.FILL);
    this.hover_paint.set_paint_cap(this.hover_paint.cap.ROUND);
    this.hover_paint.set_paint_join(this.hover_paint.join.MITER);
    this.hover_paint.set_stroke_width(temp_stroke_width);
    this.hover_paint.set_color(global.GENERAL_CYAN_COLOR);
    this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.hover_paint.set_font(global.DEFAULT_FONT);
    this.hover_paint.set_alpha(192);
    this.hover_paint.set_paint_align(this.hover_paint.align.CENTER);
    /* This paint is used for drawing the icons that the component is comprised of. */
    this.undo_paint = new Paint();
    this.undo_paint.set_paint_style(this.undo_paint.style.FILL);
    this.undo_paint.set_paint_cap(this.undo_paint.cap.ROUND);
    this.undo_paint.set_paint_join(this.undo_paint.join.MITER);
    this.undo_paint.set_stroke_width(temp_stroke_width);
    this.undo_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    this.undo_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.undo_paint.set_font(global.DEFAULT_FONT);
    this.undo_paint.set_alpha(255);
    this.undo_paint.set_paint_align(this.undo_paint.align.CENTER);
    /* This paint is used for drawing the icons that the component is comprised of. */
    this.redo_paint = new Paint();
    this.redo_paint.set_paint_style(this.redo_paint.style.FILL);
    this.redo_paint.set_paint_cap(this.redo_paint.cap.ROUND);
    this.redo_paint.set_paint_join(this.redo_paint.join.MITER);
    this.redo_paint.set_stroke_width(temp_stroke_width);
    this.redo_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    this.redo_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.redo_paint.set_font(global.DEFAULT_FONT);
    this.redo_paint.set_alpha(255);
    this.redo_paint.set_paint_align(this.redo_paint.align.CENTER);
    /* This paint is used for drawing the icons that the component is comprised of. */
    this.remove_all_paint = new Paint();
    this.remove_all_paint.set_paint_style(this.remove_all_paint.style.STROKE);
    this.remove_all_paint.set_paint_cap(this.remove_all_paint.cap.ROUND);
    this.remove_all_paint.set_paint_join(this.remove_all_paint.join.MITER);
    this.remove_all_paint.set_stroke_width(temp_stroke_width);
    this.remove_all_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    this.remove_all_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.remove_all_paint.set_font(global.DEFAULT_FONT);
    this.remove_all_paint.set_alpha(255);
    this.remove_all_paint.set_paint_align(this.remove_all_paint.align.CENTER);
    /* This paint is used for drawing the icons that the component is comprised of. */
    this.settings_paint = new Paint();
    this.settings_paint.set_paint_style(this.settings_paint.style.FILL);
    this.settings_paint.set_paint_cap(this.settings_paint.cap.ROUND);
    this.settings_paint.set_paint_join(this.settings_paint.join.MITER);
    this.settings_paint.set_stroke_width(temp_stroke_width);
    this.settings_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    this.settings_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.settings_paint.set_font(global.DEFAULT_FONT);
    this.settings_paint.set_alpha(255);
    this.settings_paint.set_paint_align(this.settings_paint.align.CENTER);
    /* This paint is used for drawing the icons that the component is comprised of. */
    this.zoom_paint = new Paint();
    this.zoom_paint.set_paint_style(this.zoom_paint.style.STROKE);
    this.zoom_paint.set_paint_cap(this.zoom_paint.cap.ROUND);
    this.zoom_paint.set_paint_join(this.zoom_paint.join.MITER);
    this.zoom_paint.set_stroke_width(temp_stroke_width);
    this.zoom_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    this.zoom_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.zoom_paint.set_font(global.DEFAULT_FONT);
    this.zoom_paint.set_alpha(255);
    this.zoom_paint.set_paint_align(this.zoom_paint.align.CENTER);
    /* This paint is used for drawing the icons that the component is comprised of. */
    this.save_circuit_paint = new Paint();
    this.save_circuit_paint.set_paint_style(this.save_circuit_paint.style.FILL);
    this.save_circuit_paint.set_paint_cap(this.save_circuit_paint.cap.ROUND);
    this.save_circuit_paint.set_paint_join(this.save_circuit_paint.join.MITER);
    this.save_circuit_paint.set_stroke_width(temp_stroke_width);
    this.save_circuit_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    this.save_circuit_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.save_circuit_paint.set_font(global.DEFAULT_FONT);
    this.save_circuit_paint.set_alpha(255);
    this.save_circuit_paint.set_paint_align(this.save_circuit_paint.align.CENTER);
    /* This paint is used for drawing the icons that the component is comprised of. */
    this.save_image_fill_paint = new Paint();
    this.save_image_fill_paint.set_paint_style(this.save_image_fill_paint.style.FILL);
    this.save_image_fill_paint.set_paint_cap(this.save_image_fill_paint.cap.ROUND);
    this.save_image_fill_paint.set_paint_join(this.save_image_fill_paint.join.MITER);
    this.save_image_fill_paint.set_stroke_width(temp_stroke_width);
    this.save_image_fill_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    this.save_image_fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.save_image_fill_paint.set_font(global.DEFAULT_FONT);
    this.save_image_fill_paint.set_alpha(255);
    this.save_image_fill_paint.set_paint_align(this.save_image_fill_paint.align.CENTER);
    /* This paint is used for drawing the "text" that the component needs to display */
    this.text_paint = new Paint();
    this.text_paint.set_paint_style(this.text_paint.style.FILL);
    this.text_paint.set_paint_cap(this.text_paint.cap.ROUND);
    this.text_paint.set_paint_join(this.text_paint.join.MITER);
    this.text_paint.set_stroke_width(temp_stroke_width);
    this.text_paint.set_color(global.GENERAL_CYAN_COLOR);
    this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.text_paint.set_font(global.DEFAULT_FONT);
    this.text_paint.set_alpha(255);
    this.text_paint.set_paint_align(this.text_paint.align.CENTER);
    this.save_ckt_path1 = new Path();
    this.save_ckt_path2 = new Path();
    this.go_path = new Path();
    this.undo_path = new Path();
    this.redo_path = new Path();
    this.save_img_path = new Path();
    this.settings_path = new Path();
    this.graph_button = new RectF(0, 0, 0, 0);
    this.settings_button = new RectF(0, 0, 0, 0);
    this.sine_wave = new SineWave(0, 0, 0, 0, 1);
    this.sine_wave.sine_wave_paint.set_color(global.GENERAL_WHITE_COLOR);
    this.sine_wave.resize(this.sine_wave.STYLE_1);
    this.BASE_WIDTH = this.bounds.get_width() / this.MAX_ICONS;
    this.load_icons();
    this.element_window = new ElementWindow(
      this.bounds.left,
      this.bounds.bottom + (global.CANVAS_STROKE_WIDTH_4 >> 1),
      this.bounds.right,
      this.bounds.bottom + this.bounds.get_height() - (global.CANVAS_STROKE_WIDTH_4 >> 1)
    );
    /* Enforcing the system from cascading events. */
    this.first_touch_x = 0;
    this.first_touch_y = 0;
    this.LINE_BUFFER = [];
    this.CIRCLE_BUFFER = [];
  }
  load_icons() {
    let temp_bounds = new RectF(0, 0, 0, 0);
    this.menu_icons.splice(0, this.menu_icons.length);
    let height = 0;
    for (var i = 0; i < this.MAX_ICONS; i++) {
      temp_bounds.left = this.bounds.left + i * ((this.bounds.right - this.bounds.left) / this.MAX_ICONS);
      temp_bounds.top = this.bounds.top + global.CANVAS_STROKE_WIDTH_4;
      temp_bounds.right = this.bounds.left + ((i + 1) * (this.bounds.right - this.bounds.left)) / this.MAX_ICONS;
      temp_bounds.bottom = this.bounds.bottom - global.CANVAS_STROKE_WIDTH_4;
      height = temp_bounds.get_height();
      temp_bounds.set_center2(temp_bounds.get_center_x(), temp_bounds.get_center_y(), height, height);
      this.menu_icons.push(new RectF(temp_bounds.left, temp_bounds.top, temp_bounds.right, temp_bounds.bottom));
    }
    this.graph_button.set_bounds(
      this.menu_icons[this.REMOVE_ALL_INDEX].left,
      this.menu_icons[this.REMOVE_ALL_INDEX].bottom + 2 * global.CANVAS_STROKE_WIDTH_4,
      this.menu_icons[this.REMOVE_ALL_INDEX].right,
      this.menu_icons[this.REMOVE_ALL_INDEX].bottom + 3 * global.CANVAS_STROKE_WIDTH_4 + this.menu_icons[this.REMOVE_ALL_INDEX].get_height() - global.CANVAS_STROKE_WIDTH_4
    );
    this.settings_button.set_bounds(
      this.menu_icons[this.REMOVE_ALL_INDEX].left,
      view_port.bottom - 2.5 * this.menu_icons[this.REMOVE_ALL_INDEX].get_height(),
      this.menu_icons[this.REMOVE_ALL_INDEX].right,
      view_port.bottom - 1.5 * this.menu_icons[this.REMOVE_ALL_INDEX].get_height()
    );
    this.sine_wave.set_points(
      this.graph_button.left + this.graph_button.get_width() * 0.235,
      this.graph_button.bottom - this.graph_button.get_height() * 0.235,
      this.graph_button.right - this.graph_button.get_width() * 0.2125,
      this.graph_button.get_center_y() - this.graph_button.get_height() * 0.2125
    );
    this.sine_wave.amplitude = this.graph_button.get_height() * 0.2125;
    this.load_svg();
  }
  load_svg() {
    let holder_x = [];
    let holder_y = [];
    let save_x1 = '0.63,0.63,0.775,0.5,0.215,0.375,0.375';
    let save_y1 = '0.1,0.4,0.4,0.7,0.4,0.4,0.1';
    let save_x2 = '0.15,0.25,0.25,0.775,0.775,0.875,0.875,0.15';
    let save_y2 = '0.7,0.7,0.8,0.8,0.7,0.7,0.9,0.9';
    let go_x = '0.1,0.1,0.9';
    let go_y = '0.1,0.9,0.5';
    let undo_x = '0.9,0.7,0.1,0.7,0.9,0.325';
    let undo_y = '0.1,0.1,0.5,0.9,0.9,0.5';
    let redo_x = '0.1,0.325,0.9,0.325,0.1,0.7';
    let redo_y = '0.1,0.1,0.5,0.9,0.9,0.5';
    let save_image_x0 = '0.10,0.3,0.4,0.6,0.7,0.90,0.90,0.10';
    let save_image_y0 = '0.2,0.2,0.1,0.1,0.2,0.2,0.9,0.9';
    let settings_x0 =
      '1.0, 1.0, 1.0, 1.0, 1.0, 0.9934920867284139, 0.9632813855876824, 0.9310958772401093, 0.898900308926026, 0.8667176144670256, 0.8517436108474309, 0.8382149592895681, 0.852235971018672, 0.8721059667877853, 0.8923988069412493, 0.9112128218015035, 0.9002679932164028, 0.8788748190563638, 0.8563378008839209, 0.8331869729639342, 0.8089273832932425, 0.7810980184003711, 0.7527282693557087, 0.727096592864541, 0.701456029523797, 0.6758199640474913, 0.6467022655609375, 0.6162105080438778, 0.6108267524881134, 0.6064186423318461, 0.6012345408380497, 0.5937985905911773, 0.5663190266840985, 0.5337711869505029, 0.5012173140854657, 0.46866813184624334, 0.4361164718241781, 0.40715407851773006, 0.40081444452698634, 0.3959175788479203, 0.3910203182499726, 0.386123283887476, 0.35585521440953016, 0.32642722098974747, 0.30049026290165176, 0.2745656373873618, 0.24863463744016676, 0.22082339397942027, 0.19361996404040838, 0.16975125656608725, 0.14631342107895762, 0.12354099329240853, 0.10205076998681761, 0.09197266896565755, 0.10988783514282356, 0.12993418603825072, 0.1499534062265108, 0.16103872576301606, 0.1475472861978536, 0.13495604110842882, 0.10275829363066198, 0.07055229887636234, 0.03835386749854782, 0.0074986897719403105, 0.0, 0.0, 0.0, 0.0, 0.0, 0.016952471807599068, 0.04913716988919248, 0.08131658617639914, 0.11350765017323283, 0.1408239520387724, 0.15269691601861268, 0.1599932238459587, 0.1406248129302791, 0.12060636364428014, 0.10013750711611162, 0.08903226256370544, 0.10783015106183787, 0.1297984685127934, 0.15260558414350575, 0.17608138039455903, 0.2011607689006875, 0.23105494181315103, 0.25708113824441625, 0.2828043325137859, 0.3085288387737819, 0.33529861717640114, 0.365136893466115, 0.386726199532859, 0.3908368767006323, 0.39549243450164795, 0.40117931509545696, 0.4144287146627903, 0.44644416899802764, 0.4789958411392945, 0.5115472525923224, 0.5440984076434461, 0.576630413842698, 0.596207310829944, 0.6011046421448706, 0.6060029944255803, 0.6108990910123092, 0.6256667744989196, 0.6558733033016323, 0.6837695463885515, 0.7097701312290715, 0.7357704596027806, 0.7617648447276224, 0.7915054404487213, 0.8159337330434937, 0.8394739046052564, 0.8625641933467705, 0.8848724365525413, 0.9054115638136864, 0.9019729116310676, 0.8822763332476219, 0.8621486475070318, 0.8423171602965643, 0.8444087134751802, 0.8568457301783686, 0.878334287847737, 0.9105133883688122, 0.9426849815110169, 0.9748611594650166, 0.9991691062847773';
    let settings_y0 =
      '0.5709618897914576, 0.5384153122919836, 0.505859321172006, 0.47330752913903024, 0.44075241134820925, 0.4098098377386729, 0.4001963887646222, 0.39532506858228683, 0.39045222581042555, 0.3855813315139282, 0.3594257568086808, 0.32982840641246486, 0.30315260713299114, 0.27735758231331903, 0.2519112429048012, 0.22559292117754617, 0.19664088318434855, 0.17212102544726804, 0.14863401075126603, 0.1257516536473607, 0.10405931403511204, 0.08790412529682119, 0.10231456093901059, 0.12237413384514184, 0.1424406616770284, 0.16250366944109373, 0.15123617431769767, 0.1398463575169444, 0.10871785341684397, 0.07646272975640993, 0.0443234287473994, 0.012686355505138636, 0.0, 0.0, 0.0, 0.0, 0.0, 0.010665021293486157, 0.04241579310837551, 0.07459519614223827, 0.10677719435732295, 0.1389577058823003, 0.15039474008760104, 0.16261712573926465, 0.1429344696014899, 0.1232611722253975, 0.10358303751369628, 0.08792247762903571, 0.10369449544426364, 0.1258378947871582, 0.1484229591054221, 0.17168211953442855, 0.19612483001158884, 0.22552327315012613, 0.25249076838372275, 0.27814571852407727, 0.30380926993287477, 0.33054587709678646, 0.36015567707363516, 0.38847301579274546, 0.3932235031255307, 0.3979752072696077, 0.4027257955056787, 0.4111492237231384, 0.4416649484304423, 0.4742220070049446, 0.5067689640616578, 0.539315819585075, 0.5718693101628863, 0.596879451846083, 0.6017560322951473, 0.606600245499673, 0.6114462121228522, 0.6220048268636068, 0.6523036956787109, 0.680874248345693, 0.7070447500639906, 0.7327125683271637, 0.7580138354872664, 0.7867269814014435, 0.8131095828333249, 0.8371201998864611, 0.8603387709202556, 0.8829021371639101, 0.9036122691662362, 0.9090234376490116, 0.8895078538612134, 0.8695630583045283, 0.8496172454797488, 0.8405519075070819, 0.8535505086183548, 0.8716506260291984, 0.9039441804246354, 0.9361639817555746, 0.9682022082464149, 0.9968005046248436, 1.0, 1.0, 1.0, 1.0, 0.9996621928488215, 0.9771555288317965, 0.944973065905136, 0.9127838937747583, 0.8806095447762535, 0.8566725435278689, 0.8445742954111969, 0.845060760013439, 0.8646527499989013, 0.8842445467312032, 0.9038318650999221, 0.9092636940379938, 0.8878549191867933, 0.8653789299617832, 0.842431723799867, 0.8187305747608965, 0.7934918651978174, 0.7633038681621352, 0.7373872098202506, 0.71179752672712, 0.6859915849636309, 0.6578633202395091, 0.6277970628968129, 0.6101277854203827, 0.6052042071985788, 0.600281777646766, 0.5953586465936951, 0.5774648025011023';
    /* Loading the first path of save circuit */
    holder_x = save_x1.split(',');
    holder_y = save_y1.split(',');
    let points = [];
    points = [];
    for (var i = 0; i < holder_x.length; i++) {
      points.push(
        new PointF(
          this.menu_icons[this.SAVE_INDEX].left + this.menu_icons[this.SAVE_INDEX].get_width() * parseFloat(holder_x[i]),
          this.menu_icons[this.SAVE_INDEX].top + this.menu_icons[this.SAVE_INDEX].get_height() * parseFloat(holder_y[i])
        )
      );
    }
    this.save_ckt_path1.reset();
    for (var i = 0; i < points.length; i++) {
      if (i === 0) {
        this.save_ckt_path1.move_to(points[i].x, points[i].y);
      } else {
        this.save_ckt_path1.line_to(points[i].x, points[i].y);
      }
    }
    this.save_ckt_path1.close();
    /* Loading the second path of save circuit */
    holder_x = save_x2.split(',');
    holder_y = save_y2.split(',');
    points = [];
    for (var i = 0; i < holder_x.length; i++) {
      points.push(
        new PointF(
          this.menu_icons[this.SAVE_INDEX].left + this.menu_icons[this.SAVE_INDEX].get_width() * parseFloat(holder_x[i]),
          this.menu_icons[this.SAVE_INDEX].top + this.menu_icons[this.SAVE_INDEX].get_height() * parseFloat(holder_y[i])
        )
      );
    }
    this.save_ckt_path2.reset();
    for (var i = 0; i < points.length; i++) {
      if (i === 0) {
        this.save_ckt_path2.move_to(points[i].x, points[i].y);
      } else {
        this.save_ckt_path2.line_to(points[i].x, points[i].y);
      }
    }
    this.save_ckt_path2.close();
    /* Loading the go path */
    holder_x = go_x.split(',');
    holder_y = go_y.split(',');
    points = [];
    for (var i = 0; i < holder_x.length; i++) {
      points.push(
        new PointF(
          this.menu_icons[this.GO_INDEX].left + this.menu_icons[this.GO_INDEX].get_width() * parseFloat(holder_x[i]),
          this.menu_icons[this.GO_INDEX].top + this.menu_icons[this.GO_INDEX].get_height() * parseFloat(holder_y[i])
        )
      );
    }
    this.go_path.reset();
    for (var i = 0; i < points.length; i++) {
      if (i === 0) {
        this.go_path.move_to(points[i].x, points[i].y);
      } else {
        this.go_path.line_to(points[i].x, points[i].y);
      }
    }
    this.go_path.close();
    /* Loading the undo path */
    holder_x = undo_x.split(',');
    holder_y = undo_y.split(',');
    points = [];
    for (var i = 0; i < holder_x.length; i++) {
      points.push(
        new PointF(
          this.menu_icons[this.UNDO_INDEX].left + this.menu_icons[this.UNDO_INDEX].get_width() * parseFloat(holder_x[i]),
          this.menu_icons[this.UNDO_INDEX].top + this.menu_icons[this.UNDO_INDEX].get_height() * parseFloat(holder_y[i])
        )
      );
    }
    this.undo_path.reset();
    for (var i = 0; i < points.length; i++) {
      if (i === 0) {
        this.undo_path.move_to(points[i].x, points[i].y);
      } else {
        this.undo_path.line_to(points[i].x, points[i].y);
      }
    }
    this.undo_path.close();
    /* Loading the redo path */
    holder_x = redo_x.split(',');
    holder_y = redo_y.split(',');
    points = [];
    for (var i = 0; i < holder_x.length; i++) {
      points.push(
        new PointF(
          this.menu_icons[this.REDO_INDEX].left + this.menu_icons[this.REDO_INDEX].get_width() * parseFloat(holder_x[i]),
          this.menu_icons[this.REDO_INDEX].top + this.menu_icons[this.REDO_INDEX].get_height() * parseFloat(holder_y[i])
        )
      );
    }
    this.redo_path.reset();
    for (var i = 0; i < points.length; i++) {
      if (i === 0) {
        this.redo_path.move_to(points[i].x, points[i].y);
      } else {
        this.redo_path.line_to(points[i].x, points[i].y);
      }
    }
    this.redo_path.close();
    /* Loading the first path of save image */
    holder_x = save_image_x0.split(',');
    holder_y = save_image_y0.split(',');
    points = [];
    for (var i = 0; i < holder_x.length; i++) {
      points.push(
        new PointF(
          this.menu_icons[this.SAVE_IMG_INDEX].left + this.menu_icons[this.SAVE_IMG_INDEX].get_width() * parseFloat(holder_x[i]),
          this.menu_icons[this.SAVE_IMG_INDEX].top + this.menu_icons[this.SAVE_IMG_INDEX].get_height() * parseFloat(holder_y[i])
        )
      );
    }
    this.save_img_path.reset();
    for (var i = 0; i < points.length; i++) {
      if (i === 0) {
        this.save_img_path.move_to(points[i].x, points[i].y);
      } else {
        this.save_img_path.line_to(points[i].x, points[i].y);
      }
    }
    this.save_img_path.close();
    /* Loading the first path of settings */
    holder_x = settings_x0.split(',');
    holder_y = settings_y0.split(',');
    points = [];
    let scale = 0.9;
    for (var i = 0; i < holder_x.length; i++) {
      points.push(
        new PointF(
          this.settings_button.left + this.settings_button.get_width() * (1 - scale) + (1 - 2 * (1 - scale)) * this.settings_button.get_width() * parseFloat(holder_x[i]),
          this.settings_button.top + this.settings_button.get_height() * (1 - scale) + (1 - 2 * (1 - scale)) * this.settings_button.get_height() * parseFloat(holder_y[i])
        )
      );
    }
    this.settings_path.reset();
    for (var i = 0; i < points.length; i++) {
      if (i === 0) {
        this.settings_path.move_to(points[i].x, points[i].y);
      } else {
        this.settings_path.line_to(points[i].x, points[i].y);
      }
    }
    this.settings_path.close();
  }
  resize_menu_bar() {
    let temp_stroke_width = 0.65 * global.CANVAS_STROKE_WIDTH_3;
    if (global.MOBILE_MODE) {
      temp_stroke_width = 0.85 * global.CANVAS_STROKE_WIDTH_3;
    }
    this.bounds.set_bounds(view_port.left, view_port.top, view_port.right, view_port.top + view_port.view_height * this.HEIGHT_RATIO);
    this.BASE_WIDTH = this.bounds.get_width() / this.MAX_ICONS;
    this.load_icons();
    /* Resize the stroke widths and the text sizes. */
    this.line_paint.set_stroke_width(temp_stroke_width);
    this.line_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.line_paint_alt.set_stroke_width(temp_stroke_width);
    this.line_paint_alt.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.fill_paint.set_stroke_width(temp_stroke_width);
    this.fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.fill_paint_alt.set_stroke_width(temp_stroke_width);
    this.fill_paint_alt.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.add_paint.set_stroke_width(temp_stroke_width);
    this.add_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.up_down_paint.set_stroke_width(temp_stroke_width);
    this.up_down_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.go_paint.set_stroke_width(temp_stroke_width);
    this.go_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.hover_paint.set_stroke_width(temp_stroke_width);
    this.hover_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.undo_paint.set_stroke_width(temp_stroke_width);
    this.undo_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.redo_paint.set_stroke_width(temp_stroke_width);
    this.redo_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.text_paint.set_stroke_width(temp_stroke_width);
    this.text_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.remove_all_paint.set_stroke_width(temp_stroke_width);
    this.remove_all_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.settings_paint.set_stroke_width(temp_stroke_width);
    this.settings_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.zoom_paint.set_stroke_width(temp_stroke_width);
    this.zoom_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.save_circuit_paint.set_stroke_width(temp_stroke_width);
    this.save_circuit_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.save_image_fill_paint.set_stroke_width(temp_stroke_width);
    this.save_image_fill_paint.set_text_size(global.CANVAS_TEXT_SIZE_5);
    this.element_window.resize_window(
      this.bounds.left,
      this.bounds.bottom + (global.CANVAS_STROKE_WIDTH_4 >> 1),
      this.bounds.right,
      this.bounds.bottom + this.bounds.get_height() - (global.CANVAS_STROKE_WIDTH_4 >> 1)
    );
    this.sine_wave.resize(this.sine_wave.STYLE_1);
    this.sine_wave.sine_wave_paint.set_stroke_width(temp_stroke_width);
  }
  update() {
    if (global.FLAG_MENU_OPEN_DOWN) {
      this.element_window.update();
    }
  }
  mouse_wheel() {
    if (!global.focused) {
      this.element_window.mouse_wheel();
    }
  }
  mouse_down() {
    if (!global.focused) {
      this.element_window.mouse_down();
      /* Block the click from propagating to the components if it's contained in the menu bar bounds */
      if (global.FLAG_MENU_OPEN) {
        if (this.bounds.contains_xy(global.mouse_x, global.mouse_y)) {
          global.component_touched = true;
        }
      } else {
        if (this.contains(this.menu_icons[this.REMOVE_ALL_INDEX], false) || this.contains(this.menu_icons[this.UP_DOWN_INDEX], true)) {
          global.component_touched = true;
        }
      }
      if (this.contains(this.graph_button, false) || this.contains(this.settings_button, false)) {
        global.component_touched = true;
      }
      this.first_touch_x = global.mouse_x;
      this.first_touch_y = global.mouse_y;
    }
  }
  mouse_move() {
    if (!global.focused) {
      this.element_window.mouse_move();
    }
  }
  mouse_up() {
    if (!global.IS_RIGHT_CLICK && !this.ESCAPE_INTERRUPT) {
      if (!global.MOUSE_KEYBOARD_LOCK && !multi_select_manager.CTRL_PRESSED && global.component_touched) {
        let cached_value = this.BASE_WIDTH;
        if (
          this.contains(this.menu_icons[this.UP_DOWN_INDEX], true) &&
          this.menu_icons[this.UP_DOWN_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, cached_value, this.bounds.get_height())
        ) {
          if (
            !global.FLAG_ZOOM &&
            !global.FLAG_SAVE_IMAGE &&
            !global.FLAG_SAVE_CIRCUIT &&
            !global.FLAG_SELECT_ELEMENT &&
            !global.FLAG_SELECT_SETTINGS &&
            !global.FLAG_SELECT_TIMESTEP &&
            !global.FLAG_REMOVE_ALL &&
            !global.FLAG_ELEMENT_OPTIONS_EDIT &&
            !global.FLAG_ELEMENT_OPTIONS
          ) {
            if (global.FLAG_MENU_OPEN) {
              this.handle_menu_open_flag(!global.FLAG_MENU_OPEN);
              /* Block out the reset selection portion of the code! */
              global.component_touched = true;
            } else {
              if (this.contains(this.menu_icons[this.UP_DOWN_INDEX], false)) {
                this.handle_menu_open_flag(!global.FLAG_MENU_OPEN);
                /* Block out the reset selection portion of the code! */
                global.component_touched = true;
              }
            }
          }
        } else if (
          ((this.contains(this.menu_icons[this.ADD_INDEX], true) &&
            this.menu_icons[this.ADD_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, cached_value, this.bounds.get_height())) ||
            (!this.contains(this.element_window.bounds, false) && global.FLAG_MENU_OPEN_DOWN)) &&
          !global.FLAG_GRAPH &&
          !global.SIGNAL_ADD_ELEMENT
        ) {
          if (
            !global.FLAG_ZOOM &&
            !global.FLAG_SAVE_IMAGE &&
            !global.FLAG_SAVE_CIRCUIT &&
            !global.FLAG_SELECT_ELEMENT &&
            !global.FLAG_SELECT_SETTINGS &&
            !global.FLAG_SELECT_TIMESTEP &&
            !global.FLAG_REMOVE_ALL &&
            !global.FLAG_ELEMENT_OPTIONS_EDIT &&
            !global.FLAG_ELEMENT_OPTIONS &&
            !global.SIGNAL_ADD_ELEMENT &&
            !global.FLAG_SIMULATING
          ) {
            if (global.FLAG_MENU_OPEN) {
              if (this.contains(this.menu_icons[this.ADD_INDEX], true)) {
                this.handle_menu_open_down_flag(!global.FLAG_MENU_OPEN_DOWN);
                /* Block out the reset selection portion of the code! */
                global.component_touched = true;
              } else {
                if (global.FLAG_MENU_OPEN_DOWN && !global.SIGNAL_ADD_ELEMENT && !this.element_window.bounds.contains_xy(this.first_touch_x, this.first_touch_y)) {
                  this.handle_menu_open_down_flag(!global.FLAG_MENU_OPEN_DOWN);
                  /* Block out the reset selection portion of the code! */
                  global.component_touched = true;
                }
              }
            }
          }
        } else if (
          this.contains(this.graph_button, false) ||
          (!this.contains(graph_window.bounds, false) &&
            ((!this.contains(this.menu_icons[this.GO_INDEX], true) && global.FLAG_GRAPH) || (this.contains(this.menu_icons[this.GO_INDEX], true) && !global.FLAG_MENU_OPEN)))
        ) {
          if (this.contains(this.graph_button, false) && this.graph_button.contains_xywh(this.first_touch_x, this.first_touch_y, cached_value, this.bounds.get_height())) {
            if (
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
              this.handle_graph_flag(!global.FLAG_GRAPH);
              /* Block out the reset selection portion of the code! */
              global.component_touched = true;
            }
          } else {
            if (global.FLAG_GRAPH) {
              if (
                !global.FLAG_SAVE_IMAGE &&
                !global.FLAG_SAVE_CIRCUIT &&
                !global.FLAG_ZOOM &&
                !global.FLAG_ELEMENT_OPTIONS &&
                !global.FLAG_ELEMENT_OPTIONS_EDIT &&
                !global.FLAG_SELECT_ELEMENT &&
                !global.FLAG_SELECT_TIMESTEP &&
                !global.FLAG_SELECT_SETTINGS &&
                !global.FLAG_REMOVE_ALL &&
                !global.FLAG_MENU_OPEN_DOWN &&
                !graph_window.bounds.contains_xy(this.first_touch_x, this.first_touch_y)
              ) {
                this.handle_graph_flag(!global.FLAG_GRAPH);
                /* Block out the reset selection portion of the code! */
                global.component_touched = true;
              }
            }
          }
        } else if (this.contains(this.menu_icons[this.REMOVE_ALL_INDEX], true)) {
          if (!global.FLAG_MENU_OPEN) {
            if (
              this.contains(this.menu_icons[this.REMOVE_ALL_INDEX], false) &&
              this.menu_icons[this.REMOVE_ALL_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, cached_value, this.bounds.get_height())
            ) {
              if (
                !global.FLAG_SAVE_IMAGE &&
                !global.FLAG_SAVE_CIRCUIT &&
                !global.FLAG_ELEMENT_OPTIONS &&
                !global.FLAG_ELEMENT_OPTIONS_EDIT &&
                !global.FLAG_GRAPH &&
                !global.FLAG_SELECT_ELEMENT &&
                !global.FLAG_SELECT_TIMESTEP &&
                !global.FLAG_SELECT_SETTINGS &&
                !global.FLAG_REMOVE_ALL &&
                !global.FLAG_MENU_OPEN &&
                !global.FLAG_ZOOM
              ) {
                this.handle_zoom_flag(!global.FLAG_ZOOM);
                /* Block out the reset selection portion of the code! */
                global.component_touched = true;
              }
            }
          } else {
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
              global.FLAG_MENU_OPEN &&
              !global.FLAG_MENU_OPEN_DOWN &&
              this.menu_icons[this.REMOVE_ALL_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, cached_value, this.bounds.get_height())
            ) {
              this.handle_remove_all_flag(!global.FLAG_REMOVE_ALL);
              /* Block out the reset selection portion of the code! */
              global.component_touched = true;
            }
          }
        } else if (
          this.contains(this.settings_button, false) &&
          this.settings_button.contains_xywh(this.first_touch_x, this.first_touch_y, cached_value, this.bounds.get_height())
        ) {
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
            !global.FLAG_REMOVE_ALL
          ) {
            this.handle_select_settings_flag(!global.FLAG_SELECT_SETTINGS);
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
          }
        } else if (
          this.contains(this.menu_icons[this.SAVE_INDEX], true) &&
          this.menu_icons[this.SAVE_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, cached_value, this.bounds.get_height())
        ) {
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
            global.FLAG_MENU_OPEN &&
            !global.FLAG_MENU_OPEN_DOWN
          ) {
            this.handle_save_circuit_flag(!global.FLAG_SAVE_CIRCUIT);
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
          }
        } else if (
          this.contains(this.menu_icons[this.SAVE_IMG_INDEX], true) &&
          this.menu_icons[this.SAVE_IMG_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, cached_value, this.bounds.get_height())
        ) {
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
            global.FLAG_MENU_OPEN &&
            !global.FLAG_MENU_OPEN_DOWN
          ) {
            this.handle_save_image_flag(!global.FLAG_SAVE_IMAGE);
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
          }
        } else if (
          this.contains(this.menu_icons[this.UNDO_INDEX], true) &&
          this.menu_icons[this.UNDO_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, cached_value, this.bounds.get_height())
        ) {
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
            global.FLAG_MENU_OPEN &&
            !global.FLAG_MENU_OPEN_DOWN
          ) {
            this.handle_undo_flag();
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
          }
        } else if (
          this.contains(this.menu_icons[this.REDO_INDEX], true) &&
          this.menu_icons[this.REDO_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, cached_value, this.bounds.get_height())
        ) {
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
            global.FLAG_MENU_OPEN &&
            !global.FLAG_MENU_OPEN_DOWN
          ) {
            this.handle_redo_flag();
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
          }
        } else if (
          this.contains(this.menu_icons[this.GO_INDEX], true) &&
          this.menu_icons[this.GO_INDEX].contains_xywh(this.first_touch_x, this.first_touch_y, cached_value, this.bounds.get_height())
        ) {
          if (
            !global.FLAG_SAVE_IMAGE &&
            !global.FLAG_SAVE_CIRCUIT &&
            !global.FLAG_ZOOM &&
            !global.FLAG_ELEMENT_OPTIONS &&
            !global.FLAG_ELEMENT_OPTIONS_EDIT &&
            !global.FLAG_SELECT_ELEMENT &&
            !global.FLAG_SELECT_TIMESTEP &&
            !global.FLAG_SELECT_SETTINGS &&
            !global.FLAG_REMOVE_ALL &&
            global.FLAG_MENU_OPEN &&
            !global.FLAG_MENU_OPEN_DOWN
          ) {
            this.handle_simulation_flag(!global.FLAG_SIMULATING);
            /* Block out the reset selection portion of the code! */
            global.component_touched = true;
          }
        }
        this.element_window.mouse_up();
      } else if (!global.MOUSE_KEYBOARD_LOCK && !multi_select_manager.CTRL_PRESSED) {
        if (
          (this.contains(this.menu_icons[this.ADD_INDEX], true) || (!this.contains(this.element_window.bounds, false) && global.FLAG_MENU_OPEN_DOWN)) &&
          !global.FLAG_GRAPH &&
          !global.SIGNAL_ADD_ELEMENT
        ) {
          if (
            !global.FLAG_ZOOM &&
            !global.FLAG_SAVE_IMAGE &&
            !global.FLAG_SAVE_CIRCUIT &&
            !global.FLAG_SELECT_ELEMENT &&
            !global.FLAG_SELECT_SETTINGS &&
            !global.FLAG_SELECT_TIMESTEP &&
            !global.FLAG_REMOVE_ALL &&
            !global.FLAG_ELEMENT_OPTIONS_EDIT &&
            !global.FLAG_ELEMENT_OPTIONS &&
            !global.SIGNAL_ADD_ELEMENT &&
            !global.FLAG_SIMULATING
          ) {
            if (global.FLAG_MENU_OPEN) {
              if (this.contains(this.menu_icons[this.ADD_INDEX], true)) {
                this.handle_menu_open_down_flag(!global.FLAG_MENU_OPEN_DOWN);
                /* Block out the reset selection portion of the code! */
                global.component_touched = true;
              } else {
                if (global.FLAG_MENU_OPEN_DOWN && !global.SIGNAL_ADD_ELEMENT) {
                  this.handle_menu_open_down_flag(!global.FLAG_MENU_OPEN_DOWN);
                  /* Block out the reset selection portion of the code! */
                  global.component_touched = true;
                }
              }
            }
          }
        }
        this.element_window.mouse_up();
      }
    }
    if (this.ESCAPE_INTERRUPT) {
      this.ESCAPE_INTERRUPT = false;
    }
  }
  handle_element_options_flag(ON) {
    global.MOUSE_KEYBOARD_LOCK = true;
    global.FLAG_ELEMENT_OPTIONS = ON;
    if (ON) {
      element_options_window.title_bounds.text = global.selected_properties['tag'] + global.selected_id;
    }
    if (global.DEVELOPER_MODE) {
      console.log('ELEMENT OPTIONS');
    }
  }
  handle_element_options_edit_flag(ON) {
    global.MOUSE_KEYBOARD_LOCK = true;
    if (ON) {
      element_options_edit_window.reset_cursor();
    }
    global.SIGNAL_BUILD_ELEMENT = true;
    global.SIGNAL_BUILD_COUNTER = 0;
    global.FLAG_ELEMENT_OPTIONS_EDIT = ON;
    if (global.DEVELOPER_MODE) {
      console.log('ELEMENT OPTIONS EDIT');
    }
  }
  handle_undo_flag() {
    global.MOUSE_KEYBOARD_LOCK = true;
    history_manager.undo();
    if (global.DEVELOPER_MODE) {
      console.log('UNDO');
    }
  }
  handle_redo_flag() {
    global.MOUSE_KEYBOARD_LOCK = true;
    history_manager.redo();
    if (global.DEVELOPER_MODE) {
      console.log('REDO');
    }
  }
  handle_menu_open_flag(ON) {
    global.MOUSE_KEYBOARD_LOCK = true;
    global.FLAG_MENU_OPEN = ON;
    if (!ON) {
      global.FLAG_MENU_OPEN_DOWN = ON;
    }
    if (global.DEVELOPER_MODE) {
      console.log('MENU OPEN');
    }
  }
  handle_menu_open_down_flag(ON) {
    global.MOUSE_KEYBOARD_LOCK = true;
    global.FLAG_MENU_OPEN_DOWN = ON;
    if (global.DEVELOPER_MODE) {
      console.log('MENU OPEN DOWN');
    }
  }
  handle_save_image_flag(ON) {
    if (ON) {
      save_image_window.input_button.text = global.USER_FILE.title;
      save_image_window.reset_cursor();
    }
    global.MOUSE_KEYBOARD_LOCK = true;
    global.FLAG_SAVE_IMAGE = ON;
    if (global.DEVELOPER_MODE) {
      console.log('SAVE IMAGE');
    }
  }
  handle_save_circuit_flag(ON) {
    if (ON) {
      save_circuit_window.input_button.text = global.USER_FILE.title;
      save_circuit_window.reset_cursor();
    }
    bottom_menu.resize_bottom_menu();
    global.MOUSE_KEYBOARD_LOCK = true;
    global.FLAG_SAVE_CIRCUIT = ON;
    if (global.DEVELOPER_MODE) {
      console.log('SAVE CIRCUIT');
    }
  }
  handle_select_settings_flag(ON) {
    global.MOUSE_KEYBOARD_LOCK = true;
    global.FLAG_SELECT_SETTINGS = ON;
    if (global.DEVELOPER_MODE) {
      console.log('SETTINGS');
    }
  }
  handle_simulation_flag(ON) {
    global.MOUSE_KEYBOARD_LOCK = true;
    global.FLAG_SIMULATING = ON;
    if (ON) {
      simulation_manager.setup();
    } else {
      simulation_manager.terminate();
    }
    if (global.DEVELOPER_MODE) {
      console.log('SIMULATION ' + (ON ? 'START' : 'END'));
    }
  }
  handle_graph_flag(ON) {
    global.MOUSE_KEYBOARD_LOCK = true;
    global.FLAG_GRAPH = ON;
    if (global.DEVELOPER_MODE) {
      console.log('GRAPH');
    }
  }
  handle_remove_all_flag(ON) {
    global.MOUSE_KEYBOARD_LOCK = true;
    global.FLAG_REMOVE_ALL = ON;
    if (global.DEVELOPER_MODE) {
      console.log('REMOVE ALL');
    }
  }
  handle_zoom_flag(ON) {
    global.MOUSE_KEYBOARD_LOCK = true;
    global.FLAG_ZOOM = ON;
    if (global.DEVELOPER_MODE) {
      console.log('ZOOM');
    }
  }
  key_down(key_event) {
    if (global.FLAG_MENU_OPEN) {
      if (
        !global.FLAG_ZOOM &&
        !global.FLAG_SAVE_IMAGE &&
        !global.FLAG_SAVE_CIRCUIT &&
        !global.FLAG_SELECT_ELEMENT &&
        !global.FLAG_SELECT_SETTINGS &&
        !global.FLAG_SELECT_TIMESTEP &&
        !global.FLAG_REMOVE_ALL &&
        !global.FLAG_ELEMENT_OPTIONS_EDIT &&
        !global.FLAG_ELEMENT_OPTIONS &&
        !global.SIGNAL_ADD_ELEMENT &&
        !global.FLAG_SIMULATING
      ) {
        if (global.FLAG_MENU_OPEN) {
          if (global.FLAG_MENU_OPEN_DOWN && !global.SIGNAL_ADD_ELEMENT) {
            if (key_event['event'].code === global.KEY_CODE_ESCAPE) {
              this.handle_menu_open_down_flag(!global.FLAG_MENU_OPEN_DOWN);
              /* Block out the reset selection portion of the code! */
              global.component_touched = true;
            }
          }
        }
      }
    }
  }
  contains(rect, adjust) {
    if (!adjust) {
      return rect.contains_xy(global.mouse_x, global.mouse_y);
    } else {
      return rect.contains_xywh(global.mouse_x, global.mouse_y, this.BASE_WIDTH, this.bounds.get_height());
    }
  }
  recolor() {
    if (global.FLAG_SIMULATING) {
      this.go_paint.set_color(global.MENU_ICON_ACTIVE_COLOR);
    } else {
      if (!global.FLAG_MENU_OPEN_DOWN) {
        this.go_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
      } else {
        this.go_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
      }
    }
    if (global.FLAG_GRAPH) {
      this.sine_wave.sine_wave_paint.set_color(global.MENU_ICON_ACTIVE_COLOR);
    } else {
      this.sine_wave.sine_wave_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    }
    if (history_manager.history_index > 0) {
      if (!global.FLAG_SIMULATING && !global.FLAG_GRAPH && !global.FLAG_MENU_OPEN_DOWN) {
        this.undo_paint.set_color(global.MENU_ICON_ACTIVE_COLOR);
      } else {
        this.undo_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
      }
    } else {
      if (!global.FLAG_SIMULATING && !global.FLAG_GRAPH && !global.FLAG_MENU_OPEN_DOWN) {
        this.undo_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
      } else {
        this.undo_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
      }
    }
    if (history_manager.history_index < history_manager.history.length - 1) {
      if (!global.FLAG_SIMULATING && !global.FLAG_GRAPH && !global.FLAG_MENU_OPEN_DOWN) {
        this.redo_paint.set_color(global.MENU_ICON_ACTIVE_COLOR);
      } else {
        this.redo_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
      }
    } else {
      if (!global.FLAG_SIMULATING && !global.FLAG_GRAPH && !global.FLAG_MENU_OPEN_DOWN) {
        this.redo_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
      } else {
        this.redo_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
      }
    }
    if (global.FLAG_MENU_OPEN_DOWN) {
      if (!global.FLAG_SIMULATING && !global.FLAG_GRAPH) {
        this.add_paint.set_color(global.MENU_ICON_ACTIVE_COLOR);
      } else {
        this.add_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
      }
    } else {
      if (!global.FLAG_SIMULATING && !global.FLAG_GRAPH) {
        this.add_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
      } else {
        this.add_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
      }
    }
    if (global.FLAG_MENU_OPEN) {
      if (!global.FLAG_SIMULATING && !global.FLAG_GRAPH && !global.FLAG_MENU_OPEN_DOWN) {
        this.remove_all_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
      } else {
        this.remove_all_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
      }
    }
    if (!global.FLAG_SIMULATING && !global.FLAG_GRAPH && !global.FLAG_MENU_OPEN_DOWN) {
      this.settings_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    } else {
      this.settings_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
    }
    if (!global.FLAG_GRAPH && !global.FLAG_MENU_OPEN_DOWN) {
      this.zoom_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    } else {
      this.zoom_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
    }
    if (!global.FLAG_GRAPH && !global.FLAG_MENU_OPEN_DOWN) {
      this.save_circuit_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    } else {
      this.save_circuit_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
    }
    if (!global.FLAG_GRAPH && !global.FLAG_MENU_OPEN_DOWN) {
      this.save_image_fill_paint.set_color(global.MENU_ICON_DEFAULT_COLOR);
    } else {
      this.save_image_fill_paint.set_color(global.MENU_ICON_INACTIVE_COLOR);
    }
  }
  draw_menu_bar(canvas) {
    this.recolor();
    let temp_stroke_width = 0.65 * global.CANVAS_STROKE_WIDTH_3;
    if (global.MOBILE_MODE) {
      temp_stroke_width = 0.85 * global.CANVAS_STROKE_WIDTH_3;
    }
    if (global.FLAG_MENU_OPEN) {
      canvas.draw_round_rect2(this.bounds, temp_stroke_width, this.fill_paint);
      if (
        !global.FLAG_SAVE_IMAGE &&
        !global.FLAG_SAVE_CIRCUIT &&
        !global.FLAG_REMOVE_ALL &&
        !global.FLAG_SELECT_SETTINGS &&
        !global.FLAG_SELECT_TIMESTEP &&
        !global.FLAG_ELEMENT_OPTIONS &&
        !global.FLAG_ELEMENT_OPTIONS_EDIT &&
        !global.FLAG_ZOOM &&
        !multi_select_manager.CTRL_PRESSED_STARTED &&
        !global.MOBILE_MODE
      ) {
        let cached_value = this.BASE_WIDTH;
        for (var i = 0; i < this.menu_icons.length; i++) {
          if (this.menu_icons[i].contains_xywh(global.mouse_x, global.mouse_y, cached_value, this.bounds.get_height())) {
            canvas.draw_round_rect3(
              this.menu_icons[i].get_center_x(),
              this.menu_icons[i].get_center_y(),
              cached_value,
              this.bounds.get_height(),
              temp_stroke_width,
              this.hover_paint
            );
          }
        }
      }
      let width_mul_0p64 = this.menu_icons[this.REMOVE_ALL_INDEX].get_width() * 0.64;
      let height_mul_0p64 = this.menu_icons[this.REMOVE_ALL_INDEX].get_height() * 0.64;
      canvas.draw_arc3(
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x(),
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y(),
        this.menu_icons[this.REMOVE_ALL_INDEX].get_width() >> 1,
        -25,
        290,
        this.remove_all_paint
      );
      let indexer = 0;
      this.CIRCLE_BUFFER = [];
      this.LINE_BUFFER = [];
      this.LINE_BUFFER[indexer++] = Array(
        this.menu_icons[this.REMOVE_ALL_INDEX].left + width_mul_0p64,
        this.menu_icons[this.REMOVE_ALL_INDEX].top + height_mul_0p64,
        this.menu_icons[this.REMOVE_ALL_INDEX].right - width_mul_0p64,
        this.menu_icons[this.REMOVE_ALL_INDEX].bottom - height_mul_0p64
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.menu_icons[this.REMOVE_ALL_INDEX].right - width_mul_0p64,
        this.menu_icons[this.REMOVE_ALL_INDEX].top + height_mul_0p64,
        this.menu_icons[this.REMOVE_ALL_INDEX].left + width_mul_0p64,
        this.menu_icons[this.REMOVE_ALL_INDEX].bottom - height_mul_0p64
      );
      canvas.draw_line_buffer(this.LINE_BUFFER, this.remove_all_paint);
      indexer = 0;
      this.LINE_BUFFER = [];
      if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
        canvas.draw_text('X', this.menu_icons[this.REMOVE_ALL_INDEX].left, this.menu_icons[this.REMOVE_ALL_INDEX].top, this.text_paint);
      }
      /* Drawing Save Circuit Path */
      canvas.draw_path(this.save_ckt_path1, this.save_circuit_paint);
      canvas.draw_path(this.save_ckt_path2, this.save_circuit_paint);
      if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
        canvas.draw_text('S', this.menu_icons[this.SAVE_INDEX].left, this.menu_icons[this.SAVE_INDEX].top, this.text_paint);
      }
      /* Drawing Save Image Path */
      canvas.draw_path(this.save_img_path, this.save_image_fill_paint);
      canvas.draw_circle(
        this.menu_icons[this.SAVE_IMG_INDEX].get_center_x(),
        this.menu_icons[this.SAVE_IMG_INDEX].get_center_y(),
        this.menu_icons[this.SAVE_IMG_INDEX].get_width() >> 3,
        this.fill_paint_alt
      );
      if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
        canvas.draw_text('I', this.menu_icons[this.SAVE_IMG_INDEX].left, this.menu_icons[this.SAVE_IMG_INDEX].top, this.text_paint);
      }
      let width_rshift_3 = this.menu_icons[this.ADD_INDEX].get_width() >> 3;
      let height_rshift_3 = this.menu_icons[this.ADD_INDEX].get_height() >> 3;
      let width_rshift_4 = this.menu_icons[this.ADD_INDEX].get_width() >> 4;
      let height_rshift_4 = this.menu_icons[this.ADD_INDEX].get_height() >> 4;
      canvas.draw_round_rect(
        this.menu_icons[this.ADD_INDEX].left + width_rshift_4,
        this.menu_icons[this.ADD_INDEX].top + height_rshift_4,
        this.menu_icons[this.ADD_INDEX].right - width_rshift_4,
        this.menu_icons[this.ADD_INDEX].bottom - height_rshift_4,
        0.6 * global.CANVAS_STROKE_WIDTH_3,
        this.add_paint
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.menu_icons[this.ADD_INDEX].get_center_x() - width_rshift_3,
        this.menu_icons[this.ADD_INDEX].get_center_y(),
        this.menu_icons[this.ADD_INDEX].get_center_x() + width_rshift_3,
        this.menu_icons[this.ADD_INDEX].get_center_y()
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.menu_icons[this.ADD_INDEX].get_center_x(),
        this.menu_icons[this.ADD_INDEX].get_center_y() - height_rshift_3,
        this.menu_icons[this.ADD_INDEX].get_center_x(),
        this.menu_icons[this.ADD_INDEX].get_center_y() + height_rshift_3
      );
      canvas.draw_line_buffer(this.LINE_BUFFER, this.line_paint);
      indexer = 0;
      this.LINE_BUFFER = [];
      if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
        canvas.draw_text('N', this.menu_icons[this.ADD_INDEX].left, this.menu_icons[this.ADD_INDEX].top, this.text_paint);
      }
      if (!global.FLAG_SIMULATING) {
        canvas.draw_path(this.go_path, this.go_paint);
      } else {
        let w_pad = this.menu_icons[this.GO_INDEX].get_width() * 0.333;
        let h_pad = this.menu_icons[this.GO_INDEX].get_height() * 0.333;
        canvas.draw_rect(
          this.menu_icons[this.GO_INDEX].get_center_x() - w_pad,
          this.menu_icons[this.GO_INDEX].get_center_y() - h_pad,
          this.menu_icons[this.GO_INDEX].get_center_x() + w_pad,
          this.menu_icons[this.GO_INDEX].get_center_y() + h_pad,
          this.go_paint
        );
      }
      if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
        canvas.draw_text('A', this.menu_icons[this.GO_INDEX].left, this.menu_icons[this.GO_INDEX].top, this.text_paint);
      }
      canvas.draw_path(this.undo_path, this.undo_paint);
      if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
        canvas.draw_text('Z', this.menu_icons[this.UNDO_INDEX].left, this.menu_icons[this.UNDO_INDEX].top, this.text_paint);
      }
      canvas.draw_path(this.redo_path, this.redo_paint);
      if (global.SYSTEM_OPTIONS['values'][global.SYSTEM_OPTION_SHORTCUT_HINTS] === global.ON) {
        canvas.draw_text('Y', this.menu_icons[this.REDO_INDEX].left, this.menu_icons[this.REDO_INDEX].top, this.text_paint);
      }
      canvas.draw_arrow(
        this.menu_icons[this.UP_DOWN_INDEX].get_center_x(),
        this.menu_icons[this.UP_DOWN_INDEX].get_center_y(),
        this.menu_icons[this.UP_DOWN_INDEX].get_width() * 0.4,
        true,
        this.up_down_paint
      );
    } else {
      let indexer = 0;
      this.LINE_BUFFER = [];
      /* Drawing the background for the magnifying glass */
      canvas.draw_round_rect3(
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x(),
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y(),
        this.menu_icons[this.REMOVE_ALL_INDEX].get_width(),
        this.menu_icons[this.REMOVE_ALL_INDEX].get_height(),
        temp_stroke_width,
        this.fill_paint
      );
      if (
        this.menu_icons[this.REMOVE_ALL_INDEX].contains_xy(global.mouse_x, global.mouse_y) &&
        !global.FLAG_MENU_OPEN_DOWN &&
        !global.FLAG_MENU_OPEN_DOWN &&
        !global.FLAG_SIMULATING &&
        !global.FLAG_ZOOM &&
        !global.FLAG_SELECT_SETTINGS &&
        !global.FLAG_SAVE_IMAGE &&
        !global.FLAG_SAVE_CIRCUIT &&
        !global.FLAG_SELECT_TIMESTEP &&
        !global.FLAG_ELEMENT_OPTIONS_EDIT &&
        !global.FLAG_ELEMENT_OPTIONS &&
        !global.FLAG_GRAPH &&
        !global.FLAG_REMOVE_ALL &&
        !multi_select_manager.CTRL_PRESSED_STARTED &&
        !global.MOBILE_MODE
      ) {
        canvas.draw_round_rect3(
          this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x(),
          this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y(),
          this.menu_icons[this.REMOVE_ALL_INDEX].get_width(),
          this.menu_icons[this.REMOVE_ALL_INDEX].get_height(),
          temp_stroke_width,
          this.hover_paint
        );
      }
      /* Drawing the background for the up down icon */
      canvas.draw_round_rect3(
        this.menu_icons[this.UP_DOWN_INDEX].get_center_x(),
        this.menu_icons[this.UP_DOWN_INDEX].get_center_y(),
        this.menu_icons[this.UP_DOWN_INDEX].get_width(),
        this.menu_icons[this.UP_DOWN_INDEX].get_height(),
        temp_stroke_width,
        this.fill_paint
      );
      if (
        this.menu_icons[this.UP_DOWN_INDEX].contains_xy(global.mouse_x, global.mouse_y) &&
        !global.FLAG_ZOOM &&
        !global.FLAG_SELECT_SETTINGS &&
        !global.FLAG_SAVE_IMAGE &&
        !global.FLAG_SAVE_CIRCUIT &&
        !global.FLAG_SELECT_TIMESTEP &&
        !global.FLAG_ELEMENT_OPTIONS_EDIT &&
        !global.FLAG_ELEMENT_OPTIONS &&
        !global.FLAG_REMOVE_ALL &&
        !multi_select_manager.CTRL_PRESSED_STARTED &&
        !global.MOBILE_MODE
      ) {
        canvas.draw_round_rect3(
          this.menu_icons[this.UP_DOWN_INDEX].get_center_x(),
          this.menu_icons[this.UP_DOWN_INDEX].get_center_y(),
          this.menu_icons[this.UP_DOWN_INDEX].get_width(),
          this.menu_icons[this.UP_DOWN_INDEX].get_height(),
          temp_stroke_width,
          this.hover_paint
        );
      }
      /* Drawing the up down icon */
      canvas.draw_arrow(
        this.menu_icons[this.UP_DOWN_INDEX].get_center_x(),
        this.menu_icons[this.UP_DOWN_INDEX].get_center_y(),
        this.menu_icons[this.UP_DOWN_INDEX].get_width() * 0.3,
        false,
        this.up_down_paint
      );
      /* Drawing the magnifying icon (Zoom) */
      let pad_w = this.menu_icons[this.REMOVE_ALL_INDEX].get_width() * 0.075;
      let pad_h = this.menu_icons[this.REMOVE_ALL_INDEX].get_height() * 0.075;
      let width_rshift_3 = this.menu_icons[this.REMOVE_ALL_INDEX].get_width() >> 3;
      let width_rshift_2 = this.menu_icons[this.REMOVE_ALL_INDEX].get_width() >> 2;
      this.LINE_BUFFER = [];
      indexer = 0;
      canvas.draw_circle(
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() - width_rshift_3,
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() - width_rshift_3,
        this.menu_icons[this.REMOVE_ALL_INDEX].get_width() * 0.2,
        this.zoom_paint
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() + (this.menu_icons[this.REMOVE_ALL_INDEX].get_width() >> 4),
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() + (this.menu_icons[this.REMOVE_ALL_INDEX].get_height() >> 4),
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() + width_rshift_2,
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() + width_rshift_2
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() - width_rshift_3 - pad_w,
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() - width_rshift_3,
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() - width_rshift_3 + pad_w,
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() - width_rshift_3
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() - width_rshift_3,
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() - width_rshift_3 - pad_h,
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_x() - width_rshift_3,
        this.menu_icons[this.REMOVE_ALL_INDEX].get_center_y() - width_rshift_3 + pad_h
      );
      canvas.draw_line_buffer(this.LINE_BUFFER, this.zoom_paint);
    }
    if (!global.FLAG_MENU_OPEN_DOWN) {
      let indexer = 0;
      this.LINE_BUFFER = [];
      canvas.draw_round_rect2(this.graph_button, temp_stroke_width, this.fill_paint);
      if (
        this.graph_button.contains_xy(global.mouse_x, global.mouse_y) &&
        !global.FLAG_MENU_OPEN_DOWN &&
        !global.FLAG_MENU_OPEN_DOWN &&
        !global.FLAG_SIMULATING &&
        !global.FLAG_ZOOM &&
        !global.FLAG_SELECT_SETTINGS &&
        !global.FLAG_SAVE_IMAGE &&
        !global.FLAG_SAVE_CIRCUIT &&
        !global.FLAG_SELECT_TIMESTEP &&
        !global.FLAG_ELEMENT_OPTIONS_EDIT &&
        !global.FLAG_ELEMENT_OPTIONS &&
        !global.FLAG_REMOVE_ALL &&
        !multi_select_manager.CTRL_PRESSED_STARTED &&
        !global.MOBILE_MODE
      ) {
        canvas.draw_round_rect2(this.graph_button, temp_stroke_width, this.hover_paint);
      }
      this.sine_wave.draw_sine_wave(canvas, 1);
      let pad = 0.2;
      this.LINE_BUFFER[indexer++] = Array(
        this.graph_button.left + this.graph_button.get_width() * pad,
        this.graph_button.top + this.graph_button.get_height() * 1.1 * pad,
        this.graph_button.left + this.graph_button.get_width() * pad,
        this.graph_button.bottom - this.graph_button.get_height() * pad
      );
      this.LINE_BUFFER[indexer++] = Array(
        this.graph_button.left + this.graph_button.get_width() * pad,
        this.graph_button.bottom - this.graph_button.get_height() * pad,
        this.graph_button.right - this.graph_button.get_width() * 1.1 * pad,
        this.graph_button.bottom - this.graph_button.get_height() * pad
      );
      canvas.draw_line_buffer(this.LINE_BUFFER, this.sine_wave.sine_wave_paint);
    }
    canvas.draw_round_rect2(this.settings_button, temp_stroke_width, this.fill_paint);
    if (
      this.settings_button.contains_xy(global.mouse_x, global.mouse_y) &&
      !global.FLAG_MENU_OPEN_DOWN &&
      !global.FLAG_SIMULATING &&
      !global.FLAG_ZOOM &&
      !global.FLAG_SELECT_SETTINGS &&
      !global.FLAG_SAVE_IMAGE &&
      !global.FLAG_SAVE_CIRCUIT &&
      !global.FLAG_SELECT_TIMESTEP &&
      !global.FLAG_ELEMENT_OPTIONS_EDIT &&
      !global.FLAG_ELEMENT_OPTIONS &&
      !global.FLAG_GRAPH &&
      !global.FLAG_REMOVE_ALL &&
      !multi_select_manager.CTRL_PRESSED_STARTED &&
      !global.MOBILE_MODE
    ) {
      canvas.draw_round_rect2(this.settings_button, temp_stroke_width, this.hover_paint);
    }
    canvas.draw_path(this.settings_path, this.settings_paint);
    if (
      this.settings_button.contains_xy(global.mouse_x, global.mouse_y) &&
      !global.FLAG_MENU_OPEN_DOWN &&
      !global.FLAG_MENU_OPEN_DOWN &&
      !global.FLAG_SIMULATING &&
      !global.FLAG_ZOOM &&
      !global.FLAG_SELECT_SETTINGS &&
      !global.FLAG_SAVE_IMAGE &&
      !global.FLAG_SAVE_CIRCUIT &&
      !global.FLAG_SELECT_TIMESTEP &&
      !global.FLAG_ELEMENT_OPTIONS_EDIT &&
      !global.FLAG_ELEMENT_OPTIONS &&
      !global.FLAG_GRAPH &&
      !global.FLAG_REMOVE_ALL &&
      !multi_select_manager.CTRL_PRESSED_STARTED &&
      !global.MOBILE_MODE
    ) {
      canvas.draw_circle(this.settings_button.get_center_x(), this.settings_button.get_center_y(), this.settings_button.get_width() * 0.125, this.hover_paint);
    } else {
      canvas.draw_circle(this.settings_button.get_center_x(), this.settings_button.get_center_y(), this.settings_button.get_width() * 0.125, this.fill_paint_alt);
    }
    this.element_window.draw_window(canvas);
  }
}