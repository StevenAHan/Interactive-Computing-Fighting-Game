// Taken from day10 source code Interactive Computing and Adjusted for Our Project
class Sprite {
    constructor(img, x, y, w, h, pause, offset=0) {
        // each Sprite knows its position, size of the animation cell
        // and source image
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.img = img;
        this.offset = offset;

        // compute how many frames we have by computing the overall width
        // of the sprite and dividing by the cell width
        this.totalFrames = int(this.img.width / this.w);

        // keep track of which frame / cell we are going to render
        this.currentFrame = 0;

        // a pause counter to slow down the animation (optional)
        this.pauseCounter = 0;
        this.pauseCounterMax = pause;
    }
  
    display(x, y, direction) {
        this.x = x;
        this.y = y;
        // draw the image - note the use of the destination coords
        // and the source coords
        // params:  image, dest x, dest y, dest width, dest height (normal usage)
        //          source x, source y, source width, source height
        if(direction == 1) {
            push();
            scale(-1, 1);
            image(this.img, -this.x, this.y, this.w, this.h, this.currentFrame * this.w + this.offset, 0, this.w, this.h);
            pop();
        } else {
            image(this.img, this.x, this.y, this.w, this.h, this.currentFrame * this.w + this.offset, 0, this.w, this.h);
        }
        
    
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
    
    resetFrames() {
        this.currentFrame = 0;
    }

    actionEnd() {
        return this.currentFrame == this.totalFrames - 1;
    }

}


// Copy of class Sprite for use on the char select screen (changes character display size)
class CharSelect {
    constructor(img, x, y, w, h, pause) {
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
        this.pauseCounterMax = pause;
    }
  
    display(x, y, direction) {
        this.x = x;
        this.y = y;
        // draw the image - note the use of the destination coords
        // and the source coords
        // params:  image, dest x, dest y, dest width, dest height (normal usage)
        //          source x, source y, source width, source height
        if(direction == 1) {
            push();
            scale(-1, 1);
            image(this.img, -this.x, this.y, 200, 200, this.currentFrame * this.w, 0, this.w, this.h);
            pop();
        } else {
            image(this.img, this.x, this.y, 200, 200, this.currentFrame * this.w, 0, this.w, this.h);
        }
        
    
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
    
    resetFrames() {
        this.currentFrame = 0;
    }

    actionEnd() {
        return this.currentFrame == this.totalFrames - 1;
    }

}

// Taken from Interactive Computing Day 10 and Adjusted for our use
class Sequence {
    constructor(images, x, y, delay, h, w) {
        this.x = x;
        this.y = y;
        this.index = 0;
        this.paused = false;
        this.images = images;
        this.delay = delay;
        this.timing = 0;
        this.h = h;
        this.w = w;
    }
    display(direction) {
        // display the current image in the sequence
        if(direction == 1) {
            push();
            scale(-1, 1);
            image(this.images[this.index], -this.x, this.y, this.h, this.w);
            pop();
        } else {
            image(this.images[this.index], this.x, this.y, this.h, this.w);
        }
        
        // cycle to the next image in the sequence if we are not paused
        if (this.paused == false && this.timing % this.delay == 0) {
            this.index++;
        }
        this.timing++;
    }

    checkEnd() {
        return this.index >= this.images.length - 1;
    }
  }
  
