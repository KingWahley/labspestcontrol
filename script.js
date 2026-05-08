// Initialize Lenis Smooth Scroll
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

function showPest(i, btn) {
    document.querySelectorAll('.pest-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.pest-tab').forEach(t => t.classList.remove('active'));
    document.getElementById('p' + i).classList.add('active');
    btn.classList.add('active');
}

function sel(el) {
    el.closest('.fopts').querySelectorAll('.fopt').forEach(o => o.classList.remove('sel'));
    el.classList.add('sel');
}

function go(n) {
    document.querySelectorAll('.fstep').forEach(s => s.classList.remove('active'));
    document.getElementById('fs' + n).classList.add('active');
    document.getElementById('fp').style.width = (n * 25) + '%';
}

function result() {
    document.querySelectorAll('.fstep').forEach(s => s.classList.remove('active'));
    document.getElementById('fsr').classList.add('active');
    document.getElementById('fp').style.width = '100%';
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Entrance
const heroTl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
heroTl.from(".hero-badge", { y: 20, opacity: 0, delay: 0.5 })
      .from(".hero-content h1", { y: 30, opacity: 0 }, "-=0.7")
      .from(".hero-sub", { y: 20, opacity: 0 }, "-=0.7")
      .from(".hero-btns", { y: 20, opacity: 0 }, "-=0.7")
      .from(".hero-stats", { y: 20, opacity: 0 }, "-=0.7");

// Scroll Reveals
const reveals = document.querySelectorAll('.reveal');
gsap.set(reveals, { y: 40, opacity: 0 });

reveals.forEach(el => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    });
});

// Staggered Grids
const staggeredGrids = ['.signs-grid', '.why-row', '.test-grid', '.blog-grid'];
staggeredGrids.forEach(grid => {
    const cards = document.querySelectorAll(`${grid} > *`);
    if (cards.length) {
        gsap.set(cards, { y: 30, opacity: 0 });
        gsap.to(cards, {
            scrollTrigger: {
                trigger: grid,
                start: "top 80%"
            },
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        });
    }
});

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Set dynamic copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
});
