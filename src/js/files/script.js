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
  document.querySelector('.form').reset();
}


// Can also be included with a regular script tag
import Typed from 'typed.js';

var $is_typed_call = false;
document.addEventListener("watcherCallback", function(e) {
  if (e.detail.entry.target.classList.contains('api') && e.detail.entry.isIntersecting) {
    if(!$is_typed_call){
      var typed = new Typed('#typed', {
        stringsElement: '#typed-strings',
        typeSpeed: 5,
        loop: false,
        loopCount: Infinity,
        showCursor: false,
      });
      $is_typed_call = true;
    }
  }
});



import intlTelInput from 'intl-tel-input';

const input = document.querySelector("#phone");
intlTelInput(input, {
    // any initialisation options go here
    singleDialCode: true,
    preferenceCountries: ["us", "gb", "ua"],
});
const input2 = document.querySelector("#phone_2");
intlTelInput(input2, {
    // any initialisation options go here
    singleDialCode: true,
    preferenceCountries: ["us", "gb", "ua"],
});

