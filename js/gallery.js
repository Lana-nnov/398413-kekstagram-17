'use strict';
(function () {
  // обозначаем константы и переменные
  var NUMBER_PHOTOS = 25;
  var similarListElement = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var uploadFileElement = document.querySelector('.img-upload__start');

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

  var photos = window.generatePhotosData(NUMBER_PHOTOS);
  renderPhotos(photos);

  // открываем popup
  uploadFileElement.addEventListener('change', function () {
    window.openPopup();
  });
})();
