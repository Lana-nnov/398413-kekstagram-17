'use strict';
(function () {
  var popup = document.querySelector('.img-upload__overlay');
  var popupClose = popup.querySelector('.img-upload__cancel');
  var levelFieldset = popup.querySelector('.img-upload__effect-level');
  var userCommentTextarea = popup.querySelector('.text__description');
  var hashtag = popup.querySelector('.text__hashtags');
  var imgSize = popup.querySelector('.scale__control--value');
  var fieldsetElement = popup.querySelector('.img-upload__effects');
  var ESC_KEYCODE = 27;

  // функция для открытия и закрытия всплывающего окна - редактирования фото

  var onPopupEscPress = function (evt) {
    var isFocused = (document.activeElement === userCommentTextarea || document.activeElement === hashtag);
    if (evt.keyCode === ESC_KEYCODE && !isFocused) {
      onButtonClose();
    }
  };

  window.openPopup = function () {
    popup.classList.remove('hidden');
    imgSize.value = '100%';
    document.addEventListener('keydown', onPopupEscPress);
    levelFieldset.classList.add('hidden');
  };

  var onButtonClose = function () {
    popup.classList.add('hidden');
    document.removeEventListener('kewdown', onPopupEscPress);
  };

  // закрываем popup
  popupClose.addEventListener('click', onButtonClose);

  // выбираем фильтры
  fieldsetElement.addEventListener('change', function () {
    window.applyFilter(100);
  });
})();
