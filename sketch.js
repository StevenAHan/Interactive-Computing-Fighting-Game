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
let mode = 2; // TEMP MODE SET FOR TESTING
let isPlaying = false; // Initialize isPlaying
let backgroundMusic;
let instruction = false;

// Game Vars to Keep Track of Game State
let projectiles = [];


// Test Env Vars
let kitsuneIdle, kitsuneRun, kitsuneJump, 
  kitsuneBasicAttack, kitsuneHeavyAttack, kitsuneSpecialAttack,
  kitsuneHurt, kitsuneDeath, kitsuneBlock, kitsuneWalk, kitsuneFireball;
let testCharAnimations;
let theParticles = [];
let kitsune1, kitsune2;
let ground = 600;

function preload() {
  // Load the background images
  backgroundImage = loadImage("./assets/environments/char_background.png");
  foregroundImage = loadImage("./assets/environments/foreground.png");
  arenaImage = loadImage("./assets/environments/arena.png")
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
  kitsune1 = new Kitsune("Player1", 250, ground, 0, kitsune2);
  kitsune2 = new Kitsune("Player2", 800, ground, 1, kitsune1);

  kitsune1.setup();
  kitsune2.setup();
}


function draw() {
    imageMode(CENTER);
    background(0);
    if (mode === 0) {
      warning();
    } else if (mode === 1) {
      titleScreen();
    // } else if (mode === 2) {
    //   menu();
    // } else if (mode === 3) {
    //   arena();
    } else if (mode === 2) { // Testing Environment
      testEnv();
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
  // else if (mode === 2 && keyCode === ENTER) {
  //   mode = 3;
  // } 
  // else if(mode === 3 && keyCode === ENTER) {
  //   mode++;
  // }
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
  // Draw the background image
  backgroundOffset += 0.2; // Change this value to control the speed of the movement
  backgroundOffset %= backgroundImage.width; // Ensure the offset loops

  // Center the background image vertically
  const y = height - backgroundImage.height;

  // Draw the background image at its original size
  image(backgroundImage, -backgroundOffset, y, backgroundImage.width, backgroundImage.height);
  image(backgroundImage, backgroundImage.width - backgroundOffset, y, backgroundImage.width, backgroundImage.height);


}

function arena() {
  image(arenaImage, 0, 0);
}

function testEnv() {
  fill(0, 128, 0);
  rect(0, ground + 128 / 2, width, height);
  fill(255);
  textSize(12);
  textAlign(CENTER);
  text(kitsune1.name, kitsune1.x, kitsune1.y - 25);
  text(kitsune2.name, kitsune2.x, kitsune2.y - 25);
  text("Player 1 Controls: wasd - move, e - basic attack, q - heavy attack, r - special attack, x - test die, z - respawn", 600, 200);
  text("Player 2 Controls: ijkl - move, u - basic attack, o - heavy attack, y - special attack, m - test die, n - respawn", 600, 230);
  textSize(30);
  text("Test Environment", 600, 150);
  // Letting kitsune object move
  kitsune1.displayAndMove();
  kitsune2.displayAndMove();
  for(let i = 0; i < projectiles.length; i++) {
    projectiles[i].move();
    if(projectiles[i].x > width || projectiles[i].x < 0) {
      projectiles.splice(i, 1);
    }
  }
}
