
function on_user_input(data) {
    // TODO

    if ( mode === 3 ) { // menu
        if (player === 1) {
          if(data.keyCode == 74) { // j
            charSelect.selectors.p2--;
            if(charSelect.selectors.p2 < 1) {
              charSelect.selectors.p2 = 1;
            }
          }
          if(data.keyCode == 76) { // l
            charSelect.selectors.p2++;
            if(charSelect.selectors.p2 > 5) {
              charSelect.selectors.p2 = 1;
            }
          }
        }
        else {
          if(data.keyCode == 68) { // d
            charSelect.selectors.p1++;
            if(charSelect.selectors.p1 > 5) {
              charSelect.selectors.p1 = 1;
            }
          }
          if(data.keyCode == 65) { // a
            charSelect.selectors.p1--;
            if(charSelect.selectors.p1 < 1) {
              charSelect.selectors.p1 = 1;
            }
          }
        }
      }
      else if ( mode === 5 ) { // in game
        if (player === 1) {
          let p2 = arenaState.p2
          let xPrev = p2.x;
          // can only move if you aren't attacking
          if(!p2.state) {
              // j - move left
              if(keyIsDown(74)) {
                  p2.currAnimation = "run";
                  p2.x -= p2.speed;
              }
  
              // l - move right
              if (keyIsDown(76)) {
                  p2.currAnimation = "run";
                  p2.x += p2.speed;
              }
  
              // based on velocity, change animation and direction
              if(xPrev == p2.x) {
                  p2.currAnimation = "idle";
              } else if(xPrev > p2.x) {
                  p2.direction = 1;
              } else {
                  p2.direction = 0;
              }
  
              // i - jump
              if(keyIsDown(73)) {
                  if(!p2.jumping) {
                      p2.jumping = true;
                  }
              }
              // u - basic attack
              if(keyIsDown(85)) {
                  p2.state = "basicAttack";
              }
  
              // o - heavy attack
              if(keyIsDown(79)) {
                  p2.state = "heavyAttack";
              }
  
              // y - special attack
              if(keyIsDown(89)) {
                  p2.state = "specialAttack";
              }
          }
        }
        else {
          let p1 = arenaState.p1;
  
          let xPrev = p1.x;
          // can only move if you aren't attacking
          if(!p1.state) {
              // a - move left
              if(keyIsDown(65)) {
                  p1.currAnimation = "run";
                  p1.x -= p1.speed;
              }
              // d - move right
              if (keyIsDown(68)) {
                  p1.currAnimation = "run";
                  p1.x += p1.speed;
              }
              
              // based on velocity, change animation and direction
              if(xPrev == p1.x) {
                  p1.currAnimation = "idle";
              } else if(xPrev > p1.x) {
                  p1.direction = 1;
              } else {
                  p1.direction = 0;
              }
              
              // w - jump
              if(keyIsDown(87)) {
                  if(!p1.jumping) {
                      p1.jumping = true;
                  }
              }
              // e - basic attack
              if(keyIsDown(69)) {
                  p1.state = "basicAttack";
              }
              
              // q - heavy attack
              if(keyIsDown(81)) {
                  p1.state = "heavyAttack";
              }
              
              // r - special attack
              if(keyIsDown(82)) {
                  p1.state = "specialAttack";
              }
          }
        }
      }
}

function update_games(games_in) {
        // TODO
        games = games_in;

        if ( inGame && waitingForOther ) {
          if ( games[roomCode].user1 && games[roomCode].user2 ) {
            waitingForOther = false;
            mode++;
          }
        }
}

function joinRoom() {
    roomCode = document.getElementById('join_code');
    socket.emit('join_game', { code: roomCode });
    inGame = true;
    waitingForOther = true;
    player = 2;
}
  
function createRoom() {
    roomCode = document.getElementById('create_game_code');
    socket.emit('create_game', { code: roomCode });
    inGame = true;
    waitingForOther = true;
    player = 1;
}