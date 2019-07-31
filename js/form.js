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
  var userCommentTextarea = popup.querySelector('.text__description');

  var addEscPress = function () {
    document.addEventListener('keydown', onEscPress);
  };

  var removeEscPress = function () {
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    window.util.onSectionEscPress(evt, onFormEscPress);
  };

  var onFormEscPress = function () {
    var isFocused = (document.activeElement === userCommentTextarea || document.activeElement === hashtag);
    if (!isFocused) {
      closePopup();
    }
  };

  var openPopup = function () {
    popup.classList.remove('hidden');
    imgSize.value = MAX_SCALE + '%';
    addEscPress();
    levelFieldset.classList.add('hidden');
  };

  // сброс значений для формы
  var resetForm = function () {
    form.reset();
    imgPreview.style = '';
    imgPreviewContainer.style = '';
    hashtag.style = '';
    hashtag.setCustomValidity('');
    buttonSubmit.disabled = false;
  };

  var onButtonClose = function () {
    closePopup();
  };

  var closePopup = function () {
    popup.classList.add('hidden');
    resetForm();
    removeEscPress();
  };

  // закрываем popup
  popupClose.addEventListener('click', onButtonClose);

  // выбираем фильтры
  fieldsetElement.addEventListener('change', function () {
    window.filter.apply(MAX_SCALE);
  });

  window.form = {
    openPopup: openPopup,
    reset: resetForm
  };
})();
