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
    constructor(x,y, animation, direction, width, height, damage, speed, opponent, rad=8) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.animation = new Sprite(animation, this.x, this.y, width, height, 10);
        this.direction = direction;
        this.damage = damage;
        this.opponent = opponent;
        this.hitrad = rad;
    }

    move() {
        imageMode(CENTER);

        // hitbox work
        if (debug) {
            fill('green');
            rect(this.x-this.hitrad, this.y-this.hitrad, this.hitrad*2, this.hitrad*2);
        }

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
        this.x = width+20;
        this.direction = 0;
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