class Metadata {
  public elm: Element1 = new Element1(-1, global.TYPE_META_DATA, global.copy(global.PROPERTY_META_DATA));
  /* A snapshot of the scope settings */
  public user_scope_settings: SCOPE_ENTRY_T = global.NULL;
  /* A snapshot of the user settings */
  public user_settings: Settings = global.NULL;
  /* Time step */
  public user_timestep: number = global.NULL;
  /* The file name */
  public file_name: string = '';
  /* Calibration String */
  public calibration_string: string = '';

  constructor() {}
}
