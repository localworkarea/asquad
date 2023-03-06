const chooseBlocks = document.querySelectorAll('.choose__block');
chooseBlocks.forEach(item => {
  item.addEventListener("click", function (event) {
    if (event.target.closest('.choose__block')) {
      // switchingSection();
      console.log("этот блок");

    }
  });
});