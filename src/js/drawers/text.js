import Drawer from './base';
import { TextStyle } from '../style';

export class Text extends Drawer {
  /**
   * @param {object} params 
   * @param {string} params.text
   * @param {TextStyle} params.style
   * @param {number} params.x
   * @param {number} params.y
   */
  constructor({ x, y, textContent, style }) {
    super([[x, y]], style);
    this.textContent = textContent;
  }

  draw() {
    this.setStyle();
    const [coordinates] = this.coordinates;
    Text.context.fillText(this.textContent, ...coordinates);
  }

  /**
   * @param {Array} from 
   * @param {Array} to 
   */
  setPositionCenterRectangle([fromX, fromY], [toX, toY]) {
    this.style.setTextAlign('center');
    this.coordinates = [[
      (fromX + toX) / 2,
      (fromY + toY) / 2,
    ]];
  }
}
