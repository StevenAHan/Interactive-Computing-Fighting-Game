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
let mode;
let isPlaying = false; // Initialize isPlaying
let backgroundMusic;
let instruction = false;

function preload() {
  // Load the background image
  backgroundImage = loadImage("char_background.png");
  foregroundImage = loadImage("foreground.png");
  arenaImage = loadImage("arena.png")
  backgroundMusic = loadSound("background_music.mp3");
}

function setup() {
  // Create a canvas of the desired size
  createCanvas(1280, 800);
  mode = 0; // Set the initial mode to 0 (warning)
}

function draw() {
  if (mode === 0) {
    warning();
  } else if (mode === 1) {
    titleScreen();
  } else if (mode === 2) {
    menu();
  } else if (mode === 3) {
    arena();
  }
}

function keyPressed() {
  if (mode === 0 && keyCode === ENTER) {
    mode = 1;
    isPlaying = false; // Reset isPlaying
    instruction = True;
  } else if (mode === 1 && keyCode === ENTER) {
    if (instruction) {
      instruction = false;
      backgroundMusic.setVolume(0.5);
      backgroundMusic.loop();
    }
    mode = 2;
    isPlaying = false; // Reset isPlaying
  } else if (mode === 2 && keyCode === ENTER) {
    mode = 3;
  }
}

function titleScreen() {
  
  if (!isPlaying && titleScreenOpacityDirection === 1) {
    titleVideo = createVideo("titlescreen.mp4");
    titleVideo.size(width, height);
    titleVideo.volume(0.9);
    titleVideo.loop();
    titleVideo.hide();
    isPlaying = true;

    // Initialize and play background music
    backgroundMusic.setVolume(0.5);
    backgroundMusic.loop();
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
    image(frame, 0, 0, width, height);
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
  let subtext1 = "This video game is rated M for Mature:";
  let subtext2 = "Includes, blood violence, extensive gore,";
  let subtext3 = "strong language, and sexual themes.";
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
  text(subtext3, width / 2, height / 2 + 60);

  fill(65, 253, 254, opacity);

  opacity += 2 * opacityDirection;

  if (opacity >= 255 || opacity <= 0) {
    opacityDirection *= -1;
  }

  // Display "Press Enter to Start" in white
  text(continueText, width / 2, height / 2 + 100);
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
