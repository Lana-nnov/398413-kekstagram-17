'use strict';
(function () {
  var mainPage = document.querySelector('main');
  var popup = document.querySelector('.img-upload__overlay');

  var addEscPress = function () {
    document.addEventListener('keydown', onEscPress);
  };

  var removeEscPress = function () {
    document.removeEventListener('keydown', onEscPress);
  };

  var onEscPress = function (evt) {
    var sections = document.querySelectorAll('section');
    sections.forEach(function (element) {
      if (element.classList.contains('success')) {
        window.util.onSectionEscPress(evt, onSuccessEscPress);
      } else if (element.classList.contains('error')) {
        window.util.onSectionEscPress(evt, onErrorEscPress);
      }
    });
  };

  var onErrorEscPress = function () {
    onSectionClick('error');
  };

  var onSuccessEscPress = function () {
    onSectionClick('success');
  };

  // в случае с успешной отправкой формы показываем сообщение, что все отправлено
  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

  // находим блок с сообщением об ошибке
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var responseData = function () {
    popup.classList.add('hidden');
    var successElement = successTemplate.cloneNode(true);
    mainPage.appendChild(successElement);
    window.form.reset();
    addEscPress();
    successElement.addEventListener('click', function () {
      onSectionClick('success');
    });
  };

  var showErrorOfLoad = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__buttons > button:last-child').classList.add('hidden');
    errorElement.querySelector('.error__title').textContent = message;
    mainPage.appendChild(errorElement);
    addEscPress();
    errorElement.addEventListener('click', function () {
      onSectionClick('error');
    });
  };

  var showErrorOfLoadForm = function (message) {
    popup.classList.add('hidden');
    showErrorOfLoad(message);
    window.form.reset();
    var errorSection = document.querySelector('.error');
    errorSection.querySelector('.error__buttons > button:last-child').classList.remove('hidden');
  };

  // функция для закрытия любого окна по клику на экране
  var closeSection = function (section) {
    var sectionElement = document.querySelector('.' + section);
    mainPage.removeChild(sectionElement);
    document.removeEventListener('click', onSectionClick);
    removeEscPress();
  };

  var onSectionClick = function (section) {
    closeSection(section);
  };

  window.serverStatus = {
    responseData: responseData,
    showErrorOfLoad: showErrorOfLoad,
    showErrorOfLoadForm: showErrorOfLoadForm
  };
})();
