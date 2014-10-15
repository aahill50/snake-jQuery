(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }

  var Snake = SnakeGame.Snake = function (coord, board) {
    this.dir = "e";
    var startCoord = new Coord([1,0]);
    var secondCoord = new Coord([0,0]);
    this.segments = [startCoord, secondCoord];
    this.board = board
  };

  Snake.DIR = {
    s: [1,0],
    n: [-1,0],
    w: [0,-1],
    e: [0,1]
  }
  Snake.prototype.isHead = function (pos) {
    var headX = this.segments[0].x;
    var headY = this.segments[0].y;
    return (headX === pos[0] && headY === pos[1]);
  };

  Snake.prototype.move = function () {
    var head = this.segments[0];
    var direction = Snake.DIR[this.dir];
    var newHead = head.plus(direction)
    if (this.board.hasApple([newHead.x, newHead.y])) {
      this.segments.unshift(newHead);
      this.board.removeApple([newHead.x, newHead.y]);
    }

    else {
      this.segments.unshift(newHead);
      this.segments.pop();
    }
  };

  Snake.prototype.turn = function (dir) {
    if (typeof dir === "string") {
      this.dir = dir;
    }
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
    this.snake = new Snake([0,0], this);
    this.objects = [];
    this.apples = [];
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
  Board.prototype.hasApple = function (pos) {
    for (var i = 0; i < this.apples.length; i++) {
      var apple = this.apples[i]
      if (apple.coord.x === pos[0] && apple.coord.y === pos[1]) {
        return true
      }
    }
    return false;
  };
  Board.prototype.removeApple = function (pos) {
    var removeIndex = false;
    var that = this;
    this.apples.forEach(function (el, index) {
      if (el.coord.x === pos[0] && el.coord.y === pos[1]) {
        removeIndex = index;
      }
    });
    if(removeIndex && removeIndex !== 0) {
      this.apples.splice(removeIndex, 1);
    }
  };

  Board.prototype.update = function () {
    this.objects = [];
    this.objects = this.objects.concat(this.snake.segments).concat(this.apples);
  };

  Board.prototype.spawnApple = function (appleness) {
    if (appleness) {
    do {
      var posX         = Math.floor(Math.random() * this.size);
      var posY         = Math.floor(Math.random() * this.size);
      if (this.isEmpty([posX, posY])) {
        var appleCoord = new Coord([posX, posY]);
        this.apples.push(new Apple(this, appleCoord));
        this.objects.push(appleCoord);
        return
      }
    } while (true)
  }

  };

  Board.prototype.isEmpty = function (pos) {
    this.objects.forEach(function (el) {
      if (el.x === pos[0] && el.y === pos[1]) {
        return false
      }
    });
    return true;
  };

  var Apple = SnakeGame.Apple = function (board, coord) {
    this.board = board;
    this.coord = coord;
  }

}());