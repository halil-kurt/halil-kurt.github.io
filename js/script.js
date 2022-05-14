let footer = document.querySelector("footer");
const section = document.querySelector("section");
const textItems = document.querySelectorAll(".header-text");
const profileImg = document.querySelector(".header-image");
const header = document.querySelector("header");
const headerItems = [profileImg, ...textItems];
let canCreateElement = true;



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
        }
    }

    console.log(swipe);
}

const toggleVisibility = (curentItem, nextItem) => {
    // şuanki elemanı görünmez bir sonraki elemanı görünür yap
    headerItems[curentItem].classList.add("hide");
    headerItems[nextItem].classList.remove("hide");
};

// projeleri kullanıcıya göster
const createElement = () => {
    if (canCreateElement) {
        let myProjects = ``;
        myProjects = document.createElement("myProjects");
        myProjects.innerHTML = `
        <h1 class="title"> My Projects</h1>
        <div class="container">

            <div class = "card-container">
                <div class="card">
                    <div class="card-content">
                       <img src="images/codeTyping.png" alt="img">
                        <h2 class="card-title">header</h2>
                        <p class="card-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing.
                        </p>
                        <a href="#" target="_blank" class="button">take a look</a>
                    </div>
                </div>
            </div>
            
            <div class = "card-container">
                <div class="card">
                    <div class="card-content">
                       <img src="images/codeTyping.png" alt="img">
                        <h2 class="card-title">header</h2>
                        <p class="card-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing.
                        </p>
                        <a href="#" target="_blank" class="button">take a look</a>
                    </div>
                </div>
            </div>
            
            <div class = "card-container">
                <div class="card">
                    <div class="card-content">
                       <img src="images/codeTyping.png" alt="img">
                        <h2 class="card-title">header</h2>
                        <p class="card-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing.
                        </p>
                        <a href="#" target="_blank" class="button">take a look</a>
                    </div>
                </div>
            </div>
            
            <div class = "card-container">
                <div class="card">
                    <div class="card-content">
                       <img src="images/codeTyping.png" alt="img">
                        <h2 class="card-title">header</h2>
                        <p class="card-body">
                        Lorem ipsum dolor sit amet consectetur adipisicing.
                        </p>
                        <a href="#" target="_blank" class="button">take a look</a>
                    </div>
                </div>
            </div>
        </div>
    `
        footer.classList.remove("hide");
        section.appendChild(myProjects);
        canCreateElement = false;
    };
};


// projeler kısmını sil
const removeElement = () => {
    section.removeChild(section.firstElementChild);
    footer.classList.add("hide");
    canCreateElement = true;
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