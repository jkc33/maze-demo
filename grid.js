function Grid() {
  this.grid = [];
  this.border = 2;
  this.vis = [];
  this.stack = [];
  this.mv = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];

  this.getRandomInt = function (max) {
    return Math.floor(Math.random() * max);
  };

  this.valid = function (x, y) {
    if (!(x >= 0 && x < columns && y >= 0 && y < rows)) {
      return false;
    }
    if (this.vis[x][y]) {
      return false;
    }
    return true;
  };

  this.init = function () {
    for (let i = 0; i < columns; i++) {
      this.grid.push([]);
      for (let j = 0; j < rows; j++) {
        this.grid[i].push([1, 1, 1, 1]);
      }
    }
    for (let i = 0; i < columns; i++) {
      this.vis.push([]);
      for (let j = 0; j < rows; j++) {
        this.vis[i].push(false);
      }
    }
    this.vis[0][0] = true;
    this.stack.push({ x: 0, y: 0 });
    while (this.stack.length != 0) {
      cur = this.stack.pop();
      validDir = [];
      for (let i = 0; i < 4; i++) {
        if (this.valid(cur.x + this.mv[i][0], cur.y + this.mv[i][1])) {
          validDir.push(i);
        }
      }
      if (validDir.length != 0) {
        this.stack.push(cur);
        rand = validDir[this.getRandomInt(validDir.length)];
        this.grid[cur.x][cur.y][rand] = 0;
        newX = cur.x + this.mv[rand][0];
        newY = cur.y + this.mv[rand][1];
        this.grid[newX][newY][(rand + 2) % 4] = 0;
        this.vis[newX][newY] = true;
        this.stack.push({ x: newX, y: newY });
      }
    }
  };

  this.draw = function () {
    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        ctx.fillStyle = '#3e3e3e';
        ctx.fillRect(
          scale * i + this.border,
          scale * j + this.border,
          scale - 2 * this.border,
          scale - 2 * this.border
        );
        if (this.grid[i][j][0] == 0) {
          ctx.fillRect(
            scale * i,
            scale * j + this.border,
            2,
            scale - 2 * this.border
          );
        }
        if (this.grid[i][j][2] == 0) {
          ctx.fillRect(
            scale * (i + 1) - this.border,
            scale * j + this.border,
            2,
            scale - 2 * this.border
          );
        }
        if (this.grid[i][j][1] == 0) {
          ctx.fillRect(
            scale * i + this.border,
            scale * j,
            scale - 2 * this.border,
            2
          );
        }
        if (this.grid[i][j][3] == 0) {
          ctx.fillRect(
            scale * i + this.border,
            scale * (j + 1) - this.border,
            scale - 2 * this.border,
            2
          );
        }
      }
    }
  };
}
