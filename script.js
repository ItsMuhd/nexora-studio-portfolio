/* =====================================
   NEXORA STUDIO — MAIN JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    // =================================
    // LOADING SCREEN
    // =================================

    const loader = document.getElementById("loader");

    function hideLoader() {
        if (loader) {
            loader.classList.add("hide");
        }
    }

    window.addEventListener("load", hideLoader);

    // Fallback in case the page has already loaded
    if (document.readyState === "complete") {
        hideLoader();
    }

    setTimeout(hideLoader, 3500);


    // =================================
    // MOBILE NAVIGATION
    // =================================

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            navLinks.classList.toggle("open");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-xmark");
            }

        });

        // Close menu after clicking a link
        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    // =================================
    // NAVBAR SCROLL EFFECT
    // =================================

    const navbar = document.getElementById("navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    // =================================
    // SCROLL REVEAL ANIMATIONS
    // =================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    }


    // =================================
    // CURRENT YEAR
    // =================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =================================
    // ACTIVE NAVIGATION LINK
    // =================================

    const currentPage = window.location.pathname.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(link => {

        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }

    });


    // =================================
    // 3D CARD INTERACTION
    // =================================

    const visualCard = document.querySelector(".visual-card");

    if (visualCard && window.matchMedia("(hover: hover)").matches) {

        visualCard.addEventListener("mousemove", event => {

            const rect = visualCard.getBoundingClientRect();

            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            visualCard.style.transform =
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        });

        visualCard.addEventListener("mouseleave", () => {

            visualCard.style.transform = "";

        });

    }


    // =================================
    // SMOOTH INTERNAL NAVIGATION
    // =================================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    // =================================
    // BUTTON CLICK FEEDBACK
    // =================================

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", () => {

            button.classList.add("button-clicked");

            setTimeout(() => {
                button.classList.remove("button-clicked");
            }, 250);

        });

    });

});