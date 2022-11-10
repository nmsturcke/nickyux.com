const ob = new IntersectionObserver((e) => {
    e.forEach((e_) => {
        if (e_.isIntersecting) {
            e_.target.classList.add("scroll-show")
        } else {
            if (e_.target.classList.contains("scroll-hide-always")) {
                e_.target.classList.remove("scroll-show")
            }
        }
    })
})

document.querySelectorAll(".scroll-hide").forEach((el) => ob.observe(el))
document.querySelectorAll(".scroll-hide-always").forEach((el) => ob.observe(el))