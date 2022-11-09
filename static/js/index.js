const loadingBody = document.querySelector("[data-loading-body]")
const loadingLogo = document.querySelector("[data-loading-logo]");
const loadingLogoPaths = document.getElementsByClassName("loading-logo-path")
const loadingLetterN = document.querySelector("[data-letter-n]");
const elementsToAppear = document.getElementsByClassName("appear")
const header = document.querySelector("[data-header]")
const title = document.querySelector("[data-title]")
const scrollToTopPC = document.querySelector("[data-scroll-to-top-pc]")
const scrollToTopMobile = document.querySelector("[data-scroll-to-top-mobile]")
const scrollToTopPCText = document.querySelector("[data-scroll-to-top-pc-text]")

const loadingLogoAppearDelay = 1000
const loadingDisappearDelay = loadingLogoAppearDelay + 2000
const loadingDisplayNoneDelay = loadingDisappearDelay + 1700
const loadingSlideUpDelay = loadingDisplayNoneDelay + 0
const loadingSlideUpTime = 500
const activeAppearDelay = loadingSlideUpDelay + 700

function slideUpLoadingBody() {
    let frames = 1 / loadingSlideUpTime
    let pos = 0;
    let id = setInterval(frame, frames);
    let stopAt = 0 - loadingBody.clientHeight;

    function frame() {
        if (pos < stopAt) {
            clearInterval(id);
            loadingBody.remove();
        } else {
            pos = pos - 5;
            loadingBody.style.top = pos + "px";
        };
    };
};

function loading() {
    if (window.location.href.includes("#")) {noLoading(); return;}

    setTimeout( () => {for(let i=0; i<loadingLogoPaths.length; i++) {loadingLogoPaths[i].classList.add("active")}}, loadingLogoAppearDelay);
    setTimeout( () => {loadingLogo.classList.add("disappear")}, loadingDisappearDelay);
    setTimeout( () => {loadingLogo.style.display = "none"}, loadingDisplayNoneDelay);
    setTimeout( slideUpLoadingBody, loadingSlideUpDelay)
    setTimeout( activate, activeAppearDelay)
};

function noLoading(animation=false) {
    loadingBody.remove();
    activate(animation)
}

function activate(animation=true) {
    document.body.classList.remove("no-scroll")
    for (let i=0; i<elementsToAppear.length; i++) {
        if (animation) {
            elementsToAppear[i].classList.add("active")
            document.querySelector("#top").scrollIntoView();
        } else {
            elementsToAppear[i].classList.add("active-no-anim")
        }
    }
}

function scrollFunc(_query) {
    document.querySelector(_query).scrollIntoView();
}

function updateAge() {
    let ageItem = document.querySelector("[data-age]");

    const now = Date.now();
    const diff = (now.valueOf()) - 1143685147000;

    const years = diff / (1000 * 60 * 60 * 24 * 365)
    ageItem.textContent = `${years.toFixed(7)}`;

    setTimeout(updateAge, 100)
}

function checkIfScrolled() {
    let rect = title.getBoundingClientRect();

    let isInView = (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
    if (!isInView) {
        scrollToTopPC.classList.add("active")
        scrollToTopMobile.classList.add("active")
    } else {
        scrollToTopPC.classList.remove("active")
        scrollToTopMobile.classList.remove("active")
    }
    
    setTimeout(checkIfScrolled, 500)
}

scrollToTopPC.addEventListener("mouseenter", (el) => {
    scrollToTopPC.classList.add("active2")
    scrollToTopPCText.classList.add("active")
})

scrollToTopPC.addEventListener("mouseleave", (el) => {
    scrollToTopPC.classList.remove("active2")
    scrollToTopPCText.classList.remove("active")
})


loading();
updateAge();
setTimeout(checkIfScrolled, 1000)