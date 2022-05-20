const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

// full screen
canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 75;
const gravity = 0.3;
// platforms Curent x position
let scrollOfset = 0;

let platform = new Image();
platform.src = "images/platform.png";
let backround = new Image();
backround.src = "images/BG.png";


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
    constructor({ x, y, platform }) {
        this.position = {
            x,
            y
        }
        this.platform = platform;
        this.width = platform.width;
        this.height = platform.height;
    };
    draw() {
        c.drawImage(this.platform, this.position.x, this.position.y);
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


let player = new Player();
// create platform 
let platforms = [
    new Platform({ x: 0, y: canvas.height - 75, platform }),
    new Platform({ x: platform.width - 2, y: canvas.height - 75, platform }),
    new Platform({ x: platform.width * 2 + 100, y: canvas.height - 75, platform }),
    new Platform({ x: platform.width * 3 + 200, y: canvas.height - 75, platform }),
];

let backgrounds = [new Background({ x: 0, y: 0, backround })];

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
        new Platform({ x: 0, y: canvas.height - 75, platform }),
        new Platform({ x: platform.width - 2, y: canvas.height - 75, platform }),
        new Platform({ x: platform.width * 2 + 100, y: canvas.height - 75, platform }),
        new Platform({ x: platform.width * 3 + 200, y: canvas.height - 75, platform }),
    ];

    backgrounds = [
        new Background({ x: 0, y: 0, backround })
    ];

    // platforms Curent x position
    scrollOfset = 0;

}
let animate = () => {
    requestAnimationFrame(animate);
    c.fillStyle = "white";
    c.fillRect(0, 0, canvas.width, canvas.height);

    backgrounds.forEach(genericObject => {
        genericObject.draw()
    })

    // draw platforms
    platforms.forEach((platform) => {
        platform.draw();
    })
    // draw the player
    player.update();

    // right and left movement
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed;
    } else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = - player.speed;
    } else {
        player.velocity.x = 0;
        if (keys.right.pressed) {
            // move the platform to the left
            scrollOfset += player.speed;
            platforms.forEach((platform) => {
                platform.position.x -= player.speed;
            });
        }
        else if (keys.left.pressed) {
            // move the platform to the right
            scrollOfset -= player.speed;
            platforms.forEach((platform) => {
                platform.position.x += player.speed;
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

    // lose senarion
    if (player.position.y > canvas.height) {
        init();
    };
}
animate()

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