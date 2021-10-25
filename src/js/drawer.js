class Style {
  static context;

  constructor({ color, fontSize, backgroundColor, }) {
    this.color = color;
    this.fontSize = fontSize;
    this.backgroundColor = backgroundColor;
  }
}

class Drawer {
  /**
   * 
   * @param {Array} coordinates [[x, y], [2, 3], [3, 4]]
   */
  constructor(coordinates, style) {
    this.coordinates = coordinates;
    this.style = style;
  }

  draw() {
    throw new Error('Implement this.');
  }
}

class Text extends Drawer {
  /**
   * 
   * @param {object} params 
   * @param {string} params.text
   * @param {Style} params.style
   * @param {number} params.x
   * @param {number} params.y
   */
  constructor({ x, y, text, style }) {
    super([[x, y]], style);
    this.text = text;
    this.color = color;
  }
}

class Rectangle extends Drawer {
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

class Arrow extends Drawer {

}

const test = new Text({
  text: 'ABC',
  x: 10,
  y: 8,
});
console.log(test.a);
