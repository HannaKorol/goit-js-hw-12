
import {fetchImages} from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader, 
} from './js/render-functions.js';
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


// 2) Користувач буде вводити рядок для пошуку в текстове поле, а за сабмітом форми необхідно виконувати HTTP-запит із цим пошуковим рядком.

const form = document.querySelector(".form-search");

form.addEventListener("submit", event => {
    event.preventDefault();
    //Обробка тексту що було введено користувачем в форму :

    // 1. Отримаємо посилання на input з іменем query (const queryInput):
    //   1.1 event.currentTarget - посилання на поточний елемент що обробляє подію - на форму;
    //    1.2.elements - колекція елементів в середині форми(input);
    //    1.3 query - ім'я елемента форми (input з name="query").
    const queryInput = event.currentTarget.elements.query;
    // 2. Отримуємо запит користувача і очищуємо його від зайвих пробілів (const query):
    //    2.1 queryInput.value - отримання значення (текст), введене користувачем в input
    //    2.2. trim() - видаляємо пробіли з початку і кінця веденного значення
    const query = queryInput.value.trim().toLowerCase();


    // 3) При натисканні на кнопку відправки форми, додайте перевірку вмісту текстового поля на наявність порожнього рядка, щоб користувач не міг відправити запит, якщо поле пошуку порожнє.
    if(!query) {                           //якщо немає тексту в input то:
        iziToast.error({                   // показувати помилку (використаємо бібліотеку iziToast):
            message: 'Please enter a search query!',  //текст помилки
            position: 'topRight',                     // його положення
        });
        return;
    }


clearGallery();
showLoader();

fetchImages(query)
.then(data => {
    if(data.hits.length === 0) {
        iziToast.error({
message: 
"Sorry, there are no images matching your search query. Please try again!",
position: 'topRight',
        });
    } else {
        renderImages(data.hits);
    }
})
.catch(error => {
  iziToast.error({ title: 'Error', message: error.message });
})
.finally(() => {
  hideLoader();
  queryInput.value = '';
});
});//Якщо масив hits порожній, відображається повідомлення про те, що зображень не знайдено. Якщо ж зображення знайдено, вони рендеряться за допомогою функції renderImages.