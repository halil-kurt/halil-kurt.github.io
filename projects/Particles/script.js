
var canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth * 0.98;
canvas.height = window.innerHeight * 0.97;

var c = canvas.getContext("2d");

// variables
let bubleList = [];
let lineSize = canvas.width * 0.1;
let maxRadius = 40;
let maxDistance = 50;
let mouse = {
    x: undefined,
    y: undefined
};

//  functions

// baloncukler arasında çizgi çiz (100 pixel ve altındaki mesafeler)
function drawLines(bubleList) {
    for (let i = 0; i < bubleList.length; i++) {
        for (let j = 0; j < bubleList.length; j++) {
            if (bubleList[i].x + lineSize > bubleList[j].x && bubleList[j].x + lineSize > bubleList[i].x
                && bubleList[i].y + lineSize > bubleList[j].y && bubleList[j].y + lineSize > bubleList[i].y) {
                c.beginPath();
                c.moveTo(bubleList[i].x, bubleList[i].y);
                c.lineTo(bubleList[j].x, bubleList[j].y);
                c.strokeStyle = "#f1f1f1f1";
                c.save()
                c.globalAlpha = 0.4;
                c.stroke();
                c.restore()

            };
        };
    };
};

// Rastgele renk oluştur
function randomRbg() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 1 + ')';
};
function borderDetection(ball) {
    // Top ekranın sağ yada sol kearlarına çarparsa geri dösün (-v)
    if (ball.x + ball.radus > canvas.width || ball.x - ball.radus < 0) {
        ball.dx = -ball.dx;
    };
    // Top ekranın üst yada alt kearlarına çarparsa geri dösün (-v)
    if (ball.y - ball.radus < 0 || ball.y + ball.radus > canvas.height) {
        ball.dy = -ball.dy;
    };
};

// Objects

function Bubles(x, y, dx, dy, radus, fillColor, strockColor) {
    this.radus = radus;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.fillColor = fillColor;
    this.strockColor = strockColor;
    this.minradus = radus;

    this.draw = function () {
        this.update();
        c.strokeStyle = strockColor;
        c.fillStyle = fillColor;
        c.beginPath(this.x, this.y);
        c.arc(this.x, this.y, this.radus, Math.PI * 2, false);
        c.fill();
        c.stroke();
    };
    this.update = function () {

        // eğer top kenerlara çarparsa geri dösün
        borderDetection(this);

        // pointer a yakın olan(maxDistance) balaoncukların yarı çapını arttır(maxRadius)
        if (this.x > mouse.x - maxDistance && mouse.x + maxDistance > this.x
            && this.y < mouse.y + maxDistance && this.y + maxDistance > mouse.y) {
            if (this.radus < maxRadius) {
                this.radus += 1;
            };
        } else if (this.radus > this.minradus) {
            // pointer a yakın olan balaoncukların yarı çapını eski değerine getir(minRadius)
            this.radus -= 1
        };

        // posisyonları güncelle
        this.x += this.dx;
        this.y += this.dy;
    }

}

function init() {
    bubleList = [];

    // baloncuklerın özelliklerini tanımla
    for (let i = 0; i < innerWidth * 0.12; i++) {
        var randomColor = randomRbg();
        let radus = Math.random() * 5 + 1;
        let x = Math.random() * (canvas.width - radus * 2);
        let y = Math.random() * (canvas.height - radus * 2);
        let dx = (Math.random() - 0.4);
        let dy = (Math.random() - 0.4);
        let fillColor = randomColor;
        let strockColor = randomColor;
        let buble = new Bubles(x, y, dx, dy, radus, fillColor, strockColor)

        bubleList.push(buble);
    };
};

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)
    drawLines(bubleList)

    bubleList.forEach((buble) => {
        buble.draw();
    });

};

init();
animate();


// event listeners
addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});
addEventListener("touchmove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

addEventListener("resize", function () {
    canvas.width = window.innerWidth * 0.98;
    canvas.height = window.innerHeight * 0.97;
    init();
});