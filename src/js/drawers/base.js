import { Style } from '../style';

export default class Drawer {
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
    if (!coordinates || !style) {
      throw new Error('Invalid parameters');
    }
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
