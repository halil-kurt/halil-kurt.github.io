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

let tile2 = new Image();
tile2.src = "wintertileset/Tiles/2.png";

let tile6 = new Image();
tile6.src = "wintertileset/Tiles/6.png";

let tile3 = new Image();
tile3.src = "wintertileset/Tiles/3.png";

let tile11 = new Image();
tile11.src = "wintertileset/Tiles/11.png";

let tile16 = new Image();
tile16.src = "wintertileset/Tiles/16.png";

let tile10 = new Image();
tile10.src = "wintertileset/Tiles/10.png";

let backround = new Image();
backround.src = "wintertileset/BG/BG.png";

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
        this.speed = 5;
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
    constructor({ x, y, width, height, platform }) {
        this.position = {
            x,
            y // y: y
        }
        this.platform = platform;
        this.width = width;
        this.height = height;
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
    constructor({ x, y, tree }) {
        this.position = {
            x,
            y
        };
        this.tree = tree;
        this.width = tree.width;
        this.height = tree.height;
    }
    draw() {
        c.drawImage(this.tree, this.position.x, this.position.y);
    };
};

class Object {
    constructor({ x, y, width, height, obj }) {
        this.position = {
            x,
            y 
        };
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
let hills = [];
let backgrounds = [];
let objs = [];

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
        new Platform({ x: 40 * 0, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 1, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 2, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 3, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 4, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 5, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 6, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 7, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 8, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 9, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 10, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 11, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 12, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 13, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 14, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 15, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 16, y: canvas.height - 40, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 17, y: canvas.height - 40, width: 40, height: 40, platform: tile6 }),

        new Platform({ x: 40 * 0, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 1, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 2, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 3, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 4, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 5, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 6, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 7, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 8, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 9, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 10, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 11, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 12, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 13, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        new Platform({ x: 40 * 14, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile5 }),
        // corner
        new Platform({ x: 40 * 15, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile10 }),
        new Platform({ x: 40 * 16, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile11 }),
        new Platform({ x: 40 * 17, y: canvas.height - 40 * 2, width: 40, height: 40, platform: tile3 }),

        new Platform({ x: 40 * 0, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 1, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 2, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 3, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 4, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 5, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 6, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 7, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 8, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 9, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 10, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 11, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 12, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 13, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 14, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile2 }),
        new Platform({ x: 40 * 15, y: canvas.height - 40 * 3, width: 40, height: 40, platform: tile3 }),
    ];

    objs = [
        new Object({ x: 10, y: canvas.height - 320, width: 511, height: 201, obj: lgloo2 }),
        new Object({ x: 560, y: canvas.height - 210, width: 87, height: 93, obj: sign2 }),
    ];

    backgrounds = [
        new Background({ x: 0, y: 0, backround })
    ];
    trees = [
        new Tree({  x: 20, y: canvas.height - 400, width: 228, height: 280, tree: tree2 })
    ];

    // platforms Curent x position
    scrollOfset = 0;

}
let animate = () => {
    requestAnimationFrame(animate);
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    backgrounds.forEach(bg => {
        bg.draw();
    });

    trees.forEach((tree) => {
        tree.draw();
    });
    
    objs.forEach((obj) => {
        obj.draw();
    });
    // draw platforms
    platforms.forEach((platform) => {
        platform.draw();
    })
    // draw the player
    player.update();

    // right and left movement
    if (keys.right.pressed && player.position.x < 400) {
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
            platforms.forEach((platform) => {
                platform.position.x -= player.speed;
            });

            objs.forEach((obj) => {
                obj.position.x -= player.speed
            });

            trees.forEach((tree) => {
                tree.position.x -= player.speed * 0.58;
            });
        }
        else if (keys.left.pressed && scrollOfset > 0) {
            // move the platform to the right
            scrollOfset -= player.speed;
            platforms.forEach((platform) => {
                platform.position.x += player.speed;
            });

            objs.forEach((obj) => {
                obj.position.x += player.speed;
            });

            trees.forEach((tree) => {
                tree.position.x += player.speed * 0.58;
            });
        };
    };

    // collision detection
    platforms.forEach((platform) => {
        if (player.position.y + player.height <=
            platform.position.y &&
            player.position.y + player.height +
            player.velocity.y >= platform.position.y
            && player.position.x + player.width >=
            platform.position.x && player.position.x
            <= platform.position.x + platform.width) {
            player.velocity.y = 0;
        };
    });
     // win senario
     if (scrollOfset > 2000) {
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
            console.log("up");
            break
    };
});