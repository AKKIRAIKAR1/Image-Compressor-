// Handle file input change (user selects an image)
document.getElementById('imageInput').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    // Check if the file is an image
    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            compressImage(img);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function compressImage(image) {
    // Create a canvas to draw the image on and resize it
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const MAX_WIDTH = 800; // Set max width for the compressed image
    const MAX_HEIGHT = 600; // Set max height for the compressed image

    let width = image.width;
    let height = image.height;

    // Calculate new dimensions maintaining aspect ratio
    if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = width * ratio;
        height = height * ratio;
    }

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // Draw the image on canvas
    ctx.drawImage(image, 0, 0, width, height);

    // Get the compressed image data URL (you can change the quality here, e.g. 0.7)
    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);

    // Display the compressed image
    const compressedImage = document.getElementById('compressedImage');
    compressedImage.src = compressedDataUrl;

    // Display the download link
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = compressedDataUrl;

    // Show the result section
    document.getElementById('result').style.display = 'block';
}

// Toggle dark mode
document.getElementById('toggleDarkMode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save the theme preference in localStorage
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
});

// Check for saved theme preference
window.addEventListener('load', () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
    }
});
