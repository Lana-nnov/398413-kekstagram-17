'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var ESC_KEYCODE = 27;
  var popup = document.querySelector('.img-upload__overlay');
  var userCommentTextarea = popup.querySelector('.text__description');
  var hashtag = popup.querySelector('.text__hashtags');

  var debounce = function (fn) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fn.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  };

  // функция для закрытия любого окна по нажатию клавиши ESC
  var onSectionEscPress = function (evt) {
    var sections = document.querySelectorAll('section');
    var isFocused = (document.activeElement === userCommentTextarea || document.activeElement === hashtag);
    if (evt.keyCode === ESC_KEYCODE) {
      sections.forEach(function (element) {
        if (element.classList.contains('success')) {
          window.serverStatus.close('success');
        } else if (element.classList.contains('error')) {
          window.serverStatus.close('error');
        } else if (element.classList.contains('overlay') && popup.classList.contains('hidden')) {
          window.bigphoto.close();
        } else if (element.classList.contains('img-upload') && !popup.classList.contains('hidden') && !isFocused) {
          window.form.closePopup();
        }
      });
    }
  };

  window.util = {
    debounce: debounce,
    onSectionEscPress: onSectionEscPress
  };
})();
