export class Style {
  setStyle(context) {
    Object.entries(this).forEach(([key, value]) => {
      context[key] = value;
    });
  }
}

export class ShapeStyle extends Style {
  /**
   * @param {Object} param0 
   * @param {String} param0.lineWidth
   * @param {String} param0.strokeStyle
   */
  constructor({ lineWidth, strokeStyle }) {
    super();
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
  }
}

export class TextStyle extends Style {
  /**
   * @param {Object} param0
   * @param {String} param0.color
   * @param {String} param0.font
   */
  constructor({ color, font }) {
    super();
    this.color = color;
    this.font = font;
  }
}
