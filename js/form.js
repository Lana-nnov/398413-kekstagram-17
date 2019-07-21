'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var popup = document.querySelector('.img-upload__overlay');
  var popupClose = popup.querySelector('.img-upload__cancel');
  var levelFieldset = popup.querySelector('.img-upload__effect-level');
  var userCommentTextarea = popup.querySelector('.text__description');
  var hashtag = popup.querySelector('.text__hashtags');
  var imgSize = popup.querySelector('.scale__control--value');
  var fieldsetElement = popup.querySelector('.img-upload__effects');
  var form = document.querySelector('.img-upload__form');
  var imgPreviewContainer = popup.querySelector('.img-upload__preview');
  var imgPreview = imgPreviewContainer.querySelector('img');

  // функция для открытия и закрытия всплывающего окна - редактирования фото

  var onPopupEscPress = function (evt) {
    var isFocused = (document.activeElement === userCommentTextarea || document.activeElement === hashtag);
    if (evt.keyCode === ESC_KEYCODE && !isFocused) {
      onButtonClose();
    }
  };

  var openPopup = function () {
    popup.classList.remove('hidden');
    imgSize.value = '100%';
    document.addEventListener('keydown', onPopupEscPress);
    levelFieldset.classList.add('hidden');
  };

  // сброс значений для формы
  var resetForm = function () {
    form.reset();
    imgPreview.style.filter = 'none';
    imgPreviewContainer.style.transform = 'scale(1)';
  };

  var onButtonClose = function () {
    popup.classList.add('hidden');
    resetForm();
    document.removeEventListener('kewdown', onPopupEscPress);
  };

  // закрываем popup
  popupClose.addEventListener('click', onButtonClose);

  // выбираем фильтры
  fieldsetElement.addEventListener('change', function () {
    window.filter.applyFilter(100);
  });

  window.form = {
    openPopup: openPopup,
    resetForm: resetForm
  };
})();
