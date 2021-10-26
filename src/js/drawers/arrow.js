import Drawer from './base';
import { Text } from './text';
import { ShapeStyle } from '../style';

export class Arrow extends Drawer {
  /**
   * @param {Object} param0 
   * @param {Array} param0.from
   * @param {Array} param0.to
   * @param {String} param0.arrowHeadPosition
   * @param {ShapeStyle} param0.style
   * @param {Text} param0.text
   */
  constructor({ from, to, arrowHeadPosition = 'to', style, text }) {
    super([from, to], style);
    this.arrowHeadPosition = arrowHeadPosition;
    this.text = text;
  }

  /**
   * 
   */
  draw() {
    const [[fromX, fromY], [toX, toY]] = this.coordinates;
    this.setStyle();
    Arrow.context.beginPath();
    Arrow.context.moveTo(fromX, fromY);
    Arrow.context.lineTo(toX, toY);
    Arrow.context.stroke();

    switch (this.arrowHeadPosition) {
      case 'from':
        Arrow.drawArrowHead([toX, toY], [fromX, fromY]);
        break;
      case 'to':
        Arrow.drawArrowHead([fromX, fromY], [toX, toY]);
        break;
      case 'both':
        Arrow.drawArrowHead([toX, toY], [fromX, fromY]);
        Arrow.drawArrowHead([fromX, fromY], [toX, toY]);
        break;
    }
    if (this.text) {
      Arrow.drawLabel(this.text, [fromX, fromY], [toX, toY], 'left');
    }
  }

  /**
   * https://stackoverflow.com/a/6333775/7985083
   * @param {Array} param0
   * @param {Array} param1
   */
  static drawArrowHead([fromX, fromY], [toX, toY]) {
    const headlen = 10; // length of head in pixels
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    Arrow.context.moveTo(fromX, fromY);
    Arrow.context.lineTo(toX, toY);
    Arrow.context.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    Arrow.context.moveTo(toX, toY);
    Arrow.context.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    Arrow.context.stroke();
  }

  /**
   * @param {Text} text 
   * @param {Array} param0
   * @param {Array} param1
   * @param {*} alignment 
   * @param {*} padding 
   */
  static drawLabel(text, [p1X, p1Y], [p2X, p2Y], alignment = 'center', padding = 0) {
    const dX = p2X - p1X;
    const dY = p2Y - p1Y;
    let pX, pY;
    let pad;

    if (alignment === 'center') {
      [pX, pY] = [p1X, p1Y];
      pad = 1 / 2;
    } else {
      const left = alignment === 'left';
      [pX, pY] = left ? [p1X, p1Y] : [p2X, p2Y];
      pad = padding / Math.sqrt(dX * dX + dY * dY) * (left ? 1 : -1);
    }
    text.setStyle();
    Arrow.context.textAlign = alignment;
    Arrow.context.translate(pX + dX * pad, pY + dY * pad);
    Arrow.context.rotate(Math.atan2(dY, dX));
    Arrow.context.fillText(text.textContent, 0, -3);
  }
}
