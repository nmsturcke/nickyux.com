gsap.registerPlugin(ScrollTrigger);

let horizontalTween;
const textShadowColor = "rgba(245, 245, 245, 0.2)"; //"#031d15";

function animateStartup(withSliding = false, allPurple = false) {
    const timeline = gsap.timeline({
        // scrollTrigger: {
        //     trigger: ".text-title",
        //     start: "top top",
        //     end: "+=3000",
        //     scrub: 1,
        //     pin: true,
        //     anticipatePin: 1,
        // }
    });
    const fontsAndColors = [
        ["Achafont", "#008b7b"],
        ["Austria", "#09817f"],
        ["BodoniFLF", "#127784"],
        ["ERTHQAKE", "#1b6d88"],
        ["FadeToGrey", "#24628d"],
        ["Funkrocker", "#2d5891"],
        ["Germanica", "#374e96"],
        ["GlassHouses", "#40449a"],
        ["KOMTIT", "#493a9e"],
        ["newcomictitle", "#5230a3"],
        ["Subtitle", "#5b25a7"],
        ["TitleWaveRegular", "#641bac"],
        ["Federal Escort", "#6D11B0"],
    ];

    if (allPurple) {
        document.querySelectorAll("#hero .text-title:not(.text-stone-200)").forEach(el => {
            el.classList.add("!text-stone-200");
        });
    }
        
    /* Move AM to the right */
    timeline.from("#hero .text-supertitle.self-end", {
        marginRight: "80vw",
        duration: 2,
        ease: "power3.out",
        delay: 0.5
    });
    /* Show all titles */
    timeline.from("#hero .text-title", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    }, "-=1.5");
    /* Hide supertitle */
    timeline.to("#hero .text-supertitle", {
        maxHeight: "0px",
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
    }, "goUp+=0.5");
    /* If withSliding is true, move all titles up for a bit */
    if (withSliding) {
    timeline.to("#hero div:has(> .text-title)", {
            y: -756,
            duration: 2,
            ease: "power3.inOut",
        });
        // return
    }
    /* Move all titles up/down and hide them */
    timeline.to("#hero div.up:has(> .text-title)", {
        y: -1200,
        opacity: 0,
        duration: 1,
        ease: "power3.in",
    }, "+=0.5 phaseOut");
    timeline.to("#hero div.down:has(> .text-title)", {
        y: 800,
        opacity: 0,
        duration: 1,
        ease: "power3.in",
    }, "phaseOut-=1");
    timeline.to("#hero div:not(.up):not(.down):has(> .text-title)", {
        y: 0,
        duration: 0.8,
        ease: "linear",
    }, "-=0.2");
    timeline.to("#hero div:not(.stretch):has(> .text-title)", {
        maxHeight: "0px",
        opacity: 0,
        padding: "0px!important",
        duration: 1,
        ease: "linear"
    }, "-=1");
    /* Stretch the middle title */
    timeline.to("#hero .text-title.stretch", {
        transform: "scale(1, 4)",
        duration: 1,
        ease: "power3.inOut"
    }, "phaseOut-=0.75 stretchFrame");
    /* Add shadow to the stretched title */
    timeline.to("#hero .text-title.stretch", {
        textShadow: `${textShadowColor} -7px 7px 0`,
        duration: 0.5,
        ease: "power3.out"
    }, "stretchFrame-=0.5");
    /* Give a little 3d effect by skewing the title */
    timeline.to("#hero .text-title.stretch", {
        transform: "translateZ(0) scale(1, 4) skew(10deg, -0.1deg)",
        textShadow: `${textShadowColor} -14px 14px 0`,
        duration: 1,
        ease: "back.out"
    }, "stretchFrame+=0");
    /* Then skew the other way */
    timeline.to("#hero .text-title.stretch", {
        transform: "translateZ(0) scale(1, 4) skew(-10deg, 0.1deg)",
        textShadow: `${textShadowColor} 14px 14px 0`,
        duration: 1,
        ease: "back.inOut"
    }, "+=0.25");
    /* Return to normal */
    timeline.to("#hero .text-title.stretch", {
        transform: "translateZ(0) scale(1, 4) skew(0deg, 0deg)",
        textShadow: `${textShadowColor} -7px 7px 0`,
        duration: 0.5,
        ease: "power3.out"
    }, "+=1");
    /* flash through a bunch of fonts */
    fontsAndColors.forEach((fontAndColor) => {
        timeline.to("#hero .text-title.stretch", {
            fontFamily: fontAndColor[0],
            color: fontAndColor[1],
            duration: 0.01,
            ease: "power1.inOut"
        }, "+=0.075");
    });

    /* End stretch */
    timeline.to("#hero .text-title.stretch", {
        transform: "scale(1, 1)",
        duration: 1,
        ease: "back.inOut"
    }, "+=0.5 endStretch");
    timeline.to("#hero .text-supertitle.after", {
        y: 0,
        duration: 1.5,
        ease: "power3.out",
        maxHeight: "73px",
    }, "endStretch+=0.5");
    /* Fade-in 'I' in Super Title */
    timeline.to("#hero .text-supertitle.after.self-start", {
        opacity: 1,
        duration: 0.25,
        overflow: "unset",
        ease: "power3.out",
    }, "endStretch+=0.75");
    /* Add the 'TH' and 'S' to transform 'I' into 'THIS' and also add shadow */
    timeline.to("#hero .text-supertitle.after.self-start", {
        textShadow: "rgba(245, 245, 245, 0.2) -2px 2px 0",
        duration: 0.5,
        ease: "power3.out",
    }, "endStretch+=2");
    // timeline.to("#hero .text-supertitle.after.self-start > :nth-child(1)", {
    //     maxWidth: "250px",
    //     textShadow: "oklch(66.7% 0.295 322.15) -2px 2px 0",
    //     duration: 2.5,
    //     ease: "power3.out",
    // }, "endStretch+=2");
    // timeline.to("#hero .text-supertitle.after.self-start > :nth-child(2)", {
    //     maxWidth: "80px",
    //     textShadow: "oklch(66.7% 0.295 322.15) -2px 2px 0",
    //     duration: 1.5,
    //     ease: "power3.out",
    // }, "endStretch+=2.25");
    /* Fade-in 'AM' in Super Title */
    timeline.to("#hero .text-supertitle.after.self-end", {
        opacity: 1,
        duration: 0.25,
        ease: "power3.out",
    }, "endStretch+=1");
    /* Convert 'AM' to 'IS' */
    // timeline.to("#hero .text-supertitle.after.self-end > span.initial", {
    //     maxWidth: "0px",
    //     duration: 2.5,
    //     ease: "power3.out",
    // }, "endStretch+=2.4");
    // timeline.to("#hero .text-supertitle.after.self-end > span:not(.initial)", {
    //     maxWidth: "256px",
    //     overflow: "unset",
    //     textShadow: "oklch(66.7% 0.295 322.15) -2px 2px 0",
    //     duration: 2.5,
    //     ease: "power3.out",
    // }, "endStretch+=2.4");
    timeline.to("#hero .text-supertitle.after.self-end", {
        textShadow: "rgba(245, 245, 245, 0.2) -2px 2px 0",
        duration: 0.5,
        ease: "power3.out",
    }, "endStretch+=2");
}       

function registerScrollTrigger() {
    // This makes the scrolling horizontal for the #scroll section

    const container = document.querySelector("#scroll .inner");

    horizontalTween = gsap.to("#scroll .inner", {
        id: "horizontalScroll",
        x: () => { return -(container.scrollWidth - document.querySelector("#scroll").offsetWidth); },
        ease: "none",
        scrollTrigger: {
            trigger: "#scroll",
            start: "top top",
            end: () => "+=" + (container.scrollWidth - document.querySelector("#scroll").offsetWidth),
            scrub: 1,
            snap: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onLeave: () => {
                gsap.to("#things", { opacity: 0, duration: 1 });
                gsap.to("#inner-supertitle", { opacity: 1, maxHeight: "73px", duration: 1 });
            },
            onEnterBack: () => {
                gsap.to("#things", { opacity: 1, duration: 1 });
                gsap.to("#inner-supertitle", { opacity: 0, maxHeight: "0px", duration: 1 });
            },
        }

    });

    // Create a separate timeline for the color changes
    const colorTimeline = gsap.timeline({ paused: true })
        .to("#scroll .inner", 
            {
                backgroundColor: "#000000",
                color: "#FFFFFF",
                duration: 1,
                ease: "none"
            }
        );

    // Control the color timeline with the main scroll progress
    ScrollTrigger.create({
        trigger: "#scroll",
        start: "top top",
        end: () => "+=" + (document.querySelector("#scroll .inner").scrollWidth - document.querySelector("#scroll").offsetWidth),
        scrub: true,
        onUpdate: function(self) {
            // Start color change at 50% progress, complete at 100%
            if (self.progress >= 0.5) {
                const colorProgress = (self.progress - 0.5) * 2; // Map 0.5-1 to 0-1
                colorTimeline.progress(colorProgress);
            } else {
                colorTimeline.progress(0); // Keep at start during first half
            }
        },
    });

    // Add text Shadow to #invisible when it enters the viewport
    gsap.to("#invisible", {
        textShadow: `${textShadowColor} -2px 2px 0`,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#invisible",
            start: "left center",
            end: "right center",
            scrub: true,
            containerAnimation: horizontalTween,
        }
    });

    // Add text colour to #work when it enters the viewport
    gsap.to("#work", {
        color: "#FFFFFF",
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#work",
            // start: "left right",
            end: "center center",
            scrub: true,
            containerAnimation: horizontalTween,
            // markers: true,
        }
    });

}

animateStartup(true, false);
registerScrollTrigger();

window.addEventListener("resize", () => {
    if (horizontalTween) {
        horizontalTween.scrollTrigger.refresh();
    }
});
