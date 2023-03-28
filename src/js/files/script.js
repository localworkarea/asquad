// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";


// Очистити поля форми ====================

const resetBtn = document.querySelectorAll('.reset-btn');

resetBtn.forEach(item => {
  item.addEventListener("click", resetInput);
});
function resetInput() {
  document.querySelectorAll('form')[1].reset();
  document.querySelectorAll('form')[0].reset();
  const formItems =  document.querySelectorAll('.form__item');
  formItems.forEach(item => {
    item.classList.remove('_show-reset-btn');
  });
}

// import intlTelInput from 'intl-tel-input';

// const input = document.querySelector("#phone");
// intlTelInput(input, {
//   placeholderNumberType: "MOBILE",
//       preferredCountries: ['ua', 'us'],
//       separateDialCode: true,
// });
// const input2 = document.querySelector("#phone_2");
// intlTelInput(input2, {
//   placeholderNumberType: "MOBILE",
//   preferredCountries: ['ua', 'us'],
//   separateDialCode: true,
// });

// const productSection = document.querySelector('.product');
// const productWrapper = document.querySelector('.product__wrapper');
// const productBody = document.querySelector('.product__body');
// let leftBodyPosition = 0;
// if (productSection.classList.contains('active-section')) {
//   productWrapper.onwheel = function(event) {
//     let deltaEv = event.deltaY;
//     leftBodyPosition = leftBodyPosition - 0.8*deltaEv;
//     productBody.style.left = leftBodyPosition + 'px';
    
//     if (leftBodyPosition > '-1') {
//       // productBody.style.left = 0;
//     }
//     return false;
//   };
// } 


// BUTTONS HOVER - LOTTIE JSON ----------------------------------
const menuBtn = document.querySelector('.menu__btn');
const lottieBtnDemo = document.querySelector('.lottie__btn-demo');
const animBtnDemo = bodymovin.loadAnimation({
    container: document.querySelector('.lottie__btn-demo'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'files/btn_demo.json',
});

if (menuBtn) {
    menuBtn.addEventListener("mouseenter", function() {
        animBtnDemo.play();
        lottieBtnDemo.style.opacity = '1';
    });
    menuBtn.addEventListener("mouseleave", function() {
        animBtnDemo.stop();
        lottieBtnDemo.style.opacity = '0';
    });
}

const requestBtn = document.querySelector('.text-block__btn');
const lottieBtnReq = document.querySelector('.lottie__btn-request');

const animBtnReq = bodymovin.loadAnimation({
    container: document.querySelector('.lottie__btn-request'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'files/btn_request.json',
});
if (requestBtn) {
    requestBtn.addEventListener("mouseenter", function() {
        animBtnReq.play();
        lottieBtnReq.style.opacity = '1';
    });
    requestBtn.addEventListener("mouseleave", function() {
        animBtnReq.stop();
        lottieBtnReq.style.opacity = '0';
    });
}



const formBtn = document.querySelectorAll('.form-btn');

const lottieBtnFormLater = document.querySelector('.lottie__btn-later');
const lottieBtnFormLaterTwo = document.querySelector('.lottie__btn-later-two');
const lottieBtnFormSubm = document.querySelector('.lottie__btn-submit');
const lottieBtnFormSubmTwo = document.querySelector('.lottie__btn-submit-two');
const lottieBtnFormClose = document.querySelector('.lottie__btn-close');



const animBtnFormLater = bodymovin.loadAnimation({
    container: document.querySelector('.lottie__btn-later'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'files/btn_later.json',
});
const animBtnFormLaterTwo = bodymovin.loadAnimation({
    container: document.querySelector('.lottie__btn-later-two'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'files/btn_later.json',
});
const animBtnFormSubmTwo = bodymovin.loadAnimation({
    container: document.querySelector('.lottie__btn-submit-two'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'files/btn_submit.json',
});
const animBtnFormSubm = bodymovin.loadAnimation({
    container: document.querySelector('.lottie__btn-submit'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'files/btn_submit.json',
});
const animBtnFormClose = bodymovin.loadAnimation({
    container: document.querySelector('.lottie__btn-close'),
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'files/btn_close.json',
});

if (formBtn) {
    formBtn.forEach(formBtn => {
        if (formBtn.classList.contains('btn-gray-light')) {
            formBtn.addEventListener("mouseenter", function() {
                animBtnFormLater.play();
                lottieBtnFormLater.style.opacity = '1';
            });
            formBtn.addEventListener("mouseleave", function() {
                animBtnFormLater.stop();
                lottieBtnFormLater.style.opacity = '0';
            });
        }
        if (formBtn.classList.contains('btn-later-two')) {
            formBtn.addEventListener("mouseenter", function() {
                animBtnFormLaterTwo.play();
                lottieBtnFormLaterTwo.style.opacity = '1';
            });
            formBtn.addEventListener("mouseleave", function() {
                animBtnFormLaterTwo.stop();
                lottieBtnFormLaterTwo.style.opacity = '0';
            });
        }
        if (formBtn.classList.contains('btn-black')) {
            formBtn.addEventListener("mouseenter", function() {
                animBtnFormSubm.play();
                lottieBtnFormSubm.style.opacity = '1';
            });
            
            formBtn.addEventListener("mouseleave", function() {
                animBtnFormSubm.stop();
                lottieBtnFormSubm.style.opacity = '0';
            });
        }
        if (formBtn.classList.contains('btn-submit-two')) {
            formBtn.addEventListener("mouseenter", function() {
                animBtnFormSubmTwo.play();
                lottieBtnFormSubmTwo.style.opacity = '1';
            });
            
            formBtn.addEventListener("mouseleave", function() {
                animBtnFormSubmTwo.stop();
                lottieBtnFormSubmTwo.style.opacity = '0';
            });
        }
        if (formBtn.classList.contains('btn-close')) {
            formBtn.addEventListener("mouseenter", function() {
                animBtnFormClose.play();
                lottieBtnFormClose.style.opacity = '1';
            });
            
            formBtn.addEventListener("mouseleave", function() {
                animBtnFormClose.stop();
                lottieBtnFormClose.style.opacity = '0';
            });
        }
    });
}