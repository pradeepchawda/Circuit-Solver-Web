/**********************************************************************
 * Project           : Circuit Solver
 * File		        : PaintBaseline.js
 * Author            : nboatengc
 * Date created      : 20190928
 *
 * Purpose           : The Paint Text Baseline class is to standadize the access to the different
 *                   options available in the html canvas
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
class PaintBaseline {
  public readonly TOP: CanvasTextBaseline = 'top';
  public readonly MIDDLE: CanvasTextBaseline = 'middle';
  public readonly BOTTOM: CanvasTextBaseline = 'bottom';
  public readonly ALPHABETIC: CanvasTextBaseline = 'alphabetic';
  public readonly HANGING: CanvasTextBaseline = 'hanging';
  constructor() {}
}