const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];



// Unsplash API
const count = 30;
const apiKey = '277uDQvnX6mq-B78CaKDWEf8iGwM7E6GOag2ePHRA-E';
const apiURl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check is all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

//Helper function to Set Attrbutes on DOM Elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

// Create Elements for Links and Photos & add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //run func for each 
    photosArray.forEach((photo) => {
        //Create anchor element to link to unsplash
        const item = document.createElement('a');
        //Create Image for photo
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load', imageLoaded)
        //Put img inside a element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiURl)
        photosArray = await response.json()
        displayPhotos();
    } catch(error){
        //catch here
    };
}

// Check is user is scrolling, load more photos
window.addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 
        1000 && ready){
            ready = false;
        getPhotos()
        console.log('load more')
    }
});

// On Load
getPhotos();