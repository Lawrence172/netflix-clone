import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import app from "./firebase.js";

// Firebase Services
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM Elements
const searchBar = document.getElementById("searchBar");
const movieContainer = document.getElementById("movieContainer");
const movieModal = document.getElementById("movieModal");
const moviePlayer = document.getElementById("moviePlayer");
const closeModal = document.getElementById("closeModal");

// Google Sign-In
document.getElementById("googleSignIn").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("User signed in:", user);
    alert(`Welcome, ${user.displayName}!`);
  } catch (error) {
    console.error("Error during sign-in:", error);
    alert("Sign-in failed. Please try again.");
  }
});

// Fetch movies from Firestore
const fetchMovies = async () => {
  const movieRef = collection(db, "movies");
  const movies = await getDocs(movieRef);

  // Categorize movies
  const categories = {};
  movies.forEach((doc) => {
    const movie = doc.data();
    if (!categories[movie.category]) {
      categories[movie.category] = [];
    }
    categories[movie.category].push(movie);
  });

  // Display movies
  for (const [category, movies] of Object.entries(categories)) {
    const row = document.getElementById(`${category.toLowerCase()}Movies`);
    if (row) {
      movies.forEach((movie) => {
        const img = document.createElement("img");
        img.src = movie.posterUrl;
        img.alt = movie.title;
        img.addEventListener("click", () => playMovie(movie.videoUrl));
        row.appendChild(img);
      });
    }
  }
};

// Play movie
const playMovie = (videoUrl) => {
  moviePlayer.src = videoUrl;
  movieModal.classList.remove("hidden");
};

// Close modal
closeModal.addEventListener("click", () => {
  movieModal.classList.add("hidden");
  moviePlayer.src = ""; // Stop video
});

// Initialize
fetchMovies();
