class Shape {
  calculateArea() {
    throw new Error("Метод calculateArea должен быть переопределен");
  }

  calculatePerimeter() {
    throw new Error("Метод calculatePerimeter должен быть переопределен");
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  calculatePerimeter() {
    return this.height * this.width;
  }

  calculateArea() {
    return 2 * this.height + 2 * this.width;
  }
}

const rectangle = new Rectangle(5, 10);
console.log(rectangle.calculatePerimeter());
console.log(rectangle.calculateArea());

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  calculatePerimeter() {
    return 2 * Math.PI * this.radius;
  }

  calculateArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

const circle = new Circle(5);
console.log(circle.calculatePerimeter());
console.log(circle.calculateArea());

class Triangle extends Shape {
  constructor(height, sideHeight, sideA, sideB) {
    super();
    this.height = height;
    this.sideHeight = sideHeight;
    this.sideA = sideA;
    this.sideB = sideB;
  }

  calculatePerimeter() {
    return (this.height * this.sideHeight) / 2;
  }

  calculateArea() {
    return this.sideA + this.sideB + this.sideHeight;
  }
}

const triangle = new Triangle(10, 5, 15, 15);
console.log(triangle.calculatePerimeter());
console.log(triangle.calculateArea());
