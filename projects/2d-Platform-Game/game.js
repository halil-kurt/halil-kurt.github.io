const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// full screen
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 75;
const gravity = 0.3;
// platforms Curent x position
let scrollOfset = 0;

let tile5 = new Image();
tile5.src = "wintertileset/Tiles/5.png";

let tile4 = new Image();
tile4.src = "wintertileset/Tiles/4.png";

let tile2 = new Image();
tile2.src = "wintertileset/Tiles/2.png";

let tile6 = new Image();
tile6.src = "wintertileset/Tiles/6.png";

let tile3 = new Image();
tile3.src = "wintertileset/Tiles/3.png";

let tile1 = new Image();
tile1.src = "wintertileset/Tiles/1.png";

let tile7 = new Image();
tile7.src = "wintertileset/Tiles/7.png";

let tile8 = new Image();
tile8.src = "wintertileset/Tiles/8.png";

let tile11 = new Image();
tile11.src = "wintertileset/Tiles/11.png";

let tile16 = new Image();
tile16.src = "wintertileset/Tiles/16.png";

let tile10 = new Image();
tile10.src = "wintertileset/Tiles/10.png";

let blok5 = new Image();
blok5.src = "wintertileset/Tiles/5.3_blok.png";

let blok3_3 = new Image();
blok3_3.src = "wintertileset/Tiles/3.3_blok.png";

let water5 = new Image();
water5.src = "wintertileset/Tiles/5.2_water.png";

let water3 = new Image();
water3.src = "wintertileset/Tiles/3.2_water.png";

let leftLid = new Image();
leftLid.src = "wintertileset/Tiles/left_lid.png";

let rightLid = new Image();
rightLid.src = "wintertileset/Tiles/right_lid.png";

let backround = new Image();
backround.src = "wintertileset/BG/BG.png";

// decoration
let snowMan = new Image();
snowMan.src = "wintertileset/Object/SnowMan.png";

let stone = new Image();
stone.src = "wintertileset/Object/Stone.png";

let tree1 = new Image();
tree1.src = "wintertileset/Object/Tree_1.png";

let tree2 = new Image();
tree2.src = "wintertileset/Object/Tree_2.png";

let lgloo2 = new Image();
lgloo2.src = "wintertileset/Object/Igloo2.png";

let sign2 = new Image();
sign2.src = "wintertileset/Object/Sign_2.png";


// create player
class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100
        };
        this.velocity = {
            x: 0,
            y: 1
        };
        this.speed = 20;
        this.width = 30;
        this.height = 30;
    };
    draw() {
        c.fillStyle = "red"
        c.fillRect(this.position.x, this.position.y,
            this.width, this.height);
    };

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // gravity
        if (this.position.y + this.height +
            this.velocity.y <= canvas.height) {
            this.velocity.y += gravity;
        };
        ;
    }
};

class Platform {
    constructor({ x, y, width, height, platform, colusion }) {
        this.position = {
            x,
            y // y: y
        }
        this.platform = platform;
        this.width = width;
        this.height = height;
        this.colusion = colusion;
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

let player = new Player();
let platforms = [];
let trees = [];
let background = [];
let decoration = [];
let result = [];

const keys = {
    right: {
        pressed: false,
    },
    left: {
        pressed: false,
    },
};

let init = () => {
    player = new Player();

    // create platform 
    platforms = [
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 126, width: 128, height: 128, platform: blok3_3, colusion: true, where: "next" },

        // right corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile10, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile3, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile11, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile6, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile3, colusion: true, where: "up" },
        // right corner end

        //water start
        { x: null, y: canvas.height - 75, width: 128, height: 75, platform: water3, colusion: false, where: "next" },
        //{ x: null, y: canvas.height - 75, width: 213, height: 75, platform: water5, colusion: true, where: "next" },
        //water end

        //left corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile4, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile1, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile7, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile8, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile1, colusion: true, where: "up" },
        // left corner end

        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },


        // right corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile10, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile3, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile11, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile6, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile3, colusion: true, where: "up" },
        // right corner end

        //water start
        { x: null, y: canvas.height - 75, width: 128, height: 75, platform: water3, colusion: false, where: "next" },
        { x: null, y: canvas.height - 75, width: 213, height: 75, platform: water5, colusion: true, where: "next" },
        //water end

        //left corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile4, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile1, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile7, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile8, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile1, colusion: true, where: "up" },
        // left corner end

        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },

        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 126, width: 128, height: 128, platform: blok3_3, colusion: true, where: "next" },

        // right corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile10, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile3, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile11, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile6, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile3, colusion: true, where: "up" },
        // right corner end

        //water start
        { x: null, y: canvas.height - 75, width: 128, height: 75, platform: water3, colusion: false, where: "next" },
        //{ x: null, y: canvas.height - 75, width: 213, height: 75, platform: water5, colusion: true, where: "next" },
        //water end

        //left corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile4, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile1, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile7, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile8, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile1, colusion: true, where: "up" },
        // left corner end

        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },
        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },


        // right corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile10, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile3, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile11, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile6, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile3, colusion: true, where: "up" },
        // right corner end

        //water start
        { x: null, y: canvas.height - 75, width: 128, height: 75, platform: water3, colusion: false, where: "next" },
        { x: null, y: canvas.height - 75, width: 213, height: 75, platform: water5, colusion: false, where: "next" },
        //water end

        //left corner start
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile4, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile1, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile7, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42, width: 42, height: 42, platform: tile5, colusion: true, where: "next" },
        { x: null, y: canvas.height - 42 * 2, width: 42, height: 42, platform: tile8, colusion: true, where: "up" },
        { x: null, y: canvas.height - 42 * 3, width: 42, height: 42, platform: tile1, colusion: true, where: "up" },
        // left corner end

        { x: 0, y: canvas.height - 126, width: 214, height: 128, platform: blok5, colusion: true, where: "next" },


    ]// 6, 3, 11, 16;

    decoration = [
        new Decoration({ x: 10, y: canvas.height - 325, width: 511, height: 201, obj: lgloo2 }),
        new Decoration({ x: 560, y: canvas.height - 210, width: 87, height: 93, obj: sign2 }),
        new Decoration({ x: 2700, y: canvas.height - 231, width: 96, height: 105, obj: snowMan }),
        new Decoration({ x: 3000, y: canvas.height - 165, width: 62, height: 39, obj: stone }),
    ];

    background = new Background({ x: 0, y: 0, backround });

    trees = [
        new Tree({ x: 0, y: canvas.height - 400, width: 228, height: 280, tree: tree2 }),
        new Tree({ x: 400, y: canvas.height - 400, width: 364, height: 280, tree: tree1 }),
        new Tree({ x: 1300, y: canvas.height - 400, width: 364, height: 280, tree: tree1 }),
        new Tree({ x: 1700, y: canvas.height - 400, width: 228, height: 280, tree: tree2 }),
        new Tree({ x: 2500, y: canvas.height - 400, width: 364, height: 280, tree: tree1 }),
        new Tree({ x: 3000, y: canvas.height - 400, width: 364, height: 280, tree: tree1 }),
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
        }
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

}
let animate = () => {
    requestAnimationFrame(animate);
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    background.draw();

    trees.forEach((tree) => {
        tree.draw();
    });

    decoration.forEach((obj) => {
        obj.draw();
    });
    // draw platforms
    result.forEach((platform) => {
        platform.draw();
    });
    // draw the player
    player.update();

    // right and left movement
    if (keys.right.pressed && player.position.x < 400
        || keys.right.pressed && scrollOfset > 4700
        && player.position.x < 1240) {
        player.velocity.x = player.speed;
    } else if (keys.left.pressed && player.position.x > 100
        || keys.left.pressed && scrollOfset === 0
        && player.position.x > 0) {
        player.velocity.x = - player.speed;
    } else {
        player.velocity.x = 0;
        if (keys.right.pressed) {
            // move the platform to the left
            scrollOfset += player.speed;
            if (scrollOfset < 4750) {
                result.forEach((platform) => {
                    platform.position.x -= player.speed;
                });

                decoration.forEach((obj) => {
                    obj.position.x -= player.speed
                });

                trees.forEach((tree) => {
                    tree.position.x -= player.speed * 0.90;
                });
            }
        }
        else if (keys.left.pressed && scrollOfset > 0) {
            // move the platform to the right
            scrollOfset -= player.speed;
            result.forEach((platform) => {
                platform.position.x += player.speed;
            });

            decoration.forEach((obj) => {
                obj.position.x += player.speed;
            });

            trees.forEach((tree) => {
                tree.position.x += player.speed * 0.90;
            });
        };
    };

    // collision detection
    result.forEach((platform) => {
        if (platform.colusion) {
            if (player.position.y + player.height <=
                platform.position.y &&
                player.position.y + player.height +
                player.velocity.y >= platform.position.y
                && player.position.x + player.width >=
                platform.position.x && player.position.x
                <= platform.position.x + platform.width) {
                player.velocity.y = 0;
            };
        };
    });
    // win senario
    if (scrollOfset > 4000) {
        console.log("you win");
    };
    // lose senarion
    if (player.position.y > canvas.height) {
        init();
    };
}
init();
animate();

addEventListener("keydown", ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            keys.left.pressed = true;
            break
        case 40:
            player.velocity.y += 8;
            break
        case 39:
            keys.right.pressed = true;
            break
        case 38:
            player.velocity.y -= 8;
            break
    };
});

addEventListener("keyup", ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            keys.left.pressed = false;
            break
        case 40:
            console.log("down");
            break
        case 39:
            keys.right.pressed = false;
            break
        case 38:
            console.log(scrollOfset);
            console.log(player.position.x);
            break
    };
});