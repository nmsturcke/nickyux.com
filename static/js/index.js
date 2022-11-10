const loadingBody = document.querySelector("[data-loading-body]")
const loadingLogo = document.querySelector("[data-loading-logo]");
const loadingLogoPaths = document.getElementsByClassName("loading-logo-path")
const loadingLetterN = document.querySelector("[data-letter-n]");
let elementsToAppear = document.getElementsByClassName("appear")
const header = document.querySelector("[data-header]")
const title = document.querySelector("[data-title]")
const scrollToTopPC = document.querySelector("[data-scroll-to-top-pc]")
const scrollToTopMobile = document.querySelector("[data-scroll-to-top-mobile]")
const scrollToTopPCText = document.querySelector("[data-scroll-to-top-pc-text]")
const shapesContainer = document.querySelector("[data-shapes-container]")
const redDot = document.querySelector("[data-red-dot]")
const redDot2 = document.querySelector("[data-red-dot2]")

const loadingLogoAppearDelay = 1000
const loadingDisappearDelay = loadingLogoAppearDelay + 2000
const loadingDisplayNoneDelay = loadingDisappearDelay + 1700
const loadingSlideUpDelay = loadingDisplayNoneDelay + 0
const loadingSlideUpTime = 500
const activeAppearDelay = loadingSlideUpDelay + 700

const triangleSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.677 18.52c.914 1.523-.183 3.472-1.967 3.472h-19.414c-1.784 0-2.881-1.949-1.967-3.472l9.709-16.18c.891-1.483 3.041-1.48 3.93 0l9.709 16.18z"/></svg>'
const shapeOptions = {
    "color": ["1", "2", "3", "4"],
    "shape": ["square", "triangle"]
}
const shapeCount = Math.floor(Math.random() * 5)
let shapes = []

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
    if (window.location.href.includes("#")) {setTimeout(noLoading, 100); return;}

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
    
    if (shapes.length !== 0 ) {
        elementsToAppear = document.getElementsByClassName("appear")
    }
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

function choose(choices) {
    return choices[Math.floor(Math.random() * choices.length)]
}
function newDistance(index) {
    return (((index-1) * 20) + Math.floor(Math.random() * 50))
}

async function setupShapes() {
    let iterations = 0;
    while (shapeCount > shapes.length && iterations < 15) {
        iterations ++;
        let shapeWrapper = document.createElement("div");
        shapeWrapper.classList.add("background-shape-wrapper");
        shapeWrapper.classList.add("pc");
        shapeWrapper.classList.add("appear");
        shapeWrapper.classList.add("anim2");
        shapeWrapper.style.animationDelay = "250ms";
        
        let shape = document.createElement("div");
        let chosenShape = choose(shapeOptions.shape)
        shape.classList.add("background-shape")
        shape.classList.add(chosenShape)
        shape.classList.add("color-" + choose(shapeOptions.color))

        if (chosenShape === "triangle") {
            shape.innerHTML = triangleSVG
        }

        shapeWrapper.addEventListener("mousemove", onShapeWrapperHover)

        shapes.push(shape)
        shapeWrapper.appendChild(shape)
        shapesContainer.appendChild(shapeWrapper)

        let left = newDistance(shapes.length) + "%";
        let top = newDistance(shapes.length) + "%";
        
        let leftInt = parseInt(left.replace("%", ""))
        let topInt = parseInt(top.replace("%", ""))

        while ((5 < leftInt && leftInt < 75) && (20 < topInt && topInt < 72) || ((leftInt < 10 || leftInt > 85) || (topInt > 100))) {
            left = newDistance(shapes.length) + "%";
            top = newDistance(shapes.length) + "%";

            leftInt = parseInt(left.replace("%", ""))
            topInt = parseInt(top.replace("%", ""))
        }
        shapeWrapper.style.left = left;
        shapeWrapper.style.top = top;

        if (chosenShape !== "circle") {

            shape.animate([
                {
                    transform: Math.floor(Math.random() * 2) ? "rotate(360deg)" : "rotate(-360deg)"
                }
            ], {
                duration: (3000 + Math.floor(Math.random() * 5000)),
                iterations: Infinity
            })
        }
    }
}

function onShapeWrapperHover(event) {
    let mouseX = event.clientX - 50
    let mouseY = event.clientY - 130
    
    let elementX = event.target.offsetLeft + (event.target.offsetWidth / 2)
    let elementY = event.target.offsetTop + (event.target.offsetHeight / 2)

    let mouseOffsetX = elementX - mouseX
    let mouseOffsetY = elementY - mouseY

    if (mouseOffsetX > event.target.offsetWidth || mouseOffsetY > event.target.offsetHeight) {
        return
    }

    if (!mouseOffsetX || !mouseOffsetY) {
        return
    }

    event.target.animate([
        {
            left: (event.target.offsetLeft + mouseOffsetX / 2)  + "px",
            top: (event.target.offsetTop + mouseOffsetY / 2) + "px",
        }
    ], {
        duration: 600,
        easing: "ease-out",
        fill: "forwards"
    })
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
setupShapes()
