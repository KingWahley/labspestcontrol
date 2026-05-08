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

const obs = new IntersectionObserver(e => {
    e.forEach(x => {
        if (x.isIntersecting) x.target.classList.add('vis');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

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
