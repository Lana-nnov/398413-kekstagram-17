'use strict';
(function () {
  var mainPage = document.querySelector('main');
  var popup = document.querySelector('.img-upload__overlay');

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
    successElement.addEventListener('click', function () {
      onSectionClick('success');
    });
  };

  var showErrorOfLoad = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__buttons > button:last-child').classList.add('hidden');
    errorElement.querySelector('.error__title').textContent = message;
    mainPage.appendChild(errorElement);
    document.addEventListener('keydown', window.util.onSectionEscPress);
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
    document.removeEventListener('keydown', window.util.onSectionEscPress);
  };

  var onSectionClick = function (section) {
    closeSection(section);
  };

  window.serverStatus = {
    responseData: responseData,
    showErrorOfLoad: showErrorOfLoad,
    showErrorOfLoadForm: showErrorOfLoadForm,
    close: closeSection
  };
})();
