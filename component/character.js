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
        //this.hitboxes = new HitBoxes(this);
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
        this.dying = false;
        this.health = 100;
        this.origHealth = this.health;
        this.healthPercentage = 1;
        // list of character's projectiles in existence
        this.projectiles = [];
        this.getHurt = false;
        this.immune = false;

        this.offset = offset;
        this.blocking = false;
        this.basicSound = false;
        this.heavySound = false;
        this.specialSound = false;
        this.spriteHurt = this.spriteAnimations.hurt;

        //platformer
        this.bottom=0;
        this.top=0
        this.onplat = false;
    }

    // Sets up the character, should only run once in the beginning
    setup() {
        this.origHealth = this.health;
        this.spriteAnimations.idle = new Sprite(this.spriteAnimations.idle, this.x, this.y, this.spriteWidth, this.spriteHeight, 5, this.offset);
        this.spriteAnimations.run = new Sprite(this.spriteAnimations.run, this.x, this.y, this.spriteWidth, this.spriteHeight, 5, this.offset);
        let jumpTiming = (60 / ((this.jumpSpeed ) / this.gravity));
        this.spriteAnimations.jump = new Sprite(this.spriteAnimations.jump, this.x, this.y, this.spriteWidth, this.spriteHeight, jumpTiming, this.offset);
        this.spriteAnimations.basicAttack = new Sprite(this.spriteAnimations.basicAttack, this.x, this.y, this.spriteWidth, this.spriteHeight, this.basicAttackSpeed, this.offset);
        this.spriteAnimations.heavyAttack = new Sprite(this.spriteAnimations.heavyAttack, this.x, this.y, this.spriteWidth, this.spriteHeight, this.heavyAttackSpeed, this.offset);
        this.spriteAnimations.specialAttack = new Sprite(this.spriteAnimations.specialAttack, this.x, this.y, this.spriteWidth, this.spriteHeight, this.specialAttackSpeed, this.offset);
        this.spriteAnimations.hurt = new Sprite(this.spriteAnimations.hurt, this.x, this.y, this.spriteWidth, this.spriteHeight, 15, this.offset);
        this.spriteAnimations.block = new Sprite(this.spriteAnimations.block, this.x, this.y, this.spriteWidth, this.spriteHeight, 5, this.offset);
        this.spriteAnimations.die = new Sprite(this.spriteAnimations.die, this.x, this.y, this.spriteWidth, this.spriteHeight, 10, this.offset);
    }

    displayAndMove() {
        if(this.x > 1200) {
            this.x = 1200;
        }
        if(this.x < 0) {
            this.x = 0;
        }

        if(this.immune != false) {
            this.immune++;
            if(this.immune == 50) {
                this.immune = false;
            }
        }
        if(this.dying) {
            this.die();
        }
        if(this.getHurt) {
            this.hurt();
        }
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
            }

            
        }

        // Player 2 controls
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
            }
        }

        if(this.y > this.ground) {
            this.y = this.ground;
            this.jumping = false;
            this.currJumpSpeed = this.jumpSpeed;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }

        // Jump once triggered-PLATFORMER CODE
        this.refreshSensors(); //for movement and collision detection
        if(this.jumping) {
            this.jump();
            this.currAnimation = "jump";
            var check= this.onSolid();
            console.log(this.onSolid())
            if(check[0] == "top"){
                this.ground=check[1]
                this.onplat = true;
            }
        }

        if(this.onplat && this.onSolid()[0] == "none" && this.y<ground){
            this.y+=this.gravity
            this.ground=600;
        }
        if(this.y > 600){
            this.onplat = false;
        }


        // check states
        if(!this.dying || !this.dead) {
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
            if(this.state == "hurt") {
                this.currAnimation = "hurt";
            }
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
        if(!this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.hitboxes.attack('light');
            this.opponent.hitboxes.checkHit(this, 'light');
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    heavyAttack() {
        this.currAnimation = "heavyAttack";
        if(!this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.hitboxes.attack('heavy');
            this.opponent.hitboxes.checkHit(this, 'heavy');
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    specialAttack() {
        this.currAnimation = "specialAttack";
        if(!this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.hitboxes.attack('special');
            this.opponent.hitboxes.checkHit(this, 'special');
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    block() {
        this.currAnimation = "block";
        this.blocking = true;
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.blocking = false
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    takeDamage(amount) {
        this.spriteAnimations[this.currAnimation]?.resetFrames();
        this.immune = 1;
        hurtSound.play()
        if(this.blocking) {
            this.health -= amount / 2;
        } else {
            this.spriteAnimations.hurt = new Sprite(this.spriteHurt, this.x, this.y, this.spriteWidth, this.spriteHeight, 1.5 * ((amount- (amount % 2)) / 2), this.offset);
            this.health -= amount;
            this.getHurt = true;
        }
        if(this.health <= 0) {
            this.dying = true;
        } 
        this.healthPercentage = this.health / this.origHealth;

        if (debug) {
            console.log("damage: " + amount, "health: " + this.health, "percentage: " + this.healthPercentage);
        }
    }

    die() {
        this.currAnimation = "die";
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.dead = true;
        }
    }

    hurt() {
        this.state = "hurt";
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.getHurt = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            if(this.immune != false) {
                this.immune = 40;
            }
        }
    }
    
    //PLATFORMER CODE
    refreshSensors() {
        // this.left = [this.x, this.y + 35 / 2];
        // this.right = [this.x + 35, this.y + 35 / 2];
        this.top = [this.x + 30 / 2, this.y];
        console.log(this.y)
        this.bottom = [this.x + 30 / 2, this.y+50 + 30];
      }
    
  onSolid() {
    let tilerc = map1.getLoc(this.bottom[0], this.bottom[1]); //get tile under
    console.log(tilerc) //(7,18)
    var row = int(tilerc[1])
    var col = int(tilerc[0])
    if(map1.get(row, col)){
        console.log("char:" + this.y)
        var locy = int((row-2) * 30)
        console.log("loc:"+locy)
        return ["top",locy];
    }
    console.log("char:" + this.y)
    return ["none", locy];
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
            "thumbnail": kitsuneIdle,
        };
        super(name, 5, 15, x, y, kitsuneAnimations, 128, 128, playerNumber, opponent);
         // Kitsune initializations
         this.basicAttackSpeed = 3;
         this.heavyAttackSpeed = 5;
         this.specialAttackSpeed = 10;
         this.health = 125;
         this.fireball = false;
         this.bigBall = false;
         this.hitboxes = new HitBoxes(this, 0, 50, 5, 50, 0, 0, 0, 0, 0, 0, 0, 0, 15);
    }
    // Kitsune Basic Attack - Swipes tail and deals damage directly in front
    basicAttack() {
        this.currAnimation = "basicAttack";
        if(this.spriteAnimations[this.currAnimation].currentFrame > 6) {
            this.hitboxes.attack('light');
        }
        this.opponent.hitboxes.checkHit(this, 'light');
        if(this.spriteAnimations[this.currAnimation].actionEnd() && this.basicSound == false) {
            kitsune_basic.setVolume(0.5);
            kitsune_basic.play();
            this.basicSound = true;
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.basicSound = false;
        }
    }

    // Kitsune Heavy Attack - fires a small fireball after a delay
    heavyAttack() {
        this.currAnimation = "heavyAttack";
        this.hitboxes.attack('heavy');
        this.opponent.hitboxes.checkHit(this, 'heavy');
        if(this.spriteAnimations[this.currAnimation].currentFrame == 3 && this.fireball == false) {
            projectiles.push(new Projectile(this.x, this.y + 18, this.spriteAnimations["fireball"], this.direction, 64, 64, 10, 8, this.opponent));
            this.fireball = true;
            kitsune_heavy.setVolume(0.5)
            kitsune_heavy.play()
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
        this.opponent.hitboxes.checkHit(this, 'light');
        if(this.spriteAnimations[this.currAnimation].currentFrame == 3 && this.specialSound == false) {
            kitsune_special.setVolume(0.3)
            kitsune_special.play()
            this.specialSound = true;
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            if(this.bigBall == false) {
                if(this.direction == 0) {
                    projectiles.push(new Projectile(this.x + 20, this.y + 18, this.spriteAnimations["big_fireball"], this.direction, 64, 64, 10, 6, this.opponent));
                    projectiles.push(new Projectile(this.x + 20, this.y + 8, this.spriteAnimations["big_fireball"], this.direction, 64, 64, 10, 6, this.opponent));
                    projectiles.push(new Projectile(this.x + 20, this.y + 28, this.spriteAnimations["big_fireball"], this.direction, 64, 64, 10, 6, this.opponent));

                } else {
                    projectiles.push(new Projectile(this.x - 20, this.y + 18, this.spriteAnimations["big_fireball"], this.direction, 64, 64, 10, 6, this.opponent));
                    projectiles.push(new Projectile(this.x - 20, this.y + 8, this.spriteAnimations["big_fireball"], this.direction, 64, 64, 10, 6, this.opponent));
                    projectiles.push(new Projectile(this.x - 20, this.y + 28, this.spriteAnimations["big_fireball"], this.direction, 64, 64, 10, 6, this.opponent));
                }
            }
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.specialSound = false;
        }
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
            "thumbnail": ravenIdle,
        };
        super(name, 8, 20, x, y, ravenAnimations, 128, 128, playerNumber, opponent);
        this.basicAttackSpeed = 5;
        this.heavyAttackSpeed = 20;
        this.specialAttackSpeed = 12;
        this.strike = false;
        this.health = 150;
        this.special = false;
        this.hitboxes = new HitBoxes(this, 10, 70, 0, 30, 40, 90, -10, 45, 80, 220, -60, 60, 10, 20, 40);
    }
    
    basicAttack() {
        this.currAnimation = "basicAttack";
        if(this.spriteAnimations[this.currAnimation].currentFrame > 0) {
            this.hitboxes.attack('light');
            this.opponent.hitboxes.checkHit(this, 'light');
        }
        if(this.spriteAnimations[this.currAnimation].currentFrame == 0 && this.basicSound == false) {
            raven_basic.setVolume(0.7)
            raven_basic.play()
            this.basicSound = true;
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.basicSound = false;
        }
    }

    heavyAttack() {
        this.currAnimation = "heavyAttack";
        if(this.spriteAnimations[this.currAnimation].currentFrame < 1) {
            this.hitboxes.attack('heavy');
            this.opponent.hitboxes.checkHit(this, 'heavy');
        }
        if(this.strike == false) {
            tprojectiles.push(new TempProjectile(this.x + 50 * this.dirMultiplier(), this.y + 13, this.spriteAnimations["ravenStrike"], this.direction, 10, 2, this.opponent, 150, 100));
            this.strike = true;
            raven_heavy.setVolume(0.7)
            raven_heavy.play()
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.strike = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }

    specialAttack() {
        this.currAnimation = "specialAttack";
        if(this.spriteAnimations[this.currAnimation].currentFrame >= 4) {
            this.hitboxes.attack('special');
            this.opponent.hitboxes.checkHit(this, 'special');
        }
        if(this.spriteAnimations[this.currAnimation].currentFrame == 1 && this.specialSound == false && this.specialSound == false) {
            raven_special.setVolume(0.5)
            raven_special.play()
            this.specialSound = true;
        }
        if(this.special == false && this.spriteAnimations[this.currAnimation].currentFrame == 4) {
            
            tprojectiles.push(new TempProjectile(this.x + 100 * this.dirMultiplier(), this.y, this.spriteAnimations["ravenSpecial"], this.direction, 35, 5, this.opponent, 300, 200));
            this.special = true;
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.special = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.specialSound = false;
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
            "thumbnail": werewolfIdle,
        };
        super(name, 5, 15, x, y, animations, 128, 128, playerNumber, opponent);
        this.basicAttackSpeed = 5;
        this.heavyAttackSpeed = 5;
        this.specialAttackSpeed = 5;
        this.hitboxes = new HitBoxes(this, 15, 40, 5, 50, 0, 0, 0, 0, 0, 0, 0, 0);
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
            "thumbnail": samuraiIdle,
        };
        super(name, 7, 15, x, y, animations, 128, 128, playerNumber, opponent);
        this.basicAttackSpeed = 8;
        this.heavyAttackSpeed = 5;
        this.specialAttackSpeed = 5;
        this.health = 150;
        this.arrow = false;
        this.hitboxes = new HitBoxes(this, 15, 70, 5, 30, 0, 0, 0, 0, 10, 70, -10, 50, 15, 0, 30);
    }
    basicAttack() {
        this.currAnimation = "basicAttack";
        if(this.spriteAnimations[this.currAnimation].currentFrame > 1) {
            this.hitboxes.attack('light');
            this.opponent.hitboxes.checkHit(this, 'light');
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd() && this.basicSound == false) {
            samurai_basic.setVolume(0.4)
            samurai_basic.play()
            this.basicSound = true;
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.basicSound = false;
        }
    }

    heavyAttack() {
        this.currAnimation = "heavyAttack";
        this.hitboxes.attack('heavy');
        if(this.arrow == false && this.spriteAnimations[this.currAnimation].currentFrame == 12) {
            projectiles.push(new Projectile(this.x + 50 * this.dirMultiplier(), this.y + 13, this.spriteAnimations["arrow"], this.direction, 64, 64, 20, 10, this.opponent));
            this.arrow = true;
        }
        if(this.spriteAnimations[this.currAnimation].currentFrame == 12 && this.heavySound == false) {
            samurai_heavy.setVolume(0.7)
            samurai_heavy.play()
            this.heavySound = true;
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {   
            this.state = false;
            this.arrow = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.heavySound = false;
        }
    }

    specialAttack() {
        this.currAnimation = "specialAttack";
        if(this.spriteAnimations[this.currAnimation].currentFrame == 0 && this.specialSound == false) {
            samurai_special.setVolume(0.7)
            samurai_special.play()
            this.specialSound = true;
        }
        if(!this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.hitboxes.attack('special');
            this.opponent.hitboxes.checkHit(this, 'special');
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.specialSound = false;
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
            "thumbnail": fighterIdle,
        };
        super(name, 8.5, 15, x, y, animations, 128, 128, playerNumber, opponent);
        this.basicAttackSpeed = 6;
        this.heavyAttackSpeed = 30;
        this.specialAttackSpeed = 20;
        this.fball = false;
        this.health = 200;
        this.hitboxes = new HitBoxes(this, 0, 35, 0, 30, 0, 0, 0, 0, 0, 50, 5, 30, 20, 0, 15);
    }

    basicAttack() {
        this.currAnimation = "basicAttack";
        if(this.spriteAnimations[this.currAnimation].currentFrame == 2 && this.basicSound == false) {
            fighter_basic.setVolume(0.5)
            fighter_basic.play()
            this.basicSound = true;
        }
        if(!this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.hitboxes.attack('light');
            this.opponent.hitboxes.checkHit(this, 'light');
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.basicSound = false;
        }
    }

    heavyAttack() {
        this.currAnimation = "block";
        this.blocking = true;
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.blocking = false
            this.spriteAnimations[this.currAnimation].resetFrames();
        }
    }
    
    specialAttack() {
        this.currAnimation = "specialAttack";
        if(this.spriteAnimations[this.currAnimation].currentFrame >= 2) {
            this.hitboxes.attack('special');
            this.opponent.hitboxes.checkHit(this, 'heavy');
        }
        if(this.fball == false && this.spriteAnimations[this.currAnimation].currentFrame == 2) {
            kitsune_heavy.setVolume(0.5)
            kitsune_heavy.play()
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

class Raider extends Character {
    constructor(name, x, y, playerNumber, opponent=null) {
        let animations = {
            "idle": raiderIdle,
            "run": raiderRun,
            "jump": raiderJump,
            "basicAttack": raiderBasicAttack,
            "heavyAttack": raiderHeavyAttack,
            "specialAttack": raiderSpecialAttack,
            "hurt": raiderHurt,
            "die": raiderDeath,
            "thumbnail": raiderIdle,
            "block": raiderIdle,
            "heavyProj": raiderHeavyBullet,
            "specialProj": raiderSpecialBullet,
        };
        super(name, 5, 15, x, y, animations, 128, 128, playerNumber, opponent);
        this.basicAttackSpeed = 6;
        this.heavyAttackSpeed = 5;
        this.specialAttackSpeed = 20;
        this.health = 150;
        this.hitboxes = new HitBoxes(this, 0, 35, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 20, 0, 15);
        this.heavyProj = false;
        this.specialProj = false;
    }


    basicAttack() {
        this.currAnimation = "basicAttack";
        if(this.spriteAnimations[this.currAnimation].currentFrame > 1) {
            this.hitboxes.attack('light');
            this.opponent.hitboxes.checkHit(this, 'light');
        }

        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.basicSound = false;
        }
    }

    heavyAttack() {
        this.currAnimation = "heavyAttack";
        this.hitboxes.attack('heavy');
        if(this.heavyProj == false && this.spriteAnimations[this.currAnimation].currentFrame == 2) {
            projectiles.push(new Projectile(this.x + 50 * this.dirMultiplier(), this.y + 25, this.spriteAnimations["heavyProj"], this.direction, 64, 64, 5, 15, this.opponent));
            this.heavyProj = true;
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {   
            this.state = false;
            this.heavyProj = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.heavySound = false;
        }
    }

    specialAttack() {
        this.currAnimation = "specialAttack";
        if(this.specialProj == false && this.spriteAnimations[this.currAnimation].currentFrame == 2) {
            projectiles.push(new Projectile(this.x + 50 * this.dirMultiplier(), this.y + 13, this.spriteAnimations["specialProj"], this.direction, 64, 64, 20, 15, this.opponent, 12));
            this.specialProj = true;
        }
        if(!this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.hitboxes.attack('special');
            this.opponent.hitboxes.checkHit(this, 'special');
        }
        if(this.spriteAnimations[this.currAnimation].actionEnd()) {
            this.state = false;
            this.spriteAnimations[this.currAnimation].resetFrames();
            this.specialSound = false;
            this.specialProj = false;
        }
    }

}


class Health_L {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.health = 1; // Health starts at 100%
    }


    // Call this method to update the display of the health bar
    display(health) {
        this.health = Math.max(0,health);;
        stroke(51);
        fill(255, 0, 0);
        // Width of the health bar is now proportional to the health property
        rect(this.x, this.y, (width * 3 / 7) * this.health, 25);
    }
}

class Health_R {
    constructor(x, y, maxWidth) {
        this.x = x;
        this.y = y;
        this.maxWidth = maxWidth; // The total width of the health bar at full health
        this.health = 1; // Health starts at 100%
    }

    // Call this method to update the display of the health bar
    display(health) {
        this.health = Math.max(0,health);
        stroke(51);
        fill(255, 0, 0);
        // Calculate the current width of the health bar based on the health
        let currentWidth = this.maxWidth * this.health;
        rect(this.x, this.y, currentWidth, 25);
    }
}



  

