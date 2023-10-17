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
        this.state = false;

        // Temp
        this.basicAttackSpeed = 3;
        this.heavyAttackSpeed = 5;
        this.specialAttackSpeed = 10;
        this.dead = false;
    }

    // Sets up the character, should only run once in the beginning
    setup() {
        this.spriteAnimations.idle = new Sprite(this.spriteAnimations.idle, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        this.spriteAnimations.run = new Sprite(this.spriteAnimations.run, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        this.spriteAnimations.walk = new Sprite(this.spriteAnimations.walk, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        let jumpTiming = (60 / ((this.jumpSpeed ) / this.gravity));
        this.spriteAnimations.jump = new Sprite(this.spriteAnimations.jump, this.x, this.y, this.spriteWidth, this.spriteHeight, jumpTiming);
        this.spriteAnimations.basicAttack = new Sprite(this.spriteAnimations.basicAttack, this.x, this.y, this.spriteWidth, this.spriteHeight, this.basicAttackSpeed);
        this.spriteAnimations.heavyAttack = new Sprite(this.spriteAnimations.heavyAttack, this.x, this.y, this.spriteWidth, this.spriteHeight, this.heavyAttackSpeed);
        this.spriteAnimations.specialAttack = new Sprite(this.spriteAnimations.specialAttack, this.x, this.y, this.spriteWidth, this.spriteHeight, this.specialAttackSpeed);
        this.spriteAnimations.hurt = new Sprite(this.spriteAnimations.hurt, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        this.spriteAnimations.block = new Sprite(this.spriteAnimations.block, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        this.spriteAnimations.die = new Sprite(this.spriteAnimations.die, this.x, this.y, this.spriteWidth, this.spriteHeight, 10);
    }

    displayAndMove() {
        if(!this.dead) {
            this.spriteAnimations[this.currAnimation].display(this.x, this.y, this.direction);
        }
        // Player 1 Controls
        if(this.playerNumber == 0) {
            let xPrev = this.x
            // can only move if you aren't attacking
            if(!this.state) {
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

            // e - basic attack
            if(keyIsDown(69)) {
                this.state = "basicAttack";
            }

            // q - heavy attack
            if(keyIsDown(81)) {
                this.state = "heavyAttack";
            }

            // r - special attack
            if(keyIsDown(82)) {
                this.state = "specialAttack";
            }


            // y - TEST DIE
            if(keyIsDown(89)) {
                this.state = "die";
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

        // check states
        if(this.state == "basicAttack") {
            this.basicAttack();
        }
        if(this.state == "heavyAttack") {
            this.heavyAttack();
        }
        if(this.state == "specialAttack") {
            this.specialAttack();
        }
        if(this.state == "die") {
            this.die();
        }
    }

    jump() {
        this.y -= this.currJumpSpeed;
        this.currJumpSpeed -= this.gravity;
    }

    basicAttack() {
        this.currAnimation = "basicAttack";
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    heavyAttack() {
        this.currAnimation = "heavyAttack";
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    specialAttack() {
        this.currAnimation = "specialAttack";
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    block() {
        // TODO
    }

    takeDamage() {
        // TODO
    }

    die() {
        this.currAnimation = "die";
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.dead = true;
        }
    }
}