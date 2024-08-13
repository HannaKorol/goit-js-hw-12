import {fetchImages} from './js/pixabay-api.js';
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader, 
} from './js/render-functions.js';
// Підключення бібліотеки для повідомлень - помилки, закінчення колекції
import iziToast from "izitoast";
// стилі для повідомлень
import "izitoast/dist/css/iziToast.min.css";


const loadMoreBtn = document.querySelector('[data-action="load-more"]');


// 2) Користувач буде вводити рядок для пошуку в текстове поле, а за сабмітом форми необхідно виконувати HTTP-запит із цим пошуковим рядком.
const form = document.querySelector(".form-search");
let query = ''; // Змінна для зберігання запиту пошуку
let page = 1; // Поточна сторінка
let maxHits = 0; // Змінна для зберігання загальної кількості знайдених зображень
let totalHits = 0; // Змінна для відстеження кількості вже відображених зображень

// Обробник події при сабміті форми
form.addEventListener("submit", async event => {
    event.preventDefault();
    //Обробка тексту що було введено користувачем в форму :
query = event.currentTarget.elements.query.value.trim(); // Отримання значення з інпуту
page = 1; // Повернення на першу сторінку
totalHits = 0;  // Скидання лічильника відображених зображень                                              // Reset the total hits counter

    // 3) При натисканні на кнопку відправки форми, додайте перевірку вмісту текстового поля на наявність порожнього рядка, щоб користувач не міг відправити запит, якщо поле пошуку порожнє.
    if(!query) {                           //якщо немає тексту в input то:
        iziToast.error({                   // показувати помилку (використаємо бібліотеку iziToast):
            message: 'Please enter a search query!',  //текст помилки
            position: 'topRight',                     // його положення
        });
        return;
    }


clearGallery();        // Очищення галереї                            
showLoader();         // Показати індикатор завантаження
loadMoreBtn.classList.add('hidden');  // Приховати кнопку "Load more"

try {
  const data = await fetchImages(query, page);
  maxHits = data.totalHits;  // Збереження загальної кількісті знайдених зображень


  if(data.hits.length === 0) { //Якщо масив hits порожній, відображається повідомлення про те, що зображень не знайдено.
        iziToast.error({
message: 
"Sorry, there are no images matching your search query. Please try again!",
position: 'topRight',
        });
    } else {
      totalHits += data.hits.length; // Оновлення кількісті відображених зображень
        renderImages(data.hits); // Відображення зображення

    if (totalHits >= maxHits) {  // Якщо всі зображення відображено
      iziToast.info({
message: "We're sorry, but you've reached the end of search results.",
position: 'topRight',
});
} else {
  loadMoreBtn.classList.remove('hidden');  // Показуємо кнопку "Load more", якщо є ще зображення
}
      }
} catch(error) {
  iziToast.error({ title: 'Error', message: error.message }); //якщо виникають помилки запиту - відображаємо за допомогою бібліотеки
} finally {
  hideLoader();                                               // Приховуємо індикатор завантаження
  form.reset();                                               // Очистити форму після запиту
}
});



//---------------------------------------------------------------------------------------------------------//
//^     Кнопка "завантажити ще"

//1. Якщо данних немає - то і кнопки не має.
//2. Якщо користувач вже натиснув на кнопку, то спочатку повинні загрузитись данні, а тоді можна клікнути ще раз. Користувач не може клікати 1000разів.
//3. Якщо дійшли до кінця галереї то кнопку треба видалити.


/*
1. блокуємо кнопку
2. додаємо до сторінки +1
3. робимо запит
4. отримаємо відповідь та візуалізуємо карточки
5. після запиту робимо перевірку: якщо поточна сторінка співпадає з максимальною - то ховаємо кнопку і знімаємо слухача подій, якщо ж все ок - розблоковуємо кнопку для подальшої взаємодії

*/
// Обробник події при натисканні кнопки "Load more"
loadMoreBtn.addEventListener("click", async () =>{         //якщо натиснули на Кнопку "завантажити ще" то відображається ще одна нова сторінка
  page+=1;                                                 // Перехід на наступну сторінку
  showLoader();                                            // Показування індикатора завантаження

  try{
    const data = await fetchImages(query, page);
    totalHits += data.hits.length;                          // Оновлення кількісті відображених зображень      
    renderImages(data.hits);                                // Відображення нових зображень
    smoothScroll();                                         // Плавне прокручування до нових зображень

    if (totalHits >= maxHits) {                              // Якщо всі зображення відображено
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      loadMoreBtn.classList.add('hidden');                   // Приховати кнопку "Load more"
    }

  } catch(error) {
    iziToast.error({ title: 'Error', message: error.message });
  } finally {
    hideLoader();                                                 // Приховати індикатор завантаження
  }
});


// Функція для плавного прокручування до нових зображень
function smoothScroll() {
  const { height: cardHeight } = document
  .querySelector('.gallery-list')
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}





















//Пагінація: номер групи та кількість елементів в групі
// - Завантажуємо галерею при сабміті форми
// - Завантажуємо галерею при натискані на кнопку заватажити ще
// - Оновлюємо групу в параментрах запиту
// - Рендерим галерею
// - Скидання значення при пошуку за новим критерієм
// - Показуємо спінер поки йде запит


//створюємо обект де зберігаємо данні(page, perPage, q, maxPage)

// 1. сховати кнопку "завантажити ще"
// 2. вішає


//load more btn stages 
// 1. hidden - ховаємо кнопку коли скінчилися результати сторінок, або коли їх взагалі немає, або ми перший раз на сторінці
// 2. visible - коли робимо новий запит
// 3. disable - відключаємо тоді коли робимо запит на сервер і чекаємо відповіді від нього
// 4. enabled - включаемо кнопку тоді коли отримали результати запиту

/* const loadMoreBtn = document.querySelector('[data-action="load-more"]');
const spinner = document.querySelector(".spinner");
const hiddenClass = "is-hidden"; //функція для приховання кнопки

class ButtonService{
constructor(buttonEL, hiddenClass) {
  this.buttonEL = buttonEL;
  this.hiddenClass = hiddenClass;
}
hide(){
  this.buttonEL.classList.add(this.hiddenClass);
}
show(){
  this.buttonEL.classList.remove(this.hiddenClass);
}
disable(){
  this.buttonEL.disabled = true;
}
enable(){
  this.buttonEL.disabled = false}
}

const loadMoreBtnEl = new ButtonService(loadMoreBtn, "is-hidden");
console.log(loadMoreBtnEl);
loadMoreBtnEl.disable();
 */