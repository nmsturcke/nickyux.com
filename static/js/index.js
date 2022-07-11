const loadingBody = document.querySelector("[data-loading-body]")
const loadingLogo = document.querySelector("[data-loading-logo]");
const loadingLogoPaths = document.getElementsByClassName("loading-logo-path")
const loadingLetterN = document.querySelector("[data-letter-n]");
const elementsToAppear = document.getElementsByClassName("appear")
const header = document.querySelector("[data-header]")

const loadingLogoAppearDelay = 1000
const loadingDisappearDelay = 2500
const loadingDisplayNoneDelay = 3000
const loadingSlideUpDelay = 4000
const loadingSlideUpTime = 500
const activeAppearDelay = 5000

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
    for(let i=0; i<loadingLogoPaths.length; i++) {console.log(loadingLogoPaths[i].getTotalLength())};
    setTimeout( () => {for(let i=0; i<loadingLogoPaths.length; i++) {loadingLogoPaths[i].classList.add("active")}}, loadingLogoAppearDelay);
    setTimeout( () => {loadingLogo.classList.add("disappear")}, loadingDisappearDelay);
    setTimeout( () => {loadingLogo.style.display = "none"}, loadingDisplayNoneDelay);
    setTimeout( slideUpLoadingBody, loadingSlideUpDelay)
    setTimeout( activate, activeAppearDelay)
};

function noLoading() {
    loadingBody.remove();
    activate()
}

function activate() {
    header.classList.add("active")
    for (let i=0; i<elementsToAppear.length; i++) {
        elementsToAppear[i].classList.add("active")
    }
}

loading();
// noLoading();