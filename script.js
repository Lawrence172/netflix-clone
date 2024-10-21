document.addEventListener('DOMContentLoaded', function () {
    const group = document.querySelector('.group');
    const images = document.querySelectorAll('.group img');
    const totalImages = images.length;

    // Clone the first image and append it to the end for seamless looping
    const firstImageClone = images[0].cloneNode(true);
    group.appendChild(firstImageClone);
    
    let index = 0;

    function startCarousel() {
        index++;

        // When it reaches the cloned image
        if (index >= totalImages) { // When it reaches the cloned image
            group.style.transition = 'none'; // Disable transition for instant snap
            index = 1; // Set index back to the first actual image
            group.style.transform = `translateX(${-index * 100}%)`; // Instantly jump to the first image
            requestAnimationFrame(() => {
                group.style.transition = 'transform 0.5s ease'; // Re-enable transition
            });
        } else {
            group.style.transform = `translateX(${-index * 100}%)`; // Move to the next image
        }
    }

    // Start the carousel with a 3-second interval
    setInterval(startCarousel, 3000);
});
