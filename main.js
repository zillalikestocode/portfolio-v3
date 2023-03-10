import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import imagesLoaded from "imagesloaded";
import SplitTextJS from "split-text-js";

gsap.registerPlugin(ScrollTrigger);

import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
  direction: "vertical", // vertical, horizontal
  gestureDirection: "vertical", // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: true,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const projects = document.querySelector("#projects");
let projectSections = gsap.utils.toArray(".project");
const about = document.querySelector("#about");

let scrollTween = gsap.to(projectSections, {
  xPercent: -100 * (projectSections.length - 1),
  scrollTrigger: {
    trigger: projects,
    pin: true,
    scrub: 1,
    end: "+=" + projects.offsetWidth,
    snap: 1 / (projectSections.length - 1),
  },
  ease: "none",
});

let scrollTween2 = gsap.to(".card", {
  yPercent: -100,
  scrollTrigger: {
    trigger: about,
    scrub: 1,
  },
});

const content = document.querySelector("#main");
const imgLoaded = imagesLoaded(content);
const tl = gsap.timeline();

const texts = gsap.utils.toArray('.flip')

texts.forEach((text)=> {
  const split = new SplitTextJS(text)

  tl
  .from(split.chars, {
    opacity: 0,
    y: 30,
    rotateX: -90,
    stagger: .02
  }, "<")
  .to(split.chars, {
    opacity: 0,
    y: -30,
    rotateX: 90,
    stagger: .02
  }, "<1")
})

imgLoaded.on("done", (instance) => {

  tl.to(".animtitle", {
    opacity: 0,
    duration: 0.5,
    ease: "power4.out",
  });

  tl.to(".blinder", {
    scaleY: 0,
    stagger: 0.2,
    ease: "power2.out",
  });
  tl.to(
    ".intro",
    {
      y: 0,
      stagger: .08,
      // duration: 2,
      delay: 0
    });
  tl.to(".loader", {
    display: "none",
  });
});

let aboutScroll = gsap.to('.bio', {
  opacity: 1,
  ease: 'linear',
  scrollTrigger: {
    trigger: document.querySelector('.bio'),
    scrub: 0
  },
  delay: 0.5
})
// const observer = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         gsap.to(entry.target, {
//           opacity: 1,
//           ease: "power3.out",
//           delay: 1,
//         });
//       } else {
//         gsap.to(entry.target, {
//           opacity: 0,
//           ease: "power3.out",
//           delay: 1,
//         });
//       }
//     });
//   },
//   {
//     root: document.querySelector("#main"),
//     rootMargin: "0px",
//     threshold: 1.0,
//   }
// );

// observer.observe(document.querySelector(".bio"));
