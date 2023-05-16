// Підключення функціоналу "Чортоги Фрілансера"
import { isMobile, uniqArray, FLS } from "../files/functions.js";
import { flsModules } from "../files/modules.js";
// Спостерігач об'єктів [всевидюче око]
// data-watch - можна писати значення для застосування кастомного коду
// data-watch-root - батьківський елемент всередині якого спостерігати за об'єктом
// data-watch-margin -відступ
// data-watch-threshold - відсоток показу об'єкта для спрацьовування
// data-watch-once - спостерігати лише один раз
// _watcher-view - клас який додається за появи об'єкта

class ScrollWatcher {
	constructor(props) {
		let defaultConfig = {
			logging: true,
		}
		this.config = Object.assign(defaultConfig, props);
		this.observer;
		!document.documentElement.classList.contains('watcher') ? this.scrollWatcherRun() : null;
	}
	// Оновлюємо конструктор
	scrollWatcherUpdate() {
		this.scrollWatcherRun();
	}
	// Запускаємо конструктор
	scrollWatcherRun() {
		document.documentElement.classList.add('watcher');
		this.scrollWatcherConstructor(document.querySelectorAll('[data-watch]'));
	}
	// Конструктор спостерігачів
	scrollWatcherConstructor(items) {
		if (items.length) {
			// Унікалізуємо параметри
			let uniqParams = uniqArray(Array.from(items).map(function (item) {
				return `${item.dataset.watchRoot ? item.dataset.watchRoot : null}|${item.dataset.watchMargin ? item.dataset.watchMargin : '0px'}|${item.dataset.watchThreshold ? item.dataset.watchThreshold : 0}`;
			}));
			// Отримуємо групи об'єктів з однаковими параметрами,
			// створюємо налаштування, ініціалізуємо спостерігач
			uniqParams.forEach(uniqParam => {
				let uniqParamArray = uniqParam.split('|');
				let paramsWatch = {
					root: uniqParamArray[0],
					margin: uniqParamArray[1],
					threshold: uniqParamArray[2]
				}
				let groupItems = Array.from(items).filter(function (item) {
					let watchRoot = item.dataset.watchRoot ? item.dataset.watchRoot : null;
					let watchMargin = item.dataset.watchMargin ? item.dataset.watchMargin : '0px';
					let watchThreshold = item.dataset.watchThreshold ? item.dataset.watchThreshold : 0;
					if (
						String(watchRoot) === paramsWatch.root &&
						String(watchMargin) === paramsWatch.margin &&
						String(watchThreshold) === paramsWatch.threshold
					) {
						return item;
					}
				});

				let configWatcher = this.getScrollWatcherConfig(paramsWatch);

				// Ініціалізація спостерігача зі своїми налаштуваннями
				this.scrollWatcherInit(groupItems, configWatcher);
			});
		} 
	}
	// Функція створення налаштувань
	getScrollWatcherConfig(paramsWatch) {
		//Створюємо налаштування
		let configWatcher = {}
		// Батько, у якому ведеться спостереження
		if (document.querySelector(paramsWatch.root)) {
			configWatcher.root = document.querySelector(paramsWatch.root);
		}
		// Відступ спрацьовування
		configWatcher.rootMargin = paramsWatch.margin;
		if (paramsWatch.margin.indexOf('px') < 0 && paramsWatch.margin.indexOf('%') < 0) {
			return
		}
		// Точки спрацьовування
		if (paramsWatch.threshold === 'prx') {
			// Режим паралаксу
			paramsWatch.threshold = [];
			for (let i = 0; i <= 1.0; i += 0.005) {
				paramsWatch.threshold.push(i);
			}
		} else {
			paramsWatch.threshold = paramsWatch.threshold.split(',');
		}
		configWatcher.threshold = paramsWatch.threshold;

		return configWatcher;
	}
	// Функція створення нового спостерігача зі своїми налаштуваннями
	scrollWatcherCreate(configWatcher) {
		this.observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				this.scrollWatcherCallback(entry, observer);
			});
		}, configWatcher);
	}
	// Функція ініціалізації спостерігача зі своїми налаштуваннями
	scrollWatcherInit(items, configWatcher) {
		// Створення нового спостерігача зі своїми налаштуваннями
		this.scrollWatcherCreate(configWatcher);
		// Передача спостерігачеві елементів
		items.forEach(item => this.observer.observe(item));
	}
	// Функція обробки базових дій точок спрацьовування
	scrollWatcherIntersecting(entry, targetElement) {
		if (entry.isIntersecting) {
			// Бачимо об'єкт
			// Додаємо клас
			!targetElement.classList.contains('_watcher-view') ? targetElement.classList.add('_watcher-view') : null;

			// ДОБАВЛЕНИЕ КЛАССА ДЛЯ HEADER ==============================================
			// if (targetElement.classList.contains('_header-hidden')) {
			// 	document.documentElement.classList.add('header-hidden');
			// }
			// if (targetElement.classList.contains('_header-black')) {
			// 	document.documentElement.classList.add('header-black');
			// }
			// if (targetElement.classList.contains('_header-white')) {
			// 	document.documentElement.classList.remove('header-black');
			// }

			// if (targetElement.classList.contains('manage__container')) {
			// 	const headerItem = document.querySelector('.header');
			// 		headerItem.classList.add('hide-header');
			// }
			
			if (targetElement.classList.contains('footer-main')) {
				const headerItem = document.querySelector('.header');
					headerItem.classList.add('hide-header');
			}

			// if (targetElement.classList.contains('footer')) {
			// 	document.documentElement.classList.add('header-hidden');
			// }
			// =============================================================================
			// КЛАСС ДЛЯ СДВИГА ПЕРВОЙ КАРТИНКИ ============
			// const animSlide = document.querySelector('.image-anim');

			// if (targetElement.classList.contains('main')) {
			// 	animSlide.classList.add('_anim-main');
			// }
			// if (targetElement.classList.contains('focus')) {
			// 	animSlide.classList.add('_anim-focus');
			// }
			// if (targetElement.classList.contains('integrations')) {
			// 	animSlide.classList.add('_anim-integrations');
			// }
			

		} else {
			// Не бачимо об'єкт
			// Забираємо клас
			targetElement.classList.contains('_watcher-view') ? targetElement.classList.remove('_watcher-view') : null;


				// УДАЛЕНИЕ КЛАССА ДЛЯ HEADER ==============================================
			// if (targetElement.classList.contains('_header-hidden')) {
			// 	document.documentElement.classList.remove('header-hidden');
			// }

			// const animSlide = document.querySelector('.image-anim');

			// if (targetElement.classList.contains('focus')) {
			// 	animSlide.classList.remove('_anim-focus');
			// }
			// if (targetElement.classList.contains('integrations')) {
			// 	animSlide.classList.remove('_anim-integrations');
			// }
			// if (targetElement.classList.contains('main')) {
			// 	animSlide.classList.remove('_anim-main');
			// }
			// if (targetElement.classList.contains('manage__container')) {
			// 	const headerItem = document.querySelector('.header');
			// 		headerItem.classList.remove('hide-header');
			// }
		
			if (targetElement.classList.contains('footer')) {
				const headerItem = document.querySelector('.header');
					headerItem.classList.remove('hide-header');
			}
			
		}
	}

	
	// Функція відключення стеження за об'єктом
	scrollWatcherOff(targetElement, observer) {
		observer.unobserve(targetElement);
		this.scrollWatcherLogging(`Я перестав стежити за ${targetElement.classList}`);
	}
	// Функція виведення в консоль
	scrollWatcherLogging(message) {
		this.config.logging ? FLS(`[Спостерігач]: ${message}`) : null;
	}
	// Функція обробки спостереження
	scrollWatcherCallback(entry, observer) {
		const targetElement = entry.target;
		// Обробка базових дій точок спрацьовування
		this.scrollWatcherIntersecting(entry, targetElement);
		// Якщо є атрибут data-watch-once прибираємо стеження
		targetElement.hasAttribute('data-watch-once') && entry.isIntersecting ? this.scrollWatcherOff(targetElement, observer) : null;
		// Створюємо свою подію зворотного зв'язку
		document.dispatchEvent(new CustomEvent("watcherCallback", {
			detail: {
				entry: entry
			}
		}));

		/*
		// Вибираємо потрібні об'єкти
		if (targetElement.dataset.watch === 'some value') {
			// пишемо унікальну специфіку
		}
		if (entry.isIntersecting) {
			//Бачимо об'єкт
		} else {
			//Не бачимо об'єкт
		}
		*/
	}
}
// Запускаємо та додаємо в об'єкт модулів
flsModules.watcher = new ScrollWatcher({});
