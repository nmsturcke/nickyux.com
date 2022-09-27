const loadingBody = document.querySelector("[data-loading-body]")
const loadingLogo = document.querySelector("[data-loading-logo]");
const loadingLogoPaths = document.getElementsByClassName("loading-logo-path")
const loadingLetterN = document.querySelector("[data-letter-n]");
const elementsToAppear = document.getElementsByClassName("appear")
const header = document.querySelector("[data-header]")

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
    for (let i=0; i<elementsToAppear.length; i++) {
        if (animation) {
            elementsToAppear[i].classList.add("active")
        } else {
            elementsToAppear[i].classList.add("active-no-anim")
        }
    }
}

function scrollTo(query) {
    document.querySelector(query).scrollIntoView()
}

loading();