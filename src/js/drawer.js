import { Style, TextStyle } from './style';

class Drawer {
  static canvas = Drawer.getCanvas();

  /**
   * @param {CanvasRenderingContext2D} context
   */
  static context = Drawer.getCanvasContext();

  /**
   * 
   * @param {Array} coordinates [[x, y], [2, 3], [3, 4]]
   * @param {Style} style
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

  /**
   * 
   */
  clearContext() {
    Drawer.context.clearRect(0, 0, Drawer.canvas.width, Drawer.canvas.height);
  }

  setStyle() {
    if (this.style) {
      this.style.setStyle(Drawer.context);
    }
  }
}

export class Text extends Drawer {
  /**
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
    this.setStyle();
    const [coordinates] = this.coordinates;
    Text.context.fillText(this.text, coordinates[0], coordinates[1]);
  }
}

export class Rectangle extends Drawer {
  /**
   * @param {object} params
   * @param {Array} params.from [1, 2]
   * @param {Array} params.to [1, 3]
   * @param {Style} params.style
   * @param {Text} params.text
   */
  constructor({ from, width, height, style, text }) {
    super([from, [from[0] + width, from[1] + height]], style);
    this.text = text;
  }

  draw() {
    this.setStyle();
    const [begin, end] = this.coordinates;
    Rectangle.context.beginPath();
    Rectangle.context.rect(begin[0], begin[1], end[0], end[1]);
    Rectangle.context.stroke();

    if (this.text) {
      this.text.draw();
    }
  }

  setTextCenter() {
    
  }
}

export class Arrow extends Drawer {

}
