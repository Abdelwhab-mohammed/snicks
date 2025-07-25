
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const box = 20;

    let snake;
    let food;
    let direction;
    let score;
    let game;

    function initGame() {
      snake = [{x: 9 * box, y: 10 * box}];
      food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
      };
      direction = null;
      score = 0;
      document.getElementById('score').textContent = 'النقاط: ' + score;
      document.getElementById('restartBtn').style.display = 'none';
      clearInterval(game);
      game = setInterval(drawGame, 100);
    }

    document.addEventListener('keydown', changeDirection);

    function changeDirection(e) {
      if (e.keyCode == 37 && direction !== 'RIGHT') direction = 'LEFT';
      else if (e.keyCode == 38 && direction !== 'DOWN') direction = 'UP';
      else if (e.keyCode == 39 && direction !== 'LEFT') direction = 'RIGHT';
      else if (e.keyCode == 40 && direction !== 'UP') direction = 'DOWN';
    }

    function drawGame() {
      ctx.fillStyle = '#1a1231';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // رسم الثعبان
      for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? '#6be8c0' : '#a56eff';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = '#0f0b1e';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
      }

      // رسم الطعام
      ctx.fillStyle = '#ff6b6b';
      ctx.fillRect(food.x, food.y, box, box);

      // تحديث إحداثيات الرأس
      let snakeX = snake[0].x;
      let snakeY = snake[0].y;

      if (direction === 'LEFT') snakeX -= box;
      else if (direction === 'UP') snakeY -= box;
      else if (direction === 'RIGHT') snakeX += box;
      else if (direction === 'DOWN') snakeY += box;

      // أكل الطعام
      if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById('score').textContent = 'النقاط: ' + score;
        food = {
          x: Math.floor(Math.random() * 20) * box,
          y: Math.floor(Math.random() * 20) * box
        };
      } else {
        snake.pop();
      }

      // نهاية اللعبة
      let newHead = {x: snakeX, y: snakeY};

      if (
        snakeX < 0 || snakeY < 0 ||
        snakeX >= canvas.width || snakeY >= canvas.height ||
        collision(newHead, snake)
      ) {
        clearInterval(game);
        document.getElementById('restartBtn').style.display = 'inline-block';
        return;
      }

      snake.unshift(newHead);
    }

    function collision(head, body) {
      return body.some(segment => segment.x === head.x && segment.y === head.y);
    }

    function restartGame() {
      initGame();
    }

    // بدء اللعبة
    initGame();
