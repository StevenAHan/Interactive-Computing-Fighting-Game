// Taken from day10 source code Interactive Computing
class Sprite {
    constructor(img, x, y, w, h) {
  
      // each Sprite knows its position, size of the animation cell
      // and source image
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.img = img;
  
      // compute how many frames we have by computing the overall width
      // of the sprite and dividing by the cell width
      this.totalFrames = int(this.img.width / this.w);
  
      // keep track of which frame / cell we are going to render
      this.currentFrame = 0;
  
      // a pause counter to slow down the animation (optional)
      this.pauseCounter = 0;
      this.pauseCounterMax = 3;
    }
  
    display() {
  
      // draw the image - note the use of the destination coords
      // and the source coords
      // params:  image, dest x, dest y, dest width, dest height (normal usage)
      //          source x, source y, source width, source height
      image(this.img, this.x, this.y, this.w, this.h,
                      this.currentFrame * this.w, 0, this.w, this.h);
  
      // decrease our pause counter
      this.pauseCounter--;
  
      // if we have counted down enough we can trigger another animation
      // frame cycle
      if (this.pauseCounter <= 0) {
        this.currentFrame += 1;
        if (this.currentFrame >= this.totalFrames) {
          this.currentFrame = 0;
        }
        this.pauseCounter = this.pauseCounterMax;
      }
    }
  
  }
  