var allEnemies=[];
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's   position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
        this.x = 0;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
///////////////////////////////////////////////
/* This function from another Github project*/
//////////////////////////////////////////////
var createEnemies = function() {
    var enemy1 = new Enemy(0, 60 , 350);
    var enemy2 = new Enemy(0,140 , 240 );
    var enemy3 = new Enemy(0,220 ,150);
    allEnemies = [enemy1 , enemy2 , enemy3];
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 202.5;
    this.y = 383;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function() {
  this.checkCollisions();
    if (this.x < 0) {
        this.x = 0;
    } else if (this.x > 400) {
        this.x = 400;
    } else if (this.y < -10)
    {
        if(this.x < 505 && this.x > 0 )
        {
          alert("You Win");
          this.Reset();
        }
          else
          {
            this.y = -10;
          }

    }
    else if (this.y > 400) {
        this.y = 400;
    }



};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.checkCollisions = function() {
    var width = 15;
    var height= 25 ;
    for (var i = 0; i < allEnemies.length; i++)
    {

      if (this.x < allEnemies[i].x + width &&
            this.x + width > allEnemies[i].x &&
            this.y < allEnemies[i].y + height &&
            height + this.y > allEnemies[i].y)
              {
                  alert('collide');
                  this.Reset();

              }
  }
};
Player.prototype.handleInput = function(direction) {

    if (direction == 'left')
    {
        this.x -= 101;
    }

    if (direction == 'right')
    {
        this.x += 101;
    }

    if (direction == 'up')
    {
        this.y -= 83;
    }

    if (direction == 'down')
     {
        this.y += 83;

     }
};
Player.prototype.Reset = function(){
  this.x = 202.5;
  this.y = 383;
};

var player = new Player();
createEnemies();

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/* Reset*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
