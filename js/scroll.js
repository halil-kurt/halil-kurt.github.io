
// sayfadaki scroll clasına sahip olan elementr,
// kullanıcı tarafından görünür bir pozisyano
// geldiklerinde bu elementlere animasyon eklenecek.

let scrollElements = document.querySelectorAll(".scroll");
export const elementInView = (el, dividend = 1) => {
    // getBoundingClientRect elementin boyutunu ve konumunu
    // geri dödürür. 
    const elementTop = el.getBoundingClientRect().top

    return (
        elementTop <= window.innerHeight / dividend
    );
};

export const elementOutofView = (el) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop > window.innerHeight);
};

export const displayScrollElement = (element) => {
    element.classList.add("scrolled");
};

export const hideScrollElement = (element) => {
    element.classList.remove("scrolled");
};

export const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.10)) {
            displayScrollElement(el);
        } else if (elementOutofView(el)) {
            hideScrollElement(el);
        }
    });
};
