let currentPage = 1;
let loading = false; // Prevent multiple requests

// Function to load movies
async function loadMovies(page) {
    const apiKey = '18e9868d7b124cfcb8ddb322cfcd02cb'; // Replace with your actual API key
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&sort_by=popularity.desc`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Loop through the movies and create movie cards
        const movieList = document.querySelector('.movie-list');
        data.results.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <button class="watch-btn" data-id="${movie.id}">Watch</button>
            `;
            movieList.appendChild(movieCard);
        });

        // Add event listeners for the "Watch" buttons after movies are loaded
        const watchButtons = document.querySelectorAll('.watch-btn');
        watchButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const movieId = event.target.getAttribute('data-id');
                playMovie(movieId);
            });
        });

        // Mark loading as false after the movies are loaded
        loading = false;
    } catch (error) {
        console.error("Error loading movies:", error);
        loading = false;
    }
}

// Function to check if the user has reached the bottom of the page
function checkScroll() {
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    if (nearBottom && !loading) {
        loading = true;
        currentPage += 1;
        loadMovies(currentPage);
    }
}

// Initial load
loadMovies(currentPage);

// Listen for scroll events
window.addEventListener('scroll', checkScroll);

// Function to play the movie
async function playMovie(movieId) {
    const apiKey = '18e9868d7b124cfcb8ddb322cfcd02cb'; // Replace with your API key
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const video = data.results.find(video => video.type === 'Trailer'); // Use trailer or movie link
        if (video) {
            const videoUrl = `https://www.youtube.com/embed/${video.key}`;
            showVideoModal(videoUrl);
        } else {
            alert("No trailer available");
        }
    } catch (error) {
        console.error("Error fetching movie video:", error);
    }
}

// Show video in a modal
function showVideoModal(videoUrl) {
    const videoModal = document.querySelector('#video-modal');
    const videoFrame = document.querySelector('#video-frame');

    // Set the iframe's src to the video URL
    videoFrame.src = videoUrl;

    // Show the modal
    videoModal.style.display = 'flex';

    // Close modal when clicking the close button
    document.querySelector('#close-btn').addEventListener('click', closeModal);
}

// Close the video modal
function closeModal() {
    const videoModal = document.querySelector('#video-modal');
    const videoFrame = document.querySelector('#video-frame');

    // Hide the modal
    videoModal.style.display = 'none';

    // Reset the iframe's src to stop the video when modal is closed
    videoFrame.src = '';
}

// Function to handle logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    // Clear user session data (e.g., localStorage, sessionStorage, or any token)
    localStorage.removeItem('userAuthenticated'); // Adjust based on how you store user data
    
    // Redirect to login page
    window.location.href = 'login.html'; // Redirect to the login page (update this URL accordingly)
});
