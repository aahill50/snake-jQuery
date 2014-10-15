(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (coord) {
    this.dir = "E";
    var startCoord = new Coord(coord);
    this.segments = [startCoord];
  };

  Snake.DIR = {
    e: [1,0],
    w: [-1,0],
    n: [0,-1],
    s: [0,1]
  }

  Snake.prototype.move = function (dir) {
    var head = this.segments[0];
    var direction = Snake.DIR[dir];
    this.segments.unshift(head.plus(direction));
    this.segments.pop();
  };

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
  };

  Snake.prototype.containsPos = function (pos) {
    for (var i = 0; i < this.segments.length; i++) {
      if (this.segments[i].equalPos(pos)) {
        return true;
      }
    };
    return false;
  };

  var Coord = SnakeGame.Coord = function (pos) {
    this.x = pos[0];
    this.y = pos[1];
  }
  Coord.prototype.equalPos = function (pos) {
    return this.x === pos[0] && this.y === pos[1];
  };
  Coord.prototype.plus = function (pos) {
    return new Coord([this.x + pos[0], this.y + pos[1]]);
  };

  Coord.prototype.toPos = function () {
    return[this.x, this.y];
  };

  var Board = SnakeGame.Board = function (size) {
    this.size = size || 10;
    this.snake = new Snake([0,0]);
    this.apples = [];
    this.board = [];

    for (var i = 0; i < size; i++) {
      this.board.push(Array(size));
    }
  }

  Board.prototype.render = function () {
    var display = "";

    for (var i = 0; i < this.size; i++) {
      for (var j = 0; j < this.size; j++) {
        display += this.snake.containsPos([i,j]) ? "S" : ".";
      }
      display += "\n"
    }
    return display;
  };

}());