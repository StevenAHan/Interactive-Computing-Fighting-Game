// Home Screen Vars
let backgroundImage;
let backgroundOffset = 0;
let foregroundImage;
let foregroundOffset = 0;
let opacity = 0;
let opacityDirection = 1;
let arenaImage;
let titleVideo;
let titleScreenOpacity = 0;
let titleScreenOpacityDirection = 1;
let mode = 0; // FOR TESTING
let isPlaying = false; // Initialize isPlaying
let backgroundMusic;
let instruction = false;

// Game Vars to Keep Track of Game State
let projectiles = [];

// char select data
let charSelect = {};

// arena state
let arenaState = {};

// Arena Vars
let kitsuneIdle, kitsuneRun, kitsuneJump, 
  kitsuneBasicAttack, kitsuneHeavyAttack, kitsuneSpecialAttack,
  kitsuneHurt, kitsuneDeath, kitsuneBlock, kitsuneWalk, kitsuneFireball;
let testCharAnimations;
let theParticles = [];
let kitsune;
let ground = 600;

function preload() {
  // Load the background images
  backgroundImage = loadImage("./assets/environments/char_background.png");
  foregroundImage = loadImage("./assets/environments/foreground.png");
  arenaImage = loadImage("./assets/environments/game_background_1.png")
  // backgroundMusic = loadSound("./assets/environments/background_music.mp3");

  //Test Kitsune Animations
  kitsuneIdle = loadImage("./assets/characters/Kitsune/Idle.png");
  kitsuneRun = loadImage("./assets/characters/Kitsune/Run.png");
  kitsuneJump = loadImage("./assets/characters/Kitsune/Jump.png");
  kitsuneBasicAttack = loadImage("./assets/characters/Kitsune/Attack_1.png");
  kitsuneHeavyAttack = loadImage("./assets/characters/Kitsune/Attack_2.png");
  kitsuneSpecialAttack = loadImage("./assets/characters/Kitsune/Attack_3.png");
  kitsuneHurt = loadImage("./assets/characters/Kitsune/Hurt.png");
  kitsuneDeath = loadImage("./assets/characters/Kitsune/Dead.png");
  kitsuneBlock = loadImage("./assets/characters/Kitsune/Fire_1.png");
  kitsuneWalk = loadImage("./assets/characters/Kitsune/Walk.png");
  kitsuneFireball = loadImage("./assets/characters/Kitsune/Fire_1_cropped.png");
}

function setup() {
  createCanvas(1200, 800);
  background(0);
  
  // Initializing Kitsune
  kitsune = new Kitsune("Kitsune", 250, ground, 0, null);
  kitsune.setup();

  // init charselect
  charSelectSetup(charSelect);
}


function draw() {
    imageMode(CENTER);
    background(0);
    if (mode === 0) {
      warning();
    } else if (mode === 1) {
      titleScreen();
    } else if (mode === 2) {
      menu();
    } else if (mode === 3) {
      arenaSetup();
    } else if (mode === 4) {
      arena();
    }
}

function keyPressed() {
  //Increment Mode on Enter
  if (mode === 0 && keyCode === ENTER) {
    mode = 1;
    isPlaying = false; // Reset isPlaying
    instruction = true;
  } else if (mode === 1 && keyCode === ENTER) {
    if (instruction) {
      instruction = false;
      // backgroundMusic.setVolume(0.5);
      // backgroundMusic.loop();
    }
    mode = 2;
    isPlaying = false; // Reset isPlaying
  } 

  // TEMP for testing
  else if(keyCode === ENTER) {
    mode++;
    if(mode >= 5) {
      mode = 0;
    }
  }
}

// Following are functions for different screens
function titleScreen() {
  
  if (!isPlaying && titleScreenOpacityDirection === 1) {
    titleVideo = createVideo("./assets/environments/titlescreen.mp4");
    titleVideo.size(width, height);
    titleVideo.volume(0.9);
    titleVideo.loop();
    titleVideo.hide();
    isPlaying = true;

    // Initialize and play background music
    // backgroundMusic.setVolume(0.5);
    // backgroundMusic.loop();
  }
  // Fade in effect
  if (titleScreenOpacityDirection === 1 && titleScreenOpacity < 255) {
    titleScreenOpacity += 2;
  }

  background(0);
  fill(255);
  textSize(16);
  textAlign(CENTER);

  let instruction = "Press Enter to Start";

  if (titleVideo) {
    let frame = titleVideo.get();
    image(frame, width / 2, height / 2, width, height);
    if (titleVideo.time() >= titleVideo.duration() - 1) {
      titleScreenOpacityDirection = -1; // Start fade-out
    }
  }

  fill(0);
  text(instruction, width / 2, height - 20);
}

function warning() {
  background(0); // Set background color to red
  fill(255);
  textSize(16);
  textAlign(CENTER);

  let warningText = "WARNING";
  let subtext1 = "This video game is NOT for Everyone:";
  let subtext2 = "Includes violence and possible dark themes.";
  let continueText = "Press Enter to Start";

  // Display "WARNING" in big red text
  fill(255, 0, 0); // Set text color to red
  textSize(36);
  text(warningText, width / 2, height / 2 - 50);

  // Display the subtext in white
  fill(255);
  textSize(16);
  text(subtext1, width / 2, height / 2);
  text(subtext2, width / 2, height / 2 + 30);
  fill(65, 253, 254, opacity);

  opacity += 2 * opacityDirection;

  if (opacity >= 255 || opacity <= 0) {
    opacityDirection *= -1;
  }

  // Display "Press Enter to Start" in white
  text(continueText, width / 2, height / 2 + 70);
}

function menu() {
  imageMode(CORNER);
  // Draw the background image
  backgroundOffset += 0.2; // Change this value to control the speed of the movement
  backgroundOffset %= backgroundImage.width; // Ensure the offset loops

  // Center the background image vertically
  const y = height - backgroundImage.height;

  // Draw the background image at its original size
  image(backgroundImage, -backgroundOffset, y, backgroundImage.width, backgroundImage.height);
  image(backgroundImage, backgroundImage.width - backgroundOffset, y, backgroundImage.width, backgroundImage.height);



  // character select
  textSize(80);
  fill(255);
  noStroke();
  // TODO: font?
  textAlign(CENTER);
  text("Choose your characters", 600, 100);
  
  // char boxes
  textSize(50);
  fill(255, 0, 0);
  text("Player One", 250, 180);
  text("Player Two", width/2+250, 180);

  stroke(255, 0, 0);
  strokeWeight(10);
  noFill();
  // P1
  rect(100, 200, 400, 400);
  charSelect.chars.kitsune.display(120, 160, 0); 
  charSelect.chars.kitsune.display(300, 160, 0); 
  charSelect.chars.kitsune.display(120, 350, 0); 
  charSelect.chars.kitsune.display(300, 350, 0); 

  
  // P2 
  rect(width/2+100, 200, 400, 400);
  charSelect.chars.kitsune.display(width/2+120, 160, 0); 
  charSelect.chars.kitsune.display(width/2+300, 160, 0); 
  charSelect.chars.kitsune.display(width/2+120, 350, 0);
  charSelect.chars.kitsune.display(width/2+300, 350, 0); 
  
  stroke(255);
  strokeWeight(5);
  
  // P1
  rect(charSelect.spots[charSelect.selectors.p1].x, charSelect.spots[charSelect.selectors.p1].y+60, 160, 160);
  if(keyIsDown(68)) { // d
    if ( charSelect.selectors.p1 == 1 ) {
      charSelect.selectors.p1 = 2;
    }
    else if ( charSelect.selectors.p1 == 3 ) {
      charSelect.selectors.p1 = 4;
    }
  }
  if(keyIsDown(65)) { // a
    if ( charSelect.selectors.p1 == 2 ) {
      charSelect.selectors.p1 = 1;
    }
    else if ( charSelect.selectors.p1 == 4 ) {
      charSelect.selectors.p1 = 3;
    }
  }
  if(keyIsDown(83)) { // s
    if ( charSelect.selectors.p1 == 1 ) {
      charSelect.selectors.p1 = 3;
    }
    else if ( charSelect.selectors.p1 == 2 ) {
      charSelect.selectors.p1 = 4;
    }
  }
  if(keyIsDown(87)) { // w
    if ( charSelect.selectors.p1 == 3 ) {
      charSelect.selectors.p1 = 1;
    }
    else if ( charSelect.selectors.p1 == 4 ) {
      charSelect.selectors.p1 = 2;
    }
  }

  // P2
  rect(width/2+charSelect.spots[charSelect.selectors.p2].x, charSelect.spots[charSelect.selectors.p2].y+60, 160, 160);
  if(keyIsDown(76)) { // l
    if ( charSelect.selectors.p2 == 1 ) {
      charSelect.selectors.p2 = 2;
    }
    else if ( charSelect.selectors.p2 == 3 ) {
      charSelect.selectors.p2 = 4;
    }
  }
  if(keyIsDown(74)) { // j
    if ( charSelect.selectors.p2 == 2 ) {
      charSelect.selectors.p2 = 1;
    }
    else if ( charSelect.selectors.p2 == 4 ) {
      charSelect.selectors.p2 = 3;
    }
  }
  if(keyIsDown(75)) { // k
    if ( charSelect.selectors.p2 == 1 ) {
      charSelect.selectors.p2 = 3;
    }
    else if ( charSelect.selectors.p2 == 2 ) {
      charSelect.selectors.p2 = 4;
    }
  }
  if(keyIsDown(73)) { // i
    if ( charSelect.selectors.p2 == 3 ) {
      charSelect.selectors.p2 = 1;
    }
    else if ( charSelect.selectors.p2 == 4 ) {
      charSelect.selectors.p2 = 2;
    }
  }

  // list selected character
  noStroke();
  fill(0, 255, 155);
  text(charSelect.spots[charSelect.selectors.p1].name, 250, 660);
  text(charSelect.spots[charSelect.selectors.p2].name, width/2+250, 660);

  fill(255);

  // then user presses enter to move to game, and these chars are used
  text("Press Enter to continue", 600, 740);
}

// sets up game state before playing
function arenaSetup() {
  // grabs the class for the character to construct an instance
  arenaState.p1 = new charSelect.spots[charSelect.selectors.p1].factory(charSelect.spots[charSelect.selectors.p1].name, 250, ground, 0, null);
  arenaState.p1.setup();

  arenaState.p2 = new charSelect.spots[charSelect.selectors.p2].factory(charSelect.spots[charSelect.selectors.p2].name, 750, ground, 1, null);
  arenaState.p2.setup();

  mode++;
}

function arena() {
  imageMode(CENTER);
  image(arenaImage, width, height, width * 2, height * 2);
  fill(0, 150);
  rect(200, 130, 800, 150);
  fill(255);
  textSize(20);
  text("Controls:", 600, 170);
  textSize(12);
  text("Player 1 Controls: wasd - move, e - basic attack, q - heavy attack, r - special attack, y - test die, u - respawn", 600, 200);
  text("Player 2 Controls: ijkl - move, u - basic attack, o - heavy attack, y - special attack, m - test die, n - respawn", 600, 230);

  arenaState.p1.displayAndMove();
  arenaState.p2.displayAndMove();

  for(let i = 0; i < projectiles.length; i++) {
    projectiles[i].move();
    if(projectiles[i].x > width || projectiles[i].x < 0) {
      projectiles.splice(i, 1);
    }
  }
}

function charSelectSetup(charSelect) {
  charSelect.chars = {
    kitsune: new CharSelect(kitsuneHeavyAttack, 0, 0, 128, 128, 40),
    char2: new CharSelect(kitsuneHeavyAttack, 0, 0, 128, 128, 40), // set all to kitsune for now
    char3: new CharSelect(kitsuneHeavyAttack, 0, 0, 128, 128, 40),
    char4: new CharSelect(kitsuneHeavyAttack, 0, 0, 128, 128, 40)
  };
  charSelect.selectors = {
    p1: 1,
    p2: 1
  };
  charSelect.spots = {
    1: {
      x: 120, y: 160, name: "Kitsune", factory: Kitsune
    },
    2: {
      x: 300, y: 160, name: "char2", factory: Kitsune
    },
    3: {
      x: 120, y: 350, name: "char3", factory: Kitsune
    },
    4: {
      x: 300, y:350, name: "char4", factory: Kitsune
    }
  };
}


  