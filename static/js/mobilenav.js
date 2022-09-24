const toggle = document.querySelectorAll("[data-mobilenav-toggle")
const content = document.querySelector("[data-mobilenav-content")

toggle.forEach( (e) => {e.addEventListener("click", (e) => {
    content.classList.toggle("active")
})})