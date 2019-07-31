'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var ESC_KEYCODE = 27;

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
  var onSectionEscPress = function (evt, fn) {
    if (evt.keyCode === ESC_KEYCODE) {
      fn();
    }
  };

  window.util = {
    debounce: debounce,
    onSectionEscPress: onSectionEscPress
  };
})();
