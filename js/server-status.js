'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var mainPage = document.querySelector('main');
  var popup = document.querySelector('.img-upload__overlay');
  var form = document.querySelector('.img-upload__form');
  var imgPreviewContainer = popup.querySelector('.img-upload__preview');
  var imgPreview = imgPreviewContainer.querySelector('img');

  // в случае с успешной отправкой формы показываем сообщение, что все отправлено
  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

  // находим блок с сообщением об ошибке
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var resetForm = function () {
    form.reset();
    imgPreview.style.filter = 'none';
    imgPreviewContainer.style.transform = 'scale(1)';
  };

  var responseData = function () {
    popup.classList.add('hidden');
    var successElement = successTemplate.cloneNode(true);
    mainPage.appendChild(successElement);
    resetForm();
    successElement.addEventListener('click', function () {
      onSectionClick('success');
    });
    document.addEventListener('keydown', onSectionEscPress);
  };

  var showErrorOfLoad = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__buttons > button:last-child').classList.add('hidden');
    errorElement.querySelector('.error__title').textContent = message;
    mainPage.appendChild(errorElement);
    errorElement.addEventListener('click', function () {
      onSectionClick('error');
    });
    document.addEventListener('keydown', onSectionEscPress);
  };

  var showErrorOfLoadForm = function (message) {
    popup.classList.add('hidden');
    window.serverStatus.showErrorOfLoad(message);
    resetForm();
    var errorSection = document.querySelector('.error');
    errorSection.querySelector('.error__buttons > button:last-child').classList.remove('hidden');
  };

  // функция для закрытия любого окна по клику на экране
  var closeSection = function (section) {
    var sectionElement = document.querySelector('.' + section);
    mainPage.removeChild(sectionElement);
    document.removeEventListener('keydown', onSectionEscPress);
    document.removeEventListener('click', onSectionClick);
  };

  var onSectionClick = function (section) {
    closeSection(section);
  };

  // функция для закрытия любого окна по нажатию клавиши ESC
  var onSectionEscPress = function (evt) {
    var section = document.querySelectorAll('section');
    if (evt.keyCode === ESC_KEYCODE) {
      section.forEach(function (element) {
        if (element.classList.contains('success')) {
          closeSection('success');
        } else if (element.classList.contains('error')) {
          closeSection('error');
        }
      });
    }
  };

  window.serverStatus = {
    responseData: responseData,
    showErrorOfLoad: showErrorOfLoad,
    showErrorOfLoadForm: showErrorOfLoadForm
  };
})();
