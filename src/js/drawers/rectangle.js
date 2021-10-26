import Drawer from './base';
import { ShapeStyle } from '../style';

export class Rectangle extends Drawer {
  /**
   * @param {object} params
   * @param {Array} params.from [1, 2]
   * @param {Array} params.to [1, 3]
   * @param {ShapeStyle} params.style
   * @param {Text} params.text
   */
  constructor({ from, from: [fromX, fromY], width, height, style, text }) {
    super([from, [fromX + width, fromY + height]], style);
    this.text = text;
  }

  /**
   * @returns {Array}
   */
  toXYWH() {
    const [[fromX, fromY], [toX, toY]] = this.coordinates;
    return [fromX, fromY, toX - fromX, toY - fromY];
  }

  /**
   * 
   */
  draw() {
    this.setStyle();
    const [begin, end] = this.coordinates;
    Rectangle.context.beginPath();
    Rectangle.context.rect(...this.toXYWH());
    Rectangle.context.stroke();

    if (this.text) {
      this.text.setPositionCenterRectangle(begin, end);
      this.text.draw();
    }
  }
}
