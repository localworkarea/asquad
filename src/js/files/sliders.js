/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper, { Navigation } from 'swiper';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.product__slider')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.product__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			// observer: true,
			// observeParents: true,
			// freeMode: true,
			// slidesPerView: 2.5,
			// spaceBetween: 271,
			// autoHeight: true,
			speed: 800,
			// touchAngle: 90,
			// grabCursor: true,

			// // Управление колесом мыши
			// mousewheel: {
			// 	// чувствительность колеса
			// 	sensitivity: 1,
			// 	// класс объекта на котором будет срабатывать прокрутка мышью
			// 	eventsTarget: ".product__container",
			// },

			// Брейкпоінти
			breakpoints: {
				320: {
					slidesPerView: 1.2,
					spaceBetween: 70,
				},
				375: {
					slidesPerView: 1.7,
					spaceBetween: 70,
				},
				768: {
					slidesPerView: 1.7,
					spaceBetween: 136,
				},
				992: {
					slidesPerView: 1.9,
					spaceBetween: 63,
				},
				1366: {
					slidesPerView: 2.5,
					spaceBetween: 63,
				},
				1500: {
					slidesPerView: 2.5,
					spaceBetween: 271,
				},
			},
			// Події
			on: {

			}
		});
	}
}

window.addEventListener("load", function (e) {
	initSliders();
});