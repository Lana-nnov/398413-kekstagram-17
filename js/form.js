'use strict';
(function () {
  var MAX_SCALE = 100;
  var popup = document.querySelector('.img-upload__overlay');
  var popupClose = popup.querySelector('.img-upload__cancel');
  var levelFieldset = popup.querySelector('.img-upload__effect-level');
  var hashtag = popup.querySelector('.text__hashtags');
  var imgSize = popup.querySelector('.scale__control--value');
  var fieldsetElement = popup.querySelector('.img-upload__effects');
  var form = document.querySelector('.img-upload__form');
  var imgPreviewContainer = popup.querySelector('.img-upload__preview');
  var imgPreview = imgPreviewContainer.querySelector('img');
  var buttonSubmit = form.querySelector('.img-upload__submit');

  var openPopup = function () {
    popup.classList.remove('hidden');
    imgSize.value = '100%';
    document.addEventListener('keydown', window.util.onSectionEscPress);
    levelFieldset.classList.add('hidden');
  };

  // сброс значений для формы
  var resetForm = function () {
    form.reset();
    imgPreview.style.filter = 'none';
    imgPreviewContainer.style.transform = 'scale(1)';
    hashtag.style.border = 'none';
    hashtag.setCustomValidity('');
    buttonSubmit.disabled = false;
  };

  var onButtonClose = function () {
    closePopup();
  };

  var closePopup = function () {
    popup.classList.add('hidden');
    resetForm();
    document.removeEventListener('kewdown', window.util.onSectionEscPress);
  };

  // закрываем popup
  popupClose.addEventListener('click', onButtonClose);

  // выбираем фильтры
  fieldsetElement.addEventListener('change', function () {
    window.filter.apply(MAX_SCALE);
  });

  window.form = {
    openPopup: openPopup,
    closePopup: closePopup,
    reset: resetForm
  };
})();
