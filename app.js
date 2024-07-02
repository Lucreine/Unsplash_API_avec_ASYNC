const apiKey = 'Hw0BjnxtobBUPqOQrsGDKD9BENJkkQMI0wz-M1TIDRI';
const apiUrl = 'https://api.unsplash.com/search/photos';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const imageGrid = document.getElementById('imageGrid');
const errorMessage = document.getElementById('errorMessage');

document.addEventListener('DOMContentLoaded', () => {
    fetchImages('dogs');
});

searchButton.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchImages(query);
    }
});

async function fetchImages(query) {
    try {
        const response = await fetch(`${apiUrl}?query=${query}&client_id=${apiKey}&per_page=30`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayImages(data.results);
        errorMessage.textContent = '';
    } catch (error) {
        errorMessage.textContent = 'Failed to fetch images. Please try again later.';
    }
}

function displayImages(images) {
    imageGrid.innerHTML = '';
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description;
        imageGrid.appendChild(imgElement);
    });
}
