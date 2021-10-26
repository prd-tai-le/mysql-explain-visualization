class Style {}

export class TextStyle extends Style {
  constructor({ color, fontSize, fontFamily }) {
    super();
    this.color = color;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
  }
}

class Drawer {
  static canvas = Drawer.getCanvas();

  /**
   * @param {CanvasRenderingContext2D} context
   */
  static context = Drawer.getCanvasContext();

  /**
   * 
   * @param {Array} coordinates [[x, y], [2, 3], [3, 4]]
   */
  constructor(coordinates, style) {
    this.coordinates = coordinates;
    this.style = style;
  }

  static getCanvas() {
    return document.getElementById('canvas');
  }

  static getCanvasContext() {
    const canvas = Drawer.getCanvas();
    return canvas.getContext('2d');
  }

  draw() {
    throw new Error('Implement this.');
  }

  clearContext() {
    Drawer.context.clearRect(0, 0, Drawer.canvas.width, Drawer.canvas.height);
  }
}

export class Text extends Drawer {
  /**
   * 
   * @param {object} params 
   * @param {string} params.text
   * @param {TextStyle} params.style
   * @param {number} params.x
   * @param {number} params.y
   */
  constructor({ x, y, text, style }) {
    super([[x, y]], style);
    this.text = text;
  }

  draw() {
    const [coordinates] = this.coordinates;

    Text.context.font = `${this.style.fontSize} ${this.style.fontFamily}`;
    Text.context.fillText(this.text, coordinates[0], coordinates[1])
  }
}

export class Rectangle extends Drawer {
  /**
   * 
   * @param {object} params
   * @param {Array} params.from [1, 2]
   * @param {Array} params.to [1, 3]
   * @param {Style} params.style
   */
  constructor({ from, to, style }) {
    super([from, to], style);
  }
}

export class Arrow extends Drawer {

}
