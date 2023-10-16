class Character {
    constructor(name, speed, jumpSpeed, x, y, hitboxes, spriteAnimations, spriteWidth, spriteHeight, playerNumber, opponent=null) {
        this.name = name;
        this.speed = speed;
        this.jumpSpeed = jumpSpeed;
        this.currJumpSpeed = jumpSpeed;
        this.ground = y;
        this.gravity = 1;
        this.x = x;
        this.y = y;
        this.hitboxes = hitboxes;
        this.spriteAnimations = spriteAnimations;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.playerNumber = playerNumber;
        // This is the object of the opponent character
        this.opponent = opponent;
        this.currAnimation = "idle";
        // 0 - facing right, 1 - facing left
        this.direction == playerNumber;
        this.jumping = false;
    }

    // Sets up the character, should only run once in the beginning
    setup() {
        this.spriteAnimations.idle = new Sprite(this.spriteAnimations.idle, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        this.spriteAnimations.run = new Sprite(this.spriteAnimations.run, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        this.spriteAnimations.walk = new Sprite(this.spriteAnimations.walk, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        let jumpTiming = (60 / ((this.jumpSpeed ) / this.gravity));
        this.spriteAnimations.jump = new Sprite(this.spriteAnimations.jump, this.x, this.y, this.spriteWidth, this.spriteHeight, jumpTiming);
        this.spriteAnimations.basicAttack = new Sprite(this.spriteAnimations.basicAttack, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        this.spriteAnimations.heavyAttack = new Sprite(this.spriteAnimations.heavyAttack, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        this.spriteAnimations.specialAttack = new Sprite(this.spriteAnimations.specialAttack, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        this.spriteAnimations.hurt = new Sprite(this.spriteAnimations.hurt, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        this.spriteAnimations.block = new Sprite(this.spriteAnimations.block, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        this.spriteAnimations.die = new Sprite(this.spriteAnimations.die, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
    }

    displayAndMove() {
        this.spriteAnimations[this.currAnimation].display(this.x, this.y, this.direction);
        if(this.direction == 1) {
            // If the opponent is to the left of this character, flip the sprite
            
        }

        // Player 1 Controls
        if(this.playerNumber == 0) {
            let xPrev = this.x
            // a - move left
            if(keyIsDown(65)) {
                this.currAnimation = "run";
                this.x -= this.speed;
            }
            // d - move right
            if (keyIsDown(68)) {
                this.currAnimation = "run";
                this.x += this.speed;
            }

            // based on velocity, change animation and direction
            if(xPrev == this.x) {
                this.currAnimation = "idle";
            } else if(xPrev > this.x) {
                this.direction = 1;
            } else {
                this.direction = 0;
            }

            // w - jump
            if(keyIsDown(87)) {
                if(!this.jumping) {
                    this.jumping = true;
                }
            }
        }

        // TODO - Player 2 Controls - copy from player one once done
        if(this.playerNumber == 1) {
            if(keyIsDown(74)) {
                this.direction = 1;
                this.x -= this.speed;
            }
            if (keyIsDown(76)) {
                this.direction = 0;
                this.x += this.speed;
            }
        }
        // Jump once triggered
        if(this.jumping) {
            this.jump();
            this.currAnimation = "jump";
        }
        if(this.y > this.ground) {
            this.y = this.ground;
            this.jumping = false;
            this.currJumpSpeed = this.jumpSpeed;
            this.spriteAnimations[this.currAnimation].resetFrames();

        }
    }

    jump() {
        this.y -= this.currJumpSpeed;
        this.currJumpSpeed -= this.gravity;
    }

    basicAttack() {
        // TODO
    }

    heavyAttack() {
        // TODO
    }

    specialAttack() {
        // TODO
    }

    block() {
        // TODO
    }

    takeDamage() {
        // TODO
    }

    die() {
        // TODO
    }
}