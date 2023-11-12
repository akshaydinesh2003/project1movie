document.addEventListener("DOMContentLoaded", function () {
    const carouselContainer = document.querySelector(".carousel-container");
    const slides = document.querySelectorAll(".carousel-slide");
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselContainer.style.transition = "transform 1s ease"; // Add transition effect
        carouselContainer.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    }

    // Automatically move to the next slide
    setInterval(() => {
        nextSlide();
    }, 3000); // Change the interval duration as needed
});
document.addEventListener("DOMContentLoaded", function () {
    const movieCardsContainer = document.getElementById("movie-cards-container");
    const movieCards = document.getElementById("movie-cards");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const cardWidth = 250; // Adjust this to match your card width
    let currentIndex = 0;

    leftArrow.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    rightArrow.addEventListener("click", () => {
        const maxIndex = Math.floor(movieCards.scrollWidth / cardWidth);
        if (currentIndex < maxIndex - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    function updateCarousel() {
        const offset = -currentIndex * cardWidth;
        movieCards.style.transform = `translateX(${offset}px)`;
    }
});

