function getCookie(name) {
    let cname = name + "="
    let cL = document.cookie.split(";");

    for (let i = 0; i < cL.length; i++) {
        let c = cL[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1)
        }
        if (c.indexOf(cname) == 0) {
            return c.split("=").slice(-1).toString();
        }
    }
    return "";
}

function colourMode(colour) {
    if (colour == "0") {
        document.body.classList.add("dark-mode")
        // document.getElementById("colour-mode").textContent = "Light mode";
        document.cookie = "lightMode=0; Expires=Tue, 19 Jan 2038 04:14:07 UTC";
    } else {
        document.body.classList.remove("dark-mode")
        // document.getElementById("colour-mode").textContent = "Dark mode";
        document.cookie = "lightMode=1; Expires=Tue, 19 Jan 2038 04:14:07 UTC";
    }
}

function colourModeClick() {
    if (getCookie("lightMode") == "0") {
        colourMode("1");
    } else {
        colourMode("0");
    }
}

if (document.cookie == "") {
    window.location.href = "/start";
} else {
    let lM = getCookie("lightMode")
    if (lM != "") {
        colourMode(lM);
    }
}