function Block() {
  this.x = 0;
  this.y = 0;

  this.move = function (direction) {
    switch (direction) {
      case 'Up':
        if (this.y != 0 && g.grid[this.x][this.y][1] == 0) {
          this.y--;
        }
        break;
      case 'Down':
        if (this.y != rows - 1 && g.grid[this.x][this.y][3] == 0) {
          this.y++;
        }
        break;
      case 'Left':
        if (this.x != 0 && g.grid[this.x][this.y][0] == 0) {
          this.x--;
        }
        break;
      case 'Right':
        if (this.x != columns - 1 && g.grid[this.x][this.y][2] == 0) {
          this.x++;
        }
        break;
    }
    if (this.x == columns - 1 && this.y == rows - 1) {
      won = true;
    }
  };

  this.draw = function () {
    ctx.fillStyle = '#FFD300';
    ctx.fillRect(
      this.x * scale + g.border,
      this.y * scale + g.border,
      scale - 2 * g.border,
      scale - 2 * g.border
    );
  };
}
