const switchObj = document.getElementById("switch")

switchObj.addEventListener("click", () => {
    colourModeClick()
    switchObj.classList.remove("active")
    switchObj.classList.add("active")
    if (switchObj.checked) {
        // Light mode
    } else {
        // Dark mode
    }
})