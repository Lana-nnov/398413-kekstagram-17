'use strict';
(function () {
  // обозначаем константы и переменные
  var similarListElement = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var uploadFileElement = document.querySelector('.img-upload__start');
  var mainPage = document.querySelector('main');

  // находим блок с сообщением об ошибке
  var errorElement = document.querySelector('#error')
      .content
      .querySelector('.error');

  // функция для создания блока с фото, передаем конкретное фото + количество лайков
  var renderPhoto = function (photo) {
    var photoElement = similarPhotoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    return photoElement;
  };

  // передаем параметры нашего массива в функцию, вставляем фотографии ...
  var renderPhotos = function (array) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPhoto(array[i]));
    }
    similarListElement.appendChild(fragment);
  };

  // открываем popup
  uploadFileElement.addEventListener('change', function () {
    window.openPopup();
  });

  // в случае успешного ответа сервера загружаем фотографии с данными
  var onWindowLoadSuccess = function (array) {
    renderPhotos(array);
  };

  // изменяем сообщение об ошибке для случая, если не пришли данные с сервера
  var changeButtonError = function () {
    var buttonErrorLast = document.querySelector('.error__buttons > button:last-child');
    var buttonError = document.querySelector('.error__button');
    var errorTitle = document.querySelector('.error__title');
    errorTitle.textContent = 'Ошибка загрузки данных';
    buttonErrorLast.classList.add('hidden');
    buttonError.addEventListener('click', function () {
      location.reload();
    });
  };

  // в случае неуспешного ответа сервера показываем окно об ошибке
  var onWindowLoadError = function () {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(errorElement);
    mainPage.appendChild(fragment);
    changeButtonError();
  };

  window.load(onWindowLoadSuccess, onWindowLoadError);
})();
