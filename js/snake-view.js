(function () {
  if (typeof SnakeGame === "undefined") {
    SnakeGame = {};
  }

  var View = SnakeGame.View = function ($el) {
    this.board = new SnakeGame.Board(20);
    this.$el = $el;
    this.bindEvent();
    this.run();
  };

  View.prototype.bindEvent = function () {
    var that = this;
    $('body').on('keydown', function (event) {
      that.board.snake.turn(View.KEYS[event.keyCode])
    })
  };

  View.prototype.run = function () {
    var that = this;
    setInterval(function () {
      var appleness = Math.floor(Math.random() + 0.1) >= 1;
      that.board.spawnApple(appleness);
      that.board.snake.move();
      that.board.update();
      that.render();
    }, 250);
  };

  View.prototype.render = function () {
    // this.$el.text(this.board.render());
    var $game = $('.game');
    $game.empty();
    for (var i = 0; i < this.board.size; i++) {
      $game.append("<div class='row group' data-id='" + i + "'></div>")
      for (var j = 0; j < this.board.size; j++) {
        if (this.board.snake.isHead([j,i])) {
          $game.children().last().append(
            "<div class='cell snake head' data-id='" + j + "'>" +
            "<img class='snakehead' src='../css/Solid_Snake2.png'></div>"
          );
        } else if (this.board.snake.containsPos([j,i])) {
          $game.children().last().append(
            "<div class='cell snake' data-id='" + j + "'></div>"
          );
        } else if (this.board.hasApple([j,i])) {
          $game.children().last().append(
            "<div class='cell apple' data-id='" + j + "'>" +
            "<img class= 'box' src='../css/cardboard-box-icon.jpg' ></div>"
          );
        } else {
        $game.children().last().append(
          "<div class='cell' data-id='" + j + "'></div>"
        );
        }
      }
    }
  };

  View.KEYS = {
    37: "w",
    38: "n",
    39: "e",
    40: "s"
  };

})();