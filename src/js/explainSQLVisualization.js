import { Rectangle, Text } from './drawer';
import { ShapeStyle, TextStyle } from './style';

class ExplainSQLVisualization {
  /**
   * @param {Object} jsonData 
   */
  constructor(jsonData) {
    this.jsonData = jsonData;
  }
}

const rectangle = new Rectangle({
  from: [100, 100],
  width: 100,
  height: 50,
  style: new ShapeStyle({
    lineWidth: 6,
    strokeStyle: 'red',
  }),
  text: new Text({
    text: 'ABC',
    style: new TextStyle({
      font: '30px Arial',
    }),
  }),
});
rectangle.draw();
