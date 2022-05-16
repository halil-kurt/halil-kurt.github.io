import * as scroll from "./scroll.js";

let footer = document.querySelector("footer");
const section = document.querySelector("section");
const textItems = document.querySelectorAll(".header-text");
const profileImg = document.querySelector(".header-image");
const header = document.querySelector("header");
const headerItems = [profileImg, ...textItems];


let itemNumber = 1;
const handelMovement = (direction) => {
    // itemNumber ın headerItems listesinin sınırları 
    // içerisinde kalması sağlanıyor
    // yani listeye listenin dışındakı
    // bir indeksle girilmesi engelleniyor
    if (itemNumber === 1) {
        headerItems[0].classList.remove("hide");
    };

    if (direction === "down") {
        if (itemNumber < headerItems.length - 1) {
            toggleVisibility(itemNumber, itemNumber + 1);
            itemNumber++;
        };
        if (itemNumber === headerItems.length - 1) {
            createElement();
        }
    }
    else if (direction === "up") {
        if (itemNumber > 2) {
            toggleVisibility(itemNumber, itemNumber - 1);
            itemNumber--;
        };
        if (itemNumber === headerItems.length - 2) {
            removeElement();
        }
    };
};

let swipe = [];
let handleTouch = (event) => {
    if (event.type === "touchmove") {
        swipe.push(event.touches[0].clientY)
    }

    // kaydırma işlemi biterse
    if (swipe.length > 2) {
        if (event.type === "touchend") {
            // dokunmatik ekranda yukarıya doğru kaydırılmışsa
            if (swipe[0] > swipe[swipe.length - 1]) {
                handelMovement("down");
                swipe = [];
            }

            // dokunmatik ekranda yukarıya doğru kaydırılmışsa
            if (swipe[0] < swipe[swipe.length - 1]) {
                handelMovement("up");
                swipe = [];
            }
        };
    };
};

const toggleVisibility = (curentItem, nextItem) => {
    // şuanki elemanı görünmez bir sonraki elemanı görünür yap
    headerItems[curentItem].classList.add("hide");
    headerItems[nextItem].classList.remove("hide");
};

// projeleri kullanıcıya göster
const createElement = () => {
    section.classList.remove("hide");
    footer.classList.remove("hide");
};


// projeler kısmını sil
const removeElement = () => {
    section.classList.add("hide");
    footer.classList.add("hide");
};


// y ekseninde mouse tekerleğini izleme 
let scrolCounter = 0; // mouse tekerleğinin hasasiyetini azaltmak için kullanılacak
header.addEventListener("wheel", (event) => {
    scrolCounter++;
    // mouse tekerleği 4 derece çevrildikten sonra işlem yapılsın
    if (scrolCounter > 3) {
        // mouse ile  Aşağı yöndemi yoksa yukarı yöndemi
        // hareket ediliyor.
        event.deltaY < 0 ? handelMovement("up") : handelMovement("down");
        scrolCounter = 0;
    };
});

// dokunmatik ekranlar için kaydırma olayını ezleme
//header.addEventListener("touchstart", handleTouch)
header.addEventListener("touchend", handleTouch)
header.addEventListener("touchmove", handleTouch)


window.addEventListener("scroll", () => {
    scroll.handleScrollAnimation();
});