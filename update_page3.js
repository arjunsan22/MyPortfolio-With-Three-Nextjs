const fs = require('fs');

const file = 'f:/arjun2025-Portfolio/arjunportfolio/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add black overlay and move fish to fixed layer
const heroSectionRegex = /(<section className="hero-section[\s\S]*?<CircuitBackground id="hero" \/>\s*)<div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-20">\s*<AnglerFish className="angler-fish-container scale-150 md:scale-100" \/>\s*<\/div>/;

// If it doesn't match, we might have already added it or formatted it differently.
// Let's just find the hero section and replace it.
content = content.replace(
  /<div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-20">\s*<AnglerFish className="angler-fish-container scale-150 md:scale-100" \/>\s*<\/div>/,
  ""
);

// Add the fixed overlay to the top of the component (right after <div className="min-h-screen...)
content = content.replace(
  /(<div className="min-h-screen bg-\[#030305\] text-white overflow-x-hidden">)/,
  `$1\n      {/* FULL DARK OVERLAY for AnglerFish Animation */}\n      <div className="angler-dark-overlay fixed inset-0 bg-black z-[9998] pointer-events-none"></div>\n      <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden z-[9999]">\n        <AnglerFish className="angler-fish-container scale-[0.6] sm:scale-100" />\n      </div>`
);


// 2. Update GSAP to animate the dark overlay
const oldGsapRegex = /useGSAP\(\(\) => \{\s*const tl = gsap\.timeline\(\);\s*const fish = document\.querySelector\('\.angler-fish-container'\);[\s\S]*?\}, \{ scope: containerRef \}\);/m;

const newGsapBlock = `useGSAP(() => {
    const tl = gsap.timeline();

    const fish = document.querySelector('.angler-fish-container');
    const bulb = document.querySelector('.angler-bulb');
    const darkOverlay = document.querySelector('.angler-dark-overlay');

    // 1. Setup Initial States
    gsap.set(fish, { x: '100vw', y: 0, rotation: -10 });
    gsap.set(bulb, { opacity: 0.1, filter: 'brightness(0.3)' });
    gsap.set(darkOverlay, { opacity: 1 }); // Fully dark initially!

    // Temporarily hide the scrollbar so user doesn't scroll past the dark screen
    document.body.style.overflow = 'hidden';

    // Set text characters initial state for the SplitChars effect
    const titleChars = containerRef.current?.querySelectorAll('.hero-title-char');
    if (titleChars && titleChars.length) {
      gsap.set(titleChars, {
        opacity: 0,
        y: 80,
        rotationX: -90,
        scaleY: 0,
        transformOrigin: '50% 100%',
        clipPath: 'inset(100% 0% 0% 0%)',
      });
    }

    // 2. Fish swims in (over the black screen)
    tl.to(fish, {
      x: '0vw',
      y: 20,
      rotation: 0,
      duration: 3,
      ease: "power3.out"
    });

    // 3. Fish floats briefly
    tl.to(fish, {
      y: "-=30",
      duration: 1.5,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut"
    });

    // 4. Bulb Blinks and shines brightly!
    tl.to(bulb, { opacity: 1, filter: 'brightness(2)', duration: 0.1, repeat: 3, yoyo: true }, "-=1.5");
    tl.to(bulb, { opacity: 1, filter: 'brightness(4)', scale: 1.4, duration: 0.2, transformOrigin: 'center' });
    tl.to(bulb, { scale: 1, filter: 'brightness(3)', duration: 0.5 });

    // 5. REVEAL HERO CONTENT
    tl.addLabel("reveal", "-=0.2");

    // Fade out the dark overlay to reveal the website underneath!
    tl.to(darkOverlay, { 
      opacity: 0, 
      duration: 1.5, 
      ease: "power2.inOut",
      onComplete: () => {
        document.body.style.overflow = 'auto'; // restore scrolling
      }
    }, "reveal");

    // Nav animation
    tl.from("nav", {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out"
    }, "reveal");

    // Hero sparkle
    tl.from(".hero-sparkle", {
      scale: 0,
      rotation: 180,
      opacity: 0,
      duration: 1,
      ease: "back.out(1.7)"
    }, "reveal+=0.2");

    if (titleChars && titleChars.length) {
      tl.to(titleChars, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scaleY: 1,
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        stagger: {
          each: 0.04,
          from: 'center',
        },
        ease: 'expo.out',
      }, "reveal+=0.1");

      tl.fromTo(titleChars, {
        filter: 'brightness(1)',
      }, {
        filter: 'brightness(1.8)',
        duration: 0.3,
        stagger: { each: 0.025, from: 'start' },
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut',
      }, "reveal+=0.8");
    }

    // Subtitle
    tl.from(".hero-sub-char", {
      opacity: 0,
      y: 20,
      rotationX: -90,
      duration: 0.8,
      stagger: { each: 0.015, from: "start" },
      ease: "back.out(1.5)"
    }, "reveal+=0.6");

    // Buttons & Icons
    tl.from(".hero-btn", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "back.out(1.2)"
    }, "reveal+=0.8");

    tl.from(".hero-icon", {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.5)"
    }, "reveal+=1.0");

    // 6. Fish swims away
    tl.to(fish, {
      x: '-100vw',
      y: -50,
      rotation: 15,
      duration: 3.5,
      ease: "power2.in",
    }, "reveal+=1.5");

  }, { scope: containerRef });`;

content = content.replace(oldGsapRegex, newGsapBlock);

fs.writeFileSync(file, content, 'utf8');
console.log('done');
