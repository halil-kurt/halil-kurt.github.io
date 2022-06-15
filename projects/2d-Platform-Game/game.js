const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gravity = 0.3;
// platforms Curent x position
let scrollOfset = 0;
let lastPlatform = 0;
let endOfGame = 0;

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

const Crate = new Image();
Crate.src = "wintertileset/Object/Crate.png";

const Crystal = new Image();
Crystal.src = "wintertileset/Object/Crystal.png";

const IceBox = new Image();
IceBox.src = "wintertileset/Object/IceBox.png";

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

//buttons
const left = new Image();
left.src = "wintertileset/buttons/left.png";

const right = new Image();
right.src = "wintertileset/buttons/right.png";

const sword = new Image();
sword.src = "wintertileset/buttons/sword.png";

const axe = new Image();
axe.src = "wintertileset/buttons/axe.png";

const jump = new Image();
jump.src = "wintertileset/buttons/jump.png";

let screenWidth = window.screen.width;
let divider = screenWidth / 1100;
if (screenWidth <= 425) {
    divider = screenWidth / 900;
}

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
        this.width = 100 * divider;
        this.height = 150 * divider;
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
            y
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

        this.width = width * divider;
        this.height = height * divider;
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
            if (player.position.x - this.position.x <= -500 * divider && this.position.x >= this.moveZone.minX) {
                this.moveLeft();
            }
            else if (player.position.x - this.position.x > -500 * divider) {
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
            if (player.position.x - this.position.x >= 500 * divider && this.position.x < this.moveZone.maxX) {
                this.moveRight();
            }

            else if (player.position.x - this.position.x < 500 * divider) {
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
    update() {
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
    constructor({ x, y, width, height, platform, collision, title }) {
        this.position = {
            x,
            y
        }
        this.platform = platform;
        this.width = width;
        this.height = height;
        this.collision = collision;
        this.title = title;
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
class Button {
    constructor({ x, title, img: img }) {
        this.img = img;
        this.width = img.width * divider;
        this.height = img.height * divider;
        this.title = title;

        this.position = {
            x,
            y: canvas.height - this.height - 10
        };

    };
    draw() {
        if (this.title == "throw") {
            this.position.y = canvas.height - 2.5 * (this.height);
        }
        c.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    };
};

class Tree {
    constructor({ x, y, width, height, tree }) {
        this.position = {
            x,
            y
        };
        this.tree = tree;
        this.width = width * divider;
        this.height = height * divider;
    }
    draw() {
        c.drawImage(this.tree, this.position.x, this.position.y, this.width, this.height);
    };

    update() {
        this.draw();
    };
};

class Decoration {
    constructor({ x, y, width, height, obj }) {
        this.position = {
            x,
            y
        }
        this.obj = obj;
        this.width = width * divider;
        this.height = height * divider;
    };
    draw() {
        c.drawImage(this.obj, this.position.x, this.position.y, this.width, this.height);
    };
    update() {
        this.draw();
    };
};

class Axe {
    constructor({ x, y, direction }) {
        this.position = {
            x,
            y
        };
        this.velocity = {
            x: 15 * divider,
            y: 0,
        };
        this.width = 61 * divider;
        this.height = 61 * divider;
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
            x: 15 * divider,
            y: 0
        };
        this.width = 32 * divider;
        this.height = 32 * divider;
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
let buttons = [];

let objects = [];
let handlePosition = (list, decoration, goblins, minY) => {
    list = list.concat(decoration, goblins)
    list.forEach((li) => {
        li.x *= divider
        li.y = minY - li.height * divider + 3;
        objects.push(new li.type(li));
    });
};

let controleInfo = (x, y) => {
    // kontoller hakkında kullanıcıya bilgi ver.
    c.font = "30px Arial";
    c.strokeText("left: A, right: D", x, y);
    c.strokeText("jump: W", x, y + 30);
    c.strokeText("sword: E", x, y + 60);
    c.strokeText("throw: Space", x, y + 90);
};

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
    e: {
        pressed: false,
    },
};

let init = () => {
    player = new Player();

    goblins = [
        { x: 1200, y: null, minX: 1100 * divider, maxX: 2000 * divider, width: 150, height: 150, speed: 7, type: Enemy },
        { x: 3000, y: null, minX: 2850 * divider, maxX: 3600 * divider, width: 150, height: 150, speed: 7, type: Enemy },
    ];

    axes = [];

    // create platform 
    platforms = [
        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: null, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: null, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: null, y: null, width: 128 * divider, height: divider * 128, platform: blok3_3, collision: true, where: "next" },

        // right corner start
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile10, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile3, collision: true, title: "tile3", where: "up 3" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile11, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile6, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile3, collision: true, where: "up 2" },
        // right corner end

        //water start
        { x: null, y: null, width: 128 * divider, height: divider * 75, platform: water3, collision: false, where: "next" },
        //{ x: null, ynvas.h, width: 213 *divider, height: divider * 75, platform: water5, collision: true, where: "next" },
        //water end

        //left corner start
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile4, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile1, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile7, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile8, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile1, collision: true, where: "up 3" },
        // left corner end

        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },


        // right corner start
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile10, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile3, collision: true, where: "up 3" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile11, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile6, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile3, collision: true, where: "up 2" },
        // right corner end

        //water start
        { x: null, y: null, width: 128 * divider, height: divider * 75, platform: water3, collision: false, where: "next" },
        { x: null, y: null, width: 213 * divider, height: divider * 75, platform: water5, collision: false, where: "next" },
        //water end

        //left corner start
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile4, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile1, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile7, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile8, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile1, collision: true, where: "up 3" },
        // left corner end

        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },

        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: null, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: null, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: null, y: null, width: 128 * divider, height: divider * 128, platform: blok3_3, collision: true, where: "next" },

        // right corner start
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile10, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile3, collision: true, where: "up 3" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile11, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile6, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile3, collision: true, where: "up 2" },
        // right corner end

        //water start
        { x: null, y: null, width: 128 * divider, height: divider * 75, platform: water3, collision: false, where: "next" },
        //{ x: null, ynvas.h, width: 213 *divider, height: divider * 75, platform: water5, collision: true, where: "next" },
        //water end

        //left corner start
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile4, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile1, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile7, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile8, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile1, collision: true, where: "up 3" },
        // left corner end

        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },


        // right corner start
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile10, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile3, collision: true, where: "up 3" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile11, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile6, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile3, collision: true, where: "up 2" },
        // right corner end

        //water start
        { x: null, y: null, width: 128 * divider, height: divider * 75, platform: water3, collision: false, where: "next" },
        { x: null, y: null, width: 213 * divider, height: divider * 75, platform: water5, collision: false, where: "next" },
        //water end

        //left corner start
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile4, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile1, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile7, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile5, collision: true, where: "next" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile8, collision: true, where: "up 2" },
        { x: null, y: null, width: 42 * divider, height: divider * 42, platform: tile1, collision: true, where: "up 3" },
        // left corner end

        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },
        { x: 0, y: null, width: 214 * divider, height: divider * 128, platform: blok5, collision: true, where: "next" },


    ]// 6, 3, 11, 16;
    result = [];
    let maxX = 0;
    let lastWidth = 0;
    let lasty;
    let minY;
    // Platform elemanlarının x eksenindeki pozisyonunu
    // elemanların genişliğinden yola çıkarak
    // otomatik olarak verme
    for (let i = 0; i < platforms.length; i++) {
        let item = platforms[i];

        if (i == 0) {
            lasty = canvas.height - item.height;
            item.y = lasty;
            minY = lasty;
            result.push(new Platform(item));
            lastWidth = item.width;
            maxX += lastWidth;
            continue;
        };
        for (let i = 1; i < 2; i++) {
            if (item.where == "next") {
                lasty = canvas.height - item.height;
                item.y = lasty;
                item.x = maxX;
                result.push(new Platform(item));

                lastWidth = item.width;
                maxX += lastWidth;
            } else {
                let where = Number(item.where.split(" ")[1]);
                lasty = canvas.height - item.height * where;
                item.y = lasty;
                item.x = maxX - lastWidth;
                result.push(new Platform(item));
            };
        };
    };
    decoration = [
        { x: 10, y: null, width: 511, height: 201, obj: lgloo2, type: Decoration },
        { x: 560, y: null, width: 87, height: 93, obj: sign2, type: Decoration },
        { x: 2000, y: null, width: 50, height: 50, obj: IceBox, type: Decoration },
        { x: 2800, y: null, width: 96, height: 105, obj: snowMan, type: Decoration },
        { x: 4700, y: null, width: 50, height: 50, obj: Crate, type: Decoration },
        { x: 4340, y: null, width: 62, height: 39, obj: stone, type: Decoration },
        { x: 5790, y: null, width: 87, height: 94, obj: sign1, type: Decoration },
        { x: 5950, y: null, width: 511, height: 201, obj: lgloo1, type: Decoration },
        { x: 6050, y: null, width: 97, height: 78, obj: Crystal, type: Decoration },
    ];

    background = new Background({ x: 0, y: 0, backround });
    buttons = [
        new Button({ x: 15, title: "left", img: left }),
        new Button({ x: screenWidth * (20 / 100), title: "right", img: right }),
        new Button({ x: screenWidth * (68 / 100), title: "sword", img: sword }),
        new Button({ x: screenWidth * (75 / 100), title: "throw", img: axe }),
        new Button({ x: screenWidth * (85 / 100), title: "jump", img: jump })
    ];

    trees = [
        { x: 0, y: null, width: 364, height: 280, tree: tree2, type: Tree },
        { x: 400, y: null, width: 228, height: 280, tree: tree1, type: Tree },
        { x: 1300, y: null, width: 228, height: 280, tree: tree1, type: Tree },
        { x: 1700, y: null, width: 364, height: 280, tree: tree2, type: Tree },
        { x: 2700, y: null, width: 228, height: 280, tree: tree1, type: Tree },
        { x: 3000, y: null, width: 228, height: 280, tree: tree1, type: Tree },
        { x: 3200, y: null, width: 364, height: 280, tree: tree2, type: Tree },
        { x: 3900, y: null, width: 364, height: 280, tree: tree2, type: Tree },
        { x: 4400, y: null, width: 228, height: 280, tree: tree1, type: Tree },
        { x: 4700, y: null, width: 228, height: 280, tree: tree1, type: Tree },
        { x: 5500, y: null, width: 228, height: 280, tree: tree1, type: Tree },
        { x: 5720, y: null, width: 364, height: 280, tree: tree2, type: Tree },
    ];

    handlePosition(trees, decoration, goblins, minY);

    // platforms Curent x position
    scrollOfset = 0;

    lastPlatform = result[result.length - 1];// platformun son öeğesini kullanarak plarformun hareketlerini
    // ekran genişliğine bağlı olarak ayarlayıp 
    // oyunu responsive hale getir.
    endOfGame = lastPlatform.position.x + lastPlatform.width;
};
init();

let fps = 25, fpsInterval, startTime, now, then, elapsed;
function gameOver() {
    fps = 25;
    startAnimating(fps);
    objects = [];
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

        objects.forEach((obj) => {
            obj.update();
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

        if (screenWidth <= 768) {
            buttons.forEach((button) => {
                button.draw();
            });
        };

        if (screenWidth > 768 && scrollOfset < 200) {
            controleInfo(10, 50);
        };

        // right and left movement
        player.speed *= divider;
        if (keys.right.pressed && player.position.x < screenWidth * 0.33
            || keys.right.pressed && scrollOfset > endOfGame - screenWidth
            && player.position.x < screenWidth * 0.9) {
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
                if (scrollOfset < endOfGame - screenWidth) {
                    scrollOfset += player.speed;
                    player.move();

                    result.forEach((platform) => {
                        platform.position.x -= player.speed;
                    });

                    axes.forEach((axe) => {
                        axe.position.x -= player.speed
                    });

                    snowBalls.forEach((ball) => {
                        ball.position.x -= player.speed
                    });

                    objects.forEach((obj) => {
                        let constructorName = obj.constructor.name
                        if (constructorName == "Decoration") {
                            obj.position.x -= player.speed;
                        };
                        if (constructorName == "Enemy") {
                            obj.position.x -= player.speed;
                            obj.moveZone.maxX -= player.speed;
                            obj.moveZone.minX -= player.speed;
                        };
                        if (constructorName == "Tree") {
                            obj.position.x -= player.speed * 0.93;
                        };
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

                axes.forEach((axe) => {
                    axe.position.x += player.speed
                });

                snowBalls.forEach((ball) => {
                    ball.position.x += player.speed
                });

                objects.forEach((obj) => {
                    let constructorName = obj.constructor.name
                    if (constructorName == "Decoration") {
                        obj.position.x += player.speed;
                    };
                    if (constructorName == "Enemy") {
                        obj.position.x += player.speed;
                        obj.moveZone.maxX += player.speed;
                        obj.moveZone.minX += player.speed;
                    };
                    if (constructorName == "Tree") {
                        obj.position.x += player.speed * 0.93;
                    };
                });
            };
        };

        if (player.firtsLanding == false) {
            player.glide();
        };

        if (keys.right.pressed == false && keys.left.pressed == false &&
            keys.up.pressed == false && keys.e.pressed == false
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
                    let axe = new Axe({ x: player.position.x + (player.width * 0.5), y: player.position.y, direction: direction })
                    axes.push(axe);
                    keys.throwAxe = false;
                    player.numberOfAxe--;
                };
            };
        };

        if (keys.e.pressed) {
            player.attack();
            objects.forEach((obj) => {
                if (obj.constructor.name === "Enemy") {
                    if (player.position.x + player.width >= obj.position.x
                        && player.position.x <= obj.position.x + obj.width
                        && player.frameX == 9
                    ) {
                        obj.life--;
                    };
                }
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

                // goblin
                if (platform.title == "tile3") {
                    objects.forEach((obj) => {
                        if (obj.constructor.name === "Enemy") {
                            if (obj.position.x <= platform.position.x + platform.width
                                && obj.position.y + obj.height > platform.position.y) {
                                console.log(obj.speed);
                            };
                        };
                    });
                };
                // axe
                axes.forEach((axe) => {
                    if (axe.position.y + axe.height - 20 * divider >= platform.position.y
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
        objects.forEach((obj) => {
            if (obj.constructor.name === "Enemy") {
                axes.forEach((axe) => {
                    if (
                        obj.dead == false
                        // yatay
                        && axe.position.x + axe.width >= obj.position.x + obj.width / 2
                        && axe.position.x <= obj.position.x + obj.width / 2
                        // dikey
                        && axe.position.y + axe.width >= obj.position.y
                    ) {
                        axes.shift();
                        axe.noSpin = true;
                        obj.life -= 1;
                    };
                });
            };
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
        if (scrollOfset > endOfGame) {
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
        case 65:
            keys.left.pressed = true;
            keys.last = "left";
            break
        case 68:
            keys.right.pressed = true;
            keys.last = "right";
            break
        case 87:
            keys.up.pressed = true;
            break
        case 32:
            keys.space.pressed = true;
            keys.throwAxe = true;
            break
        case 69:
            keys.e.pressed = true;
            break
    };
});

addEventListener("keyup", ({ keyCode }) => {
    switch (keyCode) {
        case 65:
            keys.left.pressed = false;
            break
        case 68:
            keys.right.pressed = false;
            break
        case 87:
            keys.up.pressed = false;
            break
        case 32:
            keys.space.pressed = false;
            break
        case 69:
            keys.e.pressed = false;
            break
    };
});

function isInside(pointerX, pointerY) {
    // bir butona tıklanıp tıklanmadığını tespit etme
    let result = null;
    buttons.forEach((button) => {
        if (pointerY > button.position.y - 40
            && pointerY < button.position.y + button.height - 15
            && pointerX > button.position.x
            && pointerX < button.position.x + button.width) {
            result = button.title;
        };
    });
    return result;
};

let handleTouch = (event) => {
    // tıklanan butona göre alınacak reaksyonu belirleme.
    if (event.type === "touchstart") {
        let pointerX = event.touches[0].clientX;
        let pointerY = event.touches[0].clientY;
        let action = isInside(pointerX, pointerY);
        switch (action) {
            case "left":
                keys.left.pressed = true;
                keys.last = "left";
                break
            case "right":
                keys.right.pressed = true;
                keys.last = "right";
                break
            case "jump":
                keys.up.pressed = true;
                break
            case "throw":
                keys.space.pressed = true;
                keys.throwAxe = true;
                break
            case "sword":
                keys.e.pressed = true;
                break
        };
    };
    if (event.type === "touchend") {
        keys.up.pressed = false;
        keys.left.pressed = false;
        keys.right.pressed = false;
        keys.e.pressed = false;
        keys.space.pressed = false;
    };
};

// mobil cihazlar için touch yakalama
addEventListener("touchstart", handleTouch);
addEventListener("touchend", handleTouch);
