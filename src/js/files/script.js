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



// Can also be included with a regular script tag
import Typed from 'typed.js';

var $is_typed_call = false;
document.addEventListener("watcherCallback", function(e) {
  if (e.detail.entry.target.classList.contains('api') && e.detail.entry.isIntersecting) {
    if(!$is_typed_call){
      var typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        typeSpeed: 3,
        loop: false,
        loopCount: Infinity,
        showCursor: false,
      });
      $is_typed_call = true;
    }
  }
});



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
