/* Підключення бібліотеки axios - є це простий HTTP-клієнт, що базується на Promise і автоматизує багато рутинних завдань при роботі з HTTP-запитами, а саме дозволяє:
- зберігати глобальні налаштування, що будуть автоматично додаватися до всіх запитів;
- автоматично перетворювати дані запиту у формат JSON;
- парсити дані відповіді з формату JSON;
- обробляти всі можливі помилки запиту, включаючи 404, та багато іншого.
- Axios є зручною альтернативою стандартному Fetch API.
 */
import axios from 'axios';   

const URL = "https://pixabay.com/api/";                  // шлях до галереї pixabay
const API_KEY = "45296804-0fb55f0e1381bd4cbf585a7a5";    // ключ що отрімала після реєстрації тут https://pixabay.com/api/docs/#api_search_images

axios.defaults.baseURL = URL;

// Робимо запит на сервер для пошуку колекції картинок
export async function fetchImages(query, page = 1) {      
    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,                                     // pageSize замінює per_Page для цієї галереї
        page: page,                                            
    };

try {
    const response = await axios.get(URL, {params});      
    return response.data;
} catch(error) {
    console.error("Image Search Error:", error);
    throw error;
}
};