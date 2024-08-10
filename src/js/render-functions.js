/* import { sortUserPlugins } from "vite"; */
// Додай відображення великої версії зображення з бібліотекою SimpleLightbox для повноцінної галереї.
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryList = document.querySelector(".gallery-list");

//Відмальовка знайденої картинки
export function renderImages(images) {
    const markup = images
    .map(({                         //Кожне зображення описується об'єктом, з такими властивостями.
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    })=> `
    <li>
    <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}"/>
        </a>
        <div class="text-wrapper">
    <div class="stat"><p><b>Likes:</b> ${likes}</p></div>
    <div class="stat"><p><b>Views:</b> ${views}</p> </div>
    <div class="stat"><p><b>Comments:</b> ${comments}</p></div>
    <div class="stat"><p><b>Downloads:</b> ${downloads}</p></div>
        </div>
    </li>
    `
) 
.join('');

galleryList.insertAdjacentHTML("beforeend", markup);

new SimpleLightbox ('.gallery-list a', {
    captionsData:"alt",
    captionsDelay: 250
}).refresh();
}

export function clearGallery() {
    galleryList.innerHTML = '';
}

export function showLoader() {
    document.querySelector('.loader').classList.remove('hidden');
  }
  
  export function hideLoader() {
    document.querySelector('.loader').classList.add('hidden');
  }


