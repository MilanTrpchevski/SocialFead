// Hide the loading page when all elements have finished loading
document.addEventListener('DOMContentLoaded', () => {
  const loadingOverlay = document.getElementById('loading');
  loadingOverlay.style.display = 'none';
});
let loadedCards = 0; 
// Function that generates the cards
function createFeedCard(data) { 
    const feedContainer = document.getElementById('feedContainer');
    /* With the following code we are creating elements and appending them to the DOM.
    At the same time we are giving them an class and id so we can style them more easly.
    */

    // Append profile image and author name to the author container
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card');
    cardContainer.id = 'feedCard';

    // Create the image element
    const image = document.createElement('img');
    image.id = 'image';
    image.src = data.image;
    image.alt = 'Image';
    image.classList.add('image-card')
    // create the caption element
    const caption = document.createElement('div');
    caption.classList.add('caption');
    caption.id = 'caption';
    caption.textContent = data.caption;

    // Create the author container
    const authorContainer = document.createElement('div');
    authorContainer.classList.add('author');

    // Create the profile image element
    const profileImage = document.createElement('img');
    profileImage.id = 'profileImage';
    profileImage.src = data.profile_image;
    profileImage.alt = 'Profile Image';

    // Create the author name element
    const authorName = document.createElement('div');
    authorName.classList.add('name');
    authorName.id = 'authorName';
    authorName.textContent = data.name;

    // Append profile image and author name to the author container
    authorContainer.append(profileImage, authorName);

    // Create the metadata container
    const metadataContainer = document.createElement('div');
    metadataContainer.classList.add('metadata');

    // Create the likes element
    const likes = document.createElement('span');
    likes.classList.add('likes');
    likes.id = 'likes';
    likes.textContent = data.likes;

    // Create the date element
    const date = document.createElement('span');
    date.classList.add('date');
    date.id = 'date';
    date.textContent = data.date;

    // Append likes and date to the metadata container
    metadataContainer.append(likes, date);

    // Create the source container
    const sourceContainer = document.createElement('div');
    sourceContainer.classList.add('source');

    // Create the source link element
    const sourceLink = document.createElement('a');
    sourceLink.id = 'sourceLink';
    sourceLink.href = data.source_link;
    sourceLink.textContent = 'View on ' + data.source_type;

    // Append source link to the source container
    sourceContainer.appendChild(sourceLink);

    // Append all the elements to the card container
    cardContainer.append(image, caption, authorContainer, metadataContainer, sourceContainer);


    // Append the card container to the feed container
    feedContainer.appendChild(cardContainer);
}
// Function that will only load the limited amount of cards
function loadLimitedFeedCards(limit) {

 fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
      const startIndex = loadedCards;
      //   Get the minimum out of the 2 numbers
      const endIndex = Math.min(loadedCards + limit, jsonData.length);
      // Iterate over the JSON data and create feed cards up to the limit
      for (let i = startIndex; i < endIndex; i++) {
        createFeedCard(jsonData[i]);
      }
      loadedCards += limit;

      // Show/hide the "Load More" button based on the number of loaded cards
      const loadMoreButton = document.getElementById('loadMoreButton');
      if (loadedCards >= jsonData.length) {
        loadMoreButton.style.display = 'none';
      } else {
        loadMoreButton.style.display = 'block';
      }
      makeImagePopUp(); // Call the function to enable image popup after the cards are loaded
    })
    .catch(error => {
      console.error('Error: ', error);
    });
}

// Event listener for the "Load More" button
const loadMoreButton = document.getElementById('loadMoreButton');
loadMoreButton.addEventListener('click', () => {
  loadLimitedFeedCards(4);
});

// Load initial 4 feed cards
loadLimitedFeedCards(4);

// Switch from light mode to dark mode function
const switchInput = document.querySelector('.switch input');
// event listener for making a change on the toggle button
switchInput.addEventListener('change', toggleMode => {
 if (switchInput.checked) {
    enableDarkMode();
  } else {
    enableLightMode();
  }
});

//Function for dark mode
function enableDarkMode() {
  document.body.classList.add('dark-mode');
}
//Function for light mode
function enableLightMode() {
  document.body.classList.remove('dark-mode');
}

// Tuggle up functionalities
const toggleUpBtn = document.getElementById('toggleUpBtn');
// Hide the toggle button for 1 page height
window.addEventListener('scroll', () => {
  toggleUpBtn.style.display = window.pageYOffset > 100 ? 'block' : 'none';
});

//Function for toggle up button for going to the top of the page
toggleUpBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Function for image lightbox

function makeImagePopUp() {
    const cardImages = document.getElementsByClassName('image-card');

    const imagePopup = document.getElementById('imagePopup');
    const popupImage = document.getElementById('popupImage');
    const cancelButton = document.getElementById('cancelButton');
    // iterate through the images and add event listeners for click
    for (let i = 0; i < cardImages.length; i++) {
        cardImages[i].addEventListener('click', function () {
        const imageUrl = this.getAttribute('src');
        popupImage.setAttribute('src', imageUrl);
        imagePopup.style.display = 'block';
        });
    }

    // Hide the popup window when clicked on the button
    cancelButton.addEventListener('click', function () {
        imagePopup.style.display = 'none';
    });
    // hide the popup window but when you click on the image and not the button
    popupImage.addEventListener('click', function () {
        imagePopup.style.display = 'none';
});
}
makeImagePopUp();
