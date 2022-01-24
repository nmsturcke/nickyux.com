if (document.cookie == "") {
    document.cookie = "lightMode=0; expires=Tue, 19 Jan 2038 04:14:07 UTC";
} else {
    // window.location.replace("/");
}

document.getElementById("goto").addEventListener("click", () => {
    window.location.replace("/");
})

setTimeout( () => {
    document.body.classList.add("active")
}, 7500)