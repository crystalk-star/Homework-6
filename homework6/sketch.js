var cat;
var pics = [];
var shoot = [];
var melee = [];
var i = 0;
var x = 0,
    y = 150;
var j = 0;
var k = 0;
var hit = false;
let result = [];
var direction;
var rockX = 0;
var rockY = 0;
var isShooting = false;
var isJumping = false;
var speed = -5;
var obs1, obs2, obs3;
var obstacleArray = [];
var herohealth = 3; var enemyhealth = 3;


function addImages(data) {

    for (var i = 0; i < data.length; i++) {
        cat = loadImage(data[i]);
        pics[i] = cat;
    }
}

function addShoot(data) {

    for (var i = 0; i < data.length; i++) {
        cat = loadImage(data[i]);
        shoot[i] = cat;
    }
}

function addMelee(data) {

    for (var i = 0; i < data.length; i++) {
        cat = loadImage(data[i]);
        melee[i] = cat;
    }
}

function preload() {
    loadStrings('assets/Idle.txt', addImages);
    loadStrings('assets/shoot.txt', addShoot);
    loadStrings('assets/melee.txt', addMelee);
}

function setup() {
    createCanvas(600, 600);
    obs1 = new obstacle(rockX, rockY, 50, 38, "/assets/rock.png");
    obs2 = new obstacle(300, 200, 50, 38, "/assets/rock.png");
    obs3 = new obstacle(400, 300, 50, 38, "/assets/rock.png");
    obstacleArray[0] = obs1;
    obstacleArray[1] = obs2;
    obstacleArray[2] = obs3;
}


function draw() {
    background(120);

    for (let i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].display();
    

    }

    ///////////////////////////////////////
    // shoot key...
    if (keyIsDown(32)) {
        image(shoot[j], x, y);
        isShooting = true;

    } else if (keyIsDown(88)) {
        image(melee[k], x, y);

    } else {
        image(pics[i], x, y); // idle
    }

    if (keyIsDown(88)) {
        isJumping = true;
    }

    if (isJumping) {
        y += speed;
        if (y <= 20) {

            speed *= -1;

        } else if (y > 95) {
            y = 95;
            isJumping = false;
            speed *= -1;
        }


    }

    
    pics[i].resize(160, 250);
    shoot[j].resize(160, 250);
    melee[k].resize(160, 250);
  //frameRate(5);

    /////////////////////
    //collideRectRect(x, y, width, height, x2, y2, width2, height2 )
    // var hit = collideRectRect(x, y, pics[i].width, pics[i].height, 500, 100, 20, 20);

    ////////////////////////////
    i += 1;
    k += 1;
    if (keyIsDown(LEFT_ARROW)) {
        direction = "left";
        x -= 5;
    } else if (keyIsDown(RIGHT_ARROW)) {

        direction = "right";
        x += 5;

    } else if (keyIsDown(UP_ARROW)) {
        direction = "up";
        y -= 5;
    } else if (keyIsDown(DOWN_ARROW)) {
        direction = "down";
        y += 5;
    }


    for (let i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].move(x, y);
    }

    if (i >= pics.length) {
        i = 0;
    }
    j++;
    if (j >= shoot.length) {
        j = 0;
    }
    if (k >= melee.length) {
        k = 0;
    }
    for (let i = 0; i < obstacleArray.length; i++) {
        var isHit = obstacleArray[i].collision(x, y, pics[i].width, pics[i].height);
        if (isHit) {
            if (direction == "right") {
                x -= 5;
            } else if (direction == "left") {
                x += 5;
            } else if (direction == "up") {
                y += 5;
            } else if (direction == "down") {
                y -= 5;
            }
            let enemyHealth = obstacleArray[i].decreaseHealth();
            // remove the object from the array
            if (enemyHealth <= 0) {
                obstacleArray.splice(i, 1);
            } else {
                obstacleArray[i].setX(random(0, width));
                obstacleArray[i].setY(random(0, height));
            }
        }
    }

          //text Hero
    textSize(28)
    fill(255,255,255);
    text('Hero Health = 3',7,31);

    /*function heroHealth(){
        if(herohealth){

        }

    }*/
}

class obstacle {

    constructor(x, y, w, h, imagePath) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.health = 10;
        this.imagePath = imagePath;
        this.rock = loadImage(imagePath);
    }

    display() {
        image(this.rock, this.x, this.y);
        this.rock.resize(50, 50);
        textSize(28)
        fill(255,255,255);
        text('Enemy Health = 3',370,31);
    }

    collision(playerX, playerY, playerW, playerH) {
        var hit = collideRectRect(playerX, playerY, playerW, playerH, this.x, this.y, this.w, this.h);
        return hit;
    }

    decreaseHealth() {
        this.health = this.health - 1;
        return this.health;
    }

    move(playerX, playerY) {
        if (this.x < playerX) {
            print("less x" + this.x + ":" + playerX);
            this.x++;
        }
        //if (this.x > playerX) 
        else {
            print("greater" + this.x + ":" + playerX);
            this.x--;
        }
        if (this.y < playerY) {
            print("less" + this.y + ":" + playerY);
            this.y++;
        }
        //if (this.y > playerY)
        else {
            print("greater: " + this.y + ":" + playerY);
            this.y--;
        }
    }


    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }

    setX(x) {
        this.x = x;
    }
    setY(y) {
        this.y = y;
    }

    getW() {
        return this.w;
    }

    getH() {
        return this.h;
    }

}