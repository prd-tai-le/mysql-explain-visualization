import { Rectangle, Text, Arrow } from './drawers';
import { ShapeStyle, TextStyle } from './style';
import sampleData from './sampleData.json';

class ExplainSQLVisualization {
  /**
   * @param {Object} jsonData 
   */
  constructor(jsonData) {
    this.jsonData = jsonData;
  }
}

new ExplainSQLVisualization(sampleData);

const rectangle = new Rectangle({
  from: [100, 100],
  width: 300,
  height: 300,
  style: new ShapeStyle({
    lineWidth: 2,
    strokeStyle: 'red',
  }),
  text: new Text({
    textContent: 'ABC',
    style: new TextStyle({
      font: '30px Arial',
    }),
  }),
});
rectangle.draw();

const arrow = new Arrow({
  from: [100, 100],
  to: [400, 400],
  style: new ShapeStyle({ lineWidth: 2, strokeStyle: 'red' }),
  text: new Text({
    textContent: 'ABC',
    style: new TextStyle({
      font: '20px Arial',
    }),
  }),
});
arrow.draw();
