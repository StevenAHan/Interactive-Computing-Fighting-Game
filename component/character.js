class Character {
    constructor(name, speed, jumpHeight, jumpSpeed, x, y, hitboxes, spriteAnimations, spriteWidth, spriteHeight, playerNumber, opponent=null) {
        this.name = name;
        this.speed = speed;
        this.jumpHeight = jumpHeight;
        this.jumpSpeed = jumpSpeed;
        this.x = x;
        this.y = y;
        this.hitboxes = hitboxes;
        this.sprite = sprite;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.playerNumber = playerNumber;
        // This is the object of the opponent character
        this.opponent = opponent;
        this.gravity = 5;
        this.currAnimation = "idle";
    }

    // Sets up the character, should only run once in the beginning
    setup() {

    }

    display() {
        // All sprites will start out looking right, and be in idle animation
        let idleAni = new Sprite(this.spriteAnimations.idle, this.x, this.y, this.sprite.width, this.sprite.height);
        if(this.currAnimation == "idle") {
            idleAni.display();
        }
        if(this.opponent?.x < this.x) {
            // If the opponent is to the left of this character, flip the sprite
            push();
            translate(this.sprite.width, 0);
            scale(-1, 1);
            image(this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
            pop();
        }
    }

    move() {
        // Player 1 - WASD
        if(this.playerNumber == 0) {
            if(keyIsDown("a")) {
                this.x -= this.speed;
            } else if (keyIsDown("d")) {
                this.x += this.speed;
            }
        }

        // Player 2 - IJKL
        if(this.playerNumber == 1) {
            if(keyIsDown("j")) {
                this.x -= this.speed;
            } else if (keyIsDown("l")) {
                this.x += this.speed;
            }
        }
    }

    jump() {
        // TODO
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