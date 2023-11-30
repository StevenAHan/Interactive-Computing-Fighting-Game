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