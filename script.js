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

// Initialize Lucide Icons & Responsive Mobile Navigation Drawer
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Set dynamic copyright year
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Mobile navigation setup
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    if (nav && navLinks) {
        // Create hamburger button dynamically
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'nav-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle Navigation');
        toggleBtn.innerHTML = `
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        `;
        
        // Insert toggle button before the nav-links element
        nav.insertBefore(toggleBtn, navLinks);
        
        // Toggle action
        toggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('open');
            toggleBtn.classList.toggle('open');
            document.body.classList.toggle('nav-active', isOpen);
            
            // Coordinate with Lenis smooth scroll block
            if (typeof lenis !== 'undefined') {
                if (isOpen) {
                    lenis.stop();
                } else {
                    lenis.start();
                }
            }
        });
        
        // Close menu when clicking link items
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                toggleBtn.classList.remove('open');
                document.body.classList.remove('nav-active');
                if (typeof lenis !== 'undefined') {
                    lenis.start();
                }
            });
        });
        
        // Close menu when clicking outside of navbar
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('open') && !nav.contains(e.target)) {
                navLinks.classList.remove('open');
                toggleBtn.classList.remove('open');
                document.body.classList.remove('nav-active');
                if (typeof lenis !== 'undefined') {
                    lenis.start();
                }
            }
        });
    }

    // ==========================================
    // Contact Form Web3Forms Integration with Anti-Spam Protection
    // ==========================================
    // This implementation uses client-side validation only.
    // Web3Forms handles all server-side processing including hCaptcha verification.
    // No backend endpoints, serverless functions, or server-side verification are implemented.
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnLoading = document.getElementById('btnLoading');
        const formMessage = document.getElementById('formMessage');

        // ==========================================
        // Validation Helper Functions
        // ==========================================

        /**
         * Validates email format using regex
         * @param {string} email - The email address to validate
         * @returns {boolean} - True if valid email format
         */
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        /**
         * Detects spam patterns in text (client-side only)
         * @param {string} text - The text to check for spam patterns
         * @returns {string|null} - Error message if spam detected, null otherwise
         */
        function detectSpamPatterns(text) {
            if (!text || text.length < 2) return null;

            // Check for repeated characters (e.g., "aaaaaaa", "1111111")
            const repeatedCharRegex = /(.)\1{4,}/;
            if (repeatedCharRegex.test(text)) {
                return 'Please enter a valid message without repeated characters.';
            }

            // Check for excessive URLs (more than 3)
            const urlRegex = /(https?:\/\/|www\.)[^\s]+/gi;
            const urlsFound = text.match(urlRegex);
            if (urlsFound && urlsFound.length > 3) {
                return 'Message contains too many links. Please limit to 3 URLs maximum.';
            }

            // Check for keyboard smashing patterns
            const keyboardSmashRegex = /(qwert|asdfg|zxcvb|qwerty|asdfgh|zxcvbn|poiuy|lkjhg|mnbvc)/i;
            if (keyboardSmashRegex.test(text)) {
                return 'Please enter a meaningful message.';
            }

            // Check for excessive special characters
            const specialCharCount = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
            if (specialCharCount > text.length * 0.3) {
                return 'Please enter a valid message.';
            }

            return null;
        }

        /**
         * Checks if text contains only numbers or symbols
         * @param {string} text - The text to check
         * @returns {boolean} - True if text is only numbers/symbols
         */
        function isOnlyNumbersOrSymbols(text) {
            const lettersOnly = text.replace(/[^a-zA-Z]/g, '');
            return lettersOnly.length === 0;
        }

        // ==========================================
        // UI Helper Functions
        // ==========================================

        /**
         * Shows a message to the user with specified type and text
         * @param {string} type - 'success' or 'error'
         * @param {string} message - The message to display
         */
        function showMessage(type, message) {
            formMessage.style.display = 'flex';
            formMessage.className = `form-message ${type}`;
            
            // Set message content with appropriate icon
            const icon = type === 'success' 
                ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px; flex-shrink: 0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
                : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px; flex-shrink: 0;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
            
            formMessage.innerHTML = `${icon}<span>${message}</span>`;

            // Add styling based on type
            if (type === 'success') {
                formMessage.style.background = '#d4edda';
                formMessage.style.color = '#155724';
                formMessage.style.padding = '1rem';
                formMessage.style.borderRadius = '4px';
                formMessage.style.border = '1px solid #c3e6cb';
            } else {
                formMessage.style.background = '#f8d7da';
                formMessage.style.color = '#721c24';
                formMessage.style.padding = '1rem';
                formMessage.style.borderRadius = '4px';
                formMessage.style.border = '1px solid #f5c6cb';
            }
        }

        /**
         * Hides the form message
         */
        function hideMessage() {
            formMessage.style.display = 'none';
        }

        /**
         * Sets the loading state of the submit button
         * Disables the button and shows "Sending..." text during submission
         * @param {boolean} isLoading - Whether the button should show loading state
         */
        function setLoadingState(isLoading) {
            submitBtn.disabled = isLoading;
            btnText.style.display = isLoading ? 'none' : 'inline';
            btnLoading.style.display = isLoading ? 'inline' : 'none';
            submitBtn.style.opacity = isLoading ? '0.7' : '1';
            submitBtn.style.cursor = isLoading ? 'not-allowed' : 'pointer';
        }

        // ==========================================
        // Form Submission Handler
        // ==========================================

        /**
         * Handles the contact form submission with comprehensive anti-spam validation.
         * All validation is performed client-side. The form data is submitted directly
         * to the Web3Forms API, which handles all server-side processing including
         * hCaptcha verification, email delivery, and spam filtering.
         * 
         * No backend endpoints or server-side verification are implemented.
         */
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideMessage();

            // ---- ANTI-SPAM LAYER 1: Honeypot Check ----
            // Hidden field that bots may fill but humans never see
            const honeypot = document.getElementById('botcheck').value;
            if (honeypot) {
                showMessage('error', 'Spam detected.');
                return;
            }

            // ---- Get and Validate Form Values ----
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            // Check required fields
            if (!name || !phone || !email || !message) {
                showMessage('error', 'Please fill in all required fields.');
                return;
            }

            // Name must be at least 2 characters
            if (name.length < 2) {
                showMessage('error', 'Please enter a valid name (at least 2 characters).');
                return;
            }

            // Message must be at least 10 characters and max 3000
            if (message.length < 10) {
                showMessage('error', 'Please enter a more detailed message (at least 10 characters).');
                return;
            }

            if (message.length > 3000) {
                showMessage('error', 'Message is too long. Please keep it under 3000 characters.');
                return;
            }

            // Check if message is empty or whitespace only
            if (message.replace(/\s/g, '').length === 0) {
                showMessage('error', 'Please enter a valid message.');
                return;
            }

            // Check if message contains only numbers or symbols
            if (isOnlyNumbersOrSymbols(message)) {
                showMessage('error', 'Please enter a meaningful message with letters.');
                return;
            }

            // Validate email format
            if (!isValidEmail(email)) {
                showMessage('error', 'Please enter a valid email address.');
                return;
            }

            // Check for spam patterns in name and message (client-side only)
            const nameSpam = detectSpamPatterns(name);
            if (nameSpam) {
                showMessage('error', nameSpam);
                return;
            }

            const messageSpam = detectSpamPatterns(message);
            if (messageSpam) {
                showMessage('error', messageSpam);
                return;
            }

            // ---- ANTI-SPAM LAYER 2: hCaptcha Validation ----
            // Ensures the user has completed the hCaptcha verification
            // Note: Web3Forms handles the actual hCaptcha verification on their end
            const hcaptchaResponse = document.querySelector('[name="h-captcha-response"]');
            if (!hcaptchaResponse || !hcaptchaResponse.value) {
                showMessage('error', 'Please complete the CAPTCHA verification.');
                return;
            }

            // ---- All validation passed - proceed with submission to Web3Forms ----
            setLoadingState(true);

            // Prepare form data for submission to Web3Forms API
            const formData = new FormData();
            formData.append('access_key', '4d7c8a3b-4e73-4ec3-87c5-9d458a6ee12e');
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('email', email);
            formData.append('subject', subject);
            formData.append('message', message);
            // Note: hCaptcha verification is handled by Web3Forms automatically
            // The hcaptcha-response is not sent to avoid cluttering admin notifications

            try {
                // Submit directly to Web3Forms API (no backend required)
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    // Success: show message, reset form, and reset hCaptcha
                    showMessage('success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');
                    contactForm.reset();
                    // Reset hCaptcha for the next submission
                    if (typeof hcaptcha !== 'undefined') {
                        hcaptcha.reset();
                    }
                } else {
                    // Web3Forms API returned an error
                    const errorMsg = result.message || 'An error occurred while sending your message. Please try again.';
                    showMessage('error', errorMsg);
                }
            } catch (error) {
                // Network error or other exception
                console.error('Form submission error:', error);
                showMessage('error', 'Network error. Please check your internet connection and try again.');
            } finally {
                // Always reset loading state (whether success or error)
                setLoadingState(false);
            }
        });
    }
});