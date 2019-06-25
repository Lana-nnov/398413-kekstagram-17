'use strict';
(function () {
  // открытие и закрытие поля редактирования фотографии
  var popup = document.querySelector('.img-upload__overlay');
  var uploadFileElement = document.querySelector('.img-upload__start');
  var popupClose = popup.querySelector('.img-upload__cancel');
  var levelFieldset = popup.querySelector('.img-upload__effect-level');
  var userCommentTextarea = popup.querySelector('.text__description');
  var imgSize = popup.querySelector('.scale__control--value');
  var ESC_KEYCODE = 27;
  window.form = {
    popup: popup,
    imgSize: imgSize,
    levelFieldset: levelFieldset
  };

  // функция для открытия и закрытия всплывающего окна - редактирования фото

  var onPopupEscPress = function (evt) {
    var isFocused = (document.activeElement === userCommentTextarea);
    if (evt.keyCode === ESC_KEYCODE && !isFocused) {
      onButtonClose();
    }
  };

  var onImageChange = function () {
    popup.classList.remove('hidden');
    imgSize.value = '100%';
    document.addEventListener('keydown', onPopupEscPress);
    levelFieldset.classList.add('hidden');
  };

  var onButtonClose = function () {
    popup.classList.add('hidden');
    document.removeEventListener('kewdown', onPopupEscPress);
  };

  // открываем и закрываем popup
  uploadFileElement.addEventListener('change', onImageChange);
  popupClose.addEventListener('click', onButtonClose);
})();
