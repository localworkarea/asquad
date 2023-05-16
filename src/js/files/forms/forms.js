// Підключення функціоналу "Чертоги Фрілансера"
// Підключення списку активних модулів
import { flsModules } from "../modules.js";
// Допоміжні функції
import { isMobile, _slideUp, _slideDown, _slideToggle, FLS } from "../functions.js";
// Модуль прокручування до блоку
import { gotoBlock } from "../scroll/gotoblock.js";
//================================================================================================================================================================================================================================================================================================================================

/*
Документація: https://template.fls.guru/template-docs/rabota-s-formami.html
*/

// ВВод только слов/букв, кроме чисел и клавиатурных символов =============================
// let formNameInput = document.getElementById("formName");

// formNameInput.addEventListener('keydown', function(e){
//   if( e.key.match(/^[а-я][А-ЯёЁ][a-z][A-Z]+$/) ) return e.preventDefault();
// }); 
// formNameInput.addEventListener('input', function(e){
//     formNameInput.value = formNameInput.value.replace(/[\d\~\!\@\#\$\%\^\&\*\(\)\+\_\=\+\[\]\,\.\<\>\/\?\|\\\"\;\:]/g, "");
// }); 
// formNameInput.addEventListener('input', function(e){
//   // На случай, если умудрились ввести через копипаст или авто-дополнение.
//   formNameInput.value = formNameInput.value.replace(/^[а-я][А-ЯёЁ][a-z][A-Z]+$/g, "");
// });


// let formNameInputOne = document.getElementById("formName-1");

// formNameInputOne.addEventListener('keydown', function(e){
//     if( e.key.match(/^[а-я][А-ЯёЁ][a-z][A-Z]+$/) ) return e.preventDefault();
// });
// formNameInputOne.addEventListener('input', function(e){
//     formNameInputOne.value = formNameInputOne.value.replace(/[\d\~\!\@\#\$\%\^\&\*\(\)\+\_\=\+\[\]\,\.\<\>\/\?\|\\\"\;\:]/g, "");
// }); 
// formNameInputOne.addEventListener('input', function(e){
//     formNameInput.value = formNameInput.value.replace(/^[а-я][А-ЯёЁ][a-z][A-Z]+$/g, "");
// });

// ==========================================

document.getElementById("btn-part-submit").disabled = true;
document.getElementById("btn-req-submit").disabled = true;

// Робота із полями форми.
export function formFieldsInit(options = { viewPass: false, autoHeight: false }) {
	document.body.addEventListener("focusin", function (e) {
		const targetElement = e.target;
		
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.add('_form-focus');
				targetElement.parentElement.classList.add('_form-focus');
			}
			targetElement.hasAttribute('data-validate') ? formValidate.removeError(targetElement) : null;
		}


	});
	document.body.addEventListener("focusout", function (e) {
		const targetElement = e.target;
		if ((targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA')) {
			if (!targetElement.hasAttribute('data-no-focus-classes')) {
				targetElement.classList.remove('_form-focus');
				targetElement.parentElement.classList.remove('_form-focus');

			}
			// Миттєва валідація
			targetElement.hasAttribute('data-validate') ? formValidate.validateInput(targetElement) : null;
	
		}
	});

}
// Валідація форм
export let formValidate = {
	
	getErrors(form) {
		let error = 0;
		let formRequiredItems = form.querySelectorAll('*[data-required]');
		if (formRequiredItems.length) {
			formRequiredItems.forEach(formRequiredItem => {
				if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) {
					error += this.validateInput(formRequiredItem);
					// console.log("сработал getErrors");
				}
			});
		}

		return error;

	},
	validateInput(formRequiredItem) {
		let error = 0;
		if (formRequiredItem.dataset.required === "email") {
			formRequiredItem.value = formRequiredItem.value.replace(" ", "");
			if (this.emailTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			} 
			// проверка валидации поля с дата атрибутом website ----
		} else if (formRequiredItem.dataset.required === "website") {
			if (this.websiteTest(formRequiredItem)) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
			// ----------------------------------------------------------
		}  else if (formRequiredItem.dataset.required === "website"|| formRequiredItem.dataset.required === "email" || formRequiredItem.dataset.required === "phone") {
			if (((formRequiredItem.dataset.required === "website") === "" || (formRequiredItem.dataset.required === "email") === "" || (formRequiredItem.dataset.required === "phone") === "" )) {
				document.getElementById("btn-part-submit").disabled = true;
				document.getElementById("btn-req-submit").disabled = true;
				// console.log("Одно из полей не заполнено - исправить ошибку");
				// error++;
			} else {
				document.getElementById("btn-part-submit").disabled = false;
				document.getElementById("btn-req-submit").disabled = false;
				// console.log("Поля заполнены - можно отправлять");
			}
		
		} else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
			this.addError(formRequiredItem);
			error++;
		} else {
			if (!formRequiredItem.value.trim()) {
				this.addError(formRequiredItem);
				error++;
			} else {
				this.removeError(formRequiredItem);
			}
		}

		if (error == 0) {
			document.getElementById("btn-part-submit").disabled = false;
			document.getElementById("btn-req-submit").disabled = false;
			// console.log("Error == 0 можно отправлять");
		} else {
			document.getElementById("btn-part-submit").disabled = true;
			document.getElementById("btn-req-submit").disabled = true;
			// console.log("Error > 1 исправить ошибку");
		}

		return error;
	},
	addError(formRequiredItem) {

		const itemFormPhone = document.querySelectorAll('.item-form-phone');
    itemFormPhone.forEach(item => {
      item.classList.add("_form-error");
    });

		formRequiredItem.classList.add('_form-error');
		formRequiredItem.parentElement.classList.add('_form-error');
		let inputError = formRequiredItem.parentElement.querySelector('.form__error');
		if (inputError) formRequiredItem.parentElement.removeChild(inputError);
		if (formRequiredItem.dataset.error) {
			formRequiredItem.parentElement.insertAdjacentHTML('beforeend', `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
		}
	},
	removeError(formRequiredItem) {

		const itemFormPhone = document.querySelectorAll('.item-form-phone');
		itemFormPhone.forEach(item => {
      item.classList.remove("_form-error");
    });
		
		formRequiredItem.classList.remove('_form-error');
		formRequiredItem.parentElement.classList.remove('_form-error');
		if (formRequiredItem.parentElement.querySelector('.form__error')) {
			formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector('.form__error'));
		}
	},
	formClean(form) {
		form.reset();
		setTimeout(() => {
			let inputs = form.querySelectorAll('input,textarea');
			for (let index = 0; index < inputs.length; index++) {
				const el = inputs[index];
				el.parentElement.classList.remove('_form-focus');
				el.classList.remove('_form-focus');
				formValidate.removeError(el);
			}
			let checkboxes = form.querySelectorAll('.checkbox__input');
			if (checkboxes.length > 0) {
				for (let index = 0; index < checkboxes.length; index++) {
					const checkbox = checkboxes[index];
					checkbox.checked = false;
				}
			}
			if (flsModules.select) {
				let selects = form.querySelectorAll('.select');
				if (selects.length) {
					for (let index = 0; index < selects.length; index++) {
						const select = selects[index].querySelector('select');
						flsModules.select.selectBuild(select);
					}
				}
			}
		}, 0);
	},
	emailTest(formRequiredItem) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
	},
	websiteTest(formRequiredItem) {
		// Вариант 1) для проверки форматов 
		//  	www.google.com
		//  	http://www.google.com
		//  	mailto:somebody@google.com
		//  	somebody@google.com
		//  	www.url-with-querystring.com/?url=has-querystring
		// return !/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(formRequiredItem.value);

		// Вариант 2)  для проверки форматов:
		//    https://www.example.com
		//    http://www.example.com
		//    www.example.com
		//    example.com
		//    http://blog.example.com
		//    http://www.example.com/product
		//    http://www.example.com/products?id=1&page=2
		//    http://www.example.com#up
		//    http://255.255.255.255
		//    255.255.255.255
		//    http://www.site.com:8008
		// кроме вот этого, он не пройдет проверку:
	  //    http://invalid.com/perl.cgi?key= | http://web-site.com/cgi-bin/perl.cgi?key1=value1&key2

		return !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(formRequiredItem.value);
	}
}
/* Відправлення форм */
export function formSubmit() {
	const forms = document.forms;

	if (forms.length) {
		for (const form of forms) {
			form.addEventListener('submit', function (e) {
				const form = e.target;
				formSubmitAction(form, e);
			});
			form.addEventListener('reset', function (e) {
				const form = e.target;
				formValidate.formClean(form);
			});
		}
	}
	async function formSubmitAction(form, e) {
		const error = !form.hasAttribute('data-no-validate') ? formValidate.getErrors(form) : 0;
		if (error === 0) {
			const ajax = form.hasAttribute('data-ajax');
			if (ajax) { // Якщо режим ajax
				e.preventDefault();
				const formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
				const formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
				const formData = new FormData(form);

				form.classList.add('_sending');
				const response = await fetch(formAction, {
					method: formMethod,
					body: formData
				});
				if (response.ok) {
					let responseResult = await response.json();
					form.classList.remove('_sending');
					formSent(form, responseResult);
				} else {
					alert("Помилка");
					form.classList.remove('_sending');
				}
			} else if (form.hasAttribute('data-dev')) {	// Якщо режим розробки
				e.preventDefault();
				formSent(form);
			}
		} else {
			e.preventDefault();
			if (form.querySelector('._form-error') && form.hasAttribute('data-goto-error')) {
				const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : '._form-error';
				gotoBlock(formGoToErrorClass, true, 1000);
			}
		}
	}
	// Дії після надсилання форми
	function formSent(form, responseResult = ``) {
		// Створюємо подію відправлення форми
		document.dispatchEvent(new CustomEvent("formSent", {
			detail: {
				form: form
			}
		}));
		// Показуємо попап, якщо підключено модуль попапів 
		// та для форми вказано налаштування
		setTimeout(() => {
			if (flsModules.popup) {
				const popup = form.dataset.popupMessage;
				popup ? flsModules.popup.open(popup) : null;
			}
		}, 0);
		// Очищуємо форму
		formValidate.formClean(form);
	}
}