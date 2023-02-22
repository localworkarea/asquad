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

