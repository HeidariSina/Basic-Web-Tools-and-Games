let players = {
  num: 2,
  liveNumber: 2,
  profiles: [],
  playersInfo: [
    {
      name: "Player",
      lives: 3,
      dice: [],
      profileNumber: 0,
      lastBet: { dice: 0, num: 0 },
    },
    {
      name: "A.I 1",
      lives: 3,
      dice: [],
      profileNumber: 0,
      lastBet: { dice: 0, num: 0 },
    },
  ],
};
let LastChoises = {
  turn: 0,
  num: 0,
  dice: 1,
};
let dices = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
};
function makeFirstPage() {
  let main = document.querySelector(".main");
  main.innerHTML = "";
  let div = document.createElement("div");
  div.className = "textbox";
  let h = document.createElement("h1");
  h.className = "h1";
  h.innerText = "Welcome To Liar's Dice";
  let button = document.createElement("button");
  button.className = "button";
  button.innerText = "Start New Game";
  button.addEventListener("click", newGame);
  div.appendChild(h);
  div.appendChild(button);
  main.appendChild(div);
}

function newGame() {
  let main = document.querySelector(".main");
  main.innerHTML = "";
  let div = document.createElement("div");
  div.className = "newGameBox";
  main.append(div);
  players = {
    num: 2,
    liveNumber: 2,
    profiles: [],
    playersInfo: [
      {
        name: "Player",
        lives: 3,
        dice: [],
        profileNumber: 0,
        lastBet: { dice: 0, num: 0 },
      },
      {
        name: "A.I 1",
        lives: 3,
        dice: [],
        profileNumber: 0,
        lastBet: { dice: 0, num: 0 },
      },
    ],
  };
  dices = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
  LastChoises = {
    turn: 0,
    num: 0,
    dice: 1,
  };
  makeProfile();
  addAllPlayers();
  addAllButtons();
}
function addNewPlayer() {
  players.num = players.num + 1;
  players.liveNumber = players.liveNumber + 1;
  let h;
  while (true) {
    h = Math.floor(Math.random() * 8);
    let s = players.profiles.indexOf(h);
    if (s < 0) {
      players.profiles.push(h);
      break;
    }
  }
  players.playersInfo.push({
    lives: 3,
    name: `A.I ${players.num - 1}`,
    profileNumber: h,
    dice: [],
    lastBet: { dice: 0, num: 0 },
  });
  addAllPlayers();
}

function addAllButtons() {
  let main = document.querySelector(".main");
  let div = document.createElement("div");
  div.className = "buttonBox";
  main.append(div);
  let Sbutton = document.createElement("button");
  Sbutton.className = "mainButton StartButton";
  Sbutton.innerText = "Start";
  Sbutton.addEventListener("click", startGame);
  div.append(Sbutton);
  let Cbutton = document.createElement("button");
  Cbutton.className = "mainButton CancleButton";
  Cbutton.innerText = "Cancle";
  Cbutton.addEventListener("click", makeFirstPage);
  div.append(Cbutton);
}

function addAllPlayers() {
  let main = document.querySelector(".newGameBox");
  main.innerHTML = "";
  for (let i = 0; i < players.num; i++) {
    if (i == 0) {
      addPlayerBox(i);
    } else {
      addPlayerBox(i);
    }
  }
  if (players.num < 6) {
    addNewPlayerBox();
  }
}
function addPlayerBox(index) {
  let main = document.querySelector(".newGameBox");
  let div = document.createElement("div");
  div.className = "box";
  let div3 = document.createElement("div");
  div3.className = "box2";
  div.appendChild(div3);
  let div4 = document.createElement("div");
  div4.className = "box3";
  div.appendChild(div4);
  let image = document.createElement("img");
  image.className = "pro";
  image.src = `./assets/profile/${players.playersInfo[index].profileNumber}.jpg`;
  div3.appendChild(image);
  let p = document.createElement("p");
  p.innerText = players.playersInfo[index].name;
  div4.appendChild(p);
  main.appendChild(div);
}

function addNewPlayerBox() {
  let main = document.querySelector(".newGameBox");
  let div = document.createElement("div");
  div.className = "box";
  let div2 = document.createElement("div");
  div2.className = "newPlayerBox";
  div.appendChild(div2);
  let button = document.createElement("button");
  button.className = "newplayerB";
  button.innerText = "+";
  let p = document.createElement("p");
  p.className = "newPlayerP";
  p.innerText = "Add New AI";
  div2.appendChild(button);
  div2.appendChild(p);
  div.addEventListener("click", addNewPlayer);
  main.append(div);
}

function makeProfile() {
  for (let i = 0; i < players.num; i++) {
    while (true) {
      let h = Math.floor(Math.random() * 8);
      let s = players.profiles.indexOf(h);
      if (s < 0) {
        players.profiles.push(h);
        players.playersInfo[i].profileNumber = h;
        break;
      }
    }
  }
}
function roll() {
  players.playerDices = new Array(players.num);
  for (let i = 0; i < players.num; i++) {
    let roll = new Array(5);
    if (players.playersInfo[i].lives > 0) {
      for (let j = 0; j < 5; j++) {
        let numm = Math.floor(Math.random() * 6 + 1);
        roll[j] = numm;
        switch (numm) {
          case 1:
            dices[1] = dices[1] + 1;
            break;
          case 2:
            dices[2] = dices[2] + 1;
            break;
          case 3:
            dices[3] = dices[3] + 1;
            break;
          case 4:
            dices[4] = dices[4] + 1;
            break;
          case 5:
            dices[5] = dices[5] + 1;
            break;
          case 6:
            dices[6] = dices[6] + 1;
            break;
        }
      }
    } else {
      roll = [0, 0, 0, 0, 0];
    }
    players.playersInfo[i].dice = roll;
  }
}

function startGame() {
  LastChoises = {
    turn: 0,
    num: 0,
    dice: 1,
  };
  let flag = 1;
  for (let i = 1; i < players.num; i++) {
    if (players.playersInfo[i].lives > 0) {
      flag = 0;
    }
  }
  if (flag == 1) {
    makeFirstSection();
    makeSecondSection();
    setTimeout(() => winner(), 1500);
  } else if (players.playersInfo[0].lives == 0) {
    makeFirstSection();
    makeSecondSection();
    setTimeout(() => loser(), 1500);
  } else {
    for (let i = 0; i < players.num; i++) {
      players.playersInfo[i].lastBet.dice = 0;
      players.playersInfo[i].lastBet.num = 0;
    }
    dices = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    roll();
    makeFirstPicker();
    makeFirstSection();
    makeSecondSection();
    if (LastChoises.turn != 0) {
      setTimeout(() => play(), 1000);
    }
  }
}

function makeFirstSection() {
  let main = document.querySelector(".main");
  main.innerHTML = "";

  let div = document.createElement("div");
  div.className = "playersBox";
  main.appendChild(div);

  let h2 = document.createElement("h2");
  h2.className = "h2";
  h2.innerText = `Turn: ${players.playersInfo[LastChoises.turn].name}`;
  div.appendChild(h2);
  makeAllcards();
  makePlayersButton();
}

function makePlayersButton() {
  let main = document.querySelector(".playersBox");
  let div = document.createElement("div");
  div.className = "playerButtonBox";
  main.appendChild(div);
  let div2 = document.createElement("div");
  div2.innerText = "Dice: ";
  div.appendChild(div2);
  let in1 = document.createElement("input");
  in1.type = "number";
  in1.name = "dice";
  in1.id = "dice";
  in1.min = 1;
  in1.max = 6;
  in1.value = LastChoises.dice;
  div2.appendChild(in1);
  let div3 = document.createElement("div");
  div3.innerText = "Number: ";
  div.appendChild(div3);
  let in2 = document.createElement("input");
  in2.type = "number";
  in2.name = "num";
  in2.id = "num";
  in2.value = LastChoises.num;
  if (LastChoises.num == 0) in2.min = 1;
  else in2.min = LastChoises.num;
  div3.appendChild(in2);
  let sButton = document.createElement("button");
  sButton.innerHTML = "Submit";
  sButton.className = "playerButton";
  sButton.addEventListener("click", playerSubmit);
  if (LastChoises.turn == 0) sButton.disabled = false;
  else sButton.disabled = true;
  div.appendChild(sButton);
  let lButton = document.createElement("button");
  lButton.innerHTML = "Lie";
  lButton.className = "playerButton";
  lButton.addEventListener("click", () => LIE(0));
  if (LastChoises.turn == 0) lButton.disabled = false;
  else lButton.disabled = true;
  div.appendChild(lButton);
  let fButton = document.createElement("button");
  fButton.innerHTML = "FOLD";
  fButton.className = "foldButton";
  fButton.addEventListener("click", FOLD);
  div.appendChild(fButton);
}

function makeAllcards() {
  let main = document.querySelector(".playersBox");
  let div = document.createElement("div");
  div.className = "playerCards";
  main.appendChild(div);
  for (let j = 0; j < players.num; j++) {
    makeCards(j);
  }
}

function makeCards(index) {
  let main = document.querySelector(".playerCards");
  let div = document.createElement("div");
  div.className = "card";
  if (players.playersInfo[index].lives == 0) {
    div.style = "border-color : #FF0000; box-shadow: 0px 0px 5px #FF0000";
  }
  let image = document.createElement("img");
  image.className = "icon";
  image.src = `./assets/profile/${players.playersInfo[index].profileNumber}.jpg`;
  div.appendChild(image);
  let p = document.createElement("p");
  p.innerText = players.playersInfo[index].name;
  div.appendChild(p);
  let div2 = document.createElement("div");
  div2.className = "healthBar";
  div.appendChild(div2);
  for (let j = 0; j < 3; j++) {
    let Himage = document.createElement("img");
    Himage.className = "hearthIcon";
    if (players.playersInfo[index].lives >= j + 1) {
      Himage.src = "./assets/hearth/full.svg";
    } else {
      Himage.src = "./assets/hearth/lost.svg";
    }
    div2.appendChild(Himage);
  }
  let p2 = document.createElement("p");
  p2.innerText = "Last Bet:";
  div.appendChild(p2);
  if (players.playersInfo[index].lives == 0) {
    let p2 = document.createElement("p");
    p2.innerText = "FOLD";
    p2.style = "color: #FF0000";
    p2.className = "hhh";
    div.appendChild(p2);
  } else if (players.playersInfo[index].lastBet.num == 0) {
    let p2 = document.createElement("p");
    p2.innerText = "Nothing";
    p2.className = "hhh";
    div.appendChild(p2);
  } else {
    let div2 = document.createElement("div");
    div2.className = "LastBet";
    div.appendChild(div2);

    let p2 = document.createElement("p");
    p2.innerText = `${players.playersInfo[index].lastBet.num} X`;
    div2.appendChild(p2);

    let image = document.createElement("img");
    image.className = "diceIcon";
    image.src = `./assets/dice/dice${players.playersInfo[index].lastBet.dice}.png`;
    div2.appendChild(image);
  }
  main.appendChild(div);
}

function makeSecondSection() {
  let main = document.querySelector(".main");
  let div = document.createElement("div");
  div.className = "playerDiceBox";
  main.append(div);
  let p = document.createElement("p");
  p.className = "dicePText";
  p.innerText = "Your Dices:";
  div.append(p);
  let div2 = document.createElement("div");
  div2.className = "diceImageDiv";
  div.append(div2);
  for (let i = 0; i < 5; i++) {
    let image = document.createElement("img");
    image.className = "diceImage";
    image.src = `./assets/dice/dice${players.playersInfo[0].dice[i]}.png`;
    div2.append(image);
  }
}

function makeFirstPicker() {
  while (true) {
    let numm = Math.floor(Math.random() * players.num);
    LastChoises.turn = numm;
    if (players.playersInfo[numm].lives > 0) {
      break;
    }
  }
}

function changeTurn() {
  while (true) {
    LastChoises.turn = LastChoises.turn + 1;
    if (LastChoises.turn == players.num) {
      LastChoises.turn = 0;
    }
    if (players.playersInfo[LastChoises.turn].lives > 0) {
      break;
    }
  }
  makeFirstSection();
  makeSecondSection();
  let audio = new Audio("./assets/Audio/turn.mp3");
  audio.play();
  setTimeout(() => play(), 1500);
}

function play() {
  if (LastChoises.turn != 0) {
    let random = Math.random();
    let botNum;
    let botDice;
    if (LastChoises.num >= players.num * 5) {
      LIE(LastChoises.turn);
    } else if (LastChoises.num < players.num * 1) {
      if (random > 0.666) {
        botNum = 2;
      } else if (random > 0.333) {
        botNum = 1;
      } else {
        botNum = 0;
        if (LastChoises.num == 0) {
          botNum = 1;
        }
      }
      if (botNum == 0) {
        if (LastChoises.dice == 6) {
          botNum = 1;
          botDice = Math.floor(Math.random() * 6 + 1);
        } else {
          botDice = makeRandomNumber(LastChoises.dice);
        }
      } else {
        botDice = Math.floor(Math.random() * 6 + 1);
      }
      LastChoises.dice = botDice;
      LastChoises.num = LastChoises.num + botNum;
      players.playersInfo[LastChoises.turn].lastBet.dice = botDice;
      players.playersInfo[LastChoises.turn].lastBet.num = LastChoises.num;
      changeTurn();
    } else if (LastChoises.num < players.liveNumber * 1.5) {
      if (random > 0.85) {
        botNum = 2;
      } else if (random > 0.42) {
        botNum = 1;
      } else {
        botNum = 0;
      }
      if (botNum == 0) {
        if (LastChoises.dice == 6) {
          botNum = 1;
          botDice = Math.floor(Math.random() * 6 + 1);
        } else {
          botDice = makeRandomNumber(LastChoises.dice);
        }
      } else {
        botDice = Math.floor(Math.random() * 6 + 1);
      }
      LastChoises.dice = botDice;
      LastChoises.num = LastChoises.num + botNum;
      players.playersInfo[LastChoises.turn].lastBet.dice = botDice;
      players.playersInfo[LastChoises.turn].lastBet.num = LastChoises.num;
      changeTurn();
    } else if (LastChoises.num < players.liveNumber * 1.75) {
      if (random > 0.05) {
        if (random > 0.85) {
          botNum = 2;
        } else if (random > 0.55) {
          botNum = 1;
        } else {
          botNum = 0;
        }
        if (botNum == 0) {
          if (LastChoises.dice == 6) {
            botNum = 1;
            botDice = Math.floor(Math.random() * 6 + 1);
          } else {
            botDice = makeRandomNumber(LastChoises.dice);
          }
        } else {
          botDice = Math.floor(Math.random() * 6 + 1);
        }
        LastChoises.dice = botDice;
        LastChoises.num = LastChoises.num + botNum;
        players.playersInfo[LastChoises.turn].lastBet.dice = botDice;
        players.playersInfo[LastChoises.turn].lastBet.num = LastChoises.num;
        changeTurn();
      } else {
        LIE(LastChoises.turn);
      }
    } else if (LastChoises.num < players.liveNumber * 2) {
      if (random > 0.1) {
        if (random > 0.95) {
          botNum = 2;
        } else if (random > 0.55) {
          botNum = 1;
        } else {
          botNum = 0;
        }
        if (botNum == 0) {
          if (LastChoises.dice == 6) {
            botNum = 1;
            botDice = Math.floor(Math.random() * 6 + 1);
          } else {
            botDice = makeRandomNumber(LastChoises.dice);
          }
        } else {
          botDice = Math.floor(Math.random() * 6 + 1);
        }
        LastChoises.dice = botDice;
        LastChoises.num = LastChoises.num + botNum;
        players.playersInfo[LastChoises.turn].lastBet.dice = botDice;
        players.playersInfo[LastChoises.turn].lastBet.num = LastChoises.num;
        changeTurn();
      } else {
        LIE(LastChoises.turn);
      }
    } else if (LastChoises.num < players.liveNumber * 2.5) {
      if (random > 0.2) {
        if (random > 0.7) {
          botNum = 1;
        } else {
          botNum = 0;
        }
        if (botNum == 0) {
          if (LastChoises.dice == 6) {
            botNum = 1;
            botDice = Math.floor(Math.random() * 6 + 1);
          } else {
            botDice = makeRandomNumber(LastChoises.dice);
          }
        } else {
          botDice = Math.floor(Math.random() * 6 + 1);
        }
        LastChoises.dice = botDice;
        LastChoises.num = LastChoises.num + botNum;
        players.playersInfo[LastChoises.turn].lastBet.dice = botDice;
        players.playersInfo[LastChoises.turn].lastBet.num = LastChoises.num;
        changeTurn();
      } else {
        LIE(LastChoises.turn);
      }
    } else if (LastChoises.num < players.liveNumber * 2.75) {
      if (random > 0.35) {
        if (random > 0.7) {
          botNum = 1;
        } else {
          botNum = 0;
        }
        if (botNum == 0) {
          if (LastChoises.dice == 6) {
            botNum = 1;
            botDice = Math.floor(Math.random() * 6 + 1);
          } else {
            botDice = makeRandomNumber(LastChoises.dice);
          }
        } else {
          botDice = Math.floor(Math.random() * 6 + 1);
        }
        LastChoises.dice = botDice;
        LastChoises.num = LastChoises.num + botNum;
        players.playersInfo[LastChoises.turn].lastBet.dice = botDice;
        players.playersInfo[LastChoises.turn].lastBet.num = LastChoises.num;
        changeTurn();
      } else {
        LIE(LastChoises.turn);
      }
    } else if (LastChoises.num < players.liveNumber * 3) {
      if (random > 0.5) {
        if (random > 0.9) {
          botNum = 1;
        } else {
          botNum = 0;
        }
        if (botNum == 0) {
          if (LastChoises.dice == 6) {
            botNum = 1;
            botDice = Math.floor(Math.random() * 6 + 1);
          } else {
            botDice = makeRandomNumber(LastChoises.dice);
          }
        } else {
          botDice = Math.floor(Math.random() * 6 + 1);
        }
        LastChoises.dice = botDice;
        LastChoises.num = LastChoises.num + botNum;
        players.playersInfo[LastChoises.turn].lastBet.dice = botDice;
        players.playersInfo[LastChoises.turn].lastBet.num = LastChoises.num;
        changeTurn();
      } else {
        LIE(LastChoises.turn);
      }
    } else if (LastChoises.num < players.liveNumber * 3.2) {
      if (random > 0.8) {
        if (random > 0.95) {
          botNum = 1;
        } else {
          botNum = 0;
        }
        if (botNum == 0) {
          if (LastChoises.dice == 6) {
            botNum = 1;
            botDice = Math.floor(Math.random() * 6 + 1);
          } else {
            botDice = makeRandomNumber(LastChoises.dice);
          }
        } else {
          botDice = Math.floor(Math.random() * 6 + 1);
        }
        LastChoises.dice = botDice;
        LastChoises.num = LastChoises.num + botNum;
        changeTurn();
      } else {
        LIE(LastChoises.turn);
      }
    } else if (LastChoises.num < players.liveNumber * 3.4) {
      if (random > 0.9) {
        if (random > 0.98) {
          botNum = 1;
        } else {
          botNum = 0;
        }
        if (botNum == 0) {
          if (LastChoises.dice == 6) {
            botNum = 1;
            botDice = Math.floor(Math.random() * 6 + 1);
          } else {
            botDice = makeRandomNumber(LastChoises.dice);
          }
        } else {
          botDice = Math.floor(Math.random() * 6 + 1);
        }
        LastChoises.dice = botDice;
        LastChoises.num = LastChoises.num + botNum;
        players.playersInfo[LastChoises.turn].lastBet.dice = botDice;
        players.playersInfo[LastChoises.turn].lastBet.num = LastChoises.num;
        changeTurn();
      } else {
        LIE(LastChoises.turn);
      }
    } else {
      if (random > 0.95) {
        if (random > 0.995) {
          botNum = 1;
        } else {
          botNum = 0;
        }
        if (botNum == 0) {
          if (LastChoises.dice == 6) {
            botNum = 1;
            botDice = Math.floor(Math.random() * 6 + 1);
          } else {
            botDice = makeRandomNumber(LastChoises.dice);
          }
        } else {
          botDice = Math.floor(Math.random() * 6 + 1);
        }
        LastChoises.dice = botDice;
        LastChoises.num = LastChoises.num + botNum;
        players.playersInfo[LastChoises.turn].lastBet.dice = botDice;
        players.playersInfo[LastChoises.turn].lastBet.num = LastChoises.num;
        changeTurn();
      } else {
        LIE(LastChoises.turn);
      }
    }
  }
}

function LIE(i1) {
  let t = i1 - 1;
  if (i1 == 0) {
    t = players.num - 1;
  }
  while (true) {
    if (players.playersInfo[t].lives > 0) {
      break;
    }
    t = t - 1;
  }
  let temp = t;
  if (LastChoises.num > dices[LastChoises.dice]) {
    temp = i1;
  }
  alert(`
  ${players.playersInfo[i1].name} LIED ${players.playersInfo[t].name}
  winner : ${players.playersInfo[temp].name}
  Bet Dice : ${LastChoises.dice}
  Bet Number : ${LastChoises.num}
  Real Number : ${dices[LastChoises.dice]}
  `);

  if (temp == i1) {
    players.playersInfo[t].lives -= 1;
    if (players.playersInfo[t].lives == 0)
      players.liveNumber = players.liveNumber - 1;
  } else {
    players.playersInfo[i1].lives -= 1;
    if (players.playersInfo[i1].lives == 0)
      players.liveNumber = players.liveNumber - 1;
  }
  LastChoises = {
    turn: 0,
    num: 0,
    dice: 1,
  };
  startGame();
}

function FOLD() {
  if (confirm("You Want to FOLD?") == true) {
    makeFirstPage();
  }
}

function playerSubmit() {
  let diceVal = document.querySelector("#dice").value;
  let numVal = document.querySelector("#num").value;
  if (diceVal > 6 || diceVal < 1) {
    alert("Wrong Range Of Dice");
  } else if (
    (diceVal <= LastChoises.dice && numVal <= LastChoises.num) ||
    numVal < LastChoises.num
  ) {
    alert("You Picked Incorect Number or Dice");
  } else {
    LastChoises.num = parseInt(numVal);
    LastChoises.dice = parseInt(diceVal);
    players.playersInfo[0].lastBet.dice = parseInt(diceVal);
    players.playersInfo[0].lastBet.num = parseInt(numVal);
    changeTurn();
  }
}
function loser() {
  let main = document.querySelector(".main");
  main.innerHTML = "";
  let div = document.createElement("div");
  div.className = "finalDiv";
  main.appendChild(div);
  let p = document.createElement("p");
  p.className = "lostP";
  p.innerText = "You Lost!";
  div.appendChild(p);
  let button = document.createElement("button");
  button.className = "lostButton";
  button.innerText = "Try Again?";
  button.addEventListener("click", newGame);
  div.appendChild(button);
  let audio = new Audio("./assets/Audio/lost.mp3");
  audio.play();
}
function winner() {
  let main = document.querySelector(".main");
  main.innerHTML = "";
  let div = document.createElement("div");
  div.className = "finalDiv";
  main.appendChild(div);
  let p = document.createElement("p");
  p.className = "winP";
  p.innerText = "You Win!";
  div.appendChild(p);
  let button = document.createElement("button");
  button.className = "winButton";
  button.innerText = "Try Again?";
  button.addEventListener("click", newGame);
  div.appendChild(button);
  let audio = new Audio("./assets/Audio/win.mp3");
  audio.play();
}

function makeRandomNumber(min) {
  random = Math.random();
  if (min == 1) {
    if (random < 0.2) return 2;
    else if (random < 0.4) return 3;
    else if (random < 0.2) return 4;
    else if (random < 0.8) return 5;
    else return 6;
  }
  if (min == 2) {
    if (random < 0.25) return 3;
    else if (random < 0.5) return 4;
    else if (random < 0.75) return 5;
    else return 6;
  }
  if (min == 3) {
    if (random < 0.3333) return 4;
    else if (random < 0.6666) return 5;
    else return 6;
  }
  if (min == 4) {
    if (random < 0.5) return 5;
    else return 6;
  }
  if (min == 5) {
    return 6;
  }
}
makeFirstPage();
