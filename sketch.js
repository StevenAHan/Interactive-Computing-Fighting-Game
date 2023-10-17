let kitsuneIdle, kitsuneRun, kitsuneJump, 
  kitsuneBasicAttack, kitsuneHeavyAttack, kitsuneSpecialAttack,
  kitsuneHurt, kitsuneDeath, kitsuneBlock, kitsuneWalk;
let testCharAnimations;
let theParticles = [];
let kitsune;
let ground = 250;

function preload() {
  kitsuneIdle = loadImage("./characters/testKitsune/Idle.png");
  kitsuneRun = loadImage("./characters/testKitsune/Run.png");
  kitsuneJump = loadImage("./characters/testKitsune/Jump.png");
  kitsuneBasicAttack = loadImage("./characters/testKitsune/Attack_1.png");
  kitsuneHeavyAttack = loadImage("./characters/testKitsune/Attack_2.png");
  kitsuneSpecialAttack = loadImage("./characters/testKitsune/Attack_3.png");
  kitsuneHurt = loadImage("./characters/testKitsune/Hurt.png");
  kitsuneDeath = loadImage("./characters/testKitsune/Dead.png");
  kitsuneBlock = loadImage("./characters/testKitsune/Fire_1.png");
  kitsuneWalk = loadImage("./characters/testKitsune/Walk.png");
}

function setup() {
  createCanvas(1200, 800);
  background(0);
  testCharAnimations = {
    "idle": kitsuneIdle,
    "run": kitsuneRun,
    "jump": kitsuneJump,
    "basicAttack": kitsuneBasicAttack,
    "heavyAttack": kitsuneHeavyAttack,
    "specialAttack": kitsuneSpecialAttack,
    "hurt": kitsuneHurt,
    "die": kitsuneDeath,
    "block": kitsuneBlock,
    "walk": kitsuneWalk
  }
  kitsune = new Character("kitsune", 5, 15, 250, ground, [], testCharAnimations, 128, 128, 0, null);
  kitsune.setup();
}


function draw() {
    imageMode(CENTER);
    background(0);
    fill(0, 128, 0);
    rect(0, ground + 128 / 2, width, height);
    fill(255);
    textSize(12);
    textAlign(CENTER);
    text("Kitsune", kitsune.x, kitsune.y - 25);
    text("Test Env: wasd - move, e - basic attack, q - heavy attack, r - special attack, y - test die (Reload to reget character)", 600, 100);
    kitsune.displayAndMove();
}
  