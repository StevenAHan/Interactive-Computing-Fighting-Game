// class to represent a hitbox for a character.
// Takes 4 params: min/max x and min.max y
// which define the 'box'
class HitBox {
    constructor(left, right, top, bottom, damage=20) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
        this.damage = damage;
    }
}

// holds all the hitboxes for each character
// two options: per-state hitboxes (tedious), or just per direction (easier)
class HitBoxes {
    constructor(father, lattackl, lattackr, lattackt, lattackb, hattackl, hattackr, hattackb, hattackt, 
        sattackl, sattackr, sattackb, sattackt, dmgl, dmgh, dmgs) {
        this.char = father;
        this.direction;

        switch (father.name) {
            case "Kitsune":
                this.direction = [ [new HitBox(-25, 5, -5, 46), new HitBox(-10, 5, 45, 63)], 
                                   [new HitBox(-5, 25, -5, 46), new HitBox(-5, 10, 45, 63)]];
                break;
            case "Raven":
                this.direction = [ [new HitBox(-25, 25, -20, 46), new HitBox(-10, 25, 45, 63)], 
                                   [new HitBox(-25, 25, -20, 46), new HitBox(-15, 10, 45, 63)]];
                break;
            case "Fighter":
                this.direction = [ [new HitBox(-15, 10, -15, 46), new HitBox(-15, 10, 45, 63)], 
                                   [new HitBox(-10, 15, -15, 46), new HitBox(-10, 15, 45, 63)]];
                break;
            case "Samurai":
                this.direction = [ [new HitBox(-20, 15, -7, 46), new HitBox(-10, 15, 45, 63)], 
                                   [new HitBox(-15, 20, -7, 46), new HitBox(-15, 10, 45, 63)]];
                break;
            case "Raider":
                this.direction = [ [new HitBox(-15, 15, 0, 46), new HitBox(-10, 15, 45, 63)], 
                                   [new HitBox(-15, 20, 0, 46), new HitBox(-15, 10, 45, 63)]];
                break;



        }
        this.attacks = {
            // first list is facing right, second facing left
            light:[[new HitBox(lattackl, lattackr, lattackt, lattackb, dmgl)], [new HitBox(-lattackl, -lattackr, lattackt, lattackb, dmgl)]],
            heavy:[[new HitBox(hattackl, hattackr, hattackb, hattackt, dmgh)], [new HitBox(-hattackl, -hattackr, hattackb, hattackt, dmgh)]],
            special: [[new HitBox(sattackl, sattackr, sattackb, sattackt, dmgs)], [new HitBox(-sattackl, -sattackr, sattackb, sattackt, dmgs)]]
        }
    }

    // check if the attack passed in hit the char's hitbox, or if blocked
    // expected input: the opponent, and the attack type
    checkHit(opponent, attackType) {
        let char = this.char;
        let attack = opponent.hitboxes.attacks[attackType][opponent.direction]; // the attack hitbox array
        
        this.direction[this.char.direction].forEach(h => {
            attack.forEach(a => {
                if ( ((opponent.x+a.left   > char.x+h.left && opponent.x+a.left   < char.x+h.right  ) || 
                      (opponent.x+a.right  > char.x+h.left && opponent.x+a.right  < char.x+h.right  ) ||
                      (opponent.x+a.left   < char.x+h.left && opponent.x+a.right  > char.x+h.right  ) ||
                      (opponent.x+a.right  < char.x+h.left && opponent.x+a.left   > char.x+h.right  ) ) &&
                     ((opponent.y+a.top    > char.y+h.top  && opponent.y+a.top    < char.y+h.bottom ) || 
                      (opponent.y+a.bottom > char.y+h.top  && opponent.y+a.bottom < char.y+h.bottom ) ||  
                      (opponent.y+a.top    < char.y+h.top  && opponent.y+a.bottom > char.y+h.bottom ) ||
                      (opponent.y+a.bottom < char.y+h.top  && opponent.y+a.top    > char.y+h.bottom ) )
                ) {
                    if (debug) {
                        console.log("hit!");
                    }
                    if(char.immune == false) {
                        char.takeDamage(a.damage);
                    }
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

    // draws body hitboxes if debug is set
    draw() {
        if ( debug ) {
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
    }

    // draws attack hitbox if debug is set
    attack(type) {

        if (debug) {
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
}