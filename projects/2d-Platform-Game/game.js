const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gravity = 0.3;
// platforms Curent x position
let scrollOfset = 0;

const tile5 = new Image();
tile5.src = "wintertileset/Tiles/5.png";

const tile4 = new Image();
tile4.src = "wintertileset/Tiles/4.png";

const tile2 = new Image();
tile2.src = "wintertileset/Tiles/2.png";

const tile6 = new Image();
tile6.src = "wintertileset/Tiles/6.png";

const tile3 = new Image();
tile3.src = "wintertileset/Tiles/3.png";

const tile1 = new Image();
tile1.src = "wintertileset/Tiles/1.png";

const tile7 = new Image();
tile7.src = "wintertileset/Tiles/7.png";

const tile8 = new Image();
tile8.src = "wintertileset/Tiles/8.png";

const tile11 = new Image();
tile11.src = "wintertileset/Tiles/11.png";

const tile16 = new Image();
tile16.src = "wintertileset/Tiles/16.png";

const tile10 = new Image();
tile10.src = "wintertileset/Tiles/10.png";

const blok5 = new Image();
blok5.src = "wintertileset/Tiles/5.3_blok.png";

const blok3_3 = new Image();
blok3_3.src = "wintertileset/Tiles/3.3_blok.png";

const water5 = new Image();
water5.src = "wintertileset/Tiles/5.2_water.png";

const water3 = new Image();
water3.src = "wintertileset/Tiles/3.2_water.png";

const leftLid = new Image();
leftLid.src = "wintertileset/Tiles/left_lid.png";

const rightLid = new Image();
rightLid.src = "wintertileset/Tiles/right_lid.png";

const backround = new Image();
backround.src = "wintertileset/BG/BG.png";

// decoration
const snowMan = new Image();
snowMan.src = "wintertileset/Object/SnowMan.png";

const stone = new Image();
stone.src = "wintertileset/Object/Stone.png";

const tree1 = new Image();
tree1.src = "wintertileset/Object/Tree_1.png";

const tree2 = new Image();
tree2.src = "wintertileset/Object/Tree_2.png";

const lgloo1 = new Image();
lgloo1.src = "wintertileset/Object/Igloo.png";

const lgloo2 = new Image();
lgloo2.src = "wintertileset/Object/Igloo2.png";

const sign1 = new Image();
sign1.src = "wintertileset/Object/Sign_1.png";

const sign2 = new Image();
sign2.src = "wintertileset/Object/Sign_2.png";

// sprite
const spriteImg = new Image();
spriteImg.src = "wintertileset/sprite/sprite10.png";

const axeImg = new Image();
axeImg.src = "wintertileset/sprite/axe_spin.png";

const golemWalk = new Image();
golemWalk.src = "wintertileset/sprite/golem-walk.png";

const golemAtk = new Image();
golemAtk.src = "wintertileset/sprite/golem-atk.png";

const golemDie = new Image();
golemDie.src = "wintertileset/sprite/golem-die.png";

const snowBallImg = new Image();
snowBallImg.src = "wintertileset/sprite/snowball.png";



// create player
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 0,
        };
        this.velocity = {
            x: 0,
            y: 1,
            stopy: false
        };
        this.onGround = false;
        this.firtsLanding = false;
        this.life = 10;
        this.numberOfAxe = 10;

        this.speed = 10;
        this.width = 100;
        this.height = 150;
        this.frameX = 0;
        this.frameY = 0;
        this.Dx = 0;
        this.Dy = 152;
        this.timer = 0;
    };

    idel() {
        this.dy = 152;
        if (keys.last == "left") {
            this.Dx = 80;
            this.frameY = 3;
            this.frameX++;
        }
        else {
            this.Dx = 80;
            this.frameY = 2;
            this.frameX++;
        };
    };

    move() {
        this.frameX++;
        this.Dx = 120;
        if (keys.last === "left") {
            this.frameY = 5;
        } else {
            this.frameY = 4;
        };
    };

    jump() {
        if (keys.last == "left") {
            this.Dx = 114;
            this.frameY = 7;
            this.frameX++;
        }
        else {
            this.Dx = 114;
            this.frameY = 6;
            this.frameX++;
        };
    };

    throw() {
        if (keys.last == "left") {
            this.Dx = 127;
            this.frameY = 11;
            this.frameX++;
        } else {
            this.Dx = 127;
            this.frameY = 10;
            this.frameX++;
        };
    };

    attack() {
        this.frameX++;
        if (keys.last == "left") {
            this.Dx = 165;
            this.frameY = 1;
        } else {
            this.Dx = 165; ///!
            this.frameY = 0;
        };
    };

    glide() {
        this.frameX++
        this.Dx = 148;
        if (keys.last == "left") {
            this.frameY = 9;
        } else {
            this.frameY = 8;
        };
    };

    die() {
        this.Dx = 164;
        if (keys.last === "left") {
            this.frameY = 15;
        } else {
            this.frameY = 14;
        };
        if (this.frameX == 9) {
            // game over
            gameOver();
        };
    };

    draw() {
        c.drawImage(spriteImg, this.Dx * this.frameX, this.Dy * this.frameY, this.Dx, this.Dy, this.position.x, this.position.y, this.width, this.height)
    };

    update() {
        if (this.frameX > 9) {
            this.frameX = 0;
        };
        if (this.life < 0) {
            fps = 4;
            startAnimating(fps);
            this.die();
        };

        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // gravity
        if (player.firtsLanding) {
            if (this.position.y + this.height +
                this.velocity.y <= canvas.height) {
                this.velocity.y += gravity;
            }
        } else {
            this.velocity.y += gravity / 10;
            this.speed = 3;
        };
    };
};// player end

//enemy
class Enemy {
    constructor({ x, y, minX, maxX, width, height, speed }) {
        this.position = {
            x,
            y: canvas.height - 266,
        };
        this.moveZone = {
            minX: minX,
            maxX: maxX
        };

        this.speed = speed;
        this.img = golemWalk;
        this.life = 10;
        this.dead = false;
        this.timer = 2;

        this.width = width;
        this.height = height;
        this.frameX = 0;
        this.frameY = 0;
        this.Dx = 64;
        this.Dy = 64;

    };
    moveLeft() {
        this.frameY = 1;
        this.Dy = 64;
        this.img = golemWalk;
        this.position.x -= this.speed;
    };
    moveRight() {
        this.frameY = 3;
        this.Dy = 64;
        this.img = golemWalk;
        this.position.x += this.speed;
    };
    atcToLeft() {
        this.frameY = 1;
        this.img = golemAtk;
        this.Dy = 96;

        if (this.frameX == 3) {
            let snowball = new SnowBall({ x: this.position.x, y: this.position.y, direction: "left" });
            snowBalls.push(snowball);
        };

    };
    atcToRight() {
        this.frameY = 3;
        this.img = golemAtk
        this.Dy = 96;
        if (this.frameX == 3) {
            let snowball = new SnowBall({ x: this.position.x, y: this.position.y, direction: "right" });
            snowBalls.push(snowball);
        };
    };
    die() {
        this.img = golemDie;
        this.Dx = 64;
        this.Dy = 64;
        this.frameY = 0;
    };

    direction() {
        if (this.life <= 0) {
            this.dead = true;
            this.die();
        }

        else if (player.position.x + (player.width / 2) >= this.position.x
            && player.position.x <= this.position.x + (this.width / 2)) {
            this.frameY = 0;
            if (player.position.y + player.height > this.position.x && this.frameX == 4) {
                player.life--;
            };
        }
        // left
        else if (player.position.x < this.position.x) {
            if (player.position.x - this.position.x <= -500 && this.position.x >= this.moveZone.minX) {
                this.moveLeft();
            }
            else if (player.position.x - this.position.x > -500) {
                this.atcToLeft();
            } else { // eğer player uzaklaşırsa top firlatmayı bırak
                this.img = golemWalk;
                this.Dy = 64;
                this.frameY = 1;
                this.frameX = 0;
            };
        }
        // right
        else if (player.position.x > this.position.x) {
            if (player.position.x - this.position.x >= 500 && this.position.x < this.moveZone.maxX) {
                this.moveRight();
            }

            else if (player.position.x - this.position.x < 500) {
                this.atcToRight();
            } else { // eğer player uzaklaşırsa top firlatmayı bırak
                this.img = golemWalk;
                this.Dy = 64;
                this.frameY = 3;
                this.frameX = 0;
            };
        };
    };

    draw() {
        c.drawImage(this.img, this.Dx * this.frameX, this.Dy * this.frameY, this.Dx, this.Dy, this.position.x, this.position.y, this.width, this.height)
    };
    ubdate() {
        if (this.timer % 2 == 0) {
            if (this.dead === false) {
                this.frameX++;
            } else {
                this.frameX = 6;
            };
            if (this.frameX > 6) {
                this.frameX = 0;
            };
            this.direction();
        };

        this.timer++;
        if (this.timer > 11) {
            this.timer = 2;
        };
        this.draw();
    };
};//enemy end

class Platform {
    constructor({ x, y, width, height, platform, collision }) {
        this.position = {
            x,
            y
        }
        this.platform = platform;
        this.width = width;
        this.height = height;
        this.collision = collision;
    };
    draw() {
        c.drawImage(this.platform, this.position.x, this.position.y, this.width, this.height);
    };
};

class Background {
    constructor({ x, y, backround }) {
        this.position = {
            x,
            y
        }
        this.backround = backround;
        this.width = backround.width;
        this.height = backround.height;
    };
    draw() {
        c.drawImage(this.backround, this.position.x, this.position.y);
    };
};

class Tree {
    constructor({ x, y, width, height, tree }) {
        this.position = {
            x,
            y
        };
        this.tree = tree;
        this.width = width;
        this.height = height;
    }
    draw() {
        c.drawImage(this.tree, this.position.x, this.position.y, this.width, this.height);
    };
};

class Decoration {
    constructor({ x, y, width, height, obj }) {
        this.position = {
            x,
            y
        }
        this.obj = obj;
        this.width = width;
        this.height = height;
    };
    draw() {
        c.drawImage(this.obj, this.position.x, this.position.y, this.width, this.height);
    };
};

class Axe {
    constructor({ x, y, direction }) {
        this.position = {
            x,
            y
        };
        this.velocity = {
            x: 13,
            y: 0,
        };
        this.width = 185 / 3;
        this.height = 185 / 3;
        this.frameX = 0;
        this.direction = direction;
        this.noSpin = false;
        this.stick = false;
    };

    draw() {
        c.drawImage(axeImg, 150 * this.frameX, 0, 150, 150, this.position.x, this.position.y, this.width, this.height);
    };

    update() {
        if (!this.noSpin) {
            this.frameX++;
            if (this.frameX > 7) {
                this.frameX = 0;
            };
        };
        this.draw();
        if (this.direction == "left") {
            this.position.x -= this.velocity.x;
        } else {
            this.position.x += this.velocity.x;
        };
        //gravity
        this.position.y += this.velocity.y / 2;
        this.velocity.y += gravity;
    };
};

class SnowBall {
    constructor({ x, y, direction }) {
        this.position = {
            x,
            y
        };
        this.velocity = {
            x: 13,
            y: 0
        };
        this.width = 32;
        this.height = 32;
        this.direction = direction;
        this.remove = false;
    };
    draw() {
        c.drawImage(snowBallImg, this.position.x, this.position.y, this.width, this.height);
    };

    ubdate() {
        if (this.direction === "left") {
            this.position.x -= this.velocity.x;
        } else if (this.direction === "right") {
            this.position.x += this.velocity.x;
        };
        if (this.remove) {
            snowBalls.pop();
        };
        // gravity 
        this.position.y += this.velocity.y / 2;
        this.velocity.y += gravity;
        this.draw();
    };
};


let platforms = [];
let trees = [];
let background = [];
let decoration = [];
let result = [];
let axes = [];
let goblins = [];
let snowBalls = [];

const keys = {
    last: null,
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
    up: {
        pressed: false,
    },
    down: {
        pressed: false,
    },
    space: {
        pressed: false,
    },
    throwKauni: false,
    b: {
        pressed: false,
    },
};

let init = () => {
    player = new Player();
    let goblin1 = new Enemy({ x: 3000, y: 365, minX: 2800, maxX: 3700, width: 150, height: 150, speed: 7 });
    let goblin2 = new Enemy({ x: 1300, y: 365, minX: 1100, maxX: 2100, width: 150, height: 150, speed: 7 });
    goblins.push(goblin1)
    goblins.push(goblin2)

    axes = [];

    // create platform 
    platforms = [
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: null, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: null, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: null, y: canvas.height - 126, width: 128, height: 128, platform: blok3_3, collision: true, where: "next" },

        // right corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile10, collision: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile3, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile11, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile6, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile3, collision: true, where: "up" },
        // right corner end

        //water start
        { x: null, y: canvas.height - 75, width: 128, height: 75, platform: water3, collision: false, where: "next" },
        //{ x: null, y: canvas.height - 75, width: 213, height: 75, platform: water5, collision: true, where: "next" },
        //water end

        //left corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile4, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile1, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile7, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile8, collision: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile1, collision: true, where: "up" },
        // left corner end

        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },


        // right corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile10, collision: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile3, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile11, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile6, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile3, collision: true, where: "up" },
        // right corner end

        //water start
        { x: null, y: canvas.height - 75, width: 128, height: 75, platform: water3, collision: false, where: "next" },
        { x: null, y: canvas.height - 75, width: 213, height: 75, platform: water5, collision: false, where: "next" },
        //water end

        //left corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile4, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile1, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile7, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile8, collision: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile1, collision: true, where: "up" },
        // left corner end

        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },

        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: null, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: null, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: null, y: canvas.height - 126, width: 128, height: 128, platform: blok3_3, collision: true, where: "next" },

        // right corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile10, collision: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile3, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile11, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile6, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile3, collision: true, where: "up" },
        // right corner end

        //water start
        { x: null, y: canvas.height - 75, width: 128, height: 75, platform: water3, collision: false, where: "next" },
        //{ x: null, y: canvas.height - 75, width: 213, height: 75, platform: water5, collision: true, where: "next" },
        //water end

        //left corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile4, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile1, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile7, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile8, collision: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile1, collision: true, where: "up" },
        // left corner end

        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },


        // right corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile10, collision: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile3, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile11, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile6, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile3, collision: true, where: "up" },
        // right corner end

        //water start
        { x: null, y: canvas.height - 75, width: 128, height: 75, platform: water3, collision: false, where: "next" },
        { x: null, y: canvas.height - 75, width: 213, height: 75, platform: water5, collision: false, where: "next" },
        //water end

        //left corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile4, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile1, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile7, collision: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile8, collision: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile1, collision: true, where: "up" },
        // left corner end

        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, collision: true, where: "next" },


    ]// 6, 3, 11, 16;

    decoration = [
        new Decoration({ x: 10, y: canvas.height - 325, width: 511, height: 201, obj: lgloo2 }),
        new Decoration({ x: 560, y: canvas.height - 210, width: 87, height: 93, obj: sign2 }),
        new Decoration({ x: 2800, y: canvas.height - 231, width: 96, height: 105, obj: snowMan }),
        new Decoration({ x: 4340, y: canvas.height - 165, width: 62, height: 39, obj: stone }),
        new Decoration({ x: 5790, y: canvas.height - 210, width: 87, height: 94, obj: sign1 }),
        new Decoration({ x: 5950, y: canvas.height - 325, width: 511, height: 201, obj: lgloo1 }),
    ];

    background = new Background({ x: 0, y: 0, backround });

    trees = [
        new Tree({ x: 0, y: canvas.height - 400, width: 364, height: 280, tree: tree2 }),
        new Tree({ x: 400, y: canvas.height - 400, width: 228, height: 280, tree: tree1 }),
        new Tree({ x: 1300, y: canvas.height - 400, width: 228, height: 280, tree: tree1 }),
        new Tree({ x: 1700, y: canvas.height - 400, width: 364, height: 280, tree: tree2 }),
        new Tree({ x: 2700, y: canvas.height - 400, width: 228, height: 280, tree: tree1 }),
        new Tree({ x: 3000, y: canvas.height - 400, width: 228, height: 280, tree: tree1 }),
        new Tree({ x: 3200, y: canvas.height - 400, width: 364, height: 280, tree: tree2 }),
        new Tree({ x: 3900, y: canvas.height - 400, width: 364, height: 280, tree: tree2 }),
        new Tree({ x: 4400, y: canvas.height - 400, width: 228, height: 280, tree: tree1 }),
        new Tree({ x: 4700, y: canvas.height - 400, width: 228, height: 280, tree: tree1 }),
        new Tree({ x: 5500, y: canvas.height - 400, width: 228, height: 280, tree: tree1 }),
        new Tree({ x: 5720, y: canvas.height - 400, width: 364, height: 280, tree: tree2 }),
    ];

    result = [];
    let maxX = 0;
    let lastWidth = 0;
    let lasty;
    // Platform elemanlarının x eksenindeki pozisyonunu
    // elemanların genişliğinden yola çıkarak
    // otomatik olarak verme
    for (let i = 0; i < platforms.length; i++) {
        let item = platforms[i];

        if (i == 0) {
            result.push(new Platform(item));
            lastWidth = item.width;
            lasty = item.y;
            maxX += lastWidth;
            continue;
        };
        for (let i = 1; i < 2; i++) {
            if (item.where == "next") {
                item.x = maxX;
                result.push(new Platform(item));

                lastWidth = item.width;
                lasty = item.y;
                maxX += lastWidth;
            } else {
                item.x = maxX - lastWidth;
                result.push(new Platform(item));
            };
        };
    };
    // platforms Curent x position
    scrollOfset = 0;
};

init();

let fps = 40, fpsInterval, startTime, now, then, elapsed;
function gameOver() {
    fps = 30;
    startAnimating(fps);
    goblins = [];
    init();
};
function startAnimating(fps) {
    // fps ayarlama
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
};

let animate = () => {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval)
        c.fillStyle = "white";
        c.fillRect(0, 0, canvas.width, canvas.height);

        background.draw();

        trees.forEach((tree) => {
            tree.draw();
        });

        decoration.forEach((obj) => {
            obj.draw();
        });

        // draw the player
        player.update();


        axes.forEach((axe) => {
            axe.update();
        });

        // draw platforms
        result.forEach((platform) => {
            platform.draw();
        });

        snowBalls.forEach((ball) => {
            ball.ubdate();
        });

        goblins.forEach((goblin) => {
            goblin.ubdate();
        });

        // right and left movement
        if (keys.right.pressed && player.position.x < 400
            || keys.right.pressed && scrollOfset > 5097
            && player.position.x < 1340) {
            player.velocity.x = player.speed;
            player.move();
        } else if (keys.left.pressed && player.position.x > 100
            || keys.left.pressed && scrollOfset === 0
            && player.position.x > 0) {
            player.move();
            player.velocity.x = - player.speed;
        } else {
            player.velocity.x = 0;
            if (keys.right.pressed) {
                // move the platform to the left
                if (scrollOfset < 5100) {
                    scrollOfset += player.speed;
                    player.move();

                    result.forEach((platform) => {
                        platform.position.x -= player.speed;
                    });

                    decoration.forEach((obj) => {
                        obj.position.x -= player.speed
                    });

                    trees.forEach((tree) => {
                        tree.position.x -= player.speed * 0.93;
                    });

                    axes.forEach((axe) => {
                        axe.position.x -= player.speed
                    });

                    snowBalls.forEach((ball) => {
                        ball.position.x -= player.speed
                    });

                    goblins.forEach((goblin) => {
                        goblin.position.x -= player.speed;
                        goblin.moveZone.maxX -= player.speed;
                        goblin.moveZone.minX -= player.speed;
                    });
                };
            }
            else if (keys.left.pressed && scrollOfset > 0) {
                // move the platform to the right
                scrollOfset -= player.speed;
                player.move();

                result.forEach((platform) => {
                    platform.position.x += player.speed;
                });

                decoration.forEach((obj) => {
                    obj.position.x += player.speed;
                });

                trees.forEach((tree) => {
                    tree.position.x += player.speed * 0.93;
                });

                axes.forEach((axe) => {
                    axe.position.x += player.speed
                });

                snowBalls.forEach((ball) => {
                    ball.position.x += player.speed
                });

                goblins.forEach((goblin) => {
                    goblin.position.x += player.speed;
                    goblin.moveZone.maxX += player.speed;
                    goblin.moveZone.minX += player.speed;
                });
            };
        };

        if (player.firtsLanding == false) {
            player.glide();
        };

        if (keys.right.pressed == false && keys.left.pressed == false &&
            keys.up.pressed == false && keys.b.pressed == false
            && player.firtsLanding == true) {
            player.idel();
        };

        if (keys.up.pressed == true) {
            player.jump();
            if (player.onGround == true) {
                player.velocity.y -= 8;
                player.onGround = false;
            }
        }
        if (keys.space.pressed) {
            player.throw()
        }

        if (keys.throwAxe) {
            let direction = "right";
            if (player.numberOfAxe > 0) {
                if (keys.last == "left") {
                    direction = "left";
                };
                if (player.frameX == 2) {
                    let axe = new Axe({ x: player.position.x + (player.width / 2), y: player.position.y, direction: direction })
                    axes.push(axe);
                    keys.throwAxe = false;
                    player.numberOfAxe--;
                };
            };
        };

        if (keys.b.pressed) {
            player.attack();
            goblins.forEach((goblin) => {
                if (player.position.x + player.width >= goblin.position.x
                    && player.position.x <= goblin.position.x + goblin.width
                    && player.frameX == 9
                ) {
                    goblin.life--;
                };
            });
        };

        // collision detection
        result.forEach((platform) => {
            if (platform.collision) {
                // player
                if (
                    player.position.y + player.height <= platform.position.y
                    && player.position.y + player.height + player.velocity.y >= platform.position.y

                    //collision for the empty space(after the corner)
                    && player.position.x + player.width >= platform.position.x
                    && player.position.x <= platform.position.x + platform.width
                ) {
                    player.velocity.y = 0;
                    player.velocity.stopy = true;
                    player.onGround = true;
                    player.firtsLanding = true;
                };
                // collusion for the corner of ground
                if (player.position.x <= platform.position.x + platform.width
                    && player.position.y + player.height > platform.position.y) {
                    player.speed = 0;
                } else {
                    player.speed = 10;
                };
                // axe
                axes.forEach((axe) => {
                    if (axe.position.y + axe.height - 20 >= platform.position.y
                        && axe.position.x + axe.width - 15 >= platform.position.x
                        && axe.position.x + 15 <= platform.position.x + platform.width) {
                        axe.velocity.x = 0;
                        axe.velocity.y = 0;
                        axe.noSpin = true;
                    };
                });

                // snow balls
                snowBalls.forEach((ball) => {
                    if (ball.position.y + ball.height / 2 >= platform.position.y) {
                        snowBalls.shift(ball)
                    };
                });
            };
        });

        // eğer balta göbline çarparsa
        goblins.forEach((goblin) => {
            axes.forEach((axe) => {
                if (
                    goblin.dead == false
                    // yatay
                    && axe.position.x + axe.width >= goblin.position.x + goblin.width / 2
                    && axe.position.x <= goblin.position.x + goblin.width / 2
                    // dikey
                    && axe.position.y + axe.width >= goblin.position.y
                ) {
                    axes.shift();
                    axe.noSpin = true;
                    goblin.life -= 1;
                };
            });
        });
        // düşman birşey firlatırsa
        snowBalls.forEach((ball) => {
            if (ball.position.x + ball.width >= player.position.x
                && ball.position.x <= player.position.x + player.width) {
                player.life--;
                snowBalls.shift(ball);
            };
        });

        // win senario
        if (scrollOfset > 4000) {
            //console.log("you win");
        };
        // lose senarion
        if (player.position.y > canvas.height) {
            gameOver();
        };
    };
};// animate
startAnimating(fps);

addEventListener("keydown", ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            keys.left.pressed = true;
            keys.last = "left";
            break
        case 40:
            // if (player.velocity.stopy) {
            //     player.velocity.y += 0;
            // }
            break
        case 39:
            keys.right.pressed = true;
            keys.last = "right";
            break
        case 38:
            keys.up.pressed = true;
            break
        case 32:
            keys.space.pressed = true;
            keys.throwAxe = true;
            break
        case 66:
            keys.b.pressed = true;
            break
    };
});

addEventListener("keyup", ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            keys.left.pressed = false;
            break
        case 40:
            console.log(player.life);
            break
        case 39:
            keys.right.pressed = false;
            break
        case 38:
            keys.up.pressed = false;
            break
        case 32:
            keys.space.pressed = false;
            break
        case 66:
            keys.b.pressed = false;
            break
    };
});