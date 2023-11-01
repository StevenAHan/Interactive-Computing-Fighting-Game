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
    constructor(name, speed, jumpSpeed, x, y, spriteAnimations, spriteWidth, spriteHeight, playerNumber, opponent=null, offset=0) {
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

        this.offset = offset;
    }

    // Sets up the character, should only run once in the beginning
    setup() {
        this.spriteAnimations.idle = new Sprite(this.spriteAnimations.idle, this.x, this.y, this.spriteWidth, this.spriteHeight, 5, this.offset);
        this.spriteAnimations.run = new Sprite(this.spriteAnimations.run, this.x, this.y, this.spriteWidth, this.spriteHeight, 5, this.offset);
        let jumpTiming = (60 / ((this.jumpSpeed ) / this.gravity));
        this.spriteAnimations.jump = new Sprite(this.spriteAnimations.jump, this.x, this.y, this.spriteWidth, this.spriteHeight, jumpTiming, this.offset);
        this.spriteAnimations.basicAttack = new Sprite(this.spriteAnimations.basicAttack, this.x, this.y, this.spriteWidth, this.spriteHeight, this.basicAttackSpeed, this.offset);
        this.spriteAnimations.heavyAttack = new Sprite(this.spriteAnimations.heavyAttack, this.x, this.y, this.spriteWidth, this.spriteHeight, this.heavyAttackSpeed, this.offset);
        this.spriteAnimations.specialAttack = new Sprite(this.spriteAnimations.specialAttack, this.x, this.y, this.spriteWidth, this.spriteHeight, this.specialAttackSpeed, this.offset);
        this.spriteAnimations.hurt = new Sprite(this.spriteAnimations.hurt, this.x, this.y, this.spriteWidth, this.spriteHeight, 5, this.offset);
        this.spriteAnimations.block = new Sprite(this.spriteAnimations.block, this.x, this.y, this.spriteWidth, this.spriteHeight, 5, this.offset);
        this.spriteAnimations.die = new Sprite(this.spriteAnimations.die, this.x, this.y, this.spriteWidth, this.spriteHeight, 10, this.offset);
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
        this.opponent.hitboxes.checkHit(this, 'light');

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

    takeDamage(amount) {
        // TODO
        console.log("damage: " + amount);

    }

    die() {
        this.currAnimation = "die";
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.dead = true;
        }
    }


    dirMultiplier() {
        if(this.direction == 0) {
            return 1;
        } else {
            return -1;
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
        this.opponent.hitboxes.checkHit(this, 'heavy');
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

class Raven extends Character{
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
            "ravenStrike": ravenStrike,
            "ravenSpecial": ravenSpecial,
        };
        super(name, 8, 20, x, y, ravenAnimations, 128, 128, playerNumber, opponent);
        this.basicAttackSpeed = 5;
        this.heavyAttackSpeed = 20;
        this.specialAttackSpeed = 12;
        this.strike = false;
        this.special = false;
    }

    heavyAttack() {
        this.currAnimation = "heavyAttack";
        this.hitboxes.attack('heavy');
        if(this.strike == false) {
            tprojectiles.push(new TempProjectile(this.x + 50 * this.dirMultiplier(), this.y + 13, this.spriteAnimations["ravenStrike"], this.direction, 10, 2, this.opponent, 150, 100));
            this.strike = true;
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.strike = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    specialAttack() {
        this.currAnimation = "specialAttack";
        this.hitboxes.attack('special');
        if(this.special == false && this.spriteAnimations[this.currAnimation].currentFrame == 4) {
            tprojectiles.push(new TempProjectile(this.x + 100 * this.dirMultiplier(), this.y, this.spriteAnimations["ravenSpecial"], this.direction, 10, 5, this.opponent, 300, 200));
            this.special = true;
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.special = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }
}

class Werewolf extends Character {
    constructor(name, x, y, playerNumber, opponent=null) {
        let animations = {
            "idle": werewolfIdle,
            "run": werewolfRun,
            "jump": werewolfJump,
            "basicAttack": werewolfBasicAttack,
            "heavyAttack": werewolfHeavyAttack,
            "specialAttack": werewolfSpecialAttack,
            "hurt": werewolfHurt,
            "die": werewolfDeath,
            "block": werewolfBlock,
        };
        super(name, 5, 15, x, y, animations, 128, 128, playerNumber, opponent);
        this.basicAttackSpeed = 5;
        this.heavyAttackSpeed = 5;
        this.specialAttackSpeed = 5;
    }
}

class Samurai extends Character {
    constructor(name, x, y, playerNumber, opponent=null) {
        let animations = {
            "idle": samuraiIdle,
            "run": samuraiRun,
            "jump": samuraiJump,
            "basicAttack": samuraiBasicAttack,
            "heavyAttack": samuraiHeavyAttack,
            "specialAttack": samuraiSpecialAttack,
            "hurt": samuraiHurt,
            "die": samuraiDeath,
            "block": samuraiBlock,
            "arrow": samuraiArrow,
        };
        super(name, 7, 15, x, y, animations, 128, 128, playerNumber, opponent);
        this.basicAttackSpeed = 8;
        this.heavyAttackSpeed = 5;
        this.specialAttackSpeed = 5;
        this.arrow = false;
    }

    heavyAttack() {
        this.currAnimation = "heavyAttack";
        this.hitboxes.attack('heavy');
        if(this.arrow == false && this.spriteAnimations[this.currAnimation].currentFrame == 12) {
            projectiles.push(new Projectile(this.x + 50 * this.dirMultiplier(), this.y + 13, this.spriteAnimations["arrow"], this.direction, 64, 64, 20, 10, this.opponent));
            this.arrow = true;
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.arrow = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }
}

class Fighter extends Character {
    constructor(name, x, y, playerNumber, opponent=null) {
        let animations = {
            "idle": fighterIdle,
            "run": fighterRun,
            "jump": fighterJump,
            "basicAttack": fighterBasicAttack,
            "heavyAttack": fighterHeavyAttack,
            "specialAttack": fighterSpecialAttack,
            "hurt": fighterHurt,
            "die": fighterDeath,
            "block": fighterBlock,

        };
        super(name, 8.5, 15, x, y, animations, 128, 128, playerNumber, opponent);
        this.basicAttackSpeed = 6;
        this.heavyAttackSpeed = 30;
        this.specialAttackSpeed = 10;
        this.fball = false;
    }

    heavyAttack() {
        this.currAnimation = "heavyAttack";
        this.hitboxes.attack('heavy');
        if(this.fball == false && this.spriteAnimations[this.currAnimation].currentFrame == 2) {
            projectiles.push(new Projectile(this.x + 50 * this.dirMultiplier(), this.y + 13, fighterFireball, this.direction, 64, 64, 15, 5, this.opponent));
            this.fball = true;
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.fball = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }
}

class TempProjectile {
    constructor(x,y, sequence, direction, damage, speed, opponent, h, w) {
        this.x = x;
        this.y = y;
        this.animation = new Sequence(sequence, this.x, this.y, speed, h, w);
        this.direction = direction;
        this.damage = damage;
        this.opponent = opponent;
        this.hitrad = 8;
    }

    move() {
        this.animation.display(this.direction);
    }


    delete() {
        return this.animation.checkEnd();
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

    disappear() {
        // TODO: make this projectile go away
        this.x = width+20;
        this.direction = 0;
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

        this.attacks = { // TODO: make these accurate
            light: [[new HitBox(15, 40, 0, 25)], [new HitBox(-25, 40, -10, 25)]], // first list is facing right, second facing left
            heavy: [[new HitBox(15, 40, 0, 25)], [new HitBox(15, 40, 0, 25)]],
            special: [[new HitBox(15, 40, 0, 25)], [new HitBox(15, 40, 0, 25)]]
        }
    }

    // check if the attack passed in hit the char's hitbox, or if blocked
    // expected input: the opponent, and the attack type
    checkHit(opponent, attackType) {
        // TODO
        let char = this.char;
        let attack = opponent.hitboxes.attacks[attackType][opponent.direction]; // the attack hitbox array
        
        this.direction[this.char.direction].forEach(h => {
            attack.forEach(a => {
                if ( ((opponent.x+a.left > char.x+h.left && opponent.x+a.left < char.x+h.right) || (opponent.x+a.right > char.x+h.left && opponent.x+a.right < char.x+h.right)) && 
                     ((opponent.y+a.top > char.y+h.top && opponent.y+a.top < char.y+h.bottom) || (opponent.y+a.bottom > char.y+h.top && opponent.y+a.bottom < char.y+h.bottom))
                ) {
                    // it's a hit (think it works)
                    if( this.char.state === "block" ) {
                        // TODO: blocking logic
                    }
                    char.takeDamage(20);
                    // TODO: end the attack
                }
            });
        });
    }

    checkHitProjectile(proj) {
        let char = this.char;
        this.direction[this.char.direction].forEach(h => {
            if ( (proj.x-proj.hitrad <= h.right+char.x) && 
            (proj.x+proj.hitrad >= h.left+char.x) && 
            (proj.y-proj.hitrad >= h.top+char.y) && 
            (proj.y+proj.hitrad <= h.bottom+char.y) ) 
            {
                // it's a hit!
                char.takeDamage(proj.damage);
                proj.disappear();
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
        let char = this.char;
        this.attacks[type][char.direction].forEach(h => {
            line(h.left+char.x, h.top+char.y, h.left+char.x, h.bottom+char.y);
            line(h.right+char.x, h.top+char.y, h.right+char.x, h.bottom+char.y);
            line(h.left+char.x, h.top+char.y, h.right+char.x, h.top+char.y);
            line(h.left+char.x, h.bottom+char.y, h.right+char.x, h.bottom+char.y);
        });

        noStroke();

    }
}