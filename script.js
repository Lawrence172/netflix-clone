// Get all toggle buttons and boxes
const toggleButtons = document.querySelectorAll(".toggle-button");
const boxes = document.querySelectorAll(".innertext");

// Loop through each toggle button
toggleButtons.forEach((button, index) => {
  // Add a click event listener to each button
  button.addEventListener("click", () => {
    // Toggle the display of the corresponding box based on the index
    const box = boxes[index];
    if (box.style.display === "none") {
      box.style.display = "block";
    } else {
      box.style.display = "none";
    }
  });
});
