const formWrapper = document.querySelector('.form-wrapper');
const form = document.querySelector('#form');
const searchInput = document.querySelector('#searchInput');
const buttonWrapper = document.querySelector('.button-wrapper');
const searchButton = document.querySelector('#searchButton');
const clearButton = document.querySelector('#clearButton');
const imageListWrapper = document.querySelector('.imagelist-wrapper');

function search(e) {
    e.preventDefault(); // prevent the page from refreshing when we submit the form
    const value = searchInput.value.trim();
    
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: 'GET',
        headers: {
            Authorization: "Client-ID kmRBNWe96s8_AFBXPm9VQ5qOCF1YiwzPuq4NrfL8OoY"
        }
    })
            .then((res) => res.json())
        .then((data) => {
            Array.from(data.results).forEach((image) => {
                // console.log(image.urls.small);
                addImageToUI(image.urls.small);
                })
            })
            .catch((err) => console.log(err))
}

function clearAllImage() {
    searchInput.value = "";
    Array.from(imageListWrapper.children).forEach((clear) => {
        clear.remove();
    })
}


function addImageToUI(url) {
    const div = document.createElement('div');
    div.className = 'card';
    const image = document.createElement('img');
    image.setAttribute("src", url);
    image.height = '400';
    image.width = '400';

    div.appendChild(image);
    imageListWrapper.appendChild(div);
}

function init() {
    form.addEventListener('submit', search);
    clearButton.addEventListener('click', clearAllImage);
}

init();