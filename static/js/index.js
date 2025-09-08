function setupBackground() {
    const background = document.getElementById("background");

    // Choose a random number between 0 and 6
    const randomNumber = Math.floor(Math.random() * 7);
    const child = background.children[randomNumber];

    if (!child) return;

    child.classList.remove("d-none");

    // Start at a random position
    const randomX = Math.random() * (window.innerWidth - child.clientWidth);
    const randomY = Math.random() * (window.innerHeight - child.clientHeight);
    const randomRotation = (Math.random() - 0.5) * 60; // Random rotation between -30 and 30 degrees
    child.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;

    // // Animate the background element to move slowly around the screen
    // gsap.to(child, {
    //     x: `+=${(Math.random() - 0.5) * 200
    //     }`, // Move randomly in the x direction
    //     y: `+=${(Math.random() - 0.5) * 200
    //     }`, // Move randomly in the y direction
    //     rotate: `+=${(Math.random() - 0.5) * 20
    //     }`, // Rotate randomly
    //     duration: 20 + Math.random() * 10, // Random duration between 20 and 30 seconds
    //     ease: "power1.inOut",
    //     repeat: -1, // Repeat indefinitely
    //     yoyo: true // Move back to the original position
    // });


    // Move with mouse
    document.addEventListener("mousemove", (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (mouseX - centerX) / centerX; // -1 to 1
        const deltaY = (mouseY - centerY) / centerY; // -1 to 1
        
        // Apply parabolic smoothing: square the values to create a curve
        // This makes small movements even smaller and large movements more pronounced
        const smoothDeltaX = Math.sign(deltaX) * Math.pow(Math.abs(deltaX), 2);
        const smoothDeltaY = Math.sign(deltaY) * Math.pow(Math.abs(deltaY), 2);
        
        const moveAmount = 20; // Max movement in pixels
        const newX = randomX + smoothDeltaX * moveAmount;
        const newY = randomY + smoothDeltaY * moveAmount;
        child.style.transform = `translate(${newX}px, ${newY}px) rotate(${randomRotation}deg)`;
    });

}

function animateStartup() {
    const timeline = gsap.timeline();

    timeline.from(".text-supertitle.self-end:not(.after)", {
        marginRight: "80vw",
        duration: 2,
        ease: "power3.out",
        delay: 0.5
    });
    timeline.from(".text-title:not(.after)", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    }, "-=1.5");
    timeline.to(".text-supertitle:not(.after)", {
        maxHeight: "0px",
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
    }, "goUp +=0.5");
    timeline.to(".text-title:not(.after)", {
        y: -1000,
        opacity: 0,
        duration: 1,
        ease: "power3.in",
    }, "goUp+=0.5");
    timeline.to("div:has(> .text-title:not(.after))", {
        maxHeight: "0px",
        opacity: 0,
        padding: "0px!important",
        duration: 1,
        ease: "power3.inOut"
    }, "goUp+=1");
    // }, "goUp+=2.5");
    timeline.to("div:has(> .text-title.after)", {
        y: 0,
        opacity: 1,
        duration: 2.5,
        ease: "power3.out"
    }, "goUp+=1");
    timeline.from(".text-supertitle.after", {
        y: -250,
        duration: 2.5,
        ease: "power3.out"
    }, "goUp+=2.5");
    timeline.to(".text-title.after", {
        transform: "scale(1)",
        duration: 2.5,
        ease: "power3.out"
    }, "goUp+=2.5");
}

function animateStartupAlternative() {
    document.querySelector("#animation-primary").remove();
    const timeline = gsap.timeline();

    /* Move AM to the right */
    timeline.from(".text-supertitle.self-end", {
        marginRight: "80vw",
        duration: 2,
        ease: "power3.out",
        delay: 0.5
    });
    /* Show all titles */
    timeline.from(".text-title:not(.after)", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    }, "-=1.5");
    /* Hide supertitle */
    timeline.to(".text-supertitle", {
        maxHeight: "0px",
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
    }, "goUp +=0.5");
    /* Move all titles up/down and hide them */
    timeline.to("div.up:has(> .text-title)", {
        y: -1000,
        opacity: 0,
        duration: 1,
        ease: "power3.in",
    }, "goUp+=0.5");
    timeline.to("div.down:has(> .text-title)", {
        y: 1000,
        opacity: 0,
        duration: 1,
        ease: "power3.in",
    }, "goUp+=0.5");
    timeline.to("div:has(> .text-title:not(.after))", {
        maxHeight: "0px",
        opacity: 0,
        padding: "0px!important",
        duration: 1,
        ease: "power3.inOut"
    }, "goUp+=1");
    /* Stretch the middle title */
    timeline.to(".text-title.stretch", {
        transform: "scale(1, 4)",
        duration: 1,
        ease: "power3.inOut"
    }, "goUp+=0.75 stretchFrame");
    /* Add shadow to the stretched title */
    timeline.to(".text-title.stretch", {
        textShadow: "#031d15 -7px 7px 0",
        duration: 0.5,
        ease: "power3.out"
    }, "stretchFrame-=0.5");
    /* Give a little 3d effect by skewing the title */
    timeline.to(".text-title.stretch", {
        transform: "scale(1, 4) skew(10deg, -0.1deg)",
        textShadow: "#031d15 -14px 14px 0",
        duration: 1,
        ease: "back.out"
    }, "stretchFrame+=0");
    timeline.to(".text-title.stretch", {
        transform: "scale(1, 4) skew(0deg, 0deg)",
        textShadow: "#031d15 -7px 7px 0",
        duration: 0.5,
        ease: "power3.out"
    }, "stretchFrame+=1");
    /* End stretch */
    timeline.to(".text-title.stretch", {
        transform: "scale(1, 1)",
        duration: 1,
        ease: "back.inOut"
    }, "+=0.1 endStretch");
    timeline.to(".text-supertitle.after", {
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        maxHeight: "73px",
    }, "endStretch+=0.5");
    /* Fade-in 'I' in Super Title */
    timeline.to(".text-supertitle.after.self-start", {
        opacity: 1,
        duration: 0.25,
        overflow: "unset",
        ease: "power3.out",
    }, "endStretch+=0.75");
    /* Add the 'TH' and 'S' to transform 'I' into 'THIS' and also add shadow */
    timeline.to(".text-supertitle.after.self-start", {
        textShadow: "#260043 -2px 2px 0",
    }, "endStretch+=2");
    timeline.to(".text-supertitle.after.self-start > :nth-child(1)", {
        maxWidth: "250px",
        textShadow: "#260043 -2px 2px 0",
        duration: 2.5,
        ease: "power3.out",
    }, "endStretch+=2");
    timeline.to(".text-supertitle.after.self-start > :nth-child(2)", {
        maxWidth: "80px",
        textShadow: "#260043 -2px 2px 0",
        duration: 1.5,
        ease: "power3.out",
    }, "endStretch+=2.25");
    /* Fade-in 'AM' in Super Title */
    timeline.to(".text-supertitle.after.self-end", {
        opacity: 1,
        duration: 0.25,
        ease: "power3.out",
    }, "endStretch+=1");
    /* Convert 'AM' to 'IS' */
    timeline.to(".text-supertitle.after.self-end > span.initial", {
        maxWidth: "0px",
        duration: 2.5,
        ease: "power3.out",
    }, "endStretch+=2.4");
    timeline.to(".text-supertitle.after.self-end > span:not(.initial)", {
        maxWidth: "256px",
        overflow: "unset",
        textShadow: "#260043 -2px 2px 0",
        duration: 2.5,
        ease: "power3.out",
    }, "endStretch+=2.4");
}       
// setupBackground();
animateStartupAlternative();
