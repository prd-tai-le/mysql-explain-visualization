class Style {}

class ShapeStyle extends Style {
    /**
     * @param {Object} param0 
     * @param {String} param0.lineWidth
     * @param {String} param0.strokeStyle
     */
    constructor({ lineWidth, strokeStyle }) {
        this.lineWidth = lineWidth;
        this.strokeStyle = strokeStyle;
    }
}

export class TextStyle extends Style {
  /**
   * @param {Object} param0
   * @param {String} param0.color
   * @param {String} param0.fontSize
   * @param {String} param0.fontFamily
   */
  constructor({ color, fontSize, fontFamily }) {
    super();
    this.color = color;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
  }
}
