/** 
 * 面向对象编程 第六章继承
*/
//6.1原型链
function Shap() {
  this.name = 'shape';
  this.toString = function () {
    return this.name;
  }
}
function TwoDShape() {
  this.name = '2D shape';
}
function Triangle(side, height) {
  this.name = 'Triangle';
  this.side = side;
  this.height = height;
  this.getArea = function () {
    return this.side * this.height / 2;
  }
}
TwoDShape.prototype = new Shape();
TwoDShape.prototype.constructor = TwoDShape;
Triangle.prototype = new TwoDShape();
Triangle.prototype.constructor = Triangle;

//共享属性
function Shape(){
}
Shape.prototype.name = 'shape'
Shape.prototype.toString = function () {
  return this.name
}
function TwoDShape() {}
TwoDShape.prototype = new Shape();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = '2D shape'

function Triangle(side, height) {
  this.side = side;
  this.height = height;
}
Triangle.prototype = new TwoDShape();
Triangle.prototype.constructor = Triangle;
Triangle.prototype.name = 'Triangle'
Triangle.prototype.getArea = function () {
  return this.side*this.height/2
}

//只继承与原型,只是复制了引用属于浅拷贝，子对象改变会影响父对象
function Shape() {
}
Shape.prototype.name = 'shape'
Shape.prototype.toString = function () {
  return this.name
}
function TwoDShape() {
}
TwoDShape.prototype = Shape.prototype
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = '2DShape'
function Triangle(side, height) {
  this.side = side;
  this.height = height;
}
Triangle.prototype = TwoDShape.prototype
Triangle.prototype.constructor = Triangle;
Triangle.prototype.name = 'Triangle'
Triangle.prototype.getArea = function () {
  return this.side*this.height/2
}

//临时构造器
function Shape() {
}
Shape.prototype.name = 'shape'
Shape.prototype.toString = function () {
  return this.name
}

function TwoDShape() {
}
var F = function () {
}
F.prototype = Shape.prototype
TwoDShape.prototype = new F()
TwoDShape.prototype.constructor = TwoDShape
TwoDShape.prototype.name = '2D shape'

function Triangle(side, height) {
  this.side = side
  this.height = height
}
var F = function () {
}
F.prototype = TwoDShape.prototype
Triangle.prototype = new F()
Triangle.prototype.constructor = Triangle
Triangle.prototype.name = 'Triangle'
Triangle.prototype.getArea = function () {
  return this.side*this.height /2
}

//子对象访问父对象  没搞明白  结论和书中不一致
function Shape() {
}
Shape.prototype.name = 'shape'
Shape.prototype.toString = function () {
  var result = []
  if (this.constructor.uber) {
    result[result.length] = this.constructor.uber.toString()
  }
  result[result.length] = this.name
  return result.join(', ')
}
function TwoDShape() {
}
var F = function () {
}
F.prototype = Shap.prototype;
TwoDShape.prototype = new F();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.uber = Shape.prototype;
TwoDShape.prototype.name = '2D shape';

function Triangle(side, height) {
  this.side = side
  this.height = height
}
var F = function () {
}
F.prototype = TwoDShape.prototype
Triangle.prototype = new F()
Triangle.prototype.constructor = Triangle
Triangle.uber = TwoDShape.prototype
Triangle.prototype.name = 'Triangle'
Triangle.prototype.getArea = function () {
  return this.side*this.height /2
}

// 属性拷贝
function extend(Child, Parent) {
  var p = Parent.prototype;
  var c = Child.prototype;
  for(var i in p){
    c[i] = p[i]
  }
  c.uber = p
}

// 对象之间的继承
//浅拷贝
function extendCopy(p) {
  var c = {}
  for (var i in p) {
    if (p.hasOwnProperty(i)) {
      c[i] = p[i];
    }
  }
  c.uber = p;
  return c;
}

//深拷贝
function deepCopy(p,c) {
  var c = c || {};
  for (var i in p) {
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {};
      deepCopy(p[i], c[i])
    }else{
      c[i] = p[i]
    }
  }
  return c
}

// object()
function object(o) {
  function F() {
  }
  F.prototype = o;
  return new F()
}

//多重继承
function multi() {
  var n = {}, stuff, j = 0, len = argument.length;
  for ( j  = 0; j < len; j++) {
    stuff = arguments[j];
    for (var i in stuff) {
      if (stuff.hasOwnProperty(i)) {
        n[i] = stuff[i];
      }
    }
  }
  return n
}
//eg.
var  shape = {
  name:'shape',
  toString: function () {
    return this.name
  }
}
var twoDee = {
  name: '2D shape',
  dimensions: 2
}
var triangle = multi(shape, twoDee, {
  name:'triangle',
  side:5,
  height:10,
  getArea: function () {
    return this.side*this.height/2
  }
})