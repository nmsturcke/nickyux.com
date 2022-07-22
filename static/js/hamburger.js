document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger")
    const selectMenu = document.getElementById("select-menu")

    hamburger.addEventListener("click", () => {
        if (selectMenu.classList.contains("active")) {
            selectMenu.classList.add("hidden")
            hamburger.classList.add("hidden")
            selectMenu.classList.remove("active")
            hamburger.classList.remove("active")
            
        } else {
            selectMenu.classList.add("active")
            hamburger.classList.add("active")
            selectMenu.classList.remove("hidden")
            hamburger.classList.remove("hidden")
        }
    })
})