'use strict';
(function () {
  var mainPage = document.querySelector('main');

  // находим блок с сообщением об ошибке
  var errorElement = document.querySelector('#error')
      .content
      .querySelector('.error');

  // в случае неуспешного ответа сервера показываем окно об ошибке
  window.showErrorOfLoad = function (message) {
    errorElement.querySelector('.error__buttons > button:last-child').classList.add('hidden');
    errorElement.querySelector('.error__title').textContent = message;
    errorElement.querySelector('.error__button').addEventListener('click', function () {
      location.reload();
    });
    mainPage.appendChild(errorElement);
  };
})();
