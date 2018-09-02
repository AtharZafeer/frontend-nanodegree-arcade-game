//reset function
 function reset(obj){
    obj.x = 202;
    obj.y = 405;
}
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed= speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
//this wikl add sounds
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
let wins=0;
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+= this.speed*dt;
    if(this.x >= 510){
        this.x = -50;
        this.speed = 100 + Math.floor(Math.random() * 222);
    }
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y) {
        reset(player);
        (wins>0)?wins-- :wins;
        mySound = new sound("audio/352041__robinhood76__06784-cartoon-admiration-wows-[AudioTrimmer.com].wav");
        mySound.play();
        
    };
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillText("Score: " + wins, 40, 70);
};

let Player = function(x,y){         //player function
    reset(this);
    this.sprite= 'images/char-boy.png';
    
}

Player.prototype.update = function(dt){
    
}
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x , this.y); // player render function

}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.handleInput= function(keyPress){
    if(keyPress == "left" && this.x >0){
        this.x-=105;
    }
    if(keyPress == "right" && this.x< 310){
        this.x+=105;
    }
    if(keyPress == "up" && this.y > 0){
        this.y-=83;
    }
    if(keyPress == "down" && this.y < 400){
        this.y+=83;
    } 
    if(this.y < 5){
        reset(this);
        wins++;
        mySound = new sound("audio/211566__ballistiq85__laugh-1-[AudioTrimmer.com].wav");
        mySound.play();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let allEnemies = [];
for (var i = 0; i < 3; i++) {
    //startSpeed is a random number from 1-10 times speedMultiplier
    var startSpeed = 100 * Math.floor(Math.random() * 10 + 1);
    //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    e.preventDefault();
    player.handleInput(allowedKeys[e.keyCode]);
});
//added support to play in mobile
 //document.querySelector("div");

 var keys=document.body.querySelector('div');
 keys.addEventListener('click', function(e) {
   
    var allowedKeys = {
        left: 'left',
        up: 'up',
        right: 'right',
        down: 'down'
    };
    player.handleInput(allowedKeys[e.target.id]);
});