const grid = 50;
const mind = [{
  thinking: false
  , dirY: 5
  , dirX: 1
  , count: 0
}, {
  thinking: false
  , dirY: 5
  , dirX: 1
  , count: 0
}];
const canvas = document.createElement('canvas');
canvas.setAttribute('width', grid * 20);
canvas.setAttribute('height', grid * 15);
document.body.prepend(canvas);
canvas.style.border = '1px solid black';
const ctx = canvas.getContext('2d');
const div1 = document.createElement('div');
document.body.prepend(div1);
const btn1 = document.createElement('button');
btn1.textContent = 'Turn On Player 2';
div1.append(btn1);
btn1.style.backgroundColor = 'red';
btn1.style.color = 'white';
btn1.style.padding = '10px';
btn1.addEventListener('click', (e) => {
  canvas.focus();
  ////console.log(mind);
  //btn.style.display = 'none';
  if (!mind[1].thinking) {
    mind[1].thinking = true;
    btn1.textContent = 'Turn Off Player 2';
    btn1.style.backgroundColor = 'green';
  }
  else {
    mind[1].thinking = false;
    btn1.textContent = 'Turn On Player 2';
    btn1.style.backgroundColor = 'red';
  }
})
const btn = document.createElement('button');
btn.textContent = 'Turn On Player 1';
div1.prepend(btn);
btn.style.backgroundColor = 'blue';
btn.style.color = 'white';
btn.style.padding = '10px';
btn.addEventListener('click', (e) => {
  ////console.log(mind);
  //btn.style.display = 'none';
  canvas.focus();
  if (!mind[0].thinking) {
    mind[0].thinking = true;
    btn.textContent = 'Turn Off Player 1';
    btn.style.backgroundColor = 'green';
  }
  else {
    mind[0].thinking = false;
    btn.textContent = 'Turn On Player 1';
    btn.style.backgroundColor = 'blue';
  }
})
const players = [{
  color: 'red'
  , pos: canvas.width / 2 + (canvas.width / 4)
}, {
  color: 'blue'
  , pos: canvas.width / 4
}];
const game = {
  req: ''
  , bullets: []
  , bulletSpeed: 10
};
const keyz = {
  ArrowLeft: false
  , ArrowRight: false
  , ArrowUp: false
  , ArrowDown: false
  , KeyA: false
  , KeyS: false
  , KeyD: false
  , KeyW: false
};
canvas.addEventListener('click', startGame);

function startGame() {
  cancelAnimationFrame(game.req);
  players.forEach((player, inde) => {
    player.indexVal = inde;
    player.score = 0;
    player.cooldown = 100;
    player.speed = Math.ceil(grid / 8);
    player.size = grid / 2 + 5;
    player.y = canvas.height / 2;
    let val = inde
    let temp;
    if (inde == 0) {
      temp = (grid * 4);
    }
    else {
      temp = -(grid * 4);
    }
    player.x = canvas.width / 2 + temp;
  })
  game.req = requestAnimationFrame(draw);
}
document.addEventListener('keydown', (e) => {
  if (e.code in keyz) {
    keyz[e.code] = true;
  }
  if (e.code == 'Space' && players[0].cooldown <= 0) {
    players[0].cooldown = 20;
    game.bullets.push({
      x: players[0].x - players[0].size - 15
      , y: players[0].y - 5
      , speed: -game.bulletSpeed
      , size: 10
      , color: 'pink'
    })
  }
  if (e.code == 'KeyF' && players[1].cooldown <= 0) {
    players[1].cooldown = 20;
    game.bullets.push({
      x: players[1].x + players[1].size + 15
      , y: players[1].y - 5
      , speed: game.bulletSpeed
      , size: 10
      , color: 'lightblue'
    })
  }
})
document.addEventListener('keyup', (e) => {
  if (e.code in keyz) {
    keyz[e.code] = false;
  }
})

function colDec(a, b) {
  return a.x < b.x + b.size && a.x + a.size * 2 > b.x && a.y < b.y - b.size + b.size * 2 && a.y + a.size > b.y - b.size;
}

function moveMind(mind, player) {
  let shootTime = Math.floor(Math.random() * 5);
  let adj1 = (player.indexVal === 0) ? -1 : 1;
  if (shootTime == 1 && player.cooldown <= 0) {
    player.cooldown = Math.floor(Math.random() * 20) + 9;
    game.bullets.push({
      x: player.x + (player.size + 15) * adj1
      , y: player.y - 5
      , speed: game.bulletSpeed * adj1
      , size: 10
      , color: 'lightblue'
    })
  }
  if (mind.count > 0) {
    mind.count--;
  }
  else {
    let val = Math.floor(Math.random() * 20);
    let valX = Math.floor(Math.random() * 7);
    let valY = Math.floor(Math.random() * 2) + 3;
    if (valX == 1) {
      mind.dirX = -1;
    }
    else if (valX == 2) {
      mind.dirX = 1;
    }
    else {
      mind.dirX = 0;
    }
    mind.count = 30;
    let oppVal = (player.indexVal === 0) ? 1 : 0;
    if (player.y + val < players[oppVal].y) {
      mind.dirY = valY;
    }
    else if (player.y + val > players[oppVal].y) {
      mind.dirY = -valY;
    }
    /// incoming bullet check
    game.bullets.forEach((bull, index) => {
      if (bull.speed < 0 && player.indexVal === 1) {
        console.log('incoming moving Left ' + bull.speed + ' ' + player.indexVal + ' ' + bull.x);
        mind.count = 40;
        if (bull.y <= player.y) {
          mind.dirY = -valY;
        }
        else {
          mind.dirY = valY;
        }
      }
      if (bull.speed > 0 && player.indexVal === 0) {
        console.log('incoming moving Right ' + bull.speed + ' ' + player.indexVal);
        mind.count = 40;
        if (bull.y <= player.y) {
          mind.dirY = -valY;
        }
        else {
          mind.dirY = valY;
        }
      }
    })
  }
  if (!(player.y > (player.size / 2) && player.y - (player.size) < canvas.height)) {
    mind.dirY *= -1;
    mind.count = 0;
  }
  if (!(player.x > (player.size / 2) && player.x - (player.size) < canvas.width / 2 - player.size)) {
    mind.dirX *= -1;
  }
  player.y += mind.dirY;
  player.x += mind.dirX;
}

function movementPlayer() {
  if (mind[0].thinking) {
    moveMind(mind[0], players[1]);
  }
  if (mind[1].thinking) {
    moveMind(mind[1], players[0]);
  }
  if (keyz['ArrowLeft'] && players[0].x > canvas.width / 2 + players[0].size) {
    players[0].x -= players[0].speed;
  }
  if (keyz['ArrowRight'] && players[0].x < canvas.width - players[0].size) {
    players[0].x += players[0].speed;
  }
  if (keyz['ArrowUp'] && players[0].y > players[0].size) {
    players[0].y -= players[0].speed;
  };
  if (keyz['ArrowDown'] && players[0].y < canvas.height - players[0].size) {
    players[0].y += players[0].speed;
  };
  if (keyz['KeyA'] && players[1].x > players[1].size) {
    players[1].x -= players[1].speed;
  }
  if (keyz['KeyD'] && players[1].x < canvas.width / 2 - players[1].size) {
    players[1].x += players[1].speed;
  }
  if (keyz['KeyW'] && players[1].y > players[1].size) {
    players[1].y -= players[1].speed;
  };
  if (keyz['KeyS'] && players[1].y < canvas.height - players[1].size) {
    players[1].y += players[1].speed;
  };
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movementPlayer();
  game.bullets.forEach((bull, index) => {
    ctx.fillStyle = bull.color;
    ctx.fillRect(bull.x + (bull.size / 2), bull.y, bull.size, bull.size);
    bull.x += bull.speed;
    if (bull.x < 0 || bull.x > canvas.width) {
      game.bullets.splice(index, 1);
    }
    players.forEach((player, i) => {
      if (colDec(bull, player)) {
        ////console.log('HIT Player ' + player.color + ' ' + i);
        if (i == 0) {
          players[1].score++;
        }
        else {
          players[0].score++;
        }
        game.bullets.splice(index, 1);
      }
    })
  })
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  players.forEach((player) => {
    if (player.cooldown > 0) {
      player.cooldown--;
    }
    ctx.fillStyle = player.color;
    ctx.font = grid + 'px serif';
    ctx.textAlign = 'center';
    ctx.fillText('Score:' + player.score, player.pos, grid);
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
  })
  game.req = requestAnimationFrame(draw);
}