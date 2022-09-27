const toggle = document.querySelectorAll("[data-mobilenav-toggle]")
const toggleIcon = document.querySelectorAll("[data-mobilenav-toggle-icon]")
const content = document.querySelector("[data-mobilenav-content]")

toggle.forEach( (e) => {e.addEventListener("click", (e) => {
    if (content.classList.contains("active")) {
        closeHamburger();
    } else {
        openHamburger();
    }
})})

function openHamburger() {
    toggleIcon.forEach((f) => {f.classList.add("active"); f.classList.remove("hidden")})
    setTimeout( () => {content.classList.add("active")}, 50)
    document.body.classList.add("no-scroll")
}

function closeHamburger(scrollTo = null) {
    toggleIcon.forEach((f) => {f.classList.add("hidden"); f.classList.remove("active")})
    content.classList.remove("active")
    document.body.classList.remove("no-scroll")

    if (scrollTo) {
        document.querySelector(scrollTo).scrollIntoView();
    }
}