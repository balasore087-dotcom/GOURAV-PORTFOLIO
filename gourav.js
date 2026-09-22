// ==========================================
// 1. REGISTER GSAP PLUGINS
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 2. HERO SECTION ENTRANCE ANIMATION
// ==========================================
gsap.from(".hero-content > *", {
    y: 35,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out"
});

gsap.from(".hero-image-wrapper", {
    scale: 0.9,
    opacity: 0,
    duration: 1.2,
    delay: 0.2,
    ease: "power2.out"
});

// ==========================================
// 3. MOUSE MOVE 3D PARALLAX EFFECT FOR PHOTO
// ==========================================
const heroSection = document.querySelector(".hero");
const heroImage = document.querySelector(".hero-image");
const glowSphere = document.querySelector(".glow-sphere");

if (heroSection && heroImage) {
    heroSection.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const deltaX = (clientX - centerX) / centerX;
        const deltaY = (clientY - centerY) / centerY;

        const rotateX = -deltaY * 16;
        const rotateY = deltaX * 16;
        const moveX = deltaX * 22;
        const moveY = deltaY * 22;

        gsap.to(heroImage, {
            x: moveX,
            y: moveY,
            rotateX: rotateX,
            rotateY: rotateY,
            transformPerspective: 1000,
            duration: 0.6,
            ease: "power2.out"
        });

        if (glowSphere) {
            gsap.to(glowSphere, {
                x: -moveX * 0.7,
                y: -moveY * 0.7,
                duration: 0.8,
                ease: "power2.out"
            });
        }
    });

    heroSection.addEventListener("mouseleave", () => {
        gsap.to([heroImage, glowSphere], {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 1.2,
            ease: "power3.out"
        });
    });
}

// ==========================================
// 4. SKILLS CARDS STAGGERED ENTRANCE
// ==========================================
gsap.from(".skill-card", {
    scrollTrigger: {
        trigger: ".skills",
        start: "top 75%",
        toggleActions: "play none none reverse"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.18,
    ease: "power3.out"
});

// ==========================================
// 5. SECTIONS REVEAL ON SCROLL
// ==========================================
gsap.utils.toArray(".section-container:not(.skills)").forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse"
        },
        y: 45,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out"
    });
});