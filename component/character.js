/* Default Character class which all characters will inherit from
    Params:
        name - name of the Player
        speed - movement speed of the character
        jumpSpeed - jump speed of the character
        x - starting x position of the character
        y - starting y position of the character
        spriteAnimations - object containing all the sprite animations for the character
        spriteWidth - width of each frame of the sprite sheets
        spriteHeight - height of each frame of the sprite sheets
        playerNumber - 0 for player 1, 1 for player 2
        opponent - object of the opponent character
*/
class Character {
    constructor(name, speed, jumpSpeed, x, y, spriteAnimations, spriteWidth, spriteHeight, playerNumber, opponent=null) {
        this.name = name;
        this.speed = speed;
        this.jumpSpeed = jumpSpeed;
        this.currJumpSpeed = jumpSpeed;
        this.ground = y;
        this.gravity = 1;
        this.x = x;
        this.y = y;
        this.hitboxes = new HitBoxes(this);
        this.spriteAnimations = spriteAnimations;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.playerNumber = playerNumber;
        // This is the object of the opponent character
        this.opponent = opponent;
        this.currAnimation = "idle";
        // 0 - facing right, 1 - facing left
        this.direction = playerNumber;
        this.jumping = false;
        this.state = false;
        this.dead = false;
        this.hitpoints = 100;

        // list of character's projectiles in existence
        this.projectiles = [];
    }

    // Sets up the character, should only run once in the beginning
    setup() {
        this.spriteAnimations.idle = new Sprite(this.spriteAnimations.idle, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
        this.spriteAnimations.run = new Sprite(this.spriteAnimations.run, this.x, this.y, this.spriteWidth, this.spriteHeight, 5);
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

                // f- block
                if(keyIsDown(70)) {
                    this.state = "block";
                }


                // x - TEST DIE
                if(keyIsDown(88)) {
                    this.state = "die";
                }

                // z - respawn
                if(keyIsDown(90)) {
                    this.dead = false;
                }
            }

            
        }

        // TODO - Player 2 Controls - copy from player one once done
        if(this.playerNumber == 1) {
            let xPrev = this.x
            // can only move if you aren't attacking
            if(!this.state) {
                // j - move left
                if(keyIsDown(74)) {
                    this.currAnimation = "run";
                    this.x -= this.speed;
                }

                // l - move right
                if (keyIsDown(76)) {
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

                // i - jump
                if(keyIsDown(73)) {
                    if(!this.jumping) {
                        this.jumping = true;
                    }
                }
                // u - basic attack
                if(keyIsDown(85)) {
                    this.state = "basicAttack";
                }

                // o - heavy attack
                if(keyIsDown(79)) {
                    this.state = "heavyAttack";
                }

                // y - special attack
                if(keyIsDown(89)) {
                    this.state = "specialAttack";
                }

                // h - block
                if(keyIsDown(72)) {
                    this.state = "block";
                }


                // m - TEST DIE
                if(keyIsDown(77)) {
                    this.state = "die";
                }

                // n - respawn
                if(keyIsDown(78)) {
                    this.dead = false;
                }
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
        if(this.state == "block") {
            this.block();
        }

        
        // hitbox work
        this.hitboxes.draw();

    }

    jump() {
        this.y -= this.currJumpSpeed;
        this.currJumpSpeed -= this.gravity;
    }

    basicAttack() {
        this.currAnimation = "basicAttack";
        this.hitboxes.attack('light');
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    heavyAttack() {
        this.currAnimation = "heavyAttack";
        this.hitboxes.attack('heavy');
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    specialAttack() {
        this.currAnimation = "specialAttack";
        this.hitboxes.attack('special');
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    block() {
        this.currAnimation = "block";
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
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

/*
    Premade Kitsune class
    Params:
        name - name of the Player
        x - starting x position of the character
        y - starting y position of the character
        playerNumber - 0 for player 1, 1 for player 2
        opponent - object of the opponent character
*/
class Kitsune extends Character {
    constructor(name, x, y, playerNumber, opponent=null) {
        // Kitsune Animation Object
        let kitsuneAnimations = {
            "idle": kitsuneIdle,
            "run": kitsuneRun,
            "jump": kitsuneJump,
            "basicAttack": kitsuneBasicAttack,
            "heavyAttack": kitsuneHeavyAttack,
            "specialAttack": kitsuneSpecialAttack,
            "hurt": kitsuneHurt,
            "die": kitsuneDeath,
            "block": kitsuneBlock,
            "walk": kitsuneWalk,
            "fireball": kitsuneFireball,
            "big_fireball": kitsuneBigFireball,
        };
        super(name, 5, 15, x, y, kitsuneAnimations, 128, 128, playerNumber, opponent);
         // Kitsune initializations
         this.basicAttackSpeed = 3;
         this.heavyAttackSpeed = 5;
         this.specialAttackSpeed = 10;
         this.health = 100;
         this.fireball = false;
         this.bigBall = false;
         
    }
    // Kitsune Basic Attack - Swipes tail and deals damage directly in front

    // Kitsune Heavy Attack - fires a small fireball after a delay
    heavyAttack() {
        this.currAnimation = "heavyAttack";
        this.hitboxes.attack('heavy');
        if(this.spriteAnimations[this.currAnimation].currentFrame == 3 && this.fireball == false) {
            projectiles.push(new Projectile(this.x, this.y + 18, this.spriteAnimations["fireball"], this.direction, 64, 64, 10, 8, this.opponent));
            this.fireball = true;
        }

        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.fireball = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    // Kitsune Special Attack - floats for the animation and fires 3 big fireballs
    specialAttack() {
        this.currJumpSpeed = 0;
        this.currAnimation = "specialAttack";
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            if(this.bigBall == false) {
                if(this.direction == 0) {
                    projectiles.push(new Projectile(this.x + 20, this.y + 18, this.spriteAnimations["big_fireball"], this.direction, 64, 64, 20, 6, this.opponent));
                    projectiles.push(new Projectile(this.x + 20, this.y + 8, this.spriteAnimations["big_fireball"], this.direction, 64, 64, 20, 6, this.opponent));
                    projectiles.push(new Projectile(this.x + 20, this.y + 28, this.spriteAnimations["big_fireball"], this.direction, 64, 64, 20, 6, this.opponent));

                } else {
                    projectiles.push(new Projectile(this.x - 20, this.y + 18, this.spriteAnimations["big_fireball"], this.direction, 64, 64, 20, 6, this.opponent));
                    projectiles.push(new Projectile(this.x - 20, this.y + 8, this.spriteAnimations["big_fireball"], this.direction, 64, 64, 20, 6, this.opponent));
                    projectiles.push(new Projectile(this.x - 20, this.y + 28, this.spriteAnimations["big_fireball"], this.direction, 64, 64, 20, 6, this.opponent));
                }
            }
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    // Kitsune Cannot Block
    block() {
        this.currAnimation = "idle";
        this.state = false;
    }
    
}

class BlackRaven extends Character{
    constructor(name, x, y, playerNumber, opponent=null) {
        let ravenAnimations = {
            "idle": ravenIdle,
            "run": ravenRun,
            "jump": ravenJump,
            "basicAttack": ravenBasicAttack,
            "heavyAttack": ravenHeavyAttack,
            "specialAttack": ravenSpecialAttack,
            "hurt": ravenHurt,
            "die": ravenDeath,
            "block": ravenBlock,
        };
        super(name, 5, 15, x, y, ravenAnimations, 128, 128, playerNumber, opponent);
        this.basicAttackSpeed = 5;
        this.heavyAttackSpeed = 10;
        this.specialAttackSpeed = 20;
    }
}

/*
    Creates a Projectile Object
    Params:
        x - starting x position of the projectile
        y - starting y position of the projectile
        animation - sprite animation of the projectile
        direction - 0 for right, 1 for left
        damage - damage the projectile does
        speed - speed of the projectile
*/
class Projectile {
    constructor(x,y, animation, direction, width, height, damage, speed, opponent) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.animation = new Sprite(animation, this.x, this.y, width, height, 10);
        this.direction = direction;
        this.damage = damage;
        this.opponent = opponent;
        this.hitrad = 8;
    }

    move() {
        imageMode(CENTER);

        // hitbox work
        fill('green');
        rect(this.x-this.hitrad, this.y-this.hitrad, this.hitrad*2, this.hitrad*2);

        this.animation.display(this.x, this.y, this.direction);
        if(this.direction == 0) {
            this.x += this.speed;
        } else {
            this.x -= this.speed;
        }

    }

    // checks if projectile hit opponent
    check() {
        this.opponent.hitboxes.checkHitProjectile(this);
    }
}

// class to represent a hitbox for a character.
// Takes 4 params: min/max x and min.max y
// which define the 'box'
class HitBox {
    constructor(left, right, top, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }
}

// holds all the hitboxes for each character
// two options: per-state hitboxes (tedious), or just per direction (easier)
class HitBoxes {
    constructor(father) {
        this.char = father;

        this.direction = [ [new HitBox(-25, 5, -5, 46), new HitBox(-10, 5, 45, 63)], 
                           [new HitBox(-5, 25, -5, 46), new HitBox(-5, 10, 45, 63)]];

        this.attacks = {
            light: [new HitBox(15, 40, 0, 25)],
            heavy: [new HitBox(15, 40, 0, 25)],
            special: [new HitBox(15, 40, 0, 25)]
        }
    }

    // check if the attack passed in hit the char's hitbox, or if blocked
    checkHit(attack) {
        // TODO
    }

    checkHitProjectile(proj) {
        
        this.direction[this.char.direction].forEach(h => {
            if ( (proj.x-proj.hitrad <= h.right) && 
                 (proj.x+proj.hitrad >= h.left) && 
                 (proj.y-proj.hitrad >= h.top) && 
                 (proj.y+proj.hitrad <= h.bottom) ) 
            {
                // it's a hit!
                
            }
        })
    }

    draw() {
        stroke('red');
        strokeWeight(3);

        this.direction[this.char.direction].forEach(h => {
                line(h.left+this.char.x, h.top+this.char.y, h.left+this.char.x, h.bottom+this.char.y);
                line(h.right+this.char.x, h.top+this.char.y, h.right+this.char.x, h.bottom+this.char.y);
                line(h.left+this.char.x, h.top+this.char.y, h.right+this.char.x, h.top+this.char.y);
                line(h.left+this.char.x, h.bottom+this.char.y, h.right+this.char.x, h.bottom+this.char.y);
            });



        noStroke();
    }

    // draws attack hitbox
    attack(type) {
        stroke('green');
        console.log(type);
        this.attacks[type].forEach(h => {
            line(h.left+this.char.x, h.top+this.char.y, h.left+this.char.x, h.bottom+this.char.y);
            line(h.right+this.char.x, h.top+this.char.y, h.right+this.char.x, h.bottom+this.char.y);
            line(h.left+this.char.x, h.top+this.char.y, h.right+this.char.x, h.top+this.char.y);
            line(h.left+this.char.x, h.bottom+this.char.y, h.right+this.char.x, h.bottom+this.char.y);
        });

        noStroke();
    }
}