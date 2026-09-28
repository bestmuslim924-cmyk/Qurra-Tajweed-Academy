/* =========================================================
   QURRA TAJWEED ACADEMY
   Main JavaScript
   ========================================================= */


/* =========================
   NAVBAR
========================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });

});


/* =========================
   HERO SLIDER
========================= */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const previousButton = document.getElementById("prevSlide");
const nextButton = document.getElementById("nextSlide");

let currentSlide = 0;
let slideTimer;

const slideDuration = 5500;


/* Show selected slide */

function showSlide(index) {

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, index) => {
        slide.classList.toggle(
            "active",
            index === currentSlide
        );
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle(
            "active",
            index === currentSlide
        );
    });
}


/* Next slide */

function nextSlide() {
    showSlide(currentSlide + 1);
}


/* Previous slide */

function previousSlide() {
    showSlide(currentSlide - 1);
}


/* Automatic slider */

function startSlider() {

    clearInterval(slideTimer);

    slideTimer = setInterval(() => {
        nextSlide();
    }, slideDuration);

}


/* Restart automatic slider */

function restartSlider() {
    startSlider();
}


/* Arrow controls */

nextButton.addEventListener("click", () => {
    nextSlide();
    restartSlider();
});


previousButton.addEventListener("click", () => {
    previousSlide();
    restartSlider();
});


/* Dot controls */

dots.forEach((dot) => {

    dot.addEventListener("click", () => {

        const requestedSlide =
            Number(dot.getAttribute("data-slide"));

        showSlide(requestedSlide);

        restartSlider();

    });

});


/* Start slider */

showSlide(0);
startSlider();


/* =========================
   PAUSE SLIDER ON HOVER
========================= */

const slider = document.getElementById("slider");

slider.addEventListener("mouseenter", () => {
    clearInterval(slideTimer);
});

slider.addEventListener("mouseleave", () => {
    startSlider();
});


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {
        nextSlide();
        restartSlider();
    }

    if (event.key === "ArrowLeft") {
        previousSlide();
        restartSlider();
    }

});


/* =========================
   TOUCH / SWIPE SUPPORT
========================= */

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener(
    "touchstart",
    (event) => {
        touchStartX = event.changedTouches[0].screenX;
    },
    { passive: true }
);


slider.addEventListener(
    "touchend",
    (event) => {

        touchEndX = event.changedTouches[0].screenX;

        const swipeDistance =
            touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < 50) {
            return;
        }

        if (swipeDistance < 0) {
            nextSlide();
        } else {
            previousSlide();
        }

        restartSlider();

    },
    { passive: true }
);


/* =========================
   ENROLLMENT FORM
========================= */

const enrollmentForm =
    document.getElementById("enrollmentForm");

const formMessage =
    document.getElementById("formMessage");


enrollmentForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const studentName =
        document.getElementById("studentName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const learningMode =
        document.getElementById("learningMode").value;

    const level =
        document.getElementById("level").value;


    if (
        !studentName ||
        !email ||
        !learningMode ||
        !level
    ) {

        formMessage.style.display = "block";

        formMessage.textContent =
            "Please complete all required fields.";

        return;
    }


    formMessage.style.display = "block";

    formMessage.textContent =
        `JazakAllahu Khairan, ${studentName}. Your enrollment request has been recorded on this page.`;

    enrollmentForm.reset();

});


/* =========================
   CURRENT YEAR
========================= */

document.getElementById("year").textContent =
    new Date().getFullYear();


/* =========================
   BACK TO TOP
========================= */

const backTop =
    document.getElementById("backTop");

backTop.addEventListener("click", (event) => {

    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================
   INTERSECTION OBSERVER
   Subtle section entrance effect
========================= */

const animatedElements = document.querySelectorAll(
    ".intro-card, .feature-image, .feature-content, .teacher-card, .teacher-text-card, .contact-card, .enrollment-form"
);


const observerOptions = {
    threshold: 0.12
};


const sectionObserver =
    new IntersectionObserver((entries, observer) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);
            }

        });

    }, observerOptions);


animatedElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    sectionObserver.observe(element);

});


/* =========================
   LOGO FALLBACK
========================= */

/*
   The academy logo uploaded with the website brief can be
   placed into the navigation if you later replace the small
   placeholder data image with the original logo file.

   The website remains fully functional without it.
*/

const brandLogo = document.getElementById("brandLogo");

brandLogo.addEventListener("error", () => {

    brandLogo.style.display = "none";

});