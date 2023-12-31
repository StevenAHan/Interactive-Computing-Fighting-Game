
// debug var to see hitboxes and some logging
let debug = false;

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
let mode = 0; 
let isPlaying = false;
let backgroundMusic, versus, chooseCharMusic, woodsMusic, winMusic;
let instruction = false;
let newFont, blood, playArena, playWin;
let tiles;

let selectedArenaImage
let arenaImages = [];
let arenaNames = ['Battleground', 'Desert', 'Forest', 'Haunted', 'Path', 'Ruin', 'Swamp', 'Temple', 'Village'];
let selectedArenaIndex = 0;
let arenaSelected = false;

// Game Vars to Keep Track of Game State
let projectiles = [];
let tprojectiles = [];

// char select data
let charSelect = {};

// arena state
let arenaState = {};

// Arena Vars
let kitsuneIdle, kitsuneRun, kitsuneJump, 
  kitsuneBasicAttack, kitsuneHeavyAttack, kitsuneSpecialAttack,
  kitsuneHurt, kitsuneDeath, kitsuneWalk, kitsuneFireball, kitsuneBigFireball, kitsuneBlock;

let ravenIdle, ravenRun, ravenJump,
  ravenBasicAttack, ravenHeavyAttack, ravenSpecialAttack,
  ravenHurt, ravenDeath, ravenBlock;
let ravenStrike = [];
let ravenSpecial = [];

let werewolfIdle, werewolfRun, werewolfJump,
  werewolfBasicAttack, werewolfHeavyAttack, werewolfSpecialAttack,
  werewolfHurt, werewolfDeath, werewolfBlock;
let werewolfStrike = [];

let samuraiIdle, samuraiRun, samuraiJump,
  samuraiBasicAttack, samuraiHeavyAttack, samuraiSpecialAttack,
  samuraiHurt, samuraiDeath, samuraiBlock;
let samuraiShot = [];

let fighterIdle, fighterRun, fighterJump,
  fighterBasicAttack, fighterHeavyAttack, fighterSpecialAttack,
  fighterHurt, fighterDeath, fighterBlock, fighterFireball;

let raiderIdle, raiderRun, raiderJump,
  raiderBasicAttack, raiderHeavyAttack, raiderSpecialAttack,
  raiderHurt, raiderDeath, raiderHeavyBullet, raiderSpecialBullet;


// attack sounds
let kitsune_basic, kitsune_heavy, kitsune_special;
let raven_basic, raven_heavy, raven_special;
let samurai_basic, samurai_heavy, samurai_special;
let fighter_basic, fighter_heavy, fighter_special;
let raider_basic, raider_heavy, raider_special;

let hurtSound;

let testCharAnimations;
let theParticles = [];
let ground = 600;
let end = false;

let health1;
let health2;
let timer = 99
const starting_time = 99;

let menuTime = 0;
let map1;

function preload() {
  // Load the background images
  backgroundImage = loadImage("./assets/environments/char_background.png");
  foregroundImage = loadImage("./assets/environments/foreground.png");
  
  arenaNames.forEach((arena, index) => {
    arenaImages[index] = loadImage(`./assets/environments/maps/${arena}.png`);
  });

  // Kitsune Animations
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
  kitsuneBigFireball = loadImage("./assets/characters/Kitsune/Fire_2_cropped.png");

  // Kitsune attack effects
  kitsune_basic = loadSound("./assets/sounds/kitsune_basic.wav")
  kitsune_heavy = loadSound("./assets/sounds/kitsune_heavy.wav")
  kitsune_special = loadSound("./assets/sounds/kitsune_special.wav")
  
  //sounds
  startsound = loadSound("./assets/sounds/startsbreak.mp3")
  backgroundMusic = loadSound("./assets/environments/background_music.mp3");
  chooseCharMusic = loadSound("./assets/sounds/choosechar.mp3");
  woodsMusic = loadSound("./assets/sounds/woods.mp3");
  winMusic = loadSound("./assets/sounds/win.mp3");
  versus = loadSound("./assets/sounds/versus.mp3")

  //font
  newFont = loadFont("./assets/norwester.otf")
  blood = loadImage("./assets/environments/blood.png")
  tiles = loadImage("./assets/environments/tiles.jpg") //tiles 
  

  // Raven Animations
  ravenIdle = loadImage("./assets/characters/Raven/Idle.png");
  ravenRun = loadImage("./assets/characters/Raven/Run.png");
  ravenJump = loadImage("./assets/characters/Raven/Jump.png");
  ravenBasicAttack = loadImage("./assets/characters/Raven/Attack_2.png");
  ravenHeavyAttack = loadImage("./assets/characters/Raven/Attack_3.png");
  ravenSpecialAttack = loadImage("./assets/characters/Raven/Attack_1.png");
  ravenHurt = loadImage("./assets/characters/Raven/Hurt.png");
  ravenDeath = loadImage("./assets/characters/Raven/Dead.png");
  //TODO
  ravenBlock = loadImage("./assets/characters/Raven/Idle_2.png");

  //Raven attack
  raven_basic = loadSound("./assets/sounds/raven_basic.wav")
  raven_heavy = loadSound("./assets/sounds/raven_heavy.wav")
  raven_special = loadSound("./assets/sounds/raven_special.wav")
  
  // Raven Strike Setup
  for (let i = 1; i <= 8; i++) {
    let filename = './assets/characters/Raven/ravenStrike/' + nf(i) + '.png';
    ravenStrike.push(loadImage(filename));
  }
  for (let i = 1; i <= 10; i++) {
    let filename = './assets/characters/Raven/SpecialAttack/' + nf(i) + '.png';
    ravenSpecial.push(loadImage(filename));
  }

  // WereWolf Animations
  werewolfIdle = loadImage("./assets/characters/Werewolf/Idle.png");
  werewolfRun = loadImage("./assets/characters/Werewolf/Run.png");
  werewolfJump = loadImage("./assets/characters/Werewolf/Jump.png");
  werewolfBasicAttack = loadImage("./assets/characters/Werewolf/Attack_1.png");
  werewolfHeavyAttack = loadImage("./assets/characters/Werewolf/Attack_2.png");
  werewolfSpecialAttack = loadImage("./assets/characters/Werewolf/Attack_3.png");
  werewolfHurt = loadImage("./assets/characters/Werewolf/Hurt.png");
  werewolfDeath = loadImage("./assets/characters/Werewolf/Dead.png");
  werewolfBlock = loadImage("./assets/characters/Werewolf/Run+Attack.png");


  // Samurai Animations
  samuraiIdle = loadImage("./assets/characters/Samurai/Idle.png");
  samuraiRun = loadImage("./assets/characters/Samurai/Run.png");
  samuraiJump = loadImage("./assets/characters/Samurai/Jump.png");
  samuraiBasicAttack = loadImage("./assets/characters/Samurai/Attack_1.png");
  samuraiHeavyAttack = loadImage("./assets/characters/Samurai/Shot.png");
  samuraiSpecialAttack = loadImage("./assets/characters/Samurai/combined_attack.png");
  samuraiHurt = loadImage("./assets/characters/Samurai/Hurt.png");
  samuraiDeath = loadImage("./assets/characters/Samurai/Dead.png");
  samuraiBlock = loadImage("./assets/characters/Samurai/Walk.png");
  samuraiArrow = loadImage("./assets/characters/Samurai/Arrow.png");
  
  // samurai attack effects
  samurai_basic = loadSound("./assets/sounds/samurai_basic.wav")
  samurai_heavy = loadSound("./assets/sounds/samurai_heavy.wav")
  samurai_special = loadSound("./assets/sounds/samurai_special.wav")
  
  // Fighter Animations
  fighterIdle = loadImage("./assets/characters/Fighter/Idle.png");
  fighterRun = loadImage("./assets/characters/Fighter/Run.png");
  fighterJump = loadImage("./assets/characters/Fighter/Jump.png");
  fighterBasicAttack = loadImage("./assets/characters/Fighter/twopunch.png");
  fighterHeavyAttack = loadImage("./assets/characters/Fighter/Attack_2.png");
  fighterSpecialAttack = loadImage("./assets/characters/Fighter/Attack_3.png");
  fighterHurt = loadImage("./assets/characters/Fighter/Hurt.png");
  fighterDeath = loadImage("./assets/characters/Fighter/Dead.png");
  fighterBlock = loadImage("./assets/characters/Fighter/Shield.png");
  fighterFireball = loadImage("./assets/characters/Fighter/fighter-fireball.png");

  //fighter attack effect
  fighter_basic = loadSound("./assets/sounds/fighter_basic.mp3");

  // hurt sound
  hurtSound = loadSound("./assets/sounds/hurtsound.mp3");

  // Raider Animations
  raiderIdle = loadImage("./assets/characters/Raider/Idle.png");
  raiderRun = loadImage("./assets/characters/Raider/Run.png");
  raiderJump = loadImage("./assets/characters/Raider/Jump.png");
  raiderBasicAttack = loadImage("./assets/characters/Raider/Attack.png");
  raiderHeavyAttack = loadImage("./assets/characters/Raider/Shot_1.png");
  raiderSpecialAttack = loadImage("./assets/characters/Raider/Shot_2.png");
  raiderHurt = loadImage("./assets/characters/Raider/Hurt.png");
  raiderDeath = loadImage("./assets/characters/Raider/Dead.png");
  raiderHeavyBullet = loadImage("./assets/characters/Raider/Bullet_1.png");
  raiderSpecialBullet = loadImage("./assets/characters/Raider/Bullet_2.png");
  raider_basic = loadSound("./assets/sounds/kitsune_basic.wav");
  raider_heavy = loadSound("./assets/sounds/lasergunsound.mp3");
  raider_special = loadSound("./assets/sounds/lasergunsound.mp3");

}

function setup() {
  let cnv = createCanvas(1200, 800);
  cnv.parent('center');
  background(0);
  health1 = new Health_L (10, 30)
  health2 = new Health_R (670, 30, (width * 3 / 7))

  // init charselect
  charSelectSetup(charSelect);
}


function draw() {
  imageMode(CENTER);
  background(0);
  if (mode === 0) {
    warning();
  } else if (mode === 1) {
    console.log("menuTime:", menuTime);
    menuTime++;
    titleScreen();
  } else if (mode === 2) {
    menu();
  } else if (mode === 3) {
    arenaMenu();
  } else if (mode === 4) {
    arenaSetup();
  } else if (mode === 5) {
    arena();
  } else if (mode === 6) {
    endGame();
  }
}

function keyPressed() {
  //Increment Mode on Enter
  console.log("Key pressed: ", keyCode, " Mode: ", mode)
  if (mode === 0 && keyCode === ENTER) {
    console.log("Entering mode 1 from mode 0");
    mode = 1;
    isPlaying = false; // Reset isPlaying
    instruction = true;
  } else if (mode === 1 && keyCode === ENTER && menuTime >= 120) {
    console.log("Attempting to transition from mode 1 to mode 2");
    if (instruction) {
      instruction = false;

      //backgroundMusic.setVolume(0.5);
      //backgroundMusic.loop();
    }
    mode = 2;
    chooseCharMusic.setVolume(0.5);
    chooseCharMusic.loop();
    isPlaying = false; // Reset isPlaying

  } else if (mode === 2) {
    if(keyCode === ENTER) {
      chooseCharMusic.stop()
      mode = 3;
    }
    if(keyCode == 68) { // d
      charSelect.selectors.p1++;
      if(charSelect.selectors.p1 > 5) {
        charSelect.selectors.p1 = 1;
      }
    }
    if(keyCode == 65) { // a
      charSelect.selectors.p1--;
      if(charSelect.selectors.p1 < 1) {
        charSelect.selectors.p1 = 5;
      }
    }
  

    if(keyCode == 74) { // j
      charSelect.selectors.p2--;
      if(charSelect.selectors.p2 < 1) {
        charSelect.selectors.p2 = 5;
      }
    }
    if(keyCode == 76) { // l
      charSelect.selectors.p2++;
      if(charSelect.selectors.p2 > 5) {
        charSelect.selectors.p2 = 1;
      }
    }
  } else if  (mode === 3) {
    if (key === 'd' || key === 'D') {
      selectedArenaIndex = (selectedArenaIndex + 1) % arenaImages.length;
    } else if (key === 'a' || key === 'A') {
      selectedArenaIndex = (selectedArenaIndex - 1 + arenaImages.length) % arenaImages.length;
    } else if (keyCode === ENTER) {
      arenaSelected = true;
      mode = 4; // Proceed to the next mode (arenaSetup) after selection
    }
  } else if (mode > 4 && keyCode === ENTER && end == true) {
    winMusic.stop()
    mode = 2;
    timer = starting_time;
    end = false;
    chooseCharMusic.setVolume(0.5);
    chooseCharMusic.loop();
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
    startsound.setVolume(0.5)
    startsound.play(.9)

    //backgroundMusic.setVolume(0.5);
    //backgroundMusic.loop();
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
  textFont(newFont);
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
  textAlign(LEFT);
  textSize(80);
  fill(255);
  noStroke();
  textAlign(CENTER);
  text("Choose your characters", 600, 100);
  
  // char boxes
  textSize(50);
  fill(250);
  stroke(10, 0, 120);
  strokeWeight(10);
  //noFill();

  // P1
  fill(0);
  rect(100, 200, 1000, 400);
  charSelect.chars.kitsune.display(120, 160, 0); 
  charSelect.chars.raven.display(300, 160, 0); 
  charSelect.chars.char3.display(480, 160, 0); 
  charSelect.chars.char4.display(660, 160, 0);
  charSelect.chars.char5.display(840, 160, 0);
  
  stroke(175);
  fill(170, 170,170, 50);
  strokeWeight(3);
  textSize(15);
  
  // P1
  fill(0, 0,170, 50);
  rect(charSelect.spots[charSelect.selectors.p1].x, charSelect.spots[charSelect.selectors.p1].y+60, 160, 160);
  
  // P2
  fill(170, 0,0, 50);
  rect(charSelect.spots[charSelect.selectors.p2].x, charSelect.spots[charSelect.selectors.p2].y+60, 160, 160);

  fill(0, 0, 255);
  text("Player 1", charSelect.spots[charSelect.selectors.p1].x + 40, charSelect.spots[charSelect.selectors.p1].y+80);
  fill(255, 0, 0);
  text("Player 2", charSelect.spots[charSelect.selectors.p2].x + 120, charSelect.spots[charSelect.selectors.p2].y+80);

  // list selected character
  noStroke();
  fill(153, 204, 255);
  fill(0, 0, 255);
  textSize(50);
  text(charSelect.spots[charSelect.selectors.p1].name, 300, 660);
  fill(255, 0, 0);
  text(charSelect.spots[charSelect.selectors.p2].name, width/2+300, 660);

  fill(255);


  // then user presses enter to move to game, and these chars are used
  text("Press Enter to continue", 600, 740);
  instruction = true;
}

function arenaMenu() {
  clear(); // Clear the canvas
  background(10);
  imageMode(CENTER);
  image(arenaImages[selectedArenaIndex], width / 2, height / 2, 500, 300);

  fill(255)
  textSize(30)
  text("Stage Selection", width / 2, height / 2 - 160)
  // Set text properties for the arena name
  textStyle(NORMAL);
  textSize(16);
  fill(255);
  textAlign(CENTER, TOP); // Align text to the center and top

  // Draw the arena name
  text(arenaNames[selectedArenaIndex], width / 2, height / 2 + 160);

  // Reset and set text properties for instructions
  textSize(16);
  textAlign(CENTER, BOTTOM);

  // Draw instructions
  text("Use A/D keys to change arena. Press ENTER to select.", width / 2, height - 30);

  noFill();
  stroke(0);
  rect(width / 2 - 250, height / 2 - 150, 500, 300);

  selectedArenaImage = arenaImages[selectedArenaIndex];
}


// sets up game state before playing
function arenaSetup() {

  
  // grabs the class for the character to construct an instance
  arenaState.p1 = new charSelect.spots[charSelect.selectors.p1].factory(charSelect.spots[charSelect.selectors.p1].name, 250, ground, 0, null);
  arenaState.p1.setup();

  arenaState.p2 = new charSelect.spots[charSelect.selectors.p2].factory(charSelect.spots[charSelect.selectors.p2].name, 750, ground, 1, arenaState.p1);
  arenaState.p2.setup();
  arenaState.p1.opponent = arenaState.p2;

  if(instruction){
    versus.play();
    instruction = false;
  }
  versus.onended(finished);

  background(0);
  text(charSelect.spots[charSelect.selectors.p1].name, 300, 660);
  fill(255,0,0)
  image(arenaState.p1.spriteAnimations["thumbnail"], 300, 200, 500, 500, 0, 0, 128, 128);

  push();
  scale(-1, 1);
  image(arenaState.p2.spriteAnimations["thumbnail"], -900, 200, 500, 500, 0, 0, 128, 128);
  pop();

  text("VERSUS", 600, 450)
  fill(255)
  text(charSelect.spots[charSelect.selectors.p2].name, width/2+300, 660);

  //set up platform-requires selectedArenaImage first
  map1 = new Map(30);
}

function finished(){
  mode++;
  playArena = true;
  playWin = true;
}

function arena() {
  imageMode(CENTER);
  image(selectedArenaImage, width / 2, height / 2, width, height);
  //draws the platform
  map1.draw()
  fill(128);
  stroke(51);
  rect(10, 30, (width * 3 / 7), 25);
  rect(670, 30, (width * 3 / 7), 25);
  health1.display(arenaState.p1.healthPercentage);
  health2.display(arenaState.p2.healthPercentage);
  stroke(3);
  textSize(30);
  fill(195)
  rect(100, 60, 300, 30)
  rect(width/2+180, 60, 300, 30)
  noStroke()
  fill(110, 7, 7);
  text(arenaState.p1.name + " health", width/2-350, 87)
  text(arenaState.p2.name + " health", width/2+330, 87);
  stroke(1);

  //timer
  stroke(20)
  fill(255)
  rectMode(CENTER)
  rect(width/2, 40, 50, 50)
  rectMode(CORNER)
  fill(0)
  textFont(newFont);
  textAlign(CENTER, CENTER);
  textSize(30);
  text(timer, width/2, 40);
  
  if (frameCount % 60 == 0 && timer > 0) {
    timer --;
  }
  //debug code for platforms
  // for(let i=0; i<height;i+=100){
  //   text(i, 30, i)
  // }
  
  if(playArena){
    woodsMusic.setVolume(0.5)
    woodsMusic.play()
    playArena = false;
  }
  woodsMusic.onended(woodsend)
  //if t is pressed show the controls
  if(keyIsDown(84)){
    controls()
  }
  else{
    fill(0)
    textAlign(CENTER, BASELINE);
    noStroke();
    textSize(30)
    text("Hold t for controls", 600, 790)
  }
  fill(255);
  textSize(20);
  text("Player 1", arenaState.p1.x, arenaState.p1.y - 30);
  arenaState.p1.displayAndMove();
  text("Player 2", arenaState.p2.x, arenaState.p2.y - 30);
  arenaState.p2.displayAndMove();

  for(let i = 0; i < projectiles.length; i++) {
    projectiles[i].move();
    projectiles[i].check();
    if(projectiles[i].x > width || projectiles[i].x < 0) {
      projectiles.splice(i, 1);
    }
  }

  for(let i = 0; i < tprojectiles.length; i++) {
    tprojectiles[i].move();
    if(tprojectiles[i].delete()) {
      tprojectiles.splice(i, 1);
    }
  }

  // Temp while we design the end screen
  // if(arenaState.p1.dying || arenaState.p2.dying){
  //   mode++;
  //   end = true;
  // }

  fill(255, 0, 0);
  textSize(60);
  if(arenaState.p1.dying || (timer == 0 & arenaState.p1.health < arenaState.p2.health)) {
    fill(0, 150);
    rect(width/2-320, height/2-100, 650, 230)
    fill(128, 2, 19);
    text("Player 2 Wins!", 600, 400);
    textSize(30);
    text("Press Enter to Go Back to Character Selection", 600, 450);
    end = true;
    woodsMusic.stop()
    if(playWin){
      winMusic.play()
      playWin = false
    }
  } else if (arenaState.p2.dying || (timer == 0 & arenaState.p2.health < arenaState.p1.health)) {
    fill(0, 150);
    rect(width/2-320, height/2-100, 650, 230)
    fill(128, 2, 19);
    text("Player 1 Wins!", 600, 400);
    textSize(25);
    text("Press Enter to Go Back to Character Selection", 600, 450);
    end = true;
    woodsMusic.stop()
    if(playWin){
      winMusic.play()
      playWin = false
    }
  }
  else if(arenaState.p2.health == arenaState.p1.health & timer == 0) {
    text("Draw", 600, 400);
    textSize(25);
    text("Press Enter to Go Back to Character Selection", 600, 450);
    end = true;
    woodsMusic.stop()
    if(playWin){
      winMusic.play()
      playWin = false
    }
}
}
function woodsend(){
  playArena = true;
}

function charSelectSetup(charSelect) {
  charSelect.chars = {
    kitsune: new CharSelect(kitsuneHeavyAttack, 0, 0, 128, 128, 20),
    raven: new CharSelect(ravenSpecialAttack, 0, 0, 128, 128, 20), 
    char3: new CharSelect(samuraiSpecialAttack, 0, 0, 128, 128, 20),
    char4: new CharSelect(raiderSpecialAttack, 0, 0, 128, 128, 20),
    char5: new CharSelect(fighterSpecialAttack, 0, 0, 128, 128, 20)
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
      x: 300, y: 160, name: "Raven", factory: Raven
    },
    3: {
      x: 480, y: 160, name: "Samurai", factory: Samurai
    },
    4: {
      x: 660, y: 160, name: "Raider", factory: Raider
    },
    5: {
      x: 840, y: 160, name: "Fighter", factory: Fighter
    }
  };
}

// Unused
function endGame(){
  background(0)
  blood.resize(1200, 600);
  //imageMode(LEFT)
  image(blood, 600, 300)
  textSize(100);
  fill(255);
  noStroke();
  textAlign(CENTER);
  //text("GAME OVER", 600, 100);
  text("VICTORY", 600, 300)
  textSize(60);
  if(arenaState.p1.dying){
    text("insert " + arenaState.p1.name + " dead pic", 600, 400)
    text("insert " + arenaState.p2.name + " pic", 600, 520)
  }
  else{
    text("insert " + arenaState.p2.name + " dead pic", 600, 400)
    text("insert " + arenaState.p1.name + " pic", 600, 520)
  }
  text("or", 600, 450)
  textSize(50);
  fill(255);
  text("Play again?", 600, 700)
}


function controls(){
  textAlign(CENTER, BASELINE);
  noStroke();
  fill(0, 150);
  rect(50, 300, 300, 170)
  rect(850, 300, 300, 170)
  fill(255);
  textSize(80);
  text("Controls", 600, 400);
  fill(153, 204, 255);
  textSize(40);
  text("Player 1", 200, 345);
  text("Player 2", 1000, 345);
  fill(255);
  textSize(20);
  text("wasd - move", 200, 370);
  text("e - basic attack", 200, 390);
  text("q - heavy attack", 200, 410);
  text("r - special attack", 200, 430);
  text("ijkl - move", 1000, 370);
  text("u - basic attack", 1000, 390);
  text("o - heavy attack", 1000, 410);
  text("y - special attack", 1000, 430);
  fill(255, 128, 128);
}
