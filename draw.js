const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');
const scale = 60;

const rows = canvas.height / scale;
const columns = canvas.width / scale;

const g = new Grid();

var won = false;

(function setup() {
  g.init();
  g.draw();

  block = new Block();
  block.draw();
  ctx.fillStyle = '#E3242B';
  ctx.fillRect(
    (columns - 1) * scale + 8 * g.border,
    (rows - 1) * scale + 8 * g.border,
    scale - 16 * g.border,
    scale - 16 * g.border
  );

  window.setInterval(() => {
    if (won) {
      ctx.fillStyle = '#3e3e3e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '200px Comic Sans MS';
      ctx.fillStyle = 'red';
      ctx.textAlign = 'center';
      ctx.fillText('You Won!', canvas.width / 2, canvas.height / 2);
    }
  }, 100);
})();

window.addEventListener('keydown', (evt) => {
  if (!won) {
    const direction = evt.key.replace('Arrow', '');
    block.move(direction);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    g.draw();
    block.draw();
    ctx.fillStyle = '#E3242B';
    ctx.fillRect(
      (columns - 1) * scale + 8 * g.border,
      (rows - 1) * scale + 8 * g.border,
      scale - 16 * g.border,
      scale - 16 * g.border
    );
  }
});
