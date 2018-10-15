// the player function(class)
var Player = function (x, y) {
    this.x = x; //x position on canvas 
    this.y = y; //y position on canvas 

    this.sprite = new Image(); // player image
    this.sprite.src = 'images/char-cat-girl.png'; //image src

};

//fuction to draw the player on canvas
Player.prototype.render = function () {
    context.drawImage(this.sprite, this.x, this.y);
};
// function to handle the key press to move the player
Player.prototype.movement = function (keycode) {

    switch (keycode) {
        case 'left':
            if (this.x > 0) {
                this.x -= 25;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= 25;
            }
            break;
        case 'right':
            if (this.x < 520) {
                this.x += 25;
            }
            break;
        case 'down':
            if (this.y < 480) {
                this.y += 25;
            }
            break;
    }

    // Reset the game when reach to water
    if (this.y < 0) {
        all_enemies = Enemy.generateEnemies();
        this.x = 250;
        this.y = 480;
        level++;
    }
};

// handle the collision
Player.prototype.checkCollision = function () {
    for (var i = 0; i < all_enemies.length; i++) { //loop on all enemies

        if (collisionDetect(this, all_enemies[i])) { //check if collision  or not 
            this.y = 480;
            lives--;
            checkstars(lives);
            return true;
        }
    }
    return false;
};






// Enemy function (class) 
var Enemy = function (x, y) {
    this.x = x;
    this.y = y;

    this.speed = Math.random() * 3 + 1;

    this.sprite = new Image();
    this.sprite.src = 'images/Enemy-bug.png';
};

//to update the x position ...move the Enemy
Enemy.prototype.update = function () {
    this.x += (this.speed);
    if (this.x > 600) {
        this.x = -100;
        this.speed = Math.random() * 3 + 1;
    }
};
Enemy.prototype.render = function () {
    context.drawImage(this.sprite, this.x, this.y);
};


Enemy.generateEnemies = function () {
    var enemies = [];
    enemies[0] = new Enemy(((Math.random() * 275) + 25), 140);
    enemies[1] = new Enemy(((Math.random() * 275) + 25), 225);
    enemies[2] = new Enemy(((Math.random() * 275) + 25), 300);
    return enemies;
};


//collision detection used in  player function (checkCollision)
function collisionDetect(p, e) {
    var deltaX = e.x - p.x;
    var deltaY = e.y - p.y;
    var dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (dist < 80) {
        return true;
    } else {
        return false;
    }
}


//event listener to handel the arrow key to move the player
document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
    };

    player.movement(allowedKeys[e.keyCode]);
});


// the main function with animation
function main() {


    all_enemies.forEach(function (Enemy) {
        Enemy.update();
    });

    render();

    player.checkCollision();

    $('.level').text('Level:' + level);

    this.window.requestAnimationFrame(main);

}





//to draw the canvas
function render() {

    var water_img = new Image();
    water_img.src = 'images/water-block.png';

    var stone_img = new Image();
    stone_img.src = 'images/stone-block.png';

    var grass_img = new Image();
    grass_img.src = 'images/grass-block.png';

    var rowImages = [
            water_img,
            stone_img,
            stone_img,
            stone_img,
            grass_img,
            grass_img
        ],
        numRows = 6,
        numCols = 6,
        row, col;


    for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {
            context.drawImage(rowImages[row], col * 101, row * 83);
        }
    }

    all_enemies.forEach(function (Enemy) {
        Enemy.render();
    });

    player.render();
}


// to reload the page
function reload() {
    window.location.reload(false);
}

// to control the lives stars
function checkstars(stars) {
    switch (stars) {
        case 3:
            $('#s1').css('color', '#FFD700');
            $('#s2').css('color', '#FFD700');
            $('#s3').css('color', '#FFD700');
            break;

        case 2:
            $('#s3').css('color', '#ccc');
            break;

        case 1:
            $('#s2').css('color', '#ccc');
            break;

        case 0:
            $('#s1').css('color', '#ccc');
            alert('game Over \nYour score: ' + level + '\nPlay Again');
            lives = 3;
            checkstars(lives);
            level = 1;
            break;
    }
}







var player = new Player(250, 480); //palyer object
var all_enemies = Enemy.generateEnemies(); // Enemy object

var c = document.getElementById('canvas'); //the canvas
var context = c.getContext('2d'); // 2d context..tools..

let level = 1;
let lives = 3;