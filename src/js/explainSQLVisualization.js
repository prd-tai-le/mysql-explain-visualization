import { Text, TextStyle } from './drawer';

console.log(Text.context);

const test = new Text({
  text: 'ABC',
  x: 10,
  y: 8,
  style: new TextStyle({
    fontSize: '20px',
    fontFamily: 'Arial',
  })
});
test.draw();
test.clearContext();