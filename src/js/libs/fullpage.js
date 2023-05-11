import { isMobile } from "../files/functions.js";
import { flsModules } from "../files/modules.js";
// Can also be included with a regular script tag
import Typed from 'typed.js';

/*
	data-fp - оболонка
	data-fp-section - секції

	Перехід на певний слайд
	fpage.switchingSection(id);

	Встановлення z-index
	fPage.init();
	fPage.destroy();
	fPage.setZIndex();

	id активного слайду
	fPage.activeSectionId
	Активний слайд
	fPage.activeSection

	Події
	fpinit
	fpdestroy
	fpswitching
*/


// const animationAwesome = bodymovin.loadAnimation({
// 	container: document.querySelector(".lottie__awesome"),
// 	renderer: "svg",
// 	loop: false,
// 	autoplay: false,
// 	path: "files/awesome_right.json"
// });
const animationHoldOn = bodymovin.loadAnimation({
	container: document.querySelector('.lottie__hold-on'),
	renderer: 'svg',
	loop: false,
	autoplay: false,
	path: 'files/hold_on.json',
});
const animationManageAmount = bodymovin.loadAnimation({
	container: document.querySelector('.lottie__manage-amount'),
	renderer: 'svg',
	loop: true,
	autoplay: false,
	path: 'files/ManagePayments_AmountFlow.json',
});
const animationManageGraphic = bodymovin.loadAnimation({
	container: document.querySelector('.lottie__manage-graphic'),
	renderer: 'svg',
	loop: true,
	autoplay: false,
	path: 'files/ManagePayments_GraphicCurrency.json',
});
const animationManageTransct = bodymovin.loadAnimation({
	container: document.querySelector('.lottie__manage-transactions'),
	renderer: 'svg',
	loop: true,
	autoplay: false,
	path: 'files/ManagePayments_TransactionFlow.json',
});


function ToogleHeader(e) {
  const el = e.target;
  const header = document.querySelector(".header");
  if (el.scrollTop >= 70) {
    header.classList.add("head-hidden");
    console.log("header добавил hidden: " + el.classList);
  } else {
    header.classList.remove("head-hidden");
    console.log("header удалил hidden: " + el.classList);
  }
}
const sectionManage = document.querySelector(".manage");
const sectionOptions = document.querySelector(".options");
const sectionCustomFirst = document.querySelector(".custom-first");
const sectionCustomSecond = document.querySelector(".custom-second");
// sectionManage.addEventListener('scroll', function() { ToogleHeader(this); });
// sectionOptions.addEventListener('scroll', function() { ToogleHeader(this); });
// sectionCustomFirst.addEventListener('scroll', function() { ToogleHeader(this); });
// sectionCustomSecond.addEventListener('scroll', function() { ToogleHeader(this); });


var $is_typed_call = false;
// Клас FullPage
export class FullPage {
	constructor(element, options) {
		let config = {
			//===============================
			// Селектор, на якому не працює подія свайпа/колеса
			noEventSelector: '[data-no-event]',
			//===============================
			// Налаштування оболонки
			// Клас при ініціалізації плагіна
			classInit: 'fp-init',
			// Клас для врапера під час гортання
			wrapperAnimatedClass: 'fp-switching',
			//===============================
			// Налаштування секцій
			// СЕЛЕКТОР для секцій
			selectorSection: '[data-fp-section]',
			// Клас для активної секції
			activeClass: 'active-section',
			// Клас для Попередньої секції
			previousClass: 'previous-section',
			// Клас для наступної секції
			nextClass: 'next-section',
			// id початково активного класу
			idActiveSection: 0,
			//===============================
			// Інші налаштування
			// Свайп мишею
			// touchSimulator: false,
			//===============================
			// Ефекти
			// Ефекти: fade, cards, slider
			mode: element.dataset.fpEffect ? element.dataset.fpEffect : 'slider',
			//===============================
			// Булети
			// Активація буллетів
			bullets: element.hasAttribute('data-fp-bullets') ? true : false,
			// Клас оболонки буллетів
			bulletsClass: 'fp-bullets',
			// Клас буллета
			bulletClass: 'fp-bullet',
			// Клас активного буллета
			bulletActiveClass: 'fp-bullet-active',
			//===============================
			// Події
			// Подія створення
			onInit: function () { },
			// Подія перегортання секції
			onSwitching: function () { },
			// Подія руйнування плагіна
			onDestroy: function () { },
		}
		this.options = Object.assign(config, options);
		// Батьківський єлемент
		this.wrapper = element;
		this.sections = this.wrapper.querySelectorAll(this.options.selectorSection);
		// Активний слайд
		this.activeSection = false;
		this.activeSectionId = false;
		// Попередній слайд
		this.previousSection = false;
		this.previousSectionId = false;
		// Наступний слайд
		this.nextSection = false;
		this.nextSectionId = false;
		// Оболонка буллетів
		this.bulletsWrapper = false;
		// Допоміжна змінна
		this.stopEvent = false;
		if (this.sections.length) {
			// Ініціалізація елементів
			this.init();
		}
	}
	//===============================
	// Початкова ініціалізація
	init() {
		if (this.options.idActiveSection > (this.sections.length - 1)) return
		// Розставляємо id
		this.setId();
		this.activeSectionId = this.options.idActiveSection;
		// Присвоєння класів із різними ефектами
		this.setEffectsClasses();
		// Встановлення класів
		this.setClasses();
		// Встановлення стилів
		this.setStyle();
		// Встановлення булетів
		if (this.options.bullets) {
			this.setBullets();
			this.setActiveBullet(this.activeSectionId);
		}
		// Встановлення подій
		this.events();
		// Встановлюємо init клас
		setTimeout(() => {
			document.documentElement.classList.add(this.options.classInit);
			// Створення кастомної події
			this.options.onInit(this);
			document.dispatchEvent(new CustomEvent("fpinit", {
				detail: {
					fp: this
				}
			}));
		}, 0);
	}
	//===============================
	// Видалити
	destroy() {
		// Видалення подій
		this.removeEvents();
		// Видалення класів у секцій
		this.removeClasses();
		// Видалення класу ініціалізації
		document.documentElement.classList.remove(this.options.classInit);
		// Видалення класу анімації
		this.wrapper.classList.remove(this.options.wrapperAnimatedClass);
		// Видалення класів ефектів
		this.removeEffectsClasses();
		// Видалення z-index у секцій
		this.removeZIndex();
		// Видалення стилів
		this.removeStyle();
		// Видалення ID
		this.removeId();
		// Створення кастомної події
		this.options.onDestroy(this);
		document.dispatchEvent(new CustomEvent("fpdestroy", {
			detail: {
				fp: this
			}
		}));
	}
	//===============================
	// Встановлення ID для секцій
	setId() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			section.setAttribute('data-fp-id', index);
		}
	}
	//===============================
	// Видалення ID для секцій
	removeId() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			section.removeAttribute('data-fp-id');
		}
	}
	//===============================
	// Функція встановлення класів для першої, активної та наступної секцій
	setClasses() {
		// Збереження id для ПОПЕРЕДНЬОГО слайду (якщо такий є)
		this.previousSectionId = (this.activeSectionId - 1) >= 0 ?
			this.activeSectionId - 1 : false;

		// Збереження id для НАСТУПНОГО слайду (якщо такий є)
		this.nextSectionId = (this.activeSectionId + 1) < this.sections.length ?
			this.activeSectionId + 1 : false;

		// Встановлення класу та присвоєння елемента для АКТИВНОГО слайду
		this.activeSection = this.sections[this.activeSectionId];
		this.activeSection.classList.add(this.options.activeClass);

		for (let index = 0; index < this.sections.length; index++) {
			document.documentElement.classList.remove(`fp-section-${index}`);
		}
		document.documentElement.classList.add(`fp-section-${this.activeSectionId}`);

		// Встановлення класу та присвоєння елементу для ПОПЕРЕДНЬОГО слайду
		if (this.previousSectionId !== false) {
			this.previousSection = this.sections[this.previousSectionId];
			this.previousSection.classList.add(this.options.previousClass);
		} else {
			this.previousSection = false;
		}

		// Встановлення класу та присвоєння елемента для НАСТУПНОГО слайду
		if (this.nextSectionId !== false) {
			this.nextSection = this.sections[this.nextSectionId];
			this.nextSection.classList.add(this.options.nextClass);
		} else {
			this.nextSection = false;
		}
	}
	//===============================
	// Присвоєння класів із різними ефектами
	removeEffectsClasses() {
		switch (this.options.mode) {
			// case 'slider':
			// 	this.wrapper.classList.remove('slider-mode');
			// 	break;

			// case 'cards':
			// 	this.wrapper.classList.remove('cards-mode');
			// 	this.setZIndex();
			// 	break;

			case 'fade':
				this.wrapper.classList.remove('fade-mode');
				this.setZIndex();
				break;

			default:
				break;
		}
	}
	//===============================
	// Присвоєння класів із різними ефектами
	setEffectsClasses() {
		switch (this.options.mode) {
			// case 'slider':
			// 	this.wrapper.classList.add('slider-mode');
			// 	break;

			// case 'cards':
			// 	this.wrapper.classList.add('cards-mode');
			// 	this.setZIndex();
			// 	break;

			case 'fade':
				this.wrapper.classList.add('fade-mode');
				this.setZIndex();
				break;

			default:
				break;
		}
	}
	//===============================
	// Блокування напрямків скролла
	//===============================
	// Функція встановлення стилів
	setStyle() {
		switch (this.options.mode) {
			// case 'slider':
			// 	this.styleSlider();
			// 	break;

			// case 'cards':
			// 	this.styleCards();
			// 	break;

			case 'fade':
				this.styleFade();
				break;
			default:
				break;
		}
	}
	// // slider-mode
	// styleSlider() {
	// 	for (let index = 0; index < this.sections.length; index++) {
	// 		const section = this.sections[index];
	// 		if (index === this.activeSectionId) {
	// 			section.style.transform = 'translate3D(0,0,0)';
	// 		} else if (index < this.activeSectionId) {
	// 			section.style.transform = 'translate3D(0,-100%,0)';
	// 		} else if (index > this.activeSectionId) {
	// 			section.style.transform = 'translate3D(0,100%,0)';
	// 		}
	// 	}
	// }
	// // cards mode
	// styleCards() {
	// 	for (let index = 0; index < this.sections.length; index++) {
	// 		const section = this.sections[index];
	// 		if (index >= this.activeSectionId) {
	// 			section.style.transform = 'translate3D(0,0,0)';
	// 		} else if (index < this.activeSectionId) {
	// 			section.style.transform = 'translate3D(0,-100%,0)';
	// 		}
	// 	}
	// }
	// fade style 
	styleFade() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			const header = document.querySelector('.header');
			const imageAnim = document.querySelector('.image-anim');
			const requestSection = document.querySelector('.request');
			const apiTyping = document.querySelector('.api__typing');

			if (index === this.activeSectionId) {
				section.style.opacity = '1';
				section.style.pointerEvents = 'all';
				
			
	

				if (section.classList.contains('_header-hidden') && section.classList.contains('active-section')) {
					header.classList.add('header-hidden');
				} 
				if (!section.classList.contains('_header-hidden') && section.classList.contains('active-section')) {
					header.classList.remove('header-hidden');
				} 

				if (section.classList.contains('_header-black') && section.classList.contains('active-section')) {
					document.documentElement.classList.add('header-black');
				} 
				if (!section.classList.contains('_header-black') && section.classList.contains('active-section')) {
					document.documentElement.classList.remove('header-black');
				} 

				if (section.classList.contains('bg-black') && section.classList.contains('active-section')) {
					document.documentElement.classList.add('bg-black');
				} 
				if (!section.classList.contains('bg-black') && section.classList.contains('active-section')) {
					document.documentElement.classList.remove('bg-black');
				} 
				if (section.classList.contains('bg-blue') && section.classList.contains('active-section')) {
					document.documentElement.classList.add('bg-blue');
				} 
				if (!section.classList.contains('bg-blue') && section.classList.contains('active-section')) {
					document.documentElement.classList.remove('bg-blue');
				} 
				if (section.classList.contains('bg-gray') && section.classList.contains('active-section')) {
					document.documentElement.classList.add('bg-gray');
				} 
				if (!section.classList.contains('bg-gray') && section.classList.contains('active-section')) {
					document.documentElement.classList.remove('bg-gray');
				} 

				if (section.classList.contains('main') && section.classList.contains('active-section')) {
					imageAnim.classList.add('_anim-main');
				} 
				if (!section.classList.contains('main') && section.classList.contains('active-section')) {
					imageAnim.classList.remove('_anim-main');
				} 

				if (section.classList.contains('focus') && section.classList.contains('active-section')) {
					imageAnim.classList.add('_anim-focus');
				} 
				if (!section.classList.contains('focus') && section.classList.contains('active-section')) {
					imageAnim.classList.remove('_anim-focus');
				} 

				if (section.classList.contains('integrations') && section.classList.contains('active-section')) {
					imageAnim.classList.add('_anim-integrations');
				} 
				if (!section.classList.contains('integrations') && section.classList.contains('active-section')) {
					imageAnim.classList.remove('_anim-integrations');
				} 
				if (section.classList.contains("awesome") && section.classList.contains("active-section")) {
					// setTimeout(() => {
					// 		animationAwesome.play();
					// }, 300);
				} 
				if (!section.classList.contains("awesome") && section.classList.contains("active-section")) {
						// animationAwesome.stop();
				} 
				if (section.classList.contains('hold') && section.classList.contains('active-section')) {
						setTimeout(() => {
							animationHoldOn.play();  
						}, 300);
				} 
				if (!section.classList.contains('hold') && section.classList.contains('active-section')) {
					animationHoldOn.stop();
				} 
				if (section.classList.contains("choose") && section.classList.contains("active-section")) {

				}
				// ===== MANAGE =================
		

				if (section.classList.contains("manage") && section.classList.contains("active-section")) {
					animationManageAmount.play();
					animationManageGraphic.play();
					animationManageTransct.play();

					var list = document.getElementsByTagName('video');
              for (let item of list) {
                item.play();
              }

							// ToogleHeader(document.querySelector(".manage"));
					
					// const sectionManage = document.querySelector(".manage");
					// const containerManage = document.querySelector('.manage__container');
					// const containerManageTop = containerManage.getBoundingClientRect().top;
					// console.log("Manage соответствует" + containerManageTop);
					// if (containerManageTop <= 60) {
					// 	header.classList.add('head-hidden');
					// 	console.log('Manage Top меньше 60 Добавил hidden');
					// }else {
					// 	header.classList.remove('head-hidden');
					// 	console.log('Manage Top больше 60 Удалил hidden');
					// }

					// sectionManage.addEventListener('scroll', function() {
					// 	const containerManageTop = containerManage.getBoundingClientRect().top;
					// 	if (containerManageTop <= 60) {
					// 		header.classList.add('head-hidden');
					// 		console.log("Manage Сработал Scroll < 60 - добавил hidden");
					// 	} else {
					// 		header.classList.remove('head-hidden');
					// 		console.log("Manage Сработал Scroll > 60 - удалил hidden");
					// 	}
					// })
				}
			
				// ===== OPTIONS =================
			
				if (section.classList.contains("options") && section.classList.contains("active-section")) {
					// ToogleHeader(document.querySelector(".options"));
					// if (window.matchMedia("(min-width: 769px) and (max-width: 1200px)").matches) {
					// 	const manage = document.querySelector('.manage');
					// 	manage.scrollTop = 0;
					// }
				// 			const sectionOptions = document.querySelector(".options");
				// 			const containerOptions = document.querySelector('.options__container');
				// 			const containerOptionsTop = containerOptions.getBoundingClientRect().top;
				// 			console.log("Options соответствует" + containerOptionsTop);
				// 			if (containerOptionsTop <= 60) {
				// 				header.classList.add('head-hidden');
				// 				console.log('Options Top меньше 60 Добавил hidden');
				// 			}else {
				// 				header.classList.remove('head-hidden');
				// 				console.log('Options Top больше 60 Удалил hidden');
				// 			}

						

				// 			sectionOptions.addEventListener('scroll', function() {
				// 				const containerOptionsTop = containerOptions.getBoundingClientRect().top;
				// 				if (containerOptionsTop <= 60) {
				// 					header.classList.add('head-hidden');
				// 					console.log("Options Сработал Scroll < 60 - добавил hidden");
				// 				} else {
				// 					header.classList.remove('head-hidden');
				// 					console.log("Options Сработал Scroll > 60 - удалил hidden");
				// 				}
				// 		})
				}
			

				// ===== CUSTOM FIRST =================
				if (section.classList.contains("custom-first") && section.classList.contains("active-section")) {
					// ToogleHeader(document.querySelector(".custom-first"));
				// 		const sectionCustumFirst = document.querySelector(".custom-first");
				// 		const containerCustumFirst = document.querySelector('.custom-first__container');
				// 		const containerCustumFirstTop = containerCustumFirst.getBoundingClientRect().top;
				// 		console.log(containerCustumFirstTop);
				// 		if (containerCustumFirstTop < 60) {
				// 			header.classList.add('head-hidden');
				// 		}else {
				// 			header.classList.remove('head-hidden');
				// 		}

						
				// 		sectionCustumFirst.addEventListener('scroll', function() {
				// 				const containerCustumFirstTop = containerCustumFirst.getBoundingClientRect().top;
				// 				if (containerCustumFirstTop < 80) {
				// 					header.classList.add('head-hidden');
				// 				} else {
				// 					// header.classList.remove('head-hidden');
				// 				}
				// 		})
				}

				// ===== CUSTOM SECOND =================
				if (section.classList.contains("custom-second") && section.classList.contains("active-section")) {
					// ToogleHeader(document.querySelector(".custom-second"));
				// 		const sectionCustumSecond = document.querySelector(".custom-second");
				// 			const containerCustumSecond = document.querySelector('.custom-second__container');
				// 			const containerCustumSecondTop = containerCustumSecond.getBoundingClientRect().top;
				// 			console.log(containerCustumSecondTop);
				// 			if (containerCustumSecondTop < 60) {
				// 				header.classList.add('head-hidden');
				// 			}else {
				// 				header.classList.remove('head-hidden');
				// 			}
						
				// 			sectionCustumSecond.addEventListener('scroll', function() {
				// 				const containerCustumSecondTop = containerCustumSecond.getBoundingClientRect().top;
				// 				if (containerCustumSecondTop < 80) {
				// 					header.classList.add('head-hidden');
				// 				} else {
				// 					// header.classList.remove('head-hidden');
				// 				}
				// 		})
				}
				
				if (!section.classList.contains("manage") && section.classList.contains("active-section")) {
						animationManageAmount.stop();
						animationManageGraphic.stop();
						animationManageTransct.stop();
				}
				
  			if (section.classList.contains('api') && section.classList.contains('active-section')) {
						
					header.classList.remove('head-hidden');


					apiTyping.style.visibility = "hidden";
					setTimeout(() => {
						apiTyping.style.visibility = "visible";
					}, 700);

  			  if(!$is_typed_call){
					let timerId =	setTimeout(function() {
							var typed = new Typed('#typed', {
								stringsElement: '#typed-strings',
								typeSpeed: 0,
								loop: false,
								loopCount: Infinity,
								showCursor: false,
							});
						}, 700);
							$is_typed_call = true;
  			  }
  			}

				function addAnim() {
					if (section.classList.contains('request') && section.classList.contains('active-section')) {
						requestSection.classList.add('_anim-start');
						setTimeout(addAnim, 13100);
					}
				}
				function removeAnim() {
					if (section.classList.contains('request') && section.classList.contains('active-section')) {
						requestSection.classList.remove('_anim-start');
						setTimeout(removeAnim, 13000);
					}
				}
				setTimeout(addAnim, 13100);
				setTimeout(removeAnim, 13000);
  			
				if (section.classList.contains('request') && section.classList.contains('active-section')) {
					requestSection.classList.add('_anim-start');
				}
				if (!section.classList.contains('request') && section.classList.contains('active-section')) {
					requestSection.classList.remove('_anim-start');
				} 

			} else {
				section.style.opacity = '0';
				section.style.pointerEvents = 'none';
				//section.style.visibility = 'hidden'

			}
		}
	}
	//===============================
	// Видалення стилів
	removeStyle() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			section.style.opacity = '';
			section.style.visibility = '';
			section.style.transform = '';
		}
	}
	//===============================
	// Функція перевірки чи повністю було прокручено елемент
	checkScroll(yCoord, element) {
		this.goScroll = false;

		// Чи є елемент і чи готовий до роботи 
		if (!this.stopEvent && element) {
			this.goScroll = true;
			// Якщо висота секції не дорівнює висоті вікна
			if (this.haveScroll(element)) {
				this.goScroll = false;
				const position = Math.round(element.scrollHeight - element.scrollTop);
				// Перевірка на те, чи повністю прокручена секція
				if (
					((Math.abs(position - element.scrollHeight) < 2) && yCoord <= 0) ||
					((Math.abs(position - element.clientHeight) < 2) && yCoord >= 0)
				) {
					this.goScroll = true;
				}
			}
		}
	}
	//===============================
	// Перевірка висоти 
	haveScroll(element) {
		return element.scrollHeight !== window.innerHeight
	}
	//===============================
	// Видалення класів 
	removeClasses() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			section.classList.remove(this.options.activeClass);
			section.classList.remove(this.options.previousClass);
			section.classList.remove(this.options.nextClass);
		}
	}
	//===============================
	// Збірник подій...
	events() {
		this.events = {
			// Колесо миші
			wheel: this.wheel.bind(this),

			// Свайп
			touchdown: this.touchDown.bind(this),
			touchup: this.touchUp.bind(this),
			touchmove: this.touchMove.bind(this),
			touchcancel: this.touchUp.bind(this),

			// Кінець анімації
			transitionEnd: this.transitionend.bind(this),

			// Клік для буллетів
			// click: this.clickBullets.bind(this),

			// Клік по блоку choose your path:
			clickblock: this.clickBlock.bind(this),


		}

		if (isMobile.iOS()) {
			document.addEventListener('touchmove', (e) => {
				e.preventDefault();
			});
		}
	
		//===============================
		// перемикання слайдів choose your path:
		const chooseBlocks = document.querySelectorAll('.choose__block');
		for (let index = 0; index < chooseBlocks.length; index++) {
			chooseBlocks[index].addEventListener("click", this.events.clickblock);
		}
		// --------------------------
		
		this.setEvents();
	}
	
	// перемикання слайдів choose your path:
	clickBlock(e) {
		this.switchingSection(6);
	}

	setEvents() {
		// Подія колеса миші
		this.wrapper.addEventListener('wheel', this.events.wheel);
		// Подія натискання на екран
		this.wrapper.addEventListener('touchstart', this.events.touchdown);
		// Подія кліка по булетах
		if (this.options.bullets && this.bulletsWrapper) {
			this.bulletsWrapper.addEventListener('click', this.events.click);
		}
	}
	removeEvents() {
		this.wrapper.removeEventListener('wheel', this.events.wheel);
		this.wrapper.removeEventListener('touchdown', this.events.touchdown);
		this.wrapper.removeEventListener('touchup', this.events.touchup);
		this.wrapper.removeEventListener('touchcancel', this.events.touchup);
		this.wrapper.removeEventListener('touchmove', this.events.touchmove);
		if (this.bulletsWrapper) {
			this.bulletsWrapper.removeEventListener('click', this.events.click);
		}
	}
	//===============================
	// Функція кліка по булетах
	// clickBullets(e) {
	// 	// Натиснутий буллет
	// 	const bullet = e.target.closest(`.${this.options.bulletClass}`);
	// 	if (bullet) {
	// 		// Масив усіх буллетів
	// 		const arrayChildren = Array.from(this.bulletsWrapper.children);

	// 		// id Натиснутого буллета
	// 		const idClickBullet = arrayChildren.indexOf(bullet)

	// 		// Перемикання секції
	// 		this.switchingSection(idClickBullet)
	// 	}
	// }
	
	//===============================
	// Установка стилів для буллетів
	// setActiveBullet(idButton) {
	// 	if (!this.bulletsWrapper) return
	// 	// Усі буллети
	// 	const bullets = this.bulletsWrapper.children;

	// 	for (let index = 0; index < bullets.length; index++) {
	// 		const bullet = bullets[index];
	// 		if (idButton === index) bullet.classList.add(this.options.bulletActiveClass);
	// 		else bullet.classList.remove(this.options.bulletActiveClass);
	// 	}
	// }
	//===============================
	
	// Функція натискання тач/пера/курсора
	touchDown(e) {
		// Змінна для свайпа
		this._yP = e.changedTouches[0].pageY;
		this._eventElement = e.target.closest(`.${this.options.activeClass}`);
		if (this._eventElement) {
			// Вішаємо подію touchmove та touchup
			this._eventElement.addEventListener('touchend', this.events.touchup);
			this._eventElement.addEventListener('touchcancel', this.events.touchup);
			this._eventElement.addEventListener('touchmove', this.events.touchmove);
			// Тач стався
			this.clickOrTouch = true;

			//==============================
			if (isMobile.iOS()) {
				if (this._eventElement.scrollHeight !== this._eventElement.clientHeight) {
					if (this._eventElement.scrollTop === 0) {
						this._eventElement.scrollTop = 1;
					}
					if (this._eventElement.scrollTop === this._eventElement.scrollHeight - this._eventElement.clientHeight) {
						this._eventElement.scrollTop = this._eventElement.scrollHeight - this._eventElement.clientHeight - 1;
					}
				}
				this.allowUp = this._eventElement.scrollTop > 0;
				this.allowDown = this._eventElement.scrollTop < (this._eventElement.scrollHeight - this._eventElement.clientHeight);
				this.lastY = e.changedTouches[0].pageY;
			}
			//===============================

		}


	}
	//===============================
	// Подія руху тач/пера/курсора
	touchMove(e) {
		// Отримання секції, на якій спрацьовує подію
		const targetElement = e.target.closest(`.${this.options.activeClass}`);
		//===============================
		if (isMobile.iOS()) {
			let up = e.changedTouches[0].pageY > this.lastY;
			let down = !up;
			this.lastY = e.changedTouches[0].pageY;
			if (targetElement) {
				if ((up && this.allowUp) || (down && this.allowDown)) {
					e.stopPropagation();
				} else if (e.cancelable) {
					e.preventDefault();
				}
			}
		}
		//===============================
		// Перевірка на завершення анімації та наявність НЕ ПОДІЙНОГО блоку
		if (!this.clickOrTouch || e.target.closest(this.options.noEventSelector)) return
		// Отримання напряму руху
		let yCoord = this._yP - e.changedTouches[0].pageY;
		// Чи дозволено перехід? 
		this.checkScroll(yCoord, targetElement);
		// Перехід
		if (this.goScroll && Math.abs(yCoord) > 20) { // было 20 (29.03.23)
			this.choiceOfDirection(yCoord);
		}
	}
	//===============================
	// Подія відпускання від екрану тач/пера/курсора
	touchUp(e) {
		// Видалення подій
		this._eventElement.removeEventListener('touchend', this.events.touchup);
		this._eventElement.removeEventListener('touchcancel', this.events.touchup);
		this._eventElement.removeEventListener('touchmove', this.events.touchmove);
		return this.clickOrTouch = false;
	}
	//===============================
	// Кінець спрацьовування переходу
	transitionend(e) {
		//if (e.target.closest(this.options.selectorSection)) {
			this.stopEvent = false;
			document.documentElement.classList.remove(this.options.wrapperAnimatedClass);
			this.wrapper.classList.remove(this.options.wrapperAnimatedClass);
			//}
	}
	//===============================
	// Подія прокручування колесом миші
	wheel(e) {
		// Перевірка на наявність НЕ ПОДІЙНОГО блоку
		if (e.target.closest(this.options.noEventSelector)) return
		// Отримання напряму руху
		const yCoord = e.deltaY;
		// Отримання секції, на якій спрацьовує подію
		const targetElement = e.target.closest(`.${this.options.activeClass}`);
		// Чи дозволено перехід? 
		this.checkScroll(yCoord, targetElement);
		// Перехід
		if (this.goScroll) this.choiceOfDirection(yCoord);
	}
	// Функція вибору напряму
	//===============================
	// choiceOfDirection(direction) {
		// Зупиняємо роботу подій
	// 	this.stopEvent = true;

		// Якщо слайд крайні, то дозволяємо події
	// 	if (((this.activeSectionId === 0) && direction < 0) || ((this.activeSectionId === (this.sections.length - 1)) && direction > 0)) {
	// 		this.stopEvent = false;
	// 	}

		// Встановлення потрібних id
	// 	if (direction > 0 && this.nextSection !== false) {
	// 		this.activeSectionId = (this.activeSectionId + 1) < this.sections.length ?
	// 			++this.activeSectionId : this.activeSectionId;
	// 	} else if (direction < 0 && this.previousSection !== false) {
	// 		this.activeSectionId = (this.activeSectionId - 1) >= 0 ?
	// 			--this.activeSectionId : this.activeSectionId;
	// 	}

			// Зміна слайдів
	// 	if (this.stopEvent) this.switchingSection();
	// }

	//===============================
	// Функція вибору напряму
	choiceOfDirection(direction) {
		// Встановлення потрібних id
		if (direction > 0 && this.nextSection !== false) {
			this.activeSectionId = (this.activeSectionId + 1) < this.sections.length ?
				++this.activeSectionId : this.activeSectionId;
		} else if (direction < 0 && this.previousSection !== false) {
			this.activeSectionId = (this.activeSectionId - 1) >= 0 ?
				--this.activeSectionId : this.activeSectionId;
		}
		// Зміна слайдів
		this.switchingSection(this.activeSectionId, direction);
	}

	//===============================
	// Функція перемикання слайдів
	// switchingSection(idSection = this.activeSectionId) {
	
	// 	this.activeSectionId = idSection;
	// 	// Встановлення події закінчення програвання анімації
	// 	this.wrapper.classList.add(this.options.wrapperAnimatedClass);
	// 	this.wrapper.addEventListener('transitionend', this.events.transitionEnd);
	// 	// Видалення класів
	// 	this.removeClasses();
	// 	// Зміна класів 
	// 	this.setClasses();
	// 	// Зміна стилів
	// 	this.setStyle();
	// 	// Встановлення стилів для буллетів
	// 	if (this.options.bullets) this.setActiveBullet(this.activeSectionId);
	// 	// Створення події
	// 	this.options.onSwitching(this);
	// 	document.dispatchEvent(new CustomEvent("fpswitching", {
	// 		detail: {
	// 			fp: this
	// 		}
	// 	}));
	// }

	switchingSection(idSection = this.activeSectionId, direction) {
		if (!direction) {
			if (idSection < this.activeSectionId) {
				direction = -100;
			} else if (idSection > this.activeSectionId) {
				direction = 100;
			}
		}

		this.activeSectionId = idSection;

		// Зупиняємо роботу подій
		this.stopEvent = true;
		// Якщо слайд крайні, то дозволяємо події
		if (((this.previousSectionId === false) && direction < 0) || ((this.nextSectionId === false) && direction > 0)) {
			this.stopEvent = false;
		}

		if (this.stopEvent) {
			// Встановлення події закінчення програвання анімації
			document.documentElement.classList.add(this.options.wrapperAnimatedClass);
			this.wrapper.classList.add(this.options.wrapperAnimatedClass);
			//this.wrapper.addEventListener('transitionend', this.events.transitionEnd);
			// Видалення класів
			this.removeClasses();
			// Зміна класів 
			this.setClasses();
			// Зміна стилів
			this.setStyle();
			// Встановлення стилів для буллетів
			if (this.options.bullets) this.setActiveBullet(this.activeSectionId);

			// Встановлюємо затримку перемикання
			// Додаємо класи напрямку руху
			// let delaySection;
			if (direction < 0) {
				// delaySection = this.activeSection.dataset.fpDirectionUp ? parseInt(this.activeSection.dataset.fpDirectionUp) : 500;
				document.documentElement.classList.add('fp-up');
				document.documentElement.classList.remove('fp-down');
			} else {
				// delaySection = this.activeSection.dataset.fpDirectionDown ? parseInt(this.activeSection.dataset.fpDirectionDown) : 500;
				document.documentElement.classList.remove('fp-up');
				document.documentElement.classList.add('fp-down');
			}

			// setTimeout(() => {
				this.events.transitionEnd();
			// }, delaySection);


			// Створення події
			this.options.onSwitching(this);
			document.dispatchEvent(new CustomEvent("fpswitching", {
				detail: {
					fp: this
				}
			}));
		}
	}
	//===============================
	// Установка буллетов
	// setBullets() {
	// 	// Поиск оболочки буллетов
	// 	this.bulletsWrapper = document.querySelector(`.${this.options.bulletsClass}`);

	// 	// Если нету создаем
	// 	if (!this.bulletsWrapper) {
	// 		const bullets = document.createElement('div');
	// 		bullets.classList.add(this.options.bulletsClass);
	// 		this.wrapper.append(bullets);
	// 		this.bulletsWrapper = bullets;
	// 	}

	// 	// Создание буллетов
	// 	if (this.bulletsWrapper) {
	// 		for (let index = 0; index < this.sections.length; index++) {
	// 			const span = document.createElement('span');
	// 			span.classList.add(this.options.bulletClass);
	// 			this.bulletsWrapper.append(span);
	// 		}
	// 	}
	// }
	//===============================
	// Z-INDEX
	setZIndex() {
		let zIndex = this.sections.length
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			section.style.zIndex = zIndex;
			--zIndex;
		}
	}
	removeZIndex() {
		for (let index = 0; index < this.sections.length; index++) {
			const section = this.sections[index];
			section.style.zIndex = ''
		}
	}
}
// Запускаємо та додаємо в об'єкт модулів
if (document.querySelector('[data-fp]')) {
	flsModules.fullpage = new FullPage(document.querySelector('[data-fp]'), '');
}
document.addEventListener('fpswitching', function(e) {
  // // if (e.detail.fp.activeSection.classList.contains("manage")){
	// // 	e.detail.fp.activeSection.dispatchEvent(new Event('scroll'));
  // // }
  // if (e.detail.fp.activeSection.classList.contains("options")){
	// 	// e.detail.fp.activeSection.dispatchEvent(new Event('scroll'));
	// 	document.querySelector(".manage").scrollTop = 0;
  // }
  // if (e.detail.fp.activeSection.classList.contains("custom-first")){
	// 	// e.detail.fp.activeSection.dispatchEvent(new Event('scroll'));
	// 	document.querySelector(".options").scrollTop = 0;
  // }
  // if (e.detail.fp.activeSection.classList.contains("custom-second")){
	// 	// e.detail.fp.activeSection.dispatchEvent(new Event('scroll'));
	// 	document.querySelector(".custom-first").scrollTop = 0;
  // }
  // if (e.detail.fp.activeSection.classList.contains("api")){
	// 	// e.detail.fp.activeSection.dispatchEvent(new Event('scroll'));
	// 	document.querySelector(".custom-second").scrollTop = 0;
  // }
	var pel = e.detail.fp.previousSection;
	var ael = e.detail.fp.activeSection;
	var nel = e.detail.fp.nextSection;
	document.querySelector(".header").classList.remove("head-hidden");
	if (ael.classList.contains("manage")) {
		ael.addEventListener("scroll", ToogleHeader);
	}else if (ael.classList.contains("api")) {
		pel.removeEventListener("scroll", ToogleHeader);
		setTimeout(() => {
			pel.scrollTop = 0;
			nel.scrollTop = 0;
		}, 500);
		
	}else if(ael.classList.contains("options") || ael.classList.contains("custom-first") || ael.classList.contains("custom-second")){
		nel.removeEventListener("scroll", ToogleHeader);
		pel.removeEventListener("scroll", ToogleHeader);
		setTimeout(() => {
			pel.scrollTop = 0;
			nel.scrollTop = 0;
		}, 500);
		ael.addEventListener("scroll", ToogleHeader);
	}
})