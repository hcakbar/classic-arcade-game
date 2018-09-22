'use strict';
// Enemies our player must avoid
let level = 0;
var Enemy = function (x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 85;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //setting speed based on game level
    this.speed = getRandomNumber(level, 5);

    if (this.x > 600) {
        this.x = -100;
    } else {
        this.x += 100 * this.speed * dt;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 85;
    this.sprite = 'images/char-boy.png';
    level++;
}
// This class requires an update(), render() and
const levelContainer = document.querySelector('.level');
Player.prototype.update = function (dt) {
    if(this.y < -35) {
        //setting player position back and increasing a level
        player.y = 400;
        level++;
        levelContainer.innerHTML = level;
        if(level === 4) {
            alert('Congratulation: You Win! Completed level: ' + (level -1));
            level = 0;
            levelContainer.innerHTML = level;
        }
    }
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// a handleInput() method.


// Now instantiate your objects.
let enemy1 = new Enemy(0, 60);
let enemy2 = new Enemy(-300, 60);
let enemy3 = new Enemy(-200, 145);
let enemy4 = new Enemy(-350, 230);
let enemy5 = new Enemy(-0, 230);
let enemy6 = new Enemy(350, 145);
let enemy7 = new Enemy(150, 230);

// Place all enemy objects in an array called allEnemies
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

// Place the player object in a variable called player
let player = new Player(200, 400);


// This listens for key presses and sends the keys to your
Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'up' && this.y > -35) {
        this.y -= 85;
    }
    if (keyPress == 'down' && this.y < 390) {
        this.y += 85;
    }
    if (keyPress == 'right' && this.x < 400) {
        this.x += 100;
    }
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 100;
    }
}
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function getRandomNumber(ninNum, maxNum) {
    ninNum = Math.ceil(ninNum);
    maxNum = Math.floor(maxNum);
    return Math.floor(Math.random() * (maxNum - ninNum)) + ninNum;
}
