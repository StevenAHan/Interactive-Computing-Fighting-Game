let kitsuneIdle;
let testCharAnimations;
let theParticles = [];

function preload() {
  kitsuneIdle = loadImage("./characters/testKitsune/Idle.png")
}

function setup() {
  createCanvas(500, 500);
  background(0);
  testCharAnimations = {
    "idle": new Sprite(kitsuneIdle, 250, 250, 128, 128),
  }
}


function draw() {
    background(0);
    testCharAnimations.idle.display();
  }
  