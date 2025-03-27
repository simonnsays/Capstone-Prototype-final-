document.addEventListener('DOMContentLoaded', function () {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const moveLeftButton = document.getElementById('moveLeft');
    const moveRightButton = document.getElementById('moveRight');
    let isMovingLeft = false;
    let currentSlide = 0;
    carouselItems[0].classList.add('active');

    function moveCarousel(direction) {
        // Remove active class from current item
        carouselItems.forEach(item => {item.classList.remove('active', 'previous')});
             
        // Calculate new index
        const previousSlide = currentSlide
        if (direction === 'right') {
            currentSlide = (currentSlide + 1) % carouselItems.length;
        } else {
            currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
        }

        // add classes to the new items
       carouselItems[previousSlide].classList.add('previous');
       carouselItems[currentSlide].classList.add('active');


        // Animate the content container
        const container = carouselItems[currentSlide].querySelector('.carousel-item__container');
        container.style.transform = isMovingLeft ? 'translateX(-50px)' : 'translateX(50px)';
        
        // Reset container position after animation
        setTimeout(() => {
            container.style.transform = 'translateX(0)';
        }, 60);
    }

    // Event Listeners
    moveLeftButton.addEventListener('click', () => moveCarousel('left'));
    moveRightButton.addEventListener('click', () => moveCarousel('right'));

    // Optional: Auto-play
    setInterval(() => moveCarousel('right'), 5000);
});
