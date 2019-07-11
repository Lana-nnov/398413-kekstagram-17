'use strict';
(function () {
  var mainPage = document.querySelector('main');
  var popup = document.querySelector('.img-upload__overlay');
  var ESC_KEYCODE = 27;

  // в случае с успешной отправкой формы показываем сообщение, что все отправлено
  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

  // показываем окно об успешной отправке данных
  window.responseData = function () {
    popup.classList.add('hidden');
    var successElement = successTemplate.cloneNode(true);
    mainPage.appendChild(successElement);
    successElement.addEventListener('click', function () {
      onSectionClick('success');
    });
    document.addEventListener('keydown', onSectionEscPress('success'));
  };

  // находим блок с сообщением об ошибке
  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  // в случае неуспешного ответа сервера показываем окно об ошибке
  window.showErrorOfLoad = function (message) {
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__buttons > button:last-child').classList.add('hidden');
    errorElement.querySelector('.error__title').textContent = message;
    mainPage.appendChild(errorElement);
    errorElement.addEventListener('click', function () {
      onSectionClick('error');
    });
    document.addEventListener('keydown', onSectionEscPress('error'));
  };

  // в случае неуспешной загрузки формы показываем окно об ощибке, добавляется еще одна кнопка
  window.showErrorOfLoadForm = function (message) {
    popup.classList.add('hidden');
    window.showErrorOfLoad(message);
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
  var onSectionEscPress = function (section) {
    return function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeSection(section);
      }
    };
  };
})();
