
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
            toggleVisibility(itemNumber, itemNumber+1);
            itemNumber++;
        };
       
    }
    else if (direction === "up") {
        if (itemNumber > 2) {
            toggleVisibility(itemNumber, itemNumber-1);
            itemNumber--;
        }; 
    };
};

const toggleVisibility = (curentItem, nextItem) =>{
    // şuanki elemanı görünmez bir sonraki elemanı görünür yap
    headerItems[curentItem].classList.add("hide");
    headerItems[nextItem].classList.remove("hide");
};


// y ekseninde mouse tekerleğini izleme 
let scrolCounter = 0; // mouse tekerleğinin hasasiyetini azaltmak için kullanılacak
header.addEventListener("wheel", (event) => {
    scrolCounter++;
    // mouse tekerleği 4 derece çevrildikten sonra işlem yapılsın
    if (scrolCounter>3){
        // mouse ile  Aşağı yöndemi yoksa yukarı yöndemi
        // hareket ediliyor.
        event.deltaY< 0 ? handelMovement("up") : handelMovement("down");
        scrolCounter = 0;
    };
});